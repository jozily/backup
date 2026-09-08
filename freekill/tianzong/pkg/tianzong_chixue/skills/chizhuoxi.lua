local chizhuoxi = fk.CreateSkill{
  name = "chizhuoxi",
  tags = { Skill.Compulsory, Skill.Limited, Skill.Switch },
}

chizhuoxi:addEffect(fk.CardUsing, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chizhuoxi.name) or player:usedSkillTimes(chizhuoxi.name, Player.HistoryGame) > 0 then return false end
    if not target or target.dead or player:distanceTo(target) > 1 or not data.card then return false end
    if data.card.type ~= Card.TypeBasic and not data.card:isCommonTrick() then return false end
    local yin = player:getSwitchSkillState(chizhuoxi.name, false) == fk.SwitchYin
    return yin ~= data.card:isVirtual()
  end,
  on_use = function(self, event, target, player, data)
    player:getSwitchSkillState(chizhuoxi.name, true)
    local ids = Card:getIdList(data.card)
    if #ids > 0 then player.room:obtainCard(player, ids, true, fk.ReasonPrey, player, chizhuoxi.name) end
    if target:isAlive() then target:reset() end
  end,
})

return chizhuoxi
