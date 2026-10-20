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
                <img class="share-icon share-icon-x" @click="shareOnX" src="@/assets/x_icon.svg" alt="Xでシェア">
                <a :href="lineShareUrl" target="_blank" rel="nofollow noopener noreferrer"><img class="share-icon" src="@/assets/line_icon.png" alt="LINEでシェア"></a>
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
    computed: {
        lineShareUrl() {
            const shareUrl = new URL("https://social-plugins.line.me/lineit/share");
            shareUrl.search = new URLSearchParams({
                url: "https://hazuzuki.github.io/animal_typing/",
                text: `${this.sumcount}匹の動物を見つけたよ。遊んでみてね。 #動物タイピングゲーム`,
            }).toString();
            return shareUrl.toString();
        },
    },
    methods: {
        reload() {
            this.$router.go(this.$router.currentRoute)
        },
        shareOnX() {
            const shareUrl = new URL("https://x.com/intent/post");
            shareUrl.search = new URLSearchParams({
                text: `${this.sumcount}匹の動物を見つけたよ。みんなも遊んでみてね。`,
                hashtags: "動物タイピングゲーム",
                url: "https://hazuzuki.github.io/animal_typing/",
            });
            window.open(shareUrl.toString(), "_blank", "noopener,noreferrer");
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 100px;
}
.icon-list img.share-icon {
    width: 80px;
    height: 80px;
    object-fit: contain;
}
.icon-list img.share-icon-x {
    width: 58px;
    height: 58px;
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

@media screen and (max-width: 600px) {

    h1 {
        font-size: 36px;
    }

    .sumcount {
        font-size: 20px;
    }

    .btn-square {
        font-size: 24px;
        padding: 12px 30px;
    }

    .content > img {
        width: 60%;
        height: auto;
        margin-top: 20px;
    }

    .find_animal {
        font-size: 24px;
        margin: 20px 0;
    }

    .icon-list img.share-icon {
        width: 60px;
        height: 60px;
    }

    .icon-list img.share-icon-x {
        width: 43px;
        height: 43px;
    }

    .animal_list {
        padding: 20px;
        gap: 15px;
        justify-content: center;
    }

    .animal {
        width: 45%;
        text-align: center;
    }

    .animal-img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }

    .animal_list {
        padding-bottom: 150px;
    }

    .animal_list_none {
        margin-bottom: 150px;
    }

    .content {
        padding-bottom: 220px;
    }

}

</style>
