<template>
    <div class="content">
        <div><img src="@/assets/tree_animals_group (1).png" alt="動物の画像" width="35%" height="35%"></div>
        <div v-if="$mq === 'pc'">
            <div class="start">Enterを押して開始</div>
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
</style>