local chiyanzu = fk.CreateSkill{
  name = "chiyanzu",
}

local function get_name_length(card)
  if not card then return 0 end
  if card.getNameLength then
    return card:getNameLength(true)
  end
  local s = Fk:translate(card.name)
  local n = 0
  for _ in string.gmatch(s, "[%z\1-\127\194-\244][\128-\191]*") do
    n = n + 1
  end
  return n
end

local function get_turn_discard_ids(room)
  local ids = room:getBanner("chiyanzu_turn_discard") or {}
  local ret = {}
  for _, id in ipairs(ids) do
    if table.contains(room.discard_pile, id) then
      table.insert(ret, id)
    end
  end
  return ret
end

local function move_to_processing(room, player, id, skill_name)
  if not id then return false end
  if room.moveCardTo then
    local ok = pcall(function()
      room:moveCardTo(id, Card.Processing, nil, fk.ReasonJustMove, skill_name, nil, true, player and player.id or nil)
    end)
    if ok then return true end
    ok = pcall(function()
      room:moveCardTo(id, Card.Processing, nil, fk.ReasonJustMove, skill_name, nil, false, player and player.id or nil)
    end)
    if ok then return true end
  end
  return false
end

local function refresh_if_needed(player, card)
  local room = player.room
  local len = get_name_length(card)
  local alive = #room.alive_players
  if len > alive then
    if player.usedSkillTimes and player.setSkillUseHistory then
      if player:usedSkillTimes("chiyanzu", Player.HistoryTurn) > 0 then
        player:setSkillUseHistory("chiyanzu", 0, Player.HistoryTurn)
      end
    end
    player:drawCards(alive, "chiyanzu")
  end
end

local function card_is_valid_for_pattern(card, pattern)
  if not card then return false end
  if not (card.type == Card.TypeBasic or (card.type == Card.TypeTrick and card:isCommonTrick())) then
    return false
  end
  if not pattern or pattern == "" then
    return true
  end
  if Exppattern and Exppattern.Parse then
    local ok, exp = pcall(function()
      return Exppattern:Parse(pattern)
    end)
    if ok and exp then
      local ok2, matched = pcall(function()
        return exp:match(card)
      end)
      if ok2 then
        return matched
      end
    end
  end
  return true
end

chiyanzu:addEffect(fk.AfterCardsMove, {
  can_refresh = function(self, event, target, player, data)
    return data ~= nil
  end,
  on_refresh = function(self, event, target, player, data)
    local room = nil
    if target and target.room then
      room = target.room
    elseif player and player.room then
      room = player.room
    end
    if not room then return end

    local ids = room:getBanner("chiyanzu_turn_discard") or {}
    for _, move in ipairs(data) do
      if move.toArea == Card.DiscardPile then
        for _, info in ipairs(move.moveInfo) do
          table.insert(ids, info.cardId)
        end
      end
    end
    room:setBanner("chiyanzu_turn_discard", ids)
  end,
})

chiyanzu:addEffect(fk.TurnStart, {
  can_refresh = function(self, event, target, player, data)
    return target ~= nil
  end,
  on_refresh = function(self, event, target, player, data)
    target.room:setBanner("chiyanzu_turn_discard", {})
  end,
})

local chiyanzu_use_spec = {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    if not player or target ~= player then return false end
    if not player:hasSkill(self.name) or player.dead then return false end
    if player:getMark("chiyanzu_block-turn") > 0 then return false end
    if player:usedSkillTimes(self.name, Player.HistoryTurn) > 0 then return false end
    if not data then return false end
    local ids = get_turn_discard_ids(player.room)
    return #ids > 0
  end,
  on_cost = function(self, event, target, player, data)
    local room = player.room
    local ids = get_turn_discard_ids(room)
    local valid = {}
    local pattern = data and data.pattern or nil

    for _, id in ipairs(ids) do
      local c = Fk:getCardById(id)
      if card_is_valid_for_pattern(c, pattern) then
        table.insert(valid, id)
      end
    end

    if #valid == 0 then return false end

    local chosen = room:askToChooseCards(player, {
      target = player, flag = { card_data = { { self.name, valid } } },
      min = 0, max = 1, skill_name = self.name, prompt = "#chiyanzu_choose_use", cancelable = true,
    })
    if #chosen > 0 then
      event:setCostData(self, chosen[1])
      return true
    end
    return false
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local id = event:getCostData(self)
    local card = id and Fk:getCardById(id) or nil
    if not card then return end

    room:setPlayerMark(player, "chiyanzu_block-turn", 1)
    move_to_processing(room, player, id, self.name)

    data.result = {
      from = player,
      card = Fk:getCardById(id) or card,
    }
    if event == fk.AskForCardUse then data.result.tos = {} end

    refresh_if_needed(player, Fk:getCardById(id) or card)
    room:setPlayerMark(player, "chiyanzu_block-turn", 0)
  end,
}
chiyanzu:addEffect(fk.AskForCardUse, chiyanzu_use_spec)
chiyanzu:addEffect(fk.AskForCardResponse, chiyanzu_use_spec)

chiyanzu:addEffect(fk.Damaged, {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    if not player or target ~= player then return false end
    if not player:hasSkill(self.name) or player.dead then return false end
    if player:getMark("chiyanzu_block-turn") > 0 then return false end
    if player:usedSkillTimes(self.name, Player.HistoryTurn) > 0 then return false end

    local ids = get_turn_discard_ids(player.room)
    return #ids > 0
  end,
  on_cost = function(self, event, target, player, data)
    local room = player.room
    local ids = get_turn_discard_ids(room)
    local valid = {}

    for _, id in ipairs(ids) do
      local c = Fk:getCardById(id)
      if c and (c.type == Card.TypeBasic or (c.type == Card.TypeTrick and c:isCommonTrick())) then
        table.insert(valid, id)
      end
    end

    if #valid == 0 then return false end

    local chosen = room:askToChooseCards(player, {
      target = player, flag = { card_data = { { self.name, valid } } },
      min = 0, max = 1, skill_name = self.name, prompt = "#chiyanzu_choose_damaged", cancelable = true,
    })
    if #chosen > 0 then
      event:setCostData(self, chosen[1])
      return true
    end
    return false
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local id = event:getCostData(self)
    local card = id and Fk:getCardById(id) or nil
    if not card then return end

    room:setPlayerMark(player, "chiyanzu_block-turn", 1)
    local use = room:askToUseRealCard(player, {
      pattern = { id }, skill_name = self.name, prompt = "#chiyanzu_choose_damaged",
      cancelable = false, skip = true, extra_data = { expand_pile = { id }, bypass_times = true },
    })
    if use then room:useCard(use) end
    if not player.dead then
      refresh_if_needed(player, Fk:getCardById(id) or card)
    end
    room:setPlayerMark(player, "chiyanzu_block-turn", 0)
  end,
})

Fk:loadTranslationTable{
  ["chiyanzu"] = "衍族",
  [":chiyanzu"] = "每回合限一次，当你需要使用或打出一张基本牌或普通锦囊牌时，或当你受到伤害后，你可以使用本回合进入弃牌堆的一张可使用的基本牌或普通锦囊牌。若如此做，你先将此牌置入处理区再使用或打出之。若此牌牌名字数大于场上角色数，你刷新此技能且摸场上角色数张牌。",

  ["#chiyanzu_choose_use"] = "衍族：选择本回合进入弃牌堆的一张可使用/打出的基本牌或普通锦囊牌",
  ["#chiyanzu_choose_damaged"] = "衍族：选择本回合进入弃牌堆的一张基本牌或普通锦囊牌使用",
}

return chiyanzu
