import { lib, game, ui, get as _get, ai, _status } from "../../../../../noname.js";
import { cast } from "../../../../../noname/util/index.js";
import { GetGuozhan } from "../../patch/get.js";
import { PlayerGuozhan } from "../../patch/player.js";

/** @type {GetGuozhan}  */
const get = cast(_get);

export default {
	//手杀杜预
	gz_wuku: {
		audio: "spwuku",
		trigger: { global: "useCard" },
		forced: true,
		preHidden: true,
		filter(event, player) {
			if (get.type(event.card) != "equip") {
				return false;
			}
			if (player.isFriendOf(event.player)) {
				return false;
			}
			return player.countMark("gz_wuku") < 2;
		},
		async content(event, trigger, player) {
			player.addMark("gz_wuku", 1);
		},
		marktext: "库",
		intro: {
			content: "mark",
		},
		ai: {
			combo: "gz_miewu",
		},
	},
	gz_miewu: {
		audio: "spmiewu",
		enable: ["chooseToUse", "chooseToRespond"],
		filter(event, player) {
			if (!player.countMark("gz_wuku") || !player.countCards("hse") || player.hasSkill("gz_miewu_used")) {
				return false;
			}
			for (let i of lib.inpile) {
				let type = get.type2(i);
				if ((type == "basic" || type == "trick") && event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				let list = [];
				for (let i = 0; i < lib.inpile.length; i++) {
					let name = lib.inpile[i];
					if (name == "sha") {
						if (event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) {
							list.push(["基本", "", "sha"]);
						}
						for (let nature of lib.inpile_nature) {
							if (event.filterCard(get.autoViewAs({ name, nature }, "unsure"), player, event)) {
								list.push(["基本", "", "sha", nature]);
							}
						}
					} else if (get.type2(name) == "trick" && event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) {
						list.push(["锦囊", "", name]);
					} else if (get.type(name) == "basic" && event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) {
						list.push(["基本", "", name]);
					}
				}
				return ui.create.dialog("灭吴", [list, "vcard"]);
			},
			check(button) {
				if (_status.event.getParent().type != "phase") {
					return 1;
				}
				let player = _status.event.player;
				if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(button.link[2])) {
					return 0;
				}
				return player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
			},
			backup(links, player) {
				return {
					filterCard: true,
					audio: "gz_miewu",
					popname: true,
					check(card) {
						return 8 - get.value(card);
					},
					position: "hse",
					viewAs: { name: links[0][2], nature: links[0][3] },
					onuse(result, player) {
						const next = game.createEvent("miewuDraw", false, _status.event.getParent());
						next.player = player;
						next.setContent(async (event, trigger, player) => {
							await player.draw();
						});
					},
					onrespond(result, player) {
						const next = game.createEvent("miewuDraw", false, _status.event.getParent());
						next.player = player;
						next.setContent(async (event, trigger, player) => {
							await player.draw();
						});
					},
					precontent() {
						player.addTempSkill("gz_miewu_used");
						player.removeMark("gz_wuku", 1);
					},
				};
			},
			prompt(links, player) {
				return "将一张牌当做" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + "使用";
			},
		},
		hiddenCard(player, name) {
			if (!lib.inpile.includes(name)) {
				return false;
			}
			var type = get.type2(name);
			return (type == "basic" || type == "trick") && player.countMark("gz_wuku") > 0 && player.countCards("she") > 0 && !player.hasSkill("gz_miewu_used");
		},
		ai: {
			combo: "gz_wuku",
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player) {
				if (!player.countMark("gz_wuku") || !player.countCards("hse") || player.hasSkill("gz_miewu_used")) {
					return false;
				}
			},
			order: 1,
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		subSkill: {
			used: {
				charlotte: true,
			},
			backup: {
				audio: "gz_miewu",
			},
		},
	},
	//紫气东来
	gz_yingshi: {
		audio: "smyyingshi",
		trigger: {
			player: "phaseUseBegin",
		},
		filter(event, player) {
			const card = new lib.element.VCard({ name: "zhibi" });
			return game.hasPlayer(current => current.hasUseTarget(card));
		},
		preHidden: true,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), 2)
				.set("filterTarget", (cardx, player, target) => {
					const card = new lib.element.VCard({ name: "zhibi" });
					if (ui.selected.targets.length) {
						const user = ui.selected.targets[0];
						return user.canUse(card, target);
					}
					return target.hasUseTarget(card);
				})
				.set("ai", target => {
					const att = get.attitude(get.player(), target);
					if (att <= 0) {
						return 0;
					}
					const card = new lib.element.VCard({ name: "zhibi" });
					return target != get.player() ? target.getUseValue(card) : 0.2;
				})
				.set("targetprompt", ["使用者", "目标"])
				.set("complexTarget", true)
				.setHiddenSkill(event.skill)
				.forResult();
		},
		async content(event, trigger, player) {
			const card = new lib.element.VCard({ name: "zhibi" });
			await event.targets[0].useCard(card, event.targets[1], "noai");
			if (event.targets[0] != player) {
				await player.draw();
			}
		},
	},
	gz_ejue: {
		audio: "oljianmie",
		trigger: {
			source: "damageBegin1",
		},
		filter(event, player) {
			return event?.card?.name == "sha" && event.player.isUnseen();
		},
		preHidden: true,
		forced: true,
		logTarget: "player",
		async content(event, trigger, player) {
			trigger.num++;
		},
	},
	gz_shangshi: {
		audio: "reshangshi",
		trigger: {
			global: "phaseEnd",
		},
		filter(event, player) {
			return player.countCards("h") < player.getDamagedHp();
		},
		preHidden: true,
		frequent: true,
		async content(event, trigger, player) {
			await player.drawTo(player.getDamagedHp());
		},
	},
	gz_yimie: {
		locked: true,
		audio: "yimie",
		global: "gz_yimie_effect",
		trigger: { global: "dying" },
		priority: 16,
		forced: true,
		preHidden: true,
		filter(event, player, name) {
			return _status.currentPhase == player;
		},
		logTarget: "player",
		async content() { },
		subSkill: {
			effect: {
				enable: "chooseToUse",
				viewAsFilter(player) {
					if (!_status.currentPhase || !_status.currentPhase.hasSkill("gz_yimie")) {
						return false;
					}
					const target = _status.event.dying;
					if (!target || target.isUnseen()) {
						return false;
					}
					return !player.isFriendOf(target) && player.countCards("hs", { suit: "heart" });
				},
				filterCard(card) {
					return get.suit(card) == "heart";
				},
				locked: true,
				position: "hs",
				viewAs: { name: "tao" },
				prompt: "将一张♥手牌当桃使用",
				check(card) {
					return 15 - get.value(card);
				},
				mod: {
					cardSavable(card, player) {
						if (card.name == "tao" && _status.currentPhase?.isIn() && _status.currentPhase.hasSkill("gz_yimie")) {
							if (_status.event.dying && player.isFriendOf(_status.event.dying)) {
								return false;
							}
						}
					},
					cardEnabled(card, player) {
						if (card.name == "tao" && _status.currentPhase?.isIn() && _status.currentPhase.hasSkill("gz_yimie")) {
							if (_status.event.dying && player.isFriendOf(_status.event.dying)) {
								return false;
							}
						}
					},
				},
			},
		},
	},
	gz_ruilve: {
		audio: "ruilve",
		global: "gz_ruilve_give",
		subSkill: {
			used: {
				charlotte: true,
			},
			give: {
				enable: "phaseUse",
				discard: false,
				lose: false,
				delay: false,
				line: true,
				log: false,
				prepare(cards, player, targets) {
					targets[0].logSkill("gz_ruilve");
				},
				prompt() {
					let player = _status.event.player;
					let list = game.filterPlayer(function (target) {
						return target != player && target.hasSkill("gz_ruilve");
					});
					let str = "将一张具有伤害标签的牌交给" + get.translation(list);
					if (list.length > 1) {
						str += "中的一人";
					}
					return str;
				},
				filter(event, player) {
					if (!player.isUnseen()) {
						return false;
					}
					if (player.countCards("h", lib.skill.gz_ruilve_give.filterCard) == 0) {
						return false;
					}
					return game.hasPlayer(function (target) {
						return target != player && target.hasSkill("gz_ruilve") && !target.hasSkill("gz_ruilve_used");
					});
				},
				filterCard(card) {
					if (!get.tag(card, "damage")) {
						return false;
					}
					return true;
				},
				visible: true,
				filterTarget(card, player, target) {
					return target != player && target.hasSkill("gz_ruilve") && !target.hasSkill("gz_ruilve_used");
				},
				async content(event, trigger, player) {
					await player.showCards(event.cards);
					await player.give(event.cards, event.target);
					event.target.addTempSkill("gz_ruilve_used", "phaseUseEnd");
					await player.draw();
				},
				ai: {
					expose: 0.3,
					order: 1,
					result: {
						target: 5,
					},
				},
			},
		},
	},
	gz_zhaoran: {
		audio: "zhaoran",
		trigger: {
			player: "phaseUseBefore",
		},
		filter(event, player) {
			return game.countGroup() < 4;
		},
		preHidden: true,
		async content(event, trigger, player) {
			const num = 4 - game.countGroup();
			if (num > 0) {
				await player.draw(num);
			}
			let target = player.getNext();
			while (target != player) {
				if (!target.isUnseen()) {
					target = target.getNext();
				} else {
					player.line(target, "green");
					const result = await target
						.chooseControl("明置主将", "明置副将", "cancel2")
						.set("ai", () => {
							return get.event("value");
						})
						.set(
							"value",
							(() => {
								const att = get.attitude(target, player),
									num = player.countCards("h") - player.hp;
								if (num < 3) {
									return 2;
								}
								if (att > 0) {
									return player.hp > 2 ? [1, 0].randomGet() : 2;
								}
								return player.hp <= 2 ? [1, 0].randomGet() : 2;
							})()
						)
						.set("prompt", `昭然：是否明置一张武将牌令${get.translation(player)}结束回合？`)
						.forResult();
					if (result.control != "cancel2") {
						await target.showCharacter(result.index);
						trigger.cancel();
						let evt = trigger.getParent("phase");
						if (evt && evt.player == player) {
							game.log(player, "结束了回合");
							evt.num = evt.phaseList.length;
							evt.goto(11);
						}
						break;
					}
					target = target.getNext();
				}
			}
		},
	},
	gz_beiluan: {
		audio: "choufa",
		trigger: {
			player: "damageEnd",
		},
		logTarget: "source",
		preHidden: true,
		filter(event, player) {
			return event.source;
		},
		async content(event, trigger, player) {
			trigger.source.addTempSkill("gz_beiluan_viewas");
		},
		ai: {
			maixie_defend: true,
			effect: {
				target(card, player, target) {
					if (player.countCards("he", cardx => cardx.name != "sha" && get.tag(cardx, "damage")) > 1 && get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, -1.5];
						}
						if (get.attitude(target, player) < 0) {
							return [1, 0, 1, -1];
						}
					}
				},
			},
		},
		subSkill: {
			viewas: {
				onremove: true,
				charlotte: true,
				mark: true,
				intro: {
					content: "手牌中的非装备牌均视为杀",
				},
				mod: {
					cardname(card, player) {
						if (get.type2(card, false) != "equip") {
							return "sha";
						}
					},
					cardnature(card, player) {
						if (get.type2(card, false) != "equip") {
							return false;
						}
					},
				},
			},
		},
	},
	gz_pojing: {
		enable: "phaseUse",
		usable: 1,
		audio: "naxiang",
		filterTarget: lib.filter.notMe,
		async content(event, trigger, player) {
			const target = event.target;
			const result = await target
				.chooseControl()
				.set("prompt", "迫境：选择一项")
				.set("choiceList", [`令${get.translation(player)}获得你区域里的一张牌`, `令与${get.translation(player)}势力相同的角色可以明置武将牌对你造成伤害`])
				.set("ai", () => get.event("value"))
				.set(
					"value",
					(() => {
						const targets = game.filterPlayer(current => current != target && current.isUnseen()),
							jins = game.filterPlayer(current => current.identity == player.identity && current.isUnseen(2));
						if (Math.random() * 10 < targets.length || jins.length) {
							return get.damageEffect(target, player, target) > 0 ? 1 : 0;
						}
						return 1;
					})()
				)
				.forResult();
			if (result.index == 0) {
				await player.gainPlayerCard(target, "hej", true);
			} else {
				const players = game
					.filterPlayer(function (current) {
						return current.isUnseen() || current.identity == player.identity;
					})
					.sort(lib.sort.seat);
				let num = 0,
					count = 0;
				const filterName = name => {
					return lib.character[name][1] == player.identity && !get.is.double(name);
				};
				while (num < players.length) {
					let targetx = players[num];
					if ((targetx.isUnseen(0) && filterName(targetx.name1)) || (targetx.isUnseen(1) && filterName(targetx.name2))) {
						let list = [];
						const bool1 = targetx.isUnseen(0) && filterName(targetx.name1),
							bool2 = targetx.isUnseen(1) && filterName(targetx.name2);
						if (bool1) {
							list.push("明置主将");
						}
						if (bool2) {
							list.push("明置副将");
						}
						if (bool1 && bool2) {
							list.push("全部明置");
						}
						list.push("cancel2");
						const result2 = await targetx
							.chooseControl(list)
							.set("prompt", `是否响应${get.translation(player)}的号召？`)
							.set("prompt2", `明置任意张武将牌并对${get.translation(target)}造成等量伤害`)
							.set("ai", () => {
								if (get.event("eff") > 0) {
									return list.filter(i => i != "cancel2").randomGet();
								}
								return "cancel2";
							})
							.set("eff", get.damageEffect(target, targetx, targetx))
							.forResult();
						if (result2.control != "cancel2") {
							count++;
							const map = {
								明置主将: 0,
								明置副将: 1,
								全部明置: 2,
							};
							await targetx.showCharacter(map[result2.control]);
							targetx.line(target, "green");
							const numx = map[result2.control] == 2 ? 2 : 1;
							await target.damage(targetx, numx);
						}
					} else {
						await targetx
							.chooseControl("ok")
							.set("prompt", `${get.translation(player)}正在尝试召集他的小伙伴`)
							.set("prompt2", "没什么，只是想让你知道");
					}
					num++;
				}
				if (!count) {
					player.chat("欺我军无人乎？");
				}
			}
		},
		ai: {
			order: 7,
			result: {
				target(player, target) {
					const targets = game.filterPlayer(current => current != target && current.isUnseen());
					if (Math.random() * 7 < targets.length) {
						return get.damageEffect(target, player, target);
					}
					return get.effect(target, { name: "shunshou" }, player, target);
				},
			},
		},
	},
	gz_gongzhi: {
		audio:2,
		trigger: {
			player: "phaseDrawBefore",
		},
		async content(event, trigger, player) {
			trigger.cancel();
			let num = 0,
				target = player;
			while (num < 4) {
				await target.draw();
				num++;
				target = target.getNext();
				while (!player.isFriendOf(target)) {
					target = target.getNext();
				}
			}
		},
	},
	gz_sheju: {
		audio:2,
		trigger: {
			global: "showCharacterEnd",
		},
		filter(event, player) {
			return event.player != player && event.player.isFriendOf(player) && player.isDamaged();
		},
		forced: true,
		async content(event, trigger, player) {
			await player.recover();
			const cards = player.getDiscardableCards(player, "h");
			if (cards.length) {
				await player.discard(cards);
			}
		},
	},
	gz_zhulan: {
		audio:2,
		trigger: {
			global: "damageBegin3",
		},
		filter(event, player) {
			return event.player != player && event.source?.isFriendOf(event.player) && player.countCards("he");
		},
		preHidden: true,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseToDiscard("he", get.prompt2(event.skill, trigger.player))
				.set("ai", card => {
					if (get.event("eff") > 0) {
						return 0;
					}
					return 7 - get.value(card);
				})
				.set("eff", get.attitude(player, trigger.player))
				.set("chooseonly", true)
				.setHiddenSkill(event.skill)
				.forResult();
			event.result.targets = [trigger.player];
		},
		async content(event, trigger, player) {
			await player.discard(event.cards);
			trigger.num++;
		},
	},
	gz_luanchang: {
		audio:2,
		trigger: {
			global: "phaseEnd",
		},
		limited: true,
		skillAnimation: true,
		animationColor: "thunder",
		filter(event, player) {
			const card = new lib.element.VCard({ name: "wanjian" }, event.player.getCards("h"));
			return (
				event.player.countCards("h") &&
				event.player.hasUseTarget(card) &&
				game.hasPlayer2(current => {
					if (!player.isFriendOf(current)) {
						return false;
					}
					return current.getHistory("damage").length;
				})
			);
		},
		logTarget: "player",
		check(event, player) {
			const card = new lib.element.VCard({ name: "wanjian" }, event.player.getCards("h"));
			let eff = event.player.countCards("h");
			game.filterPlayer(current => {
				if (event.player.canUse(card, current)) {
					eff += get.effect(current, card, event.player, player);
				}
			});
			return eff > 0;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			const card = new lib.element.VCard({ name: "wanjian" }, trigger.player.getCards("h"));
			await trigger.player.chooseUseTarget(card, trigger.player.getCards("h"), true);
		},
	},
	gz_zhuosheng: {
		audio: "zhuosheng",
		trigger: {
			player: "gainAfter",
		},
		frequent: true,
		filter(event, player) {
			return event.getg(player)?.length && !player.hasSkill("gz_zhuosheng_up");
		},
		async content(event, trigger, player) {
			player.addTempSkill("gz_zhuosheng_up");
		},
		subSkill: {
			up: {
				audio: "gz_zhuosheng",
				charlotte: true,
				mark: true,
				intro: {
					content: "本回合使用的下一张牌伤害+1",
				},
				trigger: {
					player: "useCard1",
				},
				firstDo: true,
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					if (get.tag(trigger.card, "damage")) {
						if (typeof trigger.baseDamage != "number") {
							trigger.baseDamage = 1;
						}
						trigger.baseDamage++;
					}
					player.removeSkill(event.name);
				},
				ai: {
					presha: true,
				},
			},
		},
	},
	gz_ciwei: {
		audio: "ciwei",
		trigger: {
			global: "useCard",
		},
		filter(event, player) {
			if (event.all_excluded || event.player == player || !player.countCards("he") || player != _status.currentPhase) {
				return false;
			}
			return game.hasPlayer(current => {
				if (current == player || current.isFriendOf(event.player)) {
					return false;
				}
				return current.getHistory("useCard").length || current.getHistory("respond").length;
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseToDiscard(get.prompt2(event.skill, trigger.player), "he")
				.set("ai", card => {
					return _status.event.goon / 1.4 - get.value(card);
				})
				.set(
					"goon",
					(function () {
						if (!trigger.targets.length) {
							return -get.attitude(player, trigger.player);
						}
						var num = 0;
						for (var i of trigger.targets) {
							num -= get.effect(i, trigger.card, trigger.player, player);
						}
						return num;
					})()
				)
				.setHiddenSkill(event.skill)
				.set("logSkill", [event.skill, trigger.player])
				.forResult();
		},
		preHidden: true,
		popup: false,
		async content(event, trigger, player) {
			trigger.targets.length = 0;
			trigger.all_excluded = true;
		},
	},
	gz_caiyuan: {
		audio: "caiyuan",
		trigger: {
			player: ["phaseBeginStart", "damageEnd"],
		},
		forced: true,
		filter(event, player) {
			return !player.isUnseen(2);
		},
		async content(event, trigger, player) {
			if (trigger.name == "phase") {
				await player.draw(2);
			} else {
				if (!player.isUnseen(0) && get.character(player.name1, 3).includes("gz_caiyuan")) {
					await player.hideCharacter(0);
				}
				if (!player.isUnseen(1) && get.character(player.name2, 3).includes("gz_caiyuan")) {
					await player.hideCharacter(1);
				}
			}
		},
	},
	gz_yanxi: {
		audio: "yanxi",
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		filter(event, player) {
			return game.hasPlayer(current => !player.isFriendOf(current) && current.countCards("h"));
		},
		preHidden: true,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), [1, 3], (card, player, target) => {
					return !player.isFriendOf(target) && target.countCards("h");
				})
				.set("ai", target => {
					const att = get.attitude(get.player(), target);
					return -att;
				})
				.setHiddenSkill(event.skill)
				.forResult();
		},
		async content(event, trigger, player) {
			const cards = [],
				targets = event.targets.sortBySeat();
			for (const target of targets) {
				const result = await player.choosePlayerCard(target, "h", true).forResult();
				if (result?.bool && result.cards?.length) {
					cards.addArray(result.cards);
				}
			}
			const names = [];
			for (const target of targets) {
				const prompt = `宴戏：声明一个牌名（你被选择的牌为${get.translation(cards[targets.indexOf(target)])}）`;
				const result = await target
					.chooseButton([prompt, [get.inpileVCardList(i => !i[3]), "vcard"]], true)
					.set("ai", button => {
						const { player, chosenCard: card } = get.event();
						if (Math.random() > 0.5 && button.link[2] == card.name) {
							return 24;
						}
						return player.countCards("h", button.link[2]);
					})
					.set("chosenCard", cards[targets.indexOf(target)])
					.forResult();
				if (result?.bool && result.links?.length) {
					names.push(result.links[0][2]);
					target.chat(get.translation(result.links[0][2]));
					game.log(target, "声明了", `#y${get.translation(result.links[0][2])}`);
				}
			}
			const result = await player
				.chooseTarget(
					"宴席：展示并获得一名角色被你选择的牌",
					(card, player, target) => {
						return get.event("targetx").includes(target);
					},
					true
				)
				.set("targetx", targets)
				.set("ai", target => Math.random())
				.forResult();
			if (result?.bool) {
				const target = result.targets[0],
					index = targets.indexOf(target),
					card = cards[index],
					name = names[index];
				await target.showCards([card]);
				await target.give(card, player, true);
				if (name != card.name) {
					await player.gain(
						cards.filter(cardx => cardx != card),
						"giveAuto"
					);
				}
			}
		},
	},
	gz_shiren: {
		audio: "shiren",
		trigger: {
			global: "damageEnd",
		},
		filter(event, player) {
			return event.player != player && event.player.isUnseen() && event.player.isIn() && player.countCards("he") > 1;
		},
		usable: 1,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCardTarget({
					filterCard: true,
					prompt: get.prompt2(event.skill, trigger.player),
					position: "he",
					selectCard: 2,
					filterTarget(card, player, target) {
						return target == get.event("targetx");
					},
					targetx: trigger.player,
					selectTarget: -1,
					ai1(card) {
						const { player, targetx: target } = get.event();
						if (get.attitude(player, target) <= 0) {
							return 0;
						}
						return 8 - get.value(card);
					},
					ai2() {
						return 1;
					},
				})
				.setHiddenSkill(event.skill)
				.forResult();
		},
		preHidden: true,
		async content(event, trigger, player) {
			await player.give(event.cards, event.targets[0]);
			await player.draw(2);
		},
	},
	gz_chengxi: {
		audio: "shenpin",
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		preHidden: true,
		filter(event, player) {
			const card = new lib.element.VCard({ name: "yiyi" });
			return game.hasPlayer(current => current.hasUseTarget(card));
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), (cardx, player, target) => {
					const card = new lib.element.VCard({ name: "yiyi" });
					return target.hasUseTarget(card);
				})
				.set("ai", target => {
					const card = new lib.element.VCard({ name: "yiyi" });
					return get.attitude(get.player(), target) * target.getUseValue(card);
				})
				.setHiddenSkill(event.skill)
				.forResult();
		},
		async content(event, trigger, player) {
			const card = new lib.element.VCard({ name: "yiyi" }),
				target = event.targets[0];
			game.addGlobalSkill("gz_chengxi_ai");
			const { result } = await target.chooseUseTarget(card, true);
			game.removeGlobalSkill("gz_chengxi_ai");
			if (
				result?.targets?.length &&
				game.hasPlayer2(current => {
					return current.hasHistory("lose", evt => {
						return evt.getParent(6) == event && evt.cards2?.some(card => get.type(card) != "basic");
					});
				})
			) {
				target.line(result.targets, "green");
				for (const targetx of result.targets) {
					await targetx.damage(target);
				}
			}
		},
		subSkill: {
			ai: {
				mod: {
					aiValue(player, card, num) {
						if (get.type(card) != "basic" || card?.name == "tao") {
							return;
						}
						return 0.2;
					},
					aiUseful(player, card, num) {
						if (get.type(card) != "basic" || card?.name == "tao") {
							return;
						}
						return 0.2;
					},
				},
				locked: false,
			},
		},
	},
	gz_jiantong: {
		audio: "zhongyun",
		trigger: {
			player: "damageEnd",
		},
		preHidden: true,
		filter(event, player) {
			return game.hasPlayer(current => current.countCards("h"));
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), (card, player, target) => {
					return target.countCards("h");
				})
				.set("ai", target => {
					return -get.attitude(get.player(), target) * target.countCards("h");
				})
				.setHiddenSkill(event.skill)
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			if (player.countCards("e")) {
				const result = await player
					.chooseButton(["监统：是否用装备区一张牌交换至多两张牌？", `${get.translation(player)}的装备区`, player.getCards("e"), `${get.translation(target)}的手牌`, target.getCards("h")], [2, 3])
					.set("filterButton", button => {
						const cards = get.player().getCards("e");
						if (ui.selected.buttons.length) {
							return !cards.includes(button.link);
						}
						return cards.includes(button.link);
					})
					.set("complexSelect", true)
					.set("ai", button => {
						if (ui.selected.buttons.length) {
							return 6 - get.buttonValue(button);
						}
						return get.buttonValue(button);
					})
					.forResult();
				if (result?.bool) {
					const cards1 = result.links.slice(0, 1),
						cards2 = result.links.slice(1);
					await player.swapHandcards(target, cards1, cards2);
				}
			} else {
				await player.viewHandcards(target);
			}
		},
	},
	gz_chujue: {
		audio: "dcbeini",
		trigger: {
			player: "useCard",
		},
		filter(event, player) {
			return event.targets?.some(target => {
				return game.hasPlayer2(current => current.isDead() && current.isFriendOf(target));
			});
		},
		forced: true,
		async content(event, trigger, player) {
			const targets = [];
			trigger.targets.filter(target => {
				if (game.hasPlayer2(current => current.isDead() && current.isFriendOf(target))) {
					targets.addArray(game.filterPlayer(current => current.isFriendOf(target)));
				}
			});
			trigger.directHit.addArray(targets);
		},
		mod: {
			cardUsableTarget(card, player, target) {
				if (game.hasPlayer2(current => current.isDead() && current.isFriendOf(target))) {
					return Infinity;
				}
			},
		},
	},
	gz_jianzhi: {
		audio: "jianhui",
		trigger: {
			source: "damageBegin4",
		},
		filter(event, player) {
			return event.num >= event.player.hp && player.countDiscardableCards(player, "h");
		},
		check(event, player) {
			return player.countCards("h") <= 2;
		},
		preHidden: true,
		async content(event, trigger, player) {
			const cards = player.getDiscardableCards(player, "h");
			if (cards.length) {
				await player.discard(cards);
			}
			player.addTempSkill("gz_jianzhi_draw");
			player.addMark("gz_jianzhi_draw", 1, false);
		},
		subSkill: {
			draw: {
				onremove: true,
				charlotte: true,
				forceDie: true,
				trigger: {
					global: "drawBegin",
				},
				forced: true,
				direct: true,
				filter(event, player) {
					return event.getParent()?.name == "die";
				},
				async content(event, trigger, player) {
					let num = 0;
					while (num < player.countMark(event.name)) {
						trigger.num *= 3;
						num++;
					}
					player.removeSkill(event.name);
				},
			},
		},
	},
	gz_zhefu: {
		audio: "zhefu",
		trigger: {
			player: ["useCardAfter", "respondAfter"],
		},
		filter(event, player) {
			return (
				player != _status.currentPhase &&
				get.type(event.card) == "basic" &&
				game.hasPlayer(current => {
					const num1 = game.countPlayer(target => target.identity == current.identity),
						num2 = game.countPlayer(target => target.identity == player.identity);
					return num1 >= num2 && current.countCards("h");
				})
			);
		},
		preHidden: true,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), (card, player, target) => {
					const num = game.countPlayer(current => target.identity == current.identity),
						num2 = get.event("numx");
					return num >= num2 && target.countCards("h");
				})
				.set(
					"numx",
					game.countPlayer(target => target.identity == player.identity)
				)
				.set("ai", target => {
					const player = get.player();
					return get.effect(target, { name: "guohe_copy2" }, player, player);
				})
				.setHiddenSkill(event.skill)
				.forResult();
		},
		async content(event, trigger, player) {
			await player
				.discardPlayerCard(event.targets[0], "h", "visible")
				.set("filterButton", button => {
					return get.type(button.link) == "basic";
				})
				.forResult();
		},
	},
	gz_yidu: {
		audio: "yidu",
		trigger: {
			player: "useCardAfter",
		},
		filter(event, player) {
			return (
				get.tag(event.card, "damage") > 0.5 &&
				event.targets.some(target => {
					return target.countCards("h") > 0 && !target.hasHistory("damage", evt => evt.card == event.card);
				})
			);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), (card, player, target) => {
					return get.event().targets.includes(target);
				})
				.set(
					"targets",
					trigger.targets.filter(target => {
						return target.countCards("h") > 0 && !target.hasHistory("damage", evt => evt.card == trigger.card);
					})
				)
				.set("ai", target => {
					const player = get.player();
					if (target.hasSkillTag("noh")) {
						return 0;
					}
					return -get.attitude(player, target);
				})
				.setHiddenSkill(event.skill)
				.forResult();
		},
		preHidden: true,
		async content(event, trigger, player) {
			const {
				targets: [target],
			} = event;
			if (!target.countCards("h")) {
				return;
			}
			const cards = await player
				.choosePlayerCard(target, "遗毒：展示" + get.translation(target) + "的至多两张手牌", true, "h", [1, Math.min(2, target.countCards("h"))])
				.set("forceAuto", true)
				.set("ai", button => {
					if (ui.selected.buttons.length) {
						return 0;
					}
					return 1 + Math.random();
				})
				.forResultCards();
			if (!cards?.length) {
				return;
			}
			await player.showCards(cards, get.translation(player) + "对" + get.translation(target) + "发动了【遗毒】");
			const color = get.color(cards[0], target);
			if (cards.every(card => get.color(card, target) == color)) {
				await target.discard(cards, "notBySelf").set("discarder", player);
			}
		},
	},
	gz_chengliu: {
		audio: "jsrgchengliu",
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(current => {
				return current.countCards("e") < player.countCards("e");
			});
		},
		filterTarget(card, player, target) {
			return target.countCards("e") < player.countCards("e");
		},
		async content(event, trigger, player) {
			let target = event.target;
			while (true) {
				await target.damage();
				if (!target.isIn()) {
					return;
				}
				const result = await player
					.chooseBool(`是否与${get.translation(target)}交换装备区里的牌并重复此流程？`)
					.set("choice", false)
					.forResult();
				if (result.bool) {
					await player.swapEquip(target);
					if (
						!game.hasPlayer(current => {
							return current.countCards("e") < player.countCards("e");
						})
					) {
						break;
					}
					const result2 = await player
						.chooseTarget("乘流：对一名装备区牌数少于你的角色造成1点伤害", (card, player, target) => {
							return target.countCards("e") < player.countCards("e");
						})
						.forResult();
					if (result2.bool) {
						target = result2.targets[0];
						player.line(target, "green");
					} else {
						break;
					}
				} else {
					break;
				}
			}
		},
		ai: {
			order: 7,
			result: {
				target: -2,
			},
		},
	},
	gz_zhuanzhan: {
		audio:"jsrgfennan",
		locked: true,
		mod: {
			targetInRange(card, player) {
				if (game.hasPlayer(current => current.isUnseen()) && card.name == "sha") {
					return true;
				}
			},
			playerEnabled(card, player, target) {
				if (game.hasPlayer(current => current.isUnseen()) && card.name == "sha" && target.isUnseen()) {
					return false;
				}
			},
		},
	},
	gz_xunji: {
		audio: "jsrgxunji",
		trigger: {
			player: ["useCard1", "useCardAfter"],
		},
		forced: true,
		locked: false,
		filter(event, player, name) {
			if (event.card.name != "sha") {
				return false;
			}
			if (name == "useCardAfter") {
				return (
					event.targets?.every(target => {
						return target.hasHistory("damage", evt => evt.card == event.card);
					}) && event.addCount !== false
				);
			}
			let card = event.card;
			let range;
			let select = get.copy(get.info(card).selectTarget);
			if (select == undefined) {
				if (get.info(card).filterTarget == undefined) {
					return false;
				}
				range = [1, 1];
			} else if (typeof select == "number") {
				range = [select, select];
			} else if (get.itemtype(select) == "select") {
				range = select;
			} else if (typeof select == "function") {
				range = select(card, player);
			}
			player._checkXunji = true;
			game.checkMod(card, player, range, "selectTarget", player);
			delete player._checkXunji;
			return range[1] != -1 && event.targets.length > range[1];
		},
		async content(event, trigger, player) {
			if (event.triggername == "useCardAfter") {
				trigger.addCount = false;
				let stat = player.getStat().card,
					name = trigger.card.name;
				if (typeof stat[name] == "number") {
					stat[name]--;
				}
			}
		},
		mod: {
			selectTarget(card, player, range) {
				if (card.name != "sha" || range[1] == -1 || player._checkXunji) {
					return;
				}
				range[1] += 2;
			},
		},
	},

	//受命于天
	gz_sanchen: {
		audio: "sanchen",
		enable: "phaseUse",
		filter(event, player) {
			let stat = player.getStat("spsanchen");
			return (
				game.hasPlayer(function (current) {
					return !stat || !stat.includes(current);
				}) && !player.isUnseen(2)
			);
		},
		filterTarget(card, player, target) {
			let stat = player.getStat("spsanchen");
			return !stat || !stat.includes(target);
		},
		async content(event, trigger, player) {
			const target = event.target;
			let stat = player.getStat();
			if (!stat.spsanchen) {
				stat.spsanchen = [];
			}
			stat.spsanchen.push(target);
			await target.draw(3);

			if (!target.countCards("he")) {
				return;
			} else {
				const result = await target
					.chooseToDiscard("he", true, 3)
					.set("ai", card => {
						let list = ui.selected.cards.map(function (i) {
							return get.type2(i);
						});
						if (!list.includes(get.type2(card))) {
							return 7 - get.value(card);
						}
						return -get.value(card);
					})
					.forResult();
				if (result?.bool && result?.cards?.length) {
					let list = [];
					for (let i of result.cards) {
						list.add(get.type2(i));
					}
					if (list.length < result.cards.length) {
						if (get.character(player.name1, 3).includes("gz_sanchen")) {
							player.hideCharacter(0);
						}
						if (get.character(player.name2, 3).includes("gz_sanchen")) {
							player.hideCharacter(1);
						}
					}
				}
			}
		},
		ai: {
			order: 9,
			threaten: 1.7,
			result: {
				target(player, target) {
					if (target.hasSkillTag("nogain")) {
						return 0.1;
					}
					return Math.sqrt(target.countCards("he"));
				},
			},
		},
	},
	gz_pozhu: {
		mainSkill: true,
		init(player) {
			if (player.checkMainSkill("gz_pozhu")) {
				player.removeMaxHp();
			}
		},
		audio: "pozhu",
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		direct: true,
		preHidden: true,
		filter(event, player) {
			return player.countCards("hes");
		},
		async content(event, trigger, player) {
			while (true) {
				const next = player.chooseToUse();
				next.set("openskilldialog", `###${get.prompt(event.name)}###是否将一张牌当作【杀】使用？`);
				next.set("norestore", true);
				next.set("_backupevent", "gz_pozhu_backup");
				next.set("custom", {
					add: {},
					replace: { window() { } },
				});
				next.backup("gz_pozhu_backup");
				next.set("targetRequired", true);
				next.set("complexSelect", true);
				next.set("addCount", false);
				const result = await next.forResult();
				if (result.bool && result?.targets?.length == 1) {
					const target = result.targets[0];
					if (!target.isIn() || !target.countCards("h")) {
						break;
					}
					const result2 = await player.choosePlayerCard(target, "h", true).forResult();
					if (result2.bool && result2.cards?.length) {
						await player.showCards(result2.cards);
						const card = result2.cards[0];
						if (get.suit(card, target) == get.suit(result.card)) {
							break;
						}
					}
				} else {
					break;
				}
			}
		},
		subSkill: {
			backup: {
				audio: "gz_pozhu",
				filterCard(card, player) {
					return get.itemtype(card) === "card";
				},
				viewAs: {
					name: "sha",
				},
				position: "hes",
				ai1(card) {
					return 8 - get.value(card);
				},
			},
		},
	},
	gz_huaiyuan: {
		audio: "huaiyuan",
		trigger: {
			global: "phaseZhunbeiBegin",
		},
		filter(event, player) {
			return event.player.isFriendOf(player);
		},
		async cost(event, trigger, player) {
			const result = await player
				.chooseControl("攻击范围", "手牌上限", "出杀次数", "cancel2")
				.set("prompt", get.prompt(event.skill, trigger.player))
				.set("prompt2", "令其本回合一项数值+1")
				.set("ai", () => {
					return [1, 2].randomGet();
				})
				.forResult();
			event.result = {
				bool: result.index != 3,
				targets: [trigger.player],
				cost_data: result.index,
			};
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cost_data: index,
			} = event;
			const result = ["range", "limit", "useCard"][index];
			target.addTempSkill(`${event.name}_${result}`);
			target.addMark(`${event.name}_${result}`, 1, false);
		},
		subSkill: {
			range: {
				charlotte: true,
				onremove: true,
				marktext: "怀",
				intro: {
					content: "攻击范围+#",
				},
				mod: {
					attackRange(player, num) {
						return num + player.countMark("gz_huaiyuan_range");
					},
				},
			},
			limit: {
				charlotte: true,
				onremove: true,
				marktext: "远",
				intro: {
					content: "手牌上限+#",
				},
				mod: {
					maxHandcard(player, num) {
						return num + player.countMark("gz_huaiyuan_limit");
					},
				},
			},
			useCard: {
				charlotte: true,
				onremove: true,
				marktext: "戍",
				intro: {
					content: "出杀次数+#",
				},
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							return num + player.countMark("gz_huaiyuan_useCard");
						}
					},
				},
			},
		},
	},
	gz_fushou: {
		audio: "dezhang",
		trigger: {
			player: "hideCharacterBegin",
			global: "showCharacterEnd",
		},
		filter(event, player) {
			const targets = get.info("gz_fushou")?.logTarget(event, player);
			if (!targets?.length) {
				return false;
			}
			const evt = event.getParent("showCharacter", true);
			if (evt?.player && !targets.some(target => target != evt.player)) {
				return false;
			}
			if (
				event.name == "hideCharacter" &&
				game.hasPlayer(current => {
					return current != player && current.hasSkill("gz_fushou");
				})
			) {
				return false;
			}
			return true;
		},
		onremove(player) {
			const filter = get.info("gz_fushou")?.filterCheck;
			const targets = game.filterPlayer(current => current.isFriendOf(player) && filter(current).length);
			if (
				!game.hasPlayer(current => {
					return current != player && current.hasSkill("gz_fushou");
				}) &&
				targets.length
			) {
				for (let target of targets) {
					const skills = [];
					if (!target.isUnseen(0)) {
						skills.addArray(
							get.character(target.name1, 3)?.filter(skill => {
								const info = get.info(skill);
								return info?.viceSkill;
							})
						);
					}
					if (!target.isUnseen(1)) {
						skills.addArray(
							get.character(target.name2, 3)?.filter(skill => {
								const info = get.info(skill);
								return info?.mainSkill;
							})
						);
					}
					if (skills.length) {
						for (const skill of skills) {
							target.awakenSkill(skill);
						}
						player.line(target, "green");
						game.log(target, "失去了", skills.map(i => `#g【${get.translation(i)}】`).join(""));
					}
				}
			}
		},
		preHidden: true,
		forced: true,
		filterCheck(current, name) {
			let skills = [];
			if (name !== undefined) {
				if (!Array.isArray(name)) {
					name = [name];
				}
				skills.addArray(
					name.reduce(
						(arr, namex) =>
							get.character(namex, 3)?.filter(skill => {
								const info = get.info(skill);
								const bool = name == current.name1;
								return info?.[bool ? "viceSkill" : "mainSkill"];
							}),
						[]
					)
				);
			} else if (get.itemtype(current) == "player") {
				if (!current.isUnseen(0)) {
					skills.addArray(
						get.character(current.name1, 3)?.filter(skill => {
							const info = get.info(skill);
							return info?.viceSkill;
						})
					);
				}
				if (!current.isUnseen(1)) {
					skills.addArray(
						get.character(current.name2, 3)?.filter(skill => {
							const info = get.info(skill);
							return info?.mainSkill;
						})
					);
				}
			}
			return skills;
		},
		logTarget(event, player) {
			const filter = get.info("gz_fushou")?.filterCheck;
			let names = event[event.name == "hideCharacter" ? "toHide" : "toShow"];
			if (!Array.isArray(names)) {
				names = [names];
			}
			const skills = names.reduce((arr, name) => arr.addArray(get.character(name, 3)), []);
			if (event.name == "showCharacter" && !skills.includes("gz_fushou")) {
				if (event.player.isFriendOf(player) && filter(event.player, event.toShow).length) {
					return [event.player];
				}
				return [];
			}
			if (skills.includes("gz_fushou")) {
				return game.filterPlayer(current => current.isFriendOf(player) && filter(current).length);
			}
			return [];
		},
		async content(event, trigger, player) {
			let names = trigger[trigger.name == "hideCharacter" ? "toHide" : "toShow"];
			if (!Array.isArray(names)) {
				names = [names];
			}
			const skillsx = names.reduce((arr, name) => arr.addArray(get.character(name, 3)), []);
			if (trigger.name == "showCharacter" && !skillsx.includes("gz_fushou")) {
				const skills = skillsx?.filter(skill => {
					const info = get.info(skill);
					return info?.[trigger.toShow == trigger.player.name1 ? "viceSkill" : "mainSkill"];
				});
				if (skills.length) {
					for (const skill of skills) {
						trigger.player.restoreSkill(skill);
					}
					game.log(trigger.player, "拥有了", skills.map(i => `#g【${get.translation(i)}】`).join(""));
				}
			} else {
				for (const target of event.targets) {
					const skills = [];
					if (!target.isUnseen(0)) {
						skills.addArray(
							get.character(target.name1, 3)?.filter(skill => {
								const info = get.info(skill);
								return info?.viceSkill;
							})
						);
					}
					if (!target.isUnseen(1)) {
						skills.addArray(
							get.character(target.name2, 3)?.filter(skill => {
								const info = get.info(skill);
								return info?.mainSkill;
							})
						);
					}
					if (skills.length) {
						for (const skill of skills) {
							target[trigger.name == "hideCharacter" ? "awakenSkill" : "restoreSkill"](skill);
						}
						const str = trigger.name == "hideCharacter" ? "失去了" : "拥有了";
						game.log(target, str, skills.map(i => `#g【${get.translation(i)}】`).join(""));
					}
				}
			}
		},
		global: "gz_fushou_global",
		subSkill: {
			global: {
				ai: {
					alwaysViceSkill: true,
					alwaysMainSkill: true,
					skillTagFilter(player, tag, arg) {
						if (!game.hasPlayer(current => current.isFriendOf(player) && current.hasSkill("gz_fushou"))) {
							return false;
						}
					}
				},
			},
		},
	},
	gz_xijue: {
		audio: "xijue",
		trigger: {
			global: "phaseJieshuBegin",
		},
		preHidden: true,
		filter(event, player) {
			return (
				event.player != player &&
				player.countCards("he") > 1 &&
				player.countCards("he", card => {
					return get.type(card) == "basic";
				})
			);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseToDiscard(get.prompt("gz_xijue", trigger.player), "弃置一张牌并对其发动【骁果】", "he")
				.set("ai", card => {
					const player = get.player(),
						target = get.event().getTrigger().player;
					if (get.damageEffect(target, player, player) > 2) {
						if (get.type(card) == "basic") {
							return 4 - get.value(card);
						}
						return 8 - get.value(card);
					}
					return 0;
				})
				.set("chooseonly", true)
				.setHiddenSkill(event.skill)
				.forResult();
			event.result.targets = [trigger.player];
		},
		async content(event, trigger, player) {
			await player.discard(event.cards);
			const result = await player
				.chooseToDiscard(get.prompt2("gz_xijue_xiaoguo", trigger.player), "he", { type: "basic" })
				.set("logSkill", ["gz_xijue_xiaoguo", trigger.player])
				.set("ai", card => 9 - get.value(card))
				.forResult();
			if (result.bool) {
				let nono = get.damageEffect(trigger.player, player, trigger.player) >= 0;
				const result2 = await trigger.player
					.chooseToDiscard("弃置一张装备牌，或受到1点伤害", "he", { type: "equip" })
					.set("ai", function (card) {
						if (_status.event.nono) {
							return 0;
						}
						if (_status.event.player.hp == 1) {
							return 10 - get.value(card);
						}
						return 9 - get.value(card);
					})
					.set("nono", nono)
					.forResult();
				if (!result2?.bool) {
					await trigger.player.damage();
				}
			}
		},
		derivation: ["gz_xijue_tuxi", "gz_xijue_xiaoguo"],
		group: "gz_xijue_tuxi",
		subSkill: {
			tuxi: {
				audio: "xijue_tuxi",
				trigger: {
					player: "phaseDrawBegin2",
				},
				preHidden: true,
				filter(event, player) {
					return (
						event.num > 0 &&
						!event.numFixed &&
						game.hasPlayer(target => {
							return target.countCards("h") > 0 && player != target;
						}) &&
						player.countCards("he")
					);
				},
				async cost(event, trigger, player) {
					let num = get.copy(trigger.num);
					event.result = await player
						.chooseCardTarget({
							prompt: get.prompt(event.skill),
							prompt2: "弃置一张牌并获得至多" + get.translation(num) + "名角色的各一张手牌，然后少摸等量的牌",
							filterCard: true,
							position: "he",
							selectTarget: [1, num],
							filterTarget(card, player, target) {
								return target.countCards("h") > 0 && player != target;
							},
							ai1(card) {
								return 5 - get.value(card);
							},
							ai2(target) {
								const att = get.attitude(get.player(), target);
								if (target.hasSkill("tuntian")) {
									return att / 10;
								}
								return 1 - att;
							},
						})
						.setHiddenSkill("gz_xijue")
						.forResult();
					if (event.result.bool) {
						player.logSkill("gz_xijue");
					}
				},
				async content(event, trigger, player) {
					await player.discard(event.cards);
					event.targets.sortBySeat();
					await player.gainMultiple(event.targets);
					trigger.num -= event.targets.length;
					if (trigger.num <= 0) {
						await game.delay();
					}
				},
				ai: {
					threaten: 1.6,
					expose: 0.2,
				},
			},
			xiaoguo: {
				audio: "xijue_xiaoguo",
			},
		},
	},
	gz_lvxian: {
		mainSkill: true,
		init(player, skill) {
			player.checkMainSkill(skill);
		},
		trigger: {
			player: "damageEnd",
		},
		filter(event, player) {
			if (
				game
					.getGlobalHistory(
						"everything",
						evt => {
							return evt.name == "damage" && evt.player == player;
						},
						event
					)
					.indexOf(event) !== 0
			) {
				return false;
			}
			let num = _status.globalHistory.length;
			if (num < 2) {
				return false;
			}
			num -= 2;
			let history = player.actionHistory[num];
			while (history.isSkipped && num >= 0) {
				num--;
				history = player.actionHistory[num];
			}
			if (history.isMe) {
				return false;
			}
			return history?.lose?.some(evt => {
				return evt?.cards2?.length;
			});
		},
		preHidden: true,
		async content(event, trigger, player) {
			let num = _status.globalHistory.length - 2,
				history = player.actionHistory[num];
			while (history.isSkipped && num >= 0) {
				num--;
				history = player.actionHistory[num];
			}
			let numx = history.lose.reduce((sum, evt) => {
				return sum + (evt.cards2.length || 0);
			}, 0);
			if (numx > 0) {
				await player.draw(numx);
			}
		},
	},
	gz_yingwei: {
		viceSkill: true,
		init(player, skill) {
			player.checkViceSkill(skill);
		},
		trigger: {
			player: "phaseJieshuBegin",
		},
		filter(event, player) {
			const num1 = player
				.getHistory("gain", evt => evt.getParent()?.name == "draw")
				.reduce((num, evt) => {
					return num + evt?.cards?.length;
				}, 0),
				num2 = player.getHistory("sourceDamage").reduce((num, evt) => {
					return num + (evt?.num || 0);
				}, 0);
			return num1 == num2 && player.countCards("he");
		},
		preHidden: true,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCard(get.prompt2(event.skill), [1, 2], "he")
				.set("filterCard", (card, player) => {
					return lib.filter.cardRecastable(card, player);
				})
				.set("ai", card => {
					return 5 - get.value(card);
				})
				.setHiddenSkill(event.skill)
				.forResult();
		},
		async content(event, trigger, player) {
			await player.recast(event.cards);
		},
	},
	gz_jiaping: {
		audio: 2,
		unique: true,
		forceunique: true,
		derivation: ["bahuangsishiling", "gz_shunfu", "luanwu", "jianglue", "yongjin", "gz_fengying"],
		lordSkill: true,
		global: ["bahuangsishiling", "gz_jiaping_use"],
		init(player) {
			player.markSkill("bahuangsishiling");
		},
		subSkill: {
			use: {
				audio: "gz_jiaping",
				enable: "phaseUse",
				filter(event, player) {
					const target = game.findPlayer(current => {
						return current.hasSkill("gz_jiaping");
					});
					if (target && target.hasSkill("gz_jiaping_round")) {
						return false;
					}
					let list = ["gz_shunfu", "luanwu", "jianglue", "yongjin", "gz_fengying"].filter(i => {
						if (_status.jiapingUsed?.includes(i)) {
							return false;
						}
						const info = get.info(i);
						if (info?.filter) {
							return info.filter(event, player);
						}
						return true;
					});
					return event.jiapingCanUse && player.identity == "jin" && list.length;
				},
				onChooseToUse(event) {
					if (game.online) {
						return;
					}
					const player = event.player,
						history = _status.globalHistory;
					for (let i = history.length - 1; i >= 0; i--) {
						const evts = history[i]?.everything;
						if (evts.some(evt => evt.name == "showCharacter" && evt.player == player)) {
							event.set("jiapingCanUse", true);
						}
						if (history[i].isRound) {
							break;
						}
					}
				},
				chooseButton: {
					dialog(event, player) {
						let list = [
							["gz_shunfu", "gz_new_jin_simayi"],
							["luanwu", "gz_jiaxu"],
							["jianglue", "gz_wangping"],
							["yongjin", "gz_lingtong"],
							["gz_fengying", "gz_cuimao"],
						].filter(i => {
							return !_status.jiapingUsed || !_status.jiapingUsed.includes(i[0]);
						});
						return ui.create.dialog("嘉平", [list, "skill"]);
					},
					check(button) {
						const info = get.info(button.link);
						return info?.ai?.result?.player?.(get.player()) || 0;
					},
					filter(button) {
						const info = get.info(button.link);
						if (info?.filter) {
							return info.filter(get.event().getParent(), get.player());
						}
						return true;
					},
					backup(links, player) {
						const info = get.copy(get.info(links[0]));
						game.broadcastAll(
							(skill, name, info) => {
								lib.translate[skill] = get.translation(name);
								if (!_status.jiapingUsed) {
									_status.jiapingUsed = [];
								}
								info.precontent = async (event, trigger, player) => {
									player.logSkill("bahuangsishiling");
									game.broadcastAll(list => {
										_status.jiapingUsed = list;
									}, _status.jiapingUsed.concat(links));
									const target = game.findPlayer(current => {
										return current.hasSkill("gz_jiaping");
									});
									if (target) {
										target.addTempSkill("gz_jiaping_round", { global: ["roundStart", "roundEnd"] });
									}
									if (player.hasViceCharacter()) {
										await player.removeCharacter(1);
									}
								};
							},
							"gz_jiaping_use_backup",
							links[0],
							info
						);
						return info;
					},
					prompt(links, player) {
						return get.prompt2(links[0]);
					},
				},
				ai: {
					order: 8,
					result: {
						player: 1,
					},
				},
			},
			round: {
				charlotte: true,
			},
		},
	},
	bahuangsishiling: {
		audio: 2,
		nopop: true,
		unique: true,
		forceunique: true,
		mark: true,
		intro: {
			content() {
				let str = "每轮共计限一次，本轮明置过武将牌的晋势力角色可以于对应时机移除副将并发动一个未以此法发动过的技能：",
					skills = ["gz_shunfu", "luanwu", "jianglue", "yongjin", "gz_fengying"],
					groups = ["jin", "qun", "shu", "wu", "wei"];
				for (let i = 0; i < skills.length; i++) {
					let skill = skills[i],
						group = groups[i],
						border = get.groupnature(group, "raw"),
						name = `<span data-nature="${border}">〖${get.translation(skill)}〗</span>`;
					if (_status.jiapingUsed?.includes(skill)) {
						name = `<span style="text-decoration:line-through;">${name}</span>`;
					}
					str += name;
				}
				return str;
			},
		},
	},
	gz_shunfu: {
		skillAnimation: true,
		animationColor: "thunder",
		unique: true,
		enable: "phaseUse",
		audio: "xiongzhi",
		limited: true,
		selectTarget: [1, 3],
		filterTarget(card, player, target) {
			return player != target && target.isUnseen();
		},
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			event.targets.sortBySeat(_status.currentPhase);
			player.awakenSkill(event.name);
			await game.asyncDraw(event.targets, 2);
			for (const target of event.targets) {
				await target
					.chooseToUse(function (card, player, event) {
						if (get.name(card) != "sha") {
							return false;
						}
						return lib.filter.filterCard.apply(this, arguments);
					}, "瞬覆：是否使用一张不可被响应的【杀】？")
					.set("oncard", card => {
						_status.event.directHit.addArray(game.players);
					})
					.set("filterTarget", function (card, player, target) {
						return lib.filter.targetEnabled.apply(this, arguments);
					});
			}
		},
		ai: {
			order: 1,
			result: {
				target: 1,
			},
		},
	},
	gz_guikuang: {
		audio: 2,
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			if (ui.selected.targets.length) {
				const source = ui.selected.targets[0];
				return !source.isFriendOf(target) && source.canCompare(target);
			}
			return target.countCards("h");
		},
		selectTarget: 2,
		complexTarget: true,
		multitarget: true,
		async content(event, trigger, player) {
			const {
				targets: [target1, target2],
			} = event;
			const result = await target1.chooseToCompare(target2).forResult();
			let bool1 = target1 != result.winner,
				bool2 = target2 != result.winner;
			if (result.player && get.color(result.player) == "red") {
				if (bool1) {
					await target1.damage(target1);
				}
				if (bool2) {
					target1.line(target2, "green");
					await target2.damage(target1);
				}
			}
			if (result.target && get.color(result.target) == "red") {
				if (bool1) {
					target2.line(target1, "green");
					await target1.damage(target2);
				}
				if (bool2) {
					await target2.damage(target2);
				}
			}
		},
		ai: {
			order: 6,
			result: {
				target: -1,
			},
		},
	},
	gz_shujuan: {
		audio: 2,
		derivation: "jilinqianyi",
		unique: true,
		forceunique: true,
		ai: {
			threaten: 2,
		},
		trigger: {
			global: ["loseAfter", "cardsDiscardAfter", "equipAfter", "loseAsyncAfter"],
		},
		forced: true,
		filter(event, player) {
			const history = _status.globalHistory[_status.globalHistory.length - 1];
			if (event.name == "equip" && event.card.name == "jilinqianyi") {
				if (player == event.player) {
					return false;
				}
				if (
					history?.everything
						?.filter(evt => {
							return evt.name == "equip" && evt.card.name == "jilinqianyi" && evt.player != player;
						})
						.indexOf(event) != 0
				) {
					return false;
				}
				return event.player.getVCards("e").includes(event.card);
			}
			let entered = false;
			game.getGlobalHistory("cardMove", function (evt) {
				if (evt.name != "lose" && evt.name != "cardsDiscard") {
					return false;
				}
				if (evt.name == "lose" && evt.position != ui.discardPile) {
					return false;
				}
				if (evt == event || evt.getParent() == event) {
					return false;
				}
				if (evt.cards?.some(card => card.name == "jilinqianyi")) {
					entered = true;
				}
			});
			return !entered && event.getd().some(card => card.name == "jilinqianyi" && get.position(card) == "d");
		},
		logTarget(event, player) {
			if (event.name == "equip" && event.card.name == "jilinqianyi" && event.player.getVCards("e").includes(event.card)) {
				return event.player;
			}
			return [];
		},
		async content(event, trigger, player) {
			await game.delayx();
			let cards = [];
			if (trigger.name == "equip") {
				if (trigger.card.name == "jilinqianyi" && trigger.player.getVCards("e").includes(trigger.card)) {
					cards.addArray(trigger.player.getCards("e", { name: "jilinqianyi" }));
				}
			}
			cards.addArray(trigger.getd().filter(card => card.name == "jilinqianyi" && get.position(card) == "d"));
			let owner = get.owner(cards[0]);
			if (owner) {
				await player.gain(cards, "give", owner, "bySelf");
			} else {
				await player.gain(cards, "gain2");
			}
			for (let card of cards) {
				if (get.position(card) == "h") {
					await player.equip(card);
				}
			}
		},
	},
	gz_duanqiu: {
		audio: "jsrgfuzhen",
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		preHidden: true,
		filter(event, player) {
			const card = new lib.element.VCard({ name: "juedou" });
			return game.hasPlayer(current => {
				if (current.isUnseen()) {
					return false;
				}
				return player.isEnemyOf(current) && player.canUse(card, current) && player != current;
			});
		},
		async cost(event, trigger, player) {
			const result = await player
				.chooseTarget(get.prompt2(event.skill), (cardx, player, target) => {
					if (target.isUnseen()) {
						return false;
					}
					const card = new lib.element.VCard({ name: "juedou" });
					return player.isEnemyOf(target) && player.canUse(card, target) && target != player;
				})
				.set("ai", target => {
					const card = new lib.element.VCard({ name: "juedou" });
					let eff = 0,
						limit = player.getHandcardLimit();
					for (let current of game.filterPlayer(i => target.isFriendOf(i))) {
						if (player.canUse(card, current)) {
							limit++;
							eff += get.effect(current, card, player, player);
						}
					}
					if (player.countCards("h") > limit) {
						eff -= 2 * (player.countCards("h") - limit);
					}
					return eff;
				})
				.setHiddenSkill(event.skill)
				.forResult();
			if (result.bool) {
				event.result = {
					bool: true,
					targets: game.filterPlayer(i => result.targets[0].isFriendOf(i) && i != player),
				};
			}
		},
		async content(event, trigger, player) {
			const card = new lib.element.VCard({ name: "juedou" }),
				targets = event.targets.filter(target => player.canUse(card, target));
			await player.useCard(card, targets);
			if (!player.isIn()) {
				return;
			}
			let num = 0;
			game.filterPlayer(current => {
				current.checkHistory("respond", evt => {
					if (evt.getParent(4) == event) {
						num++;
					}
				});
			});
			player.addTempSkill("gz_duanqiu_count");
			if (num > 0) {
				player.addMark("gz_duanqiu_count", num, 0);
			}
		},
		global: "gz_duanqiu_zhixi",
		subSkill: {
			count: {
				charlotte: true,
				init(player, skill) {
					player.storage[skill] = 0;
				},
				onremove: true,
				mark: true,
				intro: {
					content: "本回合所有角色合计还可使用#张手牌",
				},
				trigger: {
					global: "useCard",
				},
				firstDo: true,
				filter(event, player) {
					return event.player.hasHistory("lose", evt => {
						return evt.hs.length > 0 && (evt.relatedEvent || evt.getParent()) == event;
					});
				},
				direct: true,
				async content(event, trigger, player) {
					player.removeMark(event.name, 1, false);
				},
				ai: {
					presha: true,
					pretao: true,
				},
			},
			zhixi: {
				mod: {
					cardEnabled(card) {
						if (get.position(card) != "h" || !_status.currentPhase) {
							return;
						}
						const target = _status.currentPhase;
						if (target.hasSkill("gz_duanqiu_count") && !target.hasMark("gz_duanqiu_count")) {
							return false;
						}
					},
					cardSavable(card) {
						if (get.position(card) != "h" || !_status.currentPhase) {
							return;
						}
						const target = _status.currentPhase;
						if (target.hasSkill("gz_duanqiu_count") && !target.hasMark("gz_duanqiu_count")) {
							return false;
						}
					},
				},
			},
		},
	},
	gz_xiace: {
		audio: "dcxiace",
		enable: "chooseToUse",
		filterCard: true,
		viewAsFilter(player) {
			if (!_status.currentPhase || !player.countCards("hes")) {
				return false;
			}
			const target = _status.currentPhase,
				num = target.getCardUsable("sha", true);
			if (num <= 0) {
				return false;
			}
			const event = get.event().getParent("phaseUse", true, true);
			if (event) {
				return (
					num >
					target.getHistory("useCard", evt => {
						return evt.getParent("phaseUse") == event && evt.card.name == "sha" && evt.addCount !== false;
					}).length
				);
			}
			return true;
		},
		viewAs: {
			name: "wuxie",
		},
		async precontent(event, trigger, player) {
			const target = _status.currentPhase;
			if (target) {
				target.addTempSkill("gz_xiace_limit");
				target.addMark("gz_xiace_limit", 1, false);
			}
		},
		position: "hes",
		prompt: "将一张牌当【无懈可击】使用",
		check(card) {
			const tri = _status.event.getTrigger();
			if (tri && tri.card && tri.card.name == "chiling") {
				return -1;
			}
			return 8 - get.value(card);
		},
		group: "gz_xiace_change",
		subSkill: {
			change: {
				trigger: {
					player: "useCardAfter",
				},
				filter(event, player) {
					return event.skill == "gz_xiace";
				},
				silent: true,
				async content(event, _trigger, player) {
					/** @type {PlayerGuozhan} */
					const playerRef = cast(player);
					await playerRef.mayChangeVice(undefined, undefined);
					event.skill = "gz_xiace";
					await event.trigger("skillAfter");
				},
			},
			limit: {
				charlotte: true,
				onremove: true,
				intro: {
					markcount(storage) {
						return -(storage || 0);
					},
					content: "出杀次数-#",
				},
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							return num - player.countMark("gz_xiace_limit");
						}
					},
				},
			},
		},
	},
	gz_limeng: {
		audio: "dclinghui",
		trigger: {
			player: "phaseJieshuBegin",
		},
		filter(event, player) {
			if (
				!player.countCards("he", card => {
					if (_status.connectMode) {
						return true;
					}
					return get.type(card) != "basic";
				})
			) {
				return false;
			}
			return game.hasPlayer(current => {
				return game.hasPlayer(current2 => get.info("gz_limeng")?.isPerfectPair?.(current, current2));
			});
		},
		isPerfectPair(player, target) {
			let list1 = [],
				list2 = [];
			for (let i = 0; i < 2; i++) {
				if (!player.isUnseen(i)) {
					list1.push(player[`name${i + 1}`]);
				}
				if (!target.isUnseen(1)) {
					list2.push(target[`name${i + 1}`]);
				}
			}
			if (!list1.length || !list2.length) {
				return false;
			}
			return list1.some(name => {
				return list2.some(name2 => {
					const tempPlayer = {
						name1: name,
						name2: name2,
					};
					if (get.is.jun(name) || get.is.jun(name2)) {
						return lib.character[name][1] == lib.character[name2][1];
					}
					return lib.element.player.perfectPair.call(tempPlayer);
				});
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCardTarget({
					prompt: get.prompt2(event.skill),
					filterCard(card, player) {
						return get.type(card) != "basic" && lib.filter.cardDiscardable(card, player, "gz_limeng");
					},
					filterTarget(card, player, target) {
						const filter = get.info("gz_limeng")?.isPerfectPair;
						if (ui.selected.targets.length) {
							const targetx = ui.selected.targets[0];
							return filter && filter(target, targetx);
						}
						return game.hasPlayer(current => filter && filter(target, current));
					},
					selectTarget() {
						if (ui.selected.targets.length && ui.selected.targets[0]?.perfectPair()) {
							return [1, 2];
						}
						return 2;
					},
					complexTarget: true,
					complexSelect: true,
					ai1(card) {
						return 7 - get.value(card);
					},
					ai2(target) {
						const filter = get.info("gz_limeng")?.isPerfectPair;
						if (
							!game.hasPlayer(current => {
								return current != target && filter?.(target, current);
							})
						) {
							return 0;
						}
						return get.damageEffect(target, target, player);
					},
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const {
				cards,
				targets: [target1, target2],
			} = event;
			await player.discard(cards);
			if (target2) {
				if (target1.isIn() && target2.isIn()) {
					target1.line(target2, "thunder");
					await target2.damage(target1);
				}
				if (target1.isIn() && target2.isIn()) {
					target2.line(target1, "thunder");
					await target1.damage(target2);
				}
			}
		},
	},
"gz_xiejian": {
    audio: 2,
    enable: "phaseUse",
    usable: 1,
    filterTarget: lib.filter.notMe,
    async content(event, trigger, player) {
        const target = event.target;
        
        // ✅ 发起军令时，军令目标默认就是 target
        const { junling, unchosenJunling: junling2 } = await player
            .chooseJunlingFor(target)
            .forResult();
        
        const choiceList = [];
        choiceList.push("执行该军令");
        choiceList.push(`执行未被${get.translation(player)}选择的军令`);
        
        // target 选择执行哪个军令
        const result = await target
            .chooseJunlingControl(player, junling, [target])
            .set("prompt", "挟奸")
            .set("choiceList", choiceList)
            .set("ai", chooseJunlingCheck)
            .forResult();
        
        if (result.index == 0) {
            // ✅ 执行选择的军令，目标是 target
            await target.carryOutJunling(player, junling, [target]);
        } else {
            // ✅ 执行未选择的军令，目标也是 target（不需要再选择）
            await target.carryOutJunling(player, junling2[0], [target]);
        }
        
        function chooseJunlingCheck() {
            return get.junlingEffect(player, junling, target, [target], target) > 1 ? 0 : 1;
        }
    },
    ai: {
        order: 3,
        result: {
            target: -1,
        },
    },
},
	"gz_yinsha": {
    audio: 2,
    enable: "chooseToUse",
    filterCard: true,
    selectCard: -1,
    position: "h",
    viewAs: {
        name: "jiedao",
    },
    filter: function(event, player) {
        return player.countCards("h") > 0;
    },
    viewAsFilter: function(player) {
        return player.countCards("h") > 0;
    },
    prompt: "将所有手牌当借刀杀人使用",
    check: function(card) {
        const val = get.value(card);
        return 5 - val;
    },
    ai: {
        result: {
            player: function(player, target) {
                if (!target.hasSkillTag("noe") && get.attitude(player, target) > 0) {
                    return 0;
                }
                if (player.countCards("h") >= Math.max(3, player.hp)) {
                    return 0;
                }
                return (
                    (player.hasSkillTag("noe") ? 0.32 : 0.15) *
                    target.getEquips(1).reduce((num, i) => {
                        return num + get.value(i, player);
                    }, 0)
                );
            },
        },
    },
    group: "gz_yinsha_effect",
    subSkill: {
        effect: {
            trigger: {
                global: "chooseToUseBegin",
            },
            filter: function(event, player) {
                if (event.getParent().name !== "jiedao") {
                    return false;
                }
                const evt = event.getParent(2);
                return evt?.name === "useCard" && evt.player === player && evt.skill == "gz_yinsha";
            },
            forced: true,
            silent: true,
            popup: false,
            content: function() {
                "step 0";
                const target = trigger.player;
                
                // 如果目标有杀，强制使用
                if (target.countCards("h", "sha")) {
                    const backup = _status.event;
                    _status.event = trigger;
                    const bool = target.countCards("h", card => {
                        return trigger.filterCard(card, target, trigger) && game.hasPlayer(current => {
                            return current !== target && trigger.filterTarget(card, target, current);
                        });
                    }) > 0;
                    _status.event = backup;
                    
                    if (bool) {
                        trigger.set("forced", true);
                    }
                } else if (target.countCards("h")) {
                    // ✅ 如果没有杀但有手牌，视为杀使用
                    const cards = target.getCards("h");
                    
                    // ✅ 创建完整的卡牌对象
                    const card = {
                        name: "sha",
                        suit: get.suit(cards[0]),
                        number: get.number(cards[0]),
                        nature: null,
                        isCard: true,
                        cards: cards.slice(),
                    };
                    
                    const backup = _status.event;
                    _status.event = trigger;
                    
                    const bool = trigger.filterCard(card, target, trigger);
                    const targets = game.filterPlayer(current => {
                        return current !== target && trigger.filterTarget(card, target, current);
                    });
                    
                    _status.event = backup;
                    
                    if (bool && targets.length) {
                        // ✅ 自动选择第一个可用目标
                        const selectedTarget = targets[0];
                        
                        trigger.set("forced", true);
                        trigger.set("_aiexclude", [selectedTarget]);
                        trigger.result = {
                            bool: true,
                            card: card,
                            cards: cards,
                            targets: [selectedTarget],
                        };
                        trigger.untrigger();
                        trigger.responded = true;
                    }
                }
            },
            sub: true,
        },
    },
},
	gz_neiji: {
		audio: 2,
		trigger: {
			player: "phaseUseBegin",
		},
		preHidden: true,
		filter(event, player) {
			return game.hasPlayer(current => {
				if (current == player) {
					return false;
				}
				if (player.isUnseen()) {
					return current.isUnseen();
				}
				return !current.isFriendOf(player);
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), (card, player, target) => {
					if (target == player) {
						return false;
					}
					if (player.isUnseen()) {
						return target.isUnseen();
					}
					return !target.isFriendOf(player);
				})
				.setHiddenSkill(event.skill)
				.set("ai", target => {
					const player = get.player(),
						num = player.countCards("h", "sha");
					if (num >= 2) {
						return get.attitude(player, target);
					}
					if (num == 1) {
						return -get.attitude(player, target);
					}
					return 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			const next = player
				.chooseCardOL([player, target], "内忌：请选择要展示的牌", true, 2)
				.set("ai", card => {
					if (card.name == "sha") {
						return 7 - get.value(card);
					}
					return -get.value(card);
				})
				.set("source", player);
			next.aiCard = function (target) {
				let hs = target.getCards("h");
				if (hs.length > 2) {
					hs = hs.randomGets(2);
				}
				return { bool: true, cards: hs };
			};
			next._args.remove("glow_result");
			const result = await next.forResult();
			let cards1 = result[0].cards,
				cards2 = result[1].cards;
			await player.showCards(cards1);
			await target.showCards(cards2);
			player.$throw(cards1, 1000);
			target.$throw(cards2, 1000);
			let lose_list = [],
				num = 0,
				discards = [];
			if (cards1.some(card => card.name == "sha")) {
				const cards = cards1.filter(card => card.name == "sha");
				lose_list.push([player, cards]);
				num += cards.length;
				discards.push(player);
			}
			if (cards2.some(card => card.name == "sha")) {
				const cards = cards2.filter(card => card.name == "sha");
				lose_list.push([target, cards]);
				num += cards.length;
				discards.push(target);
			}
			await game
				.loseAsync({
					lose_list: lose_list,
					discarder: player,
				})
				.setContent("discardMultiple");
			if (num > 1) {
				await game.asyncDraw([player, target], 3);
			} else {
				if (discards.length == 1) {
					const targetx = discards[0],
						user = [player, target].find(i => i != targetx),
						card = new lib.element.VCard({ name: "juedou" });
					if (user.canUse(card, targetx)) {
						await user.useCard(card, targetx, "noai");
					}
				}
			}
		},
	},
	gz_bingxin: {
		audio: "bingxin",
		enable: "chooseToUse",
		hiddenCard(player, name) {
			if (get.type(name) == "basic" && lib.inpile.includes(name) && !player.getStorage("gz_bingxin_count").includes(name)) {
				return true;
			}
		},
		filter(event, player) {
			if (event.type == "wuxie") {
				return false;
			}
			var hs = player.getCards("h");
			if (hs.length != Math.max(0, player.hp)) {
				return false;
			}
			if (hs.length > 1) {
				var color = get.color(hs[0], player);
				for (var i = 1; i < hs.length; i++) {
					if (get.color(hs[i], player) != color) {
						return false;
					}
				}
			}
			var storage = player.storage.gz_bingxin_count;
			for (var i of lib.inpile) {
				if (get.type(i) != "basic") {
					continue;
				}
				if (storage && storage.includes(i)) {
					continue;
				}
				var card = { name: i, isCard: true };
				if (event.filterCard(card, player, event)) {
					return true;
				}
				if (i == "sha") {
					for (var j of lib.inpile_nature) {
						card.nature = j;
						if (event.filterCard(card, player, event)) {
							return true;
						}
					}
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				var storage = player.storage.gz_bingxin_count;
				for (var i of lib.inpile) {
					if (get.type(i) != "basic") {
						continue;
					}
					if (storage && storage.includes(i)) {
						continue;
					}
					var card = { name: i, isCard: true };
					if (event.filterCard(card, player, event)) {
						list.push(["基本", "", i]);
					}
					if (i == "sha") {
						for (var j of lib.inpile_nature) {
							card.nature = j;
							if (event.filterCard(card, player, event)) {
								list.push(["基本", "", i, j]);
							}
						}
					}
				}
				return ui.create.dialog("冰心", [list, "vcard"], "hidden");
			},
			check(button) {
				if (button.link[2] == "shan") {
					return 3;
				}
				var player = _status.event.player;
				if (button.link[2] == "jiu") {
					if (player.getUseValue({ name: "jiu" }) <= 0) {
						return 0;
					}
					if (player.countCards("h", "sha")) {
						return player.getUseValue({ name: "jiu" });
					}
					return 0;
				}
				return player.getUseValue({ name: button.link[2], nature: button.link[3] }) / 4;
			},
			backup(links, player) {
				return {
					selectCard: -1,
					filterCard: () => false,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						isCard: true,
					},
					log: false,
					precontent() {
						player.logSkill("gz_bingxin");
						player.draw();
						var name = event.result.card.name;
						player.addTempSkill("gz_bingxin_count");
						player.markAuto("gz_bingxin_count", [name]);
					},
				};
			},
			prompt(links, player) {
				var name = links[0][2];
				var nature = links[0][3];
				return "摸一张并视为使用" + (get.translation(nature) || "") + get.translation(name);
			},
		},
		ai: {
			order: 10,
			respondShan: true,
			respondSha: true,
			skillTagFilter(player, tag, arg) {
				if (arg == "respond") {
					return false;
				}
				var hs = player.getCards("h");
				if (hs.length != Math.max(0, hs.length)) {
					return false;
				}
				if (hs.length > 1) {
					var color = get.color(hs[0], player);
					for (var i = 1; i < hs.length; i++) {
						if (get.color(hs[i], player) != color) {
							return false;
						}
					}
				}
				var storage = player.storage.gz_bingxin_count;
				if (storage && storage.includes("s" + tag.slice(8))) {
					return false;
				}
			},
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		subSkill: { count: { charlotte: true, onremove: true } },
	},

	fakexiongshu: {
		audio: "xiongshu",
		trigger: { global: "useCardToPlayered" },
		filter(event, player) {
			if (!event.isFirstTarget) {
				return false;
			}
			if (event.player == player && game.countPlayer() < 2) {
				return false;
			}
			if (event.player != player && !player.countDiscardableCards(player, "he")) {
				return false;
			}
			return event.card.name == "sha" || (get.type(event.card) == "trick" && get.tag(event.card, "damage"));
		},
		check(event, player) {
			if (event.player == player) {
				if (event.targets.some(i => i.hasSkill("gzduanchang"))) {
					return true;
				}
				return !event.targets.some(i => i.getHp() == 1 && !i.hasSkill("gzbuqu") && i.isEnemyOf(player));
			}
			if (event.targets.some(i => i.hasSkill("gzduanchang"))) {
				return false;
			}
			return event.targets.some(i => i.getHp() == 1 && !i.hasSkill("gzbuqu") && i.isEnemyOf(player));
		},
		usable: 1,
		async content(event, trigger, player) {
			if (trigger.player == player) {
				await player.draw();
				const {
					result: { bool, targets },
				} = await player.chooseTarget("令一名其他角色成为" + get.translation(trigger.card) + "的伤害来源", true, lib.filter.notMe).set("ai", target => {
					const player = get.event("player"),
						targets = get.event().getTrigger().targets;
					const goon = player.hasSkill("fakejianhui") && targets.some(i => i != target && i.isFriendOf(target));
					return targets.reduce((sum, i) => sum + get.damageEffect(i, target, player), 0) * (goon ? 3 : 1);
				});
				if (bool) {
					const target = targets[0];
					player.line(target);
					game.log(target, "成为了", trigger.card, "的伤害来源");
					trigger.getParent().customArgs.default.customSource = target;
				}
			} else {
				await player.chooseToDiscard("he", true);
				game.log(player, "成为了", trigger.card, "的伤害来源");
				trigger.getParent().customArgs.default.customSource = player;
			}
		},
	},
	fakejianhui: {
		audio: "jianhui",
		trigger: { global: "damageSource" },
		filter(event, player) {
			if (!event.source || !event.player || !event.source.isIn() || !event.player.isIn() || event.source == event.player) {
				return false;
			}
			return event.source.isFriendOf(event.player) && [event.source, event.player].some(target => target.countCards("he"));
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(
					get.prompt2("fakejianhui"),
					(card, player, target) => {
						const trigger = get.event().getTrigger();
						if (!(trigger.source == target || trigger.player == target)) {
							return false;
						}
						if (!ui.selected.targets.length) {
							return true;
						}
						return target.countCards("he");
					},
					2
				)
				.set("targetprompt", ["摸牌", "拆牌"])
				.set("ai", target => {
					const player = get.event("player"),
						trigger = get.event().getTrigger();
					const source = trigger.source,
						playerx = trigger.player;
					const min = -Math.min(get.effect(source, { name: "draw" }, player, player), get.effect(playerx, { name: "draw" }, player, player));
					const max = Math.max(get.effect(source, { name: "guohe_copy" }, player, player), get.effect(playerx, { name: "guohe_copy" }, player, player));
					if (min > max) {
						return 0;
					}
					if (!ui.selected.targets.length) {
						return -1 / Math.min(get.effect(target, { name: "draw" }, player, player), -0.001);
					}
					return get.effect(target, { name: "guohe_copy" }, player, player);
				})
				.set("complexSelect", true)
				.set("complexTarget", true)
				.forResult();
		},
		popup: false,
		async content(event, trigger, player) {
			player.logSkill("fakejianhui", event.targets, false);
			player.line2(event.targets);
			await event.targets[0].draw();
			await player.discardPlayerCard(event.targets[1], "he", true);
		},
	},
	fakechongxin: {
		audio: "chongxin",
		enable: "phaseUse",
		viewAs: {
			name: "yiyi",
			isCard: true,
		},
		usable: 1,
		filter(event, player) {
			const card = new lib.element.VCard({ name: "yiyi" });
			return lib.filter.targetEnabled2(card, player, player) && game.hasPlayer(target => lib.skill.fakechongxin.filterTarget(card, player, target));
		},
		selectTarget: 1,
		filterTarget(card, player, target) {
			if (game.checkMod(card, player, target, "unchanged", "playerEnabled", player) == false) {
				return false;
			}
			if (game.checkMod(card, player, target, "unchanged", "targetEnabled", target) == false) {
				return false;
			}
			return target.isEnemyOf(player);
		},
		filterCard: () => false,
		selectCard: -1,
		precontent() {
			event.result.targets.add(player);
		},
		ai: {
			order(item, player) {
				return get.order({ name: "yiyi" }, player) + 0.1;
			},
			result: {
				target(player, target) {
					const card = new lib.element.VCard({ name: "yiyi" });
					const num = get.sgn(get.attitude(player, target));
					return num * (get.effect(player, card, player, player) - get.effect(target, card, player, player));
				},
			},
		},
	},
	fakeweirong: {
		zhuanhuanji: true,
		locked: false,
		marktext: "☯",
		intro: {
			content(storage) {
				if (storage) {
					return "出牌阶段，你可以摸X张牌，然后当你于本轮不因此法失去牌后，你弃置一张牌。（X为你上一轮以此法摸和弃置的牌数之和，且X至少为1，至多为你的体力上限）";
				}
				return "出牌阶段，你可以弃置X张牌，然后当你于本轮不因此法得到牌后，你摸一张牌。（X为你上一轮以此法摸和弃置的牌数之和，且X至少为1，至多为你的体力上限）";
			},
		},
		audio: "weishu",
		enable: "phaseUse",
		filter(event, player) {
			if (!get.info("fakeweirong").getNum(player)) {
				return false;
			}
			const storage = player.storage.fakeweirong;
			return storage || player.countCards("he", card => lib.filter.cardDiscardable) >= get.info("fakeweirong").getNum(player);
		},
		filterCard(card, player) {
			return !player.storage.fakeweirong && lib.filter.cardDiscardable(card, player);
		},
		selectCard() {
			const player = get.event("player");
			return player.storage.fakeweirong ? -1 : get.info("fakeweirong").getNum(player);
		},
		check(card) {
			return 7.5 - get.value(card);
		},
		prompt() {
			const player = get.event("player");
			const num = get.info("fakeweirong").getNum(player);
			if (player.storage.fakeweirong) {
				return "摸" + get.cnNumber(num) + "张牌，然后当你于本轮不因此法失去牌后，你弃置一张牌";
			}
			return "弃置" + get.cnNumber(num) + "张牌，然后当你于本轮不因此法得到牌后，你摸一张牌";
		},
		round: 1,
		async content(event, trigger, player) {
			const storage = player.storage.fakeweirong;
			player.changeZhuanhuanji("fakeweirong");
			if (storage) {
				await player.draw(get.info("fakeweirong").getNum(player));
			}
			player.addTempSkill("fakeweirong_" + (storage ? "lose" : "gain"), "roundStart");
		},
		ai: {
			order(item, player) {
				const storage = player.storage.fakeweirong;
				return storage ? 0.01 : 9;
			},
			result: { player: 1 },
		},
		group: "fakeweirong_mark",
		subSkill: {
			mark: {
				charlotte: true,
				trigger: { player: ["hideCharacterBegin", "showCharacterEnd"] },
				filter(event, player) {
					if (event.name == "hideCharacter") {
						return get.character(event.toHide, 3).includes("fakeweirong");
					}
					return event.toShow?.some(name => {
						return get.character(name, 3).includes("fakeweirong");
					});
				},
				forced: true,
				popup: false,
				firstDo: true,
				content() {
					player[(trigger.name == "hideCharacter" ? "un" : "") + "markSkill"]("fakeweirong");
				},
			},
			gain: {
				charlotte: true,
				mark: true,
				marktext: "↑",
				intro: { content: "不因此法得到牌后，你摸一张牌" },
				audio: "weishu",
				trigger: { player: "gainAfter", global: "loseAsyncAfter" },
				filter(event, player) {
					if (!event.getg || !event.getg(player).length) {
						return false;
					}
					return event.getParent(2).name != "fakeweirong_gain";
				},
				forced: true,
				content() {
					player.draw();
				},
			},
			lose: {
				charlotte: true,
				mark: true,
				marktext: "↓",
				intro: { content: "不因此法失去牌后，你弃置一张牌" },
				audio: "weishu",
				trigger: { player: "loseAfter", global: "loseAsyncAfter" },
				filter(event, player) {
					if (!player.countCards("he")) {
						return false;
					}
					const evt = event.getl(player);
					if (!evt || !evt.cards2 || !evt.cards2.length) {
						return false;
					}
					return event.getParent(3).name != "fakeweirong_lose";
				},
				forced: true,
				content() {
					player.chooseToDiscard("he", true);
				},
			},
		},
		getNum(player) {
			let num = 0,
				count = false;
			const history = player.actionHistory;
			for (let i = history.length - 1; i >= 0; i--) {
				if (history[i].isRound) {
					if (!count) {
						count = true;
						continue;
					} else {
						break;
					}
				}
				if (!count) {
					continue;
				}
				const allHistory = history[i].gain
					.filter(evt => {
						return evt.getParent(2).name == "fakeweirong" || evt.getParent(2).name == "fakeweirong_gain";
					})
					.slice()
					.concat(
						history[i].lose.filter(evt => {
							return evt.getParent(2).skill == "fakeweirong" || evt.getParent(3).name == "fakeweirong_lose";
						})
					);
				for (const evt of allHistory) {
					num += evt.cards.length;
				}
			}
			return Math.max(1, Math.min(player.maxHp, num));
		},
	},
	fakequanbian: {
		audio: "quanbian",
		trigger: { player: ["useCard", "respond"] },
		filter(event, player) {
			if (!Array.from(ui.cardPile.childNodes).length) {
				return false;
			}
			return player.countCards("h") && _status.currentPhase == player;
		},
		async cost(event, trigger, player) {
			const cards = Array.from(ui.cardPile.childNodes);
			const {
				result: { bool, moved },
			} = await player
				.chooseToMove(get.prompt2("fakequanbian"))
				.set("list", [
					["牌堆顶", cards.slice(0, Math.min(player.maxHp, cards.length)), "fakequanbian_tag"],
					["手牌", player.getCards("h")],
				])
				.set("filterOk", moved => moved[1].filter(i => !get.owner(i)).length == 1)
				.set("filterMove", (from, to) => typeof to != "number")
				.set("processAI", list => {
					const player = get.event("player"),
						goon = player.hasSkill("fakezhouting");
					let cards1 = list[0][1].slice(),
						cards2 = list[1][1].slice();
					let card1 = cards1.slice().sort((a, b) => get[goon ? "useful" : "value"](goon ? a : b) - get[goon ? "useful" : "value"](goon ? b : a))[0];
					let card2 = cards2.slice().sort((a, b) => get[goon ? "useful" : "value"](goon ? b : a) - get[goon ? "useful" : "value"](goon ? a : b))[0];
					if (get[goon ? "useful" : "value"](card1) * (goon ? -1 : 1) < get[goon ? "useful" : "value"](card2) * (goon ? -1 : 1)) {
						cards1.remove(card1);
						cards2.remove(card2);
						return [cards1.concat(card2), cards2.concat(card1)];
					}
				});
			if (bool) {
				event.result = {
					bool: true,
					cost_data: [moved[0].filter(i => get.owner(i))[0], moved[1].filter(i => !get.owner(i))[0]],
				};
			} else {
				event.result = { bool: false };
			}
		},
		async content(event, trigger, player) {
			await player
				.lose(event.cost_data[0], ui.cardPile)
				.set("insert_index", () => {
					return ui.cardPile.childNodes[Array.from(ui.cardPile.childNodes).indexOf(get.event("card2"))];
				})
				.set("card2", event.cost_data[1]);
			await player.gain(event.cost_data[1], "gain2");
		},
	},
	fakezhouting: {
		unique: true,
		limited: true,
		audio: "xiongzhi",
		enable: "phaseUse",
		skillAnimation: true,
		animationColor: "thunder",
		async content(event, trigger, player) {
			player.awakenSkill("fakezhouting");
			let gains = [];
			const cards = Array.from(ui.cardPile.childNodes).slice(0, Math.min(player.maxHp, Array.from(ui.cardPile.childNodes).length));
			await game.cardsGotoOrdering(cards);
			for (const card of cards) {
				if (player.hasUseTarget(card, false, false) || (get.info(card).notarget && lib.filter.cardEnabled(card, player))) {
					await player.chooseUseTarget(card, true, false, "nodistance");
				} else {
					gains.push(card);
				}
			}
			if (gains.length) {
				await player.gain(gains, "gain2");
			}
			if (
				game.getGlobalHistory("everything", evt => {
					return evt.name == "die" && evt.getParent(6) == event && evt.getParent(6).player == player;
				}).length
			) {
				player.restoreSkill("fakezhouting");
			}
		},
		ai: {
			order: 1,
			result: {
				player(player) {
					return player.hasUnknown() ? 0 : 1;
				},
			},
		},
	},
	fakexuanbei: {
		audio: "xuanbei",
		trigger: { player: "showCharacterEnd" },
		filter(event, player) {
			return (
				game
					.getAllGlobalHistory(
						"everything",
						evt => {
							return evt.name == "showCharacter" && evt.player == player && evt.toShow.some(i => get.character(i, 3).includes("fakexuanbei"));
						},
						event
					)
					.indexOf(event) == 0
			);
		},
		forced: true,
		locked: false,
		async content(event, trigger, player) {
			await player.draw(2);
			player.addTempSkill("fakexuanbei_effect");
		},
		group: ["fakexuanbei_change", "fakexuanbei_give"],
		subSkill: {
			effect: {
				charlotte: true,
				mark: true,
				intro: { content: "使用应变牌时直接获得强化" },
			},
			give: {
				audio: "xuanbei",
				trigger: { player: "useCardAfter" },
				filter(event, player) {
					return (event.card.yingbian || get.is.yingbian(event.card)) && event.cards.filterInD().length;
				},
				usable: 1,
				async cost(event, trigger, player) {
					const cards = trigger.cards.filterInD();
					const {
						result: { bool, targets },
					} = await player.chooseTarget(get.prompt("fakexuanbei"), "令一名其他角色获得" + get.translation(event.cards), lib.filter.notMe).set("ai", target => {
						let att = get.attitude(get.event("player"), target);
						if (att < 0) {
							return 0;
						}
						if (target.hasJudge("lebu")) {
							att /= 2;
						}
						if (target.hasSkillTag("nogain")) {
							att /= 10;
						}
						return att / (1 + get.distance(player, target, "absolute"));
					});
					event.result = { bool: bool, targets: targets, cards: cards };
				},
				async content(event, trigger, player) {
					await event.targets[0].gain(event.cards, "gain2").set("giver", player);
				},
			},
			change: {
				audio: "xuanbei",
				trigger: { player: "die" },
				direct: true,
				forceDie: true,
				skillAnimation: true,
				animationColor: "thunder",
				async cost(event, trigger, player) {
					const {
						result: { bool, targets },
					} = await player
						.chooseTarget(get.prompt("fakexuanbei"), "令一名其他角色变更副将", lib.filter.notMe)
						.set("ai", target => {
							const player = get.event("player");
							const rank = get.guozhanRank(target.name2, target) <= 3;
							const att = get.attitude(player, target);
							if (att > 0) {
								return (4 - rank) * att;
							}
							return -(rank - 6) * att;
						})
						.set("forceDie", true);
					event.result = { bool: bool, targets: targets };
				},
				async content(event, trigger, player) {
					await event.targets[0].changeVice();
				},
			},
		},
	},
	fakeqingleng: {
		audio: "qingleng",
		trigger: { global: "phaseEnd" },
		filter(event, player) {
			var target = event.player;
			return target != player && target.isIn() && !target.isUnseen(2) && player.countCards("he") && player.canUse({ name: "sha", nature: "ice" }, target, false);
		},
		direct: true,
		preHidden: true,
		async content(event, trigger, player) {
			const target = trigger.player;
			const {
				result: { bool },
			} = await player
				.chooseToUse()
				.set("openskilldialog", get.prompt2("fakeqingleng", target))
				.set("norestore", true)
				.set("_backupevent", "fakeqingleng_backup")
				.set("custom", {
					add: {},
					replace: { window() { } },
				})
				.set("targetRequired", true)
				.set("complexSelect", true)
				.set("complexTarget", true)
				.set("filterTarget", function (card, player, target) {
					if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) {
						return false;
					}
					return lib.filter.targetEnabled.apply(this, arguments);
				})
				.set("sourcex", target)
				.set("addCount", false)
				.setHiddenSkill("fakeqingleng")
				.backup("fakeqingleng_backup")
				.set("logSkill", ["fakeqingleng", target]);
			if (
				bool &&
				!player.getHistory("sourceDamage", evt => {
					return evt.getParent(4) == event;
				}).length
			) {
				const {
					result: { bool, links },
				} = await player.chooseButton(["清冷：暗置" + get.translation(target) + "的一张武将牌", '<div class="text center">' + get.translation(target) + "的武将牌</div>", [[target.name1, target.name2], "character"]], true).set("filterButton", button => !get.is.jun(button.link));
				if (bool) {
					player.line(target);
					player.addSkill("fakeqingleng_effect");
					if (player.getStorage("fakeqingleng_effect").some(list => list[0] == target)) {
						player.storage.fakeqingleng_effect.indexOf(player.getStorage("fakeqingleng_effect").find(list => list[0] == target))[1].addArray(links);
					} else {
						player.markAuto("fakeqingleng_effect", [[target, links[0]]]);
					}
					target
						.when(["phaseBegin", "die"])
						.vars({ target: player })
						.then(() => {
							const removes = target.getStorage("fakeqingleng_effect").filter(list => list[0] == player);
							target.unmarkAuto("fakeqingleng_effect", removes);
							if (!target.getStorage("fakeqingleng_effect").length) {
								target.removeSkill("fakeqingleng_effect");
							}
						});
					await target.hideCharacter(target.name1 == links[0] ? 0 : 1);
				}
			}
		},
		subSkill: {
			backup: {
				filterCard(card) {
					return get.itemtype(card) == "card";
				},
				check(card) {
					return 7.5 - get.value(card);
				},
				position: "he",
				popname: true,
				viewAs: { name: "sha", nature: "ice" },
				log: false,
			},
			effect: {
				charlotte: true,
				onremove: true,
				intro: {
					content(storage) {
						return (
							"•" +
							storage
								.map(list => {
									return get.translation(list[0]) + "明置" + get.translation(list[1]) + "后，对其造成1点伤害";
								})
								.join("<br>•")
						);
					},
				},
				audio: "qingleng",
				trigger: { global: "showCharacterEnd" },
				filter(event, player) {
					const list = player.getStorage("fakeqingleng_effect").find(list => list[0] == event.player);
					return list && list[1].includes(event.toShow);
				},
				forced: true,
				logTarget: "player",
				content() {
					trigger.player.damage();
				},
			},
		},
	},
	fakexijue: {
		audio: "xijue",
		trigger: { player: "showCharacterEnd" },
		filter(event, player) {
			return (
				game
					.getAllGlobalHistory(
						"everything",
						evt => {
							return evt.name == "showCharacter" && evt.player == player && evt.toShow.some(i => get.character(i, 3).includes("fakexijue"));
						},
						event
					)
					.indexOf(event) == 0
			);
		},
		forced: true,
		locked: false,
		popup: false,
		preHidden: ["xijue_tuxi", "fakexijue_xiaoguo"],
		content() {
			player.addMark("xijue", 2);
		},
		derivation: ["xijue_tuxi", "fakexijue_xiaoguo"],
		group: ["fakexijue_effect", "xijue_tuxi", "fakexijue_xiaoguo"],
		subSkill: {
			effect: {
				audio: "xijue",
				trigger: { player: ["phaseDrawBegin2", "phaseEnd"] },
				filter(event, player) {
					if (event.name == "phaseDraw") {
						return !event.numFixed;
					}
					return player.getHistory("sourceDamage").length;
				},
				forced: true,
				popup: false,
				content() {
					if (trigger.name == "phaseDraw") {
						trigger.num = Math.min(player.countMark("xijue"), player.maxHp);
					} else {
						player.addMark("xijue", 1);
					}
				},
			},
			xiaoguo: {
				audio: "xijue_xiaoguo",
				trigger: { global: "phaseZhunbeiBegin" },
				filter(event, player) {
					if (!player.hasMark("xijue")) {
						return false;
					}
					return (
						event.player != player &&
						player.countCards("h", card => {
							if (_status.connectMode) {
								return true;
							}
							return get.type(card) == "basic" && lib.filter.cardDiscardable(card, player);
						})
					);
				},
				async cost(event, trigger, player) {
					event.result = await player
						.chooseToDiscard(
							get.prompt2("fakexijue_xiaoguo", trigger.player),
							(card, player) => {
								return get.type(card) == "basic";
							},
							[1, Math.min(player.countMark("xijue"), player.maxHp)]
						)
						.set("complexSelect", true)
						.set("ai", card => {
							const player = get.event("player"),
								target = get.event().getTrigger().player;
							const effect = get.damageEffect(target, player, player);
							const cards = target.getCards("e", card => get.attitude(player, target) * get.value(card, target) < 0);
							if (effect <= 0 && !cards.length) {
								return 0;
							}
							if (ui.selected.cards.length > cards.length - (effect <= 0 ? 1 : 0)) {
								return 0;
							}
							return 1 / (get.value(card) || 0.5);
						})
						.set("logSkill", ["fakexijue_xiaoguo", trigger.player])
						.setHiddenSkill("fakexijue_xiaoguo")
						.forResult();
				},
				preHidden: true,
				popup: false,
				async content(event, trigger, player) {
					const num = trigger.player.countCards("e"),
						num2 = event.cards.length;
					await player.discardPlayerCard(trigger.player, "e", num2, true);
					if (num2 > num) {
						await trigger.player.damage();
					}
					player.removeMark("xijue", 1);
				},
			},
		},
	},
	fakeqimei: {
		audio: "qimei",
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		preHidden: true,
		content() {
			"step 0";
			player
				.chooseTarget(get.prompt("fakeqimei"), "选择一名其他角色并获得“齐眉”效果", lib.filter.notMe)
				.set("ai", target => {
					var player = _status.event.player;
					return get.attitude(player, target) / (Math.abs(player.countCards("h") + 2 - target.countCards("h")) + 1);
				})
				.setHiddenSkill("fakeqimei");
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("fakeqimei", target);
				player.addTempSkill("fakeqimei_draw");
				player.storage.fakeqimei_draw = target;
				game.delayx();
			}
		},
		subSkill: {
			draw: {
				audio: "qimei",
				charlotte: true,
				forced: true,
				popup: false,
				trigger: {
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "loseAfter", "addToExpansionAfter"],
				},
				filter(event, player) {
					var target = player.storage.fakeqimei_draw;
					if (!target || !target.isIn()) {
						return false;
					}
					if (player.countCards("h") != target.countCards("h")) {
						return false;
					}
					var hasChange = function (event, player) {
						var gain = 0,
							lose = 0;
						if (event.getg) {
							gain = event.getg(player).length;
						}
						if (event.getl) {
							lose = event.getl(player).hs.length;
						}
						return gain != lose;
					};
					return (hasChange(event, player) && target.isDamaged()) || (hasChange(event, target) && player.isDamaged());
				},
				content() {
					"step 0";
					if (trigger.delay === false) {
						game.delayx();
					}
					"step 1";
					var target = player.storage.fakeqimei_draw;
					player.logSkill("fakeqimei_draw", target);
					var drawer = [];
					var hasChange = function (event, player) {
						var gain = 0,
							lose = 0;
						if (event.getg) {
							gain = event.getg(player).length;
						}
						if (event.getl) {
							lose = event.getl(player).hs.length;
						}
						return gain != lose;
					};
					if (hasChange(trigger, player)) {
						drawer.push(target);
					}
					if (hasChange(trigger, target)) {
						drawer.push(player);
					}
					for (const i of drawer) {
						if (i.isDamaged()) {
							i.recover();
						}
					}
				},
				group: "fakeqimei_hp",
				onremove: true,
				mark: true,
				intro: { content: "已和$组成齐眉组合" },
			},
			hp: {
				audio: "qimei",
				trigger: { global: "changeHp" },
				charlotte: true,
				forced: true,
				logTarget(event, player) {
					return player.storage.fakeqimei_draw;
				},
				filter(event, player) {
					var target = player.storage.fakeqimei_draw;
					if (!target || !target.isIn()) {
						return false;
					}
					if (player != event.player && target != event.player) {
						return false;
					}
					return player.hp == target.hp;
				},
				content() {
					game.delayx();
					(player == trigger.player ? player.storage.fakeqimei_draw : player).draw();
				},
			},
		},
	},
	fakebaoqie: {
		unique: true,
		audio: "baoqie",
		trigger: { player: "showCharacterEnd" },
		filter(event, player) {
			if (
				!game.hasPlayer(target => {
					return target.getGainableCards(player, "e").some(card => get.subtype(card) == "equip5");
				})
			) {
				return false;
			}
			return (
				game
					.getAllGlobalHistory(
						"everything",
						evt => {
							return evt.name == "showCharacter" && evt.player == player && evt.toShow.some(i => get.character(i, 3).includes("fakebaoqie"));
						},
						event
					)
					.indexOf(event) == 0
			);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt("fakebaoqie"), "获得一名角色装备区里所有的宝物牌，然后你可以使用其中的一张牌", (card, player, target) => {
					return target.getGainableCards(player, "e").some(card => get.subtype(card) == "equip5");
				})
				.set("ai", target => {
					const player = get.event("player");
					return (
						-get.sgn(get.attitude(player, target)) *
						target
							.getGainableCards(player, "e")
							.filter(card => {
								return get.subtype(card) == "equip5";
							})
							.reduce((sum, card) => sum + get.value(card, target), 0)
					);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			let cards = target.getGainableCards(player, "e").filter(card => get.subtype(card) == "equip5");
			await player.gain(cards, target, "giveAuto");
			cards = cards.filter(i => get.owner(i) == player && get.position(i) == "h" && player.hasUseTarget(i));
			if (cards.length) {
				const {
					result: { bool, links },
				} = await player.chooseButton(["宝箧：是否使用其中的一张宝物牌？", cards]).set("ai", button => {
					return get.equipValue(button.link, get.event("player"));
				});
				if (bool) {
					await player.chooseUseTarget(links[0], true);
				}
			}
		},
		ai: { mingzhi_no: true },
		group: "fakebaoqie_damage",
		subSkill: {
			damage: {
				audio: "baoqie",
				trigger: { player: "damageBegin4" },
				filter(event, player) {
					if (!player.getStockSkills(true, true, true).includes("fakebaoqie")) {
						return false;
					}
					return !game.getAllGlobalHistory("everything", evt => {
						return evt.name == "showCharacter" && evt.player == player && evt.toShow.some(i => get.character(i, 3).includes("fakebaoqie"));
					}).length;
				},
				check(event, player) {
					return !event.source || get.damageEffect(player, event.source, player) < 0;
				},
				prompt: "宝箧：是否明置此武将牌并防止此伤害？",
				content() {
					trigger.cancel();
				},
			},
		},
	},
	fakeciwei: {
		audio: "ciwei",
		trigger: { global: "useCard" },
		filter(event, player) {
			if (event.all_excluded || event.player == player || !player.countCards("he")) {
				return false;
			}
			return event.player.getHistory("useCard").indexOf(event) % 2 == 1;
		},
		async cost(event, trigger, player) {
			let str = "弃置一张牌，取消" + get.translation(trigger.card) + "的所有目标";
			if (get.type(trigger.card) == "equip") {
				str += "，然后你获得此牌且你可以使用之";
			}
			event.result = await player
				.chooseToDiscard(get.prompt("fakeciwei", trigger.player), str, "he")
				.set("ai", card => {
					return _status.event.goon / 1.4 - get.value(card);
				})
				.set(
					"goon",
					(function () {
						if (!trigger.targets.length) {
							return -get.attitude(player, trigger.player);
						}
						var num = 0;
						for (var i of trigger.targets) {
							num -= get.effect(i, trigger.card, trigger.player, player);
						}
						return num;
					})()
				)
				.setHiddenSkill("fakeciwei")
				.set("logSkill", ["fakeciwei", trigger.player])
				.forResult();
		},
		preHidden: true,
		popup: false,
		async content(event, trigger, player) {
			trigger.targets.length = 0;
			trigger.all_excluded = true;
			const cards = trigger.cards.filterInD();
			if (cards.length && get.type(trigger.card) == "equip") {
				await player.gain(cards, "gain2");
				for (let i of cards) {
					if (player.getCards("h").includes(i) && player.hasUseTarget(i)) {
						await player.chooseUseTarget(i);
					}
				}
			}
		},
		global: "fakeciwei_ai",
		subSkill: {
			ai: {
				mod: {
					aiOrder(player, card, num) {
						if (
							!player.getHistory("useCard").length % 2 ||
							!game.hasPlayer(current => {
								return current != player && (get.realAttitude || get.attitude)(current, player) < 0 && current.hasSkill("fakeciwei") && current.countCards("he") > 0;
							})
						) {
							return;
						}
						if (!player._fakeciwei_temp) {
							player._fakeciwei_temp = true;
							num /= Math.max(1, player.getUseValue(card));
						}
						delete player._fakeciwei_temp;
						return num;
					},
				},
			},
		},
	},
	fakehuirong: {
		unique: true,
		audio: "huirong",
		trigger: { player: "showCharacterEnd" },
		filter(event, player) {
			if (
				!game.hasPlayer(target => {
					return target.countCards("h") != target.getHp();
				})
			) {
				return false;
			}
			return (
				game
					.getAllGlobalHistory(
						"everything",
						evt => {
							return evt.name == "showCharacter" && evt.player == player && evt.toShow.some(i => get.character(i, 3).includes("fakehuirong"));
						},
						event
					)
					.indexOf(event) == 0
			);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt("fakehuirong"), "令一名角色将手牌数摸至/弃置至与其体力值相同", (card, player, target) => {
					return target.countCards("h") != target.getHp();
				})
				.set("ai", target => {
					const att = get.attitude(get.event("player"), target);
					const num = target.countCards("h");
					if (num > target.hp) {
						return -att * (num - target.getHp());
					}
					return att * Math.max(0, target.getHp() - target.countCards("h"));
				})
				.forResult();
		},
		preHidden: true,
		content() {
			const target = event.targets[0];
			if (target.countCards("h") < target.getHp()) {
				target.drawTo(target.getHp());
			} else {
				target.chooseToDiscard("h", true, target.countCards("h") - target.getHp());
			}
		},
		ai: { mingzhi_no: true },
		group: "fakehuirong_damage",
		subSkill: {
			damage: {
				audio: "huirong",
				trigger: { player: "damageBegin4" },
				filter(event, player) {
					if (!player.getStockSkills(true, true, true).includes("fakehuirong")) {
						return false;
					}
					return !game.getAllGlobalHistory("everything", evt => {
						return evt.name == "showCharacter" && evt.player == player && evt.toShow.some(i => get.character(i, 3).includes("fakehuirong"));
					}).length;
				},
				check(event, player) {
					return !event.source || get.damageEffect(player, event.source, player) < 0;
				},
				prompt: "慧容：是否明置此武将牌并防止此伤害？",
				content() {
					trigger.cancel();
				},
			},
		},
	},
	fakeyanxi: {
		audio: "yanxi",
		enable: "phaseUse",
		filter(event, player) {
			return game.hasPlayer(target => {
				return get.info("fakeyanxi").filterTarget(null, player, target);
			});
		},
		filterTarget(card, player, target) {
			return target != player && target.countCards("h");
		},
		usable: 1,
		async content(event, trigger, player) {
			const target = event.target,
				str = get.translation(target);
			const {
				result: { bool, links },
			} = await player.choosePlayerCard(target, "宴戏：展示" + str + "的一张手牌", "h", true);
			if (bool) {
				let cards = get.cards(2),
					gains = [];
				await game.cardsGotoOrdering(cards);
				cards = links.slice().concat(cards);
				await player.showCards(cards, get.translation(player) + "发动了【宴戏】");
				for (const card of cards) {
					gains.unshift(get.color(card));
					gains.add(get.type2(card));
				}
				gains = gains.unique().map(i => (i == "none" ? "none2" : i));
				const {
					result: { control },
				} = await player
					.chooseControl(gains)
					.set("cards", cards)
					.set("ai", () => {
						const player = get.event("player"),
							cards = get.event("cards"),
							getNum = function (cards, control, player) {
								cards = cards.filter(i => get.type2(i) == control || get.color(i) == control);
								return cards.reduce((sum, card) => sum + get.value(card, player), 0);
							};
						let controls = get
							.event("controls")
							.slice()
							.map(i => (i == "none2" ? "none" : i));
						controls.sort((a, b) => getNum(cards, b, player) - getNum(cards, a, player));
						return controls[0] == "none" ? "none2" : controls[0];
					})
					.set("dialog", ["获得其中一种颜色或类别的所有牌，然后" + str + "获得剩余牌", "hidden", cards]);
				if (control) {
					const choice = control == "none2" ? "none" : control;
					gains = cards.filter(i => get.type2(i) == choice || get.color(i) == choice);
					const num = gains.length;
					cards.removeArray(gains);
					if (gains.includes(links[0])) {
						gains.removeArray(links);
						await player.gain(links, target, "give", "bySelf");
					}
					if (gains.length) {
						await player.gain(gains, "gain2");
					}
					player.addTempSkill("fakeyanxi_maxHand");
					player.addMark("fakeyanxi_maxHand", num, false);
					cards = cards.filter(i => !links.includes(i));
					if (cards.length) {
						await target.gain(cards, "gain2");
					}
				}
			}
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					return [-1, 1, 2][get.sgn(get.attitude(player, target)) + 1] / target.countCards("h");
				},
			},
		},
		subSkill: {
			maxHand: {
				charlotte: true,
				onremove: true,
				intro: { content: "手牌上限+#" },
				mod: {
					maxHandcard(player, num) {
						return num + player.countMark("fakeyanxi_maxHand");
					},
				},
			},
		},
	},
	fakeshiren: {
		unique: true,
		audio: "shiren",
		trigger: { player: "showCharacterEnd" },
		filter(event, player) {
			if (
				!game.hasPlayer(target => {
					return get.info("fakeyanxi").filterTarget(null, player, target);
				})
			) {
				return false;
			}
			return (
				game
					.getAllGlobalHistory(
						"everything",
						evt => {
							return evt.name == "showCharacter" && evt.player == player && evt.toShow.some(i => get.character(i, 3).includes("fakeshiren"));
						},
						event
					)
					.indexOf(event) == 0
			);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt("fakeshiren"), "发动一次【宴戏】", (card, player, target) => {
					return get.info("fakeyanxi").filterTarget(null, player, target);
				})
				.set("ai", target => {
					const player = get.event("player");
					return -get.sgn(get.attitude(player, target)) * get.info("fakeyanxi").ai.result.target(player, target);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			player.useResult({ skill: "fakeyanxi", target: target, targets: [target] }, event);
		},
		ai: { mingzhi_no: true },
		group: "fakeshiren_damage",
		subSkill: {
			damage: {
				audio: "shiren",
				trigger: { player: "damageBegin4" },
				filter(event, player) {
					if (!player.getStockSkills(true, true, true).includes("fakeshiren")) {
						return false;
					}
					return !game.getAllGlobalHistory("everything", evt => {
						return evt.name == "showCharacter" && evt.player == player && evt.toShow.some(i => get.character(i, 3).includes("fakeshiren"));
					}).length;
				},
				check(event, player) {
					return !event.source || get.damageEffect(player, event.source, player) < 0;
				},
				prompt: "识人：是否明置此武将牌并防止此伤害？",
				content() {
					trigger.cancel();
				},
			},
		},
	},
	fakecanmou: {
		audio: "canmou",
		trigger: { global: "useCardToPlayer" },
		filter(event, player) {
			if (!event.player.isMaxHandcard(true) || !event.isFirstTarget || get.type(event.card) != "trick") {
				return false;
			}
			if (event.targets.length > 1 && !player.getStorage("fakecanmou_used").includes("-")) {
				return true;
			}
			return get.info("fakecanmou").filter_add(event, player);
		},
		filter_add(event, player) {
			const info = get.info(event.card);
			if (info.allowMultiple == false) {
				return false;
			}
			if (event.targets && !info.multitarget && !player.getStorage("fakecanmou_used").includes("+")) {
				if (
					game.hasPlayer(current => {
						return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, event.player, current);
					})
				) {
					return true;
				}
			}
			return false;
		},
		async cost(event, trigger, player) {
			let str = "",
				goon = get.info("fakecanmou").filter_add(trigger, player),
				bool = trigger.targets.length > 1 && !player.getStorage("fakecanmou_used").includes("-");
			if (goon) {
				str += "增加";
			}
			if (goon && bool) {
				str = "或";
			}
			if (bool) {
				str += "减少";
			}
			event.result = await player
				.chooseTarget(get.prompt("fakecanmou"), (card, player, target) => {
					const trigger = get.event().getTrigger();
					if (trigger.targets.length > 1 && !player.getStorage("fakecanmou_used").includes("-") && trigger.targets.includes(target)) {
						return true;
					}
					return !player.getStorage("fakecanmou_used").includes("+") && !trigger.targets.includes(target) && lib.filter.targetEnabled2(trigger.card, trigger.player, target);
				})
				.set("prompt2", "为" + get.translation(trigger.card) + str + "一个目标")
				.set("ai", target => {
					const player = get.event("player"),
						trigger = get.event().getTrigger();
					return get.effect(target, trigger.card, trigger.player, player) * (trigger.targets.includes(target) ? -1 : 1);
				})
				.setHiddenSkill("fakecanmou")
				.forResult();
		},
		preHidden: true,
		async content(event, trigger, player) {
			const target = event.targets[0],
				goon = trigger.targets.includes(target);
			player.addTempSkill("fakecanmou_used");
			player.markAuto("fakecanmou_used", [goon ? "-" : "+"]);
			if (goon) {
				trigger.targets.remove(target);
				game.log(target, "被", player, "移除了目标");
			} else {
				trigger.targets.add(target);
				game.log(target, "成为了", trigger.card, "的目标");
			}
		},
		subSkill: { used: { charlotte: true, onremove: true } },
	},
	fakezhuosheng: {
		hiddenCard(player, name) {
			return player.countCards("hs") > 1 && get.type(name) == "basic" && lib.inpile.includes(name) && !player.getStorage("fakezhuosheng_count").includes(name);
		},
		audio: "zhuosheng",
		enable: "chooseToUse",
		filter(event, player) {
			if (event.type == "wuxie") {
				return false;
			}
			if (player.countCards("hs") < 2) {
				return false;
			}
			return get
				.inpileVCardList(info => {
					const name = info[2];
					return !player.getStorage("fakezhuosheng_count").includes(name) && get.type(name) == "basic";
				})
				.some(card => event.filterCard({ name: card[2], nature: card[3] }, player, event));
		},
		chooseButton: {
			dialog(event, player) {
				var list = get
					.inpileVCardList(info => {
						const name = info[2];
						return !player.getStorage("fakezhuosheng_count").includes(name) && get.type(name) == "basic";
					})
					.filter(card => event.filterCard({ name: card[2], nature: card[3] }, player, event));
				return ui.create.dialog("擢升", [list, "vcard"], "hidden");
			},
			check(button) {
				var player = _status.event.player;
				var evt = _status.event.getParent();
				var name = button.link[2],
					card = { name: name, nature: button.link[3] };
				if (name == "shan") {
					return 2;
				}
				if (evt.type == "dying") {
					if (get.attitude(player, evt.dying) < 2) {
						return 0;
					}
					if (name == "jiu") {
						return 2.1;
					}
					return 1.9;
				}
				if (evt.type == "phase") {
					if (button.link[2] == "jiu") {
						if (player.getUseValue({ name: "jiu" }) <= 0) {
							return 0;
						}
						var cards = player.getCards("hs", cardx => get.value(cardx) < 8);
						cards.sort((a, b) => get.value(a) - get.value(b));
						if (cards.some(cardx => get.name(cardx) == "sha" && !cards.slice(0, 2).includes(cardx))) {
							return player.getUseValue({ name: "jiu" });
						}
						return 0;
					}
					return player.getUseValue(card) / 4;
				}
				return 1;
			},
			backup(links, player) {
				return {
					audio: "zhuosheng",
					filterCard: true,
					selectCard: [2, Infinity],
					position: "hs",
					complexCard: true,
					check(card) {
						if (ui.selected.cards.length >= 2) {
							return 0;
						}
						return 8 - get.value(card);
					},
					popname: true,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
					},
					precontent() {
						var name = event.result.card.name;
						player.addTempSkill("fakezhuosheng_count");
						player.markAuto("fakezhuosheng_count", [name]);
						player
							.when("yingbian")
							.filter(evt => evt.skill == "fakezhuosheng_backup")
							.then(() => {
								if (trigger.cards && trigger.cards.length) {
									let cards = trigger.cards.slice();
									cards = cards.filter(i => get.is.yingbian(i));
									if (cards.length) {
										if (!Array.isArray(trigger.temporaryYingbian)) {
											trigger.temporaryYingbian = [];
										}
										trigger.temporaryYingbian.add("force");
										trigger.temporaryYingbian.addArray(
											Array.from(lib.yingbian.effect.keys()).filter(value => {
												return cards.some(card => get.cardtag(card, `yingbian_${value}`));
											})
										);
									}
								}
							});
					},
				};
			},
			prompt(links, player) {
				var name = links[0][2];
				var nature = links[0][3];
				return "将至少两张手牌当作" + (get.translation(nature) || "") + get.translation(name) + "使用";
			},
		},
		ai: {
			order(item, player) {
				if (player && _status.event.type == "phase") {
					var add = false,
						max = 0;
					var names = lib.inpile.filter(name => get.type(name) == "basic" && !player.getStorage("fakezhuosheng_count").includes(name));
					if (names.includes("sha")) {
						add = true;
					}
					names = names.map(namex => {
						return { name: namex };
					});
					if (add) {
						lib.inpile_nature.forEach(nature => names.push({ name: "sha", nature: nature }));
					}
					names.forEach(card => {
						if (player.getUseValue(card) > 0) {
							var temp = get.order(card);
							if (card.name == "jiu") {
								var cards = player.getCards("hs", cardx => get.value(cardx) < 8);
								cards.sort((a, b) => get.value(a) - get.value(b));
								if (!cards.some(cardx => get.name(cardx) == "sha" && !cards.slice(0, 2).includes(cardx))) {
									temp = 0;
								}
							}
							if (temp > max) {
								max = temp;
							}
						}
					});
					if (max > 0) {
						max -= 0.001;
					}
					return max;
				}
				return 0.5;
			},
			respondShan: true,
			respondSha: true,
			fireAttack: true,
			skillTagFilter(player, tag, arg) {
				if (arg == "respond") {
					return false;
				}
				const name = tag == "respondShan" ? "shan" : "sha";
				return get.info("fakezhuosheng").hiddenCard(player, name);
			},
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		subSkill: {
			count: { charlotte: true, onremove: true },
			backup: {},
		},
	},
	fakejuhou: {
		zhenfa: "inline",
		trigger: { global: "useCardToTargeted" },
		filter(event, player) {
			return (event.card.name == "sha" || get.type(event.card) == "trick") && event.target.inline(player);
		},
		logTarget: "target",
		async content(event, trigger, player) {
			const target = trigger.target;
			const {
				result: { bool, cards },
			} = await target.chooseCard("he", [1, Infinity], "是否将任意张牌置于武将牌上？").set("ai", card => {
				const trigger = get.event().getTrigger(),
					player = trigger.target;
				if (card.name == "baiyin" && get.position(card) == "e" && player.isDamaged() && get.recoverEffect(player, player, player) > 0) {
					return 1;
				}
				if (["guohe", "shunshou", "zhujinqiyuan", "chuqibuyi", "huogong"].includes(trigger.card.name) && get.effect(player, trigger.card, trigger.player, player) < 0) {
					return 1;
				}
				return 0;
			});
			if (bool) {
				target.addToExpansion(cards, "giveAuto", target).gaintag.add("fakejuhou");
				target.addSkill("fakejuhou");
				target
					.when({ global: "useCardAfter" })
					.filter(evt => evt == trigger.getParent())
					.then(() => {
						const cards = player.getExpansions("fakejuhou");
						if (cards.length) {
							player.gain(cards, "gain2");
						}
					});
			}
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
	},
	gznaxiang: {
		audio: "naxiang",
		inherit: "naxiang",
	},
	fakecaiwang: {
		audio: "caiwang",
		trigger: { player: "loseAfter" },
		filter(event, player) {
			const evt = event.getParent(2);
			if (evt.name != "yingbianZhuzhan") {
				return false;
			}
			const color = (get.color(evt.card) == get.color(event.cards[0])).toString();
			if (
				color == "true" &&
				!game.hasPlayer(target => {
					return target != player && target.countCards("he");
				})
			) {
				return false;
			}
			return !player.getStorage("fakecaiwang_used").includes(color);
		},
		async cost(event, trigger, player) {
			const color = (get.color(trigger.getParent(2).card) == get.color(trigger.cards[0])).toString();
			if (color == "false") {
				//event.result=await player.chooseBool(get.prompt('fakecaiwang'),'摸一张牌').forResult();
				event.result = { bool: true };
			} else {
				event.result = await player
					.chooseTarget(get.prompt("fakecaiwang"), "弃置一名其他角色的一张牌", (card, player, target) => {
						return target != player && target.countCards("he");
					})
					.set("ai", target => {
						const player = get.event("player");
						return get.effect(target, { name: "guohe_copy2" }, player, player);
					})
					.forResult();
			}
		},
		async content(event, trigger, player) {
			const color = (get.color(trigger.getParent(2).card) == get.color(trigger.cards[0])).toString();
			player.addTempSkill("fakecaiwang_used");
			player.markAuto("fakecaiwang_used", [color]);
			if (color == "false") {
				await player.draw();
			} else {
				await player.discardPlayerCard(event.targets[0], "he", true);
			}
		},
		group: "fakecaiwang_zhuzhan",
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
			zhuzhan: {
				trigger: { player: "yingbianZhuzhanBegin" },
				forced: true,
				locked: false,
				popup: false,
				firstDo: true,
				content() {
					trigger.setContent(get.info("fakecaiwang").yingbian);
				},
			},
		},
		yingbian() {
			"step 0";
			event._global_waiting = true;
			event.send = (player, card, source, targets, id, id2, yingbianZhuzhanAI, skillState) => {
				if (skillState) {
					player.applySkills(skillState);
				}
				var type = get.type2(card),
					str = get.translation(source);
				if (targets && targets.length) {
					str += `对${get.translation(targets)}`;
				}
				str += `使用了${get.translation(card)}，是否弃置一张${get.translation(type)}为其助战？`;
				player.chooseCard({
					filterCard: (card, player) => get.type2(card) == type && lib.filter.cardDiscardable(card, player),
					prompt: str,
					position: "h",
					_global_waiting: true,
					id: id,
					id2: id2,
					ai:
						typeof yingbianZhuzhanAI == "function"
							? yingbianZhuzhanAI(player, card, source, targets)
							: cardx => {
								var info = get.info(card);
								if (info && info.ai && info.ai.yingbian) {
									var ai = info.ai.yingbian(card, source, targets, player);
									if (!ai) {
										return 0;
									}
									return ai - get.value(cardx);
								} else if (get.attitude(player, source) <= 0) {
									return 0;
								}
								return 5 - get.value(cardx);
							},
				});
				if (!game.online) {
					return;
				}
				_status.event._resultid = id;
				game.resume();
			};
			"step 1";
			var type = get.type2(card);
			event.list = game.filterPlayer(current => current.countCards("h") && (_status.connectMode || current.hasCard(cardx => get.type2(cardx) == type, "h"))).sortBySeat(_status.currentPhase || player);
			event.id = get.id();
			"step 2";
			if (!event.list.length) {
				event.finish();
			} else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] == game.me)) {
				event.goto(4);
			} else {
				event.send((event.current = event.list.shift()), event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
			}
			"step 3";
			if (result.bool) {
				event.zhuzhanresult = event.current;
				event.zhuzhanresult2 = result;
				if (event.current != game.me) {
					game.delayx();
				}
				event.goto(8);
			} else {
				event.goto(2);
			}
			"step 4";
			var id = event.id,
				sendback = (result, player) => {
					if (result && result.id == id && !event.zhuzhanresult && result.bool) {
						event.zhuzhanresult = player;
						event.zhuzhanresult2 = result;
						game.broadcast("cancel", id);
						if (_status.event.id == id && _status.event.name == "chooseCard" && _status.paused) {
							return () => {
								event.resultOL = _status.event.resultOL;
								ui.click.cancel();
								if (ui.confirm) {
									ui.confirm.close();
								}
							};
						}
					} else if (_status.event.id == id && _status.event.name == "chooseCard" && _status.paused) {
						return () => (event.resultOL = _status.event.resultOL);
					}
				},
				withme = false,
				withol = false,
				list = event.list;
			for (var i = 0; i < list.length; i++) {
				var current = list[i];
				if (current.isOnline()) {
					withol = true;
					current.wait(sendback);
					current.send(event.send, current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI, get.skillState(current));
					list.splice(i--, 1);
				} else if (current == game.me) {
					withme = true;
					event.send(current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
					list.splice(i--, 1);
				}
			}
			if (!withme) {
				event.goto(6);
			}
			if (_status.connectMode && (withme || withol)) {
				game.players.forEach(value => {
					if (value != player) {
						value.showTimer();
					}
				});
			}
			event.withol = withol;
			"step 5";
			if (!result || !result.bool || event.zhuzhanresult) {
				return;
			}
			game.broadcast("cancel", event.id);
			event.zhuzhanresult = game.me;
			event.zhuzhanresult2 = result;
			"step 6";
			if (event.withol && !event.resultOL) {
				game.pause();
			}
			"step 7";
			game.players.forEach(value => value.hideTimer());
			"step 8";
			if (event.zhuzhanresult) {
				var target = event.zhuzhanresult;
				if (target == player && player.hasSkill("fakecaiwang")) {
					player.logSkill("fakecaiwang");
				}
				target.line(player, "green");
				target.discard(event.zhuzhanresult2.cards).discarder = target;
				if (typeof event.afterYingbianZhuzhan == "function") {
					event.afterYingbianZhuzhan(event, trigger);
				}
				var yingbianCondition = event.name.slice(8).toLowerCase(),
					yingbianConditionTag = `yingbian_${yingbianCondition}_tag`;
				target.popup(yingbianConditionTag, lib.yingbian.condition.color.get(yingbianCondition));
				game.log(target, "响应了", '<span class="bluetext">' + (target == player ? "自己" : get.translation(player)) + "</span>", "发起的", yingbianConditionTag);
				target.addExpose(0.2);
				event.result = {
					bool: true,
				};
			} else {
				event.result = {
					bool: false,
				};
			}
		},
	},
	fakenaxiang: {
		audio: "naxiang",
		trigger: {
			source: "damageSource",
			player: "damageEnd",
		},
		filter(event, player) {
			if (!event.source || !event.player || !event.source.isIn() || !event.player.isIn() || !event.source.isEnemyOf(event.player)) {
				return false;
			}
			return !player.getStorage("fakenaxiang").includes(get.info("fakenaxiang").logTarget(event, player));
		},
		logTarget(event, player) {
			return event.source == player ? event.player : event.source;
		},
		forced: true,
		async content(event, trigger, player) {
			const target = get.info("fakenaxiang").logTarget(trigger, player);
			const {
				result: { junling, targets },
			} = await player.chooseJunlingFor(target);
			const {
				result: { index },
			} = await target.chooseJunlingControl(player, junling, targets).set("prompt", "纳降：是否执行军令？");
			if (index == 0) {
				await target.carryOutJunling(player, junling, targets);
			} else {
				if (!player.storage.fakenaxiang) {
					player.when(["phaseBegin", "die"]).then(() => {
						player.unmarkSkill("fakenaxiang");
						delete player.storage.fakenaxiang;
					});
				}
				player.markAuto("fakenaxiang", [target]);
			}
		},
		onremove: true,
		marktext: '<span style="text-decoration: line-through;">降</span>',
		intro: { content: "无法对$发动【纳降】" },
		group: ["fakenaxiang_discard", "fakenaxiang_yingbian"],
		subSkill: {
			discard: {
				trigger: { player: "chooseCardBegin" },
				filter(event, player) {
					return event.getParent().name == "yingbianZhuzhan";
				},
				forced: true,
				popup: false,
				firstDo: true,
				content() {
					trigger.filterCard = lib.filter.cardDiscardable;
				},
			},
			yingbian: {
				trigger: { player: "yingbian" },
				filter(event, player) {
					if (event.card.yingbian) {
						return false;
					}
					const temporaryYingbian = event.temporaryYingbian || [],
						card = event.card;
					if (temporaryYingbian.includes("force") || get.cardtag(card, "yingbian_force")) {
						return true;
					}
					return get.yingbianConditions(event.card).length;
				},
				forced: true,
				popup: false,
				firstDo: true,
				content() {
					"step 0";
					trigger.card.yingbian = true;
					event.card = trigger.card;
					event.temporaryYingbian = trigger.temporaryYingbian || [];
					if (event.temporaryYingbian.includes("force") || get.cardtag(event.card, "yingbian_force") || trigger.forceYingbian || player.hasSkillTag("forceYingbian")) {
						player.popup("yingbian_force_tag", lib.yingbian.condition.color.get("force"));
						game.log(player, "触发了", event.card, "的应变条件");
						event._result = { bool: true };
					} else {
						trigger.yingbianZhuzhanAI = (player, card, source, targets) => cardx => {
							if (get.attitude(player, source) <= 0) {
								return 0;
							}
							var info = get.info(card),
								num = 0;
							if (info && info.ai && info.ai.yingbian) {
								var ai = info.ai.yingbian(card, source, targets, player);
								if (ai) {
									num = ai;
								}
							}
							return Math.max(num, 6) - get.value(cardx);
						};
						lib.yingbian.condition.complex.get("zhuzhan")(trigger);
					}
					"step 1";
					if (!result.bool) {
						return;
					}
					var yingbianEffectExecuted = false;
					lib.yingbian.effect.forEach((value, key) => {
						if (!event.temporaryYingbian.includes(key) && !get.cardtag(card, `yingbian_${key}`)) {
							return;
						}
						game.yingbianEffect(trigger, value);
						if (!yingbianEffectExecuted) {
							yingbianEffectExecuted = true;
						}
					});
					if (!yingbianEffectExecuted) {
						var defaultYingbianEffect = get.defaultYingbianEffect(card);
						if (lib.yingbian.effect.has(defaultYingbianEffect)) {
							game.yingbianEffect(trigger, lib.yingbian.effect.get(defaultYingbianEffect));
							if (!yingbianEffectExecuted) {
								yingbianEffectExecuted = true;
							}
						}
					}
					if (yingbianEffectExecuted) {
						player.addTempSkill("yingbian_changeTarget");
					}
				},
			},
		},
	},

	//杨芷
	gzwanyi: {
		audio: "wanyi",
		enable: "phaseUse",
		filter(event, player) {
			if (player.getStorage("gzwanyi2").length >= 4) {
				return false;
			}
			if (_status.mode == "yingbian") {
				return player.hasCard(function (i) {
					return get.is.yingbian(i);
				}, "hs");
			}
			return player.hasCard(function (card) {
				return card.hasTag("lianheng");
			}, "hs");
		},
		chooseButton: {
			dialog(event, player) {
				var list = ["lianjunshengyan", "huoshaolianying", "xietianzi", "lulitongxin"];
				if (_status.mode == "yingbian") {
					list = ["zhujinqiyuan", "chuqibuyi", "shuiyanqijunx", "dongzhuxianji"];
				}
				list.removeArray(player.getStorage("gzwanyi2"));
				return ui.create.dialog("婉嫕", [list, "vcard"], "hidden");
			},
			filter(button, player) {
				return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
			},
			check(button) {
				return _status.event.player.getUseValue({ name: button.link[2] });
			},
			backup(links) {
				return {
					audio: "wanyi",
					popname: true,
					viewAs: {
						name: links[0][2],
					},
					filterCard(card) {
						if (_status.mode == "yingbian") {
							return get.is.yingbian(card);
						}
						return card.hasTag("lianheng");
					},
					check(card) {
						return 1 / Math.max(1, get.value(card));
					},
					position: "hs",
					onuse(links, player) {
						if (!player.storage.gzwanyi2) {
							player.storage.gzwanyi2 = [];
						}
						player.storage.gzwanyi2.add(links.card.name);
						player.addTempSkill("gzwanyi2");
					},
				};
			},
			prompt(links) {
				if (_status.mode == "yingbian") {
					return "将一张应变牌当做" + get.translation(links[0][2]) + "使用";
				}
				return "将一张合纵牌当做" + get.translation(links[0][2]) + "使用";
			},
		},
		subSkill: { backup: {} },
		ai: { order: 8, result: { player: 1 } },
	},
	gzwanyi2: { onremove: true },
	gzmaihuo: {
		audio: "maihuo",
		limited: true,
		trigger: { global: "useCardToTarget" },
		logTarget: "player",
		filter(event, player) {
			return event.card.name == "sha" && event.target.isIn() && event.target.isFriendOf(player);
		},
		preHidden: true,
		skillAnimation: true,
		animationColor: "thunder",
		check(event, player) {
			var source = event.player,
				targets = event.targets,
				card = event.card;
			for (var target of targets) {
				if (target.hasShan() || get.effect(target, card, source, player) >= 0) {
					continue;
				}
				if (player.hp <= 1 || target.hp <= (event.getParent().baseDamage || 1)) {
					return true;
				}
			}
			return false;
		},
		content() {
			player.awakenSkill("gzmaihuo");
			trigger.targets.length = 0;
			trigger.getParent().triggeredTargets2.length = 0;
			player.addSkill("gzmaihuo_effect");
			player.markAuto("gzmaihuo_effect", [trigger.player]);
			trigger.player.addMark("gzmaihuo_mark", 1, false);
		},
		subSkill: {
			effect: {
				audio: "maihuo",
				trigger: { global: "phaseBegin" },
				forced: true,
				charlotte: true,
				popup: false,
				filter(event, player) {
					return player.getStorage("gzmaihuo_effect").includes(event.player) && event.player.canUse("sha", player, false);
				},
				content() {
					"step 0";
					var target = trigger.player;
					player.unmarkAuto("gzmaihuo_effect", [target]);
					target.removeMark("gzmaihuo_mark", 1, false);
					target.useCard({ name: "sha", isCard: true }, player, "gzmaihuo_effect", false);
					"step 1";
					if (!player.getStorage("gzmaihuo_effect").length) {
						player.removeSkill("gzmaihuo_effect");
					}
				},
				group: "gzmaihuo_remove",
			},
			remove: {
				trigger: { player: "damageBegin2" },
				forced: true,
				filter(event, player) {
					return event.card && event.card.name == "sha" && event.getParent().skill == "gzmaihuo_effect";
				},
				content() {
					trigger.cancel();
					player.draw(2);
					if (player.checkMainSkill("gzmaihuo", false)) {
						player.removeCharacter(0);
					} else if (player.checkViceSkill("gzmaihuo", false)) {
						player.changeVice();
					}
				},
			},
			mark: {
				marktext: "祸",
				intro: {
					content: "mark",
					onunmark: true,
				},
			},
		},
	},
	//羊徽瑜
	gzcaiyuan: {
		audio: "caiyuan",
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		preHidden: true,
		filter(event, player) {
			var num1 = player.countCards("h"),
				num2 = num1;
			player.getHistory("gain", function (evt) {
				num2 -= evt.cards.length;
			});
			player.getHistory("lose", function (evt) {
				if (evt.hs) {
					num2 += evt.hs.length;
				}
			});
			return num1 >= num2;
		},
		content() {
			player.chooseDrawRecover(2, true);
		},
	},
	//左棻
	gzzhaosong: {
		audio: "zhaosong",
		enable: "phaseUse",
		preHidden: ["gzzhaosong_dying", "gzzhaosong_sha"],
		filter(event, player) {
			return !player.getStorage("gzzhaosong").includes("效果②") && game.hasPlayer(current => lib.skill.gzzhaosong.filterTarget(null, player, current));
		},
		filterTarget(card, player, target) {
			return target != player && (target.isUnseen(2) || target.countCards("h") > 0);
		},
		promptfunc: () => "出牌阶段，你可观看一名其他角色的所有暗置武将牌和手牌，然后可以获得其区域内的一张牌。",
		content() {
			player.markAuto("gzzhaosong", ["效果②"]);
			if (target.isUnseen(2)) {
				player.viewCharacter(target, 2);
			}
			if (target.countCards("hej") > 0) {
				player.gainPlayerCard(target, "hej", "visible");
			}
		},
		ai: {
			order: 11,
			result: {
				player(player, target) {
					return get.effect(target, { name: "zhibi" }, player, player) + get.effect(target, { name: "shunshou_copy" }, player, player);
				},
			},
		},
		group: ["gzzhaosong_dying", "gzzhaosong_sha"],
		subSkill: {
			dying: {
				audio: "zhaosong",
				trigger: { global: "dying" },
				logTarget: "player",
				filter(event, player) {
					return !player.getStorage("gzzhaosong").includes("效果①") && event.player.isDying() && event.player.hp <= 0;
				},
				prompt2: "令该角色回复至2点体力并摸一张牌",
				check(event, player) {
					return event.player.isFriendOf(player) && get.attitude(player, event.player) > 0;
				},
				content() {
					player.markAuto("gzzhaosong", ["效果①"]);
					var target = trigger.player,
						num = 2 - target.hp;
					if (num > 0) {
						target.recover(num);
					}
					target.draw();
				},
			},
			sha: {
				audio: "zhaosong",
				trigger: { global: "useCard2" },
				direct: true,
				filter(event, player) {
					if (event.card.name != "sha" || player.getStorage("gzzhaosong").includes("效果③")) {
						return false;
					}
					return game.hasPlayer(function (current) {
						return !event.targets.includes(current) && lib.filter.filterTarget(event.card, event.player, current);
					});
				},
				content() {
					"step 0";
					player
						.chooseTarget([1, 2], get.prompt("gzzhaosong"), "为" + get.translation(trigger.card) + "增加至多两个目标", function (card, player, target) {
							var event = _status.event.getTrigger();
							return !event.targets.includes(target) && lib.filter.filterTarget(event.card, event.player, target);
						})
						.set("ai", function (target) {
							var event = _status.event.getTrigger();
							return get.effect(target, event.card, event.player, _status.event.player);
						})
						.set(
							"goon",
							game.countPlayer(function (current) {
								return !trigger.targets.includes(current) && lib.filter.filterTarget(trigger.card, trigger.player, current) && get.effect(current, trigger.card, trigger.player, player) > 0;
							}) >=
							Math.min(
								2,
								game.countPlayer(function (current) {
									return !trigger.targets.includes(current) && lib.filter.filterTarget(trigger.card, trigger.player, current);
								})
							)
						)
						.setHiddenSkill("gzzhaosong_sha");
					"step 1";
					if (result.bool) {
						if (!event.isMine() && !event.isOnline()) {
							game.delayx();
						}
					} else {
						event.finish();
					}
					"step 2";
					var targets = result.targets;
					player.markAuto("gzzhaosong", ["效果③"]);
					player.logSkill("gzzhaosong_sha", targets);
					trigger.targets.addArray(targets);
				},
			},
		},
	},
	gzlisi: {
		audio: "lisi",
		trigger: { global: "dieAfter" },
		filter(event, player) {
			return event.player.isFriendOf(player) && player.getStorage("gzzhaosong").length > 0;
		},
		direct: true,
		content() {
			"step 0";
			var list = player.getStorage("gzzhaosong").slice(0);
			list.push("cancel2");
			player.chooseControl(list).set("prompt", get.prompt("gzlisi")).set("prompt2", "恢复〖诏颂〗的一个已发动的选项");
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill("gzlisi");
				player.unmarkAuto("gzzhaosong", [result.control]);
			}
		},
	},
	//杨艳
	gzxuanbei: {
		audio: "xuanbei",
		trigger: { player: "showCharacterAfter" },
		filter(event, player) {
			return (
				!player.storage.gzxuanbei &&
				event.toShow.some(name => {
					return get.character(name, 3).includes("gzxuanbei");
				})
			);
		},
		forced: true,
		locked: false,
		content() {
			"step 0";
			player.storage.gzxuanbei = true;
			var cards = [];
			while (cards.length < 2) {
				var card = get.cardPile2(function (card) {
					if (cards.includes(card)) {
						return false;
					}
					return card.hasTag("lianheng") || get.is.yingbian(card);
				});
				if (!card) {
					break;
				} else {
					cards.push(card);
				}
			}
			if (cards.length) {
				player.gain(cards, "gain2");
			}
			if (cards.length < 2) {
				player.draw(2 - cards.length);
			}
			"step 1";
			player.addTempSkill("gzxuanbei_effect");
		},
		group: "gzxuanbei_change",
		subSkill: {
			effect: {
				trigger: { player: "useCard" },
				forced: true,
				popup: false,
				charlotte: true,
				filter(event, player) {
					return get.cardtag(event.card, "lianheng");
				},
				content() {
					player.draw();
				},
				ai: { forceYingbian: true },
				mark: true,
				intro: { content: "使用应变牌时直接获得强化，使用合纵牌时摸一张牌。" },
			},
			change: {
				audio: "xuanbei",
				trigger: { player: "die" },
				direct: true,
				forceDie: true,
				skillAnimation: true,
				animationColor: "thunder",
				content() {
					"step 0";
					player
						.chooseTarget(get.prompt("gzxuanbei"), "令一名其他角色变更副将", lib.filter.notMe)
						.set("forceDie", true)
						.set("ai", function (target) {
							var player = _status.event.player;
							var rank = get.guozhanRank(target.name2, target) <= 3;
							var att = get.attitude(player, target);
							if (att > 0) {
								return (4 - rank) * att;
							}
							return -(rank - 6) * att;
						});
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.logSkill("gzxuanbei_change", target);
						game.delayx();
						target.changeVice();
					}
				},
			},
		},
	},
	//司马师
	gzyimie: {
		audio: "yimie",
		inherit: "yimie",
		mainSkill: true,
		init(player) {
			if (player.checkMainSkill("gzyimie")) {
				player.removeMaxHp(2);
			}
		},
	},
	gztairan: {
		audio: "tairan",
		trigger: { player: "phaseUseBegin" },
		check(event, player) {
			return (
				player.isDamaged() &&
				player.hasCard(function (card) {
					return 5.5 - get.value(card);
				}, "he")
			);
		},
		content() {
			"step 0";
			var list = [],
				num = 0;
			if (
				player.isHealthy() ||
				!player.hasCard(function (card) {
					return lib.filter.cardDiscardable(card, player, "gztairan");
				}, "he")
			) {
				num = 1;
			}
			event.num = num;
			for (var i = num; i <= player.hp; i++) {
				list.push(i + "点");
			}
			player.chooseControl(list).set("prompt", "###请先失去任意点体力###此回合结束时，你将恢复等量的体力");
			"step 1";
			var num1 = result.index + num;
			event.num1 = num1;
			if (num1 > 0) {
				player.loseHp(num1);
			}
			"step 2";
			if (
				player.isDamaged() &&
				player.hasCard(function (card) {
					return lib.filter.cardDiscardable(card, player, "gztairan");
				}, "he")
			) {
				var next = player.chooseToDiscard("he", [1, player.getDamagedHp()], "然后请弃置任意张牌", "此回合结束时，你将摸等量的牌。").set("ai", function (card) {
					return 5.5 - get.value(card);
				});
				if (event.num1 == 0) {
					next.set("forced", true);
				}
			}
			"step 3";
			var num2 = 0;
			if (result.bool) {
				num2 = result.cards.length;
			}
			var storage = [event.num1, num2];
			player.addTempSkill("gztairan_effect");
			player.storage.gztairan_effect = storage;
		},
		subSkill: {
			effect: {
				audio: "tairan",
				trigger: { player: "phaseEnd" },
				filter(event, player) {
					var storage = player.storage.gztairan_effect;
					return storage && storage.length == 2 && (storage[1] > 0 || player.isDamaged());
				},
				forced: true,
				charlotte: true,
				onremove: true,
				content() {
					var storage = player.storage.gztairan_effect;
					if (storage[0] > 0) {
						player.recover(storage[0]);
					}
					if (storage[1] > 0) {
						player.draw(storage[1]);
					}
				},
			},
		},
	},
	//杜预
	gzsanchen: {
		audio: "sanchen",
		enable: "phaseUse",
		filter(event, player) {
			var stat = player.getStat("sanchen");
			return game.hasPlayer(function (current) {
				return !stat || !stat.includes(current);
			});
		},
		filterTarget(card, player, target) {
			var stat = player.getStat("sanchen");
			return !stat || !stat.includes(target);
		},
		usable: 1,
		content() {
			"step 0";
			if (!player._fakesanchen) {
				player._fakesanchen = true;
				player.when({ global: "phaseAfter" }).then(() => {
					delete player._fakesanchen;
					if (player.hasMark("gzsanchen")) {
						player.removeMark("gzsanchen", player.countMark("gzsanchen"), false);
					}
				});
			}
			var stat = player.getStat();
			if (!stat.sanchen) {
				stat.sanchen = [];
			}
			stat.sanchen.push(target);
			target.draw(3);
			"step 1";
			if (!target.countCards("he")) {
				event.finish();
			} else {
				target.chooseToDiscard("he", true, 3).set("ai", function (card) {
					var list = ui.selected.cards.map(function (i) {
						return get.type2(i);
					});
					if (!list.includes(get.type2(card))) {
						return 7 - get.value(card);
					}
					return -get.value(card);
				});
			}
			"step 2";
			if (result.bool && result.cards && result.cards.length) {
				var list = [];
				for (var i of result.cards) {
					list.add(get.type2(i));
				}
				if (list.length == result.cards.length) {
					target.draw();
					player.getStat("skill").gzsanchen--;
					player.addMark("gzsanchen", 1, false);
				}
			} else {
				target.draw();
				player.getStat("skill").gzsanchen--;
				player.addMark("gzsanchen", 1, false);
			}
		},
		ai: {
			order: 9,
			threaten: 1.7,
			result: {
				target(player, target) {
					if (target.hasSkillTag("nogain")) {
						return 0.1;
					}
					return Math.sqrt(target.countCards("he"));
				},
			},
		},
		marktext: "陈",
		intro: {
			name2: "陈",
			content: "mark",
		},
	},
	gzpozhu: {
		audio: "pozhu",
		enable: "phaseUse",
		mainSkill: true,
		init(player) {
			if (player.checkMainSkill("gzpozhu")) {
				player.removeMaxHp();
			}
		},
		viewAsFilter(player) {
			return player.countMark("gzsanchen") > 0 && player.countCards("hs") > 0;
		},
		viewAs: { name: "chuqibuyi" },
		filterCard: true,
		position: "hs",
		check(card) {
			return 7 - get.value(card);
		},
		onuse(result, player) {
			player.removeMark("gzsanchen", 1, false);
		},
	},
	//钟琰
	gzbolan: {
		audio: "bolan",
		global: "gzbolan_global",
		enable: "phaseUse",
		usable: 1,
		content() {
			"step 0";
			if ((event.num && event.num > 0) || !_status.characterlist.length) {
				event.finish();
				return;
			}
			var character = _status.characterlist.randomGet();
			var groups,
				double = get.is.double(character, true);
			if (double) {
				groups = double.slice(0);
			} else {
				groups = [lib.character[character][1]];
			}
			event.groups = groups;
			event.videoId = lib.status.videoId++;
			game.broadcastAll(
				function (player, id, character) {
					ui.create.dialog(get.translation(player) + "发动了【博览】", [[character], "character"]).videoId = id;
				},
				player,
				event.videoId,
				character
			);
			game.delay(3);
			"step 1";
			game.broadcastAll("closeDialog", event.videoId);
			var list1 = ["wei", "shu", "wu", "qun", "jin"],
				list2 = ["gz_qice", "tiaoxin", "gz_zhiheng", "new_chuli", "gzsanchen"];
			var skills = [];
			for (var i = 0; i < list1.length; i++) {
				if (event.groups.includes(list1[i])) {
					skills.push(list2[i]);
				}
			}
			if (!skills.length) {
				event.finish();
			} else if (skills.length == 1) {
				event._result = { control: skills[0] };
			} else {
				player.chooseControl(skills).set("prompt", "选择获得一个技能直到回合结束");
			}
			"step 2";
			var skill = result.control;
			player.addTempSkills(skill);
			player.popup(skill);
		},
		derivation: ["gz_qice", "tiaoxin", "gz_zhiheng", "new_chuli", "gzsanchen"],
		ai: {
			order: 10,
			result: { player: 1 },
		},
		subSkill: {
			global: {
				inherit: "gzbolan",
				filter(event, player) {
					return (
						!player.hasSkill("gzbolan", true) &&
						game.hasPlayer(function (current) {
							return current != player && current.hasSkill("gzbolan");
						})
					);
				},
				selectTarget: -1,
				filterTarget(card, player, target) {
					return target != player && target.hasSkill("gzbolan");
				},
				contentAfter() {
					player.loseHp();
				},
				ai: {
					order: 10,
					result: {
						player(player, target) {
							if (get.effect(player, { name: "losehp" }, player, player) > 0) {
								return 3;
							}
							if (player.isHealthy()) {
								return 1;
							}
							return -1;
						},
					},
				},
			},
		},
	},
	//司马昭
	gzchoufa: {
		audio: "choufa",
		inherit: "choufa",
		content() {
			"step 0";
			player.choosePlayerCard(target, "h", true);
			"step 1";
			player.showCards(result.cards, get.translation(player) + "对" + get.translation(target) + "发动了【筹伐】");
			var type = get.type2(result.cards[0], target),
				hs = target.getCards("h", function (card) {
					return card != result.cards[0] && get.type2(card, target) != type;
				});
			if (hs.length) {
				target.addGaintag(hs, "xinchoufa");
				target.addTempSkill("xinchoufa2");
			}
		},
	},
	//张春华
	gzhuishi: {
		audio: "huishi",
		trigger: { player: "phaseDrawBegin1" },
		filter(event, player) {
			return ui.discardPile.childNodes.length > 0;
		},
		preHidden: true,
		prompt() {
			return get.prompt("huishi") + "（可观看牌数：" + lib.skill.gzhuishi.getNum() + "）";
		},
		check(event, player) {
			return lib.skill.gzhuishi.getNum() > 3;
		},
		getNum() {
			var list = [];
			list.push(ui.discardPile.lastChild);
			if (list[0].previousSibling) {
				list.push(list[0].previousSibling);
			}
			var num = 0;
			for (var i of list) {
				var name = get.translation(i.name);
				if (name == "挟令") {
					name = "挟天子以令诸侯";
				}
				num += name.length;
			}
			return num;
		},
		content() {
			"step 0";
			trigger.changeToZero();
			var cards = game.cardsGotoOrdering(get.cards(lib.skill.gzhuishi.getNum())).cards;
			var num = Math.ceil(cards.length / 2);
			var next = player.chooseToMove("慧识：将" + get.cnNumber(num) + "张牌置于牌堆底并获得其余的牌", true);
			next.set("list", [["牌堆顶的展示牌", cards], ["牌堆底"]]);
			next.set("filterMove", function (from, to, moved) {
				if (moved[0].includes(from) && to == 1) {
					return moved[1].length < _status.event.num;
				}
				return true;
			});
			next.set("filterOk", function (moved) {
				return moved[1].length == _status.event.num;
			});
			next.set("num", num);
			next.set("processAI", function (list) {
				var cards = list[0][1].slice(0).sort(function (a, b) {
					return get.value(b) - get.useful(a);
				});
				return [cards, cards.splice(cards.length - _status.event.num)];
			});
			"step 1";
			if (result.bool) {
				var list = result.moved;
				if (list[0].length) {
					player.gain(list[0], "gain2");
				}
				while (list[1].length) {
					ui.cardPile.appendChild(list[1].shift().fix());
				}
			}
		},
	},
	gzqingleng: {
		audio: 2,
		trigger: { global: "phaseEnd" },
		direct: true,
		preHidden: true,
		filter(event, player) {
			var target = event.player;
			return target != player && target.isIn() && target.isUnseen(2) && player.countCards("he") > 0 && player.canUse({ name: "sha", nature: "ice" }, target, false);
		},
		content() {
			"step 0";
			player
				.chooseCard("he", get.prompt("gzqingleng", trigger.player), "将一张牌当做冰【杀】对其使用", function (card, player) {
					return player.canUse(get.autoViewAs({ name: "sha", nature: "ice" }, [card]), _status.event.target, false);
				})
				.set("target", trigger.player)
				.set("ai", function (card) {
					if (get.effect(_status.event.target, get.autoViewAs({ name: "sha", nature: "ice" }, [card]), player) <= 0) {
						return false;
					}
					return 6 - get.value(card);
				})
				.setHiddenSkill(event.name);
			"step 1";
			if (result.bool) {
				player.useCard(get.autoViewAs({ name: "sha", nature: "ice" }, result.cards), result.cards, false, trigger.player, "gzqingleng");
				if (trigger.player.isUnseen()) {
					player.draw();
				}
			}
		},
	},
	//司马懿
	gzquanbian: {
		audio: "quanbian",
		preHidden: true,
		trigger: { player: ["useCard", "respond"] },
		filter(event, player) {
			if (player.hasSkill("gzquanbian_blocker")) {
				return false;
			}
			var phase = event.getParent("phaseUse");
			if (!phase || phase.player != player) {
				return false;
			}
			var suit = get.suit(event.card);
			if (!lib.suit.includes(suit) || !lib.skill.quanbian.hasHand(event)) {
				return false;
			}
			return (
				player.getHistory("useCard", function (evt) {
					return evt != event && get.suit(evt.card) == suit && lib.skill.quanbian.hasHand(evt) && evt.getParent("phaseUse") == phase;
				}).length +
				player.getHistory("respond", function (evt) {
					return evt != event && get.suit(evt.card) == suit && lib.skill.quanbian.hasHand(evt) && evt.getParent("phaseUse") == phase;
				}).length ==
				0
			);
		},
		content() {
			"step 0";
			var cards = get.cards(player.maxHp);
			for (var i = cards.length - 1; i >= 0; i--) {
				ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
			}
			game.updateRoundNumber();
			player.chooseButton(["权变：选择获得一张牌", cards], true).set("ai", function (button) {
				var player = _status.event.player,
					card = button.link;
				var suit = get.suit(card, false),
					val = get.value(card);
				if (
					player.hasHistory("useCard", function (evt) {
						return get.suit(evt.card, false) == suit;
					}) ||
					player.hasHistory("respond", function (evt) {
						return get.suit(evt.card, false) == suit;
					})
				) {
					return val;
				}
				return val + 8;
			});
			"step 1";
			if (result.bool) {
				var card = result.links[0];
				player.gain(card, "gain2");
				var suit = get.suit(card, false);
				if (
					player.hasHistory("useCard", function (evt) {
						return get.suit(evt.card, false) == suit;
					}) ||
					player.hasHistory("respond", function (evt) {
						return get.suit(evt.card, false) == suit;
					})
				) {
					player.addTempSkill("gzquanbian_blocker");
				}
			}
		},
		subSkill: { blocker: { charlotte: true } },
	},
	gzzhuosheng: {
		audio: "zhuosheng",
		trigger: { global: "damageEnd" },
		logTarget: "player",
		filter(event, player) {
			return event.player.isFriendOf(player);
		},
		preHidden: true,
		content() {
			var target = trigger.player;
			target.addTempSkill("gzzhuosheng2", { player: "phaseJieshuBegin" });
			target.draw().gaintag = ["gzzhuosheng2"];
		},
	},
	gzzhuosheng2: {
		onremove(player, skill) {
			player.removeGaintag(skill);
		},
		mod: {
			targetInRange(card, player, target) {
				if (!card.cards || get.type(card) != "basic") {
					return;
				}
				for (var i of card.cards) {
					if (i.hasGaintag("gzzhuosheng2")) {
						return game.online ? player == _status.currentPhase : player.isPhaseUsing();
					}
				}
			},
			cardUsable(card, player, target) {
				if (!card.cards || get.type(card) != "basic" || !(game.online ? player == _status.currentPhase : player.isPhaseUsing())) {
					return;
				}
				for (var i of card.cards) {
					if (i.hasGaintag("gzzhuosheng2")) {
						return Infinity;
					}
				}
			},
			aiOrder(player, card, num) {
				if (get.itemtype(card) == "card" && card.hasGaintag("gzzhuosheng2") && get.type(card) == "basic") {
					return num - 0.1;
				}
			},
		},
		audio: "zhuosheng",
		trigger: { player: "useCard2" },
		direct: true,
		filterx(event, player) {
			if (!player.isPhaseUsing()) {
				return false;
			}
			return (
				player.getHistory("lose", function (evt) {
					if ((evt.relatedEvent || evt.getParent()) != event) {
						return false;
					}
					for (var i in evt.gaintag_map) {
						if (evt.gaintag_map[i].includes("gzzhuosheng2")) {
							return true;
						}
					}
					return false;
				}).length > 0
			);
		},
		filter(event, player) {
			if (!lib.skill.gzzhuosheng2.filterx(event, player)) {
				return false;
			}
			if (get.type(event.card) != "trick") {
				return false;
			}
			if (event.targets && event.targets.length > 0) {
				return true;
			}
			var info = get.info(event.card);
			if (info.allowMultiple == false) {
				return false;
			}
			if (event.targets && !info.multitarget) {
				if (
					game.hasPlayer(function (current) {
						return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
					})
				) {
					return true;
				}
			}
			return false;
		},
		content() {
			"step 0";
			var prompt2 = "为" + get.translation(trigger.card) + "增加或减少一个目标";
			player
				.chooseTarget(get.prompt("gzzhuosheng2"), function (card, player, target) {
					var player = _status.event.player;
					if (_status.event.targets.includes(target)) {
						return true;
					}
					return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
				})
				.set("prompt2", prompt2)
				.set("ai", function (target) {
					var trigger = _status.event.getTrigger();
					var player = _status.event.player;
					return get.effect(target, trigger.card, player, player) * (_status.event.targets.includes(target) ? -1 : 1);
				})
				.set("targets", trigger.targets)
				.set("card", trigger.card);
			"step 1";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) {
					game.delayx();
				}
				event.targets = result.targets;
			} else {
				event.finish();
			}
			"step 2";
			if (event.targets) {
				player.logSkill("gzzhuosheng2", event.targets);
				if (trigger.targets.includes(event.targets[0])) {
					trigger.targets.removeArray(event.targets);
				} else {
					trigger.targets.addArray(event.targets);
				}
			}
		},
		group: ["gzzhuosheng2_equip", "gzzhuosheng2_silent"],
		subSkill: {
			equip: {
				audio: "zhuosheng",
				trigger: { player: "useCard" },
				filter(event, player) {
					return get.type(event.card) == "equip" && lib.skill.gzzhuosheng2.filterx(event, player);
				},
				prompt: "是否发动【擢升】摸一张牌？",
				content() {
					player.draw();
				},
			},
			silent: {
				trigger: {
					player: "useCard1",
				},
				silent: true,
				firstDo: true,
				filter(event, player) {
					return get.type(event.card) == "basic" && lib.skill.gzzhuosheng2.filterx(event, player) && event.addCount !== false;
				},
				content() {
					trigger.addCount = false;
					var stat = player.getStat();
					if (stat && stat.card && stat.card[trigger.card.name]) {
						stat.card[trigger.card.name]--;
					}
				},
			},
		},
	},
	        "gz_yundao": {
    audio: 4,
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
    audio: 2,
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
  audio: 4,
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
                audio: 6,
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
    audio: 2,
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
                audio: 2,
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
    audio: 2,
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
    audio: 2,
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
                audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
                audio: 2,
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
    audio: 3,
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
                audio: 3,
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
                audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 3,
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
    audio: 3,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 4,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
	audio: 2,
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
	audio: 2,
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
    audio: 2,
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
    audio: 2,
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
    audio: 2,
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
	audio: 2,
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
    audio: 2,
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
	audio: 2,
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
    audio: 2,
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
	audio: 2,
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
	audio: 2,
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
	audio: 2,
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




};
