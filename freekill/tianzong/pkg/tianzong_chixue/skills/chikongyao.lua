local U = require "packages.utility.utility"

local chikongyao = fk.CreateSkill{
  name = "chikongyao",
  tags = { Skill.Compulsory },
}

local GENERAL_MARK = "@&chimiling"

local function matching_generals(player, source)
  if not source then return {} end
  return table.filter(player:getTableMark(GENERAL_MARK), function(name)
    local general = Fk.generals[name]
    return general and (general.kingdom == source.kingdom or general.subkingdom == source.kingdom)
  end)
end

Fk:loadTranslationTable{
  ["chikongyao"] = "空杳",
  [":chikongyao"] = "<b>锁定技，</b>当你即将受到伤害时，若你有与伤害来源势力相同的“麋”，你弃置之并防止此伤害。",
  ["#chikongyao-discard"] = "空杳：请选择一张与 %dest 势力相同的“麋”弃置，以防止此伤害",
  ["$chikongyao1"] = "残雨打芭蕉，妆台月在，再无对镜人。",
  ["$chikongyao2"] = "此生有缘无分，怪只怪，造化弄人。",
}

chikongyao:addEffect(fk.DamageInflicted, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chikongyao.name) and
      #matching_generals(player, data.from) > 0
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local choices = matching_generals(player, data.from)
    local chosen = choices
    if #choices > 1 then
      chosen = U.askToChooseGeneralsAndChoice(player, {
        generals = choices,
        max_num = 1,
        skill_name = chikongyao.name,
        prompt = "#chikongyao-discard::" .. data.from.id,
      })
    end
    local name = chosen[1]
    if not name then return end
    local generals = player:getTableMark(GENERAL_MARK)
    table.removeOne(generals, name)
    room:setPlayerMark(player, GENERAL_MARK, #generals > 0 and generals or 0)
    room:returnToGeneralPile({ name })
    data:preventDamage()
  end,
})

return chikongyao
