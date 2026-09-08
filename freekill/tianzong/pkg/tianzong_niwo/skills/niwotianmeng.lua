local niwotianmeng = fk.CreateSkill{
  name = "niwotianmeng",
  related_skills = { "niwotianmeng_mark" },
}

local CARD_MARK = "@@niwo_mo"
local OWNER_MARK = "niwo_mo_owner"

local function update_marks(room)
  for _, p in ipairs(room.alive_players) do
    local n = #table.filter(p:getCardIds("hej"), function(id)
      return Fk:getCardById(id):getMark(CARD_MARK) > 0
    end)
    room:setPlayerMark(p, "@niwo_mo", n)
  end
end

local function my_mo(player)
  return table.filter(player:getCardIds("hej"), function(id)
    local card = Fk:getCardById(id)
    return card:getMark(CARD_MARK) > 0 and card:getMark(OWNER_MARK) == player.id
  end)
end

local function names(player)
  local result = table.filter(Fk:getAllCardNames("bt"), function(name)
    local card = Fk:cloneCard(name)
    return card and card.is_damage_card and not card.multiple_targets and
      card.skill:getMaxTargetNum(player) <= 1
  end)
  return player:getViewAsCardNames(niwotianmeng.name, result)
end

niwotianmeng:addEffect("viewas", {
  pattern = ".",
  prompt = "#niwotianmeng-use",
  expand_pile = function(self, player) return my_mo(player) end,
  interaction = function(self, player)
    local choices = names(player)
    if #choices > 0 then return UI.CardNameBox{ choices = choices, all_choices = choices } end
  end,
  card_filter = function(self, player, to_select, selected)
    return #selected == 0 and table.contains(my_mo(player), to_select)
  end,
  view_as = function(self, player, cards)
    if #cards ~= 1 or not self.interaction.data then return nil end
    local card = Fk:cloneCard(self.interaction.data)
    card:addSubcard(cards[1])
    card.skillName = niwotianmeng.name
    return card
  end,
  enabled_at_play = function(self, player)
    return #my_mo(player) > 0 and #names(player) > 0
  end,
  enabled_at_response = function(self, player, response)
    return #my_mo(player) > 0 and #names(player) > 0
  end,
})

niwotianmeng:addEffect(fk.AfterCardsMove, {
  mute = true,
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(niwotianmeng.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    update_marks(player.room)
  end,
})

return niwotianmeng
