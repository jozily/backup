local chicangsui = fk.CreateSkill{
  name = "chicangsui",
}

local USED_MARK = "chicangsui_used-turn"

local function get_after_abort_len(player)
  local aborted = 5 - #player:getAvailableEquipSlots()
  return math.max(1, aborted + 1)
end

local function get_names_by_len(len)
  local all_names = Fk:getAllCardNames("bt")
  return table.filter(all_names, function(name)
    local c = Fk:cloneCard(name)
    return c and c:getNameLength(true) == len
  end)
end

local function ask_abort_slot(room, player)
  local choices = table.simpleClone(player:getAvailableEquipSlots())
  table.insert(choices, "Cancel")
  local all_choices = {
    "WeaponSlot",
    "ArmorSlot",
    "DefensiveRideSlot",
    "OffensiveRideSlot",
    "TreasureSlot",
    "Cancel",
  }
  return room:askToChoice(player, {
    choices = choices,
    all_choices = all_choices,
    skill_name = chicangsui.name,
    prompt = "#$chicangsui-choice",
  })
end

local function get_available_virtual_names(player)
  local x = get_after_abort_len(player)
  local all_names = get_names_by_len(x)
  return player:getViewAsCardNames(chicangsui.name, all_names)
end

chicangsui:addEffect("viewas", {
  pattern = ".",
  prompt = "#chicangsui",

  interaction = function(self, player)
    if player:getMark(USED_MARK) ~= 0 then return end
    if #player:getAvailableEquipSlots() == 0 then return end

    local names = get_available_virtual_names(player)
    if #names > 0 then
      return UI.TianzongCardNameBox { choices = names, all_choices = names }
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
    card.skillName = chicangsui.name
    return card
  end,

  before_use = function(self, player, use)
    local room = player.room
    local choice = ask_abort_slot(room, player)
    if choice == "Cancel" then return "" end
    room:abortPlayerArea(player, { choice })
    room:setPlayerMark(player, USED_MARK, 1)
  end,

  enabled_at_play = function(self, player)
    -- 出牌阶段只在“有可转化牌”时走 viewas
    if player:getMark(USED_MARK) ~= 0 then return false end
    if #player:getAvailableEquipSlots() == 0 then return false end
    return #get_available_virtual_names(player) > 0
  end,

  enabled_at_response = function(self, player, response)
    if player:getMark(USED_MARK) ~= 0 then return false end
    if #player:getAvailableEquipSlots() == 0 then return false end
    return #get_available_virtual_names(player) > 0
  end,
})

chicangsui:addEffect(fk.TurnEnd, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(chicangsui.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, USED_MARK, 0)
  end,
})

return chicangsui
