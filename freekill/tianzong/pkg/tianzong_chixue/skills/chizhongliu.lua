local chizhongliu = fk.CreateSkill{
  name = "chizhongliu",
  tags = { Skill.Compulsory },
}
local Common = require "packages.tianzong.pkg.tianzong_chixue.lib.common"

chizhongliu:addEffect(fk.PreCardUse, {
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(chizhongliu.name) or not data.card then return false end
    local ids = Card:getIdList(data.card)
    if #ids == 0 then return true end
    return table.find(ids, function(id)
      return player.room:getCardArea(id) ~= Card.PlayerHand or player.room:getCardOwner(id) ~= player
    end) ~= nil
  end,
  on_use = function(self, event, target, player, data)
    for _, skill_name in ipairs(Common.get_skill_names(player)) do
      player:setSkillUseHistory(skill_name, 0, Player.HistoryPhase)
      player:setSkillUseHistory(skill_name, 0, Player.HistoryTurn)
      player:setSkillUseHistory(skill_name, 0, Player.HistoryRound)
      player:setSkillUseHistory(skill_name, 0, Player.HistoryGame)
    end
  end,
})

return chizhongliu
