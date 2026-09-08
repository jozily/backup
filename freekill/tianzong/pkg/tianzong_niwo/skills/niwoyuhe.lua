local niwoyuhe = fk.CreateSkill{ name = "niwoyuhe" }
local USED_MARK = "niwoyuhe_names-round"

local function neighbors(player)
  local a, b = player:getNextAlive(), player:getLastAlive()
  if a == player or b == player or a == b or a:isNude() or b:isNude() then return end
  return a, b
end

niwoyuhe:addEffect("viewas", {
  pattern = ".|.|.|.|.|basic",
  prompt = "#niwoyuhe",
  interaction = function(self, player)
    local names = player:getViewAsCardNames(niwoyuhe.name, Fk:getAllCardNames("b"), nil, player:getTableMark(USED_MARK))
    if #names > 0 then return UI.TianzongCardNameBox{ choices = names, all_choices = names } end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if not self.interaction.data then return end
    local card = Fk:cloneCard(self.interaction.data)
    card.skillName = niwoyuhe.name
    return card
  end,
  before_use = function(self, player, use)
    local a, b = neighbors(player)
    if not a then return "" end
    local room = player.room
    local id1 = room:askToChooseCard(player, { target = a, flag = "he", skill_name = niwoyuhe.name, prompt = "#niwoyuhe-card::" .. a.id })
    local id2 = room:askToChooseCard(player, { target = b, flag = "he", skill_name = niwoyuhe.name, prompt = "#niwoyuhe-card::" .. b.id })
    a:showCards({ id1 }); b:showCards({ id2 })
    local c1, c2 = Fk:getCardById(id1), Fk:getCardById(id2)
    if c1.color == Card.NoColor or c1.color ~= c2.color then return "" end
    room:addTableMarkIfNeed(player, USED_MARK, use.card.trueName)
    if c1.type == c2.type then room:obtainCard(player, { id1, id2 }, true, fk.ReasonPrey, player, niwoyuhe.name) end
  end,
  enabled_at_play = function(self, player) return neighbors(player) ~= nil end,
  enabled_at_response = function(self, player, response) return neighbors(player) ~= nil end,
})

Fk:loadTranslationTable{
  ["#niwoyuhe"] = "逾壑：声明一种本轮未以此法使用的基本牌",
  ["#niwoyuhe-card"] = "逾壑：展示 %dest 的一张牌",
}
return niwoyuhe
