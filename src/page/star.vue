<template>
    <div class="star">
       <mu-icon value="star"  color="#F90" :size="size"  v-for="item in itemClass(this.score).on"class="star-item"/>
       <mu-icon value="star_half"  color="#F90" :size="size"  v-if="itemClass(this.score).half" class="star-item"/>
       <mu-icon value="star_border" color="#F90"   :size="size" v-for="item in itemClass(this.score).off" class="star-item"/>
    </div>
</template>
<script>
// 这里设置几个固定值
const LENGTH= 5;
export default {
    props:{
        size:{
            type:Number
        },
        score:{
            type:Number
        },
        color:{
            type:String
        }
    },methods:{
       itemClass(item){
           let on=Math.floor(item/2);
           let half=on%1!==0;
           let off=LENGTH-Math.ceil(on);
           return{
               on,
               half,
               off
           }

       }
    }

}
</script>

<style lang='scss'>
    .star{
       display:flex;
       justify-content: center;
    }
</style>