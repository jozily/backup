local hengwen = fk.CreateSkill {
  name = "tianzong_toaru__hengwen",
}

hengwen:addEffect("active", {
  prompt = "#tianzong_toaru__hengwen",
  card_filter = Util.FalseFunc,
  target_filter = function(self, player, to_select, selected)
    return #selected == 0 and to_select:getMark("@tianzong_toaru__hengwen") == 0
  end,
  can_use = function(self, player)
    return player:usedSkillTimes(hengwen.name, Player.HistoryGame) == 0
  end,
  on_use = function(self, room, effect)
    local to = effect.tos[1]
    room:setPlayerMark(to, "tianzong_toaru__hengwen_owner", effect.from.id)
    room:setPlayerMark(to, "@tianzong_toaru__hengwen", to.hp)
    room:setPlayerMark(to, "tianzong_toaru__hengwen_hp", to.hp)
  end,
})

hengwen:addEffect(fk.HpChanged, {
  is_delay_effect = true,
  can_trigger = function(self, event, target, player, data)
    return target and target:isAlive() and target.hp > 0 and
      target:getMark("tianzong_toaru__hengwen_owner") == player.id and
      player:hasSkill(hengwen.name, true) and
      target.hp ~= target:getMark("tianzong_toaru__hengwen_hp")
  end,
  on_cost = function(self, event, target, player, data)
    if player.room:askToSkillInvoke(player, {
      skill_name = hengwen.name,
      prompt = "#tianzong_toaru__hengwen-invoke::" .. target.id,
    }) then
      event:setCostData(self, { tos = { target } })
      return true
    end
  end,
  on_use = function(self, event, target, player, data)
    local room, hp = player.room, target:getMark("tianzong_toaru__hengwen_hp")
    room:setPlayerMark(target, "@tianzong_toaru__hengwen", 0)
    room:setPlayerMark(target, "tianzong_toaru__hengwen_owner", 0)
    room:setPlayerMark(target, "tianzong_toaru__hengwen_hp", 0)
    if target.hp < hp then
      room:recover { who = target, num = hp - target.hp, recoverBy = player, skillName = hengwen.name }
    elseif target.hp > hp then
      room:loseHp(target, target.hp - hp, hengwen.name)
    end
    player:setSkillUseHistory("tianzong_toaru__zonghuan", 0, Player.HistoryGame)
  end,
})

hengwen:addTest(function()
  local skill = Fk.skills[hengwen.name]
  lu.assertNotNil(skill)
  lu.assertNil(Fk.skill_skels["#tianzong_toaru__hengwen_restore"])
end)

Fk:loadTranslationTable {
  ["#tianzong_toaru__hengwen"] = "恒温：令一名角色获得“恒温”并记录其当前体力值",
  ["#tianzong_toaru__hengwen-invoke"] = "恒温：你可以令 %dest 的体力值恢复至记录值",
  ["@tianzong_toaru__hengwen"] = "恒温",
}

return hengwen
