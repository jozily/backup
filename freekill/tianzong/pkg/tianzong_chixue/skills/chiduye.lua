local chiduye = fk.CreateSkill{ name = "chiduye" }

local TURNS_MARK = "chiduye_chixieque_turns"
local GRANTED_MARK = "chiduye_chixieque_granted"

local function all_field_cards(room)
  local ids = {}
  for _, p in ipairs(room.alive_players) do
    table.insertTable(ids, p:getCardIds("hej"))
  end
  return ids
end

local function grant_xieque(room, player, turns)
  if not player:hasSkill("chixieque", true) then
    room:handleAddLoseSkills(player, "chixieque", nil, true, false)
    room:setPlayerMark(player, GRANTED_MARK, 1)
  end
  room:setPlayerMark(player, TURNS_MARK, math.max(player:getMark(TURNS_MARK), turns))
end

Fk:loadTranslationTable{
  ["chiduye"] = "笃谒",
  [":chiduye"] = "出牌阶段限一次，你可以依次展示场上至多四张牌，归属者依次选择一项并移除：①摸X张牌；②X个回合内获得【謇谔】；③本回合结束后执行一个第X个阶段（逆序）；④使用此牌，然后置于牌堆顶。（X为已选选项数+1）",
  ["#chiduye-cards"] = "笃谒：选择场上至多四张牌依次展示",
  ["#chiduye-choice"] = "笃谒：为此牌选择一项（X=%arg）",
  ["#chiduye-use"] = "笃谒：使用展示的牌",
  ["chiduye1"] = "摸X张牌",
  ["chiduye2"] = "X个回合内获得【謇谔】",
  ["chiduye3"] = "本回合结束后执行第X个阶段（逆序）",
  ["chiduye4"] = "使用此牌，然后置于牌堆顶",
}

chiduye:addEffect("active", {
  card_num = 0,
  target_num = 0,
  can_use = function(self, player)
    return player:usedSkillTimes(chiduye.name, Player.HistoryPhase) == 0 and
      #all_field_cards(Fk:currentRoom()) > 0
  end,
  card_filter = Util.FalseFunc,
  target_filter = Util.FalseFunc,
  on_use = function(self, room, effect)
    local player = effect.from
    local field = all_field_cards(room)
    local selected = room:askToCards(player, {
      min_num = 1,
      max_num = math.min(4, #field),
      pattern = tostring(Exppattern{ id = field }),
      expand_pile = field,
      skill_name = chiduye.name,
      prompt = "#chiduye-cards",
      cancelable = false,
    })
    local remaining = { "chiduye1", "chiduye2", "chiduye3", "chiduye4" }
    local phases = { Player.Finish, Player.Discard, Player.Play, Player.Draw }
    for index, id in ipairs(selected) do
      local owner = room:getCardOwner(id)
      if not owner or owner.dead or room:getCardArea(id) == Card.Void then break end
      owner:showCards({ id })
      local choices = table.simpleClone(remaining)
      local card = Fk:getCardById(id)
      if not owner:canUse(card, { bypass_times = true }) then table.removeOne(choices, "chiduye4") end
      local choice = #choices == 1 and choices[1] or room:askToChoice(owner, {
        choices = choices,
        all_choices = remaining,
        skill_name = chiduye.name,
        prompt = "#chiduye-choice:::" .. index,
      })
      table.removeOne(remaining, choice)
      if choice == "chiduye1" then
        owner:drawCards(index, chiduye.name)
      elseif choice == "chiduye2" then
        grant_xieque(room, owner, index)
      elseif choice == "chiduye3" then
        owner:gainAnExtraPhase(phases[index], chiduye.name)
      elseif choice == "chiduye4" then
        local use = room:askToUseRealCard(owner, {
          pattern = { id },
          skill_name = chiduye.name,
          prompt = "#chiduye-use",
          cancelable = false,
          skip = true,
          extra_data = { bypass_times = true },
        })
        if use then room:useCard(use) end
        if room:getCardArea(id) == Card.DiscardPile then
          room:moveCards{
            ids = { id },
            toArea = Card.DrawPile,
            moveReason = fk.ReasonPut,
            skillName = chiduye.name,
            drawPilePosition = 1,
          }
        end
      end
      if #remaining == 0 then break end
    end
  end,
})

chiduye:addEffect(fk.TurnEnd, {
  global = true,
  can_refresh = function(self, event, target, player, data)
    return target == player and player:getMark(TURNS_MARK) > 0
  end,
  on_refresh = function(self, event, target, player, data)
    local room = player.room
    local turns = player:getMark(TURNS_MARK) - 1
    room:setPlayerMark(player, TURNS_MARK, turns)
    if turns == 0 and player:getMark(GRANTED_MARK) > 0 then
      room:setPlayerMark(player, GRANTED_MARK, 0)
      room:handleAddLoseSkills(player, "-chixieque", nil, true, false)
    end
  end,
})

return chiduye
