local U = require "packages.utility.utility"
local s = fk.CreateSkill { name = "niwoqianzhun" }
local DM, TM = "niwoqianzhun_desc-round", "niwoqianzhun_tag-round"
local function choose_name(room, player, list, prompt)
  if #list == 1 then return list[1] end
  return U.askForChooseCardNames(room, player, list, 1, 1, s.name, prompt,
    list, false)[1]
end
local function names(target, mode, pattern)
  local out, x = {}, 1
  if mode == 2 then for _,k in ipairs(target:getSkillNameList()) do local a=Fk.skills[k];local b=a and a:getSkeleton();if b then x=x+#(b.tags or {}) end end end
  for _,n in ipairs(Fk:getAllCardNames("bt")) do
    local c=Fk:cloneCard(n)
    if (c.type==Card.TypeBasic or c:isCommonTrick()) and (not pattern or Exppattern:Parse(pattern):match(c)) then
      if mode==2 and c:getNameLength()<=x then table.insert(out,n) end
      if mode==1 then local tr=Fk:translate(n);if table.find(target:getSkillNameList(),function(k)return string.find(Fk:translate(":"..k),"【"..tr.."】",1,true)end) then table.insert(out,n) end end
    end
  end
  return out
end
local function spec(event)
  return {
    can_trigger=function(self,e,target,player,data)
      return target==player and player:hasSkill(s.name) and (player:getMark(DM)==0 or player:getMark(TM)==0)
    end,
    on_cost=function(self,e,target,player,data)
      local room=player.room
      if not room:askToSkillInvoke(player,{skill_name=s.name,prompt="#niwoqianzhun-invoke"}) then return false end
      local candidates=table.filter(room.alive_players,function(p)return (player:getMark(DM)==0 and #names(p,1,data.pattern)>0) or (player:getMark(TM)==0 and #names(p,2,data.pattern)>0) end)
      if #candidates==0 then return false end
      local who=room:askToChoosePlayers(player,{targets=candidates,min_num=1,max_num=1,skill_name=s.name,prompt="#niwoqianzhun-reference",cancelable=true})[1]
      if not who then return false end
      local opts={};if player:getMark(DM)==0 and #names(who,1,data.pattern)>0 then table.insert(opts,"niwoqianzhun_opt1") end;if player:getMark(TM)==0 and #names(who,2,data.pattern)>0 then table.insert(opts,"niwoqianzhun_opt2") end
      local opt=#opts==1 and opts[1] or room:askToChoice(player,{choices=opts,skill_name=s.name,prompt="#niwoqianzhun-choice"})
      local list=names(who,opt=="niwoqianzhun_opt1" and 1 or 2,data.pattern)
      local n=choose_name(room,player,list,"#niwoqianzhun-card")
      local card=Fk:cloneCard(n);card.skillName=s.name;data.result={from=player,card=card};if event==fk.AskForCardUse then data.result.tos={} end
      room:setPlayerMark(player,opt=="niwoqianzhun_opt1" and DM or TM,1)
      return true
    end,
  }
end
s:addEffect("active", {
  anim_type = "control",
  prompt = "#niwoqianzhun-reference",
  card_num = 0,
  target_num = 1,
  can_use = function(self, player)
    return player.phase == Player.Play and (player:getMark(DM) == 0 or player:getMark(TM) == 0)
  end,
  target_filter = function(self, player, to_select, selected)
    return #selected == 0 and
      ((player:getMark(DM) == 0 and #names(to_select, 1)>0) or
       (player:getMark(TM) == 0 and #names(to_select, 2)>0))
  end,
  on_use = function(self, room, effect)
    local player, who = effect.from, effect.tos[1]
    local opts = {}
    if player:getMark(DM) == 0 and #names(who, 1) > 0 then table.insert(opts, "niwoqianzhun_opt1") end
    if player:getMark(TM) == 0 and #names(who, 2) > 0 then table.insert(opts, "niwoqianzhun_opt2") end
    if #opts == 0 then return end
    local opt = #opts == 1 and opts[1] or room:askToChoice(player, {
      choices = opts, skill_name = s.name, prompt = "#niwoqianzhun-choice",
    })
    local list = names(who, opt == "niwoqianzhun_opt1" and 1 or 2)
    local name = choose_name(room, player, list, "#niwoqianzhun-card")
    local use = room:askToUseVirtualCard(player, {
      name = name, skill_name = s.name, prompt = "#niwoqianzhun-use", cancelable = false,
      extra_data = { bypass_times = true },
    })
    if use then
      room:setPlayerMark(player, opt == "niwoqianzhun_opt1" and DM or TM, 1)
      room:useCard(use)
    end
  end,
})
s:addEffect(fk.AskForCardUse,spec(fk.AskForCardUse))
s:addEffect(fk.AskForCardResponse,spec(fk.AskForCardResponse))
return s
