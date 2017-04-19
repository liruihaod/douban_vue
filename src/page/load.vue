<template>
    <div class="load" ref="load" >
        <div class="load-img" :style="{backgroundPositionY: -(positionY%7)*1 + 'rem'}">

        </div>
        <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
        </svg>
</div>

</template>

<script>
    export default {
        data() {
            return {
                // 这里先定义雪碧图的初始位置
                positionY:0,
                timer:null,
            };
        },
        mounted(){
            this.timer=setInterval(()=>{
                this.positionY ++;
            },700)
        },
        methods: {
            stopLoad(){
            this.$refs.load.style.opacity=0;
            },
            startLoad(){
             this.$refs.load.style.opacity=1;
            }
        }
       
    }
</script>

<style lang="scss">

    @keyframes load{
        0%   {transform: translateY(0px);}
		50%  {transform: translateY(-50px);}
		100% {transform: translateY(0px);}
    }

    @keyframes ellipse{
        0%   {transform: scale(1);}
		50%  {transform: scale(0.3);}
		100% {transform: scale(1);}
    }

    .load{
        position:fixed;
        top:50%;
        left:50%;
        transform:translate3d(-50%,-50%,0);
        width:1rem;
        height:1rem;
        transition:all .8s;
        &-img{
            width:100%;
            height:100%;
            background:url("../../image/icon_loading.png") no-repeat;
            background-size:1rem auto;
            transform:translateY(0px);
            animation: load .7s infinite ease-in-out;
            position:relative;
            z-index:11;
        }
        &_ellipse{
            position:absolute;
            width:1rem;
            height:2rem;
            top:1.2rem;
            left:.11rem;
            z-index:10;
            animation:ellipse .7s  infinite ease-in-out;
        }
    }

</style>