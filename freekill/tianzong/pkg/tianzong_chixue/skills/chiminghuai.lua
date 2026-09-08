-- chiminghuai.lua (铭怀)
local chiminghuai = fk.CreateSkill{
  name = "chiminghuai",
  description = ":chiminghuai",
  anim_type = "support",
  dynamic_desc = function(self, player, lang)
    if not player then return "" end
    local room = player.room
    if not room then return "铭怀：无房间信息" end
    
    local limitedCount = 0
    for _, p in ipairs(room.players) do
      for _, sk in ipairs(p.skills) do
        local skill = Fk:getSkill(sk)
        if skill and table.contains(skill.tags or {}, Skill.Limited) then
          limitedCount = limitedCount + 1
        end
      end
    end
    
    local drawCount = math.min(limitedCount, player.hp)
    return "铭怀：全场限定技" .. limitedCount .. "个，可摸" .. drawCount .. "张"
  end,
}

Fk:loadTranslationTable{
  ["chiminghuai"] = "铭怀",
}

chiminghuai:addEffect(fk.EventPhaseEnd, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(self.name) and target.phase == Player.Finish
  end,
  on_cost = function(self, event, target, player, data)
    local room = player.room
    return room:askToSkillInvoke(player, self.name)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local skillName = self.name
    
    local cards = player:getCardIds("he")
    if #cards == 0 then return end
    
    local validCombinations = {}
    
    for _, id in ipairs(cards) do
      local card = Fk:getCardById(id)
      local nameLength = card:getNameLength(true)
      
      if nameLength == 4 then
        table.insert(validCombinations, { id })
      end
    end
    
    for i, id1 in ipairs(cards) do
      for j, id2 in ipairs(cards) do
        if i < j then
          local card1 = Fk:getCardById(id1)
          local card2 = Fk:getCardById(id2)
          if card1:getNameLength(true) + card2:getNameLength(true) == 4 then
            table.insert(validCombinations, { id1, id2 })
          end
        end
      end
    end
    
    if #validCombinations == 0 then return end
    
    local choice = validCombinations[math.random(1, #validCombinations)]
    
    local card = Fk:cloneCard("random_responce")
    card.skillName = skillName
    
    room:useCard({
      from = player,
      card = card,
      skillName = skillName,
    })
    
    local limitedCount = 0
    for _, p in ipairs(room.alive_players) do
      for _, sk in ipairs(p.skills) do
        local skill = Fk:getSkill(sk)
        if skill and table.contains(skill.tags or {}, Skill.Limited) then
          limitedCount = limitedCount + 1
        end
      end
    end
    
    local drawCount = math.min(limitedCount, player.hp)
    if drawCount > 0 then
      player:drawCards(drawCount, skillName)
    end
  end,
})

return chiminghuai
