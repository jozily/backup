local chifushui = fk.CreateSkill{
   name = "chifushui" ,
   related_skills = { "chiyidi" },
  }
local STAGE = "chifushui_stage"

chifushui:addEffect(fk.CardRespondFinished, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chifushui.name) and target ~= player and data.responseToEvent
      and data.responseToEvent.from == player and player:getMark(STAGE) < 3
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local stage = player:getMark(STAGE) + 1
    room:setPlayerMark(player, STAGE, stage)
    player:drawCards(4 - stage, chifushui.name)
    if stage == 1 then
      room:setPlayerMark(player, "chifushui_name_round", 1)
    elseif stage == 2 then
      room:setPlayerMark(player, "chifushui_color_round", 1)
    else
      if player:isWounded() then room:recover{ who = player, num = player.maxHp - player.hp, skillName = chifushui.name } end
      room:handleAddLoseSkills(player, "chiyidi", nil, true, false)
    end
  end,
})

chifushui:addTest(function()
  for _, entry in ipairs(Fk.generals["chi__yuji"].all_skills) do
    local name = entry[1]
    for _ = 1, 2 do
      lu.assertNotNil(Fk.skill_skels[name])
      for _, related in ipairs(Fk.skill_skels[name].related_skills) do name = related end
    end
  end
end)

return chifushui
