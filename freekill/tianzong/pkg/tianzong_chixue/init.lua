local extension = Package:new("tianzong_chixue")
extension.extensionName = "tianzong"

extension:loadSkillSkelsByPath("./packages/tianzong/pkg/tianzong_chixue/skills")

local chi__zhenji = General:new(extension, "chi__zhenji", "wei", 3, 3, General.Female)
chi__zhenji:addSkills { "chijinghong", "chigufu", "chiraoluo" }

local chi__caiwenji = General:new(extension, "chi__caiwenji", "qun", 3, 3, General.Female)
chi__caiwenji:addSkills { "chijuanxiang", "chishuowen", "chidiaoyao" }

local chi__xiahoulingnv = General:new(extension, "chi__xiahoulingnv", "wei", 4, 4, General.Female)
chi__xiahoulingnv:addSkills { "chicangsui", "chihantang" }

local chi__xiahouqingyi = General:new(extension, "chi__xiahouqingyi", "wei", 3, 3, General.Female)
chi__xiahouqingyi:addSkills { "chiqingya", "chiwangchen" }

local chi__xuelingyun = General:new(extension, "chi__xuelingyun", "wei", 3, 3, General.Female)
chi__xuelingyun:addSkills { "chifeimeng", "chidieren", "chixique" }

local chi__pangfengyi = General:new(extension, "chi__pangfengyi", "shu", 3, 3, General.Female)
chi__pangfengyi:addSkills { "chixingjue", "chiyongtang" }

local chi__guozhao = General:new(extension, "chi__guozhao", "wei", 3, 3, General.Female)
chi__guozhao:addSkills { "chixiege", "chishangjiao" }


local chi__zhanghuai = General:new(extension, "chi__zhanghuai", "wu", 1, 1, General.Female)
chi__zhanghuai:addSkills { "chimiling", "chicangsheng", "chikongyao" }

local chi__mifuren = General:new(extension, "chi__mifuren", "shu", 3, 3, General.Female)
chi__mifuren:addSkills { "chifusheng", "chijianian" }

local chi__xiahoumao = General:new(extension, "chi__xiahoumao", "wei", 4, 4)
chi__xiahoumao:addSkills { "chirenfu", "chiyanzu" }


local chi__lukai = General:new(extension, "chi__lukai", "wu", 3, 3, General.Male)
chi__lukai:addSkills { "chijiantu", "chiduye", "chizelie" }

local chi__yangzhong = General:new(extension, "chi__yangzhong", "qun", 4, 4, General.Male)
chi__yangzhong:addSkills { "chidangliao" }

local chi__wangqian = General:new(extension, "chi__wangqian", "jin", 3, 3, General.Female)
chi__wangqian:addSkills { "chizhuoxi", "chixiarong", "chizhongliu" }

local chi__xunxu = General:new(extension, "chi__xunxu", "wei", 3, 3, General.Male)
chi__xunxu:addSkills { "chiyilvRemake", "chifufengRemake", "chixunfu", "chidaojie" }

local chi__luxun = General:new(extension, "chi__luxun", "wu", 3, 3, General.Male)
chi__luxun:addSkills { "chiquege", "chishaoshan", "chimaoqi" }

local chi__zhangchunhua = General:new(extension, "chi__zhangchunhua", "wei", 4, 4, General.Female)
chi__zhangchunhua:addSkills { "chifenqing", "chisuhen", "chiyuanque" }

local chi__zhugeguo = General:new(extension, "chi__zhugeguo", "shu", 3, 3, General.Female)
chi__zhugeguo:addSkills { "chihuangli", "chisusu" }

local chi__huangyueying = General:new(extension, "chi__huangyueying", "shu", 3, 3, General.Female)
chi__huangyueying:addSkills { "chiyingshan", "chishennie" }

local chi__yuji = General:new(extension, "chi__yuji", "qun", 3, 3, General.Male)
chi__yuji:addSkills { "chiliangdao", "chifushui" }

-- 炽胡金定 013
local chi__hujinding = General:new(extension, "chi__hujinding", "shu", 3, 3, General.Female)
chi__hujinding:addSkills { "chiqianmeng", "chihuaiji" }

-- 炽邹氏 014
local chi__zoushi = General:new(extension, "chi__zoushi", "qun", 3, 3, General.Female)
chi__zoushi:addSkills { "chiyinghun", "chiyugu" }

-- 炽朱佩兰 015
local chi__zhupeilan = General:new(extension, "chi__zhupeilan", "wu", 3, 3, General.Female)
chi__zhupeilan:addSkills { "chikuili", "chitiaomu" }

-- 炽董予安 016
local chi__dongguiren = General:new(extension, "chi__dongguiren", "qun", 3, 6, General.Female)
chi__dongguiren:addSkills { "chishanquan", "chisimi" }

local chi__renwan = General:new(extension, "chi__renwan", "wei", 3, 3, General.Female)
chi__renwan:addSkills { "chilingmeng", "chilique" }

local chi__xuncan = General:new(extension, "chi__xuncan", "wei", 3, 3, General.Male)
chi__xuncan:addSkills { "chicigu", "chiyouming" }

local chi__xuncai = General:new(extension, "chi__xuncai", "qun", 3, 3, General.Female)
chi__xuncai:addSkills { "chijulei", "chizhichen" }

local chi__wanglun = General:new(extension, "chi__wanglun", "wei", 3, 3, General.Male)
chi__wanglun:addSkills { "chitianshi", "chiminghuai" }

local chi__wangshen = General:new(extension, "chi__wangshen", "jin", 3, 3, General.Male)
chi__wangshen:addSkills { "chitiaofeng", "chijiwang" }

local chi__xiahoujie = General:new(extension, "chi__xiahoujie", "wei", 4, 4, General.Male)
chi__xiahoujie:addSkills { "chiyushe", "chidangdan" }

local chi__xunyue = General:new(extension, "chi__xunyue", "wei", 3, 3, General.Male)
chi__xunyue:addSkills { "chijieji", "chishuji" }

local chi__xiahoudun = General:new(extension, "chi__xiahoudun", "wei", 4, 4, General.Male)
chi__xiahoudun:addSkills { "chiliaozhi", "chizhenjie" }

local chi__xiahouxuan = General:new(extension, "chi__xiahouxuan", "wei", 3, 3, General.Male)
chi__xiahouxuan:addSkills { "chicixuan", "chiqihai" }

local chi__xiahourong = General:new(extension, "chi__xiahourong", "wei", 3, 3, General.Female)
chi__xiahourong:addSkills { "chidulie", "chijiaotan" }

local chi__xiahoushi = General:new(extension, "chi__xiahoushi", "shu", 3, 3, General.Female)
chi__xiahoushi:addSkills { "chixinmai", "chiyusui" }

local chi__xiahouhui = General:new(extension, "chi__xiahouhui", "jin", 3, 3, General.Female)
chi__xiahouhui:addSkills { "chifeishi", "chifeichen" }

Fk:loadTranslationTable{
  ["chi"] = "炽血青魂",
    ["chixue"] = "炽血青魂",
  ["niwo"] = "逆涡之流",
  ["tianzong_chixue"] = "炽血青魂",
  ["tianzong_niwo"] = "逆涡之流",
  ["tianzong"] = "天纵崇壑",

  ["chi__zhenji"] = "甄宓",
  ["#chi__zhenji"] = "薄尘几粟",
  ["~chi__zhenji"] = "戚雨凋落尽，红芍怨西风。",
  ["designer:chi__zhenji"] = "公冶天纵",
  ["illustrator:chi__zhenji"] = "木美人",
  ["cv:chi__zhenji"] = "暂无",
  ["chijinghong"] = "惊鸿",
  [":chijinghong"] = "当你需要视为使用或打出一张基本牌时，你可以展示当前回合角色的一张牌并将之置于牌堆顶或牌堆底，视为使用或打出一张基本牌，然后移除此牌名。当你的蓄谋牌有已移除牌名时，恢复之。",
  ["chigufu"] = "孤凫",
  [":chigufu"] = "出牌阶段限一次，你可以重铸任意张牌（至多“惊鸿”未移除牌名张），然后蓄谋牌堆顶或牌堆底的等量张牌。",
  ["chiraoluo"] = "扰洛",
  [":chiraoluo"] = "当你受到伤害后，或当你使用或打出牌响应其他牌后，你可以弃置一名角色区域内的一张牌，令其选择一项：①发动一次“孤凫”；②使用一张手牌或蓄谋牌；背水：依次执行前两项，然后其翻面。",
  ["@$chijinghong"] = "惊鸿已移除",
  ["#chijinghong"] = "惊鸿：展示当前回合角色区域内的一张牌并将之置于牌堆顶或牌堆底，视为使用或打出一张基本牌",
  ["#chijinghong-choose"] = "惊鸿：选择当前回合角色区域内的一张牌",
  ["chijinghong_top"] = "置于牌堆顶",
  ["chijinghong_bottom"] = "置于牌堆底",
  ["#chigufu"] = "孤凫：出牌阶段限一次，选择至多X张牌重铸，然后选择从牌堆顶或牌堆底蓄谋等量牌",
  ["Top"] = "牌堆顶",
  ["Bottom"] = "牌堆底",
  ["#chiraoluo-choose"] = "扰洛：请选择一名角色",
  ["#chiraoluo-choice"] = "扰洛：请选择一项",
  ["chiraoluo_opt1"] = "发动一次“孤凫”",
  ["chiraoluo_opt2"] = "使用一张手牌或蓄谋牌",
  ["chiraoluo_opt3"] = "背水：依次执行前两项，然后翻面",
  ["#chiraoluo-use-choice"] = "扰洛：请选择使用手牌或蓄谋牌",
  ["$chijinghong1"] = "皎若金乌之霞，灿若芙蕖之渌。",
  ["$chijinghong2"] = "秋菊容曜，春松华茂，四时之灵也。",
  ["$chijinghong3"] = "青山皆绿，远山可见一白者，向暮之梨花尔。",
  ["$chijinghong4"] = "野陌离人空自守，杏雨梧桐晚箫声。",
  ["$chigufu1"] = "桑榆立野陌，春风所不渡，谓夕霞之未晚。",
  ["$chigufu2"] = "一帘诗意千寻瀑，今夕人间四月天。",
  ["$chigufu3"] = "桑榆立野陌，春风所不渡，谓夕霞之未晚。",
  ["$chigufu4"] = "一帘诗意千寻瀑，今夕人间四月天。",
    ["$chiraoluo1"] = "佳人撷绛玫，君子所逑者，容颜易消尔。",
  ["$chiraoluo2"] = "洛灵有感，竦轻躯以鹤立，若将飞而未翔。",
  ["$chiraoluo3"] = "戴群星之璀桑，妆百花之盛颜，可为悦已者容。",
  ["$chiraoluo4"] = "撷首阳之野芳，缀沧海之鲛珠，独善此世之白。",

  ["chi__caiwenji"] = "蔡琰",
  ["#chi__caiwenji"] = "罔漠不归汉",
  ["~chi__caiwenji"] = "鸿雁南归，而我归乡何年？",
  ["designer:chi__caiwenji"] = "公冶天纵",
  ["illustrator:chi__caiwenji"] = "佚名",
  ["cv:chi__caiwenji"] = "暂无",

  ["chijuanxiang"] = "眷乡",
  [":chijuanxiang"] = "当你的手牌数不因此技能而变化后，若与你本回合使用过的牌名数相等，你重置<b>“朔闻”</b>并选择一项：1.摸X张牌，然后可以将X张牌置于牌堆底；2.获得牌堆底的X张牌，然后可以将X张牌置于牌堆顶（X为本回合“朔闻”发动次数+1）。",

  ["chishuowen"] = "朔闻",
  [":chishuowen"] = "转换技，每回合限一次，当你需要使用或打出一张基本牌或普通锦囊牌时，你可以观看：阳，牌堆顶的一张牌；阴，牌堆底的一张牌；并将之当做一张牌名字数相同且本轮未以此法使用或打出过的牌使用或打出之。",

  ["chidiaoyao"] = "窎窅",
  [":chidiaoyao"] = "锁定技，牌堆顶和牌堆底的X张牌始终对你可见（X为本回合“朔闻”发动次数+1）。",

  ["#chijuanxiang-invoke"] = "眷乡：你可以重置【朔闻】并执行一项",
  ["chijuanxiang_draw"] = "摸X张牌，然后将X张牌置于牌堆底",
  ["chijuanxiang_gain"] = "获得牌堆底的X张牌，然后将X张牌置于牌堆顶",

  ["#chishuowen"] = "朔闻：你可以将牌堆顶/底的一张牌当作同字数的基本牌或普通锦囊牌使用或打出",
  ["@[chidiaoyao_top]"] = "窎窅·顶",
  ["@[chidiaoyao_bottom]"] = "窎窅·底",
  ["@[chishuowen_yang]"] = "朔闻·阳",
  ["@[chishuowen_yin]"] = "朔闻·阴",
  ["@chishuowen-turn"] = "朔闻次数",
  ["chijuanxiang_names-turn"] = "眷乡牌名记录",
  ["chishuowen-round"] = "朔闻轮次记录",
  ["$chijuanxiang1"] = "暮云深锁归乡路，南不见长安，唯叹笳声肃。",
  ["$chijuanxiang2"] = "昔年行兰舟，芦花妆橹，今遗霜泪染胡笳。",
  ["$chijuanxiang3"] = "独立斜阳，胡笳如诉，不知归乡何处。",
  ["$chijuanxiang4"] = "此心已绝胡尘里，万般愁绪泣胡笳。",
  ["$chijuanxiang5"] = "孤悬疆野，此去经年、未闻汉声。",
  ["$chijuanxiang6"] = "塞外春风萧瑟起，遥望长安忘归期。",
  ["$chishuowen1"] = "残霞照大漠，风萧萧、雪蒙蒙，离人萧瑟。",
  ["$chishuowen2"] = "胡笳吹折柳，可怜万里飞鸿，生不入玉门。",
  ["$chishuowen3"] = "柔肠寸断西风路，离愁渐远渐无穷。",
  ["$chishuowen4"] = "夜深风罡裂衾帐，寒我身上十层衣。",
  ["$chishuowen5"] = "十万青丝凋落尽，独吹边曲向残阳。",
  ["$chishuowen6"] = "残雪碎珠玉，望断南归路，不知春在谁家。",
  

  ["@@chiraoluo_judge_used-turn"] = "扰洛判定",
  ["chiraoluo_pending_judge-turn"] = "扰洛待判定",
  ["#chiraoluo-discard-hand"] = "扰洛：请弃置一张手牌",
  ["#chiraoluo-discard-equip"] = "扰洛：请弃置一张装备区的牌",
  ["#chiraoluo-discard-judge"] = "扰洛：请弃置一张判定区的牌",
  ["chiraoluo_opt1"] = "发动一次【孤凫】",
  ["chiraoluo_opt2"] = "使用一张手牌或蓄谋牌",

  ["chiraoluo_opt1"] = "发动一次【孤凫】",

  ["@@chiraoluo_judge-turn"] = "扰洛判定",
  ["chiraoluo_opt2"] = "使用一张手牌或蓄谋牌",

  ["#chishuowen-yang"] = "朔闻（阳）：当前观看牌堆顶的%arg，你可以将之当作同字数的基本牌或普通锦囊牌使用或打出",
  ["#chishuowen-yin"] = "朔闻（阴）：当前观看牌堆底的%arg，你可以将之当作同字数的基本牌或普通锦囊牌使用或打出",
  ["chishuowen_count-turn"] = "朔闻次数记录",

  ["@$chijuanxiang_names-turn"] = "眷乡牌名",
  ["chijuanxiang_block-turn"] = "眷乡阻断",

  ["chi__xiahoulingnv"] = "夏侯令女",
  ["#chi__xiahoulingnv"] = "寒梦透骨",
  ["~chi__xiahoulingnv"] = "父亲无须多言，女儿宁死不从！",
  ["designer:chi__xiahoulingnv"] = "公冶天纵",
  ["illustrator:chi__xiahoulingnv"] = "佚名",
  ["cv:chi__xiahoulingnv"] = "暂无",
  ["chicangsui"] = "沧遂",
  [":chicangsui"] = "每回合限一次，你可以废除一个装备栏并选择一项：①视为使用或打出一张牌名字数为X的牌；②摸X张牌。若没有符合条件的牌，你不能选择①（X为你已废除装备栏数量且至少为1，下同）。",
  ["chihantang"] = "寒塘",
  [":chihantang"] = "出牌阶段限一次，或当你于回合内首次造成或受到伤害后，你可以选择一项：①弃置牌名字数之和为X的任意张牌，对一名角色造成1点伤害；若该角色本轮受到你造成的伤害/为你，你恢复一个装备栏/摸X张牌。②摸X张牌并重置【沧遂】。",
  ["#chicangsui"] = "沧遂：废除一个装备栏，视为使用或打出一张牌名字数为X的牌",
  ["#chicangsui-mode"] = "沧遂：请选择视为使用牌或摸%arg张牌",
  ["#chicangsui-use"] = "沧遂：请视为使用一张牌名字数为%arg的牌",
  ["chicangsui_use_choice"] = "视为使用或打出一张牌",
  ["chicangsui_draw_choice"] = "摸X张牌",
  ["#chicangsui-draw"] = "沧遂：废除一个装备栏并摸%arg张牌",
  ["#chicangsui-status"] = "沧遂：废除装备栏后X为%arg，%arg2",
  ["chicangsui_available"] = "有可以使用或打出的牌",
  ["chicangsui_unavailable"] = "无可以使用或打出的牌，只能摸X张牌",
  ["#$chicangsui-choice"] = "沧遂：选择要废除的装备栏",
  ["#chihantang"] = "寒塘：你可以发动【寒塘】",
  ["chihantang_opt1"] = "弃置牌名字数之和为X的牌，对一名角色造成1点伤害",
  ["chihantang_opt2"] = "摸X张牌并重置【沧遂】",
  ["#chihantang-discard"] = "寒塘：弃置牌名字数之和恰好为 %arg 的任意张牌",
  ["#chihantang-target"] = "寒塘：选择一名角色造成1点伤害",
  ["$chicangsui1"] = "盛衰等朝露，世道若浮萍。",
  ["$chicangsui2"] = "滚滚江水东流去，别有孤萍朝夕浮。",
  ["$chihantang1"] = "匪石心难转，如山诺竟酬。",
  ["$chihantang2"] = "去后故人双别泪，春深逐客一浮萍。",

  ["chi__xiahouqingyi"] = "夏侯轻衣",
  ["#chi__xiahouqingyi"] = "危崖寄君",
  ["~chi__xiahouqingyi"] = "桥畔霜重，尘梦成空……",
  ["designer:chi__xiahouqingyi"] = "公冶天纵",
  ["illustrator:chi__xiahouqingyi"] = "佚名",
  ["cv:chi__xiahouqingyi"] = "暂无",
  ["chiqingya"] = "罄崖",
  [":chiqingya"] = "每回合限一次，当你成为伤害类卡牌的目标后，或当你使用伤害类卡牌时，你可以与来源或其中一名目标角色延时拼点，此牌结算后揭示。若此牌造成伤害，拼点没赢的角色连接其所有点数大于其拼点牌点数的手牌；若未造成伤害，拼点败者对胜者使用其拼点牌（须合法）。",
  ["chiwangchen"] = "望尘",
  [":chiwangchen"] = "当你拼点时，你可以使用弃牌堆顶的牌进行拼点；当有连接牌因弃置而进入弃牌堆后，你可以获得之；你的连接牌点数大于/小于6的始终为K/A。",
  ["#chiqingya-target"] = "罄崖：选择一名目标角色进行延时拼点",
  ["#chiqingya-invoke"] = "罄崖：是否与 %dest 延时拼点？",
  ["#chiwangchen-invoke"] = "望尘：是否使用弃牌堆顶牌进行拼点？",
  ["@$chiwangchen-round"] = "望尘",
  ["$chiqingya1"] = "绝壁回声，尽诉锋芒。",
  ["$chiqingya2"] = "罄崖一啸，风雪皆停。",
  ["$chiwangchen1"] = "望尘逐影，意在先机。",
  ["$chiwangchen2"] = "轻衣临风，望尽来尘。",

  ["chi__xuelingyun"] = "薛灵芸",
  ["#chi__xuelingyun"] = "思闺默泣",
  ["~chi__xuelingyun"] = "绯梦易散,伊人难留……",
  ["designer:chi__xuelingyun"] = "公冶天纵",
  ["illustrator:chi__xuelingyun"] = "佚名",
  ["cv:chi__xuelingyun"] = "暂无",
  ["chifeimeng"] = "绯梦",
  [":chifeimeng"] = "每回合限一次，当你造成伤害后或受到伤害后，你可以选择一项：①随机获得对方区域内一张与此牌牌名字数相同的牌（若无则改为牌堆）；②亮出牌堆底起第一张红色牌，若此牌可使用则你使用之并重复此流程，否则你将其置于牌堆顶。",
  ["chidieren"] = "叠纴",
  [":chidieren"] = "每种牌名每轮限一次，你可以将任意张牌当作一张牌名字数等于其之和的基本牌或普通锦囊牌使用或打出。",
  ["#chifeimeng"] = "绯梦：你可以发动绯梦",
  ["chi_feimeng_opt1"] = "随机获得一张同字数的牌",
  ["chi_feimeng_opt2"] = "亮出牌堆底起第一张红色牌并尝试连续使用",
  ["#chidieren"] = "叠纴：你可以将任意张牌当作一张字数等于其之和的基本牌或普通锦囊牌使用或打出",
  ["#chidieren_active"] = "叠纴：弃置一张牌，并依次视为使用任意张字数之和等于X的牌",
  ["#chi_dieren_discard"] = "叠纴：弃置一张牌名字数为X的牌",
  ["#chi_dieren_choose"] = "叠纴：继续选择要视为使用的牌名（当前剩余字数：%arg）",
  ["$chi_feimeng1"] = "绯梦乍醒,伊人如幻。",
  ["$chi_feimeng2"] = "一梦成绮，半生成殇。",
  ["$chi_dieren1"] = "裁锦叠纴，尽入心机。",
  ["$chi_dieren2"] = "丝缕交叠，可织千端。",

  ["chidieren_active"] = "叠纴",
  [":chidieren_active"] = "出牌阶段，你可以弃置一张牌名字数为X的牌，并依次选择任意张牌名字数之和为X的基本牌或普通锦囊牌，依次视为使用之且不计入次数。",
  ["#chidieren_active"] = "叠纴：弃置一张牌，并依次视为使用总字数等于X的牌",

  ["chidieren&"] = "叠纴",
  [":chidieren&"] = "出牌阶段，你可以弃置一张牌名字数为X的牌，并依次选择任意张牌名字数之和为X的基本牌或普通锦囊牌，依次视为使用之且不计入次数。",
  ["#chi_dieren_choose"] = "叠纴：选择要视为使用的牌名（当前剩余字数：%arg）",
  ["#chi_dieren_target"] = "叠纴：为 %arg 选择目标",

  ["chixique"] = "析阙",
  [":chixique"] = "出牌阶段限一次，你可以弃置一张牌，视为依次使用任意张牌名字数之和为其的基本牌或普通锦囊牌（不计入次数）。",
  ["#chixique"] = "析阙：弃置一张牌，并依次视为使用总字数等于X的牌",
  ["#chi_xique_choose"] = "析阙：选择要视为使用的牌名（当前剩余字数：%arg）",
  ["#chi_xique_target"] = "析阙：为 %arg 选择目标",

  ["chidieren-round"] = "叠纴轮次记录",

  ["@$chidieren-round"] = "叠纴",


  
  ["chi__guozhao"] = "郭照",
  ["#chi__guozhao"] = "众星拥后",
  ["~chi__guozhao"] = "红袖揾烟雨，泪尽垂青花。",
  ["designer:chi__guozhao"] = "公冶天纵",
  ["illustrator:chi__guozhao"] = "佚名",
  ["cv:chi__guozhao"] = "暂无",
  ["chixiege"] = "携阁",
  [":chixiege"] = "每轮开始时，你可以选择一名角色，令其与上家：①出牌阶段使用【杀】次数为[1]；②摸牌阶段摸牌数为[1]；③受到或造成伤害后摸[1]张牌。当【携阁】目标使用伤害类卡牌指定目标后，或成为伤害类卡牌的目标后，你可以令任一括号内数值于本轮内+1。",
  ["chishangjiao"] = "尚椒",
  [":chishangjiao"] = "锁定技，①当你每回合首次成为一张牌名字数小于/大于当前回合角色体力值的牌的目标后，所有目标摸/弃差值张牌。②你于摸牌阶段外获得的牌不计入本轮手牌上限。",
  ["#chixiege-choose"] = "携阁：选择一名角色，其与上家本轮获得数值效果",
  ["#chixiege-plus"] = "携阁：你可以令一项数值+1",
  ["chixiege_slash"] = "【杀】次数上限",
  ["chixiege_draw"] = "摸牌阶段摸牌数",
  ["chixiege_damage"] = "造成或受到伤害后摸牌数",
  ["@chixiege_slash-round"] = "携阁杀数",
  ["@chixiege_draw-round"] = "携阁摸牌",
  ["@chixiege_damage-round"] = "携阁伤摸",
  ["$chixiege1"] = "细雨春风缀石桥，素胚青瓷嫁桃花。",
  ["$chixiege2"] = "桂子三秋叠清嘉，惠风十里尽烟霞。",
    ["$chixiege3"] = "承君恩露于椒房，得君恩宠于万世。",
  ["$chixiege4"] = "妾蒲柳之姿，幸蒙君恩方化从龙之凤。",
  ["$chishangjiao1"] = "小楫行舟慕胧色，烟雨独钟我一人。",
  ["$chishangjiao2"] = "挽指玉瓶绘淡彩，一眸春水映江南。",

  ["$chishangjiao3"] = "后宫有佳丽三千，然陛下独宠我一人。",
  ["$chishangjiao4"] = "尊位椒房、垂立九五，君之恩也、妾之幸也。",

  ["chi__zhanghuai"] = "张怀",
  ["#chi__zhanghuai"] = "空谷之麋",
  ["~chi__zhanghuai"] = "你我皆为浮萍，命不由己。",
  ["designer:chi__zhanghuai"] = "公冶天纵",
  ["illustrator:chi__zhanghuai"] = "佚名",
  ["cv:chi__zhanghuai"] = "暂无",
  ["chikonglan"] = "空阑",
  [":chikonglan"] = "锁定技，你的黑桃牌与点数小于场上人数的牌不计入本轮手牌上限；当你成为一张牌的目标后，若此牌牌名字数你本轮未以此法记录过，你记录之并获得相同张【影】，轮次刷新后你清除记录。",
  ["chixuanzhao"] = "悬照",
  [":chixuanzhao"] = "转换技，每轮每种牌名限一次，你可以将X张【影】当一张：①牌名字数；②合法目标数：为X的基本牌或普通锦囊牌使用或打出。",
  ["@$chikonglan-round"] = "空阑·已触发数字",
  ["#chikonglan-record"] = "空阑：你记录了字数 %arg 并获得 %arg2 张【影】",
  ["#chixuanzhao"] = "悬照：将X张【影】当牌使用或打出",
  ["$chikonglan1"] = "空阑影寂，独照寒心。",
  ["$chikonglan2"] = "阑外风定，影里藏机。",
  ["$chixuanzhao1"] = "悬光映影，照彻百端。",
  ["$chixuanzhao2"] = "照形观势，影中有机。",

  ["chimiling"] = "麋灵",
  ["@&chimiling"] = "麋",
  ["@[chimiling]chimiling"] = "麋",
  [":chimiling"] = "<b>锁定技，</b>当你成为一张牌的目标后，若此牌牌名字数你未以此法记录过，你记录之并将等量张武将牌置于你的武将牌上，称为“麋”；每轮开始时，你清除所有记录和“麋”。",
  ["#chimiling_log"] = "%from 发动【麋灵】，获得了%arg张“麋”",
  ["$chimiling1"] = "鹿鸣呦呦，莺戏疃瞳，云中锦字欠西风。",
  ["$chimiling2"] = "兰舟破烟波，鹿涉沙洲扯裙罗。",

  -- 苍生
  ["chicangsheng"] = "苍生",
  [":chicangsheng"] = "<b>转换技，</b>你可以弃置X张“麋”视为使用或打出一张：①（阳）牌名字数为X的基本牌或普通锦囊牌；②（阴）合法目标数为X的基本牌或普通锦囊牌。",
  ["#chicangsheng-yang"] = "苍生-阳：弃置等同于【牌名字数】的“麋”，视为使用/打出此牌",
  ["#chicangsheng-yin"] = "苍生-阴：弃置等同于【目标数量】的“麋”，视为使用/打出此牌",
  ["#chicangsheng-discard"] = "苍生：请选择弃置一张“麋”（剩余 %arg 张）",
  ["$chicangsheng1"] = "眼底无限恨，爱而不得，有情难相守。",
  ["$chicangsheng2"] = "愿化清风伴君侧，奈何独留长夜寄相思。",

  -- 空杳
  ["chikongyao"] = "空杳",
  [":chikongyao"] = "<b>锁定技，</b>当你即将受到伤害时，若你有与伤害来源势力相同的“麋”，你弃置之并防止此伤害。",
  ["#chikongyao-discard"] = "空杳：请选择一张与 %dest 势力相同的“麋”弃置，以防止此伤害",
  ["$chikongyao1"] = "残雨打芭蕉，妆台月在，再无对镜人。",
  ["$chikongyao2"] = "此生有缘无分，怪只怪，造化弄人。",

  
  ["chikonglan_nums-round"] = "空阑数字记录",
  ["chikonglan_names-round"] = "空阑牌名记录",

  ["@chikonglan"] = "空阑",

  
  ["@[chixuanzhao]"] = "悬照",
  ["chixuanzhao_used-round"] = "悬照隐藏记录",

  ["@$chixuanzhao-round"] = "悬照",

  ["@[niwoshucai]"] = "殊彩",

  ["@@chishangjiao_round"] = "尚椒",
  ["@@chixingjue_xu"] = "醑",

  ["@@chiraoluo_judge"] = "扰洛判定",
  ["@@chiraoluo_judge_used-turn"] = "扰洛判定限制",

  ["@@chiraoluo_judge"] = "扰洛",
  ["chiraoluo_opt2"] = "使用一张手牌或蓄谋牌",

  ["@@chikonglan_round"] = "空阑",
  ["chikonglan_shadow-round"] = "空阑影记录",

  
  ["@[chimingzhi]"] = "酩志",
  ["@[chiyongtang]"] = "雍赯",
  ["chimingzhi_suits-turn"] = "酩志隐藏记录",
  ["chiyongtang_suits-turn"] = "雍赯隐藏记录",

  ["chi__mifuren"] = "糜贞",
  ["#chi__mifuren"] = "乱世洄临",
  ["~chi__mifuren"] = "一跃清波尽，竟无归处……",
  ["designer:chi__mifuren"] = "公冶天纵",
  ["illustrator:chi__mifuren"] = "佚名",
  ["cv:chi__mifuren"] = "暂无",
  ["chizhijian"] = "炙间",
  [":chizhijian"] = "锁定技，准备阶段或当你受到伤害后，你随机交换下面两项：①已废除装备栏；②未废除装备栏；③体力上限；④额定攻击次数；⑤体力值；⑥手牌数（不能是本回合选择过的，若均已选择过则不触发）。",
  ["chilindu"] = "临渡",
  [":chilindu"] = "使命技，当你响应一张牌后，你修改“炙间”一项描述。<br>成功：当“炙间”均修改完成后，你将体力恢复至体力上限，然后获得“谲忆”，并将其他所有角色非手牌区的所有牌替换为【毒】。",
  ["chijueyi"] = "谲忆",
  [":chijueyi"] = "当你需要使用或打出一张基本牌或普通锦囊牌时，你可以发动一次【炙间】，视为使用或打出一张牌名字数等于本次交换两项当前数值之和的牌。",
  ["@chizhijian"] = "炙间",
  ["#chizhijian-choose"] = "炙间：选择要交换的两项",
  ["#chizhijian-viewas"] = "炙间：你可以发动一次炙间视为使用或打出一张牌",
  ["chizhijian_1"] = "已废除装备栏",
  ["chizhijian_2"] = "未废除装备栏",
  ["chizhijian_3"] = "体力上限",
  ["chizhijian_4"] = "额定攻击次数",
  ["chizhijian_5"] = "体力值",
  ["chizhijian_6"] = "手牌数",
  ["$chilindu_success"] = "渡尽前尘，此心方成。",
  ["$chizhijian1"] = "炙焰流转，祸福倒悬。",
  ["$chizhijian2"] = "一间之隔，生死互易。",
  ["$chilindu1"] = "临流待渡，前缘难断。",
  ["$chilindu2"] = "既临此渡，当绝往生。",
  ["$chijueyi1"] = "旧忆纷错，皆成谲谋。",
  ["$chijueyi2"] = "谲辞杂忆，可乱真伪。",

  [":chizhijian"] = "锁定技，准备阶段，你随机交换下面两项：①已废除装备栏；②未废除装备栏；③体力上限；④额定攻击次数（出牌阶段使用【杀】次数）。",
  ["chizhijian2"] = "炙间",
  [":chizhijian2"] = "锁定技，准备阶段，你随机交换下面两项：①已废除装备栏；②未废除装备栏；③体力上限；④额定攻击次数（出牌阶段使用【杀】次数）；⑤体力值；⑥手牌数。",
  ["chizhijian3"] = "炙间",
  [":chizhijian3"] = "锁定技，准备阶段或当你受到伤害后，你随机交换下面两项：①已废除装备栏；②未废除装备栏；③体力上限；④额定攻击次数（出牌阶段使用【杀】次数）；⑤体力值；⑥手牌数。（不能是本轮选择过的，若均已选择过则不触发）",
  ["chizhijian4"] = "炙间",
  [":chizhijian4"] = "准备阶段或当你受到伤害后，你可以交换下面两项：①已废除装备栏；②未废除装备栏；③体力上限；④额定攻击次数（出牌阶段使用【杀】次数）；⑤体力值；⑥手牌数（不能是本回合选择过的，若均已选择过则不触发）",
  [":chijueyi"] = "当你需要使用或打出一张基本牌或普通锦囊牌时，你可以发动一次“炙间”视为使用之。",
  ["#chizhijian-viewas"] = "谲忆：你可以发动一次炙间，视为使用或打出一张牌",

  ["@chizhijian_swap"] = "炙间交换",
  
            
  ["chifusheng"] = "浮生",
  [":chifusheng"] = "准备阶段或当你受到伤害后，你可以交换下面两项数值并于本轮移除之：①已废除装备栏；②未废除装备栏；③体力上限；④出牌阶段使用杀次数；⑤手牌数；⑥体力值。",
  ["#chifusheng-invoke"] = "浮生：你可以交换两项尚未移除的数值，并将其于本轮移除",
  ["#chifusheng-pair"] = "浮生：选择要交换的两项数值",
  ["#chifusheng-discard"] = "浮生：请弃置%arg张手牌，将手牌数调整为交换后的数值",
  ["chifusheng_pair12"] = "已废除装备栏 ↔ 未废除装备栏",
  ["chifusheng_pair13"] = "已废除装备栏 ↔ 体力上限",
  ["chifusheng_pair14"] = "已废除装备栏 ↔ 出牌阶段使用【杀】次数",
  ["chifusheng_pair15"] = "已废除装备栏 ↔ 手牌数",
  ["chifusheng_pair16"] = "已废除装备栏 ↔ 体力值",
  ["chifusheng_pair23"] = "未废除装备栏 ↔ 体力上限",
  ["chifusheng_pair24"] = "未废除装备栏 ↔ 出牌阶段使用【杀】次数",
  ["chifusheng_pair25"] = "未废除装备栏 ↔ 手牌数",
  ["chifusheng_pair26"] = "未废除装备栏 ↔ 体力值",
  ["chifusheng_pair34"] = "体力上限 ↔ 出牌阶段使用【杀】次数",
  ["chifusheng_pair35"] = "体力上限 ↔ 手牌数",
  ["chifusheng_pair36"] = "体力上限 ↔ 体力值",
  ["chifusheng_pair45"] = "出牌阶段使用【杀】次数 ↔ 手牌数",
  ["chifusheng_pair46"] = "出牌阶段使用【杀】次数 ↔ 体力值",
  ["chifusheng_pair56"] = "手牌数 ↔ 体力值",
  ["chifusheng_removed-round"] = "浮生·本轮已移除",
  ["chijianian"] = "佳年",
  [":chijianian"] = "当你需要使用或打出一张基本牌或普通锦囊牌时，你可以发动一次“浮生”视为使用之。若“浮生”已被移除的项中有相等项，你恢复之。",
  ["#chijianian"] = "佳年：选择要视为使用或打出的牌，然后发动一次“浮生”",


  ["chi__mifuren2"] = "糜贞",
  ["#chi__mifuren2"] = "渡尽前尘",
  ["~chi__mifuren2"] = "一跃清波尽，竟无归处……",
  ["designer:chi__mifuren2"] = "公冶天纵",
  ["illustrator:chi__mifuren2"] = "佚名",
  ["cv:chi__mifuren2"] = "暂无",
  
  ["chiyanzu"] = "衍族",
  [":chiyanzu"] = "每回合限一次，当你需要使用或打出一张基本牌或普通锦囊牌时，或当你受到伤害后，你可以使用本回合进入弃牌堆的一张可使用的基本牌或普通锦囊牌。若此牌牌名字数大于场上角色数，你刷新此技能且摸场上角色数张牌。",
  ["#chiyanzu_choose_use"] = "衍族：选择本回合进入弃牌堆的一张可使用或打出的基本牌或普通锦囊牌",
  ["#chiyanzu_choose_damaged"] = "衍族：选择本回合进入弃牌堆的一张基本牌或普通锦囊牌使用",
  ["chi__xiahoumao"] = "夏侯楙",
  ["#chi__xiahoumao"] = "浮华宗子",
  ["~chi__xiahoumao"] = "一将无能，徒累死三军。",
  ["designer:chi__xiahoumao"] = "公冶天纵",
  ["illustrator:chi__xiahoumao"] = "佚名",
  ["cv:chi__xiahoumao"] = "暂无",
  ["chirenfu"] = "荏腹",
  [":chirenfu"] = "锁定技，当你每回合首次使用普通锦囊牌时，你摸已使用基本牌数量张牌。若摸牌数小于2，你受到来自当前回合角色的一点雷属性伤害，且若不为你的回合，你移动你与其一张牌。（无法移动则改为手牌少的获得手牌多的一方一张手牌）。",
  ["chirenfu2"] = "荏腹",
  [":chirenfu2"] = "锁定技，当你每回合首次使用锦囊牌时，你摸本回合已使用基本牌数张牌。若以此法摸牌数小于2，你受到来自当前回合角色的一点雷电伤害然后移动你与其区域内的一张牌。",
  ["chiyanzu2"] = "衍族",
  [":chiyanzu2"] = "每回合限一次，①当你需要使用或打出一张基本牌或普通锦囊牌时；②当你受到伤害后；你可以使用本回合进入弃牌堆的一张合法同名牌。若此牌合法目标数大于场上角色数，你刷新此技能。",
  ["$chirenfu1"] = "集关西诸路大军，必雪当年长坂坡之耻。",
  ["$chirenfu2"] = "手织天网十万尺，欲擒飞龙落彀中。",
  ["$chiyanzu1"] = "身担父命，怎可蜷于宫阙。",
  ["$chiyanzu2"] = "体承国运，岂能缩居朝堂。",


    -- 荀勖
  ["chi__xunxu"] = "荀勖",
  ["#chi__xunxu"] = "调律者",
  ["~chi__xunxu"] = "律法既定，奈何人心难测……",
  ["designer:chi__xunxu"] = "公冶天纵",
  ["illustrator:chi__xunxu"] = "佚名",
  ["cv:chi__xunxu"] = "暂无",
  ["chiyilvRemake"] = "绎律",
  [":chiyilvRemake"] = "锁定技，当你的体力值发生变化时，或一号位的准备阶段开始时，你选择一种颜色并依次展示牌堆顶X张牌。你依次可以使用其中另一种颜色的牌，然后获得其余的牌（X为“徇覆”已记录的锦囊牌牌名数且至少为1）。",
  ["chifufengRemake"] = "扶风",
  [":chifufengRemake"] = "锁定技，当你于一个阶段首次展示一张牌后，你重铸你手牌中另一种颜色的所有牌，然后你将一张牌置于牌堆顶。",
  ["chixunfu"] = "徇覆",
  [":chixunfu"] = "锁定技，当你成为一张本轮未以此法记录过的非装备牌的目标时，来源需展示另一种颜色的一张手牌，否则此牌对你无效，然后你记录此牌牌名。",
  ["chidaojie"] = "蹈节",
  [":chidaojie"] = "锁定技，当你每回合第一次使用非伤害普通锦囊牌结算结束后，你选择一项：1.失去1点体力；2.失去一个锁定技。然后令一名角色获得此牌。",
  ["$chiyilvRemake1"] = "律吕相生，绎而不绝。",
  ["$chiyilvRemake2"] = "音律既正，万象归序。",
  ["$chifufengRemake1"] = "扶风所至，尘埃皆定。",
  ["$chifufengRemake2"] = "风行草偃，自有章法。",
  ["$chixunfu1"] = "徇私覆公，非吾所为。",
  ["$chixunfu2"] = "覆而徇之，法不容情。",
  ["$chidaojie1"] = "道之所诫，不可逾越。",
  ["$chidaojie2"] = "诫而守道，方为正途。",


  -- 炽杨众
  ["chi__yangzhong"] = "杨众",
  ["chi__yangzhong_prefix"] = "炽",
  ["~chi__yangzhong"] = "荡燎已熄，余烬难续……",
  ["designer:chi__yangzhong"] = "公冶天纵",
  ["illustrator:chi__yangzhong"] = "佚名",
  ["cv:chi__yangzhong"] = "暂无",
  ["chidangliao"] = "荡燎",
  [":chidangliao"] = "转换技，阴：当你的红色牌进入弃牌堆后；阳：当你成为红色牌的目标后；你可令当前回合角色依此牌牌名字数与X的大小执行：①大于：其将此牌视为【火攻】/火【杀】使用（装备牌则视为使用）；②小于：其于此回合结束后执行一个等于X的阶段（摸牌/出牌/弃牌）；③等于：背水，然后你翻面。（X为本回合选项执行次数，大于3时重置为1）",
  ["$chidangliao1"] = "荡荡燎原，烈火无边。",
  ["$chidangliao2"] = "燎火荡尽，灰烬重生。",


    -- 炽王倩
  ["chi__wangqian"] = "王倩",
  ["chi__wangqian_prefix"] = "炽",
  ["~chi__wangqian"] = "擢息已止，遐容难留……",
  ["designer:chi__wangqian"] = "公冶天纵",
  ["illustrator:chi__wangqian"] = "佚名",
  ["cv:chi__wangqian"] = "暂无",
  ["chizhuoxi"] = "擢息",
  [":chizhuoxi"] = "限定技，锁定技，转换技，当你距离不大于1的角色使用基本牌和普通锦囊牌时，若此牌为：阴：实体牌；阳：转化牌；你获得该牌并重置武将牌。",
    ["chizhongliu"] = "中流",
  [":chizhongliu"] = "锁定技，当你使用牌时，若此牌不为你的手牌，你武将牌上的技能视为未发动过。",
 
  ["chixiarong"] = "遐容",
  [":chixiarong"] = "限定技，当你需要使用或打出一张牌名字数本轮未以此法重复且为X的牌时，你可以翻面并观看与你距离不小于X的一名其他角色的手牌，将你们任意张牌名字数之和等于X的牌转化为之，然后本轮该角色/其他角色与你的距离-X/+X。",
  ["$chizhuoxi1"] = "擢而息之，得其所哉。",
  ["$chizhuoxi2"] = "息而擢之，静中有动。",
  ["$chixiarong1"] = "遐容远望，自有风仪。",
  ["$chixiarong2"] = "容止可观，遐迩皆知。",
  ["$chizhongliu1"] = "中流击水，浪遏飞舟。",
  ["$chizhongliu2"] = "砥柱中流，岿然不动。",

  -- 胡金定
  ["chi__hujinding"] = "胡金定",
  ["#chi__hujinding"] = "赤子眷天涯",
  ["~chi__hujinding"] = "望君归，妄君归，忘君归。",
  ["designer:chi__hujinding"] = "公冶天纵",
  ["illustrator:chi__hujinding"] = "佚名",
  ["cv:chi__hujinding"] = "暂无",
  ["chiqianmeng"] = "遣梦",
  [":chiqianmeng"] = "你可以失去任意点体力上限当作一张牌名字数相等的基本牌或普通锦囊牌使用或打出。若此牌为基本牌或你此时体力上限等于该牌牌名字数，你增加一点体力上限。",
  ["#chiqianmeng"] = "遣梦：选择一张牌，失去等同于其牌名字数的体力上限并视为使用或打出",
  ["chihuaiji"] = "怀赍",
  [":chihuaiji"] = "转换技，阴：当你使用一张牌后，你可以失去该牌目标数点体力上限为此牌重新指定目标。阳：当你成为一张牌的目标后，你可以增加该牌目标数点体力上限。",
  ["#chihuaiji-yin"] = "怀赍：你可以失去%arg点体力上限，为此牌重新指定目标",
  ["#chihuaiji-reassign"] = "怀赍：请为此牌重新指定合法目标",
  ["#chihuaiji-yang"] = "怀赍：你可以增加%arg点体力上限",
  ["$chiqianmeng1"] = "已忘君去几春秋，门前枣树青转红。",
  ["$chiqianmeng2"] = "有情何须长厮守，愿化明灯照君行。",
  ["$chihuaiji1"] = "蝼蚁尚存偷生之念，况我即为人母？",
  ["$chihuaiji2"] = "妾身腹怀六甲，兰梦赤子何辜？",

  -- 朱佩兰
  ["chi__zhupeilan"] = "朱佩兰",
  ["#chi__zhupeilan"] = "南方有佳人",
  ["~chi__zhupeilan"] = "佳人薄命，红颜丧于虎狼之口。",
  ["designer:chi__zhupeilan"] = "公冶天纵",
  ["illustrator:chi__zhupeilan"] = "佚名",
  ["cv:chi__zhupeilan"] = "暂无",
  ["chikuili"] = "暌离",
  [":chikuili"] = "每回合限一次，当你使用一张基本牌或普通锦囊牌时，若你有与此牌牌名字数或合法目标数相同的牌，你可以选择一项并展示任意张对应的牌：①令此牌额外结算X次；②令此牌额外选择X个目标。若X不大于1，你刷新本技能（X为此牌牌名字数或合法目标数与展示牌张数之差）。",
  ["#chikuili-choice"] = "暌离：选择本次展示牌的条件和效果",
  ["chikuili_effect"] = "展示牌名字数相同的牌，令此牌额外结算",
  ["chikuili_targets"] = "展示合法目标数相同的牌，令此牌额外选择目标",
  ["#chikuili-show"] = "暌离：展示任意张符合所选条件的手牌",
  ["#chikuili-target"] = "暌离：为此牌增加至多%arg个合法目标",
  ["chitiaomu"] = "迢目",
  [":chitiaomu"] = "每回合限一次，当你需要使用或打出一张基本牌或普通锦囊牌时，你可以从弃牌堆随机获得一张牌名字数或合法目标相同的牌视为使用或打出之。若两张牌牌名相同，本技能使用次数+1。",
  ["#chitiaomu"] = "迢目：选择要视为使用或打出的牌，随机获得弃牌堆中符合条件的一张牌",
 ["$chikuili1"] = "妾提不得刀兵、聚不起人马，于汝何害之有？",
  ["$chikuili2"] = "诸公明鉴，我何罪之有？",
  ["$chikuili3"] = "汝做了皇帝，便忘了昔日之恩吗？",
  ["$chikuili4"] = "江南烟雨如泪，沾我青衫，湿我朱颜。",
  ["$chitiaomu1"] = "朝堂多朱紫，诸君何故问计于妇人？",
  ["$chitiaomu2"] = "我所知者，女红之术、书画之艺，难承社稷之重。",
  ["$chitiaomu3"] = "我无大虎食人之心，唯求方寸栖身之地。",
  ["$chitiaomu4"] = "诸公皆国之柱石，居后宫者鄙，不必以事咨我。",

  -- 邹氏
  ["chi__zoushi"] = "邹氏",
  ["#chi__zoushi"] = "靡靡醉乡里",
  ["~chi__zoushi"] = "生逢乱世，身何由己？",
  ["designer:chi__zoushi"] = "公冶天纵",
  ["illustrator:chi__zoushi"] = "佚名",
  ["cv:chi__zoushi"] = "暂无",
  ["chiyinghun"] = "萦魂",
  [":chiyinghun"] = "锁定技，当你使用一张牌后/当你受到伤害后，此牌所有目标翻面/你与伤害来源翻面，且本回合所有武将牌正面朝上角色的非锁定技失效。你与武将牌状态一致角色的距离始终为1。",
  ["@@chiyinghun-turn"] = "萦魂生效中",
  ["chiyugu"] = "毓骨",
  [":chiyugu"] = "转换技，你可以翻面视为使用或打出一张不计入次数的：①牌名字数为X的基本牌或普通锦囊牌；②目标数不大于所有已翻面角色数的基本牌或普通锦囊牌（X为场上翻面的角色数）",
  ["#chiyugu-yang"] = "毓骨（阳）：翻面，视为使用或打出一张牌名字数为X的牌",
  ["#chiyugu-yin"] = "毓骨（阴）：翻面，视为使用或打出一张合法目标数不大于X的牌",
 ["$chiyinghun1"] = "温柔乡里忘归路，香唇软语最噬人。",
  ["$chiyinghun2"] = "将军，还是把脸蒙起来吧。",
  ["$chiyugu1"] = "武夫以力破阵，佳人凭貌倾城。",
  ["$chiyugu2"] = "佳人倾城又倾国，何怨幽王戏诸侯？",


    ["$chifusheng1"] = "通儿女之情意，晓乱世之冷暖。",
  ["$chifusheng2"] = "深闺藏英秀，独怜乱世秋。",
  ["$chifusheng3"] = "心苟无暇，何恤刀加！",
  ["$chifusheng4"] = "玉碎香消，何须悲悼！",
  ["$chijianian1"] = "夜伊闺楼月，顾影自相怜。",
  ["$chijianian2"] = "敌追势迫，吾亦从容自若。",
  ["$chijianian3"] = "不可无礼，莫要失了法度。",
  ["$chijianian4"] = "乱军丛中，不失大家风韵。",
  ["$chiyinghun1"] = "温柔乡里忘归路，香唇软语最噬人。",
  ["$chiyinghun2"] = "将军，还是把脸蒙起来吧。",
  ["$chiyinghun3"] = "今宵共愉悦，明朝隔远京。",
  ["$chiyinghun4"] = "这祸水你可愿意淌呀？",
  ["$chiyugu1"] = "武夫以力破阵，佳人凭貌倾城。",
  ["$chiyugu2"] = "佳人倾城又倾国，何怨幽王戏诸侯？",
  ["$chiyugu3"] = "三千青丝化弱水，含泪明眸溺英雄。",
  ["$chiyugu4"] = "薄酒岂真醉，君心非我心。",



  -- 董予安
  ["chi__dongguiren"] = "董予安",
  ["#chi__dongguiren"] = "挚梦归鸾离",
  ["~chi__dongguiren"] = "奈何生为女儿身，不能提剑清君侧。",
  ["designer:chi__dongguiren"] = "公冶天纵",
  ["illustrator:chi__dongguiren"] = "佚名",
  ["cv:chi__dongguiren"] = "暂无",
  ["chishanquan"] = "潸泉",
  [":chishanquan"] = "每回合限一次，你可以交换你的手牌数和体力上限，视为使用或打出一张牌名字数为二者差的基本牌或普通锦囊牌。",
  ["#chishanquan"] = "潸泉：交换手牌数与体力上限，选择要视为使用或打出的牌",
  ["#chishanquan-discard"] = "潸泉：请弃置手牌，将手牌数调整为交换后的数值",
  ["chisimi"] = "澌弭",
  [":chisimi"] = "转换技，锁定技，当你的体力上限、手牌数或二者差值任意两个每轮首次相等后，你随机执行：①摸一张牌或增加一点体力上限；②随机弃置一张牌或失去一点体力上限。",
  ["$chishanquan1"] = "大风起，寒气落，一抹芳影独凭河。",
  ["$chishanquan2"] = "请勿葬我身于黄土，可置此魂于春风。",
  ["$chisimi1"] = "衣带诏乃妾私为之，尔等可置我于刀俎。",
  ["$chisimi2"] = "千罪万罪，皆妾之过，与陛下毫无干系。",

  -- 炽陆逊 001
  ["chi__luxun"] = "陆逊",
  ["#chi__luxun"] = "谋定白里",
  ["~chi__luxun"] = "风冷，无归……",
  ["designer:chi__luxun"] = "公冶天纵",
  ["illustrator:chi__luxun"] = "佚名",
  ["cv:chi__luxun"] = "暂无",
  ["chiquege"] = "阒阁",
  [":chiquege"] = "锁定技，若你回合内首次：①体力值等于体力上限，你摸此数值牌；②手牌数等于手牌上限，你视为使用一张不计入次数的火【杀】；③“睄睒”任一选项首次等于在你攻击范围内的角色数：你可以摸一张牌并恢复“睄睒”中一个被移除的选项。④死亡人数等于存活人数，你移除此选项并与一名其他玩家易位。",
  ["chishaoshan"] = "睄睒",
  [":chishaoshan"] = "出牌阶段，你可以交换以下两个属性的数值，然后本回合移除对应选项，未被选到的属性下次选择时+1：①体力值；②手牌上限；③出杀次数；④你与一号位的距离；⑤手牌数；⑥体力上限。若交换后奇/偶数次有属性溢出，你摸/弃等同于此溢出量的牌。",
  ["chimaoqi"] = "榫棋",
  [":chimaoqi"] = "当你于非摸牌阶段获得牌时，你可以将其中任意张置于你的武将牌上，称为“棋”。出牌阶段限一次，你可以获得任意张“棋”。每个回合结束时，若“棋”的数量大于场上人数，你失去一点体力值。",

  -- 炽张春华 002
  ["chi__zhangchunhua"] = "张春华",
  ["#chi__zhangchunhua"] = "残烛归殁",
  ["~chi__zhangchunhua"] = "焚尽旧梦，方知此心……",
  ["designer:chi__zhangchunhua"] = "公冶天纵",
  ["illustrator:chi__zhangchunhua"] = "佚名",
  ["cv:chi__zhangchunhua"] = "暂无",
  ["chifenqing"] = "焚情",
  [":chifenqing"] = "出牌阶段限一次，你可以选择一名其他角色，你与其横置并分别选择一项：①令对方受到来自你的一点火属性伤害②令对方翻面③背水：若只有一名角色选择该选项则交换双方效果。若你与其选择相同选择则均不执行且你与其各恢复一点体力值。",
  ["chisuhen"] = "夙痕",
  [":chisuhen"] = "锁定技，每回合限一次，当你受到或造成属性伤害后，伤害来源重置其武将牌，然后你视为对伤害来源或目标发动一次“焚情”。每个回合结束时，若当前回合角色于本回合内受到或造成过属性伤害，你可以观看牌堆顶两张牌并使用其中可以使用的牌。",
  ["chiyuanque"] = "缘阙",
  [":chiyuanque"] = "使命技，当你累计造成或受到不小于3点属性伤害时，<br>成功：你将体力值恢复至体力上限，失去“焚情”和“夙痕”，然后随机获得两个技能。若此时为你的回合外，你额外获得一个技能。<br>失败：若你进入濒死状态，你将体力值恢复至1，失去一点体力上限和“焚情”和“夙痕”，并追忆一名角色。",
  ["chiejue"] = "扼绝",
  [":chiejue"] = "锁定技，当你/攻击范围不包含你的角色使用【杀】或【决斗】即将对攻击范围不包含你的角色/你造成伤害时，此伤害+1。",


  -- 炽庞凤衣 007
  ["chi__pangfengyi"] = "庞凤衣",
  ["#chi__pangfengyi"] = "有酿一斛",
  ["~chi__pangfengyi"] = "有酿醇醇，醒魂犹寒……",
  ["designer:chi__pangfengyi"] = "公冶天纵",
  ["illustrator:chi__pangfengyi"] = "佚名",
  ["cv:chi__pangfengyi"] = "暂无",
  ["chixingjue"] = "醒釂",
  [":chixingjue"] = "锁定技，你的回合内/外，所有角色牌名字数大于/小于其体力值的手牌均视为【酒】，这些牌称为“醑”。当有角色失去一张“醑”时，你摸一张牌。",
  ["chiyongtang"] = "雍赯",
  [":chiyongtang"] = "锁定技，当你成为单体基本牌或普通锦囊牌的目标后，你需判定，若判定牌花色与此牌花色不同/相同，则额外其指定下家/上家为目标，然后本回合与判定牌相同花色的牌无使用次数限制。",

  -- 炽诸葛果 008
  ["chi__zhugeguo"] = "诸葛果",
  ["#chi__zhugeguo"] = "煌煌明寂",
  ["~chi__zhugeguo"] = "篁竹摇落，簌肃成音……",
  ["designer:chi__zhugeguo"] = "公冶天纵",
  ["illustrator:chi__zhugeguo"] = "佚名",
  ["cv:chi__zhugeguo"] = "暂无",
  ["chihuangli"] = "篁礼",
  [":chihuangli"] = "锁定技，准备阶段或当你受到伤害后，你展示牌堆顶或牌堆底至多三张牌。若这些牌：颜色相同，你获得这些牌并卜算2；类型相同，当前回合角色使用的下一张牌无次数距离限制；花色均不相同，你令一名角色恢复一点体力值； 若均不满足，当前回合角色失去一点体力且重铸所有牌。",
  ["chisusu"] = "簌肃",
  [":chisusu"] = "锁定技，当你于每回合首次使用非基本牌后，你于本回合使用的下一张牌可额外指定一个目标。当你于每回合首次使用基本牌后，你于本回合使用的下一张牌可额外结算一次。",

  -- 炽黄月英 009
  ["chi__huangyueying"] = "黄月英",
  ["#chi__huangyueying"] = "点睛人",
  ["~chi__huangyueying"] = "映山如画，神臬成谋……",
  ["designer:chi__huangyueying"] = "公冶天纵",
  ["illustrator:chi__huangyueying"] = "佚名",
  ["cv:chi__huangyueying"] = "暂无",
  ["chiyingshan"] = "映山",
  [":chiyingshan"] = "每回合限一次，出牌阶段或当你受到伤害后，你可以连接你的一张手牌。若此牌牌名字数与你体力值相等，你可以选择一项：1.恢复一点体力值；2.“映山”本回合使用次数+1；3.令“神臬”③本回合失效。",
  ["chishennie"] = "神臬",
  [":chishennie"] = "锁定技，①你的锦囊牌始终为连接状态；你的连接牌且使用外无法弃置、不计入手牌和使用次数上限且无距离限制。②当你受到或造成伤害后，你连接伤害来源或目标一张手牌。③当一张连接牌因使用或打出而进入弃牌堆后，你摸一张牌，全场角色本回合无法打出或使用牌名字数与此牌相等的牌。",


  -- 炽于吉 011
  ["chi__yuji"] = "于吉",
  ["#chi__yuji"] = "索求者",
  ["~chi__yuji"] = "倞道既成，诣谛何求……",
  ["designer:chi__yuji"] = "公冶天纵",
  ["illustrator:chi__yuji"] = "佚名",
  ["cv:chi__yuji"] = "暂无",
  ["chiliangdao"] = "倞道",
  [":chiliangdao"] = "每种牌名限一次。当你使用的牌即将生效，且此牌不为响应而使用或打出时，你可以在本次结算中将此牌牌面描述上的任意牌名替换为与其字数相等的其他牌名。",
  ["chifushui"] = "覆水",
  [":chifushui"] = "当其他角色响应你的牌后，你摸剩余选项数张牌并依次执行：1.倞道改为每轮限一次；2.倞道的替换条件增加颜色相同；3.将体力恢复至体力上限并获得诣谛。",
  ["chiyidi"] = "诣谛",
  [":chiyidi"] = "每轮各限一次，①当有角色发动技能时，你可以为其指定其一作用目标。②出牌阶段或当你受到伤害后，你可令一名角色的一个技能描述上的牌名/颜色修改为任一其他牌名/颜色。",


  -- 炽任婉 017
  ["chi__renwan"] = "任婉",
  ["#chi__renwan"] = "破离之凫",
  ["~chi__renwan"] = "此身若梦，终将离阙……",
  ["designer:chi__renwan"] = "公冶天纵",
  ["illustrator:chi__renwan"] = "佚名",
  ["cv:chi__renwan"] = "暂无",
  ["chilingmeng"] = "泠梦",
  [":chilingmeng"] = "锁定技，当你即将造成/受到有实体牌的伤害时，若目标/来源区域内有与此实体牌牌名字数相等的牌，防止此伤害并展示这些牌，其/你获得你/其区域内所有展示的牌。",
  ["chilique"] = "离阙",
  [":chilique"] = "锁定技，你于每回合使用的第一张牌即将生效时，按该牌及其后三张牌的牌名字数，选择一条路径执行效果：递增：①不计入次数②执行两次③目标＋1④执行X次；递减：①执行两次②目标＋1③不计入次数④目标＋X；若你使用的牌不符合所选路径，你弃置X张牌且本回合技能失效。若此时X等于你体力值，该牌仍执行下个路径效果（X为本流程已使用牌数）。",

  -- 炽杨众 019
  ["chi__yangzhong"] = "杨众",
  ["#chi__yangzhong"] = "歧路也汤汤",
  ["~chi__yangzhong"] = "荡燎既熄，余烬难续……",
  ["designer:chi__yangzhong"] = "公冶天纵",
  ["illustrator:chi__yangzhong"] = "佚名",
  ["cv:chi__yangzhong"] = "暂无",
  ["chidangliao"] = "荡燎",
  [":chidangliao"] = "当你成为红色牌的目标后，或你的红色牌因弃置而进入弃牌堆后，你可令当前回合角色按照此牌牌名字数与X的大小执行：①大于：其将此牌视为【火攻】或火【杀】（不计入次数）使用；②小于：其于此回合结束后执行一个等于X的阶段（摸牌/出牌/弃牌）；③等于：背水，然后你翻面。（X为本回合“荡燎”发动次数）",

    -- 炽荀粲 020
  ["chi__xuncan"] = "荀粲",
  ["#chi__xuncan"] = "如锥刺髓",
  ["~chi__xuncan"] = "刺骨入心，幽明自现……",
  ["designer:chi__xuncan"] = "公冶天纵",
  ["illustrator:chi__xuncan"] = "佚名",
  ["cv:chi__xuncan"] = "暂无",
  ["chicigu"] = "刺骨",
  [":chicigu"] = "出牌阶段或当你受到伤害后，你可以将一名角色的一张牌置于你的武将牌上，称为“刺”（至多体力值张），若此牌的点数与你体力值的余数大于1，你受到的一点此牌来源的冰属性伤害。回合结束阶段，你选择一项：1.弃置所有“刺”视为对一名角色使用一张冰【杀】；2.获得体力值张“刺”。",
  ["chiyouming"] = "幽明",
  [":chiyouming"] = "当你每轮首次：①成为一张牌的目标后，你可以观看来源两张手牌并将其中一张置于牌堆顶；②进入濒死状态时，若你武将牌正面朝上，你翻面并将体力恢复至一点，然后你将牌堆顶的牌当做【出其不意】对伤害来源使用，若此牌造成伤害，你重置武将牌。",

  -- 炽荀采 021
  ["chi__xuncai"] = "荀采",
  ["#chi__xuncai"] = "炙心之华",
  ["~chi__xuncai"] = "炬泪成火，炙心成灰……",
  ["designer:chi__xuncai"] = "公冶天纵",
  ["illustrator:chi__xuncai"] = "佚名",
  ["cv:chi__xuncai"] = "暂无",
  ["chijulei"] = "炬泪",
  [":chijulei"] = "你可以横置视为使用或打出一张火【杀】/【火攻】或翻面使用或打出一张【酒】/【逐近弃远】，若当前回合角色或此牌目标角色拥有“尘”标记，你弃置其“尘”标记然后选择一项：①此牌不计入使用次数；②重置你的武将牌。",
  ["#chijulei"] = "炬泪：横置使用火【杀】或【火攻】，或翻面使用【酒】或【逐近弃远】",
  ["#chijulei-dust"] = "炬泪：选择当前回合角色或此牌目标中的一名角色移去其“尘”",
  ["#chijulei-choice"] = "炬泪：选择移去“尘”后的效果",
  ["chijulei_extra"] = "此牌不计入使用次数",
  ["chijulei_reset"] = "重置武将牌",
  ["chizhichen"] = "炙尘",
  [":chizhichen"] = "锁定技，每轮开始时，你的上家和下家获得“尘”标记。当你受到/造成伤害后，你令伤害来源/目标横置并获得“尘”标记，若当前回合角色横置或翻面，你重铸手牌中花色最多的所有牌。",

  -- 炽王沦 022
  ["chi__wanglun"] = "王沦",
  ["#chi__wanglun"] = "经年弼世",
  ["~chi__wanglun"] = "恬适心安，铭怀世事……",
  ["designer:chi__wanglun"] = "公冶天纵",
  ["illustrator:chi__wanglun"] = "佚名",
  ["cv:chi__wanglun"] = "暂无",
  ["chitianshi"] = "恬适",
  [":chitianshi"] = "锁定技，其他角色于回合内对你使用的首张牌名字数不小于你体力值的牌对你无效。其他角色于回合内使用的首张牌名字数不小于X的牌结算后，你视为使用之。",
  ["chiminghuai"] = "铭怀",
  [":chiminghuai"] = "每名角色的回合结束阶段，你可以将牌名字数之和等于四的任意张牌当做【随机应变】使用，然后你摸X张牌。（X为全场技能描述拥有“限一次”的角色数且不大于你的体力值）",

  -- 炽王沈 023
  ["chi__wangshen"] = "王沈",
  ["#chi__wangshen"] = "高悬之屋脊",
  ["~chi__wangshen"] = "调风成舞，脊望如剑……",
  ["designer:chi__wangshen"] = "公冶天纵",
  ["illustrator:chi__wangshen"] = "佚名",
  ["cv:chi__wangshen"] = "暂无",
  ["chitiaofeng"] = "调风",
  [":chitiaofeng"] = "出牌阶段每种花色限一次，你可以展示所有牌，并将一张牌名字数不小于X的牌当作【调剂盐梅】使用，然后你摸X张牌。（X为你手牌花色数）",
  ["chijiwang"] = "脊望",
  [":chijiwang"] = "锁定技，当你的牌不因使用或打出而离开手牌区时，你展示之且你、当前回合角色和牌堆中所有与此牌花色相同的牌均视为【杀】直到回合本结束。当你成为一张多目标牌的目标后，若此牌其他目标已损失体力值均不大于你，当前回合角色使用的下一张牌你作为目标额外执行一次。",

  -- 炽陆凯 024
  ["chi__lukai"] = "陆凯",
  ["#chi__lukai"] = "迷途之骛",
  ["~chi__lukai"] = "蹇途已尽，笃谒成空……",
  ["designer:chi__lukai"] = "公冶天纵",
  ["illustrator:chi__lukai"] = "佚名",
  ["cv:chi__lukai"] = "暂无",
  ["chijiantu"] = "蹇途",
  [":chijiantu"] = "转换技，锁定技，当你于回合内首次使用一种花色的单体目标牌指定手牌数不大于你的角色时，此牌视为：①闪电；②过河拆桥；对其使用。",
  ["chiduye"] = "笃谒",
  [":chiduye"] = "出牌阶段限一次，你可以依次展示场上至多四张牌，归属者依次选择一项并移除：①摸X张牌；②X个回合内获得【謇谔】；③本回合结束后执行一个第X个阶段（逆序）；④使用此牌，然后置于牌堆顶。（X为已选选项数+1）",
  ["chizelie"] = "泽烈",
  [":chizelie"] = "当你失去任意区域的所有牌后，你可令一名角色本回合下一次摸牌/弃牌后，其再摸一张牌/弃一张牌。",
  ["#chizelie-target"] = "泽烈：选择一名角色",
  ["#chizelie-choice"] = "泽烈：令 %dest 本回合下一次摸牌或弃牌后再执行一次",
  ["chizelie_draw"] = "下一次摸牌后再摸一张牌",
  ["chizelie_discard"] = "下一次弃牌后再弃一张牌",
  ["chixieque"] = "謇谔",
  [":chixieque"] = "锁定技，①当你对其他角色使用的牌生效后，其本回合不能再抵消牌；②当你抵消牌后，你本回合不能再成为所有角色使用牌的目标。",
  ["$chijiantu1"] = "蹇途难行，自有坦途。",
  ["$chijiantu2"] = "路虽蹇涩，志不可移。",
  ["$chiduye1"] = "笃行谒见，诚意可鉴。",
  ["$chiduye2"] = "谒而笃之，礼数周全。",
  ["$chizelie1"] = "泽被苍生，烈火淬金。",
  ["$chizelie2"] = "烈而有泽，刚柔并济。",

  -- 炽荀悦 026
  ["chi__xunyue"] = "荀悦",
  ["#chi__xunyue"] = "整经者",
  ["~chi__xunyue"] = "借笈而思，疏纪成律……",
  ["designer:chi__xunyue"] = "公冶天纵",
  ["illustrator:chi__xunyue"] = "佚名",
  ["cv:chi__xunyue"] = "暂无",
  ["chijieji"] = "借笈",
  [":chijieji"] = "出牌阶段限一次，你可以观看一名手牌数或技能数不小于你的角色的手牌，并将其中一张牌当做一张合法目标数相同的基本牌或普通锦囊牌使用，然后其摸X张牌。你于本回合内使用到此牌结算后的第X张牌后，此技能视为未发动过（X为此牌合法目标数）。",
  ["#chijieji"] = "借笈：观看一名符合条件角色的手牌，并转化使用其中一张牌",
  ["#chijieji-card"] = "借笈：选择 %dest 的一张手牌进行转化",
  ["#chijieji-use"] = "借笈：将此牌当合法目标数相同的基本牌或普通锦囊牌使用",
  ["@chijieji_count-turn"] = "借笈剩余牌数",
  ["chishuji"] = "疏纪",
  [":chishuji"] = "<a href='sxrm__contract'>契定技</a>，当你每回合首次成为一张多目标锦囊牌的目标后，若此牌的合法目标数不小于你的手牌数，你弃置半数手牌（向下取整），并将此锦囊牌的目标数调整至与你手牌数相同（至少为1）。",
  ["#chishuji-invoke"] = "疏纪：此牌合法目标数为%arg，是否发动？",
  ["#chishuji-discard"] = "疏纪：弃置%arg张手牌",
  ["#chishuji-target"] = "疏纪：将此牌的目标数调整为%arg",



  -- 炽夏侯玄 031
  ["chi__xiahouxuan"] = "夏侯玄",
  ["#chi__xiahouxuan"] = "玄海漫漫",
  ["~chi__xiahouxuan"] = "吾欲伴白鹤鸣焦琴，岂可得乎?",
  ["designer:chi__xiahouxuan"] = "公冶天纵",
  ["illustrator:chi__xiahouxuan"] = "佚名",
  ["cv:chi__xiahouxuan"] = "暂无",
  ["chicixuan"] = "辞玄",
  [":chicixuan"] = "转换技，每回合限一次，你可以①将至多三张牌置于“仁”区然后摸等量的牌；②获得“仁”区至多三张牌；视为使用或打出一张牌名字数等于“仁”区牌数的基本牌或普通锦囊牌。",
  ["chiqihai"] = "歧海",
  [":chiqihai"] = "当你受到或造成伤害后，你可以令伤害来源选择一项：①将一张“仁”区没有的类型的牌置入“仁”区；②移除一张“仁”牌，视为对其使用之（需合法）。",
  ["$chicixuan1"] = "枫林唱晚，不觉复梦庄周之蝶。",
  ["$chicixuan2"] = "青牛出函谷，伯阳化胡，吾道非常道。",
  ["$chiqihai1"] = "非俊杰之士，无以拔之为官、参戟牙门。",
  ["$chiqihai2"] = "审官择人，明忠良之任，除腐庸之弊。",


  -- 炽夏侯杰 032
  ["chi__xiahoujie"] = "夏侯杰",
  ["#chi__xiahoujie"] = "胆战行之",
  ["~chi__xiahoujie"] = "匹夫，匹夫好大口气!",
  ["designer:chi__xiahoujie"] = "公冶天纵",
  ["illustrator:chi__xiahoujie"] = "佚名",
  ["cv:chi__xiahoujie"] = "暂无",
  ["chiyushe"] = "逾慑",
  [":chiyushe"] = "<a href='sxrm__contract'>契定技</a>，当你使用一张牌后，若不为你本回合使用的第一张牌，你可以摸X张牌并使用一张本局未以此法使用过的、与原牌合法目标相同的基本牌或普通锦囊牌，若无合法牌名，你失去一点体力并弃置X张牌（X为你使用的上一张牌的合法目标数）。",
  ["#chiyushe-invoke"] = "逾慑：是否摸 %arg 张牌并使用一张合法目标数相同的新牌？",
  ["#chiyushe-use"] = "逾慑：选择一张本局未以此法使用过的牌使用",
  ["#chiyushe-discard"] = "逾慑：无合法牌名，请弃置 %arg 张牌",
  ["@$chiyushe"] = "逾慑已用牌名",
  ["chidangdan"] = "荡胆",
  [":chidangdan"] = "<a href='sxrm__contract'>契定技</a>，当你使用牌指定目标后，若其体力值与此牌合法目标数相等，你可以随机执行一项：1.增加一点体力上限并恢复一点体力；2.“逾慑”本回合失效；3.失去一点体力上限。",
  ["#chidangdan-invoke"] = "荡胆：%dest 的体力值等于此牌合法目标数%arg，是否发动？",
  ["#chidangdan-choice"] = "荡胆：对 %dest 执行随机结果",
  ["chijinzhu"] = "尽逐",
  [":chijinzhu"] = "出牌阶段限一次，你可以弃置一张牌，依次视为使用任意张牌名字数之和不大于此牌牌名字数的基本牌或普通锦囊牌。",
  ["#chijinzhu"] = "尽逐：弃置一张牌并依次选择要视为使用的牌",
  ["#chi_jinzhu_choose"] = "尽逐：剩余牌名字数为%arg，选择一张牌",
  ["#chi_jinzhu_target"] = "尽逐：为%arg选择合法目标",
  ["$chiyushe1"] = "驾长车、横长枪，曾饮马长江，今日平长坂。",
  ["$chiyushe2"] = "降张辽、纳张郃，战宛城张绣，何惧他张飞!",
  ["$chidangdan1"] = "丞相已定中原，有带甲百万，投鞭可断长江！",
  ["$chidangdan2"] = "天下北高南低，向来征南者胜、北伐者败！",

  -- 炽夏侯涓 034
  ["chi__xiahoushi"] = "夏侯涓",
  ["#chi__xiahoushi"] = "茹情脉脉",
  ["~chi__xiahoushi"] = "薪脉如火，毓髓成诗……",
  ["designer:chi__xiahoushi"] = "公冶天纵",
  ["illustrator:chi__xiahoushi"] = "佚名",
  ["cv:chi__xiahoushi"] = "暂无",
  ["chixinmai"] = "薪脉",
  [":chixinmai"] = "每轮限一次，出牌阶段或当你受到伤害后，你可以令一名角色获得本回合进入弃牌堆的所有【杀】，然后令其选择一项：①你对其造成一点雷属性伤害；②其所有非属性【杀】视为【无懈可击】直至其下回合结束或受到属性伤害，然后你重置“薪脉”。",
  ["chiyusui"] = "毓髓",
  [":chiyusui"] = "当有角色受到属性伤害后，你可以与其各摸一张牌；当有角色跳过任意阶段后，你可以弃置所有手牌令其于本回合结束后执行一个额外的被跳过的此阶段。",

    -- 炽夏侯惇 030
  ["chi__xiahoudun"] = "夏侯惇",
  ["#chi__xiahoudun"] = "炽胆懑梦",
  ["~chi__xiahoudun"] = "燎志如火，赈节如海……",
  ["designer:chi__xiahoudun"] = "公冶天纵",
  ["illustrator:chi__xiahoudun"] = "佚名",
  ["cv:chi__xiahoudun"] = "暂无",
  ["chiliaozhi"] = "燎志",
  [":chiliaozhi"] = "出牌阶段开始时或每轮结束时，你可以与至多X名角色同时拼点，拼点赢的角色视为对所有没赢的角色使用一张火【杀】，然后你摸此流程中受到伤害的角色数张牌（X为你已损失体力值+1）。",
  ["chizhenjie"] = "赈节",
  [":chizhenjie"] = "其与你距离不大于1的角色造成或受到属性伤害后，你可以观看牌堆顶两张牌并令你或其使用其中可以使用的牌；你与其他角色的距离-X（X为你已损失体力值+1）。",

    -- 炽夏侯荣 033
  ["chi__xiahourong"] = "夏侯荣",
  ["#chi__xiahourong"] = "初生虎犊",
  ["~chi__xiahourong"] = "犊烈初心，皦谈成诺……",
  ["designer:chi__xiahourong"] = "公冶天纵",
  ["illustrator:chi__xiahourong"] = "佚名",
  ["cv:chi__xiahourong"] = "暂无",
  ["chidulie"] = "犊烈",
  [":chidulie"] = "锁定技，你于本局游戏首次受到和造成的伤害均翻倍，均触发后你失去本技能。",
  ["chijiaotan"] = "皦谈",
  [":chijiaotan"] = "出牌阶段限一次，你可以令任意技能数大于你的角色议事，你可为本次议事增加一张上次“皦谈”结果的牌。议事结束后你可以观看一名异议角色的手牌并使用其议事牌，若其手牌中有与本次议事结果颜色不同的牌，你摸两张牌。",

    -- 炽夏侯徽 035
  ["chi__xiahouhui"] = "夏侯徽",
  ["#chi__xiahouhui"] = "吾之所向",
  ["~chi__xiahouhui"] = "匪氏之心，斐谌成诗……",
  ["designer:chi__xiahouhui"] = "公冶天纵",
  ["illustrator:chi__xiahouhui"] = "佚名",
  ["cv:chi__xiahouhui"] = "暂无",
  ["chifeishi"] = "匪氏",
  [":chifeishi"] = "当你即将造成或受到伤害时，你可以令两名其他角色各展示两张红色牌，然后你选择其中一张获得之。",
  ["chifeichen"] = "斐谌",
  [":chifeichen"] = "每回合限一次，当你成为红色牌的目标后，你可以展示来源的所有手牌，若其手牌中没有与此牌类别相同的红色牌，你令此牌额外结算一次。",
  ["#chifeichen-invoke"] = "斐谌：是否展示 %dest 的所有手牌？若其中没有同类别红色牌，此牌额外结算一次",
  ["#chifeishi-choose"] = "匪氏：选择两名各有至少两张红色手牌的其他角色",
  ["#chifeishi-show"] = "匪氏：请展示两张红色手牌",
  ["#chifeishi-gain"] = "匪氏：选择获得其中一张展示牌",
  ["#chimaoqi-put"] = "榫棋：你可以将本次获得的任意张牌置于武将牌上，称为“棋”",
  ["#chimaoqi-gain"] = "榫棋：选择任意张“棋”获得",
  ["@@chisusu_extra_effect-turn"] = "肃肃·额外结算",
  ["@@chisusu_extra_target-turn"] = "肃肃·额外目标",
  ["#chisusu-target"] = "肃肃：为此牌增加一个目标",
  ["#chiyingshan-card"] = "映山：你可以连接一张手牌",
  ["#chiyingshan-choice"] = "映山：此牌牌名字数等于你的体力值，选择一项",
  ["chiyingshan_recover"] = "恢复1点体力",
  ["chiyingshan_more"] = "本回合可以再发动一次映山",
  ["chiyingshan_disable"] = "令神臬③本回合失效",
  ["#chishennie-connect"] = "神臬：连接 %dest 的一张手牌",
  ["chishennie_lengths-turn"] = "神臬禁用字数",
  ["@@chixieque_no_cancel-turn"] = "翕阙·不能抵消",
  ["@@chixieque_no_target-turn"] = "翕阙·不能成为目标",
  ["#chitiaofeng"] = "调锋：将一张牌名字数不小于X且本阶段未使用过该花色的牌当【调剂盐梅】使用",
  ["chitiaofeng_suits-phase"] = "调锋已用花色",
  ["#chifenqing-choice"] = "焚情：选择对 %dest 执行的效果",
  ["chifenqing_damage"] = "令对方受到你造成的1点火焰伤害",
  ["chifenqing_turnover"] = "令对方翻面",
  ["chifenqing_backwater"] = "背水：若仅一人选择，交换双方效果",
  ["#chizhenjie-invoke"] = "赈节：是否观看牌堆顶两张牌，令你或 %dest 使用其中一张？",
  ["#chizhenjie-user"] = "赈节：选择使用牌的角色",
  ["#chizhenjie-use"] = "赈节：你可以使用其中一张牌",
  ["#chiliaozhi-choose"] = "燎志：选择至多X名角色同时拼点",
  ["chifushui_stage"] = "覆水进度",
  ["chifushui_name_round"] = "覆水·牌名强化",
  ["chifushui_color_round"] = "覆水·颜色强化",
  ["#chihuangli-place"] = "荒离：选择展示牌堆顶或牌堆底的牌",
  ["#chihuangli-number"] = "荒离：选择展示牌的数量",
  ["#chihuangli-recover"] = "荒离：令一名角色恢复1点体力",
  ["@@chihuangli_unlimited-turn"] = "荒离·下一张牌无限制",
  ["#chisuhen-choice"] = "夙痕：视为发动焚情，请选择对 %dest 执行的效果",
  ["#chisuhen-use"] = "夙痕：是否观看牌堆顶两张牌并使用其中一张？",
  ["#chisuhen-card"] = "夙痕：你可以使用其中一张牌",
  ["chisuhen_elemental-turn"] = "夙痕·属性伤害",
  ["chijiwang_suits-turn"] = "寄望花色",
  ["chijiwang_extra_target-turn"] = "寄望·额外结算",
  ["#chidangliao-invoke"] = "荡燎：是否按此红色牌的牌名字数与X的大小执行效果？",
  ["#chidangliao-use"] = "荡燎：选择视为使用的牌",
  ["#chidangliao-target"] = "荡燎：请选择此牌的目标",
  ["@chijiaotan_result"] = "皦谈上次结果",
  ["#chijiaotan-dissenter"] = "皦谈：选择一名异议角色观看其手牌",
  ["#chijiaotan-use"] = "皦谈：你可以使用该角色的议事牌",
  ["#chijiaotan-previous"] = "%from 为本次议事增加了一张上次结果为 %arg 的牌",
  ["#chiquege-slash"] = "阒阁：请选择一张不计入次数的火【杀】的目标",
  ["#chiquege-swap"] = "阒阁：选择一名其他角色与其易位",
  ["#chiquege-equal"] = "阒阁：你可以摸一张牌并恢复“睄睒”的一个选项",
  ["#chiquege-restore"] = "阒阁：恢复“睄睒”的一个选项",
  ["chiquege_hp-turn"] = "阒阁·满体力",
  ["chiquege_hand-turn"] = "阒阁·满手牌",
  ["#chishaoshan-first"] = "睄睒：选择要交换的第一个属性",
  ["#chishaoshan-second"] = "睄睒：选择要交换的第二个属性",
  ["chishaoshan_opt1"] = "体力值",
  ["chishaoshan_opt2"] = "手牌上限",
  ["chishaoshan_opt3"] = "出杀次数",
  ["chishaoshan_opt4"] = "与一号位的距离",
  ["chishaoshan_opt5"] = "手牌数",
  ["chishaoshan_opt6"] = "体力上限",
  ["#chiliangdao-choice"] = "倞道：你可以替换对 %dest 生效的牌面效果",
  ["chiliangdao_names"] = "倞道已用牌名",
  ["chiliangdao_used-round"] = "倞道本轮已发动",
  ["#chilique-path"] = "离阙：选择本回合的牌名字数路径",
  ["chilique_increase"] = "递增路径",
  ["chilique_decrease"] = "递减路径",
  ["#chilique-target"] = "离阙：为此牌增加至多 %arg 名目标",
  ["@chilique_path-turn"] = "离阙路径",
  ["chilique_invalid-turn"] = "离阙本回合失效",
  ["#chixiarong"] = "霞容：将牌名字数之和等于X的手牌当目标牌使用或打出",
  ["#chixiarong-target"] = "霞容：选择一名与你距离不小于X的角色观看其手牌",
  ["chixiarong_names-round"] = "霞容已用牌名",
  ["#chiyidi-target"] = "诣谛：为 %dest 发动的技能指定其中一个作用目标",
  ["#chiyidi-modify"] = "诣谛：选择一名角色修改其牌名或颜色规则",
  ["#chiyidi-invoke"] = "诣谛：是否修改一名角色的牌名或颜色规则？",
  ["chiyidi_cardname"] = "修改牌名",
  ["chiyidi_color"] = "修改颜色",
  ["#chiyidi-name"] = "诣谛：选择牌名",
  ["@chiyidi_name"] = "诣谛牌名",
  ["@chiyidi_color"] = "诣谛颜色",
  ["@chiyuanque_damage"] = "缘阙·属性伤害",
  ["#chiyuanque-memory"] = "缘阙：选择一名其他角色追忆",

  -- 王倩（王夫人，卫玠之母）
  ["$chizhuoxi1"] = "叔宝既有清标，岂容尘俗相侵。",
  ["$chizhuoxi2"] = "取舍之间，最须护得此心周全。",
  ["$chizhuoxi3"] = "近身之物，且由妾身代为收存。",
  ["$chizhuoxi4"] = "一息一擢，皆为卫氏门楣计。",
  ["$chixiarong1"] = "遥见玉人照壁，便知吾儿归来。",
  ["$chixiarong2"] = "叔宝体羸，不可再劳其远行。",
  ["$chixiarong3"] = "容止出尘，亦招世人争相看杀。",
  ["$chixiarong4"] = "隔帘遥望，唯愿吾儿长安。",
  ["$chizhongliu1"] = "乱流虽急，慈母自当为子作舟。",
  ["$chizhongliu2"] = "卫氏一门，岂可随波而没。",
  ["$chizhongliu3"] = "纵是举世倾慕，也莫损叔宝分毫。",
  ["$chizhongliu4"] = "立于中流，方护得身后清辉。",
  ["~chi__wangqian"] = "叔宝，往后的路……为娘不能再护你了……",

  -- 夏侯轻衣（《武神赵子龙》）
  ["$chiqingya1"] = "长坂一别，此心仍系常山。",
  ["$chiqingya2"] = "危崖试胆，且看谁先失了锋芒。",
  ["$chiqingya3"] = "这一局，我以性命同你赌过。",
  ["$chiqingya4"] = "银枪映雪，也照得见我的心意。",
  ["$chiwangchen1"] = "纵隔千军，我也认得你的背影。",
  ["$chiwangchen2"] = "尘烟遮不断，轻衣赴约之路。",
  ["$chiwangchen3"] = "旧物尚在，故人便不算远。",
  ["$chiwangchen4"] = "子龙，你只管向前，我自会追上。",
  ["~chi__xiahouqingyi"] = "子龙……这一程，轻衣只能陪你到此了……",

  -- 张春华
  ["$chifenqing1"] = "仲达装病欺曹氏，却瞒不过枕边之人。",
  ["$chifenqing2"] = "既见机密，便休想活着走出司马府。",
  ["$chifenqing3"] = "无情未必真豪杰，焚心方知决绝。",
  ["$chifenqing4"] = "夫妻数十载，今日便把旧情烧尽。",
  ["$chisuhen1"] = "昔年药汤尚温，杀意却早已入骨。",
  ["$chisuhen2"] = "旧痕不灭，来日必循迹而报。",
  ["$chisuhen3"] = "仲达，你欠我的何止一声薄情。",
  ["$chisuhen4"] = "忍得一时冷眼，方能等到烈火燎原。",
  ["$chiyuanque1"] = "师儿昭儿不食，才换得你一句探问么？",
  ["$chiyuanque2"] = "我自断食求死，不受你虚情相怜。",
  ["$chiyuanque3"] = "司马氏的前程，从不是靠温情换来。",
  ["$chiyuanque4"] = "此生缘尽，余下的路各自走罢。",
  ["~chi__zhangchunhua"] = "冷眼看尽一生，到头来……仍是司马家的鬼……",

  -- 杨众
  ["$chidangliao1"] = "世传杨氏之学，此心亦承四世清烈。",
  ["$chidangliao2"] = "随天子西入函谷，前路再险亦当奉驾。",
  ["$chidangliao3"] = "渡过大河，众亦当率群吏步从圣驾。",
  ["$chidangliao4"] = "一片丹心未烬，何须蓩亭侯爵来彰。",
  ["~chi__yangzhong"] = "陛下既已还都……臣纵倒在途中，亦无憾了……",

  -- 荀勖
  ["$chiyilvRemake1"] = "考钟律于古制，正雅乐于今朝。",
  ["$chiyilvRemake2"] = "十二律吕相生，自有天地之序。",
  ["$chiyilvRemake3"] = "此笛合度，可为万音之准。",
  ["$chiyilvRemake4"] = "宫商既定，朝野之声皆归其位。",
  ["$chifufengRemake1"] = "扶风藏旧律，一管可校群音。",
  ["$chifufengRemake2"] = "重铸清浊，方得声无差谬。",
  ["$chifufengRemake3"] = "以笛定尺，古法未必不可复。",
  ["$chifufengRemake4"] = "风过管弦，余音自归正声。",
  ["$chixunfu1"] = "钟士季翻云覆雨，不可不防。",
  ["$chixunfu2"] = "徇名者众，能察其覆者寡。",
  ["$chixunfu3"] = "一言一色，皆须验明真伪。",
  ["$chixunfu4"] = "朝局如谱，错一音便乱全章。",
  ["$chidaojie1"] = "贾公所托，勖自当尽力而为。",
  ["$chidaojie2"] = "礼法为表，权衡方是仕途之实。",
  ["$chidaojie3"] = "此物归其所用，也算全了旧谊。",
  ["$chidaojie4"] = "身居中书，进退岂能不计代价。",
  ["~chi__xunxu"] = "律可校正，人心与身后之名……终难定准……",

  -- 陆凯
  ["$chijiantu1"] = "陛下所行，正使东吴步入蹇途。",
  ["$chijiantu2"] = "前路纵险，老臣此谏亦不可止。",
  ["$chijiantu3"] = "雷霆加身，也好过坐看社稷倾覆。",
  ["$chijiantu4"] = "拆去蔽君之墙，方见天下实情。",
  ["$chiduye1"] = "臣陈二十事，请陛下逐条省览。",
  ["$chiduye2"] = "谒见非为私门，只为江东百姓。",
  ["$chiduye3"] = "一事一议，皆关吴国存亡。",
  ["$chiduye4"] = "忠言已尽，听与不听皆在君心。",
  ["$chizelie1"] = "取民有度，施泽方可弥补国耗。",
  ["$chizelie2"] = "宫室愈盛，吴民愈困，岂可不止！",
  ["$chizelie3"] = "失其所有，更当济其不足。",
  ["$chizelie4"] = "刚言犯颜，只求留一分生机。",
  ["~chi__lukai"] = "二十条谏书俱在……陛下，莫再负江东了……",

  -- 荀悦
  ["$chijieji1"] = "采左氏之体，以编汉家旧事。",
  ["$chijieji2"] = "群籍浩繁，借其要者便可成篇。",
  ["$chijieji3"] = "史笔有所本，褒贬自有据。",
  ["$chijieji4"] = "取一卷而观兴亡，亦足鉴今日。",
  ["$chishuji1"] = "《汉纪》三十篇，务求约而有要。",
  ["$chishuji2"] = "删繁成纪，使后来者得见治乱。",
  ["$chishuji3"] = "献帝命臣纂史，臣不敢以乱世辞。",
  ["$chishuji4"] = "一朝得失，当由直笔存于后世。",
  ["~chi__xunyue"] = "《汉纪》已成……愿后来者能鉴汉室之衰……",

  -- 王沈
  ["$chitiaofeng1"] = "顺势调风，方可安立高阁之上。",
  ["$chitiaofeng2"] = "一纸文章，也能调和朝中百味。",
  ["$chitiaofeng3"] = "魏晋递嬗，执笔者须先辨风向。",
  ["$chitiaofeng4"] = "盐梅调鼎，各依其主而用。",
  ["$chijiwang1"] = "高贵乡公欲举兵，须速报大将军。",
  ["$chijiwang2"] = "屋脊虽高，也最先知风从何来。",
  ["$chijiwang3"] = "史书如何落笔，自有成王定论。",
  ["$chijiwang4"] = "此举关乎身家，王某不能随君赴死。",
  ["~chi__wangshen"] = "著魏书以饰一时，却不知后世……如何书我……",

  -- 荀粲
  ["$chicigu1"] = "圣人之言如锥，越思越觉刺骨。",
  ["$chicigu2"] = "名教之外，自有不可言说之理。",
  ["$chicigu3"] = "以身受寒，或可替卿分去热苦。",
  ["$chicigu4"] = "此痛留在我身，总好过见卿独受。",
  ["$chiyouming1"] = "才性幽明，岂是礼法一语可尽。",
  ["$chiyouming2"] = "妇人之德不足论，颜色才是难得。",
  ["$chiyouming3"] = "卿既归于幽冥，我独生又有何欢。",
  ["$chiyouming4"] = "玄理可忘生死，却忘不得故人。",
  ["~chi__xuncan"] = "卿去未久……粲今亦来相从……",

  -- 荀采
  ["$chijulei1"] = "此泪不肯示人，落地便化作烈火。",
  ["$chijulei2"] = "既逼我再嫁，便休怪我以死明志。",
  ["$chijulei3"] = "一杯薄酒，压不下心中决绝。",
  ["$chijulei4"] = "炬火照堂，且看荀氏女儿的选择。",
  ["$chizhichen1"] = "尘可染衣，不可污我守节之心。",
  ["$chizhichen2"] = "父命与旧誓相逼，唯有一死相答。",
  ["$chizhichen3"] = "门内喜乐喧天，我心早已化灰。",
  ["$chizhichen4"] = "纵身归尘，也胜作负义之人。",
  ["~chi__xuncai"] = "此身可改嫁……此心绝不改嫁……",

  -- 老年陆逊
  ["$chiquege1"] = "阒阁无声，唯余君书字字相逼。",
  ["$chiquege2"] = "夷陵火尽，老臣之心亦渐冷矣。",
  ["$chiquege3"] = "国事满堂，何故尽困于宫闱之争。",
  ["$chiquege4"] = "封门谢客，只因再无话可进于至尊。",
  ["$chishaoshan1"] = "察势移衡，昔破刘备亦是此理。",
  ["$chishaoshan2"] = "强弱互易，只在主将一念之间。",
  ["$chishaoshan3"] = "石亭设谋，以虚名换得魏军深入。",
  ["$chishaoshan4"] = "盛衰相倚，岂有终日不移之势。",
  ["$chimaoqi1"] = "以江为枰，以兵作子，须谋定而后动。",
  ["$chimaoqi2"] = "旧棋尚存，新局却已非我可掌。",
  ["$chimaoqi3"] = "一子落处，当看十步之后。",
  ["$chimaoqi4"] = "收拢残局，或可再保东宫一线。",
  ["~chi__luxun"] = "数番遣使责问……臣心已乱，吴国将何所托……",

  -- 王沦
  ["$chitianshi1"] = "弱冠举孝廉，吾意恬淡，未肯应命。",
  ["$chitianshi2"] = "名门之势虽盛，不如守心自适。",
  ["$chitianshi3"] = "来书且置案头，进退容我再思。",
  ["$chitianshi4"] = "不争一时显达，自可免受尘扰。",
  ["$chiminghuai1"] = "既入大将军府，所谋皆系朝局。",
  ["$chiminghuai2"] = "父为魏司空，兄弟俱仕，吾岂忘家门所托。",
  ["$chiminghuai3"] = "太原王氏经年积望，更须谨慎持守。",
  ["$chiminghuai4"] = "胸中所怀，待时而应便是。",
  ["~chi__wanglun"] = "年方二十余……尚未来得及报答家国……",

  -- 年轻于吉
  ["$chiliangdao1"] = "道法无定名，随念便可化生。",
  ["$chiliangdao2"] = "一字偷天换日，凡眼岂识其中真意。",
  ["$chiliangdao3"] = "《太平青领书》在此，诸法皆可参同。",
  ["$chiliangdao4"] = "名相本虚，改之又有何难。",
  ["$chifushui1"] = "符水既饮，沉疴自当立解。",
  ["$chifushui2"] = "吴会百姓信我，非信你孙伯符。",
  ["$chifushui3"] = "一碗清水，也可渡得有缘之人。",
  ["$chifushui4"] = "诚心求道者，符水方能显灵。",
  ["$chiyidi1"] = "众生各有所求，贫道为你指出一途。",
  ["$chiyidi2"] = "点化一念，便教因果另归其主。",
  ["$chiyidi3"] = "你眼中的定数，不过是贫道掌中变数。",
  ["$chiyidi4"] = "欲诣大道，先须看破名色。",
  ["~chi__yuji"] = "孙策纵能杀我……却杀不得吴人心中的于吉……",

  -- 黄月英
  ["$chiyingshan1"] = "山川入图，机括之势便已了然。",
  ["$chiyingshan2"] = "木石相连，也能运转如生。",
  ["$chiyingshan3"] = "孔明且看，此处再添一枚榫卯如何？",
  ["$chiyingshan4"] = "不求颜色悦人，但以才智济世。",
  ["$chishennie1"] = "矩臬既定，百般机巧皆有所循。",
  ["$chishennie2"] = "木牛流马，贵在彼此机关相应。",
  ["$chishennie3"] = "一线牵机，便可令全局同动。",
  ["$chishennie4"] = "奇术非神授，不过格物穷理而已。",
  ["~chi__huangyueying"] = "孔明，案上的图样……还差最后一笔……",

  -- 诸葛果
  ["$chihuangli1"] = "篁竹有节，天地亦自有礼数。",
  ["$chihuangli2"] = "观叶知风，览三才而定吉凶。",
  ["$chihuangli3"] = "青篁深处，正宜清修问道。",
  ["$chihuangli4"] = "礼敬自然，方可窥见天机一线。",
  ["$chisusu1"] = "簌簌竹音，已为下一步作答。",
  ["$chisusu2"] = "前因落定，后果便循势而来。",
  ["$chisusu3"] = "一叶动而百枝应，此即自然之理。",
  ["$chisusu4"] = "心神澄明，便可听见万物相和。",
  ["~chi__zhugeguo"] = "尘缘已了……果儿当归于仙山……",

  -- 夏侯荣
  ["$chidulie1"] = "父亲战死，我岂能独渡汉水偷生！",
  ["$chidulie2"] = "虎父无犬子，夏侯荣愿死于此地！",
  ["$chidulie3"] = "十三之身，亦知临阵守义。",
  ["$chidulie4"] = "此击既出，便不问生还。",
  ["$chijiaotan1"] = "经书过目成诵，诸君尽可相问。",
  ["$chijiaotan2"] = "众说纷纭，不妨各陈其理。",
  ["$chijiaotan3"] = "昔日幼坐宾席，所论亦不让成人。",
  ["$chijiaotan4"] = "以言辨志，以色观心。",
  ["~chi__xiahourong"] = "父亲既没于此……孩儿绝不过河……",

  -- 夏侯徽
  ["$chifeishi1"] = "司马子元，你的野心瞒不过枕边人。",
  ["$chifeishi2"] = "两家姻亲，未必便是同心同德。",
  ["$chifeishi3"] = "红妆之下，也有洞察朝局的眼睛。",
  ["$chifeishi4"] = "取其所示，便知谁在暗怀异志。",
  ["$chifeichen1"] = "既无同类相佐，此谋便要加倍奉还。",
  ["$chifeichen2"] = "摊开手牌，也摊开你未说出口的心思。",
  ["$chifeichen3"] = "斐然成章，只为劝君莫行险途。",
  ["$chifeichen4"] = "红色既明，藏在暗处的算计便无所遁形。",
  ["~chi__xiahouhui"] = "这杯毒酒……终究还是出自夫君之手么……",

}






-- <<< chi__xiahoumao auto generated end
return extension
