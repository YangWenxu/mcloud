<template>
  <div id="main">
    <div class="aside">
        <tree :nodes="data" :setting="setting" ref="sb" @onClick="onClick"/>
        <!-- <div class="custom-tree-node" slot-scope="{ node, data }"> -->
            <!-- <el-button type="text" size="mini" @click="append(data)">Append</el-button> -->
        <!-- </div> -->
    </div>
    <div class="container">
        <div class="header" style="text-align: left; font-size: 20px; font-weight: bold; background: #193166" >
            <div style="float:left; margin-left: 0;">详细信息</div>
            <div style="float:right;margin-right: 30px;">
                <el-button type="primary">删除</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="primary" @click="saveForm">保存</el-button>
            </div>

        </div>

        <div class="content">
            <hr style="margin-bottom: 30px;">
            <el-form :inline="true" :model="form1" class="demo-form-inline" ref="form1">
                <el-form-item label="英文名" prop="eName">
                    <el-input v-model="form1.eName" ></el-input>
                </el-form-item>
                <el-form-item label="中文名" prop="cName">
                    <el-input v-model="form1.cName"></el-input>
                </el-form-item>
                <el-form-item label="典型编码" prop="eCode">
                    <el-input v-model="form1.eCode"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form2" label-width="80px" class="demo-ruleForm" ref="form2">
                <div>上级类型</div>
                <el-form-item label="资产类型" prop="type1">
                    <el-input v-model="form2.type1"></el-input>
                </el-form-item>
                <div>下级类型</div>
                <el-form-item label="资产类型" prop="type2">
                    <el-select v-model="form2.type2">
                        <el-option label="詹姆斯" value="詹姆斯"></el-option>
                        <el-option label="戴维斯" value="戴维斯"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资产类型" prop="type3">
                    <el-select v-model="form2.type3">
                        <el-option label="阿德托昆博" value="阿德托昆博"></el-option>
                        <el-option label="斯蒂芬库里" value="斯蒂芬库里"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资产类型" prop="type4">
                    <el-select v-model="form2.type4">
                        <el-option label="杜兰特" value="杜兰特"></el-option>
                        <el-option label="凯里欧文" value="凯里欧文"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div>基础属性:</div>
            <div v-for="(item, index) in formList" :key="index" :value="index">
                <el-form :inline="true" class="demo-form-inline">
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
                        <el-button icon="el-icon-circle-plus-outline" @click.native="handleAdd1"></el-button>
                        <el-button icon="el-icon-circle-close" @click.native="handleDelete1(index)"></el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>扩展属性:</div>
            <div v-for="(item2, index) in formList2" :key="'info2-'+index" :value="index">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="英文名">
                        <el-input v-model="item2.level1"></el-input>
                    </el-form-item>
                    <el-form-item label="中文名">
                        <el-input v-model="item2.level2"></el-input>
                    </el-form-item>
                    <el-form-item label="缓存类型">
                        <el-input v-model="item2.level3"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-circle-plus-outline" @click.native="handleAdd2"></el-button>
                        <el-button icon="el-icon-circle-close" @click.native="handleDelete2(index)"></el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>连接关系:</div>
            <div v-for="(item3, index) in formList3" :key="'info3-'+index" :value="index">
              <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="资产类型">
                        <el-select v-model="item3.level1">
                            <el-option label="詹姆斯" value="詹姆斯"></el-option>
                            <el-option label="戴维斯" value="戴维斯"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="连接关系">
                        <el-select v-model="item3.level2">
                            <el-option label="阿德托昆博" value="阿德托昆博"></el-option>
                            <el-option label="斯蒂芬库里" value="斯蒂芬库里"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="对应关系">
                        <el-select v-model="item3.level3">
                            <el-option label="杜兰特" value="杜兰特"></el-option>
                            <el-option label="凯里欧文" value="凯里欧文"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button icon="el-icon-circle-plus-outline" @click.native="handleAdd3"></el-button>
                    <el-button icon="el-icon-circle-close" @click.native="handleDelete3(index)"></el-button>
                </el-form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
var _index;
let id = 1000;
import tree from "vue-giant-tree"
export default {
    components: {
        tree
	},
    data () {
        const data=[
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
        ];
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
            formList: [
                  {level1: '', level2: '', level3: ''},
            ],
            formList2: [
                { level1: '', level2: '', level3: '' },
            ],
            formList3: [
                { level1: '', level2: '', level3: '' },
            ],
            sbList: [
                  {level1: '', level2: '', level3: ''},
                  {level1: '', level2: '', level3: ''},
                  {level1: '', level2: '', level3: ''},
                  {level1: '', level2: '', level3: ''},
                  {level1: '', level2: '', level3: ''},
                  {level1: '', level2: '', level3: ''},
                  {level1: '', level2: '', level3: ''},
                  {level1: '', level2: '', level3: ''},
            ],
            data: JSON.parse(JSON.stringify(data)),
            setting: {
                check: {
                     enable: true
                },
                data: {
                    simpleData: {
                        enable: true,
                        pIdKey: "pid"
                    },
                    key:{
                        children: 'children',
                        name: 'label'
                    }
                },

               // callback: {    //回调函数，实现展开功能
               //      beforeAsync: beforeAsync,
               //      onAsyncSuccess: onAsyncSuccess,
               //      onAsyncError: onAsyncError
               //  },

                view: {
                    showIcon: false,
                    // addHoverDom: this.addHoverDom,
                    // removeHoverDom: this.removeHoverDom,
                }
            },
        }
    },
    methods: {
        // append(data) {
        //     const newChild = { id: id++, label: 'testtest', children: [] };
        //     if (!data.children) {
        //     this.$set(data, 'children', []);
        //     }
        //     data.children.push(newChild);
        // },
        handleAdd1() {
          this.formList.length = this.formList.length + 1;
          let a = this.formList.length-1;
          if(this.formList.length>8) {
              alert('添加已超过最大条数');
              this.formList.length = 8;
          } else {
              this.$set(this.formList, a ,JSON.parse(JSON.stringify(this.sbList[a])));
          }
        },
        handleAdd2() {
          this.formList2.length = this.formList2.length + 1;
          let b = this.formList2.length-1;
          if(this.formList2.length>8) {
              alert('添加已超过最大条数');
              this.formList2.length = 8;
          } else {
              this.$set(this.formList2, b ,JSON.parse(JSON.stringify(this.sbList[b])));
          }
        },
        handleAdd3() {
          this.formList3.length = this.formList3.length + 1;
          let c = this.formList3.length -1;
          if(this.formList3.length>8) {
              alert('添加已超过最大条数');
              this.formList3.length = 8;
          } else {
              this.$set(this.formList3, c ,JSON.parse(JSON.stringify(this.sbList[c])));
          }
        },
        handleDelete1(index) {
          if(this.formList.length > 1) {
              this.formList.splice(index, 1);
          }

        },
        handleDelete2(index) {
          if(this.formList2.length > 1) {
              this.formList2.splice(index, 1);
          }
        },
        handleDelete3(index) {
          if(this.formList3.length > 1) {
              this.formList3.splice(index, 1)
          }
        },
        resetForm() {
            this.$refs.form1.resetFields();
            this.$refs.form2.resetFields();
            this.formList.length = 1;
            this.$set(this.formList, 0, JSON.parse(JSON.stringify(this.sbList[0])));
            this.formList2.length = 1;
            this.$set(this.formList2, 0, JSON.parse(JSON.stringify(this.sbList[0])));

            this.formList3.length = 1;
            this.$set(this.formList3, 0, JSON.parse(JSON.stringify(this.sbList[0])));
        },
        saveForm() {

            var treeObj = this.$refs.sb.ztreeObj;
            treeObj.expandAll(true);

            let p = treeObj.getNodesByFilter(v => v.level ===2)[0];

            var newNode = { id:1111231, label: this.form1.cName };

            newNode = treeObj.addNodes(p, newNode);

            // console.log(this.formList);
            // console.log(this.formList2);
            // console.log(this.formList3);
        },
        // expand() {
        //   var treeObj = this.$refs.sb.ztreeObj;
        //   treeObj.expandAll(true);
        // },
        onClick: function(evt, treeId, treeNode) {
          // 点击事件
          // console.log(treeNode.label);
          this.form1.cName = treeNode.label;
        },
    },
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
    .content {
        width: 79%;
        margin-top: 40px;
        position: absolute;
    }
</style>
