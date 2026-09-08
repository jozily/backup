local chimingzhi = fk.CreateSkill{
  name = "chimingzhi",
  tags = { Skill.Compulsory },
}

local TURN_MARK = "chimingzhi_suits-turn"

local function suit_symbol(s)
  if s == "log_spade" then return "♠" end
  if s == "log_heart" then return "♥" end
  if s == "log_club" then return "♣" end
  if s == "log_diamond" then return "♦" end
  return s or ""
end

local function condition_met(card, owner)
  local room = Fk:currentRoom()
  if not room or not room.current then return false end
  if not card then return false end

  local len = card:getNameLength(true)
  local hp = owner.hp
  local in_pangfengyi_turn = room.current:hasSkill("chixingjue", true)

  if in_pangfengyi_turn then
    return len > hp
  else
    return len < hp
  end
end

local function is_xu_card_of_suit(owner, suit)
  for _, id in ipairs(owner:getCardIds("h")) do
    local c = Fk:getCardById(id)
    if c and c:getSuitString(true) == suit and condition_met(c, owner) then
      return true
    end
  end
  return false
end

local function count_remaining_suits(player)
  local suits = {}
  for _, id in ipairs(player:getCardIds("h")) do
    local c = Fk:getCardById(id)
    if c then
      table.insertIfNeed(suits, c:getSuitString(true))
    end
  end
  return #suits
end

Fk:addQmlMark{
  name = "chimingzhi",
  how_to_show = function(name, value, p)
    if not p then return "" end
    local suits = p:getTableMark(TURN_MARK)
    if type(suits) ~= "table" or #suits == 0 then return "" end
    return table.concat(table.map(suits, suit_symbol), "/")
  end,
}

chimingzhi:addEffect(fk.AfterCardsMove, {
  anim_type = "drawcard",
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chimingzhi.name) then return false end

    for _, move in ipairs(data) do
      local owner = move.from
      if owner and owner:isAlive() then
        local lost_xu_suits = {}

        for _, info in ipairs(move.moveInfo) do
          if info.fromArea == Card.PlayerHand then
            local c = Fk:getCardById(info.cardId, true)
            if c and condition_met(c, owner) then
              local suit = c:getSuitString(true)
              table.insertIfNeed(lost_xu_suits, suit)
            end
          end
        end

        for _, suit in ipairs(lost_xu_suits) do
          if not is_xu_card_of_suit(owner, suit) then
            event:setCostData(self, { tos = { owner }, suit = suit })
            return true
          end
        end
      end
    end
    return false
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local owner = event:getCostData(self).tos[1]
    local suit = event:getCostData(self).suit
    if not owner or owner.dead then return end

    room:addTableMark(player, TURN_MARK, suit)
    owner:showCards(owner:getCardIds("h"))
    if owner.dead then return end

    local x = count_remaining_suits(owner)
    if x > 0 then
      player:drawCards(x, chimingzhi.name)
    end
  end,
})

chimingzhi:addEffect("targetmod", {
  bypass_times = function(self, player, skill, scope, card)
    if not card then return false end
    local suits = player:getTableMark(TURN_MARK)
    if type(suits) ~= "table" then return false end
    return table.contains(suits, card:getSuitString(true))
  end,
})

chimingzhi:addEffect(fk.TurnEnd, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chimingzhi.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, TURN_MARK, 0)
  end,
})

return chimingzhi
