<template>
   <div class='tap'>
 
	<mu-icon-button icon='menu' slot="left"  @click="toggle(true)"/>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
        <div class="tap-main">
        <h2>简明的现代魔法</h2>
        <p>vue2+vuex+vue-router</p> 
      </div>
      <mu-list class="tap-list" @itemClick="docked ? '' : toggle()">
        <mu-list-item title="电影" @click="gotoMovie()">
        <mu-icon slot="left" value="movie"/>
        </mu-list-item>
        <mu-list-item title="图书" @click="gotoBook()">
        <mu-icon slot="left" value="book"/>
        </mu-list-item>
        <mu-list-item title="音乐" @click="gotoMusic()">
        <mu-icon slot="left" value="music_note"/>
        </mu-list-item>
        <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
        </mu-list-item>
         <mu-divider />
         <mu-list-item title="关于我" @click="gotoAbout()">
            <mu-icon slot="left" value="mail"/>
         </mu-list-item>
      </mu-list>
   
    </mu-drawer>
      </div>
</template>
<script>
export default {
 data () {
    return {
      open: false,
      docked: true
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    gotoMovie(){
         this.$router.push({ name: 'movie'})
    },
    gotoMusic(){
       this.$router.push({ name: 'music'})
    },
    gotoBook(){
    this.$router.push({ name: 'book'})
    },
    gotoAbout(){
      this.$router.push({name:'about'})
    }

  }


}
</script>

<style lang='scss'>
    .tap{
        position:relative;

        &-main{
            width:100%;
            padding:.7rem 0rem;
            text-align:center;
            color:white;
            background:black;
        }
    }
</style>