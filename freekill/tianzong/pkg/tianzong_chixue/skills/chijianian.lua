local Fusheng = require "packages.tianzong.pkg.tianzong_chixue.lib.fusheng"
local chijianian = fk.CreateSkill{ name = "chijianian" }

local function names(player)
  local result = player:getViewAsCardNames(chijianian.name, Fk:getAllCardNames("bt"))
  return table.filter(result, function(name)
    local card = Fk:cloneCard(name)
    return card.type == Card.TypeBasic or card:isCommonTrick()
  end)
end

chijianian:addEffect("viewas", {
  pattern = ".",
  prompt = "#chijianian",
  interaction = function(self, player)
    local choices = names(player)
    if #choices > 0 then return UI.TianzongCardNameBox{ choices = choices, all_choices = Fk:getAllCardNames("bt") } end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if #cards == 0 and self.interaction.data then
      local card = Fk:cloneCard(self.interaction.data)
      card.skillName = chijianian.name
      return card
    end
  end,
  before_use = function(self, player, use)
    local room = player.room
    Fusheng.activate(room, player, chijianian.name, false)
    if player:isAlive() and Fusheng.restore_equal(room, player) then
      room:notifySkillInvoked(player, chijianian.name, "support")
    end
  end,
  enabled_at_play = function(self, player)
    return #Fusheng.available_pairs(player) > 0 and #names(player) > 0
  end,
  enabled_at_response = function(self, player, response)
    return #Fusheng.available_pairs(player) > 0 and #names(player) > 0
  end,
})

return chijianian
