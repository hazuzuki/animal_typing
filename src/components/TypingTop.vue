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
</style>