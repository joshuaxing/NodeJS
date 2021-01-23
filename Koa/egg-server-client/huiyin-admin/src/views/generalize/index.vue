<!--
 * @Author: your name
 * @Date: 2019-11-27 09:02:20
 * @LastEditTime: 2020-06-04 18:36:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\views\index\index.vue
 -->
<style lang="scss" scoped>
.generalize-wrapper {
  padding: 0 15px 60px;
  .generalize-title {
    color: #409eff;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    padding: 10px;
    background: #e8e8e8;
    border-radius: 4px;
  }
  .row-ul {
    margin-top: 30px;
    .row-li {
      display: flex;
      border-bottom: 1px dotted #ccc;
      padding: 20px 0;

      .row-li-item {
        flex: 1;
        margin-right: 10px;
        height: 26px;
        line-height: 26px;
        color: #000;
        font-weight: 500;
        display: flex;
        align-items: center;
        font-size: 14px;
        .row-item-span {
          width: 80px;
          display: block;
          color: #575f6b;
          font-weight: 400;
          text-align: left;
          font-size: 13px;
        }
      }
    }
  }
}
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
                <el-form-item label="收款人ID" prop="memberid">
                  <el-input
                    v-model="searchform.memberid"
                    clearable
                    placeholder="请输入"
                    class="search-input"
                  ></el-input>
                </el-form-item>
                <el-form-item label="支付状态" prop="paystatus">
                  <el-select
                    v-model="searchform.paystatus"
                    class="search-input"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in checkstatusList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
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
        <!-- <div class="form-container">
          <el-button type="primary" @click="handleAdd">新增兑换</el-button>
        </div> -->
        <div class="container-table">
          <el-table
            :data="tableData"
            border
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column label="操作" align="center" fixed="left" width="70">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-star-on"
                  v-show="scope.row.paystatus === 1"
                  @click="handleSave(scope.$index, scope.row)"
                >支付</el-button>
                <el-button
                  type="text"
                  icon="el-icon-search"
                  style="margin-left: 0"
                  @click="handleCat(scope.$index, scope.row)"
                >查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="left" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="handleAdd(scope.$index, scope.row)"
                >新增兑换</el-button>
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  style="margin-left: 0"
                  @click="handleSet(scope.$index, scope.row)"
                >编辑</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="showamount" label="收益金额(元)"></el-table-column>
            <el-table-column prop="memberid" label="收款人ID" width="80"></el-table-column>
            <el-table-column prop="membername" label="收款人名字"></el-table-column>
            <el-table-column prop="sourcememberid" label="来源人ID" width="80">
              <template
                slot-scope="scope"
              >{{scope.row.sourcememberid === 0 ? '' : scope.row.sourcememberid}}</template>
            </el-table-column>
            <el-table-column prop="sourcemembername" label="来源人姓名"></el-table-column>
            <el-table-column prop="incometype" label="收益类型">
              <template
                slot-scope="scope"
              >{{scope.row.incometype === 1 ? '注册' : scope.row.incometype === 2 ? '案子' : scope.row.incometype === 3 ? '兑换' : ''}}</template>
            </el-table-column>
            <el-table-column prop="paystatus" label="支付状态">
              <template slot-scope="scope">
                <span v-if="scope.row.paystatus === 1" style="color: #E6A23C">未付款</span>
                <span v-if="scope.row.paystatus === 2" style="color: #67C23A">已付款</span>
                <span v-if="scope.row.paystatus === 3">拒付款</span>
              </template>
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

    <!-- 查看 -->
    <el-dialog title="收益详情" :visible.sync="visible" width="800px" :close-on-click-modal="false">
      <div class="generalize-wrapper">
        <div class="row-ul">
          <div class="row-li">
            <div class="row-li-item">
              <div class="row-item-span">收款人姓名:</div>
              <div class="row-item-content">{{rowData.membername}}</div>
            </div>
            <div class="row-li-item">
              <div class="row-item-span">来源人姓名:</div>
              <div class="row-item-content">{{rowData.sourcemembername}}</div>
            </div>
            <div class="row-li-item">
              <div class="row-item-span">收益类型:</div>
              <div
                class="row-item-content"
              >{{rowData.incometype === 1 ? '注册' : rowData.incometype === 2 ? '案子' : rowData.incometype === 3 ? '兑换' : ''}}</div>
            </div>
          </div>
          <div class="row-li">
            <div class="row-li-item">
              <div class="row-item-span">付款金额:</div>
              <div class="row-item-content">{{rowData.showamount}}元</div>
            </div>
            <div class="row-li-item">
              <div class="row-item-span">支付状态:</div>
              <div
                class="row-item-content"
              >{{rowData.paystatus === 1 ? '未付款' : rowData.paystatus === 2 ? '已付款' : rowData.paystatus === 3 ? '拒付款' : ''}}</div>
            </div>
            <div class="row-li-item">
              <div class="row-item-span">创建时间:</div>
              <div class="row-item-content">{{rowData.createDate}}</div>
            </div>
          </div>
          <div class="row-li" v-show="rowData.paystatus !== 1">
            <div class="row-li-item">
              <div class="row-item-span">备注:</div>
              <div class="row-item-content">{{rowData.remark}}</div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center; margin-top: 10px">
          <el-button size="mini" @click="visible = false">取 消</el-button>
          <el-button type="danger" size="mini" @click="handleDelete">删 除</el-button>
        </div>
      </span>
    </el-dialog>

    <!-- 支付弹窗 -->
    <el-dialog
      title="支付操作"
      :visible.sync="checkvisible"
      width="750px"
      :close-on-click-modal="false"
      @close="closeDialog('form')"
    >
      <el-form
        ref="form"
        :model="form"
        :inline="true"
        :rules="rules"
        label-width="140px"
        class="operate-form-box"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="支付状态" prop="paystatus">
              <el-radio-group v-model="form.paystatus">
                <el-radio :label="2">已付款</el-radio>
                <el-radio :label="3">拒付款</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="支付金额(元)" prop="amount">
              <el-input v-model="form.amount" style="width: 470px" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                style="width: 470px"
                placeholder="请输入"
                type="textarea"
                :rows="4"
                resize="none"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center; margin-top: 10px">
          <el-button size="mini" @click="checkvisible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="handleEditSave('form')">确 定</el-button>
        </div>
      </span>
    </el-dialog>

    <!-- 新增/编辑 -->
    <el-dialog
      :title="actionName"
      :visible.sync="setvisible"
      width="750px"
      :close-on-click-modal="false"
      @close="closeSetDialog('setform')"
    >
      <el-form
        ref="setform"
        :model="setform"
        :inline="true"
        :rules="setrules"
        label-width="140px"
        class="operate-form-box"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="收款人ID" required>
              <el-input v-model="rowData.memberid" style="width: 470px" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="收款人" required>
              <el-input v-model="rowData.membername" style="width: 470px" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="收款金额(元)" prop="amount">
              <el-input v-model="setform.amount" style="width: 470px" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="setform.remark"
                style="width: 470px"
                placeholder="请输入"
                type="textarea"
                :rows="4"
                resize="none"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center; margin-top: 10px">
          <el-button size="mini" @click="setvisible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="handleTableSave('setform')">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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

    const regnum = /^(\-|\+)?\d+(\.\d+)?$/;
    const checknumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }
      if (!regnum.test(value)) {
        callback(new Error("数值必须为数字"));
      } else {
        callback();
      }
    };

    const regid = /^[1-9]\d*$/;
    const checkId = (rule, value, callback) => {
      if (this.actionType === 1) {
        if (!value) {
          return callback(new Error("不能为空"));
        }
        callback();
      } else {
        callback();
      }
    };
    const checkIdtest = (rule, value, callback) => {
      if (this.actionType === 1) {
        if (!value) {
          return callback(new Error("不能为空"));
        }
        if (!regid.test(value)) {
          callback(new Error("Id必须为正整数"));
        } else {
          /*
          const params = {
            memberid: this.setform.memberid
          };
          this.$store
            .dispatch("member/Check", {
              data: params
            })
            .then(result => {
              if (result.code === 0) {
                callback();
              } else {
                callback(new Error(result.msg));
              }
            });
            */
          callback();
        }
      } else {
        callback();
      }
    };

    return {
      searchform: {
        paystatus: "",
        memberid: ""
      },
      searchresult: {
        paystatus: "",
        memberid: ""
      },
      tableData: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      actionType: 0,
      actionTypeName: "",
      rowData: {},
      visible: false,
      checkstatusList: [
        {
          id: 1,
          name: "未付款"
        },
        {
          id: 2,
          name: "已付款"
        },
        {
          id: 3,
          name: "拒付款"
        }
      ],
      checkvisible: false,
      form: {
        paystatus: 2,
        remark: "",
        amount: ""
      },
      rules: {
        amount: [{ required: true, validator: checknum, trigger: "blur" }],
        remark: [{ required: true, message: "不能为空", trigger: "blur" }],
        paystatus: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      setform: {
        remark: "",
        amount: "",
        incometype: 3,
        memberid: ""
      },
      setrules: {
        amount: [{ required: true, validator: checknumber, trigger: "blur" }],
        remark: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      actionType: 0,
      actionName: "",
      setvisible: false
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
        pagenum: this.page,
        pagesize: this.limit,
        paystatus: this.searchresult.paystatus,
        memberid: this.searchresult.memberid
      };
      this.loading = true;
      this.$store
        .dispatch("generalize/List", {
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
    // 详情
    handleCat(index, row) {
      this.visible = true;
      const params = {
        id: row.id
      };
      this.$store
        .dispatch("generalize/Detail", {
          data: params
        })
        .then(result => {
          if (result.code === 0) {
            const data = result.data;
            this.rowData = data;
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    // 去支付
    handleSave(index, row) {
      this.rowData = row;
      this.form = {
        ...this.form,
        amount: row.showamount
      };
      this.checkvisible = true;
    },
    // 支付提交
    handleEditSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const amount = this.form.amount * 100;
          const dataparams = {
            amount: amount,
            id: this.rowData.id,
            paystatus: this.form.paystatus,
            remark: this.form.remark
          };
          const loading = this.$loading({
            lock: true,
            text: "数据提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.$store
            .dispatch("generalize/Pay", {
              data: dataparams
            })
            .then(result => {
              loading.close();
              if (result.code === 0) {
                this.$message.success("支付成功");
                this.checkvisible = false;
                this.gotData();
              } else if (result.code === 401) {
                this.checkvisible = false;
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
    closeDialog(formName) {
      this.$refs[formName].resetFields();
      this.form = {
        remark: "",
        paystatus: 2
      };
    },
    handleAdd(index, row) {
      this.actionType = 1;
      this.actionName = "新增";
      this.setvisible = true;
      this.rowData = row;
      this.setform = {
        ...this.setform,
        memberid: row.memberid,
        incometype: 3
      };
    },
    handleSet(index, row) {
      this.actionType = 2;
      this.actionName = "编辑";
      this.setvisible = true;
      const params = {
        id: row.id
      };
      this.$store
        .dispatch("generalize/Detail", {
          data: params
        })
        .then(result => {
          if (result.code === 0) {
            const data = result.data;
            this.rowData = data;
            this.setform = {
              amount: data.showamount,
              memberid: data.memberid,
              incometype: data.incometype,
              remark: data.remark
            };
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    handleTableSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const amount = this.setform.amount * 100;
          let params = {
            amount: amount,
            remark: this.setform.remark
          };
          if (this.actionType === 1) {
            params.incometype = this.setform.incometype;
            params.memberid = this.setform.memberid;
            this.handleAddSave(params);
          } else {
            this.handleSetSave(params);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSetSave(params) {
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
        .dispatch("generalize/Edit", {
          data: dataparams
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.$message.success("编辑成功");
            this.setvisible = false;
            this.gotData();
          } else if (result.code === 401) {
            this.setvisible = false;
            this.$message.error(result.msg);
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    handleAddSave(params) {
      const dataparams = {
        ...params
      };
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("generalize/Add", {
          data: dataparams
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.$message.success("新增成功");
            this.setvisible = false;
            this.gotData();
          } else if (result.code === 401) {
            this.setvisible = false;
            this.$message.error(result.msg);
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    closeSetDialog(formName) {
      this.$refs[formName].resetFields();
      this.actionName = "";
      this.actionType = 0;
      this.setform = {
        remark: "",
        amount: "",
        incometype: 3,
        memberid: ""
      };
    },
    // 删除操作
    handleDelete() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
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
    // 删除记录
    deleteRow() {
      const params = {
        id: this.rowData.id
      };
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("generalize/Remove", {
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
    }
  }
};
</script>

