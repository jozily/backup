local chiwangchen = fk.CreateSkill{
  name = "chiwangchen",
}

local U = require "packages.utility.utility"

local ROUND_MARK = "@$chiwangchen-round"

local function get_discard_top_id(room)
  local pile = room.discard_pile or {}
  return pile[#pile]
end

local function connect_big_cards_of_current(room, player, card)
  local current = room.current
  if not current or current.dead or not card then return end
  local point = card.number or 0
  local ids = current:getCardIds("h")
  for _, id in ipairs(ids) do
    local c = Fk:getCardById(id)
    if c and c.number > point and not U.isConnectedCard(c) then
      U.connectCards(room, id)
    end
  end
end

chiwangchen:addEffect(fk.StartPindian, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chiwangchen.name) then return false end
    local top = get_discard_top_id(player.room)
    if not top then return false end

    if player == data.from then
      return not data.fromCard
    else
      return table.contains(data.tos, player) and not (data.results[player] and data.results[player].toCard)
    end
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = chiwangchen.name,
      prompt = "#chiwangchen-invoke"
    })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local top = get_discard_top_id(room)
    if not top then return end
    local top_card = Fk:getCardById(top)

    if player == data.from then
      data.fromCard = top_card
    else
      data.results[player] = data.results[player] or {}
      data.results[player].toCard = top_card
    end

    connect_big_cards_of_current(room, player, top_card)
  end,
})

chiwangchen:addEffect(fk.AfterCardsMove, {
  anim_type = "drawcard",
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chiwangchen.name) then return false end

    for _, move in ipairs(data) do
      if move.toArea == Card.DiscardPile then
        for _, info in ipairs(move.moveInfo) do
          if U.isConnectedCard(info.cardId) then
            return true
          end
        end
      end
    end
    return false
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local obtain = {}

    for _, move in ipairs(data) do
      if move.toArea == Card.DiscardPile then
        for _, info in ipairs(move.moveInfo) do
          if U.isConnectedCard(info.cardId) then
            table.insertIfNeed(obtain, info.cardId)
          end
        end
      end
    end

    if #obtain > 0 then
      room:obtainCard(player, obtain, false, fk.ReasonPrey, player, chiwangchen.name)
      for _, id in ipairs(obtain) do
        room:addTableMark(player, ROUND_MARK, id)
      end
    end
  end,
})

chiwangchen:addEffect("maxcards", {
  exclude_from = function(self, player, card)
    local mark = player:getTableMark(ROUND_MARK)
    local id = card
    if type(card) ~= "number" and card and card.getEffectiveId then
      id = card:getEffectiveId()
    end
    return table.contains(mark, id)
  end,
})

chiwangchen:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chiwangchen.name)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, ROUND_MARK, 0)
  end,
})

return chiwangchen
