<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">汇银律师管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入登录名">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      width="400px"
      @close="closeFormDialog('passform')"
      :showClose="false"
    >
      <el-form :model="passform" ref="passform" label-width="100px" :rules="passrules">
        <el-form-item label="原密码" prop="oldpassWord">
          <el-input
            v-model="passform.oldpassWord"
            type="password"
            placeholder="请输入原密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassWord">
          <el-input
            v-model="passform.newpassWord"
            type="password"
            placeholder="请输入新密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="renewpassWord">
          <el-input
            v-model="passform.renewpassWord"
            type="password"
            placeholder="请输入确认密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="saveForm('passform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      dialogFormVisible: false,
      passform: {
        oldpassWord: "",
        newpassWord: "",
        renewpassWord: ""
      },
      passrules: {
        oldpassWord: [
          { required: true, message: "原密码不能为空", trigger: "blur" }
        ],
        newpassWord: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        renewpassWord: [
          { required: true, message: "确认密码不能为空", trigger: "blur" }
        ]
      },
      result: {}
    };
  },
  created() {
   
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleLogin();
        }
      });
    },
    handleLogin() {
      // 登录
      const params = {
        username: this.ruleForm.username,
        password: this.ruleForm.password
      };
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("user/login", {
          data: params
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.result = result.data;
            this.handleEnter();
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    handleEnter() {
      let data = this.result;
      const userinfo = {
        userid: data.id,
        nickname: data.nickname,
        token: data.token
      };
      const menu = data.powerlist
      localStorage.setItem("_huiyininfo", JSON.stringify(userinfo));
      localStorage.setItem("_huiyinmenu", JSON.stringify(menu));
      this.$router.push("/");
    },
    //修改密码
    saveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
          if (!reg.test(this.passform.newpassWord)) {
            this.$message.warning("密码为6-12位数字和字母组合");
            return;
          }
          if (this.passform.newpassWord !== this.passform.renewpassWord) {
            this.$message.warning("新密码和确认密码不一致");
            return;
          }
          const params = {
            id: this.result.id,
            password: this.passform.oldpassWord,
            newPassword: this.passform.newpassWord
          };
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
              loading.close();
              if (result.code === 0) {
                //进入
                this.dialogFormVisible = false;
                this.handleEnter()
              } else {
                this.$message.error(result.msg);
              }
            });
        }
      });
    },
    closeFormDialog(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login-wrap {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-image: url("~@/assets/images/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  width: 100%;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  color: #fff;
}
.login-tips span.login-tips-span {
  display: block;
  width: 30%;
  height: 30px;
  cursor: pointer;
}
.login-tips span.login-tips-span:nth-child(1) {
  float: left;
  color: #409eff;
}
.login-tips span.login-tips-span:nth-child(2) {
  float: right;
  text-align: right;
  color: #f56c6c;
}
</style>
