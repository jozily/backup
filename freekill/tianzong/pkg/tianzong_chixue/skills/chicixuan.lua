-- chicixuan.lua
local chicixuan = fk.CreateSkill{
  name = "chicixuan",
  tags = { Skill.Switch },
  description = ":chicixuan",
  anim_type = "support",
  dynamic_desc = function(self, player, lang)
    if not player then return "" end
    local state = player:getSwitchSkillState(self.name)
    local renCards = 0
    for k, v in pairs(player.marks) do
      if string.find(k, "chicixuan_ren_") and v > 0 then
        renCards = renCards + 1
      end
    end
    
    local stateStr = state == fk.SwitchYang and "Yang" or "Yin"
    return "chicixuan[" .. stateStr .. "] Ren:" .. renCards
  end,
}

Fk:loadTranslationTable{
  ["chicixuan"] = "辞玄",
}

chicixuan:addEffect("active", {
  anim_type = "support",
  card_num = 0,
  target_num = 0,
  can_use = function(self, player)
    return player:usedSkillTimes(self.name, Player.HistoryRound) == 0
  end,
  card_filter = Util.FalseFunc,
  target_filter = Util.FalseFunc,
  on_use = function(self, room, effect)
    local player = effect.from
    local skillName = self.name
    
    local state = player:getSwitchSkillState(skillName)
    
    if state == fk.SwitchYang then
      local cards = player:getCardIds("he")
      if #cards == 0 then return end
      
      local choice = room:askToChooseCards(
        player,
        {
          min = 0,
          max = 3,
          flag = "he",
          skill_name = skillName,
        }
      )
      
      if #choice > 0 then
        for _, id in ipairs(choice) do
          room:setPlayerMark(player, "chicixuan_ren_" .. id, 1)
        end
        player:drawCards(#choice, skillName)
      end
    else
      local renCards = {}
      for k, v in pairs(player.marks) do
        if string.find(k, "chicixuan_ren_") and v > 0 then
          local cardId = tonumber(string.sub(k, #"chicixuan_ren_" + 1))
          table.insert(renCards, cardId)
        end
      end
      
      if #renCards > 0 then
        for i = 1, math.min(3, #renCards) do
          room:setPlayerMark(player, "chicixuan_ren_" .. renCards[i], 0)
        end
      end
    end
  end,
})

return chicixuan
