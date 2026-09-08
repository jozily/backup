local chixinmai = fk.CreateSkill{
  name = "chixinmai",
  anim_type = "support",
}

local EFFECT_MARK = "@chixinmai"
local OWNER_MARK = "chixinmai_owners"
local APPLIED_MARK = "chixinmai_applied-turn"

local function turn_slashes(room)
  local result = {}
  room.logic:getEventsOfScope(GameEvent.MoveCards, 1, function(e)
    for _, move in ipairs(e.data) do
      if move.toArea == Card.DiscardPile then
        for _, info in ipairs(move.moveInfo) do
          local card = Fk:getCardById(info.cardId)
          if card.trueName == "slash" and table.contains(room.discard_pile, info.cardId) then
            table.insertIfNeed(result, info.cardId)
          end
        end
      end
    end
  end, Player.HistoryTurn)
  return result
end

local function invoke(room, player, target)
  local slashes = turn_slashes(room)
  if #slashes > 0 then room:obtainCard(target, slashes, true, fk.ReasonPrey, target, chixinmai.name) end
  if target.dead then return end
  local choice = room:askToChoice(target, {
    choices = { "chixinmai1", "chixinmai2" }, skill_name = chixinmai.name, prompt = "#chixinmai-choose::" .. player.id,
  })
  if choice == "chixinmai1" then
    room:damage({ from = player, to = target, damage = 1, damageType = fk.ThunderDamage, skillName = chixinmai.name })
  else
    room:setPlayerMark(target, EFFECT_MARK, 1)
    room:addTableMarkIfNeed(target, OWNER_MARK, player.id)
    if room.current == target then room:setPlayerMark(target, APPLIED_MARK, 1) end
  end
end

Fk:loadTranslationTable{
  ["chixinmai"] = "薪脉",
  [":chixinmai"] = "每轮限一次，出牌阶段或当你受到伤害后，你可以令一名角色获得本回合进入弃牌堆的所有【杀】，然后令其选择一项：①你对其造成一点雷属性伤害；②其所有非属性【杀】视为【无懈可击】直至其下回合结束或受到属性伤害，然后你重置“薪脉”。",
  ["#chixinmai-choose"] = "薪脉：选择一项",
  ["#chixinmai-damaged"] = "薪脉：你可以选择一名角色发动“薪脉”",
  ["chixinmai1"] = "令技能发动者对你造成1点雷电伤害",
  ["chixinmai2"] = "非属性【杀】视为【无懈可击】",
  [EFFECT_MARK] = "薪脉",
}

chixinmai:addEffect("active", {
  card_num = 0, target_num = 1,
  can_use = function(self, player) return player:usedSkillTimes(chixinmai.name, Player.HistoryRound) == 0 end,
  target_filter = function(self, player, to_select, selected) return #selected == 0 and to_select:isAlive() end,
  card_filter = Util.FalseFunc,
  on_use = function(self, room, effect) invoke(room, effect.from, effect.tos[1]) end,
})

chixinmai:addEffect(fk.Damaged, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and player:usedSkillTimes(self.name, Player.HistoryRound) == 0
  end,
  on_cost = function(self, event, target, player, data)
    local chosen = player.room:askToChoosePlayers(player, {
      targets = player.room.alive_players, min_num = 1, max_num = 1, skill_name = self.name,
      prompt = "#chixinmai-damaged", cancelable = true,
    })
    if #chosen > 0 then event:setCostData(self, chosen[1]); return true end
  end,
  on_use = function(self, event, target, player, data) invoke(player.room, player, event:getCostData(self)) end,
})

chixinmai:addEffect("filter", {
  card_filter = function(self, card, player)
    return player:getMark(EFFECT_MARK) > 0 and card.name == "slash"
  end,
  view_as = function(self, player, card)
    local result = Fk:cloneCard("nullification", card.suit, card.number)
    result:addSubcards(Card:getIdList(card))
    result.skillName = chixinmai.name
    return result
  end,
})

chixinmai:addEffect(fk.TurnEnd, {
  global = true, mute = true,
  can_trigger = function(self, event, target, player, data)
    return target == player and player:getMark(EFFECT_MARK) > 0 and player:getMark(APPLIED_MARK) == 0
  end,
  on_use = function(self, event, target, player, data)
    player.room:setPlayerMark(player, EFFECT_MARK, 0)
    player.room:setPlayerMark(player, OWNER_MARK, 0)
  end,
})

chixinmai:addEffect(fk.Damaged, {
  global = true, mute = true,
  can_trigger = function(self, event, target, player, data)
    return target == player and player:getMark(EFFECT_MARK) > 0 and data.damageType ~= fk.NormalDamage
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    for _, id in ipairs(player:getTableMark(OWNER_MARK)) do
      local owner = room:getPlayerById(id)
      if owner then owner:setSkillUseHistory(chixinmai.name, 0, Player.HistoryRound) end
    end
    room:setPlayerMark(player, EFFECT_MARK, 0)
    room:setPlayerMark(player, OWNER_MARK, 0)
  end,
})

return chixinmai
