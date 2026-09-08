local common = require "packages/tianzong/pkg/tianzong_chixue/lib/common"

local chijinghong = fk.CreateSkill{
  name = "chijinghong",
}

local function can_invoke(player)
  local room = Fk:currentRoom()
  return room and room.current and room.current:isAlive() and not room.current:isAllNude()
end

local function normalize_name(name)
  local c = Fk:cloneCard(name)
  if not c then return name end
  return c.trueName or c.name
end

local function get_removed(player)
  return player:getTableMark("@$chijinghong") or {}
end

local function get_premeditate_ids(player)
  if common.get_premeditate_ids then
    local ok, ids = pcall(common.get_premeditate_ids, player)
    if ok and type(ids) == "table" then return ids end
  end
  if common.getPremeditateIds then
    local ok, ids = pcall(common.getPremeditateIds, player)
    if ok and type(ids) == "table" then return ids end
  end

  local pile_names = { "premeditate", "$premeditate", "xumou", "$xumou" }
  if player.getPile then
    for _, pile_name in ipairs(pile_names) do
      local ok, ids = pcall(player.getPile, player, pile_name)
      if ok and type(ids) == "table" and #ids > 0 then
        return ids
      end
    end
  end

  return {}
end

local function try_restore_removed(player)
  if common.restore_removed_from_cards then
    local ids = get_premeditate_ids(player)
    if #ids > 0 then
      pcall(common.restore_removed_from_cards, Fk:currentRoom(), player, ids)
    end
  end
end

local function get_available_basic_names(player)
  try_restore_removed(player)

  local all_names = Fk:getAllCardNames("b")
  local removed = get_removed(player)

  local filtered = table.filter(all_names, function(name)
    local true_name = normalize_name(name)
    return not table.contains(removed, true_name)
  end)

  return player:getViewAsCardNames(chijinghong.name, filtered)
end

chijinghong:addEffect("viewas", {
  pattern = ".|.|.|.|.|basic",
  prompt = "#chijinghong",

  interaction = function(self, player)
    if not can_invoke(player) then return end

    local names = get_available_basic_names(player)
    if #names > 0 then
      return UI.TianzongCardNameBox {
        choices = names,
        all_choices = names,
      }
    end
  end,

  filter_pattern = {
    min_num = 0,
    max_num = 0,
    pattern = "",
    subcards = {}
  },

  card_filter = Util.FalseFunc,

  view_as = function(self, player, cards)
    if not self.interaction.data then return end
    local card = Fk:cloneCard(self.interaction.data)
    if not card then return end
    card.skillName = chijinghong.name
    return card
  end,

  enabled_at_play = function(self, player)
    return can_invoke(player) and #get_available_basic_names(player) > 0
  end,

  enabled_at_response = function(self, player, response)
    return can_invoke(player) and #get_available_basic_names(player) > 0
  end,

  before_use = function(self, player, use)
    local room = player.room
    local current = room.current
    if not current or current.dead or current:isAllNude() then
      return ""
    end

    local id = room:askToChooseCard(player, {
      target = current,
      flag = "hej",
      skill_name = chijinghong.name,
      prompt = "#chijinghong-choose",
    })
    if not id then
      return ""
    end

    current:showCards(id)

    local pos = room:askToChoice(player, {
      choices = { "chijinghong_top", "chijinghong_bottom" },
      skill_name = chijinghong.name,
    })

    room:moveCards({
      ids = { id },
      from = current,
      toArea = Card.DrawPile,
      moveReason = fk.ReasonPut,
      skillName = chijinghong.name,
      drawPilePosition = pos == "chijinghong_top" and 1 or -1,
    })

    local true_name = use.card.trueName or use.card.name
    room:addTableMark(player, "@$chijinghong", true_name)

    try_restore_removed(player)
  end,
})

chijinghong:addTest(function(room, me)
  room:setCurrent(me)
  me.phase = Player.Play

  local names = get_available_basic_names(me)
  lu.assertTrue(table.contains(names, "analeptic"))

  me.hp = me.maxHp - 1
  names = get_available_basic_names(me)
  lu.assertTrue(table.contains(names, "peach"))

  local interaction = UI.TianzongCardNameBox {
    choices = names,
    all_choices = Fk:getAllCardNames("b"),
  }
  lu.assertEquals(interaction.type, "cardname")
  lu.assertTrue(table.contains(interaction.choices, "analeptic"))
  lu.assertTrue(table.contains(interaction.choices, "peach"))
end)

Fk:loadTranslationTable{
  ["chijinghong"] = "惊鸿",
  [":chijinghong"] = "你可以展示当前回合角色区域内的一张牌并将之置于牌堆顶或牌堆底，视为使用或打出一张基本牌，然后移除此牌名。当你的蓄谋牌有已移除牌名时，恢复之。",

  ["@$chijinghong"] = "惊鸿已移除",
  ["#chijinghong"] = "惊鸿：展示当前回合角色区域内的一张牌并将之置于牌堆顶或牌堆底，视为使用或打出一张基本牌",
  ["#chijinghong-choose"] = "惊鸿：选择当前回合角色区域内的一张牌",
  ["chijinghong_top"] = "置于牌堆顶",
  ["chijinghong_bottom"] = "置于牌堆底",
}

return chijinghong
