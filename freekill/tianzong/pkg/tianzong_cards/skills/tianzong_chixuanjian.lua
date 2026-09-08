local chixuanjian = fk.CreateSkill{
  name = "#tianzong_chixuanjian_skill",
  tags = { Skill.Compulsory },
  attached_equip = "tianzong_chixuanjian",
}

local GROUP_MARK = "@@tianzong_chixuanjian_group"
local TOTAL_MARK = "@@tianzong_chixuanjian_total"
local NEXT_MARK = "tianzong_chixuanjian_next"

local function slash_names(player)
  return player:getViewAsCardNames(chixuanjian.name, table.filter(Fk:getAllCardNames("b"), function(name)
    return Fk:cloneCard(name).trueName == "slash"
  end))
end

chixuanjian:addEffect("viewas", {
  pattern = "slash",
  prompt = "#tianzong_chixuanjian",
  handly_pile = true,
  interaction = function(self, player)
    local names = slash_names(player)
    if #names > 0 then return UI.TianzongCardNameBox{ choices = names, all_choices = names } end
  end,
  card_filter = function(self, player, to_select, selected)
    local card = Fk:getCardById(to_select)
    if card.name == "tianzong_chixuanjian" then return false end
    if card.type == Card.TypeEquip and #selected == 0 then return true end
    if #selected > 0 and Fk:getCardById(selected[1]).type == Card.TypeEquip then return false end
    if #selected == 0 then return true end
    return card.suit == Fk:getCardById(selected[1]).suit
  end,
  view_as = function(self, player, cards)
    if #cards == 0 or not self.interaction.data then return end
    local card = Fk:cloneCard(self.interaction.data)
    card.skillName = chixuanjian.name
    card:addSubcards(cards)
    return card
  end,
})

chixuanjian:addEffect(fk.CardUsing, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(chixuanjian.name)
      and data.card.trueName == "slash" and table.contains(data.card.skillNames, chixuanjian.name)
  end,
  on_refresh = function(self, event, target, player, data)
    local ids = data.card.subcards
    if #ids == 0 then return end
    local suit = Fk:getCardById(ids[1]).suit
    if suit == Card.NoSuit or not table.every(ids, function(id) return Fk:getCardById(id).suit == suit end) then return end
    local room = player.room
    room:addPlayerMark(player, NEXT_MARK, 1)
    local group = player:getMark(NEXT_MARK)
    for _, id in ipairs(ids) do
      room:setCardMark(Fk:getCardById(id), GROUP_MARK, group)
      room:setCardMark(Fk:getCardById(id), TOTAL_MARK, #ids)
    end
  end,
})

chixuanjian:addEffect(fk.AfterCardsMove, {
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chixuanjian.name) then return false end
    for _, move in ipairs(data) do
      if move.toArea == Card.DiscardPile then
        for _, info in ipairs(move.moveInfo) do
          if Fk:getCardById(info.cardId):getMark(GROUP_MARK) > 0 then return true end
        end
      end
    end
    return false
  end,
  on_use = function(self, event, target, player, data)
    local room, groups = player.room, {}
    for _, move in ipairs(data) do
      if move.toArea == Card.DiscardPile then
        for _, info in ipairs(move.moveInfo) do
          local card = Fk:getCardById(info.cardId)
          local group = card:getMark(GROUP_MARK)
          if group > 0 then groups[group] = card:getMark(TOTAL_MARK) end
        end
      end
    end
    for group, total in pairs(groups) do
      local ids = table.filter(room.discard_pile, function(id) return Fk:getCardById(id):getMark(GROUP_MARK) == group end)
      if #ids >= total then
        player:drawCards(math.min(total, 3), chixuanjian.name)
        break
      end
    end
  end,
})

Fk:loadTranslationTable{
  ["#tianzong_chixuanjian_skill"] = "炽·玄剑",
  ["#tianzong_chixuanjian"] = "炽·玄剑：将同花色牌或一张其他装备牌当任意【杀】使用或打出",
}

return chixuanjian
