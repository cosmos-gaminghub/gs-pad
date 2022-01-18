<template>
    <div class="page-sidebar-wrapper vetical-menu">
        <div class="page-sidebar navbar-collapse collapse">
            <Logo/>
            <ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                <TabSideBar/>
            </ul>
        </div>
    </div>
</template>

<script>

import Logo from "@/components/sidebar/Logo";
import TabSideBar from "./TabSideBar";

export default {
    name: "SideBar",
    components: {
        TabSideBar,
        Logo,
    },
}
</script>

<style scoped>

</style>
