local chishangjiao = fk.CreateSkill{
  name = "chishangjiao",
  tags = { Skill.Compulsory },
}

local HAND_EXCLUDE_MARK = "chishangjiao_hand-round"

chishangjiao:addEffect(fk.TargetConfirming, {
  anim_type = "defensive",
  can_trigger = function(self, event, target, player, data)
    local room = player.room
    local current = room.current
    if not (target == player and player:hasSkill(chishangjiao.name) and current and data.card and not data.cancelled) then
      return false
    end
    if player:usedSkillTimes(chishangjiao.name, Player.HistoryTurn) > 0 then
      return false
    end
    return true
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local current = room.current
    local diff = math.abs(data.card:getNameLength(true) - current.hp)
    if diff <= 0 then return end

    local tos = data.use.tos or {}
    if data.card:getNameLength(true) < current.hp then
      for _, p in ipairs(tos) do
        if p and p:isAlive() then
          p:drawCards(diff, chishangjiao.name)
        end
      end
    elseif data.card:getNameLength(true) > current.hp then
      for _, p in ipairs(tos) do
        if p and p:isAlive() then
          room:askToDiscard(p, {
            skill_name = chishangjiao.name,
            min_num = math.min(diff, #p:getCardIds("he")),
            max_num = math.min(diff, #p:getCardIds("he")),
            include_equip = true,
            cancelable = false,
          })
        end
      end
    end
  end,
})

chishangjiao:addEffect(fk.AfterCardsMove, {
  mute = true,
  can_refresh = function(self, event, target, player, data)
    if not player:hasSkill(chishangjiao.name, true) then return false end
    local room = player.room
    if room.current and room.current.phase == Player.Draw then
      return false
    end

    for _, move in ipairs(data) do
      if move.to == player and move.toArea == Card.PlayerHand then
        return true
      end
    end
    return false
  end,
  on_refresh = function(self, event, target, player, data)
    local room = player.room
    for _, move in ipairs(data) do
      if move.to == player and move.toArea == Card.PlayerHand then
        for _, info in ipairs(move.moveInfo) do
          room:addTableMark(player, HAND_EXCLUDE_MARK, info.cardId)
          local card = Fk:getCardById(info.cardId)
          if card then
            room:setCardMark(card, "@@chishangjiao_round", 1)
          end
        end
      end
    end
  end,
})

chishangjiao:addEffect("maxcards", {
  exclude_from = function(self, player, card)
    local mark = player:getTableMark(HAND_EXCLUDE_MARK)
    local id = card
    if type(card) ~= "number" and card and card.getEffectiveId then
      id = card:getEffectiveId()
    end
    return table.contains(mark, id)
  end,
})

chishangjiao:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chishangjiao.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    local room = player.room
    -- 清可见牌标记
    local ids = player:getTableMark(HAND_EXCLUDE_MARK)
    if type(ids) == "table" then
      for _, id in ipairs(ids) do
        local c = Fk:getCardById(id)
        if c then
          room:setCardMark(c, "@@chishangjiao_round", 0)
        end
      end
    end
    room:setPlayerMark(player, HAND_EXCLUDE_MARK, 0)
  end,
})

return chishangjiao
