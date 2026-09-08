local chidiaoyao = fk.CreateSkill{
  name = "chidiaoyao",
  tags = { Skill.Compulsory },
}

local COUNT_MARK = "chishuowen_count-turn"
local TOP_MARK = "@[chidiaoyao_top]"
local BOTTOM_MARK = "@[chidiaoyao_bottom]"

local function visible_count(player)
  local count = player:getMark(COUNT_MARK)
  return (type(count) == "number" and count or 0) + 1
end

local function pile_cards(value, from_bottom)
  if type(value) ~= "number" or value < 1 then return {} end
  local room = Fk:currentRoom()
  if not room then return {} end
  local pile = room.draw_pile
  local cards = {}
  local count = math.min(value, #pile)
  if from_bottom then
    for i = #pile, #pile - count + 1, -1 do table.insert(cards, pile[i]) end
  else
    for i = 1, count do table.insert(cards, pile[i]) end
  end
  return cards
end

local function add_pile_mark(name, from_bottom)
  Fk:addQmlMark{
    name = name,
    how_to_show = function(mark_name, value)
      return type(value) == "number" and value > 0 and tostring(value) or "#hidden"
    end,
    qml = function(mark_name, value, player)
      if not Self:isBuddy(player) or not player:hasSkill(chidiaoyao.name) then return {} end
      return {
        uri = "LunarLtk.Pages.InfoPopups",
        name = "ViewPile",
        prop = { ids = pile_cards(value, from_bottom) },
      }
    end,
  }
end

add_pile_mark("chidiaoyao_top", false)
add_pile_mark("chidiaoyao_bottom", true)

local function set_marks(player, count)
  local room = player.room
  room:setPlayerMark(player, TOP_MARK, count)
  room:setPlayerMark(player, BOTTOM_MARK, count)
end

chidiaoyao:addEffect(fk.TurnStart, {
  can_refresh = function(self, event, target, player)
    return player:hasSkill(chidiaoyao.name, true)
  end,
  on_refresh = function(self, event, target, player)
    set_marks(player, visible_count(player))
  end,
})

chidiaoyao:addEffect(fk.TurnEnd, {
  can_refresh = function(self, event, target, player)
    return player:hasSkill(chidiaoyao.name, true)
  end,
  on_refresh = function(self, event, target, player)
    set_marks(player, 1)
  end,
})

chidiaoyao:addAcquireEffect(function(self, player)
  set_marks(player, visible_count(player))
end)

chidiaoyao:addLoseEffect(function(self, player)
  set_marks(player, 0)
end)

return chidiaoyao
