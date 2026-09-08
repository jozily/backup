local chizelie = fk.CreateSkill{
  name = "chizelie",
}

local DRAW_MARK = "chizelie_draw-turn"
local DISCARD_MARK = "chizelie_discard-turn"

local function emptied_area(player, move)
  if move.from ~= player then return false end
  for _, info in ipairs(move.moveInfo) do
    if info.fromArea == Card.PlayerHand and player:isKongcheng() then return true end
    if info.fromArea == Card.PlayerEquip and #player:getCardIds("e") == 0 then return true end
    if info.fromArea == Card.PlayerJudge and #player:getCardIds("j") == 0 then return true end
  end
  return false
end

chizelie:addEffect(fk.AfterCardsMove, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chizelie.name) and table.find(data, function(move)
      return emptied_area(player, move)
    end) ~= nil
  end,
  on_cost = function(self, event, target, player, data)
    local room = player.room
    local tos = room:askToChoosePlayers(player, {
      targets = room.alive_players,
      min_num = 1,
      max_num = 1,
      skill_name = chizelie.name,
      prompt = "#chizelie-target",
      cancelable = true,
    })
    if #tos == 0 then return false end
    local choice = room:askToChoice(player, {
      choices = { "chizelie_draw", "chizelie_discard" },
      skill_name = chizelie.name,
      prompt = "#chizelie-choice::" .. tos[1].id,
    })
    event:setCostData(self, { to = tos[1], choice = choice })
    return true
  end,
  on_use = function(self, event, target, player, data)
    local cost = event:getCostData(self)
    player.room:setPlayerMark(cost.to,
      cost.choice == "chizelie_draw" and DRAW_MARK or DISCARD_MARK, 1)
  end,
})

chizelie:addEffect(fk.AfterCardsMove, {
  mute = true,
  can_refresh = function(self, event, target, player, data)
    for _, p in ipairs(player.room.alive_players) do
      if p:getMark(DRAW_MARK) > 0 and table.find(data, function(move)
        return move.to == p and move.toArea == Card.PlayerHand and #move.moveInfo > 0
      end) then
        self.extra_data = { player = p, mark = DRAW_MARK }
        return true
      end
      if p:getMark(DISCARD_MARK) > 0 and table.find(data, function(move)
        return move.from == p and move.moveReason == fk.ReasonDiscard and #move.moveInfo > 0
      end) then
        self.extra_data = { player = p, mark = DISCARD_MARK }
        return true
      end
    end
    return false
  end,
  on_refresh = function(self, event, target, player, data)
    local room, extra = player.room, self.extra_data
    if not extra or not extra.player:isAlive() then return end
    room:setPlayerMark(extra.player, extra.mark, 0)
    if extra.mark == DRAW_MARK then
      extra.player:drawCards(1, chizelie.name)
    elseif not extra.player:isNude() then
      room:askToDiscard(extra.player, {
        min_num = 1,
        max_num = 1,
        include_equip = true,
        skill_name = chizelie.name,
        cancelable = false,
      })
    end
  end,
})

return chizelie
