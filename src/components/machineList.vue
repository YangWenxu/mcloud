<template>
  <section id="test">

    <!-- 头部导航栏， -->
    <el-col :span="24" class="list-header">
      <el-form :inline="true">
          <el-form-item style="float:left;">
            {{$t('Machine_List')}}
          </el-form-item>

          <el-form-item style="float:right;margin-right: 0;">
            <el-button type="primary" v-on:click="logout"
                      style="margin-right: 0 !important;">
              退出
            </el-button>
          </el-form-item>

            <!-- 添加的bar -->
          <el-form-item style="float:right;margin-right: 0;">
            <el-button type="primary" v-on:click="handleShowDialog('add')"
                      style="margin-right: 0 !important;">
              添加
            </el-button>
          </el-form-item>




          <!-- 搜索的bar -->
          <el-form :inline="true">
            <el-form-item style="float:left;">
              <el-input v-model="searchName"
                        @keyup.enter.native="getUserList"></el-input>
            </el-form-item>
            <el-form-item style="float:left; margin-left:0;">
              <el-button type="primary" v-on:click="getUserList" icon="search" class="el-searchs"></el-button>
            </el-form-item>
          </el-form>

      </el-form>
    </el-col>


    <template>
      <!-- 表格的制作 -->
      <el-table :data="machineList" stripe style="width: 100%;">
        <el-table-column type="index" prop="index" min-width="16"  :label="$t('System.NO')"></el-table-column>
        <el-table-column prop="categoryId" min-width="16"  label='categoryId'></el-table-column>
        <el-table-column prop="dvsModel" min-width="16"  label='dvsModel'></el-table-column>
        <el-table-column prop="code" min-width="16"  label='code'></el-table-column>
        <el-table-column prop="deviceCode" min-width="20"  label='deviceCode'></el-table-column>
        <el-table-column prop="model" min-width="22"  label='model'></el-table-column>
        <el-table-column prop="pollInterval" min-width="22"  label='pollInterval'></el-table-column>
        <el-table-column prop="categoryTypeName" min-width="22"  label='categoryTypeName'></el-table-column>
        <el-table-column prop="status" min-width="16"  label='status'>
        </el-table-column>
        <el-table-column prop="ctime" min-width="22"  label='ctime'></el-table-column>
        <el-table-column prop="type" min-width="16"  label='type'></el-table-column>
        <el-table-column :label="$t('System.Operation')" min-width="20">
          <template slot-scope="scope">
            <el-button size="small" @click="handleShowDialog('modify', scope.row)">
              <el-tooltip class="item" effect="dark" :content="$t('System.Modify')" placement="top-start">
                <i class="operate-modify"></i>
              </el-tooltip>
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">
              <el-tooltip class="item" effect="dark" :content="$t('System.Delete')" placement="top-start">
                <i class="operate-delete"></i>
              </el-tooltip>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <router-view> </router-view>
      <!-- 添加和修改的表单 -->
      <el-dialog class="dia400" :title="dialogTitle" :visible="formVisible" :close-on-click-modal="false" @close="handleCancel">
        <el-form :model="formData" label-width="125px" :rules="formDataRules" ref="formData">
          <el-form-item label="设备id" prop="code">
            <el-input v-model="formData.code"></el-input>
          </el-form-item>
          <el-form-item label="设备类型" prop="categoryId">
            <el-select v-model="formData.categoryId" filterable placeholder="请选择设备类型">
              <el-option v-for="(item, index) in modellist" :key="index" :label="item.machineType" :value="item.id">{{ item.machineType }}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="pollInterval" prop="pollInterval">
            <el-input v-model="formData.pollInterval"></el-input>
          </el-form-item>
          <el-form-item label="pollTimeout" prop="pollTimeout">
            <el-input v-model="formData.pollTimeout"></el-input>
          </el-form-item>
          <el-form-item label="reportLimit" prop="reportLimit">
            <el-input v-model="formData.reportLimit"></el-input>
          </el-form-item>
          <el-form-item label="reportTimeout" prop="reportTimeout">
            <el-input v-model="formData.reportTimeout"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel">{{$t('System.Cancel')}}</el-button>
          <el-button type="primary" @click.native="handleSubmit">{{$t('System.Commit')}}</el-button>
        </div>
      </el-dialog>

      <!-- 页脚分页的制作 -->
      <el-col :span="24" class="toolbar">
        <el-pagination
          layout="total, prev, pager, next,sizes, jumper"
          @current-change="handleCurrentChange"
          @size-change="pageSizeChange"
          :page-sizes="[10, 15, 50, 100]"
          :page-size="pageSize"
          :total="total"
          style="float:right;"
        ></el-pagination>
      </el-col>

    </template>
  </section>

</template>

<script>

  // history.pushState(null, null, document.URL);
  // window.addEventListener('popstate', function() {
  //   history.pushState(null, null, document.URL);

import axios from 'axios'

export default {
  beforeRouteLeave (to, from , next) {
    next(false);
  },
  name: "Machine_List",
  data() {
    return {
      modellist:'',
      tableData: [],
      searchName: '',


      page: 1,
      pageSize: 15,
      total: 0,
      formVisible: false,

      machineList: [],
      operation: '',
      dialogTitle: 'Modify Machine',

      formData: {
        index: '',
        categoryId: '',
        dvsModel: '',
        code: '',
        deviceCode: '',
        model: '',
        pollInterval: '',
        pollTimeout: '',
        reportLimit: '',
        reportTimeout: '',
        type: '',
      }

    };
  },
  computed: {
    // 表单验证的规则
    formDataRules () {
      return {
        code: [{
          trigger: 'change',
          message: this.$t('System.PleaseInput'),
          required: true,
          validator: (rule, value, callback) => {
            this.tableData.forEach((v, i) => {
              i || console.log(this.tableData)
            })

            if (value.length >= 3) {
              callback()
            } else {
              callback(' ')
            }
          }
        }],
        deviceCode: [{
            required: true, trigger: 'change',
            message:  this.$t('System.PleaseInput'),
            validator: (rule, value, callback) => {
              this.tableData.forEach((v, i) => {
                i || console.log(this.tableData)
              })

              if (value.length >= 3) {
                callback()
              } else {
                callback(' ')
              }
            }
          }
        ],
        pollInterval: [
          {required: true, trigger: 'change', message:  this.$t('System.PleaseInput')}
        ],
        pollTimeout: [
          {required: true, trigger: 'change', message:  this.$t('System.PleaseInput')}
        ],
        reportLimit: [
          {required: true, trigger: 'change', message:  this.$t('System.PleaseInput')}
        ],
        reportTimeout: [
          {required: true, trigger: 'change', message:  this.$t('System.PleaseInput')}
        ],
      }
    },
  },
  methods: {

    logout() {
      localStorage.removeItem("user");
      window.location.href="http://localhost:8080";

    },

    getUserList() {

      this.searchName = this.searchName.trim()
      let param = {
        name: this.searchName || null,
        currentPage: this.page,
        pageSize: this.pageSize,

      };
     console.log(this.searchName);
      // this.$api.machineGetList(param).then(res => {
      //   this.machineList = res.list;
      //   this.total = res.count;


      //   for(var i = 0; i < this.machineList.length; i++) {
      //     this.machineList[i].dvsModel = 3;
      //     this.machineList[i].deviceCode = 3;
      //     this.machineList[i].model = '模型';
      //     this.machineList[i].type = 'Tp1';

      //     if(this.machineList[i].status == 0){
      //       this.machineList[i].status = '离线';
      //     } else {
      //       this.machineList[i].status = '在线';
      //     };

      //     var dateType = "";
      //     var date = new Date();
      //     date.setTime(this.machineList[i].ctime);
      //     dateType = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();

      //     this.machineList[i].ctime = dateType;
      //   }

      //   console.log(res);
      // })
      // const base = process.env.API_HOST;
      this.axios.post(`${process.env.API_HOST}machine/getList`, {
        machineList: '',
      }).then(res => {
        this.machineList = res.data.data.list;
        this.total = res.data.data.count;


        for(var i = 0; i < this.machineList.length; i++) {
          this.machineList[i].dvsModel = 3;
          this.machineList[i].deviceCode = 3;
          this.machineList[i].model = '模型';
          this.machineList[i].type = 'Tp1';

          if(this.machineList[i].status == 0){
            this.machineList[i].status = '离线';
          } else {
            this.machineList[i].status = '在线';
          };

          var dateType = "";
          var date = new Date();
          date.setTime(this.machineList[i].ctime);
          dateType = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();

          this.machineList[i].ctime = dateType;
        }

        console.log(res);
      })

      this.$api.getMachineCategory({
        currentPage: 1,
        pageSize: 999999,
      }).then(res => {
        this.modellist = res.list
        console.log(res)
      })

      this.tableData = new Array(15).fill('').map((v, i) => ({
        index: i+1 + '',
        categoryId: 'Auty04',
        dvsModel: 'jia',
        code: 'yangwxTest',
        deviceCode: 'yangwxTest',
        model: '模型',
        pollInterval: '3000',
        categoryTypeName: '2000',
        status: '5',
        ctime: '3000',
        type: 'TyP001',
      }))
    },


    pageSizeChange(val) {
      // 一页多少数据的修改
      this.pageSize = val;
      this.getUserList();
    },

    handleCurrentChange(val) {
      // 分页页面的修改
      this.page = val;
      this.getUserList();
    },

    handleShowDialog(operate, row) {
      // 添加和修改表格表时弹出表单，对表单中数据的处理
      this.formVisible = true;
      this.$nextTick(() => {
        if (operate === 'add') {
          this.operation = 'add';
          this.formData = {
            index:'',
            ID: '',
            categoryId: '',
            dvsModel: '',
            code: '',
            deviceCode: '',
            model: '',
            pollInterval: '3000',
            pollTimeout: '1000',
            reportLimit: '5',
            reportTimeout: '3000',
            type: '',
          };
          this.dialogTitle = '添加';
        } else {
          this.operation = 'modify';
          this.dialogTitle = '修改';

          this.formData = Object.assign({}, row);

          this.formData.pollInterval = this.formData.pollInterval+ '';
          this.formData.pollTimeout = this.formData.pollTimeout+ '';
          this.formData.reportLimit = this.formData.reportLimit+ '';
          this.formData.reportTimeout = this.formData.reportTimeout+ '';


        }
      })
    },

    handleSubmit() {
      // 添加和修改表格后提交按钮的实现，刷新页面数据
      if (this.operation === 'add') {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.addUser();
          }
        });
      } else {

        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.modifyUser();
          }
        });
      }
    },

    addUser() {
      // 添加表格中的数据，把新数据push进去
      this.machineList = this.machineList || []
      this.machineList.push({
        index: this.formData.index,
        categoryId: this.formData.categoryId,
        dvsModel:  this.formData.dvsModel,
        code: this.formData.code,
        deviceCode: this.formData.deviceCode,
        pollInterval: this.formData.pollInterval,
        pollTimeout: this.formData.pollTimeout,
        reportLimit: this.formData.reportLimit,
        reportTimeout: this.formData.reportTimeout,
      })

      // let param = this.formData;
      // param.type = 2;
      // this.$api.addUser(param).then(((res) => {
        this.getUserList();
        this.formVisible = false;
      // }).bind(this));

    },

    modifyUser() {
      // 修改表格中的数据,根据索引index重新渲染整行的数据
      let param = {
        index: this.formData.index,
        categoryId: this.formData.categoryId,
        dvsModel:  this.formData.dvsModel,
        code: this.formData.code,
        deviceCode: this.formData.deviceCode,
        pollInterval: this.formData.pollInterval,
        pollTimeout: this.formData.pollTimeout,
        reportLimit: this.formData.reportLimit,
        reportTimeout: this.formData.reportTimeout,
        model: this.formData.dvsModel,
        type: 'TyP001',
      }

      // this.$api.modifyUser(param).then((res => {
        console.log(param)
        this.getUserList();
        this.formVisible = false;
        this.machineList[+param.index - 1] = param;
      // }).bind(this));


    },

    handleCancel() {
      // 取消按钮
      this.formVisible = false;
    },


    handleDelete: function (row) {
      // 删除按钮
      this.$confirm(
        this.$t("System.DetermineToPerformThisOperation"),
        this.$t("System.ConfirmToDelete"),
        {}
      ).then((()=> {
        this.deleteUser(row);
      }).bind(this))
    },


    deleteUser(row) {
      let param = row.id
      // this.$api.deleteUser(param).then(((res) => {
        this.getUserList();
      // }).bind(this));
    },
  },
  mounted() {
    this.getUserList();
    this.currentUser = this.$currentUser;
  },
};
</script>

<style>

</style>
