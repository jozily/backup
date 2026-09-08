local chihuangli = fk.CreateSkill{
  name = "chihuangli",
  tags = { Skill.Compulsory },
}
local UNLIMITED = "@@chihuangli_unlimited-turn"

local function all_same(cards, getter)
  if #cards == 0 then return false end
  local value = getter(Fk:getCardById(cards[1]))
  return table.every(cards, function(id) return getter(Fk:getCardById(id)) == value end)
end

local spec = {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chihuangli.name)
      and (event == fk.Damaged or player.phase == Player.Start)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local place = room:askToChoice(player, { choices = { "Top", "Bottom" }, skill_name = chihuangli.name, prompt = "#chihuangli-place" })
    local number = room:askToChoice(player, { choices = { "1", "2", "3" }, skill_name = chihuangli.name, prompt = "#chihuangli-number" })
    local cards = room:getNCards(tonumber(number), place == "Bottom" and "bottom" or "top")
    if #cards == 0 then return end
    local same_color = all_same(cards, function(card) return card.color end)
    local same_type = all_same(cards, function(card) return card.type end)
    local suits = table.map(cards, function(id) return Fk:getCardById(id).suit end)
    local unique_suits = {}
    for _, suit in ipairs(suits) do table.insertIfNeed(unique_suits, suit) end
    local different_suits = #unique_suits == #suits and not table.contains(suits, Card.NoSuit)
    if same_color then
      room:obtainCard(player, cards, true, fk.ReasonPrey, player, chihuangli.name)
      local top = room:getNCards(2, "top")
      if #top > 0 then room:askToGuanxing(player, { cards = top, top_limit = { 0, #top }, bottom_limit = { 0, #top }, skill_name = chihuangli.name }) end
      return
    elseif same_type then
      if room.current and room.current:isAlive() then room:setPlayerMark(room.current, UNLIMITED, 1) end
    elseif different_suits then
      local wounded = table.filter(room.alive_players, function(p) return p:isWounded() end)
      if #wounded > 0 then
        local chosen = room:askToChoosePlayers(player, { targets = wounded, min_num = 1, max_num = 1, skill_name = chihuangli.name, prompt = "#chihuangli-recover", cancelable = false })
        room:recover{ who = chosen[1], num = 1, skillName = chihuangli.name }
      end
    elseif room.current and room.current:isAlive() then
      local current = room.current
      room:loseHp(current, 1, chihuangli.name)
      local all = current:getCardIds("he")
      if #all > 0 and current:isAlive() then room:recastCard(all, current, chihuangli.name) end
    end
    room:askToGuanxing(player, { cards = cards, top_limit = { 0, #cards }, bottom_limit = { 0, #cards }, skill_name = chihuangli.name })
  end,
}
chihuangli:addEffect(fk.EventPhaseStart, spec)
chihuangli:addEffect(fk.Damaged, spec)

chihuangli:addEffect("targetmod", {
  bypass_times = function(self, player) return player:getMark(UNLIMITED) > 0 end,
  bypass_distances = function(self, player) return player:getMark(UNLIMITED) > 0 end,
})
chihuangli:addEffect(fk.CardUsing, {
  can_refresh = function(self, event, target, player, data) return target == player and player:getMark(UNLIMITED) > 0 end,
  on_refresh = function(self, event, target, player, data) player.room:setPlayerMark(player, UNLIMITED, 0) end,
})

return chihuangli
