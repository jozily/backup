local chijieji = fk.CreateSkill{ name = "chijieji" }
local Common = require "packages.tianzong.pkg.tianzong_chixue.lib.common"
local COUNT_MARK = "@chijieji_count-turn"

local function target_num(player, card)
  if not card or player:prohibitUse(card) or not player:canUse(card) then return 0 end
  if card.skill:getMinTargetNum() == 0 and not card.multiple_targets then return 1 end
  local n = 0
  for _, p in ipairs(Fk:currentRoom().alive_players) do
    if not player:isProhibited(p, card) and card.skill:modTargetFilter(player, p, {}, card) then
      n = n + 1
    end
  end
  return n
end

local function card_names(player, id)
  local wanted = target_num(player, Fk:getCardById(id))
  if wanted == 0 then return {}, 0 end
  local names = table.filter(Fk:getAllCardNames("bt"), function(name)
    local card = Fk:cloneCard(name)
    card:addSubcard(id)
    card.skillName = chijieji.name
    return (card.type == Card.TypeBasic or card:isCommonTrick()) and target_num(player, card) == wanted
  end)
  return names, wanted
end

local function usable_cards(player, target)
  return table.filter(target:getCardIds("h"), function(id)
    return #card_names(player, id) > 0
  end)
end

chijieji:addEffect("active", {
  anim_type = "control",
  card_num = 0,
  target_num = 1,
  prompt = "#chijieji",
  can_use = function(self, player)
    return player:usedSkillTimes(chijieji.name, Player.HistoryPhase) == 0 and
      table.find(Fk:currentRoom().alive_players, function(p)
        return not p:isKongcheng() and
          (p:getHandcardNum() >= player:getHandcardNum() or #Common.get_skill_names(p) >= #Common.get_skill_names(player)) and
          #usable_cards(player, p) > 0
      end) ~= nil
  end,
  target_filter = function(self, player, to_select, selected)
    return #selected == 0 and not to_select:isKongcheng() and
      (to_select:getHandcardNum() >= player:getHandcardNum() or
        #Common.get_skill_names(to_select) >= #Common.get_skill_names(player)) and
      #usable_cards(player, to_select) > 0
  end,
  on_use = function(self, room, effect)
    local player, target = effect.from, effect.tos[1]
    local ids = usable_cards(player, target)
    if #ids == 0 then return end
    room:viewCards(player, {
      cards = target:getCardIds("h"),
      skill_name = chijieji.name,
      prompt = "$ViewCardsFrom:" .. target.id,
    })
    local chosen = room:askToCards(player, {
      min_num = 1,
      max_num = 1,
      pattern = tostring(Exppattern{ id = ids }),
      expand_pile = target:getCardIds("h"),
      skill_name = chijieji.name,
      prompt = "#chijieji-card::" .. target.id,
      cancelable = false,
    })
    local names, x = card_names(player, chosen[1])
    if #names == 0 then return end
    local use = room:askToUseVirtualCard(player, {
      name = names,
      subcards = chosen,
      skill_name = chijieji.name,
      prompt = "#chijieji-use",
      cancelable = false,
      skip = true,
    })
    if not use then return end
    room:useCard(use)
    if target:isAlive() then target:drawCards(x, chijieji.name) end
    if player:isAlive() then room:setPlayerMark(player, COUNT_MARK, x) end
  end,
})

chijieji:addEffect(fk.CardUseFinished, {
  mute = true,
  can_refresh = function(self, event, target, player, data)
    return target == player and player:getMark(COUNT_MARK) > 0
  end,
  on_refresh = function(self, event, target, player, data)
    local n = player:getMark(COUNT_MARK) - 1
    player.room:setPlayerMark(player, COUNT_MARK, n)
    if n == 0 then
      player:setSkillUseHistory(chijieji.name, 0, Player.HistoryPhase)
    end
  end,
})

return chijieji
