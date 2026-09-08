local chihantang = fk.CreateSkill{
  name = "chihantang",
}

local CANGSUI_USED_MARK = "chicangsui_used-turn"

local function get_aborted_count(player)
  return math.max(1, 5 - #player:getAvailableEquipSlots())
end

local function reset_cangsui(player)
  player.room:setPlayerMark(player, CANGSUI_USED_MARK, 0)
end

local function sum_name_length(ids)
  local sum = 0
  for _, id in ipairs(ids) do
    sum = sum + Fk:getCardById(id):getNameLength(true)
  end
  return sum
end

local function choose_cards_sum_x(room, player, x)
  local all_cards = table.filter(player:getCardIds("he"), function(id)
    return not player:prohibitDiscard(id)
  end)
  if #all_cards == 0 then return {} end

  while true do
    local ids = room:askToCards(player, {
      min_num = 1,
      max_num = #all_cards,
      include_equip = true,
      skill_name = chihantang.name,
      cancelable = true,
      pattern = tostring(Exppattern{ id = all_cards }),
      prompt = "#chihantang-discard:::" .. x,
      expand_pile = all_cards,
    })

    if #ids == 0 then
      return {}
    end

    if sum_name_length(ids) == x then
      return ids
    end
  end
end

local function recover_one_slot(room, player)
  local lost = table.filter({
    "WeaponSlot",
    "ArmorSlot",
    "DefensiveRideSlot",
    "OffensiveRideSlot",
    "TreasureSlot",
  }, function(slot)
    return not table.contains(player:getAvailableEquipSlots(), slot)
  end)

  if #lost == 0 then return end

  local choice = room:askToChoice(player, {
    choices = lost,
    skill_name = chihantang.name,
  })

  room:resumePlayerArea(player, choice)
end

local function get_damage_count_this_round(player, target)
  local mark = player:getMark("chihantang_damaged-round")
  if type(mark) ~= "table" then return 0 end
  local cnt = 0
  for _, pid in ipairs(mark) do
    if pid == target.id then
      cnt = cnt + 1
    end
  end
  return cnt
end

local function do_hantang(room, player)
  local x = get_aborted_count(player)

  local choices = { "chihantang_opt2" }
  if not player:isNude() then
    table.insert(choices, 1, "chihantang_opt1")
  end

  local choice = room:askToChoice(player, {
    choices = choices,
    skill_name = chihantang.name,
    cancelable = false,
  })

  if choice == "chihantang_opt1" then
    local ids = choose_cards_sum_x(room, player, x)
    if #ids == 0 then return end

    room:throwCard(ids, chihantang.name, player, player)
    if player.dead then return end

    local targets = room:askToChoosePlayers(player, {
      min_num = 1,
      max_num = 1,
      targets = room.alive_players,
      skill_name = chihantang.name,
      prompt = "#chihantang-target",
      cancelable = false,
    })
    local to = targets[1]
    if not to or to.dead then return end

    local before_count = get_damage_count_this_round(player, to)
    local hp_before = to.hp

    room:damage{
      from = player,
      to = to,
      damage = 1,
      skillName = chihantang.name,
    }

    if player.dead then return end

    local damaged_successfully = to.dead or to.hp < hp_before

    if damaged_successfully and before_count >= 1 then
      recover_one_slot(room, player)
    end

    if damaged_successfully and to == player and not player.dead then
      player:drawCards(x, chihantang.name)
    end
  else
    player:drawCards(x, chihantang.name)
    if not player.dead then
      reset_cangsui(player)
    end
  end
end

chihantang:addEffect("active", {
  anim_type = "offensive",
  prompt = "#chihantang",
  card_num = 0,
  target_num = 0,
  max_phase_use_time = 1,

  can_use = function(self, player)
    return player.phase == Player.Play
      and player:usedSkillTimes(chihantang.name, Player.HistoryPhase) == 0
  end,

  card_filter = Util.FalseFunc,
  target_filter = Util.FalseFunc,

  on_use = function(self, room, effect)
    do_hantang(room, effect.from)
  end,
})

-- Record successful damage before the first-damage trigger can invoke Hantang.
-- This makes a nested second damage see the original damage in the same round.
chihantang:addEffect(fk.Damage, {
  mute = true,
  can_refresh = function(self, event, target, player, data)
    return target == player
      and data.to ~= nil
      and player:hasSkill(chihantang.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:addTableMark(player, "chihantang_damaged-round", data.to.id)
  end,
})

chihantang:addEffect(fk.Damage, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    return data.from == player
      and player:hasSkill(chihantang.name)
      and player.room.current ~= nil
      and player:getMark("chihantang_firstdamage-turn") == 0
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = chihantang.name,
      prompt = "#chihantang",
    })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    room:setPlayerMark(player, "chihantang_firstdamage-turn", 1)
    do_hantang(room, player)
  end,
})

chihantang:addEffect(fk.Damaged, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    return target == player
      and player:hasSkill(chihantang.name)
      and player.room.current ~= nil
      and player:getMark("chihantang_firsthurt-turn") == 0
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = chihantang.name,
      prompt = "#chihantang",
    })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    room:setPlayerMark(player, "chihantang_firsthurt-turn", 1)
    do_hantang(room, player)
  end,
})

chihantang:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chihantang.name)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, "chihantang_damaged-round", 0)
  end,
})

chihantang:addEffect(fk.TurnEnd, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(chihantang.name)
  end,
  on_refresh = function(self, event, target, player, data)
    local room = player.room
    room:setPlayerMark(player, "chihantang_firstdamage-turn", 0)
    room:setPlayerMark(player, "chihantang_firsthurt-turn", 0)
  end,
})

return chihantang
