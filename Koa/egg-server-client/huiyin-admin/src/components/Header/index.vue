<style lang="scss" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
  .header-left-box {
    height: 70px;
    display: flex;
    .header-left {
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .collapse-btn {
        padding: 0 15px;
        cursor: pointer;
        line-height: 22px;
      }
    }
    .header-middle {
      height: 70px;
      display: flex;
      padding: 0;
      margin: 0;
      .nav-li-item {
        width: 80px;
        height: 70px;
        font-weight: 400;
        font-size: 14px;
        line-height: 70px;
        text-align: center;
        cursor: pointer;
        &.active {
          color: rgb(32, 160, 255);
        }
      }
    }
  }

  .header-right {
    padding-right: 50px;
    .header-user-con {
      display: flex;
      height: 70px;
      align-items: center;
      .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
      }
      .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
      }
      .user-avator {
        width: 32px;
        height: 32px;
        margin-left: 20px;
        img {
          display: block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
      .user-name {
        margin-left: 10px;
        .el-dropdown-link {
          cursor: pointer;
        }
      }
      .el-dropdown-menu__item {
        text-align: center;
      }
    }
  }
}
</style>
<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header-left-box">
      <div class="header-left">
        <div class="collapse-btn" @click="collapseChage">
          <el-tooltip effect="dark" :content="collapse? `展开菜单`: `收缩菜单`" placement="bottom">
            <i :class="[ !collapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img
            src="~@/assets/images/logo.png"
          />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{userinfo.nickname}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      width="400px"
      @close="closeFormDialog('form')"
    >
      <el-form :model="form" ref="form" label-width="100px" :rules="rules">
        <el-form-item label="原密码" prop="oldpassWord">
          <el-input
            v-model="form.oldpassWord"
            type="password"
            placeholder="请输入原密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassWord">
          <el-input
            v-model="form.newpassWord"
            type="password"
            placeholder="请输入新密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="renewpassWord">
          <el-input
            v-model="form.renewpassWord"
            type="password"
            placeholder="请输入确认密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      fullscreen: false,
      dialogFormVisible: false,
      form: {
        oldpassWord: "",
        newpassWord: "",
        renewpassWord: ""
      },
      rules: {
        oldpassWord: [
          { required: true, message: "原密码不能为空", trigger: "blur" }
        ],
        newpassWord: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        renewpassWord: [
          { required: true, message: "确认密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  computed: {
    ...mapState({
      tagsList: state => state.settings.tagsList,
      collapse: state => state.settings.collapse,
      userinfo: state => state.user.userinfo
    })
  },
  created() {},
  mounted() {
    if (document.body.clientWidth < 1200) {
      this.collapseChage();
    }
  },
  methods: {
    saveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
          if (!reg.test(this.form.newpassWord)) {
            this.$message.error("密码为6-12位数字和字母组合");
            return;
          }
          if (this.form.newpassWord !== this.form.renewpassWord) {
            this.$message.error("新密码和确认密码不一致");
            return;
          }
          const params = {
            id: this.userinfo.userid,
            password: this.form.oldpassWord,
            newpassword: this.form.newpassWord
          }
          const loading = this.$loading({
            lock: true,
            text: "数据提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.$store
            .dispatch("user/editPassword", {
              data: params
            })
            .then(result => {
              this.dialogFormVisible = false;
              loading.close();
              if (result.code === 0) {
                this.$message.success("修改成功");
                //退出重新登录
                this.logOut();
              } else {
                this.$message.error(result.msg);
              }
            });
        }
      });
    },
    closeFormDialog(formName) {
      this.$refs[formName].resetFields();
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        this.logOut();
      } else if (command == "editPassword") {
        if (this.userinfo.userid) {
          this.dialogFormVisible = true;
        }
      }
    },
    //退出
    logOut() {
      const params = {
        id: this.userinfo.userid
      }
      this.$store
        .dispatch("user/loginout", {
          data: params
        })
        .then(result => {
          localStorage.removeItem("_huiyininfo");
          localStorage.removeItem("_huiyinmenu");
          sessionStorage.removeItem("_huiyinlink");
          this.$router.push("/login");
        });
    },
    // 侧边栏折叠
    collapseChage() {
      this.$store.commit("settings/ISCOLLAPSE");
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>

