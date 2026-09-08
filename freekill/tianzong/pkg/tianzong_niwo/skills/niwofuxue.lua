local niwofuxue = fk.CreateSkill{
  name = "niwofuxue",
}

local function count_target_mo(target)
  if not target or target.dead then return 0 end
  local ids = {}
  for _, area in ipairs({"h", "e", "j"}) do
    for _, id in ipairs(target:getCardIds(area)) do
      table.insert(ids, id)
    end
  end
  local n = 0
  for _, id in ipairs(ids) do
    if Fk:getCardById(id):getMark("@@niwo_mo") > 0 then
      n = n + 1
    end
  end
  return n
end

local function do_fuxue(room, player, data, target)
  if player.hp <= 0 then return end
  room:loseHp(player, 1, niwofuxue.name)
  if player.dead then return end

  local x = count_target_mo(target)
  if x <= 0 then return end

  local choice = room:askToChoice(player, {
    choices = { "niwofuxue_add", "niwofuxue_recover" },
    skill_name = niwofuxue.name,
    prompt = "#niwofuxue",
    cancelable = false,
  })

  if choice == "niwofuxue_add" then
    data:changeDamage(x)
    if not player.dead then
      player:drawCards(2 * x, niwofuxue.name)
    end
  else
    if player:isWounded() then
      room:recover({
        who = player,
        num = x,
        recoverBy = player,
        skillName = niwofuxue.name,
      })
    end
  end
end

niwofuxue:addEffect(fk.DamageCaused, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    return target == player
      and player:hasSkill(niwofuxue.name)
      and data.to ~= nil
      and data.damage > 0
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = niwofuxue.name,
      prompt = "#niwofuxue",
    })
  end,
  on_use = function(self, event, target, player, data)
    do_fuxue(player.room, player, data, data.to)
  end,
})

niwofuxue:addEffect(fk.DamageInflicted, {
  anim_type = "masochism",
  can_trigger = function(self, event, target, player, data)
    return target == player
      and player:hasSkill(niwofuxue.name)
      and data.damage > 0
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = niwofuxue.name,
      prompt = "#niwofuxue",
    })
  end,
  on_use = function(self, event, target, player, data)
    do_fuxue(player.room, player, data, player)
  end,
})

return niwofuxue
