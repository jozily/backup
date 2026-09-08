game.import("extension", function(lib, game, ui, get, ai, _status) {
  return {
    name: "中立者完整版",
    editable: false,
    
    precontent: function() {
      // 添加中立势力
      if (!lib.group) lib.group = [];
      if (!lib.group.includes("zhongli")) {
        lib.group.push("zhongli");
      }
      
      if (!lib.groupnature) lib.groupnature = {};
      lib.groupnature.zhongli = "thunder";
      
      if (!lib.config.sgn_color) lib.config.sgn_color = {};
      lib.config.sgn_color.zhongli = "#9966ff";
    },
    
    content: function(config, pack) {
      if (!lib.characterPack.mode_guozhan) return;

      // 势力翻译
      lib.translate.zhongli = "☯";
      lib.translate.zhongli2 = "中立";
      
      // 武将名称
      lib.translate.gz_zhongli_xushu = "徐庶";
      lib.translate.gz_zhongli_xushao = "许劭";
      lib.translate.gz_zhongli_lusu = "鲁肃";
      lib.translate.gz_zhongli_zhaoe = "赵娥";
      lib.translate.gz_zhongli_jiaxu = "贾诩";

      // 添加武将包
      if (!lib.characterSort.mode_guozhan) lib.characterSort.mode_guozhan = {};
      lib.characterSort.mode_guozhan.guozhan_zhongli = [
        "gz_zhongli_xushu",
        "gz_zhongli_xushao",
        "gz_zhongli_lusu",
        "gz_zhongli_zhaoe",
        "gz_zhongli_jiaxu"
      ];

      // 武将数据 - 关键：先设为群势力，让选将时能通过检查
      lib.characterPack.mode_guozhan.gz_zhongli_xushu = ["male", "zhongli", 4, [], ["zhongli_hidden"]];
      lib.characterPack.mode_guozhan.gz_zhongli_xushao = ["male", "zhongli", 3, [], ["zhongli_hidden"]];
      lib.characterPack.mode_guozhan.gz_zhongli_lusu = ["male", "zhongli", 4, [], ["zhongli_hidden"]];
      lib.characterPack.mode_guozhan.gz_zhongli_zhaoe = ["female", "zhongli", 3, [], ["zhongli_hidden"]];
      lib.characterPack.mode_guozhan.gz_zhongli_jiaxu = ["male", "zhongli", 4, [], ["zhongli_hidden"]];

      // 标记技能 - 用于识别这是中立者
      lib.skill.zhongli_hidden = {
        charlotte: true,
        superCharlotte: true,
        ruleSkill: true
      };

      // 游戏开始时转换势力
      lib.skill._zhongli_game_start = {
        trigger: { global: "gameStart" },
        forced: true,
        charlotte: true,
        ruleSkill: true,
        priority: 100,
        filter: function(event, player) {
          return player.hasSkill("zhongli_hidden");
        },
        content: function() {
          "step 0";
          // 修改武将数据中的势力
          if (lib.character[player.name1] && player.name1.indexOf("gz_zhongli_") === 0) {
            lib.character[player.name1][1] = "zhongli";
          }
          if (lib.character[player.name2] && player.name2.indexOf("gz_zhongli_") === 0) {
            lib.character[player.name2][1] = "zhongli";
          }
          
          // 移除标记技能
          player.removeSkill("zhongli_hidden");
          
          // 如果已经亮将，需要更新显示
          if (!player.isUnseen(0) || !player.isUnseen(1)) {
            player.update();
          }
        }
      };

      // 重写玩家方法
      if (lib.element && lib.element.player) {
        // getGuozhanGroup
        if (!lib.element.player._zhongli_getGuozhanGroup) {
          lib.element.player._zhongli_getGuozhanGroup = true;
          var originalGetGuozhanGroup = lib.element.player.getGuozhanGroup;
          
          lib.element.player.getGuozhanGroup = function(num) {
            if (typeof num === 'undefined') num = 0;
            
            if (this.trueIdentity) {
              if (lib.character[this.name1] && lib.character[this.name1][1] != "ye" || num == 1) {
                return this.trueIdentity;
              }
              return "ye";
            }
            
            var group1 = lib.character[this.name1] ? lib.character[this.name1][1] : null;
            var group2 = lib.character[this.name2] ? lib.character[this.name2][1] : null;
            
            // 主将是中立者
            if (group1 === "zhongli") {
              if (group2 && typeof group2 === "string" && group2.indexOf("_") > 0) {
                return this.group || group2.split("_")[0];
              }
              if (num == 1 && group2 && group2 !== "zhongli") {
                return group2;
              }
              return group2 && group2 !== "zhongli" ? group2 : "zhongli";
            }
            
            // 副将是中立者
            if (group2 === "zhongli") {
              return group1;
            }
            
            if (originalGetGuozhanGroup) {
              return originalGetGuozhanGroup.apply(this, arguments);
            }
            
            if (get.is.double(this.name2)) {
              return this.group || lib.character[this.name1][1];
            }
            if (num == 1) {
              return group2;
            }
            return group1;
          };
        }
      }

      // 双势力声明
      lib.skill._zhongli_dual_faction = {
        trigger: { global: "showCharacterAfter" },
        forced: true,
        charlotte: true,
        priority: 20,
        filter: function(event, player) {
          var p = event.player;
          if (!p || !p.isIn()) return false;
          
          var showPos = event.toShow === "name1" ? 0 : 1;
          var showName = p["name" + (showPos + 1)];
          if (!showName || !lib.character[showName]) return false;
          
          var hasNeutral = false;
          if (p.name1 && lib.character[p.name1] && lib.character[p.name1][1] === "zhongli") hasNeutral = true;
          if (p.name2 && lib.character[p.name2] && lib.character[p.name2][1] === "zhongli") hasNeutral = true;
          
          if (!hasNeutral) return false;
          
          var group = lib.character[showName][1];
          return typeof group === "string" && group.indexOf("_") > 0 && !p.trueIdentity;
        },
        content: function() {
          "step 0";
          var p = trigger.player;
          var showPos = trigger.toShow === "name1" ? 0 : 1;
          var showName = p["name" + (showPos + 1)];
          var group = lib.character[showName][1];
          var factions = group.split("_");
          
          event.factions = factions;
          event.target = p;
          
          p.chooseControl(factions).set("prompt", "请选择" + get.translation(showName) + "的唯一所属势力").set("ai", function() {
            return 0;
          });
          
          "step 1";
          if (result && result.control) {
            event.target.trueIdentity = result.control;
            game.log(event.target, "声明了武将势力为", "#y" + get.translation(result.control));
            event.target.popup(get.translation(result.control));
          }
        }
      };

      // 亮将限制
      lib.skill._zhongli_show_first = {
        trigger: { player: "showCharacterBefore" },
        forced: true,
        charlotte: true,
        priority: 100,
        filter: function(event, player) {
          if (player.storage._zhongli_first_shown) return false;
          
          var showPos = event.toShow === "name1" ? 0 : 1;
          var otherPos = showPos === 0 ? 1 : 0;
          
          var showName = player["name" + (showPos + 1)];
          var otherName = player["name" + (otherPos + 1)];
          
          if (!lib.character[showName] || !lib.character[otherName]) return false;
          
          var showGroup = lib.character[showName][1];
          var otherGroup = lib.character[otherName][1];
          
          return showGroup !== "zhongli" && otherGroup === "zhongli" && player.isUnseen(otherPos);
        },
        content: function() {
          trigger.cancel();
          game.log(player, "必须先亮明中立武将牌");
          player.popup("必须先亮中立者");
        }
      };

      // 获得索立
      lib.skill._zhongli_gain_suoli = {
        trigger: { global: "showCharacterAfter" },
        forced: true,
        charlotte: true,
        filter: function(event, player) {
          var p = event.player;
          if (!p || !p.isIn()) return false;
          var showPos = event.toShow === "name1" ? 0 : 1;
          var showName = p["name" + (showPos + 1)];
          return lib.character[showName] && lib.character[showName][1] === "zhongli";
        },
        content: function() {
          var p = trigger.player;
          p.storage._zhongli_first_shown = true;
          p.addSkill("gz_suoli");
          p.addTempSkill("_zhongli_showcd", { player: "phaseAfter" });
          game.log(p, "获得了技能", "#g【索立】");
        }
      };

      lib.skill._zhongli_showcd = {
        charlotte: true,
        mark: true,
        marktext: "禁",
        intro: { content: "本回合不能亮明另一张武将牌" }
      };

      // 索立技能
      lib.skill.gz_suoli = {
        audio: 2,
        enable: "phaseUse",
        usable: 1,
        filterCard: function(card) {
          return get.type(card) === "equip";
        },
        selectCard: 1,
        position: "he",
        filterTarget: function(card, player, target) {
          return target != player;
        },
        content: function() {
          var cards = ["yuanjiao", "lianjun", "luli"];
          var card = cards[Math.floor(Math.random() * cards.length)];
          player.useCard({ name: card }, this.cards, target);
        },
        mod: {
          globalFrom: function(from, to, distance) {
            if (from.hasSkill("gz_suoli")) {
              var factions = [];
              for (var i = 0; i < game.players.length; i++) {
                var g = game.players[i].group;
                if (g && g !== "zhongli" && !factions.includes(g)) {
                  factions.push(g);
                }
              }
              return factions.length;
            }
          },
          globalTo: function(from, to, distance) {
            if (to.hasSkill("gz_suoli")) {
              var factions = [];
              for (var i = 0; i < game.players.length; i++) {
                var g = game.players[i].group;
                if (g && g !== "zhongli" && !factions.includes(g)) {
                  factions.push(g);
                }
              }
              return factions.length;
            }
          }
        },
        ai: {
          order: 7,
          result: { player: 1 }
        }
      };

      // 失去索立
      lib.skill._zhongli_lose_suoli = {
        trigger: { global: "showCharacterAfter" },
        forced: true,
        charlotte: true,
        filter: function(event, player) {
          var p = event.player;
          if (!p || !p.hasSkill("gz_suoli")) return false;
          
          if (p.isUnseen(0) || p.isUnseen(1)) return false;
          
          var group1 = lib.character[p.name1] ? lib.character[p.name1][1] : null;
          var group2 = lib.character[p.name2] ? lib.character[p.name2][1] : null;
          
          return (group1 === "zhongli" && group2 && group2 !== "zhongli") ||
                 (group2 === "zhongli" && group1 && group1 !== "zhongli");
        },
        content: function() {
          trigger.player.removeSkill("gz_suoli");
          game.log(trigger.player, "势力已确定，失去了", "#g【索立】");
        }
      };

      // 技能说明
      lib.translate.gz_suoli = "索立";
      lib.translate.gz_suoli_info = "①你与其他角色的距离+X，其他角色与你的距离+X（X为场上已确定势力数）。②出牌阶段限一次，你可以将一张装备牌当作【远交近攻】、【联军盛宴】或【戮力同心】使用。③当你确定势力后，失去此技能。";
    },

    help: {},
    config: {},
    package: {
      character: {},
      card: {},
      skill: {},
      intro: "☯ 中立势力扩展。选将时显示为群势力，游戏开始后变为中立。",
      author: "Claude & User",
      diskURL: "",
      forumURL: "",
      version: "1.9.0"
    },
    files: { character: [], card: [], skill: [] }
  };
});