local chieyuan = fk.CreateSkill{
  name = "chieyuan",
}

chieyuan:addEffect(fk.EventPhaseStart, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chieyuan.name)
  end,
  on_use = function(self, event, target, player, data)
    -- TODO
  end,
})

return chieyuan
