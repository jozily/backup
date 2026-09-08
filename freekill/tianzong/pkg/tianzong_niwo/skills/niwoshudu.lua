local niwoshudu = fk.CreateSkill{
  name = "niwoshudu",
  related_skills = { "niwocangji", "niwochencangRemake", "niwochoulu" },
  tags = { Skill.Compulsory },
}

local function distance_mark(to)
  return "niwoshudu_distance_to_" .. to.id
end

local function closer_mark(to)
  return "niwochencang_distance_to_" .. to.id
end

local function grant_if_isolated(player)
  if table.find(player.room:getOtherPlayers(player), function(p) return p:inMyAttackRange(player) end) then return end
  local skills = {}
  if not player:hasSkill("niwocangji", true) then table.insert(skills, "niwocangji") end
  if not player:hasSkill("niwochoulu", true) then table.insert(skills, "niwochoulu") end
  if #skills > 0 then player.room:handleAddLoseSkills(player, table.concat(skills, "|")) end
end

local function increase(from, to, owner)
  from.room:addPlayerMark(from, distance_mark(to), 1)
  grant_if_isolated(owner)
end

niwoshudu:addEffect(fk.CardUsing, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and data.card and data.card.is_damage_card and
      table.find(data.tos or {}, function(p) return p ~= player and p:isAlive() end) ~= nil
  end,
  on_use = function(self, event, target, player, data)
    for _, p in ipairs(data.tos or {}) do
      if p ~= player and p:isAlive() then increase(p, player, player) end
    end
  end,
})

niwoshudu:addEffect(fk.TargetConfirmed, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and data.card and data.card.is_damage_card and
      data.from and data.from ~= player and data.from:isAlive()
  end,
  on_use = function(self, event, target, player, data) increase(player, data.from, player) end,
})

niwoshudu:addEffect("distance", {
  correct_func = function(self, from, to)
    return from:getMark(distance_mark(to)) - from:getMark(closer_mark(to))
  end,
})

return niwoshudu
