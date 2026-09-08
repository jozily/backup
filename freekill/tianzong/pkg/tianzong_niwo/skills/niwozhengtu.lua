local niwozhengtu = fk.CreateSkill{ name = "niwozhengtu", tags = { Skill.Compulsory } }
local SUIT_MARK = "niwozhengtu_suits-turn"

local function damage_names(player)
  local names = table.filter(Fk:getAllCardNames("bt"), function(name)
    local card = Fk:cloneCard(name)
    return card.is_damage_card and not card.is_passive and not card.multiple_targets
  end)
  return player:getViewAsCardNames(niwozhengtu.name, names)
end

niwozhengtu:addEffect("viewas", {
  pattern = ".|.|.|.|.|basic,trick",
  prompt = "#niwozhengtu",
  interaction = function(self, player)
    local names = damage_names(player)
    if #names > 0 then return UI.TianzongCardNameBox{ choices = names, all_choices = names } end
  end,
  card_filter = function(self, player, to_select, selected)
    return #selected == 0 and Fk:getCardById(to_select).type == Card.TypeEquip
      and table.contains(player:getCardIds("he"), to_select)
  end,
  view_as = function(self, player, cards)
    if #cards ~= 1 or not self.interaction.data then return end
    local card = Fk:cloneCard(self.interaction.data)
    card.skillName = niwozhengtu.name
    card:addSubcard(cards[1])
    return card
  end,
  before_use = function(self, player, use)
    local source = Fk:getCardById(use.card.subcards[1])
    if source.suit ~= Card.NoSuit then player.room:addTableMarkIfNeed(player, SUIT_MARK, source.suit) end
  end,
})

niwozhengtu:addEffect("distance", {
  fixed_func = function(self, from, to)
    if (from:hasSkill(niwozhengtu.name) and (to == from:getNextAlive() or to == from:getLastAlive()))
      or (to:hasSkill(niwozhengtu.name) and (from == to:getNextAlive() or from == to:getLastAlive())) then return 1 end
  end,
})

niwozhengtu:addEffect("prohibit", {
  prohibit_use = function(self, player, card)
    return table.find(Fk:currentRoom().alive_players, function(p)
      return table.contains(p:getTableMark(SUIT_MARK), card.suit)
    end)
  end,
  prohibit_response = function(self, player, card)
    return table.find(Fk:currentRoom().alive_players, function(p)
      return table.contains(p:getTableMark(SUIT_MARK), card.suit)
    end)
  end,
  prohibit_discard = function(self, player, card)
    return table.find(Fk:currentRoom().alive_players, function(p)
      return table.contains(p:getTableMark(SUIT_MARK), card.suit)
    end)
  end,
})

Fk:loadTranslationTable{ ["#niwozhengtu"] = "铮途：将一张装备牌当任意单体伤害牌使用或打出" }
return niwozhengtu
