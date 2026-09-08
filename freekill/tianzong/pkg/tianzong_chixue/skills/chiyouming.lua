-- chiyouming.lua
local chiyouming = fk.CreateSkill{
  name = "chiyouming",
  description = ":chiyouming",
  anim_type = "support",
}

Fk:loadTranslationTable{
  ["chiyouming"] = "幽明",
  [":chiyouming"] = "当你每轮首次：①成为一张牌的目标后，你可以观看来源两张手牌并将其中一张置于牌堆顶②进入濒死状态时，若你武将牌正面朝上，你翻面并将体力恢复至一点。",
}

chiyouming:addEffect(fk.TargetSpecified, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and
      player:usedSkillTimes(self.name .. "_target", Player.HistoryRound) == 0 and
      data.from and data.from:isAlive()
  end,
  on_cost = function(self, event, target, player, data)
    local room = player.room
    local from = data.from
    local handcards = from:getCardIds("h")
    
    if #handcards < 2 then return false end
    return room:askToSkillInvoke(player, self.name)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local from = data.from
    
    local handcards = from:getCardIds("h")
    if #handcards < 2 then return end
    
    local shown = {}
    for i = 1, math.min(2, #handcards) do
      table.insert(shown, handcards[i])
    end
    from:showCards(shown)
  end,
})

chiyouming:addEffect(fk.Damaged, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and
      player:usedSkillTimes(self.name .. "_dying", Player.HistoryRound) == 0 and
      player.hp - data.damage <= 0 and
      not player:isFlipped()
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    player:setFlipped(true)
    player:setHp(1)
  end,
})

return chiyouming
