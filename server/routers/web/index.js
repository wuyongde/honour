// 手机端web相关路由
const express = require("express");
const router = express.Router();

// 引入数据模型
let advertsModel = require("../../models/advertsModel");
let articlesModel = require("../../models/articlesModel");
let categoriesModel = require("../../models/categoriesModel");
let goodsModel = require("../../models/goodsModel");
let herosModel = require("../../models/herosModel");
let videosModel = require('../../models/videosModel')

//新闻资讯相关数据初始化--仅限从官网抓取数据用
router.get("/news/init", async (req, res) => {
  // 从官网抓取的数据：文章标题列表！
  let articles = [
    "周年庆QQ音乐专区上线，限免领取定制主题",
    "周年狂欢不孤单 快手主播邀你瓜分亿万流量",
    "来，左边跟我一起变大龙，右边挂一个灯笼~",
    "斗鱼王者模拟战流派攻略大赛，分享你的棋圣之路",
    "千灯盛会如约而至 ，七城亮灯，与你共赏~",
    "10月23日全服不停机更新公告",
    "10月23日体验服停机更新公告",
    "【已开服】10月17日正式服“四周岁特别版本”更新公告",
    "【修复中】关于部分榜单排名异常问题公告说明",
    "2019周年庆限定皮肤返场投票结果公告",
    "限定皮肤返场投票开启公告及FAQ",
    "周年庆典 送限定皮肤",
    "【回顾王者独家记忆 领专属局内称号】活动公告",
    "变身大作战——限时玩法开启，唤起你的回忆！",
    "王者四周岁庆典10.26开启 8大福利邀你来庆生",
    "高校区域联赛今日开启报名，海选赛首周号角同时吹响！",
    "【KPL今日预报】RNG.M vs EDG.M，双M大战再度来袭",
    "你是赛评师：DYG.JC奇招哪吒难阻QG进入季后赛，新版本下KPL更精彩吗？",
    "【简讯】QGhappy成为2019年KPL秋季赛第二支锁定季后赛资格队伍",
    "10月21日【比赛服】版本更新公告"
  ];
  // 从数据库中查询父级分类为新闻资讯的子分类
  let categories = await categoriesModel
    .find({ parent: "5dab45ce9265ba7350670065" })
    .lean();

  // 循环articlesTitles数组，组成新数组---要插入的文章列表
  articles = articles.map(title => {
    // 每次循环时，随机取2个分类
    let randomIndex1 = Math.floor(Math.random() * categories.length); // 0-3
    let randomIndex2 =
      randomIndex1 === categories.length - 1
        ? randomIndex1 - 1
        : randomIndex1 + 1;
    return {
      categories: [categories[randomIndex1]._id, categories[randomIndex2]._id],
      title: title,
      content: ""
    };
  });

  // 写入前先清空数据表
  await articlesModel.deleteMany(); //异步操作一定要前面加 await
  // 再写入数据库
  await articlesModel.insertMany(articles); //异步操作一定要前面加 await

  res.send(articles);
});
// 英雄数据初始化--
router.get("/heros/init", async (req, res) => {
  // 原始数据
  let heros = [
    {
      name: "战士",
      _id: "5daaea1a5dbfe76ec732da4c",
      herosList: [
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg",
          name: "赵云"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg",
          name: "墨子"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg",
          name: "钟无艳"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg",
          name: "吕布"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg",
          name: "夏侯惇"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg",
          name: "曹操"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg",
          name: "典韦"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg",
          name: "宫本武藏"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg",
          name: "达摩"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg",
          name: "老夫子"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg",
          name: "关羽"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg",
          name: "程咬金"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg",
          name: "露娜"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg",
          name: "花木兰"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg",
          name: "橘右京"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg",
          name: "亚瑟"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg",
          name: "孙悟空"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg",
          name: "刘备"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg",
          name: "钟馗"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg",
          name: "杨戬"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg",
          name: "雅典娜"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg",
          name: "哪吒"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg",
          name: "铠"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg",
          name: "苏烈"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg",
          name: "裴擒虎"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg",
          name: "狂铁"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg",
          name: "孙策"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg",
          name: "李信"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg",
          name: "盘古"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg",
          name: "云中君"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg",
          name: "曜"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg",
          name: "马超"
        }
      ]
    },
    {
      name: "法师",
      _id: "5daaea235dbfe76ec732da4d",
      herosList: [
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg",
          name: "小乔"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg",
          name: "墨子"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg",
          name: "妲己"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg",
          name: "嬴政"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg",
          name: "高渐离"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg",
          name: "孙膑"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg",
          name: "扁鹊"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg",
          name: "芈月"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg",
          name: "周瑜"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg",
          name: "甄姬"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg",
          name: "武则天"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg",
          name: "貂蝉"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg",
          name: "安琪拉"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg",
          name: "露娜"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg",
          name: "姜子牙"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg",
          name: "王昭君"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg",
          name: "张良"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg",
          name: "不知火舞"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg",
          name: "钟馗"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg",
          name: "诸葛亮"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg",
          name: "干将莫邪"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg",
          name: "女娲"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg",
          name: "杨玉环"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg",
          name: "弈星"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg",
          name: "米莱狄"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg",
          name: "司马懿"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg",
          name: "沈梦溪"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg",
          name: "上官婉儿"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg",
          name: "嫦娥"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg",
          name: "西施"
        }
      ]
    },
    {
      name: "坦克",
      _id: "5daaea2d5dbfe76ec732da4e",
      herosList: [
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg",
          name: "廉颇"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg",
          name: "庄周"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg",
          name: "刘禅"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg",
          name: "钟无艳"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg",
          name: "白起"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg",
          name: "芈月"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg",
          name: "吕布"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg",
          name: "夏侯惇"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg",
          name: "达摩"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg",
          name: "项羽"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg",
          name: "程咬金"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg",
          name: "刘邦"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg",
          name: "亚瑟"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg",
          name: "牛魔"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg",
          name: "张飞"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg",
          name: "太乙真人"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg",
          name: "东皇太一"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg",
          name: "铠"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg",
          name: "苏烈"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg",
          name: "梦奇"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg",
          name: "孙策"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg",
          name: "嫦娥"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg",
          name: "猪八戒"
        }
      ]
    },
    {
      name: "刺客",
      _id: "5daaea335dbfe76ec732da4f",
      herosList: [
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg",
          name: "赵云"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg",
          name: "阿轲"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg",
          name: "李白"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg",
          name: "貂蝉"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg",
          name: "韩信"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg",
          name: "兰陵王"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg",
          name: "花木兰"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg",
          name: "不知火舞"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg",
          name: "娜可露露"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg",
          name: "橘右京"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg",
          name: "孙悟空"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg",
          name: "百里守约"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg",
          name: "百里玄策"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg",
          name: "裴擒虎"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg",
          name: "元歌"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg",
          name: "司马懿"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg",
          name: "上官婉儿"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg",
          name: "云中君"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg",
          name: "马超"
        }
      ]
    },
    {
      name: "射手",
      _id: "5daaea395dbfe76ec732da50",
      herosList: [
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg",
          name: "孙尚香"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg",
          name: "鲁班七号"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg",
          name: "马可波罗"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg",
          name: "狄仁杰"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg",
          name: "后羿"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg",
          name: "李元芳"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg",
          name: "虞姬"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg",
          name: "成吉思汗"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg",
          name: "黄忠"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg",
          name: "百里守约"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg",
          name: "公孙离"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg",
          name: "伽罗"
        }
      ]
    },
    {
      name: "辅助",
      _id: "5daaea465dbfe76ec732da51",
      herosList: [
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg",
          name: "庄周"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg",
          name: "刘禅"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg",
          name: "孙膑"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg",
          name: "姜子牙"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg",
          name: "牛魔"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg",
          name: "张飞"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg",
          name: "蔡文姬"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg",
          name: "太乙真人"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg",
          name: "大乔"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg",
          name: "鬼谷子"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg",
          name: "明世隐"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg",
          name: "杨玉环"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg",
          name: "盾山"
        },
        {
          icon:
            "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg",
          name: "瑶"
        }
      ]
    }
  ];
  // 处理数组
  let herosNew = []; //要写入数据库的英雄列表数组
  heros.forEach(categary => {
    categary.herosList.forEach(hero => {
      hero.categories = [categary._id];
    });
    herosNew.push(...categary.herosList);
  });
  // herosNew数组去重
  let obj = {};
  herosNew.forEach(item => {
    if (obj[item.name]) {
      obj[item.name].categories.push(...item.categories);
    } else {
      obj[item.name] = item;
    }
  });

  let heros1 = [];
  // 重新转换为数组
  for (let key in obj) {
    heros1.push(obj[key]);
  }

  // 写数据库
  // 先清空
  await herosModel.deleteMany();
  // 再写入
  await herosModel.insertMany(heros1);

  res.send(heros1);
});



// web端获取新闻资讯数据
router.get("/news", async (req, res) => {
  // 主要难点是组织客户端需要的数据。。。
  const parent = await categoriesModel.findOne({
    name: "新闻分类"
  });
  const cats = await categoriesModel.aggregate([
    { $match: { parent: parent._id } },
    {
      $lookup: {
        from: "articles",
        localField: "_id",
        foreignField: "categories",
        as: "newsList"
      }
    },
    {
      $addFields: {
        newsList: { $slice: ["$newsList", 5] }
      }
    }
  ]);
  const subCats = cats.map(v => v._id);
  cats.unshift({
    name: "热门",
    newsList: await articlesModel
      .find()
      .where({
        categories: { $in: subCats }
      })
      .populate("categories")
      .limit(5)
      .lean()
  });

  cats.map(cat => {
    cat.newsList.map(news => {
      news.categoryName =
        cat.name === "热门" ? news.categories[0].name : cat.name;
      return news;
    });
    return cat;
  });
  res.send(cats);
});

// web端获取首页顶部轮播图数据
router.get('/top_ads',async (req,res)=>{
  // 查数据库
  let result = await advertsModel.findOne({name:'首页顶部轮播图'})
  // 响应数据
  res.send(result.items)
})

// web端获取英雄列表数据
router.get("/heros", async (req, res) => {
  // 主要难点是组织客户端需要的数据。。。
  const parent = await categoriesModel.findOne({
    name: "英雄分类"
  });
  const cats = await categoriesModel.aggregate([
    { $match: { parent: parent._id } },
    {
      $lookup: {
        from: "heros",
        localField: "_id",
        foreignField: "categories",
        as: "herosList"
      }
    }
  ]);
  const subCats = cats.map(v => v._id);
  cats.unshift({
    name: "热门",
    herosList: await herosModel
      .find()
      .where({
        categories: { $in: subCats }
      })
      .populate("categories")
      .limit(20)
      .lean()
  });

  res.send(cats);
});

// 查询文章详情
router.get('/articles',async (req,res)=>{
  let article = await articlesModel.findById(req.query._id)
  // 组织数据并响应
  // 随机取两篇同类型作为相关文章
  let articles = await articlesModel.find({
    categories:article.categories
  })
  article.related = articles.slice(0,2)
  res.send(article)
})

// 查询英雄详情
router.get('/hero',async (req,res)=>{

  let hero = await herosModel.findById(req.query._id).populate('categories').lean()
  // 组织数据并响应
  res.send(hero)
})


// 查询视频列表数据
router.get('/videos',async (req,res)=>{
  // 判断是查询某一个视频还是视频列表
  let {_id} = req.query
  if(_id){
    // 查某一个视频
    const video = await videosModel.findById(_id)
    // 随机取一些视频做为推荐（猜您喜欢）
    const videos = await videosModel.find()
    video.likes=videos
    return res.send(video)
  }
  // 查视频列表
   // 主要难点是组织客户端需要的数据。。。
   const parent = await categoriesModel.findOne({
    name: "精彩视频"
  });
  const cats = await categoriesModel.aggregate([
    { $match: { parent: parent._id } },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "category",
        as: "videosList"
      }
    }
  ]);
  // 响应
  res.send(cats)
})

// 视频播放次数增加
router.patch('/videos',async (req,res)=>{
  let {_id,playSort} = req.body
  // 写数据库
  const result = await videosModel.findByIdAndUpdate(_id,{playSort})
  res.send({
    code:0,
    msg:'修改成功'
  })
})


module.exports = router;
