local extension = Package:new("tianzong_cards", Package.CardPack)
extension.extensionName = "tianzong"


-- 先加载技能骨架
extension:loadSkillSkelsByPath("./packages/tianzong/pkg/tianzong_cards/skills")

-- 定义卡牌
local chixuanjian = fk.CreateCard{
  name = "tianzong_chixuanjian",
  type = Card.TypeEquip,
  sub_type = Card.SubtypeWeapon,  -- 注意这里是 sub_type 不是 subtype
  attack_range = 3,  -- 直接在这里设置范围
  equip_skill = "#tianzong_chixuanjian_skill",  -- 注意这里是 equip_skill 不是 skill
}

-- 添加卡牌规格
extension:addCardSpec("tianzong_chixuanjian", Card.Spade, 9)

-- 最后才加载卡牌
extension:loadCardSkels{
  chixuanjian,
}

Fk:loadTranslationTable{
  ["tianzong_chixuanjian"] = "炽·玄剑",
  [":tianzong_chixuanjian"] = "装备牌·武器<br/><b>攻击范围</b>：3 <br/><b>武器技能</b>：①你可以将一种花色的任意张牌或一张非【炽·玄剑】的装备牌当作任意一种【杀】使用或打出；<br>②当你因使用的【杀】进入弃牌堆时，若此【杀】对应的实体牌花色均相同，你摸此【杀】实体牌张牌（至多为三）。",
  ["tianzong"] = "天纵崇壑",
  ["tianzong_cards"] = "天纵卡牌",
}

return extension
