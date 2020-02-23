module.exports = {
    plugins:{
        autoprefixer:{},
        "postcss-px-to-viewport" : {
            viewportWidth:375,   //视窗的宽度，对应的是我们设计稿的宽度
            viewportHeight:667,  //视窗的高度，对应的是我们设计稿的高度(也可以不配置)
            unitPrecision:5,     //指定'px'转换为视窗单位值得小数位数 (很多时无法整除)
            viewportUnit:'vw',   //指定需要转换成的视窗单位,建议使用vm
            selectorBlackList:['ignore','tab-bar','tab-bar-item'],  //指定不需要做转换的类

            //如果我把每个不需要转换类依次插入太麻烦，我直接写一个ignore，然后再布局页面的时候，直接加入类ignore
            minPixelValue:1,     //小于或者等于'1px'不转换为视窗单位
            mediaQuery:false     //允许媒体查询中转换为'px',一般使用插件就不用了
        }
    }
}