local niwonilin = fk.CreateSkill{ name = "niwonilin" }
local REMOVE_MARK = "@@niwonilin-turn"
local COUNT_MARK = "niwonilin_count"
local EQUIP_MARK = "niwonilin_equips-turn"

niwonilin:addEffect(fk.Damaged, {
  anim_type = "defensive",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(niwonilin.name)
      and player:usedSkillTimes(niwonilin.name, Player.HistoryRound) == 0
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, { skill_name = niwonilin.name, prompt = "#niwonilin-invoke" })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    room:addPlayerMark(player, COUNT_MARK, 1)
    player:drawCards(math.min(player:getMark(COUNT_MARK), #room.alive_players), niwonilin.name)
    room:setPlayerMark(player, REMOVE_MARK, 1)
  end,
})

niwonilin:addEffect(fk.AfterCardsMove, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(niwonilin.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    for _, move in ipairs(data) do
      if move.toArea == Card.DiscardPile then
        for _, info in ipairs(move.moveInfo) do
          if Fk:getCardById(info.cardId).type == Card.TypeEquip then
            player.room:addTableMarkIfNeed(player, EQUIP_MARK, info.cardId)
          end
        end
      end
    end
  end,
})

niwonilin:addEffect(fk.TurnEnd, {
  can_trigger = function(self, event, target, player, data)
    return player:getMark(REMOVE_MARK) > 0
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    room:setPlayerMark(player, REMOVE_MARK, 0)
    local ids = table.filter(player:getTableMark(EQUIP_MARK), function(id)
      return table.contains(room.discard_pile, id) and player:canMoveCardIntoEquip(id, false)
    end)
    if #ids > 0 then
      room:moveCardTo(room:tableRandomPick(ids), Card.PlayerEquip, player, fk.ReasonPut, niwonilin.name, nil, true, player)
    end
  end,
})

niwonilin:addEffect("targetmod", {
  remove_func = function(self, player) return player:getMark(REMOVE_MARK) > 0 end,
})

Fk:loadTranslationTable{
  ["#niwonilin-invoke"] = "逆鳞：是否摸X张牌并移出游戏直到回合结束？",
  [REMOVE_MARK] = "逆鳞",
}
return niwonilin
