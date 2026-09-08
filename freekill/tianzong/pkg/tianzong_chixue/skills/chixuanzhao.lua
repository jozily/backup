local chixuanzhao = fk.CreateSkill{
  name = "chixuanzhao",
  tags = { Skill.Switch },
}

-- 保持这版结构：可见 table mark，保证能点开详情
local ROUND_MARK = "@$chixuanzhao-round"

local function is_shade(id)
  local c = Fk:getCardById(id, true)
  return c and ((c.trueName and c.trueName == "shade") or c.name == "shade")
end

local function count_targets(player, name)
  local card = Fk:cloneCard(name)
  if not card then return 0 end
  if player:prohibitUse(card) or not player:canUse(card) then return 0 end

  if card.skill:getMinTargetNum(player) == 0 and not card.multiple_targets then
    return 1
  end

  local x = 0
  for _, p in ipairs(Fk:currentRoom().alive_players) do
    if not player:isProhibited(p, card) and card.skill:modTargetFilter(player, p, {}, card) then
      x = x + 1
    end
  end
  return x
end

local function names_by_count(count, player)
  local all_names = Fk:getAllCardNames("bt")

  if player:getSwitchSkillState(chixuanzhao.name) == fk.SwitchYang then
    return table.filter(all_names, function(name)
      local c = Fk:cloneCard(name)
      return c and c:getNameLength(true) == count
    end)
  else
    return table.filter(all_names, function(name)
      return count_targets(player, name) == count
    end)
  end
end

local function get_available_names(player)
  local shade_ids = table.filter(player:getCardIds("h"), function(id)
    return is_shade(id)
  end)
  if #shade_ids == 0 then return {} end

  local all_names = {}
  for x = 1, #shade_ids, 1 do
    for _, name in ipairs(names_by_count(x, player)) do
      table.insertIfNeed(all_names, name)
    end
  end

  return player:getViewAsCardNames(chixuanzhao.name, all_names, nil, player:getTableMark(ROUND_MARK))
end

Fk:addQmlMark{
  name = "chixuanzhao",
  how_to_show = function(name, value, p)
    if not p then return "" end
    local used = p:getTableMark(ROUND_MARK)
    if type(used) ~= "table" or #used == 0 then return "" end
    local mode = p:getSwitchSkillState(chixuanzhao.name) == fk.SwitchYang and "阳" or "阴"
    -- 左边标题由 ["@$chixuanzhao-round"] = "悬照" 提供
    -- 这里只返回“阳 1”
    return mode .. " " .. tostring(#used)
  end,
  qml_data = function(name, value, p)
    if not p then return {} end
    local used = p:getTableMark(ROUND_MARK)
    if type(used) ~= "table" then return {} end
    return table.map(used, function(card_name)
      return Fk:translate(card_name)
    end)
  end,
  qml_path = function(name, value, p)
    if not p then return "" end
    local used = p:getTableMark(ROUND_MARK)
    if type(used) ~= "table" or #used == 0 then return "" end
    return "packages/utility/qml/ShowArrayMark"
  end,
}

chixuanzhao:addEffect("viewas", {
  pattern = ".|.|.|.|.|basic,trick",
  prompt = "#chixuanzhao",

  interaction = function(self, player)
    local names = get_available_names(player)
    if #names > 0 then
      return UI.TianzongCardNameBox {
        choices = names,
        all_choices = names,
      }
    end
  end,

  handly_pile = true,

  card_filter = function(self, player, to_select, selected)
    return is_shade(to_select)
  end,

  view_as = function(self, player, cards)
    if #cards == 0 or not self.interaction.data then return nil end
    local card = Fk:cloneCard(self.interaction.data)

    if player:getSwitchSkillState(chixuanzhao.name) == fk.SwitchYang then
      if card:getNameLength(true) ~= #cards then return nil end
    else
      if count_targets(player, self.interaction.data) ~= #cards then return nil end
    end

    card:addSubcards(cards)
    card.skillName = chixuanzhao.name
    return card
  end,

  before_use = function(self, player, use)
    player.room:addTableMark(player, ROUND_MARK, use.card.trueName)
  end,
})

chixuanzhao:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(chixuanzhao.name)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, ROUND_MARK, 0)
  end,
})

return chixuanzhao
