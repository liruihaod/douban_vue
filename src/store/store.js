import Vuex from 'vuex';
import vue from 'vue';
import movie from './movie/module';

vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        movie
    }
})