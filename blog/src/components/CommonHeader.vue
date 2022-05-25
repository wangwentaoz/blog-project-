<template>
  <header>
    <div class="wrapper">
      <el-row>
        <el-col :span="4">
          <div class="logo">小滴博客</div>
        </el-col>
        <el-col :span="20">
          <el-menu
            mode="horizontal"
            class="nav"
            :default-active="$route.path"
            @select="hanleSelect"
            background-color="#2d2d2d"
            text-color="#9d9d9d"
            active-text-color="#fff"
          >
            <el-menu-item index="/">
              <router-link to="/"
                ><i class="iconfont icon-home"></i>首页</router-link
              >
            </el-menu-item>
            <el-menu-item index="/article" v-if="isSignIn === 1">
              <router-link to="/article">我的博客</router-link>
            </el-menu-item>
            <el-menu-item index="/login" v-if="isSignIn === 0">
              <router-link class="signBtn" to="/login">登录</router-link>
            </el-menu-item>
            <el-menu-item index="/personal" v-else-if="isSignIn === 1">
              <router-link class="signBtn" to="/personal">{{
                userinfo.nickname
              }}</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
    };
  },
  methods: {
    hanleSelect(index) {
      this.activeIndex = index;
    },
    getUserInfo() {
      this.$axios
        .get('/api/user/info')
        .then((res) => {
          console.log(res);
          let result = res.data;
          if (result.code === 0) {
            this.userinfo = result.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    isSignIn() {
      return this.$store.state.isSignIn;
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped>
header {
  background: #2d2d2d;
  color: #9d9d9d;
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  .logo {
    line-height: 60px;
    font-size: 18px;
  }
  .nav {
    float: right;
    border-bottom: none;
    li {
      padding: 0;
      a {
        display: inline-block;
        padding: 0 20px;
        .iconfont {
          vertical-align: top;
          margin: 0 5px 0 0;
        }
      }
    }
  }
}
.signBtn {
  background: #3b99fc !important;
  color: #fff !important;
  line-height: 60px;
}
</style>
