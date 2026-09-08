import { lib, game, ui, get, ai, _status } from "../../noname.js";
export const type = "extension";
export default function(){
	return {name:"剑影",arenaReady:function(){ // ✅ 改成 export default

     // 角色分组
lib.characterSort.mode_extension_剑影 = {
    clanxiahou: ["clan_xiahoudun", "clan_xiahouyuan", "clan_xiahouba", "clan_xiahoushi", "clan_xiahouxuan", "clan_xiahoumao", "clan_xiahouhui", "clan_xiahourong"],
    yingmen: ["clan_wangqian", "clan_luyusheng", "ying_wanglun", "clan_xunyue","clan_xunxu","ying_xuncan","ying_xuncai","clan_lukai","ying_wangshen","ying_yangzhong"],
    chixue: ["chi_huangyueying", "chi_pangfengyi", "chi_zhenji", "chi_xushu","chi_jiaxu","chi_caiwenji","chi_luxun","chi_zhanghuai","chi_zhangchunhua","chi_zhugeguo","chi_guozhao"],
    niwo:["niwo_xushu","niwo_xushi","niwo_xurong","niwo_hanlong","niwo_wangyi","niwo_zhaoyun","niwo_zhanghua","niwo_zhouchu"],
};




},content:function(config,pack){


   
},prepare:function(){
    
},precontent:function() {

    lib.namePrefix.set("炽", { color: "#ab372f" });
      lib.namePrefix.set("盈", { color: "#f7943dff" });
         lib.namePrefix.set("逆", { color: "#2f90b9" });
    
   

},help:{},config:{},package:{
    character: {
        character: {
            "clan_wangqian": {
                sex: "female",
                group: "jin",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                clans: ["太原王氏"],
                intro: "王倩，即王浑女王氏，后嫁卫恒，其子为名士卫玠。",
                skills: ["clanzhuoxi","clanxiarong","clanzhongliu"],
                img: "extension/剑影/clan_wangqian.jpg",
                trashBin: ["des:王倩，即王浑女王氏，后嫁卫恒，其子为名士卫玠。"],
                dieAudios: ["ext:剑影/audio/die/clan_wangqian.mp3"],
            },
            "clan_xunxu": {
                sex: "male",
                group: "wei",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                clans: ["颍川荀氏"],
                skills: ["clanyilvRemake","clanfufengRemake","clanxunfu","clandaojie"],
                trashBin: ["des:荀勖（xù）（？～289年），字公曾。颍川颍阴（今河南省许昌市）人。三国至西晋时音律学家、文学家、藏书家，西晋开国功臣。为东汉司空荀爽曾孙。荀勖少年时聪慧好学。初仕于魏，为大将军曹爽掾属，后迁中书通事郎。曹爽被诛后，历任安阳令、骠骑从事中郎、廷尉正等职。又任大将军司马昭记室，屡进策谋，深见信任，与裴秀、羊祜共掌机密。西晋建立后，封济北郡侯。后拜中书监兼侍中，领著作。累官至光禄大夫、仪同三司、守尚书令。在尚书台时，核罢省中不称职之人。"],
                img: "extension/剑影/clan_xunxu.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xunxu.mp3"],
            },
            "clan_luyusheng": {
                sex: "female",
                group: "wu",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                clans: ["吴郡陆氏"],
                skills: ["clanzhishi","clanxiejin","clanzelieremake"],
                img: "extension/剑影/clan_luyusheng.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_luyusheng.mp3"],
            },
            "chi_jiaxu": {
                sex: "male",
                group: "qun",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["chi_mengmo","chi_pijian"],
                img: "extension/剑影/chi_jiaxu.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_jiaxu.mp3"],
            },
            "chi_zhenji": {
                sex: "female",
                group: "wei",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["chi_lingmeng","chi_shubi"],
                img: "extension/剑影/chi_zhenji.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_zhenji.mp3"],
            },
            "chi_huangyueying": {
                sex: "female",
                group: "qun",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["chi_shennie","chi_yingshan"],
                img: "extension/剑影/chi_huangyueying.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_huangyueying.mp3"],
            },
            "clan_xiahoudun": {
                sex: "male",
                group: "wei",
                hp: 2,
                maxHp:4,
                hujia:2,
                skills: ["clanliaozhi","clanzhenjie","clantongmen"],
                clans: ["谯郡夏侯氏"],
                img: "extension/剑影/clan_xiahoudun.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xiahoudun.mp3"],
            },
            "clan_xiahouyuan": {
                sex: "male",
                group: "wei",
                hp: 4,
                skills: ["clanyouxi","clanjianlei","clantongmen"],
                clans: ["谯郡夏侯氏"],
                img: "extension/剑影/clan_xiahouyuan.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xiahouyuan.mp3"],
            },
            "clan_xiahouba": {
                sex: "male",
                group: "wei",
                hp: 4,
                skills: ["clannige","clanyanzhi","clanjishu","clantongmen"],
                clans: ["谯郡夏侯氏"],
                img: "extension/剑影/clan_xiahouba.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xiahouba.mp3"],
            },
            "clan_xiahoushi": {
                sex: "female",
                group: "shu",
                hp: 3,
                skills: ["clanxinmai","clanyusui","clantongmen"],
                clans: ["谯郡夏侯氏"],
                img: "extension/剑影/clan_xiahoushi.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xiahoushi.mp3"],
            },
            "clan_xiahouxuan": {
                sex: "male",
                group: "wei",
                hp: 3,
                skills: ["clancixuan","clanqihai","clantongmen"],
                clans: ["谯郡夏侯氏"],
                img: "extension/剑影/clan_xiahouxuan.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xiahouxuan.mp3"],
            },
            "clan_xiahoumao": {
                sex: "male",
                group: "wei",
                hp: 4,
                skills: ["clanrenfu","clanyanzu","clantongmen"],
                clans: ["谯郡夏侯氏"],
                img: "extension/剑影/clan_xiahoumao.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xiahoumao.mp3"],
            },
            "clan_xiahouhui": {
                sex: "female",
                group: "jin",
                hp: 3,
                skills: ["clanfeishi","clanfeichen","clantongmen"],
                clans: ["谯郡夏侯氏"],
                img: "extension/剑影/clan_xiahouhui.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xiahouhui.mp3"],
            },
            "clan_xiahourong": {
                sex: "male",
                group: "wei",
                hp: 2,
                maxHp: 3,
                hujia: 2,
                skills: ["clandulie","clanjiaotan","clantongmen"],
                clans: ["谯郡夏侯氏"],
                img: "extension/剑影/clan_xiahourong.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xiahourong.mp3"],
            },
            "chi_pangfengyi": {
                sex: "female",
                group: "shu",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["chixingjue","chiyongtang"],
                img: "extension/剑影/chi_pangfengyi.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_pangfengyi.mp3"],
            },
            "clan_xunyue": {
                sex: "male",
                group: "wei",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                clans: ["颍川荀氏"],
                skills: ["clanjieji","clanshuji","clandaojie"],
                img: "extension/剑影/clan_xunyue.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_xunyue.mp3"],
            },
            "ying_wanglun": {
                sex: "male",
                group: "wei",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["yingtianshi","yingchongming"],
                img: "extension/剑影/ying_wanglun.jpg",
                dieAudios: ["ext:剑影/audio/die/ying_wanglun.mp3"],
            },
                    chi_caiwenji: {
                sex: "female",
                group: "qun",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["chiqianwen","chijuanxiang"],
                img: "extension/剑影/chi_caiwenji.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_caiwenji.mp3"],
            },
                        "clan_lukai": {
                sex: "male",
                group: "wu",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                clans: ["吴郡陆氏"],
                skills: ["clanjiantu","clanduye","clanzelieremake"],
                img: "extension/剑影/clan_lukai.jpg",
                dieAudios: ["ext:剑影/audio/die/clan_lukai.mp3"],
            },
                        "ying_xuncai": {
                sex: "female",
                group: "qun",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["yingjulei","yingzhichen"],
                img: "extension/剑影/ying_xuncai.jpg",
                dieAudios: ["ext:剑影/audio/die/ying_xuncai.mp3"],
            },
                        "ying_xuncan": {
                sex: "male",
                group: "wei",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["yingcigu","yingyouming"],
                img: "extension/剑影/ying_xuncan.jpg",
                dieAudios: ["ext:剑影/audio/die/ying_xuncan.mp3"],
            },
                                    "ying_yangzhong": {
                sex: "male",
                group: "wei",
                hp: 4,
                maxHp: 4,
                hujia: 0,
                skills: ["yingdangliao"],
                img: "extension/剑影/ying_yangzhong.jpg",
                dieAudios: ["ext:剑影/audio/die/ying_yangzhong.mp3"],
            },
                        "ying_wangshen": {
                sex: "male",
                group: "wei",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["yingtiaofeng","yingjiwang"],
                img: "extension/剑影/ying_wangshen.jpg",
                dieAudios: ["ext:剑影/audio/die/ying_wangshen.mp3"],
            },

                                chi_luxun: {
                sex: "male",
                group: "wu",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["chiquge","chishaoshan","chisunqi"],
                img: "extension/剑影/chi_luxun.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_luxun.mp3"],
            },
                                chi_zhangchunhua: {
                sex: "female",
                group: "wei",
                hp: 2,
                maxHp: 4,
                hujia: 0,
                skills: ["chifenqing","chisuhen","chiyuanque"],
                img: "extension/剑影/chi_zhangchunhua.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_zhangchunhua.mp3"],
            },
                                chi_zhanghuai: {
                sex: "female",
                group: "wu",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["chixuanzhao","chikonglan"],
                img: "extension/剑影/chi_zhanghuai.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_zhanghuai.mp3"],
            },
                                            chi_zhugeguo: {
                sex: "female",
                group: "qun",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["chihuangli","chisusu"],
                img: "extension/剑影/chi_zhugeguo.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_zhugeguo.mp3"],
            },
                                                        chi_guozhao: {
                sex: "female",
                group: "wei",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                skills: ["chishangjiao","chixiege"],
                img: "extension/剑影/chi_guozhao.jpg",
                dieAudios: ["ext:剑影/audio/die/chi_guozhao.mp3"],
            },
    niwo_xushu: ["male", "qun", 4, ["niwoaojian", "niwosuchen", "niwochoulu"]],
    niwo_xushi: ["female", "wu", 3, ["niwoyanliu", "niwoxiangming", "niwochoulu"]],
    niwo_xurong: ["male", "qun", 4, ["niwoxuejiu", "niwoshulie", "niwochoulu"]],
    niwo_wangyi: ["female", "wei", 3, ["niwoxiapo", "niwoshucai", "niwochoulu"]],
    niwo_hanlong: ["male", "wei", 4, ["niwozhengtu", "niwonilin", "niwochoulu"]],
    niwo_zhouchu: ["male", "wu", 3, ["niwoxungu", "niwoxianwang", "niwochoulu"]],
    niwo_zhanghua: ["male", "jin", 4, ["niwoqianzhun", "niwobailan", "niwoyinbing"]],
    niwo_zhaoyun: ["male", "qun", 4, ["niwotalan", "niwoyuhe", "niwochoulu"]],



        },
        translate: {
            "clan_wangqian": "族王倩",
            "剑影": "剑影",
            "clan_wangqian_prefix": "族",
            "clan_xunxu": "族荀勖",
            "clan_xunxu_prefix": "族",
            "clan_luyusheng": "族陆郁生",
            "clan_luyusheng_prefix": "族",
            "chi_jiaxu": "炽贾诩",
            "chi_jiaxu_prefix": "炽",
            "chi_zhenji": "炽甄宓",
            "chi_zhenji_prefix": "炽",
            "chi_huangyueying": "炽黄月英",
            "chi_huangyueying_prefix": "炽",
            "clan_xiahoudun": "族夏侯惇",
            "clan_xiahouyuan": "族夏侯渊",
            "clan_xiahouba": "族夏侯霸",
            "clan_xiahoushi": "族夏侯涓",
            "clan_xiahouxuan": "族夏侯玄",
            "clan_xiahoumao": "族夏侯楙",
            "clan_xiahouhui": "族夏侯徽",
            "clan_xiahourong": "族夏侯荣",
            "clan_xiahoudun_prefix": "族",
            "clan_xiahouyuan_prefix": "族",
            "clan_xiahouba_prefix": "族",
            "clan_xiahoushi_prefix": "族",
            "clan_xiahouxuan_prefix": "族",
            "clan_xiahoumao_prefix": "族",
            "clan_xiahouhui_prefix": "族",
            "clan_xiahourong_prefix": "族",
            "chi_pangfengyi": "炽庞凤衣",
            "chi_pangfengyi_prefix": "炽",
            "clan_xunyue": "族荀悦",
            "ying_wanglun": "盈王沦",
            "clan_xunyue_prefix": "族",
            "ying_wanglun_prefix": "盈",
            "chi_caiwenji": "炽蔡琰",
            "chi_caiwenji_prefix": "炽",
            "ying_xuncan_prefix": "盈",
            "ying_xuncai_prefix": "盈",
            "clan_lukai_prefix": "族",
              "ying_wangshen_prefix": "盈",
                          "ying_xuncan": "盈荀粲",
                                        "ying_yangzhong_prefix": "盈",
                          "ying_yangzhong": "盈杨众",
            "ying_xuncai": "盈荀采",
            "clan_lukai": "族陆凯",
              "ying_wangshen": "盈王沈",
            "chi_zhangchunhua": "炽张春华",
            "chi_zhangchunhua_prefix": "炽",
                        "chi_zhanghuai": "炽张怀",
            "chi_zhanghuai_prefix": "炽",
                        "chi_guozhao": "炽郭照",
            "chi_guozhao_prefix": "炽",
                        "chi_luxun": "炽陆逊",
            "chi_luxun_prefix": "炽",
                                    "chi_zhugeguo": "炽诸葛果",
            "chi_zhugeguo_prefix": "炽",
                niwo_xushu: "逆徐庶",
    niwo_xushi: "逆徐氏",
    niwo_xurong: "逆徐荣",
    niwo_wangyi: "逆王异",
    niwo_hanlong: "逆韩龙",
    niwo_zhouchu: "逆周处",
    niwo_zhanghua: "逆张华",
    niwo_zhaoyun: "逆赵云",
    
    niwo_xushu_prefix: "逆",
    niwo_xushi_prefix: "逆",
    niwo_xurong_prefix: "逆",
    niwo_wangyi_prefix: "逆",
    niwo_hanlong_prefix: "逆",
    niwo_zhouchu_prefix: "逆",
    niwo_zhanghua_prefix: "逆",
    niwo_zhaoyun_prefix: "逆",
        },
    },
    card: {
        card: {
        },
        translate: {
        },
        list: [],
    },
    skill: {
        skill: {
            clanzhuoxi: {
                audio: "ext:custom:clanzhuoxi",
                forced: true,
                locked: true,
                Zhuanhuanji: true,
                limited: true,
                skillAnimate: true,
                animationColor: "water",
                trigger: {
                    global: ["useCard","respond"],
                },
                filter: function(event, player) {
                    if (player.hasSkill('clanzhuoxi_used')) return false; // 限定技已用
                    var source = event.player;
                    if (!source) return false;
                    
                    // 距离小于1
                    var dist = player.distanceTo(source);
                    if (dist >= 1) return false;
                    
                    var card = event.card;
                    if (!card) return false;
                    
                    // 基本牌或非延时锦囊
                    if (get.type(card) == 'basic' || (get.type(card) == 'trick' && !card.isDelayed)) {
                      // 判断是实体牌还是转化牌
                      if (!card.cards || card.cards.length == 0) {
                        return false; // 虚拟牌不触发
                      }
                      
                      var isTransformed = false;
                      for (var i = 0; i < card.cards.length; i++) {
                        if (card.cards[i].name != card.name) {
                          isTransformed = true;
                          break;
                        }
                      }
                      
                      // 阴：实体牌触发
                      // 阳：转化牌触发
                      if (!player.storage.clanzhuoxi_yin) {
                        // 阴状态，检查是否为实体牌
                        return !isTransformed;
                      } else {
                        // 阳状态，检查是否为转化牌
                        return isTransformed;
                      }
                    }
                    return false;
                  },
                content: function() {
                    "step 0";
                    
                    var card = trigger.card;
                    var isYin = !player.storage.clanzhuoxi_yin;
                    
                    // 获得该牌
                    var cards = trigger.cards.filter(function(card) {
                      return get.position(card, true) == 'd' || get.position(card, true) == 'o';
                    });
                    if (cards.length > 0) {
                      player.gain(cards, 'gain2');
                      game.log(player, '获得了', cards);
                    }
                    
                    // 重置武将牌
                    player.link(false); // 横置改为竖置
                    if (player.isTurnedOver()) {
                      player.turnOver(); // 翻面改为正面
                    }
                    
                    if (!isYin) {
                      // 阳状态，额外失去1点体力
                      player.loseHp(1);
                      game.log(player, '（阳）失去了1点体力');
                    } else {
                      game.log(player, '（阴）重置了武将牌');
                    }
                    
                    // 切换转换技状态
                    player.storage.clanzhuoxi_yin = !player.storage.clanzhuoxi_yin;
                    
                    // 标记限定技已用
                    player.addSkill('clanzhuoxi_used');
                    player.awakenSkill("clanzhuoxi");
                  },
                intro: {
                    content: function(storage, player) {
                      if (!player.storage.clanzhuoxi_yin) {
                        return "转换技 - 阴：实体牌时触发";
                      } else {
                        return "转换技 - 阳：转化牌时触发";
                      }
                    },
                },
                init: function(player) {
                    if (!player.storage.clanzhuoxi_yin) {
                      player.storage.clanzhuoxi_yin = false; // 初始为阴
                    }
                  },
                mark: true,
                marktext: "☯",
                subSkill: {
                    used: {
                        charlotte: true,
                        mark: true,
                        intro: {
                            content: "已使用过擢息",
                        },
                        sub: true,
                        sourceSkill: "clanzhuoxi",
                        "_priority": 0,
                    },
                },
                skillAnimation: true,
                "_priority": 0,
            },
            clanxiarong: {
    audio: "ext:custom:clanxiarong",
    enable: ["phaseUse","chooseToUse","chooseToRespond"],
    limited: true,
    skillAnimation: true,
    animationColor: "golden",
    filter: function(event, player) {
        if (player.hasSkill('clanxiarong_used')) return false;
        return true;
    },
    chooseButton: {
        dialog: function(event, player) {
            var list = [];
            var basicCards = ['sha', 'shan', 'tao', 'jiu', 'wuzhong', 'juedou', 'huogong', 'jiedao', 'wuxie', 'wugu', 'taoyuan', 'nanman', 'wanjian'];
            
            for (var i = 0; i < basicCards.length; i++) {
                var name = basicCards[i];
                if (!lib.card[name]) continue;
                
                var card = { name: name, isCard: true };
                var canUse = false;
                
                if (event.type == 'phase') {
                    canUse = player.hasUseTarget(card);
                } else if (event.filterCard) {
                    canUse = event.filterCard(card, player, event);
                } else {
                    canUse = true;
                }
                
                if (!canUse) continue;
                
                var X = get.cardNameLength(name);
                player.storage.clanxiarong_usedX = player.storage.clanxiarong_usedX || [];
                if (player.storage.clanxiarong_usedX.includes(X)) continue;
                
                var hasTarget = game.hasPlayer(function(current) {
                    return current != player && player.distanceTo(current) >= X;
                });
                if (hasTarget) {
                    list.push(['', '', name]);
                }
            }
            return ui.create.dialog('遐容：选择要使用的牌', [list, 'vcard']);
        },
        filter: function(button, player) {
            return true;
        },
        check: function(button) {
            var player = _status.event.player;
            return player.getUseValue({ name: button.link[2] });
        },
        backup: function(links, player) {
            return {
                audio: "clanxiarong",
                popname: true,
                filterCard: () => false,
                selectCard: -1,
                viewAs: { name: links[0][2] },
                onuse: function(result, player) {
                    player.addSkill('clanxiarong_used');
                },
                precontent: function() {
                    "step 0";
                    player.turnOver();
                    
                    var cardname = event.result.card.name;
                    var X = get.cardNameLength(cardname);
                    player.storage.clanxiarong_usedX = player.storage.clanxiarong_usedX || [];
                    player.storage.clanxiarong_usedX.push(X);
                    player.storage.clanxiarong_currentX = X;
                    player.storage.clanxiarong_currentCardName = cardname;
                    
                    game.log(player, '发动遐容，牌名字数X=', X);
                    
                    var targets = game.filterPlayer(function(target) {
                        return target != player && player.distanceTo(target) >= X;
                    });
                    
                    if (targets.length == 0) {
                        game.log('没有距离不小于', X, '的角色');
                        event.finish();
                        delete event.result;
                        return;
                    }
                    
                    player.chooseTarget('选择一名与你距离不小于' + X + '的角色', true, function(card, player, target) {
                        return targets.includes(target);
                    }).set('ai', function(target) {
                        return -get.attitude(_status.event.player, target);
                    });
                    
                    "step 1";
                    if (!result.bool || !result.targets || !result.targets.length) {
                        game.log('未选择目标');
                        event.finish();
                        delete event.result;
                        return;
                    }
                    
                    var target = result.targets[0];
                    event.xrtarget = target;
                    player.line(target, 'green');
                    player.viewHandcards(target);
                    
                    var myCards = player.getCards('h');
                    var targetCards = target.getCards('h');
                    var allCards = myCards.concat(targetCards);
                    var X = player.storage.clanxiarong_currentX;
                    
                    if (allCards.length == 0) {
                        game.log('双方都没有手牌');
                        event.finish();
                        delete event.result;
                        return;
                    }
                    
                    var validCards = allCards.filter(function(card) {
                        return get.cardNameLength(card) <= X;
                    });
                    
                    if (validCards.length == 0) {
                        game.log('没有符合条件的牌');
                        event.finish();
                        delete event.result;
                        return;
                    }
                    
                    var next = player.chooseButton(['选择牌名字数之和为' + X + '的牌（可多选）', validCards], [1, validCards.length], true);
                    next.set('filterButton', function(button) {
                        var selected = ui.selected.buttons || [];
                        var sum = 0;
                        for (var i = 0; i < selected.length; i++) {
                            sum += get.cardNameLength(selected[i].link);
                        }
                        sum += get.cardNameLength(button.link);
                        return sum <= _status.event.targetX;
                    });
                    next.set('selectButton', function() {
                        var selected = ui.selected.buttons || [];
                        var sum = 0;
                        for (var i = 0; i < selected.length; i++) {
                            sum += get.cardNameLength(selected[i].link);
                        }
                        if (sum == _status.event.targetX) {
                            return [selected.length, selected.length];
                        }
                        return [1, validCards.length];
                    });
                    next.set('filterOk', function() {
                        var selected = ui.selected.buttons || [];
                        var sum = 0;
                        for (var i = 0; i < selected.length; i++) {
                            sum += get.cardNameLength(selected[i].link);
                        }
                        return sum == _status.event.targetX;
                    });
                    next.set('targetX', X);
                    next.set('ai', function(button) {
                        var selected = ui.selected.buttons || [];
                        var sum = 0;
                        for (var i = 0; i < selected.length; i++) {
                            sum += get.cardNameLength(selected[i].link);
                        }
                        var remaining = _status.event.targetX - sum;
                        var cardLen = get.cardNameLength(button.link);
                        if (cardLen == remaining) return 10;
                        if (cardLen < remaining) return 5;
                        return 0;
                    });
                    
                    "step 2";
                    if (!result.bool || !result.buttons || !result.buttons.length) {
                        game.log('未选择牌或取消');
                        event.finish();
                        delete event.result;
                        return;
                    }
                    
                    var selectedCards = [];
                    for (var i = 0; i < result.buttons.length; i++) {
                        selectedCards.push(result.buttons[i].link);
                    }
                    
                    var sum = 0;
                    for (var i = 0; i < selectedCards.length; i++) {
                        sum += get.cardNameLength(selectedCards[i]);
                    }
                    var X = player.storage.clanxiarong_currentX;
                    
                    game.log('已选择', selectedCards.length, '张牌，名字数之和为', sum);
                    
                    if (sum != X) {
                        game.log('选择的牌名字数之和(' + sum + ')不等于' + X + '，技能取消');
                        event.finish();
                        delete event.result;
                        return;
                    }
                    
                    // 将这些牌转化为对应牌
                    var cardname = player.storage.clanxiarong_currentCardName;
                    event.result.card = get.autoViewAs({ name: cardname }, selectedCards);
                    event.result.cards = selectedCards;
                    game.log(player, '将', selectedCards, '转化为【', cardname, '】');
                    
                    var X = player.storage.clanxiarong_currentX;
                    
                    // 该角色与你的距离-X（累加）
                    if (!event.xrtarget.storage.clanxiarong_distanceMap) {
                        event.xrtarget.storage.clanxiarong_distanceMap = {};
                    }
                    if (!event.xrtarget.storage.clanxiarong_distanceMap[player.playerid]) {
                        event.xrtarget.storage.clanxiarong_distanceMap[player.playerid] = 0;
                    }
                    event.xrtarget.storage.clanxiarong_distanceMap[player.playerid] -= X;
                    event.xrtarget.addTempSkill('clanxiarong_distance', {global: 'roundStart'});
                    event.xrtarget.markSkill('clanxiarong_distance');
                    
                    // 其他角色与你的距离+X（累加）
                    game.countPlayer(function(current) {
                        if (current != player && current != event.xrtarget) {
                            if (!current.storage.clanxiarong_distanceMap) {
                                current.storage.clanxiarong_distanceMap = {};
                            }
                            if (!current.storage.clanxiarong_distanceMap[player.playerid]) {
                                current.storage.clanxiarong_distanceMap[player.playerid] = 0;
                            }
                            current.storage.clanxiarong_distanceMap[player.playerid] += X;
                            current.addTempSkill('clanxiarong_distance', {global: 'roundStart'});
                            current.markSkill('clanxiarong_distance');
                        }
                    });
                    
                    game.log(player, '令', event.xrtarget, '与自己的距离-', X, '，其他角色与自己的距离+', X);
                    player.awakenSkill("clanxiarong");
                }
            };
        },
        prompt: function(links, player) {
            return '视为使用【' + get.translation(links[0][2]) + '】（名字长度:' + get.cardNameLength(links[0][2]) + '）';
        },
    },
    ai: {
        order: 9,
        result: {
            player: 1,
        },
        respondShan: true,
        respondSha: true,
        skillTagFilter: function(player) {
            if (player.hasSkill('clanxiarong_used')) return false;
        },
    },
    group: "clanxiarong_roundClear",
    subSkill: {
        used: {
            charlotte: true,
            mark: true,
            intro: {
                content: "已使用过遐容",
            },
            sub: true,
            sourceSkill: "clanxiarong",
        },
        roundClear: {
            trigger: {
                global: "roundStart",
            },
            forced: true,
            popup: false,
            charlotte: true,
            content: function() {
                player.storage.clanxiarong_usedX = [];
                game.log(player, '遐容的X限制已重置');
            },
            sub: true,
            sourceSkill: "clanxiarong",
        },
        distance: {
            charlotte: true,
            onremove: function(player) {
                delete player.storage.clanxiarong_distanceMap;
            },
            mark: true,
            marktext: "容",
            intro: {
                content: function(storage, player) {
                    if (!player.storage.clanxiarong_distanceMap) return '距离未调整';
                    
                    var str = '本轮距离调整：<br>';
                    var hasAny = false;
                    
                    for (var pid in player.storage.clanxiarong_distanceMap) {
                        var target = game.findPlayer(function(current) {
                            return current.playerid == pid;
                        });
                        if (target) {
                            var value = player.storage.clanxiarong_distanceMap[pid];
                            if (value != 0) {
                                hasAny = true;
                                str += '与' + get.translation(target) + '的距离';
                                if (value > 0) {
                                    str += '<span style="color:red">+' + value + '</span><br>';
                                } else {
                                    str += '<span style="color:green">' + value + '</span><br>';
                                }
                            }
                        }
                    }
                    
                    if (!hasAny) return '距离未调整';
                    return str;
                },
            },
            mod: {
                globalFrom: function(from, to, distance) {
                    if (from.storage.clanxiarong_distanceMap && from.storage.clanxiarong_distanceMap[to.playerid]) {
                        return distance + from.storage.clanxiarong_distanceMap[to.playerid];
                    }
                },
                globalTo: function(from, to, distance) {
                    if (to.storage.clanxiarong_distanceMap && to.storage.clanxiarong_distanceMap[from.playerid]) {
                        return distance + to.storage.clanxiarong_distanceMap[from.playerid];
                    }
                },
            },
            sub: true,
            sourceSkill: "clanxiarong",
        },
    },
    mark: true,
    intro: {
        content: "limited",
    },
    init: (player, skill) => (player.storage[skill] = false),
},

           clanxunfu: {
    audio: "ext:custom:clanxunfu",
    forced: true,
    locked: true,
    trigger: {
        target: "useCardToTargeted",
    },
    filter: function(event, player) {
        var cardType = get.type(event.card);
        if (cardType == 'equip') {
            return false;
        }
        
        player.storage.clanxunfu_round = player.storage.clanxunfu_round || [];
        
        if (player.storage.clanxunfu_round.includes(event.card.name)) {
            return false;
        }
        
        return true;
    },
    content: function() {
        "step 0";
        var cardColor = get.color(trigger.card);
        var cardName = trigger.card.name;
        var cardType = get.type2(trigger.card);
        var source = trigger.player;
        
        event.cardColor = cardColor;
        event.cardName = cardName;
        event.cardType = cardType;
        event.source = source;
        
        player.logSkill('clanxunfu', source || []);
        
        if (!source) {
            event.shouldRecord = true;
            event.goto(3);
            return;
        }
        
        var otherColor = (cardColor == 'red') ? 'black' : 'red';
        event.otherColor = otherColor;
        
        var otherCards = source.getCards('h', function(card) {
            return get.color(card) == otherColor;
        });
        
        if (otherCards.length == 0) {
            player.line(source, 'green');
            game.log(source, '没有', otherColor == 'red' ? '红色' : '黑色', '手牌');
            trigger.getParent().excluded.add(player);
            game.log(trigger.card, '对', player, '无效');
            event.shouldRecord = false;
            event.finish();
            return;
        }
        
        // 修改这里：将 true 改为 false，允许取消
        source.chooseCard('h', '徇覆：展示一张' + (otherColor == 'red' ? '红色' : '黑色') + '手牌，否则此牌对' + get.translation(player) + '无效', false, function(card) {
            return get.color(card) == _status.event.otherColor;
        }).set('otherColor', otherColor).set('ai', function(card) {
            var player = _status.event.player;
            var target = _status.event.getParent().player;
            if (get.attitude(player, target) > 0) return get.value(card);
            return 1;
        });
        
        "step 1";
        if (result.bool && result.cards && result.cards.length) {
            player.line(event.source, 'green');
            event.source.showCards(result.cards, game.players);
            event.shouldRecord = true;
        } else {
            // 无论是没有选牌还是点了取消，都让牌无效
            player.line(event.source, 'green');
            trigger.getParent().excluded.add(player);
            game.log(trigger.card, '对', player, '无效');
            event.shouldRecord = false;
        }
        
        "step 2";
        if (!event.shouldRecord) {
            event.finish();
            return;
        }
        
        "step 3";
        player.storage.clanxunfu_round = player.storage.clanxunfu_round || [];
        player.storage.clanxunfu_tricks = player.storage.clanxunfu_tricks || [];
        
        if (!player.storage.clanxunfu_round.includes(event.cardName)) {
            player.storage.clanxunfu_round.push(event.cardName);
        }
        
        if (event.cardType == 'trick') {
            if (!player.storage.clanxunfu_tricks.includes(event.cardName)) {
                player.storage.clanxunfu_tricks.push(event.cardName);
            }
        }
        
        player.markSkill('clanxunfu');
    },
    intro: {
        content: function(storage, player) {
            var allCards = player.storage.clanxunfu_round || [];
            var tricks = player.storage.clanxunfu_tricks || [];
            var X = Math.max(1, tricks.length);
            
            var str = '';
            
            if (allCards.length > 0) {
                str += '本轮已记录(' + allCards.length + '种)：<br>';
                str += allCards.map(n => get.translation(n)).join('、');
                str += '<br><br>';
            } else {
                str += '本轮尚未记录<br><br>';
            }
            
            if (tricks.length > 0) {
                str += '锦囊牌记录(' + tricks.length + '种，含延时)：<br>';
                str += tricks.map(n => get.translation(n)).join('、');
                str += '<br><br>';
            } else {
                str += '尚未记录锦囊牌<br><br>';
            }
            
            str += '<span class="bluetext">当前X值：' + X + '</span>';
            
            return str;
        },
    },
    mark: true,
    init: function(player) {
        player.storage.clanxunfu_round = [];
        player.storage.clanxunfu_tricks = [];
    },
    group: "clanxunfu_roundClear",
    subSkill: {
        roundClear: {
            trigger: {
                global: "roundStart",
            },
            forced: true,
            popup: false,
            charlotte: true,
            content: function() {
                player.storage.clanxunfu_round = [];
                player.storage.clanxunfu_tricks = [];
                player.markSkill('clanxunfu');
            },
            sub: true,
            sourceSkill: "clanxunfu",
            "_priority": 0,
        },
    },
    "_priority": 0,
},

            clanfufeng: {
                audio: "ext:custom:clanfufeng",
                forced: true,
                locked: true,
                trigger: {
                    player: "showCardsEnd",
                },
                filter: function(event, player) {
                    // ✅ 检查是否正在执行
                    if (player.hasSkill('clanfufeng_executing')) return false;
                    
                    // ✅ 检查是否已处理过这个事件
                    if (event._clanfufeng_processed) return false;
                    
                    return event.cards && event.cards.length > 0;
                },
                content: function() {
                    "step 0";
                    // ✅ 标记事件已处理
                    trigger._clanfufeng_processed = true;
                    
                    // ✅ 添加执行中标记
                    player.addTempSkill('clanfufeng_executing');
                    
                    // ✅ 获取展示的第一张牌的颜色
                    var card = trigger.cards[0];  // ✅ 改为获取第一张牌
                    var color = get.color(card);
                    var otherColor = (color == 'red') ? 'black' : 'red';
                   
                    var otherCards = player.getCards('h', function(c) {
                      return get.color(c) == otherColor;
                    });
                   
                    if (otherCards.length == 0) {
                      event.finish();
                      return;
                    }
                   
                    game.log(player, '展示了', color == 'red' ? '红色' : '黑色', '牌');
                   
                    var recastCards = otherCards.filter(function(c) {
                      return player.canRecast(c);
                    });
                   
                    if (recastCards.length > 0) {
                      game.log(player, '重铸', otherColor == 'red' ? '红色' : '黑色', '手牌：', recastCards);
                      player.recast(recastCards);
                    }
                   
                    "step 1";
                    var X = Math.max(1, (player.storage.clanxunfu_tricks || []).length);
                    var numToPlace = Math.max(1, Math.floor(X / 2));
                   
                    game.log('X=', X, '，将', numToPlace, '张牌置于牌堆顶');
                   
                    var cards = player.getCards('h');
                    if (cards.length == 0) {
                      game.log(player, '没有手牌可置于牌堆顶');
                      event.goto(3);
                      return;
                    }
                   
                    player.chooseCard('h', '选择' + numToPlace + '张牌置于牌堆顶', [1, Math.min(numToPlace, cards.length)], true).set('ai', function(card) {
                      return -get.value(card);
                    });
                   
                    "step 2";
                    if (result.bool && result.cards && result.cards.length) {
                      var cards = result.cards;
                      player.lose(cards, ui.cardPile, 'insert');
                      game.log(player, '将', cards.length, '张牌置于了牌堆顶');
                    }
                    
                    "step 3";
                    player.removeSkill('clanfufeng_executing');
                },
                subSkill: {
                    executing: {
                        charlotte: true,
                        sub: true,
                        sourceSkill: "clanfufeng",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            clanyilv: {
                audio: "ext:custom:clanyilv",
                forced: true,
                locked: true,
                trigger: {
                    player: ["changeHp"],
                    global: "phaseBegin",
                },
                filter: function(event, player, name) {
                    if (name == 'phaseBegin') {
                      // 一号位的回合开始
                      var firstSeat = game.findPlayer(function(current) {
                        return current.getSeatNum() == 1;
                      });
                      return event.player == firstSeat;
                    }
                    // 体力值发生变化
                    return true;
                  },
                content: function() {
                    "step 0";
                    // 计算X值（徇覆记录的锦囊牌数）
                    var X = Math.max(1, (player.storage.clanxunfu_tricks || []).length);
                    player.storage.clanyilv_currentX = X;
                    
                    game.log(player, '发动绎律，X=', X);
                    
                    // 选择一种颜色
                    player.chooseControl('red', 'black')
                      .set('prompt', '选择一种颜色')
                      .set('ai', function() {
                        return Math.random() > 0.5 ? 'red' : 'black';
                      });
                    
                    "step 1";
                    var chosenColor = result.control;
                    var otherColor = (chosenColor == 'red') ? 'black' : 'red';
                    event.chosenColor = chosenColor;
                    event.otherColor = otherColor;
                    
                    game.log(player, '选择了', chosenColor == 'red' ? '红色' : '黑色');
                    
                    // 亮出牌堆顶X张牌
                    var X = player.storage.clanyilv_currentX;
                    var cards = get.cards(X);
                    player.showCards(cards, '绎律：亮出牌堆顶' + X + '张牌');
                    event.shownCards = cards;
                    
                    "step 2";
                    // 筛选出另一种颜色的牌
                    var otherColorCards = event.shownCards.filter(function(card) {
                      return get.color(card) == event.otherColor;
                    });
                    var remainCards = event.shownCards.filter(function(card) {
                      return get.color(card) != event.otherColor;
                    });
                    
                    event.otherColorCards = otherColorCards;
                    event.remainCards = remainCards;
                    
                    game.log('其中', event.otherColor == 'red' ? '红色' : '黑色', '牌：', otherColorCards);
                    game.log('其余牌：', remainCards);
                    
                    if (otherColorCards.length == 0) {
                      game.log('没有另一种颜色的牌可使用');
                      event.goto(4);
                      return;
                    }
                    
                    // 依次使用另一种颜色的牌
                    event.currentIndex = 0;
                    
                    "step 3";
                    if (event.currentIndex < event.otherColorCards.length) {
                      var card = event.otherColorCards[event.currentIndex];
                      if (player.hasUseTarget(card)) {
                        player.chooseUseTarget(card, true, '是否使用【' + get.translation(card.name) + '】？');
                      } else {
                        game.log(player, '无法使用', card);
                      }
                      event.currentIndex++;
                      event.redo();
                    } else {
                      // 所有另一种颜色的牌都使用完了
                      event.goto(4);
                    }
                    
                    "step 4";
                    // 获得其余的牌
                    if (event.remainCards.length > 0) {
                      player.gain(event.remainCards, 'gain2');
                      game.log(player, '获得了', event.remainCards);
                    }
                  },
                "_priority": 0,
            },
            clanzhishi: {
                audio: "ext:custom:clanzhishi",
                enable: "phaseUse",
                filter: function(event, player) {
                    // 检查是否有牌
                    if (!player.countCards('he')) return false;
                    
                    // 计算本回合已发动次数
                    var used = 0;
                    var history = player.getHistory('useSkill', function(evt) {
                      return evt.skill == 'clanzhishi';
                    });
                    used = history.length;
                    
                    // 可发动次数 = 1 + 额外次数
                    var maxUse = 1 + (player.storage.clanzhishi_extra || 0);
                    return used < maxUse;
                  },
                filterCard: true,
                position: "he",
                selectCard: 1,
                filterTarget: true,
                selectTarget: 1,
                check: function(card) {
                    return 6 - get.value(card);
                  },
                intro: {
                    content: function(storage, player) {
                      var str = '出牌阶段限一次，你可以将一张牌转化为对应花色的牌置入一名角色的对应区域：<br>♥红桃→兵粮寸断（判定区），红色：你与其各摸X张牌<br>♦方片→朱雀羽扇（装备区），红色：你与其各摸X张牌<br>♣梅花→藤甲（装备区），黑色：你与其各弃X张牌<br>♠黑桃→闪电（判定区），黑色：你与其各弃X张牌<br>（X为其该区域的牌数）<br>若X不大于你的体力值，你可再次发动【携襟】';
                      if (player.storage.clanzhishi_extra) {
                        str += '<br><br><span class="firetext">本回合可额外发动' + player.storage.clanzhishi_extra + '次</span>';
                      }
                      return str;
                    },
                },
                content: function() {
                    "step 0";
                    var card = cards[0];
                    var suit = get.suit(card);
                    var number = get.number(card);
                    
                    // 根据花色确定置入的牌（保留原牌点数）
                    var cardMap = {
                      'heart': { name: 'bingchig', suit: 'heart', area: 'j', desc: '♥兵粮寸断' },
                      'diamond': { name: 'zhuque', suit: 'diamond', area: 'e', desc: '♦朱雀羽扇' },
                      'club': { name: 'tengjia', suit: 'club', area: 'e', desc: '♣藤甲' },
                      'spade': { name: 'shandian', suit: 'spade', area: 'j', desc: '♠闪电' }
                    };
                    
                    var cardInfo = cardMap[suit];
                    if (!cardInfo) {
                      event.finish();
                      return;
                    }
                    
                    event.cardInfo = cardInfo;
                    event.color = (suit == 'heart' || suit == 'diamond') ? 'red' : 'black';
                    
                    game.log(player, '将', card, '转化为', cardInfo.desc);
                    
                    // 将原牌从玩家处移除（不进入弃牌堆）
                    player.lose(card, ui.special);
                    player.$throw(card, 1000);
                    
                    "step 1";
                    game.delayx();
                    
                    "step 2";
                    // 创建转化后的牌，保留原牌点数
                    var originalCard = cards[0];
                    var transformedCard = game.createCard(event.cardInfo.name, event.cardInfo.suit, get.number(originalCard));
                    transformedCard.cards = [originalCard]; // 记录转化前的牌
                    transformedCard.isCard = true;
                    
                    event.transformedCard = transformedCard;
                    
                    game.log('转化为', transformedCard, '置入', target, '的', event.cardInfo.area == 'j' ? '判定区' : '装备区');
                    
                    // 直接将转化后的牌放入对应区域
                    if (event.cardInfo.area == 'j') {
                      // 判定区：添加延时锦囊
                      if (!target.hasDisabled(event.cardInfo.area)) {
                        target.$gain2(transformedCard, false);
                        target.addJudge(transformedCard);
                        game.log(target, '的判定区被置入了', transformedCard);
                      }
                    } else {
                      // 装备区：添加装备
                      if (!target.hasDisabled(event.cardInfo.area)) {
                        target.$gain2(transformedCard, false);
                        game.delayx();
                        target.equip(transformedCard);
                        game.log(target, '装备了', transformedCard);
                      }
                    }
                    
                    "step 3";
                    // 等待牌进入区域
                    game.delayx();
                    
                    "step 4";
                    // 计算X（目标该区域的牌数）
                    var X = target.countCards(event.cardInfo.area);
                    event.X = X;
                    
                    if (X == 0) {
                      game.log('目标该区域牌数为0，不执行摸牌/弃牌效果');
                      event.goto(6);
                      return;
                    }
                    
                    game.log('目标该区域牌数 X=', X);
                    
                    if (event.color == 'red') {
                      // 红色：你与其各摸X张牌
                      if (target == player) {
                        game.log(player, '摸', X * 2, '张牌');
                        player.draw(X * 2);  // 如果目标是自己，摸2X张牌
                      } else {
                        game.log(player, '与', target, '各摸', X, '张牌');
                        player.draw(X);
                        target.draw(X);
                      }
                    } else {
                      // 黑色：你与其各弃X张牌
                      if (target == player) {
                        game.log(player, '弃置', X * 2, '张牌');
                        player.chooseToDiscard(X * 2, true);  // 如果目标是自己，弃2X张牌
                      } else {
                        game.log(player, '与', target, '各弃', X, '张牌');
                        player.chooseToDiscard(X, true);
                        target.chooseToDiscard(X, true);
                      }
                    }
                    
                    "step 5";
                    game.delayx();
                    
                    "step 6";
                    // 若X不大于你的体力值，你可再次发动【携襟】
                    if (event.X <= player.hp) {
                      game.log('X(', event.X, ')不大于体力值(', player.hp, ')，可再次发动【携襟】');
                      if (!player.storage.clanxiejin_extra) player.storage.clanxiejin_extra = 0;
                      player.storage.clanxiejin_extra++;
                      player.markSkill('clanxiejin');
                      game.log(player, '【携襟】可额外发动次数+1');
                    }
                  },
                ai: {
                    order: 8,
                    result: {
                        target: function(player, target) {
                            if (target == player) return 1;  // 选自己获得收益
                            if (target.hasJudge('bingchig') && target.hasJudge('shandian')) return 0;
                            return -1;
                          },
                    },
                },
                "_priority": 0,
            },
            clanxiejin: {
                audio: "ext:custom:clanxiejin",
                enable: "phaseUse",
                filter: function(event, player) {
                    // 检查是否有可弃置的区域
                    if (player.countCards('hej') == 0) return false;
                    
                    // 计算本回合已发动次数
                    var used = 0;
                    var history = player.getHistory('useSkill', function(evt) {
                      return evt.skill == 'clanxiejin';
                    });
                    used = history.length;
                    
                    // 可发动次数 = 1 + 额外次数
                    var maxUse = 1 + (player.storage.clanxiejin_extra || 0);
                    return used < maxUse;
                  },
                content: function() {
                    "step 0";
                    // 选择要弃置的区域
                    var choices = [];
                    var choiceMap = {};
                    
                    if (player.countCards('h') > 0) {
                      choices.push('hand:手牌区(' + player.countCards('h') + '张)');
                      choiceMap['hand:手牌区(' + player.countCards('h') + '张)'] = 'h';
                    }
                    if (player.countCards('e') > 0) {
                      choices.push('equip:装备区(' + player.countCards('e') + '张)');
                      choiceMap['equip:装备区(' + player.countCards('e') + '张)'] = 'e';
                    }
                    if (player.countCards('j') > 0) {
                      choices.push('judge:判定区(' + player.countCards('j') + '张)');
                      choiceMap['judge:判定区(' + player.countCards('j') + '张)'] = 'j';
                    }
                    
                    if (choices.length == 0) {
                      event.finish();
                      return;
                    }
                    
                    event.choiceMap = choiceMap;
                    
                    player.chooseControl(choices)
                      .set('prompt', '选择要弃置的区域')
                      .set('choiceList', choices.map(function(choice) {
                        return choice.split(':')[1];
                      }))
                      .set('ai', function() {
                        // AI选择牌最少的区域
                        var minIndex = 0;
                        var minCount = Infinity;
                        for (var i = 0; i < choices.length; i++) {
                          var area = choiceMap[choices[i]];
                          var count = player.countCards(area);
                          if (count < minCount) {
                            minCount = count;
                            minIndex = i;
                          }
                        }
                        return choices[minIndex];
                      });
                    
                    "step 1";
                    event.discardArea = event.choiceMap[result.control];
                    
                    var areaName = {
                      'h': '手牌区',
                      'e': '装备区',
                      'j': '判定区'
                    };
                    event.discardAreaName = areaName[event.discardArea];
                    
                    // 弃置该区域的所有牌
                    var cards = player.getCards(event.discardArea);
                    event.playerDiscardNum = cards.length;
                    player.discard(cards);
                    
                    game.log(player, '弃置了', event.discardAreaName, '的所有牌(', cards.length, '张)');
                    
                    "step 2";
                    game.delayx();
                    
                    "step 3";
                    // 选择一名角色
                    player.chooseTarget('选择一名角色执行后续效果', true)
                      .set('ai', function(target) {
                        var player = _status.event.player;
                        if (target == player) return 1;
                        return Math.random();
                      });
                    
                    "step 4";
                    if (!result.bool || !result.targets || !result.targets.length) {
                      event.finish();
                      return;
                    }
                    
                    event.target = result.targets[0];
                    game.log(player, '选择了', event.target);
                    
                    "step 5";
                    // 目标选择另外两个区域之一
                    var areaList = ['h', 'e', 'j'];
                    areaList.remove(event.discardArea);
                    
                    var areaName = {
                      'h': '手牌区',
                      'e': '装备区',
                      'j': '判定区'
                    };
                    
                    event.otherAreas = areaList;
                    
                    var choices = [];
                    for (var i = 0; i < areaList.length; i++) {
                      var count = event.target.countCards(areaList[i]);
                      var aname = areaName[areaList[i]];
                      choices.push(aname + '(' + count + '张)');
                    }
                    
                    event.target.chooseControl(choices)
                      .set('prompt', '选择另一个区域作为基准')
                      .set('ai', function() {
                        // 选择牌最多的区域
                        var maxIndex = 0;
                        var maxCount = 0;
                        var areaList = _status.event.areaList;
                        var target = _status.event.player;
                        for (var i = 0; i < areaList.length; i++) {
                          var count = target.countCards(areaList[i]);
                          if (count > maxCount) {
                            maxCount = count;
                            maxIndex = i;
                          }
                        }
                        return maxIndex;
                      })
                      .set('areaList', event.otherAreas);
                    
                    "step 6";
                    var choiceIndex = result.index;
                    event.targetArea = event.otherAreas[choiceIndex];
                    
                    var areaName = {
                      'h': '手牌区',
                      'e': '装备区',
                      'j': '判定区'
                    };
                    event.targetAreaName = areaName[event.targetArea];
                    
                    var X = event.target.countCards(event.targetArea);
                    event.X = X;
                    
                    game.log(event.target, '选择了', event.targetAreaName, '作为基准(', X, '张牌)');
                    
                    if (X == 0) {
                      game.log('该区域牌数为0，不执行摸牌/弃牌效果');
                      event.goto(9);
                      return;
                    }
                    
                    // 目标选择执行方式
                    var option1 = '弃置' + event.targetAreaName + '所有牌，然后摸等量的牌';
                    var option2 = '摸' + X + '张牌，然后弃置' + X + '张牌';
                    
                    event.target.chooseControl(option1, option2)
                      .set('prompt', '请选择一项')
                      .set('choiceList', [
                        '弃置<span class="text">' + event.targetAreaName + '</span>所有牌(' + X + '张)，然后摸' + X + '张牌',
                        '摸<span class="text">' + X + '张牌</span>，然后弃置' + X + '张牌'
                      ])
                      .set('ai', function() {
                        var target = _status.event.player;
                        var targetArea = _status.event.targetArea;
                        var X = _status.event.X;
                        var areaCards = target.countCards(targetArea);
                        
                        // 如果该区域牌很少或价值低，选择先弃后摸
                        if (areaCards <= 2) return 0;
                        // 如果手牌多，选择先摸后弃
                        if (target.countCards('h') >= 3) return 1;
                        return 0;
                      })
                      .set('targetArea', event.targetArea)
                      .set('X', X);
                    
                    "step 7";
                    event.choice = result.index;
                    
                    if (result.index == 0) {
                      // 选项1：弃置另一个区域的所有牌，然后摸等量的牌
                      var cards = event.target.getCards(event.targetArea);
                      event.targetDiscardNum = cards.length;
                      
                      if (cards.length > 0) {
                        event.target.discard(cards);
                        game.log(event.target, '弃置了', event.targetAreaName, '的所有牌(', cards.length, '张)');
                      } else {
                        game.log(event.target, '的', event.targetAreaName, '没有牌可弃');
                      }
                    } else {
                      // 选项2：摸等同于其另一个区域牌的数量的牌
                      event.target.draw(event.X);
                      game.log(event.target, '摸了', event.X, '张牌');
                    }
                    
                    "step 8";
                    if (event.choice == 0) {
                      // 选项1后续：摸牌
                      if (event.targetDiscardNum > 0) {
                        event.target.draw(event.targetDiscardNum);
                        game.log(event.target, '摸了', event.targetDiscardNum, '张牌');
                      }
                    } else {
                      // 选项2后续：弃牌
                      if (event.X > 0 && event.target.countCards('he') > 0) {
                        event.target.chooseToDiscard(Math.min(event.X, event.target.countCards('he')), true, 'he');
                      } else {
                        game.log(event.target, '没有牌可弃');
                      }
                    }
                    
                    "step 9";
                    game.delayx();
                    
                    "step 10";
                    // 检查条件：若其任一区域牌的数量不小于你的对应区域
                    var areas = ['h', 'e', 'j'];
                    var canTrigger = false;
                    
                    for (var i = 0; i < areas.length; i++) {
                      var area = areas[i];
                      var targetCount = event.target.countCards(area);
                      var playerCount = player.countCards(area);
                      
                      if (targetCount >= playerCount) {
                        game.log('目标', area, '区(', targetCount, ')≥你的', area, '区(', playerCount, ')');
                        canTrigger = true;
                        break;
                      }
                    }
                    
                    if (canTrigger) {
                      game.log('满足条件，可再次发动【稚适】');
                      if (!player.storage.clanzhishi_extra) player.storage.clanzhishi_extra = 0;
                      player.storage.clanzhishi_extra++;
                      player.markSkill('clanzhishi');
                      game.log(player, '【稚适】可额外发动次数+1');
                    }
                  },
                intro: {
                    content: function(storage, player) {
                      var str = '出牌阶段限一次，你可以弃置一个区域的所有牌，令一名角色选择一项：<br>1.弃置另一个区域的所有牌，然后摸等量的牌<br>2.摸等同于其另一个区域牌的数量的牌，然后弃置等量张牌<br>若其任一区域牌的数量不小于你的对应区域，你可再次发动【稚适】';
                      if (player.storage.clanxiejin_extra) {
                        str += '<br><br><span class="firetext">本回合可额外发动' + player.storage.clanxiejin_extra + '次</span>';
                      }
                      return str;
                    },
                },
                ai: {
                    order: 7,
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            "clanzhishi_clear": {
                trigger: {
                    player: "phaseEnd",
                },
                forced: true,
                popup: false,
                silent: true,
                content: function() {
                    delete player.storage.clanzhishi_extra;
                    delete player.storage.clanxiejin_extra;
                    player.unmarkSkill('clanzhishi');
                    player.unmarkSkill('clanxiejin');
                  },
                "_priority": 1,
            },
            clanzelieremake: {
                audio: "ext:剑影:2",
                audioname: ["clan_lujing"],
                trigger: {
                    global: ["loseAfter","equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"],
                },
                getIndex: function(event, player) {

                   
                    return game
                      .filterPlayer(function(current) {

                       
                        // 必须是同族
                        if (!current.hasClan("吴郡陆氏")) {
                          return false;
                        }
                      
                        // 获取失去的牌的信息
                        var evt = event.getl(current);

                        if (!evt) {
                       
                          return false;
                        }
                      
                        // 检查是否失去了牌
                        var lostH = (evt.hs || []).length;  // 失去的手牌数
                        var lostE = (evt.es || []).length;  // 失去的装备数
                        var lostJ = (evt.js || []).length;  // 失去的判定牌数
                        

                      
                        if (lostH === 0 && lostE === 0 && lostJ === 0) {
                   
                          return false;
                        }
                      
                        // 检查失去后各区域的牌数
                        var countH = current.countCards("h");
                        var countE = current.countCards("e");
                        var countJ = current.countCards("j");
                       

                      
                        // 任意一个区域失去牌后变为0就触发
                        var result = (lostH > 0 && countH === 0) ||   // 手牌区清空
                                     (lostE > 0 && countE === 0) ||   // 装备区清空
                                     (lostJ > 0 && countJ === 0);     // 判定区清空
                        
                     
                      
                        return result;
                      })
                      .sortBySeat(_status.currentPhase);
                  },
                filter: function(event, player, name, target) {
                    return target?.isIn();
                  },
                clanSkill: true,
                cost: async function(event, trigger, player) {
                    event.result = await player
                      .chooseTarget(get.prompt2(event.skill))
                      .set("ai", function(target) {
                        var player = get.player();
                        var att = get.attitude(player, target);
                        return att;
                      })
                      .forResult();
                  },
                content: async function(event, trigger, player) {
                    var target = event.targets[0];
                    target.addTempSkill("clanzelieremake_effect");
                    target.addMark("clanzelieremake_effect", 1, false);
                  },
                ai: {
                    noe: true,
                    skillTagFilter: function(player, tag, arg) {
                      return player.countCards("ej") == 1;
                    },
                },
                subSkill: {
                    effect: {
                        trigger: {
                            player: ["gainAfter","loseAfter"],
                            global: "loseAsyncAfter",
                        },
                        charlotte: true,
                        direct: true,
                        firstDo: true,
                        onremove: true,
                        getIndex: function(event, player) {
                            return player.countMark("clanzelieremake_effect");
                          },
                        filter: function(event, player) {
                            if (!player.hasMark("clanzelieremake_effect")) {
                              return false;
                            }
                            if (event.name == "gain") {
                              return event.getParent().name == "draw";
                            }
                            return event.type == "discard" && event.getl(player).cards2.length && player.countCards("he");
                          },
                        intro: {
                            content: "本回合下$次摸牌/弃置牌后，摸一张牌/弃置一张牌",
                        },
                        content: async function(event, trigger, player) {
                            player.removeMark("clanzelieremake_effect", 1, false);
                            if (trigger.name == "gain") {
                              await player.draw();
                            } else {
                              await player.chooseToDiscard("he", true);
                            }
                          },
                        sub: true,
                        sourceSkill: "clanzelieremake",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
           
            "chi_lingmeng": {
                audio: "ext:剑影:2",
                forced: true,
                locked: true,
                mod: {
                },
                group: ["chi_lingmeng_prevent","chi_lingmeng_gain","chi_lingmeng_ice"],
                subSkill: {
                    prevent: {
                        audio: "chi_lingmeng",
                        trigger: {
                            player: "damageBegin4",
                        },
                        forced: true,
                        filter: function(event, player) {
                            // 有实体牌 + 有相同字数的牌
                            if (!event.cards || !event.cards.length) return false;
                            var damageCard = event.cards[0];
                            var damageLength = get.cardNameLength(damageCard);
                            
                            return player.countCards('he', function(card) {
                                return get.cardNameLength(card) === damageLength;
                            }) > 0;
                        },
                        content: function() {
                            'step 0'
                            var damageCard = trigger.cards[0];
                            var damageLength = get.cardNameLength(damageCard);
                            
                            player.chooseCard('he', '【泠梦】：展示一张牌名字数为' + damageLength + '的牌', function(card) {
                                return get.cardNameLength(card) === damageLength;
                            }, true);
                            
                            'step 1'
                            if (!result.bool) {
                                event.finish();
                                return;
                            }
                            
                            var shownCard = result.cards[0];
                            player.showCards(shownCard, '【泠梦】');
                            
                            // 防止伤害
                            trigger.cancel();
                            game.log(player, '防止了', trigger.num, '点伤害');
                            
                            // 你获得伤害牌
                            if (trigger.cards && trigger.cards.length > 0) {
                                player.gain(trigger.cards, 'gain2');
                            }
                            
                            // 伤害来源获得你展示的牌
                            if (trigger.source && trigger.source.isIn()) {
                                trigger.source.gain(shownCard, player, 'giveAuto');
                            }
                        },
                        sub: true,
                        sourceSkill: "chi_lingmeng",
                        "_priority": 0,
                    },
                    gain: {
                        audio: "chi_lingmeng",
                        trigger: {
                            source: "damageEnd",
                        },
                        forced: true,
                        filter: function(event, player) {
                            // 有实体牌 + 目标有牌
                            return event.cards && event.cards.length > 0 && 
                                   event.player && event.player.isIn() && 
                                   event.player.countCards('he') > 0;
                        },
                        content: function() {
                            var damageCard = trigger.cards[0];
                            var damageLength = get.cardNameLength(damageCard);
                            
                            var cards = trigger.player.getCards('he', function(card) {
                                return get.cardNameLength(card) === damageLength;
                            });
                            
                            if (cards.length > 0) {
                                player.gain(cards, trigger.player, 'giveAuto');
                                game.log(player, '获得了', trigger.player, '的', cards.length, '张牌');
                            }
                        },
                        sub: true,
                        sourceSkill: "chi_lingmeng",
                        "_priority": 0,
                    },
                    ice: {
                        charlotte: true,
                        trigger: {
                            source: "damageBegin1",
                        },
                        forced: true,
                        mark: true,
                        content: function() {
                            game.setNature(trigger, "ice");
                        },
                        sub: true,
                        sourceSkill: "chi_lingmeng",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            "chi_shubi": {
                audio: "ext:剑影:2",
                forced: true,
                locked: true,
                unique: true,
                trigger: {
                    player: "useCard1",
                },
                filter: function(event, player) {
                    // 技能未失效
                    if (player.hasSkill('chi_shubi_invalid')) return false;
                    
                    // 本回合第一张牌
                    var history = player.getHistory('useCard');
                    return history.length === 1;
                },
                content: function() {
                    'step 0'
                    player.chooseControl('递增模式', '递减模式')
                        .set('prompt', '【舒髀】：选择本回合模式')
                        .set('prompt2', '递增：①不计次数 ②执行两次 ③目标+1 ④执行X+1次<br>递减：①执行两次 ②目标+1 ③不计次数 ④目标+X+1')
                        .set('ai', function() {
                            var hs = player.getCards('h');
                            if (hs.length < 2) return '递减模式';
                            
                            var lengths = hs.map(function(card) {
                                return get.cardNameLength(card);
                            });
                            
                            // 检查是否能递增
                            var canIncrease = true;
                            for (var i = 1; i < Math.min(4, lengths.length); i++) {
                                if (lengths[i] <= lengths[i - 1]) {
                                    canIncrease = false;
                                    break;
                                }
                            }
                            
                            return canIncrease ? '递增模式' : '递减模式';
                        });
                    
                    'step 1'
                    if (result.control === '递增模式') {
                        player.storage.chi_shubi_mode = 'increase';
                        game.log(player, '选择了', '#g递增模式');
                    } else {
                        player.storage.chi_shubi_mode = 'decrease';
                        game.log(player, '选择了', '#y递减模式');
                    }
                    
                    player.storage.chi_shubi_lengths = [];
                    player.addTempSkill('chi_shubi_effect');
                    player.addTempSkill('chi_shubi_addTarget');  // ✅ 添加额外目标技能
                    player.markSkill('chi_shubi_mark');
                },
                group: "chi_shubi_clear",
                subSkill: {
                    effect: {
                        audio: "chi_shubi",
                        trigger: {
                            player: "useCard1",
                        },
                        forced: true,
                        charlotte: true,
                        filter: function(event, player) {
                            return !player.hasSkill('chi_shubi_invalid');
                        },
                        content: function() {
                            'step 0'
                            var history = player.getHistory('useCard');
                            var index = history.indexOf(trigger) + 1;
                            var mode = player.storage.chi_shubi_mode;
                            
                            event.cardIndex = index;
                            event.mode = mode;
                            
                            // 记录牌名字数
                            if (!player.storage.chi_shubi_lengths) {
                                player.storage.chi_shubi_lengths = [];
                            }
                            
                            var currentLength = get.cardNameLength(trigger.card);
                            player.storage.chi_shubi_lengths.push(currentLength);
                            
                            game.log(player, '使用第', '#g' + index, '张牌，牌名字数:', '#y' + currentLength);
                            
                            // 检查流程是否合法
                            if (index > 1) {
                                var prevLength = player.storage.chi_shubi_lengths[index - 2];
                                var valid = false;
                                
                                if (mode === 'increase') {
                                    valid = currentLength > prevLength;
                                } else {
                                    valid = currentLength < prevLength;
                                }
                                
                                if (!valid) {
                                    // 流程失效
                                    var X = Math.max(1, index - 1);
                                    
                                    game.log('#r【舒髀】流程失效！');
                                    
                                    // 检查X是否等于体力值
                                    if (X === player.hp) {
                                        game.log('#g弃牌数X等于体力值，此牌仍可按流程执行');
                                        player.chooseToDiscard('he', X, true);
                                        player.addTempSkill('chi_shubi_invalid');
                                        event.goto(2);
                                        return;
                                    }
                                    
                                    // 弃牌并失效
                                    player.chooseToDiscard('he', X, true);
                                    player.addTempSkill('chi_shubi_invalid');
                                    
                                    delete player.storage.chi_shubi_mode;
                                    delete player.storage.chi_shubi_lengths;
                                    player.unmarkSkill('chi_shubi_mark');
                                    
                                    event.finish();
                                    return;
                                }
                            }
                            
                            'step 1'
                            // 流程合法，记录当前效果
                            player.storage.chi_shubi_current_index = event.cardIndex;
                            player.storage.chi_shubi_current_card = trigger.card;
                            player.updateMarks();
                            
                            'step 2'
                            // 根据模式和顺序执行效果
                            var index = event.cardIndex;
                            var mode = event.mode;
                            
                            if (mode === 'increase') {
                                if (index === 1) {
                                    trigger.addCount = false;
                                    game.log('#g此牌不计入使用次数');
                                } else if (index === 2) {
                                    game.log('#g此牌执行两次');
                                    player.addTempSkill('chi_shubi_double');
                                    player.storage.chi_shubi_double_card = trigger.card;
                                } else if (index === 3) {
                                    game.log('#g此牌目标数+1');
                                    // 标记需要额外选择1个目标
                                    trigger._chi_shubi_addTarget = 1;
                                } else if (index === 4) {
                                    var X = Math.max(1, index - 1);
                                    game.log('#g此牌执行', X + 1, '次');
                                    player.addTempSkill('chi_shubi_multi');
                                    player.storage.chi_shubi_multi = X + 1;
                                    player.storage.chi_shubi_multi_card = trigger.card;
                                }
                            } else {
                                if (index === 1) {
                                    game.log('#g此牌执行两次');
                                    player.addTempSkill('chi_shubi_double');
                                    player.storage.chi_shubi_double_card = trigger.card;
                                } else if (index === 2) {
                                    game.log('#g此牌目标数+1');
                                    // 标记需要额外选择1个目标
                                    trigger._chi_shubi_addTarget = 1;
                                } else if (index === 3) {
                                    trigger.addCount = false;
                                    game.log('#g此牌不计入使用次数');
                                } else if (index === 4) {
                                    var X = Math.max(1, index - 1);
                                    game.log('#g此牌目标数+', X + 1);
                                    // 标记需要额外选择X+1个目标
                                    trigger._chi_shubi_addTarget = X + 1;
                                }
                            }
                        },
                        sub: true,
                        sourceSkill: "chi_shubi",
                        "_priority": 0,
                    },
                    addTarget: {
                        audio: "chi_shubi",
                        trigger: {
                            player: "useCard2",
                        },
                        forced: true,
                        charlotte: true,
                        filter: function(event, player) {
                            if (!event._chi_shubi_addTarget || event._chi_shubi_addTarget <= 0) return false;
                            
                            var card = event.card;
                            var info = get.info(card);
                            if (!info || !info.selectTarget) return false;
                            
                            return true;
                        },
                        content: function() {
                            'step 0'
                            var num = trigger._chi_shubi_addTarget;
                            var card = trigger.card;
                            
                            var targets = trigger.targets || [];
                            var selectableTargets = game.filterPlayer(function(current) {
                                if (targets.includes(current)) return false;
                                return lib.filter.targetEnabled2(card, player, current);
                            });
                            
                            if (selectableTargets.length === 0) {
                                game.log('没有可额外选择的目标');
                                event.finish();
                                return;
                            }
                            
                            player.chooseTarget(
                                '【舒髀】：为' + get.translation(card) + '额外选择至多' + num + '个目标',
                                [1, Math.min(num, selectableTargets.length)],
                                function(card, player, target) {
                                    return _status.event.selectableTargets.includes(target);
                                }
                            ).set('selectableTargets', selectableTargets).set('ai', function(target) {
                                var player = _status.event.player;
                                return get.effect(target, _status.event.getParent().trigger.card, player, player);
                            });
                            
                            'step 1'
                            if (result.bool && result.targets && result.targets.length > 0) {
                                // ✅ 使用官方API添加目标（如果存在）
                                if (trigger.addTarget) {
                                    for (var i = 0; i < result.targets.length; i++) {
                                        trigger.addTarget(result.targets[i]);
                                    }
                                } else {
                                    // ✅ 降级方案：直接修改targets数组
                                    if (!trigger.targets) trigger.targets = [];
                                    trigger.targets.addArray(result.targets);
                                }
                                
                                game.log(player, '额外指定', result.targets, '为目标');
                            }
                        },
                        sub: true,
                        sourceSkill: "chi_shubi",
                        "_priority": 0,
                    },
                    double: {
                        audio: "chi_shubi",
                        trigger: {
                            player: "useCardToPlayered",
                        },
                        forced: true,
                        charlotte: true,
                        filter: function(event, player) {
                            return event.card === player.storage.chi_shubi_double_card;
                        },
                        content: function() {
                            trigger.getParent().effectCount++;
                            game.log('#g效果执行次数+1');
                        },
                        sub: true,
                        sourceSkill: "chi_shubi",
                        "_priority": 0,
                    },
                    multi: {
                        audio: "chi_shubi",
                        trigger: {
                            player: "useCardToPlayered",
                        },
                        forced: true,
                        charlotte: true,
                        filter: function(event, player) {
                            return event.card === player.storage.chi_shubi_multi_card;
                        },
                        content: function() {
                            var times = player.storage.chi_shubi_multi || 2;
                            trigger.getParent().effectCount += (times - 1);
                            game.log('#g效果执行次数+', times - 1);
                        },
                        sub: true,
                        sourceSkill: "chi_shubi",
                        "_priority": 0,
                    },
                    invalid: {
                        charlotte: true,
                        sub: true,
                        sourceSkill: "chi_shubi",
                        "_priority": 0,
                    },
                    mark: {
                        charlotte: true,
                        onremove: function(player) {
                            delete player.storage.chi_shubi_mode;
                            delete player.storage.chi_shubi_lengths;
                            delete player.storage.chi_shubi_current_index;
                            delete player.storage.chi_shubi_current_card;
                        },
                        intro: {
                            content: function(storage, player) {
                                var mode = player.storage.chi_shubi_mode;
                                var lengths = player.storage.chi_shubi_lengths || [];
                                var index = player.storage.chi_shubi_current_index || 0;
                                
                                var str = '<div class="text">';
                                str += '当前模式：' + (mode === 'increase' ? '<span style="color:#0a0">递增</span>' : '<span style="color:#da0">递减</span>') + '<br>';
                                str += '已使用牌字数：' + lengths.join(' → ') + '<br><br>';
                                
                                if (mode === 'increase') {
                                    str += '<span style="color:#888">①不计次数 ②执行×2 ③目标+1 ④执行×' + (index) + '</span>';
                                } else {
                                    str += '<span style="color:#888">①执行×2 ②目标+1 ③不计次数 ④目标+' + (index) + '</span>';
                                }
                                
                                str += '</div>';
                                return str;
                            },
                        },
                        sub: true,
                        sourceSkill: "chi_shubi",
                        "_priority": 0,
                    },
                    clear: {
                        trigger: {
                            player: "phaseEnd",
                        },
                        direct: true,
                        charlotte: true,
                        forceDie: true,
                        content: function() {
                            delete player.storage.chi_shubi_mode;
                            delete player.storage.chi_shubi_lengths;
                            delete player.storage.chi_shubi_current_index;
                            delete player.storage.chi_shubi_current_card;
                            delete player.storage.chi_shubi_double_card;
                            delete player.storage.chi_shubi_multi;
                            delete player.storage.chi_shubi_multi_card;
                            player.unmarkSkill('chi_shubi_mark');
                        },
                        sub: true,
                        sourceSkill: "chi_shubi",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            "chi_shennie": {
                audio: "ext:剑影:2",
                trigger: {
                    player: ["gainAfter","phaseBegin","damageEnd"],
                    source: "damageSource",
                    global: "gameStart",
                },
                forced: true,
                locked: true,
                firstDo: true,
                priority: 100,
                group: ["chi_shennie_connect"],
                filter: function(event, player, name) {
                    if (name === 'damageEnd' || name === 'damageSource') {
                        if (name === 'damageSource') {
                            return event.player && event.player.isIn() && event.player.countCards('h') > 0;
                        } else {
                            return event.source && event.source.isIn() && event.source.countCards('h') > 0;
                        }
                    }
                    
                    var isTrick = function(card) {
                        var type = get.type(card);
                        return type === 'trick' || type === 'delay';
                    };
                    
                    if (name === 'gameStart' || name === 'phaseBegin') {
                        return player.countCards('h', function(card) {
                            return isTrick(card) && !card.hasGaintag('connected');
                        }) > 0;
                    }
                    
                    if (name === 'gain') {
                        return event.cards && event.cards.some(function(card) {
                            return isTrick(card);
                        });
                    }
                    
                    return false;
                },
                content: function() {
                    'step 0'
                    var triggerName = event.triggername;
                    
                    if (triggerName === 'damageEnd' || triggerName === 'damageSource') {
                        var target;
                        if (triggerName === 'damageSource') {
                            target = trigger.player;
                        } else {
                            target = trigger.source;
                        }
                        
                        var cards = target.getCards('h', function(card) {
                            return !card.hasGaintag('connected');
                        });
                        
                        if (cards.length === 0) {
                            event.finish();
                            return;
                        }
                        
                        var card = cards.randomGet();
                        target.connectCard([card]);
                        game.log(player, '连接了', target, '的一张手牌');
                        event.finish();
                        return;
                    }
                    
                    var isTrick = function(card) {
                        var type = get.type(card);
                        return type === 'trick' || type === 'delay';
                    };
                    
                    if (triggerName === 'gain') {
                        var tricks = trigger.cards.filter(function(card) {
                            return isTrick(card) && 
                                   player.getCards('h').includes(card) &&
                                   !card.hasGaintag('connected');
                        });
                        
                        if (tricks.length > 0) {
                            player.connectCard(tricks);
                            game.log(player, '将', tricks.length, '张锦囊牌标记为连接状态');
                        }
                    } else {
                        var tricks = player.getCards('h', function(card) {
                            return isTrick(card) && !card.hasGaintag('connected');
                        });
                        
                        if (tricks.length > 0) {
                            player.connectCard(tricks);
                            game.log(player, '将', tricks.length, '张锦囊牌标记为连接状态');
                        }
                    }
                },
                mod: {
                    "cardEnabled2": function(card, player) {
                        if (!card.hasGaintag('connected')) return;
                        var evt = _status.event;
                        if (evt.name === 'chooseToDiscard' || evt.name === 'discard') {
                            return false;
                        }
                    },
                    cardDiscardable: function(card, player, name) {
                        if (card.hasGaintag('connected')) {
                            return false;
                        }
                    },
                    maxHandcard: function(player, num) {
                        var connectedCount = player.getCards('h', function(card) {
                            return card.hasGaintag('connected');
                        }).length;
                        return num + connectedCount;
                    },
                    cardUsable: function(card, player, num) {
                        if (card.hasGaintag('connected')) {
                            return Infinity;
                        }
                    },
                    targetInRange: function(card, player) {
                        if (card.hasGaintag('connected')) {
                            return true;
                        }
                    },
                },
                intro: {
                    content: function(storage, player) {
                        var connected = player.getConnectedCards();
                        if (connected.length === 0) {
                            return '当前无连接牌';
                        }
                        return '连接牌(' + connected.length + '张)：' + get.translation(connected);
                    },
                },
                subSkill: {
                    connect: {
                        charlotte: true,
                        sub: true,
                        sourceSkill: "chi_shennie",
                        "_priority": 0,
                    },
                },
                "_priority": 10000,
            },
            "chi_yingshan": {
                audio: "ext:剑影:2",
                enable: "phaseUse",
                usable: 1,
                filter: function(event, player) {
                    return player.countCards('h', function(card) {
                        return !card.hasGaintag('connected');
                    }) > 0;
                },
                content: function() {
                    'step 0'
                    player.chooseCard('h', '【映山】：选择一张手牌进行连接', function(card) {
                        return !card.hasGaintag('connected');
                    }, true).set('ai', function(card) {
                        if (get.type(card) === 'trick') return 10;
                        return 6 - get.value(card);
                    });
                    
                    'step 1'
                    if (!result.bool || !result.cards || result.cards.length === 0) {
                        event.finish();
                        return;
                    }
                    
                    var card = result.cards[0];
                    player.connectCard([card]);
                    game.log(player, '连接了', card);
                    
                    var cardNameLength = get.cardNameLength(card);
                    var hp = player.hp;
                    
                    game.log('连接牌名字数:', cardNameLength, ', 体力值:', hp);
                    
                    if (cardNameLength === hp) {
                        player.chooseControl('恢复体力', '刷新映山', '移除禁用')
                            .set('prompt', '牌名字数等于体力值，选择一项')
                            .set('ai', function() {
                                var player = _status.event.player;
                                
                                // 如果受伤，优先恢复
                                if (player.isDamaged()) return '恢复体力';
                                
                                // 如果有禁用字数，考虑移除
                                if (_status.bannedNameLength && Object.keys(_status.bannedNameLength).length > 0) {
                                    return '移除禁用';
                                }
                                
                                // 否则刷新技能
                                return '刷新映山';
                            });
                    } else {
                        event.finish();
                    }
                    
                    'step 2'
                    if (result && result.control) {
                        if (result.control === '恢复体力') {
                            player.recover();
                            game.log(player, '恢复了1点体力');
                        } else if (result.control === '刷新映山') {
                            // ✅ 刷新映山技能
                            if (player.storage.counttrigger && player.storage.counttrigger.chi_yingshan) {
                                player.storage.counttrigger.chi_yingshan = 0;
                            }
                            game.log(player, '刷新了【映山】的使用次数');
                        } else {
                            // 移除禁用
                            if (_status.bannedNameLength) {
                                delete _status.bannedNameLength;
                                game.removeGlobalSkill('chi_shennie_ban');
                                game.log('清除了本回合的牌名字数禁用');
                            }
                        }
                    }
                },
                ai: {
                    order: 8,
                    result: {
                        player: 1,
                    },
                },
                group: "chi_yingshan_damage",
                subSkill: {
                    damage: {
                        audio: "chi_yingshan",
                        trigger: {
                            player: "damageEnd",
                        },
                        filter: function(event, player) {
                            // ✅ 检查本回合是否已使用
                            if (player.storage.counttrigger && player.storage.counttrigger.chi_yingshan > 0) {
                                return false;
                            }
                            
                            return player.countCards('h', function(card) {
                                return !card.hasGaintag('connected');
                            }) > 0;
                        },
                        prompt: "是否发动【映山】？",
                        content: function() {
                            'step 0'
                            player.chooseCard('h', '【映山】：选择一张手牌进行连接', function(card) {
                                return !card.hasGaintag('connected');
                            }).set('ai', function(card) {
                                if (get.type(card) === 'trick') return 10;
                                return 6 - get.value(card);
                            });
                            
                            'step 1'
                            if (!result.bool || !result.cards || result.cards.length === 0) {
                                event.finish();
                                return;
                            }
                            
                            var card = result.cards[0];
                            player.connectCard([card]);
                            game.log(player, '连接了', card);
                            
                            // ✅ 标记已使用
                            if (!player.storage.counttrigger) player.storage.counttrigger = {};
                            player.storage.counttrigger.chi_yingshan = 1;
                            
                            var cardNameLength = get.cardNameLength(card);
                            var hp = player.hp;
                            
                            if (cardNameLength === hp) {
                                player.chooseControl('恢复体力', '刷新映山', '移除禁用')
                                    .set('prompt', '牌名字数等于体力值，选择一项')
                                    .set('ai', function() {
                                        if (player.isDamaged()) return '恢复体力';
                                        if (_status.bannedNameLength && Object.keys(_status.bannedNameLength).length > 0) {
                                            return '移除禁用';
                                        }
                                        return '刷新映山';
                                    });
                            } else {
                                event.finish();
                            }
                            
                            'step 2'
                            if (result && result.control) {
                                if (result.control === '恢复体力') {
                                    player.recover();
                                    game.log(player, '恢复了1点体力');
                                } else if (result.control === '刷新映山') {
                                    player.storage.counttrigger.chi_yingshan = 0;
                                    game.log(player, '刷新了【映山】的使用次数');
                                } else {
                                    if (_status.bannedNameLength) {
                                        delete _status.bannedNameLength;
                                        game.removeGlobalSkill('chi_shennie_ban');
                                        game.log('清除了本回合的牌名字数禁用');
                                    }
                                }
                            }
                        },
                        sub: true,
                        sourceSkill: "chi_yingshan",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            clanfufengRemake: {
                audio: "ext:custom:clanfufengRemake",
                forced: true,
                locked: true,
                trigger: {
                    player: "showCardsEnd",
                },
                filter: function(event, player) {
                    // ✅ 检查是否正在执行
                    if (player.hasSkill('clanfufengRemake_executing')) return false;
                    
                    // ✅ 检查是否已处理过这个事件
                    if (event._clanfufengRemake_processed) return false;
                    
                    return event.cards && event.cards.length > 0;
                },
                content: function() {
                    "step 0";
                    // ✅ 标记事件已处理
                    trigger._clanfufengRemake_processed = true;
                    
                    // ✅ 添加执行中标记
                    player.addTempSkill('clanfufengRemake_executing');
                    
                    // ✅ 获取展示的第一张牌的颜色
                    var card = trigger.cards[0];  // ✅ 改为获取第一张牌
                    var color = get.color(card);
                    var otherColor = (color == 'red') ? 'black' : 'red';
                   
                    var otherCards = player.getCards('h', function(c) {
                      return get.color(c) == otherColor;
                    });
                   
                    if (otherCards.length == 0) {
                      event.finish();
                      return;
                    }
                   
                    game.log(player, '展示了', color == 'red' ? '红色' : '黑色', '牌');
                   
                    var recastCards = otherCards.filter(function(c) {
                      return player.canRecast(c);
                    });
                   
                    if (recastCards.length > 0) {
                      game.log(player, '重铸', otherColor == 'red' ? '红色' : '黑色', '手牌：', recastCards);
                      player.recast(recastCards);
                    }
                   
                    "step 1";
                   
                    game.log('将1张牌置于牌堆顶');
                   
                    var cards = player.getCards('h');
                    if (cards.length == 0) {
                      game.log(player, '没有手牌可置于牌堆顶');
                      event.goto(3);
                      return;
                    }
                   
                    player.chooseCard('h', '选择1张牌置于牌堆顶', [1], true).set('ai', function(card) {
                      return -get.value(card);
                    });
                   
                    "step 2";
                    if (result.bool && result.cards && result.cards.length) {
                      var cards = result.cards;
                      player.lose(cards, ui.cardPile, 'insert');
                      game.log(player, '将', cards.length, '张牌置于了牌堆顶');
                    }
                    
                    "step 3";
                    player.removeSkill('clanfufengRemake_executing');
                },
                subSkill: {
                    executing: {
                        charlotte: true,
                        sub: true,
                        sourceSkill: "clanfufengRemake",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            clanyilvRemake: {
                audio: "ext:custom:clanyilvRemake",
                forced: true,
                locked: true,
                trigger: {
                    player: ["changeHp"],
                    global: "phaseBegin",
                },
                filter: function(event, player, name) {
                    if (name == 'phaseBegin') {
                      // 一号位的回合开始
                      var firstSeat = game.findPlayer(function(current) {
                        return current.getSeatNum() == 1;
                      });
                      return event.player == firstSeat;
                    }
                    // 体力值发生变化
                    return true;
                  },
                content: function() {
                    "step 0";
                    // 计算X值（徇覆记录的锦囊牌数）
                    var X = player.hp;
                    player.storage.clanyilvRemake_currentX = X;
                    
                    game.log(player, '发动绎律，X=', X);
                    
                    // 选择一种颜色
                    player.chooseControl('red', 'black')
                      .set('prompt', '选择一种颜色')
                      .set('ai', function() {
                        return Math.random() > 0.5 ? 'red' : 'black';
                      });
                    
                    "step 1";
                    var chosenColor = result.control;
                    var otherColor = (chosenColor == 'red') ? 'black' : 'red';
                    event.chosenColor = chosenColor;
                    event.otherColor = otherColor;
                    
                    game.log(player, '选择了', chosenColor == 'red' ? '红色' : '黑色');
                    
                    // 亮出牌堆顶X张牌
                    var X = player.storage.clanyilvRemake_currentX;
                    var cards = get.cards(X);
                    player.showCards(cards, '绎律：亮出牌堆顶' + X + '张牌');
                    event.shownCards = cards;
                    
                    "step 2";
                    // 筛选出另一种颜色的牌
                    var otherColorCards = event.shownCards.filter(function(card) {
                      return get.color(card) == event.otherColor;
                    });
                    var remainCards = event.shownCards.filter(function(card) {
                      return get.color(card) != event.otherColor;
                    });
                    
                    event.otherColorCards = otherColorCards;
                    event.remainCards = remainCards;
                    
                    game.log('其中', event.otherColor == 'red' ? '红色' : '黑色', '牌：', otherColorCards);
                    game.log('其余牌：', remainCards);
                    
                    if (otherColorCards.length == 0) {
                      game.log('没有另一种颜色的牌可使用');
                      event.goto(4);
                      return;
                    }
                    
                    // 依次使用另一种颜色的牌
                    event.currentIndex = 0;
                    
                    "step 3";
                    if (event.currentIndex < event.otherColorCards.length) {
                      var card = event.otherColorCards[event.currentIndex];
                      if (player.hasUseTarget(card)) {
                        player.chooseUseTarget(card, true, '是否使用【' + get.translation(card.name) + '】？');
                      } else {
                        game.log(player, '无法使用', card);
                      }
                      event.currentIndex++;
                      event.redo();
                    } else {
                      // 所有另一种颜色的牌都使用完了
                      event.goto(4);
                    }
                    
                    "step 4";
                    // 获得其余的牌
                    if (event.remainCards.length > 0) {
                      player.gain(event.remainCards, 'gain2');
                      game.log(player, '获得了', event.remainCards);
                    }
                  },
                "_priority": 0,
            },
            "chi_aojian": {
                audio: "ext:练:2",
                trigger: {
                    global: "roundStart",
                },
                forced: true,
                group: ["chi_aojian_viewas","chi_aojian_damage","chi_aojian_draw","chi_aojian_disable"],
                content: function() {
                    'step 0'
                    // 获得一张杀
                    var card = get.cardPile2(function(card) {
                        return card.name == 'sha';
                    });
                    if(card) player.gain(card, 'gain2');
                    
                    'step 1'
                    // 获得武器牌
                    var card = get.cardPile2(function(card) {
                        return get.subtype(card) == 'equip1';
                    });
                    if(card) {
                        player.gain(card, 'gain2');
                        event.weaponCard = card;
                    }
                    
                    'step 2'
                    // 询问是否装备
                    if(event.weaponCard && player.getCards('h').includes(event.weaponCard)) {
                        player.chooseUseTarget(event.weaponCard, '是否装备' + get.translation(event.weaponCard) + '？', false);
                    }
                },
                subSkill: {
                    viewas: {
                        audio: "chi_aojian",
                        enable: ["chooseToUse","chooseToRespond"],
                        hiddenCard: function(player, name) {
                            return name == 'sha' && player.countCards('he', function(card) {
                                return card.name == 'sha' || get.type(card) == 'equip';
                            }) > 0;
                        },
                        filter: function(event, player) {
                            if(!player.countCards('he', function(card) {
                                return card.name == 'sha' || get.type(card) == 'equip';
                            })) return false;
                            
                            return event.filterCard(get.autoViewAs({ name: 'sha' }, 'unsure'), player, event) || 
                                lib.inpile_nature.some(nature => event.filterCard(get.autoViewAs({ name: 'sha', nature }, 'unsure'), player, event));
                        },
                        chooseButton: {
                            dialog: function(event, player) {
                                var list = [];
                                if(event.filterCard(get.autoViewAs({ name: 'sha' }, 'unsure'), player, event)) {
                                    list.push(['基本', '', 'sha']);
                                }
                                for(var nature of lib.inpile_nature) {
                                    if(event.filterCard(get.autoViewAs({ name: 'sha', nature: nature }, 'unsure'), player, event)) {
                                        list.push(['基本', '', 'sha', nature]);
                                    }
                                }
                                return ui.create.dialog('骜剑', [list, 'vcard']);
                            },
                            check: function(button) {
                                var player = _status.event.player;
                                var card = { name: button.link[2], nature: button.link[3] };
                                if(_status.event.getParent().type == 'phase' && game.hasPlayer(function(current) {
                                    return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
                                })) {
                                    if(button.link[3] == 'fire') return 2.95;
                                    else if(button.link[3] == 'thunder') return 2.92;
                                    else if(button.link[3] == 'ice') return 2.92;
                                    else return 2.9;
                                }
                                return 1;
                            },
                            backup: function(links, player) {
                                return {
                                    audio: 'chi_aojian',
                                    filterCard: function(card) {
                                        return card.name == 'sha' || get.type(card) == 'equip';
                                    },
                                    position: 'he',
                                    selectCard: 1,
                                    popname: true,
                                    check: function(card) {
                                        return 7 - get.value(card);
                                    },
                                    viewAs: { name: links[0][2], nature: links[0][3] },
                                };
                            },
                            prompt: function(links, player) {
                                var nature = links[0][3];
                                return '将一张【杀】或装备牌当作' + (nature ? get.translation(nature) : '') + '【杀】' + (_status.event.name == 'chooseToUse' ? '使用' : '打出');
                            },
                        },
                        ai: {
                            respondSha: true,
                            order: 3,
                            result: {
                                player: 1,
                            },
                        },
                        sub: true,
                        sourceSkill: "chi_aojian",
                        "_priority": 0,
                    },
                    damage: {
                        trigger: {
                            player: "useCard",
                        },
                        forced: true,
                        filter: function(event) {
                            return event.card.name == 'sha';
                        },
                        content: function() {
                            var range = player.getAttackRange();
                            trigger.baseDamage += range;
                            game.log(trigger.card, '伤害+' + range);
                        },
                        sub: true,
                        sourceSkill: "chi_aojian",
                        "_priority": 0,
                    },
                    draw: {
                        trigger: {
                            player: "useCardAfter",
                        },
                        forced: true,
                        filter: function(event, player) {
                            if(event.card.name != 'sha') return false;
                            return event.cards && event.cards.filter(i => get.position(i) == 'd').length > 0;
                        },
                        content: function() {
                            player.draw(player.getAttackRange());
                        },
                        sub: true,
                        sourceSkill: "chi_aojian",
                        "_priority": 0,
                    },
                    disable: {
                        trigger: {
                            player: "useCardAfter",
                        },
                        forced: true,
                        filter: function(event) {
                            return event.card.name == 'sha' && event.cards && event.cards.length;
                        },
                        content: function() {
                            var suit = get.suit(trigger.cards[0]);
                            var targets = game.filterPlayer(function(current) {
                                if(current == player) return false;
                                return !current.getCards('hej').some(card => get.suit(card) == suit);
                            });
                            if(targets.length) {
                                game.log(targets, '的技能失效直到回合结束');
                                for(var target of targets) {
                                    target.addTempSkill('fengyin', { player: 'phaseAfter' });
                                }
                            }
                        },
                        sub: true,
                        sourceSkill: "chi_aojian",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            "chi_suchen": {
                audio: "ext:练:2",
                trigger: {
                    target: "useCardToTargeted",
                },
                forced: false,
                init: function(player) {
                    if(!player.storage.chi_suchen_round) {
                        player.storage.chi_suchen_round = 0;
                    }
                },
                filter: function(event, player) {
                    // 调试用，可以删除
                    game.log('chi_suchen filter检查');
                    game.log('使用者:', event.player);
                    game.log('目标:', player);
                    game.log('卡牌:', event.card);
                    
                    if(event.player == player) {
                        game.log('是自己使用的，不触发');
                        return false;
                    }
                    
                    if(!player.countCards('he', { name: 'sha' })) {
                        game.log('没有杀，不触发');
                        return false;
                    }
                    
                    if(event.card.name != 'sha' && get.type(event.card) != 'trick') {
                        game.log('不是杀或锦囊，不触发');
                        return false;
                    }
                    
                    var range = player.getAttackRange();
                    game.log('攻击范围:', range);
                    game.log('本轮已使用次数:', player.storage.chi_suchen_round);
                    
                    if(player.storage.chi_suchen_round >= range) {
                        game.log('次数已用完');
                        return false;
                    }
                    
                    game.log('可以触发chi_suchen');
                    return true;
                },
                content: function() {
                    'step 0'
                    var source = trigger.player;
                    event.source = source;
                    
                    // 计算AI判断
                    var eff1 = get.effect(player, trigger.card, source, player);
                    var eff2 = get.effect(source, trigger.card, source, player);
                    var goon = eff1 < 0 && eff2 < 0;
                    
                    player.chooseToDiscard('he', function(card) {
                        return card.name == 'sha';
                    }, get.prompt('chi_suchen'), '弃置一张【杀】，将' + get.translation(trigger.card) + '的目标转移给' + get.translation(source))
                    .set('ai', function(card) {
                        if(_status.event.goon) return 8 - get.value(card);
                        return 0;
                    })
                    .set('goon', goon)
                    .set('logSkill', ['chi_suchen', source]);
                    
                    'step 1'
                    if(result.bool) {
                        if(!player.storage.chi_suchen_round) player.storage.chi_suchen_round = 0;
                        player.storage.chi_suchen_round++;
                        
                        // 移除原目标
                        trigger.targets.remove(player);
                        trigger.getParent().triggeredTargets2.remove(player);
                        trigger.getParent().targets.remove(player);
                        
                        // 添加新目标
                        trigger.targets.push(event.source);
                        trigger.getParent().triggeredTargets2.push(event.source);
                        trigger.getParent().targets.push(event.source);
                        
                        game.log(trigger.card, '的目标被转移给了', event.source);
                    } else {
                        event.finish();
                    }
                    
                    'step 2'
                    if(player.hp <= player.getAttackRange()) {
                        var target = event.source;
                        var eff = get.damageEffect(target, player, player, 'thunder');
                        
                        player.chooseBool('是否对' + get.translation(target) + '造成1点雷属性伤害？')
                        .set('ai', function() {
                            return _status.event.eff > 0;
                        })
                        .set('eff', eff);
                    } else {
                        event.finish();
                    }
                    
                    'step 3'
                    if(result.bool) {
                        player.line(event.source, 'thunder');
                        event.source.damage('thunder', player);
                    }
                },
                group: "chi_suchen_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            global: "roundStart",
                        },
                        forced: true,
                        silent: true,
                        popup: false,
                        content: function() {
                            game.log('chi_suchen次数重置');
                            player.storage.chi_suchen_round = 0;
                        },
                        sub: true,
                        sourceSkill: "chi_suchen",
                        "_priority": 1,
                    },
                },
                "_priority": 0,
            },
clancixuan: {
    audio: "ext:剑影:2",
    enable: "phaseUse",
    usable: 1,
    mark: true,
    marktext: "玄",
    intro: {
        name: "玄",
        content: "expansion",
        markcount: "expansion",
    },
    init: function(player) {
        if (!player.storage.clancixuan) {
            player.storage.clancixuan = [];
        }
    },
    filter: function(event, player) {
        return player.countCards("he") > 0 || player.getExpansions("clancixuan").length > 0;
    },
    content: function() {
        "step 0"
        // 二选一
        player.chooseControl("选项一", "选项二")
            .set("prompt", "辞玄：选择一项")
            .set("choiceList", [
                "选择若干张牌置为“玄”",
                "获得至多三张“玄”"
            ])
            .set("ai", () => {
                const player = _status.event.player;
                const xuanCount = player.getExpansions("clancixuan").length;
                // 如果已经有玄 ≥3，则倾向选项二
                if (xuanCount >= 3) return 1;
                return 0;
            });
        
        "step 1"
        event.selectedOption = result.control;
        
        if (result.control === "选项一") {
            // 选项一：选择若干张牌置为“玄”
            player.chooseCard("he", [1, Infinity], "选择若干张牌置为“玄”")
                .set("ai", card => 6 - get.value(card));
        } else {
            // 选项二：获得至多三张“玄”
            const xuanCards = player.getExpansions("clancixuan");
            if (xuanCards.length === 0) {
                game.log("没有“玄”可以获得");
                event.finish();
                return;
            }
            
            const maxNum = Math.min(3, xuanCards.length);
            player.chooseButton(
                [`选择至多${maxNum}张“玄”`, xuanCards], 
                [1, maxNum], 
                true
            ).set("ai", button => {
                return get.value(button.link, _status.event.player);
            });
        }
        
        "step 2"
        if (!result.bool) {
            event.finish();
            return;
        }
        
        if (event.selectedOption === "选项一") {
            // 选项一：置为“玄”
            const cards = result.cards;
            
            // 使用标准方法置于武将牌上
            player.addToExpansion(cards, player, "giveAuto").gaintag.add("clancixuan");
            
            game.log(player, "将", cards, "置为“玄”");
            
        } else {
            // 选项二：获得“玄”
            const gainedCards = result.links;
            player.gain(gainedCards, "gain2");
            
            game.log(player, "获得了", gainedCards.length, "张“玄”");
        }
        
        "step 3"
        // 在这里重新计算X，确保是最新的“玄”数量
        if (event.selectedOption === "选项一") {
            // 选项一：X = 当前“玄”区总牌数（置入后）
            event.X = player.getExpansions("clancixuan").length;
        } else {
            // 选项二：X = 获得的“玄”的数量
            event.X = result.links ? result.links.length : 0;
        }
        
        const X = event.X;
        if (!X || X === 0) {
            event.finish();
            return;
        }
        
        const validCards = [];
        
        // 遍历所有基本牌和普通锦囊
        for (const name in lib.card) {
            const info = lib.card[name];
            if (!info) continue;
            
            const cardType = info.type;
            if (cardType !== "basic" && cardType !== "trick") continue;
            
            // 跳过延时锦囊
            if (info.isDelay || info.judge) continue;
            
            const nameLength = get.translation(name).length;
            if (nameLength === X) {
                validCards.push(name);
            }
        }
        
        if (validCards.length === 0) {
            game.log("没有牌名字数为", X, "的基本牌或普通锦囊");
            event.finish();
            return;
        }
        
        // 弹出vcard界面选择
        player.chooseButton(
            [`选择要视为使用的牌（牌名字数=${X}）`, [validCards.map(name => ["", "", name]), "vcard"]],
            true
        ).set("ai", button => {
            const player = _status.event.player;
            const name = button.link[2];
            
            // 简单的AI判断
            if (name === "tao" && player.isDamaged()) return 10;
            if (name === "wuzhong") return 8;
            if (name === "shunshou" || name === "guohe") return 7;
            if (name === "sha" && game.hasPlayer(t => player.canUse("sha", t))) return 6;
            if (name === "jiu") return 5;
            
            return Math.random() * 5;
        });
        
        "step 4"
        // 视为使用选中的牌
        if (result.bool && result.links && result.links.length) {
            const cardName = result.links[0][2];
            player.chooseUseTarget({ name: cardName }, true, false);
        }
    },
    onremove: function(player, skill) {
        const cards = player.getExpansions(skill);
        if (cards.length) {
            player.loseToDiscardpile(cards);
        }
    },
    ai: {
        order: 8,
        result: {
            player: 1,
        },
    },
},

clanqihai: {
    audio: "ext:剑影:2",
    trigger: {
        player: "damageEnd",
        source: "damageSource",
    },
    forced: true,
    content: function() {
        "step 0"
        // 正确判断目标
        // 当你受到伤害时(damageEnd)，目标是伤害来源
        // 当你造成伤害时(damageSource)，目标是受伤角色
        const target = trigger.name == "damage" ? trigger.player : trigger.source;
        
        if (!target || !target.isIn() || target == player) {
            event.finish();
            return;
        }
        event.target = target;
        
        // 获取“玄”区的所有类型
        const xuanCards2 = player.getExpansions("clancixuan");
        const types = [];
        for (const card of xuanCards2) {
            const type = get.type(card);
            if (!types.includes(type)) {
                types.push(type);
            }
        }
        event.types = types;
        
        // 检查目标是否有“玄”区没有的类型的牌
        const validCards = target.getCards("he").filter(card => {
            return !types.includes(get.type(card));
        });
        
        if (validCards.length > 0) {
            target.chooseCard(
                "he", 
                `选择一张“玄”区没有的类型的牌置为“玄”`, 
                (card, player) => {
                    const types = _status.event.types;
                    return !types.includes(get.type(card));
                }
            ).set("types", types)
              .set("ai", card => 6 - get.value(card));
        } else {
            event.goto(2);
        }
        
        "step 1"
        if (result.bool && result.cards && result.cards.length > 0) {
            // 将目标的牌置于你的武将牌上
            player.addToExpansion(result.cards, event.target, "giveAuto").gaintag.add("clancixuan");
            event.finish();
            return;
        }
        
        "step 2"
        // 移除一张“玄”并视为使用之
        const xuanCards = player.getExpansions("clancixuan");
        const removeCards = xuanCards.filter(card => {
            return event.target.hasUseTarget(card);
        });
        
        if (removeCards.length > 0) {
            event.target.chooseButton(
                [`移除一张“玄”并视为使用之`, removeCards]
            ).set("ai", button => {
                return get.effect(event.target, button.link, event.target, event.target);
            });
        } else {
            event.goto(4);
        }
        
        "step 3"
        if (result.bool && result.links && result.links.length > 0) {
            const card = result.links[0];
            event.target.useCard(card, false);
            event.finish();
            return;
        }
        
        "step 4"
        // 展示所有手牌
        event.target.showHandcards();
        
        "step 5"
        const suits = [];
        const hs = event.target.getCards("h");
        for (const card of hs) {
            const suit = get.suit(card);
            if (!suits.includes(suit)) {
                suits.push(suit);
            }
        }
        
        if (suits.length === 0) {
            event.finish();
            return;
        }
        
        player.chooseControl(suits)
            .set("prompt", "选择一种花色")
            .set("ai", () => {
                return _status.event.suits.randomGet();
            })
            .set("suits", suits);
        
        "step 6"
        const gainCards = event.target.getCards("h").filter(card => get.suit(card) == result.control);
        if (gainCards.length > 0) {
            player.gain(gainCards, event.target, "giveAuto");
        }
        
        "step 7"
        // 取消伤害
        trigger.cancel();
    },
},


       clantongmen: {
    audio: "ext:剑影:2",
    clanSkill: true,
    forced: true,
    group: ["clantongmen_damage", "clantongmen_trick", "clantongmen_clear"],
    subSkill: {
        damage: {
            forced: true,
            trigger: {source: "damageSource"},
            filter: function(event, player) {
                const phase = _status.currentPhase;
                if (!phase || !phase.hasClan("谯郡夏侯氏") || !player.hasClan("谯郡夏侯氏")) return false;
                if (player.storage.clantongmen_dmg_done) return false;
                return event.player != player;
            },
            async content(event, trigger, player) {
                let options = [];
                let skills = player.getSkills(null, false, false);
                for (let s of skills) {
                    if (s.indexOf("clantongmen") == 0) continue;
                    let info = get.info(s);
                    if (!info || info.locked || info.forced) continue;
                    
                    // ✅ 修复：检查技能是否有 usable 限制
                    let trans = get.translation(s + "_info") || "";
                    if (trans.includes("限一次") || (info.usable && info.usable == 1)) {
                        // ✅ 修复：检查技能是否已经在本回合使用过（不是通门标记）
                        let skillUsed = false;
                        
                        // 检查是否有 usable 计数
                        if (info.usable) {
                            const skillCount = player.countUsed(s);
                            if (skillCount >= info.usable) {
                                skillUsed = true;
                            }
                        }
                        
                        // 检查是否有 _used 标记（但排除通门添加的）
                        if (player.hasSkill(s + "_used") && !player.storage["clantongmen_" + s + "_used"]) {
                            skillUsed = true;
                        }
                        
                        if (!skillUsed) {
                            options.push(s);
                        }
                    }
                }

                if (!options.length) return;

                let chosen = "";
                if (options.length == 1) {
                    chosen = options[0];
                } else {
                    let {result} = await player.chooseControl(options.map(s => get.translation(s)).concat("cancel2"))
                        .set("prompt", "【通门】造成伤害：触发一个“限一次”技能");
                    if (result.control != "cancel2") {
                        chosen = options.find(s => get.translation(s) == result.control);
                    }
                }

                if (chosen) {
                    player.storage.clantongmen_dmg_done = true;
                    
                    // ✅ 修复：标记这是通门触发的，不影响主动使用
                    player.storage["clantongmen_" + chosen + "_used"] = true;
                    
                    player.logSkill("clantongmen");
                    game.log(player, "通过【通门】触发了", "#g【" + get.translation(chosen) + "】");
                    
                    // ✅ 修复：为 enable: "phaseUse" 的技能提供 target
                    const skillInfo = get.info(chosen);
                    if (skillInfo && skillInfo.enable == "phaseUse" && skillInfo.filterTarget) {
                        // 需要选择目标
                        const {result: targetResult} = await player.chooseTarget(
                            `【通门】触发【${get.translation(chosen)}】：选择一个目标`,
                            true,
                            (card, player, target) => {
                                const skill = _status.event.skill;
                                const info = get.info(skill);
                                if (info.filterTarget) {
                                    return info.filterTarget(card, player, target);
                                }
                                return true;
                            }
                        ).set("skill", chosen).set("ai", target => {
                            return get.attitude(_status.event.player, target);
                        });
                        
                        if (targetResult.bool && targetResult.targets && targetResult.targets.length > 0) {
                            // 手动触发技能并传入 target
                            const next = player.useSkill(chosen, targetResult.targets[0]);
                            if (next && next.event) {
                                next.event.target = targetResult.targets[0];
                            }
                        }
                    } else {
                        await player.useSkill(chosen, trigger);
                    }
                }
            }
        },
        trick: {
            trigger: {player: "useCard1"},
            forced: true,
            filter: function(event, player) {
                const phase = _status.currentPhase;
                if (!phase || !phase.hasClan("谯郡夏侯氏") || !player.hasClan("谯郡夏侯氏")) return false;
                if (player.storage.clantongmen_tri_done) return false;
                return get.type(event.card) == "trick";
            },
            async content(event, trigger, player) {
                let options = [];
                let skills = player.getSkills(null, false, false);
                for (let s of skills) {
                    if (s.indexOf("clantongmen") == 0) continue;
                    let info = get.info(s);
                    if (!info || info.locked || info.forced) continue;
                    
                    let trans = get.translation(s + "_info") || "";
                    if (trans.includes("限一次") || (info.usable && info.usable == 1)) {
                        let skillUsed = false;
                        
                        if (info.usable) {
                            const skillCount = player.countUsed(s);
                            if (skillCount >= info.usable) {
                                skillUsed = true;
                            }
                        }
                        
                        if (player.hasSkill(s + "_used") && !player.storage["clantongmen_" + s + "_used"]) {
                            skillUsed = true;
                        }
                        
                        if (!skillUsed) {
                            options.push(s);
                        }
                    }
                }

                if (!options.length) return;

                let chosen = "";
                if (options.length == 1) {
                    chosen = options[0];
                } else {
                    let {result} = await player.chooseControl(options.map(s => get.translation(s)).concat("cancel2"))
                        .set("prompt", "【通门】使用锦囊：触发一个“限一次”技能");
                    if (result.control != "cancel2") {
                        chosen = options.find(s => get.translation(s) == result.control);
                    }
                }

                if (chosen) {
                    player.storage.clantongmen_tri_done = true;
                    player.storage["clantongmen_" + chosen + "_used"] = true;
                    
                    player.logSkill("clantongmen");
                    game.log(player, "通过【通门】触发了", "#g【" + get.translation(chosen) + "】");
                    
                    // ✅ 修复：为 enable: "phaseUse" 的技能提供 target
                    const skillInfo = get.info(chosen);
                    if (skillInfo && skillInfo.enable == "phaseUse" && skillInfo.filterTarget) {
                        const {result: targetResult} = await player.chooseTarget(
                            `【通门】触发【${get.translation(chosen)}】：选择一个目标`,
                            true,
                            (card, player, target) => {
                                const skill = _status.event.skill;
                                const info = get.info(skill);
                                if (info.filterTarget) {
                                    return info.filterTarget(card, player, target);
                                }
                                return true;
                            }
                        ).set("skill", chosen).set("ai", target => {
                            return get.attitude(_status.event.player, target);
                        });
                        
                        if (targetResult.bool && targetResult.targets && targetResult.targets.length > 0) {
                            const next = player.useSkill(chosen, targetResult.targets[0]);
                            if (next && next.event) {
                                next.event.target = targetResult.targets[0];
                            }
                        }
                    } else {
                        await player.useSkill(chosen, trigger);
                    }
                }
            }
        },
        // ✅ 新增：回合结束时清除通门标记
        clear: {
            trigger: {global: "phaseEnd"},
            forced: true,
            silent: true,
            popup: false,
            content: function() {
                delete player.storage.clantongmen_dmg_done;
                delete player.storage.clantongmen_tri_done;
                
                // 清除所有通门技能标记
                for (let key in player.storage) {
                    if (key.indexOf("clantongmen_") == 0 && key.indexOf("_used") > 0) {
                        delete player.storage[key];
                    }
                }
            }
        }
    }
},

clanliaozhi: {
    audio: "ext:剑影:2",
    usable: 1,
    enable: "phaseUse",
    filter: function(event, player) {
        return player.getDamagedHp() > 0 && game.hasPlayer(current => current != player && current.countCards("h") > 0);
    },
    content: async function(event, trigger, player) {
        // ✅ 只添加这个检查
        'step 0'
        if (!event.targets || !event.targets.length) {
            event.finish();
            return;
        }
                    const num = player.getDamagedHp();
                    const {result} = await player.chooseTarget(
                        `燎志：是否与至多${get.cnNumber(num)}名角色同时拼点？`,
                        [1, num],
                        (card, player, target) => {
                            return target != player && target.countCards("h") > 0;
                        }
                    ).set("ai", target => {
                        const player = _status.event.player;
                        const att = get.attitude(player, target);
                        if (att > 0) return 0;
                        const hs = player.getCards("h").sort((a, b) => get.number(b) - get.number(a));
                        const ts = target.getCards("h").sort((a, b) => get.number(a) - get.number(b));
                        if (hs[0] && ts[0] && get.number(hs[0]) > get.number(ts[0])) {
                            return -att;
                        }
                        return 0;
                    });
                    
                    if (result.bool) {
                        const targets = result.targets;
                        player.addTempSkill("clanliaozhi_damage");
                        
                        for (const target of targets) {
                            const {result: compareResult} = await player.chooseToCompare(target);
                            if (compareResult.bool) {
                                // 拼点赢，视为使用火杀
                                if (player.canUse({name: "sha", nature: "fire"}, target, false)) {
                                    await player.useCard({name: "sha", nature: "fire", isCard: true}, target, false);
                                }
                            } else {
                                // 拼点输，目标视为对player使用火杀
                                if (target.canUse({name: "sha", nature: "fire"}, player, false)) {
                                    await target.useCard({name: "sha", nature: "fire", isCard: true}, player, false);
                                }
                            }
                        }
                        
                        // 检查是否造成或受到伤害
                        if (player.hasHistory("damage", evt => evt.getParent(3).name == "clanliaozhi") ||
player.hasHistory("sourceDamage", evt => evt.getParent(3).name == "clanliaozhi")){
                                await player.draw(num);
                        }
                    }
                },
                subSkill: {
                    damage: {
                        charlotte: true,
                        sub: true,
                        sourceSkill: "clanliaozhi",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            clanzhenjie: {
                audio: "ext:剑影:2",
                trigger: {
                    source: "damageSource",
                    global: "damageEnd",
                },
                forced: true,
                filter: function(event, player, name) {
                    if (!event.nature) return false;
                    if (name == "damageSource") return true;
                    if (name == "damageEnd") {
                        return get.distance(player, event.player) <= 1;
                    }
                    return false;
                },
                content: async function(event, trigger, player) {
                    const cards = game.cardsGotoOrdering(get.cards(2)).cards;
                    await player.showCards(cards, "赈节");
                    
                    const target = trigger.name == "damageSource" ? trigger.player : trigger.player;
                    const usable = cards.filter(card => {
                        return player.hasUseTarget(card) || target.hasUseTarget(card);
                    });
                    
                    if (usable.length) {
                        const {result} = await player.chooseButton(
                            ["赈节：选择要使用的牌", usable],
                            true
                        ).set("ai", button => {
                            return get.value(button.link);
                        });
                        
                        if (result.bool) {
                            const card = result.links[0];
                            const {result: targetResult} = await player.chooseTarget(
                                "选择使用" + get.translation(card) + "的角色",
                                (card, player, target) => {
                                    const c = _status.event.card;
                                    return target.hasUseTarget(c);
                                }
                            ).set("card", card).set("ai", target => {
                                const player = _status.event.player;
                                const card = _status.event.card;
                                return get.effect(target, card, target, player);
                            });
                            
                            if (targetResult.bool) {
                                await targetResult.targets[0].useCard(card);
                            }
                        }
                    }
                },
                "_priority": 0,
            },
 // 修复 clanyouxi（游袭）
clanyouxi: {
    audio: "ext:剑影:2",
    trigger: {
        player: ["useCard", "respond", "damageEnd"],
    },
    filter: function(event, player) {
        // 受到伤害时触发
        if (event.name == "damage") {
            if (player.hasSkill("clanyouxi_damage_used")) return false;
            return true;
        }
        
        // 响应牌时触发（回合外）
        if (event.name == "useCard" || event.name == "respond") {
            if (_status.currentPhase == player) return false; // 必须是回合外
            if (player.hasSkill("clanyouxi_respond_used")) return false;
            // 必须是响应其他角色的牌
            return event.respondTo && event.respondTo[0] != player;
        }
        
        return false;
    },
    direct: true,
    content: function() {
        'step 0'
        // 修复：先检查 trigger 是否存在
        var isRespond = false;
        if (trigger && (trigger.name == "useCard" || trigger.name == "respond")) {
            isRespond = true;
        }
        event.isRespond = isRespond;
        
        player.chooseBool(
            get.prompt("clanyouxi"),
            `摸一张牌并使用一张【杀】`
        ).set("ai", function() {
            var player = _status.event.player;
            // 检查是否有杀或能转化成杀的牌
            var hasSha = player.countCards("hs", function(card) {
                return get.name(card) == "sha";
            }) > 0;
            
            // 检查是否能用技能转化杀
            if (!hasSha) {
                hasSha = player.countCards("hs", function(card) {
                    return player.hasValueTarget(card);
                }) > 0;
            }
            
            if (!hasSha) return false;
            
            // 检查是否有可攻击目标
            return game.hasPlayer(function(target) {
                return player.canUse("sha", target) && get.effect(target, {name: "sha"}, player, player) > 0;
            });
        });
        
        'step 1'
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("clanyouxi");
        
        // 标记本回合已使用
        if (event.isRespond) {
            player.addTempSkill("clanyouxi_respond_used");
        } else {
            player.addTempSkill("clanyouxi_damage_used");
        }
        
        'step 2'
        player.draw();
        
        'step 3'
        // 使用杀（不计入次数）
        player.chooseToUse(function(card, player, event) {
            // 允许使用名称为杀的牌
            if (get.name(card) == "sha") return true;
            // 允许使用能转化成杀的牌
            return false;
        }, "游袭：使用一张【杀】（不计入次数）").set("addCount", false).set("filterTarget", function(card, player, target) {
            return lib.filter.targetEnabled.apply(this, arguments);
        });
    },
    subSkill: {
        respond_used: {
            charlotte: true,
            sub: true,
            sourceSkill: "clanyouxi",
        },
        damage_used: {
            charlotte: true,
            sub: true,
            sourceSkill: "clanyouxi",
        },
    },
},


// 修复 clanjianlei（渐擂）
clanjianlei: {
    audio: "ext:剑影:2",
    enable: ["chooseToUse", "chooseToRespond"],
    filter: function(event, player) {
        return ["h", "e", "j"].some(position => {
            return player.countCards(position) > 0;
        });
    },
    chooseButton: {
        dialog: function(event, player) {
            var dialog = ui.create.dialog("渐擂", "hidden");
            
            // 区域名称映射
            var positionNames = {
                h: "手牌",
                e: "装备",
                j: "判定"
            };
            
            // 为每个区域创建按钮
            for (const pos of ["h", "e", "j"]) {
                if (player.countCards(pos) > 0) {
                    var cards = player.getCards(pos);
                    dialog.addText(positionNames[pos] + "区（" + cards.length + "张）");
                    // 修复：直接添加牌，而不是使用 vcard
                    dialog.add([cards, "card"]);
                }
            }
            
            return dialog;
        },
        filter: function(button, player) {
            var card = button.link;
            var position = get.position(card);
            
            // 检查是否可以使用雷杀
            return _status.event.getParent().filterCard({
                name: "sha",
                nature: "thunder",
                cards: player.getCards(position),
            }, player, _status.event.getParent());
        },
        check: function(button) {
            var player = _status.event.player;
            var card = button.link;
            var position = get.position(card);
            var num = player.countCards(position);
            
            // AI：判断是否值得使用
            if (num >= 3) return 0; // 牌太多不划算
            
            // 检查是否有可攻击目标
            var hasTarget = game.hasPlayer(target => {
                return player.canUse({name: "sha", nature: "thunder"}, target) && 
                       get.effect(target, {name: "sha", nature: "thunder"}, player, player) > 0;
            });
            
            if (!hasTarget) return 0;
            
            // 根据区域和牌数评估
            if (position == "j") return 10; // 判定区优先
            if (position == "e" && num == 1) return 8; // 单张装备
            if (position == "h" && num <= 2) return 6 - get.value(card);
            
            return 0;
        },
        backup: function(links, player) {
            var card = links[0];
            var position = get.position(card);
            
            return {
                audio: "ext:剑影:2",
                position: position,
                filterCard: function(card) {
                    return get.position(card) == lib.skill.clanjianlei_backup.position;
                },
                selectCard: -1,
                viewAs: {name: "sha", nature: "thunder"},
                precontent: function() {
                    player.addTempSkill("clanjianlei_effect");
                    player.storage.clanjianlei_position = lib.skill.clanjianlei_backup.position;
                    player.storage.clanjianlei_num = event.result.cards.length;
                },
            };
        },
        prompt: function(links, player) {
            var card = links[0];
            var position = get.position(card);
            var num = player.countCards(position);
            
            // 区域名称映射
            var positionNames = {
                h: "手牌",
                e: "装备",
                j: "判定"
            };
            
            return `将${positionNames[position]}区的所有牌（${num}张）当做雷【杀】${_status.event.getParent().name == "chooseToRespond" ? "打出" : "使用"}`;
        },
    },
    ai: {
        order: function() {
            return get.order({name: "sha"}) + 0.1;
        },
        result: {
            player: function(player) {
                return game.hasPlayer(target => {
                    return player.canUse("sha", target) && get.effect(target, {name: "sha", nature: "thunder"}, player, player) > 0;
                }) ? 1 : 0;
            },
        },
    },
    subSkill: {
        effect: {
            trigger: {
                source: "damageSource",
            },
            forced: true,
            charlotte: true,
            popup: false,
            filter: function(event, player) {
                // 确保是渐擂造成的伤害
                return event.card && event.card.name == "sha" && event.card.nature == "thunder" &&
                       player.storage.clanjianlei_position;
            },
            content: function() {
                'step 0'
                var position = player.storage.clanjianlei_position;
                var num = player.storage.clanjianlei_num || 1;
                
                event.position = position;
                event.num = num;
                event.target = trigger.player;
                
                'step 1'
                player.chooseControl("选项一", "选项二")
                    .set("prompt", "渐擂：选择一项执行")
                    .set("choiceList", [
                        `摸${event.num}张牌`,
                        `获得${get.translation(event.target)}一张牌`,
                    ])
                    .set("ai", function() {
                        var player = _status.event.player;
                        var target = _status.event.customTarget;
                        var num = _status.event.customNum;
                        
                        // 如果目标有装备牌，优先获得
                        if (target && target.countCards("e") > 0) return "选项二";
                        // 如果X较大，优先摸牌
                        if (num >= 3) return "选项一";
                        // 否则看目标手牌数
                        if (target && target.countCards("h") > 2) return "选项二";
                        return "选项一";
                    })
                    .set("customTarget", event.target)
                    .set("customNum", event.num);
                
                'step 2'
                event.choice = result.control;
                
                'step 3'
                if (event.choice == "选项一") {
                    player.draw(event.num);
                } else {
                    player.gainPlayerCard(event.target, "he", true);
                }
                
                'step 4'
                // 如果获得了装备牌，可以使用
                if (event.choice == "选项二" && result.bool && result.cards && result.cards.length > 0) {
                    var card = result.cards[0];
                    if (get.type(card) == "equip") {
                        event.gainedCard = card;
                        player.chooseToUse(card, "渐擂：是否使用此装备牌？");
                    }
                }
                
                'step 5'
                // 跳过对应阶段
                var phaseMap = {
                    h: "phaseJudge",    // 手牌区 -> 判定阶段
                    e: "phaseDiscard",  // 装备区 -> 弃牌阶段
                    j: "phaseDraw",     // 判定区 -> 摸牌阶段
                };
                
                var phase = phaseMap[event.position];
                if (phase && _status.currentPhase == player) {
                    player.skip(phase);
                    game.log(player, "跳过了", "#y" + get.translation(phase));
                }
                
                // 清理存储
                delete player.storage.clanjianlei_position;
                delete player.storage.clanjianlei_num;
            },
            sub: true,
            sourceSkill: "clanjianlei",
        },
        backup: {
            sub: true,
            sourceSkill: "clanjianlei",
        },
    },
},


// translate部分

            clannige: {
                audio: "ext:剑影:2",
                trigger: {
                    source: "damageSource",
                },
                forced: true,
                groupSkill: "shu",
                filter: function(event, player) {
                    return player.group == "shu";
                },
                content: async function(event, trigger, player) {
                    const isVirtual = !trigger.card.isCard;
                    const range1 = player.getAttackRange();
                    const range2 = trigger.player.getAttackRange();
                    const diff = Math.abs(range1 - range2);
                    const x = Math.max(1, diff);
                   
                    if (isVirtual) {
                        await player.loseHp();
                        trigger.num += (diff === 0 ? 1 : x);  // ✅ 一行搞定
                    } else {
                        await player.recover();
                    }
                   
                    await player.draw(x);
                },
                "_priority": 0,
            },
            clanyanzhi: {
                audio: "ext:剑影:2",
                groupSkill: "wei",
                forced: true,
                group: ["clanyanzhi_use","clanyanzhi_draw","clanyanzhi_distance","clanyanzhi_change"],
                subSkill: {
                    use: {
                        mod: {
                            cardUsable: function(card, player) {
                                const y = game.countPlayer(current => {
                                    return current.getSkills(null, false, false).some(skill => {
                                        const info = get.plainText(get.skillInfoTranslation(skill));
                                        return info.includes("出牌阶段限一次");
                                    });
                                });
                                
                                if (player.hp <= y && get.number(card) >= y) {
                                    return Infinity;
                                }
                            },
                        },
                        sub: true,
                        sourceSkill: "clanyanzhi",
                        "_priority": 0,
                    },
                    draw: {
                        trigger: {
                            player: "useCardAfter",
                        },
                        forced: true,
                        filter: function(event, player) {
                            const y = game.countPlayer(current => {
                                return current.getSkills(null, false, false).some(skill => {
                                    const info = get.plainText(get.skillInfoTranslation(skill));
                                    return info.includes("出牌阶段限一次");
                                });
                            });
                            return player.hp <= y && get.number(event.card) >= y;
                        },
                        content: async function(event, trigger, player) {
                            const y = game.countPlayer(current => {
                                return current.getSkills(null, false, false).some(skill => {
                                    const info = get.plainText(get.skillInfoTranslation(skill));
                                    return info.includes("出牌阶段限一次");
                                });
                            });
                            await player.draw(y);
                        },
                        sub: true,
                        sourceSkill: "clanyanzhi",
                        "_priority": 0,
                    },
                    distance: {
                        mod: {
                            targetInRange: function(card, player) {
                                const y = game.countPlayer(current => {
                                    return current.getSkills(null, false, false).some(skill => {
                                        const info = get.plainText(get.skillInfoTranslation(skill));
                                        return info.includes("出牌阶段限一次");
                                    });
                                });
                                if (player.hp <= y && get.number(card) > y) return true;
                            },
                        },
                        sub: true,
                        sourceSkill: "clanyanzhi",
                        "_priority": 0,
                    },
                    change: {
                        trigger: {
                            player: "phaseBegin",
                        },
                        forced: true,
                        filter: function(event, player) {
                            const y = game.countPlayer(current => {
                                return current.getSkills(null, false, false).some(skill => {
                                    const info = get.plainText(get.skillInfoTranslation(skill));
                                    return info.includes("出牌阶段限一次");
                                });
                            });
                            return player.hp > y;
                        },
                        content: async function(event, trigger, player) {
                            const y = game.countPlayer(current => {
                                return current.getSkills(null, false, false).some(skill => {
                                    const info = get.plainText(get.skillInfoTranslation(skill));
                                    return info.includes("出牌阶段限一次");
                                });
                            });
                            
                            await player.loseHp(player.hp - y);
                            await player.draw(y);
                            player.changeGroup("shu");
                            player.loseMaxHp(1);
                            player.removeSkill('clanyanzhi');
                        },
                        sub: true,
                        sourceSkill: "clanyanzhi",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
           clanjishu: {
    audio: "ext:剑影:2",
    enable: "phaseUse",
    usable: 1,
    filterTarget: true,
    content: async function(event, trigger, player) {
        // ✅ 修复：确保有 target
        if (!event.target) {
            event.finish();
            return;
        }
        
        const y = game.countPlayer(current => {
            return current.getSkills(null, false, false).some(skill => {
                const info = get.plainText(get.skillInfoTranslation(skill));
                return info.includes("限一次");
            });
        });
        
        const target = event.target;
        await target.draw(y);
        
        const {result} = await target.chooseToDiscard("he", [0, Infinity], "疾殳：弃置任意张牌").set("ai", card => {
            const info = get.plainText(get.translation(card.name) + get.translation(card.name + "_info"));
            let value = 0;
            if (info.includes("杀")) value += 3;
            if (info.match(/\d/)) value += 2;
            if (info.includes("牌")) value += 1.5;
            if (info.includes("伤害")) value += 2.5;
            return value - get.value(card);
        });
        
        if (result.bool && result.cards.length) {
            const effects = [];
            for (const card of result.cards) {
                const info = get.plainText(get.translation(card.name) + get.translation(card.name + "_info"));
                if (info.includes("杀")) effects.push("sha");
                if (info.match(/\d/)) effects.push("recover");
                if (info.includes("牌")) effects.push("gain");
                if (info.includes("伤害")) effects.push("damage");
            }
            
            for (const effect of effects) {
                if (effect == "sha") {
                    await target.chooseUseTarget({name: "sha", nature: "fire"}, true)
                        .set("addCount", false);
                        
                } else if (effect == "recover") {
                    await target.recover();
                    
                } else if (effect == "gain") {
                    const {result: gainResult} = await target.chooseTarget("选择一名其他角色，获得其一张牌", (card, player, target) => {
                        return target != player && target.countGainableCards(player, "he") > 0;
                    }, true).set("ai", target => {
                        return -get.attitude(_status.event.player, target);
                    });
                    if (gainResult.bool) {
                        await target.gainPlayerCard(gainResult.targets[0], "he", true);
                    }
                    
                } else if (effect == "damage") {
                    const pile = Array.from(ui.discardPile.childNodes).filter(card => {
                        const type = get.type(card);
                        const info = get.plainText(get.translation(card.name) + get.translation(card.name + "_info"));
                        return type == "trick" && info.includes("伤害");
                    });
                    if (pile.length) {
                        await target.gain(pile.randomGet(), "gain2");
                    }
                }
            }
        }
    },
    ai: {
        order: 8,
        result: {
            target: function(player, target) {
                return 1;
            },
        },
    },
    "_priority": 0,
},
 clanxinmai: {
    audio: "ext:剑影:2",
    enable: "phaseUse",
    usable: 1,
    filterTarget: true,
    content: async function(event, trigger, player) {
        'step 0'
        if (!event.target) {
            if (trigger && trigger.player) {
                event.target = trigger.player;
            } else {
                event.finish();
                return;
            }
        }
        
        const target = event.target;
        
        // 获取本回合进入弃牌堆的所有杀
        const shas = [];
        const discardPile = Array.from(ui.discardPile.childNodes);
        
        // 遍历本回合的所有事件，找出进入弃牌堆的杀
        const history = game.getGlobalHistory("cardMove", evt => {
            if (evt.name != "cardsDiscard" && evt.name != "lose") return false;
            // 检查是否在本回合
            if (evt.getParent("phase") != _status.event.getParent("phase")) return false;
            return true;
        });
        
        // 从历史记录中收集杀
        for (const evt of history) {
            if (evt.cards) {
                for (const card of evt.cards) {
                    if (card.name == "sha" && discardPile.includes(card) && !shas.includes(card)) {
                        shas.push(card);
                    }
                }
            }
        }
        
        // 如果没有找到，尝试直接从弃牌堆筛选（备用方案）
        if (shas.length == 0) {
            for (const card of discardPile) {
                if (card.name == "sha") {
                    // 检查这张牌是否在本回合进入弃牌堆
                    const cardHistory = card.getHistory("lose", evt => {
                        return evt.toStorage == false && evt.getParent("phase") == _status.event.getParent("phase");
                    });
                    if (cardHistory.length > 0) {
                        shas.push(card);
                    }
                }
            }
        }
        
        event.shas = shas;
        
        'step 1'
        if (event.shas.length > 0) {
            game.log("找到", event.shas.length, "张【杀】");
            await event.target.gain(event.shas, "gain2");
        }
        
        'step 2'
        const {result} = await event.target.chooseControl("选项一", "选项二")
            .set("prompt", "薪脉：选择一项")
            .set("choiceList", [
                `${get.translation(player)}对你造成一点雷属性伤害`,
                `你的所有非属性【杀】视为【无懈可击】直到你下回合结束`,
            ])
            .set("ai", () => {
                const player = _status.event.player;
                const source = _status.event.source;
                if (get.attitude(player, source) > 0) return 1;
                if (player.hp <= 1) return 1;
                return 0;
            })
            .set("source", player);
        
        if (result.control == "选项一") {
            await player.damage(event.target, "thunder");
        } else {
            event.target.addTempSkill("clanxinmai_wuxie", {player: "phaseAfter"});
        }
    },
    subSkill: {
        wuxie: {
            mod: {
                cardname: function(card, player) {
                    if (card.name == "sha" && !card.nature) return "wuxie";
                },
            },
            mark: true,
            marktext: "脉",
            intro: {
                content: "所有非属性【杀】视为【无懈可击】",
            },
            sub: true,
            sourceSkill: "clanxinmai",
        },
    },
    ai: {
        order: 7,
        result: {
            target: 1,
        },
    },
},

clanyusui: {
    audio: "ext:剑影:2",
    group: ["clanyusui_damage", "clanyusui_phase"],
    subSkill: {
        damage: {
            audio: "clanyusui",
            trigger: {
                global: "damageEnd",
            },
            filter: function(event, player) {
                return event.nature != undefined;
            },
            logTarget: "player",
            check: function(event, player) {
                if (event.player && event.player.isIn()) {
                    return get.attitude(player, event.player) > 0;
                }
                return true;
            },
            content: async function(event, trigger, player) {
                player.draw();
                if (trigger.player && trigger.player.isIn()) {
                    trigger.player.draw();
                }
            },
            sub: true,
        },
        phase: {
            audio: "clanyusui",
            trigger: {
                global: ["phaseDrawSkipped", "phaseDrawCancelled",
                        "phaseUseSkipped", "phaseUseCancelled",
                        "phaseDiscardSkipped", "phaseDiscardCancelled",
                        "phaseJudgeSkipped", "phaseJudgeCancelled",
                        "phaseZhunbeiSkipped", "phaseZhunbeiCancelled",
                        "phaseJieshuSkipped", "phaseJieshuCancelled"],
            },
            filter: function(event, player) {
                return event.player != player && player.countCards('h') > 0;
            },
            logTarget: "player",
            check: function(event, player) {
                return get.attitude(player, event.player) > 0;
            },
            content: function() {
                'step 0'
 
                event.phaseTarget = trigger.player;
                
                // 将事件名称转换为阶段名称
                let phaseName = trigger.name.replace("Skipped", "").replace("Cancelled", "");
                event.skippedPhaseName = phaseName;
                game.log("跳过的阶段名称:", phaseName);
                
                var handCards = player.getCards("h");
                game.log("当前手牌数:", handCards.length);
                
                if (handCards.length == 0) {
                    event.finish();
                } else if (handCards.length == 1) {
                    event.keepCard = handCards[0];
                    event.goto(2);
                } else {
                    player.chooseCard("h", true, "毓髓：选择一张手牌保留，弃置其余手牌");
                }
                
                'step 1'
         
                
                if (result.bool && result.cards && result.cards.length) {
                    event.keepCard = result.cards[0];
                    
                    var allCards = player.getCards("h");
                    var toDiscard = allCards.filter(card => card != event.keepCard);
                    
                    if (toDiscard.length > 0) {
                        player.discard(toDiscard);
                    }
                } else {
                    event.finish();
                }
                
                'step 2'

                
                if (event.phaseTarget && event.phaseTarget.isIn() && event.skippedPhaseName) {
                    var phaseNames = {
                        phaseZhunbei: "准备阶段",
                        phaseJudge: "判定阶段",
                        phaseDraw: "摸牌阶段",
                        phaseUse: "出牌阶段",
                        phaseDiscard: "弃牌阶段",
                        phaseJieshu: "结束阶段"
                    };
                    var displayName = phaseNames[event.skippedPhaseName] || event.skippedPhaseName;
                    game.log(event.phaseTarget, "将于本回合后执行额外的", "#g" + displayName);
                    
                    // ✅ 关键修改：添加技能到回合结束
                    event.phaseTarget.addSkill("clanyusui_extra");
                    if (!event.phaseTarget.storage.clanyusui_extra) {
                        event.phaseTarget.storage.clanyusui_extra = [];
                    }
                    event.phaseTarget.storage.clanyusui_extra.push(event.skippedPhaseName);
                    game.log("storage内容:", event.phaseTarget.storage.clanyusui_extra);
                } else {
                    game.log("⚠️ 无法添加额外阶段");
                }
             
            },
            sub: true,
        },
        extra: {
            trigger: {
                player: "phaseAfter",
            },
            forced: true,
            charlotte: true,
            popup: false,
            content: function() {
                'step 0'
        
                
                var phases = player.storage.clanyusui_extra || [];
                event.phases = phases.slice();
          
                
                delete player.storage.clanyusui_extra;
                player.removeSkill("clanyusui_extra");
                
                'step 1'
         
                
                if (event.phases.length > 0 && player.isIn()) {
                    var phaseName = event.phases.shift();
                    game.log("当前执行阶段:", phaseName);
                    
                    var phaseNames = {
                        phaseZhunbei: "准备阶段",
                        phaseJudge: "判定阶段",
                        phaseDraw: "摸牌阶段",
                        phaseUse: "出牌阶段",
                        phaseDiscard: "弃牌阶段",
                        phaseJieshu: "结束阶段"
                    };
                    var displayName = phaseNames[phaseName] || phaseName;
                    game.log(player, "执行额外的", "#g" + displayName);
                    
                    player[phaseName]();
                }
                
                'step 2'
              
                if (event.phases.length > 0 && player.isIn()) {
                    game.log("还有阶段需要执行，回到step 1");
                    event.goto(1);
                } else {
                    game.log("所有额外阶段执行完毕");
                }
            },
            sub: true,
        },
    },
},




            clanrenfu: {
                audio: "ext:剑影:2",
                trigger: {
                    player: "useCard",
                },
                forced: true,
                filter: function(event, player) {
                    if (get.type(event.card) != "trick") return false;
                    return !player.hasHistory("useCard", evt => {
                        return evt != event && get.type(evt.card) == "trick";
                    });
                },
                content: async function(event, trigger, player) {
                    const x = player.getHistory("useCard", evt => {
                        return get.type(evt.card) == "basic";
                    }).length;
                    
                    await player.draw(x);
                    
                    if (x <= 2) {
                        await _status.currentPhase.damage(player, "thunder");
                        
                        if (_status.currentPhase != player) {
                            const cards1 = _status.currentPhase.getCards("ej");
                            const cards2 = player.getCards("ej");
                            
                            if (cards1.length || cards2.length) {
                                const {result} = await player.chooseButton([`移动一张场上的牌`, [cards1.concat(cards2), "vcard"]], true)
                                    .set("ai", button => {
                                        return Math.random();
                                    });
                                
                                if (result.bool) {
                                    const card = result.links[0];
                                    const owner = get.owner(card);
                                    const target = owner == player ? _status.currentPhase : player;
                                    
                                    if (get.position(card) == "j") {
                                        await target.addJudge(card);
                                    } else {
                                        await target.equip(card);
                                    }
                                }
                            }
                        }
                    }
                },
                "_priority": 0,
            },
            clanyanzu: {
                audio: "ext:剑影:2",
                init: function(player) {
                    player.storage.clanyanzu_used = false;
                },
                mark: true,
                intro: {
                    content: function(storage, player) {
                        return player.storage.clanyanzu_used ? "本回合已发动" : "本回合未发动";
                    },
                },
                group: ["clanyanzu_damage","clanyanzu_use"],
                subSkill: {
                    damage: {
                        audio: "clanyanzu",
                        trigger: {
                            player: "damageEnd",
                        },
                        filter: function(event, player) {
                            // 检查本回合是否已使用
                            if (player.storage.clanyanzu_used) return false;
                            
                            // 检查弃牌堆是否有牌
                            return Array.from(ui.discardPile.childNodes).length > 0;
                        },
                        direct: true,
                        content: async function(event, trigger, player) {
                            const cards = Array.from(ui.discardPile.childNodes);
                            
                            if (cards.length == 0) {
                                event.finish();
                                return;
                            }
                            
                            const {result} = await player.chooseButton(
                                [`###衍族###是否使用弃牌堆中的一张牌？`, cards],
                                1
                            )
                            .set("filterButton", button => {
                                return player.hasUseTarget(button.link);
                            })
                            .set("ai", button => {
                                const player = _status.event.player;
                                return get.value(button.link, player);
                            });
                            
                            if (result.bool && result.links && result.links.length > 0) {
                                player.logSkill("clanyanzu_damage");
                                player.storage.clanyanzu_used = true;
                                player.markSkill("clanyanzu");
                                
                                const card = result.links[0];
                                
                                // 使用这张牌（无距离限制）
                                await player.chooseUseTarget(card, true, false)
                                    .set("addCount", false)
                                    .set("logSkill", "clanyanzu_damage");
                                
                                // 检查牌名字数
                                await lib.skill.clanyanzu.checkAndDraw(player, card);
                            }
                        },
                        sub: true,
                        sourceSkill: "clanyanzu",
                        "_priority": 0,
                    },
                    use: {
                        audio: "clanyanzu",
                        enable: "phaseUse",
                        filter: function(event, player) {
                            // 检查本回合是否已使用
                            if (player.storage.clanyanzu_used) return false;
                            
                            // 检查弃牌堆是否有牌
                            return Array.from(ui.discardPile.childNodes).length > 0;
                        },
                        filterCard: () => false,
                        selectCard: -1,
                        content: async function(event, trigger, player) {
                            player.storage.clanyanzu_used = true;
                            player.markSkill("clanyanzu");
                            
                            const cards = Array.from(ui.discardPile.childNodes);
                            
                            if (cards.length == 0) {
                                event.finish();
                                return;
                            }
                            
                            const {result} = await player.chooseButton(
                                [`选择弃牌堆中的一张牌使用`, cards],
                                true
                            )
                            .set("filterButton", button => {
                                return player.hasUseTarget(button.link);
                            })
                            .set("ai", button => {
                                const player = _status.event.player;
                                return get.value(button.link, player);
                            });
                            
                            if (result.bool && result.links && result.links.length > 0) {
                                const card = result.links[0];
                                
                                // 使用这张牌（无距离限制）
                                await player.chooseUseTarget(card, true, false)
                                    .set("addCount", false)
                                    .set("logSkill", "clanyanzu_use");
                                
                                // 检查牌名字数
                                await lib.skill.clanyanzu.checkAndDraw(player, card);
                            }
                        },
                        ai: {
                            order: 10,
                            result: {
                                player: function(player) {
                                    const cards = Array.from(ui.discardPile.childNodes);
                                    for (const card of cards) {
                                        if (player.hasUseTarget(card) && get.value(card, player) > 0) {
                                            return 1;
                                        }
                                    }
                                    return 0;
                                },
                            },
                        },
                        sub: true,
                        sourceSkill: "clanyanzu",
                        "_priority": 0,
                    },
                },
                checkAndDraw: async function(player, card) {
                    const cardName = get.translation(card.name);
                    const nameLength = cardName.length;
                    
                    game.log(player, "使用的牌名为", "#g" + cardName, "，字数为", "#y" + nameLength);
                    
                    if (nameLength >= player.hp) {
                        // 统计场上所有"出牌阶段限一次"的技能数
                        let x = 0;
                        const countedSkills = new Set();
                        
                        for (const current of game.players) {
                            const skills = current.getSkills(null, false, false).filter(skill => {
                                const info = get.info(skill);
                                return info && !info.sub;
                            });
                            
                            for (const skill of skills) {
                                if (countedSkills.has(skill)) continue;
                                
                                const skillInfo = get.translation(skill + "_info");
                                if (skillInfo && (
                                    skillInfo.includes("出牌阶段限一次") ||
                                    skillInfo.includes("出牌阶段，限一次")
                                )) {
                                    countedSkills.add(skill);
                                    x++;
                                }
                            }
                        }
                        
                        if (x > 0) {
                            game.log(player, "统计到场上有", "#g" + x + "个", "出牌阶段限一次的技能");
                            await player.draw(x);
                        } else {
                            game.log("场上没有出牌阶段限一次的技能");
                        }
                    }
                },
                trigger: {
                    player: "phaseAfter",
                },
                silent: true,
                lastDo: true,
                content: function() {
                    player.storage.clanyanzu_used = false;
                    player.unmarkSkill("clanyanzu");
                },
                "_priority": 0,
                forced: true,
                popup: false,
            },
           
            clandulie: {
                audio: "ext:剑影:2",
                trigger: {
                    player: "damageBegin3",
                    source: "damageBefore",
                },
                forced: true,
                filter: function(event, player, name) {
                    if (name == "damageBegin3") {
                        return !player.storage.clandulie_damaged;
                    }
                    if (name == "damageBefore") {
                        return !player.storage.clandulie_source;
                    }
                    return false;
                },
                content: async function(event, trigger, player) {
                    if (event.triggername == "damageBegin3") {
                        trigger.num++;
                        player.storage.clandulie_damaged = true;
                    } else {
                        trigger.num++;
                        player.storage.clandulie_source = true;
                    }
                    
                    if (player.storage.clandulie_damaged && player.storage.clandulie_source) {
                        player.removeSkill("clandulie");
                    }
                },
                mark: true,
                intro: {
                    content: "首次造成和受到的伤害翻倍",
                },
                "_priority": 0,
            },
            clanjiaotan: {
                audio: "ext:剑影:2",
                enable: "phaseUse",
                usable: 1,
                filter: function(event, player) {
                    return game.hasPlayer(target => {
                        if (target == player) return false;
                        if (!target.countCards("h")) return false;
                        
                        // 技能数大于
                        const targetSkills = target.getStockSkills(false, true).length;
                        const playerSkills = player.getStockSkills(false, true).length;
                        if (targetSkills > playerSkills) return true;
                        
                        // 体力值大于
                        if (target.hp > player.hp) return true;
                        
                        return false;
                    });
                },
                filterTarget: function(card, player, target) {
                    if (target == player) return false;
                    if (!target.countCards("h")) return false;
                    
                    // 技能数大于
                    const targetSkills = target.getStockSkills(false, true).length;
                    const playerSkills = player.getStockSkills(false, true).length;
                    if (targetSkills > playerSkills) return true;
                    
                    // 体力值大于
                    if (target.hp > player.hp) return true;
                    
                    return false;
                },
                selectTarget: [1,Infinity],
                multitarget: true,
                multiline: true,
                content: function() {
                    "step 0";
                    // 检查是否有合法目标
                    const validTargets = game.filterPlayer(target => {
                        if (target == player) return false;
                        if (!target.countCards("h")) return false;
                        
                        const targetSkills = target.getStockSkills(false, true).length;
                        const playerSkills = player.getStockSkills(false, true).length;
                        if (targetSkills > playerSkills) return true;
                        
                        if (target.hp > player.hp) return true;
                        
                        return false;
                    });
                    
                    if (validTargets.length == 0) {
                        game.log(player, "没有可以进行议事的角色");
                        event.finish();
                        return;
                    }
                    
                    // 如果没有指定目标（被通门强制发动），自动选择所有合法目标
                    if (!targets || targets.length == 0) {
                        event.targets = validTargets;
                    }
                    
                    "step 1";
                    // 发起议事
                    const debateTargets = targets.slice();
                    if (!debateTargets.includes(player)) {
                        debateTargets.push(player);
                    }
                    
                    player.chooseToDebate(debateTargets).set("callback", async (evt, trigger, current) => {
                        const { debateResult: result } = evt;
                        const { bool, opinion } = result;
                        
                        // 存储到父事件
                        evt.getParent(2).debateResult = result;
                        
                        if (bool && opinion && ["red", "black"].includes(opinion)) {
                            game.log("议事结果为", "#g" + (opinion == "red" ? "红色" : "黑色"));
                            
                            // 记录本次议事结果
                            if (!current.storage.clanjiaotan_lastColor) {
                                current.storage.clanjiaotan_lastColor = opinion;
                                current.markSkill("clanjiaotan_lastColor");
                            } else {
                                current.storage.clanjiaotan_lastColor = opinion;
                            }
                        }
                    });
                    
                    "step 2";
                    // 检查议事结果
                    if (!event.debateResult) {
                        event.finish();
                        return;
                    }
                    
                    const { bool, opinion } = event.debateResult;
                    
                    if (!bool || !opinion || !["red", "black"].includes(opinion)) {
                        event.finish();
                        return;
                    }
                    
                    // 存储到 event 上
                    event.opinion = opinion;
                    event.oppositeColor = opinion == "red" ? "black" : "red";
                    
                    // 找出意见相反的角色
                    const oppositeTargets = event.debateResult[event.oppositeColor]
                        .map(i => i[0])
                        .unique()
                        .filter(i => i.countCards("h"));
                    
                    if (oppositeTargets.length == 0) {
                        event.goto(5); // 跳到检查手牌环节
                        return;
                    }
                    
                    event.oppositeTargets = oppositeTargets;
                    
                    "step 3";
                    // 选择一名意见相反的角色观看手牌
                    const oppositeColorName = event.oppositeColor == "red" ? "红色" : "黑色";
                    
                    player.chooseTarget(
                        `是否选择一名意见为${oppositeColorName}的角色，观看其手牌并使用其议事牌？`,
                        (card, player, target) => {
                            return _status.event.oppositeTargets.includes(target);
                        }
                    )
                    .set("oppositeTargets", event.oppositeTargets)
                    .set("ai", target => {
                        const player = _status.event.player;
                        const att = get.attitude(player, target);
                        let value = target.countCards("h") * 2;
                        if (att < 0) value += 10;
                        return value;
                    });
                    
                    "step 4";
                    if (!result.bool || !result.targets || !result.targets.length) {
                        event.goto(6); // 跳到检查手牌环节
                        return;
                    }
                    
                    event.viewTarget = result.targets[0];
                    
                    // 找出该角色的议事牌
                    let debateCard = null;
                    for (const list of event.debateResult[event.oppositeColor]) {
                        if (list[0] == event.viewTarget && list[1] && typeof list[1] != "string") {
                            debateCard = list[1];
                            break;
                        }
                    }
                    
                    if (!debateCard) {
                        event.goto(6); // 跳到检查手牌环节
                        return;
                    }
                    
                    event.debateCard = debateCard;
                    
                    // 观看手牌
                    player.viewHandcards(event.viewTarget);
                    
                    "step 5";
                    // 检查 viewTarget 和 debateCard 是否存在
                    if (!event.viewTarget || !event.debateCard) {
                        event.goto(6);
                        return;
                    }
                    
                    // 检查议事牌是否还在手牌中
                    if (!event.viewTarget.getCards("h").includes(event.debateCard)) {
                        game.log(event.debateCard, "已不在", event.viewTarget, "的手牌中");
                        event.goto(6);
                        return;
                    }
                    
                    // ✅ 修复：只使用议事牌，不弃置其他手牌
                    if (player.hasUseTarget(event.debateCard)) {
                        player.chooseUseTarget(
                            event.debateCard,
                            [event.debateCard],  // ✅ 只传入议事牌
                            false
                        ).set("logSkill", "clanjiaotan");
                    } else {
                        game.log(player, "无法使用", event.debateCard);
                    }
                    
                    "step 6";
                    // 选择一名参与议事的角色，检查手牌颜色
                    const allTargets = [];
                    for (const op of event.debateResult.opinions) {
                        for (const list of event.debateResult[op]) {
                            if (!allTargets.includes(list[0]) && list[0].countCards("h")) {
                                allTargets.push(list[0]);
                            }
                        }
                    }
                    
                    if (allTargets.length == 0) {
                        event.finish();
                        return;
                    }
                    
                    const oppositeColorName2 = event.oppositeColor == "red" ? "红色" : "黑色";
                    
                    player.chooseTarget(
                        `是否选择一名参与议事的角色，若其手牌中有${oppositeColorName2}牌，你摸两张牌`,
                        (card, player, target) => {
                            return _status.event.allTargets.includes(target);
                        }
                    )
                    .set("allTargets", allTargets)
                    .set("ai", target => {
                        const oppositeColor = _status.event.oppositeColor;
                        const cards = target.getCards("h");
                        const hasOpposite = cards.some(card => get.color(card, target) == oppositeColor);
                        
                        if (hasOpposite) {
                            return 100 + cards.length;
                        }
                        return 0;
                    })
                    .set("oppositeColor", event.oppositeColor);
                    
                    "step 7";
                    if (!result.bool || !result.targets || !result.targets.length) {
                        event.finish();
                        return;
                    }
                    
                    const checkTarget = result.targets[0];
                    const cards = checkTarget.getCards("h");
                    
                    const oppositeCards = cards.filter(card => get.color(card, checkTarget) == event.oppositeColor);
                    
                    if (oppositeCards.length > 0) {
                        game.log(player, "检查后发现", checkTarget, "有", "#g" + get.translation(event.oppositeColor) + "色牌");
                        player.draw(2);
                    } else {
                        game.log(player, "检查后发现", checkTarget, "没有", "#g" + get.translation(event.oppositeColor) + "色牌");
                    }
                },
                group: "clanjiaotan_add",
                subSkill: {
                    lastColor: {
                        marktext: "谈",
                        intro: {
                            content: function(storage) {
                                if (!storage) return "尚未发动过交谈";
                                return `上次议事结果：<span class="${storage == "red" ? "firetext" : "thundertext"}">${storage == "red" ? "红色" : "黑色"}</span>`;
                            },
                        },
                        sub: true,
                        sourceSkill: "clanjiaotan",
                        "_priority": 0,
                    },
                    add: {
                        audio: "clanjiaotan",
                        trigger: {
                            global: "debateShowOpinion",
                        },
                        filter: function(event, player) {
                            if (!event.targets.includes(player)) return false;
                            if (!player.storage.clanjiaotan_lastColor) return false;
                            return true;
                        },
                        direct: true,
                        content: function() {
                            "step 0";
                            const lastColor = player.storage.clanjiaotan_lastColor;
                            const lastColorName = lastColor == "red" ? "红色" : "黑色";
                            
                            player.chooseBool(`是否额外增加一张${lastColorName}意见？`)
                                .set("ai", () => {
                                    const trigger = _status.event.getTrigger();
                                    const color = _status.event.lastColor;
                                    const player = _status.event.player;
                                    
                                    const redCount = trigger.red.map(i => i[0]).unique().length;
                                    const blackCount = trigger.black.map(i => i[0]).unique().length;
                                    
                                    let playerOpinion = null;
                                    for (const op of trigger.opinions) {
                                        if (trigger[op].some(i => i[0] == player)) {
                                            playerOpinion = op;
                                            break;
                                        }
                                    }
                                    
                                    if (color == playerOpinion) {
                                        if (color == "red" && redCount <= blackCount) return true;
                                        if (color == "black" && blackCount <= redCount) return true;
                                    }
                                    
                                    return false;
                                })
                                .set("lastColor", lastColor);
                            
                            "step 1";
                            if (result.bool) {
                                player.logSkill("clanjiaotan_add");
                                
                                const lastColor = player.storage.clanjiaotan_lastColor;
                                trigger[lastColor].push([player, lastColor]);
                                game.log(player, "额外增加了一张", "#g" + (lastColor == "red" ? "红色" : "黑色") + "意见");
                            }
                        },
                        sub: true,
                        sourceSkill: "clanjiaotan",
                        "_priority": 0,
                    },
                },
                ai: {
                    order: 9,
                    result: {
                        target: function(player, target) {
                            // 技能数或体力值大于自己的目标
                            const targetSkills = target.getStockSkills(false, true).length;
                            const playerSkills = player.getStockSkills(false, true).length;
                            
                            let value = 0;
                            
                            // 手牌多的价值高
                            value += target.countCards("h") / 10;
                            
                            // 敌人价值更高
                            if (get.attitude(player, target) < 0) {
                                value += 1;
                            }
                            
                            return value;
                        },
                    },
                },
                "_priority": 0,
            },
chixingjue: {
    audio: "ext:剑影:2",
    // 1. 全局光环
    global: 'chixingjue_global',
    
    // 2. 辅助函数：判断是否符合“雍赯”条件 (核心修复点)
    checkYongtang: function(card, player) {
        // 安全检查：如果player不存在或没有技能，直接返回
        if (!player) return false;
        // 注意：这里也不要调用 player.hasSkill，在极高频的mod检测中，直接判定逻辑可能更稳，
        // 但通常 hasSkill 没问题。如果还报错，可以去掉这行校验，由调用者保证。
        
        // 【核心修复】：直接读取 card.name，绝对不要调用 get.info(card)
        var cardName = card.name;
        var info = lib.card[cardName];
        
        // 如果不是标准牌堆的牌（比如虚拟牌没注册），直接返回false
        if (!info) return false;

        // 获取卡牌名字长度 (直接翻译名字字符串，不要翻译card对象)
        var nameStr = get.translation(cardName);
        var len = nameStr.length;
        
        var maxTargets = 1;
        if (info.selectTarget == -1) {
            maxTargets = 99; // -1 代表无限目标
        } else if (Array.isArray(info.selectTarget)) {
            var range = info.selectTarget;
            maxTargets = (range[1] == -1) ? 99 : range[1];
        } else if (typeof info.selectTarget == 'number') {
            maxTargets = info.selectTarget;
        }
        
        // 判定逻辑
        // 因为 tag 触发时可能不在任何人的回合（比如弃牌阶段结束），需要安全判定
        var current = _status.currentPhase;
        if (player == current) {
            return maxTargets > len; // 回合内：目标 > 字数
        } else {
            return maxTargets < len; // 回合外/无回合：目标 < 字数
        }
    },

    // 3. 主技能：失去红色雍赯牌摸牌
    trigger: {
        player: 'loseAfter'
    },
    forced: true,
    filter: function(event, player) {
        if (event.type != 'discard' && event.type != 'use' && event.type != 'respond' && event.type != 'give') return false;
        
        for (var i = 0; i < event.cards.length; i++) {
            var card = event.cards[i];
            if (get.color(card) == 'red') {
                if (lib.skill.chixingjue.checkYongtang(card, player)) {
                    return true;
                }
            }
        }
        return false;
    },
    content: function() {
        player.showHandcards();
        var cards = player.getCards('h');
        var x = 0;
        for (var i = 0; i < cards.length; i++) {
            if (get.color(cards[i]) == 'red' && lib.skill.chixingjue.checkYongtang(cards[i], player)) {
                x++;
            }
        }
        
        if (x > 0) {
            player.draw(x);
            game.log(player, '因失去红色【雍赯】牌，摸了', x, '张牌');
        }
    },
    
    // 4. 组技能：实时维护“雍赯”标签
    group: "chixingjue_tag", 
    subSkill: {
        tag: {
            trigger: {
                player: ["gainAfter", "loseAfter", "phaseBegin", "phaseEnd"],
                global: ["phaseChange", "gameStart"] 
            },
            forced: true,
            silent: true,
            popup: false,
            // 过滤虚拟玩家或死人，防止不必要的计算
            filter: function(event, player) {
                return player.countCards('h') > 0 && player.isIn();
            },
            content: function() {
                var cards = player.getCards('h');
                var toAdd = [];
                var toRemove = [];
                
                for (var i = 0; i < cards.length; i++) {
                    var card = cards[i];
                    // 检查是否符合雍赯定义
                    var isYongtang = lib.skill.chixingjue.checkYongtang(card, player);
                    
                    if (isYongtang) {
                        if (!card.gaintag || !card.gaintag.includes('chiyongtang_tag')) {
                            toAdd.push(card);
                        }
                    } else {
                        if (card.gaintag && card.gaintag.includes('chiyongtang_tag')) {
                            toRemove.push(card);
                        }
                    }
                }
                
                if (toAdd.length > 0) player.addGaintag(toAdd, 'chiyongtang_tag');
                if (toRemove.length > 0) player.removeGaintag(toRemove, 'chiyongtang_tag');
            }
        }
    }
},

chixingjue_global: {
    mod: {
        cardname: function(card, player) {
            // 安全判定拥有者
            var skillOwner = null;
            if (player.hasSkill('chixingjue')) skillOwner = player;
            else {
                skillOwner = game.findPlayer(function(current){ return current.hasSkill('chixingjue'); });
            }
            if (!skillOwner) return;

            // 避免递归：获取花色时禁用mod
            var suit = get.suit(card, false);
            var storage = skillOwner.storage.chixingjue_disabled_suits || [];
            if (storage.includes(suit)) return;

            // 使用修复后的 checkYongtang
            if (lib.skill.chixingjue.checkYongtang(card, skillOwner)) {
                return 'jiu';
            }
        },
        cardUsable: function(card, player, num) {
            var skillOwner = game.findPlayer(function(current){ return current.hasSkill('chixingjue'); });
            if (skillOwner) {
               var suit = get.suit(card, false);
               var storage = skillOwner.storage.chixingjue_disabled_suits || [];
               if (storage.includes(suit)) return Infinity;
            }
        },
        ignoredHandcard: function(card, player) {
            var skillOwner = game.findPlayer(function(current){ return current.hasSkill('chixingjue'); });
            if (skillOwner) {
               var suit = get.suit(card, false);
               var storage = skillOwner.storage.chixingjue_disabled_suits || [];
               if (storage.includes(suit)) return true;
            }
        }
    },
    // 用牌时日志提示（可选，这里保留逻辑但注释掉防止刷屏）
    trigger: { global: "useCard1" },
    forced: true,
    popup: false,
    filter: function(event, player) {
        // 只做简单检查，避免复杂逻辑
        return game.hasPlayer(function(current){ return current.hasSkill('chixingjue'); });
    },
    content: function() {
        // 仅仅是打个log，不影响逻辑
    }
},
    // 2. 雍赯
   chiyongtang: {
    trigger: {
        player: 'useCard' 
    },
    forced: true,
    filter: function(event, player) {
        // 1. 处于【酒】状态
        if (!player.storage.jiu) return false;
        
        // 2. 红色非装备牌
        if (get.color(event.card) != 'red') return false;
        if (get.type(event.card) == 'equip') return false;
        
        // 3. 目标数 <= 2
        if (!event.targets || event.targets.length > 2) return false;
        
        return true;
    },
    content: function() {
        "step 0"
        // 进行判定
        player.judge(function(card) {
            return 0; // 纯展示，结果由花色决定
        });
        
        "step 1"
        // ⚠️ 修复：正确获取判定结果
        if (!result || !result.card) {
            event.finish();
            return;
        }
        
        var judgeCard = result.card;
        var judgeSuit = get.suit(judgeCard);
        var useCardSuit = get.suit(trigger.card);
        
        // 保存判定牌信息到 event
        event.judgeCard = judgeCard;
        event.judgeSuit = judgeSuit;
        
        // 判定逻辑
        var isSame = (judgeSuit == useCardSuit);
        
        if (!isSame) {
            // 花色不同 -> 额外指定目标下家
            game.log(player, '判定花色与牌花色不同，额外指定下家');
            
            // ⚠️ 修复：获取最后一个目标的下家
            var lastTarget = trigger.targets[trigger.targets.length - 1];
            var next = lastTarget.next;
            
            // 确保下家是合法目标且不重复
            if (next && !trigger.targets.includes(next) && player.canUse(trigger.card, next)) {
                trigger.targets.push(next);
                player.line(next, 'green');
                game.log(trigger.card, '额外指定了', next);
            }
        } else {
            // 花色相同 -> 额外指定目标上家
            game.log(player, '判定花色与牌花色相同，额外指定上家');
            
            // ⚠️ 修复：获取第一个目标的上家
            var firstTarget = trigger.targets[0];
            var prev = firstTarget.previous;
            
            // 确保上家是合法目标且不重复
            if (prev && !trigger.targets.includes(prev) && player.canUse(trigger.card, prev)) {
                trigger.targets.push(prev);
                player.line(prev, 'green');
                game.log(trigger.card, '额外指定了', prev);
            }
        }
        
        "step 2"
        // 1. 脱离【酒】状态
        delete player.storage.jiu;
        player.syncStorage('jiu');
        player.update();
        game.log(player, '脱离了【酒】状态');
        
        // 2. 记录失效花色（本回合内）
        var disableSuit = event.judgeSuit;
        
        // 存入 storage (数组)
        if (!player.storage.chixingjue_disabled_suits) {
            player.storage.chixingjue_disabled_suits = [];
        }
        if (!player.storage.chixingjue_disabled_suits.includes(disableSuit)) {
            player.storage.chixingjue_disabled_suits.push(disableSuit);
            player.markSkill('chixingjue_monitor');
            game.log(player, '本回合花色为', get.translation(disableSuit), '的牌失去了【醒釂】效果');
        }
        
        // 3. 添加监控技能
        player.addSkill('chixingjue_monitor');
    }
},

  clanshuji: {
    audio: "ext:剑影:2",
    trigger: {
        target: "useCardToTargeted",
    },
    filter: function(event, player) {
        // 必须是锦囊牌
        if (get.type(event.card) != "trick") return false;
        
        // 必须是多目标锦囊牌（目标数大于1）
        if (!event.targets || event.targets.length <= 1) return false;
        
        // 此牌的合法目标数不小于你的手牌数
        const handNum = player.countCards("h");
        const validTargets = game.filterPlayer(target => {
            return lib.filter.targetEnabled2(event.card, player, target);
        });
        
        return validTargets.length >= handNum;
    },
    direct: true,
    content: async function(event, trigger, player) {
        'step 0'
        const handNum = player.countCards("h");
        const discardNum = Math.ceil(handNum / 2); // 向上取整
        const newTargetNum = handNum - discardNum; // 弃置后的手牌数
        
        event.discardNum = discardNum;
        event.newTargetNum = newTargetNum;
        event.handNum = handNum;
        
        'step 1'
        const {result} = await player.chooseBool(
            get.prompt("clanshuji"),
            `弃置${event.discardNum}张手牌，将【${get.translation(trigger.card.name)}】的目标数调整至${event.newTargetNum}个`
        ).set("ai", () => {
            const player = _status.event.player;
            const trigger = _status.event.getTrigger();
            const card = trigger.card;
            
            // 如果是负面锦囊（如南蛮入侵、万箭齐发），减少目标数对自己有利
            if (get.tag(card, "multineg")) {
                return true;
            }
            
            // 如果是正面锦囊（如桃园结义、五谷丰登），减少目标数对自己不利
            if (get.tag(card, "multipos")) {
                return false;
            }
            
            // 默认情况下，如果手牌价值较低，可以考虑弃置
            const cards = player.getCards("h");
            let totalValue = 0;
            for (let i = 0; i < Math.min(event.discardNum, cards.length); i++) {
                totalValue += get.value(cards[i]);
            }
            return totalValue < 5;
        });
        
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("clanshuji");
        
        'step 2'
        // 弃置半数手牌
        const {result: discardResult} = await player.chooseToDiscard(
            event.discardNum,
            true,
            "h"
        ).set("prompt", `疏计：弃置${event.discardNum}张手牌`);
        
        'step 3'
        // 重新计算手牌数（因为可能有技能在弃牌后触发）
        const currentHandNum = player.countCards("h");
        event.finalTargetNum = currentHandNum;
        
        'step 4'
        // 调整目标数
        if (event.finalTargetNum <= 0) {
            // 如果手牌为0，取消此锦囊牌
            trigger.targets.length = 0;
            trigger.all_excluded = true;
            game.log(trigger.card, "的目标被清空");
            event.finish();
            return;
        }
        
        // 获取所有合法目标
        const validTargets = game.filterPlayer(target => {
            return lib.filter.targetEnabled2(trigger.card, trigger.player, target);
        });
        
        if (validTargets.length <= event.finalTargetNum) {
            // 如果合法目标数不超过目标手牌数，不需要调整
            game.log(player, "的手牌数为", "#g" + event.finalTargetNum, "，但合法目标数不足");
            event.finish();
            return;
        }
        
        'step 5'
        // 选择新的目标
        const {result: targetResult} = await player.chooseTarget(
            `疏计：选择${event.finalTargetNum}个目标`,
            event.finalTargetNum,
            true,
            (card, player, target) => {
                const trigger = _status.event.getTrigger();
                return lib.filter.targetEnabled2(trigger.card, trigger.player, target);
            }
        ).set("ai", target => {
            const player = _status.event.player;
            const trigger = _status.event.getTrigger();
            const card = trigger.card;
            
            // 如果是负面锦囊，选择敌人
            if (get.tag(card, "multineg")) {
                return -get.attitude(player, target);
            }
            
            // 如果是正面锦囊，选择友方
            if (get.tag(card, "multipos")) {
                return get.attitude(player, target);
            }
            
            return 0;
        });
        
        if (!targetResult.bool || !targetResult.targets) {
            event.finish();
            return;
        }
        
        'step 6'
        // 更新目标列表
        const oldTargets = trigger.targets.slice();
        trigger.targets.length = 0;
        trigger.targets.push(...targetResult.targets);
        
        game.log(player, "将", trigger.card, "的目标调整为", trigger.targets);
        
        // 更新getParent().triggeredTargets
        const parent = trigger.getParent();
        if (parent.triggeredTargets) {
            parent.triggeredTargets = targetResult.targets.slice();
        }
    },
    ai: {
        threaten: 1.5,
    },
},
            clanjieji: {
    audio: "ext:锻冶包:2",
    enable: "phaseUse",
    usable: 1,
    filter: function(event, player) {
        return game.hasPlayer(function(current) {
            return current !== player && current.countCards("h") >= player.hp;
        });
    },
    // 辅助函数：筛选可转化的牌
    getVCards: function(selectedCard, player, event) {
        if (!selectedCard) return [];
        var cardInfo = get.info(selectedCard);
        if (!cardInfo) return [];

        var origRange = [1, 1];
        if (cardInfo.selectTarget !== undefined) origRange = get.select(cardInfo.selectTarget);

        var result = [];
        for (var cardName in lib.card) {
            var cInfo = lib.card[cardName];
            if (!cInfo) continue;
            if (cInfo.type !== "basic" && cInfo.type !== "trick") continue;
            if (cInfo.isDelay || cInfo.judge || cInfo.notarget) continue;

            var targetRange = [1, 1];
            if (cInfo.selectTarget !== undefined) targetRange = get.select(cInfo.selectTarget);

            if (origRange[0] === targetRange[0] && origRange[1] === targetRange[1]) {
                var testCard = { name: cardName, nature: cInfo.nature };
                if (player.hasUseTarget(testCard)) {
                    result.push([cInfo.type || "basic", "", cardName, cInfo.nature || null]);
                }
            }
        }
        return result;
    },
    content: function() {
        "step 0";
        // 选择角色
        player.chooseTarget(
            "借笈：选择一名手牌数不小于你体力值的角色",
            true,
            function(card, player, target) {
                return target !== player && target.countCards("h") >= player.hp;
            }
        ).set("ai", function(target) {
            var player = _status.event.player;
            return target.countCards("h") - player.hp;
        });

        "step 1";
        if (!result.bool) { event.finish(); return; }
        event.target = result.targets[0];
        player.line(event.target, "green");
        player.viewHandcards(event.target);

        "step 2";
        // 选一张牌
        var cards = event.target.getCards("h");
        if (cards.length === 0) { event.finish(); return; }
        
        player.chooseButton(
            ["借笈：选择" + get.translation(event.target) + "的一张手牌", cards],
            true
        ).set("ai", function(button) {
            return get.value(button.link);
        });

        "step 3";
        if (!result.bool || !result.links || !result.links.length) { event.finish(); return; }
        event.selectedCard = result.links[0];

        var vcards = lib.skill.clanjieji.getVCards(event.selectedCard, player, event);
        if (vcards.length === 0) {
            game.log("没有可转化的牌");
            event.finish();
            return;
        }
        event.vcards = vcards;

        // 让玩家选择变成什么牌
        player.chooseButton(
            ["借笈：选择视为使用的牌", [vcards, "vcard"]],
            true
        ).set("ai", function(button) {
            // AI 简单逻辑
            var name = button.link[2];
            if (name === "wuzhong") return 10;
            if (name === "shunshou" || name === "guohe") return 9;
            return 5;
        });

        "step 4";
        if (!result.bool || !result.links || !result.links.length) { event.finish(); return; }
        event.viewAsName = result.links[0][2];
        event.viewAsNature = result.links[0][3];

        // 构造虚拟牌
        var cardToUse = {
            name: event.viewAsName,
            nature: event.viewAsNature,
            isCard: true,
            cards: [event.selectedCard],
            suit: event.selectedCard.suit,
            number: event.selectedCard.number,
        };

        // 视为使用
        player.chooseUseTarget(cardToUse, [event.selectedCard], true);

        "step 5";
        // 结算后摸牌逻辑
        var cardInfo = lib.card[event.viewAsName];
        var range = [1, 1];
        if (cardInfo && cardInfo.selectTarget !== undefined) {
            range = get.select(cardInfo.selectTarget);
        }
        // X = 合法目标数 (通常取 range[0] 或 range[1]，这里取max保证至少为1)
        var X = Math.max(1, range[0]);
        // 某些 AOE 可能是 range[1] 为 Infinity，这时候需要特殊处理，但无名杀通常取 range[0] 作为特征值较为稳妥
        // 或者可以按照“此技能视为未发动过”的描述，这里X应该是具体的目标数限制，还是实际选了几个目标？
        // 根据文案 "合法目标数"，倾向于 range[0] 或 range[1] 中较大的非无穷数，或者如果是一般牌就是固定的。
        // 为了代码稳定，这里取 range[0] 和 range[1] 中非 -1 的最大值，若无效则为 1
        var validTargetCount = 1;
        if(range[1] == -1) validTargetCount = 1; // 无限目标AOE，防止X过大，设为1或根据需求调整
        else validTargetCount = range[1];
        
        // 如果range是[1,1]，X就是1
        X = validTargetCount; 

        if (event.target && event.target.isAlive()) {
            event.target.draw(X);
        }

        // ---【补全部分开始】：添加计数技能 ---
        // 标记需要使用的牌数 X
        player.addSkill('_clanjieji_count');
        // 将计数存在 player 的 storage 中（当前回合有效）
        player.storage._clanjieji_count = X; 
        player.markSkill('_clanjieji_count'); // 显示标记（可选）
        
        game.log(player, '需要在本回合再使用', X, '张牌以刷新借笈');
    },
},

// 【配套的隐藏技能】：用于计数和刷新
_clanjieji_count: {
    trigger: {
        player: 'useCardAfter'
    },
    forced: true,
    popup: false,
    charlotte: true, // 临时技能
    filter: function(event, player) {
        // 必须在自己的出牌阶段，且任务计数大于0
        return _status.currentPhase == player && player.storage._clanjieji_count > 0;
    },
    content: function() {
        // 1. 扣减计数
        player.storage._clanjieji_count--;
        player.syncStorage('_clanjieji_count'); // 同步标记给前端

        // 2. 检查是否达成任务
        if (player.storage._clanjieji_count <= 0) {
            
            // 【核心修复点】：直接操作对象属性，而不是操作变量副本
            var stat = player.getStat();
            if (stat && stat.skill && stat.skill.clanjieji) {
                stat.skill.clanjieji--; // 让系统认为你少用了一次
                // 此时 stat.skill.clanjieji 变成了 0，系统就会允许你再次使用了
            }

            game.log(player, '完成了借笈的任务，技能已刷新！');
            player.popup('借笈刷新');
            
            // 3. 任务完成，清理自身
            player.removeSkill('_clanjieji_count');
            delete player.storage._clanjieji_count;
            player.unmarkSkill('_clanjieji_count');
            
        } else {
            // 可选：提示还需要多少张
            // player.popup(player.storage._clanjieji_count);
        }
    },
    marktext: "笈",
    intro: {
        content: "本回合内需再使用 # 张牌后，技能【借笈】视为未发动过。"
    },
    group: "_clanjieji_clear" 
},

// 别忘了清理技能，防止回合结束还留着标记
_clanjieji_clear: {
    trigger: {
        player: 'phaseUseEnd'
    },
    forced: true,
    popup: false,
    content: function() {
        player.removeSkill('_clanjieji_count');
        delete player.storage._clanjieji_count;
        player.unmarkSkill('_clanjieji_count');
    }
},
            yingtianshi: {
                audio: "ext:锻冶包:2",
                trigger: {
                    target: "useCardToTargeted",
                    global: "useCardAfter",
                },
                forced: true,
                init: function(player) {
                    if (!player.storage.yingtianshi_used) {
                        player.storage.yingtianshi_used = {};
                    }
                },
                getX: function(player) {
                    const counted = new Set(); // 用于记录已统计的技能，避免重复
                    
                    for (const current of game.players) {
                        const skills = current.getSkills(null, false, false);
                        for (const skill of skills) {
                            // 跳过子技能
                            if (skill.includes("_")) continue;
                            
                            // 跳过已统计的技能
                            if (counted.has(skill)) continue;
                            
                            // 检查技能描述是否包含"锁定技"
                            const translation = lib.translate[skill + "_info"] || "";
                            if (translation.includes("锁定技")) {
                                counted.add(skill);
                            }
                        }
                    }
                    
                    return counted.size;
                },
                filter: function(event, player, name) {
                    if (name === "useCardToTargeted") {
                        // 其他角色对你使用的首张牌
                        if (event.player === player) return false;
                        if (!event.card) return false; 
                        
                        const source = event.player;
                        const currentPhase = game.phaseNumber;
                        
                        // 检查是否是本回合首张对你使用的牌
                        if (!player.storage.yingtianshi_used[source.playerid]) {
                            player.storage.yingtianshi_used[source.playerid] = {};
                        }
                        if (player.storage.yingtianshi_used[source.playerid][currentPhase]) {
                            return false;
                        }
                        
                        // 检查牌名字数是否不小于体力值
                        const nameLength = get.translation(event.card.name).length;
                        return nameLength >= player.hp;
                    } else {
                        // 其他角色使用的首张非装备牌名字数不小于X
                        if (event.player === player) return false;
                        if (!event.card) return false;
                        
                        // 必须是非装备牌
                        if (get.type(event.card) === "equip") return false; 
                        
                        const source = event.player;
                        const currentPhase = game.phaseNumber;
                        
                        // 计算X值
                        const X = lib.skill.yingtianshi.getX(player);
                        
                        // 检查是否是本回合首张非装备牌
                        if (!player.storage.yingtianshi_used[source.playerid]) {
                            player.storage.yingtianshi_used[source.playerid] = {};
                        }
                        if (player.storage.yingtianshi_used[source.playerid][currentPhase + "_global"]) {
                            return false;
                        }
                        
                        const nameLength = get.translation(event.card.name).length;
                        if (nameLength < X) return false;
                        
                        // 检查是否能视为使用
                        return player.hasUseTarget(event.card);
                    }
                },
                content: function() {
                    if (event.triggername === "useCardToTargeted") {
                        // 对你使用的首张牌无效
                        const source = trigger.player;
                        const currentPhase = game.phaseNumber;
                        
                        if (!player.storage.yingtianshi_used[source.playerid]) {
                            player.storage.yingtianshi_used[source.playerid] = {};
                        }
                        player.storage.yingtianshi_used[source.playerid][currentPhase] = true;
                        
                        trigger.getParent().excluded.add(player);
                        game.log(trigger.card, "对", player, "无效");
                    } else {
                        // 视为使用之
                        const source = trigger.player;
                        const currentPhase = game.phaseNumber;
                        
                        if (!player.storage.yingtianshi_used[source.playerid]) {
                            player.storage.yingtianshi_used[source.playerid] = {};
                        }
                        player.storage.yingtianshi_used[source.playerid][currentPhase + "_global"] = true;
                        
                        player.chooseUseTarget({ name: trigger.card.name }, true, false);
                    }
                },
                group: ["yingtianshi_clear"],
                subSkill: {
                    clear: {
                        trigger: {
                            global: "phaseEnd",
                        },
                        forced: true,
                        popup: false,
                        content: function() {
                            // 清空回合记录
                            player.storage.yingtianshi_used = {};
                        },
                        sub: true,
                        sourceSkill: "yingtianshi",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
          yingchongming: {
    audio: "ext:锻冶包:2",
    trigger: {
        global: "phaseJieshuBegin",
    },
    filter: function(event, player) {
        // 检查本回合是否使用过牌
        if (!player.getHistory('useCard').length) return false;
        
        // 检查上一张使用的牌是否可用
        const history = player.getHistory('useCard');
        if (history.length == 0) return false;
        
        const lastCard = history[history.length - 1].card;
        if (!lastCard) return false;
        
        // 检查是否有牌名字数之和不小于4的牌
        const cards = player.getCards("he");
        if (cards.length === 0) return false;
        
        return true;
    },
    direct: true,
    content: function() {
        "step 0"
        // 获取上一张使用的牌
        const history = player.getHistory('useCard');
        const lastCard = history[history.length - 1].card;
        event.lastCardName = lastCard.name;
        
        game.log(player, '上一张使用的牌是', get.translation(event.lastCardName));
        
        // 询问是否发动
        player.chooseBool(get.prompt('yingchongming'), '将牌名字数之和不小于四的任意张牌当做【' + get.translation(event.lastCardName) + '】使用？')
            .set('ai', () => {
                return player.hasUseTarget({name: _status.event.cardName});
            })
            .set('cardName', event.lastCardName);
        
        "step 1"
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill('yingchongming');
        
        // 获取可选的牌
        const cards = player.getCards("he");
        const X = 4;
        
        if (cards.length == 0) {
            event.finish();
            return;
        }
        
        // 筛选出牌名字数不大于X的牌
        const validCards = cards.filter(function(card) {
            return get.cardNameLength(card) <= X;
        });
        
        if (validCards.length == 0) {
            game.log('没有符合条件的牌');
            event.finish();
            return;
        }
        
        // 选择牌
        const next = player.chooseButton(['崇铭：选择牌名字数之和不小于' + X + '的牌（可多选）', validCards], [1, validCards.length], true);
        next.set('filterButton', function(button) {
            const selected = ui.selected.buttons || [];
            let sum = 0;
            for (let i = 0; i < selected.length; i++) {
                sum += get.cardNameLength(selected[i].link);
            }
            sum += get.cardNameLength(button.link);
            return sum <= _status.event.maxSum || sum >= _status.event.targetSum;
        });
        next.set('selectButton', function() {
            const selected = ui.selected.buttons || [];
            let sum = 0;
            for (let i = 0; i < selected.length; i++) {
                sum += get.cardNameLength(selected[i].link);
            }
            if (sum >= _status.event.targetSum) {
                return [selected.length, selected.length];
            }
            return [1, validCards.length];
        });
        next.set('filterOk', function() {
            const selected = ui.selected.buttons || [];
            let sum = 0;
            for (let i = 0; i < selected.length; i++) {
                sum += get.cardNameLength(selected[i].link);
            }
            return sum >= _status.event.targetSum;
        });
        next.set('targetSum', X);
        next.set('maxSum', 20); // 设置一个合理的上限
        next.set('ai', function(button) {
            const selected = ui.selected.buttons || [];
            let sum = 0;
            for (let i = 0; i < selected.length; i++) {
                sum += get.cardNameLength(selected[i].link);
            }
            const remaining = _status.event.targetSum - sum;
            const cardLen = get.cardNameLength(button.link);
            if (cardLen == remaining) return 10 - get.value(button.link);
            if (cardLen < remaining) return 5 - get.value(button.link);
            return 0;
        });
        
        "step 2"
        if (!result.bool || !result.buttons || !result.buttons.length) {
            game.log('未选择牌或取消');
            event.finish();
            return;
        }
        
        const selectedCards = [];
        for (let i = 0; i < result.buttons.length; i++) {
            selectedCards.push(result.buttons[i].link);
        }
        
        let sum = 0;
        for (let i = 0; i < selectedCards.length; i++) {
            sum += get.cardNameLength(selectedCards[i]);
        }
        
        game.log('已选择', selectedCards.length, '张牌，名字数之和为', sum);
        
        if (sum < 4) {
            game.log('选择的牌名字数之和(' + sum + ')小于4，技能取消');
            event.finish();
            return;
        }
        
        event.selectedCards = selectedCards;
        
        // 视为使用该牌
        player.chooseUseTarget({name: event.lastCardName}, event.selectedCards, true, false);
        
        "step 3"
        // 计算X：全场技能描述拥有"锁定技"的技能数且至多为你的体力值
        const X2 = Math.min(lib.skill.yingtianshi.getX(player), player.hp);
        
        if (X2 > 0) {
            player.draw(X2);
            game.log(player, "摸了", X2, "张牌");
        }
    },
    ai: {
        threaten: 1.5,
    },
    "_priority": 0,
},

 // 骞闻 - 转换技
chiqianwen: {
    audio: 2,
    mark: true,
    locked: false,
    zhuanhuanji: true,
    marktext: "☯",
    intro: {
        content(storage, player, skill) {
            if (storage) {
                return "转换技，每回合限一次。阳：你可以将牌堆顶的一张牌当任意名字字数相同的基本牌或普通锦囊牌使用或打出。";
            }
            return "转换技，每回合限一次。阴：你可以将牌堆底的一张牌当任意名字字数相同的基本牌或普通锦囊牌使用或打出。";
        },
    },
    enable: ["chooseToUse", "chooseToRespond"],
    filter(event, player) {
        if (player.hasSkill("chiqianwen_used", null, null, false)) return false;
        const isYang = player.storage.chiqianwen;
        // 检查牌堆是否有牌
        if (isYang) {
            if (!ui.cardPile.firstChild) return false;
        } else {
            if (!ui.cardPile.lastChild) return false;
        }
        return true;
    },
    chooseButton: {
        dialog(event, player) {
            const isYang = player.storage.chiqianwen;
            // 获取牌堆顶或牌堆底的牌
            let card;
            if (isYang) {
                // 阳：牌堆顶
                card = ui.cardPile.firstChild;
            } else {
                // 阴：牌堆底
                card = ui.cardPile.lastChild;
            }
            
            if (!card) return ui.create.dialog("骞闻", "hidden");
            
            // 获取牌名字数
            const nameLength = get.cardNameLength(card);
            
            // 基础的基本牌和锦囊牌列表
            const basicCards = ["sha", "shan", "tao", "jiu"];
            const trickCards = ["wuzhong", "guohe", "shunshou", "jiedao", "juedou", "huogong", "tiesuo", "wuxie", "wugu","nanman","wanjian"];
            
            // 获取所有同字数的基本牌和普通锦囊牌
            const validCards = [];
            
            // 检查基本牌
            for (const name of basicCards) {
                if (get.cardNameLength({name: name}) == nameLength) {
                    validCards.push(["basic", "", name]);
                }
            }
            
            // 检查锦囊牌
            for (const name of trickCards) {
                if (get.cardNameLength({name: name}) == nameLength) {
                    validCards.push(["trick", "", name]);
                }
            }
            
            const position = isYang ? "牌堆顶" : "牌堆底";
            return ui.create.dialog("骞闻", `${position}的牌：【${get.translation(card)}】`, [validCards, "vcard"], "hidden");
        },
        filter(button, player) {
            const event = _status.event.getParent();
            return event.filterCard({name: button.link[2]}, player, event);
        },
        check(button) {
            const player = _status.event.player;
            const event = _status.event.getParent();
            if (event.type == "phase") {
                return player.getUseValue({name: button.link[2]}) + 1;
            }
            return 1;
        },
        backup(links, player) {
            return {
                audio: "chiqianwen",
                filterCard() {return false},
                selectCard: -1,
                viewAs: {name: links[0][2]},
                precontent() {
                    delete event.result.skill;
                    const isYang = player.storage.chiqianwen;
                    let card;
                    if (isYang) {
                        card = get.cards()[0];
                    } else {
                        card = get.cards("bottom")[0];
                    }
                    event.result.cards = [card];
                    event.result.card.cards = [card];
                    player.addTempSkill("chiqianwen_used", "phaseAfter");
                    player.changeZhuanhuanji("chiqianwen");
                    game.log(player, "将", card, "当作", event.result.card, "使用");
                },
            };
        },
        prompt(links, player) {
            const isYang = player.storage.chiqianwen;
            const position = isYang ? "牌堆顶" : "牌堆底";
            let card;
            if (isYang) {
                card = ui.cardPile.firstChild;
            } else {
                card = ui.cardPile.lastChild;
            }
            if (card) {
                return `将${position}的【${get.translation(card)}】当【${get.translation(links[0][2])}】使用或打出`;
            }
            return `将${position}的牌当【${get.translation(links[0][2])}】使用或打出`;
        },
    },
    ai: {
        order: 10,
        result: {
            player: 1,
        },
        threaten: 1.5,
    },
    subSkill: {
        used: {
            charlotte: true,
            sub: true,
            sourceSkill: "chiqianwen",
            "_priority": 0,
        },
    },
    "_priority": 0,
},

// 眷乡
chijuanxiang: {
    audio: 2,
    trigger: {player: "useCard"},  // 改成useCard试试
    forced: true,  // 先改回forced，确保一定会触发
    filter(event, player) {
        game.log("=== 眷乡filter被调用了！===");
        
        // 必须是出牌阶段使用的牌
        const parent = event.getParent("phaseUse");
        game.log("parent.name:", parent ? parent.name : "null");
        if (!parent || parent.name != "phaseUse") {
            game.log("不是出牌阶段，返回false");
            return false;
        }
        
        // 获取本回合出牌阶段使用过的所有牌
        const history = player.getHistory("useCard", evt => {
            const p = evt.getParent("phaseUse");
            return p && p.name == "phaseUse";
        });
        
        game.log("history长度:", history.length);
        
        // 统计不同牌名的数量
        const names = [];
        for (let i = 0; i < history.length; i++) {
            const cardName = history[i].card.name;
            if (!names.includes(cardName)) {
                names.push(cardName);
            }
        }
        
        const handNum = player.countCards("h");
        
        game.log("已使用牌名数：", names.length);
        game.log("牌名列表：", names);
        game.log("当前手牌数：", handNum);
        game.log("是否相等：", names.length == handNum);
        
        const result = names.length == handNum && names.length > 0;
        game.log("filter返回值：", result);
        
        return result;
    },
    content() {
        "step 0"
        game.log("=== 眷乡content开始执行 ===");
        player.logSkill("chijuanxiang");
        player.draw();
        player.removeSkill("chiqianwen_used");
        player.popup("眷乡");
        game.log(player, "重置了", "#g【骞闻】");
        player.updateMarks();
        
        "step 1"
        game.log("=== 眷乡step 1 ===");
        if (!player.countCards("h")) {
            event.finish();
            return;
        }
        player.chooseCard("h", "眷乡：是否将一张手牌置于牌堆顶或牌堆底？").set("ai", card => {
            return 6 - get.value(card);
        });
        
        "step 2"
        game.log("=== 眷乡step 2 ===");
        if (result.bool) {
            event.card = result.cards[0];
            player.chooseControl("牌堆顶", "牌堆底")
                .set("prompt", `将${get.translation(event.card)}置于牌堆顶或牌堆底`)
                .set("ai", () => {
                    return "牌堆底";
                });
        } else {
            event.finish();
        }
        
        "step 3"
        game.log("=== 眷乡step 3 ===");
        if (result.control == "牌堆顶") {
            player.lose(event.card, ui.cardPile, "insert");
            game.log(player, "将一张牌置于了牌堆顶");
        } else {
            player.lose(event.card, ui.cardPile);
            event.card.fix();
            ui.cardPile.appendChild(event.card);
            game.log(player, "将一张牌置于了牌堆底");
        }
    },
    intro: {
        content(storage, player, skill) {
            const history = player.getHistory("useCard", evt => {
                const p = evt.getParent("phaseUse");
                return p && p.name == "phaseUse";
            });
            const names = [];
            for (let i = 0; i < history.length; i++) {
                const cardName = history[i].card.name;
                if (!names.includes(cardName)) {
                    names.push(cardName);
                }
            }
            const handNum = player.countCards("h");
            let str = `当前手牌数：${handNum}<br>`;
            str += `本回合已使用牌名数：${names.length}<br>`;
            if (names.length > 0) {
                str += `已使用的牌名：`;
                for (let i = 0; i < names.length; i++) {
                    str += get.translation(names[i]);
                    if (i < names.length - 1) str += "、";
                }
                str += "<br>";
            }
            if (names.length == handNum && names.length > 0) {
                str += `<span style="color:#00ff00">已满足触发条件！</span>`;
            } else if (handNum > 0) {
                str += `还需使用${handNum - names.length}种不同牌名的牌`;
            }
            return str;
        },
        markcount(storage, player) {
            const history = player.getHistory("useCard", evt => {
                const p = evt.getParent("phaseUse");
                return p && p.name == "phaseUse";
            });
            const names = [];
            for (let i = 0; i < history.length; i++) {
                const cardName = history[i].card.name;
                if (!names.includes(cardName)) {
                    names.push(cardName);
                }
            }
            const handNum = player.countCards("h");
            return `${names.length}/${handNum}`;
        },
    },
    mark: true,
    group: "chijuanxiang_update",
    subSkill: {
        update: {
            trigger: {
                player: ["useCardAfter", "gainAfter", "loseAfter"],
                global: "phaseBegin",
            },
            silent: true,
            content() {
                player.updateMarks();
            },
        },
    },
},

clanfeishi: {
    audio: 2,
    trigger: {player: "damageBegin4"},
    filter: function(event, player) {
        return game.hasPlayer(function(current) {
            return current != player && current.countCards("he", {color: "red"}) >= 1;  // ✅ 改为至少1张
        });
    },
    direct: true,
    content: function() {
        'step 0'
        // ✅ 从 _trigger 获取真正的 trigger（因为可能被 clantongmen 调用）
        var realTrigger = event._trigger || trigger;
        
        player.chooseTarget(
            get.prompt2("clanfeishi"),
            [1, 2],
            function(card, player, target) {
                return target != player && target.countCards("he", {color: "red"}) >= 1;  // ✅ 改为至少1张
            }
        ).set("ai", function(target) {
            var player = _status.event.player;
            var att = get.attitude(player, target);
            if (att >= 0) return 0;
            
            // 优先选择红色牌多的敌人
            var redCount = target.countCards("he", {color: "red"});
            return -att * redCount;
        });
        
        'step 1'
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("clanfeishi", result.targets);
        player.addTempSkill("clanfeishi_used");
        event.targets = result.targets;
        event.shownCardsMap = {};  // ✅ 用于存储每个角色展示的牌
        event.allShownCards = [];  // ✅ 用于存储所有展示的牌
        event.targetIndex = 0;
        
        'step 2'
        // ✅ 让所有目标同时选择要展示的牌
        if (event.targetIndex >= event.targets.length) {
            event.goto(4);  // ✅ 跳到展示和选择环节
            return;
        }
        
        event.current = event.targets[event.targetIndex];
        var cards = event.current.getCards("he", {color: "red"});
        
        if (cards.length == 0) {
            // 没有红色牌，跳过
            event.targetIndex++;
            event.goto(2);
            return;
        }
        
        event.current.chooseCard(
            "he",
            "匪氏：展示一张红色牌",
            1,
            true,
            function(card) {
                return get.color(card) == "red";
            }
        ).set("ai", function(card) {
            return -get.value(card);  // AI选择价值低的牌
        });
        
        'step 3'
        if (result.bool && result.cards && result.cards.length > 0) {
            event.shownCardsMap[event.current.playerid] = result.cards[0];
            event.allShownCards.push(result.cards[0]);
        }
        
        event.targetIndex++;
        event.goto(2);
        
        'step 4'
        // ✅ 同时展示所有选择的牌
        if (event.allShownCards.length == 0) {
            game.log("没有角色展示红色牌");
            event.finish();
            return;
        }
        
        // 展示所有牌
        for (var i = 0; i < event.targets.length; i++) {
            var target = event.targets[i];
            var card = event.shownCardsMap[target.playerid];
            if (card) {
                target.showCards([card], "匪氏");
            }
        }
        
        'step 5'
        // ✅ 让玩家选择一张牌获得
        player.chooseButton(
            ["匪氏：选择一张牌获得", event.allShownCards],
            true
        ).set("ai", function(button) {
            return get.value(button.link);
        });
        
        'step 6'
        if (result.bool && result.links && result.links.length > 0) {
            var chosenCard = result.links[0];
            
            // 找到这张牌属于哪个角色
            var cardOwner = null;
            for (var i = 0; i < event.targets.length; i++) {
                var target = event.targets[i];
                if (event.shownCardsMap[target.playerid] == chosenCard) {
                    cardOwner = target;
                    break;
                }
            }
            
            if (cardOwner) {
                player.gain(chosenCard, cardOwner, "giveAuto");
            }
        }
    },
    subSkill: {
        used: {
            charlotte: true,
            sub: true,
            sourceSkill: "clanfeishi",
        },
    },
},


clanfeichen: {
 audio: "ext:扩展名:2",
    trigger: {
        target: "useCardToTargeted" // 成为牌的目标时
    },
    // 强制在结算前执行
    forced: true, 
    filter: function(event, player) {
        // 1. 必须在自己的回合内
        if (_status.currentPhase != player) return false;
        // 2. 牌必须是红色
        if (get.color(event.card) != 'red') return false;
        // 3. 检查本回合是否已经触发过（通过storage标记）
        if (player.storage.custom_skill_used_this_turn) return false;
        return true;
    },
    content: function() {
        "step 0"
        // 记录本回合已触发
        player.storage.custom_skill_used_this_turn = true;
        
        // 展示来源的所有手牌
        event.source = trigger.player;
        if (event.source.getCards('h').length > 0) {
            player.say('让我看看你的红色牌！');
            event.source.showCards(event.source.getCards('h'), '展示手牌');
        } else {
            // 如果对方没手牌，直接跳到结果判定
            event.goto(2);
        }
        
        "step 1"
        // 逻辑处理：检查其手牌中是否有与此牌类别【相同】的【红色】牌
        var sourceHandcards = event.source.getCards('h');
        var cardType = get.type(trigger.card); // 牌的类别：basic, trick, equip
        
        var hasSameTypeRed = sourceHandcards.some(function(card) {
            return get.type(card) == cardType && get.color(card) == 'red';
        });

        if (!hasSameTypeRed) {
            player.say('没货？那再来一次！');
            // 令该牌对该目标结算次数+1
             trigger.getParent().effectCount++;
        }
        
        "step 2"
        // 即使没有手牌空空，也要确保逻辑闭环
    },
    // 子技能：用于在回合结束时重置“首次”标记
    group: "custom_skill_name_reset",
    subSkill: {
        reset: {
            trigger: { global: "phaseAfter" },
            silent: true,
            content: function() {
                delete player.storage.custom_skill_used_this_turn;
            }
        }
    },
},


// 幪谟 - 完全重写版本
chi_mengmo: {
    audio: 2,
    trigger: {player: "useCard"},
    direct: true,
    filter: function(event, player) {
        // 检查本轮是否已对此牌名使用过
        if (!player.storage.chi_mengmo_round) player.storage.chi_mengmo_round = [];
        if (player.storage.chi_mengmo_round.includes(event.card.name)) return false;
        
        // 检查牌面描述是否包含牌名
        var cardInfo = get.translation(event.card.name + "_info");
        if (!cardInfo) return false;
        
        // 检查是否有可替换的牌名
        for (var i = 0; i < lib.inpile.length; i++) {
            var cardName = lib.inpile[i];
            var translation = get.translation(cardName);
            if (cardInfo.includes(translation) || cardInfo.includes("【" + translation + "】")) {
                return true;
            }
        }
        return false;
    },
    content: function() {
        "step 0"
        var card = trigger.card;
        var cardInfo = get.translation(card.name + "_info");
        
        // 收集牌面描述中的所有牌名
        event.cardNames = [];
        for (var i = 0; i < lib.inpile.length; i++) {
            var name = lib.inpile[i];
            var translation = get.translation(name);
            if (cardInfo.includes(translation) || cardInfo.includes("【" + translation + "】")) {
                event.cardNames.push(name);
            }
        }
        
        if (event.cardNames.length == 0) {
            event.finish();
            return;
        }
        
        player.chooseBool(
            get.prompt("chi_mengmo"),
            "是否修改【" + get.translation(card.name) + "】的牌面描述？"
        ).set("ai", function() {
            return true;
        });
        
        "step 1"
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("chi_mengmo");
        if (!player.storage.chi_mengmo_round) player.storage.chi_mengmo_round = [];
        player.storage.chi_mengmo_round.push(trigger.card.name);
        
        "step 2"
        // 选择要替换的牌名
        var choices = event.cardNames.map(function(name) {
            return get.translation(name);
        });
        player.chooseControl(choices.concat("cancel2"))
            .set("prompt", "幪谟：选择要替换的牌名")
            .set("ai", function() {
                return 0;
            });
        
        "step 3"
        if (result.control == "cancel2") {
            event.finish();
            return;
        }
        
        var index = event.cardNames.map(function(name) {
            return get.translation(name);
        }).indexOf(result.control);
        event.targetCardName = event.cardNames[index];
        event.targetLength = get.translation(event.targetCardName).length;
        
        "step 4"
        // 选择要替换成的牌名（字数相同）
        var sameLength = [];
        for (var i = 0; i < lib.inpile.length; i++) {
            var name = lib.inpile[i];
            if (get.translation(name).length == event.targetLength && name != event.targetCardName) {
                sameLength.push(name);
            }
        }
        
        if (sameLength.length == 0) {
            event.finish();
            return;
        }
        
        event.sameLength = sameLength;
        var choices = sameLength.map(function(name) {
            return get.translation(name);
        });
        player.chooseControl(choices.concat("cancel2"))
            .set("prompt", "幪谟：选择替换后的牌名")
            .set("ai", function() {
                return 0;
            });
        
        "step 5"
        if (result.control == "cancel2") {
            event.finish();
            return;
        }
        
        var replaceIndex = event.sameLength.map(function(name) {
            return get.translation(name);
        }).indexOf(result.control);
        event.replaceName = event.sameLength[replaceIndex];
        
        "step 6"
        // 执行替换
        game.log(player, "将", trigger.card, "描述中的", "#y【" + get.translation(event.targetCardName) + "】", "替换为", "#g【" + get.translation(event.replaceName) + "】");
        
        // 存储替换信息到牌上
        if (!trigger.card.storage) trigger.card.storage = {};
        if (!trigger.card.storage.chi_mengmo_replace) trigger.card.storage.chi_mengmo_replace = {};
        trigger.card.storage.chi_mengmo_replace[event.targetCardName] = event.replaceName;
        
        // 标记这张牌被幪谟修改过
        trigger.card.chi_mengmo_modified = true;
        trigger.chi_mengmo_replace = trigger.card.storage.chi_mengmo_replace;
        
        // 添加全局监听来修改效果
        if (!_status.chi_mengmo_global) {
            _status.chi_mengmo_global = true;
            lib.skill.chi_mengmo_global = {
                trigger: {
                    global: ["useCard", "useCard1", "useCard2", "chooseToUse", "chooseToRespond"],
                },
                forced: true,
                charlotte: true,
                popup: false,
                priority: 100,
                filter: function(event, player) {
                    return event.card && event.card.chi_mengmo_modified;
                },
                content: function() {
                    // 应用替换效果
                    lib.skill.chi_mengmo.applyReplace(trigger);
                },
            };
        }
    },
    // 应用替换效果的核心函数
    applyReplace: function(event) {
        if (!event.card || !event.card.storage || !event.card.storage.chi_mengmo_replace) return;
        
        var replace = event.card.storage.chi_mengmo_replace;
        var cardName = event.card.name;
        
        // 为常用牌手动编写替换逻辑
        var handlers = {
            // 决斗：双方轮流打出【杀】
            juedou: function(event, replace) {
                if (replace.sha) {
                    // 替换决斗中的【杀】
                    game.log("#g幪谟效果：【决斗】中的【杀】被替换为【" + get.translation(replace.sha) + "】");
                    
                    // 修改决斗的响应逻辑
                    var oldContent = lib.card.juedou.content;
                    event._chi_mengmo_oldContent = oldContent;
                    
                    lib.card.juedou.content = function() {
                        var next = target.chooseToRespond({name: replace.sha});
                        next.set("ai", function(card) {
                            var player = _status.event.player;
                            var source = _status.event.source;
                            if (get.damageEffect(player, source, player) >= 0) return 0;
                            if (player.countCards("h", replace.sha) > 1) return 1;
                            if (player.countCards("h") > 2) return 1;
                            return 0;
                        });
                        next.set("source", player);
                        next.set("prompt", "请打出一张【" + get.translation(replace.sha) + "】");
                        next.autochoose = lib.filter.autoRespondSha;
                        next.set("skillwarn", "请打出一张【" + get.translation(replace.sha) + "】");
                        next.noOrdering = true;
                        next.setContent("chooseToRespondForJuedou");
                    };
                }
            },
            
            // 南蛮入侵：所有其他角色需打出【杀】
            nanman: function(event, replace) {
                if (replace.sha) {
                    game.log("#g幪谟效果：【南蛮入侵】中的【杀】被替换为【" + get.translation(replace.sha) + "】");
                    
                    // 修改南蛮的响应逻辑
                    if (event.targets) {
                        for (var i = 0; i < event.targets.length; i++) {
                            var target = event.targets[i];
                            target._chi_mengmo_nanman_replace = replace.sha;
                        }
                    }
                }
            },
            
            // 万箭齐发：所有其他角色需打出【闪】
            wanjian: function(event, replace) {
                if (replace.shan) {
                    game.log("#g幪谟效果：【万箭齐发】中的【闪】被替换为【" + get.translation(replace.shan) + "】");
                    
                    if (event.targets) {
                        for (var i = 0; i < event.targets.length; i++) {
                            var target = event.targets[i];
                            target._chi_mengmo_wanjian_replace = replace.shan;
                        }
                    }
                }
            },
            
            // 无懈可击：抵消锦囊牌
            wuxie: function(event, replace) {
                if (replace.wuxie) {
                    game.log("#g幪谟效果：【无懈可击】中的【无懈可击】被替换为【" + get.translation(replace.wuxie) + "】");
                }
            },
            
            // 铁索连环：横置角色
            tiesuo: function(event, replace) {
                // 铁索连环没有包含其他牌名，通常不需要替换
            },
            
            // 借刀杀人：目标角色对另一名角色使用【杀】
            jiedao: function(event, replace) {
                if (replace.sha) {
                    game.log("#g幪谟效果：【借刀杀人】中的【杀】被替换为【" + get.translation(replace.sha) + "】");
                    
                    if (event.targets && event.targets[0]) {
                        event.targets[0]._chi_mengmo_jiedao_replace = replace.sha;
                    }
                }
            },
            
            // 顺手牵羊：获得目标角色一张牌
            shunshou: function(event, replace) {
                // 顺手牵羊没有包含其他牌名
            },
            
            // 过河拆桥：弃置目标角色一张牌
            guohe: function(event, replace) {
                // 过河拆桥没有包含其他牌名
            },
            
            // 火攻：目标角色展示一张手牌，你弃置相同花色的牌造成伤害
            huogong: function(event, replace) {
                // 火攻没有包含其他牌名
            },
            
            // 无中生有：摸两张牌
            wuzhong: function(event, replace) {
                // 无中生有没有包含其他牌名
            },
            
            // 五谷丰登：所有角色依次获得一张牌
            wugu: function(event, replace) {
                // 五谷丰登没有包含其他牌名
            },
            
            // 桃园结义：所有角色回复1点体力
            taoyuan: function(event, replace) {
                // 桃园结义没有包含其他牌名
            },
        };
        
        // 执行对应的处理函数
        if (handlers[cardName]) {
            handlers[cardName](event, replace);
        } else {
            // 通用处理：只显示提示
            var replaceText = "";
            for (var key in replace) {
                replaceText += "【" + get.translation(key) + "】→【" + get.translation(replace[key]) + "】 ";
            }
            game.log("#g幪谟效果：", event.card, "的效果已修改（" + replaceText + "）");
        }
    },
    group: ["chi_mengmo_round", "chi_mengmo_respond"],
    subSkill: {
        round: {
            trigger: {global: "roundStart"},
            forced: true,
            charlotte: true,
            popup: false,
            content: function() {
                delete player.storage.chi_mengmo_round;
            },
            sub: true,
        },
        // 拦截响应牌的逻辑
        respond: {
            trigger: {
                global: ["chooseToRespondBegin", "chooseToUseBegin"],
            },
            forced: true,
            charlotte: true,
            popup: false,
            priority: 100,
            filter: function(event, player) {
                // 检查是否有幪谟修改的牌在生效
                var parent = event.getParent();
                if (parent && parent.card && parent.card.chi_mengmo_modified) {
                    return true;
                }
                return false;
            },
            content: function() {
                var parent = trigger.getParent();
                if (!parent || !parent.card || !parent.card.storage || !parent.card.storage.chi_mengmo_replace) {
                    return;
                }
                
                var replace = parent.card.storage.chi_mengmo_replace;
                var cardName = parent.card.name;
                
                // 修改响应的牌名
                if (cardName == "juedou" && replace.sha) {
                    // 决斗：修改响应的牌名
                    if (trigger.filterCard) {
                        var oldFilter = trigger.filterCard;
                        trigger.filterCard = function(card, player, event) {
                            if (get.name(card) == replace.sha) return true;
                            return oldFilter(card, player, event);
                        };
                    }
                    trigger._chi_mengmo_prompt = "请打出一张【" + get.translation(replace.sha) + "】";
                } else if (cardName == "nanman" && replace.sha) {
                    // 南蛮入侵：修改响应的牌名
                    if (trigger.filterCard) {
                        var oldFilter = trigger.filterCard;
                        trigger.filterCard = function(card, player, event) {
                            if (get.name(card) == replace.sha) return true;
                            return oldFilter(card, player, event);
                        };
                    }
                    trigger._chi_mengmo_prompt = "请打出一张【" + get.translation(replace.sha) + "】";
                } else if (cardName == "wanjian" && replace.shan) {
                    // 万箭齐发：修改响应的牌名
                    if (trigger.filterCard) {
                        var oldFilter = trigger.filterCard;
                        trigger.filterCard = function(card, player, event) {
                            if (get.name(card) == replace.shan) return true;
                            return oldFilter(card, player, event);
                        };
                    }
                    trigger._chi_mengmo_prompt = "请打出一张【" + get.translation(replace.shan) + "】";
                }
            },
            sub: true,
        },
    },
},



chi_pijian: {
    audio: 2,
    trigger: {player: "damageEnd"},
    direct: true,
    content: async function(event, trigger, player) {
        'step 0'
        if (!player.storage.chi_pijian_options) {
            player.storage.chi_pijian_options = [];
        }
        
        const hasNumber = player.storage.chi_pijian_options.includes("number");
        const hasTarget = player.storage.chi_pijian_options.includes("target");
        
        // 如果两个选项都已存在
        if (hasNumber && hasTarget) {
            const {result} = await player.chooseBool(
                get.prompt("chi_pijian"),
                "增加一点体力上限并回复体力至上限，然后移除此技能"
            ).set("ai", () => true);
            
            if (!result.bool) {
                event.finish();
                return;
            }
            
            player.logSkill("chi_pijian");
            player.gainMaxHp();
            await player.recover(player.maxHp - player.hp);
            player.removeSkill("chi_pijian");
            event.finish();
            return;
        }
        
        'step 1'
        // 选择要添加的选项
        const options = [];
        const optionNames = [];
        
        if (!player.storage.chi_pijian_options.includes("number")) {
            options.push("number");
            optionNames.push("数字");
        }
        
        if (!player.storage.chi_pijian_options.includes("target")) {
            options.push("target");
            optionNames.push("指定角色");
        }
        
        if (options.length == 0) {
            event.finish();
            return;
        }
        
        const {result: chooseResult} = await player.chooseControl(
            optionNames.concat("cancel2")
        ).set("prompt", "睥间：为“幪谟”增添选项")
        .set("prompt2", "当前已有选项：" + (player.storage.chi_pijian_options.length > 0 ? 
            player.storage.chi_pijian_options.map(opt => opt == "number" ? "数字" : "指定角色").join("、") : 
            "无"))
        .set("ai", () => {
            return 0;
        });
        
        if (chooseResult.control == "cancel2") {
            event.finish();
            return;
        }
        
        const index = optionNames.indexOf(chooseResult.control);
        const selectedOption = options[index];
        
        player.logSkill("chi_pijian");
        player.storage.chi_pijian_options.push(selectedOption);
        game.log(player, "为", "#g【幪谟】", "增添了", "#g【" + chooseResult.control + "】", "选项");
        
        player.markSkill("chi_pijian");
    },
    intro: {
        content: function(storage, player) {
            if (!player.storage.chi_pijian_options || player.storage.chi_pijian_options.length == 0) {
                return "未添加任何选项";
            }
            return "已添加选项：" + player.storage.chi_pijian_options.map(opt => 
                opt == "number" ? "数字" : "指定角色"
            ).join("、");
        },
    },
},

yingcigu: {
    audio: "ext:剑影:2",
    enable: "phaseUse",
     usable(skill, player) {
        return player.hp;
    },
    trigger: {
        player: "damageEnd",
    },
    filter: function(event, player, name) {
        if (name == "damageEnd") {
            return event.source && event.source.isIn() && event.source.countGainableCards(player, "he") > 0;
        }
        // 出牌阶段使用
        return player.hp > 0;
    },
    getMax: function(player) {
        return player.hp;
    },
    filterTarget: function(card, player, target) {
        return target != player && target.countGainableCards(player, "he") > 0;
    },
    direct: true,
    content: function() {
        "step 0"
        // 判断是主动使用还是触发
        if (event.triggername == "damageEnd") {
            event.target = trigger.source;
            event.isDamage = true;
        } else {
            event.isDamage = false;
        }
        
        "step 1"
        if (event.isDamage) {
            player.chooseBool(
                get.prompt("yingcigu", event.target),
                `将${get.translation(event.target)}的一张牌置于你的武将牌上`
            ).set("ai", () => {
                return _status.event.target.countCards("he") > 0;
            }).set("target", event.target);
        } else {
            event._result = {bool: true};
        }
        
        "step 2"
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("yingcigu", event.target);
        
        "step 3"
        player.gainPlayerCard(event.target, "he", true)
            .set("prompt", "刺骨：选择一张牌置于武将牌上")
            .set("ai", button => {
                return get.value(button.link);
            });
        
        "step 4"
        if (!result.bool || !result.cards || result.cards.length == 0) {
            event.finish();
            return;
        }
        
        event.card = result.cards[0];
        
        "step 5"
        // ⚠️ 修复：将牌置于武将牌上
        player.addToExpansion(event.card, player, "giveAuto").gaintag.add("yingcigu");
        
        "step 6"
        // 检查点数与X的余数
        const X = player.hp;
        const point = get.number(event.card);
        const remainder = point % X;
        
        if (remainder > 1) {
            // 受到一点冰属性伤害
            const source = event.target;
            player.damage(source, "ice");
        }
    },
    marktext: "刺",
    intro: {
        content: "expansion",
        markcount: "expansion",
    },
    onremove: function(player, skill) {
        const cards = player.getExpansions(skill);
        if (cards.length) player.loseToDiscardpile(cards);
    },
    group: ["yingcigu_end"],
    subSkill: {
        end: {
            trigger: {
                player: "phaseEnd",
            },
            filter: function(event, player) {
                return player.getExpansions("yingcigu").length > 0;
            },
            direct: true,
            content: function() {
                "step 0"
                const cards = player.getExpansions("yingcigu");
                event.cards = cards;
                
                player.chooseControl("选项一", "选项二", "cancel2")
                    .set("prompt", "刺骨：选择一项")
                    .set("choiceList", [
                        "弃置一种颜色的“刺”，视为对一名其他角色使用一张冰【杀】",
                        "获得这些“刺”"
                    ])
                    .set("ai", () => {
                        const player = _status.event.player;
                        const cards = _status.event.cards;
                        
                        // 如果有目标可以杀，优先选项一
                        if (game.hasPlayer(target => {
                            return target != player && player.canUse({name: "sha", nature: "ice"}, target);
                        })) {
                            return 0;
                        }
                        
                        // 否则获得牌
                        return 1;
                    })
                    .set("cards", cards);
                
                "step 1"
                if (result.control == "cancel2") {
                    event.finish();
                    return;
                }
                
                event.choice = result.control;
                
                if (result.control == "选项一") {
                    // 选择一种颜色
                    const cards = event.cards;
                    const colors = [];
                    for (const card of cards) {
                        const color = get.color(card);
                        if (!colors.includes(color)) {
                            colors.push(color);
                        }
                    }
                    
                    if (colors.length == 0) {
                        event.finish();
                        return;
                    }
                    
                    player.chooseControl(colors)
                        .set("prompt", "选择要弃置的颜色")
                        .set("ai", () => {
                            return _status.event.colors[0];
                        })
                        .set("colors", colors);
                } else {
                    // 选项二：获得所有"刺"
                    player.gain(event.cards, "gain2");
                    event.finish();
                }
                
                "step 2"
                if (event.choice == "选项一") {
                    const color = result.control;
                    const discardCards = event.cards.filter(card => get.color(card) == color);
                    
                    if (discardCards.length > 0) {
                        player.loseToDiscardpile(discardCards);
                        game.log(player, "弃置了", discardCards);
                    }
                    
                    // 视为使用冰【杀】
                    player.chooseUseTarget({name: "sha", nature: "ice"}, true, false);
                }
            },
        },
    },
    ai: {
        order: 8,
        result: {
            target: -1,
        },
    },
},


// 幽明
yingyouming: {
    audio: "ext:剑影:2",
    trigger: {
        target: "useCardToTargeted",
        player: "dying",
    },
    forced: true,
    filter: function(event, player, name) {
        if (name == "useCardToTargeted") {
            if (event.player == player) return false;
            return !player.hasSkill("yingyouming_targeted");
        }
        if (name == "dying") {
            return !player.hasSkill("yingyouming_dying");
        }
        return false;
    },
    content: async function(event, trigger, player) {
        'step 0'
        if (event.triggername == "useCardToTargeted") {
            player.addTempSkill("yingyouming_targeted");
            event.target = trigger.player;
            event.isDying = false;
        } else {
            player.addTempSkill("yingyouming_dying");
            event.isDying = true;
            event.source = trigger.source;
        }
        
        'step 1'
        if (!event.isDying) {
            // 观看两张手牌
            if (event.target.countCards("h") == 0) {
                event.finish();
                return;
            }
            
            const num = Math.min(2, event.target.countCards("h"));
            const {result: viewResult} = await player.chooseButton(
                ["幽明：观看" + get.translation(event.target) + "的手牌，选择一张置于牌堆顶", event.target.getCards("h").slice(0, num)],
                true
            ).set("ai", button => {
                return get.value(button.link);
            });
            
            if (viewResult.bool && viewResult.links && viewResult.links.length > 0) {
                event.chosenCard = viewResult.links[0];
            } else {
                event.finish();
            }
        } else {
            // 濒死状态
            player.turnOver();
            await player.recover(1 - player.hp);
        }
        
        'step 2'
        if (!event.isDying) {
            // 将牌置于牌堆顶
            await event.target.lose(event.chosenCard, ui.cardPile, "insert");
            game.log(event.chosenCard, "被置于牌堆顶");
            event.finish();
        } else {
            // 如果伤害来源不为你
            if (event.source && event.source != player) {
                // 将牌堆顶的牌当做【出其不意】使用
                const topCard = ui.cardPile.firstChild;
                if (topCard && player.canUse({name: "chuqibuyi"}, event.source)) {
                    event.topCard = topCard;
                    event.useCard = true;
                } else {
                    event.finish();
                }
            } else {
                event.finish();
            }
        }
        
        'step 3'
        if (event.useCard) {
            const card = event.topCard;
            player.showCards(card, "幽明");
            
            const {result: useResult} = await player.useCard(
                {name: "chuqibuyi", cards: [card]},
                [card],
                event.source,
                false
            );
            
            event.useResult = useResult;
        }
        
        'step 4'
        // 如果造成伤害，重置武将牌
        if (event.useResult && event.useResult.bool) {
            // 监听是否造成伤害
            player.addTempSkill("yingyouming_damage");
        }
    },
    subSkill: {
        targeted: {
            charlotte: true,
            sub: true,
            sourceSkill: "yingyouming",
        },
        dying: {
            charlotte: true,
            sub: true,
            sourceSkill: "yingyouming",
        },
        damage: {
            trigger: {
                source: "damageSource",
            },
            forced: true,
            charlotte: true,
            popup: false,
            filter: function(event, player) {
                return event.card && event.card.name == "chuqibuyi";
            },
            content: function() {
                if (player.isTurnedOver()) player.turnOver();
                if (player.isLinked()) player.link();
            },
            sub: true,
            sourceSkill: "yingyouming",
        },
    },
    ai: {
        effect: {
            target: function(card, player, target) {
                if (target.hp == 1) return 0.5;
            },
        },
    },
},

// 调风
yingtiaofeng: {
    audio: "ext:剑影:2",
    enable: "phaseUse",
    filter: function(event, player) {
        const suits = [];
        player.getCards("h").forEach(card => {
            const suit = get.suit(card);
            if (suit && !suits.includes(suit)) suits.push(suit);
        });
        
        for (const suit of suits) {
            if (!player.hasSkill("yingtiaofeng_" + suit)) return true;
        }
        return false;
    },
    content: async function(event, trigger, player) {
        'step 0'
        // 展示所有手牌
        await player.showHandcards();
        
        'step 1'
        const cards = player.getCards("h");
        const suits = [];
        const suitCards = {};
        
        cards.forEach(card => {
            const suit = get.suit(card);
            if (suit) {
                if (!suits.includes(suit)) suits.push(suit);
                if (!suitCards[suit]) suitCards[suit] = [];
                suitCards[suit].push(card);
            }
        });
        
        // 过滤已使用过的花色
        const availableSuits = suits.filter(suit => !player.hasSkill("yingtiaofeng_" + suit));
        
        event.suitCards = suitCards;
        event.availableSuits = availableSuits;
        
        'step 2'
        // 选择花色
        const {result: suitResult} = await player.chooseControl(event.availableSuits)
            .set("prompt", "调风：选择一种花色");
        
        event.chosenSuit = suitResult.control;
        event.chosenCards = event.suitCards[event.chosenSuit];
        
        player.addTempSkill("yingtiaofeng_" + event.chosenSuit);
        
        'step 3'
        // 选择要转化的牌
        const nameLength = event.chosenCards.length;
        
        // 获取所有符合条件的基本牌和普通锦囊牌
        const list = [];
        for (const name in lib.card) {
            if (lib.card[name].type == "basic" || lib.card[name].type == "trick") {
                if (get.translation(name).length == nameLength) {
                    list.push(["", "", name]);
                }
            }
        }
        
        if (list.length == 0) {
            event.finish();
            return;
        }
        
        const {result: cardResult} = await player.chooseButton(
            ["调风：选择要转化的牌", [list, "vcard"]],
            true
        ).set("ai", button => {
            const player = _status.event.player;
            const name = button.link[2];
            return player.getUseValue({name: name});
        });
        
        if (!cardResult.bool) {
            event.finish();
            return;
        }
        
        event.cardName = cardResult.links[0][2];
        
        'step 4'
        // 使用牌
        const {result: useResult} = await player.chooseUseTarget(
            {name: event.cardName, cards: event.chosenCards},
            event.chosenCards,
            true
        );
        
        'step 5'
        // 检查是否摸牌
        const X = [];
        player.getCards("h").forEach(card => {
            const suit = get.suit(card);
            if (suit && !X.includes(suit)) X.push(suit);
        });
        
        const xNum = X.length;
        
        if (event.chosenCards.length >= xNum) {
            await player.draw(xNum);
        }
    },
    ai: {
        order: 8,
        result: {
            player: 1,
        },
    },
},

// 脊望
yingjiwang: {
    audio: "ext:剑影:2",
    trigger: {
        player: "loseAfter",
        target: "useCardToTargeted",
    },
    forced: true,
    filter: function(event, player, name) {
        if (name == "loseAfter") {
            if (event.type != "discard") return false;
            if (event.getParent().name == "useCard" || event.getParent().name == "respond") return false;
            return event.hs && event.hs.length > 0;
        }
        if (name == "useCardToTargeted") {
            if (!event.targets || event.targets.length <= 1) return false;
            if (!event.targets.includes(player)) return false;
            
            // 检查其他目标已损失体力值
            const otherTargets = event.targets.filter(target => target != player);
            const playerLost = player.maxHp - player.hp;
            
            return otherTargets.every(target => {
                return (target.maxHp - target.hp) <= playerLost;
            });
        }
        return false;
    },
    content: async function(event, trigger, player) {
        'step 0'
        if (event.triggername == "loseAfter") {
            // 展示牌
            player.showCards(trigger.hs, "脊望");
            
            const suit = get.suit(trigger.hs[0]);
            event.suit = suit;
            
            // 添加临时技能
            player.addTempSkill("yingjiwang_sha");
            if (!player.storage.yingjiwang_suits) player.storage.yingjiwang_suits = [];
            player.storage.yingjiwang_suits.push(suit);
            
            event.finish();
        } else {
            // 多目标牌
            player.addTempSkill("yingjiwang_target");
        }
    },
    subSkill: {
        sha: {
            mod: {
                cardname: function(card, player) {
                    if (!player.storage.yingjiwang_suits) return;
                    const suit = get.suit(card);
                    if (player.storage.yingjiwang_suits.includes(suit)) {
                        return "sha";
                    }
                },
            },
            trigger: {
                global: "phaseEnd",
            },
            forced: true,
            charlotte: true,
            popup: false,
            content: function() {
                delete player.storage.yingjiwang_suits;
            },
            sub: true,
            sourceSkill: "yingjiwang",
        },
        target: {
            trigger: {
                global: "useCard",
            },
            forced: true,
            charlotte: true,
            filter: function(event, player) {
                return event.player == _status.currentPhase;
            },
            content: async function(event, trigger, player) {
                player.removeSkill("yingjiwang_target");
                
                // 额外执行一次
                trigger.effectCount = (trigger.effectCount || 1) + 1;
                game.log(player, "将额外执行一次", trigger.card);
            },
            sub: true,
            sourceSkill: "yingjiwang",
        },
    },
},

// 炬泪 - 主动选择横置或翻面
yingjulei: {
    audio: "ext:剑影:2",
    enable: ["chooseToUse", "chooseToRespond"],
    filter: function(event, player) {
        // 检查是否可以使用任何一种牌
        if (event.filterCard({name: "sha", nature: "fire"}, player, event)) return true;
        if (event.filterCard({name: "huogong"}, player, event)) return true;
        if (event.filterCard({name: "jiu"}, player, event)) return true;
        if (event.filterCard({name: "zhujinqiyuan"}, player, event)) return true;
        return false;
    },
    chooseButton: {
        dialog: function(event, player) {
            const list = [];
            // 横置选项
            list.push(["横置", "基本", "sha", "fire"]);
            list.push(["横置", "锦囊", "huogong"]);
            // 翻面选项
            list.push(["翻面", "基本", "jiu"]);
            list.push(["翻面", "锦囊", "zhujinqiyuan"]);
            return ui.create.dialog("炬泪：选择横置或翻面并视为使用", [list, "vcard"]);
        },
        filter: function(button, player) {
            const event = _status.event.getParent();
            return event.filterCard({
                name: button.link[2], 
                nature: button.link[3]
            }, player, event);
        },
        check: function(button) {
            const player = _status.event.player;
            const actionType = button.link[0];
            
            // 如果已经横置或翻面，降低优先级
            if (actionType == "横置" && player.isLinked()) return 0;
            if (actionType == "翻面" && player.isTurnedOver()) return 0;
            
            return player.getUseValue({name: button.link[2]});
        },
        backup: function(links, player) {
            return {
                actionType: links[0][0], // "横置" 或 "翻面"
                filterCard: () => false,
                selectCard: -1,
                viewAs: {name: links[0][2], nature: links[0][3]},
                precontent: function() {
                    delete event.result.skill;
                    var stat = event.result.card;
                    var skill = lib.skill.yingjulei_backup;
                    
                    // 执行横置或翻面
                    if (skill.actionType == "横置") {
                        if (!player.isLinked()) {
                            player.link();
                        }
                        game.log(player, "横置并视为使用", stat);
                    } else if (skill.actionType == "翻面") {
                        player.turnOver();
                        game.log(player, "翻面并视为使用", stat);
                    }
                    
                    player.addTempSkill("yingjulei_effect");
                },
            };
        },
        prompt: function(links, player) {
            const actionType = links[0][0];
            const name = links[0][2];
            const nature = links[0][3];
            let str = actionType + "，视为使用";
            if (nature) str += get.translation(nature);
            str += "【" + get.translation(name) + "】";
            return str;
        },
    },
    ai: {
        order: function() {
            return get.order({name: "sha"}) + 0.1;
        },
        result: {
            player: 1,
        },
    },
    subSkill: {
        effect: {
            trigger: {
                player: ["useCardAfter", "respondAfter"],
            },
            forced: true,
            charlotte: true,
            popup: false,
            filter: function(event, player) {
                if (!event.skill) return false;
                return event.skill == "yingjulei_backup";
            },
            content: function() {
                "step 0"
                // 检查当前回合角色或目标是否有"尘"标记
                var current = _status.currentPhase;
                var targets = trigger.targets || [];
                
                var haschen = false;
                if (current && current.storage.yingzhichen_chen) {
                    haschen = true;
                }
                if (!haschen) {
                    for (var i = 0; i < targets.length; i++) {
                        if (targets[i].storage.yingzhichen_chen) {
                            haschen = true;
                            break;
                        }
                    }
                }
                
                if (!haschen) {
                    event.finish();
                    return;
                }
                
                "step 1"
                // 选择一项
                player.chooseControl("选项一", "选项二")
                    .set("prompt", "炬泪：选择一项")
                    .set("choiceList", [
                        "此牌不计入次数",
                        "重置武将牌",
                    ])
                    .set("ai", function() {
                        var player = _status.event.player;
                        if (player.isTurnedOver() || player.isLinked()) return 1;
                        return 0;
                    });
                
                "step 2"
                if (result.control == "选项一") {
                    trigger.addCount = false;
                    game.log(player, "令", trigger.card, "不计入次数");
                } else {
                    if (player.isTurnedOver()) {
                        player.turnOver();
                    }
                    if (player.isLinked()) {
                        player.link();
                    }
                    game.log(player, "重置了武将牌");
                }
                
                "step 3"
                // 移除"尘"标记
                var current = _status.currentPhase;
                var targets = trigger.targets || [];
                
                if (current && current.storage.yingzhichen_chen) {
                    current.removeSkill("yingzhichen_chen");
                    delete current.storage.yingzhichen_chen;
                }
                
                for (var i = 0; i < targets.length; i++) {
                    if (targets[i].storage.yingzhichen_chen) {
                        targets[i].removeSkill("yingzhichen_chen");
                        delete targets[i].storage.yingzhichen_chen;
                    }
                }
            },
            sub: true,
        },
        backup: {
            sub: true,
        },
    },
},

// 炙尘
yingzhichen: {
    audio: "ext:剑影:2",
    trigger: {
        global: "roundStart",
        player: ["damageEnd", "damageSource"],
    },
    forced: true,
    filter: function(event, player, name) {
        if (name == "roundStart") return true;
        if (name == "damageEnd") return event.source && event.source.isAlive();
        if (name == "damageSource") return event.player && event.player.isAlive();
        return false;
    },
    content: function() {
        "step 0"
        if (event.triggername == "roundStart") {
            // 上家和下家获得"尘"标记
            var prev = player.previous;
            var next = player.next;
            
            if (prev && prev.isAlive()) {
                prev.addSkill("yingzhichen_chen");
                if (!prev.storage.yingzhichen_chen) prev.storage.yingzhichen_chen = 0;
                prev.storage.yingzhichen_chen++;
                prev.markSkill("yingzhichen_chen");
                game.log(prev, "获得了1个", "#g“尘”", "标记");
            }
            if (next && next != prev && next.isAlive()) {
                next.addSkill("yingzhichen_chen");
                if (!next.storage.yingzhichen_chen) next.storage.yingzhichen_chen = 0;
                next.storage.yingzhichen_chen++;
                next.markSkill("yingzhichen_chen");
                game.log(next, "获得了1个", "#g“尘”", "标记");
            }
            
            event.finish();
        } else if (event.triggername == "damageEnd") {
            event.target = trigger.source;
        } else {
            event.target = trigger.player;
        }
        
        if (!event.target || !event.target.isAlive()) {
            event.finish();
        }
        
        "step 1"
        // 横置并获得"尘"标记
        if (event.target && event.target.isAlive()) {
            if (!event.target.isLinked()) {
                event.target.link();
            }
            event.target.addSkill("yingzhichen_chen");
            if (!event.target.storage.yingzhichen_chen) event.target.storage.yingzhichen_chen = 0;
            event.target.storage.yingzhichen_chen++;
            event.target.markSkill("yingzhichen_chen");
            game.log(event.target, "横置并获得了1个", "#g“尘”", "标记");
        }
        
        "step 2"
        // 检查当前回合角色是否横置或翻面
        var current = _status.currentPhase;
        if (!current || (!current.isLinked() && !current.isTurnedOver())) {
            event.finish();
            return;
        }
        
        // 重铸手牌中花色最多的所有牌
        var cards = player.getCards("h");
        if (cards.length == 0) {
            event.finish();
            return;
        }
        
        var suitCount = {};
        for (var i = 0; i < cards.length; i++) {
            var suit = get.suit(cards[i]);
            if (suit) {
                suitCount[suit] = (suitCount[suit] || 0) + 1;
            }
        }
        
        var maxSuit = null;
        var maxCount = 0;
        for (var suit in suitCount) {
            if (suitCount[suit] > maxCount) {
                maxCount = suitCount[suit];
                maxSuit = suit;
            }
        }
        
        if (maxSuit) {
            var toRecast = [];
            for (var i = 0; i < cards.length; i++) {
                if (get.suit(cards[i]) == maxSuit) {
                    toRecast.push(cards[i]);
                }
            }
            if (toRecast.length > 0) {
                game.log(player, "重铸了", toRecast);
                player.recast(toRecast);
            }
        }
    },
    subSkill: {
        chen: {
            marktext: "尘",
            intro: {
                name: "尘",
                content: function(storage, player) {
                    return "尘标记数：" + storage;
                },
            },
            sub: true,
        },
    },
},

clanjiantu: {
    audio: "ext:剑影:2",
    trigger: {
        player: "useCardToTargeted",
    },
    forced: true,
    mark: true,
    marktext: "☯",
    init: function(player) {
        if (player.storage.clanjiantu == undefined) {
            player.storage.clanjiantu = true; // true=阳，false=阴
        }
        player.markSkill("clanjiantu"); // 立即显示标记
    },
    filter: function(event, player) {
        if (_status.currentPhase != player) return false;
        if (!event.isFirstTarget) return false;
        if (event.targets.length != 1) return false;
        
        // 如果正在执行蹇途，不再触发
        if (player.hasSkill("clanjiantu_using")) return false;
       
        var suit = get.suit(event.card);
        if (!suit) return false;
        if (player.hasSkill("clanjiantu_" + suit)) return false;
       
        var target = event.target;
        // 修改为：手牌数不大于你
        return target.countCards("h") <= player.countCards("h");
    },
    content: function() {
        'step 0'
        // 立即添加临时标记，防止递归触发，直到本次用牌结算完毕
        player.addTempSkill("clanjiantu_using", "useCardAfter");
        
        var suit = get.suit(trigger.card);
        player.addTempSkill("clanjiantu_" + suit);
       
        // 先转换状态
        player.storage.clanjiantu = !player.storage.clanjiantu;
        
        // 获取转换后的状态（本次使用的效果）
        var isYin = !player.storage.clanjiantu;
       
        player.markSkill("clanjiantu");
       
        game.log(player, "【蹇途】转换为", "#g" + (player.storage.clanjiantu ? "阳" : "阴"));
       
        event.isYin = isYin;
        event.target = trigger.target;
        event.originalCard = trigger.card;
       
        // 取消原牌效果
        trigger.excluded.add(event.target);
        game.log(trigger.card, "对", event.target, "的效果被", "#g【蹇途】", "替代");
       
        'step 1'
        var target = event.target;
        var card = event.originalCard;
        
        if (event.isYin) {
            // 阴：闪电 - 将触发的牌视为闪电对目标使用
            game.log(player, "触发", "#g【蹇途】", "（阴），将", card, "视为【闪电】对", target, "使用");
            
            // 创建虚拟闪电牌
            var virtualCard = game.createCard('shandian', card.suit, card.number, card);
            
            // 强制对目标使用（跳过合法性检查）
            player.useCard(virtualCard, [card], [target], true);
        } else {
            // 阳：过河拆桥 - 将触发的牌视为过拆对目标使用
            game.log(player, "触发", "#g【蹇途】", "（阳），将", card, "视为【过河拆桥】对", target, "使用");
            
            // 创建虚拟过拆牌
            var virtualCard = game.createCard('guohe', card.suit, card.number, card);
            
            // 对目标使用
            player.useCard(virtualCard, [card], [target], true);
        }
    },
    intro: {
        content: function(storage, player) {
            // 获取已使用的花色
            var usedSuits = [];
            for (var suit of lib.suit) {
                if (player.hasSkill("clanjiantu_" + suit)) {
                    usedSuits.push(get.translation(suit));
                }
            }
           
            var suitInfo = usedSuits.length > 0 ?
                "<br>本回合已使用花色：" + usedSuits.join("、") :
                "<br>本回合尚未使用任何花色";
           
            return (storage ?
                "当前状态：<span class='bluetext'>阳</span><br>下次触发转换为<span class='greentext'>阴</span>（闪电）" :
                "当前状态：<span class='greentext'>阴</span><br>下次触发转换为<span class='bluetext'>阳</span>（过河拆桥）") + suitInfo;
        },
    },
    group: ["clanjiantu_clear"],
    subSkill: {
        using: {
            // 临时标记技能，防止递归触发
            charlotte: true,
            sub: true,
        },
        clear: {
            trigger: {
                player: "phaseEnd",
            },
            forced: true,
            silent: true,
            popup: false,
            content: function() {
                // 只清除花色标记，不清除阴阳状态
                var suits = lib.suit.slice(0);
                for (var i = 0; i < suits.length; i++) {
                    player.removeSkill("clanjiantu_" + suits[i]);
                }
            },
            sub: true,
            sourceSkill: "clanjiantu",
        },
    },
},
clanduye: {
    audio: "ext:剑影:2",
    enable: "phaseUse",
    mark: true,
    marktext: "注",
    init: function(player) {
        if (!player.storage.clanduye_zhu) player.storage.clanduye_zhu = [];
        if (!player.storage.clanduye_zhu_info) player.storage.clanduye_zhu_info = [];
        // ✅ 初始化全局共享的选项记录（存储在技能拥有者身上）
        if (!player.storage.clanduye_used_options) player.storage.clanduye_used_options = [];
    },
    filter: function(event, player) {
        // 检查是否还有未使用的花色
        var usedSuits = [];
        if (player.storage.clanduye_zhu && player.storage.clanduye_zhu.length > 0) {
            usedSuits = player.storage.clanduye_zhu.map(function(c) {
                return get.suit(c);
            });
            // 如果四种花色都有了，不能再使用
            if (usedSuits.length >= 4) return false;
        }
        
        // 检查是否有符合花色条件的牌
        return player.countCards("hej", function(card) {
            return !usedSuits.includes(get.suit(card));
        }) > 0 || game.hasPlayer(function(current) {
            return current != player && current.countCards("ej", function(card) {
                return !usedSuits.includes(get.suit(card));
            }) > 0;
        });
    },
    chooseButton: {
        dialog: function(event, player) {
            var dialog = ui.create.dialog("笃谒：选择一张牌置为“注”", "hidden");
            
            // 获取已使用的花色
            var usedSuits = [];
            if (player.storage.clanduye_zhu && player.storage.clanduye_zhu.length > 0) {
                usedSuits = player.storage.clanduye_zhu.map(function(c) {
                    return get.suit(c);
                });
            }
            
            // 添加自己的牌
            var myCards = player.getCards("hej").filter(function(card) {
                return !usedSuits.includes(get.suit(card));
            });
            
            if (myCards.length > 0) {
                dialog.addText("你的牌");
                dialog.add([myCards, "card"]);
            }
            
            // 添加其他角色场上的牌
            game.countPlayer(function(current) {
                if (current == player) return;
                var cards = current.getCards("ej").filter(function(card) {
                    return !usedSuits.includes(get.suit(card));
                });
                
                if (cards.length > 0) {
                    dialog.addText(get.translation(current) + "的牌");
                    dialog.add([cards, "card"]);
                }
            });
            
            return dialog;
        },
        filter: function(button, player) {
            var card = button.link;
            var usedSuits = [];
            if (player.storage.clanduye_zhu && player.storage.clanduye_zhu.length > 0) {
                usedSuits = player.storage.clanduye_zhu.map(function(c) {
                    return get.suit(c);
                });
            }
            return !usedSuits.includes(get.suit(card));
        },
        check: function(button) {
            return 6 - get.value(button.link);
        },
        backup: function(links, player) {
            return {
                audio: "ext:剑影:2",
                filterCard: function() {
                    return false;
                },
                selectCard: -1,
                card: links[0],
                delay: false,
                content: lib.skill.clanduye_backup.content,
            };
        },
        prompt: function(links, player) {
            return "将" + get.translation(links[0]) + "置为“注”";
        },
    },
    ai: {
        order: 10,
        result: {
            player: function(player) {
                if (player.countCards("hej", function(card) {
                    return get.value(card) < 5;
                }) > 0) {
                    return 1;
                }
                return 0;
            },
        },
    },
    intro: {
        content: function(storage, player) {
            if (!player.storage.clanduye_zhu || player.storage.clanduye_zhu.length == 0) {
                return "无“注”";
            }
            
            var str = "共有" + player.storage.clanduye_zhu.length + "张“注”：<br>";
            var suits = [];
            for (var i = 0; i < player.storage.clanduye_zhu.length; i++) {
                var card = player.storage.clanduye_zhu[i];
                var info = player.storage.clanduye_zhu_info[i];
                str += get.translation(card);
                suits.push(get.translation(get.suit(card)));
                if (info && info.owner) {
                    str += "（来自" + get.translation(info.owner) + "）";
                }
                if (i < player.storage.clanduye_zhu.length - 1) str += "<br>";
            }
            str += "<br>已有花色：" + suits.join("、");
            
            // ✅ 显示已使用的选项
            if (player.storage.clanduye_used_options && player.storage.clanduye_used_options.length > 0) {
                str += "<br>已使用选项：" + player.storage.clanduye_used_options.join("、");
            }
            
            return str;
        },
        onunmark: function(storage, player) {
            if (player.storage.clanduye_zhu && player.storage.clanduye_zhu.length) {
                player.$throw(player.storage.clanduye_zhu, 1000);
                game.cardsDiscard(player.storage.clanduye_zhu);
                game.log(player.storage.clanduye_zhu, "被置入了弃牌堆");
                player.storage.clanduye_zhu.length = 0;
                player.storage.clanduye_zhu_info.length = 0;
            }
        },
    },
    group: "clanduye_clear",
    subSkill: {
        backup: {
            audio: "ext:剑影:2",
            content: function() {
                "step 0"
                // 初始化“注”存储
                if (!player.storage.clanduye_zhu) player.storage.clanduye_zhu = [];
                if (!player.storage.clanduye_zhu_info) player.storage.clanduye_zhu_info = [];
                // ✅ 初始化全局共享的选项记录
                if (!player.storage.clanduye_used_options) player.storage.clanduye_used_options = [];
                
                var card = lib.skill.clanduye_backup.card;
                
                // 找到牌的所有者
                var owner = null;
                var position = null;
                
                if (player.getCards("hej").includes(card)) {
                    owner = player;
                    position = get.position(card);
                } else {
                    game.countPlayer(function(current) {
                        if (current.getCards("ej").includes(card)) {
                            owner = current;
                            position = get.position(card);
                        }
                    });
                }
                
                if (!owner) {
                    event.finish();
                    return;
                }
                
                event.cardOwner = owner;
                event.selectedCard = card;
                event.originalPosition = position;
                
                player.logSkill("clanduye", owner);
                game.log(player, "将", card, "置于武将牌上作为“注”");
                
                // 将牌添加到“注”
                player.storage.clanduye_zhu.push(card);
                player.storage.clanduye_zhu_info.push({
                    card: card,
                    owner: owner,
                    position: position
                });
                
                // 将牌移到特殊区域
                if (owner.getCards("hej").includes(card)) {
                    owner.lose(card, ui.special);
                    owner.$give(card, player, false);
                }
                
                player.syncStorage("clanduye_zhu");
                player.markSkill("clanduye");
                
                event.zhuNum = player.storage.clanduye_zhu.length;
                
                game.log("当前“注”数量：", event.zhuNum);
                
                "step 1"
                // 牌所有者选择效果
                var owner = event.cardOwner;
                var X = event.zhuNum;
                
                // ✅ 使用技能拥有者（player）的全局选项记录，而不是牌所有者（owner）的
                var usedOptions = player.storage.clanduye_used_options || [];
                
                var choices = [];
                var choiceList = [];
                
                // 选项一
                if (!usedOptions.includes("选项一")) {
                    choices.push("选项一");
                    choiceList.push("摸" + X + "张牌");
                } else {
                    choiceList.push('<span style="opacity:0.5">摸' + X + '张牌（已选择）</span>');
                }
                
                // 选项二
                if (!usedOptions.includes("选项二")) {
                    choices.push("选项二");
                    choiceList.push("本回合及之后" + (X - 1) + "个回合获得【謇谔】");
                } else {
                    choiceList.push('<span style="opacity:0.5">本回合及之后' + (X - 1) + '个回合获得【謇谔】（已选择）</span>');
                }
                
                // 选项三
                if (!usedOptions.includes("选项三")) {
                    choices.push("选项三");
                    choiceList.push("本轮结束后执行一个额外的阶段（" + (X <= 4 ? ["判定", "出牌", "摸牌", "弃牌"][X - 1] : "弃牌") + "）");
                } else {
                    choiceList.push('<span style="opacity:0.5">本轮结束后执行一个额外的阶段（已选择）</span>');
                }
                
                // 选项四
                if (!usedOptions.includes("选项四")) {
                    choices.push("选项四");
                    choiceList.push("将一张“注”置于牌堆顶视为使用之");
                } else {
                    choiceList.push('<span style="opacity:0.5">将一张“注”置于牌堆顶视为使用之（已选择）</span>');
                }
                
                if (choices.length == 0) {
                    game.log(owner, "所有选项均已使用过");
                    event.finish();
                    return;
                }
                
                owner.chooseControl(choices)
                    .set("prompt", "笃谒：选择一项效果")
                    .set("choiceList", choiceList)
                    .set("ai", function() {
                        var player = _status.event.player;
                        var X = _status.event.getParent().zhuNum;
                        var choices = _status.event.controls;
                        
                        if (choices.includes("选项二") && X >= 3) return "选项二";
                        if (choices.includes("选项三") && X >= 2) return "选项三";
                        if (choices.includes("选项一")) return "选项一";
                        return choices[0];
                    });
                
                "step 2"
                var owner = event.cardOwner;
                var X = event.zhuNum;
                var choice = result.control;
                
                // ✅ 记录到技能拥有者（player）的全局选项中
                if (!player.storage.clanduye_used_options) {
                    player.storage.clanduye_used_options = [];
                }
                player.storage.clanduye_used_options.push(choice);
                player.markSkill("clanduye"); // 更新标记显示
                
                game.log(owner, "选择了", "#g" + choice);
                
                if (choice == "选项一") {
                    // 摸X张牌
                    game.log(owner, "摸", "#y" + X + "张牌");
                    owner.draw(X);
                } else if (choice == "选项二") {
                    // 本回合及之后X-1个回合获得【謇谔】（总共X个回合）
                    game.log(owner, "本回合及之后", "#y" + (X - 1) + "个回合获得【謇谔】");
                    
                    // 设置计数器为X（总共X个回合）
                    owner.storage.clanduye_jiane_count = X;
                    
                    // 添加游戏内置的oljiane技能
                    owner.addSkill("oljiane");
                    
                    // 添加计数器技能
                    owner.addSkill("clanduye_jiane_count");
                    owner.markSkill("clanduye_jiane_count");
                } else if (choice == "选项三") {
                    // 本轮结束后执行一个额外的阶段
                    var phaseNames = ["phaseJudge", "phaseUse", "phaseDraw", "phaseDiscard"];
                    var phaseIndex = Math.min(X - 1, 3);
                    var phaseName = phaseNames[phaseIndex];
                    var phaseText = ["判定", "出牌", "摸牌", "弃牌"][phaseIndex];
                    
                    game.log(owner, "本轮结束后执行一个额外的", "#y" + phaseText + "阶段");
                    
                    owner.addTempSkill("clanduye_extra", {player: "roundStart"});
                    owner.storage.clanduye_extra = phaseName;
                } else if (choice == "选项四") {
                    // 将一张“注”置于牌堆顶视为使用之
                    event.goto(3);
                    return;
                }
                
                // 添加回合结束时的触发
                if (!player.hasSkill("clanduye_return")) {
                    player.addTempSkill("clanduye_return");
                }
                
                event.finish();
                
                "step 3"
                // 选择一张“注”
                if (player.storage.clanduye_zhu.length == 0) {
                    event.finish();
                    return;
                }
                
                player.chooseButton(
                    ["笃谒：选择一张“注”置于牌堆顶视为使用之", player.storage.clanduye_zhu],
                    true
                ).set("ai", function(button) {
                    return get.value(button.link);
                });
                
"step 4"
if (result.bool && result.links && result.links.length > 0) {
    var card = result.links[0];
    var owner = event.cardOwner;
    
    // 从"注"中移除
    var index = player.storage.clanduye_zhu.indexOf(card);
    if (index >= 0) {
        player.storage.clanduye_zhu.splice(index, 1);
        player.storage.clanduye_zhu_info.splice(index, 1);
    }
    player.syncStorage("clanduye_zhu");
    if (player.storage.clanduye_zhu.length == 0) {
        player.unmarkSkill("clanduye");
    } else {
        player.markSkill("clanduye");
    }
    
    // ✅ 修复：区分装备牌和非装备牌
    var cardType = get.type(card);
    
    if (cardType == 'equip') {
        // 装备牌：直接置于牌堆顶，不视为使用
        card.fix();
        ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
        game.log(card, "被置于牌堆顶");
        game.log(owner, "将", card, "置于牌堆顶");
    } else {
        // 非装备牌：置于牌堆顶并视为使用
        card.fix();
        ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
        game.log(card, "被置于牌堆顶");
        
        // 创建虚拟牌视为使用（保留原牌属性）
        var virtualCard = game.createCard(card.name, card.suit, card.number, card.nature);
        game.log(owner, "视为使用", virtualCard);
        owner.chooseUseTarget(virtualCard, true, false);
    }
}

// 添加回合结束时的触发
if (!player.hasSkill("clanduye_return")) {
    player.addTempSkill("clanduye_return");
}

            },
            sub: true,
        },
        // ✅ 修改：回合结束时清除全局选项记录
        clear_options: {
            trigger: {
                player: "phaseEnd",
            },
            forced: true,
            silent: true,
            popup: false,
            charlotte: true,
            content: function() {
                // 清除全局选项记录
                delete player.storage.clanduye_used_options;
                player.storage.clanduye_used_options = [];
                player.markSkill("clanduye"); // 更新标记显示
            },
            sub: true,
        },
        // 謇谔计数器
        jiane_count: {
            charlotte: true,
            trigger: {
                player: "phaseEnd",
            },
            forced: true,
            silent: true,
            popup: false,
            content: function() {
                if (!player.storage.clanduye_jiane_count) player.storage.clanduye_jiane_count = 0;
                player.storage.clanduye_jiane_count--;
                
                game.log(player, "的【謇谔】剩余", "#y" + player.storage.clanduye_jiane_count, "回合");
                
                if (player.storage.clanduye_jiane_count <= 0) {
                    delete player.storage.clanduye_jiane_count;
                    player.removeSkill("oljiane");
                    player.removeSkill("clanduye_jiane_count");
                    player.unmarkSkill("clanduye_jiane_count");
                    game.log(player, "失去了", "#g【謇谔】");
                } else {
                    player.markSkill("clanduye_jiane_count");
                }
            },
            intro: {
                content: function(storage, player) {
                    return "謇谔剩余" + storage + "回合";
                },
            },
            sub: true,
        },
        // 额外阶段
        extra: {
            trigger: {
                global: "roundEnd",
            },
            forced: true,
            charlotte: true,
            filter: function(event, player) {
                return player.storage.clanduye_extra;
            },
            content: function() {
                var phaseName = player.storage.clanduye_extra;
                delete player.storage.clanduye_extra;
                player.removeSkill("clanduye_extra");
                
                game.log(player, "执行一个额外的", "#g" + get.translation(phaseName));
                
                var next = player.insertPhase();
                next.phaseList = [phaseName];
            },
            sub: true,
        },
        // 回合结束时返还“注”
        return: {
            trigger: {
                player: "phaseEnd",
            },
            forced: true,
            charlotte: true,
            filter: function(event, player) {
                return player.storage.clanduye_zhu && player.storage.clanduye_zhu.length > 0;
            },
            content: function() {
                "step 0"
                game.log(player, "将“注”置回相应区域");
                
                event.zhuInfo = player.storage.clanduye_zhu_info.slice();
                event.zhuCards = player.storage.clanduye_zhu.slice();
                
                "step 1"
                if (event.zhuInfo.length == 0) {
                    // 清空存储
                    player.storage.clanduye_zhu = [];
                    player.storage.clanduye_zhu_info = [];
                    player.syncStorage("clanduye_zhu");
                    player.unmarkSkill("clanduye");
                    event.finish();
                    return;
                }
                
                var info = event.zhuInfo.shift();
                var card = info.card;
                var owner = info.owner;
                var position = info.position;
                
                // 置回相应区域
                if (owner && owner.isIn()) {
                    if (position == "h") {
                        owner.gain(card, "gain2");
                    } else if (position == "e") {
                        owner.equip(card);
                    } else if (position == "j") {
                        owner.addJudge(card);
                    } else {
                        owner.gain(card, "gain2");
                    }
                    game.log(card, "回到了", owner, "的", get.translation(position));
                } else {
                    // 如果原主人已经不在场，置入弃牌堆
                    card.fix();
                    ui.discardPile.appendChild(card);
                    game.log(card, "被置入了弃牌堆");
                }
                
                event.redo();
            },
            sub: true,
        },
        // 回合结束清除花色标记（如果有需要）
        clear: {
            trigger: {
                player: "phaseEnd",
            },
            forced: true,
            silent: true,
            popup: false,
            content: function() {
                // 可以在这里添加其他回合结束的清理逻辑
            },
            sub: true,
        },
    },
},

chikonglan: {
    audio: "ext:剑影:2",
    mod: {
        ignoredHandcard: function(card, player) {
            // 黑桃牌不计入手牌上限
            if (get.suit(card) == "spade") return true;
            // 点数小于场上人数的牌不计入手牌上限
            if (get.number(card) < game.countPlayer()) return true;
        },
        cardDiscardable: function(card, player, name) {
            if (name == "phaseDiscard") {
                if (get.suit(card) == "spade") return false;
                if (get.number(card) < game.countPlayer()) return false;
            }
        },
    },
    trigger: {
        target: "useCardToTargeted",
        global: "roundStart",
    },
    forced: true,
    filter: function(event, player, name) {
        if (name == "roundStart") {
            return player.storage.chikonglan_record && player.storage.chikonglan_record.length > 0;
        }
        if (name == "useCardToTargeted") {
            const cardName = event.card.name;
            const nameLength = get.translation(cardName).length;
            if (!player.storage.chikonglan_record) player.storage.chikonglan_record = [];
            return !player.storage.chikonglan_record.includes(nameLength);
        }
        return false;
    },
    content: async function(event, trigger, player) {
        'step 0'
        if (event.triggername == "roundStart") {
            // 清除记录
            player.storage.chikonglan_record = [];
            player.unmarkSkill("chikonglan");
            event.finish();
            return;
        }
        
        const cardName = trigger.card.name;
        const nameLength = get.translation(cardName).length;
        
        // 记录字数
        if (!player.storage.chikonglan_record) player.storage.chikonglan_record = [];
        player.storage.chikonglan_record.push(nameLength);
        player.markSkill("chikonglan");
        
        game.log(player, "记录了字数", "#g" + nameLength);
        
        // 获得相同张【影】
        const cards = [];
        for (let i = 0; i < nameLength; i++) {
            cards.push(game.createCard("ying"));
        }
        
        if (cards.length > 0) {
            await player.gain(cards, "gain2");
        }
    },
    marktext: "阑",
    intro: {
        name: "空阑",
        content: function(storage, player) {
            var storage = player.storage.chikonglan_record;
            if (!storage || storage.length == 0) return "未记录";
            return "已记录字数：" + storage.join("、");
        },
    },
    init: function(player, skill) {
        if (!player.storage.chikonglan_record) {
            player.storage.chikonglan_record = [];
        }
    },
},


// 悬照
chixuanzhao: {
    audio: "ext:剑影:2",
    enable: ["chooseToUse", "chooseToRespond"],
    filter: function(event, player) {
        if (!player.countCards("h", {name: "ying"})) return false;
        return true;
    },
    chooseButton: {
        dialog: function(event, player) {
            const yingNum = player.countCards("h", {name: "ying"});
            const list = [];
            
            // 阴：按字数
            for (let i = 1; i <= yingNum; i++) {
                for (const name in lib.card) {
                    if (lib.card[name].type == "basic" || lib.card[name].type == "trick") {
                        if (get.translation(name).length == i) {
                            list.push(["阴", i + "张影", name]);
                        }
                    }
                }
            }
            
            // 阳：按目标数
            for (let i = 1; i <= yingNum; i++) {
                for (const name in lib.card) {
                    if (lib.card[name].type == "basic" || lib.card[name].type == "trick") {
                        // 简化处理，假设目标数
                        list.push(["阳", i + "张影", name]);
                    }
                }
            }
            
            return ui.create.dialog("悬照", [list, "vcard"]);
        },
        filter: function(button, player) {
            const event = _status.event.getParent();
            return event.filterCard({name: button.link[2]}, player, event);
        },
        check: function(button) {
            const player = _status.event.player;
            return player.getUseValue({name: button.link[2]});
        },
        backup: function(links, player) {
            const num = parseInt(links[0][1]);
            return {
                filterCard: function(card) {
                    return card.name == "ying";
                },
                selectCard: num,
                viewAs: {name: links[0][2]},
                position: "h",
            };
        },
        prompt: function(links, player) {
            return "将" + links[0][1] + "当作【" + get.translation(links[0][2]) + "】使用";
        },
    },
    ai: {
        order: 8,
        result: {
            player: 1,
        },
    },
    group: ["chixuanzhao_yin", "chixuanzhao_yang"],
    subSkill: {
        backup: {
            sub: true,
            sourceSkill: "chixuanzhao",
        },
    },
},

// 携阁
chixiege: {
    audio: "ext:剑影:2",
    trigger: {
        global: "roundStart",
    },
    direct: true,
    init: function(player) {
        if (!player.storage.chixiege_history) {
            player.storage.chixiege_history = {
                lastChoice: null,
                bonus: {}
            };
        }
    },
    content: async function(event, trigger, player) {
        'step 0'
        if (!player.storage.chixiege_history) {
            player.storage.chixiege_history = {
                lastChoice: null,
                bonus: {}
            };
        }
        
        const {result: targetResult} = await player.chooseTarget(
            get.prompt("chixiege"),
            "令一名角色及其上家于本轮的一个数值+1",
            (card, player, target) => {
                return true;
            }
        ).set("ai", target => {
            const player = _status.event.player;
            return get.attitude(player, target);
        });
        
        if (!targetResult.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("chixiege", targetResult.targets);
        event.target = targetResult.targets[0];
        event.prev = event.target.previous;
        
        'step 1'
        // 显示当前累积加成
        const history1 = player.storage.chixiege_history;
        
        // 计算如果选择该选项会得到的值（预判）
        const getNextValue = function(option) {
            const currentBonus = history1.bonus[option] || 0;
            // 如果上次选的是这个选项，会继续累积
            if (history1.lastChoice == option) {
                return 1 + currentBonus + 1;  // 基础1 + 已有累积 + 新增1
            } else {
                return 1;  // 重置为1
            }
        };
        
        const nextValue1 = getNextValue("选项一");
        const nextValue2 = getNextValue("选项二");
        const nextValue3 = getNextValue("选项三");
        const nextValue4 = getNextValue("选项四");
        
        // 选择数值
        const {result: choiceResult} = await player.chooseControl("选项一", "选项二", "选项三", "选项四")
            .set("prompt", "携阁：选择要增加的数值" + (history1.lastChoice ? "（上次：" + history1.lastChoice + "）" : ""))
            .set("choiceList", [
                "出牌阶段使用【杀】次数+" + nextValue1 + (history1.lastChoice == "选项一" ? "（连续选择）" : (history1.bonus["选项一"] > 0 ? "（将重置）" : "")),
                "摸牌阶段摸牌数+" + nextValue2 + (history1.lastChoice == "选项二" ? "（连续选择）" : (history1.bonus["选项二"] > 0 ? "（将重置）" : "")),
                "受到或造成伤害后摸" + nextValue3 + "张牌" + (history1.lastChoice == "选项三" ? "（连续选择）" : (history1.bonus["选项三"] > 0 ? "（将重置）" : "")),
                "单体伤害牌的可选目标+" + nextValue4 + (history1.lastChoice == "选项四" ? "（连续选择）" : (history1.bonus["选项四"] > 0 ? "（将重置）" : "")),
            ])
            .set("ai", () => {
                return 0;
            });
        
        event.choice = choiceResult.control;
        
        'step 2'
        const history = player.storage.chixiege_history;
        
        // 检查是否与上次相同
        if (history.lastChoice == event.choice) {
            // 相同：累积+1
            if (!history.bonus[event.choice]) history.bonus[event.choice] = 0;
            history.bonus[event.choice]++;
            game.log(player, "连续选择", event.choice, "，加成提升至", "#g+" + (1 + history.bonus[event.choice]));
        } else {
            // 不同：清空所有累积，从1开始
            history.bonus = {};
            history.bonus[event.choice] = 0;
            if (history.lastChoice) {
                game.log(player, "选择了不同选项，累积加成已重置");
            }
        }
        
        // 更新上次选择
        history.lastChoice = event.choice;
        
        // 计算实际加成值
        const actualBonus = 1 + (history.bonus[event.choice] || 0);
        
        const targets1 = [event.target];
        if (event.prev && event.prev != event.target) targets1.push(event.prev);
        
        for (const target of targets1) {
            if (event.choice == "选项一") {
                target.addTempSkill("chixiege_sha", {global: "roundStart"});
                target.storage.chixiege_sha = actualBonus;
                target.markSkill("chixiege_sha");
            } else if (event.choice == "选项二") {
                target.addTempSkill("chixiege_draw", {global: "roundStart"});
                target.storage.chixiege_draw = actualBonus;
                target.markSkill("chixiege_draw");
            } else if (event.choice == "选项三") {
                target.addTempSkill("chixiege_damage", {global: "roundStart"});
                target.storage.chixiege_damage = actualBonus;
                target.markSkill("chixiege_damage");
            } else if (event.choice == "选项四") {
                target.addTempSkill("chixiege_target", {global: "roundStart"});
                target.storage.chixiege_target = actualBonus;
                target.markSkill("chixiege_target");
            }
        }
        
        game.log(targets1, "的相应数值+", actualBonus);
    },
    subSkill: {
        sha: {
            mod: {
                cardUsable: function(card, player, num) {
                    if (card.name == "sha") {
                        const bonus = player.storage.chixiege_sha || 0;
                        return num + bonus;
                    }
                },
            },
            charlotte: true,
            onremove: true,
            mark: true,
            marktext: "阁",
            intro: {
                name: "携阁",
                content: "本轮出牌阶段使用【杀】次数+#",
            },
            sub: true,
            sourceSkill: "chixiege",
        },
        draw: {
            trigger: {
                player: "phaseDrawBegin2",
            },
            forced: true,
            charlotte: true,
            onremove: true,
            content: function() {
                const bonus = player.storage.chixiege_draw || 0;
                trigger.num += bonus;
            },
            mark: true,
            marktext: "阁",
            intro: {
                name: "携阁",
                content: "本轮摸牌阶段摸牌数+#",
            },
            sub: true,
            sourceSkill: "chixiege",
        },
        damage: {
            trigger: {
                player: "damageEnd",
                source:"damageSource",
            },
            forced: true,
            charlotte: true,
            onremove: true,
            content: function() {
                const num = player.storage.chixiege_damage || 1;
                player.draw(num);
            },
            mark: true,
            marktext: "阁",
            intro: {
                name: "携阁",
                content: "本轮受到或造成伤害后摸#张牌",
            },
            sub: true,
            sourceSkill: "chixiege",
        },
        target: {
            mod: {
                selectTarget: function(card, player, range) {
                    if (get.tag(card, "damage") && range[1] == 1) {
                        const bonus = player.storage.chixiege_target || 0;
                        range[1] += bonus;
                    }
                },
                targetInRange: function(card, player) {
                    if (get.tag(card, "damage")) return true;
                },
            },
            charlotte: true,
            onremove: true,
            mark: true,
            marktext: "阁",
            intro: {
                name: "携阁",
                content: "本轮单体伤害牌的可选目标+#",
            },
            sub: true,
            sourceSkill: "chixiege",
        },
    },
},


// 尚椒
chishangjiao: {
    audio: "ext:剑影:2",
    trigger: {
        global: "cardsDiscardAfter",
        target: "useCardToTargeted",
    },
    forced: true,
    init: function(player) {
        if (!player.storage.chishangjiao_count) {
            player.storage.chishangjiao_count = 0;
        }
    },
    filter: function(event, player, name) {
        if (name == "cardsDiscardAfter") {
            // ①每轮限一次
            if (player.hasSkill("chishangjiao_used")) return false;
            
            if (!event.cards || event.cards.length == 0) return false;
            
            // 检查是否有牌在弃牌堆
            const validCards = event.cards.filter(card => get.position(card) == "d");
            if (validCards.length == 0) return false;
            
            // 获取合法目标数
            const card = validCards[0];
            let targetNum = 1;
            
            if (card.name && lib.card[card.name]) {
                const info = lib.card[card.name];
                if (info.selectTarget) {
                    const range = get.select(info.selectTarget);
                    targetNum = range[1] == -1 ? 1 : range[1];
                } else if (info.notarget) {
                    targetNum = 0;
                }
            }
            
            // 获取本轮发动次数
            const count = player.storage.chishangjiao_count || 0;
            
            return targetNum <= (count + 1);
        }
        
        if (name == "useCardToTargeted") {
            const card = event.card;
            
            // 获取合法目标数
            let targetNum = 1;
            if (event.parent && event.parent.targets) {
                targetNum = event.parent.targets.length;
            }
            
            // 获取牌名字数
            const nameLength = get.translation(card.name).length;
            
            return targetNum != nameLength;
        }
        
        return false;
    },
    content: async function(event, trigger, player) {
        'step 0'
        if (event.triggername == "cardsDiscardAfter") {
            // ①获得牌
            const cards = trigger.cards.filter(card => get.position(card) == "d");
            if (cards.length > 0) {
                await player.gain(cards, "gain2");
            }
            
            // 增加计数
            if (!player.storage.chishangjiao_count) player.storage.chishangjiao_count = 0;
            player.storage.chishangjiao_count++;
            player.markSkill("chishangjiao_counter");
            
            player.addTempSkill("chishangjiao_used", "roundStart");
            event.finish();
        } else {
            // ②成为目标
            const card = trigger.card;
            
            // 获取所有目标
            let targets = [];
            if (trigger.parent && trigger.parent.targets) {
                targets = trigger.parent.targets;
            } else if (trigger.targets) {
                targets = Array.isArray(trigger.targets) ? trigger.targets : [trigger.targets];
            } else if (trigger.target) {
                targets = [trigger.target];
            }
            
            const targetNum = targets.length;
            const nameLength = get.translation(card.name).length;
            
            event.diff = Math.abs(targetNum - nameLength);
            event.isLess = targetNum < nameLength;
            event.targets = targets;
        }
        
        'step 1'
        // 至多两张
        const num = Math.min(event.diff, 2);
        
        const targets = Array.isArray(event.targets) ? event.targets : [];
        
        for (const target of targets) {
            if (!target || target.isDead()) continue;
            
            if (event.isLess) {
                // 合法目标数小于牌名字数：摸牌
                await target.draw(num);
            } else {
                // 合法目标数大于等于牌名字数：弃牌
                await target.chooseToDiscard(num, true, "he");
            }
        }
    },
    group: ["chishangjiao_gain", "chishangjiao_reset"],
    subSkill: {
        used: {
            charlotte: true,
            sub: true,
            sourceSkill: "chishangjiao",
        },
        counter: {
            charlotte: true,
            onremove: true,
            mark: true,
            marktext: "椒",
            intro: {
                name: "尚椒",
                content: function(storage,player) {
                    var storage = player.storage.chishangjiao_count;
                     return  "本轮选项①已发动"+ storage +"次";
                }
            },
            sub: true,
            sourceSkill: "chishangjiao",
        },
        gain: {
            trigger: {
                player: "gainAfter",
            },
            forced: true,
            silent: true,
            charlotte: true,
            lastDo: true,
            filter: function(event, player) {
                // 摸牌阶段外获得牌
                if (event.getParent().name == "draw" && event.getParent(2).name == "phaseDraw") {
                    return false;
                }
                return event.cards && event.cards.length > 0;
            },
            content: function() {
                // 打上tag
                if (trigger.cards && trigger.cards.length > 0) {
                    const cards = trigger.cards.filter(card => {
                        return player.getCards("h").includes(card);
                    });
                    
                    if (cards.length > 0) {
                        player.addGaintag(cards, "chishangjiao_tag");
                    }
                }
            },
            mod: {
                ignoredHandcard(card, player) {
                    if (card.hasGaintag("chishangjiao_tag")) {
                        return true;
                    }
                },
                cardDiscardable(card, player, name) {
                    if (name == "phaseDiscard" && card.hasGaintag("chishangjiao_tag")) {
                        return false;
                    }
                },
            },
            sub: true,
            sourceSkill: "chishangjiao",
        },
        reset: {
            trigger: {
                global: "roundStart",
            },
            forced: true,
            silent: true,
            charlotte: true,
            content: function() {
                // 清除tag
                const cards = player.getCards("h");
                for (const card of cards) {
                    if (card.hasGaintag && card.hasGaintag("chishangjiao_tag")) {
                        card.removeGaintag("chishangjiao_tag");
                    }
                }
                
                // 重置计数
                player.storage.chishangjiao_count = 0;
                player.unmarkSkill("chishangjiao_counter");
            },
            sub: true,
            sourceSkill: "chishangjiao",
        },
    },
},


// 篁礼
chihuangli: {
    audio: "ext:剑影:2",
    trigger: {
        player: ["phaseZhunbeiBegin", "damageEnd"],
    },
    forced: true,
    content: async function(event, trigger, player) {
        'step 0'
        // 选择展示牌堆顶还是牌堆底
        const {result: posResult} = await player.chooseControl("牌堆顶", "牌堆底")
            .set("prompt", "篁礼：选择展示的位置")
            .set("ai", () => {
                return Math.random() < 0.5 ? 0 : 1;
            });
        
        event.isTop = posResult.control == "牌堆顶";
        
        'step 1'
        // 固定展示2张牌
        event.num = 2;
        
        'step 2'
        // 展示牌
        const cards = [];
        if (event.isTop) {
            for (let i = 0; i < event.num && ui.cardPile.childNodes.length > 0; i++) {
                cards.push(ui.cardPile.childNodes[i]);
            }
        } else {
            for (let i = 0; i < event.num && ui.cardPile.childNodes.length > 0; i++) {
                cards.push(ui.cardPile.childNodes[ui.cardPile.childNodes.length - 1 - i]);
            }
        }
        
        event.cards = cards;
        player.showCards(cards, "篁礼");
        
        'step 3'
        // 检查条件
        const colors = [];
        const types = [];
        const suits = [];
        
        for (const card of event.cards) {
            const color = get.color(card);
            const type = get.type(card);
            const suit = get.suit(card);
            
            if (color && !colors.includes(color)) colors.push(color);
            if (type && !types.includes(type)) types.push(type);
            if (suit && !suits.includes(suit)) suits.push(suit);
        }
        
        event.sameColor = colors.length == 1;
        event.sameType = types.length == 1;
        event.diffSuit = suits.length == event.cards.length;
        event.diffType = types.length == event.cards.length;
        
        'step 4'
        // 颜色相同：获得这些牌并查看牌堆顶3张牌
        if (event.sameColor) {
            await player.gain(event.cards, "gain2");
            
            const topCards = [];
            for (let i = 0; i < 3 && ui.cardPile.childNodes.length > 0; i++) {
                topCards.push(ui.cardPile.childNodes[i]);
            }
            
            if (topCards.length > 0) {
                const {result: arrangeResult} = await player.chooseToMove(
                    "篁礼：将这些牌以任意顺序放置于牌堆顶或底",
                    true
                ).set("list", [
                    ["牌堆顶", topCards],
                    ["牌堆底"],
                ]).set("processAI", list => {
                    return {
                        list: [list[0], []],
                        moved: [0, 0],
                    };
                });
                
                if (arrangeResult.bool) {
                    const top = arrangeResult.moved[0];
                    const bottom = arrangeResult.moved[1];
                    
                    top.reverse();
                    for (const card of top) {
                        ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                    }
                    
                    for (const card of bottom) {
                        ui.cardPile.appendChild(card);
                    }
                }
            }
        }
        
        'step 5'
        // 类型相同：下一张牌不计入次数且无距离限制
        if (event.sameType) {
            const current = _status.currentPhase;
            if (current) {
                current.addTempSkill("chihuangli_type");
            }
        }
        
        'step 6'
        // 花色均不相同：令一名角色恢复一点体力
        if (event.diffSuit) {
            // 检查是否有受伤角色
            const hasDamagedTarget = game.hasPlayer(target => target.isDamaged());
            
            if (hasDamagedTarget) {
                const {result: targetResult} = await player.chooseTarget(
                    "篁礼：令一名角色恢复一点体力",
                    true,
                    (card, player, target) => {
                        return target.isDamaged();
                    }
                ).set("ai", target => {
                    const player = _status.event.player;
                    return get.recoverEffect(target, player, player);
                });
                
                if (targetResult.bool && targetResult.targets && targetResult.targets.length > 0) {
                    await targetResult.targets[0].recover();
                }
            }
        }
        
        'step 7'
        // 类型均不相同：从牌堆底摸两倍数量的牌
        if (event.diffType) {
            const num = event.cards.length * 2;
            const cards = [];
            
            // 从牌堆底取牌
            for (let i = 0; i < num && ui.cardPile.childNodes.length > 0; i++) {
                const card = ui.cardPile.childNodes[ui.cardPile.childNodes.length - 1];
                cards.push(card);
                ui.cardPile.removeChild(card);
            }
            
            if (cards.length > 0) {
                await player.gain(cards, "gain2");
                game.log(player, "从牌堆底获得了", cards);
            }
        }
        
        'step 8'
        // 均不满足任何条件
        if (!event.sameColor && !event.sameType && !event.diffSuit && !event.diffType) {
            const current = _status.currentPhase;
            if (current) {
                await current.loseHp();
                
                const cards = current.getCards("he");
                if (cards.length > 0) {
                    await current.recast(cards);
                }
            }
        }
    },
    subSkill: {
        type: {
            charlotte: true,
            mark: true,
            marktext: "礼",
            intro: {
                content: "下一张牌不计入次数且无距离限制",
            },
            mod: {
                cardUsable: function(card, player, num) {
                    return Infinity;
                },
                targetInRange: function(card, player) {
                    return true;
                },
            },
            trigger: {
                player: "useCardAfter",
            },
            forced: true,
            popup: false,
            content: function() {
                player.removeSkill("chihuangli_type");
            },
            sub: true,
            sourceSkill: "chihuangli",
        },
    },
},

// 簌肃
chisusu: {
    audio: "ext:剑影:2",
    trigger: {
        player: "useCard",
    },
    forced: true,
    filter: function(event, player) {
        const type = get.type(event.card);
        
        if (type != "basic") {
            return !player.hasSkill("chisusu_notbasic");
        } else {
            return !player.hasSkill("chisusu_basic");
        }
    },
    content: async function(event, trigger, player) {
        const type = get.type(trigger.card);
        
        if (type != "basic") {
            // 非基本牌：下一张基本牌执行两次
            player.addTempSkill("chisusu_notbasic");
            player.addTempSkill("chisusu_twice");
        } else {
            // 基本牌：下一张非基本牌额外指定一个目标
            player.addTempSkill("chisusu_basic");
            player.addTempSkill("chisusu_target");
        }
    },
    subSkill: {
        notbasic: {
            charlotte: true,
            mark: true,
            marktext: "簌",
            intro: {
                content: "下一张基本牌执行两次",
            },
            sub: true,
            sourceSkill: "chisusu",
        },
        basic: {
            charlotte: true,
            mark: true,
            marktext: "簌",
            intro: {
                content: "下一张非基本牌额外指定一个目标",
            },
            sub: true,
            sourceSkill: "chisusu",
        },
        target: {
            charlotte: true,
            mod: {
                targetInRange: function(card, player) {
                    if (get.type(card) != "basic") return true;
                },
            },
            trigger: {
                player: "useCard2",
            },
            forced: true,
            popup: false,
            filter: function(event, player) {
                if (get.type(event.card) == "basic") return false;
                
                const info = get.info(event.card);
                if (!info || info.notarget) return false;
                
                // 检查是否可以增加目标
                if (info.selectTarget == undefined) return false;
                
                const range = get.select(info.selectTarget);
                if (range[1] != -1 && event.targets.length >= range[1]) {
                    // 已达到最大目标数，需要增加上限
                    return game.hasPlayer(target => {
                        return !event.targets.includes(target) && lib.filter.targetEnabled2(event.card, player, target);
                    });
                }
                
                return false;
            },
            content: function() {
                "step 0"
                const prompt = "簌肃：是否为" + get.translation(trigger.card) + "额外指定一个目标？";
                
                player.chooseTarget(
                    get.prompt("chisusu_target"),
                    (card, player, target) => {
                        const trigger = _status.event.getTrigger();
                        return !trigger.targets.includes(target) && lib.filter.targetEnabled2(trigger.card, player, target);
                    }
                ).set("ai", target => {
                    const trigger = _status.event.getTrigger();
                    const player = _status.event.player;
                    return get.effect(target, trigger.card, player, player);
                }).set("prompt2", prompt);
                
                "step 1"
                if (result.bool) {
                    if (!trigger.targets) trigger.targets = [];
                    trigger.targets.push(result.targets[0]);
                    player.line(result.targets[0], "green");
                    game.log(player, "为", trigger.card, "额外指定了目标", result.targets[0]);
                }
                
                player.removeSkill("chisusu_basic");
                player.removeSkill("chisusu_target");
            },
            sub: true,
            sourceSkill: "chisusu",
        },
        twice: {
            charlotte: true,
            trigger: {
                player: "useCardToPlayered",
            },
            forced: true,
            popup: false,
            filter: function(event, player) {
                if (get.type(event.card) != "basic") return false;
                return true;
            },
            content: function() {
                trigger.getParent().effectCount++;
                player.removeSkill("chisusu_notbasic");
                player.removeSkill("chisusu_twice");
            },
            sub: true,
            sourceSkill: "chisusu",
        },
    },
},


// 阒阁
chiquge: {
    audio: "ext:剑影:2",
    trigger: {
        player: ["phaseUseBegin"],
    },
    forced: true,
    charlotte: true,
    filter: function(event, player) {
        // ①体力值等于体力上限
        if (player.hp == player.maxHp && !player.hasSkill("chiquge_hp")) return true;
        
        // ②手牌数等于手牌上限
        if (player.countCards("h") == player.getHandcardLimit() && !player.hasSkill("chiquge_hand")) return true;
        
        // ③"睄睒"任意选项相等
        if (!player.storage.chishaoshan_bonus) return false;
        const bonusValues = Object.values(player.storage.chishaoshan_bonus);
        for (let i = 0; i < bonusValues.length; i++) {
            for (let j = i + 1; j < bonusValues.length; j++) {
                if (bonusValues[i] == bonusValues[j] && bonusValues[i] > 0) {
                    if (!player.hasSkill("chiquge_shaoshan")) return true;
                }
            }
        }
        
        return false;
    },
    content: function() {
        "step 0"
        event.conditions = [];
        
        // ①体力值等于体力上限
        if (player.hp == player.maxHp && !player.hasSkill("chiquge_hp")) {
            event.conditions.push("hp");
        }
        
        // ②手牌数等于手牌上限
        const handLimit = player.getHandcardLimit();
        const handNum = player.countCards("h");
        
        if (handNum == handLimit && !player.hasSkill("chiquge_hand")) {
            event.conditions.push("hand");
        }
        
        // ③"睄睒"任意选项相等
        if (player.storage.chishaoshan_bonus) {
            const bonusEntries = Object.entries(player.storage.chishaoshan_bonus);
            const equalPairs = [];
            
            for (let i = 0; i < bonusEntries.length; i++) {
                for (let j = i + 1; j < bonusEntries.length; j++) {
                    if (bonusEntries[i][1] == bonusEntries[j][1] && bonusEntries[i][1] > 0) {
                        equalPairs.push([bonusEntries[i][0], bonusEntries[j][0]]);
                    }
                }
            }
            
            if (equalPairs.length > 0 && !player.hasSkill("chiquge_shaoshan")) {
                event.conditions.push("shaoshan");
                event.equalPairs = equalPairs;
            }
        }
        
        if (event.conditions.length == 0) {
            event.finish();
            return;
        }
        
        event.conditionIndex = 0;
        
        "step 1"
        // 处理每个条件
        if (event.conditionIndex >= event.conditions.length) {
            event.finish();
            return;
        }
        
        const condition = event.conditions[event.conditionIndex];
        event.currentCondition = condition;
        
        if (condition == "hp") {
            player.addTempSkill("chiquge_hp", "phaseUseAfter");
            
            // 添加距离-1效果（可叠加）
            if (!player.storage.chiquge_distance) player.storage.chiquge_distance = 0;
            player.storage.chiquge_distance++;
            player.addTempSkill("chiquge_distance", {player: "phaseEnd"});
            player.markSkill("chiquge_distance");
            
            player.draw();
            game.log(player, '摸了1张牌，本回合与其他角色距离-1');
            
            // 令"睄睒"任一选项+1
            if (player.storage.chishaoshan_bonus) {
                const keys = Object.keys(player.storage.chishaoshan_bonus);
                if (keys.length > 0) {
                    const randomKey = keys[Math.floor(Math.random() * keys.length)];
                    player.storage.chishaoshan_bonus[randomKey]++;
                    player.markSkill("chishaoshan");
                    game.log(player, '令睄睒选项', '#g' + randomKey, '+1');
                }
            }
            
            event.conditionIndex++;
            event.redo();
        } else if (condition == "hand") {
            player.addTempSkill("chiquge_hand", "phaseUseAfter");
            player.draw();
            // 检查是否有可以使用火杀的目标
            var targets = game.filterPlayer(function(current) {
                return current != player && player.canUse({name: "sha", nature: "fire"}, current);
            });
            
            if (targets.length > 0) {
                player.chooseUseTarget({name: "sha", nature: "fire"}, true, false)
                    .set("addCount", false)
                    .set("logSkill", "chiquge");
            } else {
                game.log(player, '没有可以使用火【杀】的目标');
                event.conditionIndex++;
                event.redo();
            }
        } else if (condition == "shaoshan") {
            player.addTempSkill("chiquge_shaoshan", "phaseUseAfter");
            
            // 摸一张牌
            player.draw();
            
            // 恢复被移除的选项
            if (player.storage.chishaoshan_removed && player.storage.chishaoshan_removed.length > 0) {
                // 找出相等的选项
                const equalOptions = [];
                for (const pair of event.equalPairs) {
                    if (player.storage.chishaoshan_removed.includes(pair[0])) {
                        equalOptions.push(pair[0]);
                    }
                    if (player.storage.chishaoshan_removed.includes(pair[1])) {
                        equalOptions.push(pair[1]);
                    }
                }
                
                if (equalOptions.length > 0) {
                    player.chooseControl(equalOptions)
                        .set("prompt", "阒阁：恢复一个被移除的睄睒选项")
                        .set("ai", function() {
                            return 0;
                        });
                } else {
                    event.conditionIndex++;
                    event.redo();
                }
            } else {
                event.conditionIndex++;
                event.redo();
            }
        }
        
        "step 2"
        // 处理选择结果
        if (event.currentCondition == "hand") {
            event.conditionIndex++;
            event.goto(1);
        } else if (event.currentCondition == "shaoshan") {
            if (result.control) {
                const index = player.storage.chishaoshan_removed.indexOf(result.control);
                if (index > -1) {
                    player.storage.chishaoshan_removed.splice(index, 1);
                    game.log(player, '恢复了睄睒选项', '#g' + result.control);
                }
            }
            event.conditionIndex++;
            event.goto(1);
        }
    },
    subSkill: {
        hp: {
            charlotte: true,
            sub: true,
            sourceSkill: "chiquge",
        },
        hand: {
            charlotte: true,
            sub: true,
            sourceSkill: "chiquge",
        },
        shaoshan: {
            charlotte: true,
            sub: true,
            sourceSkill: "chiquge",
        },
        distance: {
            charlotte: true,
            onremove: true,
            mod: {
                globalTo: function(from, to, distance) {
                    return distance + (to.storage.chiquge_distance || 0);
                },
            },
            mark: true,
            intro: {
                name: "阒阁·距离",
                content: function(storage, player) {
                    return '本回合与其他角色距离-' + (player.storage.chiquge_distance || 0);
                },
            },
            sub: true,
            sourceSkill: "chiquge",
        },
    },
},

// 睄睒
chishaoshan: {
    audio: "ext:剑影:2",
    enable: "phaseUse",
    usable: 1,
    filter: function(event, player) {
        const removed = player.storage.chishaoshan_removed || [];
        return removed.length < 4;
    },
    chooseButton: {
        dialog: function(event, player) {
            const removed = player.storage.chishaoshan_removed || [];
            const options = ["体力值", "手牌上限", "出杀次数", "体力上限"];
            const available = options.filter(opt => !removed.includes(opt));
            
            if (!player.storage.chishaoshan_bonus) player.storage.chishaoshan_bonus = {};
            
            // 计算当前数值
            const values = {
                "体力值": player.hp,
                "手牌上限": player.getHandcardLimit(),
                "出杀次数": player.getCardUsable("sha"),
                "体力上限": player.maxHp,
            };
            
            // 应用bonus
            for (const key in player.storage.chishaoshan_bonus) {
                if (values[key] !== undefined) {
                    values[key] += player.storage.chishaoshan_bonus[key];
                }
            }
            
            // 判断当前状态（0次为阴，1次为阳，2次为阴...）
            const times = player.storage.chishaoshan_times || 0;
            const isYin = times % 2 == 0; // 偶数次为阴
            const state = isYin ? '<span style="color:#2f90b9">阴</span>' : '<span style="color:#ab372f">阳</span>';
            
            let str = '睄睒·' + state + '：选择两个属性交换数值<br><br>';
            str += '<div class="text" style="text-align:left">';
            for (const key of available) {
                const bonus = player.storage.chishaoshan_bonus[key] || 0;
                str += key + ': ' + values[key];
                if (bonus > 0) str += ' <span style="color:green">(+' + bonus + ')</span>';
                else if (bonus < 0) str += ' <span style="color:red">(' + bonus + ')</span>';
                str += '<br>';
            }
            str += '</div>';
            
            return ui.create.dialog(str, [available, 'tdnodes']);
        },
        filter: function(button, player) {
            return true;
        },
        check: function(button) {
            return 1;
        },
        select: 2,
        backup: function(links, player) {
            return {
                audio: "chishaoshan",
                filterCard: () => false,
                selectCard: -1,
                first: links[0],
                second: links[1],
                content: lib.skill.chishaoshan_backup,
            };
        },
        prompt: function(links, player) {
            return '交换' + links[0] + '和' + links[1] + '的数值';
        },
    },
    ai: {
        order: 10,
        result: {
            player: function(player) {
                if (player.hp < player.maxHp) return 1;
                return 0.5;
            },
        },
    },
    group: ["chishaoshan_clear"],
    subSkill: {
        backup: function() {
            "step 0"
            const first = event.first;
            const second = event.second;
            
            if (!player.storage.chishaoshan_bonus) player.storage.chishaoshan_bonus = {};
            
            // 计算当前数值
            const values = {
                "体力值": player.hp,
                "手牌上限": player.getHandcardLimit(),
                "出杀次数": player.getCardUsable("sha"),
                "体力上限": player.maxHp,
            };
            
            // 应用bonus
            for (const key in player.storage.chishaoshan_bonus) {
                if (values[key] !== undefined) {
                    values[key] += player.storage.chishaoshan_bonus[key];
                }
            }
            
            const val1 = values[first];
            const val2 = values[second];
            
            event.val1 = val1;
            event.val2 = val2;
            event.first = first;
            event.second = second;
            
            // 转换技状态切换（0次为阴，1次为阳，2次为阴...）
            if (!player.storage.chishaoshan_times) player.storage.chishaoshan_times = 0;
            const isYin = player.storage.chishaoshan_times % 2 == 0; // 偶数次为阴
            event.isYin = isYin;
            
            game.log(player, "交换了", "#y" + first + "(" + val1 + ")", "和", "#y" + second + "(" + val2 + ")");
            
            // 应用交换
            if (first == "体力值") {
                const diff = val2 - player.hp;
                if (diff > 0) {
                    player.recover(diff);
                } else if (diff < 0) {
                    player.loseHp(-diff);
                }
            } else if (first == "手牌上限") {
                player.addTempSkill("chishaoshan_handLimit", {player: "phaseEnd"});
                player.storage.chishaoshan_handLimit = val2;
                player.markSkill("chishaoshan");
            } else if (first == "出杀次数") {
                player.addTempSkill("chishaoshan_sha", {player: "phaseEnd"});
                player.storage.chishaoshan_sha = val2;
                player.markSkill("chishaoshan");
            } else if (first == "体力上限") {
                const diff = val2 - player.maxHp;
                if (diff > 0) {
                    player.gainMaxHp(diff);
                } else if (diff < 0) {
                    player.loseMaxHp(-diff);
                }
            }
            
            if (second == "体力值") {
                const diff = val1 - player.hp;
                if (diff > 0) {
                    player.recover(diff);
                } else if (diff < 0) {
                    player.loseHp(-diff);
                }
            } else if (second == "手牌上限") {
                player.addTempSkill("chishaoshan_handLimit", {player: "phaseEnd"});
                player.storage.chishaoshan_handLimit = val1;
                player.markSkill("chishaoshan");
            } else if (second == "出杀次数") {
                player.addTempSkill("chishaoshan_sha", {player: "phaseEnd"});
                player.storage.chishaoshan_sha = val1;
                player.markSkill("chishaoshan");
            } else if (second == "体力上限") {
                const diff = val1 - player.maxHp;
                if (diff > 0) {
                    player.gainMaxHp(diff);
                } else if (diff < 0) {
                    player.loseMaxHp(-diff);
                }
            }
            
            "step 1"
            // 移除选项
            if (!player.storage.chishaoshan_removed) player.storage.chishaoshan_removed = [];
            player.storage.chishaoshan_removed.push(event.first, event.second);
            player.addTempSkill("chishaoshan_removed", {player: "phaseEnd"});
            player.markSkill("chishaoshan");
            
            // 未被选到的属性+1
            const allOptions = ["体力值", "手牌上限", "出杀次数", "体力上限"];
            const removed = player.storage.chishaoshan_removed || [];
            const available = allOptions.filter(opt => !removed.includes(opt));
            
            for (const opt of available) {
                if (!player.storage.chishaoshan_bonus) player.storage.chishaoshan_bonus = {};
                player.storage.chishaoshan_bonus[opt] = (player.storage.chishaoshan_bonus[opt] || 0) + 1;
            }
            player.markSkill("chishaoshan");
            
            "step 2"
            // 检查溢出
            let overflow = 0;
            
            // 检查体力值溢出
            if (player.hp > player.maxHp) {
                overflow += player.hp - player.maxHp;
                player.hp = player.maxHp;
                player.update();
            }
            
            // 检查手牌数溢出（相对于手牌上限）
            const handLimit = player.getHandcardLimit();
            if (player.countCards("h") > handLimit) {
                overflow += player.countCards("h") - handLimit;
            }
            
            event.overflow = overflow;
            
            "step 3"
            if (event.overflow > 0) {
                // 获取未被选择的选项
                const allOptions = ["体力值", "手牌上限", "出杀次数", "体力上限"];
                const unselected = allOptions.filter(opt => opt != event.first && opt != event.second);
                
                if (event.isYin) {
                    // 阴：摸X张牌或令本次未被选择的一项-X
                    const choices = ['摸' + event.overflow + '张牌'];
                    if (unselected.length > 0) {
                        for (const opt of unselected) {
                            choices.push('令' + opt + '-' + event.overflow);
                        }
                    }
                    
                    player.chooseControl(choices)
                        .set("prompt", "睄睒·阴：选择一项")
                        .set("ai", function() {
                            return 0; // 优先摸牌
                        });
                } else {
                    // 阳：弃X张牌或令本次未被选择的一项+X
                    const choices = ['弃' + event.overflow + '张牌'];
                    if (unselected.length > 0) {
                        for (const opt of unselected) {
                            choices.push('令' + opt + '+' + event.overflow);
                        }
                    }
                    
                    player.chooseControl(choices)
                        .set("prompt", "睄睒·阳：选择一项")
                        .set("ai", function() {
                            if (player.countCards('he') < _status.event.overflow) return 1;
                            return 0;
                        })
                        .set("overflow", event.overflow);
                }
            } else {
                // 没有溢出，直接切换状态
                player.storage.chishaoshan_times++;
                player.markSkill("chishaoshan");
                event.finish();
            }
            
            "step 4"
            if (result.control) {
                if (result.control.includes('摸')) {
                    player.draw(event.overflow);
                    game.log(player, '因溢出摸了', event.overflow, '张牌');
                } else if (result.control.includes('弃')) {
                    player.chooseToDiscard(event.overflow, true, 'he');
                    game.log(player, '因溢出弃了', event.overflow, '张牌');
                } else {
                    // 修改选项数值
                    const allOptions = ["体力值", "手牌上限", "出杀次数", "体力上限"];
                    for (const opt of allOptions) {
                        if (result.control.includes(opt)) {
                            if (!player.storage.chishaoshan_bonus) player.storage.chishaoshan_bonus = {};
                            if (event.isYin) {
                                player.storage.chishaoshan_bonus[opt] = (player.storage.chishaoshan_bonus[opt] || 0) - event.overflow;
                                game.log(player, '令睄睒选项', '#g' + opt, '-' + event.overflow);
                            } else {
                                player.storage.chishaoshan_bonus[opt] = (player.storage.chishaoshan_bonus[opt] || 0) + event.overflow;
                                game.log(player, '令睄睒选项', '#g' + opt, '+' + event.overflow);
                            }
                            player.markSkill("chishaoshan");
                            break;
                        }
                    }
                }
                
                // 切换状态
                player.storage.chishaoshan_times++;
                player.markSkill("chishaoshan");
            }
        },
        removed: {
            charlotte: true,
            onremove: function(player) {
                delete player.storage.chishaoshan_removed;
            },
            sub: true,
            sourceSkill: "chishaoshan",
        },
        handLimit: {
            charlotte: true,
            onremove: true,
            mod: {
                maxHandcard: function(player, num) {
                    return player.storage.chishaoshan_handLimit;
                },
            },
            sub: true,
            sourceSkill: "chishaoshan",
        },
        sha: {
            charlotte: true,
            onremove: true,
            mod: {
                cardUsable: function(card, player, num) {
                    if (card.name == 'sha') return player.storage.chishaoshan_sha;
                },
            },
            sub: true,
            sourceSkill: "chishaoshan",
        },
        clear: {
            trigger: {
                player: "phaseEnd",
            },
            forced: true,
            charlotte: true,
            popup: false,
            content: function() {
                // 回合结束时恢复所有选项
                delete player.storage.chishaoshan_removed;
                
                // 保留有+x或-x的bonus
                // bonus在整个游戏过程中保留，不清除
            },
            sub: true,
            sourceSkill: "chishaoshan",
        },
    },
    mark: true,
    marktext: "☯",
    intro: {
        name: "睄睒",
        content: function(storage, player) {
            if (!player.storage.chishaoshan_bonus) player.storage.chishaoshan_bonus = {};
            
            let str = '<div class="text" style="text-align:left">';
            
            // 显示当前状态（0次为阴，1次为阳，2次为阴...）
            const times = player.storage.chishaoshan_times || 0;
            const isYin = times % 2 == 0; // 偶数次为阴
            str += '<span style="font-weight:bold">当前状态：</span>' + (isYin ? '<span style="color:#2f90b9">阴</span>' : '<span style="color:#ab372f">阳</span>');
            str += '<br><span style="font-weight:bold">交换次数：</span>' + times + '<br><br>';
            
            // 显示已移除选项
            const removed = player.storage.chishaoshan_removed || [];
            if (removed.length > 0) {
                str += '<span style="font-weight:bold">已移除选项：</span>' + removed.join('、') + '<br><br>';
            }
            
            // 显示临时效果
            if (player.storage.chishaoshan_handLimit !== undefined) {
                str += '<span style="font-weight:bold">手牌上限：</span>' + player.storage.chishaoshan_handLimit + '<br>';
            }
            if (player.storage.chishaoshan_sha !== undefined) {
                str += '<span style="font-weight:bold">出杀次数：</span>' + player.storage.chishaoshan_sha + '<br>';
            }
            if (player.storage.chishaoshan_handLimit !== undefined || player.storage.chishaoshan_sha !== undefined) {
                str += '<br>';
            }
            
            // 显示选项加成
            str += '<span style="font-weight:bold">选项加成：</span><br>';
            const allOptions = ["体力值", "手牌上限", "出杀次数", "体力上限"];
            let hasBonus = false;
            for (const key of allOptions) {
                const bonus = player.storage.chishaoshan_bonus[key] || 0;
                if (bonus != 0) {
                    hasBonus = true;
                    str += '　' + key + ': ';
                    if (bonus > 0) str += '<span style="color:green">+' + bonus + '</span>';
                    else str += '<span style="color:red">' + bonus + '</span>';
                    str += '<br>';
                }
            }
            if (!hasBonus) str += '　无<br>';
            
            str += '<br>';
            
            // 显示转换技说明
            str += '<span style="font-weight:bold">转换技效果：</span><br>';
            if (isYin) {
                str += '<span style="color:#2f90b9">【阴】</span>若交换后有数值溢出（令多于上限的部分为X），你选择一项：摸X张牌或令本次未被选择的一项-X。';
            } else {
                str += '<span style="color:#ab372f">【阳】</span>若交换后有数值溢出（令多于上限的部分为X），你选择一项：弃X张牌或令本次未被选择的一项+X。';
            }
            
            str += '</div>';
            
            return str;
        },
    },
},



chisunqi: {
    audio: "ext:剑影:2",
    trigger: {
        player: "gainAfter",
        global: "loseAsyncAfter",
    },
    filter: function(event, player) {
        if (event.getParent().name == "draw" && event.getParent(2).name == "phaseDraw") return false;
        return event.cards && event.cards.length > 0;
    },
    direct: true,
    content: async function(event, trigger, player) {
        'step 0'
        const cards = trigger.cards.filter(card => get.position(card) == "h");
        if (cards.length == 0) {
            event.finish();
            return;
        }
        
        event.cards = cards;
        
        'step 1'
        const {result: chooseResult} = await player.chooseButton(
            ["榫棋：是否将牌置于武将牌上？", event.cards],
            [1, event.cards.length]
        ).set("ai", button => {
            return 6 - get.value(button.link);
        });
        
        if (!chooseResult.bool || !chooseResult.links || chooseResult.links.length == 0) {
            event.finish();
            return;
        }
        
        player.logSkill("chisunqi");
        await player.addToExpansion(chooseResult.links, player, "giveAuto").gaintag.add("chisunqi");
    },
    marktext: "棋",
    intro: {
        content: "expansion",
        markcount: "expansion",
    },
    onremove: function(player, skill) {
        const cards = player.getExpansions(skill);
        if (cards.length) player.loseToDiscardpile(cards);
    },
    group: ["chisunqi_use", "chisunqi_lose"], 
    subSkill:{
        
use: {
    audio: "chisunqi",
    enable: "phaseUse",
    usable: 1,
    filterCard: () => false,
    selectCard: -1,
    content: async function(event, trigger, player) {
        'step 0'
        const cards = player.getExpansions("chisunqi");
        if (cards.length == 0) {
            event.finish();
            return;
        }
        
        const {result: chooseResult} = await player.chooseButton(
            ["榫棋：选择要获得的“棋”", cards],
            [1, cards.length],
            true
        ).set("ai", button => {
            return get.value(button.link);
        });
        
        if (chooseResult.bool && chooseResult.links && chooseResult.links.length > 0) {
            await player.gain(chooseResult.links, "gain2");
        }
    },
    ai: {
        order: 5,
        result: {
            player: 1,
        },
    },
},

// 榫棋 - 回合结束失去体力
lose: {
    audio: "chisunqi",
    trigger: {
        global: "phaseEnd",
    },
    filter: function(event, player) {
        const num = player.getExpansions("chisunqi").length;
        return num > game.countPlayer();
    },
    forced: true,
    content: async function(event, trigger, player) {
        await player.loseHp();
    },
},
    },
},






chifenqing: {
    audio: "ext:剑影:2",
    enable: "phaseUse",
    usable: 1,
    filterTarget: function(card, player, target) {
        return target != player;
    },
    content: async function(event, trigger, player) {
        'step 0'
        const target = event.targets[0];  // 修复：使用 event.targets[0] 而不是 event.target
        
        if (!target || !target.isIn()) {
            event.finish();
            return;
        }
        
        event.target = target;  // 保存到 event.target
        
        // 横置双方
        if (!player.isLinked()) player.link();
        if (!target.isLinked()) target.link();
        
        'step 1'
        // 玩家选择
        const {result: playerResult} = await player.chooseControl("选项一", "选项二", "选项三")
            .set("prompt", "焚情：选择一项")
            .set("choiceList", [
                "令对方受到来自你的一点火属性伤害",
                "令对方翻面",
                "背水：若只有一名角色选择该选项则交换双方效果",
            ])
            .set("ai", () => {
                const player = _status.event.player;
                const target = _status.event.target;
                if (get.damageEffect(target, player, player, "fire") > 0) return 0;
                if (!target.isTurnedOver()) return 1;
                return 2;
            })
            .set("target", event.target);
        
        event.playerChoice = playerResult.control;
        
        'step 2'
        // 目标选择
        const {result: targetResult} = await event.target.chooseControl("选项一", "选项二", "选项三")
            .set("prompt", "焚情：选择一项")
            .set("choiceList", [
                "令对方受到来自你的一点火属性伤害",
                "令对方翻面",
                "背水：若只有一名角色选择该选项则交换双方效果",
            ])
            .set("ai", () => {
                const player = _status.event.player;
                const target = _status.event.target;
                if (get.damageEffect(target, player, player, "fire") > 0) return 0;
                if (!target.isTurnedOver()) return 1;
                return 2;
            })
            .set("target", player);
        
        event.targetChoice = targetResult.control;
        
        'step 3'
        // 判断选择
        const playerChoice = event.playerChoice;
        const targetChoice = event.targetChoice;
        const target1 = event.target;
        
        game.log(player, "选择了", "#g" + playerChoice);
        game.log(target1, "选择了", "#g" + targetChoice);
        
        // 如果选择相同，双方各恢复一点体力
        if (playerChoice == targetChoice) {
            game.log(player, "与", target1, "选择相同，均不执行且各恢复一点体力值");
            player.recover();
            target1.recover();
            event.finish();
            return;
        }
        
        // 检查是否有人选择了"选项三"（背水）
        const playerChooseThree = (playerChoice == "选项三");
        const targetChooseThree = (targetChoice == "选项三");
        
        // 如果只有一人选择背水，交换效果
        if (playerChooseThree && !targetChooseThree) {
            // 交换：玩家的效果由目标执行，目标的效果由玩家执行
            event.finalPlayerChoice = targetChoice;
            event.finalTargetChoice = playerChoice;
            game.log("只有", player, "选择了背水，交换双方效果");
        } else if (!playerChooseThree && targetChooseThree) {
            // 交换：目标的效果由玩家执行，玩家的效果由目标执行
            event.finalPlayerChoice = targetChoice;
            event.finalTargetChoice = playerChoice;
            game.log("只有", target, "选择了背水，交换双方效果");
        } else {
            // 不交换
            event.finalPlayerChoice = playerChoice;
            event.finalTargetChoice = targetChoice;
        }
        
        'step 4'
        // 执行玩家的效果（对目标）
        const choice = event.finalPlayerChoice;
        const target2 = event.target;
        
        if (choice == "选项一") {
            // 令对方受到一点火属性伤害
            target2.damage("fire", player);
        } else if (choice == "选项二") {
            // 令对方翻面
            target2.turnOver();
        }
        // 选项三不执行额外效果
        
        'step 5'
        // 执行目标的效果（对玩家）
        const choice2 = event.finalTargetChoice;
        const target3 = event.target;
        
        if (choice2 == "选项一") {
            // 令对方受到一点火属性伤害
            player.damage("fire", target3);
        } else if (choice2 == "选项二") {
            // 令对方翻面
            player.turnOver();
        }
        // 选项三不执行额外效果
    },
    ai: {
        order: 8,
        result: {
            target: function(player, target) {
                // 对敌方使用
                if (get.attitude(player, target) < 0) return -2;
                return 0;
            },
        },
    },
},
// 修复 chiyuanque
chiyuanque: {
    audio: "ext:剑影:2",
    trigger: {
        source: "damageSource",  // 修复：改为 damageSource
        player: "damageEnd",
    },
    forced: true,
    juexingji: true,
    skillAnimation: true,
    animationColor: "fire",
    init: function(player) {
        if (!player.storage.chiyuanque_damage) {
            player.storage.chiyuanque_damage = 0;
        }
    },
    filter: function(event, player) {
        if (!event.nature) return false;
        if (player.storage.chiyuanque_awakened) return false;
        if (!player.storage.chiyuanque_damage) player.storage.chiyuanque_damage = 0;
        return player.storage.chiyuanque_damage >= 3;
    },
    content: function() {
        "step 0"
        // 标记已觉醒
        player.storage.chiyuanque_awakened = true;
        
        player.awakenSkill("chiyuanque");
        
        // 回复体力至体力上限
        var num = player.maxHp - player.hp;
        if (num > 0) {
            player.recover(num);
        }
        
        "step 1"
        // 失去技能
        player.removeSkill("chifenqing");
        player.removeSkill("chisuhen");
        
        "step 2"
        // 技能池
        var skillPool = ["chijueqing", "chiejue", "chishangshi", "oljianmie", "starliangyan", "starminghui", "qingleng", "huishi"];
        
        // 随机获得两个技能
        var skills = [];
        while (skills.length < 2 && skillPool.length > 0) {
            var index = Math.floor(Math.random() * skillPool.length);
            skills.push(skillPool[index]);
            skillPool.splice(index, 1);
        }
        
        event.skills = skills;
        event.skillIndex = 0;
        
        "step 3"
        // 依次获得技能
        if (event.skillIndex < event.skills.length) {
            var skill = event.skills[event.skillIndex];
            event.skillIndex++;
            player.addSkill(skill);
            game.log(player, "获得了技能", "#g【" + get.translation(skill) + "】");
            event.redo();
        }
        
        "step 4"
        // 如果是回合外，额外获得一个技能
        if (_status.currentPhase != player) {
            var skillPool = ["chijueqing", "chiejue", "chishangshi", "oljianmie", "starliangyan", "starminghui", "qingleng", "huishi"];
            
            // 移除已获得的技能
            var currentSkills = player.getSkills();
            var available = skillPool.filter(function(skill) {
                return !currentSkills.includes(skill);
            });
            
            if (available.length > 0) {
                var index = Math.floor(Math.random() * available.length);
                var skill = available[index];
                player.addSkill(skill);
                game.log(player, "额外获得了技能", "#g【" + get.translation(skill) + "】");
            }
        }
    },
    derivation: ["chijueqing", "chiejue", "chishangshi", "oljianmie", "starliangyan", "starminghui", "qingleng", "huishi"],
    group: ["chiyuanque_count"],
    mark: true,
    marktext: "阙",
    intro: {
        content: function(storage, player) {
            var damage = player.storage.chiyuanque_damage || 0;
            if (player.storage.chiyuanque_awakened) {
                return "已觉醒";
            }
            return "已累计造成/受到<span class='firetext'>" + damage + "</span>点属性伤害（需要3点觉醒）";
        },
    },
    subSkill: {
        count: {
            trigger: {
                source: "damageSource",  // 修复：改为 damageSource
                player: "damageEnd",
            },
            forced: true,
            silent: true,
            popup: false,
            priority: 100,
            filter: function(event, player) {
                // 只在未觉醒时累计
                if (!event.nature) return false;
                if (player.storage.chiyuanque_awakened) return false;
                return true;
            },
            content: function() {
                if (!player.storage.chiyuanque_damage) player.storage.chiyuanque_damage = 0;
                player.storage.chiyuanque_damage += trigger.num;
                
                // 添加日志用于调试
                var type = event.triggername == "damageEnd" ? "受到" : "造成";
                game.log(player, type + "了", "#y" + trigger.num + "点", "属性伤害，累计", "#y" + player.storage.chiyuanque_damage + "点");
                
                player.markSkill("chiyuanque");
            },
            sub: true,
            sourceSkill: "chiyuanque",
        },
    },
},

chisuhen: {
    audio: "ext:剑影:2",
    group: ["chisuhen_damage", "chisuhen_phase"],
    mark: true,
    marktext: "痕",
    intro: {
        content: function(storage, player) {
            var current = _status.currentPhase;
            if (!current) {
                return "当前无回合进行中";
            }
            
            var hasNature = current.storage.chisuhen_nature;
            var currentName = get.translation(current);
            
            if (hasNature) {
                return "当前回合角色<span class='bluetext'>" + currentName + "</span>已受到/造成属性伤害<br><span class='greentext'>回合结束时将触发效果②</span>";
            } else {
                return "当前回合角色<span class='bluetext'>" + currentName + "</span>尚未受到/造成属性伤害<br><span class='firetext'>回合结束时不会触发效果②</span>";
            }
        },
        markcount: function(storage, player) {
            var current = _status.currentPhase;
            if (!current) return 0;
            return current.storage.chisuhen_nature ? 1 : 0;
        },
    },
    subSkill: {
        // 受到/造成属性伤害时触发
        damage: {
            audio: "chisuhen",
            trigger: {
                source: "damageSource",
                player: "damageEnd",
            },
            forced: true,
            filter: function(event, player, name) {
                // 必须是属性伤害
                if (!event.nature) return false;
                
                // 每回合通过夙痕触发焚情只能一次
                if (player.hasSkill("chisuhen_fenqing_used")) return false;
                
                return true;
            },
            content: function() {
                "step 0"
                var triggername = event.triggername;
                
                if (triggername == "damageEnd") {
                    // 受到属性伤害
                    var source = trigger.source;
                    if (source && source.isIn()) {
                        event.target = source;
                        
                        // 重置武将牌
                        if (source.isLinked()) source.link();
                        if (source.isTurnedOver()) source.turnOver();
                        
                        game.log(player, "重置了", source, "的武将牌");
                    } else {
                        event.finish();
                    }
                } else if (triggername == "damageSource") {
                    // 造成属性伤害
                    var target = trigger.player;
                    if (target && target.isIn()) {
                        event.target = target;
                        
                        // 重置武将牌
                        if (player.isLinked()) player.link();
                        if (player.isTurnedOver()) player.turnOver();
                        
                        game.log(player, "重置了自己的武将牌");
                    } else {
                        event.finish();
                    }
                }
                
                "step 1"
                // 视为对目标发动焚情
                if (player != event.target && event.target && event.target.isIn() && player.hasSkill("chifenqing")) {
                    // 添加每回合限一次的标记
                    player.addTempSkill("chisuhen_fenqing_used");
                    
                    player.logSkill("chisuhen", event.target);
                    
                    // 直接调用焚情的效果
                    var next = game.createEvent("chifenqing_from_chisuhen");
                    next.player = player;
                    next.targets = [event.target];
                    next.target = event.target;
                    next.setContent(lib.skill.chifenqing.content);
                    event.next.push(next);
                }
                
                "step 2"
                // 记录当前回合角色受到/造成属性伤害
                var current = _status.currentPhase;
                if (current && current.isIn()) {
                    if (!current.storage.chisuhen_nature) {
                        current.storage.chisuhen_nature = true;
                        current.addTempSkill("chisuhen_mark");
                        game.log(current, "本回合受到/造成了属性伤害");
                        
                        // 更新所有拥有夙痕技能的角色的标记
                        game.countPlayer(function(p) {
                            if (p.hasSkill("chisuhen")) {
                                p.markSkill("chisuhen");
                            }
                        });
                    }
                }
            },
            sub: true,
            sourceSkill: "chisuhen",
        },
        
        // 回合结束时触发
        phase: {
            audio: "chisuhen",
            trigger: {
                global: "phaseEnd",
            },
            forced: true,
            filter: function(event, player) {
                // 当前回合角色受到/造成过属性伤害
                return event.player.storage.chisuhen_nature;
            },
            content: function() {
                "step 0"
                var current = trigger.player;
                
                game.log(player, "观看牌堆顶两张牌");
                
                // 获取牌堆顶两张牌
                var cards = [];
                for (var i = 0; i < 2 && ui.cardPile.childNodes.length > 0; i++) {
                    cards.push(ui.cardPile.childNodes[i]);
                }
                
                if (cards.length == 0) {
                    event.finish();
                    return;
                }
                
                event.cards = cards;
                player.showCards(cards, "夙痕");
                
                "step 1"
                // 选择是否使用其中的牌
                var cards = event.cards;
                
                // 过滤可以使用的牌
                var validCards = cards.filter(function(card) {
                    return player.hasUseTarget(card);
                });
                
                if (validCards.length == 0) {
                    event.finish();
                    return;
                }
                
                player.chooseButton(
                    ["夙痕：是否使用其中的牌？", validCards],
                    [0, validCards.length]
                ).set("filterButton", function(button) {
                    return _status.event.player.hasUseTarget(button.link);
                }).set("ai", function(button) {
                    return _status.event.player.getUseValue(button.link);
                });
                
                "step 2"
                if (result.bool && result.links && result.links.length > 0) {
                    event.toUse = result.links;
                    event.index = 0;
                } else {
                    event.finish();
                }
                
                "step 3"
                // 依次使用选择的牌
                if (event.index < event.toUse.length) {
                    var card = event.toUse[event.index];
                    event.index++;
                    
                    if (player.hasUseTarget(card)) {
                        // 从牌堆顶移除
                        if (ui.cardPile.contains(card)) {
                            ui.cardPile.removeChild(card);
                        }
                        
                        player.chooseUseTarget(card, true, false);
                        event.redo();
                    } else {
                        event.redo();
                    }
                }
            },
            sub: true,
            sourceSkill: "chisuhen",
        },
        
        // 标记：本回合受到/造成过属性伤害
        mark: {
            charlotte: true,
            onremove: function(player) {
                // 回合结束时清除标记，更新所有拥有夙痕技能的角色的显示
                game.countPlayer(function(p) {
                    if (p.hasSkill("chisuhen")) {
                        p.markSkill("chisuhen");
                    }
                });
            },
            sub: true,
            sourceSkill: "chisuhen",
        },
        
        // 标记：本回合已通过夙痕触发焚情
        fenqing_used: {
            charlotte: true,
            sub: true,
            sourceSkill: "chisuhen",
        },
    },
},


// 绝情
chijueqing: {
    audio: "ext:剑影:2",
    trigger: {
        source: "damageBefore",
    },
    forced: true,
    content: async function(event, trigger, player) {
        'step 0'
        const {result} = await player.chooseControl("选项一", "选项二")
            .set("prompt", "绝情：选择一项")
            .set("choiceList", [
                "此次伤害视为失去体力",
                "你失去1点体力，令此伤害值翻倍",
            ])
            .set("ai", () => {
                const player = _status.event.player;
                if (player.hp > 2 && _status.event.damage < 2) return 1;
                return 0;
            })
            .set("damage", trigger.num);
        
        if (result.control == "选项一") {
            trigger.cancel();
            await trigger.player.loseHp(trigger.num);
        } else {
            await player.loseHp();
            trigger.num *= 2;
        }
    },
    ai: {
        effect: {
            player: function(card, player, target) {
                if (get.tag(card, "damage") && player.hp > 2) return [1, 1];
            },
        },
    },
},

// 扼绝
chiejue: {
    audio: "ext:剑影:2",
    trigger: {
        player: "damageBefore",
        source: "damageBefore",
    },
    forced: true,
    filter: function(event, player, name) {
        if (!event.card) return false;
        if (event.card.name != "sha" && event.card.name != "juedou") return false;
        
        if (name == "damageBefore" && event.name == "damage") {
            // 你受到伤害
            const source = event.source;
            if (!source) return false;
            return !source.inRange(player);
        } else {
            // 你造成伤害
            const target = event.player;
            return !player.inRange(target);
        }
    },
    content: function() {
        trigger.num++;
    },
},

// 伤逝
chishangshi: {
    audio: "ext:剑影:2",
    trigger: {
        player: ["damageBegin", "loseHpAfter"],
    },
    filter: function(event, player, name) {
        if (name == "damageBegin") {
            return player.countCards("he") > 0;
        }
        if (name == "loseHpAfter") {
            const X = player.maxHp - player.hp;
            return player.countCards("h") < X;
        }
        return false;
    },
    content: async function(event, trigger, player) {
        'step 0'
        if (event.triggername == "damageBegin") {
            const {result} = await player.chooseToDiscard("he", "伤逝：是否弃置一张牌？")
                .set("ai", card => {
                    return 6 - get.value(card);
                });
        } else {
            const X = player.maxHp - player.hp;
            const num = X - player.countCards("h");
            if (num > 0) {
                await player.draw(num);
            }
        }
    },
},

// 仇戮（共用技能）
// 仇戮（共用技能）
niwochoulu: {
    audio: "ext:剑影:2",
    trigger: {
        global: "damageEnd",
    },
    filter: function(event, player) {
        if (player.hasSkill("niwochoulu_used")) return false;
        if (event.source == player) return false;
        const damageSource = event.source;
        if (!damageSource || damageSource.isDead()) return false;
        return player.inRange(event.player);
    },
    direct: true,
    content: async function(event, trigger, player) {
        'step 0'
        const damageSource = trigger.source;
        
        const {result} = await player.chooseBool(
            get.prompt("niwochoulu", damageSource),
            "对" + get.translation(damageSource) + "使用一张无距离限制的【杀】，此【杀】无视防具"
        ).set("ai", () => {
            const player = _status.event.player;
            const target = _status.event.target;
            return get.effect(target, {name: "sha"}, player, player) > 0;
        }).set("target", damageSource);
        
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("niwochoulu", damageSource);
        player.addTempSkill("niwochoulu_used", {player: "roundStart"});
        event.damageSource = damageSource;
        
        'step 1'
        // 使用 chooseToUse 而不是 chooseUseTarget，这样可以使用手牌或技能转化的杀
        player.addTempSkill("niwochoulu_range");
        player.storage.niwochoulu_target = event.damageSource;
        
        const {result: useResult} = await player.chooseToUse(function(card, player, event) {
            if (get.name(card) != "sha") return false;
            return lib.filter.filterCard.apply(this, arguments);
        }, "仇戮：对" + get.translation(event.damageSource) + "使用一张【杀】（无距离限制，无视防具）").set("targetRequired", true).set("complexSelect", true).set("filterTarget", function(card, player, target) {
            if (target != _status.event.sourcex) return false;
            return lib.filter.targetEnabled.apply(this, arguments);
        }).set("sourcex", event.damageSource);
        
        if (useResult.bool) {
            event.sha = useResult.card;
            player.addTempSkill("niwochoulu_effect");
            player.storage.niwochoulu_effect = event.sha;
            
            // 添加监听伤害事件
            player.addTempSkill("niwochoulu_damage");
        }
        
        player.removeSkill("niwochoulu_range");
        delete player.storage.niwochoulu_target;
    },
    subSkill: {
        used: {
            charlotte: true,
            sub: true,
            sourceSkill: "niwochoulu",
            mark: true,
            marktext: "戮",
            intro: {
                content: "本轮已使用",
            },
        },
        range: {
            mod: {
                targetInRange: function(card, player, target) {
                    if (get.name(card) == "sha" && target == player.storage.niwochoulu_target) {
                        return true;
                    }
                },
            },
            charlotte: true,
            sub: true,
        },
        effect: {
            mod: {
                cardUsable: function(card, player, num) {
                    if (player.storage.niwochoulu_effect && card == player.storage.niwochoulu_effect) {
                        return Infinity;
                    }
                },
            },
            trigger: {
                player: "useCard1",
            },
            forced: true,
            charlotte: true,
            popup: false,
            firstDo: true,
            filter: function(event, player) {
                return event.card == player.storage.niwochoulu_effect;
            },
            content: function() {
                trigger.directHit.addArray(game.players);
            },
            sub: true,
        },
        damage: {
            trigger: {
                source: "damageEnd",
            },
            forced: true,
            charlotte: true,
            popup: false,
            filter: function(event, player) {
                // 检查是否是仇戮的杀造成的伤害
                if (!player.storage.niwochoulu_effect) return false;
                
                // 获取当前事件链，查找是否是由仇戮的杀触发的
                let evt = event.getParent();
                while (evt && evt.name != "useCard") {
                    evt = evt.getParent();
                }
                
                if (evt && evt.card == player.storage.niwochoulu_effect) {
                    return true;
                }
                
                return false;
            },
            content: function() {
                "step 0"
                game.log(player, "的仇戮造成伤害，中止所有结算并结束当前回合");
                
                // 中止所有结算
                const currentPhase = _status.currentPhase;
                if (currentPhase) {
                    // 清空事件队列中的所有事件
                    _status.event.finish();
                    _status.event.untrigger(true);
                    
                    // 结束当前回合
                    const evt = _status.event.getParent("phase");
                    if (evt && evt.name == "phase") {
                        evt.finish();
                    }
                }
            },
            sub: true,
        },
        clear: {
            trigger: {
                player: "useCardAfter",
            },
            forced: true,
            charlotte: true,
            popup: false,
            filter: function(event, player) {
                return event.card == player.storage.niwochoulu_effect;
            },
            content: function() {
                delete player.storage.niwochoulu_effect;
            },
            sub: true,
        },
    },
    group: ["niwochoulu_clear"],
},

 

niwoaojian: {
    audio: "ext:剑影:2",
    trigger: {
        global: "roundStart",
    },
    forced: true,
    content: async function(event, trigger, player) {
        'step 0'
        // 从牌堆获得一张【杀】
        const sha = get.cardPile2(card => card.name == "sha");
        if (sha) {
            await player.gain(sha, "gain2");
        }
        
        'step 1'
        // 从牌堆获得一张武器牌
        const weapon = get.cardPile2(card => get.subtype(card) == "equip1");
        if (weapon) {
            await player.gain(weapon, "gain2");
            event.weaponCard = weapon;
        }
        
        'step 2'
        // 询问是否装备武器
        if (event.weaponCard && player.getCards("h").includes(event.weaponCard)) {
            const {result} = await player.chooseUseTarget(event.weaponCard, "是否装备" + get.translation(event.weaponCard) + "？", false);
        }
    },
    group: ["niwoaojian_jianwei","niwoaojian_damage", "niwoaojian_draw", "niwoaojian_fengyin"],
    subSkill: {
        // 剑威 - 作为骜剑的子技能
        jianwei: {
            audio: "niwoaojian",
            enable: ["chooseToUse", "chooseToRespond"],
            hiddenCard: function(player, name) {
                return name == "sha" && player.countCards("he", card => {
                    return card.name == "sha" || get.type(card) == "equip";
                }) > 0;
            },
            filter: function(event, player) {
                if (!player.countCards("he", card => {
                    return card.name == "sha" || get.type(card) == "equip";
                })) return false;
                
                return event.filterCard(get.autoViewAs({name: "sha"}, "unsure"), player, event) || 
                    lib.inpile_nature.some(nature => event.filterCard(get.autoViewAs({name: "sha", nature}, "unsure"), player, event));
            },
            chooseButton: {
                dialog: function(event, player) {
                    const list = [];
                    if (event.filterCard(get.autoViewAs({name: "sha"}, "unsure"), player, event)) {
                        list.push(["基本", "", "sha"]);
                    }
                    for (const nature of lib.inpile_nature) {
                        if (event.filterCard(get.autoViewAs({name: "sha", nature: nature}, "unsure"), player, event)) {
                            list.push(["基本", "", "sha", nature]);
                        }
                    }
                    return ui.create.dialog("剑威", [list, "vcard"]);
                },
                check: function(button) {
                    const player = _status.event.player;
                    const card = {name: button.link[2], nature: button.link[3]};
                    return player.getUseValue(card);
                },
                backup: function(links, player) {
                    return {
                        audio: "niwoaojian",
                        filterCard: function(card) {
                            return card.name == "sha" || get.type(card) == "equip";
                        },
                        position: "he",
                        selectCard: 1,
                        popname: true,
                        check: function(card) {
                            return 7 - get.value(card);
                        },
                        viewAs: {name: links[0][2], nature: links[0][3]},
                    };
                },
                prompt: function(links, player) {
                    const nature = links[0][3];
                    return "将一张【杀】或装备牌当作" + (nature ? get.translation(nature) : "") + "【杀】" + (_status.event.name == "chooseToUse" ? "使用" : "打出");
                },
            },
            ai: {
                respondSha: true,
                order: 3,
                result: {
                    player: 1,
                },
            },
            sub: true,
            sourceSkill: "niwoaojian",
        },
        backup: {
            sub: true,
            sourceSkill: "niwoaojian",
        },
        // 伤害增加
        damage: {
            audio: "niwoaojian",
            trigger: {
                player: "useCard",
            },
            forced: true,
            filter: function(event, player) {
                if (event.card.name != "sha") return false;
                return event.targets && event.targets.some(target => {
                    return target.countCards("e") <= player.countCards("e");
                });
            },
            content: function() {
                const range = player.getAttackRange();
                trigger.baseDamage += 1;
                game.log(trigger.card, "伤害+" + 1);
            },
            sub: true,
            sourceSkill: "niwoaojian",
        },
        // 摸牌
        draw: {
            audio: "niwoaojian",
            trigger: {
                player: "useCardAfter",
            },
            forced: true,
            filter: function(event, player) {
                if (event.card.name != "sha") return false;
                return event.cards && event.cards.some(card => get.position(card) == "d");
            },
            content: function() {
                const range = player.getAttackRange();
                if (range > 0) {
                    player.draw(range);
                }
            },
            sub: true,
            sourceSkill: "niwoaojian",
        },
        // 封印技能
        fengyin: {
            audio: "niwoaojian",
            trigger: {
                player: "useCardAfter",
            },
            forced: true,
            filter: function(event, player) {
                return event.card.name == "sha" && event.cards && event.cards.length > 0;
            },
            content: function() {
                const suit = get.suit(trigger.cards[0]);
                const targets = game.filterPlayer(current => {
                    if (current == player) return false;
                    const cards = current.getCards("hej");
                    return !cards.some(card => get.suit(card) == suit);
                });
                
                if (targets.length > 0) {
                    game.log(targets, "的技能被封印直到回合结束");
                    for (const target of targets) {
                        target.addTempSkill("fengyin", {global: "phaseAfter"});
                    }
                }
            },
            sub: true,
            sourceSkill: "niwoaojian",
        },
    },
},

// 逆徐庶 - 肃尘
niwosuchen: {
    audio: "ext:剑影:2",
    trigger: {
        target: "useCardToTargeted",
    },
    filter: function(event, player) {
        if (player.hasSkill("niwosuchen_used")) return false;
        if (event.player == player) return false;
        const card = event.card;
        if (card.name != "sha" && get.type(card) != "trick") return false;
        return player.countCards("h", {name: "sha"}) > 0;
    },
    direct: true,
    content: async function(event, trigger, player) {
        'step 0'
        const {result} = await player.chooseToDiscard(
            "h",
            {name: "sha"},
            get.prompt("niwosuchen"),
            "弃置一张【杀】，令" + get.translation(trigger.card) + "目标转移给使用者"
        ).set("ai", card => {
            const player = _status.event.player;
            const source = _status.event.source;
            if (get.effect(source, _status.event.card, source, player) > 0) {
                return 7 - get.value(card);
            }
            return 0;
        }).set("source", trigger.player).set("card", trigger.card);
        
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("niwosuchen", trigger.player);
        player.addTempSkill("niwosuchen_used", {player: "roundStart"});
        
        'step 1'
        // 转移目标
        trigger.targets.remove(player);
        trigger.targets.push(trigger.player);
        game.log(trigger.card, "的目标转移给了", trigger.player);
        
        'step 2'
        // 若体力值不大于其，造成1点雷属性伤害
        if (player.hp <= trigger.player.hp) {
            const {result} = await player.chooseBool(
                "肃尘：是否对" + get.translation(trigger.player) + "造成1点雷属性伤害？"
            ).set("ai", () => {
                const player = _status.event.player;
                const target = _status.event.target;
                return get.damageEffect(target, player, player, "thunder") > 0;
            }).set("target", trigger.player);
            
            if (result.bool) {
                await trigger.player.damage(player, "thunder");
            }
        }
    },
    subSkill: {
        used: {
            charlotte: true,
            sub: true,
            sourceSkill: "niwosuchen",
            mark:true,
            marktext:"肃",
            intro:{
                content:"本轮已使用",
            },
        },
    },
},

// 逆徐氏 - 掩锍
niwoyanliu: {
    audio: "ext:剑影:2",
    trigger: {
       source: "damageBefore",
    },
    forced: true,
    filter: function(event, player) {
        if (!event.card) return false;
        if (!get.tag(event.card, "damage")) return false;
         if (!event.targets || event.targets.length != 1) return false;
        return player.countCards("e", {type: "equip", subtype: "equip1"}) > 0;
    },
    content: async function(event, trigger, player) {
        'step 0'
        const target = trigger.player;
        
        const {result} = await target.chooseToRespond(
            {name: "sha"},
            "掩锍：打出一张【杀】，否则此伤害+1"
        ).set("ai", card => {
            return 8;
        });
        
        if (!result.bool) {
            trigger.num++;
        }
    },
},

// 逆徐氏 - 飨名
niwoxiangming: {
    audio: "ext:剑影:2",
    trigger: {
        global: "roundStart",
    },
    direct: true,
    content: async function(event, trigger, player) {
        'step 0'
        const {result} = await player.chooseBool(get.prompt("niwoxiangming"))
            .set("ai", () => true);
        
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("niwoxiangming");
        
        'step 1'
        const num = player.hp;
        const topCards = [];
        const bottomCards = [];
        
        // 牌堆顶
        for (let i = 0; i < num && ui.cardPile.childNodes.length > 0; i++) {
            topCards.push(ui.cardPile.childNodes[i]);
        }
        
        // 牌堆底
        for (let i = 0; i < num && ui.cardPile.childNodes.length > 0; i++) {
            bottomCards.push(ui.cardPile.childNodes[ui.cardPile.childNodes.length - 1 - i]);
        }
        
        event.cards = topCards.concat(bottomCards);
        player.showCards(event.cards, "飨名");
        
        'step 2'
        // 获得伤害类卡牌和武器牌
        const toGain = event.cards.filter(card => {
            return get.tag(card, "damage") || (get.type(card) == "equip" && get.subtype(card) == "equip1");
        });
        
        if (toGain.length > 0) {
            const {result} = await player.chooseButton(
                ["飨名：选择要获得的牌", toGain],
                [0, toGain.length],
                true
            ).set("ai", button => {
                const player = _status.event.player;
                const card = button.link;
                if (get.subtype(card) == "equip1") {
                    return player.isEmpty("e", "equip1") ? 10 : 5;
                }
                return get.value(card);
            });
            
            if (result.bool && result.links && result.links.length > 0) {
                await player.gain(result.links, "gain2");
                
                // 选择是否装备武器
                const weapons = result.links.filter(card => get.subtype(card) == "equip1");
                if (weapons.length > 0) {
                    for (const weapon of weapons) {
                        const {result: equipResult} = await player.chooseBool(
                            "是否装备" + get.translation(weapon) + "？"
                        ).set("ai", () => {
                            return player.isEmpty("e", "equip1");
                        });
                        
                        if (equipResult.bool) {
                            await player.equip(weapon);
                        }
                    }
                }
                
                event.cards.removeArray(result.links);
            }
        }
        
        'step 3'
        // 将其余的牌以任意顺序置于牌堆顶或牌堆底
        if (event.cards.length > 0) {
            const {result} = await player.chooseToMove(
                "飨名：将这些牌以任意顺序放置于牌堆顶或底",
                true
            ).set("list", [
                ["牌堆顶", []],
                ["牌堆底", []],
                ["剩余的牌", event.cards],
            ]).set("processAI", list => {
                return {
                    list: [list[2], [], []],
                    moved: [0, 0, 0],
                };
            });
            
// 在第 9689-9701 行处修改
if (result.bool) {
    const top = result.moved[0] || [];
    const bottom = result.moved[1] || [];
    
    // 确保 top 是数组
    if (Array.isArray(top) && top.length > 0) {
        top.reverse();
        for (const card of top) {
            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
        }
    }
    
    // 确保 bottom 是数组
    if (Array.isArray(bottom) && bottom.length > 0) {
        for (const card of bottom) {
            ui.cardPile.appendChild(card);
        }
    }
}

        }
    },
},


niwoxuejiu: {
    audio: "ext:剑影:2",
    trigger: {
        global: ["gameStart", "cardsDiscardAfter"],
        player: ["damageEnd", "damageSource"],
    },
    forced: true,
    filter: function(event, player, name) {
        if (name == "gameStart") return true;
        if (name == "damageEnd" || name == "damageSource") {
            // 确保有目标或来源
            if (name == "damageEnd") return event.source && event.source.isIn();
            if (name == "damageSource") return event.player && event.player.isIn();
            return false;
        }
        if (name == "cardsDiscardAfter") {
            if (!event.cards || event.cards.length == 0) return false;
            
            const current = _status.currentPhase;
            if (!current) return false;
            
            const lie = current.getExpansions("niwoxuejiu");
            if (lie.length == 0) return false;
            
            const lieSuit = get.suit(lie[0]);
            
            // 检查是否首次进入弃牌堆
            const card = event.cards[0];
            const cardSuit = get.suit(card);
            
            if (cardSuit == lieSuit && !player.hasSkill("niwoxuejiu_suit_" + cardSuit)) {
                return true;
            }
            
            // 检查是否与全场"裂"同名
            const allLie = [];
            game.filterPlayer(target => {
                allLie.push(...target.getExpansions("niwoxuejiu"));
            });
            
            const cardName = card.name;
            if (allLie.some(c => c.name == cardName)) {
                return true;
            }
            
            return false;
        }
        return false;
    },
    content: function() {
        "step 0"
        if (event.triggername == "gameStart") {
            // 所有玩家依次将牌堆底的一张牌明置置于其武将牌
            event.targets = game.players.slice();
            event.targetIndex = 0;
        } else if (event.triggername == "cardsDiscardAfter") {
            // 摸两张牌
            player.draw(2);
            
            const card = trigger.cards[0];
            const cardSuit = get.suit(card);
            player.addTempSkill("niwoxuejiu_suit_" + cardSuit);
            
            event.finish();
        } else {
            // damageEnd 或 damageSource
            event.goto(2);
        }
        
        "step 1"
        // gameStart 的处理
        if (event.targetIndex < event.targets.length) {
            const target = event.targets[event.targetIndex];
            if (ui.cardPile.childNodes.length > 0) {
                const card = ui.cardPile.childNodes[ui.cardPile.childNodes.length - 1];
                target.addToExpansion([card], "gain2").gaintag.add("niwoxuejiu");
            }
            event.targetIndex++;
            event.redo();
        }
        
        "step 2"
        // 造成或受到伤害后 - 新增"裂"
        let target;
        if (event.triggername == "damageEnd") {
            // 受到伤害，目标是伤害来源
            target = trigger.source;
        } else if (event.triggername == "damageSource") {
            // 造成伤害，目标是受伤角色
            target = trigger.player;
        }
        
        if (!target || !target.isIn()) {
            event.finish();
            return;
        }
        
        if (ui.cardPile.childNodes.length > 0) {
            const card = ui.cardPile.childNodes[ui.cardPile.childNodes.length - 1];
            target.addToExpansion([card], "gain2").gaintag.add("niwoxuejiu");
            game.log(target, "获得了一张", "#y裂");
        }
    },
    marktext: "裂",
    intro: {
        content: "expansion",
        markcount: "expansion",
    },
},

niwoshulie: {
    audio: "ext:剑影:2",
    enable: ["chooseToUse", "chooseToRespond"],
    usable: 1,
    filter: function(event, player) {
        // 检查是否有"裂"
        let hasLie = false;
        game.filterPlayer(target => {
            if (target.getExpansions("niwoxuejiu").length > 0) {
                hasLie = true;
            }
        });
        return hasLie;
    },
    chooseButton: {
        dialog: function(event, player) {
            const list = [];
            
            game.filterPlayer(target => {
                const lie = target.getExpansions("niwoxuejiu");
                for (const card of lie) {
                    const color = get.color(card);
                    if (color == "red") {
                        list.push([target, "红色裂", "sha", card]);
                    } else if (color == "black") {
                        list.push([target, "黑色裂", "wuxie", card]);
                    }
                }
            });
            
            return ui.create.dialog("疏裂", [list, "vcard"]);
        },
        filter: function(button, player) {
            const event = _status.event.getParent();
            const card = button.link[3];
            const name = button.link[2];
            return event.filterCard({name: name}, player, event);
        },
        check: function(button) {
            const player = _status.event.player;
            const name = button.link[2];
            return player.getUseValue({name: name});
        },
        backup: function(links, player) {
            const target = links[0][0];
            const card = links[0][3];
            const name = links[0][2];
            
            return {
                filterCard: () => false,
                selectCard: -1,
                viewAs: {name: name},
                target: target,
                card: card,
                precontent: function() {
                    delete event.result.skill;
                    
                    const target = lib.skill.niwoshulie_backup.target;
                    const card = lib.skill.niwoshulie_backup.card;
                    
                    // 弃置原"裂"
                    player.loseToDiscardpile(card);
                    game.log(player, "弃置了", target, "的一张", "#y裂");
                    
                    "step 0"
                    // 造成雷属性伤害
                    target.damage(player, "thunder");
                    
                    "step 1"
                    // 若该角色为你，获得场上所有"裂"
                    if (target == player) {
                        const allLie = [];
                        game.filterPlayer(current => {
                            allLie.push(...current.getExpansions("niwoxuejiu"));
                        });
                        
                        if (allLie.length > 0) {
                            player.gain(allLie, "gain2");
                            game.log(player, "获得了场上所有", "#y裂");
                        }
                    }
                },
            };
        },
        prompt: function(links, player) {
            const target = links[0][0];
            const name = links[0][2];
            return "将" + get.translation(target) + "的一张裂当做" + get.translation(name) + "使用或打出";
        },
    },
    ai: {
        order: 1,
        result: {
            player: 1,
        },
        respondSha: true,
        respondShan: true,
        skillTagFilter: function(player) {
            let hasLie = false;
            game.filterPlayer(target => {
                if (target.getExpansions("niwoxuejiu").length > 0) {
                    hasLie = true;
                }
            });
            return hasLie;
        },
    },
},


niwoxiapo: {
    audio: "ext:剑影:2",
    trigger: {
        player: "useCard",
        global: ["respondAfter", "useCardAfter"],
    },
    forced: true,
    filter: function(event, player, name) {
        if (name == "useCard" && event.player == player) {
            return event.targets && event.targets.length > 0;
        }
        if (name == "respondAfter") {
            // 检查是否是响应牌的情况
            if (!event.respondTo) return false;
            
            if (event.player == player) {
                // 你响应其他角色
                return event.respondTo[0] && event.respondTo[0] != player;
            } else {
                // 其他角色响应你
                return event.respondTo[0] == player;
            }
        }
        if (name == "useCardAfter") {
            // 检查是否有角色响应了你的牌
            if (event.player != player) return false;
            if (!event.respondTo || event.respondTo.length == 0) return false;
            
            // 检查是否有响应
            const responded = event.getParent().responded;
            return responded && responded.length > 0;
        }
        return false;
    },
    content: async function(event, trigger, player) {
        if (event.triggername == "useCard") {
            // 所有目标横置
            for (const target of trigger.targets) {
                if (!target.isLinked()) {
                    await target.link();
                }
            }
        } else if (event.triggername == "respondAfter") {
            // 重置
            if (trigger.player == player) {
                // 你重置
                if (player.isLinked()) {
                    await player.link();
                }
            } else {
                // 其他角色重置
                if (trigger.player.isLinked()) {
                    await trigger.player.link();
                }
            }
        }
    },
},


niwoshucai: {
    audio: "ext:剑影:2",
    enable: ["chooseToUse", "chooseToRespond"],
    filter: function(event, player) {
        if (player.countCards("h") == 0) return false;
        
        const suits = [];
        player.getCards("h").forEach(card => {
            const suit = get.suit(card);
            if (suit && !suits.includes(suit)) suits.push(suit);
        });
        
        for (const suit of suits) {
            if (player.hasSkill("niwoshucai_" + suit)) continue;
            return true;
        }
        
        return false;
    },
    chooseButton: {
        dialog: function(event, player) {
            const list = [["殊彩", "", "shan"], ["殊彩", "", "sha"],["殊彩", "", "leisha"],["殊彩", "", "huosha"],["殊彩", "", "icesha"]];
            return ui.create.dialog("殊彩", [list, "vcard"]);
        },
        filter: function(button, player) {
            const event = _status.event.getParent();
            return event.filterCard({name: button.link[2]}, player, event);
        },
        check: function(button) {
            const player = _status.event.player;
            return player.getUseValue({name: button.link[2]});
        },
        backup: function(links, player) {
            return {
                filterCard: function(card, player) {
                    // 只在precontent中选择花色后才会用到这个
                    if (!lib.skill.niwoshucai_backup.selectedSuit) return false;
                    return get.suit(card) == lib.skill.niwoshucai_backup.selectedSuit;
                },
                selectCard: -1,
                viewAs: {name: links[0][2], nature: links[0][2] == "huosha" ? "fire" : (links[0][2] == "leisha" ? "thunder" : (links[0][2] == "icesha" ? "ice" : null))},
                precontent: function() {
                    delete event.result.skill;
                    
                    "step 0"
                    // 展示所有手牌
                    player.showHandcards();
                    
                    // 获取可选花色
                    const currentHandCards = player.getCards("h");
                    const suits = [];
                    currentHandCards.forEach(card => {
                        const suit = get.suit(card);
                        if (suit && !suits.includes(suit) && !player.hasSkill("niwoshucai_" + suit)) {
                            suits.push(suit);
                        }
                    });
                    
                    event.suits = suits;
                    event.currentHandCards = currentHandCards;
                    
                    // 选择花色
                    player.chooseControl(suits).set("prompt", "殊彩：选择要弃置的花色").set("ai", () => {
                        return suits[0];
                    });
                    
                    "step 1"
                    if (!result || !result.control) {
                        event.finish();
                        return;
                    }
                    
                    const suit = result.control;
                    player.addTempSkill("niwoshucai_" + suit, {player: "roundStart"});
                    
                    // 弃置选中花色的所有牌
                    const toDiscard = event.currentHandCards.filter(card => get.suit(card) == suit);
                    
                    if (toDiscard.length > 0) {
                        player.discard(toDiscard);
                        game.log(player, "弃置了", toDiscard.length, "张", "#y" + get.translation(suit) + "牌");
                    }
                    
                    "step 2"
                    // 检查手牌数是否为全场最低
                    const handNum = player.countCards("h");
                    let isLowest = true;
                    
                    for (const target of game.players) {
                        if (target != player && target.countCards("h") < handNum) {
                            isLowest = false;
                            break;
                        }
                    }
                    
                    if (isLowest) {
                        // 获得牌堆底的两张牌
                        const cards = [];
                        for (let i = 0; i < 2; i++) {
                            if (ui.cardPile.childNodes.length > 0) {
                                cards.push(ui.cardPile.childNodes[ui.cardPile.childNodes.length - 1]);
                            }
                        }
                        if (cards.length > 0) {
                            player.gain(cards, "gain2");
                            game.log(player, "获得了牌堆底的", cards.length, "张牌");
                        }
                    }
                },
            };
        },
        prompt: function(links, player) {
            return "展示所有手牌，弃置一种花色的所有牌，视为使用" + get.translation(links[0][2]);
        },
    },
    ai: {
        order: function() {
            return get.order({name: "sha"}) + 0.1;
        },
        result: {
            player: 1,
        },
        respondShan: true,
        respondSha: true,
        skillTagFilter: function(player, tag) {
            if (player.countCards("h") == 0) return false;
            const suits = [];
            player.getCards("h").forEach(card => {
                const suit = get.suit(card);
                if (suit && !suits.includes(suit) && !player.hasSkill("niwoshucai_" + suit)) {
                    suits.push(suit);
                }
            });
            return suits.length > 0;
        },
    },
},





// 逆王异 - 殊彩
niwoshucai: {
    audio: "ext:剑影:2",
    enable: ["chooseToUse", "chooseToRespond"],
    filter: function(event, player) {
        if (player.countCards("h") == 0) return false;
        
        const suits = [];
        player.getCards("h").forEach(card => {
            const suit = get.suit(card);
            if (suit && !suits.includes(suit)) suits.push(suit);
        });
        
        for (const suit of suits) {
            if (player.hasSkill("niwoshucai_" + suit)) continue;
            return true;
        }
        
        return false;
    },
    chooseButton: {
        dialog: function(event, player) {
            const list = [["殊彩", "", "shan"], ["殊彩", "", "sha"],["殊彩", "", "leisha"],["殊彩", "", "huosha"],["殊彩", "", "icesha"]];
            return ui.create.dialog("殊彩", [list, "vcard"]);
        },
        filter: function(button, player) {
            const event = _status.event.getParent();
            return event.filterCard({name: button.link[2]}, player, event);
        },
        check: function(button) {
            const player = _status.event.player;
            return player.getUseValue({name: button.link[2]});
        },
        backup: function(links, player) {
            return {
                filterCard: true,
                selectCard: -1,
                viewAs: {name: links[0][2], nature: links[0][2] == "sha" ? "fire" : null},
                precontent: function() {
                    delete event.result.skill;
                    
                    "step 0"
                    // 展示所有手牌
                    player.showHandcards();
                    
                    // 获取可选花色
                    const currentHandCards = player.getCards("h");
                    const suits = [];
                    currentHandCards.forEach(card => {
                        const suit = get.suit(card);
                        if (suit && !suits.includes(suit) && !player.hasSkill("niwoshucai_" + suit)) {
                            suits.push(suit);
                        }
                    });
                    
                    event.suits = suits;
                    event.currentHandCards = currentHandCards;
                    
                    // 选择花色
                    player.chooseControl(suits).set("prompt", "殊彩：选择要弃置的花色").set("ai", () => {
                        return suits[0];
                    });
                    
                    "step 1"
                    if (!result || !result.control) {
                        event.finish();
                        return;
                    }
                    
                    const suit = result.control;
                    player.addTempSkill("niwoshucai_" + suit, {player: "roundStart"});
                    
                    // 弃置选中花色的所有牌
                    const toDiscard = event.currentHandCards.filter(card => get.suit(card) == suit);
                    
                    if (toDiscard.length > 0) {
                        player.discard(toDiscard);
                        game.log(player, "弃置了", toDiscard.length, "张", "#y" + get.translation(suit) + "牌");
                    }
                    
                    "step 2"
                    // 检查手牌数是否为全场最低
                    const handNum = player.countCards("h");
                    let isLowest = true;
                    game.filterPlayer(current => {
                        if (current != player && current.countCards("h") < handNum) {
                            isLowest = false;
                        }
                    });
                    
                    if (isLowest) {
                        // 获得牌堆底的两张牌
                        const cards = [];
                        const pileLength = ui.cardPile.childNodes.length;
                        
                        // 从后往前取两张牌
                        for (let i = 0; i < 2 && i < pileLength; i++) {
                            const card = ui.cardPile.childNodes[pileLength - 1 - i];
                            if (card) cards.push(card);
                        }
                        
                        if (cards.length > 0) {
                            player.gain(cards, "draw");
                            game.log(player, "从牌堆底获得了", cards.length, "张牌");
                        }
                    }
                },
            };
        },
        prompt: function(links, player) {
            return "展示所有手牌，弃置一种花色的所有牌，视为使用【" + get.translation(links[0][2]) + "】";
        },
    },
    ai: {
        order: 8,
        result: {
            player: 1,
        },
        respondShan: true,
        respondSha: true,
    },
    subSkill: {
        backup: {
            sub: true,
            sourceSkill: "niwoshucai",
        },
    },
},


// 逆韩龙 - 铮途
niwozhengtu: {
    audio: "ext:剑影:2",
    mod: {
        globalFrom: function(from, to, distance) {
            if (to == from.next || to == from.previous) {
                return distance - Infinity;
            }
            return distance + Infinity;
        },
        globalTo: function(from, to, distance) {
            if (from == to.next || from == to.previous) {
                return distance - Infinity;
            }
            return distance + Infinity;
        },
        cardEnabled2: function(card, player) {
            if (get.type(card) == "equip") {
                return true;
            }
        },
    },
    enable: "chooseToUse",
    filter: function(event, player) {
        return player.hasCard(card => get.type(card) == "equip", "he");
    },
    chooseButton: {
        dialog: function(event, player) {
            const list = [];
            // 添加所有基本牌
            for (const name of lib.inpile) {
                if (get.type(name) == "basic") {
                    list.push(["基本", "", name]);
                }
            }
            return ui.create.dialog("铮途", [list, "vcard"]);
        },
        filter: function(button, player) {
            return _status.event.getParent().filterCard({name: button.link[2]}, player, _status.event.getParent());
        },
        check: function(button) {
            const player = _status.event.player;
            if (player.countCards("h", {name: button.link[2]})) return 0;
            return _status.event.getParent().type == "phase" ? player.getUseValue({name: button.link[2]}) : 1;
        },
        backup: function(links, player) {
            return {
                filterCard: card => get.type(card) == "equip",
                selectCard: 1,
                popname: true,
                check: function(card) {
                    return 7 - get.value(card);
                },
                position: "h",
                viewAs: {name: links[0][2]},
                precontent: function() {
                    player.logSkill("niwozhengtu");
                    const suit = get.suit(event.result.cards[0]);
                    const current = _status.currentPhase;
                    
                    if (current) {
                        current.addTempSkill("niwozhengtu_ban", {player: "phaseAfter"});
                        if (!current.storage.niwozhengtu_ban) current.storage.niwozhengtu_ban = [];
                        current.storage.niwozhengtu_ban.push(suit);
                        current.markSkill("niwozhengtu_ban");
                    }
                },
            };
        },
        prompt: function(links, player) {
            return "将一张装备牌当作" + get.translation(links[0][2]) + "使用";
        },
    },
    ai: {
        order: function() {
            const player = _status.event.player;
            const event = _status.event;
            if (event.type == "phase") {
                // 出牌阶段，根据情况调整优先级
                return 3;
            }
            return 10;
        },
        result: {
            player: 1,
        },
        respondSha: true,
        respondShan: true,
        skillTagFilter: function(player) {
            return player.hasCard(card => get.type(card) == "equip", "h");
        },
    },
    subSkill: {
        ban: {
            charlotte: true,
            mark: true,
            intro: {
                content: function(storage) {
                    if (!storage || storage.length == 0) return "无限制";
                    return "无法使用、打出或弃置" + storage.map(s => get.translation(s)).join("、") + "的牌";
                },
            },
            mod: {
                cardEnabled: function(card, player) {
                    if (player.storage.niwozhengtu_ban && player.storage.niwozhengtu_ban.includes(get.suit(card))) {
                        return false;
                    }
                },
                cardRespondable: function(card, player) {
                    if (player.storage.niwozhengtu_ban && player.storage.niwozhengtu_ban.includes(get.suit(card))) {
                        return false;
                    }
                },
                cardDiscardable: function(card, player) {
                    if (player.storage.niwozhengtu_ban && player.storage.niwozhengtu_ban.includes(get.suit(card))) {
                        return false;
                    }
                },
            },
            onremove: function(player) {
                delete player.storage.niwozhengtu_ban;
            },
            sub: true,
            sourceSkill: "niwozhengtu",
        },
        backup: {
            sub: true,
            sourceSkill: "niwozhengtu",
        },
    },
},

niwonilin: {
    audio: "ext:无名杀技能:2",
    trigger: {
        player: "damageEnd",
    },
    enable:"phaseUse",
    filter: function(event, player) {
        // 每轮限一次
        return !player.hasSkill('niwonilin_used');
    },
    check: function(event, player) {
        if (event.name == "damage") return true;
        // 出牌阶段，摸牌数>=3时发动
        var num = Math.min((player.storage.niwonilin_count || 0) + 1, game.players.length);
        return num >= 3;
    },
    content: function() {
        "step 0"
        // 标记本轮已使用
        player.addTempSkill('niwonilin_used', {player: 'roundStart'});
        
        // 记录并标记发动次数
        if (!player.storage.niwonilin_count) {
            player.storage.niwonilin_count = 0;
        }
        player.storage.niwonilin_count++;
        player.markSkill('niwonilin');
        
        // 计算摸牌数
        var num = Math.min(player.storage.niwonilin_count, game.players.length);
        player.draw(num);
        
        "step 1"
        // 对自己使用调虎离山
        var card = game.createCard('diaohulishan', '', '');
        player.storage.niwonilin_using = true;
        player.useCard(card, player, false);
    },
intro: {
    markcount: function(storage, player) {
        return player.storage.niwonilin_count || 0;
    },
    content: function(storage, player) {
        var str = '已发动' + (player.storage.niwonilin_count || 0) + '次';
        if (player.hasSkill("niwonilin_used")) {
            str += '<br>本轮已发动';
        } else {
            str += '<br>本轮未发动';
        }
        return str;
    },
},
    group: ['niwonilin_record', 'niwonilin_equip'],
    subSkill: {
        used: {charlotte: true},
        record: {
            trigger: {
                global: 'cardsDiscardAfter',
            },
            forced: true,
            popup: false,
            silent: true,
            filter: function(event, player) {
                return event.cards && event.cards.some(card => get.type(card) == 'equip');
            },
            content: function() {
                if (!_status.niwonilin_roundEquips) {
                    _status.niwonilin_roundEquips = [];
                }
                for (var card of trigger.cards) {
                    if (get.type(card) == 'equip' && get.position(card) == 'd') {
                        _status.niwonilin_roundEquips.add(card);
                    }
                }
            },
        },
        equip: {
            trigger: {
                global: 'phaseEnd',
            },
            forced: true,
            filter: function(event, player) {
                return player.storage.niwonilin_using == true;
            },
            content: function() {
                "step 0"
                delete player.storage.niwonilin_using;
                
                // 获取本回合进入弃牌堆的装备牌
                var equips = (_status.niwonilin_roundEquips || []).filter(card => {
                    return get.position(card) == 'd';
                });
                
                if (equips.length == 0) {
                    event.finish();
                    return;
                }
                
                // 获取空置装备栏
                var emptySlots = [];
                for (var i = 1; i <= 5; i++) {
                    if (!player.getEquip(i)) {
                        emptySlots.push(i);
                    }
                }
                
                if (emptySlots.length == 0) {
                    event.finish();
                    return;
                }
                
                // 筛选可以装备的牌
                var canEquip = equips.filter(card => {
                    var subtype = get.subtype(card);
                    return subtype && !player.getEquip(subtype);
                });
                
                if (canEquip.length == 0) {
                    event.finish();
                    return;
                }
                
                // 随机选择一张装备置入装备区
                var card = canEquip.randomGet();
                player.equip(card);
                game.log(player, '将', card, '置入装备区');
                
                "step 1"
                // 清空本回合装备记录
                delete _status.niwonilin_roundEquips;
            },
        },
    },
},
niwoxungu: {
    audio: "ext:剑影:2",
    trigger: {
        global: "roundStart",
    },
    forced:true,
    filter: function(event, player) {
        return player.getExpansions("niwoxungu").length <= game.countPlayer();
    },
    content: function() {
        "step 0"
        // 初始化判定记录
        event.judgeCards = [];
        event.seenSuits = [];
        
        "step 1"
        // 进行判定
        player.judge(function(card){
            return 0; // 纯展示
        });
        
        "step 2"
        // 检查判定结果
        if (!result || !result.card) {
            event.finish();
            return;
        }
        
        var card = result.card;
        event.judgeCards.push(card);
        
        var suit = get.suit(card);
        
        // 【关键修复】判断花色是否重复
        if (event.seenSuits.includes(suit)) {
            // 花色重复了，停止判定，进入结算阶段
            game.log(player, '判定出了重复花色', suit, '，停止判定');
            event.goto(3);
        } else {
            // 花色首次出现，记录并继续判定
            event.seenSuits.push(suit);
            game.log(player, '判定了:', card, '，当前出现过的花色:', event.seenSuits);
            event.goto(1); // 继续判定
        }
        
        "step 3"
        // 结算获得牌
        var cardsToGain = [];
        var nameCounts = {};
        
        for (var i = 0; i < event.judgeCards.length; i++) {
            var c = event.judgeCards[i];
            if (!c) continue; // 防御性编程
            
            var name = c.name;
            
            if (!nameCounts[name]) nameCounts[name] = 0;
            nameCounts[name]++;
            
            var shouldGain = false;
            
            // 条件A：装备牌
            if (get.type(c) == 'equip') shouldGain = true;
            // 条件B：第二次出现的同名牌
            else if (nameCounts[name] >= 2) shouldGain = true;
            
            if (shouldGain) {
                cardsToGain.push(c);
            }
        }
        
        // 过滤有效牌并获得
        if (cardsToGain.length > 0) {
            var validGain = cardsToGain.filter(function(c){
                var pos = get.position(c);
                return pos == 'd' || pos == 'o';
            });
            
            if (validGain.length > 0) {
                player.gain(validGain, 'gain2');
                game.log(player, '获得了', validGain);
            }
        }
        
        "step 4"
        // 结算"风"
        // 排除已经拿到手里的牌
        var cardsToExpansion = event.judgeCards.filter(function(c){
            if (!c) return false;
            var pos = get.position(c);
            // 只要不在手牌区的，都可能成为"风"
            return pos !== 'h';
        });
        
        // 再次过滤，确保在弃牌堆或处理区
        var validExpansion = cardsToExpansion.filter(function(c){
            var pos = get.position(c);
            return pos == 'd' || pos == 'o';
        });
        
        if (validExpansion.length > 0) {
            // 【关键修复】正确的 addToExpansion 语法
            player.addToExpansion(validExpansion, 'giveAuto').set('gaintag', ['niwoxungu']);
            game.log(player, '将', validExpansion, '置为了"风"');
        }
    },

    marktext: "风",
    intro: {
        content: "expansion",
        markcount: "expansion",
    },
    onremove: function(player, skill) {
        var cards = player.getExpansions(skill);
        if (cards.length) player.loseToDiscardpile(cards);
    },

    group: ["niwoxungu_draw", "niwoxungu_use"],
    subSkill: {
        draw: {
            trigger: { player: "loseAfter" },
            forced: true,
            filter: function(event, player) {
                // 检查自定义标记
                return event.niwoxungu_cost && event.cards && event.cards.length > 0;
            },
            content: function() {
                var card = trigger.cards[0];
                var type = get.type(card);
                
                var feng = player.getExpansions("niwoxungu");
                var X = feng.filter(function(c){ return get.type(c) == type; }).length;
                
                if (X > 0) {
                    player.draw(X);
                }
            },
            sub: true
        },
        use: {
            enable: "phaseUse",
            usable: 1,
            filterCard: false,
            selectCard: -1,
            filter: function(event, player) {
                return player.getExpansions("niwoxungu").length > 0;
            },
            content: function() {
                "step 0"
                var feng = player.getExpansions("niwoxungu");
                var names = [];
                for(var i=0; i<feng.length; i++){
                    if(!names.includes(feng[i].name)) names.push(feng[i].name);
                }
                
                player.chooseControl(names)
                    .set("prompt", "寻古：选择一种“风”的牌名使用或打出")
                    .set("ai", function(){ return names[0]; });
                
                "step 1"
                if (!result.control) {
                    event.finish();
                    return;
                }
                event.cardName = result.control;
                
                var feng = player.getExpansions("niwoxungu");
                var toRemove = feng.filter(function(c){ return c.name == event.cardName; });
                
                if (toRemove.length > 0) {
                    // 用自定义属性标记这个 lose 事件
                    var next = player.loseToDiscardpile(toRemove[0]);
                    next.niwoxungu_cost = true;
                }
                
                "step 2"
                player.chooseUseTarget({name: event.cardName}, false);
            },
            sub: true
        }
    }
},

// 逆周处 - 衔望
niwoxianwang: {
    audio: "ext:剑影:2",
    trigger: {
        player: ["useCard", "respond"],
    },
    forced: true,
    filter: function(event, player, name) {
        if (!event.card || !event.card.isCard) return false;
        
        const feng = player.getExpansions("niwoxungu");
        const names = [];
        feng.forEach(card => {
            if (!names.includes(card.name)) names.push(card.name);
        });
        
        if (name == "useCard" || name == "respond") {
            // ①首次使用或打出与"风"中相同牌名的实体牌
            if (names.includes(event.card.name)) {
                return !player.hasSkill("niwoxianwang_" + event.card.name);
            }
        }
        
        return false;
    },
    content: async function(event, trigger, player) {
        'step 0'
        player.addTempSkill("niwoxianwang_" + trigger.card.name);
        
        // 移除对应"风"
        const feng = player.getExpansions("niwoxungu");
        const toRemove = feng.filter(card => card.name == trigger.card.name);
        
        if (toRemove.length > 0) {
            await player.loseToDiscardpile(toRemove[0]);
            event.removed = toRemove[0];
        }
        
        'step 1'
        // 令此牌额外执行一次
        if (trigger.name == "useCard") {
            trigger.effectCount = 2;
        }
        
        'step 2'
        // 摸X张牌
        if (event.removed) {
            const type = get.type(event.removed);
            const feng = player.getExpansions("niwoxungu");
            const X = feng.filter(c => get.type(c) == type).length;
            
            if (X > 0) {
                await player.draw(X);
            }
        }
    },
    mod: {
        targetEnabled: function(card, player, target) {
            // ②其他角色无法响应你与你"风"花色相同的牌
            if (player == target) return;
            
            const feng = player.getExpansions("niwoxungu");
            const suits = [];
            feng.forEach(card => {
                const suit = get.suit(card);
                if (suit && !suits.includes(suit)) suits.push(suit);
            });
            
            if (suits.includes(get.suit(card))) {
                return false;
            }
        },
    },
},

niwoqianzhun: {
    audio: "ext:剑影:2",
    enable: "phaseUse",
    usable: 1,
    filterTarget: function(card, player, target) {
        return true;  // 允许选择任何角色，包括自己
    },
    content: function() {
        'step 0'
        if (!event.target) {
            event.finish();
            return;
        }
        
        const target = event.target;
        
        // ✅ 修复：只获取武将牌上的技能（不包括装备、临时技能等）
        const skills = [];
        
        // 获取主将技能
        if (target.name1) {
            const character = lib.character[target.name1];
            if (character && character[3]) {
                skills.push(...character[3]);
            }
        }
        
        // 获取副将技能
        if (target.name2) {
            const character = lib.character[target.name2];
            if (character && character[3]) {
                skills.push(...character[3]);
            }
        }
        
        // 如果没有name1/name2，尝试使用name
        if (skills.length == 0 && target.name) {
            const character = lib.character[target.name];
            if (character && character[3]) {
                skills.push(...character[3]);
            }
        }
        
        const cardNames = [];
        
        for (const skill of skills) {
            const info = lib.skill[skill];
            if (!info) continue;
            
            const infoStr = get.translation(skill + "_info");
            
            // 简化处理：检查常见牌名
            const commonCards = ["sha", "shan", "tao", "jiu", "wuzhong", "guohe", "shunshou", "jiedao", "wuxie", "juedou", "huogong", "tiesuo", "nanman", "wanjian", "taoyuan", "wugu"];
            
            for (const name of commonCards) {
                if (infoStr.includes(get.translation(name)) && !cardNames.includes(name)) {
                    cardNames.push(name);
                }
            }
        }
        
        // ✅ 修复：只统计武将牌技能的标签数
        let tagCount = 0;
        for (const skill of skills) {
            const info = lib.skill[skill];
            if (!info) continue;
            
            if (info.locked) tagCount++;
            if (info.limited) tagCount++;
            if (info.juexingji) tagCount++;
            if (info.zhuSkill) tagCount++;
            if (info.charlotte) tagCount++;
            if (info.usable) tagCount++;
        }
        
        event.cardNames = cardNames;
        event.tagCount = tagCount;
        
        game.log(target, "的武将牌技能标签数为", "#y" + tagCount);
        
        'step 1'
        player.chooseControl("选项一", "选项二")
            .set("prompt", "千谆：选择一项")
            .set("choiceList", [
                "视为使用或打出一个其技能描述中包含的牌名",
                "视为使用一张牌名字数为" + (event.tagCount + 1) + "的基本牌或普通锦囊牌",
            ])
            .set("ai", () => {
                return 0;
            });
        
        'step 2'
        if (!result.control) {
            event.finish();
            return;
        }
        
        event.choice = result.control;
        
'step 3'
if (event.choice == "选项一") {
    if (event.cardNames.length == 0) {
        game.log("没有可用的牌名");
        event.finish();
        return;
    }
    
    // ✅ 改成 chooseButton 显示牌的图片
    const list = event.cardNames.map(name => ['基本', '', name]);
    player.chooseButton(['千谆：选择要使用或打出的牌名', [list, 'vcard']], true)
        .set("ai", (button) => {
            return 1;
        });
} else {
    // 选项二
    const X = event.tagCount + 1;
    
    // 获取牌名字数为X的基本牌或普通锦囊牌
    const list = [];
    for (const name in lib.card) {
        const info = lib.card[name];
        if (info.type == "basic" || info.type == "trick") {
            if (get.translation(name).length == X) {
                list.push(name);
            }
        }
    }
    
    if (list.length == 0) {
        game.log("没有字数为" + X + "的牌");
        event.finish();
        return;
    }
    
    // ✅ 改成 chooseButton 显示牌的图片
    const vcardList = list.map(name => {
        const info = lib.card[name];
        return [info.type == "basic" ? '基本' : '锦囊', '', name];
    });
    player.chooseButton(['千谆：选择要使用的牌', [vcardList, 'vcard']], true)
        .set("ai", (button) => {
            return 1;
        });
}

'step 4'
if (!result.bool || !result.links || !result.links[0]) {
    event.finish();
    return;
}

event.cardName = result.links[0][2];  // ✅ 从 button 结果中获取牌名

player.chooseUseTarget(
    {name: event.cardName},
    false
);

    },
    group: "niwoqianzhun_damage",
    subSkill: {
        damage: {
            audio: "niwoqianzhun",
            trigger: {
                player: "damageEnd",
            },
            filter: function(event, player) {
                return !player.hasSkill("niwoqianzhun_used");
            },
            direct: true,
            content: function() {
                'step 0'
                player.chooseTarget(get.prompt("niwoqianzhun"), "选择一名角色").set("ai", function(target) {
                    return get.attitude(_status.event.player, target);
                });
                
                'step 1'
                if (!result.bool) {
                    event.finish();
                    return;
                }
                
                player.logSkill("niwoqianzhun", result.targets);
                player.addTempSkill("niwoqianzhun_used");
                
                const target = result.targets[0];
                event.target = target;
                
                // ✅ 修复：只获取武将牌上的技能
                const skills = [];
                
                // 获取主将技能
                if (target.name1) {
                    const character = lib.character[target.name1];
                    if (character && character[3]) {
                        skills.push(...character[3]);
                    }
                }
                
                // 获取副将技能
                if (target.name2) {
                    const character = lib.character[target.name2];
                    if (character && character[3]) {
                        skills.push(...character[3]);
                    }
                }
                
                // 如果没有name1/name2，尝试使用name
                if (skills.length == 0 && target.name) {
                    const character = lib.character[target.name];
                    if (character && character[3]) {
                        skills.push(...character[3]);
                    }
                }
                
                const cardNames = [];
                
                for (const skill of skills) {
                    const info = lib.skill[skill];
                    if (!info) continue;
                    
                    const infoStr = get.translation(skill + "_info");
                    
                    // 简化处理：检查常见牌名
                    const commonCards = ["sha", "shan", "tao", "jiu", "wuzhong", "guohe", "shunshou", "jiedao", "wuxie", "juedou", "huogong", "tiesuo", "nanman", "wanjian", "taoyuan", "wugu"];
                    
                    for (const name of commonCards) {
                        if (infoStr.includes(get.translation(name)) && !cardNames.includes(name)) {
                            cardNames.push(name);
                        }
                    }
                }
                
                // ✅ 修复：只统计武将牌技能的标签数
                let tagCount = 0;
                for (const skill of skills) {
                    const info = lib.skill[skill];
                    if (!info) continue;
                    
                    if (info.locked) tagCount++;
                    if (info.limited) tagCount++;
                    if (info.juexingji) tagCount++;
                    if (info.zhuSkill) tagCount++;
                    if (info.charlotte) tagCount++;
                    if (info.usable) tagCount++;
                }
                
                event.cardNames = cardNames;
                event.tagCount = tagCount;
                
                game.log(target, "的武将牌技能标签数为", "#y" + tagCount);
                
                'step 2'
                player.chooseControl("选项一", "选项二")
                    .set("prompt", "千谆：选择一项")
                    .set("choiceList", [
                        "视为使用或打出一个其技能描述中包含的牌名",
                        "视为使用一张牌名字数为" + (event.tagCount + 1) + "的基本牌或普通锦囊牌",
                    ])
                    .set("ai", () => {
                        return 0;
                    });
                
                'step 3'
                if (!result.control) {
                    event.finish();
                    return;
                }
                
                event.choice = result.control;
                
'step 4'
if (event.choice == "选项一") {
    if (event.cardNames.length == 0) {
        game.log("没有可用的牌名");
        event.finish();
        return;
    }
    
    // ✅ 改成 chooseButton 显示牌的图片
    const list = event.cardNames.map(name => ['基本', '', name]);
    player.chooseButton(['千谆：选择要使用或打出的牌名', [list, 'vcard']], true)
        .set("ai", (button) => {
            return 1;
        });
} else {
    // 选项二
    const X = event.tagCount + 1;
    
    // 获取牌名字数为X的基本牌或普通锦囊牌
    const list = [];
    for (const name in lib.card) {
        const info = lib.card[name];
        if (info.type == "basic" || info.type == "trick") {
            if (get.translation(name).length == X) {
                list.push(name);
            }
        }
    }
    
    if (list.length == 0) {
        game.log("没有字数为" + X + "的牌");
        event.finish();
        return;
    }
    
    // ✅ 改成 chooseButton 显示牌的图片
    const vcardList = list.map(name => {
        const info = lib.card[name];
        return [info.type == "basic" ? '基本' : '锦囊', '', name];
    });
    player.chooseButton(['千谆：选择要使用的牌', [vcardList, 'vcard']], true)
        .set("ai", (button) => {
            return 1;
        });
}

'step 5'
if (!result.bool || !result.links || !result.links[0]) {
    event.finish();
    return;
}

event.cardName = result.links[0][2];  // ✅ 从 button 结果中获取牌名

player.chooseUseTarget(
    {name: event.cardName},
    false
);

            },
            sub: true,
        },
        used: {
            charlotte: true,
            sub: true,
        },
    },
    ai: {
        order: 8,
        result: {
            target: 1,
        },
    },
},


niwobailan: {
    audio: "ext:剑影:2",
    trigger: {
        player: ["useCard", "respondAfter"],
    },
    usable: 1,
    filter: function(event, player, name) {
        if (name == "useCard") {
            return get.type(event.card) == "trick";
        }
        if (name == "respondAfter") {
            return true;
        }
        return false;
    },
    direct: true,
    content: async function(event, trigger, player) {
        'step 0'
        const {result: targetResult} = await player.chooseTarget(
            get.prompt("niwobailan"),
            "选择一名角色"
        ).set("ai", target => {
            return get.attitude(player, target);
        });
        
        if (!targetResult.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("niwobailan", targetResult.targets);
        event.target = targetResult.targets[0];
        
        'step 1'
        const {result} = await player.chooseControl("选项一", "选项二")
            .set("prompt", "百览：选择一项")
            .set("choiceList", [
                "令其一个符合条件的技能添加或删除一个标签",
                "令其技能描述含有“限N次”标签的技能本轮发动次数+1或-1",
            ])
            .set("ai", () => {
                return 0;
            });
        
        event.choice = result.control;
        
        'step 2'
        if (event.choice == "选项一") {
            // 选择技能
            const skills = event.target.getSkills().filter(skill => {
                return !lib.skill[skill].charlotte && lib.translate[skill];
            });
            
            const {result} = await player.chooseControl(skills)
                .set("prompt", "百览：选择要修改的技能")
                .set("ai", () => {
                    return skills[0];
                });
            
            event.skill = result.control;
            
            const {result: tagResult} = await player.chooseControl("锁定技", "限定技", "每回合限一次", "删除标签")
                .set("prompt", "百览：选择要添加或删除的标签")
                .set("ai", () => {
                    return 0;
                });
            
            event.tag = tagResult.control;
            
            // ✅ 修复：使用 storage 保存修改，而不是直接修改 lib.skill
            if (!event.target.storage.niwobailan_mods) {
                event.target.storage.niwobailan_mods = {};
            }
            
            if (!event.target.storage.niwobailan_mods[event.skill]) {
                event.target.storage.niwobailan_mods[event.skill] = {
                    forced: false,
                    limited: false,
                    usable: 0,
                };
            }
            
            const mod = event.target.storage.niwobailan_mods[event.skill];
            
            if (event.tag == "锁定技") {
                mod.forced = !mod.forced;
            } else if (event.tag == "限定技") {
                mod.limited = !mod.limited;
                if (mod.limited) {
                    event.target.addTempSkill("niwobailan_limited");
                }
            } else if (event.tag == "每回合限一次") {
                if (mod.usable > 0) {
                    mod.usable = 0;
                } else {
                    mod.usable = 1;
                }
            } else if (event.tag == "删除标签") {
                mod.forced = false;
                mod.limited = false;
                mod.usable = 0;
            }
            
            // ✅ 添加临时技能来应用修改
            event.target.addTempSkill("niwobailan_mod", {player: "roundStart"});
            
            // ✅ 添加标记显示
            const markName = "niwobailan_" + event.skill;
            event.target.markSkill(markName);
            
            game.log(player, "修改了", event.target, "的技能", "#g【" + get.translation(event.skill) + "】");
            
        } else {
            // 选项二
            const skills = event.target.getSkills().filter(skill => {
                const info = lib.skill[skill];
                return info && info.usable;
            });
            
            if (skills.length == 0) {
                event.finish();
                return;
            }
            
            const {result} = await player.chooseControl(skills)
                .set("prompt", "百览：选择要修改的技能")
                .set("ai", () => {
                    return skills[0];
                });
            
            event.skill = result.control;
            
            const {result: numResult} = await player.chooseControl("+1", "-1")
                .set("prompt", "百览：选择发动次数变化")
                .set("ai", () => {
                    return "+1";
                });
            
            event.num = numResult.control == "+1" ? 1 : -1;
            
            // 修改发动次数
            if (!event.target.storage.niwobailan_count) event.target.storage.niwobailan_count = {};
            if (!event.target.storage.niwobailan_count[event.skill]) {
                event.target.storage.niwobailan_count[event.skill] = 0;
            }
            
            event.target.storage.niwobailan_count[event.skill] += event.num;
            event.target.storage.niwobailan_count[event.skill] = Math.max(0, event.target.storage.niwobailan_count[event.skill]);
            
            event.target.addTempSkill("niwobailan_count", {player: "roundStart"});
            
            game.log(player, "令", event.target, "的技能", "#g【" + get.translation(event.skill) + "】", "本轮发动次数", event.num > 0 ? "+1" : "-1");
        }
    },
    subSkill: {
        limited: {
            trigger: {
                player: "hpBegin",
            },
            forced: true,
            filter: function(event, player) {
                return player.hp == 1;
            },
            content: function() {
                // 恢复限定技
                const skills = player.getSkills();
                for (const skill of skills) {
                    const info = lib.skill[skill];
                    if (info && info.limited) {
                        player.restoreSkill(skill);
                    }
                }
            },
            sub: true,
            sourceSkill: "niwobailan",
        },
        // ✅ 新增：应用标签修改的子技能
        mod: {
            charlotte: true,
            onremove: function(player) {
                delete player.storage.niwobailan_mods;
            },
            mod: {
                skillEnabled: function(skill, player) {
                    if (!player.storage.niwobailan_mods) return;
                    const mod = player.storage.niwobailan_mods[skill];
                    if (!mod) return;
                    
                    // 应用修改
                    const info = lib.skill[skill];
                    if (!info) return;
                    
                    if (mod.forced) {
                        info.forced = true;
                    }
                    if (mod.limited) {
                        info.limited = true;
                    }
                    if (mod.usable > 0) {
                        info.usable = mod.usable;
                    }
                },
            },
            // ✅ 添加 intro 显示修改信息
            intro: {
                content: function(storage, player) {
                    if (!player.storage.niwobailan_mods) return "无修改";
                    
                    let str = "<div style='color:#6cf'>已修改的技能：</div>";
                    for (const skill in player.storage.niwobailan_mods) {
                        const mod = player.storage.niwobailan_mods[skill];
                        str += "<br><div style='color:#6cf'>【" + get.translation(skill) + "】</div>";
                        
                        const tags = [];
                        if (mod.forced) tags.push("<span style='color:#f66'>锁定技</span>");
                        if (mod.limited) tags.push("<span style='color:#f90'>限定技</span>");
                        if (mod.usable > 0) tags.push("<span style='color:#6f6'>每回合限" + mod.usable + "次</span>");
                        
                        if (tags.length > 0) {
                            str += tags.join("、");
                        } else {
                            str += "<span style='color:#999'>已删除标签</span>";
                        }
                    }
                    return str;
                },
            },
            sub: true,
            sourceSkill: "niwobailan",
        },
        count: {
            charlotte: true,
            onremove: function(player) {
                delete player.storage.niwobailan_count;
            },
            // ✅ 添加 intro 显示次数修改
            intro: {
                content: function(storage, player) {
                    if (!player.storage.niwobailan_count) return "无修改";
                    
                    let str = "<div style='color:#6cf'>发动次数修改：</div>";
                    for (const skill in player.storage.niwobailan_count) {
                        const count = player.storage.niwobailan_count[skill];
                        str += "<br><div style='color:#6cf'>【" + get.translation(skill) + "】</div>";
                        str += "<span style='color:" + (count > 0 ? "#6f6" : "#f66") + "'>额外次数：" + (count > 0 ? "+" : "") + count + "</span>";
                    }
                    return str;
                },
            },
            sub: true,
            sourceSkill: "niwobailan",
        },
    },
},

// 饮冰
// 饮冰 - 修复版
niwoyinbing: {
    audio: "ext:剑影:2",
    trigger: {
        player: ["damageEnd", "damageSource"],
    },
    usable: 1,
    filter: function(event, player) {
        const injured = event.player;
        const damageSource = event.source;
        return injured && damageSource && !injured.isDead() && !damageSource.isDead();
    },
    direct: true,
    content: function() {
        'step 0'
        const injured = trigger.player;
        const damageSource = trigger.source;
        
        if (!damageSource || damageSource.isDead()) {
            event.finish();
            return;
        }
        
        event.injured = injured;
        event.damageSource = damageSource;
        
        injured.chooseBool(
            "饮冰：是否视为对" + get.translation(damageSource) + "使用一张冰【杀】？"
        ).set("ai", () => {
            const player = _status.event.player;
            const targetx = _status.event.targetx;
            return get.effect(targetx, {name: "sha", nature: "ice"}, player, player) > 0;
        }).set("targetx", damageSource);
        
        'step 1'
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("niwoyinbing");
        
        event.injured.chooseUseTarget(
            {name: "sha", nature: "ice"},
            event.damageSource,
            true,
            false
        ).set("filterTarget", (card, player, target) => {
            return target == _status.event.sourcex;
        }).set("sourcex", event.damageSource);
        
        'step 2'
        if (result && result.bool) {
            event.sha = result.card;
            player.addTempSkill("niwoyinbing_effect");
            player.storage.niwoyinbing_effect = event.sha;
        }
    },
    subSkill: {
        effect: {
            trigger: {
                global: "useCardAfter",
            },
            forced: true,
            charlotte: true,
            filter: function(event, player) {
                return event.card == player.storage.niwoyinbing_effect;
            },
            content: function() {
                'step 0'
                delete player.storage.niwoyinbing_effect;
                player.removeSkill("niwoyinbing_effect");
                
                // 检查是否有角色受到伤害
                let hasDamage = false;
                const useCardPlayer = trigger.player;
                if (useCardPlayer) {
                    useCardPlayer.getHistory("sourceDamage", evt => {
                        if (evt.card == trigger.card) {
                            hasDamage = true;
                        }
                    });
                }
                
                event.hasDamage = hasDamage;
                
                // 检查是否有角色死亡
                let hasDeath = false;
                game.getGlobalHistory("dying", evt => {
                    if (evt.getParent(2) == trigger) {
                        if (evt.player.isDead()) {
                            hasDeath = true;
                        }
                    }
                });
                
                event.hasDeath = hasDeath;
                
                'step 1'
                // ✅ 修复：没有角色受到伤害时，失去体力并摸牌
                if (!event.hasDamage) {
                    player.loseHp();
                }
                
                'step 2'
                if (!event.hasDamage) {
                    player.draw(2);
                }
                
                'step 3'
                if (event.hasDeath) {
                    // ②有角色死亡
                    player.chooseTarget(
                        "饮冰：令一名其他角色获得本技能",
                        (card, player, target) => {
                            return target != player;
                        }
                    ).set("ai", targetx => {
                        const player = _status.event.player;
                        return get.attitude(player, targetx);
                    });
                }
                
                'step 4'
                if (event.hasDeath && result.bool && result.targets && result.targets.length > 0) {
                    const chosenTarget = result.targets[0];
                    chosenTarget.addSkill("niwoyinbing");
                    game.log(chosenTarget, "获得了技能", "#g【饮冰】");
                }
            },
            onremove: function(player) {
                delete player.storage.niwoyinbing_effect;
            },
            sub: true,
            sourceSkill: "niwoyinbing",
        },
    },
},

// 千谆 - 改成 vcard 形式


niwotalan: {
    audio: "ext:剑影:2",
    trigger: {
        player: "gainAfter",
    },
    forced: true,
    silent: true,
    popup: false,
    filter: function(event, player) {
        // 排除摸牌阶段的正常摸牌
        if (event.getParent().name == "draw" && event.getParent(2).name == "phaseDraw") return false;
        return event.cards && event.cards.length > 0;
    },
    content: function() {
        // 标记所有通过非摸牌阶段获得的牌
        var cards = trigger.cards.filter(function(card) {
            return get.position(card) === 'h';
        });
        if (cards.length > 0) {
            player.addGaintag(cards, "niwotalan_tag");
            player.addTempSkill("niwotalan_visual", "roundStart");
        }
    },
    mod: {
        ignoredHandcard: function(card, player) {
            // 不计入手牌上限
            if (card.gaintag && card.gaintag.includes("niwotalan_tag")) return true;
            if (card.cards && Array.isArray(card.cards)) {
                for (var i = 0; i < card.cards.length; i++) {
                    if (card.cards[i].gaintag && card.cards[i].gaintag.includes("niwotalan_tag")) return true;
                }
            }
        },
        cardUsable: function(card, player, num) {
            // 不计入使用次数限制（针对直接出牌和重铸等次数判断）
            if (card.gaintag && card.gaintag.includes("niwotalan_tag")) return Infinity;
            if (card.cards && Array.isArray(card.cards)) {
                for (var i = 0; i < card.cards.length; i++) {
                    if (card.cards[i].gaintag && card.cards[i].gaintag.includes("niwotalan_tag")) return Infinity;
                }
            }
        }
    },
    group: "niwotalan_log",
    subSkill: {
        log: {
            trigger: {
                player: "useCard",
            },
            forced: true,
            silent: true,
            popup: false,
            priority: 20,
            filter: function(event, player) {
                var card = event.card;
                // 检查实体牌或虚拟牌背后的实体牌是否有标签
                if (card.gaintag && card.gaintag.includes("niwotalan_tag")) return true;
                if (card.cards && Array.isArray(card.cards)) {
                    for (var i = 0; i < card.cards.length; i++) {
                        if (card.cards[i].gaintag && card.cards[i].gaintag.includes("niwotalan_tag")) return true;
                    }
                }
                return false;
            },
            content: function() {
                // 核心逻辑：抹除该次使用的次数消耗
                trigger.addCount = false;
                game.log(player, "使用的", trigger.card, "#g不计入次数");
            },
        },
        visual: {
            charlotte: true,
            mark: true,
            intro: {
                content: function(content, player) {
                    var n = player.getCards('h', function(card) {
                        return card.gaintag && card.gaintag.includes('niwotalan_tag');
                    }).length;
                    return "当前手牌中有 " + n + " 张[踏澜]牌（不计次数/上限）";
                }
            }
        }
    },
},

niwoyuhe: {
    audio: "ext:剑影:2",
    enable: ["chooseToUse", "chooseToRespond"],
    // 标记：用于初始化存储空间
    init: function(player) {
        if (!player.storage.niwoyuhe_used) player.storage.niwoyuhe_used = [];
    },
    mark:true,
    marktext:"逾",
        intro: {
        content: function(storage, player) {
            if (!storage || !storage.length) return "本轮暂未声明使用过任何基本牌";
            return "本轮已声明使用的牌名：" + get.translation(storage);
        },
    },
    // 监听每轮开始，清空记录
    onremove: true, // 失去技能时同时也移除相关存储
    trigger: { global: "roundStart" },
    forced: true,
    filter: function(event, player) {
        // 只有每轮开始时才触发清空逻辑
        return true;
    },
    content: function() {
        player.storage.niwoyuhe_used = [];
        player.markSkill('niwoyuhe'); // 更新一下标记显示（如果有的话）
    },
    // 主技能过滤器
    filter: function(event, player) {
        if (!player.next || !player.previous) return false;
        if (player.next == player || player.previous == player) return false;
        if (player.next.countCards("he") == 0 || player.previous.countCards("he") == 0) return false;

        // 获取本轮已选过的牌名列表
        const used = player.storage.niwoyuhe_used || [];

        // 只要有一张基本牌还没被用过，就允许发动
        for (const name in lib.card) {
            const info = lib.card[name];
            if (info && info.type == "basic" && !used.includes(name)) {
                return true;
            }
        }
        return false;
    },
    chooseButton: {
        dialog: function(event, player) {
            const list = [];
            // 获取本轮已选过的牌名
            const used = player.storage.niwoyuhe_used || [];

            for (const name in lib.card) {
                const info = lib.card[name];
                // 只有不在 used 列表里的基本牌才能显示
                if (info && info.type == "basic" && !used.includes(name)) {
                    list.push(["基本", "", name]);
                }
            }
            return ui.create.dialog("逾壑：选择一张基本牌", [list, "vcard"]);
        },
        filter: function(button, player) {
            const event = _status.event.getParent();
            return event.filterCard({ name: button.link[2] }, player, event);
        },
        check: function(button) {
            const player = _status.event.player;
            return player.getUseValue({ name: button.link[2] });
        },
        backup: function(links, player) {
            return {
                filterCard: () => false,
                selectCard: -1,
                viewAs: { name: links[0][2] },
                onuse: function(result, player) {
                    result.logSkill = ["niwoyuhe_backup", result.card.name];
                },
                precontent: function() {
                    delete event.result.skill;
                    var chosenName = event.result.card.name;

                    // 【核心修改】：在这里直接记录！
                    // 只要选了这张牌，无论后续颜色对不对，都算“用过了”
                    if (!player.storage.niwoyuhe_used) player.storage.niwoyuhe_used = [];
                    player.storage.niwoyuhe_used.push(chosenName);
                    
                    var nextPlayer = player.next;
                    var previousPlayer = player.previous;

                    game.log(player, "发动了技能", "#g【逾壑】");

                    if (!_status.niwoyuhe_temp) _status.niwoyuhe_temp = {};
                    _status.niwoyuhe_temp[player.playerid] = {
                        nextPlayer: nextPlayer,
                        previousPlayer: previousPlayer,
                        cardName: chosenName
                    };
                    event.result.card._niwoyuhe_mark = player.playerid;
                },
            };
        },
        prompt: function(links, player) {
            return "展示两位相邻角色的各一张牌，若颜色相同则视为使用【" + get.translation(links[0][2]) + "】";
        },
    },
    group: "niwoyuhe_effect",
    subSkill: {
        backup: {
            sub: true,
            sourceSkill: "niwoyuhe",
        },
        effect: {
            trigger: {
                player: "useCardBefore",
            },
            forced: true,
            popup: false,
            charlotte: true,
            filter: function(event, player) {
                return event.card._niwoyuhe_mark == player.playerid &&
                    _status.niwoyuhe_temp &&
                    _status.niwoyuhe_temp[player.playerid];
            },
            content: function() {
                'step 0'
                const info = _status.niwoyuhe_temp[player.playerid];
                delete _status.niwoyuhe_temp[player.playerid];

                if (!info || !info.nextPlayer || !info.previousPlayer) {
                    trigger.cancel();
                    event.finish();
                    return;
                }

                event.nextTarget = info.nextPlayer;
                event.prevTarget = info.previousPlayer;

                if (!event.nextTarget.isIn() || !event.prevTarget.isIn()) {
                    trigger.cancel();
                    event.finish();
                    return;
                }

                'step 1'
                player.choosePlayerCard(event.nextTarget, 'he', true);
                event.prompt = '逾壑：展示下家 ' + get.translation(event.nextTarget) + ' 的一张牌';

                'step 2'
                if (result.bool && result.links && result.links.length > 0) {
                    event.card1 = result.links[0];
                    player.showCards(event.card1);
                    game.log(player, "展示了", event.nextTarget, "的一张", event.card1);
                } else {
                    trigger.cancel();
                    event.finish();
                    return;
                }

                'step 3'
                player.choosePlayerCard(event.prevTarget, 'he', true);
                event.prompt = '逾壑：展示上家 ' + get.translation(event.prevTarget) + ' 的一张牌';

                'step 4'
                if (result.bool && result.links && result.links.length > 0) {
                    event.card2 = result.links[0];
                    player.showCards(event.card2);
                    game.log(player, "展示了", event.prevTarget, "的一张", event.card2);
                } else {
                    trigger.cancel();
                    event.finish();
                    return;
                }

                'step 5'
                const color1 = get.color(event.card1);
                const color2 = get.color(event.card2);
                const type1 = get.type(event.card1);
                const type2 = get.type(event.card2);

                event.canUse = (color1 == color2);
                event.sameType = (type1 == type2);

                if (event.canUse) {
                    game.log(player, "展示牌颜色#g相同");
                } else {
                    game.log(player, "展示牌颜色#y不同");
                }
                
                if (event.sameType) {
                    game.log(player, "展示牌类别#g相同");
                } else {
                    game.log(player, "展示牌类别#y不同");
                }

                'step 6'
                if (!event.canUse) {
                    // 这里虽然取消了卡牌使用，但是 storage 记录并没有删除
                    // 所以下一次这个牌名就无法在 dialog 中出现了
                    trigger.cancel();
                    game.log(player, "由于颜色不同，【" + get.translation(trigger.card.name) + "】未能发动");
                }

                'step 7'
                if (event.sameType) {
                    const toGain = [event.card1, event.card2].filter(card => {
                        return get.owner(card) && (get.position(card) == "h" || get.position(card) == "e");
                    });
                    if (toGain.length > 0) {
                        player.gain(toGain, "gain2");
                    }
                }

                'step 8'
                const hand1 = event.nextTarget.countCards("h");
                const hand2 = event.prevTarget.countCards("h");
                const X = Math.min(hand1, hand2);
                if (X > 0) {
                    player.draw(X);
                }
            },
            sub: true,
        },
    },
},
yingdangliao: {
    audio: "ext:剑影:2",
    trigger: {
        target: "useCardToTargeted",
    },
    // ✅ 添加轮次刷新
    group: "yingdangliao_roundClear",
    filter: function(event, player) {
        var c = event.card;
        if (get.color(c) != "red") return false;
        if (typeof get.number(c) != "number") return false;
        return true;
    },
    content: function() {
        'step 0'
        if (!player.storage.yingdangliao) player.storage.yingdangliao = {};
       
        // 使用 trigger.cards（实体牌数组）
        var realCards = trigger.cards || [];
        if (realCards.length == 0) { event.finish(); return; }
        event.cardObj = realCards[0];

        event.originalNum = get.number(trigger.card);
        event.targetsCount = (trigger.targets || []).length;
        event.X = game.countPlayer();
       
        var nAdd = event.originalNum + event.targetsCount;
        var nSub = event.originalNum - event.targetsCount;
        if (nSub < 1) nSub = 1;
        if (nAdd > 13) nAdd = 13;
       
        var choices = ["点数+" + event.targetsCount + " (" + nAdd + ")"];
        if (event.targetsCount > 0) choices.push("点数-" + event.targetsCount + " (" + nSub + ")");
        choices.push("取消");

        player.chooseControl(choices).set('prompt', "是否修改" + get.translation(event.cardObj) + "的点数？");

        'step 1'
        var newNum = event.originalNum;
        if (result.control && result.control.startsWith("点数+")) newNum = event.originalNum + event.targetsCount;
        else if (result.control && result.control.startsWith("点数-")) newNum = event.originalNum - event.targetsCount;
        if (newNum > 13) newNum = 13; if (newNum < 1) newNum = 1;

        if (newNum != event.originalNum) {
            event.cardObj.number = newNum;
            game.log(player, '将', event.cardObj, '的点数修改为', '#y' + newNum);
        }
        event.currentNum = newNum;

        var record = player.storage.yingdangliao;
        var mode = '';
        if (event.currentNum > event.X) { if (!record.greater) mode = 'greater'; }
        else if (event.currentNum == event.X) { if (!record.equal) mode = 'equal'; }
        else { if (!record.less) mode = 'less'; }

        if (!mode) { event.finish(); return; }

        event.mode = mode;
        record[mode] = true;
        player.logSkill('yingdangliao', null, '触发效果：' + (mode == 'greater' ? '大于X' : (mode == 'equal' ? '等于X' : '小于X')));

        'step 2'
        if (event.mode == 'greater' || event.mode == 'less') {
            player.addSkill('yingdangliao_after');
            if (!player.storage.yingdangliao_after) player.storage.yingdangliao_after = [];
           
            player.storage.yingdangliao_after.push({
                card: event.cardObj,
                originalTargets: trigger.targets.slice(0)
            });
            game.log(player, '令', event.cardObj, '结算后执行转化效果');
        }

        if (event.mode == 'equal' || event.mode == 'less') {
            var validTargets = trigger.targets.filter(function(t){ return t.isAlive(); });
            if (validTargets.length > 0) {
                player.chooseTarget('选择一名目标获得额外阶段', 1, function(card, player, target){
                    return _status.event.validTargets.includes(target);
                }).set('validTargets', validTargets);
            } else { event.goto(4); }
        } else { event.goto(4); }

        'step 3'
        if (result.bool) {
            var target = result.targets[0];
            var phases = ["phaseDraw", "phaseUse", "phaseDiscard"];
            var randomPhase = phases[Math.floor(Math.random() * phases.length)];
            
            // ✅ 修复：记录当前回合角色
            var currentPhasePlayer = _status.currentPhase;
            
            target.addSkill('yingdangliao_phase');
            if(!target.storage.yingdangliao_phase) target.storage.yingdangliao_phase = [];
            target.storage.yingdangliao_phase.push({
                phase: randomPhase,
                triggerPlayer: currentPhasePlayer  // 记录当前回合角色
            });
            
            var map = { phaseDraw: "摸牌阶段", phaseUse: "出牌阶段", phaseDiscard: "弃牌阶段" };
            game.log(target, "将在", get.translation(currentPhasePlayer), "的回合结束后执行额外的", '#g' + map[randomPhase]);
        }

        'step 4'
        if (event.mode == 'less') player.turnOver();
    },
   
    subSkill: {
        // ✅ 添加轮次刷新
        roundClear: {
            trigger: {
                global: "roundStart",
            },
            forced: true,
            popup: false,
            charlotte: true,
            content: function() {
                delete player.storage.yingdangliao;
                game.log(player, '荡燎的限制已重置');
            },
            sub: true,
        },
        
        after: {
            trigger: { global: "useCardAfter" },
            forced: true,
            charlotte: true,
            filter: function(event, player) {
                if (!player.storage.yingdangliao_after) return false;
                var finishedCards = event.cards || [];
                return player.storage.yingdangliao_after.some(function(item){
                    return finishedCards.includes(item.card);
                });
            },
            content: function() {
                'step 0'
                var list = player.storage.yingdangliao_after;
                var finishedCards = trigger.cards || [];
                var index = list.findIndex(function(item){ return finishedCards.includes(item.card); });
               
                if (index == -1) { event.finish(); return; }
               
                var data = list[index];
                event.realCard = data.card;
                event.originalTargets = data.originalTargets;
                list.splice(index, 1);
                if(list.length == 0) player.removeSkill('yingdangliao_after');

                if(!event.realCard) { event.finish(); return; }

                var potentialTargets = event.originalTargets.filter(function(t){ return t.isAlive(); });
                if (potentialTargets.length == 0) { event.finish(); return; }
                event.potentialTargets = potentialTargets;

                if (potentialTargets.length == 1) {
                    event.cardUser = potentialTargets[0];
                    event.goto(2);
                } else {
                    player.chooseTarget('选择一名此牌的目标作为使用者', true, function(card, player, target){
                        return _status.event.potentialTargets.includes(target);
                    }).set('potentialTargets', potentialTargets)
                      .set('ai', function(target){ 
                          return get.attitude(_status.event.player, target); 
                      });
                }

                'step 1'
                if (result.bool) {
                    event.cardUser = result.targets[0];
                } else {
                    event.finish();
                    return;
                }

                'step 2'
                player.chooseControl('火【杀】', '【火攻】')
                      .set('prompt', '令' + get.translation(event.cardUser) + '将' + get.translation(event.realCard) + '视为火杀或火攻使用')
                      .set('ai', function(){ return '火【杀】'; });

                'step 3'
                event.choice = result.control;
                var cardName = (event.choice == '火【杀】') ? 'sha' : 'huogong';
                
                var targets = game.filterPlayer(function(current){
                    if (current == event.cardUser) return false;
                    if (cardName == 'sha') {
                        return event.cardUser.canUse({name:'sha', nature:'fire'}, current);
                    } else {
                        return event.cardUser.canUse({name:'huogong'}, current);
                    }
                });
                
                if (targets.length == 0) {
                    game.log('没有合法目标');
                    event.finish();
                    return;
                }
                
                player.chooseTarget('请选择' + (cardName == 'sha' ? '火【杀】' : '【火攻】') + '的目标', true, function(card, player, target){
                    return _status.event.validTargets.includes(target);
                }).set('validTargets', targets)
                  .set('ai', function(target){ 
                      return get.effect(target, {name: _status.event.cardName, nature: _status.event.cardNature}, _status.event.cardUser); 
                  })
                  .set('cardName', cardName)
                  .set('cardNature', cardName == 'sha' ? 'fire' : null)
                  .set('cardUser', event.cardUser);

                'step 4'
                if (result.bool) {
                    var target = result.targets[0];
                    var cardName = (event.choice == '火【杀】') ? 'sha' : 'huogong';
                    var cardNature = (event.choice == '火【杀】') ? 'fire' : null;
                   
                    var cardPos = get.position(event.realCard);
                    
                    if (cardPos == 'd') {
                        if (ui.discardPile.contains(event.realCard)) {
                            ui.discardPile.removeChild(event.realCard);
                        }
                        ui.ordering.appendChild(event.realCard);
                        event.realCard.fix();
                        event.realCard.style.transform = '';
                    }
                    
                    var vCard = game.createCard(cardName, event.realCard.suit, event.realCard.number);
                    if (cardNature) vCard.nature = cardNature;
                    
                    vCard.cards = [event.realCard];
                    vCard.isCard = true;

                    game.log(event.cardUser, '将', event.realCard, '当作', vCard, '对', target, '使用');

                    event.cardUser.useCard(vCard, target, vCard.cards);
                }
            },
            sub: true,
        },
        
        // ✅ 修复：在当前回合角色的回合结束时触发
        phase: {
            trigger: { global: "phaseAfter" },
            forced: true,
            charlotte: true,
            filter: function(event, player) {
                if (!player.storage.yingdangliao_phase || player.storage.yingdangliao_phase.length == 0) return false;
                // 检查是否有需要在当前回合角色结束时触发的阶段
                return player.storage.yingdangliao_phase.some(function(item){
                    return item.triggerPlayer == event.player;
                });
            },
            content: function() {
                var phases = player.storage.yingdangliao_phase;
                var currentPlayer = trigger.player;
                
                // 找到所有需要在当前回合角色结束时触发的阶段
                var toExecute = [];
                var remaining = [];
                
                for (var i = 0; i < phases.length; i++) {
                    if (phases[i].triggerPlayer == currentPlayer) {
                        toExecute.push(phases[i].phase);
                    } else {
                        remaining.push(phases[i]);
                    }
                }
                
                player.storage.yingdangliao_phase = remaining;
                
                if (remaining.length == 0) {
                    delete player.storage.yingdangliao_phase;
                    player.removeSkill('yingdangliao_phase');
                }
                
                // 执行所有需要执行的阶段
                var map = { phaseDraw: "摸牌阶段", phaseUse: "出牌阶段", phaseDiscard: "弃牌阶段" };
                for (var i = 0; i < toExecute.length; i++) {
                    game.log(player, '执行额外的', '#g' + map[toExecute[i]]);
                    player[toExecute[i]]();
                }
            },
            sub: true,
        }
    },
    onremove: function(player) {
         delete player.storage.yingdangliao;
         delete player.storage.yingdangliao_after;
         delete player.storage.yingdangliao_phase;
    }
},


        },
        translate: {
            clanxiahou: "谯郡夏侯氏",
            chixue: "炽血丹青",
            yingmen: "子嗣盈门",
            niwo:"逆涡之流",
            clanzhuoxi: "擢息",
            "clanzhuoxi_info": "限定技，锁定技，转换技，当你距离小于1的角色使用基本牌和非延时性锦囊牌时，<br>阴：若此牌为实体牌，你获得该牌并重置武将牌；<br>阳：若此牌为转化牌，你获得该牌，重置武将牌并失去一点体力值。",
            clanxiarong: "遐容",
            "clanxiarong_info": "限定技，当你需要使用或打出一张牌名字数本轮未以此法重复且为 X 的牌时，你可以翻面并观看与你距离不小于X的一名角色的手牌，选择你与其任意张牌名字数之和等于X的牌并将这些牌转化为你选择的牌，然后本轮该角色/其他角色与你的距离-X/+X。",
            clanfufeng: "扶风",
            "clanfufeng_info": "锁定技，当你展示一张牌后，你重铸你手牌中另一种颜色的所有牌。然后你将X/2张牌置于牌堆顶。（X为【徇覆】记录过的锦囊牌牌名数，且至少为1，X/2向下取整）",
            clanyilv: "绎律",
            "clanyilv_info": "锁定技，当你的体力值发生变化时，或一号位的回合开始时，你选择一种颜色并亮出牌堆顶X张牌，依次使用其中另一种颜色的牌，并获得其余的牌。",
            clanxunfu: "徇覆",
            "clanxunfu_info": "锁定技，当你成为一张本轮未以此法记录过的非装备牌的目标时，来源需展示另一种颜色的一张手牌，否则此牌对你无效，然后你记录此牌牌名。",
            clanfufengRemake: "扶风",
            "clanfufengRemake_info": "锁定技，当你展示一张牌后，你重铸你手牌中另一种颜色的所有牌。然后你将1张牌置于牌堆顶。",
            clanyilvRemake: "绎律",
            "clanyilvRemake_info": "锁定技，当你的体力值发生变化时，或一号位的回合开始时，你选择一种颜色并亮出牌堆顶体力值张牌，依次使用其中另一种颜色的牌，并获得其余的牌。",
            clanzhishi: "稚适",
            "clanzhishi_info": "出牌阶段限一次，你可以将一张下列牌置入一名角色的对应区域，视为使用对应牌：♥兵粮寸断，♦朱雀羽扇，♣藤甲，♠闪电；然后该牌若为红色/黑色，你与其摸/弃X张牌。若X不大于你的体力值，你可再次发动【携襟】（X为其该区域的牌数）",
            clanxiejin: "携襟",
            "clanxiejin_info": "出牌阶段限一次，你可以弃置一个区域的所有牌，令一名角色选择一项：1.弃置另一个区域的所有牌，然后摸等量的牌；2.摸等同于其另一个区域牌的数量的牌，然后弃置等量张牌。若其任一区域牌的数量不小于你的对应区域，你可再次发动【稚适】。",
            clanzelieremake: "泽烈",
            "clanzelieremake_info": "宗族技，当吴郡陆氏角色失去其场上的所有牌后，你可令一名角色本回合下次摸牌/弃置牌后，其摸一张牌/弃置一张牌。",
            clanfeishi: "匪氏",
clanfeishi_info: "每回合限一次，当你即将受到伤害时，你可以选择至多两名角色同时展示一张红色牌，你选择其中一张获得之",

clanfeichen: "斐谌",
clanfeichen_info: "当你于回合内首次成为红色牌的目标时，你可以展示来源的所有手牌，若其手牌中没有与此牌类别相同的红色牌，你令此牌结算两次。",

            xr_distanceInverted:"遐容",
          yingcigu: "刺骨",
yingcigu_info: "出牌阶段限X次，或当你受到伤害后，你可以将一名角色/伤害来源的一张牌置于你的武将牌上，称为“刺”。若此牌的点数与X的余数大于1，你受到一点此牌来源的冰属性伤害。回合结束阶段，你可以选择一项：①弃置一种颜色的“刺”，视为对一名其他角色使用一张冰【杀】②获得这些牌（X为你的体力值）",

yingyouming: "幽明",
yingyouming_info: "锁定技，①当你每回合首次成为其他角色使用牌的目标后，你观看其两张手牌并将其中一张置于牌堆顶。②当你每回合首次进入濒死状态时，你翻面并将体力恢复至一点，若伤害来源不为你，你将牌堆顶的牌当做【出其不意】对伤害来源使用，若此牌造成伤害，你重置武将牌。",

yingtiaofeng: "调风",
yingtiaofeng_info: "出牌阶段每种花色限一次，你可以展示所有手牌，并将一种花色的所有牌当作一张牌名字数相等的基本牌或普通锦囊牌使用，然后若以此法转化牌的数量不小于X，你摸X张牌。（X为你手牌花色数）",

yingjiwang: "脊望",
yingjiwang_info: "锁定技，当你的牌不因使用或打出而离开手牌区时，你展示之且你、当前回合角色和牌堆中所有与此牌花色相同的牌均视为【杀】直到回合结束。当你成为一张多目标牌的目标后，若此牌其他目标已损失体力值均不大于你，当前回合角色使用的下一张牌你作为目标额外执行一次。",

yingjulei: "炬泪",
yingjulei_info: "你可以横置视为使用或打出一张火【杀】/【火攻】或翻面使用或打出一张【酒】/【逐近弃远】，若当前回合角色或此牌目标角色拥有“尘”标记，你弃置其“尘”标记然后选择一项：①此牌不计入次数②重置武将牌。",

yingzhichen: "炙尘",
yingzhichen_info: "锁定技，每轮开始时，你的上家和下家获得“尘”标记。当你受到/造成伤害后，你令伤害来源/目标横置并获得“尘”标记，若当前回合角色横置或翻面，你重铸手牌中花色最多的所有牌。",
yingdangliao:"荡燎",
yingdangliao_info:"每回合每项限一次，每当你成为红色牌的目标后，你可令此牌点数±此牌目标数，并根据此牌点数执行：①若大于X，此牌结算后，你可以令此牌任意一名目标将其视为火【杀】或【火攻】对一名其他角色使用；②若等于X，你可以令此牌任意一名目标于此回合结束后随机执行一个额外的阶段（摸牌、出牌、弃牌）；③若小于X，你依次执行上面两项，然后你翻面；（X为存活游戏人数）",
clanjiantu: "蹇途",
clanjiantu_info: "转换技，锁定技，当你于回合内首次使用一种花色的单体目标牌指定手牌数小于你的角色时，此牌视为：阴：闪电；阳：过河拆桥；对其使用。",

clanduye: "笃谒",
clanduye_info: "出牌阶段，你可以将你或场上一张与“注”花色均不同的牌置于武将牌上，称为“注”，然后你令该牌所有者选择一项并移除之：①摸X张牌；②本回合及之后X个回合获得【謇谔】；③本轮结束后执行一个额外的阶段（X=1/2/3/4-判定/出牌/摸牌/弃牌）；④将一张“注”置于牌堆顶视为使用之；回合结束后，你将“注”置入其相应区域。（X为“注”的数量）",
niwochoulu: "仇戮",
niwochoulu_info: "每轮限一次，当你攻击范围的角色受到伤害后，若你不为来源，则你可对伤害来源使用一张无距离限制的【杀】，此【杀】无视防具。若此杀造成伤害，立刻中止所有结算结束本回合。",

niwoaojian: "骜剑",
niwoaojian_info: "每轮开始时，你从牌堆中获得一张【杀】和一个装备牌。你的【杀】和装备牌可以当任意【杀】使用或打出，且你对装备区牌不大于你的角色使用的【杀】伤害+1；当你使用的【杀】进入弃牌堆后，你摸攻击范围张牌，然后场上所有区域内没有与此【杀】花色相同的牌的其他角色技能失效直到回合结束。",

niwosuchen: "肃尘",
niwosuchen_info: "每轮限一次，当你成为其他角色【杀】或锦囊牌的目标时，你可以弃置一张【杀】，令此牌目标转移给使用者。然后若你体力值不大于其，你可以对其造成1点雷属性伤害。",

niwoyanliu: "掩锍",
niwoyanliu_info: "锁定技，当你使用单体伤害类卡牌即将造成伤害时，若你装备武器，目标需打出一张【杀】，否则此伤害+1。",

niwoxiangming: "飨名",
niwoxiangming_info: "每轮开始时，你可以亮出牌堆顶和牌堆底的各体力值张牌，获得其中的伤害类卡牌和武器牌（可选择是否装备），然后将其余的牌以任意顺序置于牌堆顶或牌堆底。",

niwoxuejiu: "血鹫",
niwoxuejiu_info: "锁定技，游戏开始时，你令所有玩家依次将牌堆底的一张牌明置置于其武将牌，称为“裂”。当你造成或受到伤害后，你将牌堆底的一张牌明置置于目标或伤害来源武将牌上，称为“裂”。每当有与当前回合角色的“裂”同花色的牌每回合首次进入弃牌堆时，或有与全场“裂”同名的牌进入弃牌堆时，你摸两张牌。",

niwoshulie: "疏裂",
niwoshulie_info: "每回合限一次，你可以将任意角色的红色/黑色“裂”当做【杀】/【无懈可击】使用或打出，然后你对其造成一点雷属性伤害。若该角色为你，你获得场上所有“裂”。",

niwoxiapo: "黠魄",
niwoxiapo_info: "锁定技，当你使用牌时，该牌所有目标横置；当你/其他角色响应其他角色/你一张牌时，你/其他角色重置。",

niwoshucai: "殊彩",
niwoshucai_info: "每轮每种花色各限一次，当你需要使用一张【杀】或【闪】时，你可以展示所有手牌，然后弃置一种花色的所有牌，视为使用一张【闪】或火【杀】。若你由此后手牌数为全场最低（或之一），你获得牌堆底的两张牌。",

niwozhengtu: "铮途",
niwozhengtu_info: "锁定技，你与你的上下家的距离始终为1，与除此之外其他所有角色距离为正无穷。你的装备牌可以当任意基本牌使用或打出，且当前回合角色无法使用、打出或弃置所有与此装备牌相同花色的牌直到回合结束。",

niwonilin: "逆鳞",
niwonilin_info: "每轮限一次，当你受到伤害后或出牌阶段，你可以摸X张牌然后将自己移出游戏，回合结束时，你移回游戏，并将随机一张本回合进入弃牌堆的一张装备置入你的空置装备区。（X为本技能本局的发动次数，最大为角色人数）",

niwoxungu: "寻古",
niwoxungu_info: "每轮开始时，若你的“风”数量不大于场上人数，你并进行判定直至判定牌花色首次相同，然后你获得其中所有装备牌和二次出现的同名判定牌，并将所有判定牌置于武将牌旁，称为“风”。每回合限一次，你可以视为使用或打出“风”已记录的一个牌名，然后你移除对应“风”。",

niwoxianwang: "衔望",
niwoxianwang_info: "锁定技，①当你首次使用或打出与“风”中相同牌名的实体牌时，移除对应“风”然后你令此牌额外执行一次；②其他角色无法响应你与你“风”花色相同的牌；③当你的“风”被移除后，你摸X张牌（X为已记录“风”中与被移除的此“风”相同类别的“风”数量）。",

niwoqianzhun: "千谆",
niwoqianzhun_info: "每回合限一次，出牌阶段或当你受到伤害后，你可以选择一名角色并选择一项：①视为使用或打出一个其技能描述中包含的牌名。②视为使用一张牌名字数为X的基本牌或普通锦囊牌。（X为其武将牌上技能标签数+1；包括所有三字标签以及“限N次”。N为不小于0的普通数字）",

niwobailan: "百览",
niwobailan_info: "每回合限一次，当你使用普通锦囊牌时或响应一张牌后，你可以选择一名角色并选择一项：①令其一个符合条件的技能添加或删除一个标签（可修改的标签包括锁定技，限定技和每回合限一次，若你选择限定技，此技能失效直到你体力值变为1）。②令其技能描述含有“限N次”标签的技能本轮发动次数+1或-1（至少为0）。",

niwoyinbing: "饮冰",
niwoyinbing_info: "每回合限一次，当你受到或造成伤害后，受伤角色可视为对伤害来源使用一张冰【杀】，此【杀】无视防具。若此【杀】结算后，若：①此【杀】结算过程中没有角色受到伤害，你摸两张牌并失去一点体力值；②若有角色因受到此【杀】伤害而死亡，你可以令一名其他角色获得本技能。",

niwotalan: "踏澜",
niwotalan_tag: "踏澜",
niwotalan_info: "锁定技，你于摸牌阶段外获得的牌不计入使用次数和手牌上限。",

niwoyuhe: "逾壑",
niwoyuhe_info: "每轮每种牌名限一次，当你需要使用一张基本牌时，你可以展示两位相邻座次角色的各一张牌，若这两张牌颜色相同，视为你使用之，若这两张牌类别相同，你获得之，然后你摸X张牌。（X为这两个角色手牌数较少一方的手牌数）",

            "chi_lingmeng": "泠梦",
            "chi_lingmeng_info": "锁定技，①你造成的伤害均视为冰属性伤害。②当你即将受到有实体牌的伤害时，若你有牌名字数与此牌相等的牌，你展示之并防止此伤害，然后你获得此牌，伤害来源获得你展示的牌。③当你造成有实体牌的伤害后，你获得目标区域内所有与此牌牌名字数相等的牌。",
            "chi_lingmeng_prevent": "泠梦",
            "chi_lingmeng_prevent_info": "当你即将受到有实体牌的伤害时，若你有牌名字数与造成此伤害的牌相等的牌，你展示之并防止此伤害，然后你获得造成伤害的牌，伤害来源获得你展示的牌。",
            "chi_lingmeng_gain": "泠梦",
            "chi_lingmeng_gain_info": "当你造成有实体牌的伤害后，你获得目标区域内所有与造成伤害的牌的牌名字数相等的牌。",
            "chi_shubi": "舒髀",
            "chi_shubi_info": "锁定技，你于每回合内使用的第一张牌即将生效时，你按照牌名字数为包含此牌的接下来四张牌选择一条路径（①不计入使用次数②执行2次③目标数+1）：<br>递增：①-②-③-执行X次；<br>递减：②-③-①-目标数+X；<br>当你使用一张牌即将生效时，该流程即将失效，你弃置X张牌且本回合该技能失效。若此牌生效前X等于你的体力值，此牌仍按照原流程执行。（X为本流程中你已使用的牌数，不包括在流程中即将生效的牌，且至少为1）",
            "chi_shubi_effect": "舒髀",
            "chi_shubi_mod": "舒髀",
            "chi_shubi_double": "舒髀",
            "chi_shubi_multi": "舒髀",
            "chi_shubi_invalid": "舒髀失效",
            "chi_shubi_mark": "舒髀",
            "chi_shubi_clear": "舒髀",
            "chi_shennie": "神臬",
            "chi_shennie_info": "锁定技，①你的锦囊牌始终为连接状态。你的连接牌除使用外无法弃置、不计入手牌和使用次数上限且无距离限制。②当你受到/造成伤害后，你连接伤害来源/目标一张手牌。③当一张连接牌因使用或打出而进入弃牌堆后，你摸一张牌，当前回合角色摸等同于此牌牌名字数张牌，且全场角色本回合无法打出或使用牌名字数与此牌相等的牌。",
            "chi_yingshan": "映山",
            "chi_yingshan_info": "每回合限一次，出牌阶段或当你受到伤害后，你可以连接你的一张手牌。若此牌牌名字数与你体力值相等，你可以选择一项：恢复一点体力值、刷新“映山”或移除本回合的牌名字数禁用。",
            "chi_yingshan_damage": "映山",
            "_shennie_global": "神臬",
            "_shennie_discard": "神臬",
            "chi_shennie_ban": "神臬",
            "chi_aojian": "骜剑",
            "chi_aojian_info": "每轮开始时，你从牌堆中获得一张【杀】和一个武器牌。你的【杀】和装备牌可以当任意【杀】使用或打出。你使用【杀】时，此【杀】伤害+X；当此【杀】的实体牌进入弃牌堆后，你摸X张牌，然后场上所有区域内没有与此【杀】花色相同牌的其他角色技能失效直到回合结束（X为你的攻击范围）",
            "chi_suchen": "肃尘",
            "chi_suchen_info": "每轮限X次，当你成为其他角色【杀】或锦囊牌的目标时，你可以弃置一张【杀】，令此牌目标转移给使用者。然后若你体力值不大于X，你可以对其造成1点雷属性伤害。",
            clanliaozhi: "燎志",
            clanzhenjie: "赈节",
            clantongmen: "通门",
            clanjianlei: "渐擂",
            clannige: "逆戈",
            clanyanzhi: "奄志",
            clanjishu: "疾殳",
            clanxinmai: "薪脉",
            clanyusui: "毓髓",
            clancixuan: "辞玄",
            clanqihai: "歧海",
            clanrenfu: "荏腹",
            clanyanzu: "衍族",
            clandulie: "犊烈",
            clanjiaotan: "皦谈",
            clanyouxi:"游袭",
            "clanliaozhi_info": "出牌阶段限一次，你可以与至多X名角色同时拼点，拼点赢者视为依次对拼点败者使用一张火【杀】。若你在此过程中受到或造成伤害，你摸X张牌。（X为你已损失的体力值）",
            "clanzhenjie_info": "锁定技，你造成属性伤害后失去一点体力值并获得两点护甲。与你距离不大于1的角色受到属性伤害后，你观看牌堆顶两张牌并令你或其使用其中可以使用的牌。",
            "clantongmen_info": "宗族技，“谯郡夏侯氏”在同族角色的回合时，其具有“限一次”标签的技能的触发时机增加“当你首次造成伤害时”和“当你首次使用普通锦囊牌时”。",
     
clanyouxi_info: "每回合各限一次，你于回合外响应一张牌后或受到伤害后，你可以摸一张牌并使用一张【杀】（无距离次数限制）",

clanjianlei_info: "你可以将你一个区域的所有牌（X张）当做一张雷【杀】使用或打出，若此【杀】造成伤害，你可以摸X张牌或获得目标一张牌，若其中有装备牌则你可以使用之，然后根据转化区域跳过下个对应阶段：手牌区-判定阶段；装备区-弃牌阶段；判定区-摸牌阶段。",

            "clannige_info": "蜀势力技，锁定技，你使用虚拟牌/实体卡牌造成伤害后，你失去一点体力值并令该伤害+X/你恢复一点体力值。然后你摸X张牌。（X为你的攻击范围与伤害目标攻击范围之差的绝对值，且至少为1）",
            "clanyanzhi_info": "魏势力技，锁定技，当你的体力值不大于Y时，你使用点数不小于Y的牌无次数限制，且使用后摸Y张牌，你使用点数大于Y的牌时无距离限制。大于Y时，你失去一点体力上限，失去体力值至Y点，摸Y张牌，然后将势力变更为“蜀”。",
            "clanjishu_info": "出牌阶段限一次，你可以令一名角色摸Y张牌并弃置任意张牌，若其弃置的牌的描述中带有：①杀，其视为使用一张无距离限制且无视防具的火【杀】；②数字，该角色恢复一点体力值；③牌：其获得其他角色一张牌。④伤害：随机从弃牌堆获得一张伤害类锦囊牌。（Y为场上技能描述带有“限一次”的角色数）",
            "clanxinmai_info": "出牌阶段限一次，你可以令一名角色获得本回合进入弃牌堆的【杀】，然后令其选择一项：①你对其造成一点雷属性伤害；②其所有非属性【杀】视为【无懈可击】直到其下回合结束。",
            "clanyusui_info": "当有角色受到属性伤害后，你可以与其各摸一张牌；当有角色跳过任意阶段后，你可以弃置所有手牌并保留一张手牌，令其于本回合后执行一个额外的被跳过的阶段。",
            "clancixuan_info": "出牌阶段限一次，你可以选择一项：①选择若干张牌置于你的武将牌上，称为“玄”。②获得至多三张“玄”，然后你可以视为使用一张牌名字数等于X的一张基本牌或普通锦囊牌。（X为“玄”的数量）",
            "clanqihai_info": "锁定技，当你受到/造成伤害后，你令伤害来源/目标选择一项：①将一张“玄”区没有的类型的牌置于“玄”区；②移除一张“玄”，视为对其使用之（需可使用）；若均不满足，其展示所有手牌，你获得其中一种花色的所有牌，然后防止此伤害。",
            "clanrenfu_info": "锁定技，当你于回合内首次使用锦囊牌时，你摸X张牌。若X不大于2，你受到本回合角色的一点雷属性伤害，若不为你的回合，你移动当前回合角色和你场上的一张牌。（X为本回合你使用基本牌的数量）",
            "clanyanzu_info": "每回合限一次，出牌阶段或当你受到伤害时，你可以使用本回合进入弃牌堆的一张牌（无距离限制），然后若其牌名字数不小于你的体力值，你摸X张牌。（X为场上技能描述带有“限一次”的非重复技能数）",            "clandulie_info": "锁定技，你于本局游戏造成和受到的首次伤害翻倍，均触发后你失去本技能。",
            "clanjiaotan_info": "出牌阶段限一次，你可以令任意名技能数或体力值大于你的角色议事。若议事结果为：红色/黑色，你可以观看一名意见为黑色/红色角色的手牌，并使用其议事牌。若此技能先前发动过，所有角色展示议事结果时，你可以额外增加一张先前议事结果颜色的牌。你可以选择一名参加议事的角色，若其手牌中有与此次议事结果相反颜色的牌，你摸两张牌。",
            chixingjue: "醒釂",
            "chixingjue_info": "锁定技，你的回合内/外所有角色合法目标数大于/小于其牌名字数的手牌均视为【酒】。当一种花色的牌失去【醒釂】效果后，本回合内这些牌无次数限制且不计入手牌上限。你每失去一张红色【雍赯】牌，你展示所有手牌然后摸X张牌。（X为你手牌中红色【雍赯】牌数量）",
            chiyongtang: "雍赯",
            chiyongtang_tag: "雍赯",
            "chiyongtang_info": "锁定技，当你处于【酒】状态且你使用红色非装备牌时，若此牌目标数不大于2，你需进行判定：若花色与此牌花色不同/相同，则额外指定此牌目标下家/上家角色，然后你脱离【酒】 状态，且本回合所有与判定牌相同花色的牌失去【醒釂】效果。",
            clanjieji: "借笈",
            "clanjieji_info": "出牌阶段限一次，你可以观看一名手牌数不小于你体力值角色的手牌，并选择你与其其中合法目标数相同的一张牌，然后你将此牌当做一张合法目标数相同的基本牌或普通锦囊牌使用。此牌结算后其摸X张牌。你于本回合内使用到此牌结算后的第X张牌后，此技能视为未发动过。（X为此牌合法目标数）",
            clanshuji: "疏纪",
            "clanshuji_info": "当你成为一张多目标锦囊牌的目标后，若此牌的合法目标数不小于你的手牌数，你可以弃置半数手牌（向上取整），并将此锦囊牌的目标数调整至与你手牌数相同。",
            yingtianshi: "恬适",
            "yingtianshi_info": "锁定技，其他角色于回合内对你使用的首张牌名字数不小于你体力值的牌对你无效；其他角色于回合内使用的首张牌名字数不小于X的非装备牌结算后，你视为使用之。（X为全场技能描述拥有“锁定技”的技能数）",
            yingchongming: "崇铭",
            "yingchongming_info": "每名角色的回合结束阶段，若你本回合使用过牌且使用的上一张牌可用，你可以将牌名字数之和不小于四的任意张牌当做此牌使用，然后你摸X张牌。（X为全场技能描述拥有“锁定技”的技能数且至多为你的体力值）",
                 "chiqianwen": "骞闻",
            "chiqianwen_info": "转换技，每回合限一次。阳：你可以将牌堆顶的一张牌当任意名字字数相同的基本牌或普通锦囊牌使用或打出。阴：你可以将牌堆底的一张牌当任意名字字数相同的基本牌或普通锦囊牌使用或打出。",
            "chijuanxiang": "眷乡",
            "chijuanxiang_info": "当你于出牌阶段使用的牌名数等于你的手牌数时，你摸一张牌，重置“骞闻”，然后可以将一张手牌置于牌堆顶或牌堆底。",
          chi_mengmo: "幪谟",
chi_mengmo_info: "每轮每种牌名限一次，当你使用的牌即将生效时，你可以将此牌牌面描述上的任意牌名用与之牌名字数相等的其余牌名替代之。",

chi_pijian: "睥间",
chi_pijian_info: "当你受到伤害后，你可为“幪谟”描述中的“牌名”增添“数字”或“指定角色”对应平行选项。若二者均已存在，你增加一点体力上限并将体力值恢复至体力上限，然后移除此技能。",
chikonglan: "空阑",
chikonglan_info: "锁定技，你的黑桃牌与点数小于场上人数的牌不计入手牌上限；当你成为一张牌的目标后，若此牌牌名字数你本轮未以此法记录过，你记录之并获得相同张【影】，轮次刷新后你清除记录。",

chixuanzhao: "悬照",
chixuanzhao_info: "转换技，①你可以将X张【影】当一张牌名字数为X的基本牌或普通锦囊牌使用或打出；②你可以将X张【影】当一张合法目标数为X的基本牌或普通锦囊牌使用或打出。",

chixiege: "携阁",
chixiege_info: "每轮开始时，你可令一名角色及其上家于本轮的一个数值+1。①出牌阶段使用【杀】次数②摸牌阶段摸牌数③受到或造成伤害后摸一张牌④单体伤害牌的可选目标；若你选择的选项与上次相同，此数值+1。",

chishangjiao: "尚椒",
chishangjiao_tag: "尚椒",
chishangjiao_info: "锁定技，①当一张合法目标数不大于本轮此选项发动次数的牌进入弃牌堆时，你获得之；②当你成为一张牌的目标后，若此牌合法目标数小于/大于等于牌名字数，所有目标摸/弃差值张牌（至多两张）。③你于摸牌阶段外获得的牌不计入本轮手牌上限。",

chihuangli: "篁礼",
chihuangli_info: "锁定技，准备阶段或当你受到伤害后，你展示牌堆顶或牌堆底两张牌。若这些牌:颜色相同:你获得这些牌并卜算3；类型相同:当前回合角色使用的下一张牌不计入次数且无距离限制；花色均不相同:你令一名角色恢复一点体力值；类型均不相同:你从牌堆底摸两倍数量的牌。若均不满足，当前回合角色失去一点体力且重铸所有牌。",

chisusu: "簌肃",
chisusu_info: "锁定技，当你于每个回合内首次使用非基本牌后，你于本回合使用的下一张牌增加一个目标。当你于每个回合内首次使用基本牌后，你于本回合使用的下一张牌执行两次。",

chiquge: "阒阁",
chiquge_info: "锁定技，若你下面属性发生变化后，你摸一张牌且：①体力值等于体力上限，你本回合与其他角色距离-1并令“睄睒”任一选项+1；②手牌数等于手牌上限，你视为使用一张不计入次数的火【杀】；③“睄睒”任意选项相等：你恢复其中相等的被移除项。",
chishaoshan: "睄睒",
chishaoshan_info: "转换技，出牌阶段，你可以选择两项并于本回合移除之，交换其属性对应的数值，未选选项下次选择后对应属性+1：①体力值；②手牌上限；③出杀次数；④体力上限。若交换后有数值X溢出，你选择一项：<br>阴：摸X张牌或令本次未被选择的一项-X。<br>阳：弃X张牌或令本次未被选择的一项+X。",
chisunqi: "榫棋",
chisunqi_info: "当你于摸牌阶段外获得牌时，你可以将其中任意张置于你的武将牌上，称为“棋”。出牌阶段限一次，你可以获得任意张“棋”。每个回合结束时，若“棋”的数量大于场上人数，你失去一点体力值。",

chifenqing: "焚情",
chifenqing_info: "出牌阶段限一次，你可以选择一名其他角色，你与其横置并分别选择一项：①令对方受到来自你的一点火属性伤害②令对方翻面③背水：若只有一名角色选择该选项则交换双方效果。若你与其选择相同选择则均不执行且你与其各恢复一点体力值。",

chisuhen: "夙痕",
chisuhen_info: "锁定技，①每回合限一次，当你受到或造成属性伤害后，伤害来源重置其武将牌，然后你视为对伤害来源或目标发动一次“焚情”；②每个回合结束时，若当前回合角色于本回合内受到或造成过属性伤害，你可以观看牌堆顶两张牌并使用其中可以使用的牌。",

chiyuanque: "缘阙",
chiyuanque_info: "觉醒技，当你累计造成或受到不小于三点属性伤害时，你将体力值恢复至体力上限，失去“焚情”和“夙痕”，然后随机获得技能池中两个技能。若此时为你的回合外，你额外获得一个技能。",

chijueqing: "绝情",
chijueqing_info: "锁定技，当你即将造成伤害时，你选择一项：1、此次伤害视为失去体力；2、你失去1点体力，令此伤害值翻倍。",

chiejue: "扼绝",
chiejue_info: "锁定技，当你/攻击范围不包含你的角色使用【杀】或【决斗】即将对攻击范围不包含你的角色/你造成伤害时，此伤害+1。",

chishangshi: "伤逝",
chishangshi_info: "当你受到伤害时，你可以弃置一张牌。当你的手牌数小于X后，你可以将手牌摸至X张。（X为你已损失体力值）",

_clanjieji_count:"借笈",



        },
        intro: "",
        author: "公冶",
        diskURL: "",
        forumURL: "",
        version: "1.0",
    },
    intro: "",
    author: "",
    diskURL: "",
    forumURL: "",
    version: "",
},files:{"character":["clan_luyusheng.jpg","clan_wangqian.jpg","clan_xunyue.jpg","ying_wanglun.jpg","gz_jue_yangyan.jpg","gz_shantao.jpg","gz_jiananfeng.jpg","gz_luji.jpg","gz_peixiu.jpg","gz_qiaozhou.jpg","gz_huoyi.jpg","gz_jue_yangzhi.jpg","gz_zhouchu.jpg","gz_zhugejing.jpg","gz_jue_yangjun.jpg","gz_zhanghua.jpg","chi_huangyueying.jpg","chi_caiwenji.jpg","clan_xunxu.jpg","chi_jiaxu.jpg"],"card":[],"skill":[],"audio":[]},connect:false} 
};