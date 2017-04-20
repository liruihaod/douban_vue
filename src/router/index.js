import Vue from 'vue'
import Router from 'vue-router'
import book from '@/page/book/book'
import movie from '@/page/movie/movie'
import music from '@/page/music/music'
import movieContent from '@/page/movie/content'
import search from '@/page/search/search'
import about from '@/page/Hello'

Vue.use(Router)


const Book = moive => require(['page/book/book'], book);
const Music = moive => require(['page/music/music'], music);
const Movie = moive => require(['page/movie/movie'], movie);
const Content = moive => require(['page/movie/content'], content);
const Search = moive => require(['page/search/search'], search);
const About = about => require(['page/Hello'], about);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'movie',
            component: movie
        },
        {
            path: '/book',
            name: 'book',
            component: book
        },
        {
            path: '/music',
            name: 'music',
            component: music
        },
        {
            path: '/movie',
            name: 'movie',
            component: movie
        },
        {
            path: '/movie/content/:id',
            name: 'movieContent',
            component: movieContent
        },
        {
            path: '/movie/search',
            name: 'search',
            component: search
        },
        {
            path: '/Hello',
            name: 'about',
            component: about
        }
    ]
})