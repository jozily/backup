local niwotalan = fk.CreateSkill{ name = "niwotalan", tags = { Skill.Compulsory } }
local CARD_MARK = "@@niwotalan-inhand"

niwotalan:addEffect(fk.AfterCardsMove, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(niwotalan.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    local room = player.room
    for _, move in ipairs(data) do
      if move.to == player and move.toArea == Card.PlayerHand and player.phase ~= Player.Draw then
        for _, info in ipairs(move.moveInfo) do room:setCardMark(Fk:getCardById(info.cardId), CARD_MARK, 1) end
      end
      if move.from == player then
        for _, info in ipairs(move.moveInfo) do
          if info.fromArea == Card.PlayerHand and move.toArea ~= Card.Processing then
            room:setCardMark(Fk:getCardById(info.cardId), CARD_MARK, 0)
          end
        end
      end
    end
  end,
})

niwotalan:addEffect("targetmod", {
  bypass_times = function(self, player, skill, scope, card, to)
    return player:hasSkill(niwotalan.name) and card and card:getMark(CARD_MARK) > 0
  end,
})

niwotalan:addEffect("maxcards", {
  exclude_from = function(self, player, card)
    return player:hasSkill(niwotalan.name) and card:getMark(CARD_MARK) > 0
  end,
})

Fk:loadTranslationTable{ [CARD_MARK] = "踏澜" }
return niwotalan
