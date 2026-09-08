local chihuaiji = fk.CreateSkill{ name = "chihuaiji", tags = { Skill.Switch } }

chihuaiji:addEffect(fk.CardUsing, {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chihuaiji.name) and
      player:getSwitchSkillState(chihuaiji.name) == fk.SwitchYin and #data.tos > 0 and player.maxHp > #data.tos
  end,
  on_cost = function(self, event, target, player, data)
    local room = player.room
    if not room:askToSkillInvoke(player, { skill_name = chihuaiji.name, prompt = "#chihuaiji-yin:::" .. #data.tos }) then return false end
    local use = room:askToUseVirtualCard(player, {
      name = data.card.name, skill_name = chihuaiji.name, prompt = "#chihuaiji-reassign",
      cancelable = true, skip = true, extra_data = { bypass_times = true, bypass_distances = false },
    })
    if use then event:setCostData(self, { use = use, x = #data.tos }); return true end
  end,
  on_use = function(self, event, target, player, data)
    local cost = event:getCostData(self)
    player.room:changeMaxHp(player, -cost.x)
    if player.dead then return end
    data.tos, data.subTos = cost.use.tos, cost.use.subTos
  end,
})

chihuaiji:addEffect(fk.TargetConfirmed, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chihuaiji.name) and
      player:getSwitchSkillState(chihuaiji.name) == fk.SwitchYang and #data.use.tos > 0
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = chihuaiji.name, prompt = "#chihuaiji-yang:::" .. #data.use.tos,
    })
  end,
  on_use = function(self, event, target, player, data)
    player.room:changeMaxHp(player, #data.use.tos)
  end,
})

return chihuaiji
