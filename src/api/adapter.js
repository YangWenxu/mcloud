const exp = Vue => {
  const i18n = Vue.prototype.$i18nGlobal;
  const Message = Vue.prototype.$message;
  const axios = Vue.prototype.$http;
  // 创建Axios的实例
  let instanceaxios;
  if (process.env.SCLOUD_CTX) {
    instanceaxios = axios;
  } else {
    instanceaxios = axios.create({
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      withCredentials: true
    });

    // http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
    instanceaxios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // if (error.response) {
        //   switch (error.response.status) {
        //     case 401:
        //       // 这里写清除token的代码
        //       localStorage.removeItem("user");
        //       // window.location.href = "/Login";
        //       return Promise.reject(i18n.tc("System.OperationSeverError"));
        //     case 402:
        //       // 这里写清除token的代码
        //       localStorage.removeItem("user");
        //       // window.location.href = "/wechat";
        //       return Promise.reject(i18n.tc("System.OperationSeverError"));
        //     case 888: 
        //       localStorage.removeItem("user");
        //       sessionStorage.user && Vue.prototype.$api.logout();
        //       sessionStorage && sessionStorage.clear()
        //       sessionStorage.setItem('error', 888)
        //       location.hash = "/login";
        //       setTimeout(() => {
        //         location.reload()
        //       }, 0);
        //       break; 
        //     case 999:
        //       // 这里写清除token的代码
        //       localStorage.removeItem("user");
        //       sessionStorage.user && Vue.prototype.$api.logout();
        //       sessionStorage && sessionStorage.clear()
        //       location.hash = "/login";
        //       sessionStorage.setItem('error', 999)
        //       setTimeout(() => {
        //         location.reload()
        //       }, 0);
        //       break;
        //   }
        // }
      }
    );
  }

  const get = (url, params, successMessage, failureMessage) => {
    let silence = successMessage === true;
    return instanceaxios
      .get(url, params)
      .then(
        response => {
          let res = response.data;
          if (res.success) {
            successMessage &&
              Message({
                message: successMessage || i18n.tc("System.OperationSuccess"),
                type: "success",
                showClose: true
              });
            return Promise.resolve(res.data);
          } else {
            silence ||
              Message({
                message: failureMessage || i18n.tc("System.OperationFail"),
                type: "error",
                showClose: true
              });
          }
        },
        httpError => {
          Message({
            message: i18n.tc("System.OperationSeverError"),
            type: "error",
            showClose: true
          });
          return Promise.reject(httpError);
        }
      )
      .catch(err => {
        return Promise.reject(err);
      });
  };

  const post = (url, params, successMessage, failureMessage) => {
    let silence = successMessage === true;
    if (silence) {
      failureMessage = successMessage = null;
    }
    // 默认设置所有post请求为application/json
    return instanceaxios
      .post(url, params, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(
        response => {
          if (!response) {
            Message({
              message: i18n.tc("System.OperationSeverError"),
              type: "error",
              showClose: true
            });
            throw new Error("");
          }
          // 获取新数据后刷新滚动条
          setTimeout(() => {if (Vue.prototype.$util.browserInfo.browser != 'Phone') { window.dispatchEvent(new Event('resize')) }}, 50);
          let res = response.data;
          if (res.success) {
            successMessage &&
              Message({
                message: successMessage || i18n.tc("System.OperationSuccess"),
                type: "success",
                showClose: true
              });
            return Promise.resolve(res.data);
          } else {
            silence ||
              Message({
                message:
                  (response.data && response.data.info) ||
                  failureMessage ||
                  i18n.tc("System.OperationFail"),
                type: "error",
                showClose: true
              });
            return Promise.reject(res.data);
          }
        },
        httpError => {
          Message({
            message: httpError.message || httpError,
            type: "error",
            showClose: true
          });
          return Promise.reject(httpError);
        }
      )
      .catch(err => {
        return Promise.reject(err);
      });
  };

  return { post, get };
};

export default exp;
