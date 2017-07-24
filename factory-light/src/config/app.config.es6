export const URI = {
    loginCheck: '/v1/web/lighting/common/admin/loginCheck', //用户登录
    logout:'/v1/web/lighting/common/admin/logout', //用户登出
    getCompanyList: '/v1/web/lighting/company/getCompanyList', //获取公司信息列表
    getCompanyPageList: '/v1/web/lighting/page/getCompanyList', //获取公司信息列表(分页)
    addCompany: '/v1/web/lighting/company/addCompany', //新增公司
    updateCompany: '/v1/web/lighting/company/updateCompany', //修改公司信息
    deleteCompany: '/v1/web/lighting/company/deleteCompany', //删除公司信息
    getRegionList: '/v1/web/lighting/region/getRegionList', //获取区域信息列表
    getRegionPageList: '/v1/web/lighting/page/getRegionList',	//获取区域信息列表(分页)
    addRegion: '/v1/web/lighting/region/addRegion',	//新增区域
    updateRegion: '/v1/web/lighting/region/updateRegion',	//修改区域信息
    deleteRegion: '/v1/web/lighting/region/deleteRegion',	//删除区域信息
    getController: '/v1/web/lighting/controllerManage/getController', //获取控制器信息列表
    getPageController: '/v1/web/lighting/page/getController', //获取控制器信息列表(分页)
    getAuthorityList: '/v1/web/lighting/authority/getAuthorityList', //获取权限列表
    getAuthorityPageList: '/v1/web/lighting/page/getAuthorityList', //获取权限列表(分页)
    addAuthority: '/v1/web/lighting/authority/addAuthority', //新增权限
    updateAuthority: '/v1/web/lighting/authority/updateAuthority', //修改权限
    deleteAuthority: '/v1/web/lighting/authority/deleteAuthority',	//删除权限
    getUserList: '/v1/web/lighting/user/getUserList', //获取用户信息列表
    getUserPageList: '/v1/web/lighting/page/getUserList', //获取用户信息列表(分页)
    addUser: '/v1/web/lighting/user/addUser', //新增用户
    updateUser: '/v1/web/lighting/user/updateUser', //修改用户信息
    deleteUser: '/v1/web/lighting/user/deleteUser',	//删除用户信息
    
    getProtoConfig: '/v1/web/lighting/protoManage/getProtoConfig', // 获取属性字段
    getProject:     '/v1/web/lighting/get/getLayout', // 获取项目
    saveProject:    '/v1/web/lighting/layout/saveLayout', // 保存项目
    delProject:     '/v1/web/lighting/layout/deleteLayout', // 删除项目
    publishProject: '/v1/web/open/projectManage/publishProject', // 发布项目
    previewProject: '/v1/web/open/projectManage/previewProject', // 预览项目
    getPulishedHtml:'/v1/web/open/projectManage/getPulishedHtml', // 获取项目html地址
    saveWidget:     '/v1/web/lighting/widget/saveWidget', // 保存控件
    delWidget:      '/v1/web/lighting/widget/deleteWidget', // 删除控件
    delWidgetList:  '/v1/web/open/projectManage/delWidgetList', // 删除控件列表
    saveWidgetList: '/v1/web/open/projectManage/saveWidgetList', // 保存控件列表
    getWidgetStyleList:'/v1/web/lighting/widget/getWidgetStyleList', // 获取控件样式列表
    uploadFile:     '/v1/web/open/projectManage/uploadFile' ,// 上传文件
    getControllerList:'/v1/web/lighting/controller/getControllerList' ,// 查询控制器列表
    relatedSwitch:'/v1/web/lighting/switch/relatedSwitch' ,// 查询关联开关

};

export const APP_CONFIG = {
    operationHistoryLength  : 20, // 操作历史记录步数
};
