-- chiqihai.lua (歧海)
local chiqihai = fk.CreateSkill{
  name = "chiqihai",
  description = ":chiqihai",
  anim_type = "support",
}

Fk:loadTranslationTable{
  ["chiqihai"] = "歧海",
  ["#chiqihai-choose"] = "歧海：选择一项",
  ["chiqihai1"] = "将一张类型的牌置入仁区",
  ["chiqihai2"] = "移除仁牌视为使用",
}

chiqihai:addEffect(fk.Damaged, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and data.from and data.from:isAlive()
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, self.name)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local from = data.from
    local skillName = self.name
    
    local choices = { "chiqihai1", "chiqihai2" }
    local choice = room:askToChoice(from, {
      choices = choices, skill_name = skillName, prompt = "#chiqihai-choose",
    })
    
    if choice == "chiqihai1" then
      local cards = from:getCardIds("he")
      if #cards > 0 then
        local selectedCard = cards[math.random(1, #cards)]
        room:setPlayerMark(player, "chiqihai_ren_" .. selectedCard, 1)
      end
    else
      local renCards = {}
      for k, v in pairs(player.marks) do
        if string.find(k, "chiqihai_ren_") and v > 0 then
          local cardId = tonumber(string.sub(k, #"chiqihai_ren_" + 1))
          table.insert(renCards, cardId)
        end
      end
      
      if #renCards > 0 then
        local selectedCard = renCards[math.random(1, #renCards)]
        room:useCard({
          from = from,
          card = Fk:getCardById(selectedCard),
          skillName = skillName,
        })
        room:setPlayerMark(player, "chiqihai_ren_" .. selectedCard, 0)
      end
    end
  end,
})

chiqihai:addEffect(fk.DamageInflicted, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and
      data.tos and #data.tos > 0
  end,
  on_use = function(self, event, target, player, data)
    -- 同Damaged效果，但针对目标
  end,
})

return chiqihai
