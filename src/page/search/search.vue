<template>
    <div class="search">
        <!-- 搜索框    -->
        <mu-paper class="search-header" :zDepth="1">
            <mu-appbar   title="Title" class='search-bar'>
                <mu-icon-button class='bar-icon' icon='arrow_back' slot="left" @click="storeReturn()" />
                <input type="text" placeholder="请输入要查找的电影"  :value="text" v-model="query" @keyup.enter="search()">
                <mu-icon-button class='bar-icon' @click="search()" icon='search' slot="right" />
            </mu-appbar>
        </mu-paper>

        <div class="search-result" ref="result" >
            <div >
                <router-link :to="{name: 'movieContent', params:{id:item.id}}" v-for="item in movie">
                    <mu-paper class="result-list" :zDepth="1">
                        <img :src="item.images.large" alt="" class="result-list-img">
                        <div class="result-list-ct">
                            <div class="title">
                                <h2>{{item.title}}</h2>
                                <div class="start">
                                    <em>评分</em>
                                    <v-star :size="18" :score="item.rating.average"></v-star>
                                </div>
                            </div>
                            <p>类型:
                                <span v-for="mold in item.genres">{{mold}}</span>
                            </p>
                            <p>导演:
                                <span v-for="dire in item.directors">{{dire.name}}</span>
                            </p>
                            <p>主演:
                                <span v-for="casts in item.casts">{{casts.name}}</span>
                            </p>
                        </div>
                    </mu-paper>
                </router-link>
            </div>
        </div>
        <v-load class="loading" ref="loading"></v-load>
    </div>

</template>

<script>
    import load from 'page/load.vue';
    import BSscroll from 'better-scroll';
    import axios from 'axios';
    import star from 'page/star.vue';
    import * as type from 'store/movie/type';
    import { mapState } from 'vuex';
    
    export default {
        data() {
            return {
                start: 0,
                total: 0,
                count: 20,
                query:this.$store.state.movie.movieQuery.query,
                text:''
            };
        },
        watch: {
            // 监控路由的变化
            $route: 'result',
            movie:'movieStar'
        },
        computed:
        mapState({
            movie(state){
                return state.movie.movieQuery.subjects
            },
            text(state){
                return state.movie.movieQuery.query
            }
        })
        ,

        mounted() {
            this.result();
            this.movieStar();
                        this.text=this.$store.state.movie.movieQuery.query;

        },
        methods: {
            search() {
                console.log("触发了");
                // $el 指向绑定的html元素
                if (this.query != "") {
                    this.$router.push({ path: 'search', query: { q: this.query } })
                }
            },
            storeReturn(){
                this.$router.go(-1);
            },
            result() {
                if (!this.$route.query.q) return;
                if (this.$route.query.q !== this.$store.state.movie.movieQuery.query) {
                    this.$refs.loading.startLoad();
                    this.$store.dispatch(type.FETCH_MOVIES_QUERY, { q: this.$route.query.q })
                }
            },
            movieStar(){
                this.$nextTick(() => {
                            if (!this.scroll) {
                                this.scroll = new BSscroll(this.$refs.result, {
                                    startX: 0,
                                    click:true
                                })
                                 this.$refs.loading.stopLoad();
                            } else {
                                this.scroll.refresh();
                                 this.$refs.loading.stopLoad();
                            }
                        })
            },
            changeQuery(){
                this.query=this.text;
            }
        },
        components: {
            'v-load': load,
            'v-star': star
        }
    }
</script>

<style lang="scss">
    .mu-appbar{
        background:#474a4f !important;
    }
    .mu-text-field-input{
        color:white !important;
    }
    .mu-text-field-hint{
        color:white !important;
        left:50%;
        transform:translate(-50%,0);
    }
    .loading{
        opacity:0;
    }
    .search{
        &-header{
            input{
                border:none;
                width:100%;
            }
        }
        &-result{
            position:absolute;
            overflow:hidden;
            width:100%;
            left:0;
            bottom:0;
            top:60px;
           >div{
               .result-list{
                   display:flex;
                   margin-bottom:.2rem;
                   &-img{
                       width:1.28rem;
                       height:1.8rem;
                       margin-right:.2rem;
                   }
                   &-ct{
                    flex:1;
                    .title{
                        display:flex;
                        justify-content: space-between;
                        h2{
                            font-size:.3rem;
                            color:#222;
                            width:2.5rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            -o-text-overflow: ellipsis;
                            word-break:break-all;
                            word-wrap: normal;        
                        }
                        .start{
                            display:flex;
                            em{
                                font-style:normal;
                                display:inline-block;
                            }
                            margin-top:.05rem;
                        }
                    }
                    >p{
                        margin-bottom:.1rem;
                        &:last-child{
                            margin-bottom:0;
                        }
                    }
                   }
               }
           } 
        }
    }

</style>