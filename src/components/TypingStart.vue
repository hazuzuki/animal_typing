<template>
  <div class="content">
    <p class="game-status">ただいまのカウント:{{ count }}</p>
    <p class="game-status">残り時間:{{PassSec}}</p>
    <img class="animal-img" :src="require(`@/assets/${num}.jpg`)">
    <p v-if="$mq === 'pc'">{{ kata }}</p>
    <p v-else class="type-word">
    <span class="done">{{ pressedKana }}</span>{{ hiragana2 }}
    </p>
    <p v-if="$mq === 'pc'" class="type-word">
      <span class="done">{{ pressed }}</span>{{ roman2 }}
    </p>
    <input
      ref="input"
      v-if="$mq === 'sp'"
      v-model="kanaInput"
      @input="JudgeKana"
      type="text"
    />
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
      misscount: 0,
      roman2: this.roman,
      pressed: "",
      typed_animal: [],
      kanaInput: "",
      hiragana2: "",
      pressedKana: "",
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
          this.typed_animal.push(this.num);
          this.SendSumCount();
        }
      } else {
        this.buzzeraudio.play();
        this.misscount += 1;
      }
      return true
    },
    JudgeKana: function(event) {
      const input = event.target.value;
      this.kanaInput = "";
      event.target.value = "";

      for (const key of input) {
        if (this.hiragana2[0] !== key) {
          this.buzzeraudio.play();
          this.misscount += 1;
          break;
        }

        this.pressedKana += key;
        this.hiragana2 = this.hiragana2.slice(1);

        if (this.hiragana2.length === 0) {
          this.$emit('RandomWord');
          this.pressedKana = "";
          this.count += 1;
          this.audio.play();
          this.typed_animal.push(this.num);
          this.SendSumCount();
          break;
        }
      }
    },
  SendSumCount: function() {
     this.$emit('SendSumCount', this.count);
     this.$emit('TypedAnimal', this.typed_animal);
     this.$emit('MissCount', this.misscount);
  },
  toHiragana: function(text) {
    return text.replace(/[\u30A1-\u30F6]/g, c =>
        String.fromCharCode(c.charCodeAt(0) - 0x60)
    );
  },
  },
  watch: {
      roman: {
          immediate: true,
          handler() {
              this.roman2 = this.roman;
              this.hiragana2 = this.toHiragana(this.kata);
              this.pressedKana = "";
          }
      }
  },

  mounted() {
      if (this.$mq === "sp") {
          this.$nextTick(() => {
              this.$refs.input.focus();
          });
      }
  },

  updated() {
      if (this.$mq === "sp") {
          this.$nextTick(() => {
              this.$refs.input.focus();
          });
      }
},

name: 'App',
}
</script>

<style>
  button {
    border: 3px solid;
  }

  .type-word .done {
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

@media screen and (max-width: 600px) {
    p {
        font-size: 24px;
    }

    .type-word {
        font-size: 24px;
    }

    .game-status {
      font-size: 18px;
    }

  input {
      opacity: 0;
      position: absolute;
  }
}

</style>
