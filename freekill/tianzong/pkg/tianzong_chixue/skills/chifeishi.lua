local chifeishi = fk.CreateSkill{ name = "chifeishi" }

local spec = {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    return target == player and player:hasSkill(chifeishi.name)
      and #table.filter(player.room:getOtherPlayers(player), function(p)
        return #table.filter(p:getCardIds("h"), function(id) return Fk:getCardById(id).color == Card.Red end) >= 2
      end) >= 2
  end,
  on_cost = function(self, event, target, player, data)
    local targets = table.filter(player.room:getOtherPlayers(player), function(p)
      return #table.filter(p:getCardIds("h"), function(id) return Fk:getCardById(id).color == Card.Red end) >= 2
    end)
    local chosen = player.room:askToChoosePlayers(player, { targets = targets, min_num = 2, max_num = 2, skill_name = chifeishi.name, prompt = "#chifeishi-choose", cancelable = true })
    if #chosen == 2 then
      event:setCostData(self, { tos = chosen })
      return true
    end
  end,
  on_use = function(self, event, target, player, data)
    local room, shown = player.room, {}
    for _, p in ipairs(event:getCostData(self).tos) do
      local cards = room:askToCards(p, { min_num = 2, max_num = 2, pattern = ".|red|.|h", skill_name = chifeishi.name, prompt = "#chifeishi-show", cancelable = false })
      p:showCards(cards)
      table.insertTable(shown, cards)
    end
    local chosen = room:askToCards(player, { min_num = 1, max_num = 1, pattern = tostring(Exppattern{ id = shown }), expand_pile = shown, skill_name = chifeishi.name, prompt = "#chifeishi-gain", cancelable = false })
    if #chosen > 0 then room:obtainCard(player, chosen, true, fk.ReasonPrey, player, chifeishi.name) end
  end,
}
chifeishi:addEffect(fk.DamageCaused, spec)
chifeishi:addEffect(fk.DamageInflicted, spec)

return chifeishi
