local chijiwang = fk.CreateSkill{
  name = "chijiwang",
  tags = { Skill.Compulsory },
}

local SUIT_BANNER = "chijiwang_suits-turn"
local EXTRA_MARK = "chijiwang_extra_target-turn"

local function add_suit(room, suit)
  local suits = room:getBanner(SUIT_BANNER) or {}
  table.insertIfNeed(suits, suit)
  room:setBanner(SUIT_BANNER, suits)
end

chijiwang:addEffect(fk.BeforeCardsMove, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chijiwang.name) then return false end
    return table.find(data, function(move)
      return move.from == player and not table.contains({ fk.ReasonUse, fk.ReasonResponse }, move.moveReason)
        and table.find(move.moveInfo, function(info) return info.fromArea == Card.PlayerHand end)
    end)
  end,
  on_use = function(self, event, target, player, data)
    for _, move in ipairs(data) do
      if move.from == player and not table.contains({ fk.ReasonUse, fk.ReasonResponse }, move.moveReason) then
        for _, info in ipairs(move.moveInfo) do
          if info.fromArea == Card.PlayerHand then
            local card = Fk:getCardById(info.cardId)
            player:showCards(info.cardId)
            if card.suit ~= Card.NoSuit then add_suit(player.room, card.suit) end
          end
        end
      end
    end
  end,
})

chijiwang:addEffect("filter", {
  card_filter = function(self, card, player)
    return card.suit ~= Card.NoSuit and table.contains(Fk:currentRoom():getBanner(SUIT_BANNER) or {}, card.suit)
      and table.contains(player:getCardIds("h"), card.id)
  end,
  view_as = function(self, player, card)
    return Fk:cloneCard("slash", card.suit, card.number)
  end,
})

chijiwang:addEffect(fk.TargetConfirmed, {
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(chijiwang.name) or not data.card then return false end
    local targets = data.use.tos or {}
    return #targets > 1 and table.every(targets, function(p) return p == player or p:getLostHp() <= player:getLostHp() end)
  end,
  on_use = function(self, event, target, player, data)
    if player.room.current and player.room.current:isAlive() then
      player.room:setPlayerMark(player.room.current, EXTRA_MARK, player.id)
    end
  end,
})

chijiwang:addEffect(fk.TargetSpecified, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:getMark(EXTRA_MARK) ~= 0 and data.firstTarget
  end,
  on_use = function(self, event, target, player, data)
    local id = player:getMark(EXTRA_MARK)
    player.room:setPlayerMark(player, EXTRA_MARK, 0)
    local extra = player.room:getPlayerById(id)
    if extra and extra:isAlive() and table.contains(data.tos or {}, extra) then
      data.additionalEffectToPlayer = data.additionalEffectToPlayer or {}
      data.additionalEffectToPlayer[extra] = (data.additionalEffectToPlayer[extra] or 0) + 1
    end
  end,
})

chijiwang:addEffect(fk.TurnEnd, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chijiwang.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setBanner(SUIT_BANNER, nil)
  end,
})

return chijiwang
