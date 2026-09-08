import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { DBtn } from "./baseEle.js";
import { Predzxy } from "./Predzxy.js";
import { Danmu } from "./other.js";
class Dzxy extends Predzxy {
  /**扩展路径 */
  path = 'extension/斗转星移/';
  /**config用的简写 */
  dz = 'extension_斗转星移_';
  /**小边框 */
  sborder = [];
  /**大边框 */
  bborder = [];
  /**小头像 */
  xiaotouxiang = [];
  /**武将包数组 */
  allPackList;
  /**武将 */
  character = {
  };
  /**武将包 */
  charPack = {};
  /**翻译 */
  translate = {};
  updateVersion() {
    //当前版本
    let currentVersion = '3.4.3';
    //玩家更新前的版本
    let userVersion = lib.config[`${dzxy.dz}version`];
    let warn = currentVersion != userVersion;
    if (warn) {
      alert('(斗转星移)使用3.0之前版本覆盖更新的需要删除重装，请注意备份好相关数据！！！');
    }
    dzxy.saveCF('version', currentVersion);
  }
  /**初始化整合数据 */
  async initData() {
    //储存武将相关设置
    dzxy.initCF('charData', {});
    //删除的皮肤
    dzxy.initCF('deletedSkin', {});
    //确保武将框加载
    let p = new Promise((res) => {
      game.getFileList(`extension/斗转星移/image/char_small_border`, (folders, files) => {
        for (let i of files) {
          this.sborder.add(i.slice(17, -4));
        }
        res();
      });
    });
    await p;
    game.getFileList('extension/斗转星移/image/char', (folders, files) => {
      for (let i of files) {
        this.xiaotouxiang.push(i.slice(0, -4));
      }
    }, () => { });
    lib.arenaReady.push(() => {
      this.allPackList = lib.config.all.characters.slice().addArray(Object.keys(lib.characterPack));
      //
      for (let i in lib.characterPack) {
        Object.assign(this.character, lib.characterPack[i]);
      }
      //
      Object.assign(this.charPack, { 'all': this.character });
      Object.assign(this.charPack, lib.characterPack);
      //
      Object.assign(this.translate, { 'all': '全部', 'all_character_config': '全部' });
      Object.assign(this.translate, lib.translate);

      this.deleteDySkin();
    });
  }
  /**屏蔽十周年UIdynamicSkin里动态皮肤代码*/
  deleteDySkin(char, skin) {
    if (!window.decadeUI || !decadeUI.dynamicSkin) return;
    if (char != undefined && skin != undefined) {
      if (decadeUI.dynamicSkin[char] && decadeUI.dynamicSkin[char][skin]) delete decadeUI.dynamicSkin[char][skin];
      return;
    }
    for (let i in lib.config[`${dzxy.dz}deletedSkin`]) {
      if (decadeUI.dynamicSkin[i]) {
        for (let j of lib.config[`${dzxy.dz}deletedSkin`][i]) {
          if (decadeUI.dynamicSkin[i][j]) delete decadeUI.dynamicSkin[i][j];
        }
      }
    }
  }
  importCSS() {
    lib.init.css(`${lib.assetURL}${this.path}css`, "banChar");
    lib.init.css(`${lib.assetURL}${this.path}css`, "chooseChar");
    lib.init.css(`${lib.assetURL}${this.path}css`, "other");
    lib.init.css(`${lib.assetURL}${this.path}css`, "public");
    lib.init.css(`${lib.assetURL}${this.path}css`, "Dsplash");
    lib.init.css(`${lib.assetURL}${this.path}css`, "layout_22");
  }
  /**初始化config */
  initCF(key, value) {
    if (lib.config[`${this.dz}${key}`] == undefined) game.saveExtensionConfig('斗转星移', key, value);
  }
  /**保存config */
  saveCF(key, value) {
    if (value == undefined) game.saveExtensionConfig('斗转星移', key, lib.config[`${this.dz}${key}`]);
    else game.saveExtensionConfig('斗转星移', key, value);
  }
  /**获取config */
  getCF(key) {
    return lib.config[`${dzxy.dz}${key}`];
  }
  /**获取势力颜色 */
  getGroupColor(group) {
    let groupColor = {
      wei: 'RGBA(46,88,148,0.5)',
      shu: 'RGBA(133,1,1,0.5)',
      wu: 'RGBA(94,140,49,0.5)',
      qun: 'RGBA(210,206,133,0.5)',
      shen: 'RGBA(248,213,104,0.5)',
      jin: 'RGBA(147,112,219,0.5)',
      key: 'RGBA(255,192,203,0.5)',
      western: 'RGBA(147,112,219,0.5)',
      default: 'RGBA(237,224,61,0.5)',//默认颜色，未定义势力的颜色
      close: 'RGBA(0,0,0,0.5)',//关闭势力颜色划分的颜色
    };
    let color = groupColor['default'];
    if (groupColor[group]) color = groupColor[group];
    return color;
  }
  getSkill(charID) {
    let charInfo = get.character(charID);
    let skill = charInfo[3].slice(), skill2 = [], skill3 = [];
    for (let i of skill) {
      let info = get.info(i);
      if (!info || !info.derivation) continue;
      typeof info.derivation == 'string' ? skill2.add(info.derivation) : skill2.addArray(info.derivation);
    }
    skill3 = skill.slice().addArray(skill2);
    return [skill, skill2, skill3];//0原技能1衍生技能2全部技能
  }
  /**
   * 随机播放武将台词
   * @param {string} ID 武将id
   */
  async randomSkillAudio(ID) {
    // let skills = this.getSkill(ID);
    // game.trySkillAudio(skills[2].randomGet(), ID, true);
    let skills = this.getSkill(ID).slice(0, 2);
    let skill;
    let br = false;
    for (let i = 0; i < skills.length; i++) {
      while (skills[i].length) {
        skill = skills[i].randomGet();
        let audioList = get.Audio.skill({ skill, ID }).audioList;
        let play = this.randomSkillAudio2(audioList);
        try {
          await play.then(() => {
            br = true;
          })
          if (br) break;

        } catch (error) {
          skills[i].remove(skill);
        }
      }
      if (br) break;
    }
  }
  async randomSkillAudio2(audioList) {
    Danmu.createArea();
    while (audioList.length) {
      let random = audioList.randomGet();
      let path = random.file;
      let text = random.text;
      let audio = document.createElement('audio');

      //本体复制来的 能跑
      let parsedPath = "";
      if (["blob:", "data:"].some(prefix => path.startsWith(prefix))) parsedPath = path;
      else if (path.startsWith("ext:")) parsedPath = path.replace(/^ext:/, "extension/");
      else if (path.startsWith("db:")) parsedPath = path.replace(/^(db:[^:]*)\//, (_, p) => p + ":");
      else parsedPath = `audio/${path}`;
      // await Promise.resolve().then(async () => {
      //   let resolvedPath;
      //   if (parsedPath.startsWith("db:")) resolvedPath = get.objectURL(await game.getDB("image", parsedPath.slice(3)));
      //   else if (lib.path.extname(parsedPath)) resolvedPath = `${lib.assetURL}${parsedPath}`;
      //   else if (URL.canParse(path)) resolvedPath = path;
      //   else resolvedPath = `${lib.assetURL}${parsedPath}.mp3`;
      //   audio.src = resolvedPath;
      //   // ui.window.appendChild(audio);
      // });

      audio.src = parsedPath;
      // audio.autoplay = true;
      audio.volume = lib.config.volumn_audio / 8;
      audio.onended = () => audio.remove();
      audio.onerror = () => {
        audio.remove();
      };
      let br = false;
      try {
        await audio.play();
        br = true;
        if (lib.config[`${dzxy.dz}taiciDanmu`]) Danmu.addDanmu(text);
      } catch (error) {
        audioList.remove(random);
      }
      if (br) return Promise.resolve();
    }
    return Promise.reject();
  }
  randomSkillAudio3(ID) {
    let skills = this.getSkill(ID);
    game.trySkillAudio(skills[2].randomGet(), ID, true);
  }
  /**
   * 
   * @param {HTMLDivElement} Ele 要添加事件的元素
   * @param {number} len 滑动距离
   */
  scroll_lr(Ele, len) {
    let step = len / 10;
    let scr = function (event, len2) {
      let startL = Ele.scrollLeft;
      if (event.deltaY < 0) {
        Ele.scrollLeft = startL - step;
      } else {
        Ele.scrollLeft = startL + step;
      }
      let change = Math.abs(Ele.scrollLeft - startL);
      if (change == 0) return;
      if (change < len2) {
        len2 -= change;
        requestAnimationFrame(() => scr(event, len2));
      }
    }
    Ele.addEventListener('wheel', (event) => {
      event.preventDefault();
      requestAnimationFrame(() => scr(event, len));
    });
  }
  isModeBeautified() {
    return lib.config[`${dzxy.dz}chooseChar_${lib.config.mode}`];
  }
  /**武将名替换 来自千幻 */
  charNameRep(str) {
    if (typeof str != 'string') return '';
    var regex = /(<([^>]+)>)/ig;
    str = str.replace(regex, "");
    str = str.toUpperCase();
    var str2 = '';
    var nobreak = false;
    for (var i = 0; i < str.length; i++) {
      if (str[i] == '`') {
        nobreak = !nobreak; continue;
      }
      str2 += str[i];
      if (nobreak) continue;
      if (str[i] == 'S' && str[i + 1] == 'P') continue;
      if (str[i] == 'T' && str[i + 1] == 'W') continue;
      if (str[i] == 'O' && str[i + 1] == 'L') continue;
      if (/[0-9]/.test(str[i]) && /[0-9]/.test(str[i + 1])) continue;
      if (i < str.length - 1) {
        str2 += '<br>';
      }
    }
    return str2;
  }
  /**
   * 
   * @param {*} id 武将id
   * @param {*} key 要获取的数据
   * @param {*} handle 是否要将数据进行处理
   * @returns 
   */
  getCharData(id, key, handle) {
    let value;
    let char = lib.config[`${this.dz}charData`][id];
    if (char && char[key] != undefined) value = char[key];
    if (handle === true) {
      switch (key) {
        case 'loutou':
          if (value == undefined || value == 'default') {
            value = dzxy.getCF('originLoutou');
          }
          break;
        case 'skinloutou':
          if (value == undefined || value == 'default') {
            value = dzxy.getCF('skinLoutou');
          }
          break;
      }
    }
    return value;
  }
  setCharData(id, key, value) {
    if (lib.config[`${this.dz}charData`][id] == undefined) lib.config[`${this.dz}charData`][id] = {};
    lib.config[`${dzxy.dz}charData`][id][key] = value;
    this.saveCF('charData');
  }
  addLongPress(ele, func) {
    var time;
    ele.addEventListener('touchstart', (evt) => {
      time = setTimeout(func, 500);
    });
    ele.addEventListener('touchend', (evt) => {
      clearTimeout(time);
    });
    ele.addEventListener('touchmove', (evt) => {
      clearTimeout(time);
    });
    ele.onmousedown = function (e) {
      if (e.button == 2) {
        func();
      }
    }
  }
  openCharInfoPage(charID, charImg, packID) {
    let bg = dzxy.create.bigBg(document.body, 'image/banChar/bg_ss.png');
    dzxy.create.back(bg, () => {
      bg.remove();
    });
    let frame = dzxy.create.setFrame(bg);
    let ltStyle = {
      'default': '默认',
      'none': '无',
      'shousha': '手杀',
      'shizhounian': '十周年'
    };
    let item = ui.create.div('.hor-item', frame.cont);
    ui.create.div('.mode-title', '原画露头样式', item, { 'margin-right': '63px' });
    let item2 = ui.create.div('.hor-item', frame.cont);
    ui.create.div('.mode-title', '皮肤露头样式', item2, { 'margin-right': '63px' });
    //武将包调用
    if (packID && dzxy.charPack[packID] != undefined) {
      for (let i in ltStyle) {
        let plan = new DBtn(ui.create.div('.plan-text', ltStyle[i], item));
        plan.setClick(() => {
          plan.active(item);
          for (let j in dzxy.charPack[packID]) {
            dzxy.setCharData(j, 'loutou', i);
          }
        });

        let plan2 = new DBtn(ui.create.div('.plan-text', ltStyle[i], item2));
        plan2.setClick(() => {
          plan2.active(item2);
          for (let j in dzxy.charPack[packID]) {
            dzxy.setCharData(j, 'skinloutou', i);
          }
        })
      }
      return;
    }


    let charLt = dzxy.getCharData(charID, 'loutou') || 'default';
    let charLt2 = dzxy.getCharData(charID, 'skinloutou') || 'default';
    for (let i in ltStyle) {
      let plan = new DBtn(ui.create.div(charLt == i ? '.plan-text.active' : '.plan-text', ltStyle[i], item));
      plan.setClick(() => {
        plan.active(item);
        dzxy.setCharData(charID, 'loutou', i);
        if (charImg) charImg.dataset.loutou = i == 'default' ? dzxy.getCF('originLoutou') : i;
      })

      let plan2 = new DBtn(ui.create.div(charLt2 == i ? '.plan-text.active' : '.plan-text', ltStyle[i], item2));
      plan2.setClick(() => {
        plan2.active(item2);
        dzxy.setCharData(charID, 'skinloutou', i);
      })
    }
    let skillsBox = ui.create.div('.kdiv.left', frame.cont);
    let skills = dzxy.getSkill(charID);
    let innerSkill = '';
    skills[0].forEach(i => {
      innerSkill += `<p><span style="font-size:18px;font-family:shousha;color:#e1ed2e;text-shadow: none;">${get.translation(i)}: </span><span style="font-size:18px;font-family:shousha;color:#dcf3de;text-shadow: none;">${get.translation(i + '_info')}</span></p>`;
    });
    skills[1].forEach(i => {
      innerSkill += `<p><span style="font-size:18px;font-family:shousha;color:#e1ed2e;text-shadow: none;">※${get.translation(i)}: </span><span style="font-size:18px;font-family:shousha;color:#dcf3de;text-shadow: none;">${get.translation(i + '_info')}</span></p>`;
    });
    skillsBox.innerHTML = innerSkill;
  }
  playAudio(ext, path) {
    let audio = document.createElement('audio');
    let ext2, path2;
    if (arguments.length == 1) { ext2 = '斗转星移'; path2 = ext; }
    else { ext2 = ext; path2 = path }
    audio.src = `${lib.assetURL}extension/${ext2}/${path2}`;
    audio.autoplay = true;
    audio.volume = lib.config.volumn_audio / 8;
    audio.onended = (event) => audio.remove();
    audio.onerror = (event) => {
      audio.remove();
    };
  }
  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time != undefined ? time : 10));
  };
  getDate(date) {
    switch (date) {
      case 'nyr':
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        return { year: year, month: month, day: day }
    }
  }
  /**防抖 */
  debounce(func, delay) {
    let timer = null;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    };
  }
  /**节流 */
  throttle(func, delay) {
    let lastTime = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= delay) {
        func.apply(this, args);
        lastTime = now;
      }
    };
  }
  /**dzxy.deleteDzxyConfig() */
  deleteDzxyConfig() {
    let config = lib.config;
    for (let i in config) {
      if (!i.startsWith('extension_斗转星移')) continue;
      game.saveConfig(i, undefined)
    }
  }
}
export default window.dzxy = new Dzxy();