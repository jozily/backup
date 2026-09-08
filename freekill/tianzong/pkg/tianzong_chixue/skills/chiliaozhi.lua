local chiliaozhi = fk.CreateSkill{ name = "chiliaozhi" }

local spec = {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chiliaozhi.name) or player:isKongcheng() then return false end
    if event == fk.EventPhaseStart and (target ~= player or player.phase ~= Player.Play) then return false end
    return table.find(player.room:getOtherPlayers(player), function(p) return player:canPindian(p) end)
  end,
  on_cost = function(self, event, target, player, data)
    local targets = table.filter(player.room:getOtherPlayers(player), function(p) return player:canPindian(p) end)
    local chosen = player.room:askToChoosePlayers(player, {
      targets = targets, min_num = 1, max_num = math.min(#targets, player:getLostHp() + 1),
      skill_name = chiliaozhi.name, prompt = "#chiliaozhi-choose", cancelable = true,
    })
    if #chosen > 0 then event:setCostData(self, { tos = chosen }); return true end
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local targets = event:getCostData(self).tos
    room:sortByAction(targets)
    local result = player:pindian(targets, chiliaozhi.name)
    local winners, losers = {}, {}
    for _, p in ipairs(targets) do
      local winner = result.results[p].winner
      if winner then
        table.insertIfNeed(winners, winner)
        table.insertIfNeed(losers, winner == player and p or player)
      else
        table.insertIfNeed(losers, player)
        table.insertIfNeed(losers, p)
      end
    end
    local hp = {}
    for _, p in ipairs(losers) do hp[p.id] = p.hp end
    for _, from in ipairs(winners) do
      for _, to in ipairs(losers) do
        if from:isAlive() and to:isAlive() and from ~= to then
          room:useVirtualCard("fire__slash", nil, from, to, chiliaozhi.name, true)
        end
      end
    end
    local damaged = #table.filter(losers, function(p) return p.hp < (hp[p.id] or p.hp) end)
    if damaged > 0 and player:isAlive() then player:drawCards(damaged, chiliaozhi.name) end
  end,
}
chiliaozhi:addEffect(fk.EventPhaseStart, spec)
chiliaozhi:addEffect(fk.RoundEnd, spec)

return chiliaozhi
