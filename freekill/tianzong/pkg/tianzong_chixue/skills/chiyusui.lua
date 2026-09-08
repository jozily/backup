-- chiyusui.lua
local chiyusui = fk.CreateSkill{
  name = "chiyusui",
  description = ":chiyusui",
  anim_type = "support",
}

Fk:loadTranslationTable{
  ["chiyusui"] = "毓髓",
  [":chiyusui"] = "当有角色受到属性伤害后，你可以与其各摸一张牌当有角色跳过任意阶段后，你可以弃置所有手牌令其于本回合结束后执行一个额外的被跳过的此阶段。",
}

chiyusui:addEffect(fk.Damaged, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(self.name) and
      data.damageType and data.damageType ~= fk.NormalDamage and
      target:isAlive() and player:isAlive()
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, self.name)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    player:drawCards(1, self.name)
    target:drawCards(1, self.name)
  end,
})

return chiyusui
