<template>
    <div class="content">
    <div>
        <img 
        class="tree-animals"
        src="@/assets/tree_animals_group (1).png" 
        alt="動物の画像">
    </div>

        <span v-if="$mq === 'pc'">
            <span class="green">Enter</span>を押してゲーム開始
        </span>

        <a
            v-if="$mq === 'sp'"
            class="btn btn-small btn-square"
            @click="$emit('gameStart')"
        >
            ゲーム開始
        </a>
        <div class="play">
            <img src="@/assets/keijiban.png" alt="掲示板" width="700px" height="350px">
            <div class="how_to_play">
                    <h2>遊び方</h2>
                    <p>あなたは、動物園の飼育員です。ある日、動物園から150匹の動物が逃げ出してしまいました。このままでは、園長に怒られてしまいます。制限時間内に動物を見つけだそう！</p>
                    <ol>
                        <li v-if="$mq === 'pc'">Enterを押すとゲームが開始します。</li>
                        <li v-if="$mq === 'sp'">ゲーム開始ボタンを押すとゲームが開始します。</li>
                        <li>制限時間は、60秒です。制限時間内にたくさんの動物を見つけてください。</li>
                        <li>ゲーム終了後、見つけた動物を一覧で確認できます。</li>
                    </ol>
            </div>
            </div>
        <div v-if="$mq === 'sp'">
        <div class="video">
            <div class="video-description">▽ゲームのプレイ動画はこちら</div> 
            <iframe width="100%" src="https://www.youtube.com/embed/3JgsTd0hHKE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        </div>
            <div class="change_log">
                <div class="content">
                    <h2>更新履歴</h2>
                    <dl>
                    <dt>2026.10.17</dt>
                    <dd>スマートフォンからも遊べるようになりました。</dd>
                    <dt>2023.3.26</dt>
                    <dd>字のサイズを大きくしました。</dd>
                    <dt>2022.3.9</dt>
                    <dd>「関連のゲーム」を追加しました。</dd>
                    <dt>2022.2.25</dt>
                    <dd>「ゲームについて」を追加しました。</dd>
                    <dt>2022.2.25</dt>
                    <dd>同じ動物が出現するバグを修正しました。</dd>
                    <dt>2022.2.25</dt>
                    <dd>Xへの投稿に「#動物タイピングゲーム」を追加しました。</dd>
                    <dt>2022.2.10</dt>
                    <dd>「見つけた動物」の一覧表示の仕方を変更しました。</dd>
                    <dt>2022.2.10</dt>
                    <dd>SNSのシェアボタンを追加しました。</dd>
                    <dt>2022.2.9</dt>
                    <dd>同じ動物が出現するバグを修正しました。</dd>
                    <dt>2022.1.26</dt>
                    <dd>更新履歴を追加しました。</dd>
                    <dt>2022.1.26</dt>
                    <dd>遊び方を追加しました。</dd>
                    </dl>
                </div>
                <img class="mogura" src="@/assets/animal_chara_mogura_kouji_ana.png" alt="掲示板">
            </div>
            <div class="profile">
                <h2>ゲームについて</h2>
                    <div>
                        <p class="message">ゲームのご意見・ご感想は下記のXアカウントまで！</p>
                        <a target="_blank" rel="noopener noreferrer" href="https://x.com/animal_typ"><img class="icon" src="@/assets/x_icon.svg" alt="Xアカウント" width="80px" height="80px"></a>
                    </div>
            </div>
            <div class="content anothor_game">
                <h2>関連のゲーム</h2>
                    <div>
                        <p class="message">こちらも遊んでみてね</p>
                        <div><img class="icon" src="@/assets/bird_typ.png" alt="アイコン" width="300px"></div>
                        <a class="btn btn-small btn-square" target="_blank" href="https://hazuzuki.github.io/bird_typing/">野鳥タイピングゲーム</a>
                    </div>
            </div>
        </div>
</template>

<script>


</script>

<style>
.content {
    padding: 20px;
    text-align: center;
    overflow-x: hidden;
}

.start {
    font-size: 30px;
    margin-bottom: 60px;
}

.video {
    margin-top: 30px;
    padding: 15px;
    background-color: #409933;
    margin-bottom: 30px;
}

.video-description {
    color: white;
    margin-bottom: 10px;
    text-align: left;
}

.green {
    color:  #007f00;
}

.play {
    position: relative;
    width: 700px;
    height: 410px;
    margin: 0 auto;
}

.play > img {
    position: absolute;
    right: 0px;
}

.how_to_play {
    width: 400px;
    margin: 0 auto;    
    display: inline-block;
    position: absolute;
    top: 50px;
    left: 150px;
    font-size: 15px !important;

}

.how_to_play > h2 {
    font-size: 20px !important;
    margin-bottom: 10px;
}

.how_to_play > p {
    font-size: 15px !important;
    margin-bottom: 10px;
    text-align: left;
    line-height: 20px;
}

.how_to_play > ol > li {
    text-align: left;
    padding-top: 3px;
    padding-bottom: 3px;
    list-style-position: inside;
    margin-left: 0.9em;
    text-indent: -0.9em;
}

.change_log {
    margin-bottom: 50px;
}

.change_log > .content {
    background-color: white;
    padding: 20px;
    display: inline-block;
    border-radius: 15px;
    position: relative;
}

.change_log > .content ::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -15px;
    border: 15px solid transparent;
    border-top: 15px solid white;
}

.change_log > .content > dl {
    text-align: left;
    line-height: 1.5em;
}

.change_log > .content > dl> dt {
    float: left;
}

.change_log > .content > dl > dd {
    margin-left: 80px;
}

.change_log  > .content > h2 {
    font-size: 20px !important;
    margin-bottom: 10px;
}

.change_log  > img {
    display: block;
    margin: 0 auto;
    margin-top: 30px;
}

.profile > h2 {
    font-size: 20px !important;
    margin-bottom: 10px;
}

p {
    font-size: 35px;
}

.message{
    font-size: 1.2em;
}

.anothor_game {
    margin-bottom: 100px;
}

.anothor_game > h2 {
    font-size: 20px !important;
    margin-bottom: 10px;
}

.anothor_game > div > p {
    margin-bottom: 10px;
}

.anothor_game > div > div > img {
    margin-bottom: 10px;
}

.btn-small{
    height: 30px;
    width: 210px;
    font-size: 15px;
}

.mogura {
    width: 20%;
}


.tree-animals {
    width: 30%;
}

html, body {
    overflow-x: hidden;
    width: 100%;
}

@media screen and (max-width: 600px) {
    body {
        overflow-x: hidden;
    }

    .tree-animals {
        width: 70%;
    }

    .play {
        width: 140%;
        height: 600px;
        left: 50%;
        transform: translateX(-50%);
        padding-top: 5%;
    }

    .play > img {
        width: 100%;
        height: 80%;
        object-fit: fill;
    }

    .how_to_play {
        width: 60%;
        top: 80px;
        left: 20%;
        font-size: 15px !important;
    }

    .how_to_play > h2 {
        font-size: 20px !important;
    }

    .how_to_play > p {
        font-size: 15px !important;
        line-height: 20px;
    }

    .change_log > .content {
        height: 350px;
        overflow-y: auto;
        padding: 10px 20px;
    }

    .change_log > .content > h2 {
        position: sticky;
        top: -10px;
        background-color: white;
        z-index: 10;
        padding: 10px 0;
        margin-top: -10px;
        margin-bottom: 10px;
    }

    .mogura {
        width: 40%;
    }

    .video {
        margin-top: -80px;
    }

}


</style>