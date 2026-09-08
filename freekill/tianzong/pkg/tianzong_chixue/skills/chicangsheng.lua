local U = require "packages.utility.utility"

local chicangsheng = fk.CreateSkill{
  name = "chicangsheng",
  tags = { Skill.Switch },
}

local GENERAL_MARK = "@&chimiling"

local function target_count(player, name)
  local card = Fk:cloneCard(name)
  if not card or player:prohibitUse(card) then return 0 end
  if card.skill:getMinTargetNum(player) == 0 and not card.multiple_targets then return 1 end

  local n = 0
  for _, target in ipairs(Fk:currentRoom().alive_players) do
    if not player:isProhibited(target, card) and card.skill:modTargetFilter(player, target, {}, card) then
      n = n + 1
    end
  end
  return n
end

local function cost_for_name(player, name)
  local card = Fk:cloneCard(name)
  if not card then return 0 end
  if player:getSwitchSkillState(chicangsheng.name) == fk.SwitchYang then
    return card:getNameLength(true)
  end
  return target_count(player, name)
end

local function available_names(player)
  local count = #player:getTableMark(GENERAL_MARK)
  if count == 0 then return {} end
  local names = table.filter(Fk:getAllCardNames("bt"), function(name)
    local cost = cost_for_name(player, name)
    return cost > 0 and cost <= count
  end)
  return player:getViewAsCardNames(chicangsheng.name, names)
end

Fk:loadTranslationTable{
  ["chicangsheng"] = "苍生",
  [":chicangsheng"] = "<b>转换技，</b>你可以弃置X张“麋”视为使用或打出一张：①（阳）牌名字数为X的基本牌或普通锦囊牌；②（阴）合法目标数为X的基本牌或普通锦囊牌。",
  ["#chicangsheng-yang"] = "苍生-阳：选择一张牌，弃置等同于其牌名字数的“麋”",
  ["#chicangsheng-yin"] = "苍生-阴：选择一张牌，弃置等同于其合法目标数的“麋”",
  ["#chicangsheng-discard"] = "苍生：请选择弃置 %arg 张“麋”",
  ["$chicangsheng1"] = "眼底无限恨，爱而不得，有情难相守。",
  ["$chicangsheng2"] = "愿化清风伴君侧，奈何独留长夜寄相思。",
}

chicangsheng:addEffect("viewas", {
  pattern = ".|.|.|.|.|basic,trick",
  prompt = function(self, player)
    return player:getSwitchSkillState(chicangsheng.name) == fk.SwitchYang and
      "#chicangsheng-yang" or "#chicangsheng-yin"
  end,
  interaction = function(self, player)
    local names = available_names(player)
    if #names > 0 then
      return UI.CardNameBox{ choices = names, all_choices = Fk:getAllCardNames("bt") }
    end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    local name = self.interaction.data
    if not name then return nil end
    local cost = cost_for_name(player, name)
    if cost < 1 or cost > #player:getTableMark(GENERAL_MARK) then return nil end
    local card = Fk:cloneCard(name)
    card.skillName = chicangsheng.name
    return card
  end,
  before_use = function(self, player, use)
    local room = player.room
    local cost = cost_for_name(player, use.card.name)
    local generals = player:getTableMark(GENERAL_MARK)
    if cost < 1 or #generals < cost then return "" end
    local chosen = U.askToChooseGeneralsAndChoice(player, {
      generals = generals,
      min_num = cost,
      max_num = cost,
      skill_name = chicangsheng.name,
      prompt = "#chicangsheng-discard:::" .. cost,
    })
    if #chosen ~= cost then return "" end
    for _, name in ipairs(chosen) do table.removeOne(generals, name) end
    room:setPlayerMark(player, GENERAL_MARK, #generals > 0 and generals or 0)
    room:returnToGeneralPile(chosen)
  end,
  enabled_at_play = function(self, player)
    return #available_names(player) > 0
  end,
  enabled_at_response = function(self, player, response)
    return #available_names(player) > 0
  end,
  enabled_at_nullification = function(self, player, data)
    return table.contains(available_names(player), "nullification")
  end,
})

return chicangsheng
