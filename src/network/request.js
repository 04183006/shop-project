//1.引入axios
import axios from 'axios'


//通过promise 封装

export function request(config){
    return new Promise((resolve, reject) => {
        //1.创建axios的实例
        const instance = axios.create({
            baseURL:'http://123.207.32.32:8000/api/hy',
            timeout:5000
        })

        //2.axios的拦截器
        //2.1请求拦截的作用
        instance.interceptors.request.use(config => {
            // console.log(config);  //拦截下来的是这个请求的所有配置，发送成功但是被拦截了
            return config  //return 出去的话就可以拿到请求的数据了
        },
        err=>{
            // console.log(err);  //来到这里的情况比较少
        })

        //2.2响应拦截的作用
        instance.interceptors.response.use(result => {
            return result.data
        },
        err => {
            console.log(err);
        })

        //3.发送真正的请求
        instance(config)
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    })
}





//传入两个函数回调出去拿到的数据
// export function request(config){
//     //1.创建axios实例
//     const instance = axios.create({
//         baseURL:'http://localhost:3002',
//         timeout:5000
//     })
//     return instance(config)
// } 
