local Fusheng = require "packages.tianzong.pkg.tianzong_chixue.lib.fusheng"
local chifusheng = fk.CreateSkill{ name = "chifusheng" }

local spec = {
  anim_type = "special",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chifusheng.name) and
      (event == fk.Damaged or player.phase == Player.Start) and #Fusheng.available_pairs(player) > 0
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = chifusheng.name, prompt = "#chifusheng-invoke",
    })
  end,
  on_use = function(self, event, target, player, data)
    Fusheng.activate(player.room, player, chifusheng.name, false)
  end,
}

chifusheng:addEffect(fk.EventPhaseStart, spec)
chifusheng:addEffect(fk.Damaged, spec)

return chifusheng
