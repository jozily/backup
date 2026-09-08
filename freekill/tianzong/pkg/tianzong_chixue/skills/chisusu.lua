local chisusu = fk.CreateSkill{
  name = "chisusu",
  tags = { Skill.Compulsory },
}

local BASIC_SEEN = "chisusu_basic_seen-turn"
local NONBASIC_SEEN = "chisusu_nonbasic_seen-turn"
local EXTRA_EFFECT = "@@chisusu_extra_effect-turn"
local EXTRA_TARGET = "@@chisusu_extra_target-turn"

chisusu:addEffect(fk.CardUseFinished, {
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(chisusu.name) or not data.card then return false end
    if data.card.type == Card.TypeBasic then return player:getMark(BASIC_SEEN) == 0 end
    return player:getMark(NONBASIC_SEEN) == 0
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    if data.card.type == Card.TypeBasic then
      room:setPlayerMark(player, BASIC_SEEN, 1)
      room:setPlayerMark(player, EXTRA_EFFECT, 1)
    else
      room:setPlayerMark(player, NONBASIC_SEEN, 1)
      room:setPlayerMark(player, EXTRA_TARGET, 1)
    end
  end,
})

chisusu:addEffect(fk.TargetSpecified, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chisusu.name) and data.firstTarget
      and (player:getMark(EXTRA_EFFECT) > 0 or player:getMark(EXTRA_TARGET) > 0)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    if player:getMark(EXTRA_EFFECT) > 0 then
      room:setPlayerMark(player, EXTRA_EFFECT, 0)
      data.additionalEffect = (data.additionalEffect or 0) + 1
    end
    if player:getMark(EXTRA_TARGET) > 0 then
      room:setPlayerMark(player, EXTRA_TARGET, 0)
      local current_targets = data.tos or {}
      local candidates = table.filter(room.alive_players, function(p)
        return not table.contains(current_targets, p) and not player:isProhibited(p, data.card)
          and data.card.skill:modTargetFilter(player, p, current_targets, data.card, { bypass_times = true })
      end)
      if #candidates > 0 then
        local chosen = room:askToChoosePlayers(player, { targets = candidates, min_num = 1, max_num = 1, skill_name = chisusu.name, prompt = "#chisusu-target", cancelable = false })
        if #chosen > 0 then data:addTarget(chosen[1]) end
      end
    end
  end,
})

return chisusu
