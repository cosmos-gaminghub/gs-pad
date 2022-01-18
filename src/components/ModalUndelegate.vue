<template>
    <div class="modal-body">
        <div class="content-stake">
            <div class="title-popup-stake">Undelegate Tokens</div>
            <div class="form-token">
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}" href="#"
                                             @click="clickDropdown()">
                        <div class="icon">
                            <img
                                src="https://s3.amazonaws.com/keybase_processed_uploads/ee492dacfab4015625e68c3e0f1da505_360_360.jpg"
                                alt="">
                        </div>
                        {{ title }}<i
                        class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-list" :style="{display: style}">
                            <li v-for="(stakedValidator,index) in stakedValidators" :key="index">
                                <div class="item-stake"
                                     @click="chooseStaked(stakedValidator.operatorAddress,stakedValidator.description.moniker)">
                                    <div class="icon"></div>
                                    <div class="name">{{ stakedValidator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" :style="formInvalid" type="number" v-model="token"
                           placeholder="Enter tokens to Stake" @keyup="checkRequest"/>
                    <span class="error">{{ error }}</span>
                    <div class="text-max" @click="maxToken()"><a href="#" style="color: #00B6ED">Max</a></div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens:</span><span
                        class="number">{{ tokenStaked }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote" @click="sendRequest" :disabled=clickSubmit>UNDELEGATE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const DEMON = process.env.VUE_APP_DENOM
import {KelprWallet} from "@/utils/connectKeplr";

export default {
    name: "ModalUndelegate",
    data: function () {
        return {
            dropdown: false,
            style: 'none',
            token: '',
            tokenStaked: 0,
            addressDelegator: '',
            amount: {
                demon: DEMON,
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
        stakedValidators: Array,
        delegate: Array
    },
    computed: {
        clickSubmit() {
            if (this.error || this.title == 'Select validator' || this.token == '') {
                return true
            }
            return false
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
        maxToken() {
            this.token = this.tokenStaked
        },
        chooseStaked(address, title) {
            this.title = title
            this.addressDelegator = address
            this.delegate.forEach(item => {
                if (item.delegation.validatorAddress === address) {
                    this.tokenStaked = Number(item.balance.amount) / 10 ** 8
                }
            })
            this.dropdown = false
            this.style = 'none'
        },
        async sendRequest() {
            try {
                const delegatorAddress = await KelprWallet.getAddress()
                const kelprWallet = await KelprWallet.getKeplrWallet()
                await kelprWallet.unDelegateTokens(delegatorAddress, this.addressDelegator, this.amount)
                this.$toast.success("Undelegate success");
            } catch (err) {
                this.$toast.error(err.message);
            }
        },
        checkRequest() {
            if (Number(this.token) > Number(this.tokenStaked)) {
                this.error = 'Invalid Amount'
                this.formInvalid.borderColor = 'red'
            } else {
                this.error = ''
                this.formInvalid.borderColor = ''
            }
        },
        closeModal() {
            this.token = ''
            this.title = 'Select validator'
            this.error = ''
            this.formInvalid.borderColor = ''
            this.dropdown = false
            this.style = 'none'
        }
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
::placeholder {
    color: #C0B1B1B8 !important;
}
</style>
