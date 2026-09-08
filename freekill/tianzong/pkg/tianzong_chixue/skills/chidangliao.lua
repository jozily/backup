local chidangliao = fk.CreateSkill{ name = "chidangliao" }

local function execute_greater(room, current, card)
  if not current or current.dead then return end
  local names = { "fire_attack", "fire__slash" }
  local choice = room:askToChoice(current, { choices = names, skill_name = chidangliao.name, prompt = "#chidangliao-use" })
  room:askToUseVirtualCard(current, { name = choice, skill_name = chidangliao.name, prompt = "#chidangliao-target", extra_data = { bypass_times = true }, cancelable = true })
end

local function execute_lesser(current, x)
  if not current or current.dead then return end
  local phases = { Player.Draw, Player.Play, Player.Discard }
  current:gainAnExtraPhase(phases[math.min(math.max(x, 1), 3)], chidangliao.name)
end

local function resolve(player, card)
  local room, current = player.room, player.room.current
  if not current or current.dead or not card then return end
  local x = player:usedSkillTimes(chidangliao.name, Player.HistoryTurn)
  local length = card:getNameLength(true)
  if length > x then
    execute_greater(room, current, card)
  elseif length < x then
    execute_lesser(current, x)
  else
    execute_greater(room, current, card)
    execute_lesser(current, x)
    if player:isAlive() then player:turnOver() end
  end
end

chidangliao:addEffect(fk.TargetConfirmed, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chidangliao.name) and data.card and data.card.color == Card.Red
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, { skill_name = chidangliao.name, prompt = "#chidangliao-invoke" })
  end,
  on_use = function(self, event, target, player, data) resolve(player, data.card) end,
})

chidangliao:addEffect(fk.AfterCardsMove, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chidangliao.name) then return false end
    return table.find(data, function(move)
      return move.from == player and move.toArea == Card.DiscardPile and move.moveReason == fk.ReasonDiscard
        and table.find(move.moveInfo, function(info) return Fk:getCardById(info.cardId).color == Card.Red end)
    end)
  end,
  on_cost = function(self, event, target, player, data)
    local cards = {}
    for _, move in ipairs(data) do
      if move.from == player and move.toArea == Card.DiscardPile and move.moveReason == fk.ReasonDiscard then
        for _, info in ipairs(move.moveInfo) do if Fk:getCardById(info.cardId).color == Card.Red then table.insert(cards, info.cardId) end end
      end
    end
    if not player.room:askToSkillInvoke(player, { skill_name = chidangliao.name, prompt = "#chidangliao-invoke" }) then return false end
    event:setCostData(self, { cards = cards })
    return true
  end,
  on_use = function(self, event, target, player, data)
    local cards = event:getCostData(self).cards
    local id = #cards == 1 and cards[1] or player.room:tableRandomPick(cards)
    resolve(player, Fk:getCardById(id))
  end,
})

return chidangliao
