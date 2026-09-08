local chiyidi = fk.CreateSkill{ name = "chiyidi" }
local TARGET_USED = "chiyidi_target-round"
local MODIFY_USED = "chiyidi_modify-round"
local BAN_NAME = "@chiyidi_name"
local BAN_COLOR = "@chiyidi_color"

chiyidi:addEffect(fk.SkillEffect, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chiyidi.name) and data.who and data.who ~= player and player:getMark(TARGET_USED) == 0
      and data.skill and data.skill.name ~= chiyidi.name and data.skill_data and #(data.skill_data.tos or {}) > 0
  end,
  on_cost = function(self, event, target, player, data)
    local targets = table.filter(data.skill_data.tos, function(p) return p:isAlive() end)
    if #targets == 0 then return false end
    local chosen = player.room:askToChoosePlayers(player, { targets = targets, min_num = 1, max_num = 1, skill_name = chiyidi.name, prompt = "#chiyidi-target::" .. data.who.id, cancelable = true })
    if #chosen > 0 then event:setCostData(self, { tos = chosen }); return true end
  end,
  on_use = function(self, event, target, player, data)
    player.room:setPlayerMark(player, TARGET_USED, 1)
    data.skill_data.tos = event:getCostData(self).tos
  end,
})

local function modify(room, player)
  local chosen = room:askToChoosePlayers(player, { targets = room.alive_players, min_num = 1, max_num = 1, skill_name = chiyidi.name, prompt = "#chiyidi-modify", cancelable = true })
  if #chosen == 0 then return false end
  local target = chosen[1]
  local kind = room:askToChoice(player, { choices = { "chiyidi_cardname", "chiyidi_color" }, skill_name = chiyidi.name })
  if kind == "chiyidi_color" then
    local color = room:askToChoice(player, { choices = { "red", "black" }, skill_name = chiyidi.name })
    room:setPlayerMark(target, BAN_COLOR, color)
  else
    local names = Fk:getAllCardNames("bt")
    local name = room:askToChoice(player, { choices = names, skill_name = chiyidi.name, prompt = "#chiyidi-name" })
    room:setPlayerMark(target, BAN_NAME, name)
  end
  room:setPlayerMark(player, MODIFY_USED, 1)
  return true
end

chiyidi:addEffect("active", {
  card_num = 0, target_num = 0,
  can_use = function(self, player) return player:getMark(MODIFY_USED) == 0 end,
  on_use = function(self, room, effect) modify(room, effect.from) end,
})
chiyidi:addEffect(fk.Damaged, {
  can_trigger = function(self, event, target, player, data) return target == player and player:hasSkill(chiyidi.name) and player:getMark(MODIFY_USED) == 0 end,
  on_cost = function(self, event, target, player, data) return player.room:askToSkillInvoke(player, { skill_name = chiyidi.name, prompt = "#chiyidi-invoke" }) end,
  on_use = function(self, event, target, player, data) modify(player.room, player) end,
})
chiyidi:addEffect("prohibit", {
  prohibit_use = function(self, player, card)
    local name, color = player:getMark(BAN_NAME), player:getMark(BAN_COLOR)
    return name ~= 0 and card.name == name or color ~= 0 and card:getColorString() == color
  end,
  prohibit_response = function(self, player, card)
    local name, color = player:getMark(BAN_NAME), player:getMark(BAN_COLOR)
    return name ~= 0 and card.name == name or color ~= 0 and card:getColorString() == color
  end,
})

return chiyidi
