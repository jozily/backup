local niwocunduan = fk.CreateSkill{ name = "niwocunduan" }
local SLOTS = { Player.WeaponSlot, Player.ArmorSlot, Player.DefensiveRideSlot, Player.OffensiveRideSlot, Player.TreasureSlot }

local function empty_secondary(player)
  local result = {}
  for _, slot in ipairs(SLOTS) do
    local capacity, occupied = 0, 0
    for _, s in ipairs(player.equipSlots) do if s == slot then capacity = capacity + 1 end end
    for _, id in ipairs(player:getCardIds("e")) do
      if Util.convertSubtypeAndEquipSlot(Fk:getCardById(id).sub_type) == slot then occupied = occupied + 1 end
    end
    if capacity > 1 and occupied < capacity then table.insert(result, slot) end
  end
  return result
end

niwocunduan:addEffect(fk.GameStart, {
  can_refresh = function(self, event, target, player, data) return player:hasSkill(niwocunduan.name, true) end,
  on_refresh = function(self, event, target, player, data) player.room:addPlayerEquipSlots(player, SLOTS) end,
})

niwocunduan:addEffect("viewas", {
  pattern = ".|.|.|.|.|basic",
  prompt = "#niwocunduan",
  interaction = function(self, player)
    local names = player:getViewAsCardNames(niwocunduan.name, Fk:getAllCardNames("b"))
    if #names > 0 then return UI.TianzongCardNameBox{ choices = names, all_choices = names } end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if not self.interaction.data then return end
    local card = Fk:cloneCard(self.interaction.data)
    card.skillName = niwocunduan.name
    return card
  end,
  before_use = function(self, player, use)
    local room, current = player.room, player.room.current
    local mine = empty_secondary(player)
    local common = current and table.filter(empty_secondary(current), function(slot) return table.contains(mine, slot) end) or {}
    local equips = table.filter(player:getCardIds("h"), function(id)
      return Fk:getCardById(id).type == Card.TypeEquip
        and table.contains(common, Util.convertSubtypeAndEquipSlot(Fk:getCardById(id).sub_type))
    end)
    if #equips > 0 then
      local id = room:askToChooseCard(player, { target = player, flag = { card_data = { { niwocunduan.name, equips } } }, skill_name = niwocunduan.name })
      local to = current and current:canMoveCardIntoEquip(id, false) and current or player
      room:moveCardTo(id, Card.PlayerEquip, to, fk.ReasonPut, niwocunduan.name, nil, true, player)
    elseif #mine > 0 then
      local slot = room:askToChoice(player, { choices = mine, skill_name = niwocunduan.name, prompt = "#niwocunduan-slot" })
      room:removePlayerEquipSlots(player, slot)
    else
      return ""
    end
    use.extraUse = true
  end,
  enabled_at_play = function(self, player) return #empty_secondary(player) > 0 end,
  enabled_at_response = function(self, player, response) return #empty_secondary(player) > 0 end,
})

Fk:loadTranslationTable{
  ["#niwocunduan"] = "忖断：置入对应装备或移除一个空副装备栏，视为使用或打出基本牌",
  ["#niwocunduan-slot"] = "忖断：选择移除一个空副装备栏",
}
return niwocunduan
