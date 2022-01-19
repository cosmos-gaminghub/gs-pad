<template>
    <div class="modal-body">
        <div class="content-stake">
            <div class="title-popup-stake">Redelegate Tokens</div>
            <div class="form-token">
                <div class="form-group">
                    <div class="dropdown">
                        <a :class="{'js-link active':srcRef.dropdown,'js-link':!srcRef.dropdown}" href="#" @click="clickDropdown('srcRef')">
                            <ValidatorImage :imageUrl="srcImageUrl" v-if="srcImageUrl"/>
                            {{ titleStakedValidator }}
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="js-dropdown-list" ref="srcRef" :style="{display: srcRef.style}">
                            <li v-for="(stakedValidator,index) in stakedValidators" :key="index">
                                <div class="item-stake"
                                     @click="chooseStaked(stakedValidator.operatorAddress,stakedValidator.description.moniker, 'srcRef', stakedValidator.imageUrl)">
                                     <ValidatorImage :imageUrl="stakedValidator.imageUrl"/>
                                    <div class="name">{{ stakedValidator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <div class="dropdown">
                        <a :class="{'js-link active':dstRef.dropdown,'js-link':!dstRef.dropdown}" href="#" @click="clickDropdown('dstRef')">
                            <ValidatorImage :imageUrl="dstImageUrl" v-if="dstImageUrl"/>
                            {{ titleValidator }}
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="js-dropdown-lists" :style="{display: dstRef.style}">
                            <li v-for="(validator,index) in validators" :key="index">
                                <div class="item-stake"
                                     @click="chooseValidator(validator.operatorAddress,validator.description.moniker, 'dstRef', validator.imageUrl)">
                                    <ValidatorImage :imageUrl="validator.imageUrl"/>
                                    <div class="name">{{ validator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" :style="formInvalid" type="number" v-model="token"
                           placeholder="Enter tokens to Stake" @keyup="checkRequest"/>
                    <span class="error">{{ error }}</span>
                    <div class="text-max" @click="maxToken">Max</div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens:</span><span
                        class="number">{{ Number(tokenStaked) }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote" @click="sendData()" :disabled="clickSubmit">REDELEGATE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {KelprWallet} from "../utils/connectKeplr";
import ValidatorImage from "./validator/ValidatorImage";

export default {
    name: "ModalRelegate",
    components: {ValidatorImage},
    data: function () {
        return {
            dropdown: false,
            dropdown2: false,
            style: 'none',
            style2: 'none',
            tokenStaked: 0,
            token: '',
            dstValidatorAddress: '',
            srcValidatorAddress: '',
            dstImageUrl: '',
            srcImageUrl: '',
            titleStakedValidator: 'Select validator from',
            titleValidator: 'Select validator to',
            dstRef: {
                style: 'none',
                dropdown: false
            },
            srcRef: {
                style: 'none',
                dropdown: false
            }, error: '',
            formInvalid: {
                borderColor: ''
            }
        }
    },
    props: {
        stakedValidators: Array,
        validators: Array,
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
        clickDropdown(ref) {
            if (this[ref].dropdown === true) {
                this.hideDropDown(ref)
            } else {
                this.showDropDown(ref)
            }
        },
        chooseStaked(address, title, ref, imageUrl) {
            this.titleStakedValidator = title
            this.srcValidatorAddress = address
            this.srcImageUrl = imageUrl
            this.delegate.forEach(item => {
                if (item.delegation.validatorAddress === address) {
                    this.tokenStaked = Number(item.balance.amount) / 10 ** 8
                }
            })
            this.hideDropDown(ref)
        },
        maxToken() {
            this.token = this.tokenStaked
        },
        chooseValidator(address, title, ref, imageUrl) {
            this.titleValidator = title
            this.dstValidatorAddress = address
            this.dstImageUrl = imageUrl
            this.hideDropDown(ref)
        },
        hideDropDown(ref) {
            this[ref].dropdown = false
            this[ref].style = 'none'
        },
        showDropDown(ref) {
            this[ref].style = 'block'
            this[ref].dropdown = true
        },
        async sendData() {
            try {
                const keplrWallet = await KelprWallet.getKeplrWallet()
                const delegatorAddress = await KelprWallet.getAddress()
                await keplrWallet.redelegateTokens(delegatorAddress, this.srcValidatorAddress, this.dstValidatorAddress, this.token)
                this.$toast.success("Redelegate success");
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
            this.titleStakedValidator = 'Select validator from'
            this.titleValidator = 'Select validator to'
            this.error = ''
            this.formInvalid.borderColor = ''
            this.hideDropDown('srcRef')
            this.hideDropDown('dstRef')
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
::placeholder {
    color: #C0B1B1B8 !important;
}
</style>
