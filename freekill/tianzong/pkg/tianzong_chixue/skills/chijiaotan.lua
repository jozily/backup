local chijiaotan = fk.CreateSkill{ name = "chijiaotan" }
local U = require "packages.utility.utility"
local Common = require "packages.tianzong.pkg.tianzong_chixue.lib.common"
local LAST_RESULT = "@chijiaotan_result"

chijiaotan:addEffect("active", {
  anim_type = "control",
  min_target_num = 1,
  max_target_num = 99,
  card_num = 0,
  can_use = function(self, player)
    return player:usedSkillTimes(chijiaotan.name, Player.HistoryPhase) == 0
  end,
  target_filter = function(self, player, to_select, selected)
    return to_select ~= player and not to_select:isKongcheng()
      and #Common.get_skill_names(to_select) > #Common.get_skill_names(player)
  end,
  on_use = function(self, room, effect)
    local player = effect.from
    room:sortByAction(effect.tos)
    local discussion = U.Discussion(player, effect.tos, chijiaotan.name, { previous = player:getMark(LAST_RESULT) })
    room:setPlayerMark(player, LAST_RESULT, discussion.color)
    if discussion.color == "noresult" then return end
    local dissenters = table.filter(effect.tos, function(p)
      local result = discussion.results[p]
      return result and result.opinion and result.opinion ~= discussion.color and not p:isKongcheng()
    end)
    if #dissenters == 0 then return end
    local chosen = room:askToChoosePlayers(player, { targets = dissenters, min_num = 1, max_num = 1, skill_name = chijiaotan.name, prompt = "#chijiaotan-dissenter", cancelable = true })
    if #chosen == 0 then return end
    local target = chosen[1]
    room:viewCards(player, { cards = target:getCardIds("h"), skill_name = chijiaotan.name, prompt = "$ViewCardsFrom:" .. target.id })
    local result = discussion.results[target]
    local id = result and result.toCards and result.toCards[1]
    if id and room:getCardOwner(id) == target and room:getCardArea(id) == Card.PlayerHand then
      local use = room:askToUseRealCard(player, { pattern = { id }, skill_name = chijiaotan.name, prompt = "#chijiaotan-use", cancelable = true, skip = true, extra_data = { expand_pile = { id }, bypass_times = true } })
      if use then room:useCard(use) end
    end
    if player:isAlive() and table.find(target:getCardIds("h"), function(cid)
      local color = Fk:getCardById(cid).color == Card.Red and "red" or "black"
      return color ~= discussion.color
    end) then player:drawCards(2, chijiaotan.name) end
  end,
})

chijiaotan:addEffect(U.DiscussionResultConfirming, {
  mute = true,
  can_refresh = function(self, event, target, player, data)
    local previous = data.extra_data and data.extra_data.previous
    return target == player and player:hasSkill(chijiaotan.name) and data.reason == chijiaotan.name
      and (previous == "red" or previous == "black")
  end,
  on_refresh = function(self, event, target, player, data)
    local previous = data.extra_data.previous
    data.opinions[previous] = (data.opinions[previous] or 0) + 1
    player.room:sendLog{
      type = "#chijiaotan-previous",
      from = player.id,
      arg = previous,
    }
  end,
})

return chijiaotan
