local chixingjue = fk.CreateSkill{
  name = "chixingjue",
  tags = { Skill.Compulsory },
}

-- 正确语义：
-- “你的回合内/外” 里的“你”指庞凤衣自己，不是每个角色自己
local function condition_met(card, owner)
  local room = Fk:currentRoom()
  if not room or not room.current then return false end
  if not card then return false end

  local len = card:getNameLength(true)
  local hp = owner.hp

  -- 当前回合角色若拥有醒釂，则视为“你的回合内”
  local in_pangfengyi_turn = room.current:hasSkill(chixingjue.name, true)

  if in_pangfengyi_turn then
    return len > hp
  else
    return len < hp
  end
end

local function refresh_xu_marks(room)
  for _, p in ipairs(room.alive_players) do
    for _, id in ipairs(p:getCardIds("h")) do
      local c = Fk:getCardById(id)
      if c then
        room:setCardMark(c, "@@chixingjue_xu", condition_met(c, p) and 1 or 0)
      end
    end
    p:filterHandcards()
  end
end

chixingjue:addEffect("filter", {
  mute = true,
  card_filter = function(self, card, player, isJudgeEvent)
    return table.contains(player:getCardIds("h"), card.id) and card:getMark("@@chixingjue_xu") > 0
  end,
  view_as = function(self, player, card)
    return Fk:cloneCard("analeptic", card.suit, card.number)
  end,
})

chixingjue:addEffect(fk.TurnStart, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chixingjue.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    refresh_xu_marks(player.room)
  end,
})

chixingjue:addEffect(fk.AfterCardsMove, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chixingjue.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    refresh_xu_marks(player.room)
  end,
})

return chixingjue
