<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" :key="index" class="tab-control-class" 
      :class="{active: index == currentIndex}"
      @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            //自定义事件
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    background-color: #ffffff;
}

.tab-control-class {
    flex: 1;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
}

.active{
    color: var(--color-high-text);
}

.active span{
    border-bottom: 3px solid var(--color-high-text);
}

.tab-control-class span{
    padding:5px;
}
</style>