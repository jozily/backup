local chijueyi = fk.CreateSkill{
  name = "chijueyi",
}

local function current_zhijian_skill(player)
  for _, s in ipairs({"chizhijian4", "chizhijian3", "chizhijian2", "chizhijian"}) do
    if player:hasSkill(s, true) then
      return s
    end
  end
  return nil
end

local function get_current_opt_mark(skill_name)
  if skill_name == "chizhijian" then
    return "chizhijian1_options-round"
  elseif skill_name == "chizhijian2" then
    return "chizhijian2_options-round"
  elseif skill_name == "chizhijian3" then
    return "chizhijian3_options-round"
  elseif skill_name == "chizhijian4" then
    return "chizhijian4_options-turn"
  end
end

local function get_aborted_count(player)
  return 5 - #player:getAvailableEquipSlots()
end

local function get_available_count(player)
  return #player:getAvailableEquipSlots()
end

local function get_slash_limit(player)
  local n = player:getMark("chizhijian_slash_limit-turn")
  if type(n) ~= "number" or n < 1 then return 1 end
  return n
end

local function current_values(player)
  local vals = {}
  vals[1] = get_aborted_count(player)
  vals[2] = get_available_count(player)
  vals[3] = math.max(1, player.maxHp)
  vals[4] = math.max(1, get_slash_limit(player))
  vals[5] = math.max(1, player.hp)
  vals[6] = math.max(1, player:getHandcardNum())
  return vals
end

local function names_by_len(len)
  local all_names = Fk:getAllCardNames("bt")
  return table.filter(all_names, function(name)
    local c = Fk:cloneCard(name)
    return c and c:getNameLength(true) == len
  end)
end

local function choose_targets_for_virtual(room, player, card_name)
  local card = Fk:cloneCard(card_name)
  if not card then return nil end

  -- 默认对自己使用的牌
  if card.trueName == "peach"
    or card.trueName == "analeptic"
    or card.trueName == "ex_nihilo"
    or card.type == Card.TypeEquip
  then
    if player:prohibitUse(card) then return nil end
    if card.trueName == "peach" and not player:isWounded() then return nil end
    return { player }
  end

  if player:prohibitUse(card) then return nil end

  local min_num = card.skill:getMinTargetNum(player) or 0
  local max_num = card.skill:getMaxTargetNum(player) or min_num

  local valid = table.filter(room.alive_players, function(p)
    return not player:isProhibited(p, card)
      and card.skill:modTargetFilter(player, p, {}, card, { bypass_times = true })
  end)

  if #valid == 0 then
    if min_num == 0 then
      return {}
    else
      return nil
    end
  end

  if min_num == 0 and max_num == 0 then
    return {}
  end

  local tos = room:askToChoosePlayers(player, {
    min_num = min_num,
    max_num = math.max(min_num, math.min(max_num, #valid)),
    targets = valid,
    skill_name = chijueyi.name,
    cancelable = (min_num == 0),
  })

  if #tos < min_num then
    return nil
  end
  return tos
end

local function get_possible_sums(player, skill_name)
  local mark_name = get_current_opt_mark(skill_name)
  local opts = player:getTableMark(mark_name)
  if type(opts) ~= "table" or #opts < 2 then return {} end

  local vals = current_values(player)
  local sums = {}
  for i = 1, #opts do
    for j = i + 1, #opts do
      table.insertIfNeed(sums, vals[opts[i]] + vals[opts[j]])
    end
  end
  return sums
end

chijueyi:addEffect("viewas", {
  pattern = ".|.|.|.|.|basic,trick",
  prompt = "#chizhijian-viewas",

  interaction = function(self, player)
    local skill_name = current_zhijian_skill(player)
    if not skill_name then return end

    local sums = get_possible_sums(player, skill_name)
    if #sums == 0 then return end

    local names = {}
    for _, s in ipairs(sums) do
      for _, name in ipairs(names_by_len(s)) do
        table.insertIfNeed(names, name)
      end
    end

    names = player:getViewAsCardNames(chijueyi.name, names)
    if #names > 0 then
      return UI.TianzongCardNameBox {
        choices = names,
        all_choices = names,
      }
    end
  end,

  filter_pattern = {
    min_num = 0,
    max_num = 0,
    pattern = "",
    subcards = {}
  },

  card_filter = Util.FalseFunc,

  view_as = function(self, player, cards)
    if not self.interaction.data then return nil end
    local card = Fk:cloneCard(self.interaction.data)
    card.skillName = chijueyi.name
    return card
  end,

  before_use = function(self, player, use)
    local room = player.room
    local need_len = use.card:getNameLength(true)

    local skill_name = current_zhijian_skill(player)
    if not skill_name then return "" end

    local helper = Fk.skills[skill_name]
    if not helper or not helper.addZhijianOnce then
      return ""
    end

    local ok, sum = helper.addZhijianOnce(room, player, need_len)
    if not ok or sum ~= need_len then
      return ""
    end

    local tos = choose_targets_for_virtual(room, player, use.card.trueName)
    if tos == nil then
      return ""
    end
    use.tos = tos
  end,
})

return chijueyi
