-- chitianshi.lua (恬适)
local chitianshi = fk.CreateSkill{
  name = "chitianshi",
  tags = { Skill.Compulsory },
  description = ":chitianshi",
  anim_type = "support",
  dynamic_desc = function(self, player, lang)
    if not player then return "" end
    local myHp = player.hp
    return "恬适：体力" .. myHp .. "，牌名字数≥" .. myHp .. "的牌无效"
  end,
}

Fk:loadTranslationTable{
  ["chitianshi"] = "恬适",
  [":chitianshi"] = "锁定技，其他角色于回合内对你使用的首张牌名字数不小于你体力值的牌对你无效。其他角色于回合内使用的首张牌名字数不小于X的牌结算后，你视为使用之。",
}

chitianshi:addEffect(fk.CardEffecting, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and
      data.from and data.from ~= player and
      player:usedSkillTimes(self.name .. "_" .. data.from.id, Player.HistoryPhase) == 0
  end,
  on_use = function(self, event, target, player, data)
    local skillName = self.name
    local nameLength = data.card:getNameLength(true)
    
    if nameLength >= player.hp then
      data.nullified = true
      player.room:setPlayerMark(player, skillName .. "_" .. data.from.id, 1)
    end
  end,
})

chitianshi:addEffect(fk.CardEffectFinished, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return data.from and data.from ~= player and data.from:hasSkill(self.name) and
      player:hasSkill(self.name) and
      player:usedSkillTimes("chitianshi_use_" .. data.from.id, Player.HistoryPhase) == 0
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local skillName = self.name
    local nameLength = data.card:getNameLength(true)
    
    if nameLength >= (12 - data.from.hp) then
      room:askToUseVirtualCard(
        player,
        {
          name = data.card.name,
          skill_name = skillName,
        }
      )
      player.room:setPlayerMark(player, "chitianshi_use_" .. data.from.id, 1)
    end
  end,
})

return chitianshi
