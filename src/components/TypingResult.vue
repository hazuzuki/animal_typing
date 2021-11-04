<template>
    <div class="content">
        <h1>閉園</h1>
        <p>タイピング数:{{ sumcount }}匹</p>
        <img src="@/assets/fukurou_yoru.png" alt="">
        <div><a @click="reload" class="btn-square">再チャレンジ</a></div>
    </div>
</template>

<script>
export default {
    props: ["sumcount"],
    methods: {
        reload() {
            this.$router.go(this.$router.currentRoute)
        }
    }
}
</script>

<style>
.btn-square {
  font-size: 20px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: green;/*ボタン色*/
  color: #FFF;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
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
</style>