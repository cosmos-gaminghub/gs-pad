<template>
    <div class="title-item-proposal">
        <div class="number-title">
            <div class="number">#{{ id }}</div>
            <h3>{{ title }}</h3>
        </div>
        <div class="cnt-text"><a href="#">Status</a><a
            :style="{backgroundColor:style, color: textColor}" href="#">{{ name  }}</a></div>
    </div>
</template>
<script>
import { proposalStatusObject } from "@/utils/constant";
export default {
    name: "ProposalHeader",
    props: {
        status: {
            type: Number,
            default: 0
        },
        id: Number,
        title: String,
    },
    computed: {
        name() {
            return proposalStatusObject[this.status].name
        },
        style() {
            return proposalStatusObject[this.status].style
        },
        textColor() {
             return proposalStatusObject[this.status].color
        }
    }
}
</script>
