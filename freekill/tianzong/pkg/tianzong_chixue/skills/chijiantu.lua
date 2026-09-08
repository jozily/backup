local chijiantu = fk.CreateSkill{
  name = "chijiantu",
  tags = { Skill.Switch, Skill.Compulsory },
}

local SUITS_MARK = "chijiantu_suits-turn"

Fk:loadTranslationTable{
  ["chijiantu"] = "蹇途",
  [":chijiantu"] = "转换技，锁定技，当你于回合内首次使用一种花色的单体目标牌指定手牌数不大于你的角色时，此牌视为：①闪电；②过河拆桥；对其使用。",
}

chijiantu:addEffect(fk.CardUsing, {
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(chijiantu.name) or not data.card or
      data.card.suit == Card.NoSuit or #data.tos ~= 1 then return false end
    local to = data.tos[1]
    return to and to:getHandcardNum() <= player:getHandcardNum() and
      not table.contains(player:getTableMark(SUITS_MARK), data.card.suit)
  end,
  on_cost = function(self, event, target, player, data)
    event:setCostData(self, { state = player:getSwitchSkillState(chijiantu.name) })
    return true
  end,
  on_use = function(self, event, target, player, data)
    player.room:addTableMarkIfNeed(player, SUITS_MARK, data.card.suit)
    local state = event:getCostData(self).state
    local card = Fk:cloneCard(state == fk.SwitchYang and "lightning" or "dismantlement")
    card.skillName = chijiantu.name
    data.card = card
  end,
})

return chijiantu
