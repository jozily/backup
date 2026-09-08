local U = require "packages.utility.utility"

local M = {}

function M.get_skill_names(player)
  local names = {}
  for _, general_name in ipairs({ player.general, player.deputyGeneral }) do
    local general = general_name and Fk.generals[general_name]
    if general then table.insertTableIfNeed(names, general:getSkillNameList(true)) end
  end
  return names
end

-- 注意：这里只保留原本稳定的4种基础牌名，避免影响孤凫/恢复逻辑
M.all_basic_names = {
  "slash",
  "jink",
  "peach",
  "analeptic",
}

function M.get_removed(player)
  return player:getTableMark("@$chijinghong")
end

function M.get_unremoved_names(player)
  local removed = M.get_removed(player)
  return table.filter(M.all_basic_names, function(name)
    return not table.contains(removed, name)
  end)
end

function M.get_unremoved_count(player)
  return #M.get_unremoved_names(player)
end

function M.premeditate_n(room, player, n, from_place, skill_name)
  if n <= 0 then return {} end
  if table.contains(player.sealedSlots, Player.JudgeSlot) then return {} end

  local result = {}

  if from_place == "bottom" then
    local pile = room.draw_pile
    local cnt = math.min(n, #pile)
    for i = 1, cnt do
      local id = pile[#pile]
      if not id then break end
      U.premeditate(player, { id }, skill_name)
      table.insert(result, id)
    end
  else
    local cnt = math.min(n, #room.draw_pile)
    for i = 1, cnt do
      local ids = room:getNCards(1)
      if #ids == 0 then break end
      U.premeditate(player, ids, skill_name)
      table.insert(result, ids[1])
    end
  end

  return result
end

function M.restore_removed_from_cards(room, player, ids)
  local removed = player:getTableMark("@$chijinghong")
  if #removed == 0 then return 0 end

  local restored = {}
  for _, id in ipairs(ids) do
    local c = Fk:getCardById(id)
    if c and table.contains(removed, c.trueName) then
      table.insertIfNeed(restored, c.trueName)
    end
  end

  for _, name in ipairs(restored) do
    room:removeTableMark(player, "@$chijinghong", name)
  end
  return #restored
end

return M
