<template>
  <div>
    <div style="left: 10px; ">
     <!-- <el-form>
        <el-input placeholder="请输入搜索内容" v-model='search' style="width: 160px; left: 10px;"></el-input>
        <el-button icon="el-icon-search"></el-button>
      </el-form> -->
      <tree :nodes="nodes" :setting="setting" />
    </div>
    <div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">清除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-container>
          <el-header style="text-align: left; font-size: 12px" >
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-dark">等级对应</div></el-col>
            </el-row>
          </el-header>

          <el-main>
            <el-table :data="tableData">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-table :data="tableData2">
                        <el-table-column prop="zz1" label="目标告警等级"></el-table-column>
                        <el-table-column prop="zz2" label="自定义名称"></el-table-column>
                        <el-table-column prop="zz3" label="告警颜色"></el-table-column>
                        <el-table-column prop="zz4" label="源告警等级"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
              <el-table-column prop="data1" label="企业名称" width="140">
              </el-table-column>
              <el-table-column prop="data2" label="服务名称" width="120">
              </el-table-column>
              <el-table-column prop="data3" label="设备类型">
              </el-table-column>
              <el-table-column prop="data4" label="设备型号" width="140">
              </el-table-column>
              <el-table-column prop="data5" label="等级变更" width="140">
              </el-table-column>
              <el-table-column prop="data6" label="操作用户" width="120">
              </el-table-column>
              <el-table-column prop="data7" label="创建时间">
              </el-table-column>
              <el-table-column prop="data8" label="操作" width="120">
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>


<script>
import tree from "vue-giant-tree";
export default {
    components: {
        tree
	},
    data () {
        return {
            tableData: [{
              data1: '义益钛迪',
              data2: '智慧用电',
              data3: '开关电梯',
              data4: 'AD-2U220S48100',
              data5: '手动',
              data6: '系统管理',
              data7: '2018-04-28',
              data8: '查看',
            },{
              data1: '义益钛迪',
              data2: '智慧用电',
              data3: '开关电梯',
              data4: 'SM11-100',
              data5: '系统',
              data6: '系统管理员',
              data7: '2018-04-28',
              data8: '查看',
            }],
            tableData2: [{
              zz1: '一级告警',
              zz2: '严重告警',
              zz3: 'red',
              zz4: '一级告警，二级告警',
            },{
              zz1: '二级告警',
              zz2: '中度告警',
              zz3: '阿达的',
              zz4: '三级告警，四级告警',
            },{
              zz1: '三级告警',
              zz2: '次级告警',
              zz3: 'yellow',
              zz4: '五级告警',
            },],
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
            }
        }
    },

}
</script>
