local chiqianmeng = fk.CreateSkill{ name = "chiqianmeng" }

local function card_names(player)
  if player.maxHp <= 1 then return {} end
  local all_names = Fk:getAllCardNames("bt")
  local names = player:getViewAsCardNames(chiqianmeng.name, all_names)
  return table.filter(names, function(name)
    local card = Fk:cloneCard(name)
    return (card.type == Card.TypeBasic or card:isCommonTrick()) and
      card:getNameLength(true) <= player.maxHp - 1
  end)
end

chiqianmeng:addEffect("viewas", {
  pattern = ".",
  prompt = "#chiqianmeng",
  interaction = function(self, player)
    local names = card_names(player)
    if #names > 0 then
      return UI.TianzongCardNameBox{ choices = names, all_choices = Fk:getAllCardNames("bt") }
    end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if #cards > 0 or not self.interaction.data then return nil end
    local card = Fk:cloneCard(self.interaction.data)
    card.skillName = chiqianmeng.name
    return card
  end,
  before_use = function(self, player, use)
    local room = player.room
    local x = use.card:getNameLength(true)
    room:changeMaxHp(player, -x)
    if player:isAlive() and (use.card.type == Card.TypeBasic or player.maxHp == x) then
      room:changeMaxHp(player, 1)
    end
  end,
  enabled_at_play = function(self, player)
    return #card_names(player) > 0
  end,
  enabled_at_response = function(self, player, response)
    return #card_names(player) > 0
  end,
})

return chiqianmeng
