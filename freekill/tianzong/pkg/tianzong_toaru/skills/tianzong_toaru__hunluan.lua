local hunluan = fk.CreateSkill { name = "tianzong_toaru__hunluan", tags = { Skill.Compulsory } }
hunluan:addEffect(fk.AfterCardTargetDeclared, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(hunluan.name) and math.random(2) == 1 and #data:getExtraTargets() > 0
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player, data) data:addTarget(player.room:tableRandomPick(data:getExtraTargets())) end,
})
hunluan:addEffect(fk.TargetConfirmed, {
  can_refresh = function(self, event, target, player) return target == player and player:hasSkill(hunluan.name, true) end,
  on_refresh = function(self, event, target, player) player.room:setPlayerMark(player, "tianzong_toaru__hunluan_target-turn", 1) end,
})
hunluan:addEffect(fk.Damaged, {
  can_refresh = function(self, event, target, player) return target == player and player:hasSkill(hunluan.name, true) end,
  on_refresh = function(self, event, target, player) player.room:setPlayerMark(player, "tianzong_toaru__hunluan_damage-turn", 1) end,
})
hunluan:addEffect(fk.TurnEnd, {
  can_trigger = function(self, event, target, player)
    return player:hasSkill(hunluan.name) and player:getMark("tianzong_toaru__hunluan_target-turn") == 0 and player:getMark("tianzong_toaru__hunluan_damage-turn") == 0
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player) player.room:handleAddLoseSkills(player, "-" .. hunluan.name) end,
})
return hunluan
