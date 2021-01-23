<!--
 * @Author: your name
 * @Date: 2019-11-27 09:02:20
 * @LastEditTime: 2020-05-26 19:07:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\views\index\index.vue
 -->
<style lang="scss" scoped>
.member-content {
  padding: 0 15px;
  .member-content-title {
    color: #409eff;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    padding: 10px;
    background: #e8e8e8;
    border-radius: 4px;
    margin-bottom: 15px;
    .header-icon {
      margin-right: 6px;
    }
  }
}
</style>

<template>
  <div class="page-container">
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
                <!-- <el-form-item label="审核状态" prop="checkstatus">
                  <el-select v-model="searchform.checkstatus" class="search-input" placeholder="请选择">
                    <el-option
                      v-for="item in checkstatusList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item label="会员ID" prop="id">
                  <el-input
                    v-model="searchform.id"
                    clearable
                    placeholder="请输入"
                    class="search-input"
                  ></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="truename">
                  <el-input
                    v-model="searchform.truename"
                    clearable
                    placeholder="请输入"
                    class="search-input"
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input
                    v-model="searchform.phone"
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
                  icon="el-icon-search"
                  @click="handleCat(scope.$index, scope.row)"
                >查看</el-button>
                <el-button
                  v-if="scope.row.checkstatus === 2"
                  type="text"
                  icon="el-icon-circle-plus"
                  @click="handleAdd(scope.$index, scope.row)"
                >添加案子</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="truename" label="会员姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="checkstatus" label="审核状态" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.checkstatus === 1" style="color: #E6A23C">待审核</span>
                <span v-if="scope.row.checkstatus === 2" style="color: #67C23A">审核成功</span>
                <span v-if="scope.row.checkstatus === 3">审核拒绝</span>
              </template>
            </el-table-column>
            <el-table-column prop="recommendmemberid" label="推荐人ID" width="80">
              <template
                slot-scope="scope"
              >{{scope.row.recommendmemberid ? scope.row.recommendmemberid : ''}}</template>
            </el-table-column>
            <el-table-column prop="recommendmembername" label="推荐人真实姓名"></el-table-column>
            <el-table-column prop="recommendname" label="推荐人姓名"></el-table-column>
            <el-table-column prop="createDate" label="注册时间"></el-table-column>
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

    <!-- 查看 -->
    <el-dialog
      title="会员详情"
      :visible.sync="visible"
      width="1000px"
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <el-tabs
        tab-position="right"
        style="min-height: 400px;"
        v-model="tabvalue"
        @tab-click="handleTabClick"
      >
        <!-- 会员基本信息 -->
        <el-tab-pane label="基本信息" name="1">
          <div class="member-content">
            <div class="member-content-title">
              会员基本信息
              <i class="header-icon el-icon-info"></i>
              <el-button type="primary" size="mini" @click="editInfo" v-if="!isedit">编辑</el-button>
              <el-button type="primary" size="mini" @click="editInfoSave('form')" v-else>保存</el-button>
            </div>
            <el-form
              ref="form"
              :model="form"
              :inline="true"
              :rules="rules"
              label-width="80px"
              class="operate-form-box"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item label="会员姓名" prop="truename">
                    <el-input
                      v-model="form.truename"
                      class="form-ipt-width"
                      placeholder="请输入"
                      :disabled="!isedit"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="phone">
                    <el-input
                      v-model="form.phone"
                      class="form-ipt-width"
                      placeholder="请输入"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="会员状态" prop="checkstatus">
                    <el-select
                      v-model="form.checkstatus"
                      filterable
                      placeholder="请选择"
                      class="form-ipt-width"
                      :disabled="!isedit"
                    >
                      <el-option
                        v-for="item in checkstatusList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="工作地址" prop="workprovince">
                    <el-select
                      v-model="form.workprovince"
                      filterable
                      placeholder="请选择"
                      class="form-ipt-width"
                      :disabled="!isedit"
                    >
                      <el-option
                        v-for="item in provinceList"
                        :key="item.id"
                        :label="item.provincename"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="生活地址" prop="lifeprovince">
                    <el-select
                      v-model="form.lifeprovince"
                      filterable
                      placeholder="请选择"
                      class="form-ipt-width"
                      :disabled="!isedit"
                    >
                      <el-option
                        v-for="item in provinceList"
                        :key="item.id"
                        :label="item.provincename"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="注册时间" prop="createDate">
                    <el-input
                      v-model="form.createDate"
                      class="form-ipt-width"
                      placeholder="请输入"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="推荐人ID" prop="recommendmemberid">
                    <el-input
                      v-model="form.recommendmemberid"
                      class="form-ipt-width"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="推荐人真实姓名" prop="recommendmembername" label-width="120px">
                    <el-input
                      v-model="form.recommendmembername"
                      class="form-ipt-width"
                      disabled
                      style="width: 410px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="推荐人" prop="recommendname">
                    <el-input
                      v-model="form.recommendname"
                      style="width: 720px"
                      placeholder="请输入"
                      :disabled="!isedit"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="备注" prop="description">
                    <el-input
                      v-model="form.description"
                      style="width: 720px"
                      placeholder="请输入"
                      :disabled="!isedit"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="member-content-title">
              操作
              <i class="header-icon el-icon-info"></i>
            </div>
          </div>
          <div style="text-align: center; margin-top: 50px" >
            <el-button size="mini" @click="visible = false">取 消</el-button>
            <el-button type="primary" size="mini" @click="handleEditConfirm(1)" v-if="rowData.checkstatus === 1">审核通过</el-button>
            <el-button type="danger" size="mini" @click="handleEditConfirm(2)" v-if="rowData.checkstatus === 1">审核拒绝</el-button>
            <el-button type="danger" size="mini" @click="handleDelete" v-if="rowData.checkstatus !== 1">删除</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="案子列表" name="3" :disabled="checkstatus=== 1">
          <CaseList v-if="tabvalue === '3'" :detailid="rowid"></CaseList>
        </el-tab-pane>
        <!-- <el-tab-pane label="收益列表" name="2" :disabled="checkstatus=== 1">
          <Income v-if="tabvalue === '2'" :detailid="rowid"></Income>
        </el-tab-pane>-->
      </el-tabs>
    </el-dialog>

    <!-- 添加案子 -->
    <el-dialog
      title="添加案子"
      :visible.sync="addvisible"
      width="680px"
      @close="closeDialogAdd('addform')"
      :close-on-click-modal="false"
    >
      <el-form
        ref="addform"
        :model="addform"
        :inline="true"
        :rules="addrules"
        label-width="120px"
        class="operate-form-box"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="案子标题" prop="casetitle">
              <el-input
                v-model="addform.casetitle"
                style="width:470px"
                placeholder="请输入"
                clearable
                :rows="3"
                resize="none"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="案子内容" prop="casecontent">
              <el-input
                v-model="addform.casecontent"
                style="width:470px"
                placeholder="请输入"
                clearable
                :rows="5"
                resize="none"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="案子金额(元)" prop="amount">
              <el-input
                v-model="addform.amount"
                class="form-ipt-width"
                placeholder="请输入"
                clearable
                style="width:470px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center; margin-top: 10px">
          <el-button size="mini" @click="addvisible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="handleAddSave('addform')">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Income from "./components/income.vue";
import CaseList from "./components/caselist.vue";
export default {
  data() {
    const reg = /^[1-9]{1}[0-9]*$|^0{1}\.{1}[0-9]+$|^[1-9]{1}[0-9]*\.{1}[0-9]+$/;
    const checknum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }
      if (!reg.test(value)) {
        callback(new Error("数值必须大于0"));
      } else {
        callback();
      }
    };
    return {
      searchform: {
        truename: "",
        phone: "",
        id: ""
      },
      searchresult: {
        truename: "",
        phone: "",
        id: ""
      },
      tableData: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      form: {
        truename: "",
        phone: "",
        recommendname: "",
        workprovince: "",
        lifeprovince: "",
        checkstatus: "",
        createDate: "",
        description: "",
        recommendmemberid: "",
        recommendmember: ""
      },
      rules: {
        truename: [{ required: true, message: "不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "不能为空", trigger: "blur" }],
        workprovince: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        lifeprovince: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        checkstatus: [{ required: true, message: "不能为空", trigger: "blur" }],
        createDate: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      visible: false,
      actionType: 0,
      actionTypeName: "",
      rowData: {},
      rowid: "",
      tabvalue: "1",
      isedit: false,
      provinceList: [],
      addform: {
        amount: "",
        casecontent: "",
        casetitle: ""
      },
      addrules: {
        casecontent: [{ required: true, message: "不能为空", trigger: "blur" }],
        casetitle: [{ required: true, message: "不能为空", trigger: "blur" }],
        amount: [{ required: true, validator: checknum, trigger: "blur" }]
      },
      addvisible: false,
      checkstatusList: [
        {
          id: 1,
          name: "待审核"
        },
        {
          id: 2,
          name: "审核成功"
        },
        {
          id: 3,
          name: "审核拒绝"
        }
      ],
      checkstatus: 1
    };
  },
  components: {
    Income,
    CaseList
  },
  computed: {
    ...mapState({
      userinfo: state => state.user.userinfo
    })
  },
  created() {
    this.gotData();
    this.gotProvinceList();
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
        truename: this.searchresult.truename,
        phone: this.searchresult.phone,
        userid: this.searchresult.id,
        pagenum: this.page,
        pagesize: this.limit
      };
      this.loading = true;
      this.$store
        .dispatch("member/List", {
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
    // 查看
    handleCat(index, row) {
      this.rowid = row.id;
      this.tabvalue = "1";
      this.visible = true;
      this.gotDetail();
    },
    handleTabClick(tab, event) {
      this.tabvalue = tab.name;
      const index = parseInt(tab.name);
      switch (index) {
        case 1:
          // 基本信息
          this.isedit = false;
          // this.gotDetail();
          break;
        case 2:
          // 会员收益
          break;
        default:
      }
    },
    // 详情
    gotDetail() {
      const params = {
        id: this.rowid
      };
      this.$store
        .dispatch("member/Detail", {
          data: params
        })
        .then(result => {
          if (result.code === 0) {
            const data = result.data;
            this.rowData = data;
            this.form = {
              truename: data.truename,
              phone: data.phone,
              recommendname: data.recommendname,
              workprovince: data.workprovince,
              lifeprovince: data.lifeprovince,
              checkstatus: data.checkstatus,
              createDate: data.createDate,
              description: data.description,
              recommendmemberid: data.recommendmemberid,
              recommendmember: data.recommendmember
            };
            this.checkstatus = data.checkstatus;
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    editInfo() {
      this.isedit = true;
    },
    // 信息编辑
    editInfoSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            description: this.form.description,
            lifeprovince: this.form.lifeprovince,
            truename: this.form.truename,
            workprovince: this.form.workprovince,
            recommendname: this.form.recommendname,
            id: this.rowid,
            checkstatus: this.form.checkstatus
          };
          const loading = this.$loading({
            lock: true,
            text: "数据提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.$store
            .dispatch("member/Update", {
              data: params
            })
            .then(result => {
              loading.close();
              if (result.code === 0) {
                this.$message.success("编辑成功");
                this.isedit = false;
                this.gotDetail();
              } else if (result.code === 401) {
                this.isedit = false;
                this.$message.error(result.msg);
              } else {
                this.$message.error(result.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEditConfirm(value) {
      if (value === 1) {
        this.$confirm("审核通过该会员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false
        })
          .then(() => {
            // 审核通过
            this.handleAuditSave();
          })
          .catch(() => {});
      } else {
        this.$confirm("审核拒绝该会员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false
        })
          .then(() => {
            // 审核拒绝
            this.handleAuditFailSave();
          })
          .catch(() => {});
      }
    },
    // 审核拒绝
    handleAuditFailSave() {
      const params = {
        id: this.rowid
      };
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("member/AuditFail", {
          data: params
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.$message.success("操作成功");
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
    // 审核通过
    handleAuditSave() {
      const params = {
        id: this.rowid
      };
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("member/Audit", {
          data: params
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.$message.success("操作成功");
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
    // 关闭查看弹窗
    closeDialog() {
      this.isedit = false;
      this.gotData()
    },
    // 删除操作
    handleDelete() {
      this.$confirm("此操作将永久删除该会员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          this.deleteRow();
        })
        .catch(() => {});
    },
    // 删除会员
    deleteRow() {
      const params = {
        id: this.rowid
      };
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("member/Remove", {
          data: params
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.$message.success("删除成功");
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
    closeDialogAdd(formName) {
      this.$refs[formName].resetFields();
    },
    // 添加案子
    handleAdd(index, row) {
      this.rowid = row.id;
      this.addvisible = true;
    },
    handleAddSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const amount = this.addform.amount * 100;
          const params = {
            casetitle: this.addform.casetitle,
            casecontent: this.addform.casecontent,
            amount: amount,
            memberid: this.rowid
          };
          const loading = this.$loading({
            lock: true,
            text: "数据提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.$store
            .dispatch("member/CaseAdd", {
              data: params
            })
            .then(result => {
              loading.close();
              if (result.code === 0) {
                this.$message.success("案子添加成功");
                this.addvisible = false;
              } else if (result.code === 401) {
                this.addvisible = false;
                this.$message.error(result.msg);
              } else {
                this.$message.error(result.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 省份下拉
    gotProvinceList() {
      const params = {};
      this.$store
        .dispatch("member/Province", {
          data: params
        })
        .then(result => {
          if (result.code === 0) {
            this.provinceList = result.data;
          } else {
            this.$message.error(result.msg);
          }
        });
    }
  }
};
</script>

