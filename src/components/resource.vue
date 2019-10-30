<template>
  <div id="main">
    <div class="aside">
        <tree :nodes="nodes" :setting="setting" />
    </div>
    <div class="container">
        <el-form :inline="true" :model="form1" class="demo-form-inline">
            <el-form-item label="英文名">
                <el-input v-model="form1.eName" ></el-input>
            </el-form-item>
            <el-form-item label="中文名">
                <el-input v-model="form1.cName"></el-input>
            </el-form-item>
            <el-form-item label="典型编码">
                <el-input v-model="form1.eCode">z</el-input>
            </el-form-item>
        </el-form>
        <el-form :model="form2" label-width="80px" class="demo-ruleForm">
            <div>上级类型</div>
            <el-form-item label="资产类型">
                <el-input v-model="form2.type1"></el-input>
            </el-form-item>
            <div>下级类型</div>
            <el-form-item label="资产类型">
                <el-select v-model="form2.type2">
                    <el-option label="詹姆斯" value="詹姆斯"></el-option>
                    <el-option label="戴维斯" value="戴维斯"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产类型">
                <el-select v-model="form2.type3">
                    <el-option label="阿德托昆博" value="阿德托昆博"></el-option>
                    <el-option label="斯蒂芬库里" value="斯蒂芬库里"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资产类型">
                <el-select v-model="form2.type4">
                    <el-option label="杜兰特" value="杜兰特"></el-option>
                    <el-option label="凯里欧文" value="凯里欧文"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
            <!-- <div v-for="(item, index) in labelList" :key="index" :value="index" >
                <el-form-item :label="item.level1">
                    <el-input v-model="item.level2"  style="width:140px;" ></el-input>
                    <el-color-picker v-model="item.level3"></el-color-picker>
                </el-form-item>
            </div> -->
        <div>基础属性:</div>
        <div v-for="(item, index) in formList" :key="index" :value="index">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item type="index" width="50"></el-form-item>
                <el-form-item label="英文名">
                    <el-input v-model="item.level1"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input v-model="item.level2"></el-input>
                </el-form-item>
                <el-form-item label="缓存类型">
                    <el-input v-model="item.level3"></el-input>
                </el-form-item>
                <el-form-item>
                  <template slot-scope="scope">
                    <el-button icon="el-icon-circle-plus-outline" @click.native="handleAdd"></el-button>
                    <el-button icon="el-icon-circle-close" @click.native="handleDelete(scope.$index, scope.row)"></el-button>
                  </template>
                </el-form-item>
            </el-form>
        </div>
        <div>扩展属性:</div>
  <!--      <div>
            <el-form :inline="true" :model="formData2" class="demo-form-inline">
                <el-form-item label="英文名">
                    <el-input v-model="formData2.name21"></el-input>
                </el-form-item>
                <el-form-item label="中文名">
                    <el-input v-model="formData2.name22"></el-input>
                </el-form-item>
                <el-form-item label="储存类型">
                    <el-input v-model="formData2.name23"></el-input>
                </el-form-item>
                <el-button icon="el-icon-circle-plus-outline" @click.native="handAdd"></el-button>
                <el-button icon="el-icon-circle-close" @click.native="handleDelete"></el-button>
            </el-form>
        </div> -->
        <div>连接关系:</div>
        <div>
     <!--       <el-form :inline="true" :model="formData3" class="demo-form-inline">
                <el-form-item label="资产类型">
                    <el-select v-model="formData3.name31">
                        <el-option label="詹姆斯" value="詹姆斯"></el-option>
                        <el-option label="戴维斯" value="戴维斯"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="连接关系">
                    <el-select v-model="formData3.name32">
                        <el-option label="阿德托昆博" value="阿德托昆博"></el-option>
                        <el-option label="斯蒂芬库里" value="斯蒂芬库里"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="对应关系">
                    <el-select v-model="formData3.name33">
                        <el-option label="杜兰特" value="杜兰特"></el-option>
                        <el-option label="凯里欧文" value="凯里欧文"></el-option>
                    </el-select>
                </el-form-item>
                <el-button icon="el-icon-circle-plus-outline" @click.native="handAdd"></el-button>
                <el-button icon="el-icon-circle-close" @click.native="handleDelete"></el-button>
            </el-form> -->
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
            form1: {
                eName: '',
                cNmae: '',
                eCode: '',
            },
            form2: {
                type1: '',
                type2: '',
                type3: '',
                type4: '',
            },
            formData1: {
                name1: '',
                name2: '',
                name3: '',
            },
            formData2: {
                name21: '',
                name22: '',
                name23: '',
            },
            formList: [
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B'},
            ],
            sbList: [
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B'},
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B'},
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B'},
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B'},
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B'},
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B'},
                  {level1: '一级告警', level2: '严重告警', level3: '#DB001B'},
            ],
            nodes: [
                {
                    id: 1,
                    label: '资产类型',
                    children: [{
                        id: 2,
                        label: '硬件',
                        children: [{
                            id: 3,
                            label: '业务设备',
                            children: [{
                                id: 4,
                                label: '扩展板卡',
                            },{
                                id: 5,
                                label: '扩展板卡01',
                            },{
                                id: 6,
                                label: '扩展板卡02',
                            },]
                        },{
                            id: 7,
                            label: '业务设备',
                            children: [{
                                id: 8,
                                label: '扩展板卡',
                            },{
                                id: 9,
                                label: '扩展板卡01',
                            },{
                                id: 10,
                                label: '扩展板卡02',
                            },]
                        },{
                            id: 11,
                            label: '业务设备',
                            children: [{
                                id: 12,
                                label: '扩展板卡',
                            },{
                                id: 13,
                                label: '扩展板卡01',
                            },{
                                id: 14,
                                label: '扩展板卡02',
                            },]
                        }],
                    },{
                        id: 15,
                        label: '硬件1',
                        children: [{
                            id: 16,
                            label: '阿里云'
                        },{
                            id: 17,
                            label: '腾讯云',
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
        handleAdd() {
          this.formList.length = this.formList.length + 1;
          for(let i = 0; i<this.formList.length; i++) {
              this.$set(this.formList, i ,JSON.parse(JSON.stringify(this.sbList[i])));
          }
        },
        handleDelete(index, row) {
          console.log(index);
        },

    },
    mounted () {

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
        font-weight: bold;
        color: #FFFFFF;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        background: #0C1932;
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
        width: 80%;
        height: 800px;
        background: #152545;
    }
</style>
