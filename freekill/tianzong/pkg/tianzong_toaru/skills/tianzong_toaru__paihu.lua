local U = require "packages.utility.utility"
local H = require "packages.hegemony.util"
local paihu = fk.CreateSkill { name = "tianzong_toaru__paihu", tags = { Skill.Limited } }

paihu:addEffect("active", {
  prompt = "#tianzong_toaru__paihu", target_num = 1, card_num = 0,
  can_use = function(self, player) return player.phase == Player.Play and player:usedSkillTimes(self.name, Player.HistoryGame) == 0 and #Fk:currentRoom().alive_players >= 3 end,
  target_filter = function(self, player, to_select, selected) return to_select ~= player and #selected == 0 end,
  on_use = function(self, room, effect)
    local player, target = effect.from, effect.tos[1]
    local x = math.max(1, #table.filter(room.alive_players, function(p) return H.compareKingdomWith(p, player, true) end))
    target:drawCards(x, self.name)
    if target:isWounded() then room:recover { who = target, num = 1, recoverBy = player, skillName = self.name } end
    local camp = table.filter(room.alive_players, function(p) return H.compareKingdomWith(p, target, true) end)
    if not H.compareKingdomWith(target, player, true) and #camp > 1 and room:askToSkillInvoke(player, {
      skill_name = self.name, prompt = "#tianzong_toaru__paihu-convert::" .. target.id,
    }) then
      room:changeKingdom(target, player.kingdom, true)
      target.role = player.role
      room:broadcastProperty(target, "role")
      room:addTableMarkIfNeed(target, "@[list]tianzong_toaru__yangmu", player.id)
      room:handleAddLoseSkills(target, "tianzong_toaru__yangmu", self.name)
    end
  end,
})
return paihu


