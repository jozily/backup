local zonghuan = fk.CreateSkill {
  name = "tianzong_toaru__zonghuan",
  tags = { Skill.Limited },
}

zonghuan:addEffect(fk.TargetConfirming, {
  can_trigger = function(self, event, target, player, data)
    local extras = data:getExtraTargets({ bypass_distances = true })
    return target == player and player:hasSkill(zonghuan.name) and
      player:usedSkillTimes(zonghuan.name, Player.HistoryGame) == 0 and
      data.from and data.from ~= player and #extras > 0
  end,
  on_cost = function(self, event, target, player, data)
    local extras = data:getExtraTargets({ bypass_distances = true })
    local tos = player.room:askToChoosePlayers(player, {
      targets = extras, min_num = 1, max_num = 1,
      skill_name = zonghuan.name, prompt = "#tianzong_toaru__zonghuan::" .. data.from.id,
      cancelable = true,
    })
    if #tos > 0 then event:setCostData(self, { tos = tos }) return true end
  end,
  on_use = function(self, event, target, player, data)
    player:setSkillUseHistory("tianzong_toaru__hengwen", 0, Player.HistoryGame)
    data:cancelTarget(player)
    data:addTarget(event:getCostData(self).tos[1])
  end,
})

Fk:loadTranslationTable {
  ["#tianzong_toaru__zonghuan"] = "纵幻：令此牌对你无效，并将目标转移给另一名角色",
}

return zonghuan
