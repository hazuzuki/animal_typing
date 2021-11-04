<template>
  <div class="content">
    <p>ただいまのカウント:{{ count }}</p>
    <p>残り時間:{{PassSec}}</p>
    <img class="animal-img" :src="require(`@/assets/${num}.jpg`)">
    <p>{{ kata }}</p>
    <p class="type-word"><span class="done">{{ pressed }}</span>{{ roman2 }}</p>
  </div>
</template>

<script>

export default {
    devServer: {
    Host: 'localhost'
    },
    props: ["kata", "roman", "PassSec", "num"],
  data: function() {
    return{
      audio: new Audio(require('@/assets/Quiz-Correct_Answer02-1.mp3')),
      buzzeraudio: new Audio(require('@/assets/Quiz-Wrong_Buzzer02-1.mp3')),
      count: 0,
      roman2: this.roman,
      pressed: "",
      }
  },
  methods: {
    Judge: function(key) {
      if(this.roman2.split('')[0] === key) {
        this.roman2 = this.roman2.slice(1);
        this.pressed += key;
        if(this.roman2.length == 0) {
          this.$emit('RandomWord');
          this.pressed = "";
          this.roman2 = this.roman;
          this.count += 1;
          this.audio.play();
          this.SendSumCount();
        }
      } else {
        this.buzzeraudio.play();
      }
      return true
  },
  SendSumCount: function() {
     this.$emit('SendSumCount', this.count);
  },
  },
watch: {
      roman: function(){
        this.roman2 = this.roman;
      }
},
  name: 'App',
}
</script>

<style>
  button {
    border: 3px solid;
  }

  .done {
    color: gray;
  }

  .type-word {
    color: black;
  }

  .content {
    padding: 30px;
    text-align: center;
  }

  p {
    font-size: 30px;
  }

.animal-img {
  width: 350px;
  height: 350px;
  object-fit: cover; 
  padding: 10px;
}

</style>
