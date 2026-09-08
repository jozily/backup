import { lib, game, ui, get, ai, _status } from "../../noname.js";
import dzxy from "./class/dzxy.js";
import { BanChar } from "./class/Banchar.js";
import { ChooseChar_mod } from "./class/ChooseChar_mod.js";
import { ChooseChar } from "./class/ChooseChar.js";
import { PWGrade,GradeImg } from "./class/PWGrade.js";
import { Other } from "./class/other.js";
import { charPage, skinPage } from "./class/char_skin.js";
import { Dsplash } from "./class/Dsplash.js";
//自用
// import { personalModule } from "./personalModule/ext.js";


game.import("extension",function(){return {name:"斗转星移",content:function(config,pack){
  Other.addSkill();
  BanChar.checkReload();
  ChooseChar_mod.modify();
  PWGrade.addSkill();
  PWGrade.pushGameOver();
  
},precontent:function(){
  dzxy.updateVersion();
  dzxy.importCSS();
  dzxy.initData();

  BanChar.modCharPack();

  ChooseChar.initRecentChseChar();

  PWGrade.importCSS();
  PWGrade.initData();
  GradeImg.loadTX();
  
  Other.subscribe();
  // game.saveConfig("show_splash", "init");
  //自用
  // personalModule.start();
},config:{
  
  //lib.config[`${dzxy.dz}`]
  "backupBancharData": {
    name: '<button class="dz-menu-config-btn">点击备份所有模式禁将数据</button>',
    clear: true,
    async onclick() {
      let path = `extension/斗转星移/data/banCharBackup/`;
      let list1 = [];
      let list2 = [];
      for (let mode of lib.config.all.mode) {
        let str = JSON.stringify(lib.config[mode + '_banned']);
        let modeTran = get.translation(mode);
        await new Promise((res, rej) => {
          game.writeFile(str, path, modeTran, () => {
            // alert(`${modeTran}模式备份完成,路径${path}`);
            list1.push(modeTran);
            res();
          }, () => {
            // alert(`${modeTran}模式备份失败,路径${path}`);
            list2.push(modeTran);
            res();
          });
        });
      }
      alert(`文件路径：${path}\n备份成功：${list1.length ? list1 : ['无']}\n备份失败：${list2.length ? list2 : ['无']}`);
    }
  },
  "splashMod": {
    "name": "启动页修改",
    "init": false,
    "intro": "设置在【本体菜单-选项-外观-启动页】",
    onclick(item) {
      this.classList.remove('on');
      alert('请在【本体菜单-选项-外观-启动页】进行设置');
    },
  },
  /**
   * 禁将功能
   */
  "lineSeparator1": {
    name: '<div class="dz-menu-lineSeparator">禁将功能</div>',
    intro: "",
    clear: true,
  },
  "openBancharpage": {
    name: '<button class="dz-menu-config-btn">打开禁将页面</button>',
    clear: true,
    onclick(){
      let ban = new BanChar();
      ban.openPage();
    }
  },
  "addBanCharToTopMenu": {
    "name": "将禁将加入顶部菜单栏",
    "init": true,
    "intro": "将禁将加入顶部菜单栏",
  },
  "autoOpenPack": {
    "name": "根据模式开启对应武将包",
    "init": true,
    "intro": "根据模式关掉禁用了所有武将的武将包，以防止卡顿。此开关会导致在本体开启或关闭武将包失效",
  },
  "banCharGroupColor":{
    "name":"禁将势力颜色",
    "init":false,
    "intro":"开启禁将势力颜色划分",
  },
  "xiaotouxiang":{
    "name":"手杀小头像读取",
    "intro":`禁将界面显示手杀样式小头像(需要手动往扩展内补充素材)`,
    "init":false,
  },

  /**
   * 选将美化功能
   */
  "lineSeparator2": {
    name: '<div class="dz-menu-lineSeparator">选将美化功能</div>',
    intro: "",
    clear: true,
  },
  "chooseChar_identity": {
    "name": "身份场美化",
    "init": false,
  },
  "chooseChar_doudizhu": {
    "name": "斗地主-休闲美化",
    "init": false,
  },
  "chooseChar_versus": {
    "name": "对决-欢乐美化",
    "init": false,
  },
  "recentCharFreq":{
    "name":"自由选将最近武将的变动频率",
    "init":"50",
    "intro": "数字越小排在前面的武将变动频率越高",
    "item":{
      "1": "1",
      "10": "10",
      "30": "30",
      "50": "50",
      "70": "70",
      "100": "100",
    },
  },
  "taiciDanmu":{
    "name":"台词弹幕",
    "intro": "此扩展播放的台词时上方会出现弹幕",
    "init": true,
  },
  "chooseCharNoSkin": {
    "name": "选将界面使用原皮肤",
    "init": false,
  },
  // "loutouStyle":{
  //   "name":"露头样式",
  //   "init":"shizhounian",
  //   "item":{
  //     "yuanhua": "原画",
  //     "shizhounian": "十周年",
  //     "shousha": "手杀",
  //   },
  // },
  "lineSeparator3": {
    name: '<div class="dz-menu-lineSeparator">露头功能</div>',
    intro: "",
    clear: true,
  },
  "originLoutou":{
    "name":"原画露头样式",
    "init":"none",
    "item":{
      "none": "无",
      "shizhounian": "十周年",
      "shousha": "手杀",
    },
  },
  "skinLoutou":{
    "name":"皮肤露头样式",
    "init":"none",
    "item":{
      "none": "无",
      "shizhounian": "十周年",
      "shousha": "手杀",
    },
  },
  "gameloutou":{
    "name":"将此扩展露头应用到对局",
    "init": false,
  },
  /**
   * 排位功能
   */
  "lineSeparator4": {
    name: '<div class="dz-menu-lineSeparator">排位功能</div>',
    intro: "",
    clear: true,
  },
  "PWsettlement": {
    "name": "排位2V2结算",
    "init": false,
  },
  "PWhideDialog": {
    "name": "隐藏游戏结算框",
    "init": false,
  },
  "PWOptimization": {
    "name": "布局优化及查看队友手牌",
    "init": false,
    "intro": "需要开启对决选将美化并且仅在十周年ui手杀样式下生效",
  },
  "lineSeparator5": {
    name: '<div class="dz-menu-lineSeparator">武将和皮肤页面</div>',
    intro: "",
    clear: true,
  },
  "charInfoPage":{
    "name":"武将信息页面",
    "init":"default",
    "item":{
      "default": "默认",
      "qianhuan": "千幻聆音",
    },
  },
  "delSkinTip":{
    "name": "删除皮肤时需再次确定",
    "init": true,
    intro: "开启后点击<删除皮肤>会弹出一个确认框，关闭后点击<删除皮肤>就会立刻删除",
  },
  "openCharPage": {
    name: '<button class="dz-menu-config-btn">打开武将页面</button>',
    clear: true,
    onclick(){
      charPage.open();
    }
  },
  "openSkinPage": {
    name: '<button class="dz-menu-config-btn">打开皮肤页面</button>',
    clear: true,
    onclick(){
      skinPage.open();
    }
  },
  

},help:{

},package:{
  character: {
    character: {
    },
    translate: {
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
    },
    translate: {
    },
  },
  intro: (function () {
    let str = '';
    let list = [
      ['版本号：' + (lib.config[`extension_斗转星移_version`] || '未知')],
      ['注意：启用禁将功能后所有模式的禁用武将都将直接更改，首次使用请注意备份好游戏数据', 'color:red;font-size:14px;'],
      ['感谢流年,虹色百合,守缺提供的禁将思路及代码功能改善;' +
        '某个不为人知的萌新提供的武将小头像功能;' +
        '寰宇星城,西瓜以及各扩展的调用和参考;' +
        '各玩家的bug反馈'
      ],
    ];
    for (let i of list) {
      if (i.length == 1) str += `<span>•${i[0]}<br></span>`;
      else str += `<span style="${i[1]}">•${i[0]}<br></span>`;
    }
    return str;
  })(),
  author: "无名玩家",
  diskURL: "",
  forumURL: "",
  version: "1.0",
},files:{"character":[],"card":[],"skill":[],"audio":[]}}
});