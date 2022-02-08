<template>
    <table class="table table-striped table-bordered table-hover text-center">
        <thead>
            <tr>
                <th @click="handleSort(item)" v-for="(item, index) in tableHeader" v-bind:key="index">
                    {{ item.name }}
                    <div class="sorting_asc" v-if="item.sortable">
                        <i class="fa fa-caret-up" v-if="sort_type == 'asc' && sort_field == item.key" aria-hidden="true"></i>
                        <i class="fa fa-caret-down" v-if="sort_type == 'desc' && sort_field == item.key" aria-hidden="true"></i>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(validator,index) in validatorInTable"
                :key="index">
                <td>
                    <div class="td-acount">
                        <ValidatorImage :imageUrl="validator.imageUrl"/>
                        <a :href="validator | getValidatorLink" target="_blank">{{ validator | getMoniker }}</a>
                    </div>
                </td>
                <td><span class="status"
                        v-if="validator.status===3">Active</span>
                </td>
                <td>{{ validator | getTokens }}</td>
                <td>{{ validator | getRate }}</td>
                <td>{{ validator.token_staked }}</td>
                <td><a href="javascript:void(0)" @click="delegate(validator.description.moniker)">DELEGATE</a></td>
            </tr>
            <ValidatorNoData :validators="validators" :isStake="isStake" @connectSuccess="connectSuccess"/>
        </tbody>
    </table>
</template>
<script>
import ValidatorNoData from "@/components/validator/ValidatorNoData.vue"
import ValidatorImage from "@/components/validator/ValidatorImage";
const DENOM = process.env.VUE_APP_COIN_MINIMAL_DENOM
export default {
    components: {
        ValidatorNoData,
        ValidatorImage
    },
    props: {
        validators: Array,
        delegations: Array,
        isStake: Boolean
    },
    data () {
        return {
            tableHeader:[
                {
                    key: "description.moniker",
                    name: "Validator",
                    sortable: true,
                },
                {
                    key: "status",
                    name: "Status",
                    sortable: false,
                },
                {
                    key: "tokens",
                    name: "Voting Power",
                    sortable: true,
                },
                {
                    key: "commission.commissionRates.rate",
                    name: "Commission",
                    sortable: true,
                },
                {
                    key: "token_staked",
                    name: "Tokens Staked",
                    sortable: false,
                },
                {
                    key: "action",
                    name: "Action",
                    sortable: false,
                },
            ],
            sort_type: "",
            sort_field: "",
        }
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
                let a = (validator.tokens / 10 ** 6).toFixed(2)
                return new Intl.NumberFormat().format(a)
            }
        },
        getRate(validator) {
            if (validator.commission.commissionRates.rate) {
                return ((validator.commission.commissionRates.rate) / 10 ** 18 * 100).toFixed(2) +'%'
            }
        },
        getValidatorLink(validator) {
            const explorerUrl = process.env.VUE_APP_EXPLORER_URL
            return `${explorerUrl}/validators/${validator.operatorAddress}`
        },
    },
    computed: {
        validatorInTable(){
            let array = []
            for(const index in this.validators) {
                let item =  this.validators[index]
                item.token_staked = this.getStakedToken(item.operatorAddress)
                array.push(item)
            }
            array.sort(function (a, b) {
                let aValue = a.token_staked
                let bValue = b.token_staked
                if(bValue == "No tokens") {
                    bValue = 0
                }
                if(aValue == "No tokens") {
                    aValue = 0
                }
                return bValue - aValue;
            });
            return array
        }
    },
    methods: {
        delegate(moniker) {
            this.$emit('showModal', moniker, "modalDelegate",'','')
        },
        connectSuccess() {
            this.$emit('connectSuccess', 1)
        },
        handleSort(item){
            if(!item.sortable){
                return false
            }
            const sortField = item.key
            let sortType = 'desc'
            if(sortField == this.sort_field){
                sortType = this.sort_type == 'desc' ? 'asc' : 'desc'
            }
            this.setSortType(sortType)
            this.setSortField(sortField)
            this.sort()
            return true
        },
        sort () {
            const sortField = this.sort_field
            if(this.sort_type == 'asc'){ 
                this.validatorInTable.sort(function (a, b) {
                    if(sortField == "commission.commissionRates.rate") {
                        return a.commission.commissionRates.rate - b.commission.commissionRates.rate;
                    } else if(sortField == "description.moniker") {
                        return b.description.moniker === a.description.moniker ? 0 : b.description.moniker < a.description.moniker ? 1 : -1; 
                    } 
                    return a[sortField] - b[sortField];
                });
            } else {
                this.validatorInTable.sort(function (a, b) {
                    if(sortField == "commission.commissionRates.rate") {
                        return b.commission.commissionRates.rate - a.commission.commissionRates.rate;
                    } else if(sortField == "description.moniker") {
                        return b.description.moniker === a.description.moniker ? 0 : b.description.moniker < a.description.moniker ? -1 : 1; 
                    } 
                    return b[sortField] - a[sortField];
                });
            }
        },
        setSortField(field){
            this.sort_field = field
        },
        setSortType(type){
            this.sort_type = type
        },
        getStakedToken(validatorAddress) {
            let balance = 0;
            this.delegations.forEach(item => {
                if (item.delegation.validatorAddress === validatorAddress && item.balance.denom === DENOM) {
                    balance += item.balance.amount
                }
            })
            if(balance == 0) {
                return "No tokens"
            }
            return balance / 10**6
        },
    }
}
</script>
