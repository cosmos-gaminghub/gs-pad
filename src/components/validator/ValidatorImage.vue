<template>
    <div class="icon">
        <img :src="imageUrl" style="max-width: 100%;height: auto">
    </div>
</template>
<script>
export default {
    props: {
        imageUrl: String
    },
}

</script>
