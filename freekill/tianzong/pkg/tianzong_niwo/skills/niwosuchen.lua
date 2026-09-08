local niwosuchen = fk.CreateSkill{ name = "niwosuchen" }

niwosuchen:addEffect(fk.TargetConfirming, {
  anim_type = "defensive",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(niwosuchen.name)
      and player:usedSkillTimes(niwosuchen.name, Player.HistoryRound) == 0
      and data.from and data.from ~= player and data.from:isAlive()
      and (data.card.trueName == "slash" or data.card.type == Card.TypeTrick)
      and not player:isKongcheng()
  end,
  on_cost = function(self, event, target, player, data)
    local cards = player.room:askToDiscard(player, {
      min_num = 1, max_num = 1, include_equip = false, skill_name = niwosuchen.name,
      cancelable = true, pattern = "slash|.|.|hand", prompt = "#niwosuchen-discard",
    })
    if #cards > 0 then return true end
  end,
  on_use = function(self, event, target, player, data)
    data:cancelTarget(player)
    if not data.from.dead and not table.contains(data:getAllTargets(), data.from)
      and not data.from:isProhibited(data.from, data.card) then
      data:addTarget(data.from, nil, true)
    end
    if player:isAlive() and data.from:isAlive() and player.hp <= data.from.hp
      and player.room:askToSkillInvoke(player, { skill_name = niwosuchen.name, prompt = "#niwosuchen-damage::" .. data.from.id }) then
      player.room:damage{ from = player, to = data.from, damage = 1, damageType = fk.ThunderDamage, skillName = niwosuchen.name }
    end
  end,
})

Fk:loadTranslationTable{
  ["#niwosuchen-discard"] = "肃尘：你可以弃置一张【杀】将此牌转移给使用者",
  ["#niwosuchen-damage"] = "肃尘：是否对 %dest 造成1点雷电伤害？",
}
return niwosuchen
