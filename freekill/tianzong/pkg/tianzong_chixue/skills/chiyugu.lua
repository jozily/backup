local U = require "packages.utility.utility"
local chiyugu = fk.CreateSkill{ name = "chiyugu", tags = { Skill.Switch } }

local function target_num(player, card)
  if player:prohibitUse(card) or not player:canUse(card, { bypass_times = true }) then return 0 end
  if card.skill:getMinTargetNum() == 0 and not card.multiple_targets then return 1 end
  local n = 0
  for _, p in ipairs(Fk:currentRoom().alive_players) do
    if not player:isProhibited(p, card) and card.skill:modTargetFilter(player, p, {}, card) then n = n + 1 end
  end
  return n
end

local function turned_after_cost(player)
  local n = #table.filter(Fk:currentRoom().alive_players, function(p) return not p.faceup end)
  return n + (player.faceup and 1 or -1)
end

local function names(player)
  local x, state = turned_after_cost(player), player:getSwitchSkillState(chiyugu.name)
  return table.filter(player:getViewAsCardNames(chiyugu.name, Fk:getAllCardNames("bt")), function(name)
    local card = Fk:cloneCard(name)
    if not (card.type == Card.TypeBasic or card:isCommonTrick()) then return false end
    if state == fk.SwitchYang then return card:getNameLength(true) == x end
    local n = target_num(player, card)
    return n > 0 and n <= x
  end)
end

chiyugu:addEffect("viewas", {
  pattern = ".",
  prompt = function(self, player)
    return player:getSwitchSkillState(chiyugu.name) == fk.SwitchYang and "#chiyugu-yang" or "#chiyugu-yin"
  end,
  interaction = function(self, player)
    local choices = names(player)
    if #choices > 0 then return UI.TianzongCardNameBox{ choices = choices, all_choices = Fk:getAllCardNames("bt") } end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if #cards == 0 and self.interaction.data then
      local card = Fk:cloneCard(self.interaction.data)
      card.skillName = chiyugu.name
      return card
    end
  end,
  before_use = function(self, player, use)
    local state = player:getSwitchSkillState(chiyugu.name)
    player:turnOver()
    U.SetSwitchSkillState(player, chiyugu.name, state)
    use.extraUse = true
  end,
  enabled_at_play = function(self, player) return #names(player) > 0 end,
  enabled_at_response = function(self, player, response) return #names(player) > 0 end,
})

chiyugu:addEffect("targetmod", {
  bypass_times = function(self, player, skill, scope, card)
    return card and card.skillName == chiyugu.name
  end,
})

return chiyugu
