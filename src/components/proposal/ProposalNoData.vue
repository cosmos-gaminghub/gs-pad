<template>
    <li v-if="proposals.length == 0" style="text-align: center; background-color: darkgrey;">No data found</li>
</template>
<script>
export default {
    props: {
        proposals: Array
    }
}
</script>