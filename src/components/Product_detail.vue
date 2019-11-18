<template>
  <div>
    <div class="div-a">
      <div class="dingbu" ref="dingTop">
        <span @click="goProduct"><img src="../assets/zuojiantou1.png"></span>
        <div>
          <div @click="dingCP" ref="chanpin">产品</div>
          <div @click="dingDP" ref="dianping">点评</div>
          <div @click="dingXC" ref="xingcheng">行程</div>
          <div @click="dingTJ" ref="tuijian">推荐</div>
        </div>
      </div>
      <div class="a1-lb">
        <div v-if="crvid" class="a1-video">
          <video id="ww1" :src="utilUrl+'img/'+ crvid" controls :style="dis"></video>
          <div class="vi-1" :style="dis">
            <span class="vi-2"><img src="../assets/luxiang.png"></span>
            <span> | </span>
            <span class="vi-3"><img @click="zxc" src="../assets/zhaopian.png"></span>
          </div>
        </div>
        <div>
          <van-swipe :autoplay="5000" indicatomp-color="white" :show-indicators="false">
            <van-swipe-item   v-for="(img,i) of crImg" :key="i">
              <div class="a2-lun">
                <div v-if="i==0 && crvid!=''" class="qwe-1"><img src="../assets/bofang.png" @click="asd"></div>
                <img  class="swipe-image" :src="utilUrl+'img/'+ img">
            </div>
            <div class="a2-txt1"><span>{{i+1}}</span></div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="fanhui" @click="goProduct"><img src="../assets/zuojiantou.png"></div>
        <div class="a2-txt2"><span><img src="../assets/zhaopian.png">{{"/"+crImg.length}}</span></div>
      </div>
      <weather :cname="cname"></weather>  
      <div class="div-a1">
        <span class="dc_1">
          <dfn>￥</dfn>
          <span class="sp-1">{{getDetails.price}}</span> 
          <em>/人起</em>
          <span class="sp-2"><img src="../assets/tour07.png"></span>
        </span>
        <span class="dc_2">{{getDetails.grade}}分</span>
        <span class="dc_3">145人出游</span>
      </div>
      <div class="div-a2">
        <h2>{{getDetails.title}}</h2>
        <p>{{getDetails.subtitle}}</p>
        <div>
          <span>私汤</span>
          <span>登山</span>
        </div>
      </div>
      <div class="div-a3">
        <div class="qw-1" @click="onSelect">
          <p>
            <span>领券</span>
            <span>满50000减1000</span>
            <span>满25000减500</span>
            <span class="we-1"> > </span>
          </p>
        </div>
        <div class="qw-2" @click="onSelect1">
          <p>
            <span>优惠</span>
            <span>最少可得49积分</span>
            <span class="we-1"> > </span>
          </p>
        </div>
        <div class="qw-3">
          <van-action-sheet v-model="show1" title="优惠券">
          <div class="we-2">
            <div>
              <p>平台券</p>
               <div v-for="(item,i) of list" :key="i">
                <div>
                  <div class="as-1">
                    <div>
                      <p class="p1">
                        <span>￥</span>{{list[i].qwe}}
                      </p>
                      <p class="p2">满{{list[i].asd}}元可用</p>
                    </div>
                  </div>
                  <div class="as-2">
                    <p><span>携程满减券</span>跟团游{{list[i].qwe}}元满减券</p>
                    <p>2019-09-29 00:00 至 2019-10-31 23:59</p>
                    <p>
                      使用说明
                      <span class="iconfont icon-fanhui"></span>
                    </p>
                    <span @click="lingqu($event)">领取</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </van-action-sheet>
          <van-action-sheet v-model="show2" title="优惠">
          <div class="we-3">
            <h3>积分</h3>
            <p>最少可得49积分</p>
          </div>
          </van-action-sheet>
        </div>
      </div>
      <div class="div-a4">
        <div>
          <span class="iconfont icon-zuobiao"></span>
          <span>西安出发</span>
        </div>
        <div class="dv-1">
            <a href="javascript:;">
              <span>10/18(五)</span>
              <span>￥1088</span>
            </a>
            <a href="javascript:;">
              <span>10/20(日)</span>
              <span>￥1088</span>
            </a>
            <a href="javascript:;">
              <span>10/23(三)</span>
              <span>￥1088</span>
            </a>
            <a href="javascript:;">
              <span>10/25(五)</span>
              <span>￥1088</span>
            </a>
            <a href="javascript:;">
              <p>更多</p>
              <p>班期</p>
            </a>
        </div>
      </div>
      <div class="div-a5">
        <div>
          <span class="iconfont icon-shu"></span>
          <p>行程概要</p>
        </div>
        <div class="qe-1">
          <div>
            <span class="iconfont icon-jiudian"></span>
            <p>1晚4钻</p>
          </div>
          <div>
            <span class="iconfont icon-zuobiao"></span>
            <p>8个景点，含7个经典景点（西安城墙，请始皇兵马俑博物馆，华山，西峰，南峰，东峰（朝阳峰），北峰）</p>
          </div>
          <div>
            <span class="iconfont icon-canju"></span>
            <p>含1早餐 2午餐 1晚餐，2次自理</p>
          </div>
          <div>
            <span class="iconfont icon-jiudian"></span>
            <p>2次自由活动·约1小时</p>
          </div>
        </div>
      </div>
      <div class="div-a6">
        <div>
          <div class="ad-1">
            <span class="iconfont icon-duanxin_o"></span>
            <span>评分4.6/5</span>
            <span>好评率88.2%</span>
            <p @click="comment()">
              <span>查看全部</span>
              <span class="we-1"> > </span>
            </p>
          </div>
          <div class="ad-2">
              <span>导游服务好(5)</span>
              <span>导游讲解详细(3)</span>
              <span>行程棒(3)</span>
              <span>团餐赞(2)</span>
              <span>酒店赞(2)</span>
          </div>
        </div>
        <div>
          <div class="ad-3">
            <h4>
              <img src="../assets/detail-02.png">35****6785
              <span>其他出游</span>  
              <span>2019-09-08</span>  
            </h4>
            <div>行程非常的榜，携程5钻吃住都不错，感谢申导游一路的安排。华山很美，一定要在山下住一晚，第二天才够时间尽情游览，下次还报携程</div>
          </div>
          <div class="ad-4">
            <div>
              <ul>
                <li v-for="(lis,i) of ykimg" :key="i">
                  <p><img :src="lis"></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="ad-5">
          <span class="iconfont icon-xiaoxi"></span>
          对行程有疑问？
          <span>旅行顾问</span>
          为您解答
        </div>
      </div>
      <div class="div-a7">
        <div>
          <p>
            <span class="iconfont icon-dianmian"></span>
            极暇游自营
            <span>进入店铺<span class="we-1"> > </span></span>
          </p>
          <div class="dp-1">
            <div>
              <div class="dp-11">
                <span>4.8</span>
                <div></div>
              </div>
              <p>商家在陕西的综合得分</p>
            </div>
            <div class="dp-12">
              <p>100000+</p>
              <p>累计服务人数</p>
            </div>
          </div>
        </div>
        <div class="dp-2">
          <span class="iconfont icon-dianmian"></span>
          西安有46家极暇游门店
          <p>极暇游在您身边<van-icon name="arrow" /></p>
        </div>
      </div>
      <div class="div-a8">
        <div class="wb-1">
          <p>
            <span class="iconfont icon-dengpao"></span>
            产品卖点
          </p>
          <div>
            <div class="wb-1-1" v-for="(item,i) of md" :key="i">
              <div></div>
              <p>{{item.xq}}</p>
            </div>
          </div>
        </div>
        <div class="wb-2">
          <p>
            <span class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></span>
            产品特色
          </p>
          <div>
            <div>
              <div class="wb-2-1">
                <img src="../assets/chanpin.png">
              </div>
              <div class="wb-2-1">
                <img v-for="(item,i) of tsImage" :key="i" :src="item">
              </div>
            </div>
          </div>
        </div>
        <div class="wb-3" ref="ui" @click="oncli = !oncli">
          {{word.slice(0,-1)}}
          <span>{{word.slice(-1)}}</span>
        </div>
      </div>
      <div class="div-a9">
        <p><span class="iconfont icon-youpinjiaju_danxian_hanglixiang"></span>详细行程</p>
        <div>
          <div class="ws-1">
            <p>
              <span>D1</span>
              俯瞰长安繁华古韵（明城墙）-贵妃御汤（华清宫）-千俑千面前世今生（秦始皇兵马俑博物馆）-宿华山脚下
            </p>
            <div class="ws-1-1">
              <div class="ws-2">
                <p>06:00 · 餐饮<span class="ws-img1"></span></p>
                <div>
                  <p class="ws-2-2">早餐：自理。早餐敬请自理</p>
                  <p class="ws-2-3"><img src="../assets/biao.png"><span>用餐时间: 约30分钟</span> </p>
                </div>
              </div>
              <div class="ws-2">
                <p>06:00 · 其它<span class="ws-img2"></span></p>
                <div>
                  <p class="ws-2-2">
                    【温馨提示】自行前往集合点。<br>
                    本行程需按照约定时间自行打车前往集合点（导游提前1天通知），贵宾请勿迟到。若因为迟到无法参与行程或造成损失，游客自行承担。（备注：二环以内可报销打车费用，二环以外上限30元每单，超出自理）集合时间一般为07:00-08:00之间，如遇特殊情况或重大节假日，以导游实际通知为准！
                  </p>
                </div>
              </div>
              <div class="ws-2">
                <p>08:30 · 景点<span class="ws-img3"></span></p>
                <p class="ws-2-2">前往：<span>西安城墙</span><span>经典</span></p>
                <div class="ws-2-4">
                  <div>
                    <div>
                      <img src="../assets/jingdian_img1.png">
                    </div>
                    <p class="ws-2-2"><span>西安城墙</span><span>经典</span></p> 
                    <p class="ws-2-5">西安景点人气榜第2名</p>
                    <p class="ws-2-6">十三朝古都的历史见证</p>
                  </div>
                </div>
                <p class="ws-2-2">
                  按实际和导游约定时间从酒店出发，前往西安市内必去景点“明城墙”，西安城墙主城门有四座：长乐门（东门），永宁门（南门），安定门（西门），安远门（北门）。登上城墙，观城墙内外、川流不息的车群人群，感受古典与现代冲撞融合着的名城西安。眺望西北朝向，感受作为丝绸之路起点城市的自信和开放。<br><br>
                  【温馨提示】不含城墙上自行车或电瓶车租赁费用，如想要骑行/乘坐，在集合时间前可自行租赁体验。
                  </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶：约5公里/约0小时20分</span></p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>活动时间: 约1小时</span></p>
              </div>
              <div class="ws-2">
                <p>10:00 · 景点<span class="ws-img3"></span></p>
                <p class="ws-2-2">前往：<span>华清宫（赠耳麦讲解）</span></p>
                <div class="ws-2-4">
                  <div>
                    <div>
                      <img src="../assets/jingdian_img2.png">
                    </div>
                    <p class="ws-2-2"><span>华清宫（赠耳麦讲解）</span></p> 
                    <p class="ws-2-5">西安景点人气榜第3名</p>
                    <p class="ws-2-6">唐玄宗和杨贵妃的共浴之地</p>
                  </div>
                </div>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶时间：约0小时40分</span></p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>活动时间: 约1小时</span></p>
              </div>
              <div class="ws-2">
                <p>12:30 · 餐饮<span class="ws-img4"></span></p>
                <p class="ws-2-2">午餐：在老西安或其他同类餐厅用午餐，餐标30元/人。
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶：约40公里/约0小时10分</span></p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>用餐时间: 约1小时</span></p>
              </div>
              <div class="ws-2">
                <p>13:30 · 景点<span class="ws-img3"></span></p>
                <p class="ws-2-2">前往：<span>秦始皇兵马俑博物馆(赠景区耳麦讲解)</span><span>经典</span></p>
                <div class="ws-2-4">
                  <div>
                    <div>
                      <img src="../assets/jingdian_img3.png">
                    </div>
                    <p class="ws-2-2"><span>秦始皇兵马俑博物馆(赠景区耳麦讲解)</span><span>经典</span></p> 
                    <p class="ws-2-5">西安景点人气榜第1名</p>
                    <p class="ws-2-6">秦始皇的地下御林军</p>
                  </div>
                </div>
                <p class="ws-2-2">
                  中餐后稍作休息，前往秦始皇兵马俑博物馆。<br><br>
                  【温馨提示】：<br>
                  1、不含兵马俑电瓶车单程5元/人，乘坐约5分钟（步行10分钟左右），如需要敬请自理。<br>
                  2、兵马俑讲解耳麦属于赠送使用项目，游览完景区后需回收，请您在使用过程中妥善保管！<br>
                  3、为保证讲解质量，兵马俑景区将安排景区讲解员进行专门讲解。<br>
                  4、内设景区购物场所，非旅行社协议购物店，您可自由进出，如购物请谨慎！
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶：约5公里/约0小时20分</span></p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>活动时间: 约2小时40分钟</span></p>
              </div>
              <div class="ws-2">
                <p>16:20 · 交通<span class="ws-img5"></span></p>
                <p class="ws-2-2">交通：参观完成后驱车前往华阴县，用晚餐，后入住华山景区附近酒店。
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶时间：约1小时30分</span></p>
              </div>
              <div class="ws-2">
                <p>18:00 · 餐饮<span class="ws-img4"></span></p>
                <p class="ws-2-2">晚餐：组织用团队晚餐，餐标30/人。
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶距离：约2公里</span></p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>用餐时间：约30分钟</span></p>
              </div>
              <div class="ws-2">
                <p>18:30 · 酒店<span class="ws-img6"></span></p>
                <p class="ws-2-2"><span>华山客栈(侠文化主题酒店)</span></p>
                <p class="ws-2-2">今晚早早休息，明天要挑战西岳华山，刀剑在手，侠义江湖。
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶：约100公里/约0小时10分</span></p>
              </div>
            </div>
            <p>
              <span>D2</span>
              万山之太，英雄聚，华山论剑（登山 我们快人一步）-返回西安
            </p>
            <div class="ws-1-1">
              <div class="ws-2">
                <p>07:00 · 餐饮<span class="ws-img5"></span></p>
                <p class="ws-2-2">
                  早餐：酒店用早餐
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>用餐时间: 约40分钟</span></p>
              </div>
              <div class="ws-2">
                <p>07:40 · 景点<span class="ws-img3"></span></p>
                <p class="ws-2-2">前往：<span>华山（赠西上北下索道及进山车）</span><span>经典</span></p>
                <div class="ws-2-4">
                  <div>
                    <div>
                      <img src="../assets/jingdian_img4.png">
                    </div>
                    <p class="ws-2-2"><span>华山（赠西上北下索道及进山车）</span><span>经典</span></p> 
                    <p class="ws-2-5">华山景点人气榜第1名</p>
                    <p class="ws-2-6">以“奇险”出名的五岳之一</p>
                  </div>
                </div>
                <p class="ws-2-2">前往：<span>西峰</span><span>经典</span></p>
                <div class="ws-2-4">
                  <div>
                    <div>
                      <img src="../assets/jingdian_img5.png">
                    </div>
                    <p class="ws-2-2"><span>西峰</span><span>经典</span></p> 
                    <p class="ws-2-5">华山景点人气榜第3名</p>
                    <p class="ws-2-6">西峰是华山主峰之一，因位置居西得名，又因石叶如莲花瓣覆盖峰巅，故又名莲花峰。西峰为一块自然形成的完整巨石，上面的景观非常多，有翠云宫、莲花洞等，并伴有许多美丽的神话传说，其中尤为沉香劈山救母的故事广为流传。</p>
                  </div>
                </div>
                <p class="ws-2-2">前往：<span>南峰</span><span>经典</span></p>
                <div class="ws-2-4">
                  <div>
                    <div>
                      <img src="../assets/jingdian_img6.png">
                    </div>
                    <p class="ws-2-2"><span>南峰</span><span>经典</span></p> 
                    <p class="ws-2-5">华山景点人气榜第10名</p>
                    <p class="ws-2-6">南峰在华山众多山峰中以高度著称，南峰一峰二顶，东顶松桧峰，因长有许多松桧树而得名。西顶落雁峰，即南峰极顶。据说由于山太高，大雁到这里也飞不过去，必须在此歇息，故取此名。登上南峰，极目四眺，众山皆在脚下，俯瞰黄土高原、渭河平原，黄河、泾河、渭河皆收眼底，令人颇感豪情满怀，使人真正领略华山高峻雄伟的博大气势，享受如临天界，如履浮云的神奇情趣。</p>
                  </div>
                </div>
                <p class="ws-2-2">前往：<span>东峰（朝阳峰）</span><span>经典</span></p>
                <div class="ws-2-4">
                  <div>
                    <div>
                      <img src="../assets/jingdian_img7.png">
                    </div>
                    <p class="ws-2-2"><span>东峰（朝阳峰）</span><span>经典</span></p> 
                    <p class="ws-2-5">华山景点人气榜第6名</p>
                    <p class="ws-2-6">东峰是华山主峰之一，因位置居东得名。峰顶有一平台，居高临险，视野开阔，是有名的观日出的地方。每当红日升起，照耀周围许多如削如切的山峰，景色瑰丽，人称朝阳台，东峰也因此被称为朝阳峰。</p>
                  </div>
                </div>
                <p class="ws-2-2">前往：<span>北峰</span><span>经典</span></p>
                <div class="ws-2-4">
                  <div>
                    <div>
                      <img src="../assets/jingdian_img8.png">
                    </div>
                    <p class="ws-2-2"><span>北峰</span><span>经典</span></p> 
                    <p class="ws-2-5">华山景点人气榜第8名</p>
                    <p class="ws-2-6">北峰海拔1614米，为华山主峰之一，因位置居北得名。北峰四面悬绝，巍然独秀，有若云台，因此又名云台峰。北峰绝顶处有一平台，是远望华山三峰和苍龙岭全景的好地方。峰腰树木葱郁，秀气充盈，是攀登华山绝顶途中理想的休息场所。</p>
                  </div>
                </div>
                <p class="ws-2-2">
                  导游会介绍西岳华山的游览攀爬方式，西峰（沉香劈石、金锁关、苍龙岭）-南峰（长空栈道）东峰（杨公碑、鹞子翻身、博台、下棋亭）-中峰（玉女峰）-北峰（擦耳崖、苍龙岭、金锁关），建议您视身体状况选择游览，量力而行。<br><br>
                  【温馨提示】：<br>
                  1、鹞子翻身、长空栈道景点会排队和额外收取安全绳费用，不支持旅行社团队购买，如想参与需自行排队租用。<br>
                  2、成人赠送乘坐西峰上北峰下索道及进山车，儿童不赠送，若超高产生费用敬请自理。<br>
                  3、景区存在实时调价，如您选择其他索道，费用具体以景区和导游实时价格为准，带来不便，敬请谅解。<br>
                  4、由于职业的身体承受因素，导游带您乘索道上山，讲解并交代注意事项后，将由您在山上自由选择路线爬山，导游在山下约定的时间、地点等候集合，敬请谅解
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶：约10公里/约0小时20分</span></p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>活动时间: 约6小时30分钟</span></p>
              </div>
              <div class="ws-2">
                <p>12:00 · 餐饮<span class="ws-img4"></span></p>
                <p class="ws-2-2">午餐：山上饮食不便，我们为您特地准备了登山简餐随机一份（①汉堡+水果套餐②自加热荤素搭配米饭套餐），餐标20元/人。
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶：约10公里/约0小时2分</span></p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>用餐时间：约50分钟</span></p>
              </div>
              <div class="ws-2">
                <p>15:00 · 交通<span class="ws-img5"></span></p>
                <p class="ws-2-2">交通：后驱车回西安市区，入住酒店，晚间无活动安排，可在酒店休息，如还有体力可三五成群闲逛热闹西安城。西安的夜景受人喜欢，导游会推荐个别自费项目，客人自愿参加。不参加自费项目的客人会安排送回酒店休息自由活动。
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶：约120公里/约2小时0分</span></p>
              </div>
              <div class="ws-2">
                <p>17:30 · 餐饮<span class="ws-img4"></span></p>
                <p class="ws-2-2">晚餐：自理。
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>用餐时间：约30分钟</span></p>
              </div>
              <div class="ws-2">
                <p>18:00 · 自由活动<span class="ws-img7"></span></p>
                <p class="ws-2-2">前往：《大唐女皇》歌舞（按需自理）</p>
                <p class="ws-2-2">前往：<span>《驼铃传奇》秀</span></p>
                <p class="ws-2-2">
                  自由活动：【按需自理】<br>
                  备注：（如遇旺季调整时间，以导游实际安排为准)。<br>
                  <br>
                  【温馨提示】<br>
                  1、具体演出场次，根据导游现场购票，依实际预约购票场次为准。<br>
                  2、不参加自费的客人，会同大巴一同先抵达回程途中的唐乐宫剧院，由导游安排车辆送回酒店。
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>游览时间: 约1小时</span></p>
              </div>
              <div class="ws-2">
                <p>20:00 · 自由活动<span class="ws-img7"></span></p>
                <p class="ws-2-2">
                  自由活动：游览行程结束，回到西安市区，可以选择西安市区延住1晚可选项，送您回第一天集合点，或在美食街（回民街、永兴坊）停靠下车逛逛夜市，后自由活动，自行返回酒店。
                </p>
                <p class="ws-2-3"><img src="../assets/biao.png"><span>行驶时间: 约1小时0分</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gwimg">
        <img src="../assets/ad2.png">
      </div>
      <div class="div-a10">
        <p>
          <span class="iconfont icon-web-icon-"></span>
          费用说明
        </p>
        <div>
          <div class="acd-1">
            <p><span></span>费用包含:</p>
            <div>
              <table>
                <tr>
                  <th>住宿</th>
                  <td>
                    <p>行程所列酒店住宿费用</p>
                    <p>酒店标准2人间</p>
                  </td>
                </tr>
                <tr>
                  <th>餐食</th>
                  <td>
                    <p>行程内所列餐食，具体情况请见行程推荐/安排</p>
                  </td>
                </tr>
                <tr>
                  <th>门票</th>
                  <td>
                    <p>行程中所列景点首道大门票：兵马俑、明城墙、华清宫、华山（赠西峰上北峰下索道及进山车，赠送项目不用不退）。</p>
                  </td>
                </tr>
                <tr>
                  <th>用车</th>
                  <td>
                    <p>跟团游期间用车费用    </p>
                  </td>
                </tr>
                <tr>
                  <th>服务</th>
                  <td>
                    <p>当地中文导游服务。（接驳部分不含导游服务） 。</p>
                  </td>
                </tr>
                <tr>
                  <th>儿童</th>
                  <td>
                    <p>儿童价特殊说明：身高1.2米以下儿童价格包含旅游车车位费，正餐费，导游服务费；不含景点门票及赠送项目、不占床、不含早餐。身高1.2-1.5米建议按照儿童价报名，需在当地现补部分门票、早餐及其他费用，敬请家长自理；身高1.5米以上建议按照成人价报名，产生门票优惠差价现退。</p>
                  </td>
                </tr>
              </table>
            </div>
            <p><span></span>自理费用:</p>
            <div>
              <table>
                <tr>
                  <th>补充</th>
                  <td>
                    <p>超重行李的托运费、保管费; 酒店内洗衣、理发、电话、传真、收费电视、饮品、烟酒等个人消费; 自由活动期间的用车服务; 提供导游服务的产品在自由活动期间无陪同服务; 当地参加的自费以及“费用包含”中不包含的其它项目</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="div-a11">
        <p><span class="iconfont icon-wenben"></span>预订须知及安全提示</p>
        <p><span class="iconfont icon-zanting-xianxingyuankuang"></span>违约条款</p>
      </div>
      <div class="div-a12">
        <p><span class="iconfont icon-xinlitiaozheng"></span>更多推荐</p>
        <div>
          <div v-for="(item,i) of tjlist" :key="i">
            <div class="av-1">
              <p><span>{{item.type}}</span><img :src="item.img" /></p>
              <p>{{item.name}}</p>
              <p>
                <span>￥</span>{{item.price}}<span>起</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="div-a13">
        <img src="../assets/baozhang.png">
      </div>
      <!-- 返回顶部 -->
      <div class="toTop iconfont icon-zuoqianfang" ref="returnTop" @click="scrollTop">
      </div>
      <footer>
        <div class="dib_dh">
          <div class="like" >
            <span @click="likelike" class="linkxin iconfont" :class="{iconXin:!likeactive,iconXin1:likeactive}"></span>
            <span>收藏</span>
          </div>
          <div class="call">
              <span><img src="../assets/call.png" alt=""></span>
              <span>联系客服</span>
          </div>
          <div class="reserve" @click="lookforward">
            立即预定
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import weather from"./weather"
export default {
  components:{weather},
  data(){
    return {
      cname:'',
      likeactive:false,
      likeGray:[
        require("../assets/like.png")
      ],
      tjlist:[
        {type:"跟团游",img:require("../assets/tuijian1.png"),name:"西安兵马俑+华清池+法门寺+乾陵+华山3日跟团游·赠送4景区无线耳麦使用，赠送听老腔，看皮影、体验摔碗酒，2晚经济型酒店舒适住宿",price:1047},
        {type:"跟团游",img:require("../assets/tuijian2.png"),name:"西安+华清池+兵马俑+华山2日跟团游(4钻)·梦回长安—锦绣大唐【爱情山打卡+1车1导+宿华山国际】赠西安城墙+夜游大唐不夜城+潼关黄河湾景区+双景区讲解耳麦使用+6小时畅游华山+24小时接机或送机",price:838},
        {type:"跟团游",img:require("../assets/tuijian3.png"),name:"西安2日1晚跟团游·【携程自营·勇攀华山】『兵马俑+华清宫+华山』，『VIP赠』华山北上北下索道+登山能量餐包+兵马俑华清宫双5A景区耳麦讲解，『宿』西安入住市区4钻精选酒店·当地参团",price:818},
        {type:"半自助游",img:require("../assets/tuijian4.png"),name:"西安兵马俑+华清池2日半自助游·《长恨歌》第一场中区票【赠自助中餐+耳麦+回程车送市区】纯玩无购物，不含住宿（第二天自由活动）",price:767},
        {type:"跟团游",img:require("../assets/tuijian1.png"),name:"西安兵马俑+华清池+法门寺+乾陵+华山3日跟团游·赠送4景区无线耳麦使用，赠送听老腔，看皮影、体验摔碗酒，2晚经济型酒店舒适住宿",price:1047},
        {type:"跟团游",img:require("../assets/tuijian2.png"),name:"西安+华清池+兵马俑+华山2日跟团游(4钻)·梦回长安—锦绣大唐【爱情山打卡+1车1导+宿华山国际】赠西安城墙+夜游大唐不夜城+潼关黄河湾景区+双景区讲解耳麦使用+6小时畅游华山+24小时接机或送机",price:838},
        {type:"跟团游",img:require("../assets/tuijian3.png"),name:"西安2日1晚跟团游·【携程自营·勇攀华山】『兵马俑+华清宫+华山』，『VIP赠』华山北上北下索道+登山能量餐包+兵马俑华清宫双5A景区耳麦讲解，『宿』西安入住市区4钻精选酒店·当地参团",price:818},
        {type:"半自助游",img:require("../assets/tuijian4.png"),name:"西安兵马俑+华清池2日半自助游·《长恨歌》第一场中区票【赠自助中餐+耳麦+回程车送市区】纯玩无购物，不含住宿（第二天自由活动）",price:767},
      ],
      tsimg:[
        require("../assets/tese1.png"),
        require("../assets/tese2.png"),
        require("../assets/tese3.png"),
        require("../assets/tese4.png"),
        require("../assets/tese5.png"),
        require("../assets/tese6.png"),
        require("../assets/tese7.png"),
        require("../assets/tese8.png"),
        require("../assets/tese9.png"),
        require("../assets/tese10.png"),
        require("../assets/tese11.png"),
        require("../assets/tese12.png")
      ],
      md:[
        {xq:"【极暇游自营】携程会员独立成团，1车1导（好评导游随行），客源保证，出行放心"},
        {xq:"【华山论剑】成人赠华山索道+进山车（西峰上北峰下，不走回头路）+登山能量包"},
        {xq:"【贴心安排】西安24H专车接机/站，1晚华山优选住宿，错峰省时，畅游华山6小时"}
      ],
      ykimg:[
        require("../assets/yk-01.png"),
        require("../assets/yk-04.png"),
        require("../assets/yk-02.png"),
        require("../assets/yk-03.png"),
      ],
      list:[
        {qwe:1000,asd:50000},
        {qwe:500,asd:25000},
        {qwe:200,asd:10000},
        {qwe:100,asd:5000},
        {qwe:20,asd:1000},
      ],
      // iamges:[
      //   {id:1,img:require("../assets/pts001.png")},
      //   {id:2,img:require("../assets/pts002.png")},
      //   {id:3,img:require("../assets/pts003.png")},
      //   {id:4,img:require("../assets/pts004.png")},
      //   {id:5,img:require("../assets/pts005.png")},
      // ],
      dis:{
        display:"none"
      },
      show1: false,
      show2: false,
      oncli:false,
      jiantou:true,
      getDetails:[],
      crImg:[],
      crvid:""
    }
  },
  methods: {
    lingqu(e){
      if(e.target.innerHTML=="领取"){
        this.$toast.success('领取成功');
        e.target.innerHTML = "已领取";
      }
    },
    onSelect(){
      this.show1=true;
    },
    onSelect1(){
      this.show2=true;
    },
    active(){
      this.likeGray=[require("../assets/like_active.png")];
    },
    scroll(){
      var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
      if(scrollTop>=200){
        this.$refs.returnTop.style.display = "block";
      }else{
        this.$refs.returnTop.style.display="none";
      };
      if(scrollTop>=100){
        this.$refs.dingTop.style.display = "block";
      }else{
        this.$refs.dingTop.style.display = "none";
      };
      if(scrollTop>=100 && scrollTop<770){
        this.$refs.chanpin.style.borderBottom = "4px solid #08f";
        this.$refs.chanpin.style.color = "#08f";
        this.$refs.tuijian.style = "";
        this.$refs.dianping.style = "";
        this.$refs.xingcheng.style = "";
      }else if(scrollTop>=770 && scrollTop<1954){
        this.$refs.chanpin.style = "";
        this.$refs.xingcheng.style = "";
        this.$refs.tuijian.style = "";
        this.$refs.dianping.style.borderBottom = "4px solid #08f";
        this.$refs.dianping.style.color = "#08f";
      }else if(scrollTop>=1954 && scrollTop<8000){
        this.$refs.dianping.style = "";
        this.$refs.chanpin.style = "";
        this.$refs.tuijian.style = "";
        this.$refs.xingcheng.style.borderBottom = "4px solid #08f";
        this.$refs.xingcheng.style.color = "#08f";
      }else if(scrollTop>=8000){
        this.$refs.chanpin.style = "";
        this.$refs.dianping.style = "";
        this.$refs.xingcheng.style = "";
        this.$refs.tuijian.style.borderBottom = "4px solid #08f";
        this.$refs.tuijian.style.color = "#08f";
      }
    },
    scrollTop(){
      var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
      if(scrollTop>0){
       window.requestAnimationFrame(this.scrollTop);
        window.scrollTo(0,scrollTop-(scrollTop/5));
      }
    },
    dingCP(){
      var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
      window.scrollTo(0,100);
    },
    dingDP(){
      var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
      //if(scrollTop<770 || scrollTop>1984){
        //window.requestAnimationFrame(this.scrollTop);
        window.scrollTo(0,770);
      //}
    },
    dingXC(){
      var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
      //if(scrollTop<1984 || scrollTop>8162){
        //window.requestAnimationFrame(this.scrollTop);
        window.scrollTo(0,1954);
      //}
    },
    dingTJ(){
      var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
      window.scrollTo(0,8095);
    },
    asd(){
      var ww1 = document.getElementById("ww1");
      ww1.play();
      this.dis.display = "block";
    },
    zxc(){
      var ww1 = document.getElementById("ww1");
      ww1.pause();
      this.dis.display = "none";
    },
    details(){
      
       this.$axios.get(
            `v1/getindex/details?Jid=${this.$route.params.Jid}`
        ).then(res=>{
             var data = res.data.data; 
             this.getDetails = data.details;
             this.likeactive = data.iscoll;
             this.cname = data.details.cname;
             this.crImg = data.details.cr_img.split(",");
             this.crvid = data.details.cr_vid;
        })
    },
    goProduct(){
      history.back(-1);
    },
    likelike(){
     var Jid = this.$route.params.Jid;
      var date = new Date().toLocaleDateString();
      if(!this.likeactive){
        this.$axios.get("v1/getuser/createColl",
          {params:{
            Jid:Jid,
            setTime:date
          }
        }).then(res=>{
          if(res.data.code==400){
            this.$dialog.confirm({
              title: '提示',
              message: '您还没有登录，是否前往登录'
            }).then(() => {
              this.$router.push("/login");
            }).catch(() => {
              return;
            });
          }else if(res.data.code==200){
            this.likeactive =true;
            this.$toast.success('收藏成功');
          }
        })
      }else if(this.likeactive){
        this.$axios.get("v1/getuser/delColl",
          {params:{
            Jid:Jid
          }
        }).then(res=>{
          // console.log(res);
          if(res.data.code==200){
            this.$toast.fail('取消收藏');
            this.likeactive=false;
          }else if(res.data.code==400){
            this.$toast.fail('系统繁忙');
              
          }
        })
      }
    },
    comment(){
      var Jid = this.$route.params.Jid;
      this.$router.push(`/comment/${Jid}`);
    },
    lookforward(){
      this.$router.push("/History");
    }
  },
  created() {
    this.details();
  },
  computed: {
    tsImage:function(){
      var tsImage = []
      if(this.oncli == false){
        tsImage = [];
        return tsImage;
      }else{
        tsImage = this.tsimg;
        return this.tsimg;
      }
    },
    word:function(){
      if(this.oncli == false){
        return `点击加载全部∨`
      }else{
        return `点击收起∧`
      }
    }
  },
  mounted(){
    window.addEventListener("scroll",this.scroll);
  },
  destroyed () {
   window.removeEventListener('scroll', this.scroll)
  }
}
</script>
<style scoped>
  /* 顶部导航栏 */
  .dingbu{
    width: 100%;height: 44px;
    position: fixed;
    padding: 6px 10px;
    text-align: center;
    z-index: 105;  
    display: none;
    overflow: hidden;
  }
  .dingbu>span{
    width: 32px;height: 32px;
    margin-left: 8px;
    float: left;
  }
  .dingbu>div{
    width: 40%;height: 44px;
    line-height: 44px;
    text-align: center;
    color: #333;
    position: absolute;
    left: 30%;top: 0px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .dingbu>div>div{
    font-size: 13px;
    width: 25%;
  }
  /* 返回键 */
  .fanhui{
    width: 35px;height: 35px;
    background: rgba(0,0,0,.35) !important;
    border-radius: 50%;
    position: absolute;
    top: 8px;left: 15px;
  }
  .fanhui>img{
    width: 25px !important;height: 25px;
    position: absolute;
    top: 5px;left: 5px;
  }

  .a1-lb{
    width: 100%;
    position: relative;
  }
  .a1-video{
    width: 100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 100;
  }
  .a1-video #ww1{
    width: 100%;
  }
  .a1-video .vi-1{
    position: absolute;
    background-color: rgba(0,0,0,.5) !important;
    width: 70px;height: 25px;
    border-radius:1rem; 
    top: 5%;left: 40%;
  }
  .a1-video .vi-1>span:nth-child(2){
    position: relative;
    top: -7px;left: 3px;
    margin-bottom: 10px;
    color:#fff;
  }
  .a1-video .vi-2{
    display: inline-block;
    width: 25px;height: 25px;
    position: relative;
    left: 3px;
  }
  .a1-video .vi-2>img{
    width: 100%;
  }
  .a1-video .vi-3>img{
    margin-left: 2px;
    width: 100%;
  }
  .a1-video .vi-3{
    display: inline-block;
    position: relative;
    bottom: 3px;left: 3px;
    width: 17px;height: 17px;
  }
  .a2-lun{
    position: relative;
  }
  .a2-txt1{
    color:#fff;
    position:absolute;
    font-size: 15px;
    top: 86%;left:85%;
    background-color: rgba(0,0,0,.25) !important;
    width: 50px;height: 20px;
    line-height: 20px;
    border-radius:1rem;
  }
  .a2-txt1>span{
    margin-left: 23px;
  }
  .a2-txt2{
    border-radius:1rem; 
    width: 50px;height: 20px;
    line-height: 20px;
    background-color: rgba(0,0,0,.25) !important;
    display: inline-block;
    position:absolute;
    top:86%;left:85%;
    font-size: 15px;
    color:#fff;
    text-align: right;
  }
  .a2-txt2>span{
    margin-right: 3px;
  }
  .a2-txt2>span>img{
    position:absolute;
    left: 5px;
    top: 2px;
    width: 15px;height: 15px;
  }
  .a1>div:first-child>video{
    width: 100%;
  }
  .a1-lb img{
    width: 100%;
  }
  .qwe-1{
    background-color: rgba(0,0,0,0) !important;
    width: 20%;
    position: absolute;
    top:30%;
    left:40%;
  }
  .qwe-1>img{
    width: 100%;
  }

  .vip-1{
    width: 100%;
  }
  .div-a{
    width: 100%;
    background: #f5f5f5;
  }
  .div-a>div:first-child>div:first-child>video{
    width: 100%;
  }
  .div-a div{background: #fff;}
  .swipe-image{
    width: 100%;
  }
  .div-a1{
    width: 100%;height: 35px;
    padding: 10px 15px 0 15px;
  }
  .div-a1>.dc_1{
    color: #ff6913;
    font-size: 12px;
  }
  .div-a1>.dc_1>.sp-1{
    font-size: 25px;
  }
  .div-a1>.dc_1 em{
    color:#999;
  }
  .div-a1>.dc_1>.sp-2 img{
    position: relative;
    top: 2px;
    left: 5px;
    width: 12px;
    height: 12px;
  }
  .div-a1>.dc_2{
    position: relative;
    left: 10px;
    color: #08f;
    font-size: 14px;
    padding: 0 5px;
  }
  .div-a1>.dc_3{
    position: relative;
    left: 10px;
    color: #999;
    font-size: 12px;
  }
  .div-a2{
    width: 100%;height: 153px;
    padding:15px 15px;
    margin-bottom: 8px;
  }
  .div-a2 h2{
    margin-bottom: 2px;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #333;
    margin-top: 0;
  }
  .div-a2 p{
    font-size: 13px;
    color: #222;
    margin: 0;
    margin-bottom: 7px;
  }
  .div-a2 div{
    width: 345px;height: 22px;
    line-height: 16px;
    margin-top: 5px;
    height: 22px;
    overflow: hidden;
    position: relative;
    padding-right: 66px;
  }
  .div-a2 div span{
    font-size: 11px;
    display: inline-block;
    line-height: 16px;
    height: 16px;
    color: #666;
    background: #fff;
    vertical-align: top;
    padding: 1px 3px 0;
    position: relative;
    margin: 5px 5px 0 0;
    border-radius: 4px;
    border: 1px solid rgba(102,102,102,.3);
  }
  .div-a3{
    width:100%;
    margin: 8px 0 8px 0;
  }
  .div-a3 p{margin: 0;}
  .div-a3 .qw-1,.div-a3 .qw-2{
    width: 100%;height: 47px;
    padding: 15px 15px 15px 63px;
    font-size: 13px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }
  .div-a3 .qw-1 p>span:first-child,.div-a3 .qw-2 p>span:first-child{
    position: absolute;
    line-height: 1;
    color: #999;
    left: 15px;
    margin-top: 3px;
  }
  .div-a3 .qw-1 p>span+span{
    position: relative;
    float: left;
    margin: 0 5px 0 0;
    background: #ff4646;
    border-radius: 3px;
    color: #fff;
    text-align: center;
    line-height: 17px;
    height: 16px;
  }
  .div-a3 .qw-3 {
    width: 100%;
  }
  .van-icon{
    right: 15px !important;
  }
  .div-a3 .qw-1 .we-1,.div-a3 .qw-2 .we-1{
    background: #fff;
    margin: 0;
    float: right;
    color: #999;
  }
  .div-a3 .we-2,.div-a3 .we-3{
    width: 100% !important;
    height: 715px;
    padding: 0 14px;margin: 0 !important;
  }
  .div-a3 .we-3 h3{margin-bottom:5px;margin-left: 20px;}
  .div-a3 .we-2,.we-3 p{margin-left: 20px;font-size: 13px;}
  .div-a3 .we-2 p{
    margin:15px 0;
  }
  .div-a3 .we-2>div{
    width: 100%;
  }
  .div-a3 .we-2>div>div{
    width: 100%;
    position: relative;
  }
  .div-a3 .we-2>div>div>div{
    width: 100%;height: 105px;
    margin-bottom: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .div-a3 .as-1{
    display:inline-block;
    width: 28%;
    height: 105px;
    background: #fe5a53
  }
  .div-a3 .as-1 div{
    width: 100%;height: 39px;
    margin-top: 33px;
    background: #fe5a53
  }
  .div-a3 .as-1 div .p1{
    z-index: 2;
    font-size: 27px;
    line-height: 1;
  }
  .div-a3 .as-1 div span{
    font-size: 14px;
  }
  .div-a3 .as-1 div p{
    position: relative;
    margin: 0;padding: 0;
    text-align: center;
    color: #fff;
  }
  .div-a3 .as-1 div .p2{
    z-index: 2;
    font-size: 10px;
    line-height: 1;
  }
  .div-a3 .as-2{
    display:inline-block;
    width: 70%;height: 105px;
    padding: 13px 70px 0 6px;
    border-top:1px solid #f2f3f6;
    border-bottom:1px solid #f2f3f6;
    -webkit-box-shadow: 0 2px 5px #ccc;
            box-shadow: 0 2px 5px #ccc;
    margin-left: 5px;
  }
  .div-a3 .as-2>p:first-child{
    font-size: 14px;
    color: #222;
    max-height: 36px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 19px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    margin-bottom: 5px;
    font-weight: 700;
    margin: 0 0 5px 0;
  }
  .div-a3 .as-2 span{
    background: #ff4646;
    border-radius: 50px;
    font-size: 12px;
    color: #fff;
    line-height: 15px;
    padding: 0 6px;
    margin-right: 4px;
    font-weight: 400;
  }
  .div-a3 .as-2>p:nth-child(2){
    line-height: 12px;
    font-size: 10px;
    color: #999;
    height: 24px;
    margin: 5px 0 !important;
    overflow: hidden;
    margin: 0;
  }
  .div-a3 .as-2>p:nth-child(3){
    font-size: 10px;
    color: #666;
    padding-right: 15px;
    margin: 0;
  }
  .icon-fanhui{
    background-color:#fff !important;
    color: #666 !important; 
    padding: 0 !important;
  }
  .div-a3 .as-2>span{
    position: absolute;
    left:83%;bottom:40% ;
    background: #fff;
    border: 1px solid #ff4646;
    border-radius: 50px;
    width: 56px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #ff4646;
  }
  .div-a4{
    background: #fff;
    margin-bottom: 8px;
    width: 100%;height: 98px;
  }
  .div-a4 div:first-child{
    width: 100%;height: 44px;
    padding: 11px 0 11px 43px;
    position: relative;
  }
  .icon-zuobiao{
    position: absolute;
    top: 22px !important;
    left: 15px;
    margin-top: -8px;
    background-repeat: no-repeat;
    background-size: 12px auto;
    width: 12px;
    height: 16px;
  }
  .div-a4 div:first-child>span{
    font-size: 15px;
    color: #333;
  }
  .div-a4 div:nth-child(2){
    position: relative;
    padding-bottom: 10px;
    width: 100%;height: 54px;
  }
  .div-a4 .dv-1{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding:0 .6rem;
  }
  .div-a4 .dv-1 a{
    border: solid 1px #ccc;
    width: 20%;
    height: 44px;
    font-size: 12px;
    color: #333;
    text-align: center;
    margin-right: 5px;
    padding-top:.3rem;
  }
  .div-a4 .dv-1>a>span:nth-child(2){
    font-size: 11px;
    margin-top: -2px;
    color: #f60;
    font-weight: 400;
    text-align: center;
  }
  .div-a4 .dv-1>a>p{
    color: #0086f6;
  }
  .div-a5{
    width: 100%;height: 178px;
    margin-bottom: 8;
    position: relative;
  }
  .icon-shu{
    position: absolute;
    left: 15px;
  }
  .div-a5 div:first-child{
    width: 360px;height: 45px;
    padding: 15px 0 15px 28px;
    margin-left: 15px;
  }
  .div-a5>div:first-child p:nth-child(2){
    font-size: 15px;
    color: #222;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    line-height: 1;
  }
  .div-a5 .qe-1{
    padding: 10px 15px 10px 15px;
    margin: 0;
    width: 100%;height: 133px;
  }
  .div-a5 .qe-1 div{
    margin: 0;padding: 0;
    font-size: 13px;
    color: #666;
    padding-left: 35px;
    position: relative;
    margin-bottom: 5px;
    width: 100%;
  }
  .div-a5 .qe-1>div:first-child,.div-a5 .qe-1>div:nth-child(3),.div-a5 .qe-1>div:nth-child(4){
    height: 19px;
  }
  .icon-jiudian,.icon-canju{
    background-size: 14px auto;
    width: 14px;
    height: 12px;
    position: absolute;
    left: 10px;
    top: 2px;
  }
  .icon-zuobiao{
    background-size: 14px auto;
    width: 14px;
    height: 12px;
    position: absolute;
    left: 10px;
    top: 10px !important;
  }
  .div-a5 .qe-1 p{
    height: 19px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 13px;
    color: #666;
  }
  .div-a5 .qe-1 p:nth-child(2){
    height: 36px;
  }
  .div-a6{
    width: 100%;height: 327px;
    background: #fff;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;margin: 8px 0 8px 0;
    padding: 0;color: #333;
  }
  .div-a6>div:first-child{
    width: 100%;height: 115px;
  }
  .div-a6>div:nth-child(2){
    width: 100%;height: 168px;
  }
  .div-a6 .ad-1{
    width: 100%;height: 44px;
    position: relative;
    font-size: 15px;
    color: #333;
    padding: 11px 0 11px 43px;
  }
  .div-a6 .ad-1>span:nth-child(3){
    font-size: 12px;
    color: #999;
    margin-left: 8px;
  } 
  .div-a6 .ad-1>p{
    font-size: 12px;
    color: #999;
    position: absolute;
    right: 25px;
    top: 50%;
    margin-top: -6px;
    line-height: 12px;
    z-index: 9;   
  }
  .div-a6 .ad-1>p span:first-child{
    height: 14px;
    color: #448aff
  }
  .div-a6 .ad-2{
    width: 100%;height: 92px;
    padding: 0 11px 5px 11px;
    margin-top: -5px;
    max-height: 72px;
    overflow: hidden;
  }
  .div-a6 .ad-2 span{
   background: #e9f3fe;
   border:solid 1px #ccc;
   border-radius: 50px;
   font-size: 12px;
   padding: 0 8px;
   text-align: center;
   line-height: 24px;
   margin: 5px;
   display: inline-block;
  }
  .div-a6 .ad-3{
    width: 100%;height: 81px;
    position: relative;
    padding: 3px 15px 11px 15px;
  }
  .div-a6 .ad-3 h4{
    width: 100%;height: 21px;
    font-size: 12px;
    color: #222;
    position: relative;
  }
  .div-a6 .ad-3 h4>span{
    margin-left: 5px;
    padding: 0 4px;
    display: inline-block;
    position: relative;
  }
  .div-a6 .ad-3 h4>span:nth-child(3){
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    color: #999;
  }
  .div-a6 .ad-3 h4 img{
    width: 26px;
    height: 26px;
    border-radius: 100%;
    margin-right: 5px;
    float: left;
    margin-top: -5px;
  }
  .div-a6 .ad-3 div{
    width: 100%;height: 36px;
    font-size: 13px;
    margin-bottom: 5px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #222;
  }
  .div-a6 .ad-4{
    width: 375px;height: 87px;
    padding: 0 0 15px 0;
    position: relative;
    border-bottom: 1px solid #f5f5f5;
  }
  .div-a6 .ad-4 div{
    width: 375px;height: 72px;
    padding: 0 0 15px 0;
    position: relative;
    overflow: hidden;
    padding-left: 15px;
    padding-bottom: 20px;
  }
  .div-a6 .ad-4 ul{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 360px;height: 78px;
    list-style: none;
  }
  .div-a6 .ad-4 ul li{
    width: 72px;height: 72px;
    margin-right: 8px;
    border-radius: 3px;
    margin: 0 8px 0 0;
    position: relative;
    display: inline-block;
  }
  .div-a6 .ad-4 ul li img{
    width: 100%;
    height: auto;
    display: block;
    border-radius: 3px;
  }
  .div-a6 .ad-5{
    width: 375px;height: 44px;
    position: relative;
    font-size: 15px;
    color: #333;
    padding: 11px 0 11px 43px;
  }
  .icon-xiaoxi{
    position: absolute;
    top: 50%;
    left: 15px;
    line-height: 15px;
    margin-top: -7px;
    background-repeat: no-repeat;
    background-size: 14px auto;
    width: 14px;
    height: 15px;
  }
  .div-a6 .ad-5 span:nth-child(2){
    color: #448aff;
  }
  .div-a7{
    background: #f7f7f7 !important;
    width: 100%;height: 163px;
  }
  .div-a7 .we-1{
    color:#999;
  }
  .div-a7>div:first-child{
    width: 100%;height: 109px;
    background: #fff;
    margin-bottom: 10px;
    padding: 15px 15px 15px 15px;
  }
  .div-a7>div:first-child p{
    width: 100%;height: 22px;
    font-size: 15px;
    color: #222;
    position: relative;
    padding-left: 28px;
    padding-right: 90px;
    overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
  }
  .van-icon{
    color: #ccc;
    content: '';
    width: 5px;
    height: 9px;
    position: absolute;
    top: -1px;
    right: -5px;
  }
  .div-a7>div:first-child p span:nth-child(2){
    font-size: 12px;
    color: #08f;
    position: absolute;
    right: 13px;
    top: 50%;
    margin-top: -6px;
    line-height: 12px;
  }
  .icon-dianmian{
    background-repeat: no-repeat;
    background-size: 14px auto;
    width: 14px;
    height: 15px;
    position: absolute;
    top: 4px;
    left: 0;
  }
  .div-a7>div:nth-child(2){
    width: 100%;height: 44px;
    line-height: 24px;
    position: relative;
    padding: 10px 25px 10px 35px;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    font-size: 15px;
    color: #222;
  }
  .icon-duanxin_o{
    position: absolute;
    top: 50%;
    left: 15px;
    line-height: 15px;
    margin-top: -7px;
    background-repeat: no-repeat;
    background-size: 14px auto;
    width: 14px;
    height: 15px;
  }
  .div-a7 .dp-1{
    width: 100%;height: 57px;
    position: relative;
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
  }
  .div-a7 .dp-1 div{
    width: 50%;height: 100%;
    -webkit-box-flex: 1;
    width: 1%;
    display: block;
    text-align: center;
  }
  .div-a7 .dp-1 div:first-child div:first-child{
    width: 100%; height: 30px;
    margin: 8px 0 5px 0;
    text-align: center;
    color: #333;
  }
  .div-a7 .dp-11 span{
    width: 28px;height: 30px;
    font-size: 20px;
    color: #222;
    display: inline-block;
    position: absolute;
    left: 40px;top: 12px;
    margin-right: 5px;
  }
  .div-a7 .dp-11 div{
    background-image: -webkit-gradient(linear,right top, left top,color-stop(0, #ff4646),to(#ff7c7c));
    background-image: -o-linear-gradient(right,#ff4646 0,#ff7c7c 100%);
    background-image: linear-gradient(-90deg,#ff4646 0,#ff7c7c 100%);
    width: 52px;
    height: 8px;
    border-radius: 6px;
    border-radius: 6px;
    position: absolute;
    top: 20px;left: 75px;
    display: inline-block;
  }
  .div-a7 .dp-1>div:first-child p{
    width: 100%;height: 14px;
    font-size: 13px;
    color: #666;
    line-height: 14px;
    text-align: center;
    padding: 0;
  }
  .div-a7 .dp-1 .dp-12>p:first-child{
    width: 50%;height: 30px;
    line-height: 30px;
    position: absolute;
    padding: 0;
    margin: 7px 0 6px 0;
    font-size: 20px;
    color: #222;
    text-align: center;
  }
  .div-a7 .dp-1 .dp-12>p:nth-child(2){
    width: 50%;height: 13px;
    font-size: 13px;
    color: #666;
    position: absolute;
    top: 40px;
    text-align: center;
    line-height: 14px;
    padding: 0;
  }
  .div-a7 .dp-2 .icon-dianmian{
    width: 14px;
    height: 14px;
    position: absolute;
    left: 15px;
    top: 9px;
  }
  .div-a7 .dp-2>p{
    float: right;
    color: #08f;
    font-size: 12px;
  }
  .div-a7 .dp-2>p .van-icon{
    width: 5px;
    height: 9px;
    position: absolute;
    right: 20px;
    top: 20px;
    margin-top: -4px;
  }
  .div-a8{
    width: 100%;
    background: #f5f5f5 !important;
    margin-top: 10px;
  }
  .div-a8 .wb-1{
    width: 100%;height: 206px;
    margin-bottom: 10px;
  }
  .div-a8 .wb-1>p{
    font-size: 15px;
    color: #333;
    line-height: 1;
    position: relative;
    padding: 15px 0 15px 43px;
  }
  .icon-dengpao{
    position: absolute;
    left: 15px;
    top: 15px;
    width: 11px;
    height: 15px;
    background-position: 0 -8px;
  }
  .div-a8 .wb-1>div{
    width: 100%;height: 156px;
    padding: 0 15px 5px 15px;
  }
  .div-a8 .wb-1-1>div{
    width: 345px;height: 52px;
  }
  .div-a8 .wb-1-1>p{
    width: 100%;height: 52px;
    font-size: 14px;
    color: #222;
    padding-bottom: 10px;
    padding-left: 9px;
  }
  .div-a8 .wb-1-1>div:first-child{
    content: '';
    background: #666;
    margin: 8px 0 0 -9px;
    float: left;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    margin-left: 0;
  }
  .div-a8 .wb-2{
    width: 100%;
  }
  .icon-changyongtubiao-xianxingdaochu-zhuanqu-{
    position: absolute;
    left: 15px;
    top: 14px;
    width: 15px;
    height: 15px;
    background-position: -1px 0;
  }
  .div-a8 .wb-2>p{
    font-size: 15px;
    color: #333;
    line-height: 1;
    position: relative;
    padding: 15px 0 15px 43px;
  }
  .div-a8 .wb-2>div{
    width: 100%;
    padding: 0 15px 20px 15px;
  }
  .div-a8 .wb-2-1 div{width: 100%;}
  .div-a8 .wb-2-1 img{width: 100%;}
  .div-a8 .wb-3{
    width: 100%;height: 42px;
    border-top: 1px solid #ececec;
    line-height: 42px;
    font-size: 14px;
    color: #08f;
    text-align: center;
  }
  .div-a8 .wb-3 span{
    display: inline-block;
    position: relative;
    top: -3px;
    width: 15px;
    height: 15px;
    vertical-align: -2px;
    background-position: -68px -28px;
    margin-left: 5px;
  }
  .div-a9{
    width: 100%;
    background: #fff;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .div-a9>p{
    width: 100%;height: 45px;
    font-size: 15px;
    color: #333;
    line-height: 1;
    position: relative;
    padding: 15px 0 15px 43px;
  }
  .div-a9>p>span{
    position: absolute;
    left: 15px;
    top: 15px;
    width: 14px;
    height: 14px;
    background-position: -202px 0;
  }
  .div-a9>div{
    width: 100%;
    padding-left: 15px;
  }
  .div-a9>div>div:first-child{
    padding-top: 5px;
    border-bottom: 1px solid rgba(237,237,237,.5);
    color: #333;
  }
  .div-a9 .ws-1>p{
    font-size: 15px;
    color: #222;
    margin-bottom: 15px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .div-a9 .ws-1>p>span{
    font-size: 18px;
    font-weight: 700;
    margin-right: 7px;
    line-height: 1.5;
  }
  .div-a9 .ws-1 .ws-1-1{
    width: 100%;
    padding: 0 15px 0 26px;
    border-left: #b8d0ee 1px dashed;
    margin-left: 9px;
    position: relative;
  }
  .div-a9 .ws-2{
    width: 100%;
    padding: 0 0 14px 0;
    position: relative;
    min-height: 45px;
    color: #666;
  }
  .div-a9 .ws-2>p{
    font-size: 13px;
    line-height: 1;
    position: relative;
    margin-bottom: 7px;
    font-family: PingFangSC-Medium;
  }  
  .ws-img1,.ws-img2,.ws-img3,.ws-img4,.ws-img5,.ws-img6,.ws-img7{
    position: absolute;
    left: -35px;
    top: -2px;
    width: 19px;
    height: 19px;
    content: "";
    background-image: url(../assets/jingling.png);
    background-repeat: no-repeat;
    background-size: 250px auto;
  }
  .ws-img1{background-position: -84px -58px;}
  .ws-img2{background-position: -166px -58px;}
  .ws-img3{background-position: -112px -58px;}
  .ws-img4{background-position: -84px -58px;}
  .ws-img5{background-position: -2px -58px;}
  .ws-img6{background-position: -140px -58px;}
  .ws-img7{background-position: -194px -58px;}
  .div-a9 .ws-2-2{
    width: 100%;
    line-height: 20px !important;
    margin: 0 0 5px 0;
    font-size: 13px;
    line-height: 20px;
    word-wrap: break-word;
  }
  .div-a9 .ws-2-2>span:first-child{
    color: #669FFF;
  }
  .div-a9 .ws-2-2>span:nth-child(2){
    border: 1px solid #0dba0d;
    color: #0dba0d;
    font-size: 12px;
    height: 15px;
    line-height: 15px;
    padding: 0 5px;
    -webkit-transform-origin: left top;
        -ms-transform-origin: left top;
            transform-origin: left top;
    border-radius: 1px;
    margin-left: 5px;
  }
  .div-a9 .ws-2-3{
    width: 309px;height: 20px;
    font-size: 13px;
    line-height: 20px;
    position: relative;
  }
  .div-a9 .ws-2-3>span{
    position: absolute;
    bottom: 0px;
    left: 20px;
  }
  .div-a9 .ws-2-3>img{
    position: relative;
    top: 5px;
  }
  .div-a9 .ws-2-4>div{
    width: 100%;
    background: #f5f9ff;
    border: 1px solid rgba(68,138,255,.5);
    border-radius: 3px;
    padding: 9px 9px 14px 9px;
    margin: 10px 0 10px 0;
  }
  .div-a9 .ws-2-4>div img{
    width: 100%;
  }
  .div-a9 .ws-2-4>div>p:first-child{
    width: 298px;height: 17px;
    font-size: 14px;
    color: #448aff !important;
    line-height: 1.2;
    margin: 10px 0 5px 0;
    padding-bottom: 1px;
    font-family: PingFangSC-Medium;
  }
  .div-a9 .ws-2-5{
    font-size: 13px;
    color: #f5190a;
    font-family: PingFangSC-Regular;
    line-height: 1;
    margin-bottom: 5px;
  }
  .div-a9 .ws-2-6{
    font-size: 13px;
    font-weight: 400;
    line-height: 17px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #666;
  }
  .gwimg{
    width: 100%;
    margin-bottom: 10px;
  }
  .gwimg>img{
    width: 100%;
  }
  .div-a10{
    width: 100%;
    background: #fff;
    margin-bottom: 10px;
  }
  .div-a10>p{
    width: 100%;height: 45px;
    font-size: 15px;
    color: #333;
    line-height: 1;
    position: relative;
    padding: 15px 0 15px 43px;
  }
  .icon-feiyong{
    position: absolute;
    left: 15px;
    top: 15px;
    width: 14px;
    height: 14px;
    background-position: -114px 0;
  }
  .div-a10>div{
    width: 100%;
    padding: 0 15px 0 15px;
    color: #333;
  }
  .div-a10 .acd-1 div{
    width: 100%;
    margin: 12px 0 0 0;
    padding-bottom: 20px;
  }
  .div-a10 .acd-1>p{
    font-size: 15px;
    color: #222;
    line-height: 1;
    position: relative;
    padding-left: 10px;
  }
  .div-a10 .acd-1>p>span{
    display: inline-block;
    content: "";
    position: absolute;
    width: 3px;
    height: 12px;
    border-radius: 2px;
    background: #08f;
    left: 0;
    top: 2px;
  }
  .div-a10 .acd-1 table{
    width: 100%;
    table-layout: fixed;
    border-radius: 4px;
    overflow: hidden;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .div-a10 .acd-1 table tr{
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
  .div-a10 .acd-1 table tr th{
    border: 1px solid #fff;
    width: 60px !important;
    background: #efeff4;
    width: 40px;
    text-align: center;
    font-size: 13px;
    color: #222;
    padding: 10px 10px;
    position: relative;
    font-weight: 400;
    margin: auto;
  }
  .div-a10 .acd-1 table tr td{
    border: 1px solid #fff;
    background: #fafafa;
    font-size: 13px;
    color: #666;
    padding: 10px;
    position: relative;
  }
  .div-a10 .acd-1 table tr td p{
    font-size: 13px;
  }
  .div-a11{
    width: 100%;height: 90px;
    position: relative;
    color: #333;
    margin-bottom: 10px;
  }
  .div-a11>p{
    width: 100%;height: 45px;
    padding: 15px 0 15px 43px;
    font-size: 15px;
    color: #333;
    line-height: 1;
    position: relative;
  }
  .icon-wenben{
    position: absolute;
    left: 15px;
    top: 15px;
    width: 13px;
    height: 15px;
    background-position: -118px -28px;
  }
  .icon-zanting-xianxingyuankuang{
    position: absolute;
    left: 15px;
    top: 15px;
    width: 14px;
    height: 14px;
    background-position: 0 -28px;
  }
  .div-a12{
    background: #fff;
    margin-bottom: 10px;
    width: 100%;
    color: #333;
    position: relative;
  }
  .div-a12>p{
    font-size: 15px;
    line-height: 1;
    position: relative;
    padding: 15px 0 15px 43px;
  }
  .icon-xinlitiaozheng{
    display: inline-block;
    position: absolute;
    left: 15px;
    top: 15px;
    width: 14px;
    height: 14px;
    background-position: -72px 0;
  }
  .div-a12>div{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    padding: 0 6px 0 15px;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
  }
  .div-a12>div>div{
    width: 50%;
    margin-bottom: 20px;
  }
  .div-a12>div>div:nth-child(2){
    clear: both;
  }
  .div-a12 .av-1{
    margin-right: 9px;
    color: #333;
  }
  .div-a12 .av-1>p:first-child{
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    padding-top: 60%;
    height: 0;
    background: #f5f5f5;
  }
  .div-a12 .av-1>p:first-child>span{
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 4px 0 8px 0;
    background: #ff7069;
    line-height: 18px;
    text-align: center;
    color: #fff;
    font-size: 10px;
    padding: 0 6px 0 6px;
    z-index: 1;
  }
  .div-a12 .av-1>p:first-child>img{
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    z-index: 0;
  }
  .div-a12 .av-1>p:nth-child(2){
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    height: 34px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-bottom: 5px;
    margin-top: 8px;
  }
  .div-a12 .av-1>p:nth-child(3){
    color: #ff6913; 
    font-size: 18px;
    line-height: 1;
  }
  .div-a12 .av-1>p:nth-child(3)>span:first-child{
    font-size: 12px;
  }
  .div-a12 .av-1>p:nth-child(3)>span:nth-child(2){
    font-size: 12px;
    margin-left: 2px;
    color: #999;
  }
  .div-a13{
    width: 100%;
    margin: 10px 0 50px 0;
  }
  .div-a13>img{
    width: 100%;
  }
  .linkxin::before{
    font-size:1.8rem;
  }
  .iconXin1::before{
    color:#d81e06;
  }
  /* 返回顶部 */
  .toTop{
    width: 40px;height: 40px;
    position: fixed;
    bottom: 120px;
    right: 12px;
    border: 1px solid #ccc;
    border-radius: 50%;
    background: #fff;
    text-align: center;
    font-size: 30px;
    padding-top: 5px;
    color: #676767;
    display: none;
    z-index: 101;
  }
  footer{
    width: 100%;
  }
  .dib_dh{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    height: 50px;
  }
  .like,.call{
    width:20%;
    text-align: center;
  }
  .like>span,.call>span{
    display: block;
    font-size: 14px;
  }
  .call{
    padding-top: 4px ;
  }
  .call>span>img{
    width: 25px;
    height: 25px;
  }
  .dib_dh>.reserve{
    margin: 5px 0 5px 0;
    width: 57%;
    background: #ff6700;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-size: 15px;
    line-height: 40px;
  }
</style>