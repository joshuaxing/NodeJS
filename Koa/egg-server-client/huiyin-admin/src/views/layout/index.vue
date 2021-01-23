<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  .sidebar-container {
    transition: width 0.28s;
    width: 200px !important;
    background-color: #324157;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    &.sidebar-container-collapse {
      width: 64px !important;
    }
    .sidebar-scroll {
      width: 220px;
      height: 100%;
      overflow-x: hidden;
      position: relative;
    }
    .logo-box {
      position: fixed;
      left: 0;
      top: 0;
      width: 200px;
      height: 70px;
      transition: width 0.28s;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .logo-image {
        display: block;
        width: 123px;
        height: 22px;
        margin-right: 40px;
      }
      .logo-text {
        width: 100%;
        color: #fff;
        line-height: 70px;
        font-size: 20px;
        text-align: center;
      }
      &.logo-box-collapse {
        width: 64px !important;
        .logo-image {
          display: none;
        }
        .logo-text {
          font-size: 0;
        }
      }
    }
  }
  .content-box {
    position: absolute;
    left: 200px;
    right: 0;
    top: 0;
    bottom: 0;
    padding-bottom: 30px;
    transition: left 0.3s ease-in-out;
    background: #f1f3f5;
    .content {
      position: absolute;
      left: 0;
      right: 0;
      top: 100px;
      bottom: 0;
      padding: 15px;
      overflow-y: scroll;
      box-sizing: border-box;
    }
  }
  .content-collapse {
    left: 64px;
  }
}
</style>

<template>
  <div class="app-wrapper">
    <div class="sidebar-container" :class="{'sidebar-container-collapse': collapse}">
      <div class="sidebar-scroll">
        <div class="logo-box" :class="{'logo-box-collapse': collapse}">
          <!-- <img src="@/assets/images/logo.png" alt="" class="logo-image"> -->
          <div class="logo-text">汇银律师管理系统</div>
        </div>
        <v-sidebar></v-sidebar>
      </div>
    </div>
    <div class="content-box" :class="{'content-collapse': collapse}">
      <v-head></v-head>
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <!-- 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了 -->
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <!-- 回到顶部 -->
        <v-backtop></v-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "@/components/Header/index.vue";
import vSidebar from "@/components/Sidebar/index.vue";
import vTags from "@/components/Tags/index.vue";
import vBacktop from "@/components/Backtop/index.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      menuList: menuList
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags,
    vBacktop
  },
  computed: {
    ...mapState({
      tagsList: state => state.settings.tagsList,
      collapse: state => state.settings.collapse,
      userinfo: state => state.user.userinfo
    })
  },
  created() {},
  mounted() {
    if (!this.userinfo.userid) {
      this.$router.push('/login')
    }
  },
  methods: {
     // 菜单列表
    gotMenuList() {
      const params = {
        userid: this.userinfo.userid
      };
      this.$store
        .dispatch("user/modelList", {
          data: params
        })
        .then(result => {
          if (result.code === 0) {
            const menuList = result.data;
            store.commit('user/gotmenuList', menuList)
          } else {
            this.$message.error(result.msg);
          }
        });
    },
  }
};
</script>
