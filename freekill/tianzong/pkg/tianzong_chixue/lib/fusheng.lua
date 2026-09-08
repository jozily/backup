local M = {}

M.REMOVED_MARK = "chifusheng_removed-round"

local function equip_values(player)
  local available = #player:getAvailableEquipSlots()
  return 5 - available, available
end

function M.value(player, index)
  if index == 1 then return (equip_values(player)) end
  if index == 2 then return select(2, equip_values(player)) end
  if index == 3 then return player.maxHp end
  if index == 4 then return player:usedCardTimes("slash", Player.HistoryPhase) end
  if index == 5 then return player:getHandcardNum() end
  return player.hp
end

local function can_set(index, value)
  if index == 1 or index == 2 then return value >= 0 and value <= 5 end
  if index == 3 then return value >= 1 end
  return value >= 0
end

function M.available_pairs(player)
  local removed = player:getTableMark(M.REMOVED_MARK)
  local pairs = {}
  for first = 1, 5 do
    if not table.contains(removed, first) then
      for second = first + 1, 6 do
        if not table.contains(removed, second) and
          can_set(first, M.value(player, second)) and can_set(second, M.value(player, first)) then
          table.insert(pairs, { first, second })
        end
      end
    end
  end
  return pairs
end

local function set_equip_count(room, player, abolished)
  abolished = math.max(0, math.min(5, abolished))
  local current = 5 - #player:getAvailableEquipSlots()
  if current < abolished then
    local slots = player:getAvailableEquipSlots()
    room:abortPlayerArea(player, room:tableRandomPick(slots, abolished - current))
  elseif current > abolished then
    local slots = table.filter(player.sealedSlots, function(slot)
      return slot ~= Player.JudgeSlot
    end)
    slots = room:tableRandomPick(slots, current - abolished)
    for _, slot in ipairs(slots) do room:resumePlayerArea(player, slot) end
  end
end

local function set_value(room, player, index, value, skill_name)
  if index == 1 then
    set_equip_count(room, player, value)
  elseif index == 2 then
    set_equip_count(room, player, 5 - value)
  elseif index == 3 then
    room:changeMaxHp(player, value - player.maxHp)
  elseif index == 4 then
    player:setCardUseHistory("slash", value, Player.HistoryPhase)
  elseif index == 5 then
    local n = value - player:getHandcardNum()
    if n > 0 then
      player:drawCards(n, skill_name)
    elseif n < 0 then
      room:askToDiscard(player, {
        min_num = -n, max_num = -n, include_equip = false, cancelable = false,
        skill_name = skill_name, prompt = "#chifusheng-discard:::" .. (-n),
      })
    end
  elseif value > player.hp then
    local n = math.min(value, player.maxHp) - player.hp
    if n > 0 then room:recover{ who = player, num = n, recoverBy = player, skillName = skill_name } end
  elseif value < player.hp then
    room:loseHp(player, player.hp - value, skill_name)
  end
end

function M.activate(room, player, skill_name, cancelable)
  local pairs = M.available_pairs(player)
  if #pairs == 0 then return false end
  local choices = table.map(pairs, function(pair)
    return "chifusheng_pair" .. pair[1] .. pair[2]
  end)
  local choice = room:askToChoice(player, {
    choices = choices, all_choices = choices, skill_name = skill_name,
    prompt = "#chifusheng-pair", cancelable = cancelable,
  })
  if not choice or choice == "Cancel" then return false end
  local first, second = tonumber(string.sub(choice, -2, -2)), tonumber(string.sub(choice, -1))
  local first_value, second_value = M.value(player, first), M.value(player, second)
  room:addTableMarkIfNeed(player, M.REMOVED_MARK, first)
  room:addTableMarkIfNeed(player, M.REMOVED_MARK, second)

  if first == 3 then set_value(room, player, first, second_value, skill_name) end
  if second == 3 then set_value(room, player, second, first_value, skill_name) end
  if first ~= 3 and player:isAlive() then set_value(room, player, first, second_value, skill_name) end
  if second ~= 3 and player:isAlive() then set_value(room, player, second, first_value, skill_name) end
  return true
end

function M.restore_equal(room, player)
  local removed = player:getTableMark(M.REMOVED_MARK)
  local restore = {}
  for i = 1, #removed - 1 do
    for j = i + 1, #removed do
      if M.value(player, removed[i]) == M.value(player, removed[j]) then
        table.insertIfNeed(restore, removed[i])
        table.insertIfNeed(restore, removed[j])
      end
    end
  end
  for _, index in ipairs(restore) do room:removeTableMark(player, M.REMOVED_MARK, index) end
  return #restore > 0
end

return M
