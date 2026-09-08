local niwobailan = fk.CreateSkill{
  name = "niwobailan",
  tags = { Skill.Limited },
}
local Common = require "packages.tianzong.pkg.tianzong_niwo.lib.common"
local BAILAN_MARK = "@niwobailan"
local BAILAN_SKILL_MARK = "niwobailan_skill"
local BAILAN_DETAIL_MARK = "@[niwobailan_detail]"

local function available_skills(player)
  return table.filter(Common.get_skill_names(player), function(skill_name)
    local skill = Fk.skills[skill_name]
    local skeleton = skill and skill:getSkeleton()
    return skill and skill.visible and skeleton and not table.contains(skeleton.tags or {}, Skill.Limited)
  end)
end

local function tag_count(room)
  local tags = {}
  for _, p in ipairs(room.alive_players) do
    for _, skill_name in ipairs(p:getSkillNameList()) do
      local skill = Fk.skills[skill_name]
      local skeleton = skill and skill:getSkeleton()
      if skeleton then
        for _, tag in ipairs(skeleton.tags or {}) do tags[tag] = true end
      end
    end
  end
  local n = 0
  for _ in pairs(tags) do n = n + 1 end
  return n
end

local function update_bailan_mark(room, owner)
  local skills, tagset = {}, {}
  for _, p in ipairs(room.alive_players) do
    for _, skill_name in ipairs(p:getSkillNameList()) do
      local skill = Fk.skills[skill_name]
      local skeleton = skill and skill:getSkeleton()
      local skilltags = skeleton and skeleton.tags or {}
      if skill and skill.visible and #skilltags > 0 then
        for _, tag in ipairs(skilltags) do tagset[tag] = true end
        table.insertIfNeed(skills, skill_name)
      end
    end
  end
  local x = 0
  for _ in pairs(tagset) do x = x + 1 end
  room:setPlayerMark(owner, BAILAN_DETAIL_MARK, { x = x, skills = skills })
end

Fk:addQmlMark{
  name = "niwobailan_detail",
  how_to_show = function()
    return "百览·技能标签"
  end,
  qml = function(name, value)
    return {
      url = "packages/utility/qml/DetailBox.qml",
      prop = { name = name, value = type(value) == "table" and value.skills or {} },
    }
  end,
}

niwobailan:addEffect("active", {
  anim_type = "support",
  prompt = "#niwobailan",
  card_num = 0,
  target_num = 1,
  can_use = function(self, player)
    return player:usedSkillTimes(niwobailan.name, Player.HistoryGame) == 0
  end,
  target_filter = function(self, player, to_select, selected)
    return #selected == 0 and #available_skills(to_select) > 0
  end,
  on_use = function(self, room, effect)
    local player, target = effect.from, effect.tos[1]
    local x = tag_count(room)
    if x > 0 then target:drawCards(4 * x, niwobailan.name) end
    if target.dead then return end
    local skills = available_skills(target)
    if #skills == 0 then return end
    local choice_skill = #skills == 1 and skills[1] or room:askToChoice(player, {
      choices = skills,
      skill_name = niwobailan.name,
      prompt = "#niwobailan-skill",
    })
    room:setPlayerMark(target, BAILAN_SKILL_MARK, choice_skill)
    -- Keep the selected skill prompt on the target; Zhang Hua gets only the
    -- separate clickable tag-summary mark.
    update_bailan_mark(room, player)
    room:setPlayerMark(target, BAILAN_MARK, Fk:translate(choice_skill))
    if target ~= player and player:isAlive() and x > 0 then
      room:loseHp(player, x, niwobailan.name)
    end
  end,
})

niwobailan:addEffect(fk.GameStart, {
  can_refresh = function(self, event, target, player)
    return target == player and player:hasSkill(niwobailan.name, true)
  end,
  on_refresh = function(self, event, target, player)
    update_bailan_mark(player.room, player)
  end,
})

niwobailan:addEffect(fk.TurnStart, {
  global = true,
  can_refresh = function(self, event, target, player)
    return player:hasSkill(niwobailan.name, true)
  end,
  on_refresh = function(self, event, target, player)
    update_bailan_mark(player.room, player)
  end,
})

niwobailan:addEffect(fk.AfterSkillEffect, {
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not data.skill then return false end
    local skeleton = data.skill:getSkeleton()
    local skill_name = skeleton and skeleton.name or data.skill.name
    return player:getMark(BAILAN_SKILL_MARK) == skill_name and player:hasSkill(skill_name, true)
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player, data)
    local skeleton = data.skill:getSkeleton()
    local skill_name = skeleton and skeleton.name or data.skill.name
    player.room:setPlayerMark(player, BAILAN_SKILL_MARK, 0)
    player.room:setPlayerMark(player, BAILAN_MARK, 0)
    player.room:handleAddLoseSkills(player, "-" .. skill_name, nil, true, false)
    update_bailan_mark(player.room, player)
  end,
})

return niwobailan
