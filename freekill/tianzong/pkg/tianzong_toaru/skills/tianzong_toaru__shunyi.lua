local shunyi = fk.CreateSkill { name = "tianzong_toaru__shunyi" }

local function current_room(player)
  return player.room or Fk:currentRoom()
end

local function movable_sources(player)
  local room = current_room(player)
  if not room then return {} end
  return table.filter(room.alive_players, function(p)
    return player:distanceTo(p) <= 1 and #p:getCardIds("hej") > 0
  end)
end

shunyi:addEffect("active", {
  prompt = "#tianzong_toaru__shunyi",
  min_target_num = 1,
  max_target_num = 1,
  card_filter = Util.FalseFunc,
  target_filter = function(self, player, to_select, selected)
    if #selected > 0 then return false end
    local room = current_room(player)
    if not room then return false end
    return table.contains(movable_sources(player), to_select) or
      (player:getMark("tianzong_toaru__shunyi_seat") == 0 and #room.alive_players >= 3)
  end,
  can_use = function(self, player)
    local room = current_room(player)
    if not room then return false end
    return player:usedSkillTimes(shunyi.name, Player.HistoryPhase) == 0 and
      (#movable_sources(player) > 0 or
        (player:getMark("tianzong_toaru__shunyi_seat") == 0 and #room.alive_players >= 3))
  end,
  on_use = function(self, room, effect)
    local player, source = effect.from, effect.tos[1]
    local choices = {}
    if table.contains(movable_sources(player), source) then table.insert(choices, "tianzong_toaru__shunyi_card") end
    if player:getMark("tianzong_toaru__shunyi_seat") == 0 and #room.alive_players >= 3 then
      table.insert(choices, "tianzong_toaru__shunyi_seat")
    end
    if #choices == 0 then return end
    local choice = #choices == 1 and choices[1] or room:askToChoice(player, {
      choices = choices, skill_name = shunyi.name,
    })
    if choice == "tianzong_toaru__shunyi_card" then
      local destinations = table.filter(room.alive_players, function(p)
        return p ~= source and (table.find(source:getCardIds("ej"), function(id)
          return source:canMoveCardInBoardTo(p, id)
        end) or #source:getCardIds("h") > 0)
      end)
      if #destinations == 0 then return end
      local tos = room:askToChoosePlayers(player, {
        targets = destinations, min_num = 1, max_num = 1, cancelable = false,
        skill_name = shunyi.name, prompt = "#tianzong_toaru__shunyi-to::" .. source.id,
      })
      local to = tos[1]
      local choices = {}
      if table.find(source:getCardIds("ej"), function(id) return source:canMoveCardInBoardTo(to, id) end) then
        table.insert(choices, "tianzong_toaru__shunyi_board")
      end
      if #source:getCardIds("h") > 0 then table.insert(choices, "tianzong_toaru__shunyi_hand") end
      local area = #choices == 1 and choices[1] or room:askToChoice(player, {
        choices = choices, skill_name = shunyi.name,
      })
      if area == "tianzong_toaru__shunyi_board" then
        room:askToMoveCardInBoard(player, {
          target_one = source, target_two = to, move_from = source,
          skill_name = shunyi.name, skip = false,
        })
      else
        local id = room:askToChooseCard(player, { target = source, flag = "h", skill_name = shunyi.name })
        room:moveCardTo(id, Card.PlayerHand, to, fk.ReasonJustMove, shunyi.name, nil, false, player)
      end
    else
      local targets = table.filter(room.alive_players, function(p)
        return p ~= source and source:getNextAlive() ~= p
      end)
      if #targets == 0 then return end
      local tos = room:askToChoosePlayers(player, {
        targets = targets, min_num = 1, max_num = 1, cancelable = false,
        skill_name = shunyi.name, prompt = "#tianzong_toaru__shunyi-seat::" .. source.id,
      })
      room:swapSeat(source, tos[1])
      room:setPlayerMark(player, "tianzong_toaru__shunyi_seat", 1)
    end
  end,
})

shunyi:addTest(function(room, me)
  FkTest.runInRoom(function()
    room:handleAddLoseSkills(me, shunyi.name)
    room:setCurrent(me)
    me.phase = Player.Play
  end)
  local skill = Fk.skills[shunyi.name]
  lu.assertTrue(skill:canUse(me))
  lu.assertTrue(skill:targetFilter(me, me, {}, {}))
end)

Fk:loadTranslationTable {
  ["#tianzong_toaru__shunyi"] = "瞬移：选择一名距离不大于1的有牌角色，或选择要移动座次的角色",
  ["tianzong_toaru__shunyi_card"] = "移动其区域内一张牌",
  ["tianzong_toaru__shunyi_seat"] = "移动其座次，然后移除此选项",
  ["#tianzong_toaru__shunyi-to"] = "瞬移：选择接收 %dest 区域内一张牌的角色",
  ["tianzong_toaru__shunyi_board"] = "移动其装备区或判定区的一张牌",
  ["tianzong_toaru__shunyi_hand"] = "移动其一张手牌",
  ["#tianzong_toaru__shunyi-seat"] = "瞬移：选择一名角色，将 %dest 移至其下家",
}

return shunyi
