<template>
  <div class="content">
    <p class="game-status">ただいまのカウント {{ count }}</p>
    <p class="game-status">残り時間 {{PassSec}}</p>
    <img class="animal-img" :src="require(`@/assets/${num}.jpg`)">
    <p v-if="$mq === 'pc'">{{ kata }}</p>
    <p v-else class="type-word">
    <span class="done">{{ pressedKana }}</span>{{ hiragana2 }}
    </p>
    <p v-if="$mq === 'pc'" class="type-word">
      <span class="done">{{ pressed }}</span>{{ roman2 }}
    </p>
    <input
      :key="num + ':' + inputResetKey"
      ref="input"
      v-if="$mq === 'sp'"
      @input="handleMobileInput"
      @compositionend="handleMobileCompositionEnd"
      type="text"
    />
  </div>
</template>

<script>

const PENDING_KANA_BASES = {
  が: "か", ぎ: "き", ぐ: "く", げ: "け", ご: "こ",
  ざ: "さ", じ: "し", ず: "す", ぜ: "せ", ぞ: "そ",
  だ: "た", ぢ: "ち", づ: "つ", で: "て", ど: "と",
  ば: "は", び: "ひ", ぶ: "ふ", べ: "へ", ぼ: "ほ",
  ぱ: "は", ぴ: "ひ", ぷ: "ふ", ぺ: "へ", ぽ: "ほ",
  ゔ: "う",
  ぁ: "あ", ぃ: "い", ぅ: "う", ぇ: "え", ぉ: "お",
  っ: "つ", ゃ: "や", ゅ: "ゆ", ょ: "よ", ゎ: "わ",
  ゕ: "か", ゖ: "け",
};

const HAN_DAKUTEN_INTERMEDIATE_KANA = {
  ぱ: "ば", ぴ: "び", ぷ: "ぶ", ぺ: "べ", ぽ: "ぼ",
};

export default {
    devServer: {
    Host: 'localhost'
    },
    props: ["kata", "roman", "PassSec", "num", "active"],
  data: function() {
    return{
      audio: new Audio(require('@/assets/Quiz-Correct_Answer02-1.mp3')),
      buzzeraudio: new Audio(require('@/assets/Quiz-Wrong_Buzzer02-1.mp3')),
      count: 0,
      misscount: 0,
      roman2: this.roman,
      pressed: "",
      typed_animal: [],
      hiragana2: "",
      pressedKana: "",
      pendingKana: "",
      advancingToNextWord: false,
      inputResetKey: 0,
      lastAcceptedKana: "",
      lastAcceptedKanaAt: 0,
      lastCompositionInput: "",
      lastCompositionInputAt: 0,
      }
  },
  methods: {
    judgePcKey: function(key) {
      if (!this.active || this.advancingToNextWord) {
        return false;
      }

      if(this.roman2.split('')[0] === key) {
        this.roman2 = this.roman2.slice(1);
        this.pressed += key;
        if(this.roman2.length == 0) {
          this.completeWord();
        }
      } else {
        this.registerMistype();
      }
      return true
    },
    registerMistype: function() {
      this.buzzeraudio.play();
      this.misscount += 1;
    },
    completeWord: function() {
      this.advancingToNextWord = true;
      this.pressed = "";
      this.pressedKana = "";
      this.pendingKana = "";
      this.count += 1;
      this.audio.play();
      this.typed_animal.push(this.num);
      this.SendSumCount();
      this.$emit('RandomWord');
    },
    stopInput: function() {
      this.advancingToNextWord = true;
      this.pendingKana = "";
      if (this.$refs.input) {
        this.$refs.input.blur();
        this.$refs.input.value = "";
      }
    },
    focusInput: function() {
      if (this.$refs.input && this.active) {
        this.$refs.input.focus();
      }
    },
    resetKanaProgress: function() {
      this.pressedKana = "";
      this.hiragana2 = this.toHiragana(this.kata);
      this.advancingToNextWord = true;
      this.inputResetKey += 1;
      this.$nextTick(() => {
        const inputElement = this.$refs.input;
        if (inputElement) {
          inputElement.value = "";
          this.advancingToNextWord = false;
          if (this.active) {
            inputElement.focus();
          }
        }
      });
    },
    handleMobileInput: function(event) {
      if (!this.active || this.advancingToNextWord || event.target !== this.$refs.input) {
        event.target.value = "";
        return;
      }

      const expectedKana = this.hiragana2[0];
      const expectedBase = PENDING_KANA_BASES[expectedKana];

      const rawInput = this.toHiragana(event.target.value.normalize("NFKC").normalize("NFC"));
      const eventInput = this.toHiragana((event.data || "").normalize("NFKC").normalize("NFC"));
      let input = eventInput || rawInput;

      if (
        input &&
        input === this.lastCompositionInput &&
        event.timeStamp - this.lastCompositionInputAt < 250
      ) {
        this.lastCompositionInput = "";
        event.target.value = "";
        return;
      }

      this.lastCompositionInput = "";

      if (
        input &&
        input === this.lastAcceptedKana &&
        event.timeStamp - this.lastAcceptedKanaAt < 250
      ) {
        event.target.value = "";
        return;
      }

      const intermediateKana = HAN_DAKUTEN_INTERMEDIATE_KANA[expectedKana];

      const hasDakutenMark = event.data && Array.from(event.data).some((character) =>
        character === "゛" || character === "゜" || character === "\u3099" || character === "\u309a"
      );
      if (hasDakutenMark && rawInput) {
        input = rawInput;
      }

      if (input.startsWith(this.pressedKana) && input.length > this.pressedKana.length) {
        input = input.slice(this.pressedKana.length);
      }

      if (expectedBase) {
        const completedKanaIndex = input.indexOf(expectedKana);
        const rawCompletedKanaIndex = rawInput.indexOf(expectedKana);
        const isHandakutenKana = "ぱぴぷぺぽ".includes(expectedKana);
        const hasExpectedMark = event.data && Array.from(event.data).some((character) =>
          isHandakutenKana
            ? character === "゜" || character === "\u309a"
            : character === "゛" || character === "\u3099"
        );

        if (completedKanaIndex >= 0) {
          input = input.slice(completedKanaIndex);
          this.pendingKana = "";
        } else if (rawCompletedKanaIndex >= 0) {
          input = rawInput.slice(rawCompletedKanaIndex);
          this.pendingKana = "";
        } else if (hasExpectedMark && this.pendingKana === expectedBase) {
          input = expectedKana;
          this.pendingKana = "";
        } else if (
          intermediateKana &&
          (input.endsWith(intermediateKana) || rawInput.endsWith(intermediateKana))
        ) {
          this.pendingKana = expectedBase;
          return;
        } else if (
          input === expectedBase ||
          input.endsWith(expectedBase) ||
          rawInput.endsWith(expectedBase)
        ) {
          this.pendingKana = expectedBase;
          return;
        } else if (event.isComposing || event.target.composing) {
          return;
        } else if (this.pendingKana === expectedBase && !input) {
          return;
        } else if (this.pendingKana) {
          this.registerMistype();
          this.resetKanaProgress();
          return;
        }
      }

      let firstKey = Array.from(input)[0];
      if (firstKey !== this.hiragana2[0] && rawInput) {
        let rawCandidate = rawInput;
        if (rawCandidate.startsWith(this.pressedKana)) {
          rawCandidate = rawCandidate.slice(this.pressedKana.length);
        }
        const rawFirstKey = Array.from(rawCandidate)[0];
        if (
          rawFirstKey === this.hiragana2[0] ||
          rawFirstKey === PENDING_KANA_BASES[this.hiragana2[0]]
        ) {
          input = rawCandidate;
          firstKey = rawFirstKey;
        }
      }

      if (firstKey && intermediateKana === firstKey) {
        this.pendingKana = expectedBase;
        return;
      }
      if (firstKey && PENDING_KANA_BASES[this.hiragana2[0]] === firstKey) {
        this.pendingKana = firstKey;
        return;
      }

      event.target.value = "";
      this.pendingKana = "";

      for (const key of input) {
        if (this.hiragana2[0] !== key) {
          this.registerMistype();
          this.resetKanaProgress();
          return;
        }

        this.pressedKana += key;
        this.hiragana2 = this.hiragana2.slice(1);
        this.lastAcceptedKana = key;
        this.lastAcceptedKanaAt = event.timeStamp;

        if (this.hiragana2.length === 0) {
          this.completeWord();
          this.$refs.input.value = "";
          break;
        }
      }
    },
    handleMobileCompositionEnd: function(event) {
      const committedInput = this.toHiragana((event.data || "").normalize("NFKC").normalize("NFC"));
      if (!committedInput) {
        return;
      }

      // Input events are judged as they arrive, including during composition.
      // Do not judge the same text again when the IME later commits it.
      if (!this.pressedKana.endsWith(committedInput)) {
        this.handleMobileInput({
          target: event.target,
          data: committedInput,
          isComposing: false,
          timeStamp: event.timeStamp,
        });
      }
      this.lastCompositionInput = committedInput;
      this.lastCompositionInputAt = event.timeStamp;
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
                this.pendingKana = "";

                const inputElement = this.$refs.input;
                if (inputElement) {
                  inputElement.value = "";
                }
                this.$nextTick(() => {
                  this.advancingToNextWord = false;
                  const currentInput = this.$refs.input;
                  if (currentInput) {
                    currentInput.value = "";
                    if (this.active) {
                      currentInput.focus();
                    }
                  }
                });
          }
      }
  },

  mounted() {
      if (this.$mq === "sp") {
          this.$nextTick(() => {
              this.focusInput();
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
      font-size: 15px;
    }

  input {
      opacity: 0;
      position: absolute;
  }
}

</style>
