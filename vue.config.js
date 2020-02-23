module.exports = {
    // 配置别名
    configureWebpack:{
        resolve:{
            // 解决路径相关问题
            alias:{
                //给src文件夹下配置别名
                //其实内部已经为src配置了别名@
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    }
}