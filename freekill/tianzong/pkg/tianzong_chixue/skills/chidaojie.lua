local Common = require "packages.tianzong.pkg.tianzong_chixue.lib.common"

local chidaojie = fk.CreateSkill{
  name = "chidaojie",
  tags = { Skill.Compulsory },
}

local function compulsory_skills(player)
  return table.filter(Common.get_skill_names(player), function(name)
    local skill = Fk.skills[name]
    return skill and skill:hasTag(Skill.Compulsory)
  end)
end

Fk:loadTranslationTable{
  ["chidaojie"] = "蹈节",
  [":chidaojie"] = "锁定技，当你每回合第一次使用非伤害普通锦囊牌结算结束后，你选择一项：1.失去1点体力；2.失去一个锁定技。然后令一名角色获得此牌。",
  ["#chidaojie-choose"] = "蹈节：选择一项",
  ["#chidaojie-skill"] = "蹈节：选择失去一个锁定技",
  ["#chidaojie-target"] = "蹈节：令一名角色获得此牌",
  ["chidaojie1"] = "失去1点体力",
  ["chidaojie2"] = "失去一个锁定技",
}

chidaojie:addEffect(fk.CardUseFinished, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chidaojie.name) and data.card and
      data.card:isCommonTrick() and not data.card.is_damage_card and
      player:usedSkillTimes(chidaojie.name, Player.HistoryTurn) == 0
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local skills = compulsory_skills(player)
    local choices = { "chidaojie1" }
    if #skills > 0 then table.insert(choices, "chidaojie2") end
    local choice = #choices == 1 and choices[1] or room:askToChoice(player, {
      choices = choices,
      skill_name = chidaojie.name,
      prompt = "#chidaojie-choose",
    })
    if choice == "chidaojie2" then
      local lost = #skills == 1 and skills[1] or room:askToChoice(player, {
        choices = skills,
        skill_name = chidaojie.name,
        prompt = "#chidaojie-skill",
      })
      room:handleAddLoseSkills(player, "-" .. lost, nil, true, false)
    else
      room:loseHp(player, 1, chidaojie.name)
    end

    local ids = table.filter(Card:getIdList(data.card), function(id)
      return room:getCardArea(id) == Card.DiscardPile
    end)
    if #ids == 0 then return end
    local chosen = room:askToChoosePlayers(player, {
      targets = room.alive_players,
      min_num = 1,
      max_num = 1,
      skill_name = chidaojie.name,
      prompt = "#chidaojie-target",
      cancelable = false,
    })
    if #chosen > 0 then
      room:obtainCard(chosen[1], ids, true, fk.ReasonPrey, player, chidaojie.name)
    end
  end,
})

return chidaojie
