local chilingmeng = fk.CreateSkill{
  name = "chilingmeng",
  tags = { Skill.Compulsory },
}

local function matching_cards(who, length)
  return table.filter(who:getCardIds("hej"), function(id)
    return Fk:getCardById(id):getNameLength(true) == length
  end)
end

local spec = {
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(chilingmeng.name) or not data.card then return false end
    local ids = Card:getIdList(data.card)
    if #ids == 0 then return false end
    local other = data.from == player and data.to or data.from
    if not other or other.dead then return false end
    return #matching_cards(other, data.card:getNameLength(true)) > 0
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local other = data.from == player and data.to or data.from
    local shown = matching_cards(other, data.card:getNameLength(true))
    other:showCards(shown)
    data:preventDamage()
    local receiver, donor = data.from == player and other or player, data.from == player and player or other
    local gain = matching_cards(donor, data.card:getNameLength(true))
    if #gain > 0 and receiver:isAlive() then room:obtainCard(receiver, gain, true, fk.ReasonPrey, player, chilingmeng.name) end
  end,
}
chilingmeng:addEffect(fk.DamageCaused, spec)
chilingmeng:addEffect(fk.DamageInflicted, spec)

return chilingmeng
