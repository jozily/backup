local chimaoqi = fk.CreateSkill{ name = "chimaoqi" }

chimaoqi:addEffect(fk.AfterCardsMove, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chimaoqi.name) or player.phase == Player.Draw then return false end
    return table.find(data, function(move)
      return move.to == player and move.toArea == Card.PlayerHand and #move.moveInfo > 0
    end)
  end,
  on_cost = function(self, event, target, player, data)
    local ids = {}
    for _, move in ipairs(data) do
      if move.to == player and move.toArea == Card.PlayerHand then
        for _, info in ipairs(move.moveInfo) do table.insert(ids, info.cardId) end
      end
    end
    local chosen = player.room:askToCards(player, { min_num = 1, max_num = #ids, pattern = tostring(Exppattern{ id = ids }), skill_name = chimaoqi.name, prompt = "#chimaoqi-put", cancelable = true })
    if #chosen > 0 then event:setCostData(self, { cards = chosen }); return true end
  end,
  on_use = function(self, event, target, player, data)
    player:addToPile("chimaoqi", event:getCostData(self).cards, true, chimaoqi.name)
  end,
})

chimaoqi:addEffect("active", {
  anim_type = "drawcard",
  card_num = 0,
  target_num = 0,
  can_use = function(self, player) return #player:getPile("chimaoqi") > 0 and player:usedSkillTimes(chimaoqi.name, Player.HistoryPhase) == 0 end,
  on_use = function(self, room, effect)
    local pile = effect.from:getPile("chimaoqi")
    local chosen = room:askToCards(effect.from, {
      min_num = 1,
      max_num = #pile,
      pattern = tostring(Exppattern{ id = pile }),
      expand_pile = pile,
      skill_name = chimaoqi.name,
      prompt = "#chimaoqi-gain",
      cancelable = false,
    })
    room:obtainCard(effect.from, chosen, true, fk.ReasonPrey, effect.from, chimaoqi.name)
  end,
})

chimaoqi:addEffect(fk.TurnEnd, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chimaoqi.name) and #player:getPile("chimaoqi") > #player.room.alive_players
  end,
  on_use = function(self, event, target, player, data)
    player.room:loseHp(player, 1, chimaoqi.name)
  end,
})

return chimaoqi
