-- chicixuan_viewas.lua
local chicixuan_viewas = fk.CreateSkill{
  name = "chicixuan_viewas",
  description = ":chicixuan",
  anim_type = "support",
}

Fk:loadTranslationTable{
  ["chicixuan_viewas"] = "辞玄",
}

chicixuan_viewas:addEffect("viewas", {
  anim_type = "support",
  pattern = ".",
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if #cards ~= 0 then return end
    
    local renCount = 0
    for k, v in pairs(player.marks) do
      if string.find(k, "chicixuan_ren_") and v > 0 then
        renCount = renCount + 1
      end
    end
    
    if renCount == 0 then return end
    
    local candidates = {}
    for _, card in ipairs(Fk.cards) do
      if (card.type == Card.TypeBasic or card:isCommonTrick()) then
        local nameLength = card:getNameLength(true)
        if nameLength == renCount then
          table.insert(candidates, card)
        end
      end
    end
    
    if #candidates == 0 then return end
    
    local selectedCard = candidates[math.random(1, #candidates)]
    local c = Fk:cloneCard(selectedCard.name)
    c.skillName = "chicixuan"
    return c
  end,
  enabled_at_play = function(self, player)
    local renCount = 0
    for k, v in pairs(player.marks) do
      if string.find(k, "chicixuan_ren_") and v > 0 then
        renCount = renCount + 1
      end
    end
    return renCount > 0
  end,
  enabled_at_response = function(self, player, response)
    local renCount = 0
    for k, v in pairs(player.marks) do
      if string.find(k, "chicixuan_ren_") and v > 0 then
        renCount = renCount + 1
      end
    end
    return renCount > 0
  end,
})

return chicixuan_viewas
