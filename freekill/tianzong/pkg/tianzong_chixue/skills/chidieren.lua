local chidieren = fk.CreateSkill{
  name = "chidieren",
}

local ROUND_MARK = "@$chidieren-round"

local function sum_name_length(ids)
  local sum = 0
  for _, id in ipairs(ids) do
    sum = sum + Fk:getCardById(id):getNameLength(true)
  end
  return sum
end

chidieren:addEffect("viewas", {
  prompt = "#chidieren",
  pattern = ".",

  interaction = function(self, player)
    local all_names = Fk:getAllCardNames("bt")
    local names = player:getViewAsCardNames(chidieren.name, all_names, nil, player:getTableMark(ROUND_MARK))
    return UI.TianzongCardNameBox {
      choices = names,
      all_choices = all_names,
    }
  end,

  handly_pile = true,

  filter_pattern = {
    min_num = 1,
    max_num = math.huge,
    pattern = ".|.|.|^equip",
  },

  view_as = function(self, player, cards)
    if #cards == 0 or not self.interaction.data then return end
    local card = Fk:cloneCard(self.interaction.data)
    if card:getNameLength(true) ~= sum_name_length(cards) then return end
    card:addSubcards(cards)
    card.skillName = chidieren.name
    return card
  end,

  before_use = function(self, player, use)
    player.room:addTableMark(player, ROUND_MARK, use.card.trueName)
  end,

  enabled_at_play = function(self, player)
    return #player:getViewAsCardNames(chidieren.name, Fk:getAllCardNames("bt"), nil, player:getTableMark(ROUND_MARK)) > 0
  end,

  enabled_at_response = function(self, player, response)
    return #player:getViewAsCardNames(chidieren.name, Fk:getAllCardNames("bt"), nil, player:getTableMark(ROUND_MARK)) > 0
  end,
})

chidieren:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(chidieren.name)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, ROUND_MARK, 0)
  end,
})

return chidieren
