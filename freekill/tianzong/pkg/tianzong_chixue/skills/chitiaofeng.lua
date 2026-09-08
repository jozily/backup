local chitiaofeng = fk.CreateSkill{ name = "chitiaofeng" }
local SUIT_MARK = "chitiaofeng_suits-phase"

local function suit_count(player)
  local suits = {}
  for _, id in ipairs(player:getCardIds("h")) do
    local suit = Fk:getCardById(id).suit
    if suit ~= Card.NoSuit then table.insertIfNeed(suits, suit) end
  end
  return #suits
end

chitiaofeng:addEffect("viewas", {
  pattern = "redistribute",
  prompt = "#chitiaofeng",
  handly_pile = true,
  card_filter = function(self, player, to_select, selected)
    if #selected > 0 then return false end
    local card = Fk:getCardById(to_select)
    return card.suit ~= Card.NoSuit and not table.contains(player:getTableMark(SUIT_MARK), card.suit)
      and card:getNameLength(true) >= suit_count(player)
  end,
  view_as = function(self, player, cards)
    if #cards ~= 1 then return end
    local card = Fk:cloneCard("redistribute")
    card.skillName = chitiaofeng.name
    card:addSubcard(cards[1])
    return card
  end,
  before_use = function(self, player, use)
    player:showCards(player:getCardIds("hej"))
    local card = Fk:getCardById(use.card.subcards[1])
    player.room:addTableMark(player, SUIT_MARK, card.suit)
    use.extra_data = use.extra_data or {}
    use.extra_data.chitiaofeng_x = suit_count(player)
  end,
  after_use = function(self, player, use)
    local x = use.extra_data and use.extra_data.chitiaofeng_x or 0
    if x > 0 and player:isAlive() then player:drawCards(x, chitiaofeng.name) end
  end,
  enabled_at_play = function(self, player)
    return table.find(player:getCardIds("he"), function(id)
      local card = Fk:getCardById(id)
      return card.suit ~= Card.NoSuit and not table.contains(player:getTableMark(SUIT_MARK), card.suit)
        and card:getNameLength(true) >= suit_count(player)
    end)
  end,
})

return chitiaofeng
