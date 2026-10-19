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
      ref="input"
      v-if="$mq === 'sp'"
      @input="handleMobileInput"
      @compositionstart="handleMobileCompositionStart"
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
      mobileWordId: 0,
      mobileCompositionWordId: null,
      mobileCompositionStartedAt: 0,
      mobileCompositionInputHandled: false,
      ignoreNextCompositionEnd: false,
      lastMobileInput: null,
      suppressNextMobileInput: null,
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
      this.buzzeraudio.currentTime = 0;
      this.buzzeraudio.play();
      this.misscount += 1;
      this.$emit('MissCount', this.misscount);
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
    handleMobileCompositionStart: function(event) {
      this.mobileCompositionWordId = this.mobileWordId;
      this.mobileCompositionStartedAt = event.timeStamp;
      this.mobileCompositionInputHandled = false;
    },
    handleMobileInput: function(event) {
      const inputElement = event.target;
      if (!this.active || this.advancingToNextWord || inputElement !== this.$refs.input) {
        inputElement.value = "";
        return;
      }

      const fromInputValue = !event.data;
      const text = this.normalizeMobileInput(event.data || inputElement.value);
      if (
        this.mobileCompositionWordId !== null &&
        this.mobileCompositionWordId !== this.mobileWordId
      ) {
        inputElement.value = "";
        return;
      }
      // Choosing an IME conversion candidate replaces the current composition;
      // it is not a new kana key for the typing game.
      if (
        event.inputType === "insertReplacementText" ||
        (text && !this.isKanaInput(text))
      ) {
        this.ignoreNextCompositionEnd = true;
        inputElement.value = "";
        return;
      }
      const suppressed = this.suppressNextMobileInput;
      this.suppressNextMobileInput = null;

      if (
        text && suppressed && text === suppressed.text &&
        event.timeStamp - suppressed.timeStamp < 100
      ) {
        inputElement.value = "";
        return;
      }

      const handled = text
        ? this.processMobileKana(text, fromInputValue)
        : false;
      if (text && this.mobileCompositionWordId === this.mobileWordId && handled) {
        this.mobileCompositionInputHandled = true;
      }
      this.lastMobileInput = { text, handled, timeStamp: event.timeStamp, wordId: this.mobileWordId };

      // Do not erase an active iOS composition: doing so can make the keyboard
      // hold the character until Enter. The composed text is judged above and
      // cleared once the composition commits.
      if (!event.isComposing) {
        inputElement.value = "";
      }
    },
    handleMobileCompositionEnd: function(event) {
      const compositionStartedAt = this.mobileCompositionStartedAt;
      const compositionInputHandled = this.mobileCompositionInputHandled;
      const inputElement = event.target;
      const compositionWordId = this.mobileCompositionWordId;
      this.mobileCompositionWordId = null;
      this.mobileCompositionStartedAt = 0;
      this.mobileCompositionInputHandled = false;
      if (compositionWordId !== null && compositionWordId !== this.mobileWordId) {
        this.suppressNextMobileInput = null;
        inputElement.value = "";
        return;
      }
      if (this.ignoreNextCompositionEnd) {
        this.ignoreNextCompositionEnd = false;
        inputElement.value = "";
        return;
      }
      if (inputElement !== this.$refs.input) {
        inputElement.value = "";
        return;
      }
      const fromInputValue = !event.data;
      const text = this.normalizeMobileInput(event.data || inputElement.value);
      const previous = this.lastMobileInput;
      // A delayed compositionend from the previous key must not be judged
      // against the position reached by a newer key event.
      if (previous && previous.wordId === this.mobileWordId && previous.timeStamp > event.timeStamp) {
        inputElement.value = "";
        return;
      }
      // A composition may finish after the final kana has already completed
      // the word and the next word has been loaded. Never replay that commit.
      if (previous && previous.wordId !== this.mobileWordId) {
        this.suppressNextMobileInput = text
          ? { text, timeStamp: event.timeStamp }
          : null;
        inputElement.value = "";
        return;
      }
      const inputBelongsToComposition = previous && compositionStartedAt > 0 &&
        previous.timeStamp >= compositionStartedAt;
      const alreadyHandled = inputBelongsToComposition && previous.handled && (
        previous.text === text || this.pressedKana.endsWith(text)
      );
      const alreadyJudgedDuringComposition = compositionInputHandled && !this.pendingKana;
      const lastAcceptedKana = this.pressedKana.slice(-1);
      const acceptedKanaBase = PENDING_KANA_BASES[lastAcceptedKana];
      // iOS may report the unvoiced base (for example し) at compositionend
      // after the input event already accepted its voiced form (じ).
      const compositionReportsAcceptedBase = inputBelongsToComposition && previous.handled &&
        acceptedKanaBase && text.endsWith(acceptedKanaBase);

      if (
        text && !alreadyHandled && !alreadyJudgedDuringComposition && !compositionReportsAcceptedBase &&
        this.active && !this.advancingToNextWord
      ) {
        this.processMobileKana(text, fromInputValue);
      }

      this.suppressNextMobileInput = text
        ? { text, timeStamp: event.timeStamp }
        : null;
      inputElement.value = "";
    },
    processMobileKana: function(text, fromInputValue) {
      let input = text;
      if (
        input.startsWith(this.pressedKana) &&
        (input.length > this.pressedKana.length || fromInputValue)
      ) {
        input = input.slice(this.pressedKana.length);
      }

      let handled = false;
      for (const key of Array.from(input)) {
        if (this.advancingToNextWord) {
          break;
        }

        const expectedKana = this.hiragana2[0];
        const expectedBase = PENDING_KANA_BASES[expectedKana];
        const intermediateKana = HAN_DAKUTEN_INTERMEDIATE_KANA[expectedKana];
        const isDakuten = key === "゛" || key === "\u3099";
        const isHandakuten = key === "゜" || key === "\u309a";

        if (this.pendingKana && (isDakuten || isHandakuten)) {
          const expectsHandakuten = "ぱぴぷぺぽ".includes(expectedKana);
          if ((expectsHandakuten && isHandakuten) || (!expectsHandakuten && isDakuten)) {
            this.acceptMobileKana(expectedKana);
            handled = true;
            continue;
          }
        }

        if (key === expectedKana) {
          this.pendingKana = "";
          this.acceptMobileKana(key);
          handled = true;
          continue;
        }

        if (intermediateKana && key === intermediateKana) {
          this.pendingKana = expectedBase;
          handled = true;
          continue;
        }

        if (expectedBase && key === expectedBase) {
          this.pendingKana = expectedBase;
          handled = true;
          continue;
        }

        this.pendingKana = "";
        this.registerMistype();
        handled = true;
      }

      return handled;
    },
    acceptMobileKana: function(kana) {
      this.pendingKana = "";
      this.pressedKana += kana;
      this.hiragana2 = this.hiragana2.slice(kana.length);

      if (this.hiragana2.length === 0) {
        this.completeWord();
        const inputElement = this.$refs.input;
        if (inputElement) {
          inputElement.value = "";
        }
      }
    },
    normalizeMobileInput: function(text) {
      return this.toHiragana(text.normalize("NFKC").normalize("NFC"));
    },
    isKanaInput: function(text) {
      return Array.from(text).every((character) => {
        const code = character.charCodeAt(0);
        return (code >= 0x3041 && code <= 0x3096) ||
          code === 0x3099 || code === 0x309a || code === 0x30fc;
      });
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
              this.mobileWordId += 1;
              this.mobileCompositionStartedAt = 0;
              this.mobileCompositionInputHandled = false;
              this.ignoreNextCompositionEnd = false;
              this.lastMobileInput = null;
              this.suppressNextMobileInput = null;
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
