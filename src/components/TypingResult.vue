<template>
    <div class="content">
        <h1>閉園</h1>
        <p class="sumcount">見つけた動物の数:{{ sumcount }}匹</p>
        <p class="sumcount">ミスタイプ数:{{ misscount }}回</p>
        <img src="@/assets/fukurou_yoru.png" alt="">
        <div><a @click="reload" class="btn-square">再チャレンジ</a></div>
        <div class="share">
            <p class="find_animal">見つけた動物を報告する</p>
            <div class="icon-list">
                <img @click="link_twitter" src="@/assets/twitter_icon.png" alt="twitterアイコン" width="80px" height="80px"> 
                <a href="https://social-plugins.line.me/lineit/share?url=https://hazuzuki.github.io/animal_typing/" target="_blank" rel="nofollow"><img src="@/assets/line_icon.png" alt="lineアイコン" width="80px" height="80px"></a>
            </div>
        </div>
        <p class="find_animal">見つけた動物</p>
        <div v-if="Typed_animal.length != 0" class="animal_list">
            <div class="animal" v-for="animal in Typed_animal" :key="animal" >
                <img class="animal-img" :src="require(`@/assets/${animal}.jpg`)"><br>
                {{ typing[animal].name }}
            </div>
        </div>
        <ul v-else class="animal_list_none">
            <li>見つけた動物はいません。</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["sumcount", "Typed_animal", "misscount", "typing"],
    methods: {
        reload() {
            this.$router.go(this.$router.currentRoute)
        },
        link_twitter() {
            const dataUrl = "https://hazuzuki.github.io/animal_typing/"
            window.open('https://twitter.com/share?text=' + this.sumcount + "匹の動物を見つけたよ。みんなも遊んでみてね。" + '&url=' + dataUrl );
        }
    }
}
</script>

<style>
.btn-square {
  font-size: 30px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: green;/*ボタン色*/
  color: #FFF;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
  cursor: pointer;
}
.btn-square:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px);/*下に動く*/
  border-bottom: none;/*線を消す*/
}


.content {
    text-align: center;
}

.find_animal {
    margin-top: 30px;
    margin-bottom: 30px;
}

.animal_list_none {
    margin-top: 10px;
    list-style: none;
    margin-bottom: 100px;
}

/* .animal {
    margin-bottom: 5px;
} */

.sumcount {
    margin-top: 10px;
}

.share > .find_animal {
    margin-bottom: 20px;
}

.icon-list {
    margin-bottom: 100px;
}
.icon-list > .icon {
    width: auto;
    padding:0;
    margin:0;
    background:none;
    border:0;
    font-size:0;
    line-height:0;
    overflow:visible;
    cursor:pointer;    
}

.animal_list {
    margin: 0 auto;
    padding: 0px 100px 100px 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
}

.animal_list > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        position: absolute;
        top: 0;
        left: 0;
        margin-bottom: 20px;
}

.icon-list > img:hover  {
    cursor: pointer;
}

</style>