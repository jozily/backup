local niwoyanliu = fk.CreateSkill{
  name = "niwoyanliu",
  tags = { Skill.Compulsory },
}

local function is_single_target_damage_use(room, player, data)
  if not data.card or not data.to or data.to.dead then return false end
  if not data.card.is_damage_card then return false end
  if not player:getEquipment(Card.SubtypeWeapon) then return false end

  local use_event = room.logic:getCurrentEvent():findParent(GameEvent.UseCard, true)
  if not use_event then return false end
  local use = use_event.data
  if not use or not use.tos then return false end

  return #use.tos == 1 and use.tos[1] == data.to
end

niwoyanliu:addEffect(fk.DamageCaused, {
  anim_type = "offensive",
  can_trigger = function(self, event, target, player, data)
    return target == player
      and player:hasSkill(niwoyanliu.name)
      and is_single_target_damage_use(player.room, player, data)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local to = data.to
    if not to or to.dead then return end

    local respond = room:askToResponse(to, {
      skill_name = niwoyanliu.name,
      pattern = "slash",
      prompt = "#niwoyanliu-ask",
      cancelable = true,
    })

    if respond then
      room:responseCard(respond)
    else
      data:changeDamage(1)
    end
  end,
})

return niwoyanliu
