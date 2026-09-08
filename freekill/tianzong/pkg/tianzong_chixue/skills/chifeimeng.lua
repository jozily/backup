local chifeimeng = fk.CreateSkill{
  name = "chifeimeng",
}

local function get_name_length_by_card(card)
  if not card then return -1 end
  return card:getNameLength(true)
end

local function get_bottom_first_red_id(room)
  local pile = room.draw_pile
  for i = #pile, 1, -1 do
    local id = pile[i]
    local c = Fk:getCardById(id, true)
    if c and c.color == Card.Red then
      return id
    end
  end
end

local function can_use_directly(player, card)
  if not card then return false end
  if player:prohibitUse(card) then return false end

  -- 这些牌如果当前不能使用，就直接判定为不能使用
  if card.trueName == "peach" then
    return player:isWounded()
  end

  -- 其余交给引擎自己的 canUse 判断
  return player:canUse(card)
end

local function use_directly(room, player, card)
  if not can_use_directly(player, card) then
    return false
  end

  -- 直接视为玩家自己使用，不额外重选目标
  room:useCard{
    card = card,
    from = player,
  }
  return true
end

local function process_opt2(room, player)
  while not player.dead do
    local id = get_bottom_first_red_id(room)
    if not id then return end

    room:turnOverCardsFromDrawPile(player, { id }, chifeimeng.name)
    local card = Fk:getCardById(id, true)
    if not card then return end

    if room:getCardArea(id) == Card.DrawPile then
      room:moveCardTo(id, Card.Processing, nil, fk.ReasonPut, chifeimeng.name, nil, true, player)
    end

    if room:getCardArea(id) ~= Card.Processing then
      return
    end

    local ok = use_directly(room, player, card)
    if ok then
      if room:getCardArea(id) == Card.Processing then
        room:moveCardTo(id, Card.DiscardPile, nil, fk.ReasonPutIntoDiscardPile, chifeimeng.name, nil, true, player)
      end
    else
      -- 不能使用则立刻中止，并置于牌堆顶
      if room:getCardArea(id) == Card.Processing then
        room:moveCards({
          ids = { id },
          toArea = Card.DrawPile,
          moveReason = fk.ReasonPut,
          skillName = chifeimeng.name,
          drawPilePosition = 1,
        })
      end
      return
    end
  end
end

local function process_opt1(room, player, other, source_card)
  if not other or other.dead or not source_card then return end
  local need_len = get_name_length_by_card(source_card)
  if need_len <= 0 then return end

  local candidates = table.filter(other:getCardIds("he"), function(id)
    local c = Fk:getCardById(id)
    return c and c:getNameLength(true) == need_len
  end)

  if #candidates > 0 then
    local id = room:tableRandomPick(candidates)
    room:obtainCard(player, id, false, fk.ReasonPrey, player, chifeimeng.name)
    return
  end

  -- 若无改为牌堆随机获得一张
  local pile_ids = {}
  for _, id in ipairs(room.draw_pile) do
    local c = Fk:getCardById(id)
    if c and c:getNameLength(true) == need_len then
      table.insert(pile_ids, id)
    end
  end

  if #pile_ids > 0 then
    local id = room:tableRandomPick(pile_ids)
    room:obtainCard(player, id, false, fk.ReasonPrey, player, chifeimeng.name)
  end
end

local function do_feimeng(player, data)
  local room = player.room
  local other = nil
  if data.from == player then
    other = data.to
  elseif data.to == player then
    other = data.from
  end

  local choices = { "chi_feimeng_opt2" }
  if other and not other.dead then
    table.insert(choices, 1, "chi_feimeng_opt1")
  end

  local choice = room:askToChoice(player, {
    choices = choices,
    skill_name = chifeimeng.name,
    prompt = "#chifeimeng",
  })

  if choice == "chi_feimeng_opt1" then
    process_opt1(room, player, other, data.card)
  else
    process_opt2(room, player)
  end
end

chifeimeng:addEffect(fk.Damage, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    return data.from == player
      and player:hasSkill(chifeimeng.name)
      and player:usedSkillTimes(chifeimeng.name, Player.HistoryTurn) == 0
      and data.card ~= nil
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = chifeimeng.name,
      prompt = "#chifeimeng",
    })
  end,
  on_use = function(self, event, target, player, data)
    do_feimeng(player, data)
  end,
})

chifeimeng:addEffect(fk.Damaged, {
  anim_type = "masochism",
  can_trigger = function(self, event, target, player, data)
    return target == player
      and player:hasSkill(chifeimeng.name)
      and player:usedSkillTimes(chifeimeng.name, Player.HistoryTurn) == 0
      and data.card ~= nil
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = chifeimeng.name,
      prompt = "#chifeimeng",
    })
  end,
  on_use = function(self, event, target, player, data)
    do_feimeng(player, data)
  end,
})

return chifeimeng
