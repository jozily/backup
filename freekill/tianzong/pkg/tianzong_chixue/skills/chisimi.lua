local chisimi = fk.CreateSkill{ name = "chisimi", tags = { Skill.Switch, Skill.Compulsory } }

local function is_equal(player)
  local max_hp, hand = player.maxHp, player:getHandcardNum()
  local diff = math.abs(max_hp - hand)
  return max_hp == hand or max_hp == diff or hand == diff
end

local function base_can_trigger(player)
  return player:hasSkill(chisimi.name) and
    player:usedSkillTimes(chisimi.name, Player.HistoryRound) == 0 and is_equal(player)
end

local spec = {
  on_cost = function(self, event, target, player, data)
    event:setCostData(self, { state = player:getSwitchSkillState(chisimi.name) })
    return true
  end,
  on_use = function(self, event, target, player, data)
    local room, state = player.room, event:getCostData(self).state
    if state == fk.SwitchYang then
      if room:random(1, 2) == 1 then player:drawCards(1, chisimi.name) else room:changeMaxHp(player, 1) end
    else
      local cards = player:getCardIds("he")
      if #cards > 0 and room:random(1, 2) == 1 then
        room:throwCard({ room:tableRandomPick(cards, 1)[1] }, chisimi.name, player, player)
      else
        room:changeMaxHp(player, -1)
      end
    end
  end,
}

local max_hp_spec = table.simpleClone(spec)
max_hp_spec.can_trigger = function(self, event, target, player, data)
  return target == player and base_can_trigger(player)
end
chisimi:addEffect(fk.MaxHpChanged, max_hp_spec)

local cards_spec = table.simpleClone(spec)
cards_spec.can_trigger = function(self, event, target, player, data)
  return base_can_trigger(player) and table.find(data, function(move)
    if move.to == player and move.toArea == Card.PlayerHand then return true end
    if move.from ~= player then return false end
    return table.find(move.moveInfo, function(info) return info.fromArea == Card.PlayerHand end) ~= nil
  end) ~= nil
end
chisimi:addEffect(fk.AfterCardsMove, cards_spec)

return chisimi
