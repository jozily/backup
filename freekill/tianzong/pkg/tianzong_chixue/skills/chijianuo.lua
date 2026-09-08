local chijianuo = fk.CreateSkill{
  name = "chijianuo",
}

chijianuo:addEffect(fk.EventPhaseStart, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chijianuo.name)
  end,
  on_use = function(self, event, target, player, data)
    -- TODO
  end,
})

return chijianuo
