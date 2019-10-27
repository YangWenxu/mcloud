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
            等级对应
          </div>

          <div style="background: #152545">
            <el-table :data="tableData" :row-style="tableRowStyle" :header-cell-style="tableHeaderColor">
              <el-table-column type="expand">
                    <template slot-scope="props">
                        <!-- slot-scope="props" -->
                        <el-table :data="props.row.form"  row-key="id"  type="selection" border ref="dataTable" :cell-class-name="rowClass">
                            <el-table-column  label="目标告警等级" mix-width="40">
                                <template slot-scope="innerProps">
                                    <span>{{ innerProps.row.level1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="自定义名称" mix-width="40">
                                <template slot-scope="innerProps">
                                    <span>{{ innerProps.row.level2 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="告警颜色" mix-width="40">
                                <template slot-scope="innerProps">
                                    <span :style="{background: innerProps.row.level3 }">zbc</span>

                                </template>
                            </el-table-column>
                            <el-table-column  label="源告警等级" mix-width="40">
                                <template slot-scope="innerProps">
                                    <span>{{ innerProps.row.level4 }}</span>
                               </template>
                            </el-table-column>
                        </el-table>
                    </template>
              </el-table-column>
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
              <el-table-column prop="data8" label="操作" mix-width="120">
              </el-table-column>
            </el-table>
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
import tree from "vue-giant-tree"
export default {
    components: {
        tree
	},
    data () {
        return {
            page: 5,
            pageSize: 10,
            total: 50,
            tableData: [
            {
              data1: '义益钛迪',
              data2: '智慧用电',
              data3: '开关电梯',
              data4: 'AD-2U220S48100',
              data5: '手动',
              data6: '系统管理',
              data7: '2018-06-28',
              data8: '查看',
              form: [
                  {level1: '一级告警', level2: '严重告警', level3: 'red', level4: '一级告警，二级告警'},
                  {level1: '二级告警', level2: '中度告警', level3: 'yellow', level4: '三级告警，四级告警'},
                  {level1: '三级告警', level2: '次级告警', level3: 'blue', level4: '五级告警'},
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
                  {level1: '四级告警', level2: '严重告警', level3: 'blue', level4: '四级告警，五级告警'},
                  {level1: '五级告警', level2: '中度告警', level3: 'green', level4: '六级告警，七级告警'},
                  {level1: '六级告警', level2: '次级告警', level3: 'black', level4: '八级告警'},
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
                  {level1: '七级告警', level2: '严重告警', level3: 'yellow ', level4: '七级告警，八级告警'},
                  {level1: '八级告警', level2: '中度告警', level3: 'blue', level4: '九级告警，十级告警'},
                  {level1: '九级告警', level2: '次级告警', level3: 'red', level4: '五级告警'},
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
                  {level1: '九级告警', level2: '严重告警', level3: 'green', level4: '五级告警，七级告警'},
                  {level1: '六级告警', level2: '中度告警', level3: 'purple', level4: '十级告警，八级告警'},
                  {level1: '四级告警', level2: '次级告警', level3: 'blue', level4: '白活不出'},
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
        getData() {
            for(let i=0; i<this.tableData.length; i++)
            {
              console.log(this.tableData[i].data7);
            }
        },

        rowClass ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 1 && columnIndex === 3) {
                return 'rgb196'
            } else if (rowIndex === 2 && columnIndex === 3) {
                return 'bacColorf4984e'
            }
        },
        tableRowStyle({ row, column, rowIndex, columnIndex }) {

            if (rowIndex === 0 && columnIndex === 3) {
                return 'background-color: red';
            } else if (rowIndex === 0 && columnIndex === 3) {
                return 'background-color: blue';
            } else if (rowIndex === 0 && columnIndex === 3) {
                return 'background-color: yellow';
            } else {
                return 'background-color: #152545';
            }
            // return 'background-color: #152545'
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0 ) {
                return 'background-color:  #152545;'
            }
        },
    },
    mounted () {
        this.getData();
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


    .rgb196{
    background: rgb(196,196,196);
    }
    .bacColor317eb0{
    background: #317eb0;
    }
    .bacColorf4984e{
    background: #f4984e;
    }


</style>
