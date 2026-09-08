local extension = Package:new("tianzong_toaru")
extension.extensionName = "tianzong"

extension:loadSkillSkelsByPath("./packages/tianzong/pkg/tianzong_toaru/skills")

local fengji_equips = {
  { name = "&weapon__tianzong_toaru__fengji", subtype = Card.SubtypeWeapon },
  { name = "&armor__tianzong_toaru__fengji", subtype = Card.SubtypeArmor },
  { name = "&offensive_horse__tianzong_toaru__fengji", subtype = Card.SubtypeOffensiveRide },
  { name = "&defensive_horse__tianzong_toaru__fengji", subtype = Card.SubtypeDefensiveRide },
  { name = "&treasure__tianzong_toaru__fengji", subtype = Card.SubtypeTreasure },
}
for _, spec in ipairs(fengji_equips) do
  local card = fk.CreateCard {
    name = spec.name,
    type = Card.TypeEquip,
    sub_type = spec.subtype,
  }
  extension:loadCardSkels { card }
  extension:addCardSpec(spec.name:sub(2))
end

General:new(extension, "tianzong_toaru__misaka", "tianzong_science", 4, 4, General.Female)
  :addSkills { "tianzong_toaru__leibi", "tianzong_toaru__cipao" }
General:new(extension, "tianzong_toaru__shirai", "tianzong_science", 3, 3, General.Female)
  :addSkills { "tianzong_toaru__shunyi", "tianzong_toaru__fengji" }
General:new(extension, "tianzong_toaru__uiharu", "tianzong_science", 3, 3, General.Female)
  :addSkills { "tianzong_toaru__hengwen", "tianzong_toaru__zonghuan" }
General:new(extension, "tianzong_toaru__kungou", "tianzong_science", 4, 4, General.Female)
  :addSkills { "tianzong_toaru__zhoushe", "tianzong_toaru__kongli" }
General:new(extension, "tianzong_toaru__saten", "tianzong_science", 4, 4, General.Female)
  :addSkills { "tianzong_toaru__yichu", "tianzong_toaru__juben", "tianzong_toaru__daoyan" }
General:new(extension, "tianzong_toaru__shokuhou", "tianzong_science", 3, 3, General.Female)
  :addSkills { "tianzong_toaru__duxin", "tianzong_toaru__paihu", "tianzong_toaru__waizhuang" }

Fk:loadTranslationTable {
  ["tianzong_toaru"] = "学园都市",
  ["tianzong_science"] = "科学",

  ["tianzong_toaru__misaka"] = "御坂美琴",
  ["#tianzong_toaru__misaka"] = "最强无敌的电击公主",
  ["designer:tianzong_toaru__misaka"] = "公冶天纵",
  ["illustrator:tianzong_toaru__misaka"] = "灰村清孝",
  ["tianzong_toaru__leibi"] = "雷壁",
  [":tianzong_toaru__leibi"] = "其他角色使用的技能每回合首次即将作用于你时，你可视为对其使用一张雷【杀】，若此【杀】造成伤害，此技能无效。当你即将受到雷属性伤害时，你可令其取消之，然后你恢复等量点体力值。当场上有角色即将受到雷属性伤害后，你摸等同于此次伤害值张牌。",
  ["tianzong_toaru__cipao"] = "磁炮",
  [":tianzong_toaru__cipao"] = "出牌阶段限一次，你可以将任意张牌当作一张不计入次数且无视防具的雷【杀】使用。若这些牌的牌名字数均不同，此【杀】伤害改为X（X为以此法转化的牌数）；若这些牌的类别均不同，目标需打出等同于以此法转化牌数量的【闪】。<a href='#ChengShi'>乘势</a>：你随机获得一个技能描述中含有【杀】的技能。",

  ["tianzong_toaru__shirai"] = "白井黑子",
  ["#tianzong_toaru__shirai"] = "正义的风纪委员",
  ["designer:tianzong_toaru__shirai"] = "公冶天纵",
  ["illustrator:tianzong_toaru__shirai"] = "灰村清孝",
  ["tianzong_toaru__shunyi"] = "瞬移",
  [":tianzong_toaru__shunyi"] = "出牌阶段限一次，你可以将与你距离不大于1的一名角色的：①一张手牌区、装备区或判定区的牌移动至另一名角色的相应区域；②将一名角色的座次移动至两名其他角色中间，然后移除此选项。",
  ["tianzong_toaru__fengji"] = "风纪",
  [":tianzong_toaru__fengji"] = "每轮限一次，当有角色受到伤害后，若伤害来源与你距离为1，你可以将一张【杀】置入其装备区并发动一次“风纪”；有角色装备区有除了装备牌外的牌进入时，其需选择一项：1.本回合不能使用或打出与此牌花色相同的牌且所有非锁定技失效；2.保留此牌和一张手牌，然后弃置所有牌。",
  ["weapon__tianzong_toaru__fengji"] = "风纪",
  ["armor__tianzong_toaru__fengji"] = "风纪",
  ["offensive_horse__tianzong_toaru__fengji"] = "风纪",
  ["defensive_horse__tianzong_toaru__fengji"] = "风纪",
  ["treasure__tianzong_toaru__fengji"] = "风纪",

  ["tianzong_toaru__uiharu"] = "初春饰利",
  ["#tianzong_toaru__uiharu"] = "Lv1.定温保存",
  ["designer:tianzong_toaru__uiharu"] = "公冶天纵",
  ["illustrator:tianzong_toaru__uiharu"] = "幻想收束",
  ["tianzong_toaru__hengwen"] = "恒温",
  [":tianzong_toaru__hengwen"] = "出牌阶段，你可以令一名角色获得一枚“恒温”标记并记录其体力值。其体力值变化后，你可以令其恢复或失去体力至记录体力值，然后移除其“恒温”标记并重置“纵幻”。",
  ["tianzong_toaru__zonghuan"] = "纵幻",
  [":tianzong_toaru__zonghuan"] = "限定技，每当你成为其他角色牌的目标时，你可重置“恒温”并令此牌对你无效，然后你为此牌选择一个额外合法目标（若有，可为使用者自己）。",

  ["tianzong_toaru__kungou"] = "婚后光子",
  ["#tianzong_toaru__kungou"] = "Lv.4.空力使",
  ["designer:tianzong_toaru__kungou"] = "公冶天纵",
  ["illustrator:tianzong_toaru__kungou"] = "幻想收束",
  ["tianzong_toaru__zhoushe"] = "轴射",
  [":tianzong_toaru__zhoushe"] = "每轮限一次，你可以视为使用或打出一张雷【杀】。若此【杀】被【闪】抵消，目标需选择一项：1.失去一点体力值；2.获得【混乱】。",
  ["tianzong_toaru__kongli"] = "空力",
  [":tianzong_toaru__kongli"] = "锁定技，当你即将造成伤害时，25%概率令对方非锁定技失效直到本回合结束；25%概率令其获得【混乱】；5%概率令其所有技能失效直到其下个回合结束。",
  ["tianzong_toaru__hunluan"] = "混乱",
  [":tianzong_toaru__hunluan"] = "锁定技，当你使用牌时，50%概率为此牌随机选择一个目标。每名角色的回合结束后，若你本回合未受到过伤害且未成为过牌的目标，你失去此技能。",

  ["tianzong_toaru__saten"] = "佐天泪子",
  ["#tianzong_toaru__saten"] = "Lv.0.都市传说探索者",
  ["designer:tianzong_toaru__saten"] = "公冶天纵",
  ["illustrator:tianzong_toaru__saten"] = "灰村清孝",
  ["tianzong_toaru__yichu"] = "衣橱",
  [":tianzong_toaru__yichu"] = "锁定技，你的手牌上限和体力上限+X；每轮开始时，你随机将牌堆的一张装备牌置入你的装备区（X为你装备区牌的数量）。当你的装备区首次有牌离开后，你永久获得该装备牌效果。当你每轮首次造成伤害后，目标随机弃置一张牌，若为装备牌，你获得之。",
  ["tianzong_toaru__juben"] = "剧本",
  [":tianzong_toaru__juben"] = "出牌阶段开始时或每轮开始时，你可以记录一个不重复的牌名、角色和花色。①当有角色使用牌指定目标后，若此牌牌名或目标已记录，你可以更改此牌目标或牌名（需合法）。②当已记录角色发动技能时，你可以改为你发动此技能。③当出现已记录花色或牌名的判定牌后，你可以将此牌改为你记录的花色或牌名。当你触发上述效果后，你移除对应记录并摸两张牌。",
  ["tianzong_toaru__daoyan"] = "导演",
  [":tianzong_toaru__daoyan"] = "限定技，出牌阶段，你可以获得牌堆中所有已记录牌名的牌、已记录角色的所有牌和弃牌堆中所有已记录花色且由你使用或弃置的牌，然后你失去“剧本”。",

  ["tianzong_toaru__shokuhou"] = "食蜂操祈",
  ["#tianzong_toaru__shokuhou"] = "常盘台的女王",
  ["designer:tianzong_toaru__shokuhou"] = "公冶天纵",
  ["illustrator:tianzong_toaru__shokuhou"] = "灰村清孝",
  ["tianzong_toaru__duxin"] = "读心",
  [":tianzong_toaru__duxin"] = "蓄力技（1/7），①出牌阶段，你可以消耗一枚蓄力点并选择一名角色，观看其手牌并使用其中一张（视为该角色使用）；②当有其他角色发动技能指定目标后或使用单体牌指定目标后，你可消耗2枚蓄力点重新选择目标。",
  ["#tianzong_toaru__duxin-choose"] = "读心：选择一名角色观看其手牌",
  ["#tianzong_toaru__duxin-card"] = "读心：选择其一张手牌使用",
  ["tianzong_toaru__paihu"] = "派阀",
  [":tianzong_toaru__paihu"] = "限定技，出牌阶段，若场上角色数量不小于3，你可以令一名其他角色摸X张牌并恢复一点体力值（X为与你同阵营的角色数且至少为1），若其获胜条件与你不一致且其所处阵营剩余人数大于1人，你可以令其获胜条件改为与你一致并获得“仰慕”。",
  ["#tianzong_toaru__paihu"] = "派阀：选择一名其他角色令其摸牌并恢复体力",
  ["#tianzong_toaru__paihu-convert"] = "派阀：是否令 %dest 的获胜条件改为与你一致并令其获得“仰慕”？",
  ["tianzong_toaru__waizhuang"] = "外装",
  [":tianzong_toaru__waizhuang"] = "锁定技，当你使用了一组基本牌、锦囊牌和装备牌后或你的回合内，一组基本牌、锦囊牌和装备牌因被使用或弃置离开其他角色的区域后，你获得一枚蓄力点；当你受到伤害后，你的“读心”蓄力值上限-1。",
  ["tianzong_toaru__yangmu"] = "仰慕",
  [":tianzong_toaru__yangmu"] = "食蜂操祈可随时观看你的手牌。每轮各限一次，①当食蜂操祈即将受到伤害后，你可以失去一点体力上限防止此伤害；②食蜂操祈可如手牌般使用或打出你的手牌。",
  ["#tianzong_toaru__yangmu-guard"] = "仰慕：选择一名角色失去1点体力上限并防止你受到的伤害",
  ["@[list]tianzong_toaru__yangmu"] = "仰慕",
  ["@[juben_names]"] = "剧本·牌名",
  ["@[juben_players]"] = "剧本·角色",
  ["@[juben_suits]"] = "剧本·花色",
  ["@[yichu_saved]"] = "衣橱",
}

return extension

