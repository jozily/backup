local cipao = fk.CreateSkill { name = "tianzong_toaru__cipao" }

cipao:addEffect("viewas", {
  pattern = "slash",
  prompt = "#tianzong_toaru__cipao",
  filter_pattern = { min_num = 1, max_num = math.huge, pattern = "." },
  view_as = function(self, player, cards)
    if #cards == 0 then return end
    local card = Fk:cloneCard("thunder__slash")
    card:addSubcards(cards)
    card.skillName = cipao.name
    return card
  end,
  before_use = function(self, player, use)
    use.extraUse = true
    local lengths, types = {}, {}
    local different_names, different_types = #use.card.subcards >= 2, #use.card.subcards >= 2
    for _, id in ipairs(use.card.subcards) do
      local card = Fk:getCardById(id)
      local length, card_type = card:getNameLength(), card.type
      if lengths[length] then different_names = false end
      if types[card_type] then different_types = false end
      lengths[length], types[card_type] = true, true
    end
    use.extra_data = use.extra_data or {}
    use.extra_data.tianzong_toaru__cipao_damage = different_names and #use.card.subcards or nil
    use.extra_data.tianzong_toaru__cipao_jink = different_types and #use.card.subcards or nil
    if different_names and different_types then
      local names = {}
      for name, skill in pairs(Fk.skills) do
        local desc = Fk:translate(":" .. name)
        if skill.visible and not player:hasSkill(name, true) and type(desc) == "string" and
          desc:find("【杀】", 1, true) then
          table.insert(names, name)
        end
      end
      if #names > 0 then
        player.room:notifySkillInvoked(player, cipao.name, "special")
        player.room:handleAddLoseSkills(player, player.room:tableRandomPick(names), cipao.name)
      end
    end
  end,
  enabled_at_play = function(self, player)
    return player:usedSkillTimes(cipao.name, Player.HistoryPhase) == 0
  end,
})

cipao:addEffect(fk.TargetSpecified, {
  can_refresh = function(self, event, target, player, data)
    return target == player and data.card and data.card.skillName == cipao.name
  end,
  on_refresh = function(self, event, target, player, data)
    data.to:addQinggangTag(data)
    local n = data.use.extra_data and data.use.extra_data.tianzong_toaru__cipao_jink
    if n then
      data.fixedResponseTimesList = data.fixedResponseTimesList or {}
      data.fixedResponseTimesList[data.to] = n
    end
  end,
})

cipao:addEffect(fk.DamageCaused, {
  can_refresh = function(self, event, target, player, data)
    return target == player and data.card and data.card.skillName == cipao.name
  end,
  on_refresh = function(self, event, target, player, data)
    local use = player.room.logic:getCurrentEvent():findParent(GameEvent.UseCard, true)
    local x = use and use.data.extra_data and use.data.extra_data.tianzong_toaru__cipao_damage
    if x then data.damage = x end
  end,
})

return cipao
