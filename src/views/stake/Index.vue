<template>
    <div class="content-wallet">
        <Login/>
        <div class="content-validate-detail">
            <div class="row">
                <div class="col-md-12">
                    <div class="cnt-wallet-left">
                        <div class="cnt-validator">
                            <div class="title-vali">
                                <div class="title title-tab">
                                    <ul>
                                        <li :class="activeClass('allValidators')"><a href="javascript:void(0)"
                                                                                     @click="setActiveTab('allValidators')">All
                                            Validators</a></li>
                                        <li :class="activeClass('stakedValidators')"><a href="javascript:void(0)"
                                                                                        @click="setActiveTab('stakedValidators')">Staked
                                            Validators</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="content-tab-vali">
                                <div class="content-tab" id="allvali"
                                     v-show="activeClass('allValidators') === 'active'">
                                    <div class="content-detail">
                                        <div class="cos-table-list">
                                            <div class="table-responsive" ref="validatorTable">
                                                <ValidatorTable :delegations="delegations" :validators="allValidators" @showModal="showModal" :isStake="false"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-tab" id="staked"
                                     v-show="activeClass('stakedValidators') === 'active'">
                                    <div class="content-detail">
                                        <div class="cos-table-list">
                                            <div class="table-responsive">
                                                <ValidatorTable :delegations="delegations" :validators="stakedValidators" @showModal="showModal" :isStake="true"/>
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
        <div class="modal modal-dialog-centered fade popup_customer" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalDelegate" id="popupStakeTokens">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true" aria-label="Close"
                                @click="closeModal('modalDelegate','closeDelegate')">
                            <span aria-hidden="true" class="icon-close-modal"></span></button>
                    </div>
                    <ModalDelegate :validators="allValidators" :coin="coin" :titleDelegate="titleDelegate" ref="closeDelegate"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Login from "@/components/login/Login";
import {WalletHelper} from "@/utils/wallet";
import ValidatorTable from "@/components/validator/ValidatorTable.vue"
import ModalDelegate from "@/components/ModalDelegate.vue";
import { mapMutations, mapState } from "vuex";

const DENOM = process.env.VUE_APP_COIN_MINIMAL_DENOM
export default {
    name: "stake",
    components: {
        Login,
        ValidatorTable,
        ModalDelegate
    },
    data: function () {
        return {
            allValidators: [],
            delegations: [],
            activeTab: "allValidators",
            stakedValidators: [],
            wallet: '',
            titleDelegate: '',
            coin: '0',
            isLoadingValidator: true
        }
    },
    watch: {
        isLoadingValidator: function(value) {
            if(!value) {
                this.getValidatorImage(0, this.allValidators, "allValidators")
            }
        }
    },
    async mounted() {
        await this.getWallet()
        await this.getData()
        this.$store.subscribe(mutation => {
            if (mutation.type === 'auth/setAddress') {
                this.getData()
            }
        })
    },
    computed: {
        ...mapState('auth', ["address"])
    },
    methods: {
        ...mapMutations("modal", ["setIsOpen"]),
        setActiveTab(tabId) {
            this.activeTab = tabId
        },
        activeClass(tabId) {
            if (tabId === this.activeTab) {
                return 'active'
            }
            return ''
        },
        async getData() {
            await this.getAllValidators()
            await this.stakeds()
            await this.getDelegation()
            await this.getBalances()
        },
        async getWallet() {
            try {
                this.wallet = await WalletHelper.connect()
            } catch (err) {
                this.$toast.error(err.message);
            }
        },
        async getAllValidators(paginationKey = [], showLoadling = true) {
            let loader = null
            if(showLoadling) {
                loader = this.showLoadling("validatorTable")
            }
            
            try {
                await this.wallet.getValidators("BOND_STATUS_BONDED", paginationKey).then(res => {
                    this.allValidators = this.allValidators.concat(res.validators)
                    if(res.validators.length == 100) {
                        this.getAllValidators(res.pagination.nextKey, false)
                    } else {
                        this.isLoadingValidator = false
                    }
                })
            } catch (err) {
                this.$toast.error(err.message)
            }

            if(showLoadling){
                this.hideLoading(loader)
            }
        },
        async getValidatorImage(index, validators, property) {
            const array = [];
            for (let i = 0; i < 3; i++) {
                if (validators[index + i]) {
                    const value = validators[index + i];
                    if (value && value.description && value.description.identity) {
                        array.push(this.getKeyBaseImage(value.description.identity, property, index + i));
                    }
                } else {
                    break;
                }
            }
            Promise.all(array).then(() => {
                if (index + 3 <= validators.length - 1) {
                    this.getValidatorImage(index + 3, validators, property);
                }
            });
        },
        async getKeyBaseImage (identity, property, index) {
            const response = await this.axios.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`)
            this.$set(this[property][index], 'imageUrl', response.data.them[0].pictures.primary.url)
        },
        async stakeds() {
            if(this.address){
                const res = await this.wallet.getStakedValidators(this.address)
                this.stakedValidators = res.validators
            }
        },
        async getDelegation() {
            if (this.address) {
                const response = await this.wallet.getDelegation(this.address)
                this.delegations = response.delegationResponses
            }
        },
        showModal(title, refName) {
            if (this.address == '') {
                this.$toast.error('Account not connected. Please connect to wallet')
                return
            }
            if(refName == 'modalDelegate') {
                this.titleDelegate = title
            }
            this.$refs[refName].classList.toggle("in")
            document.body.classList.toggle("modal-open")
            this.$refs[refName].style.display = "block"
            this.setIsOpen(true)
        },
        closeModal(refName,closeRefName) {
            if (refName == 'modalDelegate') {
                this.titleDelegate = ''
            }
            this.$refs[closeRefName].closeModal()
            this.$refs[refName].classList.toggle("in")
            document.body.classList.toggle("modal-open")
            this.$refs[refName].style.display = "none"
            this.setIsOpen(false)
        },
        async getBalances() {
            if(this.address) {
                const balances = await this.wallet.getBalances(this.address)
                balances.forEach(item => {
                    if (item.denom === DENOM) {
                        this.coin = item.amount
                    }
                })
            }
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
        }
    }
}
</script>

<style scoped>

</style>
