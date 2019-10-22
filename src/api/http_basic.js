import adapterFn from './adapter';
const base = process.env.API_HOST;

export default (Vue) => {
const i18n = Vue.prototype.$i18nGlobal
const operationSuccess = i18n.tc('System.OperationSuccess');
const operationFail = i18n.tc('System.OperationFail');
const adapter = adapterFn(Vue);
return {
    /**
     * ********** common **********
     * @param {*} param
     */
    // "附件上传  (包含图片上传以及OTA升级文件上传 即 不处理业务的附件-不包含机型模型上传)"
    uploadAttachments (param) {
        return adapter.post(`${base}attachments/upload`, param)
    },

    // 附件下载(所有附件)
    downloadAttachments (param) {
        return adapter.post(`${base}attachments/download/{id},`, param)
    },
    // updateUserLanguage
    updateUserLanguage(param) {
        return adapter.post(`${base}common/updateUserLanguage`, param)
    },
    // 获取用户权限列表
    getUserPrivilegeList(param) {
        return adapter.post(`${base}common/getUserPrivilegeList`, param)
    },
    // 获取用户权限列表
    commonIsPhoneNumberExist(param) {
        return Vue.prototype.$http.post(`${base}common/isPhoneNumberExist`, param, {headers: { "Content-Type": "application/json;charset=UTF-8" }}).then(res => {
            if (!res.data.success) {  
                Vue.prototype.$notify({
                    message: res.data.info,
                    type: 'warning'
                })
            }
        })
    },

    /**
     * ********** ManageCategory **********
     * @param {} param
     */

    // 查询机型列表 -分页
    getMachineCategory (param) {
        return adapter.post(`${base}machineCategory/queryList`, param)
    },

    // 机型模型上传
    uploadModelFile (param) {
        return adapter.post(`${base}machineCategory/uploadModelFile`, param, operationSuccess, operationFail)
    },

    // 新增或修改设计模型
    saveOrUpdate (param) {
        return adapter.post(`${base}machineCategory/saveOrUpdate`, param, operationSuccess, operationFail)
    },

    // 设备类型是否已经存在
    machineTypeExist (param) {
        return adapter.post(`${base}machineCategory/machineTypeExist`, param)
    },

    // Category Name 下拉
    getAllMachineCategoryType (param) {
        return adapter.post(`${base}machineCategory/getAllType`, param)
    },

    // Controller 下拉
    getMachineCategoryControllerFirm (param) {
        return adapter.post(`${base}machineCategory/getControllerFirm`, param)
    },

    // " Category Name Controller  下拉-删除"
    delMachineCategoryDictionary (param) {
        return adapter.post(`${base}machineCategory/delDictionary`, param)
    },

    // machine category delete 删机型
    machineCategoryDelete(param) {
        return adapter.post(`${base}machineCategory/delete`, param, operationSuccess, operationFail);
    },
    

    /**
     * ********** MachineCategory DeviceModel **********
     * @param {} param
     */

    // m-Box同步
    pointSyncModel (param) {
        return adapter.post(`${base}point/syncModel`, param)
    },

    // "机型模型-设备模型列表   全部 不分页-用于下拉"
    pointGetAllPoint (param) {
        return adapter.post(`${base}point/allPoint`, param)
    },

    // 机型模型-设备模型列表
    pointGetPointList (param) {
        return adapter.post(`${base}point/getPointList`, param)
    },

    // 机型模型-设备模型-新增
    pointAddPoint (param) {
        return adapter.post(`${base}point/addPoint`, param, operationSuccess, operationFail)
    },

    // 机型模型-设备模型-修改
    pointUpdatePoint (param) {
        return adapter.post(`${base}point/upPoint`, param, operationSuccess, operationFail)
    },

    // 机型模型-设备模型-删除
    pointDelPoint (param) {
        return adapter.post(`${base}point/delPoint`, param, operationSuccess, operationFail)
    },

    // 查询获取单个点位信息
    machineGetPointInfo (param) {
        return adapter.post(`${base}machine/getPointInfo`, param)
    },

    // 机型-点位-Running Conditions 列表
    pointGetRun (param) {
        return adapter.post(`${base}point/getRun`, param)
    },

    // 机型-点位-Running Conditions新增
    pointAddRun (param) {
        return adapter.post(`${base}point/addRun`, param, operationSuccess, operationFail)
    },

    // 机型-点位-Running Conditions新增
    pointUpdateRun (param) {
        return adapter.post(`${base}point/upRun`, param, operationSuccess, operationFail)
    },

    // 机型-点位-Running Conditions删除
    pointDelRun (param) {
        return adapter.post(`${base}point/delRun`, param, operationSuccess, operationFail)
    },

    // 机型-点位-key Parameter 列表
    pointGetKey (param) {
        return adapter.post(`${base}point/getKey`, param)
    },

    // 机型-点位-key Parameter删除
    pointAddKey (param) {
        return adapter.post(`${base}point/addKey`, param)
    },

    // 机型-点位-key Parameter修改
    pointUpdateKey (param) {
        return adapter.post(`${base}point/upKey`, param)
    },

    // 机型-点位-key Parameter删除
    pointDelKey (param) {
        return adapter.post(`${base}point/delKey`, param)
    },

    // 机型模型-设备模型列表group
    pointGetPointGroup (param) {
        return adapter.post(`${base}point/getPointGroup`, param)
    },

    // 获取run和key
    getRunAndKey (param) {
        return adapter.post(`${base}point/getRunAndKey`, param)
    },

    // 保存run和key
    saveRunAndKey (param) {
        return adapter.post(`${base}point/addList`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },


    //
    //  设备列表
    //
    // 设备-获取列表-分页
    machineGetList (param) {
        return adapter.post(`${base}machine/getList`, param)
    },

    // 设备-新增
    addMachine (param) {
        return adapter.post(`${base}machine/addMachine`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 设备-修改
    modifyMachine (param) {
        return adapter.post(`${base}machine/modifyMachine`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 设备-删除
    delMachine (param) {
        return adapter.post(`${base}machine/delMachine`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    // 根据  Category Name下拉机型列表
    machineGetModel (param) {
        return adapter.post(`${base}machine/getModel`, param)
    },
    getMachineById (param) {
        return adapter.post(`${base}machine/getById`, param)
    },

    // 机型模型-设备模型列表group
    machineGetPointGroup (param) {
        return adapter.post(`${base}machine/getPointGroup`, param)
    },

    machineDownJson (param) {
        return adapter.post(`${base}machine/downJson`, param)
    },

    machineDownCsv (param) {
        return adapter.post(`${base}machine/downCsv`, param)
    },

    machineDestroyDown (param) {
        return adapter.post(`${base}machine/destroyDown`, param)
    },

    machineQueryDown (param) {
        return adapter.post(`${base}machine/queryDown`, param)
    },

    machineQueryDownHistory (param) {
        return adapter.post(`${base}machine/queryDownHistory`, param)
    },

    // 设备-获取 点位列表-分页
    machineGetPointList (param) {
        return adapter.post(`${base}machine/getPointList`, param)
    },

    // 设备-点位-修改点位值
    machineSetPoint (param) {
        return adapter.post(`${base}machine/setPoint`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 根据设备 点位 获取该点位的历史数据
    machineGetHistory (param) {
        return adapter.post(`${base}machine/getHistory`, param)
    },

    // 设备-根据categoryId获取机型
    machineGetMachineCategoryById (param) {
        return adapter.post(`${base}machineCategory/getById `, param)
    },


    // 设备-设备看板-key列表
    machineGetKeyParameter (param) {
        return adapter.post(`${base}machine/getKeyParameter`, param)
    },

    // 设备-告警统计
    machineGetStatusGroup (param) {
        return adapter.post(`${base}machine/getStatusGroup`, param)
    },

    // 修改设备名称
    modifyMachineName (param) {
        return adapter.post(`${base}machine/modifyMachineName`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 获取机型导出设备列表
    machineGetQueryList (param) {
        return adapter.post(`${base}machine/getQueryList`, param)
    },

    // 计算设备点位实时值
    machineComputePoint (param) {
        return adapter.post(`${base}machine/computePoint`, param)
    },

    // 设备-告警统计
    alarmGetAlarmGroup (param) {
        return adapter.post(`${base}eventList/getEventGroup`, param)
    },

    // 设备-告警列表
    alarmGetAlarmList (param) {
        return adapter.post(`${base}alarm/getAlarmList`, param)
    },

    // 设备-告警消除
    alarmClearAlarm (param) {
        return adapter.post(`${base}alarm/clear`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    // m-box新增
    mBoxAddBox (param) {
        return adapter.post(`${base}mBox/addBox`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // m-box 列表 -分页
    mBoxGetList (param) {
        return adapter.post(`${base}mBox/getList`, param)
    },

    // m-box删除
    mBoxDelBox (param) {
        return adapter.post(`${base}mBox/delBox`, param)
    },

    // m-box 解除绑定设备
    mBoxUnbundlingDvs (param) {
        return adapter.post(`${base}mBox/unbundlingDvs`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },


    // m-box 绑定设备
    mBoxBundlingDvs (param) {
        return adapter.post(`${base}mBox/bundlingDvs`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // m-box 已绑定设备列表
    mBoxGetDvsInfo (param) {
        return adapter.post(`${base}mBox/getDvsInfo`, param)
    },

    // m-box  未绑定设备列表
    mBoxGetUnbundlingDvs (param) {
        return adapter.post(`${base}mBox/getUnbundlingDvs`, param)
    },

    // m-box  重启
    mBoxReboot (param) {
        return adapter.post(`${base}mBox/reboot`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // m-box  同步
    mBoxSync (param) {
        return adapter.post(`${base}mBox/syncBox`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    boxRouteGetMaxConnection (param) {
        return adapter.post(`${base}boxRoute/getMaxConnection`, param)
    },
    boxRouteModifyMaxConnection (param) {
        return adapter.post(`${base}boxRoute/modifyMaxConnection`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    boxRouteGetBoxRouteList (param) {
        return adapter.post(`${base}boxRoute/getBoxRouteList`, param)
    },
    boxRouteGetCompanyFactoryTree () {
        return adapter.post(`${base}boxRoute/getCompanyFactoryTree`)
    },

    
    // 新增OTA升级信息
    OTAAddOTA (param) {
        return adapter.post(`${base}OTA/addOTA`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 删除OTA升级信息
    OTADeleteOTA (param) {
        return adapter.post(`${base}OTA/delOTA`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 获取OTA 查询列表
    OTAGetOTAList (param) {
        return adapter.post(`${base}OTA/getOTAList`, param)
    },

    // OTA- 可升级的在线Box列表
    OTAGetBoxList (param) {
        return adapter.post(`${base}OTA/getBoxList`, param)
    },

    // 选择box进行OTA升级下发
    updateOTA (param) {
        return adapter.post(`${base}OTA/up`, param, i18n.tc('System.HasBeenSent'), i18n.tc('System.OperationFail'))
    },

    // OTA右侧统计栏
    OTAGetOTAGroup (param) {
        return adapter.post(`${base}OTA/getOTAGroup`, param)
    },

    // OTA-统计界面-pending界面
    OTAGetPending (param) {
        return adapter.post(`${base}OTA/getPending`, param)
    },

    // OTA-统计界面-结果界面
    OTAGetDetailList (param) {
        return adapter.post(`${base}OTA/getDetailList`, param)
    },

    // OTA-判读该软件是否已存在(重复)
    OTAswVersionExist (param) {
        return adapter.post(`${base}OTA/swVersionExist`, param, true)
    },


    // 用户登录
    login (param) {
        return adapter.post(`${base}common/login`, param)
    },

    // 用户退出登录
    logout (param) {
        return adapter.post(`${base}common/logout`, param)
    },

    // 个人信息-修改密码
    modifyPassword (param) {
        return adapter.post(`${base}common/modifyPassword`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 验证手机号存在性
    commonCheckPhoneExist (param) {
        return adapter.post(`${base}common/checkPhoneExist`, param, true);
    },

    // 向指定手机号发送验证码
    commonSendPhoneCode (param) {
        return adapter.post(`${base}common/sendPhoneCode`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'));
    },

    // 修改绑定手机号
    commonModifyPhone (param) {
        return adapter.post(`${base}common/modifyPhone`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'));
    },

    // 验证邮箱存在性
    commonCheckEmailExist (param) {
        return adapter.post(`${base}common/checkEmailExist`, param, true);
    },

    // 向指定邮箱发送验证码
    commonSendEmailCode (param) {
        return adapter.post(`${base}common/sendEmailCode`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'));
    },

    // 修改用户绑定邮箱
    commonModifyEmail (param) {
        return adapter.post(`${base}common/modifyEmail`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'));
    },

    // 个人信息-修改刷新时间
    changeRefreshTime (param) {
        return adapter.post(`${base}userManage/freshTime`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 获取企业列表
    companyManageGetCompanyList (param) {
        return adapter.post(`${base}companyManage/getCompanyList`, param)
    },

    // 添加企业
    companyManageAddCompany (param) {
        return adapter.post(`${base}companyManage/addCompany`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 修改企业信息
    companyManageModifyCompany (param) {
        return adapter.post(`${base}companyManage/modifyCompany`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 删除企业
    companyManageDeleteCompany (param) {
        return adapter.post(`${base}companyManage/deleteCompany`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 获取已绑定机器列表
    companyManageGetBoundMachines (param) {
        return adapter.post(`${base}companyManage/getBoundMachines`, param)
    },

    // 获取未绑定机器列表
    companyManageGetUnboundMachines (param) {
        return adapter.post(`${base}companyManage/getUnboundMachines`, param)
    },

    // 绑定机器
    companyManageBindMachine (param) {
        return adapter.post(`${base}companyManage/bindMachine`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 解绑机器
    companyManageUnbindMachine (param) {
        return adapter.post(`${base}companyManage/unbindMachine`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 进入客户视图
    companyManageCustomerLogin (param) {
        return adapter.post(`${base}companyManage/customerLogin`, param)
    },

    // 进入客户视图
    companyBackManufacturer (param) {
        return adapter.post(`${base}common/backManufacturer`, param)
    },

    // 获取用户列表
    userManageGetUserList (param) {
        return adapter.post(`${base}userManage/getUserList`, param)
    },

    // 增加用户
    userManageAddUser (param) {
        return adapter.post(`${base}userManage/addUser`, param)
    },

    // 修改用户信息
    userManageModifyUser (param) {
        return adapter.post(`${base}userManage/modifyUser`, param)
    },

    // 删除用户
    userManageDeleteUser (param) {
        return adapter.post(`${base}userManage/deleteUser`, param)
    },

    // 获取工厂列表
    factoryManageGetFactoryList (param) {
        return adapter.post(`${base}factoryManage/getFactoryList`, param)
    },

    // 添加工厂
    factoryManageAddFactory (param) {
        return adapter.post(`${base}factoryManage/addFactory`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 修改工厂信息
    factoryManageModifyFactory (param) {
        return adapter.post(`${base}factoryManage/modifyFactory`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 删除工厂
    factoryManageDeleteFactory (param) {
        return adapter.post(`${base}factoryManage/deleteFactory`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 获取已绑定机器列表
    factoryManageGetBoundMachines (param) {
        return adapter.post(`${base}factoryManage/getBoundMachines`, param)
    },

    // 获取未绑定机器列表
    factoryManageGetUnboundMachines (param) {
        return adapter.post(`${base}factoryManage/getUnboundMachines`, param)
    },

    // 绑定机器
    factoryManageBindMachine (param) {
        return adapter.post(`${base}factoryManage/bindMachine`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 解绑机器
    factoryManageUnbindMachine (param) {
        return adapter.post(`${base}factoryManage/unbindMachine`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },


    /**
     * ********** User Management **********
     */

    getUserList (param) {
      return adapter.post(`${base}userManage/getUserList`, param)
    },

    addUser (param) {
      return adapter.post(`${base}userManage/addUser`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    modifyUser (param) {
      return adapter.post(`${base}userManage/modifyUser`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    deleteUser (param) {
      return adapter.post(`${base}userManage/deleteUser`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    /**
     * ********** Authority Management **********
     */
    getUserListPrivilege (param) {
        return adapter.post(`${base}maker/privilegeManage/getUserList`, param)
    },

    getAllMachines () {
        return adapter.post(`${base}maker/privilegeManage/getAllMachines`)
    },

    updateUserMachines (param) {
        return adapter.post(`${base}maker/privilegeManage/updateUserMachines`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    updateUserPrivilege (param) {
        return adapter.post(`${base}maker/privilegeManage/updateUserPrivilege`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    

    /**
     * ********** Authority Management For Customer **********
     */
    customerGetUserListPrivilege (param) {
        return adapter.post(`${base}customer/privilegeManage/getUserList`, param)
    },

    customerGetAllMachines () {
        return adapter.post(`${base}customer/privilegeManage/getAllMachines`)
    },

    customerUpdateUserMachines (param) {
        return adapter.post(`${base}customer/privilegeManage/updateUserMachines`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    customerUpdateUserPrivilege (param) {
        return adapter.post(`${base}customer/privilegeManage/updateUserPrivilege`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },


    // 制造商获取机器分布总览
    makerHomepageGetMachineOverview (param) {
      return adapter.post(`${base}maker/homepage/getMachineOverview`, param)
    },

    // 制造商获取机型分布
    makerHomepageGetMachineCategory (param) {
      return adapter.post(`${base}maker/homepage/getMachineCategory`, param)
    },

    // 制造商获取机器数据大小
    makerHomepageGetMachineDataSize (param) {
      return adapter.post(`${base}maker/homepage/getMachineDataSize`, param)
    },

    // 制造商获取机器可用性分布
    makerHomepageGetMachineAvailability (param) {
      return adapter.post(`${base}maker/homepage/getMachineAvailability`, param)
    },

    // 制造商获取机器总数
    makerHomepageGetTotalMachineCount (param) {
      return adapter.post(`${base}maker/homepage/getTotalMachineCount`, param)
    },

    // 制造商获取近七天机器数量
    makerHomepageGetMachineQuantity (param) {
        return adapter.post(`${base}maker/homepage/getMachineQuantity`, param)
      },
  
    // 制造商获取近七天告警数量
    makerHomepageGetTotalMachineAlarm (param) {
    return adapter.post(`${base}maker/homepage/getMachineAlarm`, param)
    },

    // 客户获取机器分布总览
    customerHomepageGetMachineOverview (param) {
      return adapter.post(`${base}customer/homepage/getMachineOverview`, param)
    },

    // 客户获取机型分布
    customerHomepageGetMachineCategory (param) {
      return adapter.post(`${base}customer/homepage/getMachineCategory`, param)
    },

    // 客户获取机器数据大小
    customerHomepageGetMachineDataSize (param) {
      return adapter.post(`${base}customer/homepage/getMachineDataSize`, param)
    },

    // 客户获取机器可用性分布
    customerHomepageGetMachineAvailability (param) {
      return adapter.post(`${base}customer/homepage/getMachineAvailability`, param)
    },

    // 客户获取机器总数
    customerHomepageGetTotalMachineCount (param) {
      return adapter.post(`${base}customer/homepage/getTotalMachineCount`, param)
    },

    // 客户获取近七天机器数量
    customerHomepageGetMachineQuantity (param) {
        return adapter.post(`${base}customer/homepage/getMachineQuantity`, param)
      },
  
    // 制造商获取近七天告警数量
    customerHomepageGetTotalMachineAlarm (param) {
    return adapter.post(`${base}customer/homepage/getMachineAlarm`, param)
    },

    /**
     * ************ log manage **********
     */
    // 获取日志列表
    getLogList (param) {
        return adapter.post(`${base}logManage/getLogList`, param)
    },


    /**
     * ************ 事件管理 **********
     */
    // 修改告警设置
    eventAlarmUpAlarm (param) {
        return adapter.post(`${base}eventAlarm/upAlarm`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    
    // 新增告警设置
    eventAlarmSave (param) {
        return adapter.post(`${base}eventAlarm/save`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    
    // 告警设置列表
    eventAlarmGetList (param) {
        return adapter.post(`${base}eventAlarm/getList`, param)
    },
    
    // 预警设置列表
    eventWarningList (param) {
        return adapter.post(`${base}eventWarning/list`, param)
    },
    
    // 删除告警设置
    eventAlarmDelAlarm (param) {
        return adapter.post(`${base}eventAlarm/delAlarm`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    
    // 删除预警设置
    eventWarningDelWarning (param) {
        return adapter.post(`${base}eventWarning/delWarning`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    
    // 修改预警设置
    eventWarningUpdate (param) {
        return adapter.post(`${base}eventWarning/update`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    
    // 新增 预警设置
    eventWarningSave (param) {
        return adapter.post(`${base}eventWarning/save`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 事件清单-生成工单  
    eventListCreateOrder (param) {
        return adapter.post(`${base}eventList/createOrder`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
	
    // 事件清单-清除  
    eventListClearEvent (param) {
        return adapter.post(`${base}eventList/clearEvent`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 事件清单-列表  
    eventListList (param) {
        return adapter.post(`${base}eventList/list`, param)
    },

    // 获取模板列表
    machineMaintainGetTemplateList (param) {
        return adapter.post(`${base}machineMaintain/getTemplateList`, param)
    },

    // 添加模板
    machineMaintainAddTemplate (param) {
        return adapter.post(`${base}machineMaintain/addTemplate`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 修改模板
    machineMaintainModifyTemplate (param) {
        return adapter.post(`${base}machineMaintain/modifyTemplate`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 删除模板
    machineMaintainDeleteTemplate (param) {
        return adapter.post(`${base}machineMaintain/deleteTemplate`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 获取计划列表
    machineMaintainGetMaintainPlanList (param) {
        return adapter.post(`${base}machineMaintain/getMaintainPlanList`, param)
    },
    
    // 添加计划
    machineMaintainAddMaintainPlan (param) {
        return adapter.post(`${base}machineMaintain/addMaintainPlan`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    
    // 获取机器权限内的执行人列表
    machineMaintainGetExecutorList (param) {
        return adapter.post(`${base}machineMaintain/getExecutorList`, param)
    },
    
    // 查询企业下所有机器的机型
    machineCategoryQueryCompanyMachineType (param) {
        return adapter.post(`${base}machineCategory/queryCompanyMachineType`, param)
    },
    
    // 获取某个机型下的所有机器Code
    machineGetMachinesByCategoryId (param) {
        return adapter.post(`${base}machine/getMachinesByCategoryId`, param)
    },
    
    // 修改保养计划
    machineMaintainModifyMaintainPlan (param) {
        return adapter.post(`${base}machineMaintain/modifyMaintainPlan`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    
    // 删除保养计划
    machineMaintainDeleteMaintainPlan (param) {
        return adapter.post(`${base}machineMaintain/deleteMaintainPlan`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 查询获取保养任务列表
    machineMaintainGetMaintainTaskList (param) {
        return adapter.post(`${base}machineMaintain/getMaintainTaskList`, param)
    },
    // 获取企业下机型机器树
    machineGetCategoryMachineTree (param) {
        return adapter.post(`${base}machine/getCategoryMachineTree`, param)
    },
    // 作废任务
    machineMaintainAbandonTask (param) {
        return adapter.post(`${base}machineMaintain/abandonTask`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    // 开始执行任务
    machineMaintainStartTask (param) {
        return adapter.post(`${base}machineMaintain/startTask`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    // 添加任务补充图片
    machineMaintainAddTaskImages (param) {
        let formdata = new FormData();
        param.forEach(v => {
            formdata.append('fileList', v.raw)
        })
        return Vue.prototype.$http.post(`${base}machineMaintain/addTaskImages`, formdata, {headers: { "Content-Type": "application/x-www-form-urlencoded" }})
    },
    // 完成任务
    machineMaintainFinishTask (param) {
        return adapter.post(`${base}machineMaintain/finishTask`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 获取任务详情
    machineMaintainGetTaskDetail (param) {
        return adapter.post(`${base}machineMaintain/getTaskDetail`, param)
    },

    // 工单管理-处理-完成
    eventOrderFinish (param) {
        return adapter.post(`${base}eventOrder/finish`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 工单管理-处理-取消 (撤销)
    eventOrderCancel (param) {
        return adapter.post(`${base}eventOrder/cancel`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },
    // 工单管理-指派给运营商 (撤销)
    eventOrderTransfer (param) {
        return adapter.post(`${base}eventOrder/transfer`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 工单管理-处理-返回
    eventOrderBack (param) {
        return adapter.post(`${base}eventOrder/back`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 工单管理-处理
    eventOrderHandle (param) {
        return adapter.post(`${base}eventOrder/handle`, param, i18n.tc('System.OperationSuccess'), i18n.tc('System.OperationFail'))
    },

    // 工单管理-列表
    eventOrderList (param) {
        return adapter.post(`${base}eventOrder/list`, param)
    },

    // 工单管理-详情
    eventOrderDetail (param) {
        return adapter.post(`${base}eventOrder/detail`, param)
    },

    // 机型图片上传
    attachmentsUpload (file) {
        let formdata = new FormData();
        formdata.append('file', file.raw)
        return Vue.prototype.$http.post(`${base}attachments/upload`, formdata, {headers: { "Content-Type": "application/x-www-form-urlencoded" }})
    },
    


    

    // 获取集群列表
    clusterGetClusterList (param) {
        return adapter.post(`${base}cluster/getClusterList`, param)
    },
    // 获取可选设备列表    
    clusterGetOptionalMachines (param) {
        return adapter.post(`${base}cluster/getOptionalMachines`, param)
    },
    // 添加集群图片    
    clusterAddClusterImage (file) {
        let formdata = new FormData();
        return Vue.prototype.$util.pictureCompress([file.raw]).then(images => {
            formdata.append('file', images[0])
            return Vue.prototype.$http.post(`${base}cluster/addClusterImage`, formdata, {headers: { "Content-Type": "application/x-www-form-urlencoded" }})
        })
    },
    // 查询集群图片    
    clusterQueryClusterImage (param) {
        return adapter.post(`${base}cluster/queryClusterImage?imgId={}`, param)
    },
    // 新增集群    
    clusterAddCluster (param) {
        return adapter.post(`${base}cluster/addCluster`, param)
    },
    // 修改集群信息    
    clusterModifyCluster (param) {
        return adapter.post(`${base}cluster/modifyCluster`, param)
    },
    // 删除集群    
    clusterDeleteCluster (param) {
        return adapter.post(`${base}cluster/deleteCluster`, param)
    },
    // 获取机器下的关键参数    
    clusterGetMachineParameters (param) {
        return adapter.post(`${base}cluster/getMachineParameters`, param)
    },
    // 获取设置的显示关键参数、参数位置、参数显示高度
    clusterGetKeyParametersDisplay (param) {
        return adapter.post(`${base}cluster/getKeyParametersDisplay`, param)
    },
    // 设置显示关键参数、参数位置、参数显示高度
    clusterDetKeyParametersDisplay (param) {
        return adapter.post(`${base}cluster/setKeyParametersDisplay`, param)
    },


}};