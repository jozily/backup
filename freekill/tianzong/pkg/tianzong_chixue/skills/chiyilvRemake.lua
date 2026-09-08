local chiyilvRemake = fk.CreateSkill{
  name = "chiyilvRemake",
  tags = { Skill.Compulsory },
}

local XUNFU_MARK = "chixunfu_names-round"

local function record_count(player)
  local n = 0
  for _, name in ipairs(player:getTableMark(XUNFU_MARK)) do
    local card = Fk:cloneCard(name)
    if card and card.type == Card.TypeTrick then n = n + 1 end
  end
  return math.max(n, 1)
end

local function resolve(player)
  local room = player.room
  local color = room:askToChoice(player, {
    choices = { "red", "black" },
    skill_name = chiyilvRemake.name,
    prompt = "#chiyilvRemake-color",
  })
  local ids = room:getNCards(record_count(player), "top")
  if #ids == 0 then return end
  room:moveCards{
    ids = ids,
    toArea = Card.Processing,
    moveReason = fk.ReasonJustMove,
    skillName = chiyilvRemake.name,
    proposer = player.id,
    moveVisible = true,
  }

  local gain = {}
  for _, id in ipairs(ids) do
    if room:getCardArea(id) == Card.Processing then
      local card = Fk:getCardById(id)
      local card_color = card.color == Card.Red and "red" or "black"
      if card_color ~= color then
        local use = room:askToUseRealCard(player, {
          pattern = { id },
          expand_pile = { id },
          skill_name = chiyilvRemake.name,
          prompt = "#chiyilvRemake-use:::" .. card.name,
          cancelable = true,
          skip = true,
        })
        if use then room:useCard(use) else table.insert(gain, id) end
      else
        table.insert(gain, id)
      end
    end
  end
  gain = table.filter(gain, function(id) return room:getCardArea(id) == Card.Processing end)
  if #gain > 0 and player:isAlive() then
    room:obtainCard(player, gain, true, fk.ReasonPrey, player, chiyilvRemake.name)
  end
  room:cleanProcessingArea(ids)
end

Fk:loadTranslationTable{
  ["chiyilvRemake"] = "绎律",
  [":chiyilvRemake"] = "锁定技，当你的体力值发生变化时，或一号位的准备阶段开始时，你选择一种颜色并依次展示牌堆顶X张牌。你依次可以使用其中另一种颜色的牌，然后获得其余的牌（X为“徇覆”已记录的锦囊牌牌名数且至少为1）。",
  ["#chiyilvRemake-color"] = "绎律：选择一种颜色",
  ["#chiyilvRemake-use"] = "绎律：使用展示的%arg",
}

chiyilvRemake:addEffect(fk.HpChanged, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chiyilvRemake.name)
  end,
  on_use = function(self, event, target, player, data) resolve(player) end,
})

chiyilvRemake:addEffect(fk.EventPhaseStart, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chiyilvRemake.name) and target == player.room.players[1] and
      target.phase == Player.Start
  end,
  on_use = function(self, event, target, player, data) resolve(player) end,
})

return chiyilvRemake
