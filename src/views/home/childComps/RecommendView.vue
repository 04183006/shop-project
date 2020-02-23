<template>
    <div class="recommend">
        <div v-for="(item, index) in recommends" :key="index" class="recommend-class">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            defalut(){
                return [];
            }
        }
    }
}
</script>

<style>
/* 展示栏的样式 */
.recommend{
    text-align: center;
    display: flex; 
    width: 100%;
    font-size: 15px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
}

.recommend-class{
    flex:1;
}

.recommend-class img{
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
}
</style>