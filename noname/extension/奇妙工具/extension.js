import { lib, game, ui, get, ai, _status, Library, Game, UI, status, Get } from "../../noname.js";
game.import("extension", function () {
	return {
		name: "奇妙工具",
		editable: false,
		connect: false,
		content: function (config, pack) { },
		precontent: function () {
			//全选手牌
			lib.hooks.checkBegin.add("select_all_handCards", () => {
				const event = get.event();
				if(!game.getExtensionConfig("奇妙工具", "select_all_handCards"))return;
				if (!(event.skill || event.name == "chooseCard")) {
					ui.select_all_handCards?.remove();
					delete ui.select_all_handCards;
				}
				if (event.selectCard && event.selectCard[1] != Infinity) return;
				if ((event.skill || event.name == "chooseCard") && !ui.select_all_handCards) {
					ui.select_all_handCards = ui.create.control("全选手牌", function () {
						ai.basic.chooseCard((card, cards) => {
							if(get.position(card) == "h") return 114514;
							return 0;
						});
						if (_status.event.custom && _status.event.custom.add.card) {
							_status.event.custom.add.card();
						}
						for (var i = 0; i < ui.selected.cards.length; i++) {
							ui.selected.cards[i].updateTransform(true);
						}
					});
				}
			});
			lib.hooks.uncheckBegin.add("select_all_handCards", () => {
				const event = get.event();
				if (event.result?.bool) {
					ui.select_all_handCards?.remove();
					delete ui.select_all_handCards;
				}
			});
			/**
			 * 返回技能的拥有者
			 * @param { string } skill 技能ID
			 * @returns { string[] }
			 */
			game.getSkillOwner = function (skill) {
				let character = {};
				let list = [];
				for (const i of Object.keys(lib.characterPack)) {
					Object.assign(character, lib.characterPack[i]);
				}
				for (const key of Object.keys(character)) {
					if (character[key].skills.includes(skill)) {
						list.push(key);
					}
				}
				return list;
			};
			//全局技能们
			Object.assign(lib.skill, {
				_qmgj_addSkills: {
					enable: "phaseUse",
					filter: function () {
						return game.getExtensionConfig("奇妙工具", "addSkills");
					},
					initList: function () {
						var list,
							skills = [];
						var banned = [];
						for (const key of Object.keys(lib.skill)) {
							if (!lib.translate[`${key}_info`]) {
								continue;
							}
							skills.add(key);
						}
						_status.qmgj_addSkills_list = skills;
					},
					content: async function (event, trigger, player) {
						var next = game.createEvent("inputText", false);
						next.player = player;
						next.setContent(function () {
							var dialog = ui.create.dialog(false);
							let Searcher = ui.create.div(".searcher.caption");
							let input = document.createElement("input");
							input.style.textAlign = "center";
							input.style.border = "solid 2px #294510";
							input.style.borderRadius = "6px";
							input.style.fontWeight = "bold";
							input.style.fontSize = "21px";
							input.placeholder = "支持正则搜索";
							Searcher.appendChild(input);
							dialog.add(Searcher);
							var clickOK = function () {
								dialog.remove();
								if (!event.result) {
									event.result = {};
								}
								if (input.value != "") {
									event.result.value = input.value;
								} else {
									event.result.value = "Warning";
								}
								game.resume();
							};
							if (!event.isMine()) {
								var map = ["void"];
								input.value = map.randomGet();
								clickOK();
							} else {
								dialog.open();
								game.pause();
								var button = ui.create.control("确定", function () {
									button.remove();
									clickOK();
								});
							}
							input.addEventListener("keydown", (e) => {
								if (e.key == "Enter") {
									button.remove();
									clickOK();
								}
								e.stopPropagation();
							});
						});
						//暂时置空ui按钮，防止输入某些字符出问题
						var OriginalClick = ui.auto.click;
						var OriginalPause = ui.click.pause;
						ui.auto.click = new Function();
						ui.click.pause = new Function();
						var result = await next.forResult();
						ui.auto.click = OriginalClick;
						ui.click.pause = OriginalPause;
						//获得技能部分
						if (!_status.qmgj_addSkills_list) {
							lib.skill._qmgj_addSkills.initList();
						}
						let character = {};
						let filterCharacter = {};
						for (const i of Object.keys(lib.characterPack)) {
							Object.assign(character, lib.characterPack[i]);
						}
						for (const current of Object.keys(character)) {
							if (
								new RegExp(result.value, "g").test(
									get.translation(current)
								)
							) {
								filterCharacter[current] = character[current];
							}
						}
						var mapSkill = [];
						for (const iterator of Object.keys(filterCharacter)) {
							mapSkill.addArray(filterCharacter[iterator].skills);
						}
						let target = player;
						if (game.getExtensionConfig("奇妙工具", "SelectGiveCharacter")) {
							var next = target.chooseTarget("选择技能的给予目标", true);
							var resultx = await next.forResult();
							target = resultx.targets[0];
						}
						var skills = _status.qmgj_addSkills_list.filter((key) => {
							try {
								var reg = new RegExp(result.value, "g");
								var bool =
									reg.test(key) ||
									reg.test(lib.translate[key]) ||
									reg.test(lib.translate[`${key}_info`]) ||
									mapSkill.includes(key);
								return bool;
							} catch (error) {
								return false;
							}
						});
						var list = skills.filter(function (i) {
							return !target.hasSkill(i, null, null, false);
						});
						if (!list.length) {
							player.chat("看来没有那种技能呢……");
							return;
						}
						var dialog = ui.create.dialog("forcebutton");
						for (const skill of list) {
							var text = game
								.getSkillOwner(skill)
								.map((c) => get.translation(c));
							if (!text.length) {
								text = ["无"];
							}
							dialog.addText(`技能拥有者:${text}`);
							dialog.add([
								[
									[
										skill,
										'<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' +
										get.translation(skill) +
										"】</div><div>" +
										lib.translate[skill + "_info"] +
										"</div></div>",
									],
								],
								"textbutton",
							]);
							dialog.addText("<br>");
						}
						var next = player.chooseButton(dialog, [1, Infinity]);
						next.set("ai", function (button) {
							return Math.random();
						});
						var result2 = await next.forResult();
						if (result2.bool) {
							await target.addSkills(result2.links);
						}
					},
				},
				_qmgj_autoswap: {
					firstDo: true,
					trigger: {
						player: [
							"playercontrol",
							"chooseToUseBegin",
							"chooseToRespondBegin",
							"chooseToDiscardBegin",
							"chooseToCompareBegin",
							"chooseButtonBegin",
							"chooseCardBegin",
							"chooseTargetBegin",
							"chooseCardTargetBegin",
							"chooseControlBegin",
							"chooseBoolBegin",
							"choosePlayerCardBegin",
							"discardPlayerCardBegin",
							"gainPlayerCardBegin",
							"chooseToMoveBegin",
							"chooseToPlayBeatmapBegin",
							"chooseToGiveBegin",
						],
					},
					forced: true,
					priority: 100,
					forceDie: true,
					popup: false,
					filter: function (event, player) {
						if (!game.getExtensionConfig("奇妙工具", "autoSwap"))
							return false;
						if (event.autochoose && event.autochoose()) return false;
						if (lib.filter.wuxieSwap(event)) return false;
						if (_status.auto || player.isUnderControl(true))
							return false;
						if (game.getExtensionConfig("奇妙工具", "autoSwapSetting") == "all") {
							return true;
						}
						if ((game.getExtensionConfig("奇妙工具", "autoSwapSetting") == "onlyRealFriend" && player.isFriendsOf(game.me))) {
							return true;
						}
						if (game.getExtensionConfig("奇妙工具", "autoSwapSetting") == "onlyFriend" && get.attitude(game.me, player) > 0) {
							return true;
						}
					},
					content: function () {
						game.swapPlayerAuto(player);
					},
				},
				_qmgj_luckyCards: {
					trigger: {
						global: "gameDrawAfter",
					},
					filter: function (event, player) {
						if (!game.getExtensionConfig("奇妙工具", "luckyCards"))
							return false;
						return player == game.me;
					},
					direct: true,
					content: async function (event, trigger, player) {
						var gainCards = [];
						while (true) {
							var list = [];
							var count = player.countCards("h") - gainCards.length;
							if (count <= 0) {
								break;
							}
							for (var i = 0; i < lib.inpile.length; i++) {
								var name = lib.inpile[i];
								var type = get.type(name);
								list.push([type, "", name]);
								if (
									lib.card[name].nature !== undefined &&
									lib.card[name].nature.length > 0
								) {
									for (var j of lib.inpile_nature)
										list.push([type, "", name, j]);
								}
							}
							var next = player.chooseButton(
								["定向手气卡", [list, "vcard"]],
								1,
							);
							next.set("filterButton", function (button) {
								var n = [];
								var cardPile = Array.from(ui.cardPile.childNodes);
								for (var c = 0; c < cardPile.length; c++) {
									if (cardPile[c].name == button.link[2]) {
										n.push(cardPile[c].name);
									}
									if (cardPile[c].nature == button.link[3]) {
										n.push(cardPile[c].nature);
									}
								}
								if (
									n.includes(button.link[2]) &&
									n.includes(button.link[3])
								)
									return true;
							});
							var result = await next.forResult();
							if (result.bool) {
								var choice = result.links[0];
								var cardPile = Array.from(ui.cardPile.childNodes);
								var list = cardPile;
								var cards = [];
								for (let index = 0; index < list.length; index++) {
									const card = list[index];
									if (
										card.name == choice[2] &&
										card.nature == choice[3]
									)
										cards.push(card);
								}
								var result2 = await player
									.chooseCardButton("定向手气卡", cards, [
										1,
										count,
									])
									.forResult();
								if (result2.bool) {
									gainCards.addArray(result2.links);
									await game.cardsGotoOrdering(result2.links);
								}
							} else if (gainCards.length) {
								gainCards.addArray(get.cards(count));
								break;
							} else {
								break;
							}
						}
						if (cards && cards.length) {
							var cards = gainCards;
							var hs = player.getCards("h");
							for (var i = 0; i < hs.length; i++) {
								hs[i].discard(false);
							}
							player._start_cards = cards;
							player.directgain(cards);
						}
					},
				},
				_qmgj_createCard: {
					enable: ["phaseUse"],
					log: false,
					lose: false,
					discard: false,
					filter: function (event, player) {
						if (!game.getExtensionConfig("奇妙工具", "createCard"))
							return false;
						return true;
					},
					async content(event, trigger, player) {
						let suit = lib.suit.slice();
						let cardname = [];
						let cards = [];
						let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
						for (const key in lib.cardPack) {
							if (Object.prototype.hasOwnProperty.call(lib.cardPack, key)) {
								const list = lib.cardPack[key];
								cardname.addArray(list);
							}
						}
						for (const name of cardname) {
							if (name != "sha") {
								cards.push(["", "", name]);
							} else {
								cards.push(["", "", name]);
								for (const nature of lib.linked) {
									cards.push(["", "", name, nature]);
								}
							}
						}
						let dialog = ui.create.dialog();
						let Searcher = ui.create.div(".searcher.caption");
						let input = document.createElement("input");
						input.style.textAlign = "center";
						input.style.border = "solid 2px #294510";
						input.style.borderRadius = "6px";
						input.style.fontWeight = "bold";
						input.style.fontSize = "21px";
						input.placeholder = "支持正则搜索";
						Searcher.appendChild(input);
						dialog.add(Searcher);
						var clickOK = function () {
							dialog.querySelectorAll("div.card.button").forEach(card => {
								let reg = new RegExp(input.value, "g");
								if (reg.test(get.translation(card.name))) {
									card.classList.remove("nodisplay");
								} else {
									card.classList.add("nodisplay");
								};
							});
						};
						input.addEventListener("keydown", (e) => {
							if (e.key == "Enter") {
								clickOK();
							}
							e.stopPropagation();
						});
						let alphabetButtons = ui.create.div();
						for (let i = 0; i < 26; i++) {
							let alphabet = String.fromCharCode(65 + i);
							let alphabetButton = ui.create.button(alphabet, "tdnodes", null, true);
							alphabetButton.classList.add("filterButton");
							alphabetButton.listen(function () {
								dialog.querySelectorAll("div.filterButton").forEach(button => {
									button.classList.remove("glow");
								});
								this.classList.add("glow");
								dialog.querySelectorAll("div.card.button").forEach(card => {
									let firstCharacter = card.name[0];
									if (alphabet == firstCharacter.toUpperCase()) {
										card.classList.remove("nodisplay");
									} else {
										card.classList.add("nodisplay");
									};
								});
							});
							alphabetButtons.appendChild(alphabetButton);
						};
						dialog.add(alphabetButtons);
						let typeButtons = ui.create.div();
						cardname.map(c => get.type(c)).unique().forEach(type => {
							let typeButton = ui.create.button([type, get.translation(type)], "tdnodes", null, true);
							typeButton.classList.add("filterButton");
							typeButton.listen(function () {
								dialog.querySelectorAll("div.filterButton").forEach(button => {
									button.classList.remove("glow");
								});
								this.classList.add("glow");
								dialog.querySelectorAll("div.card.button").forEach(card => {
									let cardType = get.type(card);
									if (cardType == type) {
										card.classList.remove("nodisplay");
									} else {
										card.classList.add("nodisplay");
									};
								});
							});
							typeButtons.appendChild(typeButton);
						});
						dialog.add(typeButtons);
						let Counter = ui.create.div();
						let number_input = document.createElement("input");
						number_input.classList.add("card_creator_number_input");
						number_input.type = "number";
						number_input.min = 1;
						number_input.value = 1;
						number_input.style.textAlign = "center";
						number_input.style.border = "solid 2px #294510";
						number_input.placeholder = "请输入阿拉伯数字";
						dialog.addText("创造牌数");
						Counter.appendChild(number_input);
						dialog.add(Counter);
						dialog.add([
							suit.map(c => [c, get.translation(c)]),
							"tdnodes",
						]);
						dialog.add([
							number,
							"tdnodes"
						]);
						dialog.add([
							cards,
							"vcard"
						]);
						var next = player.chooseButton(dialog, 3);
						next.set("filterButton", function (button) {
							if (button.classList.contains("card") && ui.selected.buttons.some(c => c.classList.contains("card"))) {
								return false;
							}
							if (typeof button.link == "number" && ui.selected.buttons.some(c => typeof c.link == "number")) {
								return false;
							}
							if (suit.includes(button.link) && ui.selected.buttons.some(c => suit.includes(c.link))) {
								return false;
							}
							return true;
						});
						let result = await next.forResult();
						var target = player;
						let value = document.querySelector(".card_creator_number_input").value;
						if (game.getExtensionConfig("奇妙工具", "SelectGiveCharacter")) {
							var next = target.chooseTarget("选择此牌的给予目标", true);
							var resultx = await next.forResult();
							target = resultx.targets[0];
						}
						if (result.bool) {
							let suitx = result.links.find(c => suit.includes(c));
							let numberx = result.links.find(c => typeof c == "number");
							let cardx = result.links.find(c => Array.isArray(c));
							player.logSkill("_qmgj_createCard");
							let createCard = [];
							if (!value) {
								value = 1;
							}
							for(let i = 0;i<value;i++){
								createCard.push(game.createCard(cardx[2], suitx, numberx, cardx[3]));
							}
							await target.gain(createCard);
						}
					},
				},
				_qmgj_viewHandCards: {
					charlotte: true,
					ai: {
						viewHandcard: true,
						skillTagFilter: function (player, tag, arg) {
							if (!game.getExtensionConfig("奇妙工具", "viewHandCards")) {
								return false;
							}
							if ((game.getExtensionConfig("奇妙工具", "viewHandCardsSetting") == "onlyRealFriend" && !player.isFriendsOf(arg))) {
								return false;
							}
							if (game.getExtensionConfig("奇妙工具", "viewHandCardsSetting") == "onlyFriend" && get.attitude(arg, player) <= 0) {
								return true;
							}
							if (player == arg) return false;
						},
					},
				},
			});
			Object.assign(lib.translate, {
				_qmgj_addSkills: "添加技能",
				_qmgj_createCard: "创造卡牌",
				none_sex: "无性",
			})
			//按钮
			lib.announce.subscribe("Noname.Game.Event.GameStart", function () {
				if (game.getExtensionConfig("奇妙工具", "addSkills")) {
					var control = ui.create.system(
						"添加技能",
						function () {
							if (game.me.isPhaseUsing()) {
								return;
							}
							var next = game.createEvent("addSkills");
							next.player = game.me;
							next.setContent(lib.skill._qmgj_addSkills.content);
						},
						true,
						true
					);
				}
				if (game.getExtensionConfig("奇妙工具", "createCard")) {
					var control = ui.create.system(
						"创造卡牌",
						function () {
							if (game.me.isPhaseUsing()) {
								return;
							}
							var next = game.createEvent("createCard");
							next.player = game.me;
							next.setContent(lib.skill._qmgj_createCard.content);
						},
						true,
						true
					);
				}
				if (game.getExtensionConfig("奇妙工具", "replaceCharacter")) {
					var next = game.createEvent("replaceCharacter", false);
					next.player = game.me;
					next.setContent(async function (event, trigger, player) {
						while (true) {
							var result = await player
								.chooseTarget("请选择一名角色替换其武将牌")
								.set("ai", function(){
									return false;
								})
								.forResult();
							if (result.bool) {
								var dialog =
									ui.create.characterDialog("heightset");
								var select = [1, 2];
								var result2 = await player
									.chooseButton(dialog, select)
									.forResult();
								if (result2.bool) {
									lib.element.player.uninit.apply(
										result.targets[0]
									);
									lib.element.player.init.apply(
										result.targets[0],
										[result2.links[0], result2.links[1]]
									);
								}
							} else {
								break;
							}
						}
					});
				}
				if (game.getExtensionConfig("奇妙工具", "swapSeat")) {
					var next = game.createEvent("swapSeat", false);
					next.player = game.me;
					next.setContent(async function (event, trigger, player) {
						while (true) {
							var result = await player
								.chooseTarget(
									"请选择两名角色交换其座次",
									[2, 2]
								)
								.set("ai", function(){
									return false;
								})
								.forResult();
							if (result.bool) {
								game.swapSeat(
									result.targets[0],
									result.targets[1],
									false
								);
							} else {
								break;
							}
						}
					});
				}
				if (game.getExtensionConfig("奇妙工具", "setIdentity")) {
					var next = game.createEvent("setIdentity", false);
					next.player = game.me;
					next.setContent(async function (event, trigger, player) {
						while (true) {
							var list = [];
							switch (get.mode()) {
								case "identity":
									list = lib.config.mode_config.identity.identity.lastItem.slice();
									break;
								default:
									break;
							}
							list.unique();
							if (!list.length) {
								break;
							}
							var result = await player
								.chooseTarget("请选择一名角色设置其身份")
								.set("ai", function(){
									return false;
								})
								.forResult();
							if (result.bool) {
								var result2 = await player
									.chooseButton(
										[
											'###身份设置：请选择一个身份###<div class="text center">',
											[
												list,
												function (
													item,
													type,
													position,
													noclick,
													node
												) {
													return (function (
														item,
														type,
														position,
														noclick,
														node
													) {
														node =
															ui.create.identityCard(
																item,
																position,
																noclick
															);
														node.link = item;
														return node;
													})(
														item,
														type,
														position,
														noclick,
														node
													);
												},
											],
										],
										true
									)
									.forResult();
								game.broadcastAll(
									function (identity, target, shown) {
										target.identity = identity;
										if (shown || target == game.me) {
											target.setIdentity();
										}
									},
									result2.links[0],
									result.targets[0],
									result.targets[0].identityShown
								);
							} else {
								break;
							}
						}
					});
				}
				if (game.getExtensionConfig("奇妙工具", "changeGroup")) {
					var next = game.createEvent("changeGroup", false);
					next.player = game.me;
					next.setContent(async function (event, trigger, player) {
						while (true) {
							var result = await player
								.chooseTarget("请选择一名角色设置其势力")
								.set("ai", function(){
									return false;
								})
								.forResult();
							if (result.bool) {
								var result2 = await player.chooseControl(lib.group, "cancel2")
									.forResult();
								if (result2.control != "cancel2") {
									const target = result.targets[0];
									const group = result2.control;
									game.broadcastAll(
										function(target, group){
											target.group = group;
										}, target, group
									);
								}
							} else {
								break;
							}
						}
					});
				}
				if (game.getExtensionConfig("奇妙工具", "changeSex")) {
					var next = game.createEvent("changeGroup", false);
					next.player = game.me;
					next.setContent(async function (event, trigger, player) {
						while (true) {
							var result = await player
								.chooseTarget("请选择一名角色设置其性别")
								.set("ai", function(){
									return false;
								})
								.forResult();
							if (result.bool) {
								var result2 = await player.chooseControl(["male", "female", "none_sex", "double"], "cancel2")
									.forResult();
								if (result2.control != "cancel2") {
									const target = result.targets[0];
									let sex = result2.control;
									if (result2.control == "none_sex") {
										sex = "none";
									}
									game.broadcastAll(
										function(target, sex){
											target.sex = sex;
										}, target, sex
									);
								}
							} else {
								break;
							}
						}
					});
				}
			});
			lib.arenaReady.push(() => {
				let button = ui.create.system("自娱自乐", function () {
					var bool = this.classList.toggle("glow");
					game.saveConfig("extension_奇妙工具_autoSwap", bool);
				}, true);
				button.classList.toggle("glow", Boolean(game.getExtensionConfig("奇妙工具", "autoSwap")));
			});
			var config = game.getExtensionConfig("奇妙工具", "maximumNumberOfPlayers");
			_status.maximumNumberOfPlayers = config;
		},
		config: {
			select_all_handCards: {
				name: "全选手牌",
				init: true,
				intro: "开启后，某些技能（如制衡）会出现一个“全选手牌”按钮。",
			},
			replaceCharacter: {
				name: "AI换将",
				init: false,
				intro: "开启后在游戏开始时可以给其他人换将",
			},
			swapSeat: {
				name: "AI换座",
				init: false,
				intro: "开启后在游戏开始时可以给其他人换座次",
			},
			changeGroup: {
				name: "设置势力",
				init: false,
				intro: "开启后在游戏开始时可以给一名角色换势力",
			},
			changeSex: {
				name: "设置性别",
				init: false,
				intro: "开启后在游戏开始时可以给一名角色换性别（真的有意义么）",
			},
			autoSwap: {
				name: "自娱自乐",
				init: true,
				intro: "开启后立即生效，接管场上所有角色的操作。",
			},
			autoSwapSetting: {
				name: "自娱自乐设置",
				init: "all",
				item: {
					"all": "全部都操控",
					"onlyFriend": "仅限队友",
					"onlyRealFriend": "仅限真实队友",
				},
				intro: "关于自娱自乐的设置",
			},
			viewHandCards: {
				name: "金睛火眼",
				init: true,
				intro: "开启后立即生效，观看他人的手牌。",
			},
			viewHandCardsSetting: {
				name: "金睛火眼设置",
				init: "all",
				item: {
					"all": "我全都要看",
					"onlyFriend": "只看队友",
					"onlyRealFriend": "只看真实队友",
				},
				intro: "关于自娱自乐的设置",
			},
			addSkills: {
				name: "添加技能",
				init: false,
				intro: "开启后在游戏进行时给自己加技能",
			},
			createCard: {
				name: "卡牌创造",
				init: false,
				intro: "开启后在可以创造卡牌",
			},
			SelectGiveCharacter: {
				name: "选择目标",
				init: false,
				intro: "添加技能和卡牌创造可以选择给予目标",
			},
			luckyCards: {
				name: "定向手气卡",
				init: false,
				intro: "开启后可以定向指定手气卡",
			},
			setIdentity: {
				name: "设置身份",
				init: true,
				intro: "开启后在游戏开始时替换身份",
			},
			maximumNumberOfPlayers: {
				name: "身份场人数上限",
				init: 10,
				item: {
					10: "10名玩家",
					11: "11名玩家",
					12: "12名玩家",
					13: "13名玩家",
					14: "14名玩家",
					15: "15名玩家",
					16: "16名玩家",
					17: "17名玩家",
					100: "100名玩家",
				},
				intro: "设置身份场的玩家数上限（警告：过多的玩家同框会导致UI显示错误及极高的性能消耗）",
			},
		},
		help: {},
		package: {
			character: {
				character: {},
				translate: {},
			},
			card: {
				card: {},
				translate: {},
				list: [],
			},
			skill: {
				skill: {},
				translate: {},
			},
			intro: "一个用于优化游戏体验的小工具扩展",
			author: "眯咪狗",
			diskURL: "",
			forumURL: "",
			version: "2.9",
		},
		files: { character: [], card: [], skill: [], audio: [] },
	};
});
