local chicigu = fk.CreateSkill{
  name = "chicigu",
  anim_type = "support",
}

local PILE = "chicigu_ci"

local function can_add(player)
  return #player:getPile(PILE) < math.max(player.hp, 0)
end

local function take_card(player, source)
  if not source or not source:isAlive() or not can_add(player) or source:isNude() then return false end
  local id = player.room:askToChooseCard(player, {
    target = source, flag = "he", skill_name = chicigu.name,
    prompt = "#chicigu-choose-card::" .. source.id,
  })
  if not id then return false end
  player:addToPile(PILE, id, true, chicigu.name, source)
  local hp = math.max(player.hp, 1)
  local card = Fk:getCardById(id)
  if card.number % hp > 1 then
    player.room:damage({ from = source, to = player, damage = 1, damageType = fk.IceDamage, skillName = chicigu.name })
  end
  return true
end

Fk:loadTranslationTable{
  ["chicigu"] = "刺骨",
  [":chicigu"] = "出牌阶段或当你受到伤害后，你可以将一名角色的一张牌置于你的武将牌上，称为“刺”（至多体力值张），若此牌的点数与你体力值的余数大于1，你受到一点此牌来源的冰属性伤害。回合结束阶段，你选择一项：1.弃置所有“刺”视为对一名角色使用一张冰【杀】；2.获得体力值张“刺”。",
  ["#chicigu-choose-card"] = "刺骨：选择一张牌置为“刺”",
  ["#chicigu-choose-player"] = "刺骨：选择冰【杀】的目标",
  ["#chicigu-end"] = "刺骨：选择一项",
  ["chicigu1"] = "弃置所有“刺”并使用冰【杀】",
  ["chicigu2"] = "获得所有“刺”",
}

chicigu:addEffect("active", {
  card_num = 0, target_num = 1,
  can_use = function(self, player) return can_add(player) end,
  target_filter = function(self, player, to_select, selected)
    return #selected == 0 and to_select ~= player and to_select:isAlive() and not to_select:isNude()
  end,
  card_filter = Util.FalseFunc,
  on_use = function(self, room, effect) take_card(effect.from, effect.tos[1]) end,
})

chicigu:addEffect(fk.Damaged, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and can_add(player) and data.from and data.from:isAlive() and not data.from:isNude()
  end,
  on_cost = function(self, event, target, player, data) return player.room:askToSkillInvoke(player, self.name) end,
  on_use = function(self, event, target, player, data) take_card(player, data.from) end,
})

chicigu:addEffect(fk.EventPhaseEnd, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player.phase == Player.Finish and player:hasSkill(self.name) and #player:getPile(PILE) > 0
  end,
  on_use = function(self, event, target, player, data)
    local room, pile = player.room, player:getPile(PILE)
    local choice = room:askToChoice(player, { choices = { "chicigu1", "chicigu2" }, skill_name = self.name, prompt = "#chicigu-end" })
    if choice == "chicigu2" then
      room:obtainCard(player, pile, true, fk.ReasonPrey, player, self.name)
      return
    end
    room:throwCard(pile, self.name, player, player)
    local targets = table.filter(room.alive_players, function(p) return p ~= player end)
    if #targets > 0 then
      local chosen = room:askToChoosePlayers(player, { targets = targets, min_num = 1, max_num = 1, skill_name = self.name, prompt = "#chicigu-choose-player", cancelable = false })
      if #chosen > 0 then
        local slash = Fk:cloneCard("slash"); slash.skillName = self.name; slash.damage_type = fk.IceDamage
        room:useCard({ from = player, card = slash, tos = { { chosen[1].id } }, skillName = self.name })
      end
    end
  end,
})

return chicigu
