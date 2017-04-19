<template>
    <div class="content">
        <div class="content-nav">
      <mu-icon @click="roterReturn()" class="arrow_back icon"  value="arrow_back"></mu-icon>
      <p>{{movie.title}}介绍</p>
        </div>
        <div class="content-header">
            <img class="content-header-img" :src="movie.images.large" alt="">
            <div class="content-header-ct">
                <h1 class="title">{{movie.title}}</h1>
                <div class="content-header-star">
                    <v-star :size="18" :score="movie.rating.average"></v-star>
                    <div class="star-num">{{movie.rating.average}}分</div>
                </div>
                <span>{{movie.ratings_count}}人评价</span>
                <h2>上映时间{{movie.year}}年</h2>
                <p class="site">上映地区：{{movie.countries[0]}}</p>
                <ul class="content-list">
                    <p>剧情类别</p>
                    <li v-for="item in movie.genres">{{item}}</li>
                </ul>
            </div>
        </div>
        <v-severed></v-severed>
        <div class="content-info">
            <h1>影片介绍</h1>
            <p>{{movie.summary}}</p>
        </div>
        <v-severed></v-severed>
        <div class="content-actor" ref="zone">
            <div ref="picList">
                <a :href="item.alt" v-for="item in movie.casts">
                    <img :src="item.avatars.small" alt="">
                    <p>{{item.name}}</p>
                </a>
            </div>
        </div>
        <div class="load" ref="load">
            <v-load ref="loading"></v-load>
        </div>
    </div>
</template>

<script>
    import router from './../../router';
    import BScroll from 'better-scroll'
    import { fetchMovieSubject } from 'store/movie/api'
    import star from 'page/star.vue';
    import severed from 'page/severed.vue';
    import load from 'page/load.vue';
    export default {
        data() {
            return {
                movie: Object
            };
        },
        mounted() {
            this.setPage(this.$route.params.id)
        },
        methods: {
            setPage(id) {
                fetchMovieSubject(id).then((res) => {
                    this.movie = res;
                }).then(()=>{
                    this.$nextTick(()=>{
                       this._initPicScroll();
                    })
                })
            },
            roterReturn(){
                this.$router.go(-1);
            },
            _initPicScroll(){
              if(this.picScroll){
                return;
              }
              // 定义一个图片的默认值
              const PIC_WIDTH =120,
                    MARGIN=6;
              // 定义图片个数
              let PICLEN=this.movie.casts.length;
              if(this.$refs.picList){
  this.$refs.picList.style.width=PIC_WIDTH*PICLEN+MARGIN*(PICLEN-1)+'px';
              this.PicScroll=new BScroll(this.$refs.zone,{
                scrollX:true,
                click:true
              })
              this.$refs.loading. stopLoad();
              }
            
            }
        },
        components: {
            'v-star': star,
            'v-severed': severed,
            'v-load':load
        }
    }
</script>

<style lang="scss">
    .content{
        &-nav{
            display:flex;
            padding:.1rem;
            position:fixed;
            top:0;
            left:0;
            width:100%;
            line-height:.65rem;
            background:white;
            justify-content: space-between;
            .icon{
                margin-top:.1rem;
            }
            p{
                flex:1;
                text-align:center;
                font-size:.3rem;
                font-weight:600;
            }
        }
        &-header{
            display:flex;
            padding: 1rem .2rem .2rem .2rem;
           &-star{
                display:flex;
                justify-content: space-around;
               margin-bottom:.1rem;
           }
            &-img{
                height:4.29rem;
                flex:0 0 3rem;
                width:3rem;
            }
            &-ct{
                text-align:center;
                margin-left:.5rem;
                font-weight: 600;
                .title{
                   font-size:.3rem;
                   font-weight: 600;
                   text-overflow:ellipsis;
                    white-space: nowrap;
                    margin-bottom:0;
                }
                h2{
                    font-size:.3rem;
                }
                .site{
                    margin-top:.2rem;
                    margin-bottom:.2rem;
                    font-size:.25rem;
                }

            }
        }
        &-info{
            padding:.3rem;
            h1{
                margin-top:0;
                margin-bottom:.1rem;

            }
            p{
               word-wrap:break-word;
            }
        }
        &-actor{
              padding:.3rem;
          overflow:hidden;
          a{
            display:block;
            margin:0 .2rem;
            float:left;
            text-align:center;
            &:first-child{
                margin-left:0;
            }
            img{
              display:block;
            }
          }

        }
    }
</style>
