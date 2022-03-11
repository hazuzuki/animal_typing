<template>
  <div>
    <header class="header_pc" v-if="$mq === 'pc'">
        <div v-if="$mq === 'pc'">
            <div class="title_pc">動物タイピングゲーム</div>
        </div>
    </header>
    <header class="header_sp" v-if="$mq === 'sp'">
        <div v-if="$mq === 'sp'">
            <div class="title_sp">動物タイピングゲーム</div>         
        </div>        
    </header>  
    <typingtop v-show="currentComponent === 'typingtop'" @gameStart="gameStart"></typingtop>
    <typingstart v-show="currentComponent === 'typingstart'" :kata="kata" :roman="roman" :PassSec="PassSec" :num="num" @RandomWord="RandomWord" @SendSumCount="SendSumCount2" @TypedAnimal="TypedAnimal" @MissCount="MissCount" ref="foo"></typingstart>
    <typingresult v-show="currentComponent === 'typingresult'" :sumcount="sumcount" :typing="typing" :Typed_animal="Typed_animal" :misscount="misscount"></typingresult>
  </div>
</template>

<script>
import typingstart from './components/TypingStart.vue'
import typingresult from './components/TypingResult.vue'
import typingtop from './components/TypingTop.vue'
import  { kanaToRoman } from '/Users/hazuki/vue_projects/sushida/src/kanaToRoman.js'

export default { 
    data() {
        return {
            currentComponent: "typingtop",
            key: '',
            PassSec: 60, //ゲームの制限時間
            typing : [{'name': 'イヌ', 'img': '@/assets/0.jpg'}, {'name': 'ウシ', 'img': '@/assets/1.jpg'}, {'name': 'ウマ', 'img': '@/assets/2.jpg'}, {'name': 'カバ', 'img': '@/assets/3.jpg'}, {'name': 'クマ', 'img': '@/assets/4.jpg'}, {'name': 'サイ', 'img': '@/assets/5.jpg'}, {'name': 'サル', 'img': '@/assets/6.jpg'}, {'name': 'ゾウ', 'img': '@/assets/7.jpg'}, {'name': 'トド', 'img': '@/assets/8.jpg'}, {'name': 'トラ', 'img': '@/assets/9.jpg'}, {'name': 'ヌー', 'img': '@/assets/10.jpg'}, {'name': 'ネコ', 'img': '@/assets/11.jpg'}, {'name': 'バク', 'img': '@/assets/12.jpg'}, {'name': 'アフリカタテガミヤマアラシ', 'img': '@/assets/13.jpg'}, {'name': 'ヒヒ', 'img': '@/assets/14.jpg'}, {'name': 'ブタ', 'img': '@/assets/15.jpg'}, {'name': 'ヤギ', 'img': '@/assets/16.jpg'}, {'name': 'ラマ', 'img': '@/assets/17.jpg'}, {'name': 'リス', 'img': '@/assets/18.jpg'}, {'name': 'ロバ', 'img': '@/assets/19.jpg'}, {'name': 'アシカ', 'img': '@/assets/20.jpg'}, {'name': 'イタチ', 'img': '@/assets/21.jpg'}, {'name': 'イルカ', 'img': '@/assets/22.jpg'}, {'name': 'ウサギ', 'img': '@/assets/23.jpg'}, {'name': 'オカピ', 'img': '@/assets/24.jpg'}, {'name': 'オルカ', 'img': '@/assets/25.jpg'}, {'name': 'ガゼル', 'img': '@/assets/26.jpg'}, {'name': 'キツネ', 'img': '@/assets/27.jpg'}, {'name': 'クジラ', 'img': '@/assets/28.jpg'}, {'name': 'ゴリラ', 'img': '@/assets/29.jpg'}, {'name': 'シャチ', 'img': '@/assets/30.jpg'}, {'name': 'ジャンガリアンハムスター', 'img': '@/assets/31.jpg'}, {'name': 'タヌキ', 'img': '@/assets/32.jpg'}, {'name': 'ネズミ', 'img': '@/assets/33.jpg'}, {'name': 'ノヤギ', 'img': '@/assets/34.jpg'}, {'name': 'ボルネオオランウータン', 'img': '@/assets/35.jpg'}, {'name': 'パンダ', 'img': '@/assets/36.jpg'}, {'name': 'ヒグマ', 'img': '@/assets/37.jpg'}, {'name': 'ヒツジ', 'img': '@/assets/38.jpg'}, {'name': 'ヒョウ', 'img': '@/assets/39.jpg'}, {'name': 'ボノボ', 'img': '@/assets/40.jpg'}, {'name': 'マカク', 'img': '@/assets/41.jpg'}, {'name': 'ムース', 'img': '@/assets/42.jpg'}, {'name': 'モグラ', 'img': '@/assets/43.jpg'}, {'name': 'ヤマネ', 'img': '@/assets/44.jpg'}, {'name': 'ラクダ', 'img': '@/assets/45.jpg'}, {'name': 'ラッコ', 'img': '@/assets/46.jpg'}, {'name': 'ラッコ', 'img': '@/assets/47.jpg'}, {'name': 'オグロプレーリードッグ', 'img': '@/assets/48.jpg'}, {'name': 'アザラシ', 'img': '@/assets/49.jpg'}, {'name': 'アリクイ', 'img': '@/assets/50.jpg'}, {'name': 'アルパカ', 'img': '@/assets/51.jpg'}, {'name': 'フィリピンメガネザル', 'img': '@/assets/52.jpg'}, {'name': 'ピグミーマーモセット', 'img': '@/assets/53.jpg'}, {'name': 'ゴールデンハムスター', 'img': '@/assets/54.jpg'}, {'name': 'イノシシ', 'img': '@/assets/55.jpg'}, {'name': 'カリフォルニアアシカ', 'img': '@/assets/56.jpg'},  {'name': 'エゾリス', 'img': '@/assets/57.jpg'}, {'name': 'オオカミ', 'img': '@/assets/58.jpg'}, {'name': 'カピバラ', 'img': '@/assets/59.jpg'}, {'name': 'カラカル', 'img': '@/assets/60.jpg'}, {'name': 'カワウソ', 'img': '@/assets/61.jpg'}, {'name': 'キタリス', 'img': '@/assets/62.jpg'}, {'name': 'ゼニガタアザラシ', 'img': '@/assets/63.jpg'}, {'name': 'プレーリードッグ', 'img': '@/assets/64.jpg'}, {'name': 'コウモリ', 'img': '@/assets/65.jpg'}, {'name': 'タスマニアデビル', 'img': '@/assets/66.jpg'}, {'name': 'コヨーテ', 'img': '@/assets/67.jpg'}, {'name': 'サーバル', 'img': '@/assets/68.jpg'}, {'name': 'シマウマ', 'img': '@/assets/69.jpg'}, {'name': 'シマリス', 'img': '@/assets/70.jpg'}, {'name': 'シロクマ', 'img': '@/assets/71.jpg'}, {'name': 'シロサイ', 'img': '@/assets/72.jpg'}, {'name': 'シロナガスクジラ', 'img': '@/assets/73.jpg'}, {'name': 'ジャガー', 'img': '@/assets/74.jpg'}, {'name': 'シロテテナガザル', 'img': '@/assets/75.jpg'}, {'name': 'スカンク', 'img': '@/assets/76.jpg'}, {'name': 'セイウチ', 'img': '@/assets/77.jpg'}, {'name': 'チンチラ', 'img': '@/assets/78.jpg'}, {'name': 'チーター', 'img': '@/assets/79.jpg'}, {'name': 'ワオキツネザル', 'img': '@/assets/80.jpg'}, {'name': 'トナカイ', 'img': '@/assets/81.jpg'}, {'name': 'レッサーパンダ', 'img': '@/assets/82.jpg'}, {'name': 'ハイエナ', 'img': '@/assets/83.jpg'}, {'name': 'ホッキョクグマ', 'img': '@/assets/83.jpg'}, {'name': 'バイソン', 'img': '@/assets/85.jpg'}, {'name': 'ビーバー', 'img': '@/assets/86.jpg'}, {'name': 'ピューマ', 'img': '@/assets/87.jpg'}, {'name': 'フサオマキザル', 'img': '@/assets/88.jpg'}, {'name': 'ゴンドウクジラ', 'img': '@/assets/89.jpg'}, {'name': 'クロキツネザル', 'img': '@/assets/90.jpg'}, {'name': 'オランウータン', 'img': '@/assets/91.jpg'}, {'name': 'モモンガ', 'img': '@/assets/92.jpg'}, {'name': 'ヤマネコ', 'img': '@/assets/93.jpg'}, {'name': 'ライオン', 'img': '@/assets/94.jpg'}, {'name': 'リカオン', 'img': '@/assets/95.jpg'}, {'name': 'リスザル', 'img': '@/assets/96.jpg'}, {'name': 'レミング', 'img': '@/assets/97.jpg'}, {'name': 'ワラビー', 'img': '@/assets/98.jpg'}, {'name': 'オオカンガルー', 'img': '@/assets/99.jpg'}, {'name': 'アカギツネ', 'img': '@/assets/100.jpg'}, {'name': 'ウッドチャック', 'img': '@/assets/101.jpg'}, {'name': 'アジアゾウ', 'img': '@/assets/102.jpg'}, {'name': 'アナウサギ', 'img': '@/assets/103.jpg'}, {'name': 'アライグマ', 'img': '@/assets/104.jpg'}, {'name': 'アルマジロ', 'img': '@/assets/105.jpg'}, {'name': 'マーモセット', 'img': '@/assets/106.jpg'}, {'name': 'ビッグホーン', 'img': '@/assets/107.jpg'}, {'name': 'ビスカッチャ', 'img': '@/assets/108.jpg'}, {'name': 'オセロット', 'img': '@/assets/109.jpg'}, {'name': 'オットセイ', 'img': '@/assets/110.jpg'}, {'name': 'トガリネズミ', 'img': '@/assets/111.jpg'}, {'name': 'オポッサム', 'img': '@/assets/112.jpg'}, {'name': 'オマキザル', 'img': '@/assets/113.jpg'}, {'name': 'カモノハシ', 'img': '@/assets/114.jpg'}, {'name': 'カンガルー', 'img': '@/assets/115.jpg'}, {'name': 'キタキツネ', 'img': '@/assets/116.jpg'}, {'name': 'キツネザル', 'img': '@/assets/117.jpg'}, {'name': 'ツキノワグマ', 'img': '@/assets/118.jpg'}, {'name': 'クマネズミ', 'img': '@/assets/119.jpg'}, {'name': 'チンパンジー', 'img': '@/assets/120.jpg'}, {'name': 'ザトウクジラ', 'img': '@/assets/121.jpg'}, {'name': 'シロイルカ', 'img': '@/assets/122.jpg'}, {'name': 'ジャッカル', 'img': '@/assets/123.jpg'}, {'name': 'イボイノシシ', 'img': '@/assets/124.jpg'}, {'name': 'テナガザル', 'img': '@/assets/125.jpg'}, {'name': 'テングザル', 'img': '@/assets/126.jpg'}, {'name': 'ドブネズミ', 'img': '@/assets/127.jpg'}, {'name': 'ナキウサギ', 'img': '@/assets/128.jpg'}, {'name': 'ナマケモノ', 'img': '@/assets/129.jpg'}, {'name': 'アフリカゾウ', 'img': '@/assets/130.jpg'}, {'name': 'ニホンザル', 'img': '@/assets/131.jpg'}, {'name': 'ニホンジカ', 'img': '@/assets/132.jpg'}, {'name': 'ユキヒョウ', 'img': '@/assets/133.jpg'}, {'name': 'ヌートリア', 'img': '@/assets/134.jpg'}, {'name': 'ヤマアラシ', 'img': '@/assets/135.jpg'}, {'name': 'ハムスター', 'img': '@/assets/136.jpg'}, {'name': 'ハリネズミ', 'img': '@/assets/137.jpg'}, {'name': 'ハリモグラ', 'img': '@/assets/138.jpg'}, {'name': 'ハリモグラ', 'img': '@/assets/138.jpg'}, {'name': 'フェネック', 'img': '@/assets/140.jpg'}, {'name': 'フクロネコ', 'img': '@/assets/141.jpg'}, {'name': 'マナティー', 'img': '@/assets/142.jpg'}, {'name': 'マレーバク', 'img': '@/assets/143.jpg'}, {'name': 'マングース', 'img': '@/assets/144.jpg'}, {'name': 'マントヒヒ', 'img': '@/assets/145.jpg'}, {'name': 'マンドリル', 'img': '@/assets/146.jpg'}, {'name': 'マーモット', 'img': '@/assets/147.jpg'}, {'name': 'メガネザル', 'img': '@/assets/148.jpg'}, {'name': 'モルモット', 'img': '@/assets/149.jpg'}, ]
            ,kata: "",
            roman: "",
            img: "",
            num: 1,
            sumcount: 0,
            misscount: 0,
            Typed_animal: "",
            randoms : [],
            }
    },
    mounted() {
        document.addEventListener('keydown', this.gameStart);
    },
    methods: {
        gameStart() {
        if(event.key === "Enter" && this.currentComponent === "typingtop") {  
            this.currentComponent = "typingstart";
            this.RandomWord();
            var tmp = this;
            const timerID = setInterval(function(){
                tmp.PassSec -= 1;
                if(tmp.PassSec === 0) {
                    tmp.currentComponent = "typingresult";
                    clearInterval(timerID); 
                }
            },1000); 
        } else {
                this.$refs.foo.Judge(event.key);
            }
        },
       RandomWord() {
            this.random_num = Math.floor(Math.random() * this.typing.length);
            if(!this.randoms.includes(this.random_num)){
                this.kata = this.typing[this.random_num].name;
                this.roman = kanaToRoman(this.kata,"hepburn",{bmp : false,});
                this.img = this.typing[this.random_num].img;
                this.num = this.random_num;
                this.randoms.push(this.random_num);
            } else {
                this.RandomWord();
            }
        },
        SendSumCount2(count) {
            this.sumcount = count;
        },
        TypedAnimal(Typed_Animal) {
            this.Typed_animal = Typed_Animal;
        },
        MissCount(misscount) {
            this.misscount = misscount;
        }
    },
    components: {
        typingstart,
        typingresult,
        typingtop,
    },
}

</script>

<style>
.router-link-exact-active {
    background-color: #9fc7e2 !important;
}

*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

template{margin:0px;}
#app {
    font-family: 'Kosugi Maru', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

body {
    background-color: #f0d47f;
}

.header_pc {
    height: 60px;
    background-color: #007f00;
    align-items: center;
    padding: 15px;
}

.header_sp {
    height: 40px;
    background-color: #007f00;
    align-items: center;
    padding: 10px;    
}

.title_pc {
    font-size: 30px;
    color: white;
    height: 40px;
    text-align: left;
}

.title_sp {
    font-size: 20px;
    color: white;
    height: 20px;
    text-align: left;
}


</style>