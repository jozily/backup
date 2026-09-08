local niwoshucai = fk.CreateSkill{
  name = "niwoshucai",
}

local ROUND_MARK = "@$niwoshucai-round"
local SHOW_MARK = "@[niwoshucai]"

local function suit_symbol(s)
  if s == "log_spade" then return "♠" end
  if s == "log_heart" then return "♥" end
  if s == "log_club" then return "♣" end
  if s == "log_diamond" then return "♦" end
  return s
end

local function is_lowest_or_tied(room, player)
  return table.every(room.alive_players, function(p)
    return player:getHandcardNum() <= p:getHandcardNum()
  end)
end

local function get_available_suits(player)
  local used = player:getTableMark(ROUND_MARK)
  local hand = player:getCardIds("h")
  local suits = table.filter({"log_spade", "log_heart", "log_club", "log_diamond"}, function(suit)
    return not table.contains(used, suit) and table.find(hand, function(id)
      return Fk:getCardById(id):getSuitString(true) == suit
    end)
  end)
  return suits
end

Fk:addQmlMark{
  name = "niwoshucai",
  how_to_show = function(name, value, p)
    if not p then return "" end
    local suits = p:getTableMark(ROUND_MARK)
    if type(suits) ~= "table" or #suits == 0 then return "" end
    return table.concat(table.map(suits, suit_symbol), "/")
  end,
  qml_data = function(name, value, p)
    return {}
  end,
  qml_path = function(name, value, p)
    return ""
  end,
}

niwoshucai:addEffect("viewas", {
  pattern = "jink,fire__slash",
  prompt = "#niwoshucai",

  interaction = function(self, player)
    local suits = get_available_suits(player)
    if #suits == 0 then return end

    local names = player:getViewAsCardNames(niwoshucai.name, {"jink", "fire__slash"})
    if #names > 0 then
      return UI.TianzongCardNameBox {
        choices = names,
        all_choices = {"jink", "fire__slash"},
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
    if not self.interaction.data then return nil end
    local c = Fk:cloneCard(self.interaction.data)
    c.skillName = niwoshucai.name
    return c
  end,

  before_use = function(self, player, use)
    local room = player.room
    local hand = player:getCardIds("h")
    if #hand == 0 then return "" end

    player:showCards(hand)

    local suits = get_available_suits(player)
    if #suits == 0 then return "" end

    local choice = room:askToChoice(player, {
      choices = suits,
      skill_name = niwoshucai.name,
      prompt = "#niwoshucai-suit",
    })

    local ids = table.filter(player:getCardIds("h"), function(id)
      return Fk:getCardById(id):getSuitString(true) == choice and not player:prohibitDiscard(id)
    end)

    if #ids == 0 then return "" end

    room:throwCard(ids, niwoshucai.name, player, player)
    room:addTableMark(player, ROUND_MARK, choice)
    room:setPlayerMark(player, SHOW_MARK, 1)

    if not player.dead and is_lowest_or_tied(room, player) then
      local ids2 = room:getNCards(2, "bottom")
      if #ids2 > 0 then
        room:obtainCard(player, ids2, false, fk.ReasonPrey, player, niwoshucai.name)
      end
    end
  end,
})

niwoshucai:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return target == player and player:hasSkill(niwoshucai.name)
  end,
  on_refresh = function(self, event, target, player, data)
    local room = player.room
    room:setPlayerMark(player, ROUND_MARK, 0)
    room:setPlayerMark(player, SHOW_MARK, 0)
  end,
})

return niwoshucai
