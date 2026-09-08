local chiqingya = fk.CreateSkill{
  name = "chiqingya",
}

local U = require "packages.utility.utility"
local PENDING_KEY = "chiqingya_pending"

local function connect_big_cards(room, who, pindian_card)
  if not who or who.dead or not pindian_card then return end
  local point = pindian_card.number or 0
  for _, id in ipairs(who:getCardIds("h")) do
    local card = Fk:getCardById(id)
    if card and card.number > point and not U.isConnectedCard(card) then
      U.connectCards(room, id)
    end
  end
end

local function use_pindian_card_if_possible(room, loser, winner, pindian_card)
  if not loser or not winner or loser.dead or winner.dead or not pindian_card then return end
  local id = pindian_card:getEffectiveId()
  if id and room:getCardArea(id) == Card.Processing and loser:canUseTo(pindian_card, winner) then
    room:useCard{
      from = loser,
      tos = { winner },
      card = pindian_card,
      extraUse = true,
    }
  end
end

local function start_pindian(data, player, other)
  if not other or other.dead or not player:canPindian(other) then return end
  data.extra_data = data.extra_data or {}
  data.extra_data[PENDING_KEY] = data.extra_data[PENDING_KEY] or {}
  data.extra_data[PENDING_KEY][tostring(player.id)] = U.delayedPindian(player, { other }, chiqingya.name)
end

local function resolve_pindian(room, pindian, caused_damage)
  local user = pindian and pindian.from
  local other = pindian and pindian.tos and pindian.tos[1]
  if not user or not other or user.dead or other.dead then
    if pindian then U.delayedPindianCleaner(pindian) end
    return
  end

  U.delayedPindianDisplay(pindian)
  local result = pindian.results[other]
  if result then
    local user_card, other_card = pindian.fromCard, result.toCard
    local winner = result.winner
    if caused_damage then
      if winner == user then
        connect_big_cards(room, other, other_card)
      elseif winner == other then
        connect_big_cards(room, user, user_card)
      else
        connect_big_cards(room, user, user_card)
        connect_big_cards(room, other, other_card)
      end
    elseif winner == user then
      use_pindian_card_if_possible(room, other, user, other_card)
    elseif winner == other then
      use_pindian_card_if_possible(room, user, other, user_card)
    end
  end
  U.delayedPindianCleaner(pindian)
end

chiqingya:addEffect(fk.TargetConfirming, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chiqingya.name) and
      player:usedSkillTimes(chiqingya.name, Player.HistoryTurn) == 0 and data.from ~= player and
      data.card and data.card.is_damage_card and not data.cancelled and player:canPindian(data.from)
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = chiqingya.name,
      prompt = "#chiqingya-invoke::" .. data.from.id,
    })
  end,
  on_use = function(self, event, target, player, data)
    start_pindian(data, player, data.from)
  end,
})

chiqingya:addEffect(fk.CardUsing, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(chiqingya.name) or
      player:usedSkillTimes(chiqingya.name, Player.HistoryTurn) > 0 or
      not data.card or not data.card.is_damage_card then return false end
    return table.find(data.tos or {}, function(p) return player:canPindian(p) end) ~= nil
  end,
  on_cost = function(self, event, target, player, data)
    local targets = table.filter(data.tos or {}, function(p) return player:canPindian(p) end)
    local chosen = player.room:askToChoosePlayers(player, {
      targets = targets,
      min_num = 1,
      max_num = 1,
      prompt = "#chiqingya-target",
      skill_name = chiqingya.name,
      cancelable = true,
    })
    if #chosen > 0 then event:setCostData(self, { to = chosen[1] }); return true end
  end,
  on_use = function(self, event, target, player, data)
    start_pindian(data, player, event:getCostData(self).to)
  end,
})

chiqingya:addEffect(fk.CardUseFinished, {
  mute = true,
  is_delay_effect = true,
  can_trigger = function(self, event, target, player, data)
    local pending = data.extra_data and data.extra_data[PENDING_KEY]
    return type(pending) == "table" and pending[tostring(player.id)] ~= nil
  end,
  on_use = function(self, event, target, player, data)
    local pending = data.extra_data[PENDING_KEY]
    local pindian = pending[tostring(player.id)]
    pending[tostring(player.id)] = nil
    resolve_pindian(player.room, pindian, next(data.damageDealt or {}) ~= nil)
  end,
})

return chiqingya
