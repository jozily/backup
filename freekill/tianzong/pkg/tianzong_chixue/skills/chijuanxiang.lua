local chijuanxiang = fk.CreateSkill{
  name = "chijuanxiang",
}

local NAME_MARK = "@$chijuanxiang_names-turn"
local BLOCK_MARK = "chijuanxiang_block-turn"
local COUNT_MARK = "chishuowen_count-turn"
local USED_MARK = "chishuowen_used-turn"

local function get_used_name_count(player)
  return #player:getTableMark(NAME_MARK)
end

local function reset_shuowen(player)
  local room = player.room
  room:setPlayerMark(player, USED_MARK, 0)
end

-- 每个回合结束都清除“本回合”记录
chijuanxiang:addEffect(fk.TurnEnd, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chijuanxiang.name, true)
  end,
  on_refresh = function(self, event, target, player, data)
    local room = player.room
    room:setPlayerMark(player, NAME_MARK, 0)
    room:setPlayerMark(player, COUNT_MARK, 0)
    room:setPlayerMark(player, BLOCK_MARK, 0)
    room:setPlayerMark(player, USED_MARK, 0)
  end,
})

-- 记录“本回合使用过的牌名”
chijuanxiang:addEffect(fk.AfterCardUseDeclared, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(chijuanxiang.name)
  end,
  on_refresh = function(self, event, target, player, data)
    player.room:addTableMarkIfNeed(player, NAME_MARK, data.card.trueName)
  end,
})

chijuanxiang:addEffect(fk.AfterCardsMove, {
  anim_type = "drawcard",
  can_trigger = function(self, event, target, player, data)
    if not player:hasSkill(chijuanxiang.name) then return false end
    if player:getMark(BLOCK_MARK) ~= 0 then return false end

    local hand_changed = false
    local before = player:getHandcardNum()

    -- 估算变化前的手牌数：AfterCardsMove 时 player:getHandcardNum() 已经是变化后
    local delta = 0
    for _, move in ipairs(data) do
      if move.to == player and move.toArea == Card.PlayerHand then
        delta = delta + #move.moveInfo
      end
      if move.from == player then
        for _, info in ipairs(move.moveInfo) do
          if info.fromArea == Card.PlayerHand then
            delta = delta - 1
          end
        end
      end
    end

    if delta ~= 0 then
      hand_changed = true
    end
    if not hand_changed then return false end

    local after = before
    local real_before = after - delta

    -- 确实发生了手牌数变化
    if real_before == after then
      return false
    end

    local x = player:getMark(COUNT_MARK)
    if type(x) ~= "number" or x <= 0 then return false end

    -- 关键判定：变化后手牌数 == 本回合使用过的牌名数
    return after == get_used_name_count(player)
  end,

  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, {
      skill_name = chijuanxiang.name,
      prompt = "#chijuanxiang-invoke",
    })
  end,

  on_use = function(self, event, target, player, data)
    local room = player.room
    local x = player:getMark(COUNT_MARK)
    if type(x) ~= "number" or x <= 0 then return end

    room:setPlayerMark(player, BLOCK_MARK, 1)

    -- 重置朔闻“每回合限一次”
    reset_shuowen(player)

    local choice = room:askToChoice(player, {
      choices = { "chijuanxiang_draw", "chijuanxiang_gain" },
      skill_name = chijuanxiang.name,
    })

    if choice == "chijuanxiang_draw" then
      player:drawCards(x, chijuanxiang.name)
      if player.dead then
        room:setPlayerMark(player, BLOCK_MARK, 0)
        return
      end

      local ids = room:askToCards(player, {
        min_num = x,
        max_num = x,
        include_equip = false,
        skill_name = chijuanxiang.name,
        cancelable = false,
        pattern = ".|.|.|hand",
      })
      if #ids > 0 then
        room:moveCards({
          ids = ids,
          from = player,
          toArea = Card.DrawPile,
          moveReason = fk.ReasonPut,
          skillName = chijuanxiang.name,
          drawPilePosition = -1,
        })
      end
    else
      local ids = room:getNCards(x, "bottom")
      if #ids > 0 then
        room:obtainCard(player, ids, false, fk.ReasonPrey, player, chijuanxiang.name)
      end
      if player.dead then
        room:setPlayerMark(player, BLOCK_MARK, 0)
        return
      end

      local put = room:askToCards(player, {
        min_num = x,
        max_num = x,
        include_equip = false,
        skill_name = chijuanxiang.name,
        cancelable = false,
        pattern = ".|.|.|hand",
      })
      if #put > 0 then
        room:moveCards({
          ids = put,
          from = player,
          toArea = Card.DrawPile,
          moveReason = fk.ReasonPut,
          skillName = chijuanxiang.name,
          drawPilePosition = 1,
        })
      end
    end

    room:setPlayerMark(player, BLOCK_MARK, 0)
  end,
})

return chijuanxiang
