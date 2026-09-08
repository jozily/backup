local niwochenghen = fk.CreateSkill{
  name = "niwochenghen",
}

local function get_all_field_mo(room)
  local ids = {}
  for _, p in ipairs(room.alive_players) do
    for _, area in ipairs({"h", "e", "j"}) do
      for _, id in ipairs(p:getCardIds(area)) do
        local c = Fk:getCardById(id)
        if c and c:getMark("@@niwo_mo") > 0 then
          table.insert(ids, id)
        end
      end
    end
  end
  return ids
end

local function choose_skill_to_give(room, player, to)
  local skills = {}
  for _, s in ipairs({"niwotianmeng", "niwofuxue", "niwochoulu"}) do
    if player:hasSkill(s, true) and not to:hasSkill(s, true) then
      table.insert(skills, s)
    end
  end
  if #skills == 0 then return nil end

  local choice = room:askToChoice(player, {
    choices = skills,
    skill_name = niwochenghen.name,
    cancelable = true,
  })
  if choice == "" then return nil end
  return choice
end

niwochenghen:addEffect(fk.AfterCardsMove, {
  anim_type = "drawcard",
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(niwochenghen.name) then return false end
    local cards = {}
    for _, move in ipairs(data) do
      if move.from and move.from ~= player and move.toArea == Card.DiscardPile then
        for _, info in ipairs(move.moveInfo) do
          local c = Fk:getCardById(info.cardId, true)
          if c
            and c:getMark("@@niwo_mo") > 0
            and (move.moveReason == fk.ReasonUse or move.moveReason == fk.ReasonResponse)
          then
            table.insertIfNeed(cards, info.cardId)
          end
        end
      end
    end
    if #cards > 0 then event:setCostData(self, { cards = cards }); return true end
    return false
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = niwochenghen.name,
      prompt = "#niwochenghen-obtain:::" .. #event:getCostData(self).cards,
    })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local ids = table.filter(event:getCostData(self).cards, function(id)
      return room:getCardArea(id) == Card.DiscardPile
    end)
    if #ids > 0 then
      room:obtainCard(player, ids, false, fk.ReasonPrey, player, niwochenghen.name)
      for _, id in ipairs(ids) do
      local c = Fk:getCardById(id)
      if c then
        room:setCardMark(c, "@@niwo_mo", 1)
      end
      end
    end
  end,
})

niwochenghen:addEffect(fk.EnterDying, {
  anim_type = "special",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name)
  end,
  on_cost = function(self, event, target, player, data)
    local room = player.room
    local tos = room:askToChoosePlayers(player, {
      min_num = 1,
      max_num = 1,
      targets = room:getOtherPlayers(player, false),
      skill_name = niwochenghen.name,
      prompt = "#niwochenghen-give",
      cancelable = true,
    })
    if #tos > 0 then
      event:setCostData(self, { tos = tos })
      return true
    end
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local to = event:getCostData(self).tos[1]
    if not to or to.dead then return end

    local skill = choose_skill_to_give(room, player, to)
    if skill then
      room:handleAddLoseSkills(to, skill)
    end

    local mo_ids = get_all_field_mo(room)
    for _, id in ipairs(mo_ids) do
      if to.dead then return end
      local c = Fk:getCardById(id, true)
      if c then
        local name = c.trueName or c.name
        local card = name and Fk:cloneCard(name) or nil
        if card then
          card:addSubcard(id)
          card.skillName = niwochenghen.name
        end
        local can_use = card and player:canUse(card, { bypass_times = true }) and
          not player:isProhibited(to, card) and card.skill:modTargetFilter(player, to, {}, card)
        if can_use then
          room:useCard{ from = player, card = card, tos = { to }, extraUse = true }
        elseif room:getCardArea(id) ~= Card.DiscardPile and room:getCardArea(id) ~= Card.Void then
          room:moveCardTo(id, Card.DiscardPile, nil, fk.ReasonPutIntoDiscardPile,
            niwochenghen.name, nil, true, player)
        end
      end
    end
  end,
})

return niwochenghen
