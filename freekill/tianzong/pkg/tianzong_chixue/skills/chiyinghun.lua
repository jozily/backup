local chiyinghun = fk.CreateSkill{ name = "chiyinghun", tags = { Skill.Compulsory } }
local MARK = "@@chiyinghun-turn"

local function invalidate_faceup(room, owner)
  room:setPlayerMark(owner, MARK, 1)
end

chiyinghun:addEffect(fk.CardUseFinished, {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chiyinghun.name) and #data.tos > 0
  end,
  on_use = function(self, event, target, player, data)
    for _, p in ipairs(data.tos) do if not p.dead then p:turnOver() end end
    invalidate_faceup(player.room, player)
  end,
})

chiyinghun:addEffect(fk.Damaged, {
  anim_type = "masochism",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chiyinghun.name)
  end,
  on_use = function(self, event, target, player, data)
    player:turnOver()
    if data.from and not data.from.dead then data.from:turnOver() end
    invalidate_faceup(player.room, player)
  end,
})

chiyinghun:addEffect("invalidity", {
  global = true,
  invalidity_func = function(self, from, skill)
    return from.faceup and not skill:hasTag(Skill.Compulsory) and skill:isPlayerSkill(from) and
      table.find(Fk:currentRoom().players, function(p) return p:getMark(MARK) > 0 end)
  end,
})

chiyinghun:addEffect("distance", {
  fixed_func = function(self, from, to)
    if (from:hasSkill(chiyinghun.name) and from.faceup == to.faceup) or
      (to:hasSkill(chiyinghun.name) and from.faceup == to.faceup) then return 1 end
  end,
})

return chiyinghun
