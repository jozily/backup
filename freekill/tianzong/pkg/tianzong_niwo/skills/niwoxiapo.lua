local niwoxiapo = fk.CreateSkill{
  name = "niwoxiapo",
  tags = { Skill.Compulsory },
}

niwoxiapo:addEffect(fk.PreCardUse, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(niwoxiapo.name)
  end,
  on_refresh = function(self, event, target, player, data)
    for _, p in ipairs(data.tos or {}) do
      if p and p:isAlive() and not p.chained then
        p:setChainState(true)
      end
    end
  end,
})

local spec = {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(niwoxiapo.name) or not data.responseToEvent or not data.responseToEvent.card then
      return false
    end

    -- 你响应其他角色的牌：你重置
    if target == player and data.responseToEvent.from and data.responseToEvent.from ~= player then
      return player.chained
    end

    -- 其他角色响应你的牌：其重置
    if target ~= player and data.responseToEvent.from == player then
      return target.chained
    end

    return false
  end,
  on_use = function(self, event, target, player, data)
    if target and target:isAlive() and target.chained then
      target:setChainState(false)
    end
  end,
}

niwoxiapo:addEffect(fk.CardUseFinished, spec)
niwoxiapo:addEffect(fk.CardRespondFinished, spec)

return niwoxiapo
