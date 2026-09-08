local niwozhuohun = fk.CreateSkill{
  name = "niwozhuohun",
}

local INVALID_MARK = "@@niwozhuohun_invalid-turn"

niwozhuohun:addEffect(fk.RoundStart, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(niwozhuohun.name)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local id = table.find(room.discard_pile, function(cid)
      return Fk:getCardById(cid).name == "tianzong_chixuanjian"
    end)
    if not id then
      for _, p in ipairs(room.alive_players) do
        id = table.find(p:getCardIds("ej"), function(cid)
          return Fk:getCardById(cid).name == "tianzong_chixuanjian"
        end)
        if id then break end
      end
    end
    if id then
      room:moveCardTo(id, Card.PlayerEquip, player, fk.ReasonPut, niwozhuohun.name, nil, true, player)
    end
  end,
})

niwozhuohun:addEffect(fk.TargetSpecified, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(niwozhuohun.name) or data.card.trueName ~= "slash" then return false end
    local suit = data.card.suit
    return suit ~= Card.NoSuit and table.find(player.room.alive_players, function(p)
      return p ~= player and not table.find(p:getCardIds("ej"), function(id) return Fk:getCardById(id).suit == suit end)
    end)
  end,
  on_use = function(self, event, target, player, data)
    local room, suit = player.room, data.card.suit
    for _, p in ipairs(room.alive_players) do
      if p ~= player and not table.find(p:getCardIds("ej"), function(id) return Fk:getCardById(id).suit == suit end) then
        room:setPlayerMark(p, INVALID_MARK, 1)
      end
    end
  end,
})

niwozhuohun:addEffect("invalidity", {
  recheck_invalidity = true,
  invalidity_func = function(self, from, skill)
    return from:getMark(INVALID_MARK) > 0 and skill:isPlayerSkill(from) and not skill:hasTag(Skill.Compulsory)
  end,
})

return niwozhuohun
