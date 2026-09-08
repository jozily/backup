local niwochencangRemake = fk.CreateSkill{
  name = "niwochencangRemake",
}

local ONCE_MARK = "@$niwochencangRemake"

niwochencangRemake:addEffect("viewas", {
  pattern = ".",
  prompt = "#niwochencangRemake",
  
  interaction = function(self, player)
    if player:usedSkillTimes(niwochencangRemake.name, Player.HistoryRound) > 0 then return end
    
    local room = Fk:currentRoom()
    local targets = {}
    for _, p in ipairs(room:getOtherPlayers(player)) do
      if p:isAlive() and player:inMyAttackRange(p) then
        table.insert(targets, p.id)
      end
    end
    
    if #targets == 0 then return end
    
    local all_names = Fk:getAllCardNames("bt")
    local names = player:getViewAsCardNames(niwochencangRemake.name, all_names)
    if #names > 0 then
      return UI.TianzongCardNameBox { choices = names, all_choices = all_names }
    end
  end,

  filter_pattern = {
    min_num = 0,
    max_num = 0,
    pattern = "",
    subcards = {}
  },

  card_filter = Util.FalseFunc,

  view_as = function(self, player, cards)
    if not self.interaction or not self.interaction.data then return nil end
    local card = Fk:cloneCard(self.interaction.data)
    card.skillName = niwochencangRemake.name
    return card
  end,

  before_use = function(self, player, use)
    local room = player.room
    room:addTableMark(player, ONCE_MARK, 1)
  end,
})

niwochencangRemake:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(niwochencangRemake.name)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, ONCE_MARK, 0)
  end,
})

return niwochencangRemake
