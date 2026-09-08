local chikuili = fk.CreateSkill{ name = "chikuili" }

local function target_num(player, card)
  if not card or player:prohibitUse(card) or not player:canUse(card, { bypass_times = true }) then return 0 end
  if card.skill:getMinTargetNum() == 0 and not card.multiple_targets then return 1 end
  local n = 0
  for _, p in ipairs(Fk:currentRoom().alive_players) do
    if not player:isProhibited(p, card) and card.skill:modTargetFilter(player, p, {}, card) then n = n + 1 end
  end
  return n
end

local function candidates(player, used, choice)
  local used_length, used_targets = used:getNameLength(true), target_num(player, used)
  return table.filter(player:getCardIds("h"), function(id)
    if table.contains(used.subcards, id) then return false end
    local card = Fk:getCardById(id)
    if card.type ~= Card.TypeBasic and not card:isCommonTrick() then return false end
    if choice == "chikuili_effect" then return card:getNameLength(true) == used_length end
    return target_num(player, card) == used_targets
  end)
end

local function available_choices(player, card)
  local choices = {}
  if #candidates(player, card, "chikuili_effect") > 0 then
    table.insert(choices, "chikuili_effect")
  end
  if #candidates(player, card, "chikuili_targets") > 0 then
    table.insert(choices, "chikuili_targets")
  end
  return choices
end

chikuili:addEffect(fk.TargetSpecified, {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chikuili.name) and data.firstTarget and
      player:usedSkillTimes(chikuili.name, Player.HistoryTurn) == 0 and
      (data.card.type == Card.TypeBasic or data.card:isCommonTrick()) and
      #available_choices(player, data.card) > 0
  end,
  on_cost = function(self, event, target, player, data)
    local room = player.room
    local choices = available_choices(player, data.card)
    local choice = #choices == 1 and choices[1] or room:askToChoice(player, {
      choices = choices,
      skill_name = chikuili.name,
      prompt = "#chikuili-choice",
    })
    local ids = candidates(player, data.card, choice)
    local cards = player.room:askToCards(player, {
      min_num = 1, max_num = #ids, skill_name = chikuili.name, cancelable = true,
      pattern = tostring(Exppattern{ id = ids }), prompt = "#chikuili-show",
    })
    if #cards > 0 then
      local used_length, used_targets = data.card:getNameLength(true), target_num(player, data.card)
      local x = choice == "chikuili_effect" and used_length - #cards or used_targets - #cards
      event:setCostData(self, {
        cards = cards,
        choice = choice,
        x = x,
      })
      return true
    end
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local cost = event:getCostData(self)
    local x, choice = cost.x, cost.choice
    player:showCards(cost.cards)
    if choice == "chikuili_effect" and x > 0 then
      data.use.additionalEffect = (data.use.additionalEffect or 0) + x
    elseif x > 0 then
      local extra = data:getExtraTargets()
      if #extra > 0 then
        local chosen = room:askToChoosePlayers(player, {
          targets = extra, min_num = math.min(x, #extra), max_num = math.min(x, #extra),
          cancelable = false, skill_name = chikuili.name, prompt = "#chikuili-target:::" .. x,
        })
        for _, p in ipairs(chosen) do data:addTarget(p) end
      end
    end
    if x <= 1 then
      player:setSkillUseHistory(chikuili.name, 0, Player.HistoryTurn)
    end
  end,
})

return chikuili
