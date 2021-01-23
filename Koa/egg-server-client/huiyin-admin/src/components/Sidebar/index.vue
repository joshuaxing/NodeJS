<style lang="scss">
.sidebar {
  width: 200px !important;
  &.sidebar-collapse {
    width: 76px !important;
  }
  margin-top: 70px;
  &::-webkit-scrollbar {
    width: 0!important;
    height: 0!important;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu {
    width: 100%!important;
    height: 100%;
    border: none
  }
  .el-submenu {
    .el-menu-item {
      height: 40px !important;
      line-height: 40px !important;
      background-color: #1f2d3d !important;
      &:hover {
        background-color: #263445 !important;
      }
    }
  }
  .title-icon {
    margin-right: 14px;
  }
}
</style>
<template>
  <div class="sidebar" :class="{'sidebar-collapse': collapse}">
    <!--  -->
    <el-menu
      class="sidebar-el-menu"
      :default-active="$route.fullPath"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      :collapse="collapse"
      router
      @select="selectActive"
      :unique-opened="false"
    >
      <template v-for="item in powerlist">
        <template v-if="item.children && item.children.length">
          <el-submenu :index="item.id+''" :key="item.id">
            <template slot="title">
              <i class="iconfont title-icon" :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children && subItem.children.length" :index="subItem.link" :key="subItem.id">
                <template slot="title">{{ subItem.name }}</template>
                <el-menu-item
                  v-for=" threeItem in subItem.children"
                  :index="threeItem.link"
                  :key="threeItem.id"
                >{{ threeItem.name }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.link" :key="subItem.id">
                <i class="iconfont title-icon" :class="subItem.icon"></i>
                <span slot="title">{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.link" :key="item.id">
            <i class="iconfont title-icon" :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      powerlist: []
    };
  },
  computed: {
    ...mapState({
      collapse: state => state.settings.collapse,
      menuList: state => state.user.menuList
    })
  },
  created() {
    const menuListAll = window.menuList;
    const menuList = this.menuList;
    let powerlist = [];
    for(let i = 0; i < menuListAll.length; i++) {
      for(let j = 0; j < menuList.length; j++) {
        if (parseInt(menuList[j]) === menuListAll[i].id) {
          powerlist.push(menuListAll[i])
        }
      }
    }
    this.powerlist = powerlist;
    if (powerlist.length > 0) {
      if (sessionStorage.getItem('_huiyinlink')) {
        const link = sessionStorage.getItem('_huiyinlink');
        this.$router.push(link);
      } else {
        const link = powerlist[0].link;
        sessionStorage.setItem('_huiyinlink', link)
        this.$router.push(link)
      }
    }
  },
  methods: {
    selectActive(index, indexPath) {
      //console.log(index) /generalize
      //console.log(indexPath) ['/generalize']
    }
  }
};
</script>


