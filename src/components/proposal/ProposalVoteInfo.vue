<template>
    <fragment>
        <div class="cnt-vote">
            <div class="vote" :class="activeClass(VOTE_OPTION.VOTE_OPTION_YES)" @click="vote(1)">Yes:
                {{ yes | getPercent(totalVote) }} %
            </div>
            <div class="notvote" :class="activeClass(VOTE_OPTION.VOTE_OPTION_NO_WITH_VETO)" @click="vote(4)">NoWithVeto:
                {{ noWithVeto | getPercent(totalVote) }} %
            </div>
        </div>
        <div class="cnt-vote cnt-absta">
            <div class="no-ab" :class="activeClass(VOTE_OPTION.VOTE_OPTION_NO)" @click="vote(3)">No:
                {{ no | getPercent(totalVote) }} %
            </div>
            <div class="abstain" :class="activeClass(VOTE_OPTION.VOTE_OPTION_ABSTAIN)" @click="vote(2)">Abstain:
                {{ abstain | getPercent(totalVote) }} %
            </div>
        </div>
    </fragment>
</template>
<script>
import {Fragment} from 'vue-fragment'
import {VoteOption} from '@/utils/constant'
import {ProposalStatus} from "../../utils/constant";

export default {
    components: {Fragment},
    props: {
        yes: String,
        noWithVeto: String,
        no: String,
        abstain: String,
        status: Number
    },
    data() {
        return {
            VOTE_OPTION: VoteOption,
            option: VoteOption.UNRECOGNIZED,
        }
    },
    filters: {
        getPercent(value, totalVote) {
            if (totalVote == 0) {
                return 0
            }
            return ((value / totalVote) * 100).toFixed(2)
        }
    },
    computed: {
        totalVote() {
            const {yes, no, noWithVeto, abstain} = this
            return Number(no) + Number(yes) + Number(noWithVeto) + Number(abstain)
        },

    },
    methods: {
        vote(option) {
            if (this.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD) {
                this.option = option
                this.$emit('changeOption', option)
            }
        },
        activeClass(option) {
            if (this.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD) {
                if (this.option == option) {
                    return 'active'
                }
                return ''
            }

        }
    }
}
</script>
