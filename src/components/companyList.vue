<template>
  <section>

    <el-row style="display: flex;flex: 1;overflow: hidden;">

      <!--Company List-->
      <div class="el-col-16" style="display: flex;overflow: hidden;">
        <div style="flex: 1;float:left;padding-right:.1rem;display: flex;
          flex-direction: column; max-width: 100%;">
          <!-- header -->
          <el-col :span="24" class="list-header">
            <el-form :inline="true">
              <el-form-item>
                {{$t('CompanyManage.CompanyList')}}
              </el-form-item>
              <el-form-item style="float:right;margin-right: 0;">
                <el-button type="primary"  style="margin-right: 0 !important;">
                  {{$t('CompanyManage.AddCompany')}}
                </el-button>
              </el-form-item>

              <!--Search bar-->
              <el-form :inline="true">
                <el-form-item style="margin-right: 0;display: none;">
                  <el-input style="display: none"></el-input>
                </el-form-item>
                <el-form-item style="margin-right:0;">
                  <el-input :placeholder="$t('CompanyManage.CompanyName')"></el-input>
                </el-form-item>
                <el-form-item style="margin-left:-5px;">
                  <el-button type="primary"icon="search" class="el-searchs"></el-button>
                </el-form-item>
              </el-form>

            </el-form>
          </el-col>
          <!-- table  -->
          <template>
            <el-table :data="custs" stripe highlight-current-row
              :row-style="{cursor: 'pointer'}" style="width: 100%;"
              @row-click="getDeviceInfo" ref="companyTable">
              <el-table-column type="index" :label="$t('CompanyManage.NO')" width="65" align="center">
              </el-table-column>
              <el-table-column :label="$t('CompanyManage.CompanyName')" >
                <template slot-scope="scope">
                  <el-button @click.stop="enterCompany(scope.row)" style="white-space: normal; text-align: left;">
                    {{ scope.row.name }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="contact" :label="$t('CompanyManage.Contact')" width="150">
              </el-table-column>
              <el-table-column prop="telephone" :label="$t('System.Telephone')" >
              </el-table-column>
              <el-table-column prop="email" :label="$t('System.Email')">
              </el-table-column>
              <el-table-column prop="location" :label="$t('CompanyManage.Location')">
              </el-table-column>
              <el-table-column :label="$t('System.Operation')" width="100">
                <template slot-scope="scope">
                  <el-button type="danger" size="small">
                      <el-tooltip class="item" effect="dark" :content="$t('System.Delete')" placement="top-start">
                        <i class="operate-delete"></i>
                      </el-tooltip>
                  </el-button>
                  <el-button size="small">
                      <el-tooltip class="item" effect="dark" :content="$t('System.Modify')" placement="top-start">
                        <i class="operate-modify"></i>
                      </el-tooltip>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- Pagination -->
            <el-col :span="24" class="toolbar">
              <el-pagination
                layout="total, prev, pager, next,sizes, jumper"
                @current-change="handleCurrentChange"
                @size-change="pageSizeChange"
                :page-sizes="[10, 15, 50, 100]"
                :page-size="pageSize"
                :total="total"
                style="float:right;">
              </el-pagination>
            </el-col>

          </template>
        </div>
      </div>

      <!--Bind Machine-->
      <div class="el-col-8" style="display: flex;overflow: hidden;padding-bottom: 58px;">
        <div style="float: right;flex: 1;padding-left: 0.1rem;display: flex;
    overflow: hidden; max-width: 100%;flex-direction: column; ">
          <!--table header-->
          <el-col :span="24" class="list-header">
            <el-form :inline="true">
              <el-form-item style="float:right;margin-right:0;position:absolute;">
                <el-button type="primary"
                           style="margin-right: 0 !important;">
                  {{$t('MBoxManage.BindMachine')}}
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>

          <!--Machine table-->
          <template>
            <el-table :data="devices" stripe
                      style="width: 100%; float:left;">
              <el-table-column type="index" width="65" align="center" :label="$t('MBoxManage.NO')">
              </el-table-column>
              <el-table-column prop="machineCode" :label="$t('MBoxManage.MachineID')">
              </el-table-column>
              <el-table-column prop="boundBoxCode" :label="$t('MachineManage.MBoxID')">
              </el-table-column>
              <el-table-column width="100" :label="$t('System.Operation')" align="center">
                <template slot-scope="scope">
                  <el-button type="danger" size="small">
                    <el-tooltip class="item" effect="dark" :content="$t('System.Unbind')" placement="top-start">
                      <i class="operate-unbind"></i>
                    </el-tooltip>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- Bind Machine -->
          </template>
        </div>
      </div>
    </el-row>
  </section>
</template>
<script>
    export default {
        data () {
            return {
                page: 1,
                pageSize: 15,
                total: 4,

                custs: [{
                    contact: 'Auty04',
                    telephone: 'jia',
                    email: 'yangwxTest',
                    location: 'yangwxTest',
                },{
                    contact: 'qwe qew',
                    telephone: '123123',
                    email: 'yangwxTest',
                    location: 'yangwxTest',
                },{
                    contact: '2653917242',
                    telephone: '18794861620',
                    email: 'yangwxTest',
                    location: 'yangwxTest',
                },{
                    contact: '3662102',
                    telephone: '15337102913',
                    email: 'yangwxTest',
                    location: 'yangwxTest',
                }],

                // machineCode: '',
                // boundBoxCode: '',

                devices: [
                {
                    machineCode: 'MC1',
                    boundBoxCode: 'mbox_1743ec',
                },{
                    machineCode: 'MC2',
                    boundBoxCode: 'mbox_27ce2c',
                },
                //{
                //     machineCode: 'MC3',
                //     boundBoxCode: 'mbox_4a9911',
                // },{
                //     machineCode: 'MC4',
                //     boundBoxCode: 'mbox_4a9912',
                // },{
                //     machineCode: 'MC5',
                //     boundBoxCode: 'mbox_4a9913',
                // },{
                //     machineCode: 'MC6',
                //     boundBoxCode: 'mbox_4a9914',
                // },
                ],

            }

        },
        methods: {
            getDeviceInfo: function (row, event, column) {

                // let para = row.id;
                // this.currentCompany = row;
              for(var i = 0; i < 4; i++) {
                  if(this.custs[i].contact == 'Auty04')
                  {
                    this.devices[0].machineCode = 'MC1';
                    this.devices[0].boundBoxCode = 'zhaobuchu';
                    this.devices[1].machineCode = 'MC2';
                    this.devices[1].boundBoxCode = 'mbox_27ce2c';
                  }
                  // if(this.custs[i].contact == 'qwe qew')
                  // {
                  //   this.devices[0].machineCode = 'MC1';
                  //   this.devices[0].boundBoxCode = 'zhaobuchu';
                  //   this.devices[1].machineCode = 'MC2';
                  //   this.devices[1].boundBoxCode = 'mbox_27ce2c';
                  //   // this.devices[2].machineCode = 'MC3';
                  //   // this.devices[2].boundBoxCode = 'mbox_4a9911';
                  //   // this.devices[3].machineCode = 'MC4';
                  //   // this.devices[3].boundBoxCode = 'mbox_419912';
                  // }
                  // if(this.custs[i].contact == '2653917242')
                  // {
                  //   this.devices[0].machineCode = 'MC1';
                  //   this.devices[0].boundBoxCode = 'mbox_1743ec';
                  //   this.devices[1].machineCode = 'MC2';
                  //   this.devices[1].boundBoxCode = 'mbox_27ce2c';
                  //   // this.devices[2].machineCode = 'MC3';
                  //   // this.devices[2].boundBoxCode = 'mbox_4a9911';
                  //   // this.devices[3].machineCode = 'MC4';
                  //   // this.devices[3].boundBoxCode = 'mbox_4a9912';
                  //   // this.devices[4].machineCode = 'MC5';
                  //   // this.devices[4].boundBoxCode = 'mbox_4a9913';
                  //   // this.devices[5].machineCode = 'MC6';
                  //   // this.devices[5].boundBoxCode = 'mbox_4a9914';
                  // }
                  // if (this.custs[i].contact =='3662102')
                  // {
                  //   this.devices[0].machineCode = 'MC1';
                  //   this.devices[0].boundBoxCode = 'mbox_1743ec';
                  //   this.devices[1].machineCode = 'MC2';
                  //   this.devices[1].boundBoxCode = 'mbox_27ce2c';
                  // }

              }

                // let a=1;
                // // let b=this.devices.length;
                // let b=4;
                // let num=Math.floor(Math.random()*eval(b)+eval(a))-1;

                // for(var i = 0; i < this.devices.length; i++) {
                //     this.devices[i].machineCode = this.devices[num].machineCode;
                //     this.devices[i].boundBoxCode = this.devices[num].boundBoxCode;
                // }

                // this.devices[0].machineCode = this.devices[num].machineCode;
                // this.devices[0].boundBoxCode = this.devices[num].boundBoxCode;
                // this.devices[1].machineCode = this.devices[num+1].machineCode;
                // this.devices[1].boundBoxCode = this.devices[num+1].boundBoxCode;
                // this.devices[2].machineCode = this.devices[num].machineCode;
                // this.devices[2].boundBoxCode = this.devices[num].boundBoxCode;
                // this.devices[3].machineCode = ' ';
                // this.devices[3].boundBoxCode = ' ';





                // this.$api.companyManageGetBoundMachines(para).then((data) => {
                //     this.devices = data;
                // }).catch((e) => {});
            },
            pageSizeChange(val) {
                this.pageSize = val;
                // this.getCustData();
            },
            handleCurrentChange(val) {
                this.page = val;
                // this.getCustData();
            },

        },
        mounted() {

        },

    }
</script>
