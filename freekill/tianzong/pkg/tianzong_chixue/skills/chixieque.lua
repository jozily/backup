local chixieque = fk.CreateSkill{
  name = "chixieque",
  tags = { Skill.Compulsory },
}
local NO_CANCEL = "@@chixieque_no_cancel-turn"
local NO_TARGET = "@@chixieque_no_target-turn"

chixieque:addEffect(fk.CardEffectFinished, {
  can_trigger = function(self, event, target, player, data)
    return data.from == player and player:hasSkill(chixieque.name) and data.to and data.to ~= player and not data.nullified and not data.isCancellOut
  end,
  on_use = function(self, event, target, player, data)
    player.room:setPlayerMark(data.to, NO_CANCEL, 1)
  end,
})

chixieque:addEffect(fk.CardEffectCancelledOut, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chixieque.name)
  end,
  on_use = function(self, event, target, player, data)
    player.room:setPlayerMark(player, NO_TARGET, 1)
  end,
})

chixieque:addEffect("prohibit", {
  prohibit_response = function(self, player, card)
    return player:getMark(NO_CANCEL) > 0 and table.contains({ "jink", "nullification" }, card.trueName)
  end,
  is_prohibited = function(self, from, to, card)
    return to:getMark(NO_TARGET) > 0 and from ~= to
  end,
})

return chixieque
