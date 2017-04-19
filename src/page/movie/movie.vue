<template>
  <div class="book">
    <div class="book-header">
      <v-tab @zone="tellAbout" class="left"></v-tab>
      <p>电影</p>
      <mu-icon class="right"  @click="search();" value="search" />
    </div>
    <div class="book-main">
      <mu-tabs class="mu-tabs"  :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="最近热映" />
        <mu-tab value="tab2" @click="fetchDate()" title="即将上映"  />
      </mu-tabs>
    </div>
    <div class="book-content" ref="content">
      <div>
        <ul v-show="moviekey">
          <li class="list-show" v-for="item in hot">
          <router-link transition="fadeOutLeft" :to="{name: 'movieContent', params:{id:item.id}}">
            <mu-paper :zDepth="2">
              <img :src="item.images.large" alt="">
              <h1>{{item.title}}</h1>
              <star :size="18" :score="item.rating.average"></star>
              <p>{{item.collect_count}}人想看</p>
            </mu-paper>
          </router-link>
                    </li>
        </ul>
        <ul v-show="!moviekey">
          <li class="list-show" v-for="item in hotd">
          <router-link :to="{name: 'movieContent', params:{id:item.id}}">
            <mu-paper :zDepth="2">
              <img :src="item.images.large" alt="">
              <h1>{{item.title}}</h1>
              <star :size="18" :score="item.rating.average"></star>
              <p>{{item.collect_count}}人想看</p>
            </mu-paper>
             </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="load">
       <v-load ref="loading"></v-load>
    </div>
  </div>
</template>
<script>
  import * as type from 'store/movie/type';
  import {mapState} from 'vuex';
  import tab from 'page/tab.vue';
  import star from 'page/star.vue';
  import axios from 'axios';
  import BScroll from 'better-scroll'
  import load from 'page/load.vue';
  export default {
    data() {
      return {
        open: false,
        docked: true,
        activeTab: 'tab1',
        movie: Object,
        moviekey: true,
        future: Object,
        tabName:"in_theaters",
        scrollKey:false,
        tickData:this.$store.state.movie.movies.in_theaters.subjects
      }
    },
    mounted () {
      this.fetchDate();
      if(this.tickData.length>0){
          this.$refs.loading.stopLoad();
          this.$nextTick(()=>{
           this.scroll = new BScroll(this.$refs.content, {
            startX: 0,
            startY: 0,
            click:true
          })
          })
      }
    },
    computed:mapState({
      hot(state){
        return state.movie.movies.in_theaters.subjects;
      },
      hotd(state){
        return state.movie.movies.coming_soon.subjects;
      }
    }),
    watch:{
      hot(){
        if(!this.scrollKey){
          console.log("zone")
              this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.content, {
            startX: 0,
            startY: 0,
            click:true
          })
          this.scrollKey=true;
           this.$refs.loading.stopLoad();
          })
        }
      },
      hotd(){
        if(!this.scrollKey){
              this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.content, {
            startX: 0,
            startY: 0,
            click:true
          })
          this.scrollKey=true;
           this.$refs.loading.stopLoad();
          })
        }
      }
    },
    methods: {
      toggle(flag) {
        this.open = !this.open
        this.docked = !flag
      },
      search(){
      this.$router.push({ name: 'search'})
      },
      tellAbout(){
      },
      handleTabChange(val) {
        this.activeTab = val;
        this.moviekey = !this.moviekey;
        this.tabName=this.activeTab=="tab1"?"in_theaters":"coming_soon";
      },
      fetchDate(){
        // 这里确保只调用一次
        if(!(this.$store.state.movie.movies[this.tabName].subjects&&
             this.$store.state.movie.movies[this.tabName].subjects.length>0)){
            this.$refs.loading.startLoad();
             this.$store.dispatch(type.FETCH_MOVIES, { type: this.tabName })          
        }
      },
      getmoreMovie() {
        if (this.future.count) return;
      }
    },
    components: {
      'v-tab': tab,
      'star':star,
      'v-load':load
    }


  }
</script>

<style lang='scss'>

  .mu-tabs{
    background-color:#474a4f!important;
  }
  .book{
    min-height:100%;

    &-header{
      background:#eee;
      display:flex;
      justify-content:space-between;
      >p,.left,.right{
        height:48px;
        line-height:48px !important;
        position:relative
      }
    }
    &-content{
      position:absolute;
      overflow:hidden;
      width:100%;
      left:0;
      bottom:0;
      top:96px;
      padding-bottom:2rem;
      ul{
              display:flex;
              flex-wrap:wrap;
        .list-show{
            flex:0 0 30%;
            width:30%;
            margin-right:5%;
            margin-bottom:5%;
            &:nth-of-type(3n){
              margin-right:0;
            }
            img{
              width:100%;
              height:3rem;
            }
            h1{
              font-size:.16rem;
              text-align:center;
              overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
margin-bottom:0;
            }
            p{
              font-size:.12rem;
              text-align:center;
              overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
            }
        }
      }
    }
  }
</style>
