<template>
    <a href="javascript:void(0)" @click="eventModal">
        <div class="item-vali-detail">
            <div class="title-item-vali">
                <div class="number">#{{ index }}</div>
                <div class="cnt-text"><a href="#">Status</a><a
                    :style="{backgroundColor:style, color: textColor}" href="#">{{ name }}</a>
                </div>
            </div>
            <div class="box-item-detail">
                <h3>{{ des.typeUrl }}</h3>
                <div class="sub-title-item"
                     style="height: 100px!important;,width: 350px;overflow: hidden;display:
                      -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;">
                    {{ des.content }}
                </div>
                <ProposalInfo
                    :proposer="proposer"
                    :submitTime="submitTime"
                    :votingStartTime="votingStartTime"
                    :votingEndTime="votingEndTime"
                />
            </div>
            <div class="bottom-item-vali">
                <div class="cnt-vote">
                    <button class="btn btn-vote">Vote</button>
                </div>
                <ProposalVoteInfo
                    :yes="vote.yes"
                    :no="vote.no"
                    :abstain="vote.abstain"
                    :noWithVeto="vote.noWithVeto"
                />
            </div>
        </div>
    </a>

</template>

<script>

import {proposalStatusObject} from "@/utils/constant";
import moment from "moment";
import ProposalInfo from "@/components/proposal/ProposalInfo.vue"
import ProposalVoteInfo from "@/components/proposal/ProposalVoteInfo.vue"


export default {
    name: "ItemProposals",
    components: {
        ProposalInfo,
        ProposalVoteInfo
    },
    props: {
        index: Number,
        status: Number,
        title: Uint8Array,
        submitTime: {type: Date, default: ''},
        votingStartTime: {type: Date, default: ''},
        votingEndTime: {type: Date, default: ''},
        vote: Object,
        proposalId: Number,
        proposer: String,
        des: {
            type: Object,
            default() {
                return {
                    typeUrl: '',
                    content: ''
                }
            }
        }
    },
    filters: {
        formatDateTime(dateTime) {
            const a = moment(dateTime, "dddd, MMMM Do YYYY, h:mm:ss").toString()
            return a.split(' ').slice(0, 5).join(' ');
        }
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
    }, methods: {
        eventModal() {
            this.$emit('showModal')
        },
    }
}
</script>

<style scoped>

</style>
