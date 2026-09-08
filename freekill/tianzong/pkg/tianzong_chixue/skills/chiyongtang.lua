local chiyongtang = fk.CreateSkill{
  name = "chiyongtang",
  tags = { Skill.Compulsory },
}

local TURN_MARK = "chiyongtang_suits-turn"

local function suit_symbol(s)
  if s == "log_spade" then return "♠" end
  if s == "log_heart" then return "♥" end
  if s == "log_club" then return "♣" end
  if s == "log_diamond" then return "♦" end
  return s or ""
end

local function is_in_drunk_state(player)
  return (player.drank or 0) + player:getMark("@jiudun_drank") > 0
end

local function get_adjacent_target(player, same_suit)
  if same_suit then
    return player:getLastAlive()
  else
    return player:getNextAlive()
  end
end

local function already_triggered(card)
  return card and card:getMark("@@chiyongtang_once-turn") > 0
end

local function mark_triggered(room, card)
  if card then
    room:setCardMark(card, "@@chiyongtang_once-turn", 1)
  end
end

local function clear_marks(room)
  local all_ids = {}
  for _, id in ipairs(room.draw_pile or {}) do table.insert(all_ids, id) end
  for _, id in ipairs(room.discard_pile or {}) do table.insert(all_ids, id) end
  for _, p in ipairs(room.alive_players) do
    for _, area in ipairs({"h", "e", "j"}) do
      for _, id in ipairs(p:getCardIds(area)) do
        table.insert(all_ids, id)
      end
    end
  end
  for _, id in ipairs(all_ids) do
    local c = Fk:getCardById(id)
    if c then room:setCardMark(c, "@@chiyongtang_once-turn", 0) end
  end
end

Fk:addQmlMark{
  name = "chiyongtang",
  how_to_show = function(name, value, p)
    if not p then return "" end
    local suits = p:getTableMark(TURN_MARK)
    if type(suits) ~= "table" or #suits == 0 then return "" end
    return table.concat(table.map(suits, suit_symbol), "/")
  end,
}

local function do_yongtang(room, player, data, user_is_self)
  if already_triggered(data.card) then return end
  mark_triggered(room, data.card)

  local judge = {
    who = player,
    reason = chiyongtang.name,
    pattern = ".",
  }
  room:judge(judge)

  local card = data.card
  local same = judge.card:getSuitString(true) == card:getSuitString(true)

  local extra = get_adjacent_target(player, same)
  if extra and extra:isAlive() and extra ~= player then
    if user_is_self then
      if not table.contains(data.tos or {}, extra)
        and not player:isProhibited(extra, card)
        and card.skill:modTargetFilter(player, extra, data.tos or {}, card, { bypass_times = true }) then
        data:addTarget(extra)
      end
    else
      if not table.contains(data.use.tos or {}, extra)
        and not data.from:isProhibited(extra, card)
        and card.skill:modTargetFilter(data.from, extra, data.use.tos or {}, card, { bypass_times = true }) then
        data:addTarget(extra)
      end
    end
  end

  room:addTableMark(player, TURN_MARK, judge.card:getSuitString(true))
end

chiyongtang:addEffect(fk.TargetSpecified, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    return target == player
      and player:hasSkill(chiyongtang.name)
      and data.card
      and data.card.color == Card.Red
      and (data.card.type == Card.TypeBasic or data.card:isCommonTrick())
      and is_in_drunk_state(player)
  end,
  on_use = function(self, event, target, player, data)
    do_yongtang(player.room, player, data, true)
  end,
})

chiyongtang:addEffect(fk.TargetConfirmed, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    return target == player
      and player:hasSkill(chiyongtang.name)
      and data.card
      and data.card.color == Card.Red
      and (data.card.type == Card.TypeBasic or data.card:isCommonTrick())
      and data.from ~= player
      and is_in_drunk_state(player)
  end,
  on_use = function(self, event, target, player, data)
    do_yongtang(player.room, player, data, false)
  end,
})

chiyongtang:addEffect(fk.TurnEnd, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chiyongtang.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    clear_marks(player.room)
    player.room:setPlayerMark(player, TURN_MARK, 0)
  end,
})

Fk:loadTranslationTable{
  ["@@chiyongtang_once-turn"] = "雍赯·本回合已结算",
}

return chiyongtang
