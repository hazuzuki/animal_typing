<template>
    <div class="content">
        <h1>閉園</h1>
        <p class="sumcount">タイピング数:{{ sumcount }}匹</p>
        <p class="sumcount">ミスタイプ数:{{ misscount }}回</p>
        <img src="@/assets/fukurou_yoru.png" alt="">
        <div><a @click="reload" class="btn-square">再チャレンジ</a></div>
        <p class="find_animal">見つけた動物</p>
        <ul v-if="Typed_animal.length != 0" class="animal_list">
            <li class="animal" v-for="animal in Typed_animal" :key="animal" >
                <img class="animal-img" :src="require(`@/assets/${animal}.jpg`)"><br>
                {{ typing[animal].name }}
            </li>
        </ul>
        <ul v-else class="animal_list">
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
}

.animal_list {
    margin-top: 10px;
    list-style: none;
    margin-bottom: 100px;
}

.animal {
    margin-bottom: 5px;
}

.sumcount {
    margin-top: 10px;
}
</style>