local U = require "packages.utility.utility"
local juben = fk.CreateSkill { name = "tianzong_toaru__juben" }
local NM, PM, PDM, SM = "@[juben_names]", "tianzong_toaru__juben_player_ids", "@[juben_players]", "@[juben_suits]"
local suits = { log_spade = Card.Spade, log_heart = Card.Heart, log_club = Card.Club, log_diamond = Card.Diamond }

local function addJubenMark(name)
  Fk:addQmlMark {
    name = name,
    how_to_show = function(_, value)
      return type(value) == "table" and tostring(#value) or " "
    end,
    qml = function(mark, value)
      return {
        url = "packages/tianzong/qml/JubenMarkBox.qml",
        prop = { name = mark, value = type(value) == "table" and value or {} },
      }
    end,
  }
end
addJubenMark("juben_names")
addJubenMark("juben_players")
addJubenMark("juben_suits")

local function take(room, player, mark, value)
  room:removeTableMark(player, mark, value)
  if not player.dead then player:drawCards(2, juben.name) end
end
local function record(room, player)
  local names = table.filter(Fk:getAllCardNames("bt"), function(n) return not table.contains(player:getTableMark(NM), n) end)
  local people = table.filter(room.alive_players, function(p) return not table.contains(player:getTableMark(PM), p.id) end)
  local suit_names = table.filter({ "log_spade", "log_heart", "log_club", "log_diamond" }, function(s)
    return not table.contains(player:getTableMark(SM), suits[s])
  end)
  if #names > 0 then
    local name = U.askForChooseCardNames(room, player, names, 1, 1, juben.name, "#tianzong_toaru__juben-name", names, false)[1]
    room:addTableMarkIfNeed(player, NM, name)
  end
  if #people > 0 then
    local who = room:askToChoosePlayers(player, { targets = people, min_num = 1, max_num = 1,
      skill_name = juben.name, prompt = "#tianzong_toaru__juben-player", cancelable = false })[1]
    room:addTableMarkIfNeed(player, PM, who.id)
    room:addTableMarkIfNeed(player, PDM, who.general ~= "anjiang" and who.general or who.deputyGeneral)
  end
  if #suit_names > 0 then
    local suit = room:askToChoice(player, { choices = suit_names, skill_name = juben.name,
      prompt = "#tianzong_toaru__juben-suit" })
    room:addTableMarkIfNeed(player, SM, suits[suit])
  end
end

local record_spec = {
  on_cost = function(self, event, target, player)
    return player.room:askToSkillInvoke(player, { skill_name = juben.name, prompt = "#tianzong_toaru__juben-record" })
  end,
  on_use = function(self, event, target, player) record(player.room, player) end,
}
juben:addEffect(fk.RoundStart, {
  can_trigger = function(self, event, target, player)
    return target == player and player:hasSkill(juben.name)
  end,
  on_cost = record_spec.on_cost, on_use = record_spec.on_use,
})
juben:addEffect(fk.EventPhaseStart, {
  can_trigger = function(self, event, target, player)
    return target == player and player:hasSkill(juben.name) and player.phase == Player.Play
  end,
  on_cost = record_spec.on_cost, on_use = record_spec.on_use,
})

juben:addEffect(fk.AfterCardTargetDeclared, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(juben.name) and
      (table.contains(player:getTableMark(NM), data.card.name) or
       table.find(data.tos, function(p) return table.contains(player:getTableMark(PM), p.id) end))
  end,
  on_cost = function(self, event, target, player, data)
    local choices, extras = {}, data:getExtraTargets()
    local removals = table.filter(data.tos, function(p)
      local remaining = table.filter(data.tos, function(other) return other ~= p end)
      return data.card.skill:feasible(data.from, remaining, {})
    end)
    if #extras > 0 or #removals > 0 then table.insert(choices, "tianzong_toaru__juben_target") end
    local names = table.filter(Fk:getAllCardNames("bt"), function(name)
      if name == data.card.name then return false end
      local card = Fk:cloneCard(name, data.card.suit, data.card.number)
      return card.skill and card.skill:feasible(data.from, data.tos, {})
    end)
    if #names > 0 then table.insert(choices, "tianzong_toaru__juben_card") end
    if #choices == 0 then return false end
    table.insert(choices, "Cancel")
    local choice = player.room:askToChoice(player, { choices = choices, skill_name = juben.name })
    if choice == "Cancel" then return false end
    event:setCostData(self, { choice = choice, names = names, extras = extras, removals = removals })
    return true
  end,
  on_use = function(self, event, target, player, data)
    local room, cost = player.room, event:getCostData(self)
    local used_name = table.contains(player:getTableMark(NM), data.card.name) and data.card.name
    local used_player = table.find(data.tos, function(p) return table.contains(player:getTableMark(PM), p.id) end)
    if cost.choice == "tianzong_toaru__juben_target" then
      local candidates = table.simpleClone(cost.extras)
      table.insertTableIfNeed(candidates, cost.removals)
      local to = room:askToChoosePlayers(player, { targets = candidates, min_num = 1, max_num = 1,
        skill_name = juben.name, prompt = "#tianzong_toaru__juben-change-target", cancelable = false })[1]
      if table.contains(data.tos, to) then data:removeTarget(to) else data:addTarget(to) end
    else
      local name = U.askForChooseCardNames(room, player, cost.names, 1, 1, juben.name,
        "#tianzong_toaru__juben-change-card", cost.names, false)[1]
      data:changeCard(name, data.card.suit, data.card.number, juben.name)
    end
    if used_name then take(room, player, NM, used_name)
    elseif used_player then
      room:removeTableMark(player, PDM, used_player.general ~= "anjiang" and used_player.general or used_player.deputyGeneral)
      take(room, player, PM, used_player.id)
    end
  end,
})

juben:addEffect(fk.SkillEffect, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(juben.name) and data.who and data.who ~= player and
      table.contains(player:getTableMark(PM), data.who.id) and not data.prevented
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, { skill_name = juben.name,
      prompt = "#tianzong_toaru__juben-skill::" .. data.who.id .. ":" .. data.skill.name })
  end,
  on_use = function(self, event, target, player, data)
    local room, original = player.room, data.who
    data.prevented = true
    take(room, player, PM, original.id)
    if player.dead then return end
    data.skill_data.from = player
    local trigger_event = data.skill_data.trigger_event
    if trigger_event then
      room:useSkill(player, data.skill, function()
        return data.skill:use(trigger_event, trigger_event.target, player, trigger_event.data)
      end, data.skill_data)
    else
      room:useSkill(player, data.skill, data.skill_cb, data.skill_data)
    end
  end,
})

juben:addEffect(fk.FinishRetrial, {
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(juben.name) and data.card and
      (table.contains(player:getTableMark(NM), data.card.name) or table.contains(player:getTableMark(SM), data.card.suit))
  end,
  on_cost = function(self, event, target, player)
    return player.room:askToSkillInvoke(player, { skill_name = juben.name, prompt = "#tianzong_toaru__juben-judge" })
  end,
  on_use = function(self, event, target, player, data)
    local room, options = player.room, {}
    if #player:getTableMark(NM) > 0 then table.insert(options, "tianzong_toaru__juben_card") end
    if #player:getTableMark(SM) > 0 then table.insert(options, "tianzong_toaru__juben_suit") end
    local choice = #options == 1 and options[1] or room:askToChoice(player, { choices = options, skill_name = juben.name })
    if choice == "tianzong_toaru__juben_card" then
      local names = player:getTableMark(NM)
      local name = U.askForChooseCardNames(room, player, names, 1, 1, juben.name, "#tianzong_toaru__juben-change-card", names, false)[1]
      data.card = Fk:cloneCard(name, data.card.suit, data.card.number)
      take(room, player, NM, name)
    else
      local values, labels = player:getTableMark(SM), {}
      for label, value in pairs(suits) do if table.contains(values, value) then table.insert(labels, label) end end
      local value = suits[room:askToChoice(player, { choices = labels, skill_name = juben.name })]
      data.card = Fk:cloneCard(data.card.name, value, data.card.number)
      take(room, player, SM, value)
    end
  end,
})

juben:addEffect(fk.AfterCardsMove, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(juben.name, true) and table.find(data, function(move)
      return move.from == player and move.toArea == Card.DiscardPile and
        table.contains({ fk.ReasonUse, fk.ReasonDiscard }, move.moveReason)
    end)
  end,
  on_refresh = function(self, event, target, player, data)
    for _, move in ipairs(data) do
      if move.from == player and move.toArea == Card.DiscardPile and
        table.contains({ fk.ReasonUse, fk.ReasonDiscard }, move.moveReason) then
        for _, info in ipairs(move.moveInfo) do
          player.room:addTableMarkIfNeed(player, "tianzong_toaru__juben_discards", info.cardId)
        end
      end
    end
  end,
})

juben:addLoseEffect(function(self, player)
  local room = player.room
  for _, mark in ipairs({ NM, PM, PDM, SM, "tianzong_toaru__juben_discards" }) do
    room:setPlayerMark(player, mark, 0)
  end
end)

Fk:loadTranslationTable {
  [NM] = "剧本·牌名", [PM] = "剧本·角色", [SM] = "剧本·花色",
  ["#tianzong_toaru__juben-record"] = "剧本：是否记录一个新牌名、角色和花色？",
  ["#tianzong_toaru__juben-name"] = "剧本：记录一个未记录过的牌名",
  ["#tianzong_toaru__juben-player"] = "剧本：记录一名未记录过的角色",
  ["#tianzong_toaru__juben-suit"] = "剧本：记录一个未记录过的花色",
  ["tianzong_toaru__juben_target"] = "更改目标", ["tianzong_toaru__juben_card"] = "更改牌名",
  ["tianzong_toaru__juben_suit"] = "更改花色",
  ["#tianzong_toaru__juben-change-target"] = "剧本：增加或移除一个合法目标",
  ["#tianzong_toaru__juben-change-card"] = "剧本：选择要更改成的牌名",
  ["#tianzong_toaru__juben-skill"] = "剧本：是否改为由你发动 %dest 的“%arg”？",
  ["#tianzong_toaru__juben-judge"] = "剧本：是否更改此判定牌？",
}
return juben
