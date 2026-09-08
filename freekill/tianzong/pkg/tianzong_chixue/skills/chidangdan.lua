local chidangdan = fk.CreateSkill{
  name = "chidangdan",
  tags = { Skill.Compulsory },
}

local YUSHE_INVALID_MARK = "chidangdan_yushe_invalid-turn"

local function is_contracted(player)
  return true
end

local function legal_target_num(player, card)
  if not card then return 0 end
  return #card:getAvailableTargets(player, { bypass_times = true })
end

chidangdan:addEffect(fk.TargetSpecified, {
  anim_type = "support",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chidangdan.name) and data.to and data.card and
      data.to.hp == legal_target_num(player, data.card)
  end,
  on_cost = function(self, event, target, player, data)
    if is_contracted(player) then return true end
    return player.room:askToSkillInvoke(player, {
      skill_name = chidangdan.name,
      prompt = "#chidangdan-invoke::" .. data.to.id .. ":" .. legal_target_num(player, data.card),
    })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    room:addTableMarkIfNeed(player, "contracted_skills", chidangdan.name)
    local choice = room:askToChoice(player, {
      choices = { "chidangdan_maxhp", "chidangdan_yushe" },
      skill_name = chidangdan.name,
      prompt = "#chidangdan-choice::" .. data.to.id,
    })
    if choice == "chidangdan_maxhp" then
      room:changeMaxHp(player, 1)
      if player:isAlive() and player:isWounded() then
        room:recover{ who = player, num = 1, skillName = chidangdan.name }
      end
    else
      room:setPlayerMark(player, YUSHE_INVALID_MARK, 1)
    end
  end,
})

chidangdan:addEffect("invalidity", {
  recheck_invalidity = true,
  invalidity_func = function(self, from, skill)
    return from:getMark(YUSHE_INVALID_MARK) > 0 and skill.name == "chiyushe"
  end,
})

return chidangdan
