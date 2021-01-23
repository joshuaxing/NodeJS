<!--
 * @Author: your name
 * @Date: 2020-04-16 17:01:25
 * @LastEditTime: 2020-04-16 17:29:42
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
            <i class="el-icon-s-data crumbs-i-right"></i>收益列表
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
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="true" label="姓名"></el-table-column>
          <el-table-column prop="amount" label="收益金额"></el-table-column>
          <el-table-column prop="sourcememberid" label="项目">
            <template slot-scope="scope">
            推荐新会员获取{{scope.row.amount}}元
            </template>
          </el-table-column>
          <el-table-column prop="createdate" label="收益时间"></el-table-column>
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
    return {
      tableData: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false
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
        pageNum: this.page,
        pageSize: this.limit
      };
      this.loading = true;
      this.$store
        .dispatch("member/Income", {
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
    }
  }
};
</script>

<style>
</style>