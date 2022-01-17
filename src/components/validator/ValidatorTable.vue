<template>
    <table class="table table-striped table-bordered table-hover text-center">
        <thead>
            <tr>
                <th>Validator</th>
                <th>Status</th>
                <th>Voting Power</th>
                <th>Commission</th>
                <th>Tokens Staked</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(validator,index) in validators"
                :key="index">
                <td>
                    <div class="td-acount">
                        <ValidatorImage :identity="validator.description.identity" />
                        <span>{{ validator | getMoniker }}</span>
                    </div>
                </td>
                <td><span class="status"
                        v-if="validator.status===3">Active</span>
                </td>
                <td>{{ validator | getTokens }}</td>
                <td>{{ validator | getRate }}</td>
                <td>no tokens</td>
                <td><a href="javascript:void(0)" @click="delegate(validator.description.moniker)">DELEGATE</a></td>
            </tr>
            <ValidatorNoData :validators="validators" :isStake="isStake" @connectSuccess="connectSuccess"/>
        </tbody>
    </table>
</template>
<script>
import ValidatorNoData from "@/components/validator/ValidatorNoData.vue"
import ValidatorImage from "@/components/validator/ValidatorImage.vue"
export default {
    components: {
        ValidatorNoData,
        ValidatorImage
    },
    props: {
        validators: Array,
        isStake: Boolean
    },
    filters: {
        getMoniker(validator) {
            if (validator.description) {
                return validator.description.moniker
            }
            return ''
        },
        getTokens(validator) {
            if (validator.tokens) {
                let a = (validator.tokens / 10 ** 6).toFixed(1)
                return new Intl.NumberFormat().format(a) + '0'
            }
        },
        getRate(validator) {
            if (validator.commission.commissionRates.rate) {
                return ((validator.commission.commissionRates.rate) / 10 ** 18 * 100).toFixed(2) +'%'
            }
        },
    },
    methods: {
        delegate(moniker) {
            this.$emit('showModal', moniker, "modalDelegate")
        },
        connectSuccess() {
            this.$emit('connectSuccess', 1)
        },
    }
}
</script>