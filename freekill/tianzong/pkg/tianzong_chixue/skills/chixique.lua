local chixique = fk.CreateSkill{
  name = "chixique",
}

local function get_name_len(name)
  local c = Fk:cloneCard(name)
  return c and c:getNameLength(true) or -1
end

local function get_names_leq(remain)
  local all_names = Fk:getAllCardNames("bt")
  return table.filter(all_names, function(name)
    local len = get_name_len(name)
    return len > 0 and len <= remain
  end)
end

local function choose_targets_for_virtual(room, player, card_name)
  local card = Fk:cloneCard(card_name)
  if not card then return nil end

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
    skill_name = chixique.name,
    prompt = "#chi_xique_target:::" .. card:toLogString(),
    cancelable = (min_num == 0),
  })

  if #tos < min_num then
    return nil
  end
  return tos
end

chixique:addEffect("active", {
  anim_type = "offensive",
  prompt = "#chixique",
  card_num = 1,
  target_num = 0,
  max_phase_use_time = 1,

  can_use = function(self, player)
    return player.phase == Player.Play
      and player:usedSkillTimes(chixique.name, Player.HistoryPhase) == 0
  end,

  interaction = function(self, player)
    local remain = player:getMark("chi_xique_remain")
    if type(remain) ~= "number" or remain <= 0 then return end
    local all_names = get_names_leq(remain)
    local names = player:getViewAsCardNames("chidieren", all_names)
    if #names == 0 then return end
    return UI.TianzongCardNameBox {
      choices = names,
      all_choices = all_names,
    }
  end,

  card_filter = function(self, player, to_select, selected)
    return #selected == 0 and not player:prohibitDiscard(to_select)
  end,

  target_filter = Util.FalseFunc,

  on_use = function(self, room, effect)
    local player = effect.from
    local base = Fk:getCardById(effect.cards[1])
    local remain = base:getNameLength(true)

    room:throwCard(effect.cards, chixique.name, player, player)
    if player.dead then return end

    while remain > 0 and not player.dead do
      room:setPlayerMark(player, "chi_xique_remain", remain)

      local all_names = get_names_leq(remain)
      local names = player:getViewAsCardNames("chidieren", all_names)
      if #names == 0 then break end

      local choice = room:askToChoice(player, {
        choices = names,
        skill_name = chixique.name,
        prompt = "#chi_xique_choose:::" .. remain,
      })

      if not choice or choice == "" then break end

      local len = get_name_len(choice)
      if len <= 0 or len > remain then break end

      local tos = choose_targets_for_virtual(room, player, choice)
      if tos == nil then break end

      room:useVirtualCard(choice, nil, player, tos, chixique.name, true)
      remain = remain - len
    end

    room:setPlayerMark(player, "chi_xique_remain", 0)
  end,
})

return chixique
