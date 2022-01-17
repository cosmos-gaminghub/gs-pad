<template>
    <li v-if="proposals.length == 0" class="no-data">No data found</li>
</template>
<script>
export default {
    props: {
        proposals: Array
    }
}
</script>