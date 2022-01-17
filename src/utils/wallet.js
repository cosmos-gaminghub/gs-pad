import {
    QueryClient,
    setupDistributionExtension,
    setupGovExtension,
    setupStakingExtension,
    setupBankExtension
} from "@cosmjs/stargate";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {Any} from "cosmjs-types/google/protobuf/any";
import {StargateClient} from "@cosmjs/stargate/build/stargateclient";


const endpoint = process.env.VUE_APP_END_POINT

export class WalletHelper {
    constructor(queryClient = null) {
        this.queryClient = queryClient
    }

    static async connect() {
        const tmClient = await Tendermint34Client.connect(endpoint)
        const queryClient = new QueryClient(tmClient)
        return new WalletHelper(queryClient)
    }

    getQueryClient() {
        return this.queryClient
    }

    getGovExtension() {
        return setupGovExtension(this.getQueryClient())
    }

    getStakingExtension() {
        return setupStakingExtension(this.getQueryClient())
    }

    static async getStargateClient() {
        return await StargateClient.connect(endpoint)
    }

    getDistributionExtension() {
        return setupDistributionExtension(this.getQueryClient())
    }

    getBankExtension() {
        return setupBankExtension(this.getQueryClient())
    }

    async getListProposal(status, depositor, voter) {
        return await this.getGovExtension().gov.proposals(status, depositor, voter)
    }

    async getDetailProposal(proposalId) {
        return await this.getGovExtension().gov.proposal(proposalId)
    }

    async getValidators(status) {
        return await this.getStakingExtension().staking.validators(status)
    }

    async reDelegations(addressStaked, address_user, addressDelegate) {
        return await this.getStakingExtension().staking.redelegations(addressStaked, address_user, addressDelegate)
    }

    async getDetailValidator(status) {
        return await this.getStakingExtension().staking.validator(status)
    }

    async getRewards(addressValidations) {
        return await this.getDistributionExtension().distribution.delegationTotalRewards(addressValidations)
    }

    async getBalances(addressValidations) {
        return await this.getBankExtension().bank.allBalances(addressValidations)
    }

    async getUnbonding(addressValidations) {
        return await this.getStakingExtension().staking.delegatorUnbondingDelegations(addressValidations)
    }

    async getDelegation(addressValidations) {
        return await this.getStakingExtension().staking.delegatorDelegations(addressValidations)
    }

    async getStakedValidators(addressValidations) {
        return await this.getStakingExtension().staking.delegatorValidators(addressValidations)
    }


    static convertContent(content) {
        const {typeUrl, value} = Any.decode(content)
        return {
            typeUrl,
            content: Buffer.from(value).toString()
        }
    }

    static async getSumitProposer(stargateClient, proposalId) {
        const query = {
            tags: [
                {
                    key: "message.module",
                    value: "governance"
                },
                {
                    key: "submit_proposal.proposal_id",
                    value: proposalId
                },
            ]
        }
        const result = await stargateClient.searchTx(query)
        const rawLog = JSON.parse(result[0].rawLog)[0]
        const {events} = rawLog
        let proposer = ""
        events.forEach(element => {
            if (element.type === "coin_spent") {
                const {attributes} = element
                attributes.forEach(attr => {
                    if (attr.key === "spender") {
                        proposer = attr.value
                        return
                    }
                })
                return
            }
        })
        return proposer
    }
}

