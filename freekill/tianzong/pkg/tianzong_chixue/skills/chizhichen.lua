local chizhichen = fk.CreateSkill{
  name = "chizhichen",
  tags = { Skill.Compulsory },
  description = ":chizhichen",
}

local DUST_MARK = "chizhichen_dust"

local function add_dust(player)
  if player and player:isAlive() then
    player:setChainState(true)
    player.room:addPlayerMark(player, DUST_MARK, 1)
  end
end

local function recast_most_suit(room, player)
  local current = room.current
  if not current or not current:isAlive() or
    (not current.chained and not current:isFlipped()) then return end
  local hand = player:getCardIds("h")
  if #hand == 0 then return end
  local suits = {}
  for _, id in ipairs(hand) do
    local card = Fk:getCardById(id)
    if card then
      suits[card.suit] = suits[card.suit] or {}
      table.insert(suits[card.suit], id)
    end
  end
  local max_suit, max_cards
  for suit, ids in pairs(suits) do
    if not max_cards or #ids > #max_cards then
      max_suit, max_cards = suit, ids
    end
  end
  if max_cards and #max_cards > 0 then
    room:recastCard(max_cards, player, chizhichen.name)
  end
end

chizhichen:addEffect(fk.RoundStart, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chizhichen.name)
  end,
  on_use = function(self, event, target, player, data)
    add_dust(player:getLastAlive())
    add_dust(player:getNextAlive())
  end,
})

chizhichen:addEffect(fk.Damaged, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chizhichen.name) and
      data.from and data.from:isAlive()
  end,
  on_use = function(self, event, target, player, data)
    add_dust(data.from)
    recast_most_suit(player.room, player)
  end,
})

chizhichen:addEffect(fk.DamageCaused, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chizhichen.name) and
      data.from == player and data.to and data.to:isAlive()
  end,
  on_use = function(self, event, target, player, data)
    add_dust(data.to)
    recast_most_suit(player.room, player)
  end,
})

return chizhichen
