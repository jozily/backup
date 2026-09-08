local chizhenjie = fk.CreateSkill{ name = "chizhenjie" }

local spec = {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(chizhenjie.name) and target and target:isAlive()
      and player:distanceTo(target) <= 1 and data.damageType and data.damageType ~= fk.NormalDamage
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, { skill_name = chizhenjie.name, prompt = "#chizhenjie-invoke::" .. target.id })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local cards = room:getNCards(2, "top")
    if #cards == 0 then return end
    local choices = target == player and { player } or { player, target }
    local chosen = room:askToChoosePlayers(player, { targets = choices, min_num = 1, max_num = 1, skill_name = chizhenjie.name, prompt = "#chizhenjie-user", cancelable = false })
    local user = chosen[1]
    local use = room:askToUseRealCard(user, {
      pattern = cards,
      skill_name = chizhenjie.name,
      prompt = "#chizhenjie-use",
      cancelable = true,
      skip = true,
      extra_data = { expand_pile = cards, bypass_times = true },
    })
    if use then room:useCard(use) end
    local rest = table.filter(cards, function(id) return room:getCardArea(id) ~= Card.Processing and not table.contains(room.discard_pile, id) end)
    if #rest > 0 then
      room:moveCards{ ids = rest, toArea = Card.DrawPile, moveReason = fk.ReasonPut, skillName = chizhenjie.name, drawPilePosition = 1 }
    end
  end,
}
chizhenjie:addEffect(fk.Damage, spec)
chizhenjie:addEffect(fk.Damaged, spec)

chizhenjie:addEffect("distance", {
  correct_func = function(self, from, to)
    if from:hasSkill(chizhenjie.name) then return -(from:getLostHp() + 1) end
  end,
})

return chizhenjie
