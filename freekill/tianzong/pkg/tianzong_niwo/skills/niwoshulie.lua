local niwoshulie = fk.CreateSkill{ name = "niwoshulie" }
local PILE = "niwoxuejiu_lie"

local function all_lies(player)
  local ids = {}
  for _, p in ipairs(Fk:currentRoom().players) do table.insertTable(ids, p:getPile(PILE)) end
  return ids
end

niwoshulie:addEffect("viewas", {
  pattern = "slash,nullification",
  prompt = "#niwoshulie",
  max_turn_use_time = 1,
  expand_pile = function(self, player) return all_lies(player) end,
  card_filter = function(self, player, to_select, selected)
    return #selected == 0 and table.contains(all_lies(player), to_select)
      and Fk:getCardById(to_select).color ~= Card.NoColor
  end,
  view_as = function(self, player, cards)
    if #cards ~= 1 then return end
    local source = Fk:getCardById(cards[1])
    local card = Fk:cloneCard(source.color == Card.Red and "slash" or "nullification")
    card.skillName = niwoshulie.name
    card:addSubcard(cards[1])
    return card
  end,
  before_use = function(self, player, use)
    local selected = use.card.subcards[1]
    local owner = table.find(player.room.players, function(p) return table.contains(p:getPile(PILE), selected) end)
    if owner ~= player then return end
    local suit = Fk:getCardById(selected).suit
    local ids = table.filter(all_lies(player), function(id)
      return id ~= selected and Fk:getCardById(id).suit == suit
    end)
    if #ids > 0 then player.room:obtainCard(player, ids, true, fk.ReasonPrey, player, niwoshulie.name) end
  end,
})

Fk:loadTranslationTable{ ["#niwoshulie"] = "疏裂：选择一张红色/黑色“裂”当【杀】/【无懈可击】使用或打出" }
return niwoshulie
