game.import("extension", function(lib, game, ui, get, ai, _status) {
  return {
    name: "鹰击长空",
    editable: false,
    
    precontent: function() {

    },
    
    content: function(config, pack) {
      if (!lib.characterPack.mode_guozhan) return;
// 模仿他的定义后，加入这段自动补全路径的代码
        // ==================== C. 批量注入图片路径 (防崩版) ====================
        
        // 1. 这里填你的武将ID列表
var imgP = "ext:鹰击长空/image/";


    // ==================== A. 魏势力 ====================
    lib.characterPack.mode_guozhan.gz_wangyi = ["female", "wei", 3, ["gz_zhenlie", "gz_miji"], [imgP + "gz_wangyi.jpg"]];
    lib.characterPack.mode_guozhan.gz_renwan = ["female", "wei", 3, ["gz_pizou", "gz_juansui"], [imgP + "gz_renwan.jpg"]];

    // ==================== B. 蜀势力 ====================
    lib.characterPack.mode_guozhan.gz_zhugezhan = ["male", "shu", 4, ["gz_dishang", "gz_zuilun"], [imgP + "gz_zhugezhan.jpg"]];
    lib.characterPack.mode_guozhan.gz_xiahoushi = ["female", "shu", 3, ["gz_qiaoshi", "gz_yanyu"], [imgP + "gz_xiahoushi.jpg"]];
    lib.characterPack.mode_guozhan.gz_feng_maliang = ["male", "shu", 3, ["gz_zicai", "gz_zhengmu"], [imgP + "gz_feng_maliang.jpg"]];

    // ==================== C. 吴势力 ====================
    lib.characterPack.mode_guozhan.gz_zhanghuai = ["female", "wu", 3, ["gz_laoyan", "gz_jueyan"], [imgP + "gz_zhanghuai.jpg"]];
    lib.characterPack.mode_guozhan.gz_heqi = ["male", "wu", 4, ["gz_junwei"], [imgP + "gz_heqi.jpg"]];
    lib.characterPack.mode_guozhan.gz_bulianshi = ["female", "wu", 3, ["gz_anxu", "gz_zhuiyi"], [imgP + "gz_bulianshi.jpg"]];

    // ==================== D. 群势力 ====================
    lib.characterPack.mode_guozhan.gz_yuantan = ["male", "qun", 4, ["gz_qiaosi", "gz_baizu"], [imgP + "gz_yuantan.jpg"]];
    lib.characterPack.mode_guozhan.gz_feng_huangyueying = ["female", "qun", 3, ["gz_ruxin", "gz_linglong"], [imgP + "gz_feng_huangyueying.jpg"]];
    lib.characterPack.mode_guozhan.gz_gongsunxiu = ["male", "qun", 4, ["gz_niejiang", "gz_kuizhen"], [imgP + "gz_gongsunxiu.jpg"]];

    // ==================== E. 晋势力 (单势力) ====================
    lib.characterPack.mode_guozhan.gz_jue_yangyan = ["female", "jin", 3, ["gz_xianwan", "gz_jiyuan"], [imgP + "gz_jue_yangyan.jpg"]];
    lib.characterPack.mode_guozhan.gz_jue_yangjun = ["male", "ye", 4, ["gz_guishang", "gz_niubi"], [imgP + "gz_jue_yangjun.jpg"]];
    lib.characterPack.mode_guozhan.gz_jue_yangzhi = ["female", "jin", 3, ["gz_yisang", "gz_jiubo"], [imgP + "gz_jue_yangzhi.jpg"]];
    lib.characterPack.mode_guozhan.gz_jiananfeng = ["female", "jin", 3, ["gz_xugu", "gz_xionglie"], [imgP + "gz_jiananfeng.jpg"]];
    lib.characterPack.mode_guozhan.gz_kuaishi = ["female", "jin", 3, ["gz_hejue", "gz_hexi"], [imgP + "gz_kuaishi.jpg"]];
    lib.characterPack.mode_guozhan.gz_xuwen = ["female", "jin", 3, ["gz_fuhui", "gz_mohua"], [imgP + "gz_xuwen.jpg"]];

    // ==================== F. 晋势力 (双势力 - 使用 doublegroup 标签) ====================
    // 晋 & 魏
    lib.characterPack.mode_guozhan.gz_zhanghua = ["male", "jin", 4, ["gz_juanzhi", "gz_yinbing"], ["doublegroup:jin:wei", imgP + "gz_zhanghua.jpg"]];
    lib.characterPack.mode_guozhan.gz_shantao = ["male", "jin", 3, ["gz_linzhe", "gz_yamai"], ["doublegroup:jin:wei", imgP + "gz_shantao.jpg"]];

    // 晋 & 吴
    lib.characterPack.mode_guozhan.gz_lujii = ["male", "jin", 3, ["gz_lingzhi", "gz_ruluo"], ["doublegroup:jin:wu", imgP + "gz_lujii.jpg"]];
    lib.characterPack.mode_guozhan.gz_zhouchu = ["male", "jin", 4, ["gz_xunfeng", "gz_zhangming"], ["doublegroup:jin:wu", imgP + "gz_zhouchu.jpg"]];

    // 晋 & 群
    lib.characterPack.mode_guozhan.gz_peixiu = ["male", "jin", 3, ["gz_juezhi", "gz_xingtu"], ["doublegroup:jin:qun", imgP + "gz_peixiu.jpg"]];
    lib.characterPack.mode_guozhan.gz_zhugejing = ["male", "jin", 4, ["gz_yanzuo", "gz_pijian", "gz_zeyu"], ["doublegroup:jin:qun", imgP + "gz_zhugejing.jpg"]];

    // 晋 & 蜀
    lib.characterPack.mode_guozhan.gz_qiaozhou = ["male", "jin", 3, ["gz_baoguo", "gz_yuandao", "gz_yunxing"], ["doublegroup:jin:shu", imgP + "gz_qiaozhou.jpg"]];
    lib.characterPack.mode_guozhan.gz_huoyi = ["male", "jin", 4, ["gz_liefa"], ["doublegroup:jin:shu", imgP + "gz_huoyi.jpg"]];

      // 中立势力（如果有）
 
        lib.characterPack.mode_guozhan.gz_zhongli_xushu = ["male", "zhongli", 4, ["gz_jiange", "gz_yinyu"], [imgP + "gz_zhongli_xushu.jpg"]];
        lib.characterPack.mode_guozhan.gz_zhongli_jiaxu = ["male", "zhongli", 3, ["gz_qingshi", "gz_shuge", "gz_anshi"], [imgP + "gz_zhongli_jiaxu.jpg"]];
        lib.characterPack.mode_guozhan.gz_zhongli_xushao = ["male", "zhongli", 3, ["gz_yingmen", "gz_pingjian"], [imgP + "gz_zhongli_xushao.jpg"]];
        lib.characterPack.mode_guozhan.gz_zhongli_zhaoe = ["female", "zhongli", 3, ["gz_yanshi", "gz_xinren"], [imgP + "gz_zhongli_zhaoe.jpg"]];
        lib.characterPack.mode_guozhan.gz_zhongli_lusu = ["male", "zhongli", 3, ["gz_xiangkui", "gz_yangming"], [imgP + "gz_zhongli_lusu.jpg"]];
    

      // ========== 3. 武将名称翻译 ==========
      lib.translate.gz_xuncan = "荀粲";
      lib.translate.gz_zhugezhan = "诸葛瞻";
      lib.translate.gz_zhanghuai = "张怀";
      lib.translate.gz_yuantan = "袁谭";
      lib.translate.gz_jiananfeng = "贾南风";
      lib.translate.gz_kuaishi = "蒯氏";
      lib.translate.gz_xuwen = "徐妏";
      lib.translate.gz_xiahoushi = "夏侯涓";
      lib.translate.gz_wangyi = "王异";
      lib.translate.gz_heqi = "贺齐";
      lib.translate.gz_feng_maliang = "马良";
      lib.translate.gz_feng_huangyueying = "黄月英";
      lib.translate.gz_renwan = "任婉";
      lib.translate.gz_bulianshi = "步练师";
      lib.translate.gz_gongsunxiu = "公孙修";
      lib.translate.gz_jue_yangyan = "杨艳";
      lib.translate.gz_jue_yangjun = "杨骏";
      lib.translate.gz_jue_yangzhi = "杨芷";
      lib.translate.gz_lujii = "陆机";
      lib.translate.gz_shantao = "山涛";
      lib.translate.gz_zhanghua = "张华";
      lib.translate.gz_zhouchu = "周处";
      lib.translate.gz_peixiu = "裴秀";
      lib.translate.gz_zhugejing = "诸葛京";
      lib.translate.gz_qiaozhou = "谯周";
      lib.translate.gz_huoyi = "霍弋";

      
        lib.translate.gz_zhongli_xushu = "徐庶";
        lib.translate.gz_zhongli_jiaxu = "贾诩";
        lib.translate.gz_zhongli_xushao = "许劭";
        lib.translate.gz_zhongli_zhaoe = "赵娥";
        lib.translate.gz_zhongli_lusu = "鲁肃";


                lib.characterSort.mode_guozhan.fengsuiliaoyuan= ["gz_xuncan", "gz_zhugezhan", "gz_zhanghuai", "gz_yuantan", "gz_jiananfeng","gz_kuaishi","gz_xuwen","gz_feng_maliang","gz_feng_huangyueying","gz_xiahoushi","gz_wangyi","gz_heqi","gz_renwan","gz_bulianshi","gz_gongsunxiu"];
                lib.characterSort.mode_guozhan.buchenpianjin =["gz_jue_yangyan", "gz_jue_yangzhi", "gz_shantao", "gz_zhanghua", "gz_lujii", "gz_zhouchu", "gz_peixiu", "gz_zhugejing", "gz_qiaozhou", "gz_huoyi","gz_jue_yangjun"];
                                lib.characterSort.mode_guozhan.zhonglizhe =["gz_zhongli_xushu", "gz_zhongli_xushao","gz_zhongli_lusu","gz_zhongli_zhaoe","gz_zhongli_jiaxu"];


lib.perfectPair.yuantan=['yuanshao']
lib.perfectPair.xushu=['re_xushu']
lib.perfectPair.renwan=['zhenji']
lib.perfectPair.maliang=['masu']
lib.perfectPair.xiahoushi=['zhangfei']
lib.perfectPair.zhugezhan=['zhugeliang']
lib.perfectPair.zhanghuai=['lukang']
lib.perfectPair.guanyinping=['guanyu']
lib.perfectPair.gongsunxiu=['gongsunyuan']
lib.perfectPair.jiananfeng=['jin_jiachong']
lib.perfectPair.kuaishi=['sunxiù']
lib.perfectPair.jue_yangwan=['jue_yangyan',"jue_yangjun","yangjun"]
lib.perfectPair.lujii=['lukang']
lib.perfectPair.zhanghua=['lujii',"zhouchu"]
lib.perfectPair.shantao=['peixiu',"zhugejing"]
lib.perfectPair.qiaozhou=['liushan']
lib.perfectPair.bulianshi=['sunquan']


    },

    help: {},
    config: {
        
    },
    package: {
      character: {

        character:{
	gz_jue_yangjun:{
  sex: "male",
  group: "ye",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  hasSkinInGuozhan: true,
  skills: ["gz_guishang","gz_niubi"],
      dieAudios: ["gz_yangjun"],
  img:"mode/guozhan/src/image/gz_jue_yangjun.jpg",
},
gz_jue_yangyan: {
  sex: "female",
  group: "jin",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  hasSkinInGuozhan: true,
  skills: ["gz_xianwan","gz_jiyuan"],
  img: "extension/鹰击长空/image/gz_jue_yangyan.jpg",
  dieAudios: ["yangyan"],
},

gz_lujii: {
  sex: "male",
  group: "wu",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  hasSkinInGuozhan: true,
  doublegroup: ["jin","wu"],
  trashBin: [
    "des:陆机（261－303），字士衡，吴郡吴县（今江苏苏州）人，西晋文学家、书法家，孙吴丞相陆逊之孙、大司马陆抗之子，与其弟陆云合称“二陆”。孙吴灭亡后出仕晋朝司马氏政权，曾历任平原内史、祭酒、著作郎等职，世称“陆平原”。后死于“八王之乱”，被夷三族。他“少有奇才，文章冠世”（《晋书·陆机传》），与弟陆云俱为中国西晋时期著名文学家，被誉为“太康之英”。陆机还是一位杰出的书法家，他的《平复帖》是中国古代存世最早的名人书法真迹。"
  ],
  skills: ["gz_lingzhi","gz_ruluo"],
  img: "extension/鹰击长空/image/gz_lujii.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_lujii.mp3"],
},

gz_shantao: {
  sex: "male",
  group: "jin",
  doublegroup: ["jin","wei"],
  hp: 3,
  maxHp: 3,
  hujia: 0,
  hasSkinInGuozhan: true,
  trashBin: [
    "des:山涛（205年－283年3月3日），字巨源，河内郡怀县（今河南武陟西）人。三国至西晋时期官员、玄学家、名士，“竹林七贤”之一。[1][4]山涛早年家贫，喜好读《老子》《庄子》，因志同道合与嵇康、吕安、阮籍交好。他在四十岁时入仕，后因不愿卷入政党之争弃官归隐。"
  ],
  skills: ["gz_linzhe","gz_yamai"],
  img: "extension/鹰击长空/image/gz_shantao.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_shantao.mp3"],
},

gz_zhanghua: {
  sex: "male",
  group: "jin",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  hasSkinInGuozhan: true,
  doublegroup: ["jin","wei"],
  skills: ["gz_juanzhi","gz_yinbing"],
  img: "extension/鹰击长空/image/gz_zhanghua.jpg",
  dieAudios: ["zhanghua"],
},

gz_jiananfeng: {
  sex: "female",
  group: "jin",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  hasSkinInGuozhan: true,
  skills: ["gz_xugu","gz_xionglie"],
  img: "extension/鹰击长空/image/gz_jiananfeng.jpg",
  dieAudios: ["jsrg_jiananfeng"],
},

gz_peixiu: {
  sex: "male",
  group: "qun",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  hasSkinInGuozhan: true,
  doublegroup: ["jin","qun"],
  skills: ["gz_juezhi","gz_xingtu"],
  img: "extension/鹰击长空/image/gz_peixiu.jpg",
  dieAudios: ["peixiu"],
},

gz_zhugejing: {
  sex: "male",
  group: "qun",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  hasSkinInGuozhan: true,
  doublegroup: ["jin","qun"],
  skills: ["gz_yanzuo","gz_pijian","gz_zeyu"],
  img: "extension/鹰击长空/image/gz_zhugejing.jpg",
  dieAudios: ["zhugejing"],
},

gz_qiaozhou: {
  sex: "male",
  group: "shu",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  hasSkinInGuozhan: true,
  doublegroup: ["jin","shu"],
  skills: ["gz_baoguo","gz_yuandao","gz_yunxing"],
  img: "extension/鹰击长空/image/gz_qiaozhou.jpg",
  dieAudios: ["qiaozhou"],
},

gz_huoyi: {
  sex: "male",
  group: "shu",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  trashBin: [
    "des:  霍弋，字绍先，南郡枝江（今湖北省枝江市）人，三国时期蜀汉至西晋初时将领，蜀汉将领霍峻之子。刘备时为太子舍人。后主登基为谒者。诸葛亮北驻汉中时用为丞相府记室，诸葛亮死后为黄门侍郎，刘禅立太子后为中庶子。尽言规谏太子，甚为得体。后永昌郡蛮夷作乱，刘禅以霍弋领永昌太守，率军讨伐，斩其豪帅，郡界宁静之后迁监军翊军将军，领建宁太守，统南中诸郡。景耀六年（263年），进号安南将军。邓艾偷袭阴平，霍弋想率军救援成都，但刘禅以成都已有准备，不准，后刘禅投降，霍弋在得知司马氏善待刘禅后，方才率领南中六郡投降。降晋后仍为南中都督，平定交阯、日南、九真三郡，功封列侯。 "
  ],
  hasSkinInGuozhan: true,
  doublegroup: ["jin","shu"],
  skills: ["gz_liefa"],
  img: "extension/鹰击长空/image/gz_huoyi.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_huoyi.mp3"],
},

gz_zhouchu: {
  sex: "male",
  group: "wu",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  hasSkinInGuozhan: true,
  doublegroup: ["jin","wu"],
  skills: ["gz_xunfeng","gz_zhangming"],
  img: "extension/鹰击长空/image/gz_zhouchu.jpg",
  dieAudios: ["jin_zhouchu"],
},

gz_jue_yangzhi: {
  sex: "female",
  group: "jin",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_yisang","gz_jiubo"],
  dieAudios: ["yangzhi"],
  img: "extension/鹰击长空/image/gz_jue_yangzhi.jpg",
},

gz_zhugezhan: {
  sex: "male",
  group: "shu",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  skills: ["gz_dishang","gz_zuilun"],
  img: "extension/鹰击长空/image/gz_zhugezhan.jpg",
},

gz_zhanghuai: {
  sex: "female",
  group: "wu",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_laoyan","gz_jueyan"],
  dieAudios: ["zhanghuai"],
  img: "extension/鹰击长空/image/gz_zhanghuai.jpg",
},

gz_xuncan: {
  sex: "male",
  group: "wei",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_yundao","gz_youming"],
  dieAudios: ["clan_xuncan"],
  img: "extension/鹰击长空/image/gz_xuncan.jpg",
},

gz_yuantan: {
  sex: "male",
  group: "qun",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  skills: ["gz_qiaosi","gz_baizu"],
  dieAudios: ["tw_yuantan"],
  img: "extension/鹰击长空/image/gz_yuantan.jpg",
},

gz_kuaishi: {
  sex: "female",
  group: "jin",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_hejue","gz_hexi"],
  trashBin: ["des:蒯夫人（？—？），三国荆州襄阳人。是魏国南阳太守蒯钧之女，其外祖父则是魏国重臣王肃，故蒯氏也是晋武帝的姨表妹。后于泰始年间嫁于孙秀为妻。  泰始六年（公元270年），吴国前将军孙秀投奔晋国，晋武帝厚待他，就任命孙秀为骠骑将军、交州牧、开府仪同三司，封会稽公，并将自己的表妹蒯氏许配给他，夫妻感情很好。  蒯夫人曾因为妒忌，故而辱骂孙秀为“貉子”，孙秀听后心中大为不平，于是从此不再进入内室。蒯夫人因而后悔自责，并向表兄晋武帝求救。恰好是时遇上武帝大赦天下，群臣都入朝觐见。朝见完毕，群臣都退下了，武帝却请孙秀单独留下，并从容说道：“天下旷荡，蒯夫人可得从其例不？”孙秀听后就解下头冠，向武帝谢罪。而蒯夫人与孙秀从此和好如初。"],
  img: "extension/鹰击长空/image/gz_kuaishi.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_kuaishi.mp3"],
},

gz_xuwen: {
  sex: "female",
  group: "jin",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_fuhui","gz_mohua"],
  trashBin: ["des:徐妏，三国时期名将王濬之妻，丹青妙手徐邈之女。徐妏继承父学，尤擅丹青之道，作画甚至到了以假乱真的程度，还擅长调配色彩。"],
  img: "extension/鹰击长空/image/gz_xuwen.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_xuwen.mp3"],
},

gz_xiahoushi: {
  sex: "female",
  group: "shu",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_qiaoshi", "gz_yanyu"],
  img: "extension/鹰击长空/image/gz_xiahoushi.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_xiahoushi.mp3"],
},

// 王异
gz_wangyi: {
  sex: "female",
  group: "wei",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_zhenlie", "gz_miji"],
  img: "extension/鹰击长空/image/gz_wangyi.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_wangyi.mp3"],
},

// 贺齐
gz_heqi: {
  sex: "male",
  group: "wu",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  skills: ["gz_junwei"],
  img: "extension/鹰击长空/image/gz_heqi.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_heqi.mp3"],
},

// 马良
gz_feng_maliang: {
  sex: "male",
  group: "shu",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_zicai", "gz_zhengmu"],
  img: "extension/鹰击长空/image/gz_feng_maliang.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_feng_maliang.mp3"],
},

// 群黄月英
gz_feng_huangyueying: {
  sex: "female",
  group: "qun",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_ruxin", "gz_linglong"],
  img: "extension/鹰击长空/image/gz_feng_huangyueying.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_feng_huangyueying.mp3"],
},

gz_renwan: {
  sex: "female",
  group: "wei",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_pizou", "gz_juansui"],
  img: "extension/鹰击长空/image/gz_renwan.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_renwan.mp3"],
},

gz_bulianshi: {
  sex: "female",
  group: "wu",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_anxu", "gz_zhuiyi"],
  img: "extension/鹰击长空/image/gz_bulianshi.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_bulianshi.mp3"],
},

gz_gongsunxiu: {
  sex: "male",
  group: "qun",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  skills: ["gz_niejiang", "gz_kuizhen"],
  img: "extension/鹰击长空/image/gz_gongsunxiu.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_gongsunxiu.mp3"],
},

gz_zhongli_xushu: {
  sex: "male",
  group: "zhongli",
  hp: 4,
  maxHp: 4,
  hujia: 0,
  skills: ["gz_jiange","gz_yinyu"],
  img: "extension/鹰击长空/image/gz_zhongli_xushu.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_zhongli_xushu.mp3"],
},

gz_zhongli_jiaxu: {
  sex: "male",
  group: "zhongli",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_qingshi","gz_shuge","gz_anshi"],
  img: "extension/鹰击长空/image/gz_zhongli_jiaxu.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_zhongli_jiaxu.mp3"],
},

gz_zhongli_xushao: {
  sex: "male",
  group: "zhongli",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_yingmen","gz_pingjian"],
  img: "extension/鹰击长空/image/gz_zhongli_xushao.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_zhongli_xushao.mp3"],
},

gz_zhongli_zhaoe: {
  sex: "female",
  group: "zhongli",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_yanshi","gz_xinren"],
  img: "extension/鹰击长空/image/gz_zhongli_zhaoe.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_zhongli_zhaoe.mp3"],
},

gz_zhongli_lusu: {
  sex: "male",
  group: "zhongli",
  hp: 3,
  maxHp: 3,
  hujia: 0,
  skills: ["gz_xiangkui","gz_yangming"],
  img: "extension/鹰击长空/image/gz_zhongli_lusu.jpg",
  dieAudios: ["ext:鹰击长空/audio/die/gz_zhongli_lusu.mp3"],
},
        },
        translate:{
"gz_zhugezhan": "诸葛瞻",
            "gz_zhanghuai": "张怀",
            "gz_xuncan": "荀粲",
            "gz_yuantan": "袁谭",
           
                        "gz_jue_yangjun": "杨骏",
            "gz_jue_yangyan": "杨艳",
            "gz_lujii": "陆机",
            "gz_shantao": "山涛",
            "gz_zhugejing": "诸葛京",
            "gz_zhouchu": "周处",
            "gz_peixiu": "裴秀",
            "gz_jiananfeng": "贾南风",
            "gz_zhanghua": "张华",
            "gz_huoyi": "霍弋",
            "gz_qiaozhou": "谯周",
                        "gz_jue_yangzhi": "杨芷",
						"gz_kuaishi":"蒯氏",
						"gz_xuwen":"徐妏",
						"gz_xiahoushi": "夏侯涓",
"gz_wangyi": "王异",
"gz_heqi": "贺齐",
"gz_feng_maliang": "马良",
"gz_feng_huangyueying": "黄月英",
            "weishilijichuban":"魏势力基础版",
            "shushilijichuban":"蜀势力基础版",
             "wushilijichuban":"吴势力基础版",
              "qunshilijichuban":"群势力基础版",
               "jinshilijichuban":"晋势力基础版",
"zhonglizhe":"中立者",
zhongli:"☯",
               "buchenpianyexinjia":"不臣篇野心家",
"buchenpianjin":"不臣篇-晋",
"":"",
            "fengsuiliaoyuan":"烽燧燎原",
            
	"#gz_yundao1":"春芽不砺冬寒，其必难引暖风归还。",
"#gz_yundao2":"与卿为好之心，似冬风抚面而不寒。",
"#gz_yundao3":"此心哀，如涸泽之鲋，无沫相融。",
"#gz_yundao4":"此心痛，如刀俎犁腹，欲哭无声。",
"#gz_youming1":"我所蹈之节，可以此生践之。",
"#gz_youming2":"衷其情而恪其节，此荀门之教也。",
"#gz_zuilun1":"瞻世受国恩，却未能以才弼国，是罪也。",
"#gz_zuilun2":"美声溢誉，而力不能及，瞻有罪于国。",
"#gz_zuilun3":"宦官弄权掌君，实乃臣下之过也。",
"#gz_zuilun4":"犹豫不决，以致丧师辱国，其罪无可赦也。",
"#gz_zuilun5":"瞻内不能摒除奸宦，外不能守土御敌，愧对陛下。",
"#gz_zuilun6":"绵竹之地今于我，恰如武帝悔轮台。",
"#gz_dishang1":"此番须拼死一战，以赎戴罪之身。",
"#gz_dishang2":"攻须凭计，守则尽胆。",
"#gz_dishang3":"疑兵之法，可保此地无虞。",
"#gz_dishang4":"定使魏军虚实难辨，真假不分！",
"#gz_yisang1":"今日躬桑于西郊，请为大王衣。",
"#gz_yisang2":"清风胧月香怡，请君暂驻小憩。",
"#gz_jiubo1":"陛下任人不明，所托绝非良人。",
"#gz_jiubo2":"吾与太傅同气连枝，一损则俱损。",

"#gz_yunxing1":"老夫古稀之年，恐寿数将尽，不复相见矣。",
"#gz_yunxing2":"今老而难死，唯抽白发作毫锋，挑灯写降笺。",
"#gz_yunxing3":"天象有数，今至于此，非陛下、群臣之过。",
"#gz_yuandao1":"高祖斩蛇而定北极，星河斗转，其位移也。",
"#gz_yuandao2":"周慕孔子遗风，可与刘、扬同轨。",
"#gz_yuandao3":"诸葛公天纵之才而堪堪弼国，况我等凡夫乎？",
"#gz_baoguo1":"自古以来，无寄他国而为天子者也。",
"#gz_baoguo2":"周知天命之年，今冒天下不韪而劝降。",
"#gz_baoguo3":"陛下降，若魏不裂土以封，臣必以古义争之。",
"#gz_zeyu1":"熟读情势，憾无沙场纵横。",
"#gz_zeyu2":"泛舟沧海，风动云帆，送我步青云。",
"#gz_bihun1":"赤心如丹，思虑王室之险。",
"#gz_bihun2":"气节如玉，心忧国家之难。",
"#gz_yinbing1":"情势危急，故为此举以脱一时之困。",
"#gz_yinbing2":"若当下之围不解，何以图千秋之惠？",
"#gz_juanzhi1":"此剑光芒艳发，非凡物也，当以华阴赤土拭之。",
"#gz_juanzhi2":"斗牛间常有紫气，其兆如何，还请阁下解之。",
"#gz_jiaping1":"志蕴数载，今朝逐鹿！",
"#gz_jiaping2":"指点江山五十载，一朝化龙跃金銮！",
"#gz_guikuang1":"横眉养红莲，此花开时，诸侯尽膝行！",
"#gz_guikuang2":"袖中藏莫邪，志高位卑，犹思屠犬豕。",
"#gz_shujuan1":"谋大事者，必察常人所不察。",
"#gz_shujuan2":"蛰伏多载，今朝雄志可展！",
"#gz_jiyuan1":"男胤有德色，愿陛下以备六宫。",
"#gz_jiyuan2":"广集良家，召充选者使吾拣择。",

"#gz_lingzhi1":"须知少时凌云志，曾许人间第一流。",
"#gz_lingzhi2":"欲乘青云扶摇上，少年壮志镇九州！",
"#gz_ruluo1":"初入门庭负豪志，亦得云锦天章去！",
"#gz_ruluo2":"早闻天下智者盛，今朝入京识时贤！",
"#gz_linzhe1":"此位当属汝南袁氏遗才！",
"#gz_linzhe2":"宇内既统，当招揽天下英才！",
"#gz_yamai1":"汝既不才，何以忝居高位？",
"#gz_yamai2":"冀州三十士，当耀于朝。",
"#gz_luanchang1":"欲扫清寰宇，重振朝纲，必诛奸臣！",
"#gz_luanchang2":"杀了你们，天下都是我说的算！",
"#gz_zhulan1":"整顿天下，为国除害！",
"#gz_zhulan2":"陛下在哪，陛下在哪？",
"#gz_gongzhi1":"身负托孤之重，但坐论清谈，此亦可乎？",
"#gz_gongzhi2":"陛下用人之际，臣岂敢身退庙堂！",
"#gz_sheju1":"臣怀二心，不可事君也。",
"#gz_sheju2":"今观汝之行事，老夫亦肝心俱裂。",
"#gz_neiji1":"你我势不两立，必要争个高下，来吧！",
"#gz_neiji2":"必要争个你死我活，方为痛快！",
"#gz_liefa1":"此击必断敌归路！",
"#gz_liefa2":"焚掠浚遒，敌必乱而自伐！",
"#gz_xiejian1":"图财还是保命？亦或者，玉石俱焚？",
"#gz_xiejian2":"朝中亲党下场，汝等的好日子到了！",
"#gz_yinsha1":"今且缓其事，贾后必害太子，然后废后，为太子报仇，亦足以立功，岂徒免祸而已。",
"#gz_yinsha2":"臣且听闻朝野欲废后，而得以复拥太子，甚为狂肆！",
"#gz_guishang1":"这是赏给你的！",
"#gz_guishang2":"别争斗，见者有份！",
"#gz_niubi1":"吾权倾朝野，终有一日夺得这天下！",
"#gz_niubi2":"汝等屡番劝谏与吾志相悖，吾唯从吾心！",
"#gz_ruxin1":"我有红袖挽长缨，可缚诸葛作乘龙。",
"#gz_ruxin2":"身负彩鳞妆彩翼，心有玲珑点灵犀。",
"#gz_linglong1":"木羽裁云织晓雾，栖在梧桐最高处。",
"#gz_linglong2":"穿林铁翅寒，待借东风力，九霄揽月还。",
"#gz_feng_huangyueying:die":"铁翎犹记云深处，曾载春山几万重。",
"#gz_lujii:die":"华亭鹤唳，可复闻乎？",
"#gz_sunxiuu:die":"许我虚名，归我老去，成败转头即飞白。",
"#gz_simalun:die":"大事当以急行，而不可缓图。",
"#gz_yangjun:die":"唉，终是难逃灭门之祸。",
"#gz_simaliang:die":"生此篡逆之世，罪臣难辞其咎。",
"#gz_huoyi:die":"南中初定，蛮河已靖；风雨未晏，归顺新朝。百姓得安，吾无憾矣。",
"#gz_shantao:die":"臣垂没之人，岂可污朝堂乎？",


"#gz_juansui1":"莫说七步，便是七百步、七万步，妾也煮不出豆羹。",
"#gz_juansui2":"众妹妹的枕边风，可比祛火汤更合圣意？",
"#gz_pizou1":"青砖浸透红颜泪，朱墙难困腊梅香。",
"#gz_pizou2":"素衣何惧霜雪重？俯仰无愧，不须低眉！",
"#gz_renwan:die":"深情自古总被负，魏宫尽是薄情人。",

"#gz_fuhui1":"画入我眸寻兰黛，千度回首，唯有香如故。",
"#gz_fuhui2":"我入画中访青笺，一笔流年，繁花犹香艳。",
"#gz_mohua1":"画中月照百世人，画外人识百花香。",
"#gz_mohua2":"三分墨染七分意，层峦似有清泉来。",
"#gz_xuwen:die":"丹青从不败，白头总佳人。",

"#gz_qiaoshi1":"采樵南山下，拾君一片心。",
"#gz_qiaoshi2":"山有木兮木成樵，心悦君兮君可知。",
"#gz_yanyu1":"夏燕不羡黄金屋，只栖君家檐下巢。",
"#gz_yanyu2":"红袖不解相思意，凭燕传语慰君心。",
"#gz_xiahoushi:die":"可怜城头白发妪，至死不见征夫还。",

"#gz_zhenlie1":"素颜风吹胭脂折，巾帼红妆贞烈战！",
"#gz_zhenlie2":"贞洁烈志，与城共守。",
"#gz_miji1":"共勉卒勋，不可顺逆转之意。",
"#gz_miji2":"管仲入齐，立九合之功。",
"#gz_wangyi:die":"家国俱毁，我已无容身之所。",

"#gz_zicai1":"我意已决，诸兄何复多言？",
"#gz_zicai2":"此去如若不成，吾宁殉志而终。",
"#gz_zhengmu1":"今幸明主亲召，良安可不应乎？",
"#gz_zhengmu2":"皇叔辅者少有，良当及时应召。",
"#gz_feng_maliang:die":"此生行忠守义，已无愧我心。",

"#gz_anxu1":"人不患寡而患不均，均之可恤人心。",
"#gz_anxu2":"闻他山之花馥郁，欲借之以献佛。",
"#gz_zhuiyi1":"青雀还巢日，望君勿忘我。",
"#gz_zhuiyi2":"昔年与君好，经年亦如是。",
"#gz_bulianshi:die":"花消叶落春不在，岁月如何败佳人？",

"#gz_junwei1":"这一身装备，叫你们开开眼界！",
"#gz_junwei2":"和我来一场华丽的战斗吧！",
"#gz_junwei3":"看看你的身后吧，蠢货！",
"#gz_junwei4":"拔剑断水，起波澜而涤大吴之江。",
"#gz_heqi:die":"你的刀，比我还快……",

"#gz_niejiang1":"周武继文王之志而开国百年，今吾亦可为之。",
"#gz_niejiang2":"父起于微末而定海内，今承王爵，当以死效之。",
"#gz_kuizhen1":"贼尚惧孔明一州之地，今敢来攻我邪！",
"#gz_kuizhen2":"尔等忘北地之风乎？尔等忘北地之寒乎？",
"#gz_gongsunxiu:die":"司马懿老谋深算，非常人可敌。",

"#gz_hexi1":"哼，不过一南来貉子罢了！",
"#gz_hexi2":"名门之仪，岂容尔等蛮夫沾染！",
"#gz_hexi1":"一言为界，你我殊途。",
"#gz_hejue1":"经此一事，方知情重。",
"#gz_hejue2":"夫君，昔日之言，休要再提。",
"#gz_hejue3":"破镜重圆，完璧合一。",
"#gz_kuaishi:die":" 玉已碎，人已亡……勿复相思……",
        },
      },
      card: {},
      skill: {
        skill: {
 "gz_yundao": {
    audio: "ext:鹰击长空/audio/skill:4",
    enable: "phaseUse",
    usable: 1,
    filter: function(event, player) {
        return game.hasPlayer(target => {
            return lib.skill.gz_yundao.filterTarget(null, player, target);
        });
    },
    filterTarget: function(card, player, target) {
        if (target == player) return false;
        
        if (!player.storage.gz_yundao_groups) player.storage.gz_yundao_groups = [];
        
        if (!target.group || target.group === 'unknown') return false;
        
        if (player.storage.gz_yundao_groups.includes(target.group)) return false;
        
        return player.group && player.group != target.group;
    },
    content: function() {
        "step 0";
        if (!player.storage.gz_yundao_groups) player.storage.gz_yundao_groups = [];
        if (target.group && !player.storage.gz_yundao_groups.includes(target.group)) {
            player.storage.gz_yundao_groups.push(target.group);
            game.log(player, '已选择过', '#y' + get.translation(target.group + '2'), '势力');
        }
       
        "step 1";
        target.useCard({name: 'sha', nature: 'ice'}, player, false);
       
        "step 2";
        // ✅ 检查冰杀是否造成了伤害
        var damaged = player.hasHistory('damage', evt => {
            return evt.card && evt.card.name == 'sha' && evt.card.nature == 'ice';
        });
        
        // ✅ 若此【杀】未造成伤害，才能恢复体力
        if (damaged) {
            event.finish();
            return;
        }
        
        var list = game.filterPlayer(current => {
            return current.group == player.group && current.hp < current.maxHp;
        });
        if (list.length) {
            player.chooseTarget('是否令一名与你势力相同的角色恢复1点体力？', function(card, player, target) {
                return target.group == player.group && target.hp < target.maxHp;
            }).set('ai', target => {
                return get.attitude(_status.event.player, target) * (target.maxHp - target.hp);
            });
        } else {
            event.finish();
        }
       
        "step 3";
        if (result.bool && result.targets.length) {
            var tar = result.targets[0];
            player.line(tar);
            tar.recover();
        }
    },
    group: "gz_yundao_clear",
    subSkill: {
        clear: {
            direct: false,
            silent: true,
            firstDo: true,
            trigger: {
                player: "phaseUseEnd",
            },
            forced: true,
            popup: false,
            content: function() {
                delete player.storage.gz_yundao_groups;
            },
            sub: true,
            sourceSkill: "gz_yundao",
            "_priority": 0,
        },
    },
    ai: {
        order: 8,
        result: {
            player: 1,
        },
    },
    "_priority": 0,
},

"gz_youming": {
	 forced: true, 
	 charlotte:true,
    audio: "ext:鹰击长空/audio/skill:2",
    group: ["gz_youming_view", "gz_youming_dying", "gz_youming_clear"],
    subSkill: {
        view: {
            audio: "gz_youming",
            trigger: {
                target: "useCardToTargeted",
            },
            forced: true, // ✅ 锁定技
            filter: function(event, player) {
                // ✅ 去掉势力判断，只要不是自己使用的牌
                return event.player != player && event.player.isIn() && !player.hasSkill('gz_youming_used');
            },
            content: function() {
                "step 0";
                event.cardUser = trigger.player;
                event.triggerCard = trigger.card; // ✅ 记录触发的牌
                
                if (!event.cardUser || !event.cardUser.isIn()) {
                    event.finish();
                    return;
                }
                
                player.logSkill('gz_youming_view', event.cardUser);
                player.addTempSkill('gz_youming_used', 'phaseAfter');
                
                var hs = event.cardUser.getCards('h');
                if (hs.length == 0) {
                    event.finish();
                    return;
                }
                
                // ✅ 随机选择一张手牌
                var card = hs.randomGet();
                event.viewedCard = card;
                
                "step 1";
                if (!event.cardUser || !event.cardUser.isIn() || !event.viewedCard) {
                    event.finish();
                    return;
                }
                
                // ✅ 观看一张手牌
                player.viewCards('幽明', [event.viewedCard]);
                
                // ✅ 检查颜色是否与触发牌不同
                var viewedColor = get.color(event.viewedCard);
                var triggerColor = get.color(event.triggerCard);
                
                if (!viewedColor || !triggerColor || viewedColor == triggerColor) {
                    game.log('观看的牌与触发牌颜色相同');
                    event.finish();
                    return;
                }
                
                // ✅ 颜色不同，置于牌堆顶
                event.cardUser.lose(event.viewedCard, ui.cardPile, 'insert');
                game.log(event.cardUser, '的一张手牌被置于牌堆顶');
            },
            sub: true,
            sourceSkill: "gz_youming",
            "_priority": 0,
        },
        used: {
            charlotte: true,
            sub: true,
            sourceSkill: "gz_youming",
        },
        dying: {
            audio: "gz_youming",
            trigger: {
                player: "dying",
            },
            forced: true, // ✅ 锁定技
            filter: function(event, player) {
                if (player.hasSkill('gz_youming_dying_used')) return false;
                return !player.isTurnedOver();
            },
            content: function() {
                "step 0";
                player.logSkill('gz_youming_dying');
                player.addTempSkill('gz_youming_dying_used','roundStart');
                player.turnOver();
                player.recover(1 - player.hp);
                event.dieSource = trigger.source;
                
                "step 1";
                if (!event.dieSource || !event.dieSource.isIn()) {
                    event.finish();
                    return;
                }
                var card = ui.cardPile.firstChild;
                if (!card) {
                    event.finish();
                    return;
                }
                player.showCards([card], '幽明');
                event.showCard = card;
                
                "step 2";
                if (!event.dieSource || !event.dieSource.isIn()) {
                    delete player.storage.gz_youming_chuqibuyi;
                    event.finish();
                    return;
                }
                
                player.useCard({name: 'chuqibuyi'}, event.dieSource, [event.showCard], false);
                player.storage.gz_youming_chuqibuyi = true;
                
                "step 3";
                // ✅ 若此牌未造成伤害，重置武将牌
                var damaged = event.dieSource.hasHistory('damage', evt => {
                    return evt.card && evt.card.name == 'chuqibuyi' && player.storage.gz_youming_chuqibuyi;
                });
                
                if (!damaged) {
                    // ✅ 未造成伤害，重置武将牌
                    if (player.isTurnedOver()) {
                        player.turnOver();
                    }
                    if (player.isLinked()) {
                        player.link();
                    }
                }
                delete player.storage.gz_youming_chuqibuyi;
            },
            sub: true,
            sourceSkill: "gz_youming",
            "_priority": 0,
        },
        dying_used: {
            charlotte: true,
            sub: true,
            sourceSkill: "gz_youming",
        },
        clear: {
            trigger: {
                global: "roundStart",
            },
            forced: true,
            popup: false,
            silent: true,
            content: function() {
                player.removeSkill('gz_youming_dying_used');
            },
            sub: true,
            sourceSkill: "gz_youming",
            "_priority": 0,
        },
    },
    "_priority": 0,
},

            "gz_laoyan": {
                audio: "dclaoyan",
                trigger: {
                    player: "useCardToTargeted",
                },
                forced: true,
                filter: function(event, player) {
                    if (event.player == player) return false;
                    if (!event.targets || event.targets.length <= 1) return false;
                    return event.targets.includes(player);
                  },
                content: function() {
                    "step 0";
                    var targets = trigger.targets.filter(target => {
                      return target != player && target.group == player.group;
                    });
                    if (targets.length) {
                      for (var i of targets) {
                        trigger.excluded.add(i);
                      }
                      game.log(player, '令', trigger.card, '对', targets, '无效');
                    }
                    player.addTempSkill('gz_laoyan_check', {player: 'phaseAfter'});
                    player.storage.gz_laoyan_damaged = false;
                    
                    "step 1";
                    game.delay(0.5);
                    
                    "step 2";
                    if (!player.storage.gz_laoyan_damaged) {
                      player.draw(2);
                    }
                    delete player.storage.gz_laoyan_damaged;
                  },
                subSkill: {
                    check: {
                        trigger: {
                            player: "damageEnd",
                        },
                        forced: true,
                        popup: false,
                        content: function() {
                            player.storage.gz_laoyan_damaged = true;
                          },
                        sub: true,
                        sourceSkill: "gz_laoyan",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            "gz_jueyan": {
                audio: "dcrejueyan",
                trigger: {
                    player: "useCardToPlayer",
                },
                filter: function(event, player) {
                    if (!event.targets || event.targets.length != 1) return false;
                    if (event.targets[0] == player) return false;
                    if (!player.storage.gz_jueyan_count) player.storage.gz_jueyan_count = 0;
                    return player.storage.gz_jueyan_count < 2;
                  },
                check: function(event, player) {
                    return get.attitude(player, event.targets[0]) <= 0;
                  },
                content: function() {
                    "step 0";
                    if (!player.storage.gz_jueyan_count) player.storage.gz_jueyan_count = 0;
                    player.storage.gz_jueyan_count++;
                    
                    event.target = trigger.targets[0];
                    player.chooseControl('摸一张牌', '拼点').set('ai', () => {
                      if (player.countCards('h') > event.target.countCards('h')) return '拼点';
                      return '摸一张牌';
                    });
                    
                    "step 1";
                    if (result.control == '摸一张牌') {
                      player.draw();
                      event.finish();
                    } else {
                      player.chooseToCompare(event.target);
                    }
                    
                    "step 2";
                    if (result.bool) {
                      event.target.damage(player);
                    } else {
                      player.damage(event.target);
                    }
                  },
                group: "gz_jueyan_clear",
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseEnd",
                        },
                        forced: true,
                        popup: false,
						            silent: true,
            firstDo: true,
                        content: function() {
                            delete player.storage.gz_jueyan_count;
                          },
                        sub: true,
                        sourceSkill: "gz_jueyan",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
      gz_dishang: {
  audio: "ext:鹰击长空/audio/skill:4",
  mainSkill: true,
  init(player) {
    if (player.checkMainSkill("gz_dishang")) {
      player.removeMaxHp();
    }
  },
  zhenfa: "siege",
  preHidden: true,
  trigger: {global: 'useCardToPlayered'},
  direct: true,
  filter: function(event, player) {
    if (!player.hasZhuSkill('gz_dishang')) return false;
    if (!event.card || !get.tag(event.card, 'damage')) return false;
    if (game.countPlayer() < 4) return false;
  
    var target = event.target;
    var attacker = event.player; // 围攻角色（使用牌的角色）
    
    if (!player.siege || !target || !attacker.siege) return false;
    
    // ✅ 我能围攻目标，且围攻角色能围攻目标
    if (!player.siege(target) || !attacker.siege(target)) return false;
    
    // ✅ 围攻角色是我自己 或 与我同势力
    return attacker == player || attacker.group == player.group;
  },
  check: function(event, player) {
    // ✅ 判断围攻角色对目标的态度
    return get.attitude(event.player, event.target) < 0;
  },
  content: function() {
    "step 0";
    var target = trigger.target; // 被围攻角色
    var attacker = trigger.player; // 围攻角色
    
    event.target = target;
    event.attacker = attacker;
  
    var list1 = attacker.getCards('e');
    var list2 = target.getCards('e');
  
    if (list1.length == 0 && list2.length == 0) {
      event.finish();
      return;
    }
  
    // ✅ 让围攻角色选择是否发动
    var prompt = '是否发动【抵殇】？';
    var str = '弃置' + get.translation(attacker) + '和' + get.translation(target) + '各一张装备牌，令' + get.translation(trigger.card) + '不可被响应';
    
    attacker.chooseBool(prompt, str).set('ai', function() {
      var evt = _status.event.getParent();
      return get.attitude(_status.event.player, evt.target) < 0;
    });
  
    "step 1";
    // ✅ 判断是否发动
    if (!result.bool) {
      event.finish();
      return;
    }
  
    // ✅ 技能拥有者记录发动，作用于围攻角色和目标
    player.logSkill('gz_dishang', [event.attacker, event.target]);
    event.cards = [];
  
    "step 2";
    // ✅ 围攻角色弃置自己的装备
    var pe = event.attacker.getCards('e');
  
    if (pe.length > 0) {
      event.attacker.chooseCard('e', 1, true, '抵殇：弃置你的一张装备牌');
    } else {
      event.goto(4);
    }
  
    "step 3";
    if (result.bool && result.cards && result.cards.length) {
      event.cards.push(...result.cards);
      event.attacker.discard(result.cards);
    }
  
    "step 4";
    // ✅ 围攻角色弃置目标的装备
    var te = event.target.getCards('e');
    if (te.length > 0) {
      event.attacker.discardPlayerCard(event.target, 'e', 1, true);
    } else {
      event.goto(6);
    }
  
    "step 5";
    if (result.bool && result.cards && result.cards.length) {
      event.cards.push(...result.cards);
    }
  
    "step 6";
    // ✅ 令牌不可被响应
    if (event.cards.length > 0) {
      trigger.directHit.add(event.target);
      game.log(trigger.card, '不可被响应');
    }
  },
  mod: {
    maxHandcard: function(player, num) {
      if (player.hasZhuSkill('gz_dishang')) return num - 1;
    }
  }
},
            "gz_zuilun": {
               audio: "ext:鹰击长空/audio/skill:6",
                trigger: {
                    player: "phaseJieshuBegin",
                },
                check(event, player) {
                    let num = 0;
                    if (
                        player.hasHistory("lose", function (evt) {
                            return evt.type == "discard";
                        })
                    ) {
                        num++;
                    }
                    if (!player.isMinHandcard()) {
                        num++;
                    }
                    if (!player.getStat("damage")) {
                        num++;
                    }
                    if (num == 3) {
                        return player.hp >= 2;
                    }
                    return true;
                },
                prompt(event, player) {
                    let num = 3;
                    if (
                        player.hasHistory("lose", function (evt) {
                            return evt.type == "discard";
                        })
                    ) {
                        num--;
                    }
                    if (!player.isMinHandcard()) {
                        num--;
                    }
                    if (!player.getStat("damage")) {
                        num--;
                    }
                    return get.prompt("gz_zuilun") + "（可获得" + get.cnNumber(num) + "张牌）";
                },
                async content(event, trigger, player) {
                    let num = 0;
                    const cards = get.cards(3);
                    await game.cardsGotoOrdering(cards);
                    if (
                        player.hasHistory("lose", function (evt) {
                            return evt.type == "discard";
                        })
                    ) {
                        num++;
                    }
                    if (!player.isMinHandcard()) {
                        num++;
                    }
                    if (!player.getStat("damage")) {
                        num++;
                    }
                    if (num == 0) {
                        await player.gain(cards, "draw");
                        return;
                    }
                    let prompt = "罪论：将" + get.cnNumber(num) + "张牌置于牌堆顶";
                    if (num < 3) {
                        prompt += "并获得其余的牌";
                    }
                    const chooseToMove = player.chooseToMove(prompt, true);
                    if (num < 3) {
                        chooseToMove.set("list", [["牌堆顶", cards], ["获得"]]);
                        chooseToMove.set("filterMove", function (from, to, moved) {
                            if (to == 1 && moved[0].length <= _status.event.num) {
                                return false;
                            }
                            return true;
                        });
                        chooseToMove.set("filterOk", function (moved) {
                            return moved[0].length == _status.event.num;
                        });
                    } else {
                        chooseToMove.set("list", [["牌堆顶", cards]]);
                    }
                    chooseToMove.set("num", num);
                    chooseToMove.set("processAI", function (list) {
                        const check = function (card) {
                            const player = _status.event.player;
                            const next = player.next;
                            const att = get.attitude(player, next);
                            const judge = next.getCards("j")[tops.length];
                            if (judge) {
                                return get.judge(judge)(card) * att;
                            }
                            return next.getUseValue(card) * att;
                        };
                        const cards = list[0][1].slice(0),
                            tops = [];
                        while (tops.length < _status.event.num) {
                            list.sort(function (a, b) {
                                return check(b) - check(a);
                            });
                            tops.push(cards.shift());
                        }
                        return [tops, cards];
                    });
                    let result = await chooseToMove.forResult();
                    if (result.bool) {
                        const list = result.moved[0];
                        cards.removeArray(list);
                        await game.cardsGotoPile(list.reverse(), "insert");
                    }
                    game.updateRoundNumber();
                    if (cards.length) {
                        await player.gain(cards, "draw");
                        return;
                    }
                    const chooseTarget = player.chooseTarget("请选择一名角色，与其一同失去1点体力", true, function (card, player, target) {
                    
                    });
                    chooseTarget.ai = function (target) {
                        return -get.attitude(_status.event.player, target);
                    };
                    result = await chooseTarget.forResult();
                    player.line(result.targets[0], "fire");
                    await player.loseHp();
                    await result.targets[0].loseHp();
                },
                "_priority": 0,
            },


"gz_qiaosi": {
    audio: "twqiaosi",
    trigger: {
        player: "phaseJieshuBegin",
    },
    filter(event, player) {
        const cardTypes = get.info("gz_qiaosi").getCardsByType(player);
        return Object.keys(cardTypes).length > 0;
    },
    check(event, player) {
        const cardTypes = get.info("gz_qiaosi").getCardsByType(player);
        // 判断是否有价值高的类别
        for (let type in cardTypes) {
            const cards = cardTypes[type];
            if (cards.length >= player.getHp() || cards.some(card => get.name(card, player) == "tao" || get.name(card, player) == "jiu")) {
                return true;
            }
            if (player.getHp() > 2 && cards.length > 1) {
                return true;
            }
        }
        return false;
    },
    content: function() {
        "step 0";
        // ✅ 存储到 event，避免重复声明
        event.cardTypes = get.info("gz_qiaosi").getCardsByType(player);
        event.typeList = Object.keys(event.cardTypes);
        
        if (event.typeList.length == 0) {
            event.finish();
            return;
        }
        
        // ✅ 选择一种类别（去掉 translate）
        var controls = event.typeList.map(type => {
            return get.translation(type) + "（" + event.cardTypes[type].length + "张）";
        });
        
        player.chooseControl(event.typeList)
            .set('prompt', '峭嗣：选择要获得的牌的类别')
            .set('choiceList', controls)
            .set('ai', () => {
                var evt = _status.event.getParent();
                var cardTypes = evt.cardTypes;
                var typeList = _status.event.controls;
                var bestType = typeList[0];
                var bestValue = -Infinity;
                
                for (var i = 0; i < typeList.length; i++) {
                    var type = typeList[i];
                    var typeCards = cardTypes[type];
                    var value = 0;
                    
                    // 有桃/酒优先
                    if (typeCards.some(card => get.name(card) == "tao" || get.name(card) == "jiu")) {
                        value += 100;
                    }
                    
                    // 数量>=体力值不扣血
                    if (typeCards.length >= _status.event.player.getHp()) {
                        value += 50;
                    }
                    
                    // 计算牌的总价值
                    for (var j = 0; j < typeCards.length; j++) {
                        value += get.value(typeCards[j]);
                    }
                    
                    // 扣血惩罚
                    if (typeCards.length < _status.event.player.getHp()) {
                        value -= 10;
                    }
                    
                    if (value > bestValue) {
                        bestValue = value;
                        bestType = type;
                    }
                }
                
                return bestType;
            });
        
        "step 1";
        if (!result.control) {
            event.finish();
            return;
        }
        
        event.selectedType = result.control;
        event.selectedCards = event.cardTypes[event.selectedType] || [];
        
        if (event.selectedCards.length == 0) {
            event.finish();
            return;
        }
        
        player.logSkill("gz_qiaosi");
        game.log(player, "选择了", "#y" + get.translation(event.selectedType));
        
        player.gain(event.selectedCards, "gain2");
        
        "step 2";
        // ✅ 直接使用 event.selectedCards，不再声明
        if (event.selectedCards.length <= player.getHp()) {
            player.loseHp();
        }
    },
    // ✅ 新增：按类别分类获取牌
    getCardsByType(player) {
        var allCards = get.info("gz_qiaosi").getCards(player);
        var result = {};
        
        for (var i = 0; i < allCards.length; i++) {
            var card = allCards[i];
            var cardType = get.type2(card, false);
            if (!result[cardType]) {
                result[cardType] = [];
            }
            result[cardType].push(card);
        }
        
        return result;
    },
    // ✅ 保持原有的 getCards 函数
    getCards(player) {
        let cards = [],
            targets = game.players.slice().concat(game.dead.slice());
        for (const target of targets) {
            if (target == player) {
                continue;
            }
            const history = target.getHistory("lose", evt => evt.position == ui.discardPile);
            if (history.length) {
                for (const evt of history) {
                    cards.addArray(evt.cards2.filterInD("d"));
                }
            }
        }
        const historyx = game.getGlobalHistory("cardMove", evt => {
            if (evt.name != "cardsDiscard") {
                return false;
            }
            const evtx = evt.getParent();
            if (evtx.name != "orderingDiscard") {
                return false;
            }
            const evt2 = evtx.relatedEvent || evtx.getParent();
            const current = evt2.player;
            if (evt2.name == "phaseJudge" || current == player) {
                return false;
            }
            return current.hasHistory("lose", evtx3 => {
                const evtx4 = evtx3.relatedEvent || evtx3.getParent();
                if (evt2 != evtx4) {
                    return false;
                }
                return evtx3.getl(current).cards2.length > 0;
            });
        });
        if (historyx.length) {
            for (const evtx of historyx) {
                cards.addArray(evtx.cards.filterInD("d"));
            }
        }
        return cards;
    },
    "_priority": 0,
},
         gz_baizu: {
    audio: "twbaizu",
    trigger: {
        player: "phaseJieshuBegin",
    },
    filter: function(event, player) {
        if (!player.isDamaged()) return false;
        if (!player.countCards('h')) return false;
        // ✅ 添加：排除武将牌均暗置的角色
        return game.hasPlayer(target => {
            return target != player && target.countCards('h') && !target.isUnseen();
        });
    },
    locked: true,
    content: function() {
        "step 0";
        // ✅ 添加：只收集已确定势力的角色
        var groups = [];
        for (var i of game.players) {
            if (i != player && i.countCards('h') && !i.isUnseen()) {
                if (!groups.includes(i.group)) {
                    groups.push(i.group);
                }
            }
        }
        event.groups = groups;
        event.targets = [];
        event.groupIndex = 0;
       
        "step 1";
        // 为每个势力选择一名角色
        if (event.groupIndex < event.groups.length) {
            var currentGroup = event.groups[event.groupIndex];
            // ✅ 添加：排除武将牌均暗置的角色
            var list = game.filterPlayer(target => {
                return target != player && 
                       target.group == currentGroup && 
                       target.countCards('h') &&
                       !target.isUnseen();
            });
           
            if (list.length == 1) {
                event.targets.push(list[0]);
                event.groupIndex++;
                event.redo();
            } else if (list.length > 1) {
                player.chooseTarget('败族：请选择' + get.translation(currentGroup) + '势力的一名角色', true, function(card, player, target) {
                    var currentGroup = _status.event.currentGroup;
                    // ✅ 添加：排除武将牌均暗置的角色
                    return target != player && 
                           target.group == currentGroup && 
                           target.countCards('h') &&
                           !target.isUnseen();
                }).set('currentGroup', currentGroup).set('ai', target => {
                    return get.damageEffect(target, player, player);
                });
            } else {
                event.groupIndex++;
                event.redo();
            }
        } else {
            event.goto(3);
        }
       
        "step 2";
        if (result.bool && result.targets && result.targets.length) {
            event.targets.push(result.targets[0]);
        }
        event.groupIndex++;
        event.goto(1);
       
        "step 3";
        if (!event.targets.length) {
            event.finish();
            return;
        }
       
        player.line(event.targets);
        var list = [player].concat(event.targets);
        event.list = list;
       
        game.broadcastAll(function() {
            if (ui.tempnowuxie) {
                ui.tempnowuxie.close();
                delete ui.tempnowuxie;
            }
        });
       
        var cards = [];
        for (var i of list) {
            if (i.countCards('h')) {
                cards.push(i);
            }
        }
       
        if (!cards.length) {
            event.finish();
            return;
        }
       
        event.videoId = lib.status.videoId++;
        game.broadcastAll(function(id) {
            var dialog = ui.create.dialog('败族：请弃置一张手牌');
            dialog.videoId = id;
        }, event.videoId);
       
        event.time = 10000;
        event.chooseList = [];
       
        "step 4";
        var next = event.list.shift();
        if (!next) {
            event._result = event.chooseList;
            event.goto(6);
            return;
        }
       
        event.current = next;
        if (!next.countCards('h')) {
            event.chooseList.push(null);
            event.redo();
            return;
        }
       
        var str = '败族：请弃置一张手牌';
        next.chooseCard('h', str, true).set('ai', get.unuseful);
       
        "step 5";
        if (result.bool && result.cards && result.cards.length) {
            event.chooseList.push({player: event.current, cards: result.cards});
        } else {
            event.chooseList.push(null);
        }
        event.goto(4);
       
        "step 6";
        game.broadcastAll('closeDialog', event.videoId);
       
        var discards = [];
        var list = [player].concat(event.targets);
       
        for (var i = 0; i < event._result.length; i++) {
            if (event._result[i] && event._result[i].cards && event._result[i].cards.length) {
                discards.push([list[i], event._result[i].cards]);
            }
        }
       
        if (!discards.length) {
            event.finish();
            return;
        }
       
        event.discardResult = event._result;
        game.loseAsync({
            lose_list: discards
        }).setContent('discardMultiple');
       
        "step 7";
        if (!event.discardResult || !event.discardResult.length || !event.discardResult[0]) {
            event.finish();
            return;
        }
       
        var playerCard = event.discardResult[0].cards[0];
        var playerType = get.type2(playerCard);
       
        for (var i = 1; i < event.discardResult.length; i++) {
            if (event.discardResult[i] && event.discardResult[i].cards && event.discardResult[i].cards.length) {
                var targetCard = event.discardResult[i].cards[0];
                var targetType = get.type2(targetCard);
                if (targetType == playerType) {
                    var target = event.targets[i - 1];
                    player.line(target);
                    target.damage();
                }
            }
        }
    }
},
     "gz_guishang": {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: "phaseUse",
    usable: 2,
    filter: function(event, player) {
        return player.countCards("he") > 0;
    },
    filterCard: function(card, player) {
        return true;
    },
    selectCard: [1, Infinity],
    filterTarget: function(card, player, target) {
        if (target == player) return false;
        // 从 player.storage 读取已选目标
        var storage = player.storage.gz_guishang_used || [];
        return !storage.includes(target);
    },
    selectTarget: 1,
    discard: false,
    lose: false,
    delay: false,
    check: function(card) {
        return 6 - get.value(card);
    },
    content: function() {
        "step 0";
        // 初始化存储
        if (!player.storage.gz_guishang_used) {
            player.storage.gz_guishang_used = [];
        }
        // 记录已选目标
        player.storage.gz_guishang_used.push(target);
        
        // 展示牌
        player.showCards(cards, "诡赏");
        event.showCards = cards;
        
        // 统计花色
        var suits = [];
        for (var i = 0; i < cards.length; i++) {
            var suit = get.suit(cards[i]);
            if (suit && !suits.includes(suit)) {
                suits.push(suit);
            }
        }
        event.showSuits = suits;
        
        "step 1";
        // 检查目标是否有手牌
        if (target.countCards('h') == 0) {
            // 没有手牌，只能选择选项1，直接跳到获得牌
            event.goto(2);
            result = {control: "选项一"};
        } else {
            // 目标选择
            target.chooseControl("选项一", "选项二")
                .set("choiceList", [
                    "获得这些牌并执行一个军令",
                    "弃置至少一张与展示牌不同花色的牌并令" + get.translation(player) + "摸一张牌，然后视为使用仅指定你与其的【以逸待劳】"
                ])
                .set("ai", function() {
                    var target = _status.event.player;
                    var cards = _status.event.getParent().showCards;
                    
                    // 计算获得牌的价值
                    var value = 0;
                    for (var i = 0; i < cards.length; i++) {
                        value += get.value(cards[i]);
                    }
                    
                    // 如果牌价值高，选择获得
                    if (value > 10) return 0;
                    
                    // 否则选择弃牌
                    return 1;
                });
        }
        
        "step 2";
        if (result.control == "选项一") {
            // 获得牌
            target.gain(cards, player, "give");
            
            // 记录获得牌数（用于回合结束时判断）
            if (!player.storage.gz_guishang_gain) {
                player.storage.gz_guishang_gain = {};
            }
            if (!player.storage.gz_guishang_gain[target.playerid]) {
                player.storage.gz_guishang_gain[target.playerid] = 0;
            }
            player.storage.gz_guishang_gain[target.playerid] += cards.length;
            
            // 选择军令
            player.chooseJunlingFor(target);
        } else {
            // 选项二：跳到弃牌步骤
            event.goto(5);
        }
        
        "step 3";
        event.junling = result.junling;
        event.junlingTargets = result.targets;
        
        // 让目标选择是否执行军令
        var str = get.translation(player);
        target.chooseJunlingControl(player, result.junling, result.targets)
            .set("prompt", "诡赏")
            .set("choiceList", ["执行该军令", "不执行该军令并受到1点伤害"])
            .set("ai", function() {
                var evt = _status.event.getParent(2);
                var source = evt.player;      // 朱儁
                var performer = evt.target;   // 执行军令的人
                var junling = evt.junling;
                var targets = evt.junlingTargets;
                
                if (typeof get.junlingEffect == "function") {
                    // 计算执行军令的收益
                    var junlingEff = get.junlingEffect(source, junling, performer, targets, performer);
                    // 计算受到伤害的损失
                    var damageEff = get.damageEffect(performer, source, performer);
                    
                    // 如果执行军令收益更大，选择执行
                    return junlingEff > damageEff ? 0 : 1;
                }
                
                // 默认不执行（受到伤害）
                return 1;
            });
        
        "step 4";
        if (result.index == 0) {
            // 执行军令
            target.carryOutJunling(player, event.junling, event.junlingTargets);
        } else {
            // 不执行，受到伤害
            target.damage(player);
        }
        event.finish();
        
        "step 5";
        // 选项二：弃牌
        target.chooseToDiscard("he", [1, Infinity], "弃置至少一张与展示牌不同花色的牌", function(card, player) {
            var suits = _status.event.showSuits;
            return !suits.includes(get.suit(card));
        })
        .set("showSuits", event.showSuits)
        .set("ai", function(card) {
            if (get.position(card) == "e") return 10 - get.value(card);
            return 7 - get.value(card);
        });
        
        "step 6";
        if (result.bool && result.cards && result.cards.length > 0) {
            // 朱儁摸一张牌
            player.draw();
            
            // 视为使用【以逸待劳】
            if (lib.card.yiyi) {
                player.useCard({name: "yiyi"}, [player, target], false);
            }
        }
    },
    group: ["gz_guishang_damage", "gz_guishang_clear"],
    subSkill: {
        // 出牌阶段结束清空已选目标记录
        clear: {
            trigger: {
                player: "phaseUseAfter",
            },
            silent: true,
            popup: false,
            forced: true,
            content: function() {
                delete player.storage.gz_guishang_used;
            },
            sub: true,
        },
        
        damage: {
            audio: "gz_guishang",
            trigger: {
                player: "phaseJieshuBegin",
            },
            forced: true,
            filter: function(event, player) {
                return player.storage.gz_guishang_gain && Object.keys(player.storage.gz_guishang_gain).length > 0;
            },
            content: function() {
                "step 0";
                var gainData = player.storage.gz_guishang_gain;
                var max = 0, min = Infinity;
                var maxPlayers = [], minPlayers = [];
                
                // 找出获得牌最多和最少的角色
                for (var id in gainData) {
                    var num = gainData[id];
                    if (num > max) {
                        max = num;
                        maxPlayers = [id];
                    } else if (num == max) {
                        maxPlayers.push(id);
                    }
                    
                    if (num < min) {
                        min = num;
                        minPlayers = [id];
                    } else if (num == min) {
                        minPlayers.push(id);
                    }
                }
                
                // 如果所有人获得牌数相同，不触发
                if (max == min) {
                    delete player.storage.gz_guishang_gain;
                    event.finish();
                    return;
                }
                
                // 转换为实际角色对象
                event.maxPlayer = null;
                event.minPlayer = null;
                
                for (var i = 0; i < game.players.length; i++) {
                    if (maxPlayers.includes(game.players[i].playerid) && game.players[i].isAlive()) {
                        event.maxPlayer = game.players[i];
                        break;
                    }
                }
                
                for (var i = 0; i < game.players.length; i++) {
                    if (minPlayers.includes(game.players[i].playerid) && game.players[i].isAlive()) {
                        event.minPlayer = game.players[i];
                        break;
                    }
                }
                
                delete player.storage.gz_guishang_gain;
                
                "step 1";
                if (event.maxPlayer && event.minPlayer && event.maxPlayer.isAlive() && event.minPlayer.isAlive()) {
                    game.log(event.maxPlayer, "本回合获得牌最多，对", event.minPlayer, "造成1点伤害");
                    event.maxPlayer.line(event.minPlayer);
                    event.minPlayer.damage(event.maxPlayer);
                }
            },
            sub: true,
            sourceSkill: "gz_guishang",
            "_priority": 0,
        },
    },
    ai: {
        order: 8,
        result: {
            player: 1,
            target: function(player, target) {
                if (get.attitude(player, target) > 0) return 1;
                return -1;
            },
        },
    },
    "_priority": 0,
},

            "gz_niubi": {
                audio: "ext:鹰击长空/audio/skill:2",
                trigger: {
                    player: "phaseBegin",
                },
                forced: true,
                locked: true,
                content: function() {
                    "step 0";
                    player.chooseControl("选项一", "选项二").set("choiceList", [
                        "本回合仅能对自己使用牌，用一张牌后，摸一张牌",
                        "本回合仅能对其他角色使用牌，使用一种花色的首张牌额外结算一次"
                    ]).set("ai", function() {
                        var player = _status.event.player;
                        // 简单AI：血少选1，血多选2
                        if (player.hp <= 2) return 0;
                        return 1;
                    });
                    
                    "step 1";
                    if (result.control == "选项一") {
                        player.storage.gz_niubi_mode = 1;
                        player.addTempSkill("gz_niubi_self", "phaseAfter");
                        game.log(player, "本回合仅能对自己使用牌");
                    } else {
                        player.storage.gz_niubi_mode = 2;
                        player.addTempSkill("gz_niubi_other", "phaseAfter");
                        player.storage.gz_niubi_suits = [];
                        game.log(player, "本回合仅能对其他角色使用牌");
                    }
                    player.addTempSkill("gz_niubi_check", "phaseAfter");
                },
                subSkill: {
                    self: {
                        charlotte: true,
                        mod: {
                            playerEnabled: function(card, player, target) {
                                if (target != player) return false;
                            },
                        },
                        trigger: {
                            player: "useCardAfter",
                        },
                        forced: true,
                        popup: false,
                        content: function() {
                            player.draw();
                        },
                        sub: true,
                        sourceSkill: "gz_niubi",
                        "_priority": 0,
                    },
                    other: {
                        charlotte: true,
                        mod: {
                            playerEnabled: function(card, player, target) {
                                if (target == player) return false;
                            },
                        },
                        trigger: {
                            player: "useCard",
                        },
                        forced: true,
                        popup: false,
                        filter: function(event, player) {
                            var suit = get.suit(event.card);
                            if (!suit || suit == "none") return false;
                            return !player.storage.gz_niubi_suits.includes(suit);
                        },
                        content: function() {
                            var suit = get.suit(trigger.card);
                            player.storage.gz_niubi_suits.push(suit);
                            game.log(trigger.card, "额外结算一次");
                            trigger.effectCount++;
                        },
                        sub: true,
                        sourceSkill: "gz_niubi",
                        "_priority": 0,
                    },
                    check: {
                        charlotte: true,
                        trigger: {
                            player: "phaseUseEnd",
                        },
                        forced: true,
                        filter: function(event, player) {
                            var stat = player.getStat();
                            if (!stat || !stat.damage) return true;
                            return stat.damage <= 0;
                        },
                        content: function() {
                            player.loseHp();
                            game.log(player, "本回合未造成过伤害，失去1点体力");
                        },
                        sub: true,
                        sourceSkill: "gz_niubi",
                        "_priority": 0,
                    },
                },
                ai: {
                    threaten: 2,
                },
                "_priority": 0,
            },
          "gz_jiyuan": {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        player: "dyingBegin",
    },
    limited: true,
    mark: true,
    skillAnimation: true,
    animationColor: "fire",
    init: function(player, skill) {
        player.storage[skill] = false;
    },
    filter: function(event, player) {
        // 检查是否有相同势力的角色（包括自己）
        return game.hasPlayer(function(current) {
            return current.group == player.group;
        });
    },
    check: function(event, player) {
        // AI判断：血量很低时发动
        return player.hp <= 0;
    },
    content: function() {
        "step 0";
        player.storage.gz_jiyuan = true;
        player.awakenSkill("gz_jiyuan");
        
        // ✅ 提前记录霁愿在主将还是副将（在副将被更换之前）
        var skills1 = player.name1 ? lib.character[player.name1][3] : [];
        var skills2 = player.name2 ? lib.character[player.name2][3] : [];
        
        event.jiyuanInMain = skills1.includes("gz_jiyuan");
        event.jiyuanInVice = skills2.includes("gz_jiyuan");
        
        // 调试日志
        game.log("【霁愿】位置检测：主将=" + player.name1 + 
                 (event.jiyuanInMain ? "（含霁愿）" : "") + 
                 "，副将=" + player.name2 + 
                 (event.jiyuanInVice ? "（含霁愿）" : ""));
        
        player.chooseTarget(
            "霁愿：选择一名与你势力相同的角色",
            true,
            function(card, player, target) {
                return target.group == player.group;
            }
        ).set("ai", function(target) {
            var player = _status.event.player;
            
            // 优先选择自己（濒死救自己）
            if (target == player) {
                return 1000; // 最高优先级
            }
            
            var att = get.attitude(player, target);
            // 其次选择态度好且状态不佳的角色
            if (att > 0) {
                return att * (5 - target.hp) * (5 - target.countCards("h"));
            }
            return att;
        });
        
        "step 1";
        if (!result.bool || !result.targets || !result.targets.length) {
            event.finish();
            return;
        }
        
        event.target = result.targets[0];
        player.line(event.target, "fire");
        game.log(event.target, "成为了", "#g【霁愿】", "的目标");
        
        "step 2";
        // 体力值调整至上限
        var recoverNum = event.target.maxHp - event.target.hp;
        if (recoverNum > 0) {
            event.target.recover(recoverNum);
            game.log(event.target, "的体力值调整至上限");
        }
        
        "step 3";
        // 手牌数调整至上限
        var drawNum = event.target.maxHp - event.target.countCards("h");
        if (drawNum > 0) {
            event.target.draw(drawNum);
            game.log(event.target, "的手牌数调整至上限");
        } else if (drawNum < 0) {
            event.target.chooseToDiscard("h", -drawNum, true);
        }
        
        "step 4";
        // 更换副将（注意：是目标角色的副将）
        if (!event.target.name2) {
            game.log(event.target, "没有副将，无法更换");
            event.goto(6);
            return;
        }
        
        event.target.changeVice(function(name) {
            var info = lib.character[name];
            if (!info) return false;
            if (info[1] != event.target.group) return false;
            if (info[4] && (info[4].includes("forbidai") || info[4].includes("boss"))) return false;
            return true;
        }).set("ai", function(button) {
            var name = button.link;
            var skills = lib.character[name][3];
            var value = 0;
            for (var i = 0; i < skills.length; i++) {
                var info = lib.skill[skills[i]];
                if (info && info.ai && info.ai.threaten) {
                    value += info.ai.threaten;
                }
            }
            return value + Math.random();
        });
        
        "step 5";
        if (result && result.bool) {
            game.log(event.target, "通过【霁愿】更换了副将");
        }
        
        "step 6";
        // 若你（发动者player）未死亡，移除此武将牌
        if (!player.isAlive()) {
            event.finish();
            return;
        }
        
        game.log(player, "未死亡，移除【霁愿】所在的武将牌");
        
        // ✅ 使用 step 0 保存的位置信息（而不是重新检查）
        if (event.jiyuanInMain && player.name1) {
            // 移除主将
            game.log("移除主将：", player.name1);
            player.removeCharacter(0); // 0=主将，1=副将（注意参数）
            player.removeSkill("gz_jiyuan");
        } else if (event.jiyuanInVice && player.name2) {
            // 移除副将
            game.log("移除副将：", player.name2);
            player.removeCharacter(1); // 0=主将，1=副将
            player.removeSkill("gz_jiyuan");
        } else {
            // 找不到武将牌，直接移除技能
            game.log("未找到霁愿所在武将牌，仅移除技能");
            player.removeSkill("gz_jiyuan");
        }
    },
    ai: {
        save: true,
        skillTagFilter: function(player, arg, target) {
            if (player.storage.gz_jiyuan) return false;
            return player == target;
        },
        threaten: 2,
    },
    intro: {
        content: "limited",
    },
    "_priority": 0,
},
            "gz_xianwan": {
    audio: "xianwan",
    enable: "chooseToUse",
    filter: function(event, player) {
        return (
            event.filterCard &&
            event.filterCard(
                {
                    name: "sha" + (player.isLinked() ? "" : "n"),
                    nature: "ice",
                    isCard: true,
                },
                player,
                event
            )
        );
    },
    viewAs: function(cards, player) {
        return {
            name: "sha" + (player.isLinked() ? "" : "n"),
            nature: "ice",
            isCard: true,
        };
    },
    filterCard: () => false,
    selectCard: -1,
    prompt: "将武将牌重置并视为使用冰【杀】",
    log: false,
    check: () => 1,
    precontent: function() {
        // ✅ 国战模式明置武将牌
        if (get.mode() == 'guozhan') {
            // 检查主将是否有这个技能且未明置
            if (player.name1 && lib.character[player.name1] && 
                lib.character[player.name1][3].includes('gz_xianwan') && 
                player.isUnseen(0)) {
                player.showCharacter(0);
            }
            // 检查副将是否有这个技能且未明置
            if (player.name2 && lib.character[player.name2] && 
                lib.character[player.name2][3].includes('gz_xianwan') && 
                player.isUnseen(1)) {
                player.showCharacter(1);
            }
        }
        
        player.logSkill("gz_xianwan");
        player.link();
    },
    ai: {
        order: 3.4,
        respondSha: true,
        respondShan: true,
        skillTagFilter: function(player, tag) {
            return tag == "respondSha" + (player.isLinked() ? "" : "n");
        },
        effect: {
            target: function(card, player, target, current) {
                if (get.tag(card, "respondShan") && current < 0 && !player.isLinked()) {
                    return 0.4;
                }
            },
        },
    },
    "_priority": 0,
},
gz_yisang: {
    audio: "ext:鹰击长空/audio/skill:2",
    group: ["gz_yisang_phase", "gz_yisang_damage", "gz_yisang_clear"],
    subSkill: {
        phase: {
            audio: "gz_yisang",
            enable: "phaseUse",
            // ✅ 修复 usable 函数签名
            usable: function() {
                var groups = [];
                for (var i = 0; i < game.players.length; i++) {
                    var group = game.players[i].group;
                    if (group && group != 'unknown' && !groups.includes(group)) {
                        groups.push(group);
                    }
                }
                return Math.max(1, groups.length);
            },
            filter: function(event, player) {
                return ui.cardPile && ui.cardPile.childNodes.length > 0;
            },
            filterTarget: true,
            content: function() {
                "step 0";
                var card = ui.cardPile.lastChild;
                if (!card) {
                    event.finish();
                    return;
                }
                player.showCards([card], "诒桑");
                event.showCard = card;
                event.target = targets[0];
                
                "step 1";
                if (!event.target.storage.gz_yisang_got) {
                    event.target.storage.gz_yisang_got = 0;
                }
                event.gotCount = event.target.storage.gz_yisang_got;
                
                "step 2";
                if (event.gotCount > 0) {
                    var ctype = get.type(event.showCard);
                    player.chooseToDiscard("he", 1, true, "弃置一张与" + get.translation(ctype) + "类型不同的牌")
                        .set('filterCard', function(card) {
                            return get.type(card) != _status.event.cardType;
                        })
                        .set('cardType', ctype)
                        .set('ai', function(card) {
                            return 6 - get.value(card);
                        });
                } else {
                    event.goto(4);
                }
                
                "step 3";
                if (!result || !result.bool) {
                    event.finish();
                    return;
                }
                
                "step 4";
                event.target.gain(event.showCard, "gain2");
                event.target.storage.gz_yisang_got = event.gotCount + 1;
                player.line(event.target);
            },
            ai: {
                order: 10,
                result: {
                    target: function(player, target) {
                        return get.attitude(player, target) > 0 ? 1 : -1;
                    }
                }
            },
            sub: true,
            sourceSkill: "gz_yisang",
        },
        
        damage: {
            audio: "gz_yisang",
            trigger: { 
                player: "damageEnd" 
            },
            forced: true,
            filter: function(event, player) {
                return ui.cardPile && ui.cardPile.childNodes.length > 0;
            },
            content: function() {
                "step 0";
                var card = ui.cardPile.lastChild;
                if (!card) {
                    event.finish();
                    return;
                }
                player.showCards([card], "诒桑");
                event.showCard = card;
                
                player.chooseTarget("诒桑：请选择获得此牌的角色", true)
                    .set('ai', function(target) {
                        return get.attitude(_status.event.player, target);
                    });
                
                "step 1";
                if (!result.bool || !result.targets || !result.targets.length) {
                    event.finish();
                    return;
                }
                
                var target = result.targets[0];
                event.target = target;
                
                if (!target.storage.gz_yisang_got) {
                    target.storage.gz_yisang_got = 0;
                }
                event.gotCount = target.storage.gz_yisang_got;
                
                "step 2";
                if (event.gotCount > 0) {
                    var ctype = get.type(event.showCard);
                    player.chooseToDiscard("he", 1, true, "弃置一张与" + get.translation(ctype) + "类型不同的牌")
                        .set('filterCard', function(card) {
                            return get.type(card) != _status.event.cardType;
                        })
                        .set('cardType', ctype)
                        .set('ai', function(card) {
                            return 6 - get.value(card);
                        });
                } else {
                    event.goto(4);
                }
                
                "step 3";
                if (!result || !result.bool) {
                    event.finish();
                    return;
                }
                
                "step 4";
                event.target.gain(event.showCard, "gain2");
                event.target.storage.gz_yisang_got = event.gotCount + 1;
                player.line(event.target);
            },
            sub: true,
            sourceSkill: "gz_yisang",
        },
        
        clear: {
            trigger: { 
                global: "phaseEnd" 
            },
            forced: true,
            popup: false,
            silent: true,
            firstDo: true,
            content: function() {
                // ✅ 清空所有角色的 gz_yisang_got
                for (var i = 0; i < game.players.length; i++) {
                    delete game.players[i].storage.gz_yisang_got;
                }
            },
            sub: true,
            sourceSkill: "gz_yisang",
        }
    }
},
            "gz_jiubo": {
                audio: "ext:鹰击长空/audio/skill:2",
                locked: true,
                trigger: {
                    player: "damageBegin",
                },
                filter: function(event, player) {
                    if (!event.card || event.card.nature || !event.source) return false;
                    if (event.targets && event.targets.length > 1) return false;
                    var target = event.target;
                    if (!target || target.group !== player.group) return false;
                    var source = event.source;
                    if (!source) return false;
                    // 判断是否是本回合来源使用的第一张牌
                    var history = source.getHistory('useCard', evt => evt.card == event.card);
                    if (history.length > 1) return false;
                    return player.countCards('h', card => get.type(card) != 'basic') > 0;
                },
                filterCard: function(card) {
                    return get.type(card) != 'basic';
                },
                check: function(card) {
                    return 8 - get.value(card);
                },
                content: function() {
                    trigger.getParent().targets.remove(trigger.target);
                    game.log(player, "弃置一张非基本牌取消了", trigger.target, "成为伤害目标");
                    // 如果是本回合第一次用牌由来源发动，改为自己成为目标
                    var source = trigger.source;
                    if (source && trigger.getParent().player == source) {
                        trigger.getParent().targets.push(player);
                        game.log(player, "代替", trigger.target, "成为伤害牌目标");
                    }
                },
                "_priority": 0,
            },
       "gz_lingzhi": {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: "phaseUse",
    usable: 1,
    filterTarget: function(card, player, target) {
        // 可选择攻击范围内的其他角色
        return player.inRange(target) && target != player;
    },
    filterCard: true,
    selectCard: 1,
    filterCard: function(card, player) {
        // 可选择自己手牌或装备裡的牌（扩展filter）
        return player.getCards('he').includes(card);
    },
    multitarget: false,
    content: function() {
        "step 0";
        // 取得玩家展示的牌
        player.showCards(cards, "凌志");
        event.showCard = cards[0];
        event.target = targets[0];
        player.line(event.target);

        "step 1";
        // 让目标选择交牌或受伤害选项
        event.target.chooseControl("选项一", "选项二")
            .set("choiceList", [
                "交给" + get.translation(player) + "一张牌名长度不小于" + get.translation(event.showCard) + "的牌(手牌或装备)",
                get.translation(player) + "获得此牌，然后对你造成一点伤害"
            ])
            .set("ai", function() {
                var target = _status.event.player;
                var player = _status.event.getParent().player;
                var neededLen = get.translation(_status.event.getParent().showCard.name).length;
                // 从手牌+装备区域查找符合长度需求的牌
                var canGive = target.countCards("he", function(card) {
                    return get.translation(card.name).length >= neededLen;
                }) > 0;
                // 有牌且体力充足则优先交牌
                if (canGive && target.hp > 2) return 0;
                // 否则选受伤害
                return 1;
            });
        "step 2";
        if (result.control == "选项一") {
            // 目标选择交牌，牌必须在手牌或装备区
            event.target.chooseCard("he", "请交给" + get.translation(player) + "一张牌名长度不小于" + get.translation(event.showCard) + "的牌", true, function(card) {
                return get.translation(card.name).length >= get.translation(event.showCard.name).length;
            }).set("ai", card => 6 - get.value(card));
        } else {
            // 选项二直接跳步骤4伤害处理
            event.goto(4);
        }
        "step 3";
        if (result.bool && result.cards && result.cards.length) {
            // 交牌给使用者
            event.target.give(result.cards, player);
            event.finish();
        }
        "step 4";
        // 目标获得展示牌（从装备区移交或得牌）
        event.target.gain(event.showCard, "gain2");
        player.line(event.target);
        // 对目标造成1点伤害
        event.target.damage(player);
    },
    ai: {
        order: 8,
        result: {
            player: 1,
            target: function(player, target) {  // ✅ 修复：添加 player 参数
                return -get.attitude(player, target);
            },
        },
    },
},
gz_ruluo: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        player: "phaseUseBegin",
    },
    filter: function(event, player) {
        if (!player.storage.gz_ruluo_options) {
            player.storage.gz_ruluo_options = [1, 2, 3];
        }
        return player.storage.gz_ruluo_options.length > 0;
    },
    direct: true,
    content: function() {
        "step 0";
        event.groupCount = game.countGroup();

        player.chooseControl("cancel2", "发动入洛")
            .set("prompt", "入洛：是否摸" + event.groupCount + "张牌并展示所有手牌？")
            .set("ai", function() {
                var player = _status.event.player;
                var groupCount = _status.event.getParent().groupCount;
                if (player.countCards("h") <= 3) return "发动入洛";
                if (groupCount >= 3) return "发动入洛";
                return "cancel2";
            });

        "step 1";
        if (result.control != "发动入洛") {
            event.finish();
            return;
        }

        player.logSkill("gz_ruluo");
        player.draw(event.groupCount);

        "step 2";
        var allCards = player.getCards("h");
        if (allCards.length === 0) {
            event.finish();
            return;
        }

        player.showCards(allCards, "入洛");
        event.allCards = allCards;

        // 给展示牌加标签
        player.addGaintag(allCards, "gz_ruluo_basic");

        // 统计牌类别数，最多3类
        var cardTypes = [];
        for (var i = 0; i < allCards.length; i++) {
            var cardType = get.type(allCards[i], false);
            if (!cardTypes.includes(cardType)) cardTypes.push(cardType);
        }
        event.typeCount = Math.min(cardTypes.length, 3);

        game.log(player, "展示了", allCards.length, "张手牌，共", "#g" + event.typeCount + "种", "类别");

        "step 3";
        var availableOptions = player.storage.gz_ruluo_options || [1, 2, 3];
        var choiceList = [
            "这些牌中的非基本牌可当相同牌名长度且未以此法使用过的锦囊牌使用，且奇/偶次使用时无法选择自己/其他人为目标（限展示牌）",
            "这些牌中的基本牌无次数与距离限制（限展示牌）",
            "本回合内，体力值小于你展示牌类别数（" + event.typeCount + "）的角色的非锁定技失效"
        ];

        var controls = [];
        var enabledList = [];
        for (var i = 0; i < 3; i++) {
            if (availableOptions.includes(i + 1)) {
                controls.push("选项" + (i + 1));
                enabledList.push(choiceList[i]);
            } else {
                enabledList.push('<span style="opacity:0.5">（已移除）' + choiceList[i] + "</span>");
            }
        }

        player.chooseControl(controls)
            .set("choiceList", enabledList)
            .set("prompt", "入洛：选择一项效果（选择后该选项将被移除）")
            .set("ai", function() {
                var player = _status.event.player;
                var allCards = _status.event.getParent().allCards;
                var typeCount = _status.event.getParent().typeCount;
                var availableOptions = player.storage.gz_ruluo_options || [1, 2, 3];

                var basicCount = allCards.filter(c => get.type(c) == "basic" && c.hasGaintag("gz_ruluo_basic")).length;
                var nonBasicCount = allCards.filter(c => get.type(c) != "basic" && c.hasGaintag("gz_ruluo_basic")).length;

                if (availableOptions.includes(3)) {
                    var hasWeakEnemy = game.hasPlayer(cur => get.attitude(player, cur) < 0 && cur.hp < typeCount);
                    if (hasWeakEnemy) return "选项3";
                }
                if (availableOptions.includes(1) && nonBasicCount >= 3) return "选项1";
                if (availableOptions.includes(2) && basicCount >= 2) return "选项2";
                return "选项" + availableOptions[0];
            });

        "step 4";
        var selectedOption = parseInt(result.control.replace("选项", ""));
        event.selectedOption = selectedOption;

        if (!player.storage.gz_ruluo_options) player.storage.gz_ruluo_options = [1, 2, 3];
        player.storage.gz_ruluo_options.remove(selectedOption);

        game.log(player, "选择了", "#g选项" + selectedOption, "，该选项已被移除");

        if (selectedOption == 1) {
            player.addTempSkill("gz_ruluo_trick", "phaseAfter");
            player.storage.gz_ruluo_trick_used = [];
            player.storage.gz_ruluo_trick_count = 0;
            player.markSkill("gz_ruluo_trick");
            game.log(player, "的非基本牌可以当相同牌名长度且带“入洛”标记的锦囊牌使用");
        } else if (selectedOption == 2) {
            player.addTempSkill("gz_ruluo_basic", "phaseAfter");
            game.log(player, "的基本牌无次数与距离限制（仅限带“入洛”标记的牌）");
        } else if (selectedOption == 3) {
            // ✅ 修复：使用内置 fengyin 技能
            var targets = game.filterPlayer(cur => cur.hp < event.typeCount);
            for (var target of targets) {
                // ✅ 先检查是否已有 fengyin
                if (!target.hasSkill("fengyin")) {
                    target.addTempSkill("fengyin");
                }
                // ✅ 标记是由哪个玩家添加的，用于清除
                if (!target.storage.gz_ruluo_fengyin_source) {
                    target.storage.gz_ruluo_fengyin_source = [];
                }
                target.storage.gz_ruluo_fengyin_source.push(player);
            }
            
            // ✅ 给发动者添加清除技能
            player.addTempSkill("gz_ruluo_fengyin_clear", "phaseUseAfter");
            player.storage.gz_ruluo_fengyin_targets = targets;
            
            game.log("本回合内，体力值小于", event.typeCount, "的角色的非锁定技失效");
        }
    },

    subSkill: {
        trick: {
            mark: true,
            intro: {
                content: function(storage, player) {
                    var used = player.storage.gz_ruluo_trick_used || [];
                    var count = player.storage.gz_ruluo_trick_count || 0;
                    var text = "非基本牌可转化为相同牌名长度且带“入洛”标记的锦囊牌<br>已使用" + count + "次，";
                    text += (count % 2 == 0 ? "下次无法选择自己" : "下次无法选择其他人");
                    if (used.length > 0) text += "<br>已使用：" + get.translation(used);
                    return text;
                },
            },
            enable: ["chooseToUse"],
            filter: function(event, player) {
                return player.countCards("hs", c => get.type(c) != "basic" && c.hasGaintag("gz_ruluo_basic")) > 0;
            },
            chooseButton: {
                dialog: function() {
                    var list = [];
                    var used = _status.event.player.storage.gz_ruluo_trick_used || [];
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var name = lib.inpile[i];
                        if (get.type(name) == "trick" && !used.includes(name)) {
                            list.push(["锦囊", "", "" + name]);
                        }
                    }
                    if (list.length == 0) return ui.create.dialog("入洛：没有可转化的锦囊牌");
                    return ui.create.dialog("入洛：选择要转化的锦囊牌", [list, "vcard"]);
                },
                filter: function(button) {
                    var name = button.link[2];
                    var nameLen = get.translation(name).length;
                    return _status.event.player.hasCard(c => {
                        return get.type(c) != "basic" && get.translation(c.name).length == nameLen && c.hasGaintag("gz_ruluo_basic");
                    }, "hs");
                },
                check: function(button) {
                    return _status.event.player.getUseValue({ name: button.link[2] });
                },
                backup: function(links, player) {
                    var name = links[0][2];
                    return {
                        filterCard: function(card) {
                            if (get.type(card) == "basic") return false;
                            if (!card.hasGaintag("gz_ruluo_basic")) return false;
                            return get.translation(card.name).length == get.translation(name).length;
                        },
                        selectCard: 1,
                        position: "hs",
                        popname: true,
                        viewAs: { name: name },
                        filterTarget: function(card, player, target) {
                            var count = player.storage.gz_ruluo_trick_count || 0;
                            if (count % 2 == 0) {
                                if (target == player) return false;
                            } else {
                                if (target != player) return false;
                            }
                            return lib.filter.targetEnabled.apply(this, arguments);
                        },
                        onuse: function(result, player) {
                            if (!player.storage.gz_ruluo_trick_used) player.storage.gz_ruluo_trick_used = [];
                            if (!player.storage.gz_ruluo_trick_count) player.storage.gz_ruluo_trick_count = 0;
                            player.storage.gz_ruluo_trick_used.push(name);
                            player.storage.gz_ruluo_trick_count++;
                            player.markSkill("gz_ruluo_trick");
                        },
                    };
                },
                prompt: function(links) {
                    return "将一张非基本牌标记为“入洛”并当做【" + get.translation(links[0][2]) + "】使用";
                },
            },
            ai: {
                order: 10,
                result: {
                    player: 1,
                },
            },
            sub: true,
            sourceSkill: "gz_ruluo",
            _priority: 0,
        },

        basic: {
            charlotte: true,
            mod: {
                cardUsable(card, player) {
                    if (!player.isPhaseUsing() || get.type(card) != 'basic') return;
                    if (card.cards?.every(i => i.hasGaintag('gz_ruluo_basic'))) return Infinity;
                },
                targetInRange(card, player) {
                    if (!player.isPhaseUsing() || get.type(card) != 'basic') return;
                    if (card.cards?.every(i => i.hasGaintag('gz_ruluo_basic'))) return true;
                },
            },
        },

        // ✅ 新增：清除 fengyin 技能
        fengyin_clear: {
            trigger: {
                player: "phaseUseAfter"
            },
            forced: true,
            popup: false,
            charlotte: true,
            content: function() {
                var targets = player.storage.gz_ruluo_fengyin_targets || [];
                for (var target of targets) {
                    if (target.storage.gz_ruluo_fengyin_source) {
                        target.storage.gz_ruluo_fengyin_source.remove(player);
                        
                        // ✅ 如果没有其他来源的 fengyin，则移除技能
                        if (target.storage.gz_ruluo_fengyin_source.length == 0) {
                            target.removeSkill("fengyin");
                            delete target.storage.gz_ruluo_fengyin_source;
                        }
                    }
                }
                delete player.storage.gz_ruluo_fengyin_targets;
            },
            sub: true,
        },

        clearTag: {
            trigger: {
                player: "phaseUseEnd",
            },
            forced: true,
            popup: false,
            content: function() {
                var handcards = player.getCards("h");
                player.removeGaintag(handcards, "gz_ruluo_basic");
                player.storage.gz_ruluo_trick_used = [];
                player.storage.gz_ruluo_trick_count = 0;
            },
            sub: true,
        },
    },

    ai: {
        expose: 0.2,
    },
    _priority: 0,
},
           "gz_linzhe": {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: "phaseUse",
    limited: true,
    mark: true,
    skillAnimation: true,
    animationColor: "thunder",
    init: function(player, skill) {
        player.storage[skill] = false;
    },
    filter: function(event, player) {
        if (player.storage.gz_linzhe) return false;
        return game.hasPlayer(function(current) {
            return current.group == player.group;
        });
    },
    content: function() {
        "step 0";
        player.awakenSkill("gz_linzhe");
        player.addTempSkill("gz_linzhe_check", "phaseJieshuAfter");
     
        event.players = game.filterPlayer(function(current) {
            return current.group == player.group;
        }).sort(lib.sort.seat);
        event.num = 0;
     
        "step 1";
        if (event.num < event.players.length) {
            event.current = event.players[event.num];
        } else {
            event.finish();
            return;
        }
     
        if (!event.current || !event.current.isAlive()) {
            event.num++;
            event.redo();
            return;
        }
     
        // ✅ 检查是否有锦囊牌
        var hasTrick = event.current.countCards("h", {type: "trick"}) > 0;
        var hasVice = event.current.name2 != undefined;
        
        // ✅ 根据条件动态生成选项
        if (hasTrick && hasVice) {
            // 两个选项都可用
            event.current.chooseControl("选项一", "选项二").set("choiceList", [
                "使用一张锦囊牌，然后变更副将",
                "获得一个阴阳鱼标记，若此时手牌数等于体力上限则改为珠联璧合标记"
            ]).set("ai", function() {
                var target = _status.event.player;
                if (target.countCards("h", {type: "trick"}) > 0 && target.name2) return 0;
                return 1;
            });
        } else if (hasTrick && !hasVice) {
            // 只能选选项二（有锦囊但没副将）
            event.current.chooseControl("选项二").set("choiceList", [
                '<span style="opacity:0.5">使用一张锦囊牌，然后变更副将（无副将）</span>',
                "获得一个阴阳鱼标记，若此时手牌数等于体力上限则改为珠联璧合标记"
            ]).set("ai", function() {
                return 0; // 只有一个选项，返回0
            });
        } else if (!hasTrick && hasVice) {
            // 只能选选项二（没锦囊但有副将）
            event.current.chooseControl("选项二").set("choiceList", [
                '<span style="opacity:0.5">使用一张锦囊牌，然后变更副将（无锦囊牌）</span>',
                "获得一个阴阳鱼标记，若此时手牌数等于体力上限则改为珠联璧合标记"
            ]).set("ai", function() {
                return 0;
            });
        } else {
            // 两个都不满足，直接执行选项二
            result = {control: "选项二"};
            event.goto(2);
            return;
        }
     
        "step 2";
        event.chooseResult = result.control;
      
        if (event.chooseResult == "选项一") {
            event.current.chooseToUse("遴哲：使用一张锦囊牌", function(card) {
                return get.type(card) == "trick";
            });
        } else {
            if (event.current.countCards("h") == event.current.maxHp) {
                event.current.addMark("zhulianbihe_mark", 1);
                game.log(event.current, "获得了珠联璧合标记");
            } else {
                event.current.addMark("yinyang_mark", 1);
                game.log(event.current, "获得了阴阳鱼标记");
            }
            event.num++;
            event.goto(1);
        }
     
        "step 3";
        if (event.chooseResult != "选项一") {
            event.finish();
            return;
        }
        if (!result.bool || !event.current.name2) {
            event.num++;
            event.goto(1);
            return;
        }
       
        if (event.current == player && player.name2) {
            var viceInfo = lib.character[player.name2];
            if (viceInfo && viceInfo[3] && viceInfo[3].includes('gz_linzhe')) {
                player.storage.gz_linzhe_vice_changed = true;
            }
        }
       
        event.current.changeVice();
       
        "step 4";
        event.num++;
        event.goto(1);
    },
    subSkill: {
        check: {
            trigger: {
                player: "phaseJieshuBegin",
            },
            forced: true,
            charlotte: true,
            content: function() {
                if (player.storage.gz_linzhe_vice_changed) {
                    delete player.storage.gz_linzhe_vice_changed;
                    game.log(player, "因副将变更失去【遴哲】，不触发重置效果");
                    return;
                }
               
                // ✅ 修改：统计势力
                var groups = {};
                for (var i = 0; i < game.players.length; i++) {
                    var group = game.players[i].group;
                    if (group && group != 'unknown') {
                        if (!groups[group]) groups[group] = 0;
                        groups[group]++;
                    }
                }
             
                var maxCount = 0;
                var maxGroups = [];
                for (var group in groups) {
                    if (groups[group] > maxCount) {
                        maxCount = groups[group];
                        maxGroups = [group];
                    } else if (groups[group] == maxCount) {
                        maxGroups.push(group);
                    }
                }
             
                // ✅ 修改：重置限定技的正确方法
                if (maxGroups.length == 1 && maxGroups[0] == player.group) {
                    player.storage.gz_linzhe = false;
                    player.unmarkSkill('gz_linzhe'); // 移除标记
					player.restoreSkill('gz_linzhe');
                    game.log(player, '所在势力为唯一大势力，【遴哲】视为未发动');
                    game.broadcastAll(function(player) {
                        // 刷新技能按钮状态
                        if (player.isUnderControl(true)) {
                            ui.updatehl();
                        }
                    }, player);
                }
            },
            sub: true,
            sourceSkill: "gz_linzhe",
            "_priority": 0,
        },
    },
    ai: {
        order: 10,
        result: {
            player: 1,
        },
    },
    intro: {
        content: "limited",
    },
    "_priority": 0,
},
"gz_yamai": {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        global: "phaseJieshuBegin",
    },
    zhenfa: "inline",
    direct: true,
filter: function(event, player) {
    // 至少2人才能触发阵法
    if (game.countPlayer() < 2) return false;
   
    // 判断是否在同一阵列 - 使用isFriendOf
            if (!player.inline || !player.inline(event.player)) return false;

   
    // 判断本回合是否有记录的牌
    if (!player.storage.gz_yamai_cards || player.storage.gz_yamai_cards.length == 0) {
        return false;
    }
   
    // 判断是否有可用的牌
    var cards = player.storage.gz_yamai_cards;
    return cards.some(function(card) {
        if (player.getCards("h").includes(card)) {
            return player.hasUseTarget(card);
        }
        if (ui.discardPile && ui.discardPile.contains(card)) {
            return player.hasUseTarget(card);
        }
        return false;
    });
},
    content: function() {
        "step 0";
        var cards = player.storage.gz_yamai_cards || [];
        var validCards = [];
       
        // 筛选在手牌区或弃牌堆且可用的牌
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if (player.getCards("h").includes(card) && player.hasUseTarget(card)) {
                validCards.push(card);
            } else if (ui.discardPile && ui.discardPile.contains(card) && player.hasUseTarget(card)) {
                validCards.push(card);
            }
        }
       
        if (validCards.length == 0) {
            event.finish();
            return;
        }
       
        event.validCards = validCards;
       
        player.chooseButton([
            get.prompt("gz_yamai"),
            "选择使用其中一张牌",
            validCards
        ]).set("filterButton", function(button) {
            return _status.event.player.hasUseTarget(button.link);
        }).set("ai", function(button) {
            return _status.event.player.getUseValue(button.link);
        });
       
        "step 1";
        if (!result.bool || !result.links || !result.links.length) {
            event.finish();
            return;
        }
       
        var card = result.links[0];
        player.logSkill("gz_yamai");
        
        // 直接使用牌，无论是在手牌还是弃牌堆
        player.chooseUseTarget(card, true, "nopopup");
    },
    group: ["gz_yamai_record","gz_yamai_clear"],
    subSkill: {
        record: {
            trigger: {
                player: ["gainAfter","useCard"],
            },
            forced: true,
            popup: false,
            silent: true,
            firstDo: true,
            content: function() {
                if (!player.storage.gz_yamai_cards) {
                    player.storage.gz_yamai_cards = [];
                }
                if (trigger.cards && trigger.cards.length) {
                    for (var i = 0; i < trigger.cards.length; i++) {
                        if (!player.storage.gz_yamai_cards.includes(trigger.cards[i])) {
                            player.storage.gz_yamai_cards.push(trigger.cards[i]);
                        }
                    }
                }
            },
            sub: true,
            sourceSkill: "gz_yamai",
            "_priority": 1,
        },
        clear: {
            trigger: {
                global: "phaseBegin",
            },
            forced: true,
            popup: false,
            silent: true,
            firstDo: true,
            content: function() {
                // 每个回合开始时清空所有人的记录
                for (var i = 0; i < game.players.length; i++) {
                    game.players[i].storage.gz_yamai_cards = [];
                }
            },
            sub: true,
            sourceSkill: "gz_yamai",
            "_priority": 1,
        },
    },
    "_priority": 0,
},
"gz_liefa": {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: ["chooseToUse", "chooseToRespond"],
    filter: function(event, player) {
        for (var i = 0; i < lib.inpile.length; i++) {
            var name = lib.inpile[i];
            if (get.type(name) == "basic") {
                if (event.filterCard({name: name, isCard: true}, player, event)) {
                    if (lib.skill.gz_liefa.checkUsable(player, name)) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    chooseButton: {
        dialog: function(event, player) {
            var list = [];
            for (var i = 0; i < lib.inpile.length; i++) {
                var name = lib.inpile[i];
                if (get.type(name) == "basic") {
                    list.push(["基本", "", name]);
                    if (name == "sha") {
                        for (var j = 0; j < lib.inpile_nature.length; j++) {
                            list.push(["基本", "", name, lib.inpile_nature[j]]);
                        }
                    }
                }
            }
            return ui.create.dialog("烈伐", [list, "vcard"]);
        },
        filter: function(button, player) {
            var evt = _status.event.getParent();
            var card = {name: button.link[2], nature: button.link[3]};
            if (!evt.filterCard(card, player, evt)) return false;
            return lib.skill.gz_liefa.checkUsable(player, button.link[2]);
        },
        check: function(button) {
            var player = _status.event.player;
            var card = {name: button.link[2], nature: button.link[3]};
            
            var includesSelf = false;
            if (button.link[2] == "tao" || button.link[2] == "jiu") {
                includesSelf = true;
            }
            
            var value = player.getUseValue(card);
            
            if (includesSelf) {
                if (player.countCards("he") < 2) return 0;
                value -= 3;
            } else {
                if (player.hp <= 1) return 0;
                value -= 2;
            }
            
            return value;
        },
        backup: function(links, player) {
            return {
                filterCard: function() { return false; },
                selectCard: -1,
                viewAs: {name: links[0][2], nature: links[0][3]},
                popname: true,
                precontent: function() {
                    "step 0";
                    // 记录次数
                    if (!player.storage.gz_liefa_count) {
                        player.storage.gz_liefa_count = {};
                    }
                    var cardname = event.result.card.name;
                    if (!player.storage.gz_liefa_count[cardname]) {
                        player.storage.gz_liefa_count[cardname] = 0;
                    }
                    player.storage.gz_liefa_count[cardname]++;
                    
                    if (!player.hasSkill("gz_liefa_clear")) {
                        player.addTempSkill("gz_liefa_clear", "phaseAfter");
                    }
                    
                    player.logSkill("gz_liefa");
                    
                    // ✅ 设置不计入次数（默认）
                    event.result._gz_liefa_noCount = true;
                    
                    var targets = event.result.targets || [];
                    var includesSelf = targets.includes(player);
                    
                    if (includesSelf) {
                        game.log(player, "发动【烈伐】，需弃置两张牌");
                        if (player.countCards("he") >= 2) {
                            player.chooseToDiscard("he", 2, true).set("prompt", "烈伐：弃置两张牌");
                        } else if (player.countCards("he") > 0) {
                            player.chooseToDiscard("he", player.countCards("he"), true).set("prompt", "烈伐：弃置所有牌");
                        }
                    } else {
                        game.log(player, "发动【烈伐】，失去1点体力");
                        player.loseHp();
                    }
                },
            };
        },
        prompt: function(links, player) {
            var used = lib.skill.gz_liefa.getUsed(player, links[0][2]);
            return "视为使用【" + get.translation(links[0][2]) + "】（本回合已使用" + used + "/1次，不计入出牌次数）";
        },
    },
    // ✅ 添加 group，监听使用和打出后
    group: ["gz_liefa_after"],
    getUsed: function(player, cardname) {
        if (!player.storage.gz_liefa_count) return 0;
        return player.storage.gz_liefa_count[cardname] || 0;
    },
    checkUsable: function(player, cardname) {
        var used = lib.skill.gz_liefa.getUsed(player, cardname);
        return used < 1; // 每回合每种牌名限一次
    },
    ai: {
        order: 10,
        result: {
            player: function(player) {
                if (player.hp <= 1 && player.countCards("he") < 2) return 0;
                return 1;
            },
        },
        respondSha: true,
        respondShan: true,
        skillTagFilter: function(player, tag) {
            if (player.hp <= 1 && player.countCards("he") < 2) return false;
            if (tag == "respondSha") return lib.skill.gz_liefa.checkUsable(player, "sha");
            if (tag == "respondShan") return lib.skill.gz_liefa.checkUsable(player, "shan");
        },
    },
    subSkill: {
        // ✅ 统一处理使用后和打出后
        after: {
            trigger: {
                player: ["useCardAfter", "respondAfter"],
            },
            forced: true,
            popup: false,
            silent: true,
            filter: function(event, player) {
                // 只处理通过烈伐使用/打出的牌
                return event.skill && event.skill == "gz_liefa_backup";
            },
            content: function() {
                "step 0";
                // ✅ 设置不计入出牌次数
                if (trigger.addCount !== false) {
                    trigger.addCount = false;
                    var cardname = trigger.card.name;
                    if (player.stat && player.stat[player.stat.length - 1].card && player.stat[player.stat.length - 1].card[cardname]) {
                        player.stat[player.stat.length - 1].card[cardname]--;
                    }
                }
                
                "step 1";
                // ✅ 若当前回合角色与你势力相同，其摸一张牌
                var current = _status.currentPhase;
                if (current && current.isAlive() && current.group == player.group) {
                    game.log(current, "与", player, "势力相同，摸一张牌");
                    current.draw();
                }
            },
            sub: true,
            sourceSkill: "gz_liefa",
        },
        clear: {
            charlotte: true,
            onremove: function(player) {
                delete player.storage.gz_liefa_count;
            },
            sub: true,
            sourceSkill: "gz_liefa",
        },
    },
},
        "gz_yanzuo": {
    audio: "dcyanzuo",
    enable: ["phaseUse"],
    trigger: {
        player: ["chooseToUse","chooseToRespond"],
    },
    usable: 1,
    filterCard: function(card, player) {
        var cards = ui.selected.cards;
        if (cards.length == 0) return true;
        var type = get.type2(cards[0]);
        return get.type2(card) == type;
    },
    selectCard: [2,Infinity],
    position: "he",
    check: function(card) {
        var player = _status.event.player;
        return 6 - get.value(card);
    },
    filter: function(event, player) {
        if (player.countCards("he") < 2) return false;
        if (event.type == "phase") return true;
        if (event.filterCard) {
            var cards = player.getCards("he");
            var typeCount = {basic: 0, trick: 0};
            for (var i = 0; i < cards.length; i++) {
                var type = get.type2(cards[i]);
                if (type == "basic") typeCount.basic++;
                if (type == "trick") typeCount.trick++;
            }
            if (event.filterCard({name: "sha"}, player, event) ||
                event.filterCard({name: "shan"}, player, event) ||
                event.filterCard({name: "tao"}, player, event) ||
                event.filterCard({name: "jiu"}, player, event)) {
                if (typeCount.basic >= 2) return true;
            }
            if (event.filterCard({name: "wuxie"}, player, event) ||
                event.filterCard({name: "wuzhong"}, player, event)) {
                if (typeCount.trick >= 2) return true;
            }
            return false;
        }
        return true;
    },
    content: function() {
        "step 0";
        var type = get.type2(cards[0]);
        event.cardType = type;
        player.lose(cards, ui.discardPile);
        player.$throw(cards, 1000);
        game.log(player, "重铸了", get.translation(cards));
        player.draw(cards.length);
        
        "step 1";
        var list = [];
        for (var i = 0; i < lib.inpile.length; i++) {
            var name = lib.inpile[i];
            var cardType = get.type2({name: name});
            if (cardType == event.cardType && get.type(name) != "equip") {
                if (cardType == "basic") {
                    list.push(["基本", "", name]);
                    if (name == "sha") {
                        for (var j = 0; j < lib.inpile_nature.length; j++) {
                            list.push(["基本", "", name, lib.inpile_nature[j]]);
                        }
                    }
                } else if (cardType == "trick") {
                    list.push(["锦囊", "", name]);
                } else if (cardType == "delay") {
                    list.push(["延时锦囊", "", name]);
                }
            }
        }
        if (list.length == 0) {
            event.finish();
            return;
        }
        var evt = event.getParent(2);
        player.chooseButton([
            "研作：选择视为使用的牌",
            [list, "vcard"]
        ]).set("filterButton", function(button) {
            var player = _status.event.player;
            var card = {name: button.link[2], nature: button.link[3]};
            var evt = _status.event.evt;
            if (evt && evt.filterCard) {
                return evt.filterCard(card, player, evt);
            }
            return player.hasUseTarget(card);
        }).set("evt", evt).set("ai", function(button) {
            var player = _status.event.player;
            var card = {name: button.link[2], nature: button.link[3]};
            return player.getUseValue(card);
        });
        
        "step 2";
        if (result.bool) {
            var card = {name: result.links[0][2], nature: result.links[0][3]};
            
            // ✅ 修改1：保存转化的牌信息
            player.storage.gz_yanzuo_card = {
                name: card.name,
                nature: card.nature
            };
            player.addTempSkill("gz_yanzuo_distance");
            
            var evt = event.getParent(2);
            if (evt.name == "chooseToRespond") {
                event.result = {
                    bool: true,
                    card: card,
                    cards: []
                };
                evt.result = event.result;
                evt.redo();
            } else {
                player.chooseUseTarget(card, true, "nopopup")
                    .set("addCount", false)
                    .set("logSkill", "gz_yanzuo");
            }
        }
    },
    ai: {
        order: 8,
        result: {
            player: 1,
        },
        respondSha: true,
        respondShan: true,
        skillTagFilter: function(player, tag) {
            return player.countCards("he", {type: "basic"}) >= 2;
        },
    },
    subSkill: {
        distance: {
            charlotte: true,
            // ✅ 修改2：清除保存的牌信息
            onremove: function(player) {
                delete player.storage.gz_yanzuo_card;
            },
            mod: {
                // ✅ 修改3：只对转化的牌生效
                targetInRange: function(card, player) {
                    if (!player.storage.gz_yanzuo_card) return;
                    var stored = player.storage.gz_yanzuo_card;
                    // 检查牌名和属性是否匹配
                    if (card.name == stored.name && card.nature == stored.nature) {
                        return true;
                    }
                },
                // ✅ 修改4：无次数限制
                cardUsable: function(card, player) {
                    if (!player.storage.gz_yanzuo_card) return;
                    var stored = player.storage.gz_yanzuo_card;
                    if (card.name == stored.name && card.nature == stored.nature) {
                        return Infinity;
                    }
                },
            },
            sub: true,
            sourceSkill: "gz_yanzuo",
            "_priority": 0,
        },
    },
    "_priority": 0,
},
            "gz_pijian": {
                audio: "dcpijian",
                mainSkill: true,
                trigger: {
                    global: "phaseJieshuBegin",
                },
                init: function(player, skill) {
                    // 主将时减少体力上限
                    if (player.checkMainSkill("gz_pijian")) {
                        player.removeMaxHp();
                    }
                },
                filter: function(event, player) {
                    // 其他角色的回合
                    if (event.player == player) return false;
                    
                    // 获取该角色本回合进入弃牌堆的牌
                    var cards = [];
                    var history = event.player.getHistory("lose", function(evt) {
                        return evt.toStorage == false;
                    });
                    
                    for (var i = 0; i < history.length; i++) {
                        cards.addArray(history[i].cards.filter(function(card) {
                            return get.position(card) == "d";
                        }));
                    }
                    
                    if (cards.length == 0) return false;
                    
                    // 统计类别
                    var types = [];
                    for (var i = 0; i < cards.length; i++) {
                        var type = get.type2(cards[i]);
                        if (!types.includes(type)) types.push(type);
                    }
                    
                    // 判断手牌是否包含所有类别
                    var handCards = player.getCards("h");
                    for (var i = 0; i < types.length; i++) {
                        var hasType = false;
                        for (var j = 0; j < handCards.length; j++) {
                            if (get.type2(handCards[j]) == types[i]) {
                                hasType = true;
                                break;
                            }
                        }
                        if (!hasType) return false;
                    }
                    
                    return true;
                },
                direct: true,
                content: function() {
                    "step 0";
                    // 获取该角色本回合进入弃牌堆的牌类别
                    var cards = [];
                    var history = trigger.player.getHistory("lose", function(evt) {
                        return evt.toStorage == false;
                    });
                    
                    for (var i = 0; i < history.length; i++) {
                        cards.addArray(history[i].cards.filter(function(card) {
                            return get.position(card) == "d";
                        }));
                    }
                    
                    var types = [];
                    for (var i = 0; i < cards.length; i++) {
                        var type = get.type2(cards[i]);
                        if (!types.includes(type)) types.push(type);
                    }
                    
                    event.types = types;
                    
                    // 获取对应类别的所有手牌
                    var handCards = player.getCards("h");
                    var discardCards = [];
                    for (var i = 0; i < types.length; i++) {
                        for (var j = 0; j < handCards.length; j++) {
                            if (get.type2(handCards[j]) == types[i] && !discardCards.includes(handCards[j])) {
                                discardCards.push(handCards[j]);
                            }
                        }
                    }
                    
                    event.discardCards = discardCards;
                    
                    player.chooseBool(get.prompt("gz_pijian", trigger.player), "展示并弃置" + get.translation(discardCards) + "，对其造成1点雷属性伤害")
                        .set("ai", function() {
                            var player = _status.event.player;
                            var target = _status.event.getParent().trigger.player;
                            return get.damageEffect(target, player, player, "thunder") > 0;
                        });
                    
                    "step 1";
                    if (result.bool) {
                        player.logSkill("gz_pijian", trigger.player);
                        player.showCards(event.discardCards, "辟剑");
                        player.discard(event.discardCards);
                    } else {
                        event.finish();
                    }
                    
                    "step 2";
                    trigger.player.damage(player, "thunder");
                },
                ai: {
                    expose: 0.3,
                },
                "_priority": 0,
            },
            "gz_zeyu": {
                audio: "ext:鹰击长空/audio/skill:2",
                viceSkill: true,
						init(player, skill) {
			player.checkViceSkill("gz_zeyu");
		},
                unique: true,
                trigger: {
                    global: "dying",
                },
                filter: function(event, player) {
                    // 判断是否有触发者
                    if (!event.source || event.source.isDead()) return false;
                    
                    // 触发者与玩家势力相同
                    if (event.source.group != player.group) return false;
                    
                    // 濒死角色与玩家势力不同
                    if (event.player.group == player.group) return false;
                    
                    // 本局首次
                    if (!player.storage.gz_zeyu_targets) {
                        player.storage.gz_zeyu_targets = [];
                    }
                    
                    return !player.storage.gz_zeyu_targets.includes(event.source);
                },
                logTarget: "source",
                check: function(event, player) {
                    return get.attitude(player, event.source) > 0;
                },
                content: function() {
                    "step 0";
                    // 记录已触发
                    if (!player.storage.gz_zeyu_targets) {
                        player.storage.gz_zeyu_targets = [];
                    }
                    player.storage.gz_zeyu_targets.push(trigger.source);
                    
                    // 摸两张牌
                    trigger.source.draw(2);
                    
                    "step 1";
                    // 选择效果
                    trigger.source.chooseControl("主副将易位", "变更副将")
                        .set("prompt", "泽誉：选择一项")
                        .set("ai", function() {
                            var player = _status.event.player;
                            // AI逻辑：根据副将状态选择
                            if (player.viceSkills && player.viceSkills.length) {
                                // 如果有好的副将技能，易位
                                return "主副将易位";
                            }
                            return "变更副将";
                        });
                    
                    "step 2";
                    if (result.control == "主副将易位") {
                         
                         trigger.source.showCharacter(2);
                            game.broadcastAll(
                                (player, name1, name2) => {
                                    trigger.source.name = name2;
                                    trigger.source.sex = get.character(name2).sex;
            
                                    trigger.source.smoothAvatar(false);
                                    trigger.source.name1 = name2;
                                    trigger.source.skin.name = name2;
                                    trigger.source.node.avatar.setBackground(name2, "character");
                                    trigger.source.node.name.innerHTML = get.slimName(name2);
            
                                    trigger.source.smoothAvatar(true);
                                    trigger.source.name2 = name1;
                                    trigger.source.skin.name2 = name1;
                                    trigger.source.node.avatar2.setBackground(name1, "character");
                                    trigger.source.node.name2.innerHTML = get.slimName(name1);
                                },
                                player,
                                trigger.source.name1,
                                trigger.source.name2
                            );
                            trigger.source.update();
                            trigger.source.getSkills(null, false, false).forEach(skill => {
                                const info = get.info(skill);
                                if (info?.viceSkill && trigger.source.checkViceSkill(skill)) {
                                    trigger.source.restoreSkill(skill);
                                }
                                if (info?.mainSkill && trigger.source.checkMainSkill(skill)) {
                                    trigger.source.restoreSkill(skill);
                                }
                            });
                            game.log(trigger.source, "交换了主副将");
                        
                    } else {
                        trigger.source.changeVice();
                    }
                },
                ai: {
                    expose: 0.2,
                },
                "_priority": 0,
            },
          "gz_baoguo": {
    audio: "ext:鹰击长空/audio/skill:3",
    trigger: {
        global: "dying",
    },
    limited: true,
    skillAnimation: true,
    animationColor: "wood",
    filter: function(event, player) {
        // 濒死角色与玩家同势力
        if (event.player.group != player.group) return false;
        // ✅ 使用 isMinor() 判断小势力
        return player.isMinor();
    },
    check: function(event, player) {
        return get.attitude(player, event.player) > 0;
    },
    logTarget: "player",
    mark: true,
    intro: {
        content: "limited",
    },
    content: function() {
        "step 0";
        player.awakenSkill("gz_baoguo");
        
        // ✅ 使用 isMajor() 统计大势力角色数，至少为1
        var majorCount = game.countPlayer(function(current) {
            return current.isMajor();
        });
        
        event.recoverNum = Math.max(1, majorCount);
        game.log("当前大势力角色数：", event.recoverNum);
        
        // 获取所有同势力角色
        var targets = game.filterPlayer(function(current) {
            return current.group == player.group && current.isAlive();
        });
        
        event.targets = targets;
        event.num = 0;
        
        "step 1";
        if (event.num >= event.targets.length) {
            event.finish();
            return;
        }
        
        event.current = event.targets[event.num];
        event.num++;
        
        // 判断是否可以选择选项一
        var canRemoveVice = (event.current.name2 != undefined);
        var canGiveCards = (event.current.countCards("h") > 0);
        // ✅ 使用 isMajor() 判断
        var hasBigGroup = game.hasPlayer(function(target) {
            return target.isMajor();
        });
        
        var canOption1 = (canRemoveVice || canGiveCards) && hasBigGroup;
        event.canOption1 = canOption1;
        
        // ✅ 动态生成选项
        var choices = [];
        var choiceList = [];
        
        if (canOption1) {
            choices.push("选项一");
            choiceList.push("移除副将或将所有手牌交给任意一名大势力角色，然后恢复" + event.recoverNum + "点体力");
        }
        
        choices.push("选项二");
        choiceList.push("摸" + event.recoverNum + "张牌");
        
        event.current.chooseControl(choices)
            .set("prompt", "保国：选择一项")
            .set("choiceList", choiceList)
            .set("ai", function() {
                var player = _status.event.player;
                var evt = _status.event.getParent();
                var recoverNum = evt.recoverNum;
                var canOption1 = evt.canOption1;
                
                if (!canOption1) return "选项二";
                
                // 如果濒死，优先恢复体力
                if (player.hp <= 0) return "选项一";
                
                // 如果体力较低且能恢复较多，选择恢复
                if (player.hp <= player.maxHp - recoverNum) return "选项一";
                
                return "选项二";
            });
        
        "step 2";
        if (result.control == "选项一") {
            event.chooseOption1 = true;
            
            var canRemoveVice = (event.current.name2 != undefined);
            var canGiveCards = (event.current.countCards("h") > 0);
            
            if (canRemoveVice && canGiveCards) {
                event.current.chooseControl("移除副将", "交出手牌")
                    .set("prompt", "保国：选择一项")
                    .set("ai", function() {
                        var player = _status.event.player;
                        var handValue = 0;
                        player.getCards("h").forEach(function(card) {
                            handValue += get.value(card);
                        });
                        
                        // 如果手牌价值低，优先交出手牌
                        if (handValue < 10) return "交出手牌";
                        return "移除副将";
                    });
            } else if (player.hasViceCharacter()) {
                event._result = {control: "移除副将"};
            } else {
                event._result = {control: "交出手牌"};
            }
        } else {
            event.chooseOption1 = false;
            event.goto(5);
        }
        
        "step 3";
        if (result.control == "移除副将") {
            event.removeVice = true;
            event.goto(5);
        } else {
            event.removeVice = false;
            // ✅ 使用 isMajor() 筛选大势力角色
            event.current.chooseTarget("选择一名大势力角色，将所有手牌交给其", true, function(card, player, target) {
                return target.isMajor();
            }).set("ai", function(target) {
                var player = _status.event.player;
                return get.attitude(player, target);
            });
        }
        
        "step 4";
        if (result && result.targets && result.targets.length) {
            var cards = event.current.getCards("h");
            if (cards.length > 0) {
                event.current.give(cards, result.targets[0]);
            }
        }
        
        "step 5";
        if (event.chooseOption1) {
            // ✅ 修复移除副将的逻辑
            if (event.removeVice && event.current.name2) {
                var name2 = event.current.name2;
                // 使用 reinit 方法移除副将
                event.current.removeCharacter(1);
                game.log(event.current, "移除了副将", "#g" + name2);
            }
            
            // 恢复体力
            if (event.recoverNum > 0) {
                event.current.recover(event.recoverNum);
            }
        } else {
            // 摸牌
            if (event.recoverNum > 0) {
                event.current.draw(event.recoverNum);
            }
        }
        
        event.goto(1);
    },
    ai: {
        expose: 0.3,
    },
    init: (player, skill) => (player.storage[skill] = false),
    "_priority": 0,
},
            "gz_yuandao": {
                audio: "ext:鹰击长空/audio/skill:3",
                mainSkill: true,
				   init(player, skill) {
        player.checkMainSkill("gz_yuandao");
    },
                zhenfa: "inline",
                trigger: {
                    global: "useCardAfter",
                },
                forced: true,
                filter: function(event, player) {
                    if (game.countPlayer() < 2) return false;
                    // 同队列
                    if (!player.inline || !player.inline(event.player)) return false;
                    // 锦囊牌
                    return get.type(event.card) == "trick";

				
                },
                content: function() {
                    // 先移除旧的，再添加新的（不累加）
                    trigger.player.removeSkill("gz_yuandao_effect");
                    trigger.player.addTempSkill("gz_yuandao_effect");
                    trigger.player.storage.gz_yuandao_effect = true;
                    trigger.player.markSkill("gz_yuandao_effect");
                    game.log(trigger.player, "下一张牌不计入次数");
                },
                subSkill: {
                    effect: {
                        charlotte: true,
                        onremove: function(player) {
                            delete player.storage.gz_yuandao_effect;
                        },
                        mark: true,
                        intro: {
                            content: "下一张牌不计入次数",
                        },
                        mod: {
                            cardUsable: function(card, player, num) {
                                if (player.storage.gz_yuandao_effect) {
                                    return Infinity;
                                }
                            },
                        },
                        trigger: {
                            player: "useCard",
                        },
                        forced: true,
                        popup: false,
                        content: function() {
                            // 使用任何牌后都立即移除
                            delete player.storage.gz_yuandao_effect;
                            player.removeSkill("gz_yuandao_effect");
                            game.log(player, "的【渊道】效果已消耗");
                        },
                        sub: true,
                        sourceSkill: "gz_yuandao",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            "gz_yunxing": {
				audio:3,
                viceSkill: true,
                trigger: {
                    player: ["phaseBegin","phaseEnd"],
                },
                forced: true,
                filter: function(event, player) {
                    // 🔹 必须在副将位置
                    return player.checkViceSkill("gz_yunxing");
                },
                content: function() {
                    "step 0";
                    player.draw();
                    
                    "step 1";
                    player.chooseCard("h", true, "将一张牌置于牌堆顶")
                        .set("ai", function(card) {
                            // 选择价值最低的牌
                            return -get.value(card);
                        });
                    
                    "step 2";
                    if (result.bool && result.cards && result.cards.length) {
                        player.lose(result.cards, ui.cardPile, "insert");
                        player.$throw(result.cards, 1000);
                        game.log(player, "将", result.cards, "置于牌堆顶");
                    }
                },
                group: "gz_yunxing_judge",
                subSkill: {
                    judge: {
                        trigger: {
                            player: "judgeBegin",
                        },
                        forced: true,
                        content: function() {
                            "step 0";
                            // 计算同势力体力和
                            var hpSum = 0;
                            game.countPlayer(function(current) {
                                if (current.group == player.group) {
                                    hpSum += current.hp;
                                }
                            });
                            
                            event.hpSum = hpSum;
                            game.log("与", player, "势力相同角色的体力值之和：", hpSum);
                            
                            // 等待判定牌翻开
                            game.delay(0.5);
                            
                            "step 1";
                            // 获取判定牌
                            var judgeCard = trigger.judgeResult.card;
                            var point = get.number(judgeCard);
                            
                            game.log("判定牌点数：", point);
                            
                            // 修改花色
                            if (point >= event.hpSum) {
                                trigger.fixedResult = {
                                    suit: "heart",
                                    color: "red",
                                    number: point,
                                    name: judgeCard.name,
                                };
                                game.log("点数不小于体力和，视为红桃");
                            } else {
                                trigger.fixedResult = {
                                    suit: "spade",
                                    color: "black",
                                    number: point,
                                    name: judgeCard.name,
                                };
                                game.log("点数小于体力和，视为黑桃");
                            }
                        },
                        sub: true,
                        sourceSkill: "gz_yunxing",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
          gz_juezhi: {
    audio: "dcfujue",
    enable: "phaseUse",
    usable: 1,
    filter: function(event, player) {
        return game.countPlayer(function(current) {
            return current.group == player.group;
        }) > 0;
    },
    content: function() {
        "step 0";
        // 计算X
        var num = game.countPlayer(function(current) {
            return current.group == player.group;
        });
        event.num = num;
       
        // 初始化存储
        if (!player.storage.gz_juezhi_cards) {
            player.storage.gz_juezhi_cards = [];
        }
        player.storage.gz_juezhi_cards = [];
       
        // 添加临时技能监听判定
        player.addTempSkill('gz_juezhi_judge');
        event.judgeCount = 0;
       
        "step 1";
        if (event.judgeCount < event.num) {
            player.judge();
            event.judgeCount++;
        } else {
            event.goto(3);
        }
       
        "step 2";
        event.goto(1);
       
        "step 3";
        // 移除临时技能
        player.removeSkill('gz_juezhi_judge');
       
        var judgeCards = player.storage.gz_juezhi_cards || [];
        if (judgeCards.length == 0) {
            event.finish();
            return;
        }
       
        // ✅ 不预先筛选，让玩家自己选择，使用 filterButton 动态限制
        player.chooseButton([
            "爵制：选择获得任意张牌（点数和花色均不相同）",
            judgeCards
        ], [1, judgeCards.length])
        .set("filterButton", function(button) {
            // ✅ 动态判断：检查已选牌是否与当前牌冲突
            var card = button.link;
            var selectedButtons = ui.selected.buttons || [];
            
            for (var i = 0; i < selectedButtons.length; i++) {
                var selectedCard = selectedButtons[i].link;
                // 如果点数或花色相同，则不能选
                if (get.number(card) == get.number(selectedCard) || 
                    get.suit(card) == get.suit(selectedCard)) {
                    return false;
                }
            }
            
            return true;
        })
        .set("ai", function(button) {
            return get.value(button.link);
        });
       
        "step 4";
        if (result.bool && result.links && result.links.length) {
            player.gain(result.links, "gain2");
        }
        
        // 清空存储
        delete player.storage.gz_juezhi_cards;
    },
    // 添加子技能监听判定
    group: "gz_juezhi_judge",
    subSkill: {
        judge: {
            trigger: {
                player: "judgeEnd",
            },
            forced: true,
            popup: false,
            silent: true,
            filter: function(event, player) {
                return player.hasSkill('gz_juezhi_judge') && event.result && event.result.card;
            },
            content: function() {
                if (!player.storage.gz_juezhi_cards) {
                    player.storage.gz_juezhi_cards = [];
                }
                // 保存判定牌
                if (trigger.result.card) {
                    player.storage.gz_juezhi_cards.push(trigger.result.card);
                }
            },
            sub: true,
        },
    },
    ai: {
        order: 8,
        result: {
            player: 1,
        },
    },
    "_priority": 0,
},
"gz_xugu": {
    audio: "jsrgshanzheng",
    enable: "phaseUse",
    usable: 1,
    filterTarget: function(card, player, target) {
        if (target.countCards("h") == 0) return false;
        var group = target.group;
        if (!group || group === 'unknown') return true;
        
        var selected = ui.selected.targets || [];
        var sameGroupCount = 0;
        for (var i = 0; i < selected.length; i++) {
            if (selected[i].group === group) {
                sameGroupCount++;
            }
        }
        
        var hasDead = game.dead.some(function(p) {
            return p.group === group;
        });
        
        var groupCounts = {};
        game.countPlayer(function(current) {
            var g = current.group;
            if (g && g !== 'unknown') {
                if (!groupCounts[g]) groupCounts[g] = 0;
                groupCounts[g]++;
            }
        });
        
        var maxCount = 0;
        for (var g in groupCounts) {
            if (groupCounts[g] > maxCount) {
                maxCount = groupCounts[g];
            }
        }
        
        var isMajorGroup = (groupCounts[group] === maxCount && maxCount > 1);
        var maxAllowed = (hasDead || isMajorGroup) ? 2 : 1;
        
        return sameGroupCount < maxAllowed;
    },
    selectTarget: [1, Infinity],
    multitarget: true,
    multiline: true,
    content: function() {
        "step 0";
        event.shown = {};
        event.currentIndex = 0;
        
        "step 1";
        if (event.currentIndex < targets.length) {
            var target = targets[event.currentIndex];
            event.currentIndex++;
            target.chooseCard("h", true, "展示一张手牌")
                .set("ai", function(card) {
                    return -get.value(card);
                });
        } else {
            event.goto(3);
        }
        
        "step 2";
        if (result.bool && result.cards && result.cards.length) {
            var target = targets[event.currentIndex - 1];
            target.showCards(result.cards, "虚淈");
            event.shown[target.playerid] = result.cards[0];
        }
        event.goto(1);
        
        "step 3";
        var suits = {};
        var numbers = {};
        var shownCards = [];
        var playerCards = {};
        
        for (var id in event.shown) {
            var card = event.shown[id];
            shownCards.push(card);
            var suit = get.suit(card);
            var number = get.number(card);
            
            var owner = game.findPlayer(function(cur) {
                return cur.playerid == id;
            });
            
            playerCards[id] = { card: card, owner: owner, suit: suit, number: number };
            
            if (!suits[suit]) suits[suit] = [];
            suits[suit].push(id);
            
            if (!numbers[number]) numbers[number] = [];
            numbers[number].push(id);
        }
        
        event.suits = suits;
        event.numbers = numbers;
        event.shownCards = shownCards;
        event.playerCards = playerCards;
        
        var allSuitsDifferent = (Object.keys(suits).length === shownCards.length);
        var allNumbersDifferent = (Object.keys(numbers).length === shownCards.length);
        
        var minNumber = Infinity;
        var maxNumber = -Infinity;
        var minPlayers = [];
        var maxPlayers = [];
        
        for (var id in event.shown) {
            var card = event.shown[id];
            var num = get.number(card);
            var p = game.findPlayer(function(cur) {
                return cur.playerid == id;
            });
            
            if (num < minNumber) {
                minNumber = num;
                minPlayers = [p];
            } else if (num == minNumber && !minPlayers.includes(p)) {
                minPlayers.push(p);
            }
            
            if (num > maxNumber) {
                maxNumber = num;
                maxPlayers = [p];
            } else if (num == maxNumber && !maxPlayers.includes(p)) {
                maxPlayers.push(p);
            }
        }
        
        event.minPlayers = minPlayers;
        event.maxPlayers = maxPlayers;
        
        if (allSuitsDifferent && allNumbersDifferent) {
            var drawNum = targets.length;
            game.log(player, "摸", drawNum, "张牌并结束出牌阶段并跳过弃牌阶段");
            player.draw(drawNum);
            
            var phaseUse = event.getParent("phaseUse");
            if (phaseUse && !phaseUse.finished) {
                phaseUse.skipped = true;
            }
            
            player.addTempSkill("gz_xugu_skip");
            
            if (minPlayers.length > 0 && maxPlayers.length > 0) {
                var minPlayer = minPlayers[0];
                var maxPlayer = maxPlayers[0];
                if (minPlayer != maxPlayer && minPlayer.isIn() && maxPlayer.isIn()) {
                    game.log("虚淈：点数最小的角色对点数最大的角色造成1点伤害");
                    maxPlayer.damage(minPlayer);
                }
            }
            
            event.finish();
            return;
        }
        
        "step 4";
        var uniqueSuitPlayers = [];
        for (var suit in event.suits) {
            if (event.suits[suit].length === 1) {
                var playerId = event.suits[suit][0];
                var owner = event.playerCards[playerId].owner;
                if (owner && owner.isIn() && !uniqueSuitPlayers.includes(owner)) {
                    uniqueSuitPlayers.push(owner);
                }
            }
        }
        
        event.uniqueSuitPlayers = uniqueSuitPlayers;
        
        if (uniqueSuitPlayers.length > 0) {
            game.log("虚淈：花色唯一的角色各摸一张牌");
            for (var i = 0; i < uniqueSuitPlayers.length; i++) {
                uniqueSuitPlayers[i].draw();
            }
        }
        
        event.useQueue = [player];
        
        for (var i = 0; i < targets.length; i++) {
            if (uniqueSuitPlayers.includes(targets[i]) && targets[i] != player) {
                event.useQueue.push(targets[i]);
            }
        }
        
        event.useQueueIndex = 0;
        
        "step 5";
        if (event.useQueueIndex >= event.useQueue.length) {
            event.finish();
            return;
        }
        
        var currentUser = event.useQueue[event.useQueueIndex];
        event.currentUser = currentUser;
        
        if (!currentUser.isIn()) {
            event.useQueueIndex++;
            event.redo();
            return;
        }
        
        var availableCards = [];
        for (var i = 0; i < event.shownCards.length; i++) {
            var card = event.shownCards[i];
            if (get.position(card) == 'h') {
                availableCards.push(card);
            }
        }
        
        if (availableCards.length == 0) {
            event.finish();
            return;
        }
        
        // ✅ 修改：filterButton 检查是否能使用（包括次数限制）
        currentUser.chooseButton([
            "虚淈：是否使用一张展示牌？",
            availableCards
        ], [0, 1]).set("filterButton", function(button) {
            var card = button.link;
            var player = _status.event.player;
            // ✅ hasUseTarget 会自动检查次数限制
            return player.hasUseTarget(card);
        }).set("ai", function(button) {
            return _status.event.player.getUseValue(button.link);
        });
        
        "step 6";
        if (result.bool && result.links && result.links.length) {
            var card = result.links[0];
            event.selectedCard = card;
            
            var cardOwner = get.owner(card);
            event.cardOwner = cardOwner;
            
            if (!cardOwner || !cardOwner.isIn()) {
                event.useQueueIndex++;
                event.goto(5);
                return;
            }
            
            // ✅ 不再获得牌，直接选择目标并使用
            var info = get.info(card);
            var selectTarget = info ? get.select(info.selectTarget) : [1, 1];
            
            event.currentUser.chooseTarget(
                '选择' + get.translation(card) + '的目标',
                selectTarget,
                function(card, player, target) {
                    var c = _status.event.cardx;
                    return player.canUse(c, target);
                }
            ).set('cardx', card).set('ai', function(target) {
                var card = _status.event.cardx;
                var player = _status.event.player;
                return get.effect(target, card, player, player);
            });
        } else {
            event.useQueueIndex++;
            event.goto(5);
            return;
        }
        
        "step 7";
        if (result.bool && result.targets && result.targets.length) {
            // ✅ 直接使用牌，不需要先获得
            event.currentUser.useCard(event.selectedCard, [event.selectedCard], result.targets, false);
            game.log(event.currentUser, '使用了', event.cardOwner, '展示的', event.selectedCard);
        }
        
        "step 8";
        event.useQueueIndex++;
        event.goto(5);
    },
    ai: {
        order: 9,
        result: {
            target: function(player, target) {
                return -0.5;
            },
        },
    },
    subSkill: {
        skip: {
            trigger: {
                player: "phaseDiscardBegin",
            },
            forced: true,
            charlotte: true,
            popup: false,
            content: function() {
                trigger.cancel();
                game.log(player, "跳过了弃牌阶段");
            },
            sub: true,
        },
    },
    "_priority": 0,
},
          "gz_xionglie": {
    audio: ["jsrgliedu","jsrgxiongbao"],
    locked: true,
    trigger: {
        player: "useCardToPlayered",
    },
    forced: true,
    filter: function(event, player) {
        if (!player.isPhaseUsing()) return false;
        
        var target = event.target;
        if (!target) return false;
        
        // 条件1：女性角色
        var condition1 = (target.sex == "female");
        
        // 条件2：有暗置武将牌
        var condition2 = target.isUnseen();
        
        // 条件3：主副将均明置时，主副将阴阳鱼不同
        var condition3 = false;
        if (target.name1 && target.name2 && !target.isUnseen(0) && !target.isUnseen(1)) {
            var char1 = lib.character[target.name1];
            var char2 = lib.character[target.name2];
            if (char1 && char2) {
                var hp1 = char1[2];
                var hp2 = char2[2];
                condition3 = (hp1 != hp2);
            }
        }
        
        // 满足任一条件
        if (condition1 || condition2 || condition3) {
            // ✅ 判断是否是回合内对该目标使用的首张牌
            var history = player.getHistory("useCard", function(evt) {
                return evt.targets && evt.targets.includes(target);
            });
            return history.length > 0 && history[0] == event.getParent();
        }
        
        return false;
    },
    content: function() {
        trigger.directHit.add(trigger.target);
        game.log(trigger.target, "不能响应", trigger.card);
    },
    group: "gz_xionglie_damage",
    subSkill: {
        damage: {
            trigger: {
                source: "damageBegin1",
            },
            forced: true,
            filter: function(event, player) {
                if (!player.isPhaseUsing()) return false;
                
                // 判断是否为小势力
                var group = player.group;
                if (!group || group === 'unknown') return false;
                
                var groupCounts = {};
                game.countPlayer(function(current) {
                    var g = current.group;
                    if (g && g !== 'unknown') {
                        if (!groupCounts[g]) groupCounts[g] = 0;
                        groupCounts[g]++;
                    }
                });
                
                var minCount = Infinity;
                for (var g in groupCounts) {
                    if (groupCounts[g] < minCount) {
                        minCount = groupCounts[g];
                    }
                }
                
                if (groupCounts[group] !== minCount) return false;
                
                // ✅ 修正：判断是否是回合内首次造成伤害（不限目标）
                var history = player.getHistory("sourceDamage");
                return history.length == 0;
            },
            content: function() {
                trigger.num++;
                game.log("凶烈：伤害+1");
            },
            sub: true,
            sourceSkill: "gz_xionglie",
            "_priority": 0,
        },
    },
    "_priority": 0,
},
"gz_xunfeng": {
    audio: "yilie",
    trigger: {
        player: "phaseBegin",
    },
    forced: true,
    unique: true,
    content: function() {
        "step 0";
        var cards = player.getExpansions('gz_xunfeng');
        if (cards.length) {
            player.loseToDiscardpile(cards);
            game.log(player, '弃置了所有"风"');
        }
       
        "step 1";
        var cards = [];
        var names = [];
       
        for (var i = 0; i < ui.cardPile.childNodes.length && cards.length < 3; i++) {
            var card = ui.cardPile.childNodes[i];
            if (get.type(card) != "equip" && !names.includes(card.name)) {
                cards.push(card);
                names.push(card.name);
            }
        }
       
        if (cards.length > 0) {
            player.addToExpansion(cards, 'gain2').gaintag.add('gz_xunfeng');
            game.log(player, '将', cards, '置为"风"');
        }
    },
    marktext: "风",
    intro: {
        name: "寻风",
        content: "expansion",
        markcount: "expansion",
    },
    onremove: function(player, skill) {
        var cards = player.getExpansions(skill);
        if (cards.length) {
            player.loseToDiscardpile(cards);
        }
    },
    group: ["gz_xunfeng_discard"],
    subSkill: {
        discard: {
            trigger: {
                global: ["useCardAfter", "respondAfter"],
            },
            direct: true,
            filter: function(event, player) {
                var expansions = player.getExpansions('gz_xunfeng');
                if (expansions.length == 0) return false;
               
                if (!event.card) return false;
               
                var cardName = event.card.name;
                for (var i = 0; i < expansions.length; i++) {
                    if (expansions[i].name == cardName) {
                        return true;
                    }
                }
               
                return false;
            },
            content: function() {
                "step 0";
                event.cardName = trigger.card.name;
                // 立即保存使用者信息（包括势力）
                event.cardSource = trigger.player;
                event.cardSourceGroup = trigger.player ? trigger.player.group : null;
                event.cardTargets = trigger.targets || [];
                event.originalCard = trigger.card;
                event.isRespond = (trigger.name == "respond");
               
                var expansions = player.getExpansions('gz_xunfeng');
                var fengCards = [];
                for (var i = 0; i < expansions.length; i++) {
                    if (expansions[i].name == event.cardName) {
                        fengCards.push(expansions[i]);
                    }
                }
               
                if (fengCards.length == 0) {
                    event.finish();
                    return;
                }
               
                event.fengCards = fengCards;
               
                player.chooseControl("选项一", "选项二", "cancel2")
                    .set("choiceList", [
                        '弃置【' + get.translation(event.cardName) + '】"风"并令其额外执行一次，然后摸X张牌（X为使用者所在势力角色数）',
                        '摸一张牌'
                    ])
                    .set("prompt", get.prompt("gz_xunfeng"))
                    .set("ai", function() {
                        var player = _status.event.player;
                        var evt = _status.event.getParent();
                        if (evt.isRespond) return 1;
                        if (!evt.cardSource || !evt.cardSource.isIn()) return 1;
                        return 0;
                    });
               
                "step 1";
                if (result.control == "cancel2") {
                    event.finish();
                    return;
                }
               
                player.logSkill("gz_xunfeng");
               
                if (result.control == "选项二") {
                    player.draw();
                    event.finish();
                    return;
                }
               
                event.chooseOption = "选项一";
                player.loseToDiscardpile(event.fengCards);
                game.log(player, '弃置了', event.fengCards);
               
                "step 2";
                if (event.isRespond) {
                    game.log(player, '触发寻风，但打出的牌无法额外执行');
                    event.goto(4);
                    return;
                }
               
                var source = event.cardSource;
               
                if (!source || !source.isIn()) {
                    game.log(player, '触发寻风，但使用者已阵亡');
                    event.goto(4);
                    return;
                }
               
                var card = event.originalCard;
                var cardName = card.name;
                var targets = event.cardTargets;
               
                // 根据牌的类型判断如何额外使用
                var info = get.info(card);
                var canUse = false;
                var validTargets = [];
               
                // 特殊处理：延时锦囊
                if (info && info.type == 'delay') {
                    // 延时锦囊对原目标使用
                    if (targets.length > 0 && targets[0].isIn() && source.canUse(card, targets[0], false)) {
                        canUse = true;
                        validTargets = [targets[0]];
                    }
                }
                // 特殊处理：AOE 牌（南蛮、万箭、桃园、五谷）
                else if (['nanman', 'wanjian', 'taoyuan', 'wugu'].includes(cardName)) {
                    // AOE 直接使用即可，游戏会自动处理目标
                    if (source.canUse(card, source, false)) {
                        canUse = true;
                        validTargets = null; // 表示无需指定目标
                    }
                }
                // 无目标牌（桃、酒、无中生有等）
                else if (!info || !info.selectTarget || info.selectTarget == -1) {
                    if (source.canUse(card, source, false)) {
                        canUse = true;
                        validTargets = [source];
                    }
                }
                // 单目标/多目标牌
                else {
                    for (var i = 0; i < targets.length; i++) {
                        if (targets[i] && targets[i].isIn() && source.canUse(card, targets[i], false)) {
                            validTargets.push(targets[i]);
                        }
                    }
                    if (validTargets.length > 0) {
                        canUse = true;
                    }
                }
               
                if (!canUse) {
                    game.log(player, '触发寻风，但', source, '无法再次使用', get.translation(cardName));
                    event.goto(4);
                    return;
                }
               
                event.validTargets = validTargets;
               
                "step 3";
                var source = event.cardSource;
                var card = event.originalCard;
                var cardName = card.name;

                game.log(player, '令', source, '额外使用', get.translation(cardName));

                // 复制一张牌用于额外使用
                var newCard = game.createCard(card.name, card.suit, card.number, card.nature);

                // AOE牌和无目标牌直接使用，单目标/多目标传目标数组
                if (['nanman', 'wanjian', 'taoyuan', 'wugu'].includes(cardName)) {
                    // AOE 牌不传目标
                    source.useCard(newCard);
                } else {
                    var targets = event.cardTargets || [];
                    // 多目标传目标，不合法的游戏会自动调整
                    if (targets.length === 0) {
                        source.useCard(newCard);
                    } else if (targets.length === 1) {
                        source.useCard(newCard, targets[0]);
                    } else {
                        source.useCard(newCard, targets);
                    }
                }
               
                "step 4";
                if (event.chooseOption == "选项一") {
                    // ✅ 使用保存的势力信息
                    var group = event.cardSourceGroup;
                    var num = 1;
                   
                    if (group) {
                        // ✅ 修复：只统计已确定势力的角色（至少一张明置）
                        num = game.countPlayer(function(current) {
                            return current.group == group && !current.isUnseen();
                        });
                       
                        game.log('[寻风] 势力:', get.translation(group), ', 已确定势力角色数:', num);
                    }
                   
                    if (num > 0) {
                        player.draw(num);
                        game.log(player, '摸了', num, '张牌');
                    }
                }
            },
            sub: true,
            sourceSkill: "gz_xunfeng",
            "_priority": 0,
        },
    },
    "_priority": 0,
},
"gz_zhangming": {
    audio: "zhangming",
	mark: true,
    mainSkill: true,
    trigger: {
        player: "phaseBegin",
    },
    init: function(player, skill) {
        // 主将时减少体力上限
        if (player.checkMainSkill("gz_zhangming")) {
            player.removeMaxHp();
        }
    },
    direct: true,
    content: function() {
        "step 0";
        player.chooseBool(get.prompt("gz_zhangming"), "展示手牌，根据花色数获得效果")
            .set("choice", player.countCards("h") > 0)
            .set("ai", function() {
                var player = _status.event.player;
                if (player.countCards("h") == 0) return false;
                
                // 计算花色数
                var cards = player.getCards("h");
                var suits = [];
                for (var i = 0; i < cards.length; i++) {
                    var suit = get.suit(cards[i]);
                    if (suit && !suits.includes(suit)) suits.push(suit);
                }
                
                // 花色越多越好
                return suits.length >= 2;
            });
        
        "step 1";
        if (!result.bool) {
            event.finish();
            return;
        }
        
        player.logSkill("gz_zhangming");
        
        var cards = player.getCards("h");
        if (cards.length == 0) {
            event.finish();
            return;
        }
        
        player.showCards(cards, "彰名");
        
        // 统计花色数
        var suits = [];
        for (var i = 0; i < cards.length; i++) {
            var suit = get.suit(cards[i]);
            if (suit && !suits.includes(suit)) suits.push(suit);
        }
        
        event.suitCount = suits.length;
        game.log(player, "的手牌有", suits.length, "种花色：", get.translation(suits));
        
        // 根据花色数添加技能
        if (suits.length >= 1) {
            player.addTempSkill("gz_zhangming_club", "phaseAfter");
            game.log("【彰名】：梅花牌无法被响应");
        }
        if (suits.length >= 2) {
            player.addTempSkill("gz_zhangming_unlimited", "phaseAfter");
            game.log("【彰名】：方片和黑桃牌无次数限制");
        }
        if (suits.length >= 3) {
            player.addTempSkill("gz_zhangming_heart", "phaseAfter");
            game.log("【彰名】：使用红桃牌时，摸一张牌");
        }
        if (suits.length >= 4) {
            player.addTempSkill("gz_zhangming_distance", "phaseAfter");
            player.storage.gz_zhangming_distance = [];
            player.markSkill("gz_zhangming_distance");
            game.log("【彰名】：每用一种花色的牌，与其他角色的距离-1");
        }
    },
    ai: {
        threaten: 2,
    },
    subSkill: {
        club: {
            trigger: {
                player: "useCardToPlayered",
            },
            forced: true,
            charlotte: true,
            popup: false,
            filter: function(event, player) {
                return get.suit(event.card) == "club";
            },
            content: function() {
                trigger.directHit.add(trigger.target);
                game.log(trigger.target, "不能响应", trigger.card);
            },
            ai: {
                "directHit_ai": true,
                skillTagFilter: function(player, tag, arg) {
                    if (get.suit(arg.card) == "club") return true;
                    return false;
                },
            },
            sub: true,
            sourceSkill: "gz_zhangming",
            "_priority": 0,
        },
        unlimited: {
            charlotte: true,
            mod: {
                cardUsable: function(card, player, num) {
                    var suit = get.suit(card);
                    if (suit == "diamond" || suit == "spade") {
                        return Infinity;
                    }
                },
            },
            sub: true,
            sourceSkill: "gz_zhangming",
            "_priority": 0,
        },
        heart: {
            trigger: {
                player: "useCard",
            },
            forced: true,
            charlotte: true,
            popup: false,
            filter: function(event, player) {
                return get.suit(event.card) == "heart";
            },
            content: function() {
                player.draw();
                game.log(player, "因使用红桃牌摸一张牌");
            },
            sub: true,
            sourceSkill: "gz_zhangming",
            "_priority": 0,
        },
        distance: {
            charlotte: true,
			forced:true,
            init: function(player) {
                if (!player.storage.gz_zhangming_distance) {
                    player.storage.gz_zhangming_distance = [];
                }
                // ✅ 在 init 中也 mark，确保显示
                player.markSkill("gz_zhangming_distance");
            },
            onremove: true,
            trigger: {
                player: "useCard",
            },
            forced: true,
            popup: false,
            filter: function(event, player) {
                if (!player.storage.gz_zhangming_distance) {
                    player.storage.gz_zhangming_distance = [];
                }
                var suit = get.suit(event.card);
                return suit && player.storage.gz_zhangming_distance.indexOf(suit) === -1; // ✅ 改用 indexOf
            },
            content: function() {
                if (!player.storage.gz_zhangming_distance) {
                    player.storage.gz_zhangming_distance = [];
                }
                var suit = get.suit(trigger.card);
                player.storage.gz_zhangming_distance.push(suit);
                player.markSkill("gz_zhangming_distance");
                game.log(player, "使用了第", player.storage.gz_zhangming_distance.length, "种花色（", get.translation(suit), "）的牌，距离-1");
            },
            mod: {
                globalFrom: function(from, to, distance) {
                    if (!from.storage.gz_zhangming_distance) return 0;
                    return -from.storage.gz_zhangming_distance.length;
                },
            },
					            marktext: "彰",
            intro: {
                name: "彰名·距离",
                // ✅ 全部改用 ES5 语法
                content: function(storage, player) {
                    // 所有花色及对应效果简介
                    var allSuits = {
                        club: "梅花：无法被响应",
                        diamond: "方片：无次数限制",
                        spade: "黑桃：无次数限制",
                        heart: "红桃：使用时摸一张牌"
                    };
                    
                    // 已用花色数组
                    var used = storage || [];
                    
                    // 剩余花色数组（改用 indexOf 判断）
                    var unused = [];
                    var allSuitKeys = ["club", "diamond", "spade", "heart"];
                    for (var i = 0; i < allSuitKeys.length; i++) {
                        if (used.indexOf(allSuitKeys[i]) === -1) {
                            unused.push(allSuitKeys[i]);
                        }
                    }
                    
                    // 已用花色描述
                    var res = "";
                    if (used.length === 0) {
                        res += "尚未使用任何花色的牌<br>";
                    } else {
                        res += "已使用" + used.length + "种花色：" + get.translation(used) + "<br>";
                        res += "与其他角色的距离-" + used.length + "<br><br>";
                    }
                    
                    // 显示未使用花色及其效果
                    if (unused.length > 0) {
                        res += "<div style='opacity:0.7'>其他花色效果：</div><ul style='margin:5px 0'>";
                        for (var j = 0; j < unused.length; j++) {
                            var suit = unused[j];
                            res += "<li>" + get.translation(suit) + "：" + allSuits[suit] + "</li>";
                        }
                        res += "</ul>";
                    }
                    
                    return res;
                },
            },
            sub: true,
            sourceSkill: "gz_zhangming",
            "_priority": 0,
        },
    },
    "_priority": 0,
},
            "gz_yinbing": {
                audio: "ext:鹰击长空/audio/skill:2",
                viceSkill: true,
										init(player, skill) {
			player.checkViceSkill("gz_yinbing");
				player.removeMaxHp();
		},
                locked: true,
                trigger: {
                    player: "damageEnd",
                    source: "damageSource",
                },
                forced: true,
                filter: function(event, player) {
                    if (!player.storage.gz_yinbing_round) {
                        player.storage.gz_yinbing_round = game.roundNumber;
                        return true;
                    }
                    return player.storage.gz_yinbing_round != game.roundNumber;
                },
                content: function() {
                    "step 0";
                    player.storage.gz_yinbing_round = game.roundNumber;
                    
                    var user = trigger.player;
                    var target = trigger.source;
                    
                    if (!user || !target || user.isDead() || target.isDead()) {
                        event.finish();
                        return;
                    }
                    
                    event.user = user;
                    event.target = target;
                    
                    game.log(user, "视为对", target, "使用一张无视防具的冰【杀】");
                    
                    // 记录总伤害
                    event.totalDamage = 0;
                    game.players.forEach(p => {
                        event.totalDamage += p.getHistory("damage").length;
                    });
                    
                    // 添加临时无视防具技能
                    user.addTempSkill("gz_yinbing_unequip", "useCardAfter");
                    
                    // 创建并使用冰杀
                    var card = game.createCard("sha", "", "");
                    card.nature = "ice";
                    card.gz_yinbing_mark = true;
                    
                    user.useCard(card, [target], false);
                    
                    "step 1";
                    // 检查是否造成伤害
                    var newTotalDamage = 0;
                    game.players.forEach(p => {
                        newTotalDamage += p.getHistory("damage").length;
                    });
                    
                    if (newTotalDamage == event.totalDamage && event.user.isIn()) {
                        game.log("此【杀】结算过程中没有角色受到伤害");
                        event.user.draw(2);
                        event.user.loseHp();
                    }
                },
                group: "gz_yinbing_round",
                subSkill: {
                    round: {
                        trigger: {
                            global: "roundStart",
                        },
                        forced: true,
                        silent: true,
                        popup: false,
                        content: function() {
                            delete player.storage.gz_yinbing_round;
                        },
                        sub: true,
                        sourceSkill: "gz_yinbing",
                        "_priority": 1,
                    },
                    unequip: {
                        charlotte: true,
                        forced: true,
                        ai: {
                            unequip: true,
                            skillTagFilter: function(player, tag, arg) {
                                if (!arg || !arg.card) return false;
                                return arg.card.gz_yinbing_mark == true;
                            },
                        },
                        sub: true,
                        sourceSkill: "gz_yinbing",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
        "gz_bihun": {
    audio: "ext:鹰击长空/audio/skill:2",
    mainSkill: true,
    init(player, skill) {
        player.checkMainSkill("gz_bihun");
    },
    unique: true,
    locked: true,
    trigger: {
        player: "useCardToTarget",
    },
    forced: true,
    filter: function(event, player) {
        // 必须在主将位置
        if (!player.checkMainSkill("gz_bihun")) return false;
        
        if (!player.isPhaseUsing()) return false;
        if (event.target == player) return false;
        
        // ✅ 简化判断：回合内首次使用牌指定其他角色为目标
        var history = player.getHistory("useCard", function(evt) {
            return evt.targets && evt.targets.some(function(target) {
                return target != player;
            });
        });
        
        // 当前使用的牌应该是第一张指定其他角色为目标的牌
        return history.length > 0 && history[0] == event.getParent();
    },
    content: function() {
        "step 0";
        // 判断手牌数是否大于上限
        var handNum = player.countCards("h");
        var limit = player.getHandcardLimit();
        
        if (handNum <= limit) {
            event.finish();
            return;
        }
        
        game.log(player, "的手牌数（", handNum, "）大于手牌上限（", limit, "）");
        
        // ✅ 记录原始目标信息，用于判断是否为唯一目标
        var originalTargets = trigger.getParent().targets.slice();
        var isOnlyTarget = (originalTargets.length == 1 && originalTargets[0] == trigger.target);
        
        // 取消目标
        trigger.getParent().targets.remove(trigger.target);
        trigger.excluded.add(trigger.target);
        
        game.log(player, "取消了对", trigger.target, "的目标");
        
        // 如果是唯一目标，其获得此牌
        if (isOnlyTarget) {
            game.log(trigger.target, "为唯一目标，获得此牌");
            trigger.target.gain(trigger.getParent().card, "gain2");
        }
    },
    ai: {
        threaten: 0.8,
    },
    "_priority": 0,
},
          "gz_juanzhi": {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        player: "phaseZhunbeiBegin",
    },
    direct: true,
    content: function() {
        "step 0";
        player.chooseCard("he", get.prompt("gz_juanzhi"), "重铸一张牌，本回合可将相同字数的牌转化使用").set("ai", function(card) {
            return 6 - get.value(card);
        });
        
        "step 1";
        if (result.bool) {
            player.logSkill("gz_juanzhi");
            player.recast(result.cards);
            event.card = result.cards[0];
            
            // 计算牌名字数
            var cardname = get.translation(event.card.name);
            event.nameLength = cardname.length;
            
            // 直接设置效果（无需选择）
            player.storage.gz_juanzhi_effect = {
                nameLength: event.nameLength
            };
            player.addTempSkill("gz_juanzhi_effect");
            player.markSkill("gz_juanzhi_effect");
            game.log(player, "本回合使用牌数≤", event.nameLength, "时，可将", event.nameLength, "字牌当作其他", event.nameLength, "字基本牌或普通锦囊牌使用");
        }
    },
    subSkill: {
        effect: {
            enable: "chooseToUse",
            charlotte: true,
            onremove: function(player) {
                delete player.storage.gz_juanzhi_effect;
            },
            mark: true,
            intro: {
                content: function(storage, player) {
                    if (!storage) return "";
                    return "使用牌数≤" + storage.nameLength + "时，可将" + storage.nameLength + "字牌当作其他" + storage.nameLength + "字基本牌或普通锦囊牌使用";
                },
            },
            filter: function(event, player) {
                if (!player.storage.gz_juanzhi_effect) return false;
                if (player.getHistory("useCard").length >= player.storage.gz_juanzhi_effect.nameLength) return false;
                
                // 检查手牌中是否有符合字数的牌
                var cards = player.getCards("he");
                for (var i = 0; i < cards.length; i++) {
                    var cardname = get.translation(cards[i].name);
                    if (cardname.length == player.storage.gz_juanzhi_effect.nameLength) {
                        return true;
                    }
                }
                return false;
            },
            chooseButton: {
                dialog: function(event, player) {
                    var list = [];
                    var nameLength = player.storage.gz_juanzhi_effect.nameLength;
                    
                    // 获取所有字数相同的基本牌和普通锦囊牌
                    for (var name of lib.inpile) {
                        var type = get.type(name);
                        if (type != "basic" && type != "trick") continue;
                        if (lib.card[name].notarget) continue; // 排除延时锦囊
                        
                        var cardname = get.translation(name);
                        if (cardname.length == nameLength) {
                            list.push(["", "", name]);
                            if (name == "sha") {
                                for (var nature of lib.inpile_nature) {
                                    list.push(["", "", name, nature]);
                                }
                            }
                        }
                    }
                    
                    return ui.create.dialog("卷帙", [list, "vcard"]);
                },
                filter: function(button, player) {
                    return _status.event.getParent().filterCard({
                        name: button.link[2],
                        nature: button.link[3]
                    }, player, _status.event.getParent());
                },
                check: function(button) {
                    var player = _status.event.player;
                    return player.getUseValue({
                        name: button.link[2],
                        nature: button.link[3]
                    });
                },
                backup: function(links, player) {
                    return {
                        filterCard: function(card, player) {
                            var nameLength = player.storage.gz_juanzhi_effect.nameLength;
                            var cardname = get.translation(card.name);
                            return cardname.length == nameLength;
                        },
                        position: "he",
                        selectCard: 1,
                        viewAs: {
                            name: links[0][2],
                            nature: links[0][3]
                        },
                        popname: true,
                        precontent: function() {
                            delete event.result.skill;
                        },
                    };
                },
                prompt: function(links, player) {
                    return "将一张" + player.storage.gz_juanzhi_effect.nameLength + "字牌当作【" + get.translation(links[0][2]) + "】使用";
                },
            },
            ai: {
                order: 10,
                result: {
                    player: 1,
                },
            },
            sub: true,
            sourceSkill: "gz_juanzhi",
            "_priority": 0,
        },
    },
    "_priority": 0,
},
"gz_xingtu": {
    audio: "xingtu",
    trigger: {
        player: "useCard",
    },
    filter: function(event, player) {
        player.addTip("gz_xingtu", `行图 ${get.translation(get.number(event.card, player))}`);
        const evt = lib.skill.dcjianying.getLastUsed(player, event);
        if (!evt?.card) {
            return false;
        }
        const num1 = get.number(event.card),
            num2 = get.number(evt.card);
        return typeof num1 == "number" && typeof num2 == "number" && num2 != 0 && num2 % num1 == 0;
    },
    // ✅ 修改1：改为非锁定技
    forced: true,
    // ✅ 修改2：添加 prehidden
    preHidden: true,
    // ✅ 修改3：添加 check
    check: function(event, player) {
        return true;
    },
    // ✅ 修改4：发动时标记
    content: async function(event, trigger, player) {
        player.storage.gz_xingtu_triggered = true; // 标记已发动
        await player.draw();
    },
    mod: {
        cardUsable: function(card, player) {
            if (typeof card == "object") {
                let num1 = get.number(card);
                if (num1 != "unsure" && typeof num1 != "number") {
                    return;
                }
                if ([card].concat(card.cards || []).some(cardx => get.itemtype(cardx) === "card" && cardx.hasGaintag("gz_xingtu1"))) {
                    return Infinity;
                }
                let num2 = player.storage.gz_xingtu_mark;
                if (typeof num2 == "number" && num1 % num2 == 0) {
                    return Infinity;
                }
            }
        },
        aiOrder: function(player, card, num) {
            if (typeof card == "object") {
                let num1 = get.number(card);
                if (num1 != "unsure" && typeof num1 != "number") {
                    return;
                }
                if (!card.cards) {
                    return;
                }
                for (var i of card.cards) {
                    if (i.hasGaintag("gz_xingtu1")) {
                        return num + 5;
                    }
                }
                let num2 = player.storage.gz_xingtu_mark;
                if (typeof num2 == "number" && num1 % num2 == 0) {
                    return num + 5;
                }
            }
        },
    },
    // ✅ 修改5：init 判断是否暗将
    init: function(player) {
        player.addSkill("gz_xingtu_mark");
        const history = player.getAllHistory("useCard");
        if (history.length) {
            const trigger = history[history.length - 1],
                num = get.number(trigger.card);
            player.storage.gz_xingtu_mark = num;
            // ✅ 只在非暗将或已发动时显示
            if ((!player.isUnseen || !player.isUnseen()) && typeof num == "number") {
                player.markSkill("gz_xingtu_mark");
            }
        }
    },
    onremove: function(player) {
        player.removeSkill("gz_xingtu_mark");
        player.removeGaintag("gz_xingtu1");
        player.removeGaintag("gz_xingtu2");
        player.removeTip("gz_xingtu");
        delete player.storage.gz_xingtu_mark;
        delete player.storage.gz_xingtu_triggered; // ✅ 清理标记
    },
    subSkill: {
        mark: {
            charlotte: true,
            trigger: {
                player: ["useCard1","gainAfter"],
                global: "loseAsyncAfter",
            },
            filter: function(event, player, name) {
                return name == "useCard1" || (event.getg?.(player)?.length && player.countCards("h"));
            },
            forced: false,
            direct: true,
            firstDo: true,
            content: async function(event, trigger, player) {
                player.removeGaintag("gz_xingtu1");
                player.removeGaintag("gz_xingtu2");
                if (event.triggername == "useCard1") {
                    const num = get.number(trigger.card, player);
                    player.storage.gz_xingtu_mark = num;
                    // ✅ 修改6：判断是否暗将
                    if (typeof num != "number") {
                        player.unmarkSkill("gz_xingtu_mark");
                    } else if (player.storage.gz_xingtu_triggered || (!player.isUnseen || !player.isUnseen())) {
                        // 已发动过或非暗将时才显示
                        player.markSkill("gz_xingtu_mark");
                    } else {
                        player.unmarkSkill("gz_xingtu_mark");
                    }
                    if (typeof num != "number") {
                        return;
                    }
                }
                const cards1 = [],
                    cards2 = [],
                    num = player.storage.gz_xingtu_mark;
                player.getCards("h").forEach(card => {
                    const numx = get.number(card, player);
                    if (typeof numx == "number") {
                        if (numx % num == 0) {
                            cards1.push(card);
                        }
                        if (num % numx == 0 && typeof num == "number" && num != 0) {
                            cards2.push(card);
                        }
                    }
                });
                if (cards1.length) {
                    player.addGaintag(cards1, "gz_xingtu1");
                }
                if (cards2.length) {
                    player.addGaintag(cards2, "gz_xingtu2");
                }
            },
            intro: {
                content: "上一张牌的点数：#",
            },
            sub: true,
            sourceSkill: "gz_xingtu",
            "_priority": 0,
        },
    },
    "_priority": 0,
},
gz_hejue: {
    audio: "ext:鹰击长空/audio/skill:3",
    // ✅ 使用 group 分离两个触发时机
    group: ["gz_hejue_phase", "gz_hejue_damage"],
    
    // 共用函数：判断珠联璧合
    isRefinedPair: function(targets) {
        var names = [];
        for (var i = 0; i < targets.length; i++) {
            var pl = targets[i];
            if (!pl.isUnseen(0)) names.push(pl.name1);
            if (!pl.isUnseen(1)) names.push(pl.name2);
        }
        if (names.length !== 2) return false;
        var n1 = names[0], n2 = names[1];
        if (get.is.jun(n1) || get.is.jun(n2)) {
            return lib.character[n1][1] == lib.character[n2][1];
        }
        return lib.element.player.perfectPair.call({ name1: n1, name2: n2 });
    },
    
    subSkill: {
        // ✅ 子技能1：结束阶段触发
        phase: {
            audio: "gz_hejue",
            trigger: {
                player: "phaseEnd",
            },
            frequent: true,
            prompt: "你可以选择至多两名角色发动【合珏】",
            content: function() {
                "step 0"
                player.chooseTarget(get.prompt("gz_hejue"), [1, 2], function(card, player, target) {
                    if (ui.selected.targets.length == 0) {
                        if (lib.skill.gz_hejue.isRefinedPair([target])) return true;
                        var revealedCount = (!target.isUnseen(0) ? 1 : 0) + (!target.isUnseen(1) ? 1 : 0);
                        if (revealedCount == 1) {
                            return game.hasPlayer(function(current) {
                                if (target == current) return false;
                                var cCount = (!current.isUnseen(0) ? 1 : 0) + (!current.isUnseen(1) ? 1 : 0);
                                return cCount == 1 && lib.skill.gz_hejue.isRefinedPair([target, current]);
                            });
                        }
                        return false;
                    }
                    return lib.skill.gz_hejue.isRefinedPair(ui.selected.targets.concat([target]));
                }).set('ai', function(target) {
                    var player = _status.event.player;
                    if (get.attitude(player, target) > 0) {
                        var bonus = (target.hasMark("zhulianbihe_mark") && target.hp < target.maxHp) ? 2 : 0;
                        return 1 + bonus;
                    }
                    return 0;
                });
                
                "step 1"
                if (!result.bool || !result.targets || result.targets.length == 0) {
                    event.finish();
                    return;
                }
                
                player.logSkill("gz_hejue_phase", result.targets);
                event.targets = result.targets;
                
                var drawNum = (event.targets.length === 1) ? 2 : 1;
                player.line(event.targets, "green");
                game.asyncDraw(event.targets, drawNum);
                
                "step 2"
                var recoverTargets = event.targets.filter(function(t) {
                    return t.hasMark("zhulianbihe_mark") && t.hp < t.maxHp;
                });
                event.recoverTargets = recoverTargets;

                if (recoverTargets.length > 0) {
                    player.chooseBool("是否令 " + get.translation(recoverTargets) + " 恢复1点体力？")
                        .set('ai', function() { return true; });
                } else {
                    event.finish();
                }

                "step 3"
                if (result.bool && event.recoverTargets) {
                    player.line(event.recoverTargets, "thunder");
                    for (var i = 0; i < event.recoverTargets.length; i++) {
                        event.recoverTargets[i].recover();
                    }
                }
            },
            sub: true,
            sourceSkill: "gz_hejue",
        },
        
        // ✅ 子技能2：受伤后触发（每轮限一次）
        damage: {
            audio: "gz_hejue",
            trigger: {
                player: "damageEnd",
            },
            frequent: true,
            prompt: "你可以选择至多两名角色发动【合珏】",
            // ✅ filter 检查本轮是否已使用
            filter: function(event, player) {
                return !player.hasSkill('gz_hejue_used');
            },
            content: function() {
                "step 0"
                // ✅ 立即添加标记，防止重复触发
                player.addTempSkill('gz_hejue_used', 'roundStart');
                
                player.chooseTarget(get.prompt("gz_hejue"), [1, 2], function(card, player, target) {
                    if (ui.selected.targets.length == 0) {
                        if (lib.skill.gz_hejue.isRefinedPair([target])) return true;
                        var revealedCount = (!target.isUnseen(0) ? 1 : 0) + (!target.isUnseen(1) ? 1 : 0);
                        if (revealedCount == 1) {
                            return game.hasPlayer(function(current) {
                                if (target == current) return false;
                                var cCount = (!current.isUnseen(0) ? 1 : 0) + (!current.isUnseen(1) ? 1 : 0);
                                return cCount == 1 && lib.skill.gz_hejue.isRefinedPair([target, current]);
                            });
                        }
                        return false;
                    }
                    return lib.skill.gz_hejue.isRefinedPair(ui.selected.targets.concat([target]));
                }).set('ai', function(target) {
                    var player = _status.event.player;
                    if (get.attitude(player, target) > 0) {
                        var bonus = (target.hasMark("zhulianbihe_mark") && target.hp < target.maxHp) ? 2 : 0;
                        return 1 + bonus;
                    }
                    return 0;
                });
                
                "step 1"
                if (!result.bool || !result.targets || result.targets.length == 0) {
                    event.finish();
                    return;
                }
                
                player.logSkill("gz_hejue_damage", result.targets);
                event.targets = result.targets;
                
                var drawNum = (event.targets.length === 1) ? 2 : 1;
                player.line(event.targets, "green");
                game.asyncDraw(event.targets, drawNum);
                
                "step 2"
                var recoverTargets = event.targets.filter(function(t) {
                    return t.hasMark("zhulianbihe_mark") && t.hp < t.maxHp;
                });
                event.recoverTargets = recoverTargets;

                if (recoverTargets.length > 0) {
                    player.chooseBool("是否令 " + get.translation(recoverTargets) + " 恢复1点体力？")
                        .set('ai', function() { return true; });
                } else {
                    event.finish();
                }

                "step 3"
                if (result.bool && event.recoverTargets) {
                    player.line(event.recoverTargets, "thunder");
                    for (var i = 0; i < event.recoverTargets.length; i++) {
                        event.recoverTargets[i].recover();
                    }
                }
            },
            sub: true,
            sourceSkill: "gz_hejue",
        },
        
        // ✅ 子技能3：本轮已使用标记
        used: {
            charlotte: true,
            mark: true,
            intro: {
                content: "本轮已受到首次伤害",
            },
            sub: true,
            sourceSkill: "gz_hejue",
        },
    },
},
    // 【貉隙】
gz_hexi: {
    audio: "ext:鹰击长空/audio/skill:3",
    trigger: {
        player: "gainAfter",
    },
    frequent: true,
    prompt: "你可以发动【貉隙】",
    filter: function(event, player) {
        if (player.hasSkill('gz_hexi_round')) return false;
        if (player.countCards("e") === 0) return false;
        return game.hasPlayer(function(current) {
            return current != player && current.isAlive();
        });
    },
    content: function() {
        "step 0"
        player.addTempSkill('gz_hexi_round', 'phaseAfter');  // ✅ 改为每回合限一次
        
        player.chooseCardTarget({
            prompt: "将你的一张装备牌移动给另一名角色",
            position: 'e',
            filterCard: true,
            filterTarget: function(card, player, target) {
                return target != player && target.canEquip(card);
            },
            ai1: function(card) { 
                return 6 - get.value(card); 
            },
            ai2: function(target) {
                var p = _status.event.player;
                var playerHasRevealed = (!p.isUnseen(0)) || (!p.isUnseen(1));
                var targetBothRevealed = (!target.isUnseen(0)) && (!target.isUnseen(1));
                var canTrigger = playerHasRevealed && targetBothRevealed;
                
                if (canTrigger && _status.currentPhase != p) {
                    return -get.attitude(p, target);
                }
                return get.attitude(p, target);
            }
        });
        
        "step 1"
        if (result.bool) {
            var target = result.targets[0];
            var card = result.cards[0];
            event.target = target;
            event.card = card;
            
            player.line(target, 'green');
            target.equip(card);
            player.$give(card, target, false);
            game.log(target, '获得了', card);
            
            var playerHasRevealed = (!player.isUnseen(0)) || (!player.isUnseen(1));
            var targetBothRevealed = (!target.isUnseen(0)) && (!target.isUnseen(1));
            
            if (playerHasRevealed && targetBothRevealed) {
                event.goto(2);
            } else {
                event.finish();
            }
        } else {
            event.finish();
        }
        
        "step 2"
        var target = event.target;
        var choices = [];
        var choiceList = [
            '令' + get.translation(target) + '摸一张牌',
            '对' + get.translation(target) + '造成1点伤害'
        ];
        
        if (_status.currentPhase == player) {
            choices.push('选项一');
        } else {
            choices.push('选项一', '选项二');
        }
        
        player.chooseControl(choices).set('choiceList', choiceList).set('prompt', '貉隙：请选择一项').set('ai', function() {
            var player = _status.event.player;
            var target = _status.event.getParent().target;
            var att = get.attitude(player, target);
            
            if (_status.currentPhase == player) {
                return 0;
            }
            
            if (att > 0) {
                return 0;
            } else {
                return 1;
            }
        });
        
        "step 3"
        var target = event.target;
        
        if (result.control == '选项一') {
            target.draw();
            game.log(target, '摸了一张牌');
        } else if (result.control == '选项二') {
            target.damage('nocard');
            game.log(player, '对', target, '造成了1点伤害');
        }
    }
},
gz_hexi_round: {
    charlotte: true,
    intro: {
        content: "本回合已发动"
    },
},


// 赋绘
gz_fuhui: {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: "chooseToUse",
    filter: function(event, player) {
        // 需要至少两张手牌
        if (player.countCards('hes') < 2) return false;
       
        // 检查是否有点数相同或相连的牌
        var cards = player.getCards('hes');
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                var num1 = get.number(cards[i]);
                var num2 = get.number(cards[j]);
                if (num1 && num2 && (num1 == num2 || Math.abs(num1 - num2) == 1)) {
                    return true;
                }
            }
        }
        return false;
    },
    chooseButton: {
        dialog: function(event, player) {
            var list = [];
            var usedNames = player.storage.gz_fuhui_used || [];
           
            // 基本牌
            for (var name of lib.inpile) {
                if (get.type(name) == 'basic') {
                    var card = {name: name};
                    if (!usedNames.includes(name) && event.filterCard(card, player, event)) {
                        list.push(['基本', '', name]);
                    }
                }
            }
           
            // 普通锦囊牌（非延时锦囊）
            for (var name of lib.inpile) {
                if (get.type(name) == 'trick') {
                    var info = lib.card[name];
                    if (!info || info.type != 'delay') {
                        var card = {name: name};
                        if (!usedNames.includes(name) && event.filterCard(card, player, event)) {
                            list.push(['锦囊', '', name]);
                        }
                    }
                }
            }
           
            return ui.create.dialog('赋绘', [list, 'vcard']);
        },
        filter: function(button, player) {
            return _status.event.getParent().filterCard({name: button.link[2]}, player, _status.event.getParent());
        },
        check: function(button) {
            var player = _status.event.player;
            return player.getUseValue({name: button.link[2]});
        },
        backup: function(links, player) {
            return {
                filterCard: function(card, player, target) {
                    if (ui.selected.cards.length == 0) return true;
                   
                    var cards = ui.selected.cards.concat([card]);
                    var nums = cards.map(c => get.number(c));
                   
                    // 检查是否所有点数都存在
                    for (var num of nums) {
                        if (!num) return false;
                    }
                   
                    // ✅ 方法1：所有点数相同
                    var allSame = true;
                    for (var i = 1; i < nums.length; i++) {
                        if (nums[i] != nums[0]) {
                            allSame = false;
                            break;
                        }
                    }
                    if (allSame) return true;
                   
                    // ✅ 方法2：点数严格连续（不允许重复）
                    var sortedNums = nums.slice().sort((a, b) => a - b);
                    
                    // 检查是否有重复点数
                    for (var i = 1; i < sortedNums.length; i++) {
                        if (sortedNums[i] == sortedNums[i-1]) {
                            return false;  // ❌ 有重复点数，不符合严格连续
                        }
                    }
                    
                    // 检查是否连续
                    var continuous = true;
                    for (var i = 1; i < sortedNums.length; i++) {
                        if (sortedNums[i] != sortedNums[i-1] + 1) {
                            continuous = false;
                            break;
                        }
                    }
                   
                    return continuous;
                },
                selectCard: [2, Infinity],
                position: 'hes',
                popname: true,
                check: function(card) {
                    return 6 - get.value(card);
                },
                viewAs: {name: links[0][2]},
                precontent: function() {
                    player.logSkill('gz_fuhui');
                   
                    // 记录使用过的牌名（每轮限一次）
                    if (!player.storage.gz_fuhui_used) {
                        player.storage.gz_fuhui_used = [];
                    }
                    player.storage.gz_fuhui_used.push(event.result.card.name);
                   
                    // 计算明置势力数
                    var groups = [];
                    for (var i of game.players) {
                        if (!i.isUnseen() && !groups.includes(i.group)) {
                            groups.push(i.group);
                        }
                    }
                    var groupNum = groups.length;
                   
                    // 转化的牌数
                    var cardNum = event.result.cards.length;
                   
                    game.log('[赋绘] 转化牌数:', cardNum, ', 明置势力数:', groupNum);
                   
                    // 若转化牌数大于明置势力数，摸X张牌
                    if (cardNum > groupNum) {
                        player.draw(groupNum);
                        game.log(player, '摸了', groupNum, '张牌');
                    }
                },
            }
        },
        prompt: function(links, player) {
            return '将至少两张点数相同或相连的牌当作【' + get.translation(links[0][2]) + '】使用';
        },
    },
    ai: {
        order: 10,
        result: {
            player: 1,
        },
    },
    group: 'gz_fuhui_clear',
    subSkill: {
        clear: {
            trigger: {global: 'roundStart'},
            forced: true,
            silent: true,
            content: function() {
                delete player.storage.gz_fuhui_used;
            },
            sub: true,
        },
    },
},
// 摹画
gz_mohua: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        global: 'phaseJieshuBegin',
    },
    filter: function(event, player) {
        if (event.player == player) return false;
        if (!event.player.isIn()) return false;
       
        // 检查本轮是否已失效
        if (player.hasSkill('gz_mohua_disabled')) return false;
       
        // 检查该角色出牌阶段是否使用过基本牌或普通锦囊牌
        var history = event.player.getHistory('useCard', function(evt) {
            if (!evt.isPhaseUsing()) return false;
            var type = get.type(evt.card);
            if (type == 'basic') return true;
            if (type == 'trick') {
                var info = get.info(evt.card);
                return !info || info.type != 'delay';
            }
            return false;
        });
       
        if (history.length == 0) return false;
       
        // ✅ 检查手牌中是否有可用的同名牌
        var cards = player.getCards('h');
        if (cards.length == 0) return false;
       
        for (var card of cards) {
            for (var evt of history) {
                // 同名且可以使用
                if (card.name == evt.card.name) {
                    // 检查是否有可用目标
                    if (event.player.hasUseTarget(card, false)) {
                        return true;
                    }
                }
            }
        }
       
        return false;
    },
    direct: true,
    content: function() {
        "step 0";
        event.targetPlayer = trigger.player;
       
        // 获取该角色出牌阶段使用过的基本牌和普通锦囊牌名称
        var history = event.targetPlayer.getHistory('useCard', function(evt) {
            if (!evt.isPhaseUsing()) return false;
            var type = get.type(evt.card);
            if (type == 'basic') return true;
            if (type == 'trick') {
                var info = get.info(evt.card);
                return !info || info.type != 'delay';
            }
            return false;
        });
       
        var usedNames = [];
        for (var evt of history) {
            if (!usedNames.includes(evt.card.name)) {
                usedNames.push(evt.card.name);
            }
        }
       
        // ✅ 选择手牌中的同名牌
        player.chooseCard('h', get.prompt('gz_mohua', event.targetPlayer), '使用一张其出牌阶段使用过的同名牌', function(card, player) {
            var names = _status.event.usedNames;
            if (!names.includes(card.name)) return false;
            // 检查是否有可用目标
            return _status.event.source.hasUseTarget(card, false);
        }).set('usedNames', usedNames).set('source', event.targetPlayer).set('ai', function(card) {
            var player = _status.event.player;
            var source = _status.event.source;
            return player.getUseValue(card, source);
        });
       
        "step 1";
        if (result.bool && result.cards && result.cards.length) {
            player.logSkill('gz_mohua', event.targetPlayer);
            event.card = result.cards[0];
           
            // 判断势力是否相同（都需要已确定势力）
            var sameGroup = false;
            if (!player.isUnseen() && !event.targetPlayer.isUnseen() && player.group == event.targetPlayer.group) {
                sameGroup = true;
            }
            event.sameGroup = sameGroup;
           
            if (!sameGroup) {
                // 需要交给其一张牌（注意：这张牌不能是刚选的那张，因为还没使用）
                var cards = player.getCards('he');
                if (cards.length <= 1) {
                    // 只有刚选的那张牌，无法交牌
                    game.log(player, '没有其他牌可以交给', event.targetPlayer);
                    event.finish();
                    return;
                }
               
                player.chooseCard('he', '摹画：请交给' + get.translation(event.targetPlayer) + '一张牌', true, function(card) {
                    return card != _status.event.selectedCard;
                }).set('selectedCard', event.card).set('ai', function(card) {
                    return -get.value(card);
                });
            } else {
                event.goto(3);
            }
        } else {
            event.finish();
        }
       
        "step 2";
        if (result.bool && result.cards && result.cards.length) {
            player.give(result.cards, event.targetPlayer);
           
            // 本技能本轮失效
            player.addTempSkill('gz_mohua_disabled', {global: 'roundStart'});
            game.log(player, '的【摹画】本轮失效');
        }
       
        "step 3";
        // ✅ 使用该牌（视为该角色使用）
        var info = get.info(event.card);
       
        // 判断是否需要选择目标
        if (!info || !info.selectTarget || info.selectTarget == -1) {
            // 无需选择目标（如桃、酒、无中生有等）
            if (event.targetPlayer.canUse(event.card, event.targetPlayer, false)) {
                event.targetPlayer.useCard(event.card, event.targetPlayer, false);
            }
            event.finish();
        } else if (['nanman', 'wanjian', 'taoyuan', 'wugu'].includes(event.card.name)) {
            // AOE 牌（南蛮、万箭、桃园、五谷）
            if (event.targetPlayer.canUse(event.card, false)) {
                event.targetPlayer.useCard(event.card, false);
            }
            event.finish();
        } else {
            // 需要选择目标
            var selectTarget = info.selectTarget;
            if (typeof selectTarget == 'number') {
                selectTarget = [selectTarget, selectTarget];
            } else if (typeof selectTarget != 'object') {
                selectTarget = [1, 1];
            }
           
            player.chooseTarget(
                '摹画：选择【' + get.translation(event.card) + '】的目标',
                selectTarget,
                function(card, player, target) {
                    return _status.event.source.canUse(_status.event.cardx, target, false);
                }
            ).set('ai', function(target) {
                var player = _status.event.player;
                var source = _status.event.source;
                return get.effect(target, _status.event.cardx, source, player);
            }).set('cardx', event.card).set('source', event.targetPlayer);
        }
       
        "step 4";
        if (result.bool && result.targets && result.targets.length) {
            if (result.targets.length == 1) {
                event.targetPlayer.useCard(event.card, result.targets[0], false);
            } else {
                event.targetPlayer.useCard(event.card, result.targets, false);
            }
        }
    },
    subSkill: {
        disabled: {
            charlotte: true,
        },
    },
},
// ==================== 夏侯氏 ====================

// 樵拾
gz_qiaoshi: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        global: 'phaseJieshuBegin',
    },
    filter: function(event, player) {
        if (event.player == player) return false;
        if (!event.player.isIn()) return false;
        // 手牌数相等
        return player.countCards('h') == event.player.countCards('h');
    },
    check: function(event, player) {
        return get.attitude(player, event.player) > 0;
    },
    content: function() {
        "step 0";
        event.target = trigger.player;
        
        // 各摸一张牌
        game.asyncDraw([player, event.target]);
        
        "step 1";
        // 判断势力是否相同（都需要已确定势力）
        if (!player.isUnseen() && !event.target.isUnseen() && player.group == event.target.group) {
            event.sameGroup = true;
        } else {
            event.sameGroup = false;
            event.finish();
        }
        
        "step 2";
        if (event.sameGroup && event.target.isIn()) {
            player.chooseControl('变更副将', 'cancel2')
                .set('prompt', '是否令' + get.translation(event.target) + '变更副将？')
                .set('ai', function() {
                    var target = _status.event.target;
                    if (get.attitude(_status.event.player, target) > 0) {
                        return '变更副将';
                    }
                    return 'cancel2';
                })
                .set('target', event.target);
        } else {
            event.finish();
        }
        
        "step 3";
        if (result.control == '变更副将') {
            event.target.chooseButton([
                '请选择要变更的副将',
                [event.target.storage.zhuSkill_ignore || lib.characterPack.mode_guozhan, 'character']
            ], true).set('ai', function() {
                return Math.random();
            });
        } else {
            event.finish();
        }
        
        "step 4";
        if (result.bool && result.links && result.links.length) {
            event.target.changeSeat(result.links[0], 'vice');
        }
    },
},

gz_yanyu: {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: 'phaseUse',
    filter: function(event, player) {
        return player.countCards('h', {type: 'basic'}) > 0;
    },
    filterCard: function(card, player) {
        if (get.type(card) != 'basic') return false;
       
        if (!player.storage.gz_yanyu_used) {
            player.storage.gz_yanyu_used = [];
        }
       
        return !player.storage.gz_yanyu_used.includes(card.name);
    },
    position: 'h',
    check: function(card) {
        return 5 - get.value(card);
    },
    content: function() {
        "step 0";
        event.cardName = cards[0].name;
       
        if (!player.storage.gz_yanyu_used) {
            player.storage.gz_yanyu_used = [];
        }
        player.storage.gz_yanyu_used.push(event.cardName);
       
        player.recast(cards);
       
        "step 1";
        var card = game.createCard(event.cardName);
        var info = get.info(card);
       
        if (!info) {
            event.finish();
            return;
        }
       
        if (info.selectTarget == -1 || !info.selectTarget) {
            // 无需选择目标
            if (player.canUse(card, player)) {
                var next = player.useCard(card, player);
                next.addCount = false;
            }
        } else {
            // 需要选择目标
            player.chooseTarget('燕语：选择【' + get.translation(event.cardName) + '】的目标', function(card, player, target) {
                var cardx = {name: _status.event.cardName};
                return player.canUse(cardx, target);  // ✅ 正常检查距离
            }).set('ai', function(target) {
                var player = _status.event.player;
                return get.effect(target, {name: _status.event.cardName}, player, player);
            }).set('cardName', event.cardName);
        }
       
        "step 2";
        if (result.bool && result.targets && result.targets.length) {
            var card = game.createCard(event.cardName);
            var next = player.useCard(card, result.targets);
            next.addCount = false;
        }
    },
    ai: {
        order: 8,
        result: {
            player: 1,
        },
    },
    mark: true,
    intro: {
        content: function(storage, player) {
            if (!player.storage.gz_yanyu_used || player.storage.gz_yanyu_used.length == 0) {
                return '本回合未使用燕语';
            }
            return '本回合已使用：' + player.storage.gz_yanyu_used.map(function(name) {
                return get.translation(name);
            }).join('、');
        },
    },
    group: 'gz_yanyu_clear',
    subSkill: {
        clear: {
            trigger: {player: 'phaseAfter'},
            forced: true,
            silent: true,
            content: function() {
                delete player.storage.gz_yanyu_used;
            },
            sub: true,
        },
    },
},
// ==================== 王异 ====================

// 贞烈
gz_zhenlie: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        target: 'useCardToTargeted',
    },
    filter: function(event, player) {
        if (event.player == player) return false;
        if (player.hasSkill('gz_zhenlie_used')) return false;
       
        // 单体卡牌
        if (!event.targets || event.targets.length != 1) return false;
       
        return true;
    },
    check: function(event, player) {
        if (player.hp <= 1) return false;
        if (get.attitude(player, event.player) >= 0) return false;
        return get.effect(player, event.card, event.player, player) < -5;
    },
    content: function() {
        "step 0";
        player.addTempSkill('gz_zhenlie_used', 'phaseAfter');
       
        // 失去1点体力
        player.loseHp();
       
        // 令此牌无效
        trigger.excluded.add(player);
        game.log(trigger.card, '对', player, '无效');
       
        event.source = trigger.player;
       
        "step 1";
        if (!event.source.isIn()) {
            event.finish();
            return;
        }
       
        // ✅ player（李四）为 source（张三）选择军令
        player.chooseJunlingFor(event.source);
       
        "step 2";
        event.junling = result.junling;
        event.targets = result.targets;
       
        // ✅ source（张三）选择是否执行军令
        event.source.chooseJunlingControl(player, result.junling, result.targets)
            .set('prompt', '贞烈：是否执行军令')
            .set('choiceList', ['执行该军令', '不执行该军令，' + get.translation(player) + '获得你一张牌'])
            .set('ai', function() {
                var evt = _status.event.getParent(),
                    source = evt.source,      // 张三（执行军令的角色）
                    player = evt.player,      // 李四（贞烈的使用者）
                    junling = evt.junling,
                    targets = evt.targets;
                
                // 评估军令效果（从张三的角度）
                var effect = get.junlingEffect(player, junling, source, targets, source);
                
                // 如果没牌可给，必须执行
                if (source.countCards('he') == 0) return 0;
                
                // 如果对李四态度好，且军令效果不太坏，就执行
                if (get.attitude(source, player) > 0) {
                    return effect > -3;
                }
                
                // 否则比较：执行军令的损失 vs 给牌的损失
                // 如果军令效果很差（effect < -2），宁愿给牌
                if (effect < -2) return 1;
                
                return effect > 0;
            });
       
        "step 3";
        if (result.index == 0) {
            // ✅ 执行军令
            event.source.carryOutJunling(player, event.junling, event.targets);
        } else {
            // ✅ 不执行，李四获得张三一张牌
            if (event.source.countCards('he') > 0) {
                player.gainPlayerCard(event.source, 'he', true);
            }
        }
    },
    subSkill: {
        used: {charlotte: true},
    },
},
// 秘计
gz_miji: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        global: 'loseHpAfter',
    },
    filter: function(event, player) {
        return event.num > 0;
    },
    check: function(event, player) {
        var current = _status.currentPhase;
        if (!current) return false;
        if (get.attitude(player, current) > 0) return true;
        if (player.countCards('he') > 2) return false;
        return true;
    },
    content: function() {
        "step 0";
        var current = _status.currentPhase;
        if (!current || !current.isIn()) {
            event.finish();
            return;
        }
        event.current = current;
        
        player.chooseControl('摸牌+1', '弃牌-1')
            .set('choiceList', [
                '你摸一张牌，然后本回合角色手牌上限+1',
                '你弃置一张牌，然后本回合角色手牌上限-1'
            ])
            .set('ai', function() {
                var player = _status.event.player;
                var current = _status.event.current;
                if (get.attitude(player, current) > 0) return '摸牌+1';
                if (player.countCards('he') <= 2) return '摸牌+1';
                return '弃牌-1';
            })
            .set('current', event.current);
        
        "step 1";
        if (result.control == '摸牌+1') {
            player.draw();
            event.current.addSkill('gz_miji_add');
            event.current.addMark('gz_miji_add', 1, false);
            game.log(event.current, '本回合手牌上限+1');
        } else {
            player.chooseToDiscard('he', true);
            event.current.addSkill('gz_miji_reduce');
            event.current.addMark('gz_miji_reduce', 1, false);
            game.log(event.current, '本回合手牌上限-1');
        }
    },
    subSkill: {
        add: {
            charlotte: true,
            onremove: true,
            mod: {
                maxHandcard: function(player, num) {
                    return num + player.countMark('gz_miji_add');
                },
            },
            trigger: {player: 'phaseAfter'},
            forced: true,
            silent: true,
            content: function() {
                player.removeSkill('gz_miji_add');
            },
        },
        reduce: {
            charlotte: true,
            onremove: true,
            mod: {
                maxHandcard: function(player, num) {
                    return num - player.countMark('gz_miji_reduce');
                },
            },
            trigger: {player: 'phaseAfter'},
            forced: true,
            silent: true,
            content: function() {
                player.removeSkill('gz_miji_reduce');
            },
        },
    },
},

// ==================== 贺齐 ====================

gz_junwei: {
    audio: "ext:鹰击长空/audio/skill:4",
    trigger: {
        player: 'phaseZhunbeiBegin',
    },
    forced: true,
    filter: function(event, player) {
        return player.hp > 0;
    },
    content: function() {
        "step 0";
        if (!player.storage.gz_junwei_options) {
            player.storage.gz_junwei_options = [1, 2, 3, 4];
        }
       
        var maxNum = player.hp;
        event.selectedTargets = [];
        event.maxNum = maxNum;
       
        game.log('[军威] 最多选择', maxNum, '名角色');
       
        "step 1";
        if (event.selectedTargets.length >= event.maxNum) {
            event.goto(3);
            return;
        }
       
        player.chooseTarget(
            '军威：选择一名势力不同的角色（已选' + event.selectedTargets.length + '/' + event.maxNum + '）',
            function(card, player, target) {
                var selected = _status.event.selectedTargets;
                
                if (target.isUnseen()) {
                    return !selected.includes(target);
                }
                
                for (var i = 0; i < selected.length; i++) {
                    if (!selected[i].isUnseen() && selected[i].group == target.group) {
                        return false;
                    }
                }
                return !selected.includes(target);
            }
        ).set('selectedTargets', event.selectedTargets).set('ai', function(target) {
            var att = get.attitude(_status.event.player, target);
            if (att < 0) return 1;
            return 0.5;
        });
       
        "step 2";
        if (result.bool && result.targets && result.targets.length) {
            event.selectedTargets.push(result.targets[0]);
            event.goto(1);
        } else {
            event.goto(3);
        }
       
        "step 3";
        if (event.selectedTargets.length == 0) {
            event.finish();
            return;
        }
       
        game.log(player, '选择了', event.selectedTargets);
        event.targetIndex = 0;
       
        "step 4";
        if (event.targetIndex >= event.selectedTargets.length) {
            event.finish();
            return;
        }
       
        event.currentTarget = event.selectedTargets[event.targetIndex];
       
        if (!event.currentTarget.isIn()) {
            event.targetIndex++;
            event.redo();
            return;
        }
       
        var availableOptions = player.storage.gz_junwei_options.filter(function(opt) {
            switch(opt) {
                case 1: return true;
                case 2: return event.currentTarget.countCards('e') > 0;
                case 3: return true;
                case 4: return event.currentTarget.countCards('h') > 0;
            }
            return false;
        });
       
        // ✅ 保存到 event
        event.availableOptions = availableOptions;
       
        if (availableOptions.length == 0) {
            game.log('[军威] 没有可用选项，跳过', event.currentTarget);
            event.targetIndex++;
            event.redo();
            return;
        }
       
        var allChoices = {
            1: '执行一个军令，然后移动场上一张牌',
            2: '弃置装备区的一张牌然后摸两张牌',
            3: '本回合获得【绮胄】',
            4: '弃置所有手牌并摸等量的牌'
        };
       
        var choiceList = [];
        for (var i = 0; i < availableOptions.length; i++) {
            choiceList.push(allChoices[availableOptions[i]]);
        }
       
        player.chooseControl()
            .set('choiceList', choiceList)
            .set('prompt', '军威：为' + get.translation(event.currentTarget) + '选择一项')
            .set('ai', function() {
                var target = _status.event.target;
                var player = _status.event.player;
                var att = get.attitude(player, target);
                var opts = _status.event.availableOptions;
                
                if (att < 0) {
                    for (var i = 0; i < opts.length; i++) {
                        if (opts[i] == 1) return i;
                    }
                }
                
                for (var i = opts.length - 1; i >= 0; i--) {
                    if (opts[i] == 4) return i;
                }
                for (var i = opts.length - 1; i >= 0; i--) {
                    if (opts[i] == 3) return i;
                }
                for (var i = opts.length - 1; i >= 0; i--) {
                    if (opts[i] == 2) return i;
                }
                return 0;
            })
            .set('target', event.currentTarget)
            .set('availableOptions', availableOptions);
       
        "step 5";
        var selectedIndex = result.index;
        var optionNum = event.availableOptions[selectedIndex];
        event.chosenOption = optionNum;
       
        var index = player.storage.gz_junwei_options.indexOf(optionNum);
        if (index > -1) {
            player.storage.gz_junwei_options.splice(index, 1);
        }
       
        game.log(player, '为', event.currentTarget, '选择了选项', optionNum);
       
        switch(optionNum) {
            case 1:
                player.chooseJunlingFor(event.currentTarget);
                break;
            case 2:
                event.currentTarget.chooseToDiscard('e', true);
                event.currentTarget.draw(2);
                event.targetIndex++;
                event.goto(4);
                break;
            case 3:
                event.currentTarget.addTempSkill('gz_qizhou', {global: 'phaseAfter'});
                game.log(event.currentTarget, '获得了【绮胄】');
                event.targetIndex++;
                event.goto(4);
                break;
            case 4:
                var num = event.currentTarget.countCards('h');
                event.currentTarget.discard(event.currentTarget.getCards('h'));
                event.currentTarget.draw(num);
                event.targetIndex++;
                event.goto(4);
                break;
        }
       
        "step 6";
        if (event.chosenOption != 1) {
            event.finish();
            return;
        }
       
        event.junling = result.junling;
        event.targets = result.targets;
       
        event.currentTarget.carryOutJunling(player, event.junling, event.targets);
       
        "step 7";
        event.currentTarget.chooseTarget('军威：选择场上一张牌移动', function(card, player, target) {
            return target.countCards('ej') > 0;
        }).set('ai', function(target) {
            var player = _status.event.player;
            return -get.attitude(player, target);
        });
       
        "step 8";
        if (!result.bool || !result.targets || !result.targets.length) {
            event.targetIndex++;
            event.goto(4);
            return;
        }
       
        event.moveFrom = result.targets[0];
        event.currentTarget.choosePlayerCard('ej', event.moveFrom, true, '选择要移动的牌');
       
        "step 9";
        if (!result.bool || !result.cards || !result.cards.length) {
            event.targetIndex++;
            event.goto(4);
            return;
        }
       
        event.moveCard = result.cards[0];
        event.currentTarget.chooseTarget('军威：将' + get.translation(event.moveCard) + '移动给一名角色', function(card, player, target) {
            return target != _status.event.moveFrom;
        }).set('moveFrom', event.moveFrom).set('ai', function(target) {
            var player = _status.event.player;
            var att = get.attitude(player, target);
            var card = _status.event.getParent().moveCard;
            
            if (get.position(card) == 'e') {
                return att * get.equipValue(card);
            }
            return att;
        });
       
        "step 10";
        if (result.bool && result.targets && result.targets.length) {
            var target = result.targets[0];
            game.log(event.currentTarget, '将', event.moveCard, '从', event.moveFrom, '移动给', target);
            
            if (get.position(event.moveCard) == 'e') {
                target.equip(event.moveCard);
            } else {
                target.addJudge(event.moveCard);
            }
        }
       
        event.targetIndex++;
        event.goto(4);
    },
    group: 'gz_junwei_clear',
    subSkill: {
        clear: {
            trigger: {player: 'phaseAfter'},
            forced: true,
            silent: true,
            content: function() {
                player.storage.gz_junwei_options = [1, 2, 3, 4];
            },
        },
    },
},

gz_qizhou:{
    audio: "qizhou",
    trigger: {
        player: "loseAfter",
        global: ["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter","phaseDrawBegin2"],
    },
     forced: true,
    popup: false,
    derivation: ["mashu","reyingzi","reduanbing","fenwei"],
    filter(event, player) {
        if (player.equiping) {
            return false;
        }
        var suits = [];
        var es = player.getCards("e");
        for (var i = 0; i < es.length; i++) {
            suits.add(get.suit(es[i]));
        }
        if (player.additionalSkills.qizhou) {
            return player.additionalSkills.qizhou.length != suits.length;
        } else {
            return suits.length > 0;
        }
    },
    content() {
        var suits = [];
        var es = player.getCards("e");
        for (var i = 0; i < es.length; i++) {
            suits.add(get.suit(es[i]));
        }
        player.removeAdditionalSkill("gz_qizhou");
        switch (suits.length) {
            case 1:
                player.addAdditionalSkill("gz_qizhou", ["mashu"]);
                break;
            case 2:
                player.addAdditionalSkill("gz_qizhou", ["mashu", "reyingzi"]);
                break;
            case 3:
                player.addAdditionalSkill("gz_qizhou", ["mashu", "reyingzi", "reduanbing"]);
                break;
            case 4:
                player.addAdditionalSkill("gz_qizhou", ["mashu", "reyingzi", "reduanbing", "fenwei"]);
                break;
        }
    },
    ai: {
        threaten: 1.2,
    },
    "_priority": 0,
},

gz_zicai: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        global: 'gainAfter',
    },
    forced: true,
    filter: function(event, player) {
        if (!_status.currentPhase || _status.currentPhase != player) return false;
        if (!event.player || !event.player.isIn()) return false;
       
        if (!player.isUnseen() && !event.player.isUnseen() && player.group == event.player.group) {
            if (!player.storage.gz_zicai_ally) {
                player.storage.gz_zicai_ally = [];
            }
            if (!player.storage.gz_zicai_ally.includes(event.player)) {
                return true;
            }
        }
       
        if (event.source == player) {
            if (!player.storage.gz_zicai_others) {
                player.storage.gz_zicai_others = [];
            }
            if (!player.storage.gz_zicai_others.includes(event.player)) {
                return true;
            }
        }
       
        return false;
    },
    content: function() {
        "step 0";
        var target = trigger.player;
        event.target = target;
       
        if (!player.isUnseen() && !target.isUnseen() && player.group == target.group) {
            if (!player.storage.gz_zicai_ally) {
                player.storage.gz_zicai_ally = [];
            }
            player.storage.gz_zicai_ally.push(target);
        }
       
        if (trigger.source == player) {
            if (!player.storage.gz_zicai_others) {
                player.storage.gz_zicai_others = [];
            }
            player.storage.gz_zicai_others.push(target);
        }
       
        event.oldCards = target.getCards('h').slice(0);
        target.draw(1);
        game.log(target, '因【自才】摸了一张牌');
       
        "step 1";
        var target = event.target;
       
        if (!target || !target.isIn()) {
            event.finish();
            return;
        }
       
        var newCards = target.getCards('h').filter(function(card) {
            return !event.oldCards.includes(card);
        });
       

    },
    group: 'gz_zicai_clear',
    subSkill: {
        clear: {
            trigger: {player: 'phaseAfter'},
            forced: true,
            silent: true,
            content: function() {
                delete player.storage.gz_zicai_ally;
                delete player.storage.gz_zicai_others;
							player.removeMark("gz_zicai_discard");
            },
        },
    },
},

gz_zicai_discard: {
    trigger: {
        player: 'phaseDiscardEnd',
    },
    forced: true,
    charlotte: true,
    filter: function(event, player) {
        return player.countCards('h', function(card) {
            return card.hasGaintag('gz_zicai_discard');
        }) > 0;
    },
    content: function() {
        var cards = player.getCards('h', function(card) {
            return card.hasGaintag('gz_zicai_discard');
        });
       
        if (cards.length > 0) {
            player.discard(cards);
            game.log(player, '弃置了因【自才】获得的', cards);
        }
       
        if (player.countCards('h', function(card) {
            return card.hasGaintag('gz_zicai_discard');
        }) == 0) {
            player.removeSkill('gz_zicai_discard');

        }
    },
    mark: true,
    intro: {
        content: function(storage, player) {
            var cards = player.getCards('h', function(card) {
                return card.hasGaintag('gz_zicai_discard');
            });
            if (cards.length) {
                return '结束阶段需弃置：' + get.translation(cards);
            }
            return '';
        },
    },
},
// 整睦
gz_zhengmu: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        player: 'phaseJieshuBegin',
    },
    filter: function(event, player) {
        return player.countCards('he', {color: 'red'}) > 0 && game.hasPlayer(target => target != player);
    },
    check: function(event, player) {
        return game.hasPlayer(target => {
            return target != player && get.attitude(player, target) > 3;
        });
    },
    content: function() {
        "step 0";
        player.chooseCardTarget({
            position: 'he',
            filterCard: function(card) {
                return get.color(card) == 'red';
            },
            filterTarget: function(card, player, target) {
                return target != player;
            },
            ai1: function(card) {
                return 8 - get.value(card);
            },
            ai2: function(target) {
                var player = _status.event.player;
                var att = get.attitude(player, target);
                if (att > 0) return att + 5;
                return 0;
            },
            prompt: '整睦：将一张红色牌交给一名其他角色',
        });
       
        "step 1";
        if (result.bool && result.targets && result.targets.length) {
            var target = result.targets[0];
            player.give(result.cards, target);
           
            // 记录目标势力
            player.storage.gz_zhengmu_group = target.group;
            
            // 添加效果标记，持续到下个回合开始
            player.addTempSkill('gz_zhengmu_effect', {player: 'phaseBegin'});
            
            // 初始化已触发记录
            player.storage.gz_zhengmu_used = {};
            
            game.log(player, '发动', '#g【整睦】', '，选择了', '#y' + get.translation(target.group) + '势力');
        }
    },
    subSkill: {
        // 主效果
        effect: {
            trigger: {
                global: 'useCardToTargeted',
            },
            forced: true,
            charlotte: true,
            mark: true,
            intro: {
                content: function(storage, player) {
                    var group = player.storage.gz_zhengmu_group;
                    if (group) {
                        return '选择' + get.translation(group) + '势力的角色';
                    }
                    return '未选择势力';
                }
            },
            onremove: function(player) {
                delete player.storage.gz_zhengmu_used;
                delete player.storage.gz_zhengmu_group;
            },
            filter: function(event, player) {
                if (!event.target || event.target == event.player) return false;
                if (!event.player) return false;
                
                // 获取记录的势力
                var targetGroup = player.storage.gz_zhengmu_group;
                if (!targetGroup) return false;
                
                // 判断目标是否与你势力相同
                if (player.isUnseen() || event.target.isUnseen()) return false;
                var playerGroup = player.group;
                var victimGroup = event.target.group;
                if (playerGroup != victimGroup) return false;
               
                // 判断使用者是否是目标势力
                if (event.player.isUnseen()) return false;
                var sourceGroup = event.player.group;
                if (sourceGroup != targetGroup) return false;
               
                // 检查是否本回合该角色首次触发
                if (!player.storage.gz_zhengmu_used) {
                    player.storage.gz_zhengmu_used = {};
                }
                
                // 使用playerid作为key，配合当前回合数
                var currentPhase = _status.currentPhase;
                if (!currentPhase) return false;
                
                var key = event.target.playerid + '_' + currentPhase.playerid;
                
                return !player.storage.gz_zhengmu_used[key];
            },
            content: function() {
                'step 0';
                var target = trigger.target;
                var source = trigger.player;
               
                // 记录本回合该角色已触发
                if (!player.storage.gz_zhengmu_used) {
                    player.storage.gz_zhengmu_used = {};
                }
                
                var currentPhase = _status.currentPhase;
                var key = target.playerid + '_' + currentPhase.playerid;
                player.storage.gz_zhengmu_used[key] = true;
               
                // 各摸一张牌
                game.log(target, '与', source, '因', '#g【整睦】', '各摸一张牌');
                
                'step 1';
                trigger.target.draw();
                
                'step 2';
                trigger.player.draw();
            },
            sub: true,
        },
    },
},
// ==================== 群黄月英 ====================

gz_ruxin: {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: 'phaseUse',
    limited: true,
    skillAnimation: true,
    animationColor: 'fire',
    filter: function(event, player) {
        // 确保场上至少有一名角色有明置武将
        return game.hasPlayer(target => {
            return (target.name1 && !target.isUnseen(0)) || (target.name2 && !target.isUnseen(1));
        });
    },
    content: function() {
        "step 0";
        player.awakenSkill('gz_ruxin');
       
        // 同时选择至多两名角色
        player.chooseTarget([1, 2], '濡心：选择至多两名角色', function(card, player, target) {
            // 必须有至少一张明置武将
            return (target.name1 && !target.isUnseen(0)) || (target.name2 && !target.isUnseen(1));
        }, true).set('ai', function(target) {
            return 1;
        });
       
        "step 1";
        if (!result.bool || !result.targets || !result.targets.length) {
            event.finish();
            return;
        }
       
        event.targets = result.targets;
        
        // 如果只选了一名角色，必须有两张明置武将
        if (event.targets.length == 1) {
            var target = event.targets[0];
            var count = 0;
            if (target.name1 && !target.isUnseen(0)) count++;
            if (target.name2 && !target.isUnseen(1)) count++;
            
            if (count < 2) {
                game.log('[濡心] 只选择一名角色时，该角色必须有两张明置武将');
                event.finish();
                return;
            }
            
            event.target1 = target;
            event.target2 = target;
        } else {
            event.target1 = event.targets[0];
            event.target2 = event.targets[1];
        }
       
        // 收集两名角色的所有明置武将牌
        event.chars1 = [];
        event.chars2 = [];
       
        if (event.target1.name1 && !event.target1.isUnseen(0)) {
            event.chars1.push({
                name: event.target1.name1,
                position: 0
            });
        }
        if (event.target1.name2 && !event.target1.isUnseen(1)) {
            event.chars1.push({
                name: event.target1.name2,
                position: 1
            });
        }
       
        if (event.target2.name1 && !event.target2.isUnseen(0)) {
            event.chars2.push({
                name: event.target2.name1,
                position: 0
            });
        }
        if (event.target2.name2 && !event.target2.isUnseen(1)) {
            event.chars2.push({
                name: event.target2.name2,
                position: 1
            });
        }
       
        game.log('[濡心]', event.target1, '的明置武将:', event.chars1.map(c => get.translation(c.name)).join('、'));
        if (event.target2 != event.target1) {
            game.log('[濡心]', event.target2, '的明置武将:', event.chars2.map(c => get.translation(c.name)).join('、'));
        }
       
        // 检查所有可能的组合是否有珠联璧合
        event.hasPair = false;
       
        for (var c1 of event.chars1) {
            for (var c2 of event.chars2) {
                // 如果是同一张牌，跳过
                if (event.target1 == event.target2 && c1.position == c2.position) continue;
               
                var isPair = false;
               
                if (get.is.jun(c1.name) || get.is.jun(c2.name)) {
                    // 君主判断势力
                    if (lib.character[c1.name] && lib.character[c2.name]) {
                        isPair = lib.character[c1.name][1] == lib.character[c2.name][1];
                    }
                } else {
                    // 使用珠联璧合判断
                    var tempPlayer = {
                        name1: c1.name,
                        name2: c2.name,
                    };
                    isPair = lib.element.player.perfectPair?.call(tempPlayer) || false;
                }
               
                if (isPair) {
                    game.log('[濡心]', get.translation(c1.name), '+', get.translation(c2.name), '= 珠联璧合 ✓');
                    event.hasPair = true;
                }
            }
        }
       
        // 如果有任意一对是珠联璧合
        if (event.hasPair) {
            // 涉及的角色各获得一枚标记
            event.target1.addMark('zhulianbihe_mark', 1, false);
            if (event.target2 != event.target1) {
                event.target2.addMark('zhulianbihe_mark', 1, false);
            }
            game.log(event.target1, event.target2 != event.target1 ? ('和' + get.translation(event.target2)) : '', '获得【珠联璧合】标记');
            event.finish();
        } else {
            game.log('[濡心] 没有珠联璧合组合');
        }
       
        "step 2";
        // ✅ 没有珠联璧合，选择有两张明置武将的角色进行更换（不限势力）
        var targets = [event.target1, event.target2].filter(target => {
            // ✅ 移除势力限制
            // 必须有两张明置武将牌
            var count = 0;
            if (target.name1 && !target.isUnseen(0)) count++;
            if (target.name2 && !target.isUnseen(1)) count++;
            return count >= 2;
        });
       
        // 去重
        targets = Array.from(new Set(targets));
       
        if (targets.length == 0) {
            game.log('[濡心] 没有有两张明置武将的角色可以更换');
            event.finish();
            return;
        }
       
        player.chooseTarget('濡心：选择一名有两张明置武将的角色', function(card, player, target) {
            return _status.event.targets.includes(target);
        }, true).set('targets', targets).set('ai', function(target) {
            return 1;
        });
       
        "step 3";
        if (!result.bool || !result.targets || !result.targets.length) {
            event.finish();
            return;
        }
       
        event.changeTarget = result.targets[0];
       
        // 收集该角色的所有明置武将牌
        var allChars = [];
        if (event.changeTarget.name1 && !event.changeTarget.isUnseen(0)) {
            allChars.push({
                name: event.changeTarget.name1,
                position: 0
            });
        }
        if (event.changeTarget.name2 && !event.changeTarget.isUnseen(1)) {
            allChars.push({
                name: event.changeTarget.name2,
                position: 1
            });
        }
       
        event.allChars = allChars;
       
        if (allChars.length < 2) {
            game.log('[濡心] 该角色没有两张明置武将');
            event.finish();
            return;
        }
       
        // 选择保留哪一张武将牌
        player.chooseButton([
            '濡心：选择要保留的武将牌（另一张将被替换）',
            [allChars.map(c => c.name), 'character']
        ], true).set('ai', function() {
            return 0;
        });
       
        "step 4";
        if (!result.bool || !result.links || !result.links.length) {
            event.finish();
            return;
        }
       
        var keepName = result.links[0];
        event.keepChar = event.allChars.find(c => c.name == keepName);
       
        // 找出要替换的武将牌
        event.replaceChar = event.allChars.find(c => c.name != keepName);
       
        game.log('[濡心] 保留:', get.translation(event.keepChar.name));
        game.log('[濡心] 替换:', get.translation(event.replaceChar.name));
       
        // 获取所有可以与保留武将配对的国战武将
        var keepName = event.keepChar.name;
        var replaceName = event.replaceChar.name;
       
        var pairList = [];
       
        if (lib.characterPack.mode_guozhan) {
            for (var name in lib.characterPack.mode_guozhan) {
                if (name == replaceName) continue;
                if (lib.filter.characterDisabled(name)) continue;
               
                var checkPair = false;
                if (get.is.jun(name) || get.is.jun(keepName)) {
                    if (lib.character[name] && lib.character[keepName]) {
                        checkPair = lib.character[name][1] == lib.character[keepName][1];
                    }
                } else {
                    var tempPlayer = {
                        name1: name,
                        name2: keepName,
                    };
                    checkPair = lib.element.player.perfectPair?.call(tempPlayer) || false;
                }
               
                if (checkPair) {
                    pairList.push(name);
                }
            }
        }
       
        if (pairList.length == 0) {
            game.log('[濡心] 没有可用的国战珠联璧合武将');
            event.finish();
            return;
        }
       
        game.log('[濡心] 可选择的珠联璧合武将:', pairList.length, '个');
       
        player.chooseButton([
            '濡心：选择一张与' + get.translation(keepName) + '配对的【珠联璧合】武将牌（国战）',
            [pairList, 'character']
        ], true).set('ai', function() {
            return Math.random();
        });
       
        "step 5";
        if (!result.bool || !result.links || !result.links.length) {
            event.finish();
            return;
        }
       
        var newCharacter = result.links[0];
        var oldCharacter = event.replaceChar.name;
        var position = event.replaceChar.position;
       
        game.log('[濡心]', event.changeTarget, '将', get.translation(oldCharacter), '更换为', get.translation(newCharacter));
       
        // 更换武将
        event.changeTarget.reinit(oldCharacter, newCharacter, position == 1);
		  event.changeTarget.addMark('zhulianbihe_mark', 1, false);
    },
    ai: {
        order: 1,
        result: {
            player: function(player) {
                return 1;
            },
        },
    },
},
// 玲珑
gz_linglong: {
    audio: "ext:鹰击长空/audio/skill:2",
    mod: {
        cardUsable: function(card, player, num) {
            if (card.name == 'sha') {
                // 检查场上是否有珠联璧合角色
                var hasPair = game.hasPlayer(function(current) {
                    return current.hasMark('zhulianbihe_mark') || current.perfectPair();
                });
              
                if (hasPair) return num + 1;
            }
        },
    },
    group: ['gz_linglong_draw', 'gz_linglong_extra', 'gz_linglong_bagua', 'gz_linglong_clear'],
    subSkill: {
        // 珠联璧合角色指定配对时摸牌
        draw: {
            trigger: {
                global: 'useCardToPlayer',
            },
            forced: true,
            filter: function(event, player) {
                if (!event.player || !event.target) return false;
                if (!event.player.isIn() || !event.target.isIn()) return false;
                if (event.player == event.target) return false;
              
                // 检查是否为其回合内首次使用牌
                if (_status.currentPhase != event.player) return false;
              
                if (!player.storage.gz_linglong_draw) {
                    player.storage.gz_linglong_draw = [];
                }
              
                var key = event.player.playerid + '_' + event.target.playerid;
                if (player.storage.gz_linglong_draw.includes(key)) return false;
              
                // 判断是否为珠联璧合配对
                var isPair = get.info('gz_ruxin')?.isPerfectPair?.(event.player, event.target);
              
                return isPair;
            },
            logTarget: function(event) {
                return [event.player, event.target];
            },
            content: function() {
                var source = trigger.player;
                var target = trigger.target;
              
                // 记录
                if (!player.storage.gz_linglong_draw) {
                    player.storage.gz_linglong_draw = [];
                }
                var key = source.playerid + '_' + target.playerid;
                player.storage.gz_linglong_draw.push(key);
              
                game.asyncDraw([source, target]);
            },
        },
      
        // ✅ 珠联璧合同一角色额外执行（修复亮将问题）
        extra: {
            trigger: {
                global: 'useCard',
            },
            // ❌ 移除 direct: true
            // ✅ 不加 direct 或 forced，技能会正常触发并亮将
            filter: function(event, player) {
                if (!event.player || !event.player.isIn()) return false;
                if (_status.currentPhase != event.player) return false;
              
                // 检查使用者是否拥有珠联璧合武将牌且两张配对
                var source = event.player;
                if (!source.perfectPair || !source.perfectPair()) return false;
              
                // 检查是否首次
                if (!player.storage.gz_linglong_extra) {
                    player.storage.gz_linglong_extra = [];
                }
              
                return !player.storage.gz_linglong_extra.includes(source);
            },
            check: function(event, player) {
                return get.attitude(player, event.player) > 0;
            },
            logTarget: 'player',
            content: function() {
                "step 0";
                player.chooseBool('玲珑：是否令' + get.translation(trigger.player) + '额外执行一次【' + get.translation(trigger.card) + '】？').set('choice', get.attitude(player, trigger.player) > 0);
              
                "step 1";
                if (result.bool) {
                    // 记录
                    if (!player.storage.gz_linglong_extra) {
                        player.storage.gz_linglong_extra = [];
                    }
                    player.storage.gz_linglong_extra.push(trigger.player);
                  
                    // 额外执行
                    var source = trigger.player;
                    var card = trigger.card;
                    var targets = trigger.targets || [];
                  
                    game.log('[玲珑] 令', source, '额外执行一次', card);
                  
                    // 复制牌
                    var newCard = game.createCard(card.name, card.suit, card.number, card.nature);
                  
                    if (targets.length == 0) {
                        source.useCard(newCard, false);
                    } else if (targets.length == 1) {
                        source.useCard(newCard, targets[0], false);
                    } else {
                        source.useCard(newCard, targets, false);
                    }
                }
            },
        },
      
        // 八卦技能
        bagua: {
            audio: "linglong",
            audioname2: {
                "re_jsp_huangyueying": "relinglong",
            },
            inherit: "bagua_skill",
            sourceSkill: "gz_linglong",
            trigger: {
                player: ["chooseToRespondBegin", "chooseToUseBegin"],
            },
            filter: function(event, player) {
                // 必须防具栏为空
                if (!player.hasEmptySlot(2)) return false;
              
                // 检查是否需要闪
                if (!lib.skill.bagua_skill.filter(event, player)) return false;
              
                return true;
            },
            check: function(event, player) {
                if (!event) return true;
              
                if (event.ai) {
                    var ai = event.ai;
                    var tmp = _status.event;
                    _status.event = event;
                    var result = ai({ name: "shan" }, _status.event.player, event);
                    _status.event = tmp;
                    return result > 0;
                }
              
                const type = event.name === "chooseToRespond" ? "respond" : "use";
                let evt = event.getParent();
              
                if (player.hasSkillTag("noShan", null, type)) return false;
              
                if (!evt || !evt.card || !evt.player || player.hasSkillTag("useShan", null, type)) {
                    return true;
                }
              
                if (evt.card && evt.player && player.isLinked() && game.hasNature(evt.card) && get.attitude(player, evt.player._trueMe || evt.player) > 0) {
                    return false;
                }
              
                return true;
            },
            content: function() {
                "step 0";
                trigger.bagua_skill = true;
                player.judge("bagua", function(card) {
                    return get.color(card) === "red" ? 1.5 : -0.5;
                }).judge2 = function(result) {
                    return result.bool;
                };
              
                "step 1";
                if (result.judge > 0) {
                    trigger.untrigger();
                    trigger.set("responded", true);
                    trigger.result = { bool: true, card: { name: "shan", isCard: true } };
                }
            },
            ai: {
                respondShan: true,
                freeShan: true,
                skillTagFilter: function(player, tag, arg) {
                    if (tag !== "respondShan" && tag !== "freeShan") return;
                  
                    // 防具栏为空才能用
                    if (!player.hasEmptySlot(2) || player.hasSkillTag("unequip2")) {
                        return false;
                    }
                  
                    if (!arg || !arg.player) return true;
                  
                    if (arg.player.hasSkillTag("unequip", false, {
                        target: player,
                    })) {
                        return false;
                    }
                  
                    return true;
                },
                effect: {
                    target: function(card, player, target) {
                        if (player == target && get.subtype(card) == "equip2") {
                            if (get.equipValue(card) <= 7.5) return 0;
                        }
                        if (target.getEquip(2)) return;
                        return lib.skill.bagua_skill.ai.effect.target.apply(this, arguments);
                    },
                },
            },
            "_priority": -25,
        },
      
        // 回合结束清空记录
        clear: {
            trigger: {
                global: 'phaseAfter',
            },
            forced: true,
            silent: true,
            popup: false,
            content: function() {
                for (var p of game.players) {
                    delete p.storage.gz_linglong_draw;
                    delete p.storage.gz_linglong_extra;
                }
            },
        },
    },
},

// ==================== 任婉 ====================
gz_pizou: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        player: "dying",
    },
    forced: true,
    locked: true,
    content: function() {
        // 令所有角色的非锁定技失效
        for (var p of game.players) {
            p.addTempSkill("fengyin");
        }
        game.log(player, "令所有角色的非锁定技失效直至本回合结束");
    },
},

gz_juansui: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        player: "changeHp",
    },
    forced: true,
    locked: true,
    filter: function(event, player) {
        return player.hp == 1;  // ✅ 只要体力变化后为1就触发（不管是失去还是恢复）
    },
    content: function() {
        "step 0";
        player.draw(2);
        
        "step 1";
        // 复原武将牌
        if (player.isLinked()) player.link();
        if (player.isTurnedOver(1)) player.turnOver();
        
        "step 2";
        if (!player.storage.gz_juansui_used) {
            player.storage.gz_juansui_used = [];
        }
        
        var current = _status.currentPhase;
        if (!current || !current.group) {
            event.finish();
            return;
        }
        
        event.targetGroup = current.group;
        
        // 获取未使用过的普通锦囊牌
        var list = [];
        for (var name of lib.inpile) {
            if (get.type(name) == 'trick') {
                var info = lib.card[name];
                if (!info || info.type != 'delay') {
                    if (!player.storage.gz_juansui_used.includes(name)) {
                        list.push(['锦囊', '', name]);
                    }
                }
            }
        }
        
        if (list.length == 0) {
            event.finish();
            return;
        }
        
        player.chooseButton([
            '狷谇：选择一种普通锦囊牌',
            [list, 'vcard']
        ], true).set('ai', function(button) {
            return _status.event.player.getUseValue({name: button.link[2]});
        });
        
        "step 3";
        if (!result.bool || !result.links) {
            event.finish();
            return;
        }
        
        var cardName = result.links[0][2];
        player.storage.gz_juansui_used.push(cardName);
        
        var card = game.createCard(cardName);
        var info = get.info(card);
        
        // 判断是否需要选择目标
        if (!info || !info.selectTarget || info.selectTarget == -1) {
            if (player.canUse(card, player)) {
                player.useCard(card, player, false);
            }
            event.finish();
        } else {
            player.chooseTarget(
                '狷谇：选择【' + get.translation(cardName) + '】的目标',
                function(card, player, target) {
                    return target.group == _status.event.targetGroup;
                }
            ).set('targetGroup', event.targetGroup).set('ai', function(target) {
                return get.effect(target, {name: _status.event.cardName}, _status.event.player, _status.event.player);
            }).set('cardName', cardName);
        }
        
        "step 4";
        if (result.bool && result.targets) {
            var cardName = player.storage.gz_juansui_used[player.storage.gz_juansui_used.length - 1];
            var card = game.createCard(cardName);
            player.useCard(card, result.targets, false);
        }
    },
},
// ==================== 公孙修 ====================
gz_kuizhen: {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: 'phaseUse',
    usable: 1,
    filter: function(event, player) {
        return player.countCards('he', card => card.name == 'sha' && get.color(card) == 'black') > 0 &&
               game.hasPlayer(target => target != player && (!player.isUnseen() && !target.isUnseen() && target.group != player.group));
    },
    filterCard: function(card) {
        return card.name == 'sha' && get.color(card) == 'black';
    },
    position: 'he',
    filterTarget: function(card, player, target) {
        if (player.isUnseen() || target.isUnseen()) return false;
        return target != player && target.group != player.group;
    },
    check: function(card) {
        return 6 - get.value(card);
    },
    content: function() {
        "step 0";
        event.oldHp = player.hp;
       
        var card = game.createCard('juedou');
        targets[0].useCard(card, player, false);
       
        "step 1";
        // ✅ 只有受到伤害才执行后续效果
        if (player.hp < event.oldHp) {
            // 观看目标手牌
            player.viewHandcards(targets[0]);
           
            var shaCards = targets[0].getCards('h', {name: 'sha'});
            if (shaCards.length > 0) {
                // ✅ 有【杀】，获得
                player.gain(shaCards, targets[0], 'giveAuto');
            } else {
                // ✅ 无【杀】，失去1点体力
                targets[0].loseHp();
            }
        }
        // ✅ 未受到伤害，什么都不发生
    },
    ai: {
        order: 8,
        result: {
            target: -1,
        },
    },
},

gz_niejiang: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        global: 'changeHp',
    },
    forced: true,
    locked: true,
    filter: function(event, player) {
        // ✅ 新增：检查本回合该角色是否已触发过
        if (!player.storage.gz_niejiang_record) {
            player.storage.gz_niejiang_record = [];
        }
        if (player.storage.gz_niejiang_record.includes(event.player)) {
            return false; // 本回合该角色已触发过
        }
        
        // 获取所有存活角色
        var alive = game.filterPlayer();
        // 找出最低体力值
        var minHp = Math.min.apply(Math, alive.map(p => p.hp));
        // 找出所有体力最低的角色
        var minHpPlayers = alive.filter(p => p.hp == minHp);
       
        // 只有当体力变化后的角色成为【唯一】最低体力时才触发摸牌
        return event.player.hp == minHp && minHpPlayers.length == 1;
    },
    content: function() {
        "step 0";
        
        // ✅ 新增：记录本回合该角色已触发
        if (!player.storage.gz_niejiang_record) {
            player.storage.gz_niejiang_record = [];
        }
        player.storage.gz_niejiang_record.push(trigger.player);
        
        // ✅ 新增：添加回合结束清理技能
        if (!player.hasSkill('gz_niejiang_clear')) {
            player.addTempSkill('gz_niejiang_clear', {player: 'phaseAfter'});
        }
        
        player.draw();
       
        "step 1";
        // 检查刚摸的牌
        var history = player.getHistory('gain', evt => {
            return evt.getParent(2) == event;
        });
       
        if (history.length && history[0].cards && history[0].cards.length) {
            var card = history[0].cards[0];
            if (card.name == 'sha') {
                player.showCards([card], '蹑江');
               
                // 找出所有可以使用这张杀的目标
                var targets = game.filterPlayer(function(current) {
                    return player.canUse(card, current);
                });
               
                if (targets.length > 0) {
                    player.chooseUseTarget(card, true, false);
                }
            }
        }
    },
    mod: {
        globalFrom: function(from, to, distance) {
            // ⭐️ 最严格的检查：确保 to 是有效的玩家对象
            if (!to || !to.name || typeof to.hasSkill !== 'function') {
                return;
            }
           
            // 确保 to 在游戏中
            if (!game.players.includes(to) && !game.dead.includes(to)) {
                return;
            }
           
            // 获取所有存活角色
            var alive = game.filterPlayer();
            if (!alive.includes(to)) return;
           
            // 找出最低体力值
            var minHp = Math.min.apply(Math, alive.map(p => p.hp));
           
            // 如果目标是体力最低的角色之一（可以是多个），距离视为1
            if (to.hp == minHp && to != from) {
                return 1 - distance;  // 将距离修正为1
            }
        },
    },
    // ✅ 新增：子技能，用于清理回合记录
    subSkill: {
        clear: {
            charlotte: true,
            trigger: {
                global: 'phaseAfter',
            },
            forced: true,
            popup: false,
            silent: true,
            content: function() {
                delete player.storage.gz_niejiang_record;
            },
        },
    },
},

gz_anxu: {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: 'phaseUse',
    usable: 1,
    filterTarget: function(card, player, target) {
        
        var num = target.countCards('h');
        if (ui.selected.targets.length) {
            return num != ui.selected.targets[0].countCards('h');
        }
        
        // 确保场上有手牌数不同的角色
        return game.hasPlayer(current => {
            return current != target && current.countCards('h') != num;
        });
    },
    selectTarget: 2,
    multitarget: true,
    complexTarget: true,
    content: function() {
        "step 0";
        // 确定手牌少的和手牌多的
        var less, more;
        if (targets[0].countCards('h') < targets[1].countCards('h')) {
            less = targets[0];
            more = targets[1];
        } else {
            less = targets[1];
            more = targets[0];
        }
        
        event.less = less;
        event.more = more;
        
        // 使用 gainPlayerCard 方法，自动处理展示和转移
        if (more.countCards('h') > 0) {
            player.line([less, more]);
            less.gainPlayerCard(more, true, 'h', 'visibleMove');
        } else {
            event.finish();
        }
        
        "step 1";
        
        var minorTargets = targets.filter(target => target.isMinor && target.isMinor());
        
        if (minorTargets.length > 0) {
            player.chooseBool('是否令' + get.translation(minorTargets) + '摸一张牌？')
                .set('choice', true);
        } else {
            event.finish();
        }
        
        "step 2";
        if (result.bool) {
            var minorTargets = targets.filter(target => target.isMinor && target.isMinor());
            game.asyncDraw(minorTargets);
        }
    },
    ai: {
        order: 8,
        result: {
            target: function(player, target) {
                var selected = ui.selected.targets;
                if (selected.length == 0) {
                    // 第一个目标：优先选手牌多的敌人
                    if (get.attitude(player, target) < 0) {
                        return -1;
                    }
                    return 0;
                }
                
                // 第二个目标：手牌少的获得牌
                if (target.countCards('h') < selected[0].countCards('h')) {
                    return get.attitude(player, target);
                }
                return -get.attitude(player, target) * 0.5;
            },
        },
    },
},


gz_zhuiyi: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        player: 'dying',
    },
    filter: function(event, player) {
        return game.hasPlayer(target => target != event.source && target != player);
    },
    check: function(event, player) {
        return player.hp <= 0;
    },
    content: function() {
        "step 0";
        player.chooseTarget(
            '追忆：选择一名角色' + (trigger.source ? '（' + get.translation(trigger.source) + '除外）' : ''),
            function(card, player, target) {
                var source = _status.event.getTrigger().source;
                return !source || target != source;
            },
            true
        ).set('ai', function(target) {
            return get.attitude(_status.event.player, target);
        });
        
        "step 1";
        if (!result.bool || !result.targets) {
            event.finish();
            return;
        }
        
        event.target = result.targets[0];
        
        // 移除此武将牌
        var skills1 = player.name1 ? lib.character[player.name1][3] : [];
        var skills2 = player.name2 ? lib.character[player.name2][3] : [];
        
        if (skills1.includes('gz_zhuiyi')) {
            player.removeCharacter(0);
        } else if (skills2.includes('gz_zhuiyi')) {
            player.removeCharacter(1);
        }
        
        event.target.draw(2);
        event.target.recover();
        
        "step 2";
        // 判断势力和珠联璧合条件
        if (player.isUnseen() || event.target.isUnseen() || player.group != event.target.group) {
            event.finish();
            return;
        }
        
        if (!event.target.name1 || event.target.isUnseen(0)) {
            event.finish();
            return;
        }
        
        // 获取可配对的珠联璧合武将
        var mainName = event.target.name1;
        var pairList = [];
        
        if (lib.characterPack.mode_guozhan) {
            for (var name in lib.characterPack.mode_guozhan) {
                if (lib.filter.characterDisabled(name)) continue;
                
                // ✅ 关键修改：过滤掉有追忆技能的武将（步练师）
                var characterSkills = lib.character[name] && lib.character[name][3];
                if (characterSkills && characterSkills.includes('gz_zhuiyi')) {
                    continue;  // 跳过步练师，避免无限循环
                }
                
                var isPair = false;
                if (get.is.jun(name) || get.is.jun(mainName)) {
                    isPair = lib.character[name] && lib.character[mainName] && 
                             lib.character[name][1] == lib.character[mainName][1];
                } else {
                    var tempPlayer = {name1: name, name2: mainName};
                    isPair = lib.element.player.perfectPair?.call(tempPlayer) || false;
                }
                
                if (isPair) pairList.push(name);
            }
        }
        
        if (pairList.length == 0) {
            event.finish();
            return;
        }
        
        event.target.chooseButton([
            '追忆：是否更换副将为【珠联璧合】武将牌？',
            [pairList, 'character']
        ]).set('ai', () => 1);
        
        "step 3";
        if (result.bool && result.links) {
            event.target.reinit(event.target.name2, result.links[0], true);
			event.target.addMark('zhulianbihe_mark', 1, false);
        }
    },
},

gz_suoli: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: { player: ["showCharacterAfter", "phaseUseBegin"] },
    forced: true,
    locked: true,
    charlotte: true,
    group: ["gz_suoli_distance", "gz_suoli_viewas", "gz_suoli_remove", "gz_suoli_gain", "gz_suoli_changegroup"],
    intro: { content: "你与其他角色的距离+X（X为场上已确定势力数）。可将装备牌当【远交近攻】等锦囊使用。" },
    filter: function(event, player) {
        if (event.name == 'showCharacter') {
            // 亮明中立者武将时触发
            return event.toShow && lib.character[event.toShow][1] == 'zhongli';
        }
        return true;
    },
    content: function() {
        // 如果是亮将触发，则获得技能
        if (trigger.name == 'showCharacter') {
            game.log(player, '亮明中立者武将，获得技能', '#g【索立】');
        }
    },
    subSkill: {
        // 亮明中立者后获得技能
        gain: {
            trigger: { player: "showCharacterAfter" },
            forced: true,
            popup: false,
            charlotte: true,
            filter: function(event, player) {
                // 亮明中立者武将时获得技能
                return event.toShow && lib.character[event.toShow][1] == 'zhongli' && !player.hasSkill('gz_suoli');
            },
            content: function() {
                player.addSkill('gz_suoli');
                game.log(player, '亮明中立者武将，获得技能', '#g【索立】');
            }
        },
        // 亮明另一势力后确定势力
        changegroup: {
            trigger: { player: "showCharacterAfter" },
            forced: true,
            popup: false,
            charlotte: true,
            filter: function(event, player) {
                // 必须是中立者身份
                if (player.identity != 'zhongli') return false;
                // 亮明的武将不是中立势力
                if (!event.toShow || lib.character[event.toShow][1] == 'zhongli') return false;
                // 另一张武将牌已经亮明且是中立势力
                var otherNum = event.num == 0 ? 1 : 0;
                var otherName = otherNum == 0 ? player.name1 : player.name2;
                return !player.isUnseen(otherNum) && lib.character[otherName][1] == 'zhongli';
            },
            content: function() {
                'step 0'
                var newGroup = lib.character[trigger.toShow][1];
                
                // 如果是双势力，需要选择
                if (get.is.double(trigger.toShow, true)) {
                    var choices = get.is.double(trigger.toShow, true);
                    player.chooseControl(choices).set('prompt', '请选择你的势力').set('ai', function() {
                        return choices[0];
                    });
                } else {
                    event.newGroup = newGroup;
                    event.goto(2);
                }
                'step 1'
                if (result && result.control) {
                    event.newGroup = result.control;
                }
                'step 2'
                if (event.newGroup) {
                    player.identity = event.newGroup;
                    player.trueIdentity = event.newGroup;
                    game.broadcastAll(function(p, group) {
                        p.identity = group;
                        p.node.identity.dataset.color = group;
                    }, player, event.newGroup);
                    
                    // 失去【索立】技能
                    if (player.hasSkill('gz_suoli')) {
                        player.removeSkill('gz_suoli');
                        game.log(player, '确定势力为', '#y' + get.translation(event.newGroup), '，失去技能', '#g【索立】');
                    }
                }
            }
        },
        // 距离增加效果
        distance: {
            mod: {
                globalFrom: function(from, to) {
                    var count = 0;
                    game.countPlayer(function(current) {
                        if (current.identity != 'unknown' && current.identity != 'zhongli') {
                            count++;
                        }
                    });
                    return count;
                },
                globalTo: function(from, to) {
                    if (to.identity == 'zhongli' && to.hasSkill('gz_suoli')) {
                        var count = 0;
                        game.countPlayer(function(current) {
                            if (current.identity != 'unknown' && current.identity != 'zhongli') {
                                count++;
                            }
                        });
                        return count;
                    }
                }
            }
        },
        // 视为锦囊效果
        viewas: {
            enable: "phaseUse",
            usable: 1,
            filterCard: function(card) {
                return get.type(card) == 'equip';
            },
            position: "hes",
            viewAs: function(cards, player) {
                return { name: "yuanjiao" };
            },
            prompt: "将一张装备牌当作【远交近攻】、【联军盛宴】或【戮力同心】使用",
            check: function(card) {
                return 6 - get.value(card);
            },
            ai: {
                order: 9,
                result: {
                    player: 1
                }
            }
        },
        // 确定势力后失去技能
        remove: {
            trigger: { player: "showCharacterAfter" },
            forced: true,
            popup: false,
            filter: function(event, player) {
                return !player.isUnseen(2) && player.identity != 'zhongli';
            },
            content: function() {
                player.removeSkill('gz_suoli');
                game.log(player, '已确定势力，失去技能', '#g【索立】');
            }
        }
    }
},

	 gz_zhongli_cooldown: {
        charlotte: true,
        mark: true,
        marktext: "待",
        intro: { content: "需等待一轮或受到伤害后，方可亮明另一张武将牌。" },
        // 受到伤害立即移除冷却
        trigger: { player: "damageEnd" },
        forced: true,
        content: function() { player.removeSkill('gz_zhongli_cooldown'); }
    },
gz_zhongli_damage_unlock: {
    trigger: { player: 'damageEnd' },
    forced: true,
    popup: false,
    charlotte: true,
    filter: function(event, player) {
        return player.hasSkill('gz_zhongli_cooldown');
    },
    content: function() {
        player.removeSkill('gz_zhongli_cooldown');
        game.log(player, '受到伤害，可以亮明另一张武将牌了');
    }
},
// ========== 徐庶 ==========

gz_jiange: {
    audio: "ext:鹰击长空/audio/skill:2",
    enable: ["chooseToUse", "chooseToRespond"],
    filter: function(event, player) {
        // 检查是否已经使用过对应的转化
        if (event.type == 'phase') {
            // 出牌阶段，检查是否使用过锦囊转杀或装备转决斗
            if (!player.storage.gz_jiange_trick && player.countCards('h', {type: 'trick'})) return true;
            if (!player.storage.gz_jiange_equip && player.countCards('h', {type: 'equip'})) return true;
        } else {
            // 响应阶段
            if (event.filterCard({name: 'sha'}, player, event) && !player.storage.gz_jiange_trick && player.countCards('h', {type: 'trick'})) return true;
            if (event.filterCard({name: 'juedou'}, player, event) && !player.storage.gz_jiange_equip && player.countCards('h', {type: 'equip'})) return true;
        }
        return false;
    },
    chooseButton: {
        dialog: function(event, player) {
            var list = [];
            if (!player.storage.gz_jiange_trick && player.countCards('h', {type: 'trick'})) {
                list.push(['基本', '', 'sha']);
            }
            if (!player.storage.gz_jiange_equip && player.countCards('h', {type: 'equip'})) {
                list.push(['基本', '', 'juedou']);
            }
            return ui.create.dialog('剑歌', [list, 'vcard']);
        },
        filter: function(button, player) {
            return _status.event.getParent().filterCard({name: button.link[2]}, player, _status.event.getParent());
        },
        check: function(button) {
            var player = _status.event.player;
            if (button.link[2] == 'sha') {
                return player.countCards('h', {type: 'trick'}) > 0 ? 1 : 0;
            }
            if (button.link[2] == 'juedou') {
                return player.countCards('h', {type: 'equip'}) > 0 ? 1 : 0;
            }
            return 0;
        },
        backup: function(links, player) {
            return {
                filterCard: function(card, player) {
                    var type = get.type(card);
                    if (links[0][2] == 'sha') return type == 'trick';
                    if (links[0][2] == 'juedou') return type == 'equip';
                    return false;
                },
                selectCard: 1,
                popname: true,
                viewAs: {name: links[0][2]},
                position: 'h',
                ai1: function(card) {
                    return 6 - get.value(card);
                },
                precontent: function() {
                    var type = get.type(event.result.cards[0]);
                    if (type == 'trick') {
                        player.storage.gz_jiange_trick = true;
                    } else if (type == 'equip') {
                        player.storage.gz_jiange_equip = true;
                    }
                    player.draw();
                    player.logSkill('gz_jiange');
                }
            }
        },
        prompt: function(links, player) {
            if (links[0][2] == 'sha') {
                return '将一张锦囊牌当做【杀】使用或打出';
            }
            if (links[0][2] == 'juedou') {
                return '将一张装备牌当做【决斗】使用或打出';
            }
        }
    },
    mod: {
        targetInRange: function(card) {
            if (card.skill == 'gz_jiange_backup') return true;
        }
    },
    group: ["gz_jiange_damage", "gz_jiange_clear"],
    subSkill: {
        damage: {
            audio: "gz_jiange",
            trigger: {global: "damageEnd"},
            filter: function(event, player) {
                if (player.storage.gz_jiange_damage) return false;
                var target = event.player;
                if (!target) return false;  // 修改：移除了对自己的排除
                if (get.distance(player, target) > 1) return false;
                if (!event.source || event.source == player) return false;
                // 检查是否有可用的伤害牌
                return player.hasCard(function(card) {
                    var name = get.name(card);
                    return (name == 'sha' || name == 'juedou') && player.canUse(card, event.source);
                }, 'h');
            },
            direct: true,
            content: function() {
                "step 0"
                var source = trigger.source;
                var target = trigger.player;
                var prompt = '剑歌：' + get.translation(target) + '受到伤害，是否对' + get.translation(source) + '使用一张伤害牌？';
                player.chooseCard('h', prompt, function(card) {
                    var name = get.name(card);
                    return (name == 'sha' || name == 'juedou') && player.canUse(card, source);
                }).set('ai', function(card) {
                    var player = _status.event.player;
                    var source = _status.event.source;
                    return get.effect(source, card, player, player);
                }).set('source', source);
                "step 1"
                if (result.bool) {
                    player.logSkill('gz_jiange_damage', trigger.source);
                    player.useCard(result.cards[0], trigger.source);
                    player.storage.gz_jiange_damage = true;
                }
            }
        },
        clear: {
            trigger: {player: "phaseEnd"},
            silent: true,
            content: function() {
                delete player.storage.gz_jiange_trick;
                delete player.storage.gz_jiange_equip;
                delete player.storage.gz_jiange_damage;
            }
        }
    },
    ai: {
        order: function() {
            return get.order({name: 'sha'}) + 0.1;
        },
        respondSha: true,
        skillTagFilter: function(player) {
            if (!player.countCards('h', {type: 'trick'}) || player.storage.gz_jiange_trick) return false;
        },
        result: {
            player: 1
        }
    }
},

gz_yinyu: {
	audio: "ext:鹰击长空/audio/skill:2",
	trigger: {player: "showCharacterAfter"},
	forced: true,
	   skillAnimation: true,
    animationColor: "fire",
filter: function(event, player) {
    // 只要主将或副将其中一个是界徐庶，且当前不是该武将自身发动的（防止逻辑重叠）
    // 或者简单理解：如果主将是它，或者副将是它，则返回 true
    return player.name == 'gz_re_xushu' || player.name2 == 'gz_re_xushu';
},
	content: function() {
		"step 0"
		   player.awakenSkill("gz_yinyu");
		player.draw(player.maxHp);
		player.removeSkill("gzjujian");
				player.addSkill("gz_jujian_main");
		"step 1"
		// 移除此武将牌
		        if (lib.character[player.name1][3].includes("gz_yinyu")) {
            player.removeCharacter(0);
        }
        if (lib.character[player.name2][3].includes("gz_yinyu")) {
            player.removeCharacter(1);
        }
		"step 2"
		// 检查徐庶（蜀）是否为副将
		if (player.name2 == 'gz_re_xushu' ) {
			// 将副将变为主将
             
              player.showCharacter(2);
                game.broadcastAll(
                    (player, name1, name2) => {
                        player.name = name2;
                        player.sex = get.character(name2).sex;

                        player.smoothAvatar(false);
                        player.name1 = name2;
                        player.skin.name = name2;
                        player.node.avatar.setBackground(name2, "character");
                        player.node.name.innerHTML = get.slimName(name2);

                        player.smoothAvatar(true);
                        player.name2 = name1;
                        player.skin.name2 = name1;
                        player.node.avatar2.setBackground(name1, "character");
                        player.node.name2.innerHTML = get.slimName(name1);
                    },
                    player,
                    player.name1,
                    player.name2
                );
                player.update();
                player.getSkills(null, false, false).forEach(skill => {
                    const info = get.info(skill);
                    if (info?.viceSkill && player.checkViceSkill(skill)) {
                        player.restoreSkill(skill);
                    }
                    if (info?.mainSkill && player.checkMainSkill(skill)) {
                        player.restoreSkill(skill);
                    }
                });
                game.log(player, "交换了主副将");
            
	}


			
		
	},
	group: ["gz_yinyu_group"],
	subSkill: {
		group: {
			forced:true,
			trigger: {
			player: "showCharacterAfter",

			},
			forced: true,
			filter: function(event, player) {
				return player.group == 'qun' || player.group == 'shu';
			},
			content: function() {
				if (player.group == 'qun') {
					player.addSkill('gz_zhue');
				} else if (player.group == 'shu') {
					player.addSkill('gz_fuzhu');
				}
			}
		}
	}
},

gz_zhue: {
	inherit: "gz_yinyu",
	audio: "ext:鹰击长空/audio/skill:2",
	trigger: {global: "useCard"},
	 groupSkill: "qun",
	filter: function(event, player) {
		if (player.storage.gz_zhue_used) return false;
		if (!event.player || event.player == player) return false;
		if (event.player.group != player.group) return false;
		return get.type(event.card) != 'equip';
	},
	direct: true,
	content: function() {
		"step 0"
		player.chooseBool('诛恶：是否令' + get.translation(trigger.player) + '摸一张牌且此牌不能被响应？').set('ai', function() {
			return get.attitude(player, trigger.player) > 0;
		});
		"step 1"
		if (result.bool) {
			player.logSkill('gz_zhue', trigger.player);
			trigger.player.draw();
			trigger.directHit.addArray(game.players);
			player.storage.gz_zhue_used = true;
		}
	},
	group: ["gz_zhue_clear"],
	subSkill: {
		clear: {
			trigger: {global: "roundStart"},
			silent: true,
			content: function() {
				delete player.storage.gz_zhue_used;
			}
		}
	}
},

gz_fuzhu: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: { global: "useCardAfter" },
    filter: function(event, player) {
        // 牌堆太少不发动
        if (ui.cardPile.childNodes.length < 3) return false;
         if (event.player.group != player.group) return false;
        // 必须是牌
        if (!event.card || !event.card.isCard) return false;

        // 初始化标记对象（如果不存在）
        if (typeof player.storage.gz_fuzhu_count !== 'object') {
            player.storage.gz_fuzhu_count = { converted: false, normal: false };
        }

        // 判断卡牌类型
        var isConverted = get.is.converted(event.card);
        
        // 检查对应类型的次数限制
        if (isConverted) {
            return !player.storage.gz_fuzhu_count.converted;
        } else {
            return !player.storage.gz_fuzhu_count.normal;
        }
    },
    direct: true,
    content: function() {
        "step 0"
        // 记录此次触发的类型
        event.isConverted = get.is.converted(trigger.card);
        
        // 生成提示文本
        var promptStr = '辅主：是否发动？(当前为' + (event.isConverted ? '转化牌' : '非转化牌') + ')';
        // 自动判定去向提示
        var destStr = event.isConverted ? '。将牌置于牌堆底，以此展示牌堆顶' : '。将牌置于牌堆顶，以此展示牌堆底';
        
        player.chooseBool(promptStr + destStr).set('ai', () => true);
        
        "step 1"
        if (!result.bool) {
            event.finish();
            return;
        }
        
        // 记录次数
        if (!player.storage.gz_fuzhu_count) player.storage.gz_fuzhu_count = {};
        if (event.isConverted) {
            player.storage.gz_fuzhu_count.converted = true;
        } else {
            player.storage.gz_fuzhu_count.normal = true;
        }

        player.logSkill('gz_fuzhu');
        
        // 选牌阶段
        player.chooseCard('h', '请选择一张牌' + (event.isConverted ? '置于牌堆底' : '置于牌堆顶'), true)
            .set('ai', (card) => 5 - get.value(card));
        
        "step 2"
        if (result.bool && result.cards.length) {
            event.chosenCard = result.cards[0];
            
            //此处根据转化状态自动决定：非转化(false) -> 放顶(true)；转化(true) -> 放底(false)
            //你可以根据需要反转这个逻辑
            event.isTop = !event.isConverted; 
            
            if (event.isTop) {
                player.lose(event.chosenCard, ui.cardPile, 'insert'); // 自动进入堆顶
            } else {
                player.lose(event.chosenCard, ui.cardPile); // 默认进入堆底
            }
        } else {
            // 选了发动技能但按了取消选牌（虽然forced为true通常不可取消，但防万一）
            // 或者无牌可给时
             event.finish();
        }
        
        "step 3"
        // 获取展示牌
        var cards;
        // 逻辑：如果放进了顶(isTop=true)，则看底；如果放进了底(isTop=false)，则看顶
        if (event.isTop) {
            // 放顶看底
            cards = Array.from(ui.cardPile.childNodes).slice(0, 3); // 拿最下面3张
        } else {
            // 放底看顶
            cards = Array.from(ui.cardPile.childNodes).slice(-3); // 拿最上面3张
        }
        
        event.previewCards = cards;
        
        // 检查非空
        if (!cards.length) {
            event.finish(); 
            return;
        }

        player.showCards(cards, '辅主');
        
        "step 4"
        var types = [];
        for (var card of event.previewCards) {
            var type = get.type(card);
            if (!types.contains(type)) types.push(type);
        }
        
        if (types.length) {
             player.chooseControl(types).set('prompt', '选择获得一种类别的牌');
        } else {
            event.finish();
        }
       
        "step 5"
        var targetType = result.control;
        var toGain = [], toBack = [];
        for (var card of event.previewCards) {
            if (get.type(card) == targetType) toGain.push(card);
            else toBack.push(card);
        }
        
        if (toGain.length) player.gain(toGain, 'gain2');
        
        // 将剩余牌放回原位（刚才看的是哪边，就放回哪边）
        if (toBack.length) {
            var promptBack = event.isTop ? '请将剩余牌放回牌堆底' : '请将剩余牌放回牌堆顶';
            
            // 这里的moveDestination很重要，决定了chooseToMove结束后牌去哪
            // 如果本来是看底(isTop=true)，剩下的牌应该回底
            // 如果本来是看顶(isTop=false)，剩下的牌应该回顶
            
            // chooseToMove 并没有直接支持 'bottom' 参数控制去向，它通常用于处理复杂的“场上/手牌”移动。
            // 简单的处理方式是：让玩家排顺序，然后我们手动插回去。
            player.chooseToMove(promptBack, true)
                .set('list', [['剩余牌', toBack]])
                .set('filterMove', function(from, to){
                    // 禁止拖动到其他区域，虽然UI限制住了
                    return false;
                })
                .set('processAI', function(list) {
                    return [list[0][1]]; // AI不做操作直接确认
                });
        }
        
        "step 6"
        if (result.bool && result.moved && result.moved[0] && result.moved[0].length) {
            var cardsBack = result.moved[0];
            // 手动归位，更稳定
            // 如果是看底(isTop=true)，剩下的牌放回底。
            // 如果是看顶(isTop=false)，剩下的牌放回顶。
            
            if (event.isTop) {
                 // 放回底
                 for(var i=0; i<cardsBack.length; i++){
                     ui.cardPile.prepend(cardsBack[i]); // prepend 是插到最底端（HTML结构上firstChild通常是底）
                     // 注意无名杀的 ui.cardPile 结构：firstChild 是最底下的牌，lastChild 是最顶上的牌
                 }
            } else {
                 // 放回顶
                 for(var i=0; i<cardsBack.length; i++){
                     ui.cardPile.appendChild(cardsBack[i]);
                 }
            }
            // 此时调用一次更新，确保游戏逻辑感知到DOM变化（通常gain/lose会自动处理，但直接操作DOM偶尔需要）
            game.updateRoundCard();
        }
    },
    // 清除时机：回合开始时清除计数
    group: ["gz_fuzhu_clear"],
    subSkill: {
        clear: {
            trigger: { global: "roundStart" },
            silent: true,
            content: function() {
                player.storage.gz_fuzhu_count = { converted: false, normal: false };
            }
        }
    }
},
gz_jujian_main:{
    audio: "gzjiancai",
		   skillAnimation: true,
    animationColor: "golden",
    trigger: {
        global: "dying",
    },
    filter(event, player) {
        return event.player.isFriendOf(player);
    },
    forced: true,
    logTarget: "player",
    content() {
		player.awakenSkill("gz_jujian_main");
        trigger.player.recover(1 - trigger.player.hp);
        player.changeVice();
    },
    "_priority": 0,
},

// ========== 许劭 ==========
gz_yingmen: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        global: "gameStart",
        player: ["phaseBegin", "damageEnd"]
    },
    forced: true,
    filter: function(event, player, name) {
        if (name == "gameStart") return true;
        return player.getStorage("gz_yingmen").length < player.maxHp;
    },
    content: function() {
        "step 0"
        var num = player.maxHp - player.getStorage("gz_yingmen").length;
        if (num <= 0) {
            event.finish();
            return;
        }
        
        "step 1"
        if (!_status.characterlist) {
            game.initCharacterList();
        }
        var list = [];
        var groups = [];
        
        // 获取已有访客的势力
        for (var i = 0; i < player.getStorage("gz_yingmen").length; i++) {
            var group = get.character(player.getStorage("gz_yingmen")[i])[1];
            if (!groups.includes(group)) {
                groups.push(group);
            }
        }
        
        // 筛选可用角色
        for (var i = 0; i < _status.characterlist.length; i++) {
            var name = _status.characterlist[i];
            var character = get.character(name);
            if (!character) continue;
            var group = character[1];
            if (!groups.includes(group) && !player.getStorage("gz_yingmen").includes(name)) {
                list.push(name);
            }
        }
        
        if (list.length == 0) {
            event.finish();
            return;
        }
        
        var num = Math.min(player.maxHp - player.getStorage("gz_yingmen").length, list.length);
        var selected = [];
        for (var i = 0; i < num; i++) {
            var name = list.randomRemove();
            selected.push(name);
            _status.characterlist.remove(name);
            var group = get.character(name)[1];
            if (!groups.includes(group)) {
                groups.push(group);
            }
        }
        
        lib.skill.gz_yingmen.addVisitors(selected, player);
        game.log(player, '获得了', '#g' + num + '张', '“访客”');
    },
    
    getSkills: function(characters, player) {
        var skills = [];
        for (var name of characters) {
            var character = get.character(name);
            if (!character || !character[3]) continue;
            
            for (var skill of character[3]) {
                var list = get.skillCategoriesOf(skill, player);
                list.remove("锁定技");
                if (list.length > 0) continue;
                
                var info = get.info(skill);
                if (info && (!info.unique || info.gainable) && !info.zhuSkill && !info.charlotte && !info.limited && !info.juexingji && !info.dutySkill) {
                    skills.add(skill);
                }
            }
        }
        return skills;
    },
    
    addVisitors: function(characters, player) {
        player.addSkillBlocker("gz_yingmen");
        game.broadcastAll(function(player, characters) {
            player.tempname = player.tempname || [];
            player.tempname.addArray(characters);
            player.$draw(characters.map(function(name) {
                var cardname = "huashen_card_" + name;
                lib.card[cardname] = {
                    fullimage: true,
                    image: "character:" + name
                };
                lib.translate[cardname] = get.rawName2(name);
                return game.createCard(cardname, " ", " ");
            }), "nobroadcast");
        }, player, characters);
        
        player.markAuto("gz_yingmen", characters);
        var skills = lib.skill.gz_yingmen.getSkills(player.getStorage("gz_yingmen"), player);
        player.addInvisibleSkill(skills);
    },
    
    removeVisitors: function(characters, player) {
        var skills = lib.skill.gz_yingmen.getSkills(characters, player);
        var characters2 = player.getStorage("gz_yingmen").slice(0);
        characters2.removeArray(characters);
        skills.removeArray(lib.skill.gz_yingmen.getSkills(characters2, player));
        
        game.broadcastAll((player, characters) => {
            if (player.tempname) player.tempname.removeArray(characters);
        }, player, characters);
        
        player.unmarkAuto("gz_yingmen", characters);
        _status.characterlist.addArray(characters);
        player.removeInvisibleSkill(skills);
    },
    
    onremove: function(player, skill) {
        lib.skill.gz_yingmen.removeVisitors(player.getStorage("gz_yingmen"), player);
        player.removeSkillBlocker("gz_yingmen");
    },
    
    skillBlocker: function(skill, player) {
        if (!player.invisibleSkills.includes(skill) || skill == "gz_pingjian") {
            return false;
        }
        return !player.hasSkill("gz_pingjian");
    },
    
    marktext: "客",
    intro: {
        name: "访客",
        mark: function(dialog, storage, player) {
            if (!storage || !storage.length) {
                return "当前没有“访客”";
            }
            dialog.addSmall([storage, "character"]);
            var skills = lib.skill.gz_yingmen.getSkills(storage, player);
            if (skills.length) {
                dialog.addText("<li>当前可用技能：" + get.translation(skills), false);
            }
        }
    }
},

gz_pingjian: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        player: ["useSkill", "logSkillBegin"]
    },
    forced: true,
    locked: false,
    filter: function(event, player) {
        // 检查是否已经使用过评鉴
        if (player.hasSkill('gz_pingjian_used')) return false;
        
        var skill = get.sourceSkillFor(event);
        return player.invisibleSkills.includes(skill) && 
               lib.skill.gz_yingmen.getSkills(player.getStorage("gz_yingmen"), player).includes(skill);
    },
    content: function() {
        "step 0"
        var visitors = player.getStorage("gz_yingmen").slice(0);
        var drawers = visitors.filter(function(name) {
            var character = get.character(name);
            return character && character[3] && character[3].includes(get.sourceSkillFor(trigger));
        });
        event.drawers = drawers;
        
        if (visitors.length == 1) {
            event._result = {bool: true, links: visitors};
        } else {
            var dialog = ["评鉴：请选择移去一张“访客”"];
            if (drawers.length) {
                dialog.push('<div class="text center">如果移去' + get.translation(drawers) + "，则你摸一张牌</div>");
            }
            dialog.push([visitors, "character"]);
            player.chooseButton(dialog, true);
        }
        
        "step 1"
        if (result.bool) {
            // 添加每回合限一次的标记
            player.addTempSkill("gz_pingjian_used", "phaseEnd");
            
            lib.skill.gz_yingmen.removeVisitors(result.links, player);
            game.log(player, "移去了", "#y" + get.translation(result.links[0]));
            if (event.drawers.includes(result.links[0])) {
                player.addTempSkill("gz_pingjian_draw");
                if (!player.storage.gz_pingjian_draw) player.storage.gz_pingjian_draw = [];
                player.storage.gz_pingjian_draw.push(trigger.skill);
            }
        }
    },
    
    group: "gz_pingjian_trigger",
    subSkill: {
        used: {
            charlotte: true,
            mark: true,
            intro: {
                content: '本回合已发动过评鉴'
            }
        },
        
        draw: {
            charlotte: true,
            init: function(player, skill) {
                if (!player.storage[skill]) {
                    player.storage[skill] = [];
                }
            },
            onremove: true,
            trigger: {
                player: ["useSkillAfter", "logSkill"]
            },
            forced: true,
            popup: false,
            filter: function(event, player) {
                return player.getStorage("gz_pingjian_draw").includes(event.skill);
            },
            content: function() {
                player.storage.gz_pingjian_draw.remove(trigger.skill);
                player.draw();
                if (!player.storage.gz_pingjian_draw.length) {
                    player.removeSkill("gz_pingjian_draw");
                }
            }
        },
        
        trigger: {
            trigger: {
                player: "triggerInvisible"
            },
            forced: true,
            forceDie: true,
            popup: false,
            charlotte: true,
            priority: 10,
            filter: function(event, player) {
                if (event.revealed) return false;
                // 检查是否已经使用过评鉴
                if (player.hasSkill('gz_pingjian_used')) return false;
                
                var info = get.info(event.skill);
                if (info.charlotte) return false;
                var skills = lib.skill.gz_yingmen.getSkills(player.getStorage("gz_yingmen"), player);
                game.expandSkills(skills);
                return skills.includes(event.skill);
            },
            content: function() {
                "step 0"
                if (get.info(trigger.skill).silent) {
                    event.finish();
                } else {
                    var info = get.info(trigger.skill);
                    var event = trigger, trigger = event._trigger;
                    var str;
                    
                    if (info.prompt) {
                        str = info.prompt;
                    } else {
                        if (typeof info.logTarget == "string") {
                            str = get.prompt(event.skill, trigger[info.logTarget], player);
                        } else if (typeof info.logTarget == "function") {
                            var logTarget = info.logTarget(trigger, player, trigger.triggername, trigger.indexedData);
                            if (get.itemtype(logTarget)?.indexOf("player") == 0) {
                                str = get.prompt(event.skill, logTarget, player);
                            }
                        } else {
                            str = get.prompt(event.skill, null, player);
                        }
                    }
                    
                    if (typeof str == "function") {
                        str = str(trigger, player, trigger.triggername, trigger.indexedData);
                    }
                    
                    var next = player.chooseBool("评鉴：" + str);
                    next.set("yes", !info.check || info.check(trigger, player, trigger.triggername, trigger.indexedData));
                    next.set("hsskill", event.skill);
                    next.set("forceDie", true);
                    next.set("ai", function() {
                        return _status.event.yes;
                    });
                    
                    if (typeof info.prompt2 == "function") {
                        next.set("prompt2", info.prompt2(trigger, player, trigger.triggername, trigger.indexedData));
                    } else if (typeof info.prompt2 == "string") {
                        next.set("prompt2", info.prompt2);
                    } else if (info.prompt2 != false) {
                        if (lib.dynamicTranslate[event.skill]) {
                            next.set("prompt2", lib.dynamicTranslate[event.skill](player, event.skill));
                        } else if (lib.translate[event.skill + "_info"]) {
                            next.set("prompt2", lib.translate[event.skill + "_info"]);
                        }
                    }
                    
                    if (trigger.skillwarn) {
                        if (next.prompt2) {
                            next.set("prompt2", '<span class="thundertext">' + trigger.skillwarn + "。</span>" + next.prompt2);
                        } else {
                            next.set("prompt2", trigger.skillwarn);
                        }
                    }
                }
                
                "step 1"
                if (result.bool) {
                    // 添加每回合限一次的标记
                    player.addTempSkill("gz_pingjian_used", "phaseEnd");
                    
                    if (!get.info(trigger.skill).cost) {
                        trigger.revealed = true;
                    }
                } else {
                    trigger.untrigger();
                    trigger.cancelled = true;
                }
            }
        }
    },
    
    ai: {
        combo: "gz_yingmen"
    }
},

// ========== 鲁肃 ==========
gz_xiangkui: {
	audio: "ext:鹰击长空/audio/skill:2",
	enable: "phaseUse",
	usable: 1,
	filterTarget: function(card, player, target) {
		return target != player && target.isIn() && target.isPhaseUsing();
	},
	content: function() {
		"step 0"
		target.chooseControl('基本牌', '锦囊牌', '装备牌', 'cancel2').set('prompt', '飨馈：请选择一种牌的类型').set('ai', function() {
			var player = _status.event.player;
			var source = _status.event.source;
			if (get.attitude(player, source) > 0) {
				if (player.hp <= 2) return '基本牌';
				return '锦囊牌';
			}
			return 'cancel2';
		}).set('source', player);
		"step 1"
		if (result.control && result.control != 'cancel2') {
			event.type = result.control;
			var typeMap = {
				'基本牌': 'basic',
				'锦囊牌': 'trick',
				'装备牌': 'equip'
			};
			event.selectedType = typeMap[event.type];
			player.chooseCard('h', [1, Infinity], '飨馈：请选择要交给' + get.translation(target) + '的牌').set('ai', function(card) {
				if (get.attitude(player, target) > 0) {
					return 6 - get.value(card);
				}
				return 0;
			});
		} else {
			event.finish();
		}
		"step 2"
		if (result.bool && result.cards.length > 0) {
			player.showCards(result.cards);
			player.give(result.cards, target, true);
			event.cards = result.cards;
			// 统计类别数
			var types = [];
			for (var i = 0; i < result.cards.length; i++) {
				var type = get.type(result.cards[i]);
				if (!types.includes(type)) {
					types.push(type);
				}
			}
			player.draw(types.length);
			// 检查是否包含指定类型
			var hasType = false;
			for (var i = 0; i < result.cards.length; i++) {
				if (get.type(result.cards[i]) == event.selectedType) {
					hasType = true;
					break;
				}
			}
			if (hasType) {
				// 从牌堆顶获得一张不同类别的牌
				var cards = get.cards(10);
				var card = null;
				for (var i = 0; i < cards.length; i++) {
					if (get.type(cards[i]) != event.selectedType) {
						card = cards[i];
						cards.splice(i, 1);
						break;
					}
				}
				if (card) {
					player.gain(card, 'gain2');
				}
				// 将其余的牌放回牌堆
				for (var i = cards.length - 1; i >= 0; i--) {
					ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
				}
			}
		}
	},
	ai: {
		order: 8,
		result: {
			target: function(player, target) {
				if (get.attitude(player, target) > 0) return 1;
				return 0;
			}
		}
	}
},
gz_yangming: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {global: "phaseEnd"},
    filter: function(event, player) {
        // 确保数据初始化
        if (!player.storage.gz_yangming_types) {
            player.storage.gz_yangming_types = [];
        }
        return player.storage.gz_yangming_types.length > 0;
    },
    direct: true,
    content: function() {
        "step 0"
        // 添加安全检查
        if (!player.storage.gz_yangming_types) {
            player.storage.gz_yangming_types = [];
        }
        
        var num = player.storage.gz_yangming_types.length;
        
        // 改进势力统计逻辑
        var groups = [];
        for (var i = 0; i < game.players.length; i++) {
            var currentPlayer = game.players[i];
            if (currentPlayer != player && 
                currentPlayer.group && 
                currentPlayer.group !== '' && 
                !groups.includes(currentPlayer.group)) {
                groups.push(currentPlayer.group);
            }
        }
        
        event.num = num;
        event.needShow = num >= groups.length;
        
        player.chooseBool(
            get.prompt('gz_yangming') + 
            '：是否摸' + num + '张牌？' + 
            (event.needShow ? '（需展示所有手牌并分配）' : '')
        ).set('ai', function() {
            return true;
        });
        
        "step 1"
        if (!result.bool) {
            // 确保清理数据
            delete player.storage.gz_yangming_types;
            event.finish();
            return;
        }
        
        player.logSkill('gz_yangming');
        player.draw(event.num);
        
        "step 2"
        if (event.needShow) {
            player.showHandcards();
        } else {
            // 即使不需要展示，也要清理数据
            delete player.storage.gz_yangming_types;
            event.finish();
            return;
        }
        
        "step 3"
        if (player.countCards('h') < event.num) {
            // 清理数据后结束
            delete player.storage.gz_yangming_types;
            event.finish();
            return;
        }
        
        player.chooseCardTarget({
            prompt: '请选择' + event.num + '张牌和' + event.num + '名势力不同的其他角色',
            selectCard: event.num,
            selectTarget: event.num,
            filterCard: true,
            filterTarget: function(card, player, target) {
                if (target == player) return false;
                if (!target.group || target.group === '') return false; // 添加势力检查
                
                var selected = ui.selected.targets;
                for (var i = 0; i < selected.length; i++) {
                    if (selected[i].group == target.group) return false;
                }
                return true;
            },
            ai1: function(card) {
                return 6 - get.value(card);
            },
            ai2: function(target) {
                return get.attitude(_status.event.player, target);
            }
        });
        
        "step 4"
        if (result.bool) {
            var cards = result.cards;
            var targets = result.targets;
            player.line(targets);
            for (var i = 0; i < cards.length; i++) {
                player.give([cards[i]], targets[i]);
            }
        }
        
        "step 5"
        // 确保清理数据
        delete player.storage.gz_yangming_types;
    },
    
    group: ["gz_yangming_count"],
    
    subSkill: {
        count: {
            trigger: {player: "useCard"},
            silent: true,
            content: function() {
                // 统一的初始化逻辑
                if (!player.storage.gz_yangming_types) {
                    player.storage.gz_yangming_types = [];
                }
                
                var type = get.type(trigger.card);
                if (type && !player.storage.gz_yangming_types.includes(type)) {
                    player.storage.gz_yangming_types.push(type);
                }
            }
        }
    }
},

// ========== 赵娥 ==========
gz_yanshi: {
	audio: "ext:鹰击长空/audio/skill:2",
	trigger: {player: "damageBegin"},
	forced: true,
	skillAnimation:true,
	animationColor:"purple",
	filter: function(event, player) {
		if (player.group != 'zhongli') return false;
		if (player.storage.gz_yanshi_damaged) return false;
		if (!event.source) return false;
		return event.source.hp >= player.hp;
	},
	content: function() {
		"step 0"
		player.showHandcards();
		"step 1"
		var cards = player.getCards('h');
		var damageCards = [];
		for (var i = 0; i < cards.length; i++) {
			var name = get.name(cards[i]);
			if (name == 'sha' || name == 'juedou' || get.tag(cards[i], 'damage')) {
				damageCards.push(cards[i]);
			}
		}
		if (damageCards.length == 0) {
			event.finish();
			return;
		}
		// 按牌名分组
		var groups = {};
		for (var i = 0; i < damageCards.length; i++) {
			var name = get.name(damageCards[i]);
			if (!groups[name]) groups[name] = [];
			groups[name].push(damageCards[i]);
		}
		var list = Object.keys(groups);
		player.chooseControl(list).set('prompt', '请选择要弃置的伤害牌牌名').set('ai', function() {
			return list[0];
		});
		event.groups = groups;
		"step 2"
		if (result.control) {
			var cards = event.groups[result.control];
			player.discard(cards);
			trigger.cancel();
			player.storage.gz_yanshi_damaged = true;
		}
	},
	mod: {
		cardEnabled: function(card, player) {
			if (player.group == 'zhongli') {
				var name = get.name(card);
				if (name == 'sha' || name == 'juedou' || get.tag(card, 'damage')) {
					return false;
				}
			}
		},
		cardUsable: function(card, player) {
			if (player.group == 'zhongli') {
				var name = get.name(card);
				if (name == 'sha' || name == 'juedou' || get.tag(card, 'damage')) {
					return false;
				}
			}
		},
		ignoredHandcard: function(card, player) {
			if (player.group == 'zhongli') {
				var name = get.name(card);
				if (name == 'sha' || name == 'juedou' || get.tag(card, 'damage')) {
					return true;
				}
			}
		}
	},
	group: ["gz_yanshi_remove", "gz_yanshi_clear"],
	subSkill: {
		remove: {
			trigger: {
				player: "showCharacterAfter"
			},
			forced: true,
			filter: function(event, player) {
				return player.group != 'zhongli';
			},
			content: function() {
				   "step 0";
        player.awakenSkill("gz_yanshi");
        "step 1";

        if (lib.character[player.name1][3].includes("gz_yanshi")) {
            player.removeCharacter(0);
        }
        if (lib.character[player.name2][3].includes("gz_yanshi")) {
            player.removeCharacter(1);
        }
			}
		},
		clear: {
			trigger: {global: "roundStart"},
			silent: true,
			content: function() {
				delete player.storage.gz_yanshi_damaged;
			}
		}
	}
},

gz_xinren: {
    audio: "ext:鹰击长空/audio/skill:2",
    trigger: {
        player: ["dyingAfter", "removeCharacterAfter"]
    },
    forced: true,
    filter: function(event, player, triggername) {
        if (triggername == "dyingAfter") {
            // 首次脱离濒死状态
            return !player.storage.gz_xinren_triggered;
        }
        if (triggername == "removeCharacterAfter") {
            // 移除武将后，检查被移除的武将是否有gz_xinren技能
            if (!event.toRemove) return false;
            var skills = get.character(event.toRemove, 3);
            if (!skills) return false;
            return skills.includes("gz_xinren") && player.isDamaged();
        }
        return false;  // ✅ 其他情况不触发
    },
    content: function() {
        "step 0"
        if (event.triggername == "dyingAfter") {
            player.storage.gz_xinren_triggered = true;
        }
        
        var cards = player.getCards('h');
        if (cards.length == 0) {
            event.finish();
            return;
        }
        
        // 分类卡牌
        var black = [];
        var red = [];
        var others = [];
        
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var name = get.name(card);
            var isDamage = (name == 'sha' || name == 'juedou' || get.tag(card, 'damage'));
            
            if (isDamage) {
                if (get.color(card) == 'black') {
                    black.push(card);
                } else if (get.color(card) == 'red') {
                    red.push(card);
                } else {
                    others.push(card);
                }
            } else {
                others.push(card);
            }
        }
        
        event.blackCards = black;
        event.redCount = red.length;
        event.otherCards = others.concat(red);
        event.died = false;
        event.currentIndex = 0;
        
        game.log(player, '弃置了', cards);
        
        "step 1"
        // 依次使用黑色伤害牌
        if (event.currentIndex < event.blackCards.length) {
            var card = event.blackCards[event.currentIndex];
            event.currentIndex++;
            
            var targets = game.filterPlayer(function(current) {
                return current != player && player.canUse(card, current);
            });
            
            if (targets.length > 0) {
                player.chooseTarget('衅刃：请选择' + get.translation(card) + '的目标', true, function(card, player, target) {
                    return _status.event.targets.includes(target);
                }).set('targets', targets).set('ai', function(target) {
                    var player = _status.event.player;
                    return get.effect(target, _status.event.card, player, player);
                }).set('card', card);
                event.currentCard = card;
            } else {
                event.redo();
            }
        } else {
            event.goto(3);
        }
        
        "step 2"
        if (result.bool && result.targets.length > 0) {
            player.useCard(event.currentCard, result.targets[0], false);
            if (result.targets[0].isDead()) {
                event.died = true;
            }
        }
        event.goto(1);
        
        "step 3"
        // 弃置其他牌
        if (event.otherCards.length > 0) {
            player.lose(event.otherCards, ui.discardPile);
            player.$throw(event.otherCards);
        }
        
        "step 4"
        // 摸红色伤害牌数量的牌
        if (event.redCount > 0) {
            player.draw(event.redCount);
        }
        
        "step 5"
        // 若没有角色死亡，失去体力
        if (!event.died) {
            player.loseHp();
        }
    }
},

// ========== 贾诩 ==========
gz_qingshi: {
	audio: "ext:鹰击长空/audio/skill:2",
	trigger: {target: "useCardToTargeted"},
	filter: function(event, player) {
		if (player.storage.gz_qingshi_used) return false;
		if (event.player == player) return false;
		var card = event.card;
		if (get.color(card) != 'black') return false;
		var name = get.name(card);
		if (name == 'sha') return true;
		if (get.type(card) == 'trick') return true;
		return false;
	},
	direct: true,
	content: function() {
		"step 0"
		player.chooseToDiscard('h', get.prompt('gz_qingshi') + '：是否弃置一张手牌令' + get.translation(trigger.card) + '对你无效？').set('ai', function(card) {
			if (_status.event.effect < 0) {
				if (get.color(card) == 'black') return 10 - get.value(card);
				return 8 - get.value(card);
			}
			return 0;
		}).set('effect', get.effect(player, trigger.card, trigger.player, player)).set('logSkill', 'gz_qingshi');
		"step 1"
		if (result.bool) {
			trigger.excluded.add(player);
			player.storage.gz_qingshi_used = true;
			if (get.color(result.cards[0]) == 'black') {
				player.draw();
			}
		}
	},
	group: ["gz_qingshi_clear"],
	subSkill: {
		clear: {
			trigger: {player: "phaseEnd"},
			silent: true,
			content: function() {
				delete player.storage.gz_qingshi_used;
			}
		}
	}
},

gz_anshi: {
	audio: "ext:鹰击长空/audio/skill:2",
	enable: "phaseUse",
	usable: 1,
	filterCard: false,
	selectCard: 0,
	filterTarget: function(card, player, target) {
		return target != player;
	},
	content: function() {
		"step 0"
		player.useCard({name: 'zhibi'}, target, false);
		event.zhiji = true;
		"step 1"
		// 检查是否选择了观看武将牌
		if (event.zhiji && player.group == 'zhongli') {
			// 检查目标势力是否与另一张武将牌一致
			var otherNum = player.isUnseen(0) ? 1 : 0;
			var otherName = otherNum == 0 ? player.name1 : player.name2;
			var otherGroup = lib.character[otherName][1];
			if (target.group == otherGroup) {
				target.chooseBool('是否明置武将牌？').set('ai', function() {
					return get.attitude(target, player) > 0;
				});
			} else {
				event.goto(3);
			}
		} else {
			event.goto(3);
		}
		"step 2"
		if (result.bool) {
			target.showCharacter(2);
			var otherNum = player.isUnseen(0) ? 1 : 0;
			player.showCharacter(otherNum);
			// 令其在本回合结束后获得额外回合
			target.storage.gz_anshi_extra = true;
			target.addSkill('gz_anshi_extra');
		}
		"step 3"
		// 调整手牌至手牌上限
		if (player.group != 'zhongli') {
			var num = target.maxHp - target.countCards('h');
		if (num > 0) {
			target.draw(num);
		} else if (num < 0) {
			target.chooseToDiscard('h', -num, true);
		}
		}
	},
	ai: {
		order: 9,
		result: {
			target: function(player, target) {
				if (get.attitude(player, target) < 0) return -1;
				return 0;
			}
		}
	},
	subSkill: {
		extra: {
			trigger: {global: "phaseEnd"},
			forced: true,
			charlotte: true,
			filter: function(event, player) {
				return player.storage.gz_anshi_extra;
			},
			content: function() {
				delete player.storage.gz_anshi_extra;
				player.removeSkill('gz_anshi_extra');
				player.insertPhase();
			}
		}
	}
},


gz_shuge: {
	audio: "ext:鹰击长空/audio/skill:2",
	trigger: {player: "damageEnd"},
	filter: function(event, player) {
		return player.group != 'zhongli' && event.source && event.source != player;
	},
	direct: true,
	content: function() {
		"step 0"
		player.chooseCardTarget({
			prompt: get.prompt('gz_shuge') + '：是否将一张伤害牌正面朝上交给一名其他角色？',
			filterCard: function(card) {
				var name = get.name(card);
				return name == 'sha' || name == 'juedou' || get.tag(card, 'damage');
			},
			filterTarget: function(card, player, target) {
				return target != player && target != _status.event.source;
			},
			ai1: function(card) {
				return 6 - get.value(card);
			},
			ai2: function(target) {
				return get.attitude(_status.event.player, target);
			}
		}).set('source', trigger.source);
		"step 1"
		if (result.bool) {
			var card = result.cards[0];
			var target = result.targets[0];
			player.logSkill('gz_shuge', target);
			player.showCards(card);
			player.give(card, target, true);
			event.card = card;
			event.target = target;
		} else {
			event.finish();
		}
		"step 2"
		// 拼点
		event.target.chooseToCompare(trigger.source).set('small', false);
		"step 3"
		if (result.bool) {
			// event.target 赢
			if (event.target.canUse(event.card, trigger.source)) {
				event.target.useCard(event.card, trigger.source);
			}
		} else {
			// trigger.source 赢
			if (trigger.source.canUse(event.card, event.target)) {
				trigger.source.useCard(event.card, event.target);
			}
		}
		// 检查是否使用了展示的牌
		if (result.player == event.card || result.target == event.card) {
			var user = result.player == event.card ? event.target : trigger.source;
			user.damage('thunder', 'nosource');
		}
	}
},


        },
        translate:{
   "gz_yundao": "熨道",
            "gz_yundao_info": "出牌阶段限一次，你可以选择一名势力不同的其他角色，其视为对你使用一张冰【杀】，若此牌未造成伤害，你可以令一名与你势力相同的角色恢复一点体力值。",
            "gz_youming": "幽明",
            "gz_youming_info": "锁定技，当你每回合首次成为其他角色牌的目标后，你观看使用者一张手牌，若此牌与你成为目标的牌颜色不同，你将之置于牌堆顶；当你每轮首次进入濒死状态时，你翻面并将体力恢复至一点，若伤害来源不为你，你将牌堆顶的牌当做【出其不意】对伤害来源使用，若此牌未造成伤害，你重置武将牌。",
            "gz_laoyan": "劳燕",
            "gz_laoyan_info": "锁定技，当其他角色使用一张牌指定目标后，若此牌目标数大于1且你为目标之一，你令此牌对其他同势力角色无效，然后若你未受到伤害，你摸两张牌。",
            "gz_jueyan": "诀言",
            "gz_jueyan_info": "每回合限两次，当你使用单目标牌指定其他角色后，你可以摸一张牌或与目标拼点，赢的角色对没赢的角色造成1点伤害。",
            "gz_zuilun": "罪论",
            "gz_zuilun_info": "结束阶段，你可以观看牌堆顶的三张牌，获得其中X张（X为你满足的选项数），然后以任意顺序放回其余的牌：1.本回合造成过伤害；2.本回合未弃置过牌；3.手牌数为全场最少。若均不满足，你与一名其他角色各失去1点体力。",
            "gz_dishang": "抵殇",
            "gz_dishang_info": "主将技，阵法技，你计算体力上限时减少1个单独的阴阳鱼。当围攻角色使用伤害牌指定被围攻角色为目标后，若与你同势力的角色是此围攻关系中的围攻角色，其可以弃置其与被围攻角色装备区的各一张牌，令此牌无法被响应。",
            "gz_qiaosi": "峭嗣",
            "gz_qiaosi_info": "结束阶段，你可获得其他角色本回合进入弃牌堆一种类别的牌，若你以此法获得牌的数量不大于你的当前体力值，你失去一点体力。",
            "gz_baizu": "败族",
            "gz_baizu_info": "锁定技，结束阶段，若你已受伤且有手牌，你须选择所有势力各一名其他角色，你与这些角色同时弃置一张手牌，然后你对弃置与你相同类型牌的其他角色各造成1点伤害。",
                   "gz_guishang": "诡赏",
            "gz_guishang_info": "出牌阶段限两次，你可以展示至少一张牌并选择一名本回合未依此法选择过的角色，令其选择一项：1.获得这些牌并执行一个军令；2.弃置至少一张与展示牌不同花色的牌并令你摸一张牌，然后视为使用仅指定你与其的【以逸待劳】。回合结束时，本回合获得牌最多的角色对最少的角色造成一点伤害。",
            "gz_niubi": "拗愎",
            "gz_niubi_info": "锁定技，回合开始时，你选择一项：1.本回合仅能对自己使用牌，用一张牌后，摸一张牌；2.本回合仅能对其他角色使用牌，使用一种花色的首张牌额外结算一次。出牌阶段结束时，若你本回合未造成过伤害，你失去一点体力值。",
            "gz_jiyuan": "霁愿",
            "gz_jiyuan_info": "限定技，当你进入濒死阶段时，你可以选择一名与你势力相同的角色，其将体力值和手牌数调整至上限，并暗置变更副将。然后若你未死亡，你移除此武将牌。",
            "gz_xianwan": "娴婉",
            "gz_xianwan_info": "当你需要使用冰【杀】/【闪】时,若你横置/未横置，你可以重置/横置你的武将牌，视为使用之。",
            "gz_linzhe": "遴哲",
            "gz_linzhe_info": "限定技，出牌阶段，你可以令所有与你势力相同的角色选择一项：1.使用一张锦囊牌，然后变更副将；2.获得一个阴阳鱼标记，若其此时手牌数等于体力上限则改为珠联璧合标记。回合结束阶段，若你所在势力为唯一大势力，该技能视为未发动过。",
            "gz_yamai": "雅迈",
            "gz_yamai_info": "阵法技，与你处于同一队列角色的回合结束时，若你本回合你获得或使用过牌，你可以使用其中一张。",
            "gz_liefa": "烈伐",
            "gz_liefa_info": "每回合每种牌名限一次，当你需要使用任意一种目标不包含/包含你的基本牌时，你可以视为使用之，此牌不计入次数，结算后你失去一点体力/弃两张牌。若当前回合为与你势力相同角色的回合，此牌结算后，其摸一张牌。",
            "gz_yanzuo": "研作",
            "gz_yanzuo_info": "每回合限一次，你可以重铸至少两张类别相同的牌，视为使用一张无距离次数限制的所重铸类别的非装备牌。",
            "gz_pijian": "辟剑",
            "gz_pijian_info": "主将技，你计算体力上限时减少1个单独的阴阳鱼。其他角色的回合结束阶段，若你手牌中拥有与其本回合进入弃牌堆的牌所包含的所有类别的牌，你可展示所有对应类别的手牌并弃置之，然后对其造成一点雷属性伤害。",
            "gz_zeyu": "泽誉",
            "gz_zeyu_info": "副将技，当一名与你势力相同的角色本局首次令一名势力不同的角色进入濒死状态时，你可令其摸两张牌并选择一项：1.主副将易位；2.变更副将。",
            "gz_baoguo": "保国",
            "gz_baoguo_info": "限定技，当有同势力角色进入濒死状态时，若你为小势力角色，你可以依次令同势力角色选择一项：1.移除副将或将所有手牌交给任意一名大势力角色，然后恢复X点体力值；2.摸X张牌。（X为当前大势力角色数且至少为1）",
            "gz_yuandao": "渊道",
            "gz_yuandao_info": "主将技，阵法技，与你处于同一队列的角色于其回合内使用锦囊牌后，其下一张牌不计入次数。",
            "gz_yunxing": "陨星",
            "gz_yunxing_info": "副将技，锁定技，回合开始或回合结束时，你摸一张牌，并将一张牌置于牌堆顶。当你进行判定时，若此判定牌的点数不小于与你势力相同角色的体力值之和，则其视为红桃，否则视为黑桃。",
            "gz_juezhi": "爵制",
            "gz_juezhi_info": "出牌阶段限X次，你可以进行X次判定，然后获得其中点数和花色均不相同的任意张牌。（X为与你势力相同的角色数）",
            "gz_xingtu": "行图",
            "gz_xingtu_info": "锁定技，当你使用一张牌时，若此牌的点数为你使用的上一张牌的点数：约数，你摸一张牌；倍数，你使用此牌无次数限制。",
            "gz_xingtu1":"倍",
			"gz_xingtu2":"约",
			"gz_xugu": "虚淈",
"gz_xugu_info": "出牌阶段限一次，你可以令任意名势力不同的角色同时展示一张手牌（有角色死亡势力或大势力可选数+1），若这些牌的花色和点数均不同，你摸X张牌并跳过出牌和弃牌阶段，且点数最小的角色对点数最大的角色造成一点伤害；否则其中花色唯一的角色摸一张牌，且你（优先）与其可以依次使用其中一张展示牌。（X为参与角色数）",
            "gz_xionglie": "凶烈",
            "gz_xionglie_info": "锁定技，女性角色、有暗置武将牌或主副将均明置时，主副将阴阳鱼不相同的角色不能响应你于回合内对其使用的首张牌，若你为小势力角色，你于回合内首次造成的伤害+1。",
            "gz_xunfeng": "寻风",
"gz_xunfeng_info": "回合开始时，你弃置所有“风”，并将牌堆顶三张不同牌名的非装备牌置于你的武将牌上，称为“风”。每当有“风”中包含牌名的牌进入弃牌堆时，你可以选择一项：1.弃置同名“风”并令其额外执行一次，然后你摸X张牌。2.你摸一张牌。（X为使用者所在势力角色数）",          
  "gz_zhangming": "彰名",
            "gz_zhangming_info": "主将技，你计算体力上限时减少1个单独的阴阳鱼。回合开始时，你可以展示你的手牌，根据花色数获得以下效果：一种，梅花牌无法被响应；二种，方片和黑桃牌无次数限制；三种，使用红桃牌时，摸一张牌；四种，你每用一种花色的牌，便与其他角色的距离-1。",
            "gz_zhangming_club": "彰名·梅花",
            "gz_zhangming_unlimited": "彰名·无限",
            "gz_zhangming_heart": "彰名·红桃",
            "gz_zhangming_distance": "彰名·距离",
            "gz_yinbing": "饮冰",
            "gz_yinbing_info": "副将技，锁定技，你计算体力上限时减少1个单独的阴阳鱼。当你每轮首次受到或造成伤害后，受伤角色视为对伤害来源使用一张无视防具的冰【杀】。此【杀】结算后，若此【杀】结算过程中没有角色受到伤害，此【杀】使用者摸两张牌并失去一点体力。",
            "gz_bihun": "弼昏",
            "gz_bihun_info": "主将技，锁定技，当你于回合内首次使用牌指定其他角色为目标时，若你的手牌数大于手牌上限，你取消之，然后若其为此牌的唯一目标，其获得之。",
            "gz_juanzhi": "卷帙",
            "gz_juanzhi_info": "准备阶段，你可以重铸一张牌，若如此做，若本回合你使用的牌数不大于X，你可将一张牌名字数为X的牌当作其他相同牌名字数的基本牌或普通锦囊牌使用（X为重铸牌的牌名字数）。",
            "gz_juanzhi_effect": "卷帙",
            "gz_juanzhi_count": "卷帙",
            "gz_juanzhi_change": "卷帙",
            "gz_guishang_backup": "诡赏",
  "gz_yisang": "诒桑",
  "gz_yisang_info": "出牌阶段限X次，或当你受到伤害后，你可展示牌堆顶的一张牌并令一名角色获得此牌。若其本回合以此法获得过牌，你需弃置一张与此牌不同类型的牌，然后其获得此牌。（X为场上势力数）",
            "gz_jiubo": "救帛",
            "gz_jiubo_info": "当一名同势力角色于回合内首次成为一张单体伤害牌的目标时，你可弃置一张非基本牌取消此目标。若此牌为来源本回合使用的第一张牌，你代替其成为该牌目标。",
            "gz_lingzhi": "凌志",
            "gz_lingzhi_info": "出牌阶段限一次，你可以展示一张牌，然后令你攻击范围内的一名其他角色选择一项：1.交给你一张牌名字数不小于此牌的牌；2.获得此牌，然后你对其造成一点伤害。",
            "gz_ruluo": "入洛",
            "gz_ruluo_info": "出牌阶段开始时，你可以摸场上势力数张牌并展示所有手牌，然后选择一项并移除对应选项：1.这些牌中的非基本牌可当相同牌名长度且未以此法使用过的锦囊牌使用，且奇/偶次使用时无法选择自己/其他人为目标；2.这些牌中的基本牌无次数与距离限制；3.本回合体力值小于你展示牌类别数的角色的非锁定技失效。",
 "gz_ruluo_basic":"入洛",
  "gz_hejue": "合珏",
            "gz_hejue_info": "当你每轮首次受到伤害后或结束阶段，你可以选择至多两名角色，若其共至少有两张明置武将牌且仅明置的为珠联璧合（你的明置武将牌不受此限制），则其各摸一张牌，若一方拥有珠联璧合标记则增加恢复一点体力值选项。",
            "gz_hexi": "貉隙",
            "gz_hexi_info": "每回合限一次，当你获得牌后，你可以将装备区的一张牌移动至一名其他角色的对应区域，然后若你明置且其两张武将牌均明置，你可以令其对当前回合造成一点伤害并暗置其一张武将牌且该武将牌本回合无法明置。",
   "gz_fuhui":"赋绘",
			"gz_fuhui_info": "每种牌名每轮限一次，你可将至少两张点数相同或相连的牌当作任意一张基本牌或普通锦囊牌使用，若转化的牌数大于X，你摸X张牌。（X为明置势力数）",
"gz_mohua":"摹画",
"gz_mohua_info": "其他角色回合结束时，你可使用一张其于出牌阶段使用的相同牌名的基本牌或普通锦囊牌（视为该角色使用，无距离限制），若当前回合角色与你势力不同，你需交给其一张牌且本技能本轮失效。",
// 技能名称和描述
"gz_qiaoshi": "樵拾",
"gz_qiaoshi_info": "其他角色的结束阶段，若其手牌数与你相等，你可以与其各摸一张牌，若该角色与你势力相同，你可令其变更副将。",

"gz_yanyu": "燕语",
"gz_yanyu_info": "出牌阶段每种牌名限一次，你可以重铸一张基本牌视为使用之，此牌不计入次数。",

"gz_zhenlie": "贞烈",
"gz_zhenlie_info": "每回合限一次，当你成为其他角色使用单体卡牌的目标后，你可以失去1点体力，令此牌对你无效，然后你令其执行一个军令，若其不执行，你获得其一张牌。",

"gz_miji": "秘计",
"gz_miji_info": "当有角色失去体力时，你可以摸一张牌/弃置一张牌并令本回合角色手牌上限+1/-1。",

"gz_junwei": "军威",
"gz_junwei_info": "锁定技，准备阶段开始时，你需选择至多X名势力不同的角色依次选择一项并移除对应选项：1.执行一个军令，然后移动场上一张牌；2.弃置装备区的一张牌然后摸两张牌；3.本回合获得【绮胄】；4.弃置所有手牌并摸等量的牌。（X为你的体力值）",
"gz_qizhou":"绮胄",
"gz_qizhou_info":"锁定技，你根据你装备区的花色数获得以下技能：一种或以上，【马术】；两种或以上，【英姿】；三种或以上，【短兵】；四种，【奋威】。",
"gz_zicai": "自才",
"gz_zicai_info": "锁定技，你的回合内，与你势力相同的角色首次获得牌时，或其他角色首次获得你的牌时，其摸一张牌。",
"gz_zicai_discard":"自才",
"gz_zhengmu": "整睦",
"gz_zhengmu_info": "结束阶段，你可以将一张红色牌交给一名其他角色，若如此做，直到你的下个回合开始，与你势力相同的角色每回合首次成为该势力角色使用牌的目标时，其与使用者各摸一张牌。",
"gz_ruxin": "濡心",
"gz_ruxin_info": "限定技，出牌阶段，你可以选择场上至多两名角色，若这些角色有满足【珠联璧合】的武将牌，则其所属角色各获得一枚【珠联璧合】标记；若均不满足，你可以选择其中一名有两张明置武将牌的角色，将其一张武将牌变更为与另一张【珠联璧合】的武将牌并获得一枚【珠联璧合】标记。",
"gz_linglong": "玲珑",
"gz_linglong_info": "当你未装备防具时，你视为装备【八卦阵】。当场上存在【珠联璧合】角色或有未使用的【珠联璧合】标记时，你于回合内使用【杀】的次数+1。当一名有【珠联璧合】武将牌的角色于其回合内首次使用牌指定另一张配对【珠联璧合】武将牌的角色时，若其不为/为同一角色，你可以令其各摸一张牌/令此牌额外执行一次。",

"gz_pizou": "仳走",
"gz_pizou_info": "锁定技，当你进入濒死状态时，你令所有角色的非锁定技失效直至本回合结束。",
"gz_juansui": "狷谇",
"gz_juansui_info": "锁定技，当你的体力值变为1时，你摸两张牌并复原你的武将牌，然后你视为使用一张仅可指定当前回合角色势力的角色为目标的普通锦囊牌（每种牌名每局限一次）。",
"gz_kuizhen": "溃阵",
"gz_kuizhen_info": "出牌阶段限一次，你可以弃置一张黑色【杀】，令一名与你势力不同的角色视为对你使用一张【决斗】，若你因此受到伤害，你观看其手牌并获得其中的【杀】，否则其失去1点体力。",
"gz_niejiang": "蹑江",
"gz_niejiang_info": "锁定技，每名角色每回合限一次，当一名角色的体力值变化后，若为全场最低，你摸一张牌，若此牌为【杀】，你展示并使用之。你与全场体力值最低的其他所有角色的距离始终为1。",
"gz_anxu": "安恤",
"gz_anxu_info": "出牌阶段限一次，你可以选择两名手牌数不同的角色，令其中手牌数较少的角色获得另一名角色的一张手牌。然后你可以令其中的小势力角色摸一张牌。",
"gz_zhuiyi": "追忆",
"gz_zhuiyi_info": "当你进入濒死状态时，你可以移除此武将牌，然后令一名其他角色（杀死你的角色除外）摸两张牌并回复1点体力，若其与你势力相同，且其主将有可配对的【珠联璧合】武将牌，其可更换其副将为另一张【珠联璧合】武将牌并获得一枚【珠联璧合】标记。",
 zhongli: "中",
    zhongli2: "中立",
    gz_suoli: "索立",
    gz_suoli_info: "锁定技，①你与其他人的距离、其他人与你的距离+X。(X为场上已确定势力数)；②出牌阶段限一次，你可以将一张装备牌当作【远交近攻】、【联军盛宴】或【戮力同心】使用。③当你确定势力后，你失去此技能。",
    gz_zhongli_test: "中立测试",
    gz_zhongli_cooldown: "中立者处于静观其变状态",
	"gz_zhongli_xushu":"徐庶",
	"gz_zhongli_zhaoe":"赵娥",
	"gz_zhongli_jiaxu":"贾诩",
	"gz_zhongli_lusu":"鲁肃",
	"gz_zhongli_xushao":"许劭",
// ========== 武将翻译 ==========


gz_jiange: '剑歌',
gz_jiange_info: '每回合各限一次，①你可以将一张锦囊牌/装备牌当做无距离限制的【杀】/【决斗】使用或打出，然后你摸一张牌。②当与你距离不大于1的角色受到伤害后，若伤害来源不为你，你可对伤害来源使用一张可用的伤害牌。',

gz_yinyu: '隐誉',
gz_yinyu_info: '锁定技，当你明置武将时，若你另一张武将牌为【徐庶（蜀）】，你摸体力值张牌、删除“举荐”中的“副将技”标签并移除此武将牌，然后若徐庶（蜀）为副将，其变为主将。当你确定势力后，若势力为“群/蜀”，你获得“诛恶”/“辅主”。',

gz_zhue: '诛恶',
gz_zhue_info: '每轮限一次，当一名同势力角色使用非装备牌时，你可令其摸一张牌且此牌不能被响应。',

gz_fuzhu: '辅主',
gz_fuzhu_info: '每轮各限一次，当一名同势力角色使用非转化牌/转化牌结算结束后，你可以将一张牌置于牌堆顶/底，然后展示牌堆底/顶的三张牌并获得其中一种类别的牌，并将其余的牌以任意顺序置于原位。',



gz_yingmen: '盈门',
gz_yingmen_info: '锁定技，游戏开始时，你在剩余武将牌堆中获得X张势力不同的武将牌置于你的武将牌上，称为"访客"；回合开始时或你受到伤害后，若你的"访客"数少于X张，则你从剩余武将牌堆中将"访客"补至X张。（X为你的体力上限）',

gz_pingjian: '评鉴',
gz_pingjian_info: '每回合限一次，你于"访客"的无类型标签或仅有锁定技标签的技能的发动时机可以发动该技能，然后你选择一项：1．移去该"访客"，然后摸一张牌；2．移去另一张"访客"。',



gz_xiangkui: '飨馈',
gz_xiangkui_info: '其他角色的出牌阶段限一次，其可指定一种类型，然后你可正面朝上交给其任意张手牌。你每交出一种类别的牌便摸一张牌。若以此法交给其的牌中包含其指定的类型，则你从牌堆顶获得一张与其指定类别不同的牌。',

gz_yangming: '扬名',
gz_yangming_info: '每回合结束时，你可以摸X张牌，若X不小于场上势力数，你需展示所有手牌并依次选择X张牌和X名势力不同的其他角色，这些角色依次获得一张你选择的牌（X为你本回合使用的牌的类别数）。',



gz_yanshi: '言誓',
gz_yanshi_info: '锁定技，当你未确定势力时，你的伤害类卡牌不计入手牌上限且无法使用；且当你每轮首次受到伤害时，若伤害来源体力值不小于你，你展示所有手牌并弃置一种伤害牌牌名的所有牌防止之。当你确定势力后，你移除此武将牌。',

gz_xinren: '衅刃',
gz_xinren_info: '锁定技，当你移除此武将牌后或首次脱离濒死状态时，你弃置所有手牌并依次使用其中的黑色伤害牌，并摸等同于其中红色伤害牌数量的牌，若此流程中没有角色死亡，你失去一点体力值。',


gz_qingshi: '清饰',
gz_qingshi_info: '每回合限一次，当你成为其他角色黑色锦囊牌或【杀】的目标后，你可弃置一张手牌令此牌对你无效。若你弃置的是黑色牌，你摸一张牌。',

gz_anshi: '谙世',
gz_anshi_info: '出牌阶段限一次，你可以视为使用一张【知己知彼】，若你选择观看其武将牌后，其势力与你另一张武将牌一致且你未确定势力，其可选择明置之，然后你明置另一张武将牌并令其于本回合结束后获得一个额外的回合。若你已确定势力，你令【知己知彼】的目标将手牌调整至手牌上限。',

gz_shuge: '束阁',
gz_shuge_info: '当你受到伤害后，若你已确定势力，你可以将一张伤害牌正面朝上交给一名伤害来源外的其他角色并令其与伤害来源拼点，赢者对败者使用此牌。若拼点中有角色使用你展示的牌拼点，则其受到一点无来源的雷电伤害。',

gz_jujian_main:"举荐",

gz_jujian_main_info:"锁定技，与你势力相同的角色进入濒死状态时，你令其恢复体力至1点，然后你变更一次副将。",

        },
      },
      intro: "自制扩展",
      author: "公冶长风",
      diskURL: "",
      forumURL: "",
      version: "1.9.0"
    },
    files: { character: [], card: [], skill: [] }
  };
});