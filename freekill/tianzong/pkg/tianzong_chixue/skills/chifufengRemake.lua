local chifufengRemake = fk.CreateSkill{
  name = "chifufengRemake",
  tags = { Skill.Compulsory },
}

Fk:loadTranslationTable{
  ["chifufengRemake"] = "扶风",
  [":chifufengRemake"] = "锁定技，当你于一个阶段首次展示一张牌后，你重铸你手牌中另一种颜色的所有牌，然后你将一张牌置于牌堆顶。",
  ["#chifufengRemake-top"] = "扶风：将一张牌置于牌堆顶",
}

chifufengRemake:addEffect(fk.CardShown, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chifufengRemake.name) and
      player:usedSkillTimes(chifufengRemake.name, Player.HistoryPhase) == 0 and
      data.cardIds and #data.cardIds > 0
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local shown = Fk:getCardById(data.cardIds[1])
    local cards = table.filter(player:getCardIds("h"), function(id)
      local card = Fk:getCardById(id)
      return card.color ~= Card.NoColor and card.color ~= shown.color
    end)
    if #cards > 0 then room:recastCard(cards, player, chifufengRemake.name) end
    if player.dead or player:isNude() then return end
    local top = room:askToCards(player, {
      min_num = 1,
      max_num = 1,
      include_equip = true,
      skill_name = chifufengRemake.name,
      prompt = "#chifufengRemake-top",
      cancelable = false,
    })
    if #top > 0 then
      room:moveCards{
        ids = top,
        from = player,
        toArea = Card.DrawPile,
        moveReason = fk.ReasonPut,
        skillName = chifufengRemake.name,
        drawPilePosition = 1,
      }
    end
  end,
})

return chifufengRemake
