local chicangsui_viewas = fk.CreateSkill{ name = "#chicangsui_viewas" }

local USED_MARK = "chicangsui_used-turn"

local function names(player)
  local x = math.max(1, 6 - #player:getAvailableEquipSlots())
  local all_names = table.filter(Fk:getAllCardNames("bt"), function(name)
    local card = Fk:cloneCard(name)
    return card and (card.type == Card.TypeBasic or card:isCommonTrick()) and card:getNameLength(true) == x
  end)
  return player:getViewAsCardNames(chicangsui_viewas.name, all_names)
end

chicangsui_viewas:addEffect("viewas", {
  pattern = ".",
  prompt = "#chicangsui",
  interaction = function(self, player)
    local choices = names(player)
    if #choices > 0 then return UI.CardNameBox{ choices = choices, all_choices = choices } end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if #cards == 0 and self.interaction.data then
      local card = Fk:cloneCard(self.interaction.data)
      card.skillName = "chicangsui"
      return card
    end
  end,
  before_use = function(self, player, use)
    local room = player.room
    local slot = room:askToChoice(player, {
      choices = table.simpleClone(player:getAvailableEquipSlots()),
      all_choices = {
        "WeaponSlot", "ArmorSlot", "DefensiveRideSlot", "OffensiveRideSlot", "TreasureSlot",
      },
      skill_name = "chicangsui",
      prompt = "#$chicangsui-choice",
    })
    room:abortPlayerArea(player, { slot })
    room:setPlayerMark(player, USED_MARK, 1)
  end,
  enabled_at_play = Util.FalseFunc,
  enabled_at_response = function(self, player, response)
    return player:getMark(USED_MARK) == 0 and #player:getAvailableEquipSlots() > 0 and #names(player) > 0
  end,
})

return chicangsui_viewas
