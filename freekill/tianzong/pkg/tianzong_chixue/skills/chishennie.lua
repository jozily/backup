local chishennie = fk.CreateSkill{
  name = "chishennie",
  tags = { Skill.Compulsory },
}
local U = require "packages.utility.utility"
local LENGTH_MARK = "chishennie_lengths-turn"

chishennie:addEffect(fk.AfterCardsMove, {
  mute = true,
  can_refresh = function(self, event, target, player, data)
    if not player:hasSkill(chishennie.name, true) then return false end
    return table.find(data, function(move)
      return move.to == player and move.toArea == Card.PlayerHand and table.find(move.moveInfo, function(info)
        return Fk:getCardById(info.cardId).type == Card.TypeTrick and not U.isConnectedCard(info.cardId)
      end)
    end)
  end,
  on_refresh = function(self, event, target, player, data)
    for _, move in ipairs(data) do
      if move.to == player and move.toArea == Card.PlayerHand then
        for _, info in ipairs(move.moveInfo) do
          local card = Fk:getCardById(info.cardId)
          if card.type == Card.TypeTrick and not U.isConnectedCard(card) then U.connectCards(player.room, info.cardId) end
        end
      end
    end
  end,
})

local damage_spec = {
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(chishennie.name) then return false end
    local other = data.from == player and data.to or data.from
    return other and other:isAlive() and not other:isKongcheng()
  end,
  on_use = function(self, event, target, player, data)
    local other = data.from == player and data.to or data.from
    local id = player.room:askToChooseCard(player, { target = other, flag = "h", skill_name = chishennie.name, prompt = "#chishennie-connect::" .. other.id })
    if id and id ~= -1 and not U.isConnectedCard(id) then U.connectCards(player.room, id) end
  end,
}
chishennie:addEffect(fk.Damage, damage_spec)
chishennie:addEffect(fk.Damaged, damage_spec)

chishennie:addEffect(fk.AfterCardsMove, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chishennie.name) or player:getMark("chishennie_disabled-turn") > 0 then return false end
    return table.find(data, function(move)
      return move.toArea == Card.DiscardPile and table.contains({ fk.ReasonUse, fk.ReasonResponse }, move.moveReason)
        and table.find(move.moveInfo, function(info) return (info.extra_data or {}).isConnectedCard end)
    end)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    for _, move in ipairs(data) do
      if move.toArea == Card.DiscardPile and table.contains({ fk.ReasonUse, fk.ReasonResponse }, move.moveReason) then
        for _, info in ipairs(move.moveInfo) do
          if (info.extra_data or {}).isConnectedCard then
            room:addTableMarkIfNeed(player, LENGTH_MARK, Fk:getCardById(info.cardId):getNameLength(true))
          end
        end
      end
    end
    player:drawCards(1, chishennie.name)
  end,
})

chishennie:addEffect("prohibit", {
  prohibit_use = function(self, player, card)
    return table.contains(player:getTableMark(LENGTH_MARK), card:getNameLength(true))
  end,
  prohibit_response = function(self, player, card)
    return table.contains(player:getTableMark(LENGTH_MARK), card:getNameLength(true))
  end,
  prohibit_discard = function(self, player, card)
    return U.isConnectedCard(card)
  end,
})

chishennie:addEffect("maxcards", {
  exclude_from = function(self, player, card) return U.isConnectedCard(card) end,
})

chishennie:addEffect("targetmod", {
  bypass_times = function(self, player, skill, scope, card) return card and U.isConnectedCard(card) end,
  bypass_distances = function(self, player, skill, card) return card and U.isConnectedCard(card) end,
})

return chishennie
