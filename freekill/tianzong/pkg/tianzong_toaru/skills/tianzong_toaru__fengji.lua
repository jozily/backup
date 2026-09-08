local fengji = fk.CreateSkill { name = "tianzong_toaru__fengji" }

local slots = { Card.SubtypeWeapon, Card.SubtypeArmor, Card.SubtypeOffensiveRide, Card.SubtypeDefensiveRide, Card.SubtypeTreasure }
local slot_names = {
  [Card.SubtypeWeapon] = "weapon", [Card.SubtypeArmor] = "armor",
  [Card.SubtypeOffensiveRide] = "offensive_horse", [Card.SubtypeDefensiveRide] = "defensive_horse",
  [Card.SubtypeTreasure] = "treasure",
}

local function is_fengji_card(info)
  return info.virtualEquip and info.virtualEquip.trueName == fengji.trueName
end

local function empty_slots(player)
  return table.filter(slots, function(subtype) return player:hasEmptyEquipSlot(subtype) end)
end

fengji:addEffect(fk.Damaged, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(fengji.name) and player:usedSkillTimes(fengji.name, Player.HistoryRound) == 0 and
      data.from and data.from:isAlive() and player:distanceTo(data.from) == 1 and
      #empty_slots(data.from) > 0 and table.find(player:getCardIds("h"), function(id)
        return Fk:getCardById(id).trueName == "slash"
      end) ~= nil
  end,
  on_cost = function(self, event, target, player, data)
    local ids = table.filter(player:getCardIds("h"), function(id) return Fk:getCardById(id).trueName == "slash" end)
    if #ids == 0 then return false end
    local chosen = player.room:askToCards(player, {
      min_num = 1, max_num = 1, include_equip = false, skill_name = fengji.name,
      pattern = "slash", prompt = "#tianzong_toaru__fengji::" .. data.from.id,
      cancelable = true,
    })
    if #chosen > 0 then event:setCostData(self, { cards = chosen, tos = { data.from } }) return true end
  end,
  on_use = function(self, event, target, player, data)
    local room, to, id = player.room, data.from, event:getCostData(self).cards[1]
    local choices = empty_slots(to)
    local subtype = #choices == 1 and choices[1] or room:askToChoice(player, {
      choices = table.map(choices, Util.convertSubtypeAndEquipSlot), skill_name = fengji.name,
      prompt = "#tianzong_toaru__fengji-slot::" .. to.id,
    })
    if type(subtype) == "string" then subtype = Util.convertSubtypeAndEquipSlot(subtype) end
    if not subtype then return end
    local card = Fk:cloneCard(slot_names[subtype] .. "__tianzong_toaru__fengji")
    card:addSubcard(id)
    room:moveCardIntoEquip(to, card, fengji.name, true, player)
    if to:isAlive() then
      room:notifySkillInvoked(player, fengji.name, "control")
    end
  end,
})

fengji:addEffect(fk.AfterCardsMove, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(fengji.name, true) then return false end
    local move = table.find(data, function(move)
      return move.to and move.toArea == Card.PlayerEquip and table.find(move.moveInfo, function(info)
        return is_fengji_card(info)
      end)
    end)
    if move then
      local info = table.find(move.moveInfo, is_fengji_card)
      event:setCostData(self, { to = move.to, card = info.cardId })
      return true
    end
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local cost = event:getCostData(self)
    local recipient = type(cost.to) == "number" and room:getPlayerById(cost.to) or cost.to
    local id = cost.card
    if not recipient or recipient.dead or room:getCardArea(id) ~= Card.PlayerEquip then return end
    local choice = room:askToChoice(recipient, {
      choices = { "tianzong_toaru__fengji_restrict", "tianzong_toaru__fengji_keep" },
      skill_name = fengji.name,
    })
    if choice == "tianzong_toaru__fengji_restrict" then
      room:addTableMarkIfNeed(recipient, "tianzong_toaru__fengji_suit-turn", Fk:getCardById(id, true).suit)
      room:addPlayerMark(recipient, MarkEnum.UncompulsoryInvalidity .. "-turn")
    else
      local keep = { id }
      if not recipient:isKongcheng() then
        local hand = room:askToCards(recipient, { min_num = 1, max_num = 1, include_equip = false,
          skill_name = fengji.name, cancelable = false, prompt = "#tianzong_toaru__fengji-keep" })
        table.insertTable(keep, hand)
      end
      local discard = table.filter(recipient:getCardIds("he"), function(cid) return not table.contains(keep, cid) end)
      if #discard > 0 then room:throwCard(discard, fengji.name, recipient, recipient) end
    end
  end,
})

fengji:addEffect("prohibit", {
  prohibit_use = function(self, player, card)
    return table.contains(player:getTableMark("tianzong_toaru__fengji_suit-turn"), card.suit)
  end,
  prohibit_response = function(self, player, card)
    return table.contains(player:getTableMark("tianzong_toaru__fengji_suit-turn"), card.suit)
  end,
})

fengji:addTest(function()
  for _, name in pairs(slot_names) do
    lu.assertEquals(Fk:cloneCard(name .. "__tianzong_toaru__fengji").trueName, fengji.trueName)
  end
end)

Fk:loadTranslationTable {
  ["#tianzong_toaru__fengji"] = "风纪：将一张【杀】置入 %dest 的一个空装备栏",
  ["#tianzong_toaru__fengji-slot"] = "风纪：选择 %dest 的一个空装备栏",
  ["tianzong_toaru__fengji_restrict"] = "本回合不能使用或打出同花色牌，且非锁定技失效",
  ["tianzong_toaru__fengji_keep"] = "保留此牌和一张手牌，弃置其余所有牌",
  ["#tianzong_toaru__fengji-keep"] = "风纪：选择要保留的一张手牌",
}

return fengji
