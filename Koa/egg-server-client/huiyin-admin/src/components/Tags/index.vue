<template>
    <div class="tags" v-if="showTags">
      <ul class="tags-ul">
        <li
          class="tags-li"
          v-for="(item, index) in tagsList"
          :class="{ active: isActive(item.path) }"
          :key="index"
        >
          <router-link :to="item.path" class="tags-li-title">
            {{ item.title }}
          </router-link>
          <span class="tags-li-icon" @click="closeTags(index)"
            ><i class="el-icon-close"></i
          ></span>
        </li>
      </ul>
      <div class="tags-close-box">
        <el-dropdown @command="handleTags">
          <el-button size="mini" type="primary">
            标签选项<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu size="small" slot="dropdown">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all" v-show="false">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      tagsList: []
    };
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      if (this.tagsList.length <= 1) {
        return;
      }
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    },
    // 设置标签
    setTags(route) {
      if (!this.userinfo.userid) {
        return
      }
      // router meta必须要设置title
      if (!route.meta.title) {
        return
      }
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.name
        });
      }
      // 保存当前页面地址
      const link = route.fullPath;
      sessionStorage.setItem('_huiyinlink', link)

      this.$store.commit("settings/TAGS", this.tagsList);
    },
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.user.userinfo
    }),
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    }
  },
  created() {
    
  },
  mounted () {
    this.setTags(this.$route)
  }
};
</script>

<style lang="scss">
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
  padding: 0 12px 0px;
  .tags-ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    .tags-li {
      float: left;
      margin: 3px 5px 2px 3px;
      border-radius: 3px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      height: 23px;
      line-height: 23px;
      border: 1px solid #e9eaec;
      background: #fff;
      padding: 0 5px 0 12px;
      vertical-align: middle;
      color: #666;
      transition: all 0.3s ease-in;
      a {
        text-decoration: none;
      }
      a:hover {
        color: #666;
      }
      &:not(.active):hover {
        background: #f8f8f8;  
      }
      .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
      }
      &.active {
        color: #fff;
        border: 1px solid #409eff;
        background-color: #409eff;
        .tags-li-title {
          color: #fff;
        }
      }
    }
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
}
</style>
