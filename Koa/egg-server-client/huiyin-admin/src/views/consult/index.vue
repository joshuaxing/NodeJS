<!--
 * @Author: your name
 * @Date: 2019-11-27 09:02:20
 * @LastEditTime: 2020-05-17 15:19:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\views\index\index.vue
 -->
<style lang="scss" scoped>
.consult-wrapper {
  padding: 0 15px;
  .consult-title {
    color: #409eff;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    padding: 10px;
    background: #e8e8e8;
    border-radius: 4px;
  }
  .consult-content {
    padding: 30px 0;
    .consult-content-item {
      margin-bottom: 15px;
      .content-name {
        margin-bottom: 10px;
        font-size: 13px;
        line-height: 20px;
         color: #575f6b;
      }
      .content-des {
        padding: 10px;
        font-size: 12px;
        line-height: 20px;
        border: 1px dotted #ccc;
        color: #000;
        border-radius: 8px;
        min-height: 20px;
      }
    }
  }
  .row-ul {
    margin-top: 30px;
    &.row-ul-border {
      border-bottom: 1px solid #f4f4f4;
    }
    .row-li {
      display: flex;
      .row-li-item {
        font-size: 12px;
        margin-right: 20px;
        height: 26px;
        line-height: 26px;
        color: #000;
        font-weight: 500;
        display: flex;
        align-items: center;
        font-size: 14px;
        .row-item-span {
          display: block;
          color: #575f6b;
          font-weight: 400;
          margin-right: 10px;
          font-size: 13px;
        }
      }
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
                <!-- <el-form-item label="回复状态" prop="replystatus">
                  <el-select v-model="searchform.replystatus" class="search-input" placeholder="请选择">
                    <el-option
                      v-for="item in replystatusList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="审核状态" prop="checkstatus">
                  <el-select v-model="searchform.checkstatus" clearable class="search-input" placeholder="请选择">
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
        <div class="container-table">
          <el-table
            :data="tableData"
            border
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column label="操作" width="80" align="center" fixed="left">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-search"
                  @click="handleCat(scope.$index, scope.row)"
                >查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="60"></el-table-column>
            <el-table-column prop="title" label="咨询标题"></el-table-column>
            <el-table-column prop="replystatus" label="回复状态">
              <template slot-scope="scope">
                <span v-if="scope.row.replystatus === 1">未回复</span>
                <span v-if="scope.row.replystatus === 2" style="color: #67C23A">已回复</span>
              </template>
            </el-table-column>
            <el-table-column prop="checkstatus" label="审核状态">
              <template slot-scope="scope">
                <span v-if="scope.row.checkstatus === 1" style="color: #E6A23C">待审核</span>
                <span v-if="scope.row.checkstatus === 2" style="color: #67C23A">审核通过</span>
                <span v-if="scope.row.checkstatus === 3">审核拒绝</span>
              </template>
            </el-table-column>
            <el-table-column prop="memberid" label="会员ID"></el-table-column>
            <el-table-column prop="membername" label="会员姓名"></el-table-column>
            <el-table-column prop="offlineid" label="回复人ID">
              <template slot-scope="scope">
                {{scope.row.offlineid ? scope.row.offlineid : ''}}
              </template>
            </el-table-column>
            <el-table-column prop="offlinename" label="回复人姓名"></el-table-column>
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

    <!-- 详情 -->
    <el-dialog
      :title="actionTypeName"
      :visible.sync="visible"
      width="900px"
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <div class="consult-wrapper">
        <div class="consult-title">
          咨询信息
          <i class="header-icon el-icon-info"></i>
        </div>
        <div class="row-ul">
          <div class="row-li">
            <div class="row-li-item">
              <div class="row-item-span">
                会员姓名:
              </div>
               <div class="row-item-content">{{rowData.membername}}</div>
            </div>
            <div class="row-li-item">
              <div class="row-item-span">
                创建时间:
              </div>
               <div class="row-item-content">{{rowData.createDate}}</div>
            </div>
          </div>
        </div>
        <div class="consult-content">
          <div class="consult-content-item">
            <div class="content-name">咨询标题:</div>
            <div class="content-des">{{rowData.title}}</div>
          </div>
          <div class="consult-content-item">
            <div class="content-name">咨询内容:</div>
            <div
              class="content-des"
            >{{rowData.content}}</div>
          </div>
        </div>
        <div class="consult-title">
          咨询回复
          <i class="header-icon el-icon-info"></i>
        </div>
        <div class="row-ul" v-show="rowData.replystatus === 2">
          <div class="row-li">
            <div class="row-li-item">
              <div class="row-item-span">
                回复人姓名:
              </div>
               <div class="row-item-content">{{rowData.offlinename}}</div>
            </div>
            <div class="row-li-item">
              <div class="row-item-span">
                回复时间:
              </div>
               <div class="row-item-content">{{rowData.updateDate}}</div>
            </div>
          </div>
        </div>
        <div class="consult-content">
           <div class="consult-content-item">
            <div class="content-name"><span style="color: red;margin-right:3px">*</span>回复状态:</div>
            <div class="content-textarea">
              <el-radio-group v-model="replystatus">
                <el-radio :label="1">回复</el-radio>
                <el-radio :label="0">暂存</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="consult-content-item">
            <div class="content-name"><span style="color: red;margin-right:3px">*</span>回复内容:</div>
            <div class="content-textarea">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入"
                v-model="textarea"
                style="with: 730px"
              ></el-input>
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 50px">
          <el-button size="mini" @click="visible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="handleEditSave">确定回复</el-button>
          <el-button type="primary" size="mini" @click="handleShow" v-show="rowData.checkstatus === 1">审核通过</el-button>
          <el-button type="danger" size="mini" @click="handleHide" v-show="rowData.checkstatus === 1">审核拒绝</el-button>
          <el-button type="danger" size="mini" @click="handleDelete" v-show="rowData.checkstatus !== 1">删除</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      searchform: {
        replystatus: "",
        checkstatus: ""
      },
      searchresult: {
        replystatus: "",
        checkstatus: ""
      },
      tableData: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      visible: false,
      actionType: 0,
      actionTypeName: "",
      rowData: {},
      replystatusList: [
        {
          id: 2,
          name: "已回复"
        },
        {
          id: 1,
          name: "未回复"
        }
      ],
      checkstatusList: [
        {
          id: 1,
          name: "待审核"
        },
        {
          id: 2,
          name: "审核通过"
        },
        {
          id: 3,
          name: "审核拒绝"
        }
      ],
      textarea: "",
      replystatus: ""
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
      const checkstatus = this.searchresult.checkstatus ? this.searchresult.checkstatus : 0
      const params = {
        checkstatus: checkstatus,
        pagenum: this.page,
        pagesize: this.limit
      };
      this.loading = true;
      this.$store
        .dispatch("consult/List", {
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
      this.actionType = 2;
      this.actionTypeName = "查看";
      const params = {
        id: row.id
      };
      this.$store
        .dispatch("consult/Detail", {
          data: params
        })
        .then(result => {
          if (result.code === 0) {
            const data = result.data;
            this.rowData = data;
            this.textarea = data.reply;
            this.replystatus = data.replystatus == 1 ? 0 : 1;
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    // 咨询回复
    handleEditSave() {
      if (!this.textarea) {
        this.$message.warning('请输入回复内容');
        return
      }
      const params = {
        id: this.rowData.id,
        offlineid: this.userinfo.userid,
        reply: this.textarea,
        replystatus: this.replystatus
      };
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("consult/Reply", {
          data: params
        })
        .then(result => {
          loading.close();
          if (result.code === 0) {
            this.$message.success("回复成功");
            this.visible = false;
            this.checkvisible = false;
            this.gotData();
          } else if (result.code === 401) {
            this.visible = false;
            this.checkvisible = false;
            this.$message.error(result.msg);
          } else {
            this.$message.error(result.msg);
          }
        });
    },
    // 删除咨询
    handleDelete() {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.deleteRow()
        }).catch(() => {});
    },
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
        .dispatch("consult/Remove", {
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
    // 审核拒绝
    handleHide() {
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const params = {
        id: this.rowData.id
      }
      this.$store
        .dispatch("consult/Reject", {
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
    handleShow() {
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const params = {
        id: this.rowData.id
      }
      this.$store
        .dispatch("consult/Audit", {
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
    closeDialog() {
      this.textarea = ''
      this.replystatus = ''
    }
  }
};
</script>

