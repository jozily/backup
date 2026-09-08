local kongli = fk.CreateSkill { name = "tianzong_toaru__kongli", tags = { Skill.Compulsory } }

kongli:addEffect(fk.DamageCaused, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(kongli.name) and data.to and data.to:isAlive()
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player, data)
    local n, room, to = math.random(100), player.room, data.to
    if n <= 5 then
      for _, skill in ipairs(to:getSkillNameList()) do room:invalidateSkill(to, skill, "-nextturn") end
    elseif n <= 30 then
      room:handleAddLoseSkills(to, "tianzong_toaru__hunluan", kongli.name)
    elseif n <= 55 then
      room:addPlayerMark(to, MarkEnum.UncompulsoryInvalidity .. "-turn")
    end
  end,
})
return kongli
