<!--
 * @Author: your name
 * @Date: 2020-04-16 17:01:25
 * @LastEditTime: 2020-05-15 19:04:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \huiyin-admin\src\views\member\components\income.vue
 -->

<template>
  <div>
    <el-card class="table-card" shadow="never">
      <div class="crumbs-title" style="margin-bottom: 20px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-s-data crumbs-i-right"></i>案子列表
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-container" style="margin-bottom: 20px; text-align: right">
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
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="casetitle" label="案子标题"></el-table-column>
          <el-table-column prop="casecontent" label="案子内容"></el-table-column>
          <el-table-column prop="showamount" label="案子金额(元)"></el-table-column>
          <el-table-column prop="createdate" label="创建时间"></el-table-column>
          <el-table-column prop="updatedate" label="更新时间"></el-table-column>
        </el-table>
        <div class="pagination-container" style="margin-top: 20px">
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

     <!-- 添加/编辑案子 -->
    <el-dialog
      :title="actionTypeName"
      :visible.sync="visible"
      width="680px"
      @close="closeDialog('form')"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form
        ref="form"
        :model="form"
        :inline="true"
        :rules="rules"
        label-width="120px"
        class="operate-form-box"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="案子标题" prop="casetitle">
              <el-input
                v-model="form.casetitle"
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
                v-model="form.casecontent"
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
                v-model="form.amount"
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
          <el-button size="mini" @click="visible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="handleSave('form')">确 定</el-button>
        </div>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: {
    detailid: {
      required: true
    }
  },
  data() {
    const reg = /^[1-9]{1}[0-9]*$|^0{1}\.{1}[0-9]+$|^[1-9]{1}[0-9]*\.{1}[0-9]+$/
    const checknum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('数值必须大于0'));
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      visible: false,
      form: {
        amount: "",
        casecontent: "",
        casetitle: ""
      },
      rules: {
        casecontent: [{ required: true, message: "不能为空", trigger: "blur" }],
        casetitle: [{ required: true, message: "不能为空", trigger: "blur" }],
        amount: [{ required: true, validator: checknum, trigger: "blur" }]
      },
      actionTypeName: "",
      actionType: 0
    };
  },
  created() {
    this.gotData();
  },
  methods: {
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
        id: this.detailid
      };
      this.loading = true;
      this.$store
        .dispatch("member/CaseList", {
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
          const amount =  this.form.amount * 100
          const params = {
            casetitle: this.form.casetitle,
            casecontent: this.form.casecontent,
            amount: amount,
            memberid: this.detailid
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
        .dispatch("member/CaseAdd", {
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
      this.rowData = row;
      this.form = {
        amount: row.showamount,
        casecontent: row.casecontent,
        casetitle: row.casetitle
      };
    },
    // 编辑保存
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
        .dispatch("member/CaseEdit", {
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
        amount: "",
        casecontent: "",
        casetitle: ""
      };
    },
    closeDialog(formName) {
      this.handleResetFields(formName);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该案子, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          this.deleteRow(row.id);
        })
        .catch(() => {});
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
        .dispatch("member/CaseDelete", {
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
    }
  }
};
</script>

<style>
</style>