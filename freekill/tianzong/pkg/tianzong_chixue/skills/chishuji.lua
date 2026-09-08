local chishuji = fk.CreateSkill{
  name = "chishuji",
  tags = { Skill.Compulsory },
}

local USED_MARK = "chishuji_seen-turn"

local function is_contracted(player)
  return true
end

local function legal_targets(from, card)
  if not from or not card then return {} end
  return card:getAvailableTargets(from, { bypass_times = true })
end

chishuji:addEffect(fk.TargetConfirmed, {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chishuji.name) and player:getMark(USED_MARK) == 0 and
      data.card and data.card:isCommonTrick() and #data:getAllTargets() > 1
  end,
  on_cost = function(self, event, target, player, data)
    local room = player.room
    room:setPlayerMark(player, USED_MARK, 1)
    local x = player:getHandcardNum()
    if #legal_targets(data.from, data.card) < x then return false end
    if is_contracted(player) then return true end
    return room:askToSkillInvoke(player, {
      skill_name = chishuji.name,
      prompt = "#chishuji-invoke:::" .. x,
    })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    room:addTableMarkIfNeed(player, "contracted_skills", chishuji.name)

    local discard_num = math.floor(player:getHandcardNum() / 2)
    if discard_num > 0 then
      room:askToDiscard(player, {
        min_num = discard_num,
        max_num = discard_num,
        include_equip = false,
        skill_name = chishuji.name,
        cancelable = false,
        prompt = "#chishuji-discard:::" .. discard_num,
      })
    end
    if player.dead then return end

    local wanted = math.max(1, player:getHandcardNum())
    local current = data:getAllTargets()
    local pool = table.simpleClone(current)
    for _, p in ipairs(legal_targets(data.from, data.card)) do
      table.insertIfNeed(pool, p)
    end
    wanted = math.min(wanted, #pool)

    local chosen = pool
    if #pool > wanted then
      chosen = room:askToChoosePlayers(player, {
        targets = pool,
        min_num = wanted,
        max_num = wanted,
        cancelable = false,
        skill_name = chishuji.name,
        prompt = "#chishuji-target:::" .. wanted,
      })
    end
    for _, p in ipairs(table.simpleClone(current)) do
      if not table.contains(chosen, p) then data:cancelTarget(p) end
    end
    for _, p in ipairs(chosen) do
      if not table.contains(current, p) then data:addTarget(p) end
    end
  end,
})

return chishuji
