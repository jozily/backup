local chisuhen = fk.CreateSkill{
  name = "chisuhen",
  tags = { Skill.Compulsory },
}
local ELEMENTAL = "chisuhen_elemental-turn"

local function execute(room, from, to, choice)
  if choice == "chifenqing_damage" and to:isAlive() then
    room:damage{ from = from, to = to, damage = 1, damageType = fk.FireDamage, skillName = chisuhen.name }
  elseif choice == "chifenqing_turnover" and to:isAlive() then
    to:turnOver()
  end
end

local function virtual_fenqing(room, player, other)
  if not other or other.dead then return end
  if not player.chained then room:setPlayerChained(player, true) end
  if not other.chained then room:setPlayerChained(other, true) end
  local choices = { "chifenqing_damage", "chifenqing_turnover", "chifenqing_backwater" }
  local mine = room:askToChoice(player, { choices = choices, skill_name = chisuhen.name, prompt = "#chisuhen-choice::" .. other.id })
  local theirs = room:askToChoice(other, { choices = choices, skill_name = chisuhen.name, prompt = "#chisuhen-choice::" .. player.id })
  if mine == theirs then
    if player:isWounded() then room:recover{ who = player, num = 1, skillName = chisuhen.name } end
    if other:isWounded() then room:recover{ who = other, num = 1, skillName = chisuhen.name } end
  elseif mine == "chifenqing_backwater" then execute(room, other, player, theirs)
  elseif theirs == "chifenqing_backwater" then execute(room, player, other, mine)
  else execute(room, player, other, mine); execute(room, other, player, theirs) end
end

local spec = {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chisuhen.name) and data.damageType ~= fk.NormalDamage
      and player:usedSkillTimes(chisuhen.name, Player.HistoryTurn) == 0
  end,
  on_use = function(self, event, target, player, data)
    local other = data.from == player and data.to or data.from
    if data.from and data.from:isAlive() then data.from:reset() end
    virtual_fenqing(player.room, player, other)
  end,
}
chisuhen:addEffect(fk.Damage, spec)
chisuhen:addEffect(fk.Damaged, spec)

chisuhen:addEffect(fk.Damage, {
  mute = true,
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chisuhen.name) and data.damageType ~= fk.NormalDamage and data.to ~= nil
  end,
  on_refresh = function(self, event, target, player, data)
    local room = player.room
    if data.from then room:setPlayerMark(data.from, ELEMENTAL, 1) end
    if data.to then room:setPlayerMark(data.to, ELEMENTAL, 1) end
  end,
})

chisuhen:addEffect(fk.TurnEnd, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chisuhen.name) and target and target:getMark(ELEMENTAL) > 0
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, { skill_name = chisuhen.name, prompt = "#chisuhen-use" })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local cards = room:getNCards(2, "top")
    local use = room:askToUseRealCard(player, { pattern = cards, skill_name = chisuhen.name, prompt = "#chisuhen-card", cancelable = true, skip = true, extra_data = { expand_pile = cards } })
    if use then room:useCard(use) end
    local rest = table.filter(cards, function(id) return not table.contains(room.discard_pile, id) and room:getCardOwner(id) == nil end)
    if #rest > 0 then room:moveCards{ ids = rest, toArea = Card.DrawPile, moveReason = fk.ReasonPut, skillName = chisuhen.name, drawPilePosition = 1 } end
  end,
})

return chisuhen
