local chifeizhu = fk.CreateSkill{
  name = "chifeizhu",
}

chifeizhu:addEffect(fk.EventPhaseStart, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chifeizhu.name)
  end,
  on_use = function(self, event, target, player, data)
    -- TODO
  end,
})

return chifeizhu
