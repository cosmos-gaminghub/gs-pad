<template>
    <div>
        <div class="content-wallet">
            <Login/>
            <div class="content-proposal-detail">
                <div class="row">
                    <div class="col-md-12">
                        <div class="cnt-wallet-left">
                            <div class="cnt-proppsals">
                                <div class="title-proppsal">
                                    <div class="title title-tab">
                                        <ul>
                                            <li :class="activeClass('all')"><a
                                                @click="checkClick('all',statusProposal.UNRECOGNIZED)"
                                                href="javascript:void (0)">All</a></li>
                                            <li :class="activeClass('passed')"><a href="javascript:void (0)"
                                                                                  @click="checkClick('passed',statusProposal.PROPOSAL_STATUS_PASSED)">Passed</a>
                                            </li>
                                            <li :class="activeClass('pending')"><a href="javascript:void (0)"
                                                                                   @click="checkClick('pending',statusProposal.PROPOSAL_STATUS_DEPOSIT_PERIOD)">Pending</a>
                                            </li>
                                            <li :class="activeClass('rejected')"><a href="javascript:void (0)"
                                                                                    @click="checkClick('rejected',statusProposal.PROPOSAL_STATUS_REJECTED)">Rejected</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="content-tab-proposal">
                                    <div class="content-tab" id="all" v-show="activeClass('all')==='active'">
                                        <div class="content-detail">
                                            <div class="content-detail-prop" ref="proposalTable">
                                                <ul>
                                                    <li v-for="(proposal,index) in proposals" :key="index">
                                                        <ItemProposalsTab
                                                            :proposer="proposal.proposer"
                                                            :index="proposal.proposalId.low"
                                                            :status="proposal.status"
                                                            :submitTime="proposal.submitTime"
                                                            :votingStartTime="proposal.votingStartTime"
                                                            :votingEndTime="proposal.votingEndTime"
                                                            :vote="proposal.finalTallyResult"
                                                            :title="proposal.content.value"
                                                            :proposalId="proposal.proposalId.low"
                                                            @showModal="showModal(proposal.proposalId.low,index+1)"/>
                                                    </li>
                                                    <ProposalNoData :proposals="proposals"/>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-tab" id="passed" v-show="activeClass('passed')==='active'">
                                        <div class="content-detail">
                                            <div class="content-detail-prop">
                                                <ul>
                                                    <li v-for="(proposal,index) in proposalsForStatus" :key="index">
                                                        <ItemProposalsTab
                                                            :proposer="proposal.proposer"
                                                            :index="proposal.proposalId.low"
                                                            :status="proposal.status"
                                                            :submitTime="proposal.submitTime"
                                                            :votingStartTime="proposal.votingStartTime"
                                                            :votingEndTime="proposal.votingEndTime"
                                                            :vote="proposal.finalTallyResult"
                                                            :title="proposal.content.value"
                                                            :proposalId="proposal.proposalId.low"
                                                            @showModal="showModal(proposal.proposalId.low,index+1)"/>
                                                    </li>
                                                    <ProposalNoData :proposals="proposalsForStatus"/>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-tab" id="pending" v-show="activeClass('pending')==='active'">
                                        <div class="content-detail">
                                            <div class="content-detail-prop">
                                                <ul>
                                                    <li v-for="(proposal,index) in proposalsForStatus" :key="index">
                                                        <ItemProposalsTab
                                                            :proposer="proposal.proposer"
                                                            :index="proposal.proposalId.low"
                                                            :status="proposal.status"
                                                            :submitTime="proposal.submitTime"
                                                            :votingStartTime="proposal.votingStartTime"
                                                            :votingEndTime="proposal.votingEndTime"
                                                            :vote="proposal.finalTallyResult"
                                                            :title="proposal.content.value"
                                                            :proposalId="proposal.proposalId.low"
                                                            @showModal="showModal(proposal.proposalId.low,index+1)"/>
                                                    </li>
                                                    <ProposalNoData :proposals="proposalsForStatus"/>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-tab" id="reject" v-show="activeClass('rejected')==='active'">
                                        <div class="content-detail">
                                            <div class="content-detail-prop">
                                                <ul>
                                                    <li v-for="(proposal,index) in proposalsForStatus" :key="index">
                                                        <ItemProposalsTab
                                                            :proposer="proposal.proposer"
                                                            :index="proposal.proposalId.low"
                                                            :status="proposal.status"
                                                            :submitTime="proposal.submitTime"
                                                            :votingStartTime="proposal.votingStartTime"
                                                            :votingEndTime="proposal.votingEndTime"
                                                            :vote="proposal.finalTallyResult"
                                                            :title="proposal.content.value"
                                                            :proposalId="proposal.proposalId.low"
                                                            @showModal="showModal(proposal.proposalId.low,index+1)"/>
                                                    </li>
                                                    <ProposalNoData :proposals="proposalsForStatus"/>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal modal-dialog-centered fade popup_customer" id="contentDetailProposal" tabindex="-1"
             role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true"
                                @click="closeModal"><span aria-hidden="true" class="icon-close-modal"></span></button>
                    </div>
                    <div class="modal-body" v-if="!isEmpty(proposalDetail)">
                        <div class="item-proposal-detail">
                            <ProposalHeader
                                :id="i"
                                :status="proposalDetail.status"
                                :title="proposalDetail.des.typeUrl"
                            />
                        </div>
                        <div class="box-item-detail-proposal">
                            <div class="left-item-detail">
                                <div class="box-left-detail">
                                    <ProposalInfo
                                        :proposer="proposalDetail.proposer"
                                        :submitTime="proposalDetail.submitTime"
                                        :votingStartTime="proposalDetail.votingStartTime"
                                        :votingEndTime="proposalDetail.votingEndTime"
                                    />
                                    <div class="decription-proposal">
                                        <p >{{ proposalDetail.des.content }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="right-item-proposal">
                                <div class="cnt-proposal">
                                    <ProposalChart
                                        :yes="proposalDetail.finalTallyResult.yes"
                                        :no="proposalDetail.finalTallyResult.no"
                                        :noWithVeto="proposalDetail.finalTallyResult.noWithVeto"
                                        :abstain="proposalDetail.finalTallyResult.abstain"
                                    />
                                    <ProposalVoteInfo
                                        :yes="proposalDetail.finalTallyResult.yes"
                                        :no="proposalDetail.finalTallyResult.no"
                                        :noWithVeto="proposalDetail.finalTallyResult.noWithVeto"
                                        :abstain="proposalDetail.finalTallyResult.abstain"
                                        :status="proposalDetail.status"
                                        @changeOption="handelChangeOption"
                                    />
                                    <div class="cnt-vote">
                                        <button class="btn btn-vote" @click="handelVote" v-if="check">Vote</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import Login from "@/components/login/Login";
import {WalletHelper} from "@/utils/wallet";
import {KelprWallet} from "@/utils/connectKeplr";
import ItemProposalsTab from "@/components/ItemProposalsTab";
import {ProposalStatus} from "@/utils/constant";
import ProposalHeader from "@/components/proposal/ProposalHeader.vue"
import ProposalVoteInfo from "@/components/proposal/ProposalVoteInfo.vue"
import ProposalChart from "@/components/proposal/ProposalChart.vue"
import ProposalInfo from "@/components/proposal/ProposalInfo.vue"
import ProposalNoData from "@/components/proposal/ProposalNoData.vue"
import {mapMutations, mapState} from "vuex";

export default {
    name: "proposals",
    components: {
        ItemProposalsTab,
        Login,
        ProposalHeader,
        ProposalVoteInfo,
        ProposalChart,
        ProposalInfo,
        ProposalNoData
    },
    data: function () {
        return {
            class: 'all',
            wallet: '',
            stargateClient: null,
            statusProposal: ProposalStatus,
            proposals: [],
            i: 0, // remove
            proposalsForStatus: [],
            option: -1,
            proposalDetail: {},
            check: false
        }
    },
    async created() {
        await this.getWallet()
        await this.getStargetClient()
        await this.getProposals()
    },
    computed: {
        ...mapState('auth', ["address"])
    },
    methods: {
        ...mapMutations("modal", ["setIsOpen"]),
        checkClick(key, status) {
            this.class = key
            this.proposalsForStatus = []
            this.getProposalByStatus(status)
        },
        activeClass(key) {
            if (key === this.class) {
                return 'active'
            }
            return ''
        },
        async getWallet() {
            this.wallet = await WalletHelper.connect()
        },
        async getStargetClient() {
            this.stargateClient = await WalletHelper.getStargateClient()
        },
        async getProposals() {
            const loader = this.showLoadling("proposalTable")
            try {
                const res = await this.wallet.getListProposal(this.statusProposal.UNRECOGNIZED, "", "")
                for(const index in res.proposals) {
                    const proposal = res.proposals[index]
                    const {tally} = await this.wallet.getProposalTally(proposal.proposalId)
                    proposal.finalTallyResult = {...tally}
                    this.proposals = this.proposals.concat(proposal)
                }
                console.log(this.proposals)
                this.sort()
                this.formatProposals()
                await this.getProposalProposer(0)
            } catch (err) {
                this.$toast.error(err.message);
            }
            this.hideLoading(loader)
        },
        async vote(proposalId, option) {
            try {
                const voter = await KelprWallet.getAddress()
                const keplrWallet = await KelprWallet.getKeplrWallet()
                await keplrWallet.vote(voter, proposalId, option)
                this.closeModal()
                this.$toast.success("Vote success");
            } catch (err) {
                this.$toast.error(err.message);
            }
        },
        async handelVote() {
            const loader = this.showLoadling("modal")
            await this.vote(this.proposalDetail.proposalId, this.option)
            this.hideLoading(loader)
        },
        async getProposal(proposalId) {
            return await WalletHelper.getSumitProposer(this.stargateClient, proposalId)
        },
        async getProposalProposer(index) {
            const { proposals } = this
            const array = [];
            for (let i = 0; i < 3; i++) {
                if (proposals[index + i]) {
                    const value = proposals[index + i];
                    if (value && value.proposalId) {
                        array.push(this.getProposal(value.proposalId));
                    }
                } else {
                    break;
                }
            }
            Promise.all(array).then((data) => {
                data.forEach((item, i) => {
                    this.$set(this.proposals[index + i], 'proposer', item)
                })
                if (index + 3 <= proposals.length - 1) {
                    this.getProposalProposer(index + 3);
                }
            });
        },
        formatProposals() {
            const proposals = [...this.proposals]
            for (const data of proposals) {
                data.des = WalletHelper.convertContent(data.content.value)
            }
            this.proposals = [...proposals]
        },
        showModal(val, index) {
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display = "block"
            this.setIsOpen(true)
            this.i = index // remove i
            this.proposals.forEach(item => {
                if (item.proposalId.low === val) {
                    this.proposalDetail = item
                    if (item.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD) {
                        this.check = true
                    }
                    return
                }
            })

        },
        closeModal() {
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display = "none"
            this.check = false
            this.setIsOpen(false)
        },
        getProposalByStatus(status) {
            this.proposalsForStatus = this.proposals.filter(x => x.status === status)
        },
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        },
        handelChangeOption(option) {
            this.option = option
        },
        showLoadling(refName) {
            const loader = this.$loading.show({
                container: this.$refs[refName],
                canCancel: true,
                onCancel: this.onCancel,
            });
            return loader
        },
        hideLoading(loader) {
            loader.hide()
        },
        showVote() {
            if (this.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD) {
                this.check = true
            } else {
                this.check = false
            }

        },
        sort() {
            this.proposals.sort(function (a, b) {
                return b.proposalId.low - a.proposalId.low;
            });
        }
    }
}
</script>
<style>
.decription-proposal{
    max-height: 60vh;
    overflow-y: auto;
}
.decription-proposal p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    width: 100%;
    font-family: "Blinker",sans-serif;
    line-height: 130%;
    height: unset;
}
</style>
