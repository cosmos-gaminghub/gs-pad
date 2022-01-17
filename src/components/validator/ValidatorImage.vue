<template>
    <div class="icon">
        <img :src="imageUrl">
    </div>
</template>
<script>
export default {
    props: {
        identity: String,
    },
    data () {
        return {
            imageUrl: ""
        }
    },
    mounted() {
        this.getKeyBaseImage()
    },
    methods: {
        async getKeyBaseImage () {
            const response = await this.axios.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${this.identity}&fields=pictures`)
            this.imageUrl = response.data.them[0].pictures.primary.url
        },
    }
}
    
</script>