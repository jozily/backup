local niwochoulu = fk.CreateSkill{
  name = "niwochoulu",
}

local ONCE_MARK = "@$niwochoulu"

niwochoulu:addEffect(fk.Damaged, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(niwochoulu.name) then return false end
    if player:usedSkillTimes(niwochoulu.name, Player.HistoryRound) > 0 then return false end
    if not target or not target:isAlive() then return false end
    if not data.from or not data.from:isAlive() or data.from == player then return false end
    if player:distanceTo(target) > 1 then return false end
    return true
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = niwochoulu.name,
      prompt = "#niwochoulu-invoke::" .. data.from.id,
    })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local use = room:askToUseCard(player, {
      skill_name = niwochoulu.name,
      prompt = "#niwochoulu-use::" .. data.from.id,
      pattern = "slash",
      extra_data = {
        exclusive_targets = { data.from.id },
        bypass_distances = true,
        bypass_times = true,
        bypass_armors = true,
      }
    })
    
    if use then
      room:useCard(use)
      room:addTableMark(player, ONCE_MARK, 1)
      
      if next(use.damageDealt or {}) ~= nil then
        -- End only the current turn; shutting down the Turn event directly
        -- can propagate to the room and incorrectly end the whole game.
        room:endTurn()
      end
    end
  end,
})

niwochoulu:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(niwochoulu.name)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, ONCE_MARK, 0)
  end,
})

return niwochoulu
