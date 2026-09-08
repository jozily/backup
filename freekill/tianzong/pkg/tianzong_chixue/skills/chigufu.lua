local common = require "packages/tianzong/pkg/tianzong_chixue/lib/common"

local chigufu = fk.CreateSkill{
  name = "chigufu",
}

local function do_gufu(room, player, cards, from_bottom)
  if not cards or #cards == 0 then return end

  room:recastCard(cards, player, chigufu.name)

  local from_place = from_bottom and "bottom" or "top"
  local ids = common.premeditate_n(room, player, #cards, from_place, chigufu.name)

  if common.restore_removed_from_cards then
    common.restore_removed_from_cards(room, player, ids)
  end
end

chigufu:addEffect("active", {
  anim_type = "control",
  prompt = "#chigufu",
  target_num = 0,
  min_card_num = 1,
  max_phase_use_time = 1,

  interaction = UI.ComboBox { choices = { "Top", "Bottom" } },

  can_use = function(self, player)
    return player.phase == Player.Play
      and player:usedSkillTimes(chigufu.name, Player.HistoryPhase) == 0
      and not player:isNude()
      and common.get_unremoved_count(player) > 0
      and not table.contains(player.sealedSlots, Player.JudgeSlot)
  end,

  card_filter = function(self, player, to_select, selected)
    return #selected < common.get_unremoved_count(player)
      and not player:prohibitDiscard(to_select)
  end,

  on_use = function(self, room, effect)
    local player = effect.from
    local from_bottom = self.interaction.data == "Bottom"
    do_gufu(room, player, effect.cards, from_bottom)
  end,
})

chigufu.doGufu = do_gufu

Fk:loadTranslationTable{
  ["chigufu"] = "孤凫",
  [":chigufu"] = "出牌阶段限一次，你可以重铸任意张区域内的牌（至多为“惊鸿”未移除牌名数），然后蓄谋牌堆顶或牌堆底的等量张牌。",

  ["#chigufu"] = "孤凫：出牌阶段限一次，选择至多X张牌重铸，然后选择从牌堆顶或牌堆底蓄谋等量牌",
  ["Top"] = "牌堆顶",
  ["Bottom"] = "牌堆底",
}

return chigufu
