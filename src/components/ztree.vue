<template>
  <div id="main">
    <div class="aside">
      <div style="left: 10px;">
          <el-form>
            <el-input placeholder="请输入搜索内容" v-model='search' style="width: 200px;  left:0px;"></el-input>
            <el-button icon="el-icon-search" style="left: 10px"></el-button>
          </el-form> <hr>
      </div>
      <div>
          <tree :nodes="nodes" :setting="setting" />
      </div>
    </div>
    <div class="container">
      <div class="layer1">
          <form>
              <div class="place1">
                <span style="margin-left:20px,">规划名单<input type="text" placeholder="请输入"></span>
                <span style="margin-left:20px,">企业名称<input type="text" placeholder="请输入"></span>
                <span style="margin-left:20px,">服务名称<input type="text" placeholder="请输入"></span>
                <span style="margin-left:20px,">操作用户<input type="text" placeholder="请输入"></span> <br>
                <span style="margin-left:20px,">设备名称<input type="text" placeholder="请输入"></span>
                <span style="margin-left:20px,">设备类型<input type="text" placeholder="请输入"></span>
                <span style="margin-left:20px,">设备型号<input type="text" placeholder="请输入"></span>
                <span style="margin-left:20px,">等级变更<input type="text" placeholder="请输入"></span> <br>
              </div>
              <div>
                    <input type="button" value="查询" class="button1">
                    <input type="button" value="清楚" class="button1">
              </div>
          </form>
        <!-- <el-form :inline="true" :model="formInline">
          <el-form-item label="规划名单">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="服务名称">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="操作用户">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="设备型号">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="等级变更">
            <el-select v-model="formInline.region" placeholder="全部">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button type="primary">查询</el-button>
            <el-button type="primary">清除</el-button>
          </el-form-item>
        </el-form> -->
      </div>
      <div class="layer2">
          <div style="text-align: left; font-size: 20px; font-weight: bold; background: #193166" >
            <div style="float:left; margin-left: 0;">等级对应</div>
            <div style="float:right;margin-right: 30px;">
                <el-button type="primary" @click="addForm">
                添加
                </el-button>
            </div>
          </div>

          <div style="background: #152545">
            <el-table :data="tableData" :row-style="tableRowStyle" :header-cell-style="tableHeaderColor">
              <el-table-column type="expand">
                    <template slot-scope="props">
                        <!-- slot-scope="props" -->
                        <el-table :data="props.row.form"  row-key="id"  type="selection" border ref="dataTable" :cell-class-name="rowClass">
                            <el-table-column  label="等级名称" mix-width="40">
                                <template slot-scope="innerProps">
                                    <span>{{ innerProps.row.level1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="自定义名称" mix-width="40">
                                <template slot-scope="innerProps">
                                    <span>{{ innerProps.row.level2 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="告警颜色" mix-width="40" >
                                <template slot-scope="innerProps">
                                    <span :style="{background: innerProps.row.level3}">.............</span>

                                </template>
                            </el-table-column>
                            <!-- <el-table-column  label="源告警等级" mix-width="40">
                                <template slot-scope="innerProps">
                                    <span>{{ innerProps.row.level4 }}</span>
                               </template>
                            </el-table-column> -->
                        </el-table>
                    </template>
              </el-table-column>
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="data1" label="企业名称" mix-width="120">
              </el-table-column>
              <el-table-column prop="data2" label="服务名称" mix-width="120">
              </el-table-column>
              <el-table-column prop="data3" label="设备类型" mix-width="120">
              </el-table-column>
              <el-table-column prop="data4" label="设备型号" mix-width="120">
              </el-table-column>
              <el-table-column prop="data5" label="等级变更" mix-width="120">
              </el-table-column>
              <el-table-column prop="data6" label="操作用户" mix-width="120">
              </el-table-column>
              <el-table-column label="创建时间" mix-width="120">
                    <template slot-scope="props">
                        {{ props.row.data7 }}
                    </template>
              </el-table-column>
              <el-table-column label="操作" mix-width="120">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        >删除</el-button>
                    </template>
              </el-table-column>
            </el-table>
            <el-dialog class="dia400" title="添加和修改" :visible="formVisible" :close-on-click-modal="false" @close="handleCancel">
                <el-form :model="formData" label-width="110px" ref="formData"> 
                        <!-- style="background: #152545; color: #152545" -->
                    <el-form-item label="规则名称：" prop="name">
                        <el-input v-model="formData.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="操作用户：" >
                        系统管理员
                    </el-form-item>
                    <el-form-item label="企业名称：" prop="company">
                        <el-input v-model="formData.company"></el-input>
                    </el-form-item>
                    <el-form-item label="服务名称："  prop="service">
                        <el-input v-model="formData.service"></el-input>
                    </el-form-item>
                    <el-form-item label="告警级别设置：" prop="warning">
                        <el-select v-model="formData.warning" filterable @change="selectTrigger()"> 
                            <el-option v-for="(item, index) in formList" :key="index" :label="item.level1" :value="index" > {{ item.level1 }} </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="等级名称颜色"></el-form-item>
                    
                    <div v-for="(item, index) in labelList" :key="index" :value="index" >
                        <el-form-item :label="item.level1">
                            <el-input v-model="item.level2"  style="width:140px;" ></el-input>
                            <el-color-picker v-model="item.level3"></el-color-picker>
                        </el-form-item>
                    </div>

                </el-form>
                
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="handleCancel">{{$t('System.Cancel')}}</el-button>
                    <el-button @click.native="handleCommit" type="primary">{{$t('System.Commit')}}</el-button>
                    <el-button @click.native="handleModify" type="primary">修改</el-button>
                </div>  
            </el-dialog>
          </div>
      </div>
      <div class="footer">
        <el-col :span="24" class="toolbar">
            <el-pagination
            layout="total, prev, pager, next,sizes, jumper"


            :page-sizes="[10, 15, 50, 100]"
            :page-size="pageSize"
            :total="total"
            style="float:right;"
            ></el-pagination>
        </el-col>
      </div>
    </div>
  </div>
</template>


<script>
var _index;
import tree from "vue-giant-tree"
export default {
    components: {
        tree
	},
    data () {
        return {
            formList: [
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B', level4: '一级告警，二级告警'},
                  {level1: '二级告警', level2: '中度告警', level3: '#FF8400', level4: '三级告警，四级告警'},
                  {level1: '三级告警', level2: '次级告警', level3: '#E6D500', level4: '五级告警'},
                  {level1: '四级告警', level2: '3990djdkf', level3: '#C001E7', level4: '四级告警，五级告警'},
                  {level1: '五级告警', level2: '3990djdkf', level3: '#FF5695', level4: '八级告警'},
                  {level1: '六级告警', level2: '3990djdkf', level3: '#00B1FF', level4: '七级告警，八级告警'},
                  {level1: '七级告警', level2: '3990djdkf', level3: '#78E2FA', level4: '九级告警，十级告警'},
                  {level1: '八级告警', level2: '3990djdkf', level3: '#7ED321', level4: '六级告警，七级告警'},
            ],
            sbList: [
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B', level4: '一级告警，二级告警'},
                  {level1: '二级告警', level2: '中度告警', level3: '#FF8400', level4: '三级告警，四级告警'},
                  {level1: '三级告警', level2: '次级告警', level3: '#E6D500', level4: '五级告警'},
                  {level1: '四级告警', level2: '3990djdkf', level3: '#C001E7', level4: '四级告警，五级告警'},
                  {level1: '五级告警', level2: '3990djdkf', level3: '#FF5695', level4: '八级告警'},
                  {level1: '六级告警', level2: '3990djdkf', level3: '#00B1FF', level4: '七级告警，八级告警'},
                  {level1: '七级告警', level2: '3990djdkf', level3: '#78E2FA', level4: '九级告警，十级告警'},
                  {level1: '八级告警', level2: '3990djdkf', level3: '#7ED321', level4: '六级告警，七级告警'},
            ],
            labelList: [],
            formVisible: false,
            page: 5,
            pageSize: 10,
            total: 50,
            formData: [],
            tableData: [
            {
              data1: '义益钛迪',
              data2: '智慧用水',
              data3: '开关电梯',
              data4: 'AD-2U220S48100',
              data5: '手动',
              data6: '系统管理',
              data7: '2018-06-28',
            //   data8: '',
              form: [
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B', level4: '一级告警，二级告警'},
                  {level1: '二级告警', level2: '中度告警', level3: '#FF8400', level4: '三级告警，四级告警'},
                  {level1: '三级告警', level2: '次级告警', level3: '#E6D500', level4: '五级告警'},
                  {level1: '四级告警', level2: '3990djdkf', level3: '#C001E7', level4: '四级告警，五级告警'},
                  {level1: '五级告警', level2: '3990djdkf', level3: '#FF5695', level4: '八级告警'},
                  {level1: '六级告警', level2: '3990djdkf', level3: '#00B1FF', level4: '七级告警，八级告警'},
                  {level1: '七级告警', level2: '3990djdkf', level3: '#78E2FA', level4: '九级告警，十级告警'},
                  {level1: '八级告警', level2: '3990djdkf', level3: '#7ED321', level4: '六级告警，七级告警'},
                ]
            },{
              data1: '阿里巴巴',
              data2: '智慧用电',
              data3: '开关电梯',
              data4: 'SM11-100',
              data5: '系统',
              data6: '系统管理员',
              data7: '2018-05-28',
              data8: '查看',
              form: [
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B', level4: '一级告警，二级告警'},
                  {level1: '二级告警', level2: '中度告警', level3: '#FF8400', level4: '三级告警，四级告警'},
                  {level1: '三级告警', level2: '次级告警', level3: '#E6D500', level4: '五级告警'},
                ]
            },{
              data1: '百度可乐',
              data2: '智慧用电',
              data3: '开关电梯',
              data4: 'SM11-100',
              data5: '系统',
              data6: '系统管理员',
              data7: '2018-04-28',
              data8: '查看',
              form: [
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B', level4: '一级告警，二级告警'},
                  {level1: '二级告警', level2: '中度告警', level3: '#FF8400', level4: '三级告警，四级告警'},
                  {level1: '三级告警', level2: '次级告警', level3: '#E6D500', level4: '五级告警'},
              ]
            },{
              data1: '华为宝典',
              data2: '智慧用电',
              data3: '开关电梯',
              data4: 'SM11-100',
              data5: '系统',
              data6: '系统管理员',
              data7: '2018-04-28',
              data8: '查看',
              form: [
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B', level4: '一级告警，二级告警'},
                  {level1: '二级告警', level2: '中度告警', level3: '#FF8400', level4: '三级告警，四级告警'},
                  {level1: '三级告警', level2: '次级告警', level3: '#E6D500', level4: '五级告警'},
              ]
            }
            ],
            formInline: {
              user: '',
              region: ''
            },
            search: '',
            nodes: [
                // { id:1, pid:0, name:"企业服务根节点", open:true},
                // { id:11, pid:1, name:"新研联", open:true},
                // { id:111, pid:11, name:"招不出"},
                // { id:112, pid:11, name:"白活不出"},
                // { id:12, pid:1, name:"国动", open:true},
                // { id:121, pid:12, name:"阿里云"},
                // { id:122, pid:12, name:"腾讯云", checked:true},
                // { id:13, pid:1, name:"义益钛迪", open:true},
                // { id:131, pid:13, name:"义益云"},
                // { id:132, pid:13, name:"智慧用电"},
                {
                    id: 1,
                    label: '企业服务根节点',
                    children: [{
                        id: 2,
                        label: '新研联',
                        children: [{
                            id: 5,
                            label: '招不出'
                        },{
                            id: 6,
                            label: '白活不出',
                        }],
                    },{
                        id: 3,
                        label: '国动',
                        children: [{
                            id: 5,
                            label: '阿里云'
                        },{
                            id: 6,
                            label: '腾讯云',
                        }],
                    },{
                        id: 4,
                        label: '义益钛迪',
                        children: [{
                            id: 5,
                            label: '义益云'
                        },{
                            id: 6,
                            label: '智慧用电',
                        }],
                    }]
                }
            ],
            setting: {
                check: {
                     enable: true
                },
                data: {
                    simpleData: {
                        enable: false,
                        pIdKey: "pid"
                    },
                    key:{
                        children: 'children',
                        name: 'label'
                    }
                },
                view: {
                    showIcon: false,
                    // addHoverDom: this.addHoverDom,
                    // removeHoverDom: this.removeHoverDom,
                }
            },
        }
    },
    methods: {

        selectTrigger(val) {
            this.labelList.length = this.formData.warning+1;
            for(let i = 0; i<this.labelList.length; i++) {
                // this.labelList = JSON.parse(JSON.stringify(this.sbList));
                // this.$set(this.labelList, i ,this.sbList[i]);
                this.$set(this.labelList, i ,JSON.parse(JSON.stringify(this.sbList[i])));
            }

        },

        addForm() {
            this.formVisible = true;
            this.labelList = [];        
            
            this.formData = {
                company: '',
                service: '',
            }
            // for(var prop in this.sbList) {
            //     if(this.sbList.hasOwnProperty(prop))
            //         this.labelList[prop] = this.sbList[prop];
            // }

            // for(let j=0;j<this.sbList.length;j++) {
            //     this.labelList.push(this.sbList[j]);
            // }

            this.labelList = JSON.parse(JSON.stringify(this.sbList));
            // this.labelList = Object.assign([], this.sbList);
        },

        handleEdit (index, row) {
            this.formVisible = true;
            this.formData = {
                company: '',
                service: '',
            }
            // this.labelList = this.tableData[index].form;
            this.labelList = JSON.parse(JSON.stringify(this.tableData[index].form));
            // console.log(index); 
            _index = index;
        },

        handleModify() {
            this.formVisible =false;
            let z = _index;
            console.log(z);
            this.tableData[z].data1 = this.formData.company;
            this.tableData[z].data2 = this.formData.service;
            // this.tableData[z].form = this.labelList;
            this.tableData[z].form = JSON.parse(JSON.stringify(this.labelList));
            
            // this.tableData[z] = param;
        },

        handleCommit() {
            this.tableData.push({
                data1: this.formData.company,
                data2: this.formData.service,
                form: this.labelList,
            });

            this.formVisible = false;
            // storage.set('url', this.url);
        },

        handleCancel() { 
            this.formVisible = false;
        },

        rowClass ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 1 && columnIndex === 3) {
                return 'rgb196'
            } else if (rowIndex === 2 && columnIndex === 3) {
                return 'bacColorf4984e'
            }
        },
        tableRowStyle({ row, column, rowIndex, columnIndex }) {
            return 'background-color: #152545'
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0 ) {
                return 'background-color:  #152545;'
            }
        },
    },
    mounted () {
        // this.getData();
    }
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    #main {
        width: 1200px;
        height: 800px;
        color: #FFFFFF;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        background: #FFFFFF;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -400px;
        margin-left: -600px;
    }
    .aside {
        float: left;
        width: 19%;
        height: 800px;
        background: #223254;
    }
    .container {
        float: right;
        width: 79%;
        height: 800px;
        background: #152545;
    }
    .layer1 {
        background: #152545;
        position: absolute;
    }
    .layer2 {
        margin-top: 150px;
        background-color: red;
    }
    .place1 {
        margin-left: 30px;
        margin-top: 10px;
    }
    .button1 {
        float: left;
        margin-left: 30px;
        margin-top: 10px;
        background: #00B1FF;
        width: 50px;
    }
    .footer {
        right: 10px;
        bottom: 10px;
        position: absolute;
    }

</style>
