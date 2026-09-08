local chimiling = fk.CreateSkill{
  name = "chimiling",
  tags = { Skill.Compulsory },
}

local GENERAL_MARK = "@&chimiling"
local RECORD_MARK = "chimiling_record-round"

Fk:addQmlMark{
  name = "chimiling",
  how_to_show = function(_, value)
    return type(value) == "table" and tostring(#value) or " "
  end,
  qml = function(_, value)
    if type(value) ~= "table" or #value == 0 then return nil end
    return {
      uri = "LunarLtk.Pages.InfoPopups",
      name = "ViewGeneralPile",
      prop = { cardNames = value },
    }
  end,
}

local function clear_mi(player)
  local room = player.room
  local generals = player:getTableMark(GENERAL_MARK)
  if #generals > 0 then
    room:returnToGeneralPile(generals)
  end
  room:setPlayerMark(player, GENERAL_MARK, 0)
  room:setPlayerMark(player, RECORD_MARK, 0)
end

Fk:loadTranslationTable{
  ["chimiling"] = "麋灵",
  ["@&chimiling"] = "麋",
  ["@[chimiling]chimiling"] = "麋",
  [":chimiling"] = "<b>锁定技，</b>当你成为一张牌的目标后，若此牌牌名字数你未以此法记录过，你记录之并将等量张武将牌置于你的武将牌上，称为“麋”；每轮开始时，你清除所有记录和“麋”。",
  ["#chimiling_log"] = "%from 发动【麋灵】，获得了%arg张“麋”",
  ["$chimiling1"] = "鹿鸣呦呦，莺戏疃瞳，云中锦字欠西风。",
  ["$chimiling2"] = "兰舟破烟波，鹿涉沙洲扯裙罗。",
}

chimiling:addEffect(fk.TargetConfirmed, {
  can_trigger = function(self, event, target, player, data)
    if target ~= player or not player:hasSkill(chimiling.name) or not data.card then return false end
    local x = data.card:getNameLength(true)
    return x > 0 and not table.contains(player:getTableMark(RECORD_MARK), x)
  end,
  on_use = function(self, event, target, player, data)
    local room = player.room
    local x = data.card:getNameLength(true)
    room:addTableMark(player, RECORD_MARK, x)

    local generals = room:findGenerals(function() return true end, x)
    if #generals > 0 then
      local mark = player:getTableMark(GENERAL_MARK)
      table.insertTable(mark, generals)
      room:setPlayerMark(player, GENERAL_MARK, mark)
    end
    room:sendLog{
      type = "#chimiling_log",
      from = player.id,
      arg = #generals,
    }
  end,
})

chimiling:addEffect(fk.RoundStart, {
  can_refresh = function(self, event, target, player, data)
    return player:hasSkill(chimiling.name, true) and
      (player:getMark(GENERAL_MARK) ~= 0 or player:getMark(RECORD_MARK) ~= 0)
  end,
  on_refresh = function(self, event, target, player, data)
    clear_mi(player)
  end,
})

chimiling:addLoseEffect(function(self, player)
  clear_mi(player)
end)

return chimiling
