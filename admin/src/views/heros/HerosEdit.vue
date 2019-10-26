<template>
  <div class="HerosEdit">
    <h1>{{$route.params._id?'编辑':'创建'}}英雄</h1>
    <el-form @submit.native.prevent>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="first">
          <el-form-item label="名称">
            <el-input placeholder="输入英雄名称" v-model="model.name" @focus="isShowAlert=false"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号（标签）">
            <el-input placeholder="输入英雄称号" v-model="model.title" @focus="isShowAlert=false"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select v-model="model.categories" multiple placeholder="请选择">
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评分">
            <br />
            <div class="score-box">
              <div>
                <span>难度</span>
                <el-rate v-model="model.scores.diffcut" :max="9" show-score></el-rate>
              </div>
              <div>
                <span>技能</span>
                <el-rate v-model="model.scores.technicl" :max="9" show-score></el-rate>
              </div>
              <div>
                <span>攻击</span>
                <el-rate v-model="model.scores.attack" :max="9" show-score></el-rate>
              </div>
              <div>
                <span>生存</span>
                <el-rate v-model="model.scores.live" :max="9" show-score></el-rate>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="出装推荐">
            <br />
            <div class="goods-box">
              <div class="good">
                <span>顺风出装</span>
                <el-select v-model="model.goods.good.items" multiple placeholder="请选择装备">
                  <el-option
                    v-for="item in goods"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  placeholder="输入小提示"
                  v-model="model.goods.good.tips"
                  @focus="isShowAlert=false"
                ></el-input>
              </div>
              <div class="bad">
                <span>逆风出装</span>
                <el-select v-model="model.goods.bad.items" multiple placeholder="请选择装备">
                  <el-option
                    v-for="item in goods"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
                <el-input
                  type="textarea"
                  placeholder="输入小提示"
                  v-model="model.goods.bad.tips"
                  @focus="isShowAlert=false"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input
              type="textarea"
              placeholder="输入英雄使用技巧"
              v-model="model.useage_skills"
              @focus="isShowAlert=false"
            ></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input
              type="textarea"
              placeholder="输入英雄对抗技巧"
              v-model="model.battle_skills"
              @focus="isShowAlert=false"
            ></el-input>
          </el-form-item>
          <el-form-item label="团战技巧">
            <el-input
              type="textarea"
              placeholder="输入英雄团战技巧"
              v-model="model.team_skills"
              @focus="isShowAlert=false"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能管理" name="second">
          <el-button size="small" type="primary" icon="el-icon-plus" plain @click.prevent="model.skills.push({name:'',icon:'',describs:'',tips:''})">添加技能</el-button>
          <div class="skills-box">
            <div class="item" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="招式名称">
                <el-input placeholder="输入招式名称" v-model="item.name" @focus="isShowAlert=false"></el-input>
              </el-form-item>
              <el-form-item label="招式图标">
                 <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads'"
              :show-file-list="false"
              :on-success="res=>item.icon=res.imgUrl"
            >
              <img v-if="item.icon" :src="item.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
              </el-form-item>
              <el-form-item label="招式描述">
                <el-input placeholder="输入招式描述" type="textarea" v-model="item.describs" @focus="isShowAlert=false"></el-input>
              </el-form-item>
              <el-form-item label="招式提示">
                <el-input placeholder="输入招式提示" type="textarea" v-model="item.tips" @focus="isShowAlert=false"></el-input>
              </el-form-item>
             <el-form-item>
                <el-button size="small" type="danger" icon="el-icon-delete" plain @click.prevent="model.skills.splice(index,1)">删除</el-button>
             </el-form-item>
            </div>

          </div>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button type="primary" @click.prevent="add">提交</el-button>
      </el-form-item>
    </el-form>
    <el-alert :title="alertMsg" type="error" show-icon v-show="isShowAlert"></el-alert>
  </div>
</template>
<script>
export default {
  name: "HerosEdit",
  data() {
    return {
      activeName:'first',
      model: {
        _id: "",
        name: "",
        icon: "",
        title: "",
        categories: [],
        scores: {
          diffcut: 0,
          technicl: 0,
          attack: 0,
          live: 0
        },
        goods: {
          good: {
            tips: "",
            items: []
          },
          bad: {
            tips: "",
            items: []
          }
        },
        useage_skills: "",
        battle_skills: "",
        team_skills: "",
        partners: [], //队友
        skills: [
          //技能（招式）
        ]
      },
      isShowAlert: false,
      alertMsg: "",
      categories: [], //所有分类
      goods: [] //装备列表
    };
  },
  methods: {
    // 图片上传成功后的操作
    afterUpload(res) {
      //res是文件上传成功后服务端的返回数据
      this.model.icon = res.imgUrl;
    },

    // 添加英雄
    add() {
      // 判断英雄名是否合法
      let { name, icon } = this.model;
      name = name.trim();
      if (!name) {
        this.alertMsg = "英雄名称不合法";
        this.isShowAlert = true;
        return;
      }
      // 判断是添加英雄还是编辑英雄
      let { _id } = this.$route.params;
      if (!_id) {
        // 添加英雄---发送ajax请求
        this.$http
          .post("/heros", this.model)
          .then(res => {
            // 添加成功
            this.$message({
              type: "success",
              message: "英雄添加成功！"
            });
            this.$router.push("/heros/list");
          })
          .catch(err => {
            // 添加失败
            this.alertMsg = `英雄添加失败！${err}`;
            this.isShowAlert = true;
          });
      } else {
        // 编辑英雄---发送ajax请求
        this.$http
          .put("/heros", this.model)
          .then(res => {
            // 修改成功
            this.$message({
              type: "success",
              message: "英雄修改成功！"
            });
            this.$router.push("/heros/list");
          })
          .catch(err => {
            // 修改失败
            this.alertMsg = `英雄修改失败！${err}`;
            this.isShowAlert = true;
          });
      }
    },
    // 根据_id请求英雄
    async getheroById() {
      let _id = this.$route.params._id;
      let res = await this.$http.get(`/heros?_id=${_id}`);
      this.model = res.data.data;
      this.model.scores = this.model.scores || {}
    },
    // 获取所有分类
    async getCategories() {
      let result = await this.$http.get("/categories");
      this.categories = result.data.data;
    },
    // 获取所有装备
    async getGoods() {
      let result = await this.$http.get("/goods");
      this.goods = result.data.data;
    }
  },

  created() {
    //在组件的created阶段
    this.getCategories(); //获取分类列表
    this.getGoods(); //获取所有装备列表
    this.$route.params._id && this.getheroById(); //当路径参数中有_id时，才执行获取数据操作
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.score-box {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  & > div {
    display: flex;
    align-items: center;
    margin-right: 50px;
    & > span {
      margin-right: 20px;
    }
  }
}

.goods-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > div {
    margin-right: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    & > * {
      margin-right: 10px;
    }
  }
}

.skills-box{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 20px;
  &>div{
    margin-right: 50px;
    margin-bottom: 30px;
    width: 400px;
    border: 1px solid #eee;
    padding: 10px;
  }
}
</style>