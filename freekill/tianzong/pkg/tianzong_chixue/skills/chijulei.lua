local chijulei = fk.CreateSkill{ name = "chijulei" }
local DUST_MARK = "chizhichen_dust"
local FIRE_NAMES = { "fire__slash", "fire_attack" }
local TURNOVER_NAMES = { "analeptic", "chasing_near" }

local function card_names(player)
  local all_names = table.simpleClone(TURNOVER_NAMES)
  if not player.chained then all_names = table.connect(FIRE_NAMES, all_names) end
  return player:getViewAsCardNames(chijulei.name, all_names)
end

chijulei:addEffect("viewas", {
  pattern = ".",
  prompt = "#chijulei",
  interaction = function(self, player)
    local names = card_names(player)
    if #names > 0 then
      return UI.TianzongCardNameBox{ choices = names, all_choices = table.connect(FIRE_NAMES, TURNOVER_NAMES) }
    end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if #cards > 0 or not self.interaction.data then return nil end
    local card = Fk:cloneCard(self.interaction.data)
    card.skillName = chijulei.name
    return card
  end,
  before_use = function(self, player, use)
    local room = player.room
    if table.contains(FIRE_NAMES, use.card.name) then
      room:setPlayerChained(player, true)
    else
      player:turnOver()
    end

    local dust_players = {}
    if room.current and room.current:getMark(DUST_MARK) > 0 then
      table.insert(dust_players, room.current)
    end
    for _, p in ipairs(use.tos or {}) do
      if p:getMark(DUST_MARK) > 0 then table.insertIfNeed(dust_players, p) end
    end
    if #dust_players == 0 then return end

    local chosen = room:askToChoosePlayers(player, {
      targets = dust_players,
      min_num = 1,
      max_num = 1,
      skill_name = chijulei.name,
      prompt = "#chijulei-dust",
      cancelable = false,
    })
    room:removePlayerMark(chosen[1], DUST_MARK, 1)
    local choice = room:askToChoice(player, {
      choices = { "chijulei_extra", "chijulei_reset" },
      skill_name = chijulei.name,
      prompt = "#chijulei-choice",
    })
    if choice == "chijulei_extra" then
      use.extraUse = true
    else
      player:reset()
    end
  end,
  enabled_at_play = function(self, player)
    return #card_names(player) > 0
  end,
  enabled_at_response = function(self, player, response)
    return #card_names(player) > 0
  end,
})

return chijulei
