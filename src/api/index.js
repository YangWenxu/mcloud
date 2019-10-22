import ApiBasic from './http_basic'

export default {
    install(Vue, opt) {
        const apiLoading = new Vue({
            data: () => ({loading: {}})
        })

        let api = ApiBasic(Vue);
        Vue.prototype.$apiLoading = apiLoading.loading;

        for (let i in api) {
            let originMethod = api[i];
            api[i] = function () {
                var args = []
                for (let arg in arguments) {
                    args.push(arguments[arg])
                }
                apiLoading.loading[i] = true;
                return new Promise((rev, rej) => {
                    originMethod.apply(api, args).then(res => {
                        rev(res)
                        setTimeout(() => {
                            apiLoading.loading[i] = false;
                        }, 500)
                    }).catch(e => {
                        rej(e)
                        setTimeout(() => {
                            apiLoading.loading[i] = false;
                        }, 500)
                    })
                })
                
            }
            apiLoading.$set(apiLoading.loading, i, false);
        }

        !Vue.prototype.$api && (Vue.prototype.$api = {});

        for (let i in api) {
            if (i in Vue.prototype.$api) { continue }
            api[i].toDelete = true;
            Vue.prototype.$api[i] = api[i];
        }

    }
}
