<template>
   <div class="nav-bar">
      <nav-bar>
          <div slot="left" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
          <div slot="center" class="title">
              <div v-for="(item,index) in titles" :key="index" class="title-item" 
              :class="{active: currentIndex == index}"
              @click="itemClick(index)">
                  {{item}}
              </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'DetailNavBar',
    data(){
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    components:{
        NavBar
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            this.$emit('titleClick',index)
        },
        backClick(){
            this.$router.back();
        }
    }
}
</script>

<style>
.nav-bar{
    /* background: pink; */
}

.nav-bar img{
    width: 22px;
    height: 22px;
    margin-top: 11px;
}

.title{
    display: flex;
}

.title-item{
    flex:1;
    font-size: 15px;
} 

.active{
    color:var(--color-high-text);
}
</style>