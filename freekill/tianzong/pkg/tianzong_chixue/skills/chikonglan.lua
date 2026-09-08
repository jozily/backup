local chikonglan = fk.CreateSkill{
  name = "chikonglan",
  tags = { Skill.Compulsory },
}

local U = require "packages.utility.utility"

local NUM_MARK = "chikonglan_nums-round"        -- 隐藏：记录触发数字
local NAME_MARK = "chikonglan_names-round"      -- 隐藏：记录原牌名
local SHOW_MARK = "@chikonglan"                 -- 可见：外显数字列表
local SHADOW_MARK = "chikonglan_shadow-round"   -- 隐藏：本轮通过空阑获得的影牌id

local function is_recorded(player, n)
  return table.contains(player:getTableMark(NUM_MARK), n)
end

Fk:addQmlMark{
  name = "chikonglan",
  how_to_show = function(name, value, p)
    if type(value) ~= "table" or #value == 0 then return "" end
    return Fk:translate("chikonglan") .. " " .. table.concat(
      table.map(value, function(x) return tostring(x) end),
      "/"
    )
  end,
}

chikonglan:addEffect("maxcards", {
  exclude_from = function(self, player, card)
    local c = card
    local cid = card
    if type(card) == "number" then
      c = Fk:getCardById(card)
      cid = card
    elseif card and card.getEffectiveId then
      cid = card:getEffectiveId()
    end
    if not c then return false end

    local room = Fk:currentRoom()
    local alive_num = room and #room.alive_players or 0

    -- 原本效果：黑桃牌 与 点数小于场上人数的牌 不计入手牌上限
    if c.suit == Card.Spade or (c.number > 0 and c.number < alive_num) then
      return true
    end

    -- 新增：本轮通过空阑获得的影牌不计入手牌上限
    local shadow_ids = player:getTableMark(SHADOW_MARK)
    if type(shadow_ids) == "table" and table.contains(shadow_ids, cid) then
      return true
    end

    return false
  end,
})

chikonglan:addEffect(fk.TargetConfirmed, {
  anim_type = "special",
  can_trigger = function(self, event, target, player, data)
    return target == player
      and player:hasSkill(chikonglan.name)
      and data.card ~= nil
      and not is_recorded(player, data.card:getNameLength(true))
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local x = data.card:getNameLength(true)

    room:addTableMark(player, NUM_MARK, x)
    room:addTableMark(player, NAME_MARK, data.card.trueName)
    room:setPlayerMark(player, SHOW_MARK, player:getTableMark(NUM_MARK))

    local shades = U.getShade(room, x)
    if #shades > 0 then
      room:moveCards({
        ids = shades,
        to = player,
        toArea = Card.PlayerHand,
        moveReason = fk.ReasonJustMove,
        proposer = player,
        skill_name = chikonglan.name,
        moveVisible = true,
      })

      for _, id in ipairs(shades) do
        room:addTableMark(player, SHADOW_MARK, id)
        local c = Fk:getCardById(id)
        if c then
          room:setCardMark(c, "@@chikonglan_round", 1)
        end
      end
    end
  end,
})

chikonglan:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chikonglan.name)
  end,
  on_refresh = function(self, event, target, player, data)
    local room = player.room

    local shadow_ids = player:getTableMark(SHADOW_MARK)
    if type(shadow_ids) == "table" then
      for _, id in ipairs(shadow_ids) do
        local c = Fk:getCardById(id)
        if c then
          room:setCardMark(c, "@@chikonglan_round", 0)
        end
      end
    end

    room:setPlayerMark(player, NUM_MARK, 0)
    room:setPlayerMark(player, NAME_MARK, 0)
    room:setPlayerMark(player, SHOW_MARK, 0)
    room:setPlayerMark(player, SHADOW_MARK, 0)
  end,
})

return chikonglan
