local chidulie = fk.CreateSkill{
  name = "chidulie",
  tags = { Skill.Compulsory },
}

local DEALT_MARK = "chidulie_dealt"
local TAKEN_MARK = "chidulie_taken"

local function update_skill(room, player)
  if player:getMark(DEALT_MARK) > 0 and player:getMark(TAKEN_MARK) > 0 then
    room:handleAddLoseSkills(player, "-" .. chidulie.name, nil, true, false)
  end
end

chidulie:addEffect(fk.DamageCaused, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chidulie.name) and player:getMark(DEALT_MARK) == 0
  end,
  on_use = function(self, event, target, player, data)
    data.damage = data.damage * 2
    player.room:setPlayerMark(player, DEALT_MARK, 1)
    update_skill(player.room, player)
  end,
})

chidulie:addEffect(fk.DamageInflicted, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chidulie.name) and player:getMark(TAKEN_MARK) == 0
  end,
  on_use = function(self, event, target, player, data)
    data.damage = data.damage * 2
    player.room:setPlayerMark(player, TAKEN_MARK, 1)
    update_skill(player.room, player)
  end,
})

return chidulie
