local extension = Package:new("tianzong_niwo")
extension.extensionName = "tianzong"

extension:loadSkillSkelsByPath("./packages/tianzong/pkg/tianzong_niwo/skills")




local niwo__xushu = General:new(extension, "niwo__xushu", "qun", 4, 4, General.Male)
niwo__xushu:addSkills { "niwozhuohun", "niwosuchen", "niwochoulu" }

local niwo__xushi = General:new(extension, "niwo__xushi", "wu", 3, 3, General.Female)
niwo__xushi:addSkills { "niwoyanliu", "niwoxiangming", "niwochoulu" }

local niwo__hanlong = General:new(extension, "niwo__hanlong", "wei", 4, 4, General.Male)
niwo__hanlong:addSkills { "niwozhengtu", "niwonilin", "niwochoulu" }

local niwo__xurong = General:new(extension, "niwo__xurong", "qun", 4, 4, General.Male)
niwo__xurong:addSkills { "niwoxuejiu", "niwoshulie", "niwochoulu" }

local niwo__zhaoyun = General:new(extension, "niwo__zhaoyun", "qun", 4, 4, General.Male)
niwo__zhaoyun:addSkills { "niwotalan", "niwoyuhe", "niwochoulu" }

local niwo__wenqin = General:new(extension, "niwo__wenqin", "wei", 4, 4, General.Male)
niwo__wenqin:addSkills { "niwocunduan", "niwoqiangge", "niwochoulu" }



local niwo__wangyi = General:new(extension, "niwo__wangyi", "wei", 3, 3, General.Female)
niwo__wangyi:addSkills { "niwoxiapo", "niwoshucai", "niwochoulu" }


local niwo__zhouchu = General:new(extension, "niwo__zhouchu", "wu", 3, 3, General.Male)
niwo__zhouchu:addSkills { "niwoxungu", "niwoxianwang", "niwochoulu" }

local niwo__zhanghua = General:new(extension, "niwo__zhanghua", "jin", 4, 4, General.Male)
niwo__zhanghua:addSkills { "niwoqianzhun", "niwobailan", "niwoyinbing" }


local niwo__jiaxu = General:new(extension, "niwo__jiaxu", "qun", 3, 3, General.Male)
niwo__jiaxu:addSkills { "niwoshudu", "niwochencang" }

local niwo__zhaoe = General:new(extension, "niwo__zhaoe", "qun", 3, 3, General.Female)
niwo__zhaoe:addSkills { "niwotianmeng", "niwotianmeng_mark", "niwofuxue", "niwochenghen", "niwochoulu" }



Fk:loadTranslationTable{
  ["#niwobailan-invoke"] = "百览：你可以发动此限定技",
  ["#niwobailan"] = "百览：选择一名有非限定技的角色",
  ["#niwocangji-invoke"] = "藏机：你可以发动此限定技",
  ["#niwochoulu-invoke"] = "仇戮：你可以对伤害来源使用一张无距离限制的【杀】",
  ["#niwoqianzhun-invoke"] = "谦准：你可以发动此技能",
  ["#niwochoulu-use"] = "仇戮：请对 %dest 使用一张无距离限制的【杀】",
  ["@$niwochoulu"] = "仇戮",
  ["@$niwochencang"] = "沉沧",
  ["@$niwochencangRemake"] = "沉沧",
  ["#niwoxiangming-invoke"] = "飨名：是否亮出牌堆顶和底各 %arg 张牌？",
  ["#niwoxiangming-equip"] = "飨名：是否将 %arg 装备？",
  ["#niwoyanliu-ask"] = "掩锍：请打出一张【杀】，否则伤害+1",
  ["#niwoyinbing-ice"] = "饮冰：是否对 %dest 使用一张冰【杀】？",
  ["#niwoyinbing-invoke"] = "饮冰：是否发动？",
  ["#niwoyinbing-acquire"] = "饮冰：选择一名角色获得【饮冰】",
  ["#niwochencang"] = "沉沧：选择要视为使用或打出的牌",
  ["#niwochencangRemake"] = "沉沧：选择要视为使用或打出的牌",
  ["@$niwoshucai-round"] = "殊彩·已用花色",
  ["@[niwoshucai]"] = "殊彩·展示手牌",
  ["#niwoshucai"] = "殊彩：展示所有手牌，弃置一种本轮未选择过的花色，视为使用或打出火【杀】或【闪】",
  ["#niwoshucai-suit"] = "殊彩：选择弃置一种花色的所有手牌",
  ["@niwo_mo"] = "殁",
  ["@@niwo_mo"] = "殁",
  ["#niwotianmeng-choice"] = "殄梦：选择标记“殁”或使用一张“殁”",
  ["niwotianmeng_mark"] = "殄梦·标记",
  [":niwotianmeng_mark"] = "出牌阶段限一次，或当你受到伤害后，你可以标记你与一名其他角色的一张牌为“殁”。",
  ["niwotianmeng_use"] = "将一张“殁”当单体伤害牌使用或打出",
  ["#niwotianmeng-target"] = "殄梦：选择一名角色与你各标记一张“殁”",
  ["#niwotianmeng-selfcard"] = "殄梦：选择你的一张牌标记为“殁”",
  ["#niwotianmeng-targetcard"] = "殄梦：选择目标角色的一张牌标记为“殁”",
  ["#niwotianmeng-card"] = "殄梦：选择 %dest 的一张牌标记为“殁”",
  ["#niwotianmeng-use"] = "殄梦：选择一张“殁”和要视为使用的单体伤害牌",
  ["#niwotianmeng-choose"] = "殄梦：选择一名角色标记“殁”",
  ["#niwofuxue"] = "覆血：失去1点体力，令伤害增加并摸牌，或恢复体力",
  ["niwofuxue_add"] = "令此伤害+X，然后摸2X张牌",
  ["niwofuxue_recover"] = "恢复X点体力",
  ["#niwobailan-choose"] = "百览：选择一名有非限定技的角色",
  ["#niwobailan-skill"] = "百览：选择其武将牌上的一个非限定技",
  ["#niwochenghen-give"] = "承痕：令一名其他角色获得你的一个技能，然后对其依次使用场上的“殁”",
  ["#niwochenghen-obtain"] = "承痕：是否获得这%arg张因其他角色使用或打出而进入弃牌堆的“殁”？",
  ["#niwoqianzhun-choose"] = "千谆：选择一名角色",
  ["#niwoqianzhun"] = "千谆：选择一名角色，视为使用符合其技能描述或技能标签数的牌",
  ["#niwoqianzhun-invoke"] = "千谆：是否发动并选择参考角色？",
  ["#niwoqianzhun-reference"] = "千谆：选择一名角色作为技能信息参考（并非此牌的目标）",
  ["#niwoqianzhun-choice"] = "千谆：选择一种视为使用或打出牌的方式",
  ["niwoqianzhun_opt1"] = "视为使用或打出其技能描述中包含的牌",
  ["niwoqianzhun_opt2"] = "视为使用或打出牌名字数不大于其技能标签数+1的牌",
  ["#niwoqianzhun-card"] = "千谆：选择其技能描述中包含的牌名",
  ["#niwoqianzhun-cardlen"] = "千谆：选择符合牌名字数的基本牌或普通锦囊牌",
  ["#niwoqianzhun-use"] = "千谆：使用或打出所选牌",
  ["@$niwoqianzhun"] = "千谆",
  ["#niwoxungu"] = "寻古：将一张“风”视为任意基本牌或普通锦囊牌使用或打出",
  ["@@niwozhuohun_invalid-turn"] = "灼魂",
  ["#niwochencang-choose"] = "沉藏：选择牌的目标",
  ["chi"] = "炽血丹青",
    ["chixue"] = "炽血丹青",
  ["niwo"] = "逆涡之流",
  ["tianzong_chixue"] = "炽血丹青",
  ["tianzong_niwo"] = "逆涡之流",
  ["tianzong"] = "天纵崇壑",

  -- 逆徐庶
  ["niwo__xushu"] = "逆徐庶",
  ["#niwo__xushu"] = "侠戮者",
  ["~niwo__xushu"] = "此志未竟，恨难瞑目……",
  ["designer:niwo__xushu"] = "公冶天纵",
  ["illustrator:niwo__xushu"] = "佚名",
  ["cv:niwo__xushu"] = "暂无",
  ["niwozhuohun"] = "灼魂",
  [":niwozhuohun"] = "每轮开始时，你将【炽·玄剑】从场上或弃牌堆置入你的武器区。当你使用【杀】指定目标后，场上区域没有与此【杀】花色相同的牌的其他角色非锁定技失效直到回合结束。",
  ["niwosuchen"] = "肃尘",
  [":niwosuchen"] = "每轮限一次，当你成为其他角色【杀】或锦囊牌的目标时，你可以弃置一张【杀】，令此牌目标转移给使用者。然后若你体力值不大于其，你可以对其造成1点雷属性伤害。",
  ["$niwozhuohun1"] = "灼魂燃剑，所向披靡。",
  ["$niwozhuohun2"] = "此剑所指，魂归何处。",
  ["$niwosuchen1"] = "尘埃落定，肃杀之气。",
  ["$niwosuchen2"] = "肃清寰宇，还我清明。",

  -- 逆徐氏
  ["niwo__xushi"] = "逆徐氏",
  ["#niwo__xushi"] = "飨殪者",
  ["~niwo__xushi"] = "名与刃俱尽，余声沉江……",
  ["designer:niwo__xushi"] = "公冶天纵",
  ["illustrator:niwo__xushi"] = "佚名",
  ["cv:niwo__xushi"] = "暂无",
  ["niwoyanliu"] = "掩锍",
  [":niwoyanliu"] = "锁定技，当你使用单体伤害类卡牌即将造成伤害时，若你装备武器，目标需打出一张【杀】，否则此伤害+1。",
  ["niwoxiangming"] = "飨名",
  [":niwoxiangming"] = "每轮开始时，你可以亮出牌堆顶和牌堆底的各体力值张牌，获得其中的伤害类卡牌和武器牌（可选择是否装备），然后将其余的牌以任意顺序置于牌堆顶或牌堆底。",
  ["$niwoyanliu1"] = "锍影覆锋，杀意暗生。",
  ["$niwoyanliu2"] = "刃下藏锍，势成难挡。",
  ["$niwoxiangming1"] = "飨其名器，收其锋声。",
  ["$niwoxiangming2"] = "名动于外，尽归我手。",

  -- 逆徐荣
  ["niwo__xurong"] = "逆徐荣",
  ["#niwo__xurong"] = "殚怒者",
  ["~niwo__xurong"] = "裂痕已深，无可弥合……",
  ["designer:niwo__xurong"] = "公冶天纵",
  ["illustrator:niwo__xurong"] = "佚名",
  ["cv:niwo__xurong"] = "暂无",
  ["niwoxuejiu"] = "血鹫",
  [":niwoxuejiu"] = "锁定技，游戏开始时/当你造成或受到伤害后，你令所有玩家/你将牌堆底的一张牌于其/目标或伤害来源武将牌上，称为“裂”。每当有“裂”或与“裂”同名的牌进入弃牌堆时，你摸两张牌。",
  ["niwoshulie"] = "疏裂",
  [":niwoshulie"] = "每回合限一次，你可以将任意角色的红色/黑色“裂”当做【杀】/【无懈可击】使用或打出。若该角色为你，你获得场上所有同花色的“裂”。",
  ["$niwoxuejiu1"] = "血染苍穹，鹫影翱翔。",
  ["$niwoxuejiu2"] = "裂痕既成，血债血偿。",
  ["$niwoshulie1"] = "疏而不漏，裂而不散。",
  ["$niwoshulie2"] = "裂隙之中，自有乾坤。",

  -- 逆王异
  ["niwo__wangyi"] = "逆王异",
  ["#niwo__wangyi"] = "疏梦者",
  ["~niwo__wangyi"] = "去年花开君还在，今年花落复谁在。",
  ["designer:niwo__wangyi"] = "公冶天纵",
  ["illustrator:niwo__wangyi"] = "佚名",
  ["cv:niwo__wangyi"] = "暂无",
  ["niwoxiapo"] = "黠魄",
  [":niwoxiapo"] = "锁定技，当你使用牌时，该牌所有目标横置；当你/其他角色响应其他角色/你一张牌时，你/其他角色重置。",
  ["niwoshucai"] = "殊彩",
  [":niwoshucai"] = "每轮每种花色各限一次，当你需要使用或打出一张火【杀】或【闪】时，你可以展示所有手牌，然后弃置一种花色的所有牌，视为使用或打出之。若你由此后手牌数为全场最低，你获得牌堆底的两张牌。",
  ["$niwoxiapo1"] = "玉洁松贞，雪晶霜烈。",
  ["$niwoxiapo2"] = "忠贞不移，誓守家国。",
  ["$niwoshucai1"] = "钩元摘秘，精妙计出。",
  ["$niwoshucai2"] = "九计秘牒，谨小慎微。",
    ["$niwochoulu_niwo__wangyi1"] = "守护山河，吾生不息。",
  ["$niwochoulu_niwo__wangyi2"] = "我执三尺剑，敌若犯，必杀之！",

  -- 逆韩龙
  ["niwo__hanlong"] = "逆韩龙",
  ["#niwo__hanlong"] = "孤歼者",
  ["~niwo__hanlong"] = "铮铮铁骨，折于此处……",
  ["designer:niwo__hanlong"] = "公冶天纵",
  ["illustrator:niwo__hanlong"] = "佚名",
  ["cv:niwo__hanlong"] = "暂无",
  ["niwozhengtu"] = "铮途",
  [":niwozhengtu"] = "锁定技，你与你的上下家的距离始终为1。你的装备牌可以当任意单体伤害牌使用，且所有角色本回合无法使用、打出或弃置所有与此装备牌相同花色的牌。",
  ["niwonilin"] = "逆鳞",
  [":niwonilin"] = "每轮限一次，当你受到伤害后，你可以摸X张牌然后将自己移出游戏，回合结束时，你移回游戏，并将随机一张本回合进入弃牌堆的装备置入你的对应装备区（X为本技能本局的发动次数且至多为游戏人数）。",
  ["$niwozhengtu1"] = "铮然有声，途路漫漫。",
  ["$niwozhengtu2"] = "铁蹄所至，无路不通。",
  ["$niwonilin1"] = "逆鳞既触，玉石俱焚。",
  ["$niwonilin2"] = "鳞甲之下，自有锋芒。",

  -- 逆周处
  ["niwo__zhouchu"] = "逆周处",
  ["#niwo__zhouchu"] = "殒风者",
  ["~niwo__zhouchu"] = "风已止，古难寻……",
  ["designer:niwo__zhouchu"] = "公冶天纵",
  ["illustrator:niwo__zhouchu"] = "佚名",
  ["cv:niwo__zhouchu"] = "暂无",
  ["niwoxungu"] = "寻古",
  [":niwoxungu"] = "每轮开始时，你弃置所有“风”并进行判定直至出现相同牌名，然后你获得所有装备牌和二次出现的牌，并将其余所有判定牌置于武将牌旁，称为“风”。每回合限一次，你可以视为使用或打出一张“风”，然后你弃置之。",
  ["niwoxianwang"] = "衔望",
  [":niwoxianwang"] = "锁定技，当你首次使用或打出“风”已记录牌名的实体牌时，你弃置对应“风”令此牌额外执行一次。当你的“风”进入弃牌堆后，你摸X张牌（X为与此“风”花色相同的“风”数）。",
  ["$niwoxungu1"] = "寻古问今，风从何处。",
  ["$niwoxungu2"] = "古道西风，踏遍山河。",
  ["$niwoxianwang1"] = "衔望而行，志在千里。",
  ["$niwoxianwang2"] = "望断天涯，衔恨而归。",

  -- 逆张华
  ["niwo__zhanghua"] = "逆张华",
  ["#niwo__zhanghua"] = "觱途者",
  ["~niwo__zhanghua"] = "千谆百览，终成泡影……",
  ["designer:niwo__zhanghua"] = "公冶天纵",
  ["illustrator:niwo__zhanghua"] = "佚名",
  ["cv:niwo__zhanghua"] = "暂无",
  ["niwoqianzhun"] = "千谆",
  [":niwoqianzhun"] = "每轮各限一次，当你需要使用或打出一张基本牌或普通锦囊牌时，你可以选择一名角色并选择一项：①视为使用或打出一张其技能描述中包含的牌；②视为使用或打出一张牌名字数不大于X的基本牌或普通锦囊牌（X为其武将牌上技能标签数+1）。",
  ["niwobailan"] = "百览",
  [":niwobailan"] = "限定技，出牌阶段，你可以令一名角色摸4X张牌，然后你选择其武将牌上的一个非限定技，其下次发动该技能后失去此技能，若所选角色不为你，结算后你失去X点体力（X为场上存在的技能标签数量）。",
  ["niwoyinbing"] = "饮冰",
  [":niwoyinbing"] = "当你不因此技能受到或造成伤害后，受伤角色可以视为对伤害来源使用一张冰【杀】，结算后若此【杀】造成伤害，此【杀】使用者摸两张牌并失去一点体力值。若有角色因此技能而进入濒死状态（受到冰【杀】伤害或失去体力值），你获得“仇戮”。",
  ["$niwoqianzhun1"] = "千言万语，谆谆教诲。",
  ["$niwoqianzhun2"] = "谆谆善诱，字字珠玑。",
  ["$niwobailan1"] = "百卷览尽，胸有成竹。",
  ["$niwobailan2"] = "览遍古今，无所不知。",
  ["$niwoyinbing1"] = "饮冰十年，难凉热血。",
  ["$niwoyinbing2"] = "冰封于心，热血难凉。",
  ["@niwobailan"] = "百览：",
  ["@[niwobailan_detail]"] = "",

  -- 逆赵云
  ["niwo__zhaoyun"] = "逆赵云",
  ["#niwo__zhaoyun"] = "弑澜者",
  ["~niwo__zhaoyun"] = "澜已踏尽，壑难逾越……",
  ["designer:niwo__zhaoyun"] = "公冶天纵",
  ["illustrator:niwo__zhaoyun"] = "佚名",
  ["cv:niwo__zhaoyun"] = "暂无",
  ["niwotalan"] = "踏澜",
  [":niwotalan"] = "锁定技，你于摸牌阶段外获得的牌不计入使用次数和手牌上限。",
  ["niwoyuhe"] = "逾壑",
  [":niwoyuhe"] = "每轮每种牌名限一次，当你需要使用一张基本牌时，你可以展示两位相邻座次角色的各一张牌，若这两张牌颜色相同，视为你使用之，若这两张牌类别相同，你获得之。",
  ["$niwotalan1"] = "踏浪而行，澜起四方。",
  ["$niwotalan2"] = "澜涛之上，如履平地。",
  ["$niwoyuhe1"] = "壑深千尺，一跃而过。",
  ["$niwoyuhe2"] = "逾越山壑，志在必得。",

  -- 逆文钦
  ["niwo__wenqin"] = "逆文钦",
  ["#niwo__wenqin"] = "虓殛者",
  ["~niwo__wenqin"] = "忖断沉沧，皆成虚妄……",
  ["designer:niwo__wenqin"] = "公冶天纵",
  ["illustrator:niwo__wenqin"] = "佚名",
  ["cv:niwo__wenqin"] = "暂无",
  ["niwocunduan"] = "忖断",
  [":niwocunduan"] = "当你需要使用或打出一张基本牌时，若当前回合角色与你有相同的空置副装备栏/空置副装备栏，你可以将一张对应空置装备牌置入之/择其中一个弃置之视为使用或打出之，此牌不计入使用次数。",
  ["niwoqiangge"] = "戗戈",
  [":niwoqiangge"] = "当你受到或造成伤害后，你可以选择一项：①弃置对方装备区里与你对应副装备栏相同的一张牌；②随机获得牌堆里的一张装备牌或【折戟】【女装】【驽马】中的一张。",
  ["$niwocunduan1"] = "忖度断绝，自有主张。",
  ["$niwocunduan2"] = "断而后立，忖而后行。",
  ["$niwoqiangge1"] = "戗然交戈，势不两立。",
  ["$niwoqiangge2"] = "戈矛相向，谁主沉浮。",

  -- 逆贾诩
  ["niwo__jiaxu"] = "逆贾诩",
  ["#niwo__jiaxu"] = "苍祭者",
  ["~niwo__jiaxu"] = "疏渡沉沧，算尽天下……",
  ["designer:niwo__jiaxu"] = "公冶天纵",
  ["illustrator:niwo__jiaxu"] = "佚名",
  ["cv:niwo__jiaxu"] = "暂无",
  ["niwoshudu"] = "疏渡",
  [":niwoshudu"] = "锁定技，当你成为其他角色伤害牌的目标后/当你使用伤害牌指定其他角色后，你与其/其与你距离永久+1。若此时你不在任何角色攻击范围内，你获得“苍祭”和“仇戮”。",
  ["niwochencang"] = "沉沧",
  [":niwochencang"] = "每回合限一次，你可以选择任意名角色，视为使用一张以其为合法目标或打出一张响应其使用的牌的基本牌或普通锦囊牌，然后其与你/你与其的距离-1。",
    ["niwocangji"] = "苍祭",
  [":niwocangji"] = "限定技，出牌阶段，你可以令所有攻击范围内不包含你的其他角色进行一次不可更改结果的判定，根据牌面信息：造成牌名字数点基本牌/锦囊牌/装备牌|雷/火/冰属性伤害，并删除全场所有带有“距离”描述的技能，然后你修改“沉沧”，获得“仇戮”和“帷幕”。",
  ["niwochencangRemake"] = "沉沧",
  [":niwochencangRemake"] = "每回合限一次，你可以选择任意名在你攻击范围内的角色，视为使用一张以其为合法目标或打出一张响应其使用的牌的基本牌或普通锦囊牌。",
  ["$niwoshudu1"] = "斑驳石俑皆杰英，曾为谁死、曾为谁生？",
  ["$niwoshudu2"] = "诸君且争渡，我自随潮，怀中抱浮木！",

  ["$niwochencang1"] = "昔有伶者牵丝为戏，今看客已至，诸君更待何？",
  ["$niwochencang2"] = "顽石宣旧章，一朝风云起，千缕丝牵百官肠！",

    ["$niwocangji1"] = "面对死亡吧，这，就是乱世的法则！",
  ["$niwocangji2"] = "你们所有人，都得死！",

    ["$niwochencangRemake1"] = "汉宫生蛛网，丝弦拔朝纲，新殿阶石血未凉。",
  ["$niwochencangRemake2"] = "天下不过一盘残局，我不落子，胜负难分！",



  -- 逆赵娥
  ["niwo__zhaoe"] = "逆赵娥",
  ["#niwo__zhaoe"] = "衅殄者",
  ["~niwo__zhaoe"] = "血梦难醒，旧恨未休……",
  ["designer:niwo__zhaoe"] = "公冶天纵",
  ["illustrator:niwo__zhaoe"] = "佚名",
  ["cv:niwo__zhaoe"] = "暂无",
  ["niwotianmeng"] = "殄梦",
  [":niwotianmeng"] = "出牌阶段限一次，或当你受到伤害后，你可以标记你与一名角色的一张牌为“殁”。你可以将你的一张“殁”当任意单体伤害牌使用或打出。",
  ["niwofuxue"] = "覆血",
  [":niwofuxue"] = "当你即将造成或受到伤害时，你可以失去1点体力并选择一项：1.令此伤害+X，然后你摸2X张牌；2.恢复X点体力值（X为受到伤害角色“殁”的数量）。",
  ["niwochenghen"] = "承痕",
  [":niwochenghen"] = "当其他角色的“殁”因使用或打出进入弃牌堆后，你可以获得之。当你进入濒死状态时，你可以令一名其他角色获得你的一个技能，然后对其依次使用场上的“殁”。",
  ["niwochoulu"] = "仇戮",
  [":niwochoulu"] = "每轮限一次，当与你距离不大于1的角色受到伤害后，若你不为来源，则你可对伤害来源使用一张无距离限制的【杀】，此【杀】无视防具。若此杀造成伤害，立刻中止所有结算结束本回合。",
  ["$niwotianmeng1"] = "殄梦既成，血誓皆空。",
  ["$niwotianmeng2"] = "梦断人离，惟殁可凭。",
  ["$niwofuxue1"] = "血覆旧恨，痛生新机。",
  ["$niwofuxue2"] = "以伤换势，以命博局。",
  ["$niwochenghen1"] = "旧痕未灭，后人承之。",
  ["$niwochenghen2"] = "此恨难销，自有人续。",

}

-- <<< chi__xiahoumao auto generated end
return extension
