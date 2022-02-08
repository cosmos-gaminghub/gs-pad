<template>
    <div class="icon">
        <img :src="imageUrl | getImageUrl" style="max-width: 100%;height: auto">
    </div>
</template>
<script>
export default {
    props: {
        imageUrl: String
    },
    filters: {
        getImageUrl (value){
            if(value) {
                return value
            }
            return "https://www.mintscan.io/static/media/validator_none.83868b17.svg"
        }
    },
}

</script>
