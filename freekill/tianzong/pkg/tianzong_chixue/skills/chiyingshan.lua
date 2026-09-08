local chiyingshan = fk.CreateSkill{ name = "chiyingshan" }
local U = require "packages.utility.utility"

local function valid_card(player, id)
  return table.contains(player:getCardIds("h"), id) and not U.isConnectedCard(id)
end

local function connect_and_reward(room, player, id)
  if not valid_card(player, id) then return end
  U.connectCards(room, id)
  local card = Fk:getCardById(id)
  if card:getNameLength(true) ~= player.hp then return end
  local choices = { "chiyingshan_more", "chiyingshan_disable" }
  if player:isWounded() then table.insert(choices, 1, "chiyingshan_recover") end
  local choice = room:askToChoice(player, { choices = choices, skill_name = chiyingshan.name, prompt = "#chiyingshan-choice" })
  if choice == "chiyingshan_recover" then
    room:recover{ who = player, num = 1, skillName = chiyingshan.name }
  elseif choice == "chiyingshan_more" then
    player:addSkillUseHistory(chiyingshan.name, -1)
  else
    room:setPlayerMark(player, "chishennie_disabled-turn", 1)
  end
end

chiyingshan:addEffect("active", {
  anim_type = "support",
  card_num = 1,
  target_num = 0,
  can_use = function(self, player)
    return player:usedSkillTimes(chiyingshan.name, Player.HistoryTurn) == 0
      and table.find(player:getCardIds("h"), function(id) return not U.isConnectedCard(id) end)
  end,
  card_filter = function(self, player, to_select, selected)
    return #selected == 0 and valid_card(player, to_select)
  end,
  on_use = function(self, room, effect)
    connect_and_reward(room, effect.from, effect.cards[1])
  end,
})

chiyingshan:addEffect(fk.Damaged, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chiyingshan.name)
      and player:usedSkillTimes(chiyingshan.name, Player.HistoryTurn) == 0
      and table.find(player:getCardIds("h"), function(id) return not U.isConnectedCard(id) end)
  end,
  on_cost = function(self, event, target, player, data)
    local cards = player.room:askToCards(player, { min_num = 1, max_num = 1, skill_name = chiyingshan.name, prompt = "#chiyingshan-card", cancelable = true })
    if #cards > 0 then event:setCostData(self, { cards = cards }); return true end
  end,
  on_use = function(self, event, target, player, data)
    connect_and_reward(player.room, player, event:getCostData(self).cards[1])
  end,
})

return chiyingshan
