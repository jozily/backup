local chishuowen = fk.CreateSkill{
  name = "chishuowen",
  tags = { Skill.Switch },
}

local COUNT_MARK = "chishuowen_count-turn"
local USED_MARK = "chishuowen_used-turn"

local function get_view_id(player)
  local room = Fk:currentRoom()
  if not room then return nil end
  local pile = room.draw_pile
  if #pile == 0 then return nil end

  if player:getSwitchSkillState(chishuowen.name) == fk.SwitchYang then
    return pile[1]
  else
    return pile[#pile]
  end
end

local function get_name_length_by_name(name)
  local card = Fk:cloneCard(name)
  if not card then return -1 end
  return card:getNameLength(true)
end

local function get_choices(player)
  local id = get_view_id(player)
  if not id then return {} end

  local source = Fk:getCardById(id)
  if not source then return {} end

  local len = source:getNameLength(true)
  local all_names = Fk:getAllCardNames("bt")
  local used = player:getTableMark("chishuowen-round")

  local names = table.filter(all_names, function(name)
    return get_name_length_by_name(name) == len
  end)

  return player:getViewAsCardNames(chishuowen.name, names, nil, used)
end

chishuowen:addEffect("viewas", {
  pattern = ".|.|.|.|.|basic,trick",
  prompt = function(self, player)
    local id = get_view_id(player)
    if not id then return "#chishuowen" end
    local card = Fk:getCardById(id)
    if not card then return "#chishuowen" end

    if player:getSwitchSkillState(chishuowen.name) == fk.SwitchYang then
      return "#chishuowen-yang:::" .. card:toLogString()
    else
      return "#chishuowen-yin:::" .. card:toLogString()
    end
  end,

  interaction = function(self, player)
    local all_names = Fk:getAllCardNames("bt")
    local choices = get_choices(player)
    if #choices == 0 then return end
    return UI.TianzongCardNameBox{
      choices = choices,
      all_choices = all_names,
    }
  end,

  filter_pattern = {
    min_num = 0,
    max_num = 0,
    pattern = "",
    subcards = {}
  },

  card_filter = Util.FalseFunc,

  view_as = function(self, player, cards)
    if not self.interaction.data then return end
    local card = Fk:cloneCard(self.interaction.data)
    card.skillName = chishuowen.name
    return card
  end,

  before_use = function(self, player, use)
    local room = Fk:currentRoom()
    local id = get_view_id(player)
    if not id then return "" end

    room:moveCardTo({ id }, Card.Processing, nil, fk.ReasonPut, chishuowen.name, nil, false, player)
    use.card:addSubcard(id)

    room:addTableMark(player, "chishuowen-round", use.card.trueName)

    local x = player:getMark(COUNT_MARK)
    if type(x) ~= "number" then x = 0 end
    x = x + 1
    room:setPlayerMark(player, COUNT_MARK, x)
    room:setPlayerMark(player, USED_MARK, 1)

    if player:hasSkill("chidiaoyao", true) then
      room:setPlayerMark(player, "@[chidiaoyao_top]", x)
      room:setPlayerMark(player, "@[chidiaoyao_bottom]", x)
    end
  end,

  enabled_at_play = function(self, player)
    return player:getMark(USED_MARK) == 0
      and #get_choices(player) > 0
  end,

  enabled_at_response = function(self, player, response)
    return player:getMark(USED_MARK) == 0
      and #get_choices(player) > 0
  end,
})

chishuowen:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(chishuowen.name)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, "chishuowen-round", 0)
  end,
})

return chishuowen
