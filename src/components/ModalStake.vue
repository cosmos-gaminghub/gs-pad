<template>
    <div class="modal-body">
        <div class="content-stake">
            <div class="title-popup-stake">Stake Tokens</div>
            <div class="form-token">
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}"
                                             href="#" @click="clickDropdown()">{{ title }}<i
                        class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-list" :style="{display: style}">
                            <li v-for="(validator,index) in validators" :key="index">
                                <div class="item-stake"
                                     @click="chooseValidator(validator.operatorAddress,validator.description.moniker)">
                                    <div class="icon"></div>
                                    <div class="name">{{ validator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-number">
                        <input class="form-control" type="number" :style="formInvalid"
                               placeholder="Enter tokens to Stake"
                               v-model="token" @keyup="checkRequest"/>

                    </div>
                    <span class="error">{{ error }}</span>
                    <div class="text-max" @click="maxAvailable">Max</div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens:</span><span
                        class="number">{{ Number(coin) / 10 ** 6 }}</span></div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote" @click="sendRequest"
                            :disabled=clickSubmit>STAKE
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const DENOM = process.env.VUE_APP_COIN_MINIMAL_DENOM
import {KelprWallet} from "@/utils/connectKeplr";

export default {
    name: "ModalStake",
    data: function () {
        return {
            dropdown: false,
            style: 'none',
            addressDelegator: '',
            token: '',
            amount: {
                denom: DENOM,
                amount: this.token
            },
            title: 'Select validator',
            error: '',
            formInvalid: {
                borderColor: ''
            }
        }
    },
    props: {
        validators: Array,
        coin: String
    },
    computed: {
        clickSubmit() {
            if (this.error || this.title === 'Select validator' || this.token === '') {
                return 'disabled'
            }
            return ''
        }
    },
    methods: {
        clickDropdown() {
            if (this.dropdown === true) {
                this.style = 'none'
                this.dropdown = false
            } else {
                this.style = 'block'
                this.dropdown = true
            }
        },
        chooseValidator(address, title) {
            this.addressDelegator = address
            this.dropdown = false
            this.style = 'none'
            this.title = title
        },
        async sendRequest() {
            try {
                const keplrWallet = await KelprWallet.getKeplrWallet()
                const delegatorAddress = await KelprWallet.getAddress()
                await keplrWallet.delegateTokens(delegatorAddress, this.addressDelegator, this.amount)
                this.$toast.success("Stake success");
            } catch (err) {
                this.$toast.error(err.message);
            }
        },
        maxAvailable() {
            this.token = this.coin
        },
        checkRequest() {
            if (Number(this.token) > Number(this.coin)) {
                this.error = 'Invalid Amount'
                this.formInvalid.borderColor = 'red'
            } else {
                this.error = ''
                this.formInvalid.borderColor = ''
            }
        },

    }
}
</script>

<style scoped>
input[type='number'] {
    -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

</style>
