local niwoxungu = fk.CreateSkill{
  name = "niwoxungu",
}

local WIND_MARK = "niwoxungu_wind"

niwoxungu:addEffect(fk.RoundStart, {
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(niwoxungu.name)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local winds = player:getTableMark(WIND_MARK)
    
    if winds and #winds > 0 then
      for _, wind_card_id in ipairs(winds) do
        room:throwCard({wind_card_id}, niwoxungu.name, player, player)
      end
    end
    
    local judged_cards = {}
    local card_names = {}
    local found_duplicate = false
    
    while not found_duplicate do
      local judge_card = room:getNextJudge(player)
      table.insert(judged_cards, judge_card)
      
      local card_name = judge_card:getName()
      if table.contains(card_names, card_name) then
        found_duplicate = true
      else
        table.insert(card_names, card_name)
      end
    end
    
    local equipment_cards = {}
    local other_cards = {}
    
    for _, card in ipairs(judged_cards) do
      if card:isEquip() then
        table.insert(equipment_cards, card:getId())
      else
        table.insert(other_cards, card:getId())
      end
    end
    
    if #equipment_cards > 0 then
      room:obtainCard(player, equipment_cards, false, fk.ReasonJustify)
    end
    
    if #other_cards > 0 then
      room:setPlayerMark(player, WIND_MARK, other_cards)
    end
  end,
})

niwoxungu:addEffect("viewas", {
  pattern = ".",
  prompt = "#niwoxungu",
  
  interaction = function(self, player)
    local winds = player:getTableMark(WIND_MARK)
    if not winds or #winds == 0 then return end
    if player:usedSkillTimes(niwoxungu.name, Player.HistoryRound) > 0 then return end
    
    local all_names = Fk:getAllCardNames("bt")
    local names = player:getViewAsCardNames(niwoxungu.name, all_names)
    if #names > 0 then
      return UI.TianzongCardNameBox { choices = names, all_choices = all_names }
    end
  end,
  
  filter_pattern = {
    min_num = 1,
    max_num = 1,
    pattern = "",
    subcards = {}
  },
  
  card_filter = function(self, to_filter, player, focused)
    local winds = player:getTableMark(WIND_MARK)
    if not winds or #winds == 0 then return false end
    return table.contains(winds, to_filter)
  end,
  
  view_as = function(self, player, cards)
    if #cards ~= 1 or not self.interaction or not self.interaction.data then return nil end
    local wind_id = cards[1]
    local card = Fk:cloneCard(self.interaction.data)
    card:addSubcards({wind_id})
    card.skillName = niwoxungu.name
    return card
  end,
  
  before_use = function(self, player, use)
    local room = player.room
    local wind_id = use.card.subcards[1]
    local winds = player:getTableMark(WIND_MARK)
    
    local new_winds = {}
    for _, id in ipairs(winds) do
      if id ~= wind_id then
        table.insert(new_winds, id)
      end
    end
    
    room:setPlayerMark(player, WIND_MARK, new_winds)
    room:throwCard({wind_id}, niwoxungu.name, player, player)
  end,
})

return niwoxungu
