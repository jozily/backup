import normal, { sort as normalSort } from "./normal.js";
import zhen, { sort as zhenSort } from "./zhen.js";
import shi, { sort as shiSort } from "./shi.js";
import bian, { sort as bianSort } from "./bian.js";
import quan, { sort as quanSort } from "./quan.js";

export default {
	
                weishilijichuban: [
                    "gz_caocao", "gz_simayi", "gz_xiahoudun", "gz_zhangliao", 
                    "gz_xuzhu", "gz_guojia", "gz_zhenji", "gz_xiahouyuan", 
                    "gz_zhanghe", "gz_xuhuang", "gz_caoren", "gz_dianwei", 
                    "gz_xunyu", "gz_caopi", "gz_yuejin", "gz_re_lidian", 
                    "gz_zangba", "gz_dengai", "gz_caohong", "gz_bianfuren", 
                    "gz_xunyou", "gz_cuimao", "gz_yujin"
                ],
                shushilijichuban: [
                    "gz_liubei", "gz_guanyu", "gz_zhangfei", "gz_zhugeliang", 
                    "gz_zhaoyun", "gz_machao", "gz_huangyueying", "gz_huangzhong", 
                    "gz_weiyan", "gz_pangtong", "gz_sp_zhugeliang", "gz_liushan", 
                    "gz_menghuo", "gz_zhurong", "gz_ganfuren", "gz_madai", 
                    "gz_mifuren", "gz_jiangfei", "gz_jiangwei", "gz_masu", 
                    "gz_shamoke", "gz_wangping", "gz_fazheng"
                ],
                wushilijichuban: [
                    "gz_sunquan", "gz_ganning", "gz_lvmeng", "gz_huanggai", 
                    "gz_zhouyu", "gz_daqiao", "gz_luxun", "gz_sunshangxiang", 
                    "gz_sunjian", "gz_xiaoqiao", "gz_re_taishici", "gz_zhoutai", 
                    "gz_re_lusu", "gz_zhangzhang", "gz_dingfeng", "gz_sunce", 
                    "gz_chendong", "gz_xusheng", "gz_jiangqing", "gz_lingtong", 
                    "gz_lvfan", "gz_wuguotai", "gz_lukang"
                ],
                qunshilijichuban: [
                    "gz_huatuo", "gz_lvbu", "gz_diaochan", "gz_re_yuanshao", 
                    "gz_yanwen", "gz_jiaxu", "gz_pangde", "gz_zhangjiao", 
                    "gz_caiwenji", "gz_mateng", "gz_kongrong", "gz_jiling", 
                    "gz_tianfeng", "gz_panfeng", "gz_zoushi", "gz_sp_dongzhuo", 
                    "gz_zhangren", "gz_hetaihou", "gz_yuji", "gz_liqueguosi", 
                    "gz_zuoci", "gz_yuanshu", "gz_zhangxiu"
                ],
                jinshilijichuban: [
                    "gz_simaliang", "gz_simalun", "gz_jin_guohuai", "gz_wangjun", 
                    "gz_malong", "gz_new_jin_simayi", "gz_new_jin_zhangchunhua",
                    "gz_jin_simashi", "gz_jin_simazhao", "gz_shibao", "gz_jin_yanghuiyu",
                    "gz_jin_wangyuanji", "gz_simazhou", "gz_weiguan", "gz_wenyang", 
                    "gz_bailingyun", "gz_sunxiuu", "gz_yangjun", "gz_wangxiang",
                    "gz_duyu", "gz_zhanghuyuechen", "gz_yanghu", "gz_jin_jiachong","gz_jin_yanghu",
                ],
                fengsuiliaoyuan: ["gz_xuncan", "gz_zhugezhan", "gz_zhanghuai", "gz_yuantan", "gz_jiananfeng","gz_kuaishi","gz_xuwen","gz_feng_maliang","gz_feng_huangyueying","gz_xiahoushi","gz_wangyi","gz_heqi","gz_renwan","gz_bulianshi","gz_gongsunxiu"],
                buchenpian: ["gz_mengda", "gz_liuqi", "gz_mifangfushiren", "gz_zhanglu", "gz_tangzi", "gz_shixie", "gz_xiahouba", "gz_wenqin", "gz_xuyou", "gz_panjun", "gz_pengyang", "gz_xf_sufei", "gz_dongzhao", "gz_wujing", "gz_yanbaihu", "gz_re_xushu", "gz_zhuling", "gz_liuba", "gz_zhugeke", "gz_huangzu"],
                buchenpianjin: ["gz_jue_yangyan", "gz_jue_yangzhi", "gz_shantao", "gz_zhanghua", "gz_lujii", "gz_zhouchu", "gz_peixiu", "gz_zhugejing", "gz_qiaozhou", "gz_huoyi"],
                junzhuwujiang: ["gz_jun_caocao", "gz_jun_sunquan", "gz_jun_liubei", "gz_jun_zhangjiao", "gz_jun_jin_simayi"],
                buchenpianyexinjia: ["gz_zhonghui", "gz_simazhao", "gz_gongsunyuan", "gz_sunchen", "gz_jue_yangjun"],
                guozhan_zongheng: ["gz_huaxin", "gz_luyusheng", "gz_zongyu", "gz_miheng", "gz_fengxi", "gz_dengzhi", "gz_re_xunchen", "gz_dc_yanghu"],
					guozhan_others: [
  "gz_ol_lisu", "gz_mazhong", "gz_bulianshi", "gz_caozhen", "gz_maliang",
  "gz_re_panshu", "gz_tengyin", "gz_xurong", "gz_xianglang", "gz_zumao",
  "gz_zhugejin", "gz_zhouyi", "gz_lingcao", "gz_beimihu", "gz_lvlingqi",
  "gz_yangwan", "gz_chendao", "gz_lifeng", "gz_liaohua", "gz_jianggan",
  "gz_wangyi", "gz_key_ushio", "gz_re_nanhualaoxian", 
  "gz_pk_sp_duyu", "gz_wangling", "gz_wangji", "gz_yanyan", "gz_xin_zhuran",
  "gz_gaoshun", "gz_jin_jiachong", "gz_jin_yanghu", 
  "gz_zhangyao", "gz_caochun", "gz_mizhu", "gz_shichangshi", "gz_yj_zhanghe",
  "gz_gaolan", "gz_caoang", "gz_zhangxingcai", "gz_luzhi", "gz_quyi",
  "gz_caoying", "gz_guansuo", "gz_zhangxuan", "gz_guanyinping", "gz_xinxianying",
  "gz_sp_duyu",
  "gz_xf_huangquan", "gz_guohuai", "gz_guanqiujian", "gz_zhujun", "gz_chengong", "gz_re_xugong",
  "gz_liuyan", "gz_re_xusheng", "gz_ol_sb_sunjian", "gz_re_huanggai", "gz_re_xuzhu", "gz_ol_weiyan", "gz_ol_yanwen",
  "gz_tw_tianyu", "gz_tw_liufuren", "gz_tw_xiahoushang", "gz_fuwan", "gz_old_huaxiong", "gz_yangxiu","gz_jin_simayi","gz_jin_xiahouhui","gz_xinchang","gz_xuangongzhu","gz_yangyan","gz_yangzhi","gz_jin_zhangchunhua","gz_zhongyan","gz_zuofen","gz_jsrg_liuyan","gz_re_lvbu","gz_pot_weiyan","gz_yl_yuanshu","gz_zhugedan","gz_db_wenyang"
],
};
