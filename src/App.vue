<template>
    <div class="page-container">
        <SideBar/>
        <div class="page-content-wrapper">
            <div class="page-content home-page">
                <div class="container">
                    <router-view ></router-view>
                </div>
            </div>
        </div>
        <div v-if="hasModal" class="modal-backdrop fade in"></div>
    </div>
</template>
<script>
import SideBar from "@/components/sidebar/Sidebar";

export default {
    components: {
        SideBar
    },
    data() {
        return {
            hasModal: false
        }
    },
    mounted() {
        this.$store.subscribe(mutation => {
            if (mutation.type === 'modal/setIsOpen') {
                this.hasModal = mutation.payload
            }
        })
    },
}
</script>

