local niwoxianwang = fk.CreateSkill{
  name = "niwoxianwang",
  tags = { Skill.Compulsory },
}

local WIND_MARK = "niwoxungu_wind"
local USED_MARK = "niwoxianwang_names-turn"

local function matching_wind(player, card)
  if not card or card:hasSkill("niwoxungu") or #Card:getIdList(card) == 0 then return end
  return table.find(player:getTableMark(WIND_MARK), function(id)
    return Fk:getCardById(id).trueName == card.trueName
  end)
end

local function consume_wind(player, id)
  local room = player.room
  local suit = Fk:getCardById(id).suit
  local winds = table.filter(player:getTableMark(WIND_MARK), function(wind_id) return wind_id ~= id end)
  room:setPlayerMark(player, WIND_MARK, winds)
  room:throwCard(id, niwoxianwang.name, player, player)
  local n = #table.filter(winds, function(wind_id) return Fk:getCardById(wind_id).suit == suit end)
  if n > 0 and player:isAlive() then player:drawCards(n, niwoxianwang.name) end
end

niwoxianwang:addEffect(fk.CardUsing, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and matching_wind(player, data.card) ~= nil and
      not table.contains(player:getTableMark(USED_MARK), data.card.trueName)
  end,
  on_use = function(self, event, target, player, data)
    local id = matching_wind(player, data.card)
    if not id then return end
    player.room:addTableMarkIfNeed(player, USED_MARK, data.card.trueName)
    consume_wind(player, id)
    data.additionalEffect = (data.additionalEffect or 0) + 1
  end,
})

niwoxianwang:addEffect(fk.CardResponding, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(self.name) and matching_wind(player, data.card) ~= nil and
      not table.contains(player:getTableMark(USED_MARK), data.card.trueName)
  end,
  on_use = function(self, event, target, player, data)
    local id = matching_wind(player, data.card)
    if id then
      player.room:addTableMarkIfNeed(player, USED_MARK, data.card.trueName)
      consume_wind(player, id)
    end
  end,
})

return niwoxianwang
