
local function zhijian_num_text(i)
  local t = {
    [1] = "①",
    [2] = "②",
    [3] = "③",
    [4] = "④",
    [5] = "⑤",
    [6] = "⑥",
  }
  return t[i] or tostring(i)
end



local function zhijian_all_slots()
  return {"WeaponSlot","ArmorSlot","DefensiveRideSlot","OffensiveRideSlot","TreasureSlot"}
end

local function zhijian_get_aborted_count(player)
  return 5 - #player:getAvailableEquipSlots()
end

local function zhijian_get_available_count(player)
  return #player:getAvailableEquipSlots()
end

local function zhijian_get_slash_limit(player)
  local n = player:getMark("chizhijian_slash_limit-turn")
  if type(n) ~= "number" or n < 1 then return 1 end
  return n
end

local function zhijian_set_slash_limit(room, player, n)
  room:setPlayerMark(player, "chizhijian_slash_limit-turn", math.max(1, n))
end

local function zhijian_current_values(player)
  local vals = {}
  vals[1] = zhijian_get_aborted_count(player)
  vals[2] = zhijian_get_available_count(player)
  vals[3] = math.max(1, player.maxHp)
  vals[4] = math.max(1, zhijian_get_slash_limit(player))
  vals[5] = math.max(1, player.hp)
  vals[6] = math.max(1, player:getHandcardNum())
  return vals
end

local function zhijian_option_label(player, idx)
  local vals = zhijian_current_values(player)
  local names = {
    [1] = "已废除装备栏",
    [2] = "未废除装备栏",
    [3] = "体力上限",
    [4] = "额定攻击次数",
    [5] = "体力值",
    [6] = "手牌数",
  }
  return zhijian_num_text(idx) .. names[idx] .. "(" .. tostring(vals[idx]) .. ")"
end

local function zhijian_adjust_hand_to(room, player, n)
  n = math.max(1, n)
  if player.dead then return end
  local h = player:getHandcardNum()
  if h < n then
    player:drawCards(n - h, "chizhijian")
  elseif h > n then
    room:askToDiscard(player, {
      min_num = h - n,
      max_num = h - n,
      include_equip = false,
      skill_name = "chizhijian",
      cancelable = false,
    })
  end
end

local function zhijian_set_abort_count(room, player, want)
  want = math.max(0, math.min(5, want))
  local cur = zhijian_get_aborted_count(player)
  if cur == want then return end

  if cur < want then
    local need = want - cur
    local available = player:getAvailableEquipSlots()
    if #available == 0 then return end
    local choices = {}
    for i = 1, math.min(need, #available) do
      table.insert(choices, available[i])
    end
    room:abortPlayerArea(player, choices)
  else
    local need = cur - want
    local sealed = table.filter(zhijian_all_slots(), function(slot)
      return not table.contains(player:getAvailableEquipSlots(), slot)
    end)
    if #sealed == 0 then return end
    local choices = {}
    for i = 1, math.min(need, #sealed) do
      table.insert(choices, sealed[i])
    end
    room:resumePlayerArea(player, choices)
  end
end

local function zhijian_apply_values(room, player, vals)
  zhijian_set_abort_count(room, player, vals[1])

  local wantMax = math.max(1, vals[3])
  if player.maxHp ~= wantMax then
    room:changeMaxHp(player, wantMax - player.maxHp)
  end

  local wantHp = math.max(1, math.min(wantMax, vals[5]))
  if player.hp < wantHp then
    room:recover({
      who = player,
      num = wantHp - player.hp,
      recoverBy = player,
      skillName = "chizhijian",
    })
  elseif player.hp > wantHp then
    room:loseHp(player, player.hp - wantHp, "chizhijian")
  end

  zhijian_set_slash_limit(room, player, math.max(1, vals[4]))
  zhijian_adjust_hand_to(room, player, math.max(1, vals[6]))
end

local function zhijian_set_visible(room, player, version)
  room:setPlayerMark(player, "@chizhijian", version)
end

local function zhijian_clear_swap(room, player)
  room:setPlayerMark(player, "chizhijian_swap_a-turn", 0)
  room:setPlayerMark(player, "chizhijian_swap_b-turn", 0)
  room:setPlayerMark(player, "@chizhijian_swap", 1)
end

local function zhijian_set_swap(room, player, a, b)
  room:setPlayerMark(player, "chizhijian_swap_a-turn", a)
  room:setPlayerMark(player, "chizhijian_swap_b-turn", b)
  room:setPlayerMark(player, "@chizhijian_swap", 1)
end

local function zhijian_init_opts(player, remain_mark, version)
  local room = player.room
  local opts = version == 1 and {1,2,3,4} or {1,2,3,4,5,6}
  room:setPlayerMark(player, remain_mark, opts)
  room:setPlayerMark(player, "chizhijian_lastdelta-turn", 0)
  zhijian_clear_swap(room, player)
  zhijian_set_visible(room, player, version)
end

local function zhijian_swap_and_apply(room, player, a, b)
  local vals = zhijian_current_values(player)
  local delta = math.abs(vals[a] - vals[b])

  vals[a], vals[b] = vals[b], vals[a]
  zhijian_apply_values(room, player, vals)

  room:setPlayerMark(player, "chizhijian_lastdelta-turn", delta)
  room:setPlayerMark(player, "chizhijian_swap_a-turn", a)
  room:setPlayerMark(player, "chizhijian_swap_b-turn", b)
  room:setPlayerMark(player, "@chizhijian_swap", 1)
  return delta
end

local function zhijian_pick_random_two(room, opts)
  local picked = room:tableRandomPick(opts, 2)
  return picked[1], picked[2]
end

local function zhijian_pick_manual_two(room, player, opts, skill_name)
  local labels = {}
  local map = {}
  for _, i in ipairs(opts) do
    local label = zhijian_option_label(player, i)
    table.insert(labels, label)
    map[label] = i
  end

  local choice1 = room:askToChoice(player, {
    choices = labels,
    skill_name = skill_name,
    prompt = "#chizhijian-choose",
    cancelable = false,
  })
  local a = map[choice1]

  local remain = table.filter(opts, function(i) return i ~= a end)
  local labels2 = {}
  local map2 = {}
  for _, i in ipairs(remain) do
    local label = zhijian_option_label(player, i)
    table.insert(labels2, label)
    map2[label] = i
  end

  local choice2 = room:askToChoice(player, {
    choices = labels2,
    skill_name = skill_name,
    prompt = "#chizhijian-choose",
    cancelable = false,
  })
  local b = map2[choice2]

  return a, b
end

local chizhijian3 = fk.CreateSkill{
  name = "chizhijian3",
}
local OPT_MARK = "chizhijian3_options-round"

local function do_once(room, player)
  local opts = player:getTableMark(OPT_MARK)
  if type(opts) ~= "table" or #opts < 2 then return false end
  local a, b = zhijian_pick_random_two(room, opts)
  zhijian_swap_and_apply(room, player, a, b)
  table.removeOne(opts, a)
  table.removeOne(opts, b)
  room:setPlayerMark(player, OPT_MARK, opts)

  return true
end

chizhijian3.addZhijianOnce = function(room, player, expected_delta)
  local opts = player:getTableMark(OPT_MARK)
  if type(opts) ~= "table" or #opts < 2 then return false, 0 end

  local vals = zhijian_current_values(player)
  local pairs = {}
  for i = 1, #opts do
    for j = i + 1, #opts do
      local a, b = opts[i], opts[j]
      local d = math.abs(vals[a] - vals[b])
      if expected_delta == nil or d == expected_delta then
        table.insert(pairs, {a,b,d})
      end
    end
  end
  if #pairs == 0 then return false, 0 end

  local a, b, d
  if true then
    local p = room:tableRandomPick(pairs)
    a, b, d = p[1], p[2], p[3]
  else
    local a2, b2 = zhijian_pick_manual_two(room, player, opts, "chizhijian3")
    a, b = a2, b2
    d = math.abs(vals[a] - vals[b])
    if expected_delta ~= nil and d ~= expected_delta then return false, 0 end
  end

  zhijian_swap_and_apply(room, player, a, b)
  table.removeOne(opts, a)
  table.removeOne(opts, b)
  room:setPlayerMark(player, OPT_MARK, opts)

  return true, d
end

chizhijian3:addAcquireEffect(function(self, player, is_start)
  zhijian_init_opts(player, OPT_MARK, 3)
end)

chizhijian3:addEffect(fk.EventPhaseStart, {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chizhijian3.name) and player.phase == Player.Start and #player:getTableMark(OPT_MARK) >= 2
  end,
  on_use = function(self, event, target, player, data)
    do_once(player.room, player)
  end,
})

chizhijian3:addEffect(fk.Damaged, {
  anim_type = "masochism",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chizhijian3.name) and #player:getTableMark("chizhijian3_options-round") >= 2
  end,
  on_use = function(self, event, target, player, data)
    do_once(player.room, player)
  end,
})

chizhijian3:addEffect("targetmod", {
  residue_func = function(self, player, skill, scope, card)
    if card and card.trueName == "slash" then
      return zhijian_get_slash_limit(player) - 1
    end
  end,
})

chizhijian3:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chizhijian3.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    zhijian_init_opts(player, OPT_MARK, 3)
  end,
})

return chizhijian3
