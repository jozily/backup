local niwochencang = fk.CreateSkill{
  name = "niwochencang",
}

local ONCE_MARK = "@$niwochencang"

niwochencang:addEffect("viewas", {
  pattern = ".",
  prompt = "#niwochencang",
  
  interaction = function(self, player)
    if player:usedSkillTimes(niwochencang.name, Player.HistoryRound) > 0 then return end
    
    local room = Fk:currentRoom()
    local targets = {}
    for _, p in ipairs(room:getOtherPlayers(player)) do
      if p:isAlive() then
        table.insert(targets, p)
      end
    end
    
    if #targets == 0 then return end
    
    local all_names = Fk:getAllCardNames("bt")
    local names = player:getViewAsCardNames(niwochencang.name, all_names)
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
    card.skillName = niwochencang.name
    return card
  end,

  before_use = function(self, player, use)
    local room = player.room
    local targets = {}
    for _, p in ipairs(room:getOtherPlayers(player)) do
      if p:isAlive() then
        table.insert(targets, p.id)
      end
    end
    
    if #targets == 0 then return "" end
    
    local chosen = room:askToChoosePlayers(player, {
      targets = targets, min_num = 1, max_num = 1,
      skill_name = niwochencang.name, prompt = "#niwochencang-choose",
      cancelable = false,
    })
    local target_player = chosen[1]
    
    if target_player then
      target_player:addSkillDistance(player, -1)
      room:addTableMark(player, ONCE_MARK, 1)
    end
  end,
})

niwochencang:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(niwochencang.name)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:setPlayerMark(player, ONCE_MARK, 0)
  end,
})

return niwochencang
