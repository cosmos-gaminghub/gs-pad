<template>
    <div class="modal-body">
        <div class="content-stake" ref="delegateModalBody">
            <div class="title-popup-stake">Delegate Tokens</div>
            <div class="form-token">
                <div class="form-group">
                    <div class="dropdown"><a :class="{'js-link active':dropdown,'js-link':!dropdown}"
                                             href="#" @click="clickDropdown()">
                        <ValidatorImage :imageUrl="imageUrl" v-if="imageUrl"/>
                        {{ titleOption }}<i
                        class="fa fa-angle-down"></i></a>
                        <ul class="js-dropdown-list" :style="{display: style}">
                            <li v-for="(validator,index) in validators" :key="index">
                                <div class="item-stake"
                                     @click="chooseValidator(validator.operatorAddress,validator.description.moniker, validator.imageUrl)">
                                    <ValidatorImage :imageUrl="validator.imageUrl" ref="resetValidator"/>
                                    <div class="name">{{ validator.description.moniker }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" type="number" :style="formInvalid" placeholder="Enter tokens to Stake"
                           v-model="token" @keyup="checkRequest"/>
                    <span class="error">{{ error }}</span>
                    <div class="text-max" @click="maxAvailable">Max</div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens:</span><span
                        class="number">{{ Number(coin) / 10 ** 6 }}</span></div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote" @click="sendRequest" :disabled="clickSubmit">STAKE</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ValidatorImage from "./validator/ValidatorImage";
import {KelprWallet} from "@/utils/connectKeplr";

export default {
    name: "ModalDelegate",
    components: {ValidatorImage},
    data: function () {
        return {
            dropdown: false,
            style: 'none',
            addressDelegator: '',
            token: '',
            title: 'Select validator',
            error: '',
            formInvalid: {
                borderColor: ''
            },
            imageUrl: '',
            titleOption: ''
        }
    },
    props: {
        validators: Array,
        coin: String,
        titleDelegate: String,
    },
    computed: {
        clickSubmit() {
            if (this.error || this.token === '') {
                return true
            }
            return false
        }
    },
    watch: {
        "titleDelegate": function (value) {
            this.titleOption = value
            this.validators.forEach(item => {
                if(item.description.moniker == value) {
                    this.addressDelegator = item.operatorAddress
                    this.imageUrl = item.imageUrl
                }
            })
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
        chooseValidator(address, title, imageUrl) {
            this.addressDelegator = address
            this.dropdown = false
            this.style = 'none'
            this.titleOption = title
            this.imageUrl = imageUrl
        },
        async sendRequest() {
            const loader = this.showLoadling("delegateModalBody")
            try {
                const keplrWallet = await KelprWallet.getKeplrWallet()
                const delegatorAddress = await KelprWallet.getAddress()
                await keplrWallet.delegateTokens(delegatorAddress, this.addressDelegator, this.token)
                this.$toast.success('Delegate success')
                this.$parent.closeModal('modalDelegate','closeDelegate')
                await this.$parent.getData();
            } catch (err) {
                this.$toast.error(err.message);
            }
            this.hideLoading(loader)
        },
        maxAvailable() {
            this.token = Number(this.coin) / 10 ** 6
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
        closeModal() {
            this.token = ''
            this.error = ''
            this.formInvalid.borderColor = ''
            this.dropdown = false
            this.style = 'none'
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
