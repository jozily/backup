local chiliangdao = fk.CreateSkill{ name = "chiliangdao" }
local NAME_MARK = "chiliangdao_names"
local ROUND_MARK = "chiliangdao_used-round"

local function candidates(player, source)
  local result = {}
  for _, name in ipairs(Fk:getAllCardNames("bt")) do
    local card = Fk:cloneCard(name)
    if card.name ~= source.name and (card.type == Card.TypeBasic or card:isCommonTrick()) then
      local same_length = card:getNameLength(true) == source:getNameLength(true)
      local same_color = player:getMark("chifushui_color_round") > 0 and source.color ~= Card.NoColor and card.color == source.color
      if same_length or same_color then table.insertIfNeed(result, name) end
    end
  end
  return result
end

chiliangdao:addEffect(fk.CardEffecting, {
  can_trigger = function(self, event, target, player, data)
    if data.from ~= player or not player:hasSkill(chiliangdao.name) or not data.card or data.responseToEvent then return false end
    if player:getMark("chifushui_name_round") > 0 and player:getMark(ROUND_MARK) > 0 then return false end
    if player:getMark("chifushui_name_round") == 0 and table.contains(player:getTableMark(NAME_MARK), data.card.name) then return false end
    return #candidates(player, data.card) > 0
  end,
  on_cost = function(self, event, target, player, data)
    local choices = candidates(player, data.card)
    table.insert(choices, "Cancel")
    local choice = player.room:askToChoice(player, { choices = choices, skill_name = chiliangdao.name, prompt = "#chiliangdao-choice::" .. target.id })
    if choice ~= "Cancel" then event:setCostData(self, { choice = choice }); return true end
  end,
  on_use = function(self, event, target, player, data)
    local original = data.card
    local replacement = Fk:cloneCard(event:getCostData(self).choice, original.suit, original.number)
    replacement.skillName = chiliangdao.name
    replacement:addSubcards(Card:getIdList(original))
    data.card = replacement
    if data.use then data.use.card = replacement end
    if player:getMark("chifushui_name_round") > 0 then player.room:setPlayerMark(player, ROUND_MARK, 1)
    else player.room:addTableMarkIfNeed(player, NAME_MARK, original.name) end
  end,
})

return chiliangdao
