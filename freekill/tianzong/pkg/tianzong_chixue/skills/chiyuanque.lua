local RANDOM_POOL = {
  "ty_ex__jueqing", "shangshi", "jianmie", "liangyan", "minghui",
  "ol__huishi", "qingleng", "chiejue", "mini__juejue",
  "mini__qingshiz", "mini__qingjuez",
}

local chiyuanque = fk.CreateSkill{
  name = "chiyuanque",
  related_skills = RANDOM_POOL,
  tags = { Skill.Quest },
}
local DAMAGE_MARK = "@chiyuanque_damage"
local FINISHED = "chiyuanque_finished"
local THRESHOLD = 3

local function acquire_random(room, player, number)
  local pool = table.filter(RANDOM_POOL, function(name)
    return Fk.skills[name] ~= nil and not player:hasSkill(name, true)
  end)
  local gained = {}
  while #pool > 0 and #gained < number do
    local name = room:tableRandomPick(pool)
    table.removeOne(pool, name)
    table.insert(gained, name)
  end
  if #gained > 0 then room:handleAddLoseSkills(player, table.concat(gained, "|"), nil, true, false) end
end

local function success(room, player)
  room:setPlayerMark(player, FINISHED, 1)
  room:updateQuestSkillState(player, chiyuanque.name, false)
  if player:isWounded() then room:recover{ who = player, num = player.maxHp - player.hp, skillName = chiyuanque.name } end
  room:handleAddLoseSkills(player, "-chifenqing|-chisuhen", nil, true, false)
  acquire_random(room, player, room.current ~= player and 3 or 2)
end

local function add_damage(player, amount)
  local room = player.room
  room:addPlayerMark(player, DAMAGE_MARK, amount)
  if player:getMark(DAMAGE_MARK) >= THRESHOLD and player:getMark(FINISHED) == 0 then success(room, player) end
end

chiyuanque:addEffect(fk.Damage, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chiyuanque.name) and player:getMark(FINISHED) == 0
      and data.damageType ~= fk.NormalDamage
  end,
  on_use = function(self, event, target, player, data) add_damage(player, data.damage) end,
})
chiyuanque:addEffect(fk.Damaged, {
  can_trigger = function(self, event, target, player, data)
    return target == player and data.from ~= player and player:hasSkill(chiyuanque.name) and player:getMark(FINISHED) == 0
      and data.damageType ~= fk.NormalDamage
  end,
  on_use = function(self, event, target, player, data) add_damage(player, data.damage) end,
})

chiyuanque:addEffect(fk.EnterDying, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chiyuanque.name) and player:getMark(FINISHED) == 0
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    room:setPlayerMark(player, FINISHED, 1)
    room:updateQuestSkillState(player, chiyuanque.name, true)
    if player.hp < 1 then room:recover{ who = player, num = 1 - player.hp, skillName = chiyuanque.name } end
    room:changeMaxHp(player, -1)
    room:handleAddLoseSkills(player, "-chifenqing|-chisuhen", nil, true, false)
    local others = room:getOtherPlayers(player)
    if #others > 0 then
      local chosen = room:askToChoosePlayers(player, { targets = others, min_num = 1, max_num = 1, skill_name = chiyuanque.name, prompt = "#chiyuanque-memory", cancelable = false })
      local to = chosen[1]
      to:drawCards(3, chiyuanque.name)
      if to:isWounded() then room:recover{ who = to, num = 1, skillName = chiyuanque.name } end
    end
  end,
})

return chiyuanque
