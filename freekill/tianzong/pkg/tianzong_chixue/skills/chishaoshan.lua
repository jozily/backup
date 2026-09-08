local chishaoshan = fk.CreateSkill{ name = "chishaoshan" }
local USED = "chishaoshan_used-turn"
local TIMES = "chishaoshan_times-turn"

local function bonus_mark(index) return "chishaoshan_bonus" .. index end
local function option(index) return "chishaoshan_opt" .. index end

local function base_value(player, index)
  if index == 1 then return player.hp end
  if index == 2 then return player:getMaxCards() end
  if index == 3 then return 1 + player:getMark("chishaoshan_slash") end
  if index == 4 then return player:distanceTo(player.room.players[1]) end
  if index == 5 then return player:getHandcardNum() end
  return player.maxHp
end

local function set_value(room, player, index, value)
  local overflow = 0
  value = math.max(0, value)
  if index == 1 then
    if value > player.maxHp then overflow = value - player.maxHp; value = player.maxHp end
    if value > player.hp then room:recover{ who = player, num = value - player.hp, skillName = chishaoshan.name }
    elseif value < player.hp then room:loseHp(player, player.hp - value, chishaoshan.name) end
  elseif index == 2 then
    room:setPlayerMark(player, "chishaoshan_maxcards", value - player.hp)
  elseif index == 3 then
    room:setPlayerMark(player, "chishaoshan_slash", math.max(value - 1, 0))
  elseif index == 4 then
    local current = player:distanceTo(room.players[1])
    room:setPlayerMark(player, "chishaoshan_distance", player:getMark("chishaoshan_distance") + value - current)
  elseif index == 5 then
    if value > player:getHandcardNum() then player:drawCards(value - player:getHandcardNum(), chishaoshan.name)
    elseif value < player:getHandcardNum() then
      room:askToDiscard(player, { min_num = player:getHandcardNum() - value, max_num = player:getHandcardNum() - value, include_equip = false, skill_name = chishaoshan.name, cancelable = false })
    end
  else
    room:changeMaxHp(player, value - player.maxHp)
  end
  return overflow
end

chishaoshan:addEffect("active", {
  card_num = 0,
  target_num = 0,
  can_use = function(self, player) return #player:getTableMark(USED) <= 4 end,
  on_use = function(self, room, effect)
    local player = effect.from
    local used = player:getTableMark(USED)
    local available = table.filter({ 1, 2, 3, 4, 5, 6 }, function(i) return not table.contains(used, i) end)
    local first_choice = room:askToChoice(player, { choices = table.map(available, option), skill_name = chishaoshan.name, prompt = "#chishaoshan-first" })
    local first = tonumber(string.sub(first_choice, -1))
    table.removeOne(available, first)
    local second_choice = room:askToChoice(player, { choices = table.map(available, option), skill_name = chishaoshan.name, prompt = "#chishaoshan-second" })
    local second = tonumber(string.sub(second_choice, -1))
    local first_value = base_value(player, first) + player:getMark(bonus_mark(first))
    local second_value = base_value(player, second) + player:getMark(bonus_mark(second))
    room:addTableMark(player, USED, first)
    room:addTableMark(player, USED, second)
    room:setPlayerMark(player, bonus_mark(first), 0)
    room:setPlayerMark(player, bonus_mark(second), 0)
    for i = 1, 6 do
      if i ~= first and i ~= second then room:addPlayerMark(player, bonus_mark(i), 1) end
    end
    local overflow = set_value(room, player, first, second_value) + set_value(room, player, second, first_value)
    room:addPlayerMark(player, TIMES, 1)
    if overflow > 0 and player:isAlive() then
      if player:getMark(TIMES) % 2 == 1 then player:drawCards(overflow, chishaoshan.name)
      else room:askToDiscard(player, { min_num = math.min(overflow, #player:getCardIds("he")), max_num = math.min(overflow, #player:getCardIds("he")), include_equip = true, skill_name = chishaoshan.name, cancelable = false }) end
    end
  end,
})

chishaoshan:addEffect("maxcards", { correct_func = function(self, player) return player:getMark("chishaoshan_maxcards") end })
chishaoshan:addEffect("targetmod", { residue_func = function(self, player, skill, scope, card) if card and card.trueName == "slash" then return player:getMark("chishaoshan_slash") end end })
chishaoshan:addEffect("distance", { correct_func = function(self, from, to) if to == from.room.players[1] then return from:getMark("chishaoshan_distance") end end })

return chishaoshan
