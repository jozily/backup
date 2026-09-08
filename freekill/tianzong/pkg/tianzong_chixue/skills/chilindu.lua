local chilindu = fk.CreateSkill{
  name = "chilindu",
    related_skills = { "chijueyi"},
  tags = { Skill.Quest },
}

local function current_zhijian_skill(player)
  for _, s in ipairs({"chizhijian4", "chizhijian3", "chizhijian2", "chizhijian"}) do
    if player:hasSkill(s, true) then
      return s
    end
  end
  return nil
end

local function upgrade_zhijian(room, player)
  if player:hasSkill("chizhijian", true) then
    room:handleAddLoseSkills(player, "-chizhijian|chizhijian2")
    return 2
  elseif player:hasSkill("chizhijian2", true) then
    room:handleAddLoseSkills(player, "-chizhijian2|chizhijian3")
    return 3
  elseif player:hasSkill("chizhijian3", true) then
    room:handleAddLoseSkills(player, "-chizhijian3|chizhijian4")
    return 4
  elseif player:hasSkill("chizhijian4", true) then
    return 4
  end
  return 0
end

local function replace_nonhand_cards_with_poison(room, player)
  for _, p in ipairs(room.alive_players) do
    if p ~= player and p:isAlive() then
      local ids = {}
      for _, area in ipairs({"e", "j"}) do
        for _, id in ipairs(p:getCardIds(area)) do
          table.insert(ids, id)
        end
      end

      for _, id in ipairs(ids) do
        local area = room:getCardArea(id)
        local poison = room:printCard("es__poison", Card.Spade, table.random({4, 5, 9, 10}))

        if area == Card.PlayerEquip then
          room:moveCardTo(poison, Card.PlayerEquip, p, fk.ReasonPut, chilindu.name, nil, true, player)
        elseif area == Player.Judge or area == Card.PlayerJudge then
          room:moveCardTo(poison, Player.Judge, p, fk.ReasonPut, chilindu.name, nil, true, player)
        end

        if room:getCardArea(id) ~= Card.Void then
          room:moveCardTo(id, Card.DiscardPile, nil, fk.ReasonPutIntoDiscardPile, chilindu.name, nil, true, player)
        end
      end
    end
  end
end

local function do_lindu_upgrade(player)
  local room = player.room
  local v = upgrade_zhijian(room, player)

  if v >= 4 then
    room:updateQuestSkillState(player, chilindu.name)
    room:invalidateSkill(player, chilindu.name)

    if not player:hasSkill("chijueyi", true) then
      room:handleAddLoseSkills(player, "chijueyi")
    end

    if player.hp < player.maxHp then
      room:recover({
        who = player,
        num = player.maxHp - player.hp,
        recoverBy = player,
        skillName = chilindu.name,
      })
    end

    -- 使命成功后切换立绘/形态
    if player.general == "chi__mifuren" then
      player.general = "chi2__mifuren"
      room:broadcastProperty(player, "general")
    elseif player.deputyGeneral == "chi__mifuren" then
      player.deputyGeneral = "chi2__mifuren"
      room:broadcastProperty(player, "deputyGeneral")
    end

    replace_nonhand_cards_with_poison(room, player)
  end
end

-- 普通响应（打出）
chilindu:addEffect(fk.CardRespondFinished, {
  anim_type = "special",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chilindu.name)
  end,
  on_use = function(self, event, target, player, data)
    do_lindu_upgrade(player)
  end,
})

-- 使用牌方式进行响应（如无懈可击）
chilindu:addEffect(fk.CardUseFinished, {
  anim_type = "special",
  can_trigger = function(self, event, target, player, data)
    return target == player
      and player:hasSkill(chilindu.name)
      and data.responseToEvent
      and data.responseToEvent.card
  end,
  on_use = function(self, event, target, player, data)
    do_lindu_upgrade(player)
  end,
})

return chilindu
