local yichu = fk.CreateSkill { name = "tianzong_toaru__yichu", tags = { Skill.Compulsory } }
local bonus, saved = "tianzong_toaru__yichu_maxhp", "tianzong_toaru__yichu_saved"
local saved_visible = "@[yichu_saved]"

Fk:addQmlMark {
  name = "yichu_saved",
  how_to_show = function() return "衣橱 永久获得" end,
  qml = function(name, value)
    return {
      url = "packages/tianzong/qml/YichuMarkBox.qml",
      prop = { name = name, value = type(value) == "table" and value or {} },
    }
  end,
}

local function sync(room, player)
  local old = player:getMark(bonus)
  if type(old) ~= "number" then old = 0 end
  local now = #player:getCardIds("e")
  if old ~= now then
    room:setPlayerMark(player, bonus, now)
    room:changeMaxHp(player, now - old)
  end
  for _, name in ipairs(player:getTableMark(saved)) do
    for _, skill in ipairs(Fk:cloneCard(name):getEquipSkills(player)) do
      if not player:hasSkill(skill, true, true) then
        room:handleAddLoseSkills(player, skill.name, nil, false, true)
      end
    end
  end
  local saved_cards = player:getTableMark(saved)
  room:setPlayerMark(player, saved_visible, #saved_cards > 0 and table.simpleClone(saved_cards) or 0)
end

yichu:addEffect("maxcards", {
  correct_func = function(self, player)
    if player:hasSkill(yichu.name) then return #player:getCardIds("e") end
  end,
})
yichu:addEffect("atkrange", {
  virtual_weapon_func = function(self, player)
    local n = 0
    for _, name in ipairs(player:getTableMark(saved)) do
      local card = Fk:cloneCard(name)
      if card.sub_type == Card.SubtypeWeapon then n = math.max(n, card.attack_range or 1) end
    end
    return n > 0 and n or nil
  end,
})
yichu:addEffect(fk.GameStart, {
  can_trigger = function(self, event, target, player) return player:hasSkill(yichu.name) end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player) sync(player.room, player) end,
})
yichu:addEffect(fk.RoundStart, {
  can_trigger = function(self, event, target, player)
    return target == player and player:hasSkill(yichu.name) and
      table.find(player.room.draw_pile, function(id) return Fk:getCardById(id).type == Card.TypeEquip end)
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player)
    local room = player.room
    local ids = table.filter(room.draw_pile, function(id)
      local card = Fk:getCardById(id)
      return card.type == Card.TypeEquip and player:canMoveCardIntoEquip(id, true)
    end)
    if #ids > 0 then room:moveCardIntoEquip(player, room:tableRandomPick(ids), yichu.name, true, player) end
  end,
})
yichu:addEffect(fk.AfterCardsMove, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(yichu.name, true) and table.find(data, function(move)
      return (move.from == player and table.find(move.moveInfo, function(info) return info.fromArea == Card.PlayerEquip end)) or
        (move.to == player and move.toArea == Card.PlayerEquip)
    end)
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player, data)
    local room = player.room
    -- The wardrobe effect triggers only once per game. If several equipment
    -- cards leave in that same move batch, record all of them.
    if player:getMark("tianzong_toaru__yichu_first") == 0 then
      local found = false
      for _, move in ipairs(data) do
        if move.from == player then
          for _, info in ipairs(move.moveInfo) do
            if info.fromArea == Card.PlayerEquip then
              local card = Fk:getCardById(info.cardId, true)
              if card then
                found = true
                if not table.contains(player:getTableMark(saved), card.name) then
                  room:addTableMarkIfNeed(player, saved, card.name)
                end
              end
            end
          end
        end
      end
      if found then room:setPlayerMark(player, "tianzong_toaru__yichu_first", 1) end
    end
    sync(room, player)
  end,
})
yichu:addLoseEffect(function(self, player)
  local n = player:getMark(bonus)
  if type(n) == "number" and n > 0 then player.room:changeMaxHp(player, -n) end
  player.room:setPlayerMark(player, bonus, 0)
end)
yichu:addEffect(fk.Damage, {
  can_trigger = function(self, event, target, player, data)
    return data.from == player and player:hasSkill(yichu.name) and data.to and not data.to.dead and
      player:getMark("tianzong_toaru__yichu_damage-round") == 0 and not data.to:isNude()
  end,
  on_cost = Util.TrueFunc,
  on_use = function(self, event, target, player, data)
    local room, to = player.room, data.to
    room:setPlayerMark(player, "tianzong_toaru__yichu_damage-round", 1)
    local id = room:tableRandomPick(to:getCardIds("he"))
    room:throwCard(id, yichu.name, to, player)
    if Fk:getCardById(id, true).type == Card.TypeEquip and room:getCardArea(id) == Card.DiscardPile and not player.dead then
      room:obtainCard(player, id, true, fk.ReasonJustMove, player, yichu.name)
    end
  end,
})
return yichu
