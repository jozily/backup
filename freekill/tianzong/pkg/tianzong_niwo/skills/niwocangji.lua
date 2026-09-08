local niwocangji = fk.CreateSkill{
  name = "niwocangji",
  tags = { Skill.Limited },
}
local Common = require "packages.tianzong.pkg.tianzong_niwo.lib.common"

local function remove_distance_skills(room)
  for _, p in ipairs(room.alive_players) do
    local names = table.filter(Common.get_skill_names(p), function(name)
      return string.find(Fk:translate(":" .. name), "距离", 1, true) ~= nil
    end)
    if #names > 0 then
      room:handleAddLoseSkills(p, "-" .. table.concat(names, "|-"), nil, true, false)
    end
  end
end

niwocangji:addEffect(fk.EventPhaseStart, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    return target == player 
      and player:hasSkill(niwocangji.name)
      and player:usedSkillTimes(niwocangji.name, Player.HistoryGame) == 0
      and player.phase == Player.Play
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = niwocangji.name,
      prompt = "#niwocangji-invoke",
    })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local targets = {}
    for _, p in ipairs(room.alive_players) do
      if p ~= player and not p:inMyAttackRange(player) then
        table.insert(targets, p)
      end
    end
    
    if #targets == 0 then return end
    
    for _, target_player in ipairs(targets) do
      local judge_result = room:judge{ who = target_player, reason = niwocangji.name }
      local damage_num = judge_result.card:getNameLength(true)
      local damage_type = fk.ThunderDamage
      if judge_result.card.type == Card.TypeTrick then
        damage_type = fk.FireDamage
      elseif judge_result.card.type == Card.TypeEquip then
        damage_type = fk.IceDamage
      end
      
      room:damage({
        from = player,
        to = target_player,
        damage = damage_num,
        damageType = damage_type,
        skillName = niwocangji.name,
      })
    end
    remove_distance_skills(room)
    room:handleAddLoseSkills(player, "-niwochencang|niwochencangRemake|niwochoulu|weimu", nil, true, false)
  end,
})

return niwocangji
