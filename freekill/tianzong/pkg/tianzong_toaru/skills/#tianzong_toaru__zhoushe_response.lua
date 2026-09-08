local MAIN_SKILL = "tianzong_toaru__zhoushe"

local response = fk.CreateSkill { name = "#tianzong_toaru__zhoushe_response", visible = false }

response:addEffect("viewas", {
  pattern = "slash",
  prompt = "#tianzong_toaru__zhoushe-response",
  card_filter = Util.FalseFunc,
  view_as = function(self, player, cards)
    local card = Fk:cloneCard("slash")
    card.skillName = MAIN_SKILL
    return card
  end,
  before_use = function(self, player, use)
    player.room:setPlayerMark(player, "tianzong_toaru__zhoushe_response-turn", 1)
  end,
  enabled_at_play = Util.FalseFunc,
  enabled_at_response = function(self, player, response_pattern)
    return response_pattern and player:getMark("tianzong_toaru__zhoushe_response-turn") == 0 and
      Exppattern:Parse(Fk.currentResponsePattern):match(Fk:cloneCard("slash"))
  end,
})

return response
