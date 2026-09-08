local niwoxiangming = fk.CreateSkill{
  name = "niwoxiangming",
}

local function split_top_bottom(room, x)
  local pile = room.draw_pile
  local top_ids = {}
  local bottom_ids = {}

  local cnt_top = math.min(x, #pile)
  for i = 1, cnt_top do
    table.insert(top_ids, pile[i])
  end

  local cnt_bottom = math.min(x, #pile - cnt_top)
  for i = #pile, math.max(#pile - cnt_bottom + 1, 1), -1 do
    if not table.contains(top_ids, pile[i]) then
      table.insert(bottom_ids, pile[i])
    end
  end

  return top_ids, bottom_ids
end

local function get_gainable(ids)
  return table.filter(ids, function(id)
    local c = Fk:getCardById(id)
    return c and (c.is_damage_card or c.sub_type == Card.SubtypeWeapon)
  end)
end

niwoxiangming:addEffect(fk.RoundStart, {
  anim_type = "drawcard",
  can_trigger = function(self, event, target, player, data)
    return player:hasSkill(niwoxiangming.name)
  end,
  on_cost = function(self, event, target, player, data)
    local x = player.hp
    return player.room:askToSkillInvoke(player, {
      skill_name = niwoxiangming.name,
      prompt = "#niwoxiangming-invoke:::" .. x,
    })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local x = math.max(0, player.hp)
    if x == 0 or #room.draw_pile == 0 then return end

    local top_ids, bottom_ids = split_top_bottom(room, x)
    local show_ids = {}
    for _, id in ipairs(top_ids) do table.insert(show_ids, id) end
    for _, id in ipairs(bottom_ids) do
      if not table.contains(show_ids, id) then
        table.insert(show_ids, id)
      end
    end

    if #show_ids == 0 then return end

    room:turnOverCardsFromDrawPile(player, show_ids, niwoxiangming.name)

    local gainable = get_gainable(show_ids)
    local rest = table.filter(show_ids, function(id)
      return not table.contains(gainable, id)
    end)

    local direct_gain = table.filter(gainable, function(id)
      local c = Fk:getCardById(id)
      return c and c.sub_type ~= Card.SubtypeWeapon
    end)
    if #direct_gain > 0 then
      room:obtainCard(player, direct_gain, false, fk.ReasonPrey, player, niwoxiangming.name)
    end

    local weapons = table.filter(gainable, function(id)
      local c = Fk:getCardById(id)
      return c and c.sub_type == Card.SubtypeWeapon
    end)
    for _, id in ipairs(weapons) do
      local c = Fk:getCardById(id)
      if room:askToSkillInvoke(player, {
        skill_name = niwoxiangming.name,
        prompt = "#niwoxiangming-equip:::" .. c:toLogString(),
      }) then
        room:moveCardTo(id, Card.PlayerEquip, player, fk.ReasonPut, niwoxiangming.name, nil, false, player)
      else
        room:obtainCard(player, id, false, fk.ReasonPrey, player, niwoxiangming.name)
      end
    end

    if #rest > 0 then
      room:askToGuanxing(player, {
        cards = rest,
        top_limit = #rest,
        bottom_limit = #rest,
        skill_name = niwoxiangming.name,
      })
    end
  end,
})

return niwoxiangming
