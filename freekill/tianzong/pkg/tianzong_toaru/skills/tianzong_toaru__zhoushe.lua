local zhoushe = fk.CreateSkill { name = "tianzong_toaru__zhoushe", related_skills = { "tianzong_toaru__hunluan" } }

zhoushe:addEffect("viewas", {
  pattern = "slash", prompt = "#tianzong_toaru__zhoushe", card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    local card = Fk:cloneCard("thunder__slash")
    card.skillName = zhoushe.name
    return card
  end,
  before_use = function(self, player, use)
    player.room:setPlayerMark(player, "tianzong_toaru__zhoushe-round", 1)
    use.extraUse = true
  end,
  enabled_at_play = function(self, player) return player:getMark("tianzong_toaru__zhoushe-round") == 0 end,
  enabled_at_response = function(self, player)
    return player:getMark("tianzong_toaru__zhoushe-round") == 0 and Fk.currentResponsePattern and
      Exppattern:Parse(Fk.currentResponsePattern):match(Fk:cloneCard("thunder__slash"))
  end,
})

zhoushe:addEffect(fk.CardEffectCancelledOut, {
  is_delay_effect = true,
  can_trigger = function(self, event, target, player, data)
    return target == player and data.card and data.card.skillName == zhoushe.name and data.to and data.to:isAlive()
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player, data)
    local choice = player.room:askToChoice(data.to, {
      choices = { "tianzong_toaru__zhoushe_losehp", "tianzong_toaru__zhoushe_hunluan" }, skill_name = zhoushe.name,
    })
    if choice == "tianzong_toaru__zhoushe_hunluan" then
      player.room:handleAddLoseSkills(data.to, "tianzong_toaru__hunluan", zhoushe.name)
    else
      player.room:loseHp(data.to, 1, zhoushe.name)
    end
  end,
})

Fk:loadTranslationTable {
  ["#tianzong_toaru__zhoushe"] = "轴射：视为使用或打出一张雷【杀】",
  ["tianzong_toaru__zhoushe_losehp"] = "失去1点体力",
  ["tianzong_toaru__zhoushe_hunluan"] = "获得【混乱】",
}
return zhoushe
