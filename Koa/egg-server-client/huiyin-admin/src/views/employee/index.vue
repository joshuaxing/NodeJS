<!--
 * @Author: your name
 * @Date: 2019-11-27 09:02:20
 * @LastEditTime: 2020-05-15 19:02:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\views\index\index.vue
 -->
<style lang="scss" scoped>
</style>

<template>
  <div class="page-container">
    <!-- <v-breadcrumb title="权限管理" title2="用户管理"></v-breadcrumb> -->
    <div class="content-container">
      <el-card class="search-card" shadow="never">
        <div class="crumbs-title">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-search crumbs-i-right"></i>数据筛选
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search-box">
          <el-form :model="searchform" ref="searchform" class="search-form" :inline="true">
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户姓名" prop="nikename">
                  <el-input
                    v-model="searchform.nikename"
                    clearable
                    placeholder="请输入"
                    class="search-input"
                  ></el-input>
                </el-form-item>
                <el-form-item label-width="0px">
                  <el-button type="primary" @click="handleSearch">查询</el-button>
                  <el-button type="info" @click="resetSearch('searchform')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="table-card" shadow="never">
        <div class="crumbs-title">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-s-data crumbs-i-right"></i>数据列表
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="form-container">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <div class="container-table">
          <el-table
            :data="tableData"
            border
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column label="操作" width="120" align="center" fixed="left">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                 <el-button
                  type="text"
                  icon="el-icon-delete"
                  style="color: red"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="60"></el-table-column>
            <el-table-column prop="nickname" label="用户姓名"></el-table-column>
            <el-table-column prop="username" label="登录名"></el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template slot-scope="scope">{{scope.row.status === 1 ? '启用' : '禁用' }}</template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间"></el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              background
              @size-change="changeLimit"
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 新增/编辑 -->
    <el-dialog
      :title="actionTypeName"
      :visible.sync="visible"
      width="680px"
      @close="closeDialog('form')"
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        :inline="true"
        :rules="rules"
        label-width="100px"
        class="operate-form-box"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="登陆名" prop="username">
              <el-input
                v-model="form.username"
                class="form-ipt-width"
                style="width: 470px"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="actionType === 1">
            <el-form-item label="登陆密码" prop="password">
              <el-input
                v-model="form.password"
                class="form-ipt-width"
                style="width: 470px"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户姓名" prop="nickname">
              <el-input
                v-model="form.nickname"
                class="form-ipt-width"
                style="width: 470px"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户权限" prop="power">
              <div style="width:470px">
                <el-checkbox-group v-model="form.power">
                  <el-checkbox
                    :label="item.id"
                    v-for="item in powerList"
                    :key="item.id"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center; margin-top: 10px">
          <el-button size="mini" @click="visible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="handleSave('form')">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    const checkPassword = (rule, value, callback) => {
      if (this.actionType === 1) {
        if (!value) {
          return callback(new Error("不能为空"));
        }
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        if (!reg.test(value)) {
          callback(new Error("密码为6-12位数字和字母组合"));
        } else {
          callback();
        }
      }
    };
    return {
      searchform: {
        nikename: ""
      },
      searchresult: {
        nikename: ""
      },
      tableData: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      typeList: [],
      form: {
        username: "",
        nickname: "",
        status: 1,
        power: [],
        password: ""
      },
      visible: false,
      rules: {
        username: [{ required: true, message: "不能为空", trigger: "blur" }],
        nickname: [{ required: true, message: "不能为空", trigger: "blur" }],
        status: [{ required: true, message: "不能为空", trigger: "change" }],
        power: [{ required: true, message: "不能为空", trigger: "change" }],
        password: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ]
      },
      actionType: 0,
      actionTypeName: "",
      rowData: {},
      powerList: [
        {
          id: 10,
          name: "后台用户"
        },
        {
          id: 20,
          name: "会员管理"
        },
        {
          id: 30,
          name: "咨询管理"
        },
        {
          id: 40,
          name: "收益管理"
        }
      ]
    };
  },
  components: {},
  computed: {
    ...mapState({
      userinfo: state => state.user.userinfo
    })
  },
  created() {
    this.gotData();
  },
  mounted() {},
  methods: {
    //查询
    handleSearch() {
      this.page = 1;
      this.searchresult = this.searchform;
      this.gotData();
    },
    //重置查询
    resetSearch(formName) {
      this.$refs[formName].resetFields();
      this.searchresult = this.searchform;
      this.page = 1;
      this.gotData();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.page = val;
      this.gotData();
    },
    //改变页数
    changeLimit(val) {
      this.page = 1;
      this.limit = val;
      this.gotData();
    },
    //列表数据
    gotData() {
      const params = {
        username: this.searchresult.nikename,
        pagenum: this.page,
        pagesize: this.limit
      };
      this.loading = true;
      this.$store
        .dispatch("user/userList", {
          data: params
        })
        .then(result => {
          if (result.code === 0) {
            this.tableData = result.data;
            this.total = result.count;
          } else {
            this.$message.error(result.msg);
          }
          this.loading = false;
        });
    },
    handleAdd() {
      this.actionType = 1;
      this.actionTypeName = "新增";
      this.visible = true;
    },
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            username: this.form.username,
            nickname: this.form.nickname,
            status: this.form.status,
            powerlist: this.form.power,
            password: this.form.password
          };
          if (this.actionType === 1) {
            this.handleAddSave(params);
          } else {
            this.handleEditSave(params);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    handleAddSave(params) {
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("user/userAdd", {
          data: params
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.$message.success("新增成功");
            this.visible = false;
            this.gotData();
          } else if (result.code === 401) {
            this.visible = false;
            this.$message.error(result.msg);
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.visible = true;
      this.actionType = 2;
      this.actionTypeName = "编辑";
      const params = {
        id: row.id
      };
      this.$store
        .dispatch("user/userDetail", {
          data: params
        })
        .then(result => {
          if (result.code === 0) {
            const data = result.data;
            this.rowData = data;
            this.form = {
              username: data.username,
              nickname: data.nickname,
              status: data.status,
              power: data.powerlist
            };
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    // 编辑
    handleEditSave(params) {
      const dataparams = {
        ...params,
        id: this.rowData.id
      };
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("user/userUpdate", {
          data: dataparams
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.$message.success("编辑成功");
            this.visible = false;
            this.gotData();
          } else if (result.code === 401) {
            this.visible = false;
            this.$message.error(result.msg);
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    handleResetFields(formName) {
      this.$refs[formName].resetFields();
      this.form = {
        username: "",
        nickname: "",
        status: 1,
        power: [],
        password: ""
      };
    },
    closeDialog(formName) {
      this.handleResetFields(formName);
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.deleteRow(row.id)
        }).catch(() => {});
    },
    deleteRow(id) {
      const params = {
        id: id
      };
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("user/Remove", {
          data: params
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.$message.success("删除成功");
            this.gotData();
          } else if (result.code === 401) {
            this.$message.error(result.msg);
          } else {
            this.$message.error(result.msg);
          }
        });
    },
  }
};
</script>

