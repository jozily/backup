local U = require "packages.utility.utility"
local waizhuang = fk.CreateSkill { name = "tianzong_toaru__waizhuang", tags = { Skill.Compulsory }, related_skills = { "tianzong_toaru__yangmu" } }

waizhuang:addEffect(fk.CardUsing, {
  can_trigger = function(self, event, target, player, data) return target == player and player:hasSkill(waizhuang.name) and player:getMark("skill_charge") < player:getMark("skill_charge_max") end,
  on_use = function(self, event, target, player, data) U.skillCharged(player, 1) end,
})

waizhuang:addEffect(fk.DamageInflicted, {
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(waizhuang.name) then return false end
    return table.find(player.room.alive_players, function(p)
      return p:getMark("tianzong_toaru__yangmu_guard-round") == 0 and
        table.contains(p:getTableMark("@[list]tianzong_toaru__yangmu"), player.id)
    end) ~= nil
  end,
  on_cost = function(self, event, target, player, data)
    local candidates = table.filter(player.room.alive_players, function(p)
      return p:getMark("tianzong_toaru__yangmu_guard-round") == 0 and
        table.contains(p:getTableMark("@[list]tianzong_toaru__yangmu"), player.id)
    end)
    for _, admirer in ipairs(candidates) do
      if player.room:askToSkillInvoke(admirer, {
        skill_name = "tianzong_toaru__yangmu", prompt = "#tianzong_toaru__yangmu-guard::" .. player.id,
      }) then event:setCostData(self, { tos = { admirer } }); return true end
    end
  end,
  on_use = function(self, event, target, player, data)
    local admirer = event:getCostData(self).tos[1]
    player.room:setPlayerMark(admirer, "tianzong_toaru__yangmu_guard-round", 1)
    player.room:changeMaxHp(admirer, -1)
    data:preventDamage()
  end,
})

return waizhuang
