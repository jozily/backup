local chishanquan = fk.CreateSkill{ name = "chishanquan" }

local function names(player)
  local x = math.abs(player:getHandcardNum() - player.maxHp)
  return table.filter(player:getViewAsCardNames(chishanquan.name, Fk:getAllCardNames("bt")), function(name)
    local card = Fk:cloneCard(name)
    return (card.type == Card.TypeBasic or card:isCommonTrick()) and card:getNameLength(true) == x
  end)
end

chishanquan:addEffect("viewas", {
  pattern = ".",
  prompt = "#chishanquan",
  interaction = function(self, player)
    local choices = names(player)
    if #choices > 0 then return UI.TianzongCardNameBox{ choices = choices, all_choices = Fk:getAllCardNames("bt") } end
  end,
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    if #cards == 0 and self.interaction.data then
      local card = Fk:cloneCard(self.interaction.data)
      card.skillName = chishanquan.name
      return card
    end
  end,
  before_use = function(self, player, use)
    local room = player.room
    local hand, max_hp = player:getHandcardNum(), player.maxHp
    room:changeMaxHp(player, hand - max_hp)
    if player:isAlive() then
      if max_hp > hand then
        player:drawCards(max_hp - hand, chishanquan.name)
      elseif max_hp < hand then
        room:askToDiscard(player, {
          min_num = hand - max_hp, max_num = hand - max_hp, include_equip = false,
          cancelable = false, skill_name = chishanquan.name, prompt = "#chishanquan-discard",
        })
      end
    end
  end,
  enabled_at_play = function(self, player)
    return player:usedSkillTimes(chishanquan.name, Player.HistoryTurn) == 0 and player:getHandcardNum() > 0 and #names(player) > 0
  end,
  enabled_at_response = function(self, player, response)
    return player:usedSkillTimes(chishanquan.name, Player.HistoryTurn) == 0 and player:getHandcardNum() > 0 and #names(player) > 0
  end,
})

return chishanquan
