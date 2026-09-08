local yangmu = fk.CreateSkill { name = "tianzong_toaru__yangmu" }

yangmu:addEffect("filter", {
  handly_cards = function(self, player)
    local cards = {}
    for _, p in ipairs(Fk:currentRoom().alive_players) do
      if table.contains(p:getTableMark("@[list]tianzong_toaru__yangmu"), player.id) then
        table.insertTable(cards, p:getCardIds("h"))
      end
    end
    return #cards > 0 and cards or nil
  end,
})

return yangmu
