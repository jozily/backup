import { lib, game, ui, get, ai, _status } from "../../noname.js";
export const type = "extension";
export default function(){
	return {name:"学园都市",arenaReady:function(){
    
},content:function(config,pack){


    
     if (!lib.nature.has('wind')) {
                lib.nature.add('wind');
            }
            
            // 风属性的翻译
            lib.translate.wind_nature = '风';
               // 风属性标签
    if (!lib.naturetag) lib.naturetag = {};
    lib.naturetag.wind = 1;
    
    // 风属性连环传导（重要！）
    if (!lib.linked) lib.linked = [];
    if (!lib.linked.includes('wind')) {
        lib.linked.push('wind');
    }
    
    // 风属性伤害加成
    if (!lib.natureAudio) lib.natureAudio = {};
    lib.natureAudio.wind = true;
    
    // 风属性伤害计算
    if (!lib.natureDamage) lib.natureDamage = {};
    lib.natureDamage.wind = function(player, viewer) {
        // 风属性基础伤害
        return 1;
    };
    
    // 风属性效果
    if (!lib.natureEffect) lib.natureEffect = {};
    lib.natureEffect.wind = function(event) {
        // 风属性可以传导
        if (event.player && event.player.isLinked()) {
            return true;
        }
        return false;
    };
    
    // 确保风属性可以被铁索连环传导
    lib.configOL.link_nature = lib.configOL.link_nature || [];
    if (!lib.configOL.link_nature.includes('wind')) {
        lib.configOL.link_nature.push('wind');
    }
            // 风属性的颜色（青色/绿色）
            lib.natureBg.wind = [0, 255, 150]; // RGB颜色
            
            // 风属性的特效动画
            lib.skill._wind_damage = {
                trigger: {
                    source: "damageBegin1",
                },
                filter: function(event, player) {
                    return event.nature && event.nature.includes('wind');
                },
                forced: true,
                popup: false,
                priority: 15,
                content: function() {
                    // 风属性伤害动画
                    game.broadcastAll(function(target) {
                        // 1. 播放风属性音效
                        game.playAudio('effect', 'fengche');
                        
                        // 2. 目标角色的风属性特效
                        target.$wind();
                        
                        // 3. 额外的风旋特效
                        for (var i = 0; i < 8; i++) {
                            setTimeout(function() {
                                var particle = ui.create.div('.damage', target.parentNode);
                                particle.innerHTML = '🌪️';
                                particle.style.left = (target.offsetLeft + Math.random() * 100 - 50) + 'px';
                                particle.style.top = (target.offsetTop + Math.random() * 100 - 50) + 'px';
                                particle.style.fontSize = (20 + Math.random() * 15) + 'px';
                                particle.style.opacity = '1';
                                particle.style.transition = 'all 0.8s ease-out';
                                
                                setTimeout(function() {
                                    particle.style.opacity = '0';
                                    particle.style.transform = 'translateY(-50px) rotate(360deg)';
                                }, 100);
                                
                                setTimeout(function() {
                                    particle.delete();
                                }, 900);
                            }, i * 100);
                        }
                        
                        // 4. 屏幕闪烁效果（青绿色）
                        var flash = ui.create.div('.fullscreen', ui.window);
                        flash.style.backgroundColor = 'rgba(0, 255, 150, 0.3)';
                        flash.style.zIndex = 100;
                        setTimeout(function() {
                            flash.style.backgroundColor = 'rgba(100, 255, 200, 0.15)';
                        }, 100);
                        setTimeout(function() {
                            flash.delete();
                        }, 200);
                        
                    }, trigger.player);
                },
            };
            
            // 风属性的效果：令对方所有非锁定技失效
         lib.skill._wind_effect = {
    trigger: {
        source: "damageBegin4",
    },
    filter: function(event, player) {
        return event.nature && event.nature.includes('wind') && event.player && event.player.isIn();
    },
    forced: true,
    popup: false,
    priority: 10,
    content: function() {
        "step 0";
        var target = trigger.player;
        event.target = target;
        
        // 显示风属性特效
game.broadcastAll(function(player, target) {
    // 创建淡蓝色风的粒子效果
    if (target && target.isIn()) {
        var node = ui.create.div('.wind-seal-effect', target.parentNode);
        node.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
        `;
        
        // 创建风的粒子
        for (var i = 0; i < 30; i++) {
            var particle = ui.create.div('.wind-particle', node);
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 25px;
                background: linear-gradient(to bottom, 
                    rgba(173,216,230,0.9), 
                    rgba(135,206,250,0.6), 
                    transparent);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                transform: rotate(${30 + Math.random() * 30}deg);
                animation: wind-blow ${0.6 + Math.random() * 0.4}s ease-out forwards;
                animation-delay: ${Math.random() * 0.3}s;
                box-shadow: 0 0 5px rgba(173,216,230,0.5);
            `;
        }
        
        // 风旋涡
        var vortex = ui.create.div('.wind-vortex', node);
        vortex.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: 80%;
            height: 80%;
            transform: translate(-50%, -50%);
            border: 3px solid rgba(173,216,230,0.6);
            border-radius: 50%;
            animation: wind-vortex 1s ease-out forwards;
            box-shadow: 
                0 0 20px rgba(173,216,230,0.8),
                inset 0 0 20px rgba(135,206,250,0.5);
        `;
        
        // 添加动画样式
        if (!document.getElementById('wind-seal-style')) {
            var style = document.createElement('style');
            style.id = 'wind-seal-style';
            style.innerHTML = `
                @keyframes wind-blow {
                    0% {
                        opacity: 0;
                        transform: translateX(-20px) rotate(30deg);
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        transform: translateX(100px) rotate(60deg);
                    }
                }
                @keyframes wind-vortex {
                    0% {
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1.5) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(function() {
            node.delete();
        }, 1500);
    }
}, player, target);

  /*  全屏铁链特效
  game.broadcastAll(function(player, target) {
    // 创建铁链禁锢效果
    if (target && target.isIn()) {
        var node = ui.create.div('.chain-seal-effect', target.parentNode);
        node.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
        `;
        
        // 创建多条铁链
        for (var i = 0; i < 5; i++) {
            var chain = ui.create.div('.chain', node);
            chain.style.cssText = `
                position: absolute;
                width: 120%;
                height: 3px;
                background: linear-gradient(90deg, 
                    transparent, 
                    #666 10%, 
                    #999 20%, 
                    #666 30%, 
                    #999 40%, 
                    #666 50%, 
                    #999 60%, 
                    #666 70%, 
                    #999 80%, 
                    #666 90%, 
                    transparent
                );
                box-shadow: 0 0 5px rgba(0,0,0,0.8), 0 2px 3px rgba(0,0,0,0.5);
                left: -10%;
                top: ${20 + i * 15}%;
                transform: rotate(${-5 + i * 2}deg);
                animation: chain-tighten 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                animation-delay: ${i * 0.1}s;
                opacity: 0;
            `;
        }
        
        // 创建锁扣
        var lock = ui.create.div('.lock', node);
        lock.innerHTML = '🔒︎';
        lock.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            font-size: 50px;
            filter: drop-shadow(0 0 10px rgba(0,0,0,0.8));
            animation: lock-appear 0.4s ease-out 0.5s forwards;
        `;
        
        // 添加动画样式
        if (!document.getElementById('chain-seal-style')) {
            var style = document.createElement('style');
            style.id = 'chain-seal-style';
            style.innerHTML = `
                @keyframes chain-tighten {
                    0% {
                        transform: translateX(-100%) rotate(0deg);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(0) rotate(var(--rotate, 0deg));
                        opacity: 0.9;
                    }
                }
                @keyframes lock-appear {
                    0% {
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                        opacity: 0;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.3) rotate(10deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1) rotate(0deg);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(function() {
            node.delete();
        }, 1500);
    }
}, player, target);
*/      

/* 血爪全屏特效
game.broadcastAll(function(player, target) {
    // 创建血爪划过效果
    if (target && target.isIn()) {
        var node = ui.create.div('.claw-seal-effect', target.parentNode);
        node.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
            overflow: hidden;
        `;
        
        // 创建3道血爪痕迹
        for (var i = 0; i < 3; i++) {
            var claw = ui.create.div('.claw-mark', node);
            claw.style.cssText = `
                position: absolute;
                width: 8px;
                height: 150%;
                background: linear-gradient(to bottom, 
                    transparent 0%, 
                    rgba(255,0,0,0.3) 10%,
                    rgba(200,0,0,0.8) 30%,
                    rgba(150,0,0,0.9) 50%,
                    rgba(200,0,0,0.8) 70%,
                    rgba(255,0,0,0.3) 90%,
                    transparent 100%
                );
                box-shadow: 
                    0 0 10px rgba(255,0,0,0.8),
                    inset 0 0 5px rgba(100,0,0,0.5);
                left: ${20 + i * 25}%;
                top: -50%;
                transform: rotate(15deg) translateY(-100%);
                animation: claw-slash 0.5s ease-out forwards;
                animation-delay: ${i * 0.08}s;
                opacity: 0;
            `;
        }
        
        // 创建血液飞溅效果
        for (var i = 0; i < 15; i++) {
            var blood = ui.create.div('.blood-splash', node);
            blood.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 5}px;
                height: ${3 + Math.random() * 5}px;
                background: radial-gradient(circle, rgba(255,0,0,0.9), rgba(150,0,0,0.6));
                border-radius: 50%;
                left: ${30 + Math.random() * 40}%;
                top: ${20 + Math.random() * 60}%;
                transform: translate(-50%, -50%);
                animation: blood-splatter 0.6s ease-out forwards;
                animation-delay: ${0.3 + Math.random() * 0.2}s;
                opacity: 0;
            `;
        }
        
        // 添加动画样式
        if (!document.getElementById('claw-seal-style')) {
            var style = document.createElement('style');
            style.id = 'claw-seal-style';
            style.innerHTML = `
                @keyframes claw-slash {
                    0% {
                        transform: rotate(15deg) translateY(-100%);
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(15deg) translateY(100%);
                        opacity: 0.8;
                    }
                }
                @keyframes blood-splatter {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(
                            calc(-50% + ${Math.random() * 60 - 30}px), 
                            calc(-50% + ${Math.random() * 60 - 30}px)
                        ) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(function() {
            node.delete();
        }, 1200);
    }
}, player, target);
*/
        game.delay(0.5);
        
        // 获取目标所有非锁定技
        var skills = target.getSkills(null, false, false);
        var sealSkills = [];
        
        for (var i = 0; i < skills.length; i++) {
            var skill = skills[i];
            var info = get.info(skill);
            
            // 跳过锁定技、系统技能、charlotte技能
            if (!info) continue;
            if (info.forced || info.locked) continue;
            if (info.charlotte || info.hiddenSkill || info.superCharlotte) continue;
            if (skill.startsWith('_')) continue;
            
            sealSkills.push(skill);
        }
        
        if (sealSkills.length > 0) {
            event.sealSkills = sealSkills;
            game.log(target, "的", sealSkills.length, "个技能被", "#g风属性伤害", "封印");
        } else {
            event.finish();
        }
        
        "step 1";
        // 添加封印技能
        if (!event.target.hasSkill('fengyin')) {
            event.target.addTempSkill('fengyin', {player: 'damageAfter'});
        }
        if (!event.target.storage.fengyin) {
            event.target.storage.fengyin = [];
        }
        
        // 添加所有非锁定技到封印列表
        for (var i = 0; i < event.sealSkills.length; i++) {
            if (!event.target.storage.fengyin.includes(event.sealSkills[i])) {
                event.target.storage.fengyin.push(event.sealSkills[i]);
            }
        }
        
        event.target.markSkill('fengyin');
    },
};

      // 在 content 函数中添加
lib.element.player.$wind = function() {
    // 风属性动画
    game.broadcastAll(function(player) {
        // 创建风旋效果
        var wind = ui.create.div('.damage', player.parentNode);
        wind.innerHTML = '🍃';
        wind.style.left = player.offsetLeft + 'px';
        wind.style.top = player.offsetTop + 'px';
        wind.style.fontSize = '80px';
        wind.style.opacity = '0.8';
        wind.style.transition = 'all 1s ease-out';
        wind.style.transform = 'rotate(0deg)';
        
        setTimeout(function() {
            wind.style.transform = 'rotate(720deg) scale(2)';
            wind.style.opacity = '0';
        }, 50);
        
        setTimeout(function() {
            wind.delete();
        }, 1050);
        
        // 角色震动效果
        if (lib.config.touchscreen) {
            game.vibrate(150);
        }
        
        // 角色闪烁效果
        player.node.avatar.style.transition = 'all 0.3s';
        player.node.avatar.style.filter = 'brightness(1.5) hue-rotate(120deg)';
        
        setTimeout(function() {
            player.node.avatar.style.filter = '';
        }, 300);
        
    }, this);
};
  if (!lib.cardPack.mode_extension_学园都市) {
        lib.cardPack.mode_extension_学园都市 = [];
    }
    
    // 添加几张风杀到牌堆
    lib.cardPack.mode_extension_学园都市.push(
        ['spade', 7, 'fengsha'],
        ['spade', 8, 'fengsha'],
        ['club', 8, 'fengsha'],
        ['club', 9, 'fengsha'],
        ['heart', 10, 'fengsha'],
        ['diamond', 12, 'fengsha']
    );
    lib.translate.wind = "风";


    // ==================== 水属性伤害系统 ====================
// ==================== 水属性伤害系统 ====================
if (!lib.nature.has('water')) {
    lib.nature.add('water');
}

// 水属性的翻译
lib.translate.water_nature = '水';

// 水属性标签
if (!lib.naturetag) lib.naturetag = {};
lib.naturetag.water = 1;

// 水属性连环传导（重要！）
if (!lib.linked) lib.linked = [];
if (!lib.linked.includes('water')) {
    lib.linked.push('water');
}

// 水属性伤害加成
if (!lib.natureAudio) lib.natureAudio = {};
lib.natureAudio.water = true;

// 水属性伤害计算
if (!lib.natureDamage) lib.natureDamage = {};
lib.natureDamage.water = function(player, viewer) {
    // 水属性基础伤害
    return 1;
};

// 水属性效果
if (!lib.natureEffect) lib.natureEffect = {};
lib.natureEffect.water = function(event) {
    // 水属性可以传导
    if (event.player && event.player.isLinked()) {
        return true;
    }
    return false;
};

// 确保水属性可以被铁索连环传导
lib.configOL.link_nature = lib.configOL.link_nature || [];
if (!lib.configOL.link_nature.includes('water')) {
    lib.configOL.link_nature.push('water');
}

// 水属性的颜色（蓝色）
lib.natureBg.water = [0, 150, 255]; // RGB颜色

// 水属性的特效动画
lib.skill._water_damage = {
    trigger: {
        source: "damageBegin1",
    },
    filter: function(event, player) {
        return event.nature && event.nature.includes('water');
    },
    forced: true,
    popup: false,
    priority: 15,
    content: function() {
        // 水属性伤害动画
        game.broadcastAll(function(target) {
            // 1. 播放水属性音效
            game.playAudio('effect', 'shuijian');
            
            // 2. 目标角色的水属性特效
            target.$water();
            
            // 3. 额外的水滴特效
            for (var i = 0; i < 12; i++) {
                setTimeout(function() {
                    var particle = ui.create.div('.damage', target.parentNode);
                    particle.innerHTML = '💧';
                    particle.style.left = (target.offsetLeft + Math.random() * 100 - 50) + 'px';
                    particle.style.top = (target.offsetTop - 50 + Math.random() * 50) + 'px';
                    particle.style.fontSize = (15 + Math.random() * 10) + 'px';
                    particle.style.opacity = '1';
                    particle.style.transition = 'all 1s ease-in';
                    
                    setTimeout(function() {
                        particle.style.opacity = '0';
                        particle.style.transform = 'translateY(100px)';
                    }, 100);
                    
                    setTimeout(function() {
                        particle.delete();
                    }, 1100);
                }, i * 80);
            }
            
            // 4. 屏幕闪烁效果（蓝色）
            var flash = ui.create.div('.fullscreen', ui.window);
            flash.style.backgroundColor = 'rgba(0, 150, 255, 0.3)';
            flash.style.zIndex = 100;
            setTimeout(function() {
                flash.style.backgroundColor = 'rgba(100, 200, 255, 0.15)';
            }, 100);
            setTimeout(function() {
                flash.delete();
            }, 200);
            
        }, trigger.player);
    },
};

// 水属性的效果：目标需弃置手牌至与体力上限相同，否则伤害+X
lib.skill._water_effect = {
    trigger: {
        source: "damageBegin4",
    },
    filter: function(event, player) {
        return event.nature && event.nature.includes('water') && event.player && event.player.isIn();
    },
    forced: true,
    popup: false,
    priority: 10,
    content: function() {
        "step 0";
        var target = trigger.player;
        event.target = target;
        
        // 显示水属性特效
        game.broadcastAll(function(player, target) {
            // 创建水波纹效果
            if (target && target.isIn()) {
                var node = ui.create.div('.water-seal-effect', target.parentNode);
                node.style.cssText = `
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                // 创建水波纹
                for (var i = 0; i < 5; i++) {
                    var ripple = ui.create.div('.water-ripple', node);
                    ripple.style.cssText = `
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        width: 20%;
                        height: 20%;
                        transform: translate(-50%, -50%);
                        border: 3px solid rgba(0, 150, 255, 0.8);
                        border-radius: 50%;
                        animation: water-ripple 1.5s ease-out forwards;
                        animation-delay: ${i * 0.2}s;
                        box-shadow: 
                            0 0 20px rgba(0, 150, 255, 0.6),
                            inset 0 0 20px rgba(100, 200, 255, 0.4);
                    `;
                }
                
                // 创建水滴
                for (var i = 0; i < 20; i++) {
                    var drop = ui.create.div('.water-drop', node);
                    drop.style.cssText = `
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        background: radial-gradient(circle, 
                            rgba(150, 220, 255, 0.9), 
                            rgba(0, 150, 255, 0.6));
                        border-radius: 50%;
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        animation: water-drop ${0.8 + Math.random() * 0.4}s ease-out forwards;
                        animation-delay: ${Math.random() * 0.5}s;
                        box-shadow: 0 0 8px rgba(0, 150, 255, 0.8);
                    `;
                }
                
                // 添加动画样式
                if (!document.getElementById('water-seal-style')) {
                    var style = document.createElement('style');
                    style.id = 'water-seal-style';
                    style.innerHTML = `
                        @keyframes water-ripple {
                            0% {
                                transform: translate(-50%, -50%) scale(0);
                                opacity: 1;
                            }
                            100% {
                                transform: translate(-50%, -50%) scale(5);
                                opacity: 0;
                            }
                        }
                        @keyframes water-drop {
                            0% {
                                transform: scale(0) translateY(0);
                                opacity: 0;
                            }
                            50% {
                                opacity: 1;
                            }
                            100% {
                                transform: scale(1.5) translateY(50px);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                setTimeout(function() {
                    node.delete();
                }, 2000);
            }
        }, player, target);
        
        game.delay(0.5);
        
        // 计算目标当前手牌数和体力上限
        var handNum = target.countCards('h');
        var maxHp = target.maxHp;
        
        game.log(target, "当前手牌数：", handNum, "，体力上限：", maxHp);
        
        if (handNum <= maxHp) {
            // 手牌数已经小于等于体力上限，不需要弃牌
            game.log(target, "的手牌数不大于体力上限，无需弃牌");
            event.finish();
        } else {
            // 手牌数大于体力上限，需要选择
            event.needDiscard = handNum - maxHp;
        }
        
        "step 1";
        // 让目标选择是否弃牌
        var needDiscard = event.needDiscard;
        target.chooseToDiscard('h', needDiscard, 
            '水属性伤害：弃置' + needDiscard + '张手牌至与体力上限相同，否则此伤害+' + needDiscard
        ).set('ai', function(card) {
            // AI判断：如果伤害会致命，优先弃牌
            var player = _status.event.player;
            var damage = _status.event.getParent(2).trigger.num;
            var addDamage = _status.event.getParent(2).needDiscard;
            
            if (player.hp <= damage + addDamage) {
                // 会致命，优先弃牌
                return 7 - get.value(card);
            } else {
                // 不会致命，根据牌的价值判断
                return 5 - get.value(card);
            }
        });
        
        "step 2";
        if (!result.bool) {
            // 没有弃牌，伤害增加
            trigger.num += event.needDiscard;
            game.log(target, "未弃牌，", "#g水属性伤害", "+", event.needDiscard);
        } else {
            game.log(target, "弃置了", result.cards.length, "张手牌");
        }
    },
};

// 水属性动画效果
lib.element.player.$water = function() {
    // 水属性动画
    game.broadcastAll(function(player) {
        // 创建水波效果
        var water = ui.create.div('.damage', player.parentNode);
        water.innerHTML = '💧';
        water.style.left = player.offsetLeft + 'px';
        water.style.top = player.offsetTop + 'px';
        water.style.fontSize = '80px';
        water.style.opacity = '0.8';
        water.style.transition = 'all 1s ease-out';
        water.style.transform = 'scale(1)';
        
        setTimeout(function() {
            water.style.transform = 'scale(3) translateY(50px)';
            water.style.opacity = '0';
        }, 50);
        
        setTimeout(function() {
            water.delete();
        }, 1050);
        
        // 角色震动效果
        if (lib.config.touchscreen) {
            game.vibrate(150);
        }
    }, this);
};


lib.translate.water = "水";


var style = document.createElement('style');
    style.innerHTML = `
        /* 超新星风暴特效 */
        @keyframes chaoxinxing-flash {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            50% {
                opacity: 1;
                transform: scale(1.2);
            }
            100% {
                opacity: 0;
                transform: scale(1);
            }
        }

        @keyframes chaoxinxing-star {
            0%, 100% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.5) rotate(180deg);
            }
        }

        @keyframes chaoxinxing-wave {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 1000px;
                height: 1000px;
                opacity: 0;
            }
        }

        @keyframes chaoxinxing-text {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotateY(90deg);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.2) rotateY(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1) rotateY(-90deg);
            }
        }

        @keyframes chaoxinxing-complete {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.2);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
            }
        }

        .chaoxinxing-effect {
            pointer-events: none;
        }

        .chaoxinxing-star {
            filter: blur(1px);
        }
    `;
    document.head.appendChild(style);


      if (lib.config.extension_学园都市_windEffectLoaded) return;
    lib.config.extension_学园都市_windEffectLoaded = true;
    
    var style = document.createElement('style');
    style.innerHTML = `
        @keyframes wind-blow {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) rotate(360deg);
            }
        }
        
        @keyframes wind-seal-text {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1) rotate(360deg);
            }
        }
        
        .wind-seal-effect {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);


},prepare:function(){
    
},precontent:function(){

  game.addGroup('sci', '科', '科学侧', {
        color: '#4169E1',
         image: 'ext:学园都市/image/group_sci.png',
    });

  game.addGroup('magic', '法', '魔法侧', {
        color: '#de3e89',
         image: 'ext:学园都市/image/group_magic.png',
    });


},help:{},config:{},package:{
    character: {
        character: {
            "toaru_satenruiko": {
                sex: "female",
                group: "sci",
                hp: 3,
                maxHp: 3,
                hujia: 0,
                                img: "extension/学园都市/image/toaru_satenruiko.jpg",
                trashBin: ["des:栅川中学一年级，留有披肩的黑色长发，头戴五瓣白梅形状花饰的少女。天真烂漫的性格给人以乐天派的感觉，一眼看上去非常随便，但正好相反她也会表现出洞察周围气氛这种对他人的细致关怀。<br>重视朋友间的友情。和同班同学的初春饰利是死党，经常用掀裙子的方式来打招呼（初春限定），宣称“掀裙子是亲密的标志”。也因此在学园都市里有了掀裙魔的称号。非常细心体贴，明明生日比初春要略小却经常像姐姐一样照顾着初春。经初春的关系与御坂美琴和白井黑子相识并成为朋友。<br>平常表现为无能力，大多数时候对此大大咧咧毫不在乎，但内心仍然有获得能力的潜在愿望，因此在偶然得到“幻想御手”时贸然使用，结果表现出了“空力使”。但后来为此遭受了失去知觉的副作用，在朋友们的帮助下和其他“幻想御手”使用者一起苏醒。再后来又为此接受了特别讲习。"],
                dieAudios: ["ext:学园都市/audio/toaru_satenruiko.mp3"],
                skills: ["toaru_kongli_saten","toaru_xianqun2","toaru_yichu","toaru_juben"],
            },
            "toaru_kungoumitsuko": {
    sex: "female",
    group: "sci",
    hp: 4,
    maxHp: 4,
    hujia: 0,
    img: "extension/学园都市/image/toaru_kungoumitsuko.jpg",
    trashBin: ["des:常盘台中学二年级生，大能力者（Level 4），能力是“空力使”（Aero Hand）。婚后航空的千金大小姐，有着一头波浪形的金色卷发，说话时会在句尾加上“～的说”。<br>性格高傲但善良，虽然是大小姐但并不娇气，反而很有正义感。作为常盘台的学生，她对学校和自己的能力都很自豪。擅长使用扇子作为武器，能够操纵空气流动进行攻击和防御。<br>她的能力“空力使”可以自由操纵空气，制造强大的气流攻击敌人，也可以用来防御。在战斗中表现出色，是一位实力强劲的能力者。"],
    dieAudios: ["ext:学园都市/audio/toaru_kungoumitsuko.mp3"],
    skills: ["toaru_kongli_kungou", "toaru_zhoushe"],
},

"toaru_uiharukazari": {
    sex: "female",
    group: "sci",
    hp: 3,
    maxHp: 3,
    img: "extension/学园都市/image/toaru_uiharukazari.jpg",
    trashBin: ["des:柵川中学一年级生，低能力者（Level 1），能力是“定温保存”（Thermal Hand）。风纪委员第177支部成员，擅长计算机操作和情报收集。<br>性格温柔善良，是佐天泪子的好友。虽然战斗能力不强，但在后勤支援方面发挥着重要作用。头上总是戴着花饰，被称为“花之妖精”。"],
    dieAudios: ["ext:学园都市/audio/toaru_uiharukazari.mp3"],
    skills: ["toaru_hengwen", "toaru_zonghuan"],
},

"toaru_shiraikuroko": {
    sex: "female",
    group: "sci",
    hp: 3,
    maxHp: 3,
    img: "extension/学园都市/image/toaru_shiraikuroko.jpg",
    trashBin: ["des:常盘台中学一年级生，大能力者（Level 4），能力是“空间移动”（Teleport）。风纪委员第177支部成员，御坂美琴的室友兼后辈。<br>性格认真负责，对美琴有着超越友情的感情（姐控属性）。战斗时使用钢钉作为武器，能够瞬间移动到敌人身边发动攻击。是风纪委员中的精英成员。"],
    dieAudios: ["ext:学园都市/audio/toaru_shiraikuroko.mp3"],
    skills: ["toaru_shunyi", "toaru_fengji_shirai", "toaru_jiekong"],
},

"toaru_accelerator": {
    sex: "male",
    group: "sci",
    hp: 4,
    maxHp: 4,
    img: "extension/学园都市/image/toaru_accelerator.jpg",
    trashBin: ["des:学园都市最强的超能力者，超能力者（Level 5）第一位，能力是“一方通行”（Accelerator）。能够操控矢量，反射一切物理攻击。<br>原本为了成为“绝对能力者”而参与了“绝对能力者进化计划”，后因与上条当麻的战斗而改变。虽然外表冷酷，但内心善良，致力于保护Last Order等人。"],
    dieAudios: ["ext:学园都市/audio/toaru_accelerator.mp3"],
    skills: ["toaru_shiliangcaozuo"],
},

"toaru_konorimii": {
    sex: "female",
    group: "sci",
    hp: 4,
    maxHp: 4,
    img: "extension/学园都市/image/toaru_konorimii.jpg",
    trashBin: ["des:柵川中学三年级生，强能力者（Level 3），能力是“透视能力”（Clairvoyance）。风纪委员第177支部的支部长。<br>性格温和成熟，是白井黑子和初春饰利的前辈。虽然能力等级不高，但凭借丰富的经验和冷静的判断力，在风纪委员中担任重要职务。对后辈们十分关心。"],
    dieAudios: ["ext:学园都市/audio/toaru_konorimii.mp3"],
    skills: ["toaru_toushi", "toaru_fengji_konori"],
},
// 在 character.character 对象中添加

"toaru_shokuhomisaki": {
    sex: "female",
    group: "sci",
    hp: 4,
    maxHp: 4,
    img: "extension/学园都市/image/toaru_shokuhomisaki.jpg",
    trashBin: ["des:常盘台中学二年级生，超能力者（Level 5）第五位，能力是“心理掌握”（Mental Out）。学园都市最强的精神系能力者，能够操控他人的记忆和思维。<br>性格高傲但内心善良，对上条当麻有特殊感情。拥有庞大的派阀势力，在常盘台中学有很大影响力。使用遥控器作为能力媒介，被称为“常盘台的女王”。"],
    dieAudios: ["ext:学园都市/audio/toaru_shokuhomisaki.mp3"],
    skills: ["toaru_duxin", "toaru_waizhuang", "toaru_paifa"],
},

"toaru_misakamikoto": {
    sex: "female",
    group: "sci",
    hp: 3,
    maxHp: 3,
    img: "extension/学园都市/image/toaru_misakamikoto.jpg",
    trashBin: ["des:常盘台中学二年级生，超能力者（Level 5）第三位，能力是“超电磁炮”（Railgun）。学园都市仅有的七名超能力者之一，被称为“常盘台的王牌”、“最强的电击使”。<br>性格正直善良但有些暴躁，喜欢呱太。与上条当麻有着复杂的关系。战斗时使用电磁力操控砂铁形成武器，最强绝招是以硬币为媒介发射的超电磁炮。"],
    dieAudios: ["ext:学园都市/audio/toaru_misakamikoto.mp3"],
    skills: ["toaru_cipao", "toaru_wangpai", "toaru_leibi", "toaru_shenpu"],
},


"toaru_kamijoutouma": {
    sex: "male",
    group: "sci",
    hp: 4,
    maxHp: 4,
    img: "extension/学园都市/image/toaru_kamijoutouma.jpg",
    trashBin: ["des:某高中一年级生，无能力者（Level 0），但拥有特殊能力“幻想杀手”（Imagine Breaker）。右手能够消除一切异能力量，包括魔法和超能力。<br>性格善良正直，有着强烈的正义感，总是在危机时刻挺身而出保护他人。虽然自称“不幸”，但总能在关键时刻化险为夷。与御坂美琴、茵蒂克丝等人有着深厚的羁绊。<br>战斗风格以近身格斗为主，利用右手的特殊能力无效化敌人的异能攻击，被称为“幻想杀手”。"],
    dieAudios: ["ext:学园都市/audio/toaru_kamijoutouma.mp3"],
    skills: ["toaru_huanyu"],
},

"toaru_frenda": {
    sex: "female",
    group: "sci",
    hp: 3,
    maxHp: 3,
    img: "extension/学园都市/image/toaru_frenda.jpg",
    trashBin: ["des:暗部组织“ITEM”成员，无能力者（Level 0），擅长使用各种爆炸物和陷阱进行战斗。金发碧眼的少女，头戴贝雷帽。<br>性格活泼但有些神经质，喜欢吃鲭鱼罐头。作为“ITEM”的成员，她负责设置陷阱和远程支援。虽然能力等级不高，但凭借丰富的战斗经验和各种爆炸装置，在战斗中发挥着重要作用。<br>她最擅长的武器是“炸弹娃娃”，可以设置定时爆炸装置对敌人造成火属性伤害。对同势力的角色有着复杂的感情。"],
    dieAudios: ["ext:学园都市/audio/toaru_frenda.mp3"],
    skills: ["toaru_huodan", "toaru_duanshi"],
},

"toaru_lastorder": {
    sex: "female",
    group: "sci",
    hp: 3,
    maxHp: 3,
    img: "extension/学园都市/image/toaru_lastorder.jpg",
    trashBin: ["des:“妹妹们”的上位个体，编号20001号，外表是10岁左右的幼女。作为御坂网络的管理者，拥有连接和指挥所有“妹妹们”的能力。<br>性格天真活泼，充满好奇心，说话时会在句尾加上“ってミサカはミサカは～”（御坂如是说）。虽然外表年幼，但作为网络的核心，承担着重要的责任。<br>与一方通行有着深厚的羁绊，是改变一方通行的关键人物。能力是“弱电”，可以通过判定对敌人造成雷属性伤害。当一方通行在场时，两人会互相守护，共同恢复体力。"],
    dieAudios: ["ext:学园都市/audio/toaru_lastorder.mp3"],
    skills: ["toaru_ruodian", "toaru_huyou"],
},

// ==================== 在 character.character 对象中添加 ====================

"toaru_muginoshizuri": {
    sex: "female",
    group: "sci",
    hp: 4,
    maxHp: 4,
    img: "extension/学园都市/image/toaru_muginoshizuri.jpg",
    trashBin: ["des:暗部组织“ITEM”的领导者，超能力者（Level 5），学园都市排名第四位。能力是“原子崩坏”（Meltdowner），可以操控处于“粒子”和“波形”之间暧昧状态的电子，发射出强力的破坏光束。<br>性格高傲且残忍，对敌人毫不留情。作为“ITEM”的首领，她有着强大的战斗力和领导能力。茶色长发，身材高挑，战斗时会穿着皮草大衣。<br>她的能力极其危险，光束可以轻易贯穿建筑物和人体。但过度使用能力会导致精神不稳定，陷入混乱状态。与芙兰达、泷壶理后、绢旗最爱等人组成“ITEM”小队。"],
    dieAudios: ["ext:学园都市/audio/toaru_muginoshizuri.mp3"],
    skills: ["toaru_libeng"],
},
            "toaru_misakalv6": ["female","ke",1,[],["unseen","ext:学园都市/image/toaru_misakalv6.jpg","ext:学园都市/audio/die/toaru_misakalv6.mp3","die:ext:学园都市/audio/die/toaru_misakalv6.mp3"]],

        },
        translate: {
            "toaru_satenruiko": "佐天泪子",
            "toaru_kungoumitsuko": "婚后光子",
            "toaru_shiraikuroko": "白井黑子",
"toaru_uiharukazari": "初春饰利",
"toaru_accelerator": "一方通行",
"toaru_konorimii": "固法美伟",
"toaru_shokuhomisaki": "食蜂操祈",
"toaru_misakamikoto": "御坂美琴",

"toaru_kamijoutouma": "上条当麻",
"toaru_frenda": "芙兰达",
"toaru_lastorder": "最后之作",
"toaru_muginoshizuri": "麦野沉利",

toaru_misakalv6:"最高之作",

        },
    },
    card: {
        card: {
            fengsha: {
                audio: "ext:学园都市",
                fullskin: true,
                nature: "wind",
                type: "basic",
                enable: true,
                usable: 1,
                updateUsable: "phaseUse",
                range(card, player, target) {
                    return player.inRange(target);
                },
                selectTarget: 1,
                cardPrompt(card) {
                    return "出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】，否则你对其造成1点风属性伤害。";
                },
                defaultYingbianEffect: "add",
                filterTarget(card, player, target) {
                    return player !== target;
                },
                content() {
                    "step 0";
                    if (typeof event.shanRequired !== "number" || !event.shanRequired || event.shanRequired < 0) {
                        event.shanRequired = 1;
                    }
                    if (typeof event.baseDamage !== "number") {
                        event.baseDamage = 1;
                    }
                    if (typeof event.extraDamage !== "number") {
                        event.extraDamage = 0;
                    }
                    "step 1";
                    if (event.directHit || event.directHit2 || (!_status.connectMode && lib.config.skip_shan && !target.hasShan())) {
                        event._result = { bool: false };
                    } else if (event.skipShan) {
                        event._result = { bool: true, result: "shaned" };
                    } else {
                        var next = target.chooseToUse("请使用一张闪响应杀");
                        next.set("type", "respondShan");
                        next.set("filterCard", function (card, player) {
                            if (get.name(card) !== "shan") {
                                return false;
                            }
                            return lib.filter.cardEnabled(card, player, "forceEnable");
                        });
                        if (event.shanRequired > 1) {
                            next.set("prompt2", "（共需使用" + event.shanRequired + "张闪）");
                        }
                        next.set("ai1", function (card) {
                            if (get.event().toUse) {
                                return get.order(card);
                            }
                            return 0;
                        }).set("shanRequired", event.shanRequired);
                        next.set("respondTo", [player, card]);
                        next.set(
                            "toUse",
                            (() => {
                                if (target.hasSkillTag("noShan", null, "use")) {
                                    return false;
                                }
                                if (target.hasSkillTag("useShan", null, "use")) {
                                    return true;
                                }
                                if (
                                    target.isLinked() &&
                                    game.hasNature(event.card) &&
                                    game.hasPlayer(cur => {
                                        if (cur === target || !cur.isLinked()) {
                                            return false;
                                        }
                                        return true;
                                    })
                                ) {
                                    if (get.attitude(target, player._trueMe || player) > 0) {
                                        return false;
                                    }
                                }
                                if (event.baseDamage + event.extraDamage <= 0) {
                                    return false;
                                }
                                if (!player.hasSkillTag("jueqing", false, target) && !target.hasSkill("gangzhi") && get.damageEffect(target, player, target, "wind") >= 0) {
                                    return false;
                                }
                                if (event.baseDamage + event.extraDamage >= target.hp + (player.hasSkillTag("jueqing", false, target) || target.hasSkill("gangzhi") ? 0 : target.hujia)) {
                                    return true;
                                }
                                if (
                                    event.shanRequired > 1 &&
                                    !target.hasSkillTag("freeShan", null, {
                                        player: player,
                                        card: event.card,
                                        type: "use",
                                    }) &&
                                    target.mayHaveShan(target, "use", true, "count") < event.shanRequired - (event.shanIgnored || 0)
                                ) {
                                    return false;
                                }
                                return true;
                            })()
                        );
                    }
                    "step 2";
                    if (!result || !result.bool || !result.result || result.result !== "shaned") {
                        event.trigger("shaHit");
                    } else {
                        event.shanRequired--;
                        if (event.shanRequired > 0) {
                            event.goto(1);
                        } else {
                            event.trigger("shaMiss");
                            event.responded = result;
                        }
                    }
                    "step 3";
                    if ((!result || !result.bool || !result.result || result.result !== "shaned") && !event.unhurt) {
                        if (!event.directHit && !event.directHit2 && lib.filter.cardEnabled(new lib.element.VCard({ name: "shan" }), target, "forceEnable") && target.countCards("hs") > 0 && get.damageEffect(target, player, target) < 0) {
                            target.addGaintag(target.getCards("hs"), "sha_notshan");
                        }
                        target.damage("wind");
                        event.result = { bool: true };
                        event.trigger("shaDamage");
                    } else {
                        event.result = { bool: false };
                        event.trigger("shaUnhirt");
                    }
                    event.finish();
                },
                ai: {
                    yingbian(card, player, targets, viewer) {
                        if (get.attitude(viewer, player) <= 0) {
                            return 0;
                        }
                        var base = 0,
                            hit = false;
                        if (get.cardtag(card, "yingbian_hit")) {
                            hit = true;
                            if (
                                targets.some(target => {
                                    return target.mayHaveShan(viewer, "use") && get.attitude(viewer, target) < 0 && get.damageEffect(target, player, viewer, "wind") > 0;
                                })
                            ) {
                                base += 5;
                            }
                        }
                        if (get.cardtag(card, "yingbian_add")) {
                            if (
                                game.hasPlayer(function (current) {
                                    return !targets.includes(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0;
                                })
                            ) {
                                base += 5;
                            }
                        }
                        if (get.cardtag(card, "yingbian_damage")) {
                            if (
                                targets.some(target => {
                                    return get.attitude(viewer, target) < 0 && (target.hp > 1 || player.hasSkillTag("jueqing", false, target) || !target.hasSkillTag("freeShan", null, {
                                        player: player,
                                        card: card,
                                    }));
                                })
                            ) {
                                base += 5;
                            }
                        }
                        if (get.cardtag(card, "yingbian_all")) {
                            if (
                                game.hasPlayer(function (current) {
                                    return current !== player && get.attitude(viewer, current) < 0 && lib.filter.targetEnabled2(card, player, current);
                                })
                            ) {
                                base += 5;
                            }
                        }
                        return base;
                    },
                    canLink(player, target, card) {
                        if (!target.isLinked() && !player.hasSkill("wutiesuolian_skill")) {
                            return false;
                        }
                        if (target.mayHaveShan(player, "use") && !player.hasSkillTag("directHit_ai", true, {
                            target: target,
                            card: card,
                        }, true)) {
                            return false;
                        }
                        if (player.hasSkill("jueqing") || target.hasSkill("gangzhi") || target.hp < 2) {
                            return false;
                        }
                        return true;
                    },
                    basic: {
                        useful: [5,3,1],
                        value: [5,3,1],
                        order(item, player) {
                            if (player.hasSkillTag("presha", true, null, true)) {
                                return 10;
                            }
                            if (typeof item !== "object" || !game.hasNature(item)) {
                                return 3.05;
                            }
                            return 3;
                        },
                    },
                    result: {
                        target(player, target, card, isLink) {
                            let eff = function (target) {
                                if (player.hasSkill("jiu")) {
                                    if (!target.hasSkillTag("filterDamage", null, {
                                        player: player,
                                        card: card,
                                        jiu: true,
                                    })) {
                                        if (get.attitude(player, target) > 0) {
                                            return -7;
                                        }
                                        if (get.attitude(player, target) < 0) {
                                            return -4;
                                        }
                                        return -5;
                                    }
                                    return -0.5;
                                }
                                return -1.5;
                            };
                            if (!isLink && player.hasSkill("jiu")) {
                                if (
                                    !target.hasSkillTag("filterDamage", null, {
                                        player: player,
                                        card: card,
                                        jiu: true,
                                    })
                                ) {
                                    if (target.hp === 1) {
                                        return -10;
                                    }
                                    if (target.hp === 2) {
                                        return -9;
                                    }
                                    return -8;
                                }
                            }
                            if (!player.hasSkillTag("directHit_ai", true, {
                                target: target,
                                card: card,
                            }, true) && target.mayHaveShan(player, "use") && (target.hp > 1 || player.hasSkillTag("jueqing", false, target) || target.hasSkill("gangzhi"))) {
                                return eff(target) / 1.2;
                            }
                            return eff(target);
                        },
                        player(player, target, card) {
                            if (
                                target.hasSkillTag("jueqing", false, player) ||
                                player.hasSkillTag("jueqing", false, target)
                            ) {
                                return [0, 0];
                            }
                            if (get.damageEffect(player, target, player, "wind") >= 0 && get.attitude(player, target) > 0 && get.attitude(target, player) > 0) {
                                return 0;
                            }
                            let eff1 = 0,
                                eff2 = 0;
                            if (
                                target.mayHaveShan(player, "use") &&
                                !player.hasSkillTag("directHit_ai", true, {
                                    target: target,
                                    card: card,
                                }, true) &&
                                (target.hp > 1 || player.hasSkillTag("jueqing", false, target) || target.hasSkill("gangzhi"))
                            ) {
                                eff1 = 0;
                            } else {
                                eff1 = get.damageEffect(player, target, player, "wind");
                            }
                            if (target.hp > 1 || player.hasSkillTag("jueqing", false, target) || target.hasSkill("gangzhi")) {
                                eff2 = get.damageEffect(player, target, player, "wind");
                            }
                            let final = Math.min(eff1, eff2);
                            return final;
                        },
                    },
                    tag: {
                        respond: 1,
                        respondShan: 1,
                        damage(card) {
                            if (card.nature === "poison") {
                                return;
                            }
                            return 1;
                        },
                        natureDamage(card) {
                            if (card.nature) {
                                return 1;
                            }
                        },
                        windDamage(card) {
                            if (card.nature === "wind") {
                                return 1;
                            }
                        },
                    },
                },
                image: "ext:学园都市/fengsha.png",
            },
            // 装备牌部分
    toaru_bangqiuqiubang: {
        audio: true,
        fullskin: true,
        type: "equip",
        subtype: "equip1",
        distance: {
            attackFrom: -2,
        },
        skills: ["toaru_bangqiuqiubang_skill"],
        ai: {
            basic: {
                equipValue: 4,
            },
        },
    },

// 在 card.card 对象中添加

toaru_gangding: {
    fullskin: true,
    type: "equip",
    subtype: "equip6",
    subtypes: ["equip3","equip4"],
    nomod: true,
    nopower: true,
    distance: {
        globalFrom: -1,
        globalTo: 1,
    },
    cardcolor: "diamond",
    toself: true,
    selectTarget: -1,
    filterTarget: function(card, player, target) {
        return target == player;
    },
    modTarget: true,
    allowMultiple: false,
    content: function() {
        target.equip(card);
    },
    ai: {
        basic: {
            order: 1,
            useful: 1,
            value: 1,
            equipValue: -5,
        },
        result: {
            target: function(player, target) {
                return -3;
            },
        },
    },
    skills: ["toaru_gangding_skill"],
    distance: {
        attackFrom: -1,
    },
},
// 在 card.card 对象中添加

// 砂铁剑装备卡
toaru_shatiejian: {
    type: "equip",
    subtype: "equip1",
    distance: {
        attackFrom: -2,
    },
    skills: ["toaru_shatiejian_skill","toaru_shatiejian_sha"],
   onLose() {
              player.addTempSkill("toaru_shatiejian_respond",{player:"useCardBefore"});
            cards.forEach(card => {
                card.fix();
                card.remove();
                card.destroyed = true;
                game.log(card, "被销毁了");
            });
      
    },
    ai: {
        basic: {
            equipValue: 7,
        },
    },
},

// 砂铁剑技能 - 完全重写



toaru_chaoxinxing: {
    fullskin: true,
    type: "trick",
    cardcolor: "heart",
    enable: true,
    filterTarget: function(card, player, target) {
        return true;
    },
    selectTarget: [1, Infinity],
    multitarget: true,
    multiline: true,
    contentBefore: function() {
        "step 0";
        // 全屏特效
        game.broadcastAll(function() {
            if (lib.config.background_speak) {
                game.playAudio("effect", "chaoxinxing");
            }
        });
        
        // 创建全屏特效
        game.broadcastAll(function(targets) {
            var node = ui.create.div(".fullskin.chaoxinxing-effect", document.body);
            node.style.position = "fixed";
            node.style.left = "0";
            node.style.top = "0";
            node.style.width = "100%";
            node.style.height = "100%";
            node.style.zIndex = "100";
            node.style.pointerEvents = "none";
            node.style.background = "radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,140,0,0.2) 50%, rgba(255,69,0,0.1) 100%)";
            node.style.animation = "chaoxinxing-flash 2s ease-in-out";
            
            // 添加星星粒子效果
            for (var i = 0; i < 50; i++) {
                var star = ui.create.div(".chaoxinxing-star", node);
                star.style.position = "absolute";
                star.style.width = "4px";
                star.style.height = "4px";
                star.style.background = "#FFD700";
                star.style.borderRadius = "50%";
                star.style.boxShadow = "0 0 10px #FFD700";
                star.style.left = Math.random() * 100 + "%";
                star.style.top = Math.random() * 100 + "%";
                star.style.animation = "chaoxinxing-star " + (1 + Math.random() * 2) + "s ease-in-out infinite";
            }
            
            // 添加冲击波效果
            for (var i = 0; i < 3; i++) {
                setTimeout(function(index) {
                    var wave = ui.create.div(".chaoxinxing-wave", node);
                    wave.style.position = "absolute";
                    wave.style.left = "50%";
                    wave.style.top = "50%";
                    wave.style.width = "0";
                    wave.style.height = "0";
                    wave.style.border = "3px solid rgba(255,215,0,0.8)";
                    wave.style.borderRadius = "50%";
                    wave.style.transform = "translate(-50%, -50%)";
                    wave.style.animation = "chaoxinxing-wave 1.5s ease-out forwards";
                }, i * 300);
            }
            
            // 添加文字特效
            var text = ui.create.div(".chaoxinxing-text", node);
            text.innerHTML = "超新星风暴";
            text.style.position = "absolute";
            text.style.left = "50%";
            text.style.top = "50%";
            text.style.transform = "translate(-50%, -50%)";
            text.style.fontSize = "48px";
            text.style.fontWeight = "bold";
            text.style.color = "#FFD700";
            text.style.textShadow = "0 0 20px #FF8C00, 0 0 40px #FF4500";
            text.style.animation = "chaoxinxing-text 2s ease-in-out";
            text.style.zIndex = "101";
            
            setTimeout(function() {
                node.delete();
            }, 2000);
        }, targets);
        
        game.delay(2);
    },
    content: function() {
        "step 0";
        // 选择要分配的属性
        player.chooseControl("手牌区、判定区和装备区", "体力上限和体力值", "技能", "全部")
            .set("prompt", "超新星风暴：选择要随机分配的属性")
            .set("ai", function() {
                return "全部";
            });
        "step 1";
        event.choice = result.control;
        
        // 收集所有目标的属性
        event.allCards = [];
        event.allHp = [];
        event.allMaxHp = [];
        event.allSkills = [];
        
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            
            if (event.choice == "手牌区、判定区和装备区" || event.choice == "全部") {
                var cards = target.getCards("hej");
                event.allCards.addArray(cards);
            }
            
            if (event.choice == "体力上限和体力值" || event.choice == "全部") {
                event.allHp.push(target.hp);
                event.allMaxHp.push(target.maxHp);
            }
            
            if (event.choice == "技能" || event.choice == "全部") {
                var skills = target.getSkills(null, false, false).filter(function(skill) {
                    var info = get.info(skill);
                    return info && !info.charlotte && !info.unique && !info.limited && !info.juexingji;
                });
                event.allSkills.addArray(skills);
            }
        }
        
        game.log("收集了", event.allCards.length, "张牌，", event.allHp.length, "个体力值，", event.allSkills.length, "个技能");
        
        "step 2";
        // 清空所有目标的属性
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            
            if (event.choice == "手牌区、判定区和装备区" || event.choice == "全部") {
                var cards = target.getCards("hej");
                if (cards.length > 0) {
                    target.lose(cards, ui.special);
                }
            }
            
            if (event.choice == "体力上限和体力值" || event.choice == "全部") {
                target.storage.toaru_chaoxinxing_hp = target.hp;
                target.storage.toaru_chaoxinxing_maxHp = target.maxHp;
            }
            
            if (event.choice == "技能" || event.choice == "全部") {
                var skills = target.getSkills(null, false, false).filter(function(skill) {
                    var info = get.info(skill);
                    return info && !info.charlotte && !info.unique && !info.limited && !info.juexingji;
                });
                for (var j = 0; j < skills.length; j++) {
                    target.removeSkill(skills[j]);
                }
            }
        }
        
        game.delay(0.5);
        
        "step 3";
        // 随机分配牌
        if (event.choice == "手牌区、判定区和装备区" || event.choice == "全部") {
            var cards = event.allCards.slice(0);
            
            for (var i = 0; i < targets.length; i++) {
                var target = targets[i];
                
                // 每个目标至少获得一张牌（如果有牌的话）
                if (cards.length > 0) {
                    var num = Math.max(1, Math.floor(cards.length / (targets.length - i)));
                    var giveCards = cards.randomGets(Math.min(num, cards.length));
                    
                    for (var j = 0; j < giveCards.length; j++) {
                        var card = giveCards[j];
                        var type = get.type(card, null, false);
                        
                        if (type == "equip") {
                            target.equip(card);
                        } else if (type == "delay") {
                            target.addJudge(card);
                        } else {
                            target.gain(card, "gain2");
                        }
                        
                        cards.remove(card);
                    }
                    
                    game.log(target, "获得了", giveCards.length, "张牌");
                }
            }
        }
        
        "step 4";
        // 随机分配体力
        if (event.choice == "体力上限和体力值" || event.choice == "全部") {
            var hpList = event.allHp.slice(0);
            var maxHpList = event.allMaxHp.slice(0);
            
            // 打乱数组
            hpList.sort(function() {
                return Math.random() - 0.5;
            });
            maxHpList.sort(function() {
                return Math.random() - 0.5;
            });
            
            for (var i = 0; i < targets.length; i++) {
                var target = targets[i];
                var newMaxHp = maxHpList[i];
                var newHp = Math.min(hpList[i], newMaxHp);
                
                // 设置新的体力上限
                target.maxHp = newMaxHp;
                target.hp = newHp;
                target.update();
                
                game.log(target, "的体力变为", newHp + "/" + newMaxHp);
            }
        }
        
        "step 5";
        // 随机分配技能
        if (event.choice == "技能" || event.choice == "全部") {
            var skills = event.allSkills.slice(0);
            
            // 去重
            skills = skills.filter(function(skill, index) {
                return skills.indexOf(skill) === index;
            });
            
            for (var i = 0; i < targets.length; i++) {
                var target = targets[i];
                
                // 每个目标至少获得一个技能（如果有技能的话）
                if (skills.length > 0) {
                    var num = Math.max(1, Math.floor(skills.length / (targets.length - i)));
                    var giveSkills = skills.randomGets(Math.min(num, skills.length));
                    
                    for (var j = 0; j < giveSkills.length; j++) {
                        target.addSkill(giveSkills[j]);
                        skills.remove(giveSkills[j]);
                    }
                    
                    game.log(target, "获得了", giveSkills.length, "个技能：", giveSkills.map(function(s) {
                        return get.translation(s);
                    }).join("、"));
                }
            }
        }
        
        "step 6";
        // 显示完成特效
        game.broadcastAll(function() {
            var node = ui.create.div(".chaoxinxing-complete", document.body);
            node.innerHTML = "重组完成！";
            node.style.position = "fixed";
            node.style.left = "50%";
            node.style.top = "50%";
            node.style.transform = "translate(-50%, -50%)";
            node.style.fontSize = "36px";
            node.style.fontWeight = "bold";
            node.style.color = "#00FF00";
            node.style.textShadow = "0 0 20px #00FF00";
            node.style.zIndex = "100";
            node.style.animation = "chaoxinxing-complete 1s ease-out forwards";
            
            setTimeout(function() {
                node.delete();
            }, 1000);
        });
        
        game.delay();
    },
    ai: {
        basic: {
            order: 1,
            useful: 1,
            value: 10,
        },
        result: {
            target: function(player, target) {
                // AI评估：混乱效果，对敌人有利
                if (get.attitude(player, target) < 0) return -3;
                return 0;
            },
        },
        tag: {
            multitarget: 1,
            multineg: 1,
        },
    },
},

toaru_zhadanwawa: {
    fullskin: true,
    type: "equip",
    subtype: "equip5",
    cardcolor: "diamond",
    enable: true,
    selectTarget: -1,
    filterTarget: function(card, player, target) {
        return target == player;
    },
    modTarget: true,
    onLose: function() {
        // 删除 card.fix(); 这个不存在的方法

        card.destroyed = true;
    },
    skills: ["toaru_zhadanwawa_skill"],
    ai: {
        basic: {
            equipValue: 1,
        },
    },
},
shuisha: {
    audio: "ext:学园都市",
    fullskin: true,
    nature: "water",
    type: "basic",
    enable: true,
    usable: 1,
    updateUsable: "phaseUse",
    range(card, player, target) {
        return player.inRange(target);
    },
    selectTarget: 1,
    cardPrompt(card) {
        return "出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】，否则你对其造成1点水属性伤害。";
    },
    defaultYingbianEffect: "add",
    filterTarget(card, player, target) {
        return player !== target;
    },
    content() {
        "step 0";
        if (typeof event.shanRequired !== "number" || !event.shanRequired || event.shanRequired < 0) {
            event.shanRequired = 1;
        }
        if (typeof event.baseDamage !== "number") {
            event.baseDamage = 1;
        }
        if (typeof event.extraDamage !== "number") {
            event.extraDamage = 0;
        }
        "step 1";
        if (event.directHit || event.directHit2 || (!_status.connectMode && lib.config.skip_shan && !target.hasShan())) {
            event._result = { bool: false };
        } else if (event.skipShan) {
            event._result = { bool: true, result: "shaned" };
        } else {
            var next = target.chooseToUse("请使用一张闪响应杀");
            next.set("type", "respondShan");
            next.set("filterCard", function (card, player) {
                if (get.name(card) !== "shan") {
                    return false;
                }
                return lib.filter.cardEnabled(card, player, "forceEnable");
            });
            if (event.shanRequired > 1) {
                next.set("prompt2", "（共需使用" + event.shanRequired + "张闪）");
            }
            next.set("ai1", function (card) {
                if (get.event().toUse) {
                    return get.order(card);
                }
                return 0;
            }).set("shanRequired", event.shanRequired);
            next.set("respondTo", [player, card]);
            next.set(
                "toUse",
                (() => {
                    if (target.hasSkillTag("noShan", null, "use")) {
                        return false;
                    }
                    if (target.hasSkillTag("useShan", null, "use")) {
                        return true;
                    }
                    if (
                        target.isLinked() &&
                        game.hasNature(event.card) &&
                        game.hasPlayer(cur => {
                            if (cur === target || !cur.isLinked()) {
                                return false;
                            }
                            return true;
                        })
                    ) {
                        if (get.attitude(target, player._trueMe || player) > 0) {
                            return false;
                        }
                    }
                    if (event.baseDamage + event.extraDamage <= 0) {
                        return false;
                    }
                    if (!player.hasSkillTag("jueqing", false, target) && !target.hasSkill("gangzhi") && get.damageEffect(target, player, target, "water") >= 0) {
                        return false;
                    }
                    return true;
                })()
            );
        }
        "step 2";
        if (result.bool === false) {
            var damage = event.baseDamage + event.extraDamage;
            if (damage > 0) {
                target.damage(damage, "water", player);
            }
        } else {
            event.shanRequired--;
            if (event.shanRequired > 0) {
                event.goto(1);
            }
        }
    },
    ai: {
        basic: {
            order: 3,
            useful: [5, 3, 1],
            value: [5, 3, 1],
        },
        result: {
            target(player, target, card) {
                if (player.hasSkill("jiu")) {
                    if (get.attitude(player, target) > 0) {
                        return -7;
                    }
                    return -4;
                }
                return -1.5;
            },
        },
        tag: {
            damage: 1,
            natureDamage: 1,
            fireDamage: 0,
            thunderDamage: 0,
            waterDamage: 1,
            windDamage: 0,
        },
    },
},

        },
        translate: {
            fengsha: "风杀",
            "fengsha_info": "基本牌<br><b>出牌阶段限一次</b>，对你攻击范围内的一名其他角色使用。其须使用一张【闪】，否则你对其造成1点风属性伤害。",
            "fengsha_bg": "杀",
            "学园都市": "学园都市",
                toaru_bangqiuqiubang: "棒球球棒",
    toaru_bangqiuqiubang_info: "当你造成伤害后，你可以弃置目标任一区域至多X张牌（X为此伤害值）。",
    toaru_bangqiuqiubang_skill: "棒球球棒",
    toaru_bangqiuqiubang_bg: "棒",
    // 在 translate 对象中添加

"toaru_shatiejian": "砂铁剑",
"toaru_shatiejian_bg": "剑",
"toaru_shatiejian_info": "1.当你造成伤害后，你令受伤害角色进入连环状态<br>2.你可以将此武器当作雷【杀】使用，目标需打出一张【杀】，否则受到来自你的一点雷电伤害。；<br>3.此牌离开你的装备区后销毁。",

    // 在 translate 对象中添加

"toaru_gangding": "钢钉",
"toaru_gangding_bg": "钉",
"toaru_gangding_info": "锁定技，此牌占据一个进攻马栏和防御马栏。<br>①你的攻击范围始终视为1<br>②无法被拼点和横置<br>③无法使用非实体牌",
// 在 translate 对象中添加

"toaru_chaoxinxing": "超新星风暴",
"toaru_chaoxinxing_bg": "暴",
"toaru_chaoxinxing_info": "锦囊牌，出牌阶段对任意名角色使用。你可以随机分配：<br>1.目标角色的手牌区、判定区和装备区内的所有牌<br>2.目标角色的体力上限和体力值<br>3.目标角色的技能<br>（先集中回收目标角色的所有所选属性，然后系统将这些属性再随机分配给目标角色，且至少拥有一个）",

"toaru_zhadanwawa": "炸弹娃娃",
"toaru_zhadanwawa_bg": "弹",
"toaru_zhadanwawa_info": "使用者设置X的值（至少为1，至多为场上人数，不能是场上已经存在的数）。自【炸弹娃娃】被装备后的第X个回合结束阶段，对目标造成一点火属性伤害然后销毁该牌。任意角色的回合限一次，其可以弃置两张【杀】，销毁此牌。",
"toaru_zhadanwawa_skill": "炸弹娃娃",
"toaru_zhadanwawa_discard": "炸弹娃娃",


shuisha: "水杀",
"shuisha_info": "基本牌<br><b>出牌阶段限一次</b>，对你攻击范围内的一名其他角色使用。其须使用一张【闪】，否则你对其造成1点水属性伤害。",
"shuisha_bg": "杀",

        },
        list: [],
    },
    skill: {
skill: {
    // 空力
    toaru_kongli_saten: {
        audio: "ext:学园都市:2",
        trigger: {
            source: "damageBegin1",
        },
        forced: true,
        filter: function(event, player) {
            return !event.nature;
        },
        content: function() {
            "step 0";
            if (Math.random() < 0.5) {
                trigger.nature = "wind";
                game.log(trigger.card, "的伤害变为", "#g风属性伤害");
                player.popup("空力");
            } else {
                player.popup("空力失败");
            }
        },
        ai: {
            damageBonus: true,
        },
    },
    
    // 衣橱
    toaru_yichu: {
        audio: "ext:学园都市:2",
        trigger: {
            global: "phaseBefore",
            player: "enterGame",
        },
        forced: true,
        unique: true,
        charlotte: true,
        filter: function(event, player) {
            return (event.name != "phase" || game.phaseNumber == 0);
        },
        content: function() {
            "step 0";
            // 添加额外装备栏
                  player.expandEquip(1);
                    player.expandEquip(2);
                      player.expandEquip(3);
                        player.expandEquip(4);
                          player.expandEquip(5);
            // 装备棒球球棒
            var card = game.createCard2("toaru_bangqiuqiubang","spade",13);
            player.equip(card);
            player.$gain2(card);
            game.log(player, "将", card, "置入了装备区");
        },
        mod: {
            maxHandcard: function(player, num) {
                return num + player.countCards("e");
            },
        },
        group: ["toaru_yichu_round"],
        subSkill: {
round: {
      audio: "ext:学园都市:2",
    trigger: {
        global: "roundStart",
    },
    forced: true,
    direct: true,
    content: function() {
        "step 0";
        player.chooseControl("随机装备", "虚拟装备")
            .set("prompt", "衣橱：请选择一项")
            .set("ai", function() {
                var player = _status.event.player;
                
                // ✅ 修复：正确计算装备栏上限
                var equipLimit = 0;
                for (var i = 1; i <= 5; i++) {
                    // 检查该装备栏是否可用
                    if (!player.isDisabled(i)) {
                        equipLimit++;
                    }
                }
                
                // 如果装备区未满，优先随机装备
                if (player.countCards("e") < equipLimit) {
                    return "随机装备";
                }
                
                // 否则看是否有其他角色有好装备
                var targets = game.filterPlayer(function(current) {
                    return current != player && current.countCards("e") > 0;
                });
                if (targets.length > 0) {
                    return "虚拟装备";
                }
                return "随机装备";
            });
        "step 1";
        if (result.control == "随机装备") {
            event.goto(2);
        } else {
            event.goto(4);
        }
        "step 2";
        // 随机装备
        player.logSkill("toaru_yichu");
        var list = [];
        for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
            var card = ui.cardPile.childNodes[i];
            if (get.type(card) == "equip") {
                list.push(card);
            }
        }
        if (list.length == 0) {
            event.finish();
            return;
        }
        event.equipCard = list.randomGet();
        "step 3";
        if (event.equipCard) {
            player.equip(event.equipCard);
            player.$gain2(event.equipCard);
            game.log(player, "将", event.equipCard, "置入了装备区");
        }
        event.finish();
        "step 4";
        // 虚拟装备
        var targets = game.filterPlayer(function(current) {
            return current != player && current.countCards("e") > 0;
        });
        if (targets.length == 0) {
            event.finish();
            return;
        }
        player.chooseTarget("衣橱：选择一名其他角色", true, function(card, player, target) {
            return target != player && target.countCards("e") > 0;
        }).set("ai", function(target) {
            var player = _status.event.player;
            var att = get.attitude(player, target);
            if (att > 0) return 0;
            return -att * target.countCards("e");
        });
        "step 5";
        if (result.bool) {
            var target = result.targets[0];
            event.target = target;
            player.logSkill("toaru_yichu", target);
            player.choosePlayerCard(target, "e", true, "选择" + get.translation(target) + "装备区的一张牌");
        } else {
            event.finish();
        }
        "step 6";
        if (result.bool) {
            var card = result.cards[0];
            event.cardName = card.name; // 保存卡牌名称
            player.chooseCard("h", true, "将一张手牌当作" + get.translation(card) + "使用");
        } else {
            event.finish();
        }
        "step 7";
        if (result.bool && event.cardName) {
            var hs = result.cards[0];
            player.useCard({ name: event.cardName }, hs, player);
        }
    },
},

        },
    },
    
    // 掀裙
    toaru_xianqun: {
    audio: "ext:学园都市:2",
    enable: "phaseUse",
    usable: 1,
    filterCard: true,
    selectCard: [1, Infinity],
    discard: true,
    lose: true,
    delay: false,
    filterTarget: function(card, player, target) {
        return target != player;
    },
    selectTarget: function() {
        return ui.selected.cards.length;
    },
    complexSelect: true,
    complexCard: true,
    content: function() {
        "step 0";
        var list = ["风杀", "万箭齐发"];
        if (player.hp > 1 || player.countCards("h") > 0) {
            list.push("背水");
        }
        player.chooseControl(list).set("prompt", "掀裙：请选择一项").set("ai", function() {
            var player = _status.event.player;
            var targets = _status.event.getParent().targets;
            var cards = _status.event.getParent().cards;
            
            // 计算风杀收益
            var shaEff = 0;
            for (var i = 0; i < targets.length; i++) {
                shaEff += get.effect(targets[i], { name: "fengsha" }, player, player);
            }
            
            // 计算万箭收益
            var arrowEff = 0;
            for (var i = 0; i < targets.length; i++) {
                arrowEff += get.effect(targets[i], { name: "wanjian" }, player, player);
            }
            
            // 计算背水收益
            var beishuiEff = 0;
            if (player.hp > 1 || player.countCards("h") > 0) {
                var damage = cards.length;
                beishuiEff = damage * 2 - player.hp - player.countCards("h");
            }
            
            if (beishuiEff > 3 && beishuiEff > shaEff && beishuiEff > arrowEff) {
                return "背水";
            }
            if (shaEff > arrowEff) {
                return "风杀";
            }
            return "万箭齐发";
        });
        "step 1";
        event.choice = result.control;
        if (result.control == "风杀") {
            event.goto(2);
        } else if (result.control == "万箭齐发") {
            event.goto(4);
        } else {
            event.goto(6);
        }
        "step 2";
        // 风杀 - 依次对每个目标使用
        event.shaIndex = 0;
        "step 3";
        if (event.shaIndex < targets.length) {
            player.useCard({ name: "fengsha", isCard: true }, targets[event.shaIndex], false);
            event.shaIndex++;
            event.redo();
        } else {
            event.finish();
        }
        "step 4";
        // 万箭齐发 - 只使用一次
        player.useCard({ name: "wanjian", isCard: true }, targets, false);
        "step 5";
        event.finish();
        "step 6";
        // 背水
        var damage = cards.length;
        player.loseHp(1);
        var hs = player.getCards("h");
        if (hs.length > 0) {
            player.discard(hs);
        }
        player.draw(damage);
        game.delayx();
        "step 7";
        // 依次使用风杀
        event.shaIndex = 0;
        "step 8";
        if (event.shaIndex < targets.length) {
            player.useCard({ name: "fengsha", isCard: true }, targets[event.shaIndex], false);
            event.shaIndex++;
            event.redo();
        }
        "step 9";
        // 使用万箭齐发
        player.useCard({ name: "wanjian", isCard: true }, targets, false);
    },
    ai: {
        order: 8,
        result: {
            player: function(player) {
                var cards = ui.selected.cards;
                if (!cards || cards.length == 0) return 0;
                
                var targets = game.filterPlayer(function(current) {
                    return current != player;
                }).slice(0, cards.length);
                
                var eff = 0;
                for (var i = 0; i < targets.length; i++) {
                    eff += get.effect(targets[i], { name: "fengsha" }, player, player);
                }
                
                return eff - cards.length * 0.5;
            },
        },
    },
},

    // 剧本
    toaru_juben: {
        audio: "ext:学园都市:2",
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return player.countCards("h") > 0;
        },
        content: function() {
            "step 0";
            var hs = player.getCards("h");
            player.lose(hs, ui.ordering);
            player._trashingCards = hs.slice(0);
            event.hs = hs;
            game.log(player, "重铸了", hs);
            "step 1";
            player.draw(event.hs.length);
            "step 2";
            for (var i = 0; i < event.hs.length; i++) {
                event.hs[i].discard();
            }
            delete player._trashingCards;
            "step 3";
            var num = player.countCards("h");
            if (num == 0) {
                event.finish();
                return;
            }
            player.chooseCard("h", [1, num], true, "将任意张牌正面朝上交给其他角色").set("ai", function(card) {
                return 6 - get.value(card);
            });
            "step 4";
            if (result.bool) {
                event.cards = result.cards;
                event.num = result.cards.length;
                event.given = 0;
                event.goto(5);
            } else {
                event.finish();
            }
            "step 5";
            if (event.given >= event.num) {
                event.finish();
                return;
            }
            player.chooseTarget("将" + get.translation(event.cards[event.given]) + "交给一名其他角色", true, function(card, player, target) {
                return target != player && !_status.event.targets.includes(target);
            }).set("targets", event.targets || []).set("ai", function(target) {
                var player = _status.event.player;
                var card = _status.event.getParent().cards[_status.event.getParent().given];
                var att = get.attitude(player, target);
                var val = get.value(card, target);
                if (att > 0) {
                    return att * val;
                }
                return -att / val;
            });
            "step 6";
            if (result.bool) {
                var target = result.targets[0];
                if (!event.targets) event.targets = [];
                event.targets.push(target);
                
                var card = event.cards[event.given];
                player.line(target, "green");
                player.give(card, target, true);
                
                // 添加标记
                target.addTempSkill("toaru_juben_effect", { player: "phaseAfter" });
                if (!target.storage.toaru_juben_effect) {
                    target.storage.toaru_juben_effect = [];
                }
                target.storage.toaru_juben_effect.push(get.type2(card));
                target.markSkill("toaru_juben_effect");
                
                event.given++;
                event.goto(5);
            } else {
                event.finish();
            }
        },
        ai: {
            order: 10,
            result: {
                player: 1,
            },
        },
        subSkill: {
            effect: {
                charlotte: true,
                onremove: true,
                mark: true,
                intro: {
                    content: function(storage, player) {
                        if (!storage || storage.length == 0) return "无限制";
                        return "下一张牌必须是" + storage.map(function(type) {
                            return get.translation(type) + "牌";
                        }).join("或");
                    },
                },
                mod: {
                    cardEnabled2: function(card, player) {
                        if (!player.storage.toaru_juben_effect || player.storage.toaru_juben_effect.length == 0) {
                            return;
                        }
                        var type = get.type2(card);
                        if (!player.storage.toaru_juben_effect.includes(type)) {
                            return false;
                        }
                    },
                },
                trigger: {
                    player: "useCard",
                },
                forced: true,
                popup: false,
                silent: true,
                content: function() {
                    player.removeSkill("toaru_juben_effect");
                },
            },
        },
    },


    toaru_bangqiuqiubang_skill: {
        equipSkill: true,
        audio: "ext:学园都市:2",
        trigger: {
            source: "damageEnd",
        },
        direct: true,
        filter: function(event, player) {
            return event.num > 0 && event.player && event.player.isIn() && 
                   (event.player.countCards("h") > 0 || event.player.countCards("e") > 0 || event.player.countCards("j") > 0);
        },
        content: function() {
            "step 0";
            var num = trigger.num;
            var target = trigger.player;
            event.num = num;
            event.target = target;
            
            var str = "弃置" + get.translation(target);
            var list = [];
            if (target.countCards("h") > 0) list.push("手牌区");
            if (target.countCards("e") > 0) list.push("装备区");
            if (target.countCards("j") > 0) list.push("判定区");
            
            str += "的" + list.join("、") + "至多" + num + "张牌";
            
            player.chooseControl(list, "cancel2").set("prompt", "棒球球棒：" + str).set("ai", function() {
                var target = _status.event.target;
                var player = _status.event.player;
                if (get.attitude(player, target) >= 0) return "cancel2";
                
                if (target.countCards("e") > 0) return "装备区";
                if (target.countCards("j") > 0) return "判定区";
                if (target.countCards("h") > 0) return "手牌区";
                return "cancel2";
            }).set("target", target);
            "step 1";
            if (result.control == "cancel2") {
                event.finish();
                return;
            }
            player.logSkill("toaru_bangqiuqiubang_skill", event.target);
            
            var position = "h";
            if (result.control == "装备区") position = "e";
            else if (result.control == "判定区") position = "j";
            
            event.position = position;
            player.discardPlayerCard(event.target, position, [1, event.num], true);
        },
 
},
// translate部分



toaru_kongli_kungou: {
    audio: "ext:学园都市:2",
    forced: true,
    group: ["toaru_kongli_kungou_immune", "toaru_kongli_kungou_wind", "toaru_kongli_kungou_chaos"],
    subSkill: {
        // 子技能1：风属性免疫（只免疫纯风属性）
        immune: {
            audio: "toaru_kongli_kungou",
            trigger: {
                player: "damageBegin4",
            },
            filter: function(event, player) {
                // 只免疫纯风属性，不免疫复合属性
                        return event.hasNature("wind");

            },
            forced: true,
            content: function() {
                trigger.cancel();
                game.log(player, "免疫了风属性伤害");
            },
            ai: {
                nowind: true,
                effect: {
                    target: function(card, player, target, current) {
                        if (get.tag(card, 'natureDamage')) {
                            var nature = get.nature(card);
                            // 只对纯风属性免疫
                            if (nature == 'wind') return 'zeroplayertarget';
                        }
                    },
                },
            },
        },
        // 子技能2：造成的伤害全部转化为风属性（强制覆盖所有属性）
        wind: {
            audio: "toaru_kongli_kungou",
            trigger: {
                source: "damageBegin1",
            },
            forced: true,
            priority: 100, // 高优先级，确保最先执行
            content: function() {
                // 无论原本是什么属性（火、雷、冰、神等），全部强制改为风属性
                if (trigger.nature != 'wind') {
                    var oldNature = trigger.nature || '无';
                    trigger.nature = 'wind';
                    game.log(player, "将", oldNature, "属性伤害转化为", "#g风属性");
                }
            },
        },
        // 子技能3：造成伤害时概率混乱
        chaos: {
            audio: "toaru_kongli_kungou",
            trigger: {
                source: "damageEnd",
            },
            filter: function(event, player) {
                return event.player && event.player.isIn();
            },
            forced: true,
            logTarget: "player",
            content: function() {
                "step 0";
                // 30%概率触发混乱
                if (Math.random() < 0.3) {
                    event.chaos = true;
                    game.log(trigger.player, "陷入了", "#g混乱状态");
                } else {
                    event.finish();
                }
                "step 1";
                if (event.chaos) {
                    trigger.player.addTempSkill('toaru_hunluan', {global: 'roundStart'});
                }
            },
        },
    },
},
// 混乱状态技能
toaru_hunluan: {
    charlotte: true,
    mark: true,
    intro: {
        content: "混乱状态：本回合使用牌时随机选择目标",
    },
    mod: {
        playerEnabled: function(card, player, target) {
            // 混乱状态下随机选择目标
            if (player.hasSkill('toaru_hunluan') && _status.event.name == 'chooseTarget') {
                return Math.random() > 0.5;
            }
        },
    },
    trigger: {
        player: "useCardBefore",
    },
    forced: true,
    popup: false,
    priority: 15,
    content: function() {
        // 混乱状态下，随机改变目标
        if (trigger.targets && trigger.targets.length > 0) {
            var allTargets = game.filterPlayer(function(current) {
                return current != player && current.isIn();
            });
            if (allTargets.length > 0) {
                var randomTarget = allTargets.randomGet();
                trigger.targets = [randomTarget];
                game.log(player, "因混乱状态，目标改为", randomTarget);
            }
        }
    },
},

toaru_zhoushe: {
    audio: "ext:学园都市:2",
    group: ["toaru_zhoushe_use", "toaru_zhoushe_respond", "toaru_zhoushe_effect"],
    subSkill: {

        use: {
            audio: "toaru_zhoushe",
            enable: "chooseToUse",
            filter: function(event, player) {
                // 明确只在需要杀的时候才能发动
                if (event.filterCard && !event.filterCard({name: 'sha', nature: 'wind'}, player, event)) return false;
                if (event.filterCard && !event.filterCard({name: 'sha'}, player, event)) return false;
                // 检查是否已用过
                if (player.storage.toaru_zhoushe_used) return false;
                return true;
            },
            chooseButton: {
                dialog: function(event, player) {
                    return ui.create.dialog('轴射：请选择一项', [
                        [
                            ['使用风杀', '视为使用一张风【杀】'],
                            ['范围攻击', '对一名角色攻击范围内的所有角色使用风【杀】']
                        ],
                        'textbutton'
                    ]);
                },
                filter: function(button, player) {
                    return true;
                },
                check: function(button) {
                    var player = _status.event.player;
                    var enemies = game.filterPlayer(function(current) {
                        return current != player && get.attitude(player, current) < 0;
                    });
                    if (button.link == '范围攻击' && enemies.length >= 2) return 2;
                    if (button.link == '使用风杀') return 1;
                    return 0;
                },
                backup: function(links, player) {
                    if (links[0] == '使用风杀') {
                        return {
                            audio: "toaru_zhoushe",
                            filterCard: () => false,
                            selectCard: -1,
                            viewAs: {name: "sha", nature: "wind"},
                            precontent: function() {
                                if (!player.storage.toaru_zhoushe_used) {
                                    player.storage.toaru_zhoushe_used = true;
                                    player.markSkill('toaru_zhoushe_used');
                                }
                                event.result.skill = 'toaru_zhoushe_use';
                            },
                        };
                    } else {
                        return {
                            audio: "toaru_zhoushe",
                            filterCard: () => false,
                            selectCard: -1,
                            content: function() {
                                "step 0";
                                if (!player.storage.toaru_zhoushe_used) {
                                    player.storage.toaru_zhoushe_used = true;
                                    player.markSkill('toaru_zhoushe_used');
                                }
                                player.chooseTarget("选择一名角色，对其攻击范围内的所有角色使用风【杀】", true, function(card, player, target) {
                                    return true;
                                }).set("ai", function(target) {
                                    var player = _status.event.player;
                                    var targets = game.filterPlayer(function(current) {
                                        return target.inRange(current) && current != player;
                                    });
                                    var eff = 0;
                                    for (var i = 0; i < targets.length; i++) {
                                        eff += get.effect(targets[i], {name: 'sha', nature: 'wind'}, player, player);
                                    }
                                    return eff;
                                });
                                "step 1";
                                if (result.bool) {
                                    event.center = result.targets[0];
                                    event.targets = game.filterPlayer(function(current) {
                                        return event.center.inRange(current) && current != player;
                                    });
                                    if (event.targets.length == 0) {
                                        event.finish();
                                    } else {
                                        game.log(player, "对", event.center, "攻击范围内的所有角色使用风【杀】");
                                    }
                                } else {
                                    event.finish();
                                }
                                "step 2";
                                event.targetIndex = 0;
                                "step 3";
                                if (event.targetIndex < event.targets.length) {
                                    var target = event.targets[event.targetIndex];
                                    player.useCard({name: 'sha', nature: 'wind', isCard: true, skill: 'toaru_zhoushe_use'}, target, false);
                                    event.targetIndex++;
                                    event.redo();
                                }
                            },
                        };
                    }
                },
                prompt: function(links, player) {
                    if (links[0] == '使用风杀') {
                        return '视为使用一张风【杀】';
                    } else {
                        return '对一名角色攻击范围内的所有角色使用风【杀】';
                    }
                },
            },
            ai: {
                order: 9,
                result: {
                    player: function(player) {
                        var enemies = game.filterPlayer(function(current) {
                            return current != player && get.attitude(player, current) < 0;
                        });
                        if (enemies.length > 0) return 1;
                        return 0;
                    },
                },
            },
        },

        respond: {
            audio: "toaru_zhoushe",
            enable: "chooseToRespond",
                        filter: function(event, player) {
                if (!lib.filter.filterCard({name: 'sha', nature: 'wind'}, player, event)) return false;
                // 检查是否已用过
                if (!player.hasSkill("toaru_zhoushe_RespondUsed")) return true;
                return true;
            },
            filterCard: () => false,
            selectCard: -1,
            viewAs: {name: "sha", nature: "wind"},
            prompt: "发动【轴射】，视为打出一张风【杀】",
            content: function(){
                        player.addTempSkill('toaru_zhoushe_RespondUsed',{global:"phaseEnd"});
            },
            ai: {
                respondSha: true,
                skillTagFilter: function(player) {
                    return true;
                },
                basic: {
                    useful: [5, 1],
                    value: [5, 1],
                },
            },
        },
        used: {
            charlotte: true,
            onremove: true,
            init: function(player) {
                if (!player.storage.toaru_zhoushe_used) {
                    player.storage.toaru_zhoushe_used = false;
                }
            },
            trigger: {player: "phaseEnd"},
            forced: true,
            popup: false,
            content: function() {
                player.storage.toaru_zhoushe_used = false;
                player.unmarkSkill('toaru_zhoushe_used');
            },
        },
                RespondUsed: {
            charlotte: true,
            onremove: true,
         
        },
        effect: {
            audio: "toaru_zhoushe",
            trigger: {
                player: "shaMiss",
            },
            filter: function(event, player) {
                // 判断是否是轴射技能使用的杀
                return event.card && event.card.nature == 'wind' && 
                       event.card.skill == 'toaru_zhoushe_use' &&
                       event.target && event.target.isIn();
            },
            forced: true,
            logTarget: "target",
            content: function() {
                "step 0";
                var target = trigger.target;
                event.target = target;
                var hasEquip = target.countCards('e') > 0;
                
                if (hasEquip) {
                    target.chooseControl("流失体力", "弃置装备")
                        .set("prompt", "轴射：请选择一项")
                        .set("ai", function() {
                            var target = _status.event.player;
                            var equipValue = 0;
                            var equips = target.getCards('e');
                            for (var i = 0; i < equips.length; i++) {
                                equipValue += get.value(equips[i]);
                            }
                            // 如果装备价值高且体力多，选择流失体力
                            if (equipValue > 8 && target.hp > 2) {
                                return "流失体力";
                            }
                            return "弃置装备";
                        });
                } else {
                    event._result = {control: "流失体力"};
                }
                "step 1";
                if (result.control == "流失体力") {
                    event.target.loseHp();
                    game.log(event.target, "流失了1点体力");
                } else {
                    var equips = event.target.getCards('e');
                    if (equips.length > 0) {
                        event.target.discard(equips);
                        game.log(event.target, "弃置了装备区所有牌");
                    }
                }
            },
        },
    },
},

// ==================== 初春饰利 ====================

// 恒温技能
toaru_hengwen: {
    audio: "ext:学园都市:2",
    limited: true,
    skillAnimation: true,
    animationColor: "wood",
    unique: true,
    enable: "phaseUse",
    filterTarget: function(card, player, target) {
        return true;
    },
    mark: true,
    intro: {
        content: "limited",
    },
    init: function(player) {
        player.storage.toaru_hengwen_record = {};
    },
    content: function() {
        "step 0";
        player.awakenSkill("toaru_hengwen");
        target.addSkill("toaru_hengwen_mark");
        // 记录目标当前体力值
        player.storage.toaru_hengwen_record[target.playerid] = target.hp;
        target.storage.toaru_hengwen_hp = target.hp;
        target.addMark("toaru_hengwen_mark", 1);
        game.log(player, "记录了", target, "的体力值：", target.hp);
    },
    ai: {
        order: 10,
        result: {
            target: function(player, target) {
                if (target.hp <= 2) return 5;
                return 3;
            },
        },
    },
},

// 恒温标记技能
toaru_hengwen_mark: {
    charlotte: true,
    mark: true,
    intro: {
        name: "恒温",
        content: function(storage, player) {
            return "记录体力值：" + player.storage.toaru_hengwen_hp;
        },
    },
    trigger: {
        player: ["changeHp"],
    },
    filter: function(event, player) {
        return player.hp != player.storage.toaru_hengwen_hp && !event.dying;
    },
    direct: true,
    content: function() {
        "step 0";
        var owner = game.findPlayer(function(current) {
            return current.storage.toaru_hengwen_record && 
                   current.storage.toaru_hengwen_record[player.playerid] != undefined;
        });
        if (!owner) {
            event.finish();
            return;
        }
        event.owner = owner;
        var recordHp = player.storage.toaru_hengwen_hp;
        var delta = recordHp - player.hp;
        
        owner.chooseBool("是否令" + get.translation(player) + "的体力恢复至" + recordHp + "点？")
            .set("ai", function() {
                var player = _status.event.player;
                var target = _status.event.getParent().player;
                if (get.attitude(player, target) > 0 && delta > 0) return true;
                if (get.attitude(player, target) < 0 && delta < 0) return true;
                return false;
            });

        "step 1";
        if (result.bool) {
            var recordHp = player.storage.toaru_hengwen_hp;
            var delta = recordHp - player.hp;
            
            if (delta > 0) {
                player.recover(delta);
                game.log(player, "恢复了", delta, "点体力");
            } else if (delta < 0) {
                player.loseHp(-delta);
                game.log(player, "失去了", -delta, "点体力");
            }
            
            // 移除恒温标记
            player.removeMark("toaru_hengwen_mark", 1);
            player.removeSkill("toaru_hengwen_mark");
            delete event.owner.storage.toaru_hengwen_record[player.playerid];
            delete player.storage.toaru_hengwen_hp;
            
            // 重置纵幻

                player.restoreSkill("toaru_zonghuan");
                game.log(event.owner, "重置了技能", "#g【纵幻】");
            
        }
    },
},

// 纵幻技能
toaru_zonghuan: {
    audio: "ext:学园都市:2",
    limited: true,
    skillAnimation: true,
    animationColor: "thunder",
    unique: true,
    mark: true,
    intro: {
        content: "limited",
    },
    trigger: {
        target: "useCardToTargeted",
    },
    filter: function(event, player) {
        return event.targets.length == 1;
    },
    check: function(event, player) {
        return get.effect(player, event.card, event.player, player) < 0;
    },
    logTarget: "player",
    content: function() {
        "step 0";
        player.awakenSkill("toaru_zonghuan");
        trigger.targets.remove(player);
        trigger.getParent().triggeredTargets2.remove(player);
        game.log(trigger.card, "对", player, "无效");
            player.restoreSkill("toaru_hengwen");
            game.log(player, "重置了技能", "#g【恒温】");
        
        "step 1";
        player.chooseTarget("请选择" + get.translation(trigger.card) + "的新目标", true, function(card, player, target) {
            var trigger = _status.event.getTrigger();
            return target != player && lib.filter.targetEnabled(trigger.card, trigger.player, target);
        }).set("ai", function(target) {
            var trigger = _status.event.getTrigger();
            return get.effect(target, trigger.card, trigger.player, _status.event.player);
        });
        "step 2";
        if (result.bool) {
            var target = result.targets[0];
            trigger.targets.push(target);
            trigger.getParent().triggeredTargets2.push(target);
            game.log(target, "成为了", trigger.card, "的目标");
        }
    },
},

// ==================== 白井黑子 ====================

// 瞬移技能
toaru_shunyi: {
    audio: "ext:学园都市:2",
    enable: "phaseUse",
    usable: 1,
    init: function(player) {
        if (!player.storage.toaru_shunyi_options) {
            player.storage.toaru_shunyi_options = [true, true];
        }
    },
    filter: function(event, player) {
        return player.storage.toaru_shunyi_options && 
               (player.storage.toaru_shunyi_options[0] || player.storage.toaru_shunyi_options[1]);
    },
    content: function() {
        "step 0";
        var choices = [];
        var choiceList = [
            "转移一张牌至另一名角色的相应区域",
            "移动一名角色的座位至其他两名角色中间"
        ];
        
        if (player.storage.toaru_shunyi_options[0]) choices.push("选项一");
        if (player.storage.toaru_shunyi_options[1]) choices.push("选项二");
        
        player.chooseControl(choices)
            .set("prompt", "瞬移：请选择一项")
            .set("choiceList", choiceList)
            .set("ai", function() {
                return "选项一";
            });
        "step 1";
        if (result.control == "选项一") {
            event.goto(2);
        } else {
            event.goto(10);
        }
        "step 2";
        // 选项一：转移牌
        player.chooseTarget("请选择要转移牌的角色", true, function(card, player, target) {
            return player.inRange(target);
        }).set("ai", function(target) {
            var player = _status.event.player;
            if (target == player) return 1;
            if (get.attitude(player, target) > 0) return 0.5;
            return 2;
        });
        "step 3";
        if (result.bool) {
            event.source = result.targets[0];
        } else {
            event.finish();
        }
        "step 4";
        var areas = [];
        if (event.source.countCards('h') > 0) areas.push('手牌区');
        if (event.source.countCards('e') > 0) areas.push('装备区');
        if (event.source.countCards('j') > 0) areas.push('判定区');
        
        if (areas.length == 0) {
            event.finish();
            return;
        }
        
        player.chooseControl(areas)
            .set("prompt", "请选择要转移的区域")
            .set("ai", function() {
                return _status.event.controls.randomGet();
            });
        "step 5";
        event.area = result.control;
        var position = 'h';
        if (event.area == '装备区') position = 'e';
        if (event.area == '判定区') position = 'j';
        
        player.choosePlayerCard(event.source, position, true, "请选择要转移的牌");
        "step 6";
        if (result.bool) {
            event.card = result.cards[0];
        } else {
            event.finish();
        }
        "step 7";
        player.chooseTarget("请选择转移目标", true, function(card, player, target) {
            return target != _status.event.source;
        }).set("source", event.source)
            .set("ai", function(target) {
                var player = _status.event.player;
                var att = get.attitude(player, target);
                var card = _status.event.getParent().card;
                if (get.value(card, target) > 0) return att;
                return -att;
            });
        "step 8";
        if (result.bool) {
            var target = result.targets[0];
            var position = 'h';
            if (event.area == '装备区') position = 'e';
            if (event.area == '判定区') position = 'j';
            
            target.gain(event.card, event.source, position);
            game.log(player, "将", event.source, "的", event.card, "转移给了", target);
        }
        event.finish();
        "step 10";
        // 选项二：移动座位
        player.chooseTarget("请选择要移动的角色", true, function(card, player, target) {
            return player.inRange(target);
        }).set("ai", function(target) {
            return Math.random();
        });
        "step 11";
        if (result.bool) {
            event.moveTarget = result.targets[0];
        } else {
            event.finish();
        }
        "step 12";
        player.chooseTarget("请选择两名角色，将" + get.translation(event.moveTarget) + "移动至其中间", 2, true, function(card, player, target) {
            return target != _status.event.moveTarget;
        }).set("moveTarget", event.moveTarget)
            .set("ai", function(target) {
                return Math.random();
            });
        "step 13";
        if (result.bool && result.targets.length == 2) {
            var targets = result.targets;
            var index1 = game.players.indexOf(targets[0]);
            var index2 = game.players.indexOf(targets[1]);
            var newIndex = Math.floor((index1 + index2) / 2);
            
            game.players.remove(event.moveTarget);
            game.players.splice(newIndex, 0, event.moveTarget);
            game.arrangePlayers();
            
            game.log(player, "将", event.moveTarget, "移动至", targets[0], "和", targets[1], "之间");
            
            // 移除选项二
            player.storage.toaru_shunyi_options[1] = false;
        }
    },
    ai: {
        order: 8,
        result: {
            player: 1,
        },
    },
    mod: {
        maxHandcard: function(player, num) {
            if (player.hasSkill("toaru_jiekong") && 
                game.hasPlayer(function(current) {
                    return current.name == "toaru_misakamikoto" && 
                           current.group == player.group;
                })) {
                return num + 1;
            }
        },
    },
},

// 钢钉装备牌
toaru_gangding: {
    type: "equip",
    subtype: "equip3",
    distance: {
        attackFrom: -1,
    },
    skills: ["toaru_gangding_skill"],
    ai: {
        basic: {
            equipValue: -5,
        },
    },
},

toaru_gangding_skill: {
    charlotte: true,
    forced: true,
    mod: {
        attackRange: function(player, distance) {
            return 1;
        },
        canBeLinked: function(player) {
            return false;
        },
    },
    trigger: {
        player: "loseBegin",
    },
    filter: function(event, player) {
        if (event.getParent().name == "compareMultiple") return true;
        if (event.getParent().name == "compare") return true;
        return false;
    },
    forced: true,
    content: function() {
        trigger.cancel();
    },
    group: ["toaru_gangding_skill_card"],
    subSkill: {
        card: {
            mod: {
                cardEnabled: function(card, player) {
                    if (!card.isCard) return false;
                },
            },
        },
    },
},

// 风纪技能（白井黑子版）
toaru_fengji_shirai: {
    audio: "ext:学园都市:2",
    trigger: {
        global: "damageEnd",
    },
    filter: function(event, player) {
        return event.source && event.source.isIn() && 
               player.inRange(event.source) &&
               player.countCards('he') > 0;
    },
    round: 1,
    logTarget: "source",
    check: function(event, player) {
        return get.attitude(player, event.source) < 0;
    },
    content: function() {
        "step 0";
        player.chooseCard('he', true, "请选择一张牌作为【钢钉】");
        "step 1";
        if (result.bool) {
            var card = result.cards[0];
            player.lose(card, ui.special, 'toSpecial');
            
            // 创建钢钉
            var gangding = game.createCard('toaru_gangding', '', '');
            trigger.source.equip(gangding);
            game.log(player, "将", card, "作为【钢钉】置于", trigger.source, "的装备区");
        } else {
            event.finish();
        }
        "step 2";
        trigger.source.chooseControl("不能使用打出牌", "失去体力", "保留手牌和钢钉")
            .set("prompt", "风纪：请选择一项")
            .set("ai", function() {
                var player = _status.event.player;
                if (player.hp <= 2) return "不能使用打出牌";
                if (player.countCards('h') <= 2) return "失去体力";
                return "保留手牌和钢钉";
            });
        "step 3";
        if (result.control == "不能使用打出牌") {
            trigger.source.addTempSkill("toaru_fengji_ban", {player: "phaseAfter"});
            game.log(trigger.source, "本回合不能使用或打出手牌且所有非锁定技失效");
        } else if (result.control == "失去体力") {
            trigger.source.loseHp();
        } else {
            var cards = trigger.source.getCards('he');
            var toDiscard = [];
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].name != 'toaru_gangding') {
                    toDiscard.push(cards[i]);
                }
            }
            
            if (trigger.source.countCards('h') > 1) {
                toDiscard.remove(trigger.source.getCards('h').randomGet());
            }
            
            if (toDiscard.length > 0) {
                trigger.source.discard(toDiscard);
            }
        }
    },
},

toaru_fengji_ban: {
    charlotte: true,
    mark: true,
    intro: {
        content: "不能使用或打出手牌且所有非锁定技失效",
    },
    mod: {
        cardEnabled: function(card) {
            return false;
        },
        cardSavable: function(card) {
            return false;
        },
        cardRespondable: function(card) {
            return false;
        },
        skillDisabled: function(skill) {
            return !get.info(skill).forced;
        },
    },
},

// 修改后的姐控技能
toaru_jiekong: {
    audio: "ext:学园都市:2",
    forced: true,
    group: ["toaru_jiekong_same", "toaru_jiekong_diff", "toaru_jiekong_target"],
    subSkill: {
        same: {
            trigger: {
                source: "damageEnd",
                player: "damageEnd",
            },
            filter: function(event, player) {
                var mikoto = game.findPlayer(function(current) {
                    return current.name == "toaru_misakamikoto";
                });
                return mikoto && mikoto.group == player.group;
            },
            forced: true,
            content: function() {
                var mikoto = game.findPlayer(function(current) {
                    return current.name == "toaru_misakamikoto";
                });
                if (mikoto) {
                    player.draw();
                    mikoto.draw();
                    game.log(player, "和", mikoto, "各摸了一张牌");
                }
            },
        },
        diff: {
            trigger: {
                source: "damageBegin1",
                player: "damageBegin4",
            },
            filter: function(event, player) {
                var mikoto = game.findPlayer(function(current) {
                    return current.name == "toaru_misakamikoto";
                });
                if (!mikoto || mikoto.group == player.group) return false;
                
                if (event.name == "damage") {
                    return event.player && event.player.name == "toaru_misakamikoto";
                } else {
                    return event.source && event.source.name == "toaru_misakamikoto";
                }
            },
            forced: true,
            content: function() {
                trigger.num++;
                game.log(player, "对御坂美琴造成的伤害+1");
            },
        },
        // 新增：成为彼此牌的目标后目标摸一张牌
        target: {
            trigger: {
                target: "useCardToTargeted",
                player: "useCardToTargeted",
            },
            filter: function(event, player) {
                var mikoto = game.findPlayer(function(current) {
                    return current.name == "toaru_misakamikoto";
                });
                if (!mikoto || mikoto.group == player.group) return false;
                
                // 如果是player成为目标，检查使用者是否是美琴
                if (event.player == player) {
                    return event.target && event.target.name == "toaru_misakamikoto";
                }
                // 如果是player使用牌，检查目标是否是美琴
                else {
                    return event.player && event.player.name == "toaru_misakamikoto" && 
                           event.targets && event.targets.includes(player);
                }
            },
            forced: true,
            content: function() {
                // 目标摸一张牌
                if (trigger.player == player) {
                    // player使用牌，美琴是目标
                    trigger.target.draw();
                    game.log(trigger.target, "摸了一张牌");
                } else {
                    // 美琴使用牌，player是目标
                    player.draw();
                    game.log(player, "摸了一张牌");
                }
            },
        },
    },
    mod: {
        cardUsable: function(card, player, num) {
            var mikoto = game.findPlayer(function(current) {
                return current.name == "toaru_misakamikoto";
            });
            if (mikoto && mikoto.group == player.group) {
                // 瞬移和风纪次数+1
                if (card && (card.name == "toaru_shunyi" || card.name == "toaru_fengji_shirai")) {
                    return num + 1;
                }
            }
        },
        maxHandcard: function(player, num) {
            if (player.hasSkill("toaru_jiekong") && 
                game.hasPlayer(function(current) {
                    return current.name == "toaru_misakamikoto" && 
                           current.group == player.group;
                })) {
                return num + 1;
            }
        },
    },
},


// 矢量操作技能
toaru_shiliangcaozuo: {
    audio: "ext:学园都市:2",
    group: ["toaru_shiliangcaozuo_attack", "toaru_shiliangcaozuo_defend", "toaru_shiliangcaozuo_gain"],
    init: function(player) {
        if (!player.storage.toaru_shiliangcaozuo) {
            player.storage.toaru_shiliangcaozuo = 1;
        }
        if (!player.storage.toaru_shiliangcaozuo_max) {
            player.storage.toaru_shiliangcaozuo_max = 7;
        }
        if (!player.storage.toaru_shiliangcaozuo_count) {
            player.storage.toaru_shiliangcaozuo_count = 0;
        }
    },
    mark: true,
    intro: {
        name: "蓄力值",
        content: function(storage, player) {
            return "当前蓄力值：" + player.storage.toaru_shiliangcaozuo + "/" + player.storage.toaru_shiliangcaozuo_max;
        },
    },
    subSkill: {
        // ①攻击效果
        attack: {
            audio: "toaru_shiliangcaozuo",
            enable: "phaseUse",
            usable: 1,
            filter: function(event, player) {
                return player.storage.toaru_shiliangcaozuo > 0;
            },
            filterTarget: function(card, player, target) {
                return target != player;
            },
            content: function() {
                "step 0";
                player.storage.toaru_shiliangcaozuo--;
                player.markSkill("toaru_shiliangcaozuo");
                player.syncStorage("toaru_shiliangcaozuo");
                
                target.damage('wind', player);
                "step 1";
                target.link();
                "step 2";
                var equips = target.getCards('e');
                if (equips.length > 0) {
                    target.discard(equips.randomGet());
                } else {
                    player.addTempSkill("toaru_shiliangcaozuo_extra", "phaseUseEnd");
                    player.addMark("toaru_shiliangcaozuo_extra", 1, false);
                }
            },
            ai: {
                order: 9,
                result: {
                    target: function(player, target) {
                        return -2;
                    },
                },
            },
        },
        // ②防御效果
        defend: {
            audio: "toaru_shiliangcaozuo",
            trigger: {
                player: "damageBegin3",
            },
            filter: function(event, player) {
                return event.player != player  && player.storage.toaru_shiliangcaozuo > 0 &&  get.is.realCard(event.card);
            },
            check: function(event, player) {
                return true;
            },
            logTarget: "source",
            content: function() {
                "step 0";
                player.storage.toaru_shiliangcaozuo--;
                player.markSkill("toaru_shiliangcaozuo");
                player.syncStorage("toaru_shiliangcaozuo");
                
                trigger.cancel();
                game.log(player, "反射了伤害");
                "step 1";
                if (trigger.source && trigger.source.isIn()) {
                    trigger.source.damage(trigger.num, trigger.nature, trigger.source);
                }
            },
        },
        // ③获得蓄力值
        gain: {
            audio: "toaru_shiliangcaozuo",
            trigger: {
                global: "cardsDiscardAfter",
            },
            filter: function(event, player) {
                for (var i = 0; i < event.cards.length; i++) {
                    if (get.tag(event.cards[i], 'damage')) return true;
                }
                return false;
            },
            forced: true,
            content: function() {
                var count = 0;
                for (var i = 0; i < trigger.cards.length; i++) {
                    if (get.tag(trigger.cards[i], 'damage')) {
                        count++;
                        player.storage.toaru_shiliangcaozuo_count++;
                    }
                }
                
                if (player.storage.toaru_shiliangcaozuo < player.storage.toaru_shiliangcaozuo_max) {
                    player.storage.toaru_shiliangcaozuo = Math.min(
                        player.storage.toaru_shiliangcaozuo + count,
                        player.storage.toaru_shiliangcaozuo_max
                    );
                }
                
                player.markSkill("toaru_shiliangcaozuo");
                player.syncStorage("toaru_shiliangcaozuo");
                
                // 每7张伤害牌增加上限
                while (player.storage.toaru_shiliangcaozuo_count >= 7) {
                    player.storage.toaru_shiliangcaozuo_count -= 7;
                    player.storage.toaru_shiliangcaozuo_max++;
                    game.log(player, "的蓄力值上限增加至", player.storage.toaru_shiliangcaozuo_max);
                }
            },
        },
    },
},

toaru_shiliangcaozuo_extra: {
    onremove: true,
    charlotte: true,
    mod: {
        cardUsable: function(card, player, num) {
            if (card.name == "toaru_shiliangcaozuo_attack") {
                return num + player.countMark("toaru_shiliangcaozuo_extra");
            }
        },
    },
},

// ==================== 固法美伟 ====================

// 透视技能
toaru_toushi: {
    audio: "ext:学园都市:2",
    forced: true,
    trigger: {
        global: "gameStart",
        player: "enterGame",
    },
    content: function() {
        player.addSkill("toaru_toushi_area");
        player.addSkill("toaru_toushi_pile");
    },
},

// 透视-区域（查看所有角色的牌）
toaru_toushi_area: {
    charlotte: true,
    mark: true,
    marktext: "区",
    intro: {
        name: "透视-区域",
        mark(dialog, content, player) {
            const intronode = ui.create.div(".menubutton.pointerdiv", "点击查看", function() {
                if (!this.classList.contains("disabled")) {
                    lib.skill.toaru_toushi_area.clickable(player);
                }
            });
            if (!_status.gameStarted || !player.isUnderControl(true)) {
                intronode.classList.add("disabled");
                intronode.style.opacity = 0.5;
            }
            dialog.addText("查看所有角色的牌");
            dialog.add(intronode);
        },
    },
    clickable(player) {
        if (player.isUnderControl(true)) {
            const dialog = ui.create.dialog("透视-区域", "forcebutton", "hidden");
            dialog.classList.add("fullwidth");
            dialog.classList.add("fullheight");
            dialog.classList.add("noslide");
            
            // 为每个角色创建按钮
            const buttons = [];
            for (let target of game.players) {
                buttons.push(target.name);
            }
            
            dialog.add([buttons, "character"]);
            
            // 添加关闭按钮
            const closeBtn = ui.create.control("关闭", () => {
                dialog.close();
                closeBtn.close();
            });
            
            // 点击角色按钮查看其牌
            for (let i = 0; i < dialog.buttons.length; i++) {
                const button = dialog.buttons[i];
                const target = game.players[i];
                button.listen(function() {
                    lib.skill.toaru_toushi_area.showPlayerCards(player, target);
                });
            }
            
            dialog.open();
            
            if (_status.toaru_toushi_area_dialog) {
                _status.toaru_toushi_area_dialog.close();
            }
            _status.toaru_toushi_area_dialog = dialog;
        }
    },
    showPlayerCards(player, target) {
        const dialog = ui.create.dialog(`${get.translation(target)}的牌`, "forcebutton", "hidden");
        dialog.classList.add("fullwidth");
        
        // 手牌
        const hs = target.getCards("h");
        if (hs.length > 0) {
            dialog.addText("手牌");
            dialog.addSmall(hs);
        } else {
            dialog.addText("手牌：无");
        }
        
        // 装备区
        const es = target.getCards("e");
        if (es.length > 0) {
            dialog.addText("装备区");
            dialog.addSmall(es);
        }
        
        // 判定区
        const js = target.getCards("j");
        if (js.length > 0) {
            dialog.addText("判定区");
            dialog.addSmall(js);
        }
        
        // 特殊区域（木牛流马等）
        for (let key in target.storage) {
            if (key.startsWith("subplayer_") || key === "muniu") {
                const cards = target.storage[key];
                if (Array.isArray(cards) && cards.length > 0) {
                    dialog.addText(`特殊区域-${key}`);
                    dialog.addSmall(cards);
                }
            }
        }
        
        // 添加返回和关闭按钮
        const backBtn = ui.create.control("返回", () => {
            dialog.close();
            backBtn.close();
            closeBtn.close();
            lib.skill.toaru_toushi_area.clickable(player);
        });
        const closeBtn = ui.create.control("关闭", () => {
            dialog.close();
            backBtn.close();
            closeBtn.close();
        });
        
        dialog.open();
        
        if (_status.toaru_toushi_area_detail) {
            _status.toaru_toushi_area_detail.close();
        }
        _status.toaru_toushi_area_detail = dialog;
    },
    mod: {
        cardVisible: function(card, player) {
            return true;
        },
    },
},

// 透视-牌堆（查看牌堆顶的牌）
toaru_toushi_pile: {
    charlotte: true,
    mark: true,
    marktext: "堆",
    intro: {
        name: "透视-牌堆",
        mark(dialog, content, player) {
            const intronode = ui.create.div(".menubutton.pointerdiv", "点击查看", function() {
                if (!this.classList.contains("disabled")) {
                    lib.skill.toaru_toushi_pile.clickable(player);
                }
            });
            if (!_status.gameStarted || !player.isUnderControl(true)) {
                intronode.classList.add("disabled");
                intronode.style.opacity = 0.5;
            }
            dialog.addText("查看牌堆顶的牌");
            dialog.add(intronode);
        },
    },
    clickable(player) {
        if (player.isUnderControl(true)) {
            lib.skill.toaru_toushi_pile.showPileCards(player);
        }
    },
    showPileCards(player) {
        const dialog = ui.create.dialog("透视-牌堆", "forcebutton", "hidden");
        dialog.classList.add("fullwidth");
        dialog.classList.add("fullheight");
        
        // 获取牌堆顶的牌
        let cards = [];
        if (ui.cardPile && ui.cardPile.hasChildNodes !== false) {
            cards = Array.from(ui.cardPile.childNodes);
        }
        
        if (cards.length > 0) {
            // 添加搜索功能
            dialog.addText("搜索第几张牌（从上至下）：");
            const input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = cards.length.toString();
            input.placeholder = "输入1-" + cards.length;
            input.style.cssText = "width:200px;height:30px;font-size:16px;margin:10px;";
            dialog.content.appendChild(input);
            
            const searchBtn = ui.create.div(".menubutton.large", "搜索", function() {
                const num = parseInt(input.value);
                if (num >= 1 && num <= cards.length) {
                    const targetCard = cards[num - 1];
                    // 高亮显示目标牌
                    for (let btn of dialog.buttons) {
                        if (btn.link === targetCard) {
                            btn.style.border = "3px solid red";
                            btn.scrollIntoView({ behavior: "smooth", block: "center" });
                        } else {
                            btn.style.border = "";
                        }
                    }
                } else {
                    alert("请输入有效的牌序号（1-" + cards.length + "）");
                }
            });
            searchBtn.style.cssText = "margin:10px;width:100px;";
            dialog.content.appendChild(searchBtn);
            
            // 显示牌堆信息
            dialog.addText(`牌堆共有 ${cards.length} 张牌`);
            dialog.addText("显示前50张牌：");
            
            // 显示前50张牌（带序号）
            const displayCards = cards.slice(0, 50);
            const cardsWithIndex = [];
            for (let i = 0; i < displayCards.length; i++) {
                cardsWithIndex.push({
                    card: displayCards[i],
                    index: i + 1
                });
            }
            
            // 创建自定义按钮组
            const buttonContainer = ui.create.div(".buttons");
            buttonContainer.style.cssText = "display:flex;flex-wrap:wrap;justify-content:flex-start;padding:10px;";
            
            for (let item of cardsWithIndex) {
                const cardWrapper = ui.create.div();
                cardWrapper.style.cssText = "position:relative;margin:5px;display:inline-block;";
                
                // 创建序号标签
                const indexLabel = ui.create.div("", item.index.toString());
                indexLabel.style.cssText = "position:absolute;top:-8px;left:-8px;background:red;color:white;border-radius:50%;width:24px;height:24px;text-align:center;line-height:24px;font-weight:bold;z-index:100;font-size:12px;";
                
                // 创建卡牌按钮
                const cardBtn = ui.create.button(item.card, "card");
                cardBtn.style.cssText = "margin:0;";
                
                cardWrapper.appendChild(indexLabel);
                cardWrapper.appendChild(cardBtn);
                buttonContainer.appendChild(cardWrapper);
                
                // 保存到dialog.buttons用于搜索
                if (!dialog.buttons) dialog.buttons = [];
                dialog.buttons.push(cardBtn);
            }
            
            dialog.content.appendChild(buttonContainer);
            
            // 添加查看更多按钮
            if (cards.length > 50) {
                const moreBtn = ui.create.div(".menubutton.large", `查看更多（剩余${cards.length - 50}张）`, function() {
                    dialog.close();
                    closeBtn.close();
                    lib.skill.toaru_toushi_pile.showMoreCards(player, cards, 50);
                });
                moreBtn.style.cssText = "margin:10px;";
                dialog.content.appendChild(moreBtn);
            }
        } else {
            dialog.addText("牌堆无牌");
        }
        
        // 添加关闭按钮
        const closeBtn = ui.create.control("关闭", () => {
            dialog.close();
            closeBtn.close();
        });
        
        dialog.open();
        
        if (_status.toaru_toushi_pile_dialog) {
            _status.toaru_toushi_pile_dialog.close();
        }
        _status.toaru_toushi_pile_dialog = dialog;
    },
    showMoreCards(player, allCards, startIndex) {
        const dialog = ui.create.dialog("透视-牌堆（续）", "forcebutton", "hidden");
        dialog.classList.add("fullwidth");
        dialog.classList.add("fullheight");
        
        dialog.addText(`显示第${startIndex + 1}-${Math.min(startIndex + 50, allCards.length)}张牌：`);
        
        const displayCards = allCards.slice(startIndex, startIndex + 50);
        const cardsWithIndex = [];
        for (let i = 0; i < displayCards.length; i++) {
            cardsWithIndex.push({
                card: displayCards[i],
                index: startIndex + i + 1
            });
        }
        
        // 创建自定义按钮组
        const buttonContainer = ui.create.div(".buttons");
        buttonContainer.style.cssText = "display:flex;flex-wrap:wrap;justify-content:flex-start;padding:10px;";
        
        for (let item of cardsWithIndex) {
            const cardWrapper = ui.create.div();
            cardWrapper.style.cssText = "position:relative;margin:5px;display:inline-block;";
            
            // 创建序号标签
            const indexLabel = ui.create.div("", item.index.toString());
            indexLabel.style.cssText = "position:absolute;top:-8px;left:-8px;background:red;color:white;border-radius:50%;width:24px;height:24px;text-align:center;line-height:24px;font-weight:bold;z-index:100;font-size:12px;";
            
            // 创建卡牌按钮
            const cardBtn = ui.create.button(item.card, "card");
            cardBtn.style.cssText = "margin:0;";
            
            cardWrapper.appendChild(indexLabel);
            cardWrapper.appendChild(cardBtn);
            buttonContainer.appendChild(cardWrapper);
        }
        
        dialog.content.appendChild(buttonContainer);
        
        // 添加导航按钮
        const prevBtn = startIndex > 0 ? ui.create.control("上一页", () => {
            dialog.close();
            if (prevBtn) prevBtn.close();
            if (nextBtn) nextBtn.close();
            backBtn.close();
            closeBtn.close();
            lib.skill.toaru_toushi_pile.showMoreCards(player, allCards, Math.max(0, startIndex - 50));
        }) : null;
        
        const nextBtn = (startIndex + 50 < allCards.length) ? ui.create.control("下一页", () => {
            dialog.close();
            if (prevBtn) prevBtn.close();
            if (nextBtn) nextBtn.close();
            backBtn.close();
            closeBtn.close();
            lib.skill.toaru_toushi_pile.showMoreCards(player, allCards, startIndex + 50);
        }) : null;
        
        const backBtn = ui.create.control("返回", () => {
            dialog.close();
            if (prevBtn) prevBtn.close();
            if (nextBtn) nextBtn.close();
            backBtn.close();
            closeBtn.close();
            lib.skill.toaru_toushi_pile.showPileCards(player);
        });
        
        const closeBtn = ui.create.control("关闭", () => {
            dialog.close();
            if (prevBtn) prevBtn.close();
            if (nextBtn) nextBtn.close();
            backBtn.close();
            closeBtn.close();
        });
        
        dialog.open();
    },
},

// 风纪技能（固法美伟版）
toaru_fengji_konori: {
    audio: "ext:学园都市:2",
    trigger: {
        global: "damageEnd",
    },
    filter: function(event, player) {
        return event.source && event.source.isIn() && 
               player.inRange(event.source) &&
               player.countCards('he') > 0;
    },
    usable: 1,
    logTarget: "source",
    check: function(event, player) {
        return get.attitude(player, event.source) < 0;
    },
    content: function() {
        "step 0";
        player.chooseCard('he', true, "请弃置一张牌");
        "step 1";
        if (result.bool) {
            // 记录弃置的牌的颜色
            event.discardedColor = get.color(result.cards[0]);
            player.discard(result.cards[0]);
        } else {
            event.finish();
        }
        "step 2";
        var areas = [];
        if (trigger.source.countCards('h') > 0) areas.push('手牌区');
        if (trigger.source.countCards('e') > 0) areas.push('装备区');
        if (trigger.source.countCards('j') > 0) areas.push('判定区');
        
        if (areas.length == 0) {
            event.finish();
            return;
        }
        
        player.chooseControl(areas)
            .set("prompt", "请选择要弃置的区域")
            .set("ai", function() {
                return _status.event.controls[0];
            });
        "step 3";
        if (result.control) {
            event.selectedArea = result.control;
            var position = 'h';
            if (result.control == '装备区') position = 'e';
            if (result.control == '判定区') position = 'j';
            
            var cards = trigger.source.getCards(position);
            if (cards.length == 0) {
                event.finish();
                return;
            }
            
            // 使用之前记录的颜色
            var color = event.discardedColor;
            var toDiscard = [];
            
            for (var i = 0; i < cards.length; i++) {
                if (get.color(cards[i]) == color) {
                    toDiscard.push(cards[i]);
                }
            }
            
            if (toDiscard.length > 0) {
                trigger.source.discard(toDiscard);
                game.log(player, "弃置了", trigger.source, "的", toDiscard);
            } else {
                game.log(trigger.source, "的", event.selectedArea, "没有", color == 'red' ? '红色' : '黑色', "牌");
            }
        }
    },
},

// ==================== 食蜂操祈 ====================

toaru_duxin: {
    audio: "ext:学园都市:2",
    group: ["toaru_duxin_view", "toaru_duxin_skill", "toaru_duxin_control"],
    subSkill: {
        // 1. 观看并使用手牌
        view: {
            audio: "toaru_duxin",
            enable: "phaseUse",
            usable: 1,
            filter: function(event, player) {
                var yangmu = game.findPlayer(function(current) {
                    return current.hasSkill("toaru_yangmu");
                });
                return yangmu && yangmu.countCards('h') > 0;
            },
            content: function() {
                "step 0";
                var yangmu = game.findPlayer(function(current) {
                    return current.hasSkill("toaru_yangmu");
                });
                if (yangmu) {
                    event.target = yangmu;
                } else {
                    event.finish();
                    return;
                }
                var cards = event.target.getCards('h');
                player.chooseButton(["读心：选择一张牌使用", cards], true).set("filterButton", function(button) {
                    return _status.event.player.hasUseTarget(button.link);
                }).set("ai", function(button) {
                    return _status.event.player.getUseValue(button.link);
                });
                "step 1";
                if (result.bool) {
                    var card = result.links[0];
                    event.target.lose(card, ui.special);
                    player.chooseUseTarget(card, event.target, true);
                    
                    // 获得星星
                    player.addMark("toaru_waizhuang_star", 1);
                }
            },
            ai: {
                order: 10,
                result: {
                    player: 1,
                },
            },
        },
        // 2. 发动技能
        skill: {
            audio: "toaru_duxin",
            trigger: {
                global: "phaseBefore",
            },
            direct: true,
            usable: 1,
            filter: function(event, player) {
                var yangmu = game.findPlayer(function(current) {
                    return current.hasSkill("toaru_yangmu");
                });
                return yangmu;
            },
            content: function() {
                "step 0";
                var yangmu = game.findPlayer(function(current) {
                    return current.hasSkill("toaru_yangmu");
                });
                if (yangmu) {
                    event.target = yangmu;
                } else {
                    event.finish();
                    return;
                }
                
                var skills = event.target.getSkills(null, false, false).filter(function(skill) {
                    var info = get.info(skill);
                    return info && !info.charlotte;
                });
                
                if (skills.length == 0) {
                    event.finish();
                    return;
                }
                
                player.chooseControl(skills, "cancel2")
                    .set("prompt", "选择要发动的技能")
                    .set("ai", function() {
                        return _status.event.controls[0];
                    });
                "step 1";
                if (result.control != "cancel2") {
                    game.log(player, "通过【读心】发动了", event.target, "的技能", "#g【" + get.translation(result.control) + "】");
                    event.target.useSkill(result.control);
                    
                    // 获得星星
                    player.addMark("toaru_waizhuang_star", 1);
                }
            },
        },
        // 3. 控制回合
        control: {
            audio: "toaru_duxin",
            trigger: {
                player: "phaseEnd",
            },
            usable: 1,
            direct: true,
            filter: function(event, player) {
                var yangmu = game.findPlayer(function(current) {
                    return current.hasSkill("toaru_yangmu");
                });
                return yangmu;
            },
            content: function() {
                "step 0";
                var yangmu = game.findPlayer(function(current) {
                    return current.hasSkill("toaru_yangmu");
                });
                if (!yangmu) {
                    event.finish();
                    return;
                }
                
                player.chooseBool("是否令" + get.translation(yangmu) + "失去1点体力上限并控制其进行额外回合？")
                    .set("ai", function() {
                        return false; // AI谨慎使用
                    });
                event.target = yangmu;
                "step 1";
                if (!result.bool) {
                    event.finish();
                    return;
                }
                
                event.target.loseMaxHp();
                game.log(player, "控制了", event.target, "进行额外回合");
                event.target.insertPhase();
                
                // 获得星星
                player.addMark("toaru_waizhuang_star", 1);
            },
        },
    },
},

// 读心二级（强化版）
toaru_duxin2: {
    audio: "toaru_duxin",
    group: ["toaru_duxin2_view", "toaru_duxin2_skill", "toaru_duxin2_control"],
    subSkill: {
        // 1. 观看并使用任意角色手牌
        view: {
            audio: "toaru_duxin",
            enable: ["chooseToUse", "phaseUse"],
            usable: 1,
            filter: function(event, player) {
                return game.hasPlayer(function(current) {
                    return current != player && current.countCards('h') > 0;
                });
            },
            content: function() {
                "step 0";
                player.chooseTarget("请选择要观看手牌的角色", true, function(card, player, target) {
                    return target != player && target.countCards('h') > 0;
                }).set("ai", function(target) {
                    return target.countCards('h');
                });
                "step 1";
                if (result.bool) {
                    event.target = result.targets[0];
                }
                if (!event.target) {
                    event.finish();
                    return;
                }
                var cards = event.target.getCards('h');
                player.chooseButton(["读心：选择一张牌使用", cards], true).set("filterButton", function(button) {
                    return _status.event.player.hasUseTarget(button.link);
                }).set("ai", function(button) {
                    return _status.event.player.getUseValue(button.link);
                });
                "step 2";
                if (result.bool) {
                    var card = result.links[0];
                    event.target.lose(card, ui.special);
                    player.chooseUseTarget(card, event.target, true);
                    
                    // 获得星星
                    player.addMark("toaru_waizhuang_star", 1);
                }
            },
            ai: {
                order: 10,
                result: {
                    player: 1,
                },
            },
        },
        // 2. 发动任意角色技能
        skill: {
            audio: "toaru_duxin",
            trigger: {
                global: "phaseBefore",
            },
            direct: true,
            usable: 1,
            filter: function(event, player) {
                return game.hasPlayer(function(current) {
                    return current != player;
                });
            },
            content: function() {
                "step 0";
                player.chooseTarget("读心：请选择要发动技能的角色", function(card, player, target) {
                    return target != player;
                }).set("ai", function(target) {
                    return 1;
                });
                "step 1";
                if (result.bool) {
                    event.target = result.targets[0];
                } else {
                    event.finish();
                    return;
                }
                
                var skills = event.target.getSkills(null, false, false).filter(function(skill) {
                    var info = get.info(skill);
                    return info && !info.charlotte;
                });
                
                if (skills.length == 0) {
                    event.finish();
                    return;
                }
                
                player.chooseControl(skills, "cancel2")
                    .set("prompt", "选择要发动的技能")
                    .set("ai", function() {
                        return _status.event.controls[0];
                    });
                "step 2";
                if (result.control != "cancel2") {
                    game.log(player, "通过【读心】发动了", event.target, "的技能", "#g【" + get.translation(result.control) + "】");
                    event.target.useSkill(result.control);
                    
                    // 获得星星
                    player.addMark("toaru_waizhuang_star", 1);
                }
            },
        },
        // 3. 控制任意角色回合
        control: {
            audio: "toaru_duxin",
            trigger: {
                player: "phaseEnd",
            },
            usable: 1,
            direct: true,
            filter: function(event, player) {
                return game.hasPlayer(function(current) {
                    return current != player;
                });
            },
            content: function() {
                "step 0";
                player.chooseTarget("读心：是否控制一名角色进行额外回合？", function(card, player, target) {
                    return target != player;
                }).set("ai", function(target) {
                    var att = get.attitude(_status.event.player, target);
                    if (att > 0) return att;
                    return 0;
                });
                "step 1";
                if (result.bool) {
                    event.target = result.targets[0];
                } else {
                    event.finish();
                    return;
                }
                
                game.log(player, "控制了", event.target, "进行额外回合");
                event.target.insertPhase();
                
                // 获得星星
                player.addMark("toaru_waizhuang_star", 1);
            },
        },
    },
},

// 外装代脑技能（修改强化部分）
toaru_waizhuang: {
    audio: "ext:学园都市:2",
    trigger: {
        global: "phaseEnd",
    },
    filter: function(event, player) {
        // 检查是否使用过读心的任意子技能
        return player.hasHistory('useSkill', function(evt) {
            return evt.skill && (evt.skill.indexOf('toaru_duxin') == 0 || evt.skill.indexOf('toaru_duxin2') == 0);
        });
    },
    forced: true,
    content: function() {
        player.addMark("toaru_waizhuang_star", 1);
    },
    mark: true,
    intro: {
        name: "星星",
        content: "当前星星数：#",
    },
    group: ["toaru_waizhuang_use"],
},

toaru_waizhuang_use: {
    audio: "toaru_waizhuang",
    trigger: {
        player: "phaseBegin",
    },
    direct: true,
    content: function() {
        "step 0";
        var choices = [];
        var choiceList = [
            "消耗2枚星星：令一名角色的一个技能本回合失效（当前：" + player.countMark("toaru_waizhuang_star") + "枚）",
            "消耗4枚星星：强化【读心】直到你的下回合开始（当前：" + player.countMark("toaru_waizhuang_star") + "枚）",
            "消耗6枚星星：令一名角色增加1点体力上限（当前：" + player.countMark("toaru_waizhuang_star") + "枚）",
            "消耗8枚星星：重置【派阀】（当前：" + player.countMark("toaru_waizhuang_star") + "枚）",
        ];
        
        if (player.countMark("toaru_waizhuang_star") >= 2) choices.push("选项一");
        if (player.countMark("toaru_waizhuang_star") >= 4) choices.push("选项二");
        if (player.countMark("toaru_waizhuang_star") >= 6) choices.push("选项三");
        if (player.countMark("toaru_waizhuang_star") >= 8) choices.push("选项四");
        choices.push("cancel2");
        
        player.chooseControl(choices)
            .set("prompt", "外装代脑：请选择一项")
            .set("choiceList", choiceList)
            .set("ai", function() {
                var player = _status.event.player;
                if (player.countMark("toaru_waizhuang_star") >= 8 && 
                    !player.hasSkill("toaru_paifa", null, false, false)) {
                    return "选项四";
                }
                if (player.countMark("toaru_waizhuang_star") >= 4 && !player.hasSkill("toaru_duxin2")) {
                    return "选项二";
                }
                return "cancel2";
            });
        "step 1";
        if (result.control == "cancel2") {
            event.finish();
            return;
        }
        event.choice = result.control;
        
        if (event.choice == "选项一") {
            player.removeMark("toaru_waizhuang_star", 2);
            player.chooseTarget("请选择一名角色", true).set("ai", function(target) {
                return -get.attitude(_status.event.player, target);
            });
        } else if (event.choice == "选项二") {
            player.removeMark("toaru_waizhuang_star", 4);
            // 移除读心一级，添加读心二级
            player.removeSkill("toaru_duxin");
            player.addTempSkill("toaru_duxin2", {player: "phaseBegin"});
            game.log(player, "强化了", "#g【读心】");
            event.finish();
        } else if (event.choice == "选项三") {
            player.removeMark("toaru_waizhuang_star", 6);
            player.chooseTarget("请选择一名角色增加体力上限", true).set("ai", function(target) {
                return get.attitude(_status.event.player, target);
            });
        } else if (event.choice == "选项四") {
            player.removeMark("toaru_waizhuang_star", 8);
            player.restoreSkill("toaru_paifa");
            game.log(player, "重置了", "#g【派阀】");
            event.finish();
        }
        "step 2";
        if (!result.bool) {
            event.finish();
            return;
        }
        var target = result.targets[0];
        
        if (event.choice == "选项一") {
            var skills = target.getSkills(null, false, false).filter(function(skill) {
                var info = get.info(skill);
                return info && !info.charlotte && !info.locked && !info.hiddenSkill;
            });
            
            if (skills.length == 0) {
                event.finish();
                return;
            }
            
            player.chooseControl(skills)
                .set("prompt", "选择要封印的技能")
                .set("ai", function() {
                    return _status.event.controls[0];
                });
        } else if (event.choice == "选项三") {
            target.gainMaxHp();
            game.log(target, "增加了1点体力上限");
        }
        "step 3";
        if (event.choice == "选项一" && result.control) {
            var target = _status.event.getParent(2).result.targets[0];
            
            // 使用官方fengyin封印技能
            if (!target.hasSkill('fengyin')) {
                target.addTempSkill('fengyin', {player: 'phaseAfter'});
            }
            if (!target.storage.fengyin) {
                target.storage.fengyin = [];
            }
            if (!target.storage.fengyin.includes(result.control)) {
                target.storage.fengyin.push(result.control);
            }
            target.markSkill('fengyin');
            
            game.log(target, "的技能", "#g【" + get.translation(result.control) + "】", "被封印");
        }
    },
},

toaru_waizhuang_enhance: {
    charlotte: true,
    onremove: function(player) {
        // 恢复读心一级
        if (!player.hasSkill("toaru_duxin")) {
            player.addSkill("toaru_duxin");
        }
    },
},


// 派阀技能
toaru_paifa: {
    audio: "ext:学园都市:2",
    limited: true,
    skillAnimation: true,
    animationColor: "thunder",
    unique: true,
    enable: "phaseUse",
    filterTarget: function(card, player, target) {
        return target != player;
    },
    mark: true,
    intro: {
        content: "limited",
    },
    content: function() {
        "step 0";
        player.awakenSkill("toaru_paifa");
        target.gainMaxHp();
        target.draw(3);
        target.addSkill("toaru_yangmu");
        target.storage.toaru_yangmu_source = player;
        
        // 改变胜利条件
        if (player.identity) {
            target.identity = player.identity;
            target.setIdentity();
            game.log(target, "的身份变为", player.identity);
        }
        
        game.log(target, "获得了", "#g【仰慕】");
    },
    ai: {
        order: 1,
        result: {
            target: function(player, target) {
                if (get.attitude(player, target) > 0) return 5;
                return 0;
            },
        },
    },
},

// 仰慕技能
toaru_yangmu: {
    audio: "ext:学园都市:2",
    charlotte: true,
    mark: true,
    intro: {
        content: "仰慕食蜂操祈",
    },
    group: ["toaru_yangmu_view", "toaru_yangmu_damage", "toaru_yangmu_respond"],
    mod: {
        cardVisible: function(card, player) {
            var shiho = game.findPlayer(function(current) {
                return current.name == "toaru_shokuhomisaki";
            });
            if (shiho) return true;
        },
    },
    subSkill: {
        // 手牌可见
        view: {
            forced: true,
            popup: false,
        },
        // 代替承受伤害
        damage: {
            audio: "toaru_yangmu",
            trigger: {
                global: "damageBegin4",
            },
            filter: function(event, player) {
                return event.player && event.player.name == "toaru_shokuhomisaki";
            },
            round: 1,
            logTarget: "player",
            check: function(event, player) {
                return get.attitude(player, event.player) > 0 && player.hp > event.num;
            },
            content: function() {
                trigger.player = player;
                game.log(player, "代替", trigger.player, "承受了伤害");
            },
        },
        // 代替打出牌
        respond: {
            audio: "toaru_yangmu",
            trigger: {
                global: ["chooseToRespondBegin", "chooseToUseBegin"],
            },
            filter: function(event, player) {
                return event.player && event.player.name == "toaru_shokuhomisaki" &&
                       player.countCards('he') > 0;
            },
            round: 1,
            logTarget: "player",
            check: function(event, player) {
                return get.attitude(player, event.player) > 0;
            },
            content: function() {
                "step 0";
                var cards = player.getCards('he');
                var filterCard = trigger.filterCard;
                
                player.chooseCard('he', "是否替" + get.translation(trigger.player) + "打出一张牌？", function(card) {
                    return filterCard(card, trigger.player);
                }).set("ai", function(card) {
                    return 7 - get.value(card);
                });
                "step 1";
                if (result.bool) {
                    trigger.result = {
                        bool: true,
                        cards: result.cards,
                        card: result.cards[0],
                    };
                    trigger.responded = true;
                    trigger.animate = false;
                    game.log(player, "替", trigger.player, "打出了", result.cards[0]);
                }
            },
        },
    },
},

// ==================== 御坂美琴 ====================

// 磁炮技能
toaru_cipao: {
    audio: "ext:学园都市:2",
    enable: "phaseUse",
    usable: 1,
    filterCard: true,
    selectCard: 2,
    position: "he",
    check: function(card) {
        return 6 - get.value(card);
    },
    content: function() {
        var card = game.createCard("toaru_shatiejian","spade",3);
        player.equip(card);
        game.log(player, "装备了", "#g【砂铁剑】");
    },
    ai: {
        order: 8,
        result: {
            player: function(player) {
                if (player.getEquip("toaru_shatiejian")) return 0;
                return 2;
            },
        },
    },
    group: ["toaru_cipao_upgrade"],
},

// 磁炮升级版
toaru_cipao_upgrade: {
    audio: "toaru_cipao",
    enable: ["chooseToUse", "chooseToRespond"],
    usable: 2,
    filter: function(event, player) {
        if (!player.storage.toaru_shenpu_awakened) return false;
        return game.hasPlayer(function(current) {
            return current.countCards('hej') > 0;
        });
    },
    chooseButton: {
        dialog: function(event, player) {
            var list = [];
            game.countPlayer(function(current) {
                var cards = current.getCards('hej');
                list.addArray(cards);
            });
            return ui.create.dialog("磁炮", [list, "vcard"]);
        },
        filter: function(button, player) {
            return _status.event.getParent().filterCard({name: "sha", nature: "thunder"}, player, _status.event.getParent());
        },
        check: function(button) {
            return 1;
        },
        backup: function(links, player) {
            return {
                audio: "toaru_cipao",
                filterCard: function() {
                    return false;
                },
                selectCard: -1,
                viewAs: {
                    name: "sha",
                    nature: "thunder",
                    isCard: true,
                },
                card: links[0],
                onuse: function(result, player) {
                    var card = lib.skill.toaru_cipao_upgrade_backup.card;
                    var owner = get.owner(card);
                    if (owner) {
                        owner.lose(card, ui.discardPile);
                        player.$throw(card);
                    }
                },
            };
        },
        prompt: function(links, player) {
            return "将" + get.translation(links[0]) + "当作雷【杀】使用";
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
},

toaru_wangpai: {
    audio: "ext:学园都市:2",
    forced: true,
    group: ["toaru_wangpai_double", "toaru_wangpai_immune", "toaru_wangpai_gain", "toaru_wangpai_sha"],
    init: function(player) {
        if (!player.storage.toaru_wangpai_nu) {
            player.storage.toaru_wangpai_nu = 0;
        }
    },
    // 添加 mod 到主技能
    mod: {
        targetInRange: function(card, player) {
            if (card.name == "sha" && card.nature == "thunder") return true;
        },
        cardUsable: function(card, player, num) {
            if (card.name == "sha" && card.nature == "thunder") return Infinity;
        },
        selectTarget: function(card, player, range) {
            if (card.name == "sha" && card.nature == "thunder") {
                if (player.storage.toaru_shenpu_awakened) {
                    range[1] = Infinity;
                } else {
                    range[1]++;
                }
            }
        },
    },
    mark: true,
    intro: {
        name: "暴怒值",
        content: function(storage, player) {
            return "当前暴怒值：" + player.storage.toaru_wangpai_nu + "/7";
        },
    },
    subSkill: {
        // ①伤害翻倍
        double: {
            audio: "toaru_wangpai",
            trigger: {
                source: "damageBegin1",
            },
            filter: function(event, player) {
                if (player.storage.toaru_shenpu_awakened) {
                    return true;
                }
                return event.nature == "thunder";
            },
            forced: true,
            content: function() {
                if (player.storage.toaru_shenpu_awakened) {
                    var rand = Math.random();
                    if (rand < 0.1) {
                        trigger.num *= 4;
                        game.log(trigger.num, "倍伤害！");
                    } else if (rand < 0.6) {
                        trigger.num *= 3;
                        game.log(trigger.num, "倍伤害！");
                    } else {
                        trigger.num *= 2;
                    }
                } else {
                    trigger.num *= 2;
                }
            },
        },
        // ②雷属性免疫
        immune: {
            audio: "toaru_wangpai",
            trigger: {
                player: "damageBegin4",
            },
            filter: function(event, player) {
                return event.nature == "thunder";
            },
            forced: true,
            content: function() {
                trigger.cancel();
                if (player.storage.toaru_shenpu_awakened) {
                    player.recover(trigger.num);
                    game.log(player, "恢复了", trigger.num, "点体力");
                } else {
                    game.log(player, "免疫了雷属性伤害");
                }
            },
        },
// 修改 toaru_wangpai 的 gain 子技能
gain: {
    audio: "toaru_wangpai",
    trigger: {
        player: "damageEnd",
        source: "damageEnd",
    },
    filter: function(event, player) {
        if (event.name == "damage" && event.source == player) {
            return event.nature == "thunder";
        }
        return true;
    },
    forced: true,
    content: function() {
        "step 0";
        if (!player.storage.toaru_wangpai_nu) {
            player.storage.toaru_wangpai_nu = 0;
        }
        
        var gain = trigger.num;
        player.storage.toaru_wangpai_nu += gain;
        
        if (player.storage.toaru_wangpai_nu > 10) {
            player.storage.toaru_wangpai_nu = 10;
        }
        
        game.log(player, "获得了", gain, "点暴怒值（当前：", player.storage.toaru_wangpai_nu, "/10）");
        player.markSkill("toaru_wangpai");
    },
},



    },
},


// 砂铁剑技能 - 模仿jingong结构
toaru_shatiejian_skill: {
    charlotte: true,
    // 造成伤害后横置目标
    trigger: {
        source: "damageEnd",
    },
    forced: true,
    content: function() {
        if (!trigger.player.isLinked()) {
            trigger.player.link();
            game.log(trigger.player, "进入了连环状态");
        }
    },
},

toaru_shatiejian_respond: {
    charlotte: true,
    trigger: {
        target: "shaMiss",  // 当杀被闪避时触发
    },
    forced: true,
    filter: function(event, player) {
        return event.card && event.card.name == "sha" && 
               event.card.nature == "thunder" &&
               event.player.hasSkill("toaru_shatiejian_respond");
    },
    logTarget: "player",
    content: function() {
        "step 0";
        // 目标打出了闪，现在要求打出杀
        player.chooseToRespond({name: "sha"}, "砂铁剑：请打出一张【杀】，否则受到1点雷属性伤害").set('ai', function(card) {
            var player = _status.event.player;
            if (get.damageEffect(player, _status.event.source, player, 'thunder') >= 0) return 0;
            return 1;
        }).set('source', trigger.player);
        
        "step 1";
        if (!result.bool) {
            // 没打出杀，受到1点雷属性伤害
            game.log(player, "未打出【杀】，受到1点雷属性伤害");
            player.damage('thunder', trigger.player);
        } else {
            game.log(player, "打出了", result.cards);
        }
    },
},



        toaru_shatiejian_sha: {
            audio: 2,
            enable:"chooseToUse",
    filterCard(card, player) {
        return get.name(card) == "toaru_shatiejian";
    },
            selectCard: -1,
            viewAsFilter: function(player) {
                     return player.hasCard({ name: "toaru_shatiejian" }, "ehs");
            },
              position: "hes",
            viewAs: {
                name: "sha",
                nature: "thunder",
            },
            prompt: "将【砂铁剑】当作雷【杀】使用或打出",
            check: function() {
                return 1;
            },
            ai: {
                basic: {
                    useful: 5,
                    value: 5,
                },
                order: function() {
                    return get.order({name: 'sha'}) + 0.2;
                },
                respondSha: true,
                skillTagFilter: function(player) {
                    return player.getEquip("toaru_shatiejian") != null;
                },
                result: {
                    target: function(player, target) {
                        if (!target) return 0;
                        return get.effect(target, {name: 'sha', nature: 'thunder'}, player, player);
                    },
                },
            },
        },

toaru_leibi: {
    audio: "ext:学园都市:2",
    forced: true,
    trigger: {
        global: ["useSkillBegin"],
    },
    filter: function(event, player) {
        // 其他角色使用的技能作用于你
        if (!event.skill || event.skill == 'toaru_leibi') return false;
        if (!event.targets || !event.targets.includes(player)) return false;
        if (event.player == player || !event.player.isIn()) return false;
        
        // 每回合首次
        if (!player.storage.toaru_leibi_used) {
            player.storage.toaru_leibi_used = {};
        }
        return !player.storage.toaru_leibi_used[event.skill];
    },
    content: function() {
        "step 0";
        // 记录已使用
        var skill = trigger.skill;
        if (!player.storage.toaru_leibi_used) {
            player.storage.toaru_leibi_used = {};
        }
        player.storage.toaru_leibi_used[skill] = true;
        
        // 记录伤害标记
        event.causedDamage = false;
        
        // 添加临时技能监听伤害
        player.addTempSkill('toaru_leibi_check');
        player.storage.toaru_leibi_check = {
            source: player,
            target: trigger.player,
            event: event
        };
        
        // 视为使用雷杀
        player.useCard({name: "sha", nature: "thunder", isCard: true}, trigger.player, false);
        
        "step 1";
        // 移除临时技能
        player.removeSkill('toaru_leibi_check');
        
        // 如果造成了伤害，技能无效
        if (event.causedDamage) {
            player.addTempSkill('toaru_leibi_invalid', { global: ["useSkillAfter"] });
            trigger.cancel();
            game.log("雷【杀】造成伤害，技能对", player, "无效");
        }
    },
    group: ["toaru_leibi_clear"],
    subSkill: {
        check: {
            trigger: {
                global: "damageEnd",
            },
            forced: true,
            popup: false,
            filter: function(event, player) {
                if (!player.storage.toaru_leibi_check) return false;
                var info = player.storage.toaru_leibi_check;
                return event.source == info.source && event.player == info.target;
            },
            content: function() {
                if (player.storage.toaru_leibi_check && player.storage.toaru_leibi_check.event) {
                    player.storage.toaru_leibi_check.event.causedDamage = true;
                }
            },
        },
        invalid: {
            charlotte: true,
            sub: true,
            group: "undist",
            init(player) {
                if (player.isIn()) {
                    game.broadcastAll(function(player) {
                        player.classList.add("out");
                    }, player);
                }
            },
            onremove(player) {
                if (player.isOut()) {
                    game.broadcastAll(function(player) {
                        player.classList.remove("out");
                    }, player);
                }
            },
        },
        clear: {
            trigger: {
                global: "roundStart",
            },
            forced: true,
            popup: false,
            content: function() {
                player.storage.toaru_leibi_used = {};
            },
        },
    },
},


// 修改神暴技能
toaru_shenpu: {
    audio: "ext:学园都市:2",
    trigger: {
        player: "damageEnd",
        source: "damageEnd",
    },
    filter: function(event, player) {
        return player.storage.toaru_wangpai_nu >= 7 && !player.storage.toaru_shenpu_awakened;
    },
    forced: true,
    unique: true,
    skillAnimation: true,
    animationColor: "thunder",
    priority: -1,  // 确保在获得暴怒值之后触发
    content: function() {
        "step 0";
        player.awakenSkill("toaru_shenpu");
        player.storage.toaru_shenpu_awakened = true;
        player.gainMaxHp();
        player.recover();
        game.log(player, "觉醒了！");
        "step 1";
        // 升级技能
        player.removeSkill("toaru_cipao");
        player.removeSkill("toaru_wangpai");
        player.removeSkill("toaru_leibi");
        
        player.addSkill("toaru_cipao_upgrade");
        player.addSkill("toaru_wangpai_upgrade");
        player.addSkill("toaru_leibi_upgrade");
        player.addSkill("toaru_junshi");
        player.addSkill("toaru_tongli");
        player.setAvatar("toaru_misakamikoto","toaru_misakalv6");
        
        game.log(player, "升级了技能", "#g【磁炮】", "#g【王牌】", "#g【雷壁】");
        game.log(player, "获得了技能", "#g【钧世】", "#g【通理】");
    },
    derivation: ["toaru_cipao_upgrade", "toaru_wangpai_upgrade", "toaru_leibi_upgrade", "toaru_junshi", "toaru_tongli"],
},

// 王牌升级版
toaru_wangpai_upgrade: {
    audio: "toaru_wangpai",
    forced: true,
    group: ["toaru_wangpai_double", "toaru_wangpai_immune", "toaru_wangpai_gain", "toaru_wangpai_sha"],
    mod: {
        // 所有伤害变为雷属性
        damageNature: function(card, player, nature) {
            return "thunder";
        },
    },
},

// 雷壁升级版
// 雷壁升级版
toaru_leibi_upgrade: {
    audio: "toaru_leibi",
    forced: true,
    trigger: {
        global: "useSkillBegin",
    },
    filter: function(event, player) {
        // 其他人作用于你的技能
        return event.skill != undefined && 
               event.skill != 'toaru_leibi_upgrade' && 
               event.targets && event.targets.includes(player) &&
               event.player != player;
    },
    content: function() {
        "step 0";
        // 添加临时技能使技能无效
        player.addTempSkill('toaru_leibi_upgrade_invalid', { global: ["useSkillAfter"] });
        trigger.cancel();
        game.log("技能对", player, "无效");
    },
    group: ["toaru_leibi_upgrade_card"],
    subSkill: {
        invalid: {
            charlotte: true,
            sub: true,
            group: "undist",
            init(player) {
                if (player.isIn()) {
                    game.broadcastAll(function(player) {
                        player.classList.add("out");
                    }, player);
                }
            },
            onremove(player) {
                if (player.isOut()) {
                    game.broadcastAll(function(player) {
                        player.classList.remove("out");
                    }, player);
                }
            },
        },
        card: {
            audio: "toaru_leibi",
            forced: true,
            trigger: {
                target: "useCardToTargeted",
            },
            filter: function(event, player) {
                return event.player != player;
            },
            content: function() {
                // 50%概率牌失效
                if (Math.random() < 0.5) {
                    trigger.excluded.add(player);
                    game.log(trigger.card, "对", player, "无效");
                }
            },
        },
    },
},


// 钧世技能
toaru_junshi: {
    audio: "ext:学园都市:2",
    enable: "phaseUse",
    filterTarget: function(card, player, target) {
        return true;
    },
    content: function() {
        "step 0";
        target.judge(function(card) {
            var suit = get.suit(card);
            var number = get.number(card);
            if ((suit == "spade" || suit == "club") && number >= 2 && number <= 9) {
                return -3;
            }
            return 0;
        }).set("callback", function() {
            if (event.judgeResult.bool == false) {
                event.getParent().lightning_hit = true;
            }
        });
        "step 1";
        if (event.lightning_hit) {
            target.damage(3, "thunder", player);
            game.log(player, "对", target, "造成了3点雷属性伤害");
        } else {
            // 随机对一名角色造成1点雷属性伤害
            var targets = game.filterPlayer();
            var randomTarget = targets.randomGet();
            randomTarget.damage(1, "thunder", player);
            game.log(player, "对", randomTarget, "造成了1点雷属性伤害");
        }
    },
    ai: {
        order: 9,
        result: {
            target: function(player, target) {
                return -2;
            },
        },
    },
},

// 通理技能
toaru_tongli: {
    audio: "ext:学园都市:2",
    forced: true,
    trigger: {
        global: "gameStart",
        player: "enterGame",
    },
    content: function() {
        game.countPlayer(function(current) {
            if (player.inRange(current) && current != player) {
                current.addSkill("toaru_huanmeng");
                current.storage.toaru_huanmeng_awaken = 0;
            }
        });
    },
    group: ["toaru_tongli_distance", "toaru_tongli_check"],
    subSkill: {
        distance: {
            trigger: {
                global: ["changeHp", "gainMaxHp", "loseMaxHp"],
            },
            forced: true,
            popup: false,
            content: function() {
                game.countPlayer(function(current) {
                    if (player.inRange(current) && current != player) {
                        if (!current.hasSkill("toaru_huanmeng")) {
                            current.addSkill("toaru_huanmeng");
                            current.storage.toaru_huanmeng_awaken = 0;
                        }
                    } else {
                        if (current.hasSkill("toaru_huanmeng")) {
                            current.removeSkill("toaru_huanmeng");
                        }
                    }
                });
            },
        },
        check: {
            trigger: {
                player: "dying",
            },
            forced: true,
            content: function() {
                player.loseMaxHp();
                        player.setAvatar("toaru_misakalv6","toaru_misakamikoto");
                game.countPlayer(function(current) {
                    if (current.hasSkill("toaru_huanmeng")) {
                        current.removeSkill("toaru_huanmeng");
                        // 恢复原始技能
                        var skills = current.storage.toaru_huanmeng_skills;
                        if (skills) {
                            for (var i = 0; i < skills.length; i++) {
                                current.addSkill(skills[i]);
                            }
                        }
                    }
                });
            },
        },
    },
},

// 唤梦技能
toaru_huanmeng: {
    audio: "ext:学园都市:2",
    charlotte: true,
    mark: true,
    intro: {
        name: "唤梦",
        content: function(storage, player) {
            return "唤醒进度：" + (player.storage.toaru_huanmeng_awaken || 0) + "%";
        },
    },
    init: function(player) {
        if (!player.storage.toaru_huanmeng_awaken) {
            player.storage.toaru_huanmeng_awaken = 0;
        }
        // 记录原始技能
        if (!player.storage.toaru_huanmeng_skills) {
            player.storage.toaru_huanmeng_skills = player.getSkills(null, false, false).filter(function(skill) {
                return skill != "toaru_huanmeng";
            });
        }
    },
    group: ["toaru_huanmeng_damage", "toaru_huanmeng_use", "toaru_huanmeng_awaken"],
    subSkill: {
        // 伤害翻倍
        damage: {
            audio: "toaru_huanmeng",
            trigger: {
                source: "damageBegin1",
            },
            filter: function(event, player) {
                return event.player && event.player.name == "toaru_misakamikoto";
            },
            forced: true,
            content: function() {
                trigger.num *= 2;
                game.log(player, "对御坂美琴造成的伤害翻倍");
            },
        },
        // 弃牌唤醒
        use: {
            audio: "toaru_huanmeng",
            enable: "phaseUse",
            usable: 1,
            filterCard: function(card) {
                return get.type(card) == "trick";
            },
            check: function(card) {
                return 6 - get.value(card);
            },
            content: function() {
                "step 0";
                var rand = Math.random();
                var gain = 0;
                
                if (rand < 0.05) {
                    // 5%直接唤醒
                    player.storage.toaru_huanmeng_awaken = 100;
                    game.log(player, "直接唤醒了！");
                } else if (rand < 0.15) {
                    // 10%获得40%
                    gain = 40;
                } else if (rand < 0.65) {
                    // 50%获得20%
                    gain = 20;
                } else {
                    // 100%获得10%
                    gain = 10;
                }
                
                if (gain > 0) {
                    player.storage.toaru_huanmeng_awaken += gain;
                    game.log(player, "获得了", gain + "%", "唤醒值");
                }
                
                player.markSkill("toaru_huanmeng");
                player.syncStorage("toaru_huanmeng");
                
                // 检查是否达到100%
                if (player.storage.toaru_huanmeng_awaken >= 100) {
                    player.logSkill("toaru_huanmeng_awaken");
                }
            },
            ai: {
                order: 7,
                result: {
                    player: 1,
                },
            },
        },
        // 唤醒效果
        awaken: {
            audio: "toaru_huanmeng",
            trigger: {
                player: "phaseBegin",
            },
            filter: function(event, player) {
                return player.storage.toaru_huanmeng_awaken >= 100;
            },
            forced: true,
            content: function() {
                "step 0";
                var mikoto = game.findPlayer(function(current) {
                    return current.name == "toaru_misakamikoto";
                });
                
                if (mikoto) {
                    mikoto.loseMaxHp();
                    game.log(mikoto, "失去了1点体力上限");
                }
                "step 1";
                // 恢复原始技能
                player.removeSkill("toaru_huanmeng");
                var skills = player.storage.toaru_huanmeng_skills;
                if (skills) {
                    for (var i = 0; i < skills.length; i++) {
                        player.addSkill(skills[i]);
                    }
                }
                game.log(player, "恢复了原始技能");
            },
        },
    },
},


/// 上条当麻 - 幻御
toaru_huanyu: {
    audio: "ext:学园都市:2",
    trigger: {
        global: "useSkillBegin",
    },
    forced: true,
    filter: function(event, player) {
        // ③其他角色作用于你的技能对你无效
        if (event.skill != undefined && 
            event.skill != 'toaru_huanyu' && 
            event.targets && event.targets.includes(player) &&
            event.player != player &&
            !player.storage.toaru_huanyu_skill) {
            return true;
        }
        return false;
    },
    content: function() {
        "step 0";
        // 添加临时技能使技能无效
        player.addTempSkill('toaru_huanyu_invalid', { global: ["useSkillAfter"] });
        trigger.cancel();
        player.storage.toaru_huanyu_skill = true;
        game.log(player, "的", "#g【幻御】", "使技能对其无效");
    },
    group: ["toaru_huanyu_card", "toaru_huanyu_damage", "toaru_huanyu_clear"],
    subSkill: {
        invalid: {
            charlotte: true,
            sub: true,
            group: "undist",
            init(player) {
                if (player.isIn()) {
                    game.broadcastAll(function(player) {
                        player.classList.add("out");
                    }, player);
                }
            },
            onremove(player) {
                if (player.isOut()) {
                    game.broadcastAll(function(player) {
                        player.classList.remove("out");
                    }, player);
                }
            },
        },
        card: {
            audio: "ext:学园都市:2",
            trigger: {
                target: "useCardToTargeted",
            },
            forced: true,
            filter: function(event, player) {
                if (event.player == player) return false;
                
                // ①非实体牌对你无效
                var card = event.card; 
                if (!event.card.isCard) return false;
                // 判断是否为非实体牌（虚拟牌）
                if (get.is.convertedCard(evt.card) || get.is.virtualCard(evt.card)) {
                    if (!player.storage.toaru_huanyu_card) {
                        return true;
                    }
                }
                return false;
            },
            content: function() {
                trigger.excluded.add(player);
                player.storage.toaru_huanyu_card = true;
                game.log(player, "的", "#g【幻御】", "使", trigger.card, "对其无效");
            },
        },
        damage: {
            audio: "ext:学园都市:2",
            trigger: {
               player: "damageBegin3",
            },
            forced: true,
            filter: function(event, player) {
                if (event.player == player) return false;
                
                // ②实体牌造成伤害
                if (event.card.isCard) {
                    if (!player.storage.toaru_huanyu_damage) {
                        return true;
                    }
                }
                return false;
            },
            content: function() {
                trigger.cancel();
                player.storage.toaru_huanyu_damage = true;
                game.log(player, "的", "#g【幻御】", "取消了伤害");
            },
        },
        clear: {
            trigger: {
                global: "phaseEnd",
            },
            forced: true,
            silent: true,
            popup: false,
            content: function() {
                delete player.storage.toaru_huanyu_card;
                delete player.storage.toaru_huanyu_damage;
                delete player.storage.toaru_huanyu_skill;
            },
        },
    },
},

toaru_huodan: {
    audio: "ext:学园都市:2",
    enable: "phaseUse",
    filterCard: function(card) {
        return get.type(card) != 'basic';
    },
    selectCard: 1,
    filterTarget: true,
    check: function(card) {
        return 6 - get.value(card);
    },
    content: function() {
        "step 0";
        // 获取场上已存在的X值
        var existingX = [];
        game.filterPlayer(function(current) {
            var equip = current.getEquip("toaru_zhadanwawa");
            if (equip && equip.storage && equip.storage.toaru_zhadanwawa_x) {
                existingX.push(equip.storage.toaru_zhadanwawa_x);
            }
        });
        
        // 生成可选择的X值
        var num = game.countPlayer();
        var choices = [];
        for (var i = 1; i <= num; i++) {
            if (!existingX.includes(i)) {
                choices.push(i);
            }
        }
        
        if (choices.length == 0) {
            event.finish();
            game.log("场上所有数值都已被使用，无法设置X值");
            return;
        }
        
        event.existingX = existingX;
        event.choices = choices;
        
        player.chooseControl(choices)
            .set("prompt", "请设置炸弹娃娃的X值（1-" + num + "，不能选择已存在的数值）")
            .set("ai", function() {
                var choices = _status.event.controls;
                return choices[Math.floor(Math.random() * choices.length)];
            });
        
        "step 1";
        var x = parseInt(result.control) || 1;
        event.x = x;
        
        // 将原牌转换为炸弹娃娃
        var card = cards[0];
        card.init([card.suit, card.number, 'toaru_zhadanwawa', card.nature]);
        
        // 设置存储信息
        if (!card.storage) card.storage = {};
        card.storage.toaru_zhadanwawa_owner = player;
        card.storage.toaru_zhadanwawa_turn = 0;
        card.storage.toaru_zhadanwawa_x = x;
        
        // 将牌从原位置移除并置入目标装备区
        if (get.position(card) == 'h') {
            player.lose(card, ui.special, 'toInvisible');
        } else {
            player.lose(card, ui.special, 'toInvisible');
        }
        
        "step 2";
        // 置入目标装备区
        var card = cards[0];
        target.$gain2(card);
        target.equip(card);
        game.log(player, "为", target, "装备了", card, "（X=" + event.x + "）");
        
        "step 3";
        // 增加出杀次数和手牌上限
        player.addTempSkill("toaru_huodan_buff");
        if (!player.storage.toaru_huodan_count) {
            player.storage.toaru_huodan_count = 0;
        }
        player.storage.toaru_huodan_count++;
        player.markSkill("toaru_huodan_buff");
    },
    ai: {
        order: 8,
        result: {
            target: function(player, target) {
                if (get.attitude(player, target) < 0) return -2;
                return 0;
            },
        },
    },
    subSkill: {
        buff: {
            charlotte: true,
            onremove: function(player) {
                delete player.storage.toaru_huodan_count;
            },
            mod: {
                cardUsable: function(card, player, num) {
                    if (card.name == 'sha') {
                        var count = player.storage.toaru_huodan_count || 0;
                        return num + count;
                    }
                },
                maxHandcard: function(player, num) {
                    var count = player.storage.toaru_huodan_count || 0;
                    return num + count;
                },
            },
            mark: true,
            intro: {
                content: function(storage, player) {
                    var count = player.storage.toaru_huodan_count || 0;
                    return "出【杀】次数和手牌上限+" + count;
                },
            },
        },
    },
},


// 芙兰达 - 断势
toaru_duanshi: {
    audio: "ext:学园都市:2",
    trigger: {
        player: "damageBegin3",
    },
    forced: true,
    filter: function(event, player) {
        // 修复：检查伤害来源是否与自己同势力
        if (!event.source) return false;
        return player.isFriendOf(event.source);
    },
    content: function() {
        if (!player.storage.toaru_duanshi) {
            player.storage.toaru_duanshi = [];
        }
        
        if (!player.storage.toaru_duanshi.includes(trigger.source.playerid)) {
            // 首次伤害-1
            trigger.num--;
            player.storage.toaru_duanshi.push(trigger.source.playerid);
            game.log(player, "的", "#g【断势】", "使伤害-1");
        } else {
            // 之后伤害+1
            trigger.num++;
            game.log(player, "的", "#g【断势】", "使伤害+1");
        }
    },
},



// 修改炸弹娃娃技能，添加动态描述
toaru_zhadanwawa_skill: {
    trigger: {
        global: "phaseEnd",
    },
    forced: true,
    charlotte: true,
    filter: function(event, player) {
        var card = player.getEquip("toaru_zhadanwawa");
        if (!card) return false;
        
        if (!card.storage) card.storage = {};
        if (!card.storage.toaru_zhadanwawa_turn) {
            card.storage.toaru_zhadanwawa_turn = 0;
        }
        card.storage.toaru_zhadanwawa_turn++;
        
        var x = card.storage.toaru_zhadanwawa_x || 1;
        return card.storage.toaru_zhadanwawa_turn >= x;
    },
    content: function() {
        "step 0";
        var card = player.getEquip("toaru_zhadanwawa");
        if (!card) {
            event.finish();
            return;
        }
        var owner = card.storage.toaru_zhadanwawa_owner;
        event.owner = owner;
        event.card = card;
        
        player.damage('fire', owner);
        "step 1";
        // 销毁炸弹娃娃
        if (event.card && player.getEquip("toaru_zhadanwawa") == event.card) {
            player.discard(event.card);
        }
        
        // 判断是否造成伤害
        if (trigger.num > 0) {
            // 造成了伤害
            if (event.owner && event.owner.isIn()) {
                event.owner.recover();
                event.owner.draw(2);
                game.log(event.owner, "恢复了1点体力并摸了2张牌");
            }
        } else {
            // 未造成伤害
            if (event.owner && event.owner.isIn()) {
                event.owner.loseHp();
                var cards = event.owner.getCards('he');
                if (cards.length > 0) {
                    event.owner.discard(cards.randomGet());
                }
                game.log(event.owner, "流失了1点体力并随机弃置了一张牌");
            }
        }
        
        // 减少计数
        if (event.owner && event.owner.storage.toaru_huodan_count) {
            event.owner.storage.toaru_huodan_count--;
            if (event.owner.storage.toaru_huodan_count <= 0) {
                event.owner.removeSkill("toaru_huodan_buff");
            }
        }
    },
    mark: true,
    intro: {
        markcount: function(storage, player) {
            var card = player.getEquip("toaru_zhadanwawa");
            if (!card || !card.storage) return 0;
            var x = card.storage.toaru_zhadanwawa_x || 1;
            var turn = card.storage.toaru_zhadanwawa_turn || 0;
            return Math.max(0, x - turn);
        },
        content: function(storage, player) {
            var card = player.getEquip("toaru_zhadanwawa");
            if (!card || !card.storage) {
                return "自【炸弹娃娃】被装备后的第X个回合结束阶段，对目标造成一点火属性伤害然后销毁该牌。任意角色的回合限一次，其可以弃置两张【杀】，销毁此牌。";
            }
            
            var x = card.storage.toaru_zhadanwawa_x || 1;
            var turn = card.storage.toaru_zhadanwawa_turn || 0;
            var remaining = Math.max(0, x - turn);
            
            var str = "自【炸弹娃娃】被装备后的第" + x + "个回合结束阶段，对目标造成一点火属性伤害然后销毁该牌。任意角色的回合限一次，其可以弃置两张【杀】，销毁此牌。<br>";
            str += '<span style="color:red; font-weight:bold; font-size:16px;">💣 BOOM! 还剩 ' + remaining + ' 回合炸弹引爆！</span>';
            
            return str;
        },
    },
    group: ["toaru_zhadanwawa_discard"],
    subSkill: {
        discard: {
            enable: "phaseUse",
            usable: 1,
            filter: function(event, player) {
                return player.getEquip("toaru_zhadanwawa") && player.countCards('h', {name: 'sha'}) >= 2;
            },
            filterCard: function(card) {
                return card.name == 'sha';
            },
            selectCard: 2,
            content: function() {
                var card = player.getEquip("toaru_zhadanwawa");
                if (card) {
                    player.discard(card);
                    game.log(player, "销毁了", card);
                    
                    // 减少计数
                    var owner = card.storage.toaru_zhadanwawa_owner;
                    if (owner && owner.storage.toaru_huodan_count) {
                        owner.storage.toaru_huodan_count--;
                        if (owner.storage.toaru_huodan_count <= 0) {
                            owner.removeSkill("toaru_huodan_buff");
                        }
                    }
                }
            },
            ai: {
                order: 1,
                result: {
                    player: 1,
                },
            },
        },
    },
},

// 最后之作 - 弱电
toaru_ruodian: {
    audio: "ext:学园都市:2",
    enable: "phaseUse",
    usable: 1,
    filterTarget: true,
    init: function(player) {
        // 初始化使用次数（用于判定次数）
        if (!player.storage.toaru_ruodian_use_count) {
            player.storage.toaru_ruodian_use_count = 0;
        }
        // 初始化成功次数（用于伤害计算）
        if (!player.storage.toaru_ruodian_success_count) {
            player.storage.toaru_ruodian_success_count = 0;
        }
    },
    content: function() {
        "step 0";
        // 初始化
        if (!player.storage.toaru_ruodian_use_count) {
            player.storage.toaru_ruodian_use_count = 0;
        }
        if (!player.storage.toaru_ruodian_success_count) {
            player.storage.toaru_ruodian_success_count = 0;
        }
        
        // 使用次数+1（每次使用技能都增加）
        player.storage.toaru_ruodian_use_count++;
        
        // 判定次数 = 使用次数
        event.judgeCount = player.storage.toaru_ruodian_use_count;
        event.currentJudge = 0;
        event.successCount = 0;
        game.log(player, "对", target, "进行", event.judgeCount, "次判定");
        
        "step 1";
        // 进行判定
        if (event.currentJudge < event.judgeCount) {
            target.judge(function(card) {
                var name = card.name;
                // 雷杀、铁索连环或闪电
                if (name == 'leisha') return 1;
                if (name == 'tiesuo') return 1;
                if (name == 'shandian') return 1;
                return 0;
            });
        } else {
            event.goto(3);
        }
        
        "step 2";
        // 判定结果处理
        if (result.bool) {
            event.successCount++;
            player.draw();
            game.log(player, "判定成功，摸一张牌");
        }
        event.currentJudge++;
        event.goto(1);
        
        "step 3";
        // 所有判定完成后，添加标记
        if (event.successCount > 0) {
            target.addMark("toaru_ruodian_mark", event.successCount);
            player.storage.toaru_ruodian_success_count += event.successCount;
            game.log(target, "共获得了", event.successCount, "枚弱电标记");
            
            // 判断是否达到2的倍数
            var marks = target.countMark("toaru_ruodian_mark");
            if (marks > 0 && marks % 2 == 0) {
                var damage = Math.floor(player.storage.toaru_ruodian_success_count / 2);
                player.chooseBool("是否弃置所有弱电标记并对" + get.translation(target) + "造成" + damage + "点雷属性伤害？")
                    .set("ai", function() {
                        return get.attitude(_status.event.player, _status.event.getParent().target) < 0;
                    });
            } else {
                event.finish();
            }
        } else {
            event.finish();
        }
        
        "step 4";
        if (result.bool) {
            var marks = target.countMark("toaru_ruodian_mark");
            target.removeMark("toaru_ruodian_mark", marks);
            
            var damage = Math.floor(player.storage.toaru_ruodian_success_count / 2);
            target.damage(damage, 'thunder', player);
            game.log(player, "对", target, "造成了", damage, "点雷属性伤害");
            
            // 重置成功计数
            player.storage.toaru_ruodian_success_count = 0;
        }
    },
    ai: {
        order: 9,
        result: {
            target: function(player, target) {
                var att = get.attitude(player, target);
                if (att < 0) return -1;
                return 0;
            },
        },
    },
},


toaru_ruodian_mark: {
    marktext: "⚡",
    intro: {
        name: "弱电",
        content: "弱电标记数：#",
    },
},

// 最后之作 - 护佑
toaru_huyou: {
    audio: "ext:学园都市:2",
    trigger: {
        global: "roundStart",
    },
    forced: true,
    filter: function(event, player) {
        // 检查一方通行是否在场
        return game.hasPlayer(function(current) {
            return current.name == "toaru_accelerator" || current.name1 == "toaru_accelerator" || current.name2 == "toaru_accelerator";
        });
    },
    content: function() {
        "step 0";
        var accelerator = game.findPlayer(function(current) {
            return current.name == "toaru_accelerator" || current.name1 == "toaru_accelerator" || current.name2 == "toaru_accelerator";
        });
        
        if (accelerator) {
            event.accelerator = accelerator;
        } else {
            event.finish();
            return;
        }
        
        // 最后之作恢复体力并摸牌
        player.recover();
        player.draw();
        game.log(player, "恢复了1点体力并摸了1张牌");
        
        "step 1";
        // 一方通行恢复体力并摸牌
        if (event.accelerator && event.accelerator.isIn()) {
            event.accelerator.recover();
            event.accelerator.draw();
            game.log(event.accelerator, "恢复了1点体力并摸了1张牌");
        }
    },
},

// ==================== 技能代码 ====================

// 粒崩
toaru_libeng: {
    audio: "ext:学园都市:2",
    enable: ["phaseUse", "chooseToUse"],
    filter: function(event, player) {
        // 混乱状态下技能失效
        if (player.hasSkill("toaru_hunluan")) return false;
        
        if (event.type == "phase") {
            return game.hasPlayer(function(current) {
                return current != player;
            });
        }
        return false;
    },
    filterTarget: function(card, player, target) {
        return target != player;
    },
    selectTarget: [1, Infinity],
    multitarget: true,
    multiline: true,
    content: function() {
        "step 0";
        event.targets = targets.slice(0);
        event.current = 0;
        
        // 记录使用次数
        if (!player.storage.toaru_libeng_count) {
            player.storage.toaru_libeng_count = 0;
        }
        player.storage.toaru_libeng_count++;
        
        "step 1";
        if (event.current >= event.targets.length) {
            event.goto(3);
            return;
        }
        
        var target = event.targets[event.current];
        event.currentTarget = target;
        
        if (!target || !target.isIn()) {
            event.current++;
            event.redo();
            return;
        }
        
        target.chooseToDiscard("he", "粒崩：请打出一张【闪】，否则受到1点火属性伤害", function(card) {
            return card.name == "shan";
        }).set("ai", function(card) {
            if (card.name == "shan") return 10;
            return 0;
        });
        
        "step 2";
        if (!result.bool) {
            event.currentTarget.damage("fire", 1, player);
            game.log(event.currentTarget, "未打出【闪】，受到1点火属性伤害");
        } else {
            game.log(event.currentTarget, "打出了【闪】");
        }
        
        event.current++;
        event.goto(1);
        
        "step 3";
        // 判断是否进入混乱状态
        var count = player.storage.toaru_libeng_count || 0;
        var probability = Math.min(count * 0.15, 0.9); // 每次15%概率，最高90%
        
        if (Math.random() < probability) {
            player.addTempSkill("toaru_hunluan", {global: "roundStart"});
            game.log(player, "陷入了", "#y混乱状态");
            
            // 显示混乱特效
            game.broadcastAll(function(player) {
                if (player && player.isIn()) {
                    var popup = ui.create.div(".popup", player.parentNode);
                    popup.innerHTML = "混乱";
                    popup.style.color = "#FF0000";
                    popup.style.fontSize = "24px";
                    popup.style.fontWeight = "bold";
                    popup.style.textShadow = "0 0 10px #FF0000, 0 0 20px #FF0000";
                    
                    setTimeout(function() {
                        popup.delete();
                    }, 1500);
                }
            }, player);
        }
    },
    ai: {
        order: 9,
        result: {
            target: function(player, target) {
                if (get.attitude(player, target) < 0) {
                    if (!target.countCards("h", "shan")) return -2;
                    return -1;
                }
                return 0;
            },
        },
    },
    group: ["toaru_libeng_target", "toaru_libeng_clear"],
    subSkill: {
        // ②当你成为其他角色牌的目标后，你可以取消之
        target: {
            audio: "toaru_libeng",
            trigger: {
                target: "useCardToTargeted",
            },
            filter: function(event, player) {
                // 混乱状态下技能失效
                if (player.hasSkill("toaru_hunluan")) return false;
                return event.player != player;
            },
            check: function(event, player) {
                return get.effect(player, event.card, event.player, player) < 0;
            },
            logTarget: "player",
            content: function() {
                "step 0";
                player.chooseBool("是否发动【粒崩】取消" + get.translation(trigger.card) + "？")
                    .set("ai", function() {
                        return get.effect(_status.event.player, _status.event.getTrigger().card, _status.event.getTrigger().player, _status.event.player) < 0;
                    });
                
                "step 1";
                if (result.bool) {
                    trigger.excluded.add(player);
                    game.log(player, "取消了", trigger.card, "的目标");
                    
                    // 记录使用次数
                    if (!player.storage.toaru_libeng_count) {
                        player.storage.toaru_libeng_count = 0;
                    }
                    player.storage.toaru_libeng_count++;
                    
                    // 判断是否进入混乱状态
                    var count = player.storage.toaru_libeng_count || 0;
                    var probability = Math.min(count * 0.15, 0.9);
                    
                    if (Math.random() < probability) {
                        player.addTempSkill("toaru_hunluan", {player: "roundStart"});
                        game.log(player, "陷入了", "#y混乱状态");
                        
                        // 显示混乱特效
                        game.broadcastAll(function(player) {
                            if (player && player.isIn()) {
                                var popup = ui.create.div(".popup", player.parentNode);
                                popup.innerHTML = "混乱";
                                popup.style.color = "#FF0000";
                                popup.style.fontSize = "24px";
                                popup.style.fontWeight = "bold";
                                popup.style.textShadow = "0 0 10px #FF0000, 0 0 20px #FF0000";
                                
                                setTimeout(function() {
                                    popup.delete();
                                }, 1500);
                            }
                        }, player);
                    }
                }
            },
        },
        // 清除计数
        clear: {
            trigger: {
                global: "roundStart",
            },
            forced: true,
            silent: true,
            popup: false,
            content: function() {
                delete player.storage.toaru_libeng_count;
            },
        },
    },
},

// 混乱状态
toaru_hunluan2: {
    audio: "ext:学园都市:2",
    mark: true,
    intro: {
        content: "混乱状态：【粒崩】技能失效，直到下一轮开始",
    },
    trigger: {
        player: ["useCard", "respond"],
    },
    forced: true,
    filter: function(event, player) {
        return Math.random() < 0.3; // 30%概率触发混乱效果
    },
    content: function() {
        "step 0";
        var choices = ["摸一张牌", "弃置一张牌", "失去1点体力", "随机对一名角色造成1点伤害"];
        var choice = choices[Math.floor(Math.random() * choices.length)];
        event.choice = choice;
        
        game.log(player, "的混乱状态触发了：", "#y" + choice);
        
        "step 1";
        switch(event.choice) {
            case "摸一张牌":
                player.draw();
                break;
            case "弃置一张牌":
                var cards = player.getCards("he");
                if (cards.length > 0) {
                    player.discard(cards.randomGet());
                }
                break;
            case "失去1点体力":
                player.loseHp();
                break;
            case "随机对一名角色造成1点伤害":
                var targets = game.filterPlayer();
                if (targets.length > 0) {
                    var target = targets.randomGet();
                    target.damage(1, player);
                    game.log(player, "对", target, "造成了1点伤害");
                }
                break;
        }
    },
    ai: {
        threaten: 0.5,
    },
},

// ==================== 翻译文本 ====================
// 掀裙

toaru_xianqun2: {
    audio: "ext:学园都市:2",
    enable: "phaseUse",
    usable: 1,
    filterTarget: function(card, player, target) {
        return player != target;
    },
    content() {
        "step 0";
        player
            .chooseToDuiben(target)
            .set("title", "掀裙")
            .set("namelist", ["害羞", "反抗", "突然掀裙", "欲盖弥彰"])  // 前两个是对方的选项，后两个是你的选项
            .set("translationList", [
                // 对方选害羞时的提示
                `你选择突然掀裙：你与${get.translation(target)}下次对彼此造成的伤害均+1<br>你选择欲盖弥彰：你获得${get.translation(target)}一张牌`,
                // 对方选反抗时的提示
                `你选择突然掀裙：视为你对${get.translation(target)}使用一张不计入次数的风【杀】<br>你选择欲盖弥彰：你与${get.translation(target)}下次对彼此造成的伤害均+1`,
                // 你选突然掀裙时的提示
                `对方选择害羞：你与${get.translation(target)}下次对彼此造成的伤害均+1<br>对方选择反抗：视为你对${get.translation(target)}使用一张不计入次数的风【杀】`,
                // 你选欲盖弥彰时的提示
                `对方选择害羞：你获得${get.translation(target)}一张牌<br>对方选择反抗：你与${get.translation(target)}下次对彼此造成的伤害均+1`,
            ])
            .set("ai", button => {
                var player = _status.event.player;
                var target = _status.event.getParent().target;
                var att = get.attitude(player, target);
                
                // 如果是目标（被掀裙的人）
                if (_status.event.getParent().target == player) {
                    // 关系好选害羞（让对方拿牌），关系差选反抗（避免被杀）
                    if (att > 0) return button.link == "害羞" ? 2 : 1;
                    return button.link == "反抗" ? 2 : 1;
                }
                // 如果是发起者（掀裙的人）
                else {
                    // 关系好选欲盖弥彰（拿牌），关系差选突然掀裙（杀对方）
                    if (att > 0) return button.link == "欲盖弥彰" ? 2 : 1;
                    return button.link == "突然掀裙" ? 2 : 1;
                }
            })
.set("list", [
    ["害羞", "", function(button) {
        var img = ui.create.div('.menubutton.large', button);
        img.style.backgroundImage = "url('extension/学园都市/image/haixiu.jpg')";
        img.style.backgroundSize = "cover";
        return img;
    }],
    ["反抗", "", function(button) {
        var img = ui.create.div('.menubutton.large', button);
        img.style.backgroundImage = "url('extension/学园都市/image/fankang.jpg')";
        img.style.backgroundSize = "cover";
        return img;
    }],
    ["突然掀裙", "", function(button) {
        var img = ui.create.div('.menubutton.large', button);
        img.style.backgroundImage = "url('extension/学园都市/image/turanxianqun.jpg')";
        img.style.backgroundSize = "cover";
        return img;
    }],
    ["欲盖弥彰", "", function(button) {
        var img = ui.create.div('.menubutton.large', button);
        img.style.backgroundImage = "url('extension/学园都市/image/yugaimizhang.jpg')";
        img.style.backgroundSize = "cover";
        return img;
    }]
]);
game.pause();
setTimeout(function() {
    var dialogs = ui.dialogs;
    for (var i = 0; i < dialogs.length; i++) {
        var dialog = dialogs[i];
        if (dialog.buttons && dialog.buttons.length >= 4) {
            dialog.buttons[0].style.backgroundImage = "url('extension/学园都市/image/haixiu.jpg')";
            dialog.buttons[0].style.backgroundSize = "100% 100%";
            dialog.buttons[1].style.backgroundImage = "url('extension/学园都市/image/fankang.jpg')";
            dialog.buttons[1].style.backgroundSize = "100% 100%";
            dialog.buttons[2].style.backgroundImage = "url('extension/学园都市/image/turanxianqun.jpg')";
            dialog.buttons[2].style.backgroundSize = "100% 100%";
            dialog.buttons[3].style.backgroundImage = "url('extension/学园都市/image/yugaimizhang.jpg')";
            dialog.buttons[3].style.backgroundSize = "100% 100%";
        }
    }
    game.resume();
}, 100);


        "step 1";
        if (result.bool) {
            if (result.player == "db_def1") {
                // 对方选择害羞，我选择突然掀裙
                game.log(player, "选择了", "#g突然掀裙", "，", target, "选择了", "#g害羞");
                player.addTempSkill("toaru_xianqun2_damage");
                target.addTempSkill("toaru_xianqun2_damage");
                if (!player.storage.toaru_xianqun2_damage) player.storage.toaru_xianqun2_damage = [];
                if (!target.storage.toaru_xianqun2_damage) target.storage.toaru_xianqun2_damage = [];
                player.storage.toaru_xianqun2_damage.push(target);
                target.storage.toaru_xianqun2_damage.push(player);
                player.markSkill("toaru_xianqun2_damage");
                target.markSkill("toaru_xianqun2_damage");
                game.log(player, "与", target, "下次对彼此造成的伤害+1");
            } else {
                // 对方选择害羞，我选择欲盖弥彰
                game.log(player, "选择了", "#g欲盖弥彰", "，", target, "选择了", "#g害羞");
                player.gainPlayerCard(target, "he", true);
            }
        } else {
            if (result.player == "db_def1") {
                // 对方选择反抗，我选择突然掀裙
                game.log(player, "选择了", "#y突然掀裙", "，", target, "选择了", "#y反抗");
                if (player.canUse({name: "sha", nature: "wind"}, target, false)) {
                    player.useCard({name: "sha", nature: "wind", isCard: true}, target, false);
                }
            } else {
                // 对方选择反抗，我选择欲盖弥彰
                game.log(player, "选择了", "#y欲盖弥彰", "，", target, "选择了", "#y反抗");
                player.addTempSkill("toaru_xianqun2_damage");
                target.addTempSkill("toaru_xianqun2_damage");
                if (!player.storage.toaru_xianqun2_damage) player.storage.toaru_xianqun2_damage = [];
                if (!target.storage.toaru_xianqun2_damage) target.storage.toaru_xianqun2_damage = [];
                player.storage.toaru_xianqun2_damage.push(target);
                target.storage.toaru_xianqun2_damage.push(player);
                player.markSkill("toaru_xianqun2_damage");
                target.markSkill("toaru_xianqun2_damage");
                game.log(player, "与", target, "下次对彼此造成的伤害+1");
            }
        }
    },
    ai: {
        order: 7,
        result: {
            target: function(player, target) {
                var att = get.attitude(player, target);
                if (att < 0) return -2;
                return 0;
            },
        },
    },
    subSkill: {
        damage: {
            charlotte: true,
            onremove: true,
            mark: true,
            intro: {
                content: function(storage, player) {
                    if (!storage || !storage.length) return "下次对特定角色造成的伤害+1";
                    return "下次对" + get.translation(storage) + "造成的伤害+1";
                },
            },
            trigger: {
                source: "damageBegin1",
            },
            forced: true,
            filter: function(event, player) {
                return player.storage.toaru_xianqun2_damage && 
                       player.storage.toaru_xianqun2_damage.includes(event.player);
            },
            logTarget: "player",
            content: function() {
                trigger.num++;
                player.storage.toaru_xianqun2_damage.remove(trigger.player);
                if (player.storage.toaru_xianqun2_damage.length == 0) {
                    player.removeSkill("toaru_xianqun2_damage");
                } else {
                    player.markSkill("toaru_xianqun2_damage");
                }
                game.log(player, "对", trigger.player, "造成的伤害+1");
            },
        },
    },
},

        },
translate: {
    toaru_kongli_saten: "空力",
    toaru_kongli_saten_info: "锁定技，当你造成伤害后，50%概率变为风属性伤害。",
    
    toaru_yichu: "衣橱",
    toaru_yichu_info: "锁定技，你拥有额外的五个装备栏。游戏开始时，你将【棒球球棒】置入你的武器栏。你的手牌上限增加装备牌数量。每轮开始时，你选择一项：1.随机将牌堆中一张装备牌置入你的对应装备区；2.将一名其他角色装备区内的一张装备牌复制至你的对应区域。",
    
    toaru_xianqun: "掀裙",
    toaru_xianqun_info: "出牌阶段限一次，你可以弃置任意张牌并选择等量角色，然后选择一项：1.视为对其各使用一张风【杀】；2.视为使用了一张以指定角色为目标的【万箭齐发】；3.背水：你流失一点体力值并弃置所有手牌，然后你摸等同于此次弃牌数的牌。",
   // ==================== 翻译文本 ====================
"toaru_xianqun2": "掀裙",
"toaru_xianqun2_info": "出牌阶段限一次，你可以与一名其他角色谋弈：<br>若你选择<span class='thundertext'>突然掀裙，其选择：</span><span class='greentext'>害羞</span>则你与其下次对彼此造成的伤害均+1，<span class='firetext'>反抗</span>则视为你对其使用一张不计入次数的风【杀】；<br>若你选择<span class='thundertext'>欲盖弥彰，其选择：</span><span class='greentext'>害羞</span>则你获得其一张牌；<span class='firetext'>反抗</span>则你与其下次对彼此造成的伤害均+1。",
"toaru_xianqun2_damage": "掀裙", 
    toaru_juben: "剧本",
    toaru_juben_info: "出牌阶段限一次，你可以重铸所有手牌，然后将任意张牌正面朝上依次交给等量其他角色，这些角色使用的下一张牌必须是与此获得牌同类型的牌。",
    // 在 character.translate 对象中添加

"toaru_kongli_kungou": "空力",
"toaru_kongli_kungou_info": "锁定技，风属性伤害对你无效；你造成的伤害均视为风属性；当你造成伤害后，有30%概率令目标本回合进入混乱状态。",
"toaru_zhoushe": "轴射",
"toaru_zhoushe_info": "每回合各限一次，①你可以视为打出一张风【杀】；②你可以视为对一名角色攻击范围内的所有角色使用一张风【杀】，若此【杀】被【闪】抵消，你令其流失一点体力，或弃置装备区所有牌。",

"toaru_zhoushe_use_backup":"轴射",
"toaru_hunluan": "混乱",
"toaru_hunluan_info": "混乱状态：本轮使用牌时随机选择目标。",

// 在 translate 对象中添加

// 初春饰利

"toaru_hengwen": "恒温",
"toaru_hengwen_info": "限定技，出牌阶段，你可以令一名角色获得一枚“恒温”标记并记录其体力值。其体力值变化后，若其未进入濒死状态，你可以令其恢复/失去体力至记录体力值，然后移除其“恒温”标记并重置“纵幻”。",
"toaru_hengwen_mark": "恒温",
"toaru_zonghuan": "纵幻",
"toaru_zonghuan_info": "限定技，每当你成为一张牌的目标时，你可重置“恒温”并令此牌对你无效，然后你选择另一名角色成为此牌目标。",

// 白井黑子

"toaru_shunyi": "瞬移",
"toaru_shunyi_info": "出牌阶段限一次，你可以将与你距离不大于1的一名角色的：①一张手牌区/装备区/判定区的牌转移至另一名角色的相应区域；②座次移动至亮明其他角色中间，然后移除此选项。",
"toaru_fengji_shirai": "风纪",
"toaru_fengji_shirai_info": "每轮限一次，当有角色受到伤害后，若伤害来源与你距离为1，你可以将一张牌作为【钢钉】置于其装备区，然后令其选择一项：1.本回合不能使用或打出手牌且所有非锁定技失效；2.失去1点体力；3.保留一张手牌和【钢钉】，然后弃置所有牌。",
"toaru_fengji_ban": "风纪",
"toaru_jiekong": "姐控",
"toaru_jiekong_info": "锁定技，若场上存在【御坂美琴】，若你与其阵营一致，每当你或其造成或受到伤害后，你与其各摸一张牌；你使用【瞬移】和【风纪】的次数+1。若你与其阵营不一致，你对其、其对你造成的伤害+1且成为彼此牌的目标后目标摸一张牌。",

// 钢钉

"toaru_gangding_skill": "钢钉",

// 一方通行

"toaru_shiliangcaozuo": "矢量操作",
"toaru_shiliangcaozuo_info": "蓄力技（1/7）。<br>①出牌阶段限一次，你可以消耗一点蓄力值对一名其他角色造成一点风属性伤害，然后你令其横置并随机弃置一张装备牌，否则本技能本回合可使用次数+1。<br>②当你即将受到伤害时，若此来源牌不为实体牌，你可以消耗一点蓄力值转移此伤害至伤害来源。<br>③每当伤害牌进入弃牌堆后，你获得一点蓄力值。每当有7张伤害牌进入弃牌堆后，你令蓄力值上限永久+1。",
"toaru_shiliangcaozuo_attack": "矢量操作",
"toaru_shiliangcaozuo_defend": "矢量操作",
"toaru_shiliangcaozuo_gain": "矢量操作",
"toaru_shiliangcaozuo_extra": "矢量操作",

// 固法美伟

"toaru_toushi": "透视",
"toaru_toushi_info": "锁定技，场上所有区域的牌以及牌堆的牌始终对你可见。",
"toaru_toushi_effect": "透视",
"toaru_fengji_konori": "风纪",
"toaru_fengji_konori_info": "每回合限一次，当有角色受到伤害后，若伤害来源与你距离为1，你可以弃置一张牌并弃置伤害来源一个区域的所有同色牌。",

// 在 translate 对象中添加

// 食蜂操祈

"toaru_duxin": "读心",
"toaru_duxin_info": "每回合每项限一次：1.出牌阶段，你可以观看【仰慕】对象的手牌，使用其中一张；2.于一个合法时机发动【仰慕】对象的技能（视为【仰慕】对象发动）；3.你的回合结束后，可以令【仰慕】对象失去一点体力上限，然后你控制其进行一个额外的回合。",
"toaru_duxin_view": "读心",
"toaru_duxin_skill": "读心",
"toaru_duxin_control": "读心",

"toaru_duxin2": "读心",
"toaru_duxin2_info": "每回合每项限一次：①回合内或回合外需要使用一张牌时，你可以观看任一角色的手牌并选择一张使用或打出；②于一个合法时机发动场上其他角色的一个技能；③你的回合结束后，你可以选择任意一名角色，控制其进行一个额外的回合。",
"toaru_duxin2_view": "读心",
"toaru_duxin2_skill": "读心",
"toaru_duxin2_control": "读心",

"toaru_waizhuang": "外装",
"toaru_waizhuang_info": "任意角色的回合结束时，若你本回合使用过【读心】你获得一枚“星星”；回合开始时，你可以选择任意项：1.消耗两枚“星星”令一名角色的一个技能本回合失效；2.消耗四枚“星星”强化【读心】直到你的下回合开始；3.消耗六枚“星星”令一名角色增加一点体力上限；4.消耗八枚“星星”重置【派阀】。",
"toaru_waizhuang_star": "星星",
"toaru_waizhuang_use": "外装",
"toaru_waizhuang_enhance": "外装",
"toaru_waizhuang_ban": "外装",

"toaru_paifa": "派阀",
"toaru_paifa_info": "限定技，你可以令一名其他角色增加一点体力上限，摸三张牌，并获得【仰慕】，然后胜利条件改为与你一致。",

"toaru_yangmu": "仰慕",
"toaru_yangmu_info": "你的手牌对【食蜂操祈】始终可见。每轮每项各限一次，当【食蜂操祈】：1.受到伤害时，你可以代替其承受之；2.需要打出或响应一张牌时，你可以替其打出。",
"toaru_yangmu_view": "仰慕",
"toaru_yangmu_damage": "仰慕",
"toaru_yangmu_respond": "仰慕",

// 御坂美琴

"toaru_cipao": "磁炮",
"toaru_cipao_info": "出牌阶段限一次，你可以弃置两张牌并将【砂铁剑】置入你的武器牌区。当【砂铁剑】离开你的装备区时，销毁之。",
"toaru_cipao_upgrade": "※磁炮",
"toaru_cipao_upgrade_info": "每回合限两次，你可以将场上的一张牌当作雷【杀】使用或打出。",

"toaru_wangpai": "王牌",
"toaru_wangpai_info": "锁定技，①你造成的雷属性伤害翻倍；雷属性伤害对你无效；②当你受到伤害或造成雷属性伤害后，你获得1点暴怒值；③你使用雷【杀】无距离限制且不计入次数、且可以额外指定1个目标。",
"toaru_wangpai_double": "王牌",
"toaru_wangpai_immune": "王牌",
"toaru_wangpai_gain": "王牌",
"toaru_wangpai_sha": "王牌",
"toaru_wangpai_nu": "暴怒值",

"toaru_wangpai_upgrade": "※王牌",
"toaru_wangpai_upgrade_info": "锁定技，你造成的所有伤害为雷属性伤害；你造成的雷属性伤害翻倍，50%概率翻三倍，10%概率翻四倍。当你受到雷属性伤害时，该伤害对你无效且你恢复等同伤害的体力值。你使用雷【杀】无距离和次数限制，且可以额外指定任意个目标。",
toaru_shatiejian_sha:"砂铁剑",


"toaru_leibi": "雷壁",
"toaru_leibi_info": "锁定技，其他角色使用的技能每回合首次即将作用于你时，你可视为对伤害来源使用一张雷【杀】，若此【杀】造成伤害，此技能无效。",
"toaru_leibi_clear": "雷壁",

"toaru_leibi_upgrade": "※雷壁",
"toaru_leibi_upgrade_info": "锁定技，其他人作用于你的技能对你无效。其他人使用的以你为目标的牌50%概率失效。",

"toaru_shenpu": "神暴",
"toaru_shenpu_info": "觉醒技，当你的暴怒值达到7时，你增加一点体力上限，恢复一点体力，升级【磁炮】、【王牌】和【雷壁】，获得【钧世】和【通理】。",

"toaru_junshi": "钧世",
"toaru_junshi_info": "出牌阶段，你可以令一名角色进行【闪电】判定，并将判定点数由【黑桃2-9】改为【黑桃和梅花2-9】、伤害来源改为由你造成的3点雷属性伤害。若未造成伤害，你随机对一名角色造成一点雷属性伤害。",

"toaru_tongli": "通理",
"toaru_tongli_info": "锁定技，与你距离为1的角色获得技能【唤梦】。当唤醒值达到100%或你进入濒死状态时，你失去一点体力上限，获得原始技能。",
"toaru_tongli_distance": "通理",
"toaru_tongli_check": "通理",

"toaru_huanmeng": "唤梦",
"toaru_huanmeng_info": "你对【御坂美琴】造成的伤害翻倍。出牌阶段限一次，你可以弃置一张锦囊牌并对【御坂美琴】进行一次【唤醒】，100%获得10%唤醒值；50%获得20%唤醒值；10%获得40%唤醒值；5%直接唤醒。",
"toaru_huanmeng_damage": "唤梦",
"toaru_huanmeng_use": "唤梦",
"toaru_huanmeng_awaken": "唤梦",


"toaru_huanyu": "幻御",
"toaru_huanyu_info": "锁定技，每回合各限一次：①其他角色使用的非实体牌对你无效。②其他角色使用实体牌对你造成伤害时，取消之。③其他角色作用于你的技能对你无效。",

"toaru_huodan": "火弹",
"toaru_huodan_info": "出牌阶段，你可以将一张非基本牌当作【炸弹娃娃】置于一名角色的宝物栏。你的出【杀】次数和手牌上限增加X。当【炸弹娃娃】造成伤害后，你恢复一点体力值并摸两张牌，若未造成伤害，你流失一点体力值并随机弃置一张牌。（X为场上【炸弹娃娃】数量）",
"toaru_huodan_buff": "火弹",
"toaru_duanshi": "断势",
"toaru_duanshi_info": "锁定技，与你同阵营的角色首次对你造成的伤害-1，之后对你造成的伤害+1。",



"toaru_ruodian": "弱电",
"toaru_ruodian_info": "出牌阶段限一次，你可以令一名角色进行X次判定，若结果为雷【杀】、铁索连环或闪电，你摸一张牌并令其获得一枚弱电标记，若其弱电标记达到2的倍数枚，你可以弃置所有标记并对其造成X/2点雷属性伤害。（X为该技能的触发次数）",
"toaru_ruodian_mark": "弱电",
"toaru_huyou": "护佑",
"toaru_huyou_info": "当【一方通行】与你均在场时，你与其每轮开始各恢复一点体力并各摸一张牌。",
"toaru_libeng": "粒崩",
"toaru_libeng_info": "①出牌阶段，你可以选择任意名其他角色，这些角色依次需要打出一张【闪】，否则受到来自你的一点火属性伤害。②当你成为其他角色牌的目标后，你可以取消之。你每发动一次，都增加概率令自己本轮进入混乱状态，当你处于混乱状态时此技能失效。",
"toaru_libeng_target": "粒崩",

"toaru_hunluan2": "混乱",
"toaru_hunluan2_info": "混乱状态：【粒崩】技能失效，使用牌或打出牌时有30%概率触发随机效果（摸牌/弃牌/失去体力/随机伤害），直到下一轮开始。",


},
    },
    intro: "",
    author: "鹰击长空",
    diskURL: "",
    forumURL: "",
    version: "1.0",
},files:{"character":["佐天泪子.jpg"],"card":[],"skill":[],"audio":[]},connect:false} 
};