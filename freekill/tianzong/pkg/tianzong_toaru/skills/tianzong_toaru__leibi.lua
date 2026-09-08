local leibi = fk.CreateSkill { name = "tianzong_toaru__leibi" }

leibi:addEffect(fk.SkillEffect, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(leibi.name) or player:getMark("tianzong_toaru__leibi_invalid") > 0 then return false end
    local from = data.who
    if not from or from == player or not data.skill_data or not data.skill_data.tos then return false end
    return table.contains(data.skill_data.tos, player) and
      player:getMark("tianzong_toaru__leibi_skill-turn") == 0 and
      player:canUseTo(Fk:cloneCard("thunder__slash"), from, { bypass_distances = true, bypass_times = true })
  end,
  on_cost = function(self, event, target, player, data)
    if player.room:askToSkillInvoke(player, { skill_name = leibi.name, prompt = "#tianzong_toaru__leibi-invoke::" .. data.who.id }) then
      event:setCostData(self, { tos = { data.who } })
      return true
    end
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local from = data.who
    room:setPlayerMark(player, "tianzong_toaru__leibi_skill-turn", 1)
    local use = room:useVirtualCard("thunder__slash", nil, player, from, leibi.name, true, {
      bypass_distances = true,
      bypass_times = true,
    })
    if use and use.damageDealt and next(use.damageDealt) then
      room:setPlayerMark(player, "tianzong_toaru__leibi_invalid", 1)
    end
  end,
})

leibi:addEffect(fk.DamageInflicted, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(leibi.name) and
      player:getMark("tianzong_toaru__leibi_invalid") == 0 and data.damageType == fk.ThunderDamage
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, { skill_name = leibi.name, prompt = "#tianzong_toaru__leibi-damage:::" .. data.damage })
  end,
  on_use = function(self, event, target, player, data)
    local damage = data.damage
    data:preventDamage()
    player.room:recover { who = player, num = damage, recoverBy = player, skillName = leibi.name }
  end,
})

leibi:addEffect(fk.DamageInflicted, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(leibi.name) and data.damageType == fk.ThunderDamage and data.damage > 0
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player, data)
    player:drawCards(data.damage, leibi.name)
  end,
})

Fk:loadTranslationTable {
  ["#tianzong_toaru__leibi-invoke"] = "雷壁：你可以视为对 %dest 使用一张雷【杀】",
  ["#tianzong_toaru__leibi-damage"] = "雷壁：你可以防止即将受到的 %arg 点雷电伤害并恢复等量体力",
  ["tianzong_toaru__leibi_invalid"] = "雷壁失效",
}

return leibi
