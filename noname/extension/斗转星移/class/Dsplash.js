import { lib, game, ui, get, ai, _status, Library } from "../../../noname.js";
import { DefaultSplash } from "../../../noname/init/onload/default-splash.js";
import { DBtn } from "./baseEle.js";
import { WuJiang_groupBtn } from "./Char_skin.js";
import dzxy from "./dzxy.js";
import { PropDiv, Props, propToast } from "./public.js";
import { GradeImg } from "./PWGrade.js";
import { ScreenAdapter } from "./ScreenAdapter.js";
// import { dpixi, Dpixi } from "./Dpixi.js";

export class Dsplash extends DefaultSplash {
  id = "dzxyStyle";
  name = "斗转星移";
  mainBg;
  currentMode;
  /**模式排序的记录 */
  initData_Mode() {
    dzxy.initCF('splashMode', {
      modes: lib.config.all.mode,//调整排序后的模式
      initModeName: lib.config.all.mode[0],//最后一次模式记录，目前没用
    });
    let splashMode = dzxy.getCF('splashMode');
    splashMode.modes.addArray(lib.config.all.mode);
    dzxy.saveCF('splashMode');
  }
  /**签到数据 */
  initData_checkIn() {
    let nowDate = dzxy.getDate('nyr');

    let CheckInInfo = dzxy.getCF('dailyCheckIn');
    if (CheckInInfo == undefined) {
      let value = {
        year: 0,
        month: 0,
        day: 0,
        days: 0,//累计签到
        gainEx: [],
      }
      dzxy.saveCF('dailyCheckIn', value);
    }
    CheckInInfo = dzxy.getCF('dailyCheckIn');
    if (CheckInInfo.year != nowDate.year || CheckInInfo.month != nowDate.month) {
      CheckInInfo.days = 0;
      CheckInInfo.gainEx = [];
    }
    dzxy.saveCF('dailyCheckIn');
  }
  /**包裹数据 */
  initData_package() {
    dzxy.initCF('package', {});
  }
  initData_all() {
    this.initData_package();
    this.initData_Mode();
    this.initData_checkIn();
  }
  async init(node, resolve) {
    //主背景
    this.mainBg = node;
    this.mainBg.id = 'dzxy-splash';
    this.mainBg.setBackgroundImage(`${dzxy.path}image/banChar/bg_ss.png`);
    ScreenAdapter.add({
      node: this.mainBg,
      callback: (node,scale) => {
        node.style.zoom = scale;
      }
    })
    // this.resolve = resolve;
    this.resolve = (...args) => {
      // dpixi.destroy();
      resolve(...args);
    }
    //模式按钮容器
    this.modeCont = ui.create.div('.dz-mode-cont', this.mainBg);
    let modeBtns = ui.create.div('.dz-mode-btns', this.modeCont);
    let initMode = null;

    let splashMode = dzxy.getCF('splashMode');

    for (let i = 0; i < splashMode.modes.length; i++) {
      let modeName = splashMode.modes[i];
      if (!lib.config.all.mode.includes(modeName)) continue;
      let mode = new DBtn(ui.create.div('.mode-btn-ditu', modeBtns));
      mode.index = i;
      mode.name = modeName;
      mode.btnImg = ui.create.div('.mode-btn-bg', mode.ele);
      mode.textNode = ui.create.div('.dz-mode-btn-text', get.translation(mode.name), mode.ele);
      mode.textNode.dataset.text = get.translation(mode.name);

      mode.bigBgDitu = ui.create.div('.dz-mode-bigBg-ditu.not-display', this.mainBg);
      mode.bigBg = ui.create.div('.mode-bigBg', mode.bigBgDitu);
      mode.bigBg.setBackgroundImage(`${dzxy.path}image/splash/modeBg/${mode.name}.jpg`);
      mode.setClick(() => {
        dzxy.playAudio('audio/base/Label.mp3');
        if (typeof this[mode.name] == "function") this[mode.name](mode);
        else this.click(mode);
      });
      dzxy.addLongPress(mode.ele, () => {
        let result = confirm('是否将此模式置顶？');
        if (result) {
          modeBtns.insertBefore(mode.ele, modeBtns.firstChild);
        }
        let allMode = modeBtns.querySelectorAll('.mode-btn-ditu');
        let list = [];
        for (let i of allMode) {
          list.add(i.source.name);
        }
        let splashMode = dzxy.getCF('splashMode');
        splashMode.modes = list;
        dzxy.saveCF('splashMode');
      })
      if (!initMode) initMode = mode;
    }
    if (typeof this[initMode.name] == "function") this[initMode.name](initMode);
    else this.click(initMode);

    //
    this.ltBtns = ui.create.div('.left-top-btns', this.mainBg);
    //签到
    let signin = ui.create.div('.gn-btn-ditu', this.ltBtns);
    ui.create.div('.btn-bg', signin);
    ui.create.div('.btn-img', signin).setBackgroundImage(`${dzxy.path}image/splash/4007.png`);
    //签到
    signin.addEventListener('click', () => {
      this.subPageFunc.signin();
    });
    //包裹
    let packagee = ui.create.div('.gn-btn-ditu', this.ltBtns);
    ui.create.div('.btn-bg', packagee);
    ui.create.div('.btn-img', packagee).setBackgroundImage(`${dzxy.path}image/splash/4010.png`);
    packagee.addEventListener('click', () => {
      this.subPageFunc.packagee();
    });
  }
  /**页面功能按钮实现块 */
  subPageFunc = {
    /**签到 */
    signin: () => {
      //界面
      let subBg = dzxy.create.bigBg(this.mainBg, 'image/banChar/bg_ss.png');
      dzxy.create.back(subBg, () => subBg.delete());
      let freme = ui.create.div('.public-base1-frm', subBg);
      freme.cont = ui.create.div('.dz-fcont', freme);
      freme.classList.add('dz-zoomIn');
      freme.titlex = ui.create.div('.dz-ftitle', freme);

      let dialog = dzxy.create.dialog(freme.cont);
      dialog.props = ui.create.div('.dz-props', dialog.cont);
      //道具块
      let propNodeList = [];
      let allDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      for (let i = 0; i < allDays; i++) {
        let prop = new PropDiv('shenmibaoxiang', 1);
        prop.ele.style.transform = 'scale(0.8)';
        prop.showType('sign');
        prop.setParentNode(dialog.props);
        propNodeList.push(prop);
        prop.ele.addEventListener('click', (e) => {
          let sx = prop.getSX();
          let tip = dzxy.create.skillTip(`<span style="color: #d7e428;;">${sx.name}</span><br>${sx.intro}`, e, subBg, {});
          tip.frame.style.padding = '10px';
          tip.frame.style.fontSize = '16px';
          tip.frame.style.transition = 'all 0s';
          tip.classList.remove('dz-bigBg-skill');
        });
      }
      //签到状态
      let CheckInInfo = dzxy.getCF('dailyCheckIn');
      dialog.titlex.innerHTML = `${CheckInInfo.month}月已经累计签到<span style="color: #e5d9d9;text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black,0 0 1px black;">${CheckInInfo.days}</span>天`;
      for (let i = 0; i < CheckInInfo.days; i++) {
        propNodeList[i].signin();
      }
      let nowDate = dzxy.getDate('nyr');

      if (CheckInInfo.year != nowDate.year || CheckInInfo.month != nowDate.month || CheckInInfo.day != nowDate.day) {
        propNodeList[CheckInInfo.days].active('jinri');
      }
      //累积签到
      let rightArea = ui.create.div('.right-area', freme.cont);
      function updataExprops() {
        rightArea.innerHTML = '';
        let CheckInInfo = dzxy.getCF('dailyCheckIn');
        let ext = [
          {
            propList: [
              { propID: 'shenmibaoxiang', count: 1 },
              { propID: 'shenmibaoxiang', count: 1 },
              { propID: 'shenmibaoxiang', count: 1 },
            ],
            days: 3
          },
          {
            propList: [
              { propID: 'shenmibaoxiang', count: 1 },
              { propID: 'shenmibaoxiang', count: 1 },
              { propID: 'shenmibaoxiang', count: 1 },
            ],
            days: 7
          },
          {
            propList: [
              { propID: 'shenmibaoxiang', count: 1 },
              { propID: 'shenmibaoxiang', count: 1 },
              { propID: 'shenmibaoxiang', count: 1 },
            ],
            days: 15
          },
        ];
        for (let i of ext) {
          let row = ui.create.div('.reward-row', rightArea);
          let propDivList = [];
          for (let j of i.propList) {
            let prop = new PropDiv(j.propID, j.count);
            prop.ele.style.transform = 'scale(0.8)';
            prop.showType('sign2');
            prop.setParentNode(row);
            propDivList.push(prop);
          }
          let reminder = ui.create.div('.sign-reminder', rightArea);
          reminder.days = i.days;
          reminder.propDivList = propDivList;
          reminder.text = ui.create.div('.reminder-text', '在签' + (i.days - CheckInInfo.days) + '天可领取', reminder);
          reminder.btn = ui.create.div('.public-btn-bg', '领取', reminder);
          reminder.btn.propList = i.propList;
          reminder.btn.addEventListener('click', () => {
            for (let p = 0; p < i.propList.length; p++) {
              let pr = i.propList[p];
              propToast.addToast(pr.propID, pr.count);
            }
            let CheckInInfo = dzxy.getCF('dailyCheckIn');
            CheckInInfo.gainEx.add(i.days);
            dzxy.saveCF('dailyCheckIn');
            updataExprops();
          });
        }

        let divs = subBg.querySelectorAll('.sign-reminder');
        for (let i of divs) {
          i.text.hide();
          i.btn.hide();
          if (CheckInInfo.days >= i.days) {
            i.btn.show();
          }
          else {
            i.text.show();
          }
          if (CheckInInfo.gainEx.includes(i.days)) {
            i.btn.innerHTML = '已领取';
            for (let p of i.propDivList) {
              p.signin();
            }
            i.btn.classList.add('dz-gray', 'dz-noclick');
          }
        }
      }
      updataExprops();
      //签到按钮
      dialog.sign = ui.create.div('.sign-btn', dialog.cont);
      dialog.sign.addEventListener('click', (e) => {
        CheckInInfo = dzxy.getCF('dailyCheckIn');

        if (CheckInInfo.year == nowDate.year && CheckInInfo.month == nowDate.month && CheckInInfo.day == nowDate.day) {
          dzxy.create.bottomBarTip('今日已签到！', subBg);
          return;
        }
        if (CheckInInfo.days >= propNodeList.length) return;

        let nowProp = propNodeList[CheckInInfo.days];
        nowProp.signin();
        propToast.addToast(nowProp.ID, nowProp.count);
        CheckInInfo.days++;
        Object.assign(CheckInInfo, nowDate);
        dzxy.saveCF('dailyCheckIn');
        dialog.titlex.innerHTML = `${CheckInInfo.month}月已经累计签到<span style="color: #e5d9d9;text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black,0 0 1px black;">${CheckInInfo.days}</span>天`;
        updataExprops()
      });
      dialog.signText = ui.create.div('.sign-text', dialog.sign);
    },
    /**包裹 */
    packagee: () => {
      let subBg = dzxy.create.bigBg(this.mainBg, 'image/banChar/bg_ss.png');
      subBg.id = 'package-page';
      dzxy.create.back(subBg, () => subBg.delete());

      let btns = ui.create.div('.wujiang-group-btns', subBg);
      let btnsmap = {
        daoju: '道具',
        cailiao: '材料',
        lihe: '礼盒',
        shangdian: '商店',
      };

      let sortProp = Props.sort();
      let btnCilck = (btn) => {
        nowBtn = btn;
        btn.active(btns);
        dialog.cont2.innerHTML = '';
        for (let i of btn.list) {
          let icount = Props.getCount(i.id);

          if (!icount && !i.display) continue;

          let prop = new PropDiv(i.id, icount);
          prop.ele.addEventListener('click', () => {
            dzxy.playAudio('audio/base/TinyWindow.mp3');
            let propUseBg = dzxy.create.bigBg(subBg, true, () => { propUseBg.delete() });
            let frame = dzxy.create.setFrame(propUseBg, '470px', '240px');
            frame.cont.style.overflow = 'hidden';
            frame.leftArea = ui.create.div('.prop-left-area', frame.cont);
            frame.rightArea = ui.create.div('.prop-right-area', frame.cont);
            let cprop = new PropDiv(prop.ID, icount);
            cprop.setParentNode(frame.leftArea);
            cprop.showType('package2');

            let SX = prop.getSX();
            //介绍
            let intro = ui.create.div('.prop-intro', frame.rightArea);
            intro.innerHTML = SX.intro;
            //使用
            let use = ui.create.div('.prop-use', frame.rightArea);
            let use_1, use_2;
            if (typeof SX.useAll == 'function') {
              use_1 = ui.create.div('.public-btn-bg', '全部使用', use);
              use_1.dataset.type = '8';
              use_1.addEventListener('click', () => {
                let bool = SX.useAll();
                btnCilck(nowBtn);
                propUseBg.remove();
                if (bool != false) dzxy.create.bottomBarTip(`使用道具${SX.name}成功`, subBg);
              })
            }
            if (typeof SX.use == 'function') {
              use_2 = ui.create.div('.public-btn-bg', '使&nbsp;&nbsp;&nbsp;用', use);
              use_2.dataset.type = '7';
              use_2.addEventListener('click', () => {
                let bool = SX.use();
                btnCilck(nowBtn);
                propUseBg.remove();
                if (bool != false) dzxy.create.bottomBarTip(`使用道具${SX.name}成功`, subBg);
              })
            }
          });
          prop.showType('package');
          prop.setParentNode(dialog.cont2);
        }
      }
      let nowBtn, hasnowBtn = false;
      for (let i in btnsmap) {
        let btn = new WuJiang_groupBtn(i, btnsmap[i]);
        if (!hasnowBtn) {
          nowBtn = btn;
          hasnowBtn = true;
        }
        btn.setParentNode(btns);
        btn.ele.addEventListener('click', () => { btnCilck(btn) });
        //待处理
        btn.list = [];
        if (sortProp[i]) {
          for (let j in sortProp[i]) {
            btn.list.add(sortProp[i][j]);
          }
        }
      }

      let dialog = dzxy.create.dialog(subBg);
      dialog.cont2 = ui.create.div('.dz-grid-container', dialog.cont);

      btnCilck(nowBtn);

    },
  };
  TX = {};
  preclick(mode) {
    // dpixi.stopSpineAll();
    if (this.currentMode) this.currentMode.bigBgDitu.classList.add('not-display');
    mode.bigBgDitu.classList.remove('not-display');
    this.currentMode = mode;
    mode.active(this.mainBg);
    if (!mode.loaded) {
      mode.loaded = this.currentMode.bigBgDitu;
      return false;
    }
    return true;
  }
  async click(mode) {
    let loaded = this.preclick(mode);

    if (!loaded) {
      mode.kaizhan = ui.create.div('.dz-kaizhan', mode.bigBgDitu);
      mode.kaizhan.addEventListener('click', () => {
        this.resolve(mode.name);
      });
    };
    try {
      if (!this.TX.kaizhan) {
        // dpixi.loadSpine('splash/kaizhan', "json", () => {
        //   this.TX.kaizhan = dpixi.playSpine('splash/kaizhan', {
        //     complete: (entry) => {
        //       entry.setAction('jingzhi', true);
        //     }, parent: mode.kaizhan, action: "kaishi", loop: false, scale: 0.5
        //   });
        // }, () => {
        //   console.log('加载失败');
        // });
        await dpixi.loadSpine('splash/kaizhan', "json");
        this.TX.kaizhan = dpixi.playSpine('splash/kaizhan', {
          complete: (entry) => {
            entry.setAction('jingzhi', true);
          }, parent: mode.kaizhan, action: "kaishi", loop: false, scale: 0.5,
        });
      } else {
        this.TX.kaizhan.play({ parent: mode.kaizhan });
      }
    } catch (error) {
      mode.kaizhan.classList.add('dz-show');
    }

  }
  /**对决模式 */
  versus(mode) {
    if (this.preclick(mode)) return;
    let blackBg = ui.create.div('.dz-blackBg', mode.bigBgDitu);

    let enterBtns = ui.create.div('.jj-pw-enter-btns', blackBg);
    let enterBtn1 = ui.create.div('.jj_match_btn_bg', enterBtns);
    enterBtn1.addEventListener('click', () => {
      game.saveConfig('two_assign', false, mode.name);
      game.saveConfig('versus_mode', 'two', 'versus');
      this.resolve(mode.name);
    });
    ui.create.div('.jj_txt_match.one', enterBtn1);

    let enterBtn2 = ui.create.div('.jj_match_btn_bg', enterBtns);
    enterBtn2.addEventListener('click', () => {
      game.saveConfig('two_assign', true, mode.name);
      game.saveConfig('versus_mode', 'two', 'versus');
      this.resolve(mode.name);
    });
    ui.create.div('.jj_txt_match.two', enterBtn2);

    let gradeImg = new GradeImg();
    gradeImg.setParentNode(blackBg);
  }
  /**身份模式 */
  async identity(mode) {
    let loaded = this.preclick(mode);
    if (!loaded) {
      let center = ui.create.div('.dz-menu-center', mode.bigBgDitu);

      let jingdian = this.creatSubMode('jingdian', '八人身份场', 'subModeBg/identity_1.jpg', center, {
        top: 0,
        left: 0,
      }, () => {
        game.saveConfig('identity_mode', 'normal', 'identity');
        game.saveConfig('player_number', 8, 'identity');
        this.resolve(mode.name);
      });

      let paiwei = this.creatSubMode('paiwei', '五人身份场', 'subModeBg/identity_2.jpg', center, {
        top: 0,
        left: '265px'
      }, () => {
        game.saveConfig('identity_mode', 'normal', 'identity');
        game.saveConfig('player_number', 5, 'identity');
        this.resolve(mode.name);
      });

      let doudizhu = this.creatSubMode('doudizhu', '明忠', 'subModeBg/identity_3.jpg', center, {
        left: '473px',
        bottom: '50%'
      }, () => {
        game.saveConfig('identity_mode', 'zhong', 'identity');
        this.resolve(mode.name);
      });

      let huodong = this.creatSubMode('huodong', '谋攻', 'subModeBg/identity_4.jpg', center, {
        left: '473px',
        top: '50%'
      }, () => {
        game.saveConfig('identity_mode', 'stratagem', 'identity');
        this.resolve(mode.name);
      });

      let zhengzhan = this.creatSubMode('zhengzhan', '3V3V2', 'subModeBg/identity_5.jpg', center, {
        top: '50%',
        left: '567px'
      }, () => {
        game.saveConfig('identity_mode', 'purple', 'identity');
        this.resolve(mode.name);
      });
    };
  }
  /**斗地主 */
  async doudizhu(mode) {
    let loaded = this.preclick(mode);
    if (!loaded) {
      let center = ui.create.div('.dz-menu-center', mode.bigBgDitu);

      let jingdian = this.creatSubMode('jingdian', '欢乐', 'subModeBg/doudizhu_1.jpg', center, {
        top: 0,
        left: 0,
      }, () => {
        game.saveConfig('doudizhu_mode', 'huanle', 'doudizhu');
        this.resolve(mode.name);
      });

      let paiwei = this.creatSubMode('paiwei', '休闲', 'subModeBg/doudizhu_2.jpg', center, {
        top: 0,
        left: '265px'
      }, () => {
        game.saveConfig('doudizhu_mode', 'normal', 'doudizhu');
        this.resolve(mode.name);
      });

      let doudizhu = this.creatSubMode('doudizhu', '开黑', 'subModeBg/doudizhu_3.jpg', center, {
        left: '473px',
        bottom: '50%'
      }, () => {
        game.saveConfig('doudizhu_mode', 'kaihei', 'doudizhu');
        this.resolve(mode.name);
      });

      let huodong = this.creatSubMode('huodong', '智斗', 'subModeBg/doudizhu_4.jpg', center, {
        left: '473px',
        top: '50%'
      }, () => {
        game.saveConfig('doudizhu_mode', 'online', 'doudizhu');
        this.resolve(mode.name);
      });

      let zhengzhan = this.creatSubMode('zhengzhan', '兵临', 'subModeBg/doudizhu_5.jpg', center, {
        top: '50%',
        left: '567px'
      }, () => {
        game.saveConfig('doudizhu_mode', 'binglin', 'doudizhu');
        this.resolve(mode.name);
      });
    };
  }
  /**
   * 创建子模式
   * @param {*} type 类型
   * @param {*} text 插入文本
   * @param {*} imgPath 图片位置
   * @param {*} parentNode 
   * @param {*} style style样式控制
   * @param {*} callback 点击
   * @returns 
   */
  creatSubMode(type, text, imgPath, parentNode, style, callback) {
    let node = ui.create.div(`.dz-${type}-box`, parentNode);
    node.addEventListener('click', callback);
    Object.assign(node.style, style);
    node.img = ui.create.div('.dimg', node);
    node.img.setBackgroundImage(`${dzxy.path}image/splash/${imgPath}`);
    node.frame = ui.create.div('.dframe', node);
    node.text = ui.create.div('.dtext', node);
    node.text.dataset.text = text;
    node.text.innerHTML = text;
    return node;
  }

  async dispose(node) {
    return false;
  }
  preview(node) {
    node.className = "button character";
    node.style.width = "200px";
    node.style.height = `${(node.offsetWidth * 1080) / 2400}px`;
    node.style.display = "flex";
    node.style.flexDirection = "column";
    node.style.alignItems = "center";
    node.style.backgroundSize = "100% 100%";
    node.setBackgroundImage(`extension/斗转星移/image/splash/preview.jpg`);
  }
}
let dsplash = new Dsplash();
dsplash.initData_all();
lib.onloadSplashes.push(dsplash);
export { dsplash }