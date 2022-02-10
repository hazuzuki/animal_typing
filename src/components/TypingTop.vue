<template>
    <div class="content">
        <div><img src="@/assets/tree_animals_group (1).png" alt="動物の画像" width="30%" height="30%"></div>
        <div v-if="$mq === 'pc'">
            <div class="start"><span class="green">Enter</span>を押してゲーム開始</div>
            <div class="play">
                <img src="@/assets/keijiban.png" alt="掲示板" width="700px" height="350px">
                <div class="how_to_play">
                        <h2>遊び方</h2>
                        <p>あなたは、動物園の飼育員です。ある日、動物園から150匹の動物が逃げ出してしまいました。このままでは、園長に怒られてしまいます。制限時間内に動物を見つけだそう！</p>
                        <ol>
                            <li>Enterを押すとゲームが開始します。</li>
                            <li>制限時間は、60秒です。制限時間内にたくさんの動物を見つけてください。</li>
                            <li>ゲーム終了後、見つけた動物を一覧で確認できます。</li>
                        </ol>
                </div>
            </div>
        </div>
        <div v-if="$mq === 'sp'">
            <div>訪問ありがとうございます。</div>
            <div>こちらは、パソコン専用のサイトです。</div>
            <div>パソコンからアクセスしてください。</div>  
            <div class="video">
                <div class="video-description">▽ゲームのプレイ動画はこちら</div> 
                <iframe width="100%" src="https://www.youtube.com/embed/3JgsTd0hHKE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
            <div class="change_log">
                <div class="content">
                    <h2>更新履歴</h2>
                    <dl>
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
                <img src="@/assets/animal_chara_mogura_kouji_ana.png" alt="掲示板" width="20%" height="20%">
            </div>
        </div>
</template>

<script>


</script>

<style>
.content {
    padding: 20px;
    text-align: center;
}

.start {
    font-size: 30px;
    margin-bottom: 60px;
}

.video {
    margin-top: 30px;
    padding: 15px;
    background-color: #409933;
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
    margin-bottom: 100px;
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

</style>