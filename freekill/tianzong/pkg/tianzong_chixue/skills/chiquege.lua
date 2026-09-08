local chiquege = fk.CreateSkill{
  name = "chiquege",
  tags = { Skill.Compulsory },
}
local HP_MARK = "chiquege_hp-turn"
local HAND_MARK = "chiquege_hand-turn"
local EQUAL_MARK = "chiquege_equal-turn"
local DEATH_MARK = "chiquege_death"

local function shanshan_value(player, index)
  if index == 1 then return player.hp end
  if index == 2 then return player:getMaxCards() end
  if index == 3 then return 1 + player:getMark("chishaoshan_slash") end
  if index == 4 then return player:distanceTo(player.room.players[1]) end
  if index == 5 then return player:getHandcardNum() end
  return player.maxHp
end

local function can_trigger_equal(player)
  if player.room.current ~= player or player:getMark(EQUAL_MARK) > 0 then return false end
  if #player:getTableMark("chishaoshan_used-turn") == 0 then return false end
  local in_range = #table.filter(player.room:getOtherPlayers(player), function(p)
    return player:inMyAttackRange(p)
  end)
  for index = 1, 6 do
    if shanshan_value(player, index) + player:getMark("chishaoshan_bonus" .. index) == in_range then
      return true
    end
  end
  return false
end

local hp_spec = {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chiquege.name) and player.room.current == player
      and player.hp == player.maxHp and player:getMark(HP_MARK) == 0
  end,
  on_use = function(self, event, target, player, data)
    player.room:setPlayerMark(player, HP_MARK, 1)
    player:drawCards(player.hp, chiquege.name)
  end,
}
chiquege:addEffect(fk.HpChanged, hp_spec)
chiquege:addEffect(fk.TurnStart, hp_spec)

local hand_spec = {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chiquege.name) and player.room.current == player and player:getMark(HAND_MARK) == 0
      and player:getHandcardNum() == player:getMaxCards()
  end,
  on_use = function(self, event, target, player, data)
    player.room:setPlayerMark(player, HAND_MARK, 1)
    player.room:askToUseVirtualCard(player, { name = "fire__slash", skill_name = chiquege.name, prompt = "#chiquege-slash", cancelable = false, extra_data = { bypass_times = true } })
  end,
}
chiquege:addEffect(fk.AfterCardsMove, hand_spec)
chiquege:addEffect(fk.TurnStart, hand_spec)

local equal_spec = {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chiquege.name) and can_trigger_equal(player)
  end,
  on_cost = function(self, event, target, player, data)
    player.room:setPlayerMark(player, EQUAL_MARK, 1)
    return player.room:askToSkillInvoke(player, { skill_name = chiquege.name, prompt = "#chiquege-equal" })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    player:drawCards(1, chiquege.name)
    local removed = player:getTableMark("chishaoshan_used-turn")
    if #removed == 0 then return end
    local choice = room:askToChoice(player, {
      choices = table.map(removed, function(index) return "chishaoshan_opt" .. index end),
      skill_name = chiquege.name,
      prompt = "#chiquege-restore",
    })
    room:removeTableMark(player, "chishaoshan_used-turn", tonumber(string.sub(choice, -1)))
  end,
}
chiquege:addEffect(fk.HpChanged, equal_spec)
chiquege:addEffect(fk.MaxHpChanged, equal_spec)
chiquege:addEffect(fk.AfterCardsMove, equal_spec)
chiquege:addEffect(fk.AfterSkillEffect, {
  can_trigger = function(self, event, target, player, data)
    return data.skill and data.skill.name == "chishaoshan" and player:hasSkill(chiquege.name)
      and can_trigger_equal(player)
  end,
  on_cost = equal_spec.on_cost,
  on_use = equal_spec.on_use,
})

chiquege:addEffect(fk.Death, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chiquege.name) or player:getMark(DEATH_MARK) > 0 then return false end
    local dead = #table.filter(player.room.players, function(p) return p.dead end)
    return dead == #player.room.alive_players and #player.room:getOtherPlayers(player) > 0
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    room:setPlayerMark(player, DEATH_MARK, 1)
    local chosen = room:askToChoosePlayers(player, { targets = room:getOtherPlayers(player), min_num = 1, max_num = 1, skill_name = chiquege.name, prompt = "#chiquege-swap", cancelable = false })
    room:swapSeat(player, chosen[1])
  end,
})

return chiquege
