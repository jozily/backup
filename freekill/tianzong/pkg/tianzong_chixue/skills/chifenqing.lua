local chifenqing = fk.CreateSkill{ name = "chifenqing" }

local function execute(room, from, to, choice)
  if choice == "chifenqing_damage" and to:isAlive() then
    room:damage{ from = from, to = to, damage = 1, damageType = fk.FireDamage, skillName = chifenqing.name }
  elseif choice == "chifenqing_turnover" and to:isAlive() then
    to:turnOver()
  end
end

chifenqing:addEffect("active", {
  anim_type = "offensive",
  card_num = 0,
  target_num = 1,
  can_use = function(self, player) return player:usedSkillTimes(chifenqing.name, Player.HistoryPhase) == 0 end,
  target_filter = function(self, player, to_select, selected) return #selected == 0 and to_select ~= player end,
  on_use = function(self, room, effect)
    local player, target = effect.from, effect.tos[1]
    if not player.chained then room:setPlayerChained(player, true) end
    if not target.chained then room:setPlayerChained(target, true) end
    local choices = { "chifenqing_damage", "chifenqing_turnover", "chifenqing_backwater" }
    local mine = room:askToChoice(player, { choices = choices, skill_name = chifenqing.name, prompt = "#chifenqing-choice::" .. target.id })
    local theirs = room:askToChoice(target, { choices = choices, skill_name = chifenqing.name, prompt = "#chifenqing-choice::" .. player.id })
    if mine == theirs then
      if player:isWounded() then room:recover{ who = player, num = 1, skillName = chifenqing.name } end
      if target:isWounded() then room:recover{ who = target, num = 1, skillName = chifenqing.name } end
      return
    end
    if mine == "chifenqing_backwater" then
      execute(room, target, player, theirs)
    elseif theirs == "chifenqing_backwater" then
      execute(room, player, target, mine)
    else
      execute(room, player, target, mine)
      execute(room, target, player, theirs)
    end
  end,
})

return chifenqing
