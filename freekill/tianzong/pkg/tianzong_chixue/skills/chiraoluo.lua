local common = require "packages.tianzong.pkg.tianzong_chixue.lib.common"
local chigufu = require "packages.tianzong.pkg.tianzong_chixue.skills.chigufu"

local chiraoluo = fk.CreateSkill{
  name = "chiraoluo",
}

local function premeditated_ids(player)
  return table.filter(player:getCardIds("j"), function(id)
    local card = player:getVirtualEquip(id)
    return card and card.name == "premeditate"
  end)
end

local function usable_card_ids(player, ids)
  return table.filter(ids, function(id)
    local card = Fk:getCardById(id)
    return card and not card.is_passive and not player:prohibitUse(card) and
      #card:getAvailableTargets(player, { bypass_times = true }) > 0
  end)
end

local function can_gufu(player)
  return not player:isNude() and common.get_unremoved_count(player) > 0 and
    not table.contains(player.sealedSlots, Player.JudgeSlot)
end

local function use_gufu(room, player)
  if not can_gufu(player) then return false end
  local cards = table.filter(player:getCardIds("he"), function(id)
    return not player:prohibitDiscard(id)
  end)
  if #cards == 0 then return false end

  local max_num = math.min(common.get_unremoved_count(player), #cards)
  local chosen = room:askToCards(player, {
    min_num = 1,
    max_num = max_num,
    include_equip = true,
    pattern = tostring(Exppattern { id = cards }),
    skill_name = chiraoluo.name,
    prompt = "#chiraoluo-gufu-cards",
    cancelable = false,
  })
  if #chosen == 0 then return false end

  local place = room:askToChoice(player, {
    choices = { "Top", "Bottom" },
    skill_name = chiraoluo.name,
    prompt = "#chiraoluo-gufu-place",
  })
  chigufu.doGufu(room, player, chosen, place == "Bottom")
  return true
end

local function use_hand_or_premeditated(room, player)
  local hand_ids = usable_card_ids(player, player:getCardIds("h"))
  local pm_ids = usable_card_ids(player, premeditated_ids(player))
  local choices = {}
  if #hand_ids > 0 then table.insert(choices, "chiraoluo_use_hand") end
  if #pm_ids > 0 then table.insert(choices, "chiraoluo_use_premeditate") end
  if #choices == 0 then return false end

  local choice = #choices == 1 and choices[1] or room:askToChoice(player, {
    choices = choices,
    skill_name = chiraoluo.name,
    prompt = "#chiraoluo-use-choice",
  })
  local ids = choice == "chiraoluo_use_premeditate" and pm_ids or hand_ids
  local use = room:askToUseRealCard(player, {
    pattern = ids,
    expand_pile = choice == "chiraoluo_use_premeditate" and ids or nil,
    skill_name = chiraoluo.name,
    prompt = choice == "chiraoluo_use_premeditate" and "#chiraoluo-use-pm" or "#chiraoluo-use-hand",
    cancelable = false,
  })
  return use ~= nil
end

local function resolve_chiraoluo(room, player)
  if player.dead then return end
  local targets = table.filter(room.alive_players, function(p)
    return not p:isAllNude()
  end)
  if #targets == 0 then return end

  local chosen = room:askToChoosePlayers(player, {
    targets = targets,
    min_num = 1,
    max_num = 1,
    skill_name = chiraoluo.name,
    prompt = "#chiraoluo-choose",
    cancelable = true,
  })
  if #chosen == 0 then return end
  local target = chosen[1]
  local id = room:askToChooseCard(player, {
    target = target,
    flag = "hej",
    skill_name = chiraoluo.name,
    prompt = "#chiraoluo-discard::" .. target.id,
  })
  if not id or id == -1 then return end
  room:throwCard({ id }, chiraoluo.name, target, player)
  if target.dead then return end

  local canGufu = can_gufu(target)
  local canUse = #usable_card_ids(target, target:getCardIds("h")) > 0 or
    #usable_card_ids(target, premeditated_ids(target)) > 0
  local choices = {}
  if canGufu then table.insert(choices, "chiraoluo_opt1") end
  if canUse then table.insert(choices, "chiraoluo_opt2") end
  if canGufu and canUse then table.insert(choices, "chiraoluo_opt3") end
  if #choices == 0 then return end

  local choice = #choices == 1 and choices[1] or room:askToChoice(target, {
    choices = choices,
    skill_name = chiraoluo.name,
    prompt = "#chiraoluo-choice::" .. player.id,
  })
  if choice == "chiraoluo_opt1" then
    use_gufu(room, target)
  elseif choice == "chiraoluo_opt2" then
    use_hand_or_premeditated(room, target)
  else
    use_gufu(room, target)
    if not target.dead then use_hand_or_premeditated(room, target) end
    if not target.dead then target:turnOver() end
  end
end

local function can_trigger_chiraoluo(player)
  return player and not player.dead and player:hasSkill(chiraoluo.name)
end

local trigger_spec = {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    return target == player and can_trigger_chiraoluo(player)
  end,
  on_use = function(self, event, target, player, data)
    resolve_chiraoluo(player.room, player)
  end,
}

chiraoluo:addEffect(fk.Damaged, trigger_spec)
chiraoluo:addEffect(fk.CardRespondFinished, trigger_spec)
chiraoluo:addEffect(fk.CardUseFinished, {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    return target == player and data.responseToEvent and can_trigger_chiraoluo(player)
  end,
  on_use = function(self, event, target, player, data)
    resolve_chiraoluo(player.room, player)
  end,
})

Fk:loadTranslationTable{
  ["chiraoluo"] = "扰洛",
  [":chiraoluo"] = "当你受到伤害后，或当你使用或打出牌响应其他牌后，你可以弃置一名角色区域内的一张牌，令其选择一项：1.发动一次【孤凫】；2.使用一张手牌或蓄谋牌；3.背水（依次执行前两项）：翻面。",
  ["#chiraoluo-choose"] = "扰洛：请选择一名角色",
  ["#chiraoluo-discard"] = "扰洛：弃置%dest区域内的一张牌",
  ["#chiraoluo-choice"] = "扰洛：请选择一项",
  ["chiraoluo_opt1"] = "发动一次【孤凫】",
  ["chiraoluo_opt2"] = "使用一张手牌或蓄谋牌",
  ["chiraoluo_opt3"] = "背水：依次执行前两项，然后翻面",
  ["#chiraoluo-gufu-cards"] = "扰洛：请选择重铸的牌",
  ["#chiraoluo-gufu-place"] = "扰洛：请选择蓄谋牌堆顶或牌堆底",
  ["#chiraoluo-use-choice"] = "扰洛：请选择使用手牌或蓄谋牌",
  ["chiraoluo_use_hand"] = "使用一张手牌",
  ["chiraoluo_use_premeditate"] = "使用一张蓄谋牌",
  ["#chiraoluo-use-hand"] = "扰洛：请使用一张手牌",
  ["#chiraoluo-use-pm"] = "扰洛：请使用一张蓄谋牌",
}

return chiraoluo
