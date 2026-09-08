local chilique = fk.CreateSkill{
  name = "chilique",
  tags = { Skill.Compulsory },
}
local PATH = "@chilique_path-turn"
local LAST = "chilique_last-turn"
local COUNT = "chilique_count-turn"
local INVALID = "chilique_invalid-turn"

local function add_targets(room, player, data, number)
  local current = data.tos or {}
  local candidates = table.filter(room.alive_players, function(p)
    return not table.contains(current, p) and not player:isProhibited(p, data.card)
      and data.card.skill:modTargetFilter(player, p, current, data.card, { bypass_times = true })
  end)
  if #candidates == 0 then return end
  local chosen = room:askToChoosePlayers(player, { targets = candidates, min_num = 1, max_num = math.min(number, #candidates), skill_name = chilique.name, prompt = "#chilique-target:::" .. number, cancelable = false })
  for _, p in ipairs(chosen) do data:addTarget(p) end
end

local function apply_effect(room, player, data, path, index)
  if path == "chilique_increase" then
    if index == 1 then data.extraUse = true
    elseif index == 2 then data.additionalEffect = (data.additionalEffect or 0) + 1
    elseif index == 3 then add_targets(room, player, data, 1)
    else data.additionalEffect = (data.additionalEffect or 0) + index - 1 end
  else
    if index == 1 then data.additionalEffect = (data.additionalEffect or 0) + 1
    elseif index == 2 then add_targets(room, player, data, 1)
    elseif index == 3 then data.extraUse = true
    else add_targets(room, player, data, index) end
  end
end

chilique:addEffect(fk.AfterCardUseDeclared, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chilique.name) and player:getMark(INVALID) == 0 and data.card
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local count = player:getMark(COUNT) + 1
    local path = player:getMark(PATH)
    if path == 0 then
      path = room:askToChoice(player, { choices = { "chilique_increase", "chilique_decrease" }, skill_name = chilique.name, prompt = "#chilique-path" })
      room:setPlayerMark(player, PATH, path)
    else
      local last = player:getMark(LAST)
      local length = data.card:getNameLength(true)
      local valid = path == "chilique_increase" and length > last or path == "chilique_decrease" and length < last
      if not valid then
        room:setPlayerMark(player, INVALID, 1)
        local n = math.min(count, #player:getCardIds("he"))
        if n > 0 then room:askToDiscard(player, { min_num = n, max_num = n, include_equip = true, skill_name = chilique.name, cancelable = false }) end
        return
      end
    end
    room:setPlayerMark(player, COUNT, count)
    room:setPlayerMark(player, LAST, data.card:getNameLength(true))
    apply_effect(room, player, data, path, count)
    if count == player.hp then apply_effect(room, player, data, path == "chilique_increase" and "chilique_decrease" or "chilique_increase", count) end
  end,
})

return chilique
