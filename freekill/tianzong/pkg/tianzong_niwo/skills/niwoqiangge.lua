local niwoqiangge = fk.CreateSkill{ name = "niwoqiangge" }
local DERIVED_EQUIPS = {
  { "broken_halberd", "soul__crossbow", Card.Club, 1 },
  { "women_dress", "soul__eight_diagram", Card.Heart, 9 },
  { "inferior_horse", "lingling_horse", Card.Club, 13 },
}

local function matching_secondary_equips(a, b)
  local ids = {}
  for _, id in ipairs(b:getCardIds("e")) do
    local slot = Util.convertSubtypeAndEquipSlot(Fk:getCardById(id).sub_type)
    local count_a, count_b = 0, 0
    for _, s in ipairs(a.equipSlots) do if s == slot then count_a = count_a + 1 end end
    for _, s in ipairs(b.equipSlots) do if s == slot then count_b = count_b + 1 end end
    if count_a > 1 and count_b > 1 then table.insert(ids, id) end
  end
  return ids
end

local spec = {
  anim_type = "control",
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(niwoqiangge.name) then return false end
    local other = data.from == player and data.to or data.from
    return other and other ~= player and other:isAlive()
  end,
  on_cost = function(self, event, target, player, data)
    return player.room:askToSkillInvoke(player, { skill_name = niwoqiangge.name, prompt = "#niwoqiangge-invoke" })
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local other = data.from == player and data.to or data.from
    local discardable = matching_secondary_equips(player, other)
    local choices = { "niwoqiangge_gain" }
    if #discardable > 0 then table.insert(choices, 1, "niwoqiangge_discard") end
    local choice = room:askToChoice(player, { choices = choices, skill_name = niwoqiangge.name })
    if choice == "niwoqiangge_discard" then
      local id = room:askToChooseCard(player, { target = other, flag = { card_data = { { "$Equip", discardable } } }, skill_name = niwoqiangge.name })
      room:throwCard({ id }, niwoqiangge.name, other, player)
    else
      local candidates = table.filter(room.draw_pile, function(id) return Fk:getCardById(id).type == Card.TypeEquip end)
      for _, info in ipairs(DERIVED_EQUIPS) do
        local id = table.find(room.void, function(cid)
          return Fk:getCardById(cid).name == info[1] or Fk:getCardById(cid).name == info[2]
        end)
        if not id then
          local ok, card = pcall(room.printCard, room, info[1], info[3], info[4])
          if ok and card then id = card.id end
        end
        if not id then
          local ok, card = pcall(room.printCard, room, info[2], info[3], info[4])
          if ok and card then id = card.id end
        end
        if id then table.insert(candidates, id) end
      end
      if #candidates > 0 then
        local id = room:tableRandomPick(candidates)
        room:obtainCard(player, id, true, fk.ReasonPrey, player, niwoqiangge.name)
      end
    end
  end,
}
niwoqiangge:addEffect(fk.Damage, spec)
niwoqiangge:addEffect(fk.Damaged, spec)

Fk:loadTranslationTable{
  ["#niwoqiangge-invoke"] = "戗戈：是否弃置对应副装备或获得一张装备牌？",
  ["niwoqiangge_discard"] = "弃置对应副装备",
  ["niwoqiangge_gain"] = "随机获得一张装备牌",
}
return niwoqiangge
