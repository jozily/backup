local chiejue = fk.CreateSkill{
  name = "chiejue",
  tags = { Skill.Compulsory },
}

chiejue:addEffect(fk.DamageCaused, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chiejue.name) or not data.card or
      not table.contains({ "slash", "duel" }, data.card.trueName) or not data.from or not data.to then
      return false
    end
    if data.from == player then
      return data.to ~= player and not player:inMyAttackRange(data.to)
    end
    return data.to == player and data.from ~= player and not data.from:inMyAttackRange(player)
  end,
  on_use = function(self, event, target, player, data)
    data.damage = data.damage + 1
  end,
})

return chiejue
