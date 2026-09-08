local chitiaomu = fk.CreateSkill{ name = "chitiaomu" }
local BONUS_MARK = "chitiaomu_bonus-turn"

local function target_num(player, card)
  if player:prohibitUse(card) or not player:canUse(card, { bypass_times = true }) then return 0 end
  if card.skill:getMinTargetNum() == 0 and not card.multiple_targets then return 1 end
  local n = 0
  for _, p in ipairs(Fk:currentRoom().alive_players) do
    if not player:isProhibited(p, card) and card.skill:modTargetFilter(player, p, {}, card) then n = n + 1 end
  end
  return n
end

local function discard_candidates(player, wanted)
  local length, targets = wanted:getNameLength(true), target_num(player, wanted)
  return table.filter(Fk:currentRoom().discard_pile, function(id)
    local card = Fk:getCardById(id)
    return (card.type == Card.TypeBasic or card:isCommonTrick()) and
      (card:getNameLength(true) == length or target_num(player, card) == targets)
  end)
end

local function names(player)
  return table.filter(player:getViewAsCardNames(chitiaomu.name, Fk:getAllCardNames("bt")), function(name)
    local card = Fk:cloneCard(name)
    return (card.type == Card.TypeBasic or card:isCommonTrick()) and #discard_candidates(player, card) > 0
  end)
end

chitiaomu:addEffect("viewas", {
  pattern = ".",
  prompt = "#chitiaomu",
  interaction = function(self, player)
    local choices = names(player)
    if #choices > 0 then return UI.TianzongCardNameBox{ choices = choices, all_choices = Fk:getAllCardNames("bt") } end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if #cards == 0 and self.interaction.data then
      local card = Fk:cloneCard(self.interaction.data)
      card.skillName = chitiaomu.name
      return card
    end
  end,
  before_use = function(self, player, use)
    local room, ids = player.room, discard_candidates(player, use.card)
    if #ids == 0 then return chitiaomu.name end
    local id = room:tableRandomPick(ids, 1)[1]
    local same_name = Fk:getCardById(id).trueName == use.card.trueName
    room:obtainCard(player, id, true, fk.ReasonPrey, player, chitiaomu.name)
    use.card:addSubcard(id)
    if same_name then room:addPlayerMark(player, BONUS_MARK, 1) end
  end,
  enabled_at_play = function(self, player)
    return player:usedSkillTimes(chitiaomu.name, Player.HistoryTurn) < 1 + player:getMark(BONUS_MARK) and #names(player) > 0
  end,
  enabled_at_response = function(self, player, response)
    return player:usedSkillTimes(chitiaomu.name, Player.HistoryTurn) < 1 + player:getMark(BONUS_MARK) and #names(player) > 0
  end,
})

return chitiaomu
