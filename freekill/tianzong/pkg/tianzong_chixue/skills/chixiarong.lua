local chixiarong = fk.CreateSkill{
  name = "chixiarong",
  tags = { Skill.Limited },
}
local USED_NAMES = "chixiarong_names-round"
local TARGET_MARK = "chixiarong_target"
local X_MARK = "chixiarong_x"

local function names(player)
  return player:getViewAsCardNames(chixiarong.name, table.filter(Fk:getAllCardNames("bt"), function(name)
    return not table.contains(player:getTableMark(USED_NAMES), name)
  end))
end

chixiarong:addEffect("viewas", {
  pattern = ".",
  prompt = "#chixiarong",
  interaction = function(self, player)
    local choices = names(player)
    if #choices > 0 then return UI.TianzongCardNameBox{ choices = choices, all_choices = choices } end
  end,
  card_filter = function(self, player, to_select, selected)
    if not self.interaction.data or not table.contains(player:getCardIds("h"), to_select) then return false end
    local x = Fk:cloneCard(self.interaction.data):getNameLength(true)
    local sum = Fk:getCardById(to_select):getNameLength(true)
    for _, id in ipairs(selected) do sum = sum + Fk:getCardById(id):getNameLength(true) end
    return sum <= x
  end,
  view_as = function(self, player, cards)
    if not self.interaction.data or #cards == 0 then return end
    local card = Fk:cloneCard(self.interaction.data)
    local sum = 0
    for _, id in ipairs(cards) do sum = sum + Fk:getCardById(id):getNameLength(true) end
    if sum ~= card:getNameLength(true) then return end
    card.skillName = chixiarong.name
    card:addSubcards(cards)
    return card
  end,
  before_use = function(self, player, use)
    local room = player.room
    local x = use.card:getNameLength(true)
    player:turnOver()
    room:addTableMarkIfNeed(player, USED_NAMES, use.card.name)
    local targets = table.filter(room:getOtherPlayers(player), function(p) return player:distanceTo(p) >= x end)
    if #targets > 0 then
      local chosen = room:askToChoosePlayers(player, { targets = targets, min_num = 1, max_num = 1, skill_name = chixiarong.name, prompt = "#chixiarong-target", cancelable = false })
      local target = chosen[1]
      room:viewCards(player, { cards = target:getCardIds("h"), skill_name = chixiarong.name, prompt = "$ViewCardsFrom:" .. target.id })
      room:setPlayerMark(player, TARGET_MARK, target.id)
      room:setPlayerMark(player, X_MARK, x)
    end
  end,
  enabled_at_play = function(self, player) return player:usedSkillTimes(chixiarong.name, Player.HistoryGame) == 0 end,
  enabled_at_response = function(self, player) return player:usedSkillTimes(chixiarong.name, Player.HistoryGame) == 0 end,
})

chixiarong:addEffect("distance", {
  correct_func = function(self, from, to)
    if to:hasSkill(chixiarong.name) and to:getMark(X_MARK) > 0 then
      return from.id == to:getMark(TARGET_MARK) and -to:getMark(X_MARK) or to:getMark(X_MARK)
    end
  end,
})

return chixiarong
