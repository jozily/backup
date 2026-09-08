local niwoxuejiu = fk.CreateSkill{
  name = "niwoxuejiu",
  tags = { Skill.Compulsory },
}

local PILE = "niwoxuejiu_lie"

local function put_lie(player)
  local room = player.room
  if #room.draw_pile == 0 then return end
  local id = room.draw_pile[#room.draw_pile]
  player:addToPile(PILE, id, true, niwoxuejiu.name)
end

niwoxuejiu:addEffect(fk.GameStart, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(niwoxuejiu.name)
  end,
  on_use = function(self, event, target, player, data)
    for _, p in ipairs(player.room.alive_players) do put_lie(p) end
  end,
})

niwoxuejiu:addEffect(fk.Damage, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(niwoxuejiu.name) and data.to and data.to:isAlive()
  end,
  on_use = function(self, event, target, player, data) put_lie(data.to) end,
})

niwoxuejiu:addEffect(fk.Damaged, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(niwoxuejiu.name) and data.from and data.from:isAlive()
  end,
  on_use = function(self, event, target, player, data) put_lie(data.from) end,
})

niwoxuejiu:addEffect(fk.AfterCardsMove, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(niwoxuejiu.name) then return false end
    local names = {}
    for _, p in ipairs(player.room.players) do
      for _, id in ipairs(p:getPile(PILE)) do names[Fk:getCardById(id).trueName] = true end
    end
    for _, move in ipairs(data) do
      if move.toArea == Card.DiscardPile then
        for _, info in ipairs(move.moveInfo) do
          if info.fromSpecialName == PILE or names[Fk:getCardById(info.cardId).trueName] then return true end
        end
      end
    end
    return false
  end,
  on_use = function(self, event, target, player, data) player:drawCards(2, niwoxuejiu.name) end,
})

Fk:loadTranslationTable{ [PILE] = "裂" }
return niwoxuejiu
