local niwotianmeng_mark = fk.CreateSkill{ name = "niwotianmeng_mark" }

local CARD_MARK = "@@niwo_mo"
local OWNER_MARK = "niwo_mo_owner"

local function valid_targets(player)
  return table.filter(Fk:currentRoom():getOtherPlayers(player), function(p) return not p:isNude() end)
end

local function mark_cards(room, player, target)
  local own = room:askToChooseCard(player, {
    target = player,
    flag = "hej",
    skill_name = "niwotianmeng",
    prompt = "#niwotianmeng-card::" .. player.id,
  })
  local other = room:askToChooseCard(player, {
    target = target,
    flag = "hej",
    skill_name = "niwotianmeng",
    prompt = "#niwotianmeng-card::" .. target.id,
  })
  if not own or not other then return end
  local own_card, other_card = Fk:getCardById(own), Fk:getCardById(other)
  room:setCardMark(own_card, CARD_MARK, 1)
  room:setCardMark(own_card, OWNER_MARK, player.id)
  room:setCardMark(other_card, CARD_MARK, 1)
  room:setCardMark(other_card, OWNER_MARK, target.id)
end

niwotianmeng_mark:addEffect("active", {
  card_num = 0,
  target_num = 1,
  max_phase_use_time = 1,
  can_use = function(self, player)
    return player:hasSkill("niwotianmeng") and not player:isNude() and #valid_targets(player) > 0
  end,
  target_filter = function(self, player, to_select, selected)
    return #selected == 0 and to_select ~= player and not to_select:isNude()
  end,
  on_use = function(self, room, effect)
    mark_cards(room, effect.from, effect.tos[1])
  end,
})

niwotianmeng_mark:addEffect(fk.Damaged, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill("niwotianmeng") and not player:isNude() and
      #valid_targets(player) > 0
  end,
  on_cost = function(self, event, target, player, data)
    local tos = player.room:askToChoosePlayers(player, {
      targets = valid_targets(player),
      min_num = 1,
      max_num = 1,
      skill_name = "niwotianmeng",
      prompt = "#niwotianmeng-choose",
      cancelable = true,
    })
    if #tos > 0 then event:setCostData(self, { to = tos[1] }); return true end
  end,
  on_use = function(self, event, target, player, data)
    mark_cards(player.room, player, event:getCostData(self).to)
  end,
})

Fk:loadTranslationTable{
  ["niwotianmeng_mark"] = "殄梦·标记",
  [":niwotianmeng_mark"] = "出牌阶段限一次，或当你受到伤害后，你可以标记你与一名其他角色的一张牌为“殁”。",
}

return niwotianmeng_mark
