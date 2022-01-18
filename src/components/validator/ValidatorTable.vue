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
            <tr v-for="(validator,index) in validators"
                :key="index">
                <td>
                    <div class="td-acount">
                        <div class="icon">
                            <img :src="validator.imageUrl" style="max-width: 100%;height: auto">
                        </div>
                        <span>{{ validator | getMoniker }}</span>
                    </div>
                </td>
                <td><span class="status"
                        v-if="validator.status===3">Active</span>
                </td>
                <td>{{ validator | getTokens }}</td>
                <td>{{ validator | getRate }}</td>
                <td>{{ getUnbondingBalance(validator.operatorAddress) }}</td>
                <td><a href="javascript:void(0)" @click="delegate(validator.description.moniker)">DELEGATE</a></td>
            </tr>
            <ValidatorNoData :validators="validators" :isStake="isStake" @connectSuccess="connectSuccess"/>
        </tbody>
    </table>
</template>
<script>
import ValidatorNoData from "@/components/validator/ValidatorNoData.vue"
export default {
    components: {
        ValidatorNoData,
    },
    props: {
        validators: Array,
        unbondings: Array,
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
                this.validators.sort(function (a, b) {
                    if(sortField == "commission.commissionRates.rate") {
                        return a.commission.commissionRates.rate - b.commission.commissionRates.rate;
                    } else if(sortField == "description.moniker") {
                        return b.description.moniker === a.description.moniker ? 0 : b.description.moniker < a.description.moniker ? 1 : -1; 
                    } 
                    return a[sortField] - b[sortField];
                });
            } else {
                this.validators.sort(function (a, b) {
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
        getUnbondingBalance(validatorAddress) {
            let balance = 0;
            this.unbondings.forEach(item => {
                if (item.validatorAddress === validatorAddress) {
                    balance = item.entries.reduce((a, b) => parseInt(a.balance) + parseInt(b.balance), 0)
                }
            })
            if(balance == 0) {
                return "No tokens"
            }
            return balance
        }
    }
}
</script>
