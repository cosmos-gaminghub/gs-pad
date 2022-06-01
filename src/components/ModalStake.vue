<template>
    <div class="modal-body">
        <div class="content-stake">
            <div class="title-popup-stake">Stake Tokens</div>
            <div class="form-token">
                <div class="form-group">
                    <ValidatorDropList :validators="validators" @chooseValidator="chooseValidator" ref="validatorDropList"/>
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
                    <div class="text-form"><span class="text">Max Available tokens: </span><span
                        class="number">{{ Number(coin) / 10 ** 6 }}</span></div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote" @click="sendRequest"
                            :disabled="clickSubmit">
                            STAKE
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ValidatorDropList from "./validator/ValidatorDropList";
import {KelprWallet} from "@/utils/connectKeplr";

export default {
    name: "ModalStake",
    components: {
        ValidatorDropList
    },
    data: function () {
        return {
            addressDelegator: '',
            error: '',
            formInvalid: {
                borderColor: ''
            },
            token: '',
            defaultFee: 0.02,
        }
    },
    props: {
        validators: Array,
        coin: String,

    },
    computed: {
        clickSubmit() {
            if (this.error || this.addressDelegator === '' || this.token === '') {
                return true
            }
            return false
        },
    },
    methods: {
        chooseValidator(address) {
            this.addressDelegator = address
        },
        async sendRequest() {
            const loader = this.showLoadling("stakeButton")
            try {
                const keplrWallet = await KelprWallet.getKeplrWallet()
                const delegatorAddress = await KelprWallet.getAddress()
                await keplrWallet.delegateTokens(delegatorAddress, this.addressDelegator, this.token)
                this.$toast.success("Stake success");
                this.$parent.closeModal('modalStake','closeStake')
                await this.$parent.getData();
            } catch (err) {
                this.$toast.error(err.message);
            }
            loader.hide()
        },
        maxAvailable() {
            this.token = Number(this.coin) / 10 ** 6 - this.defaultFee
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
            this.$refs.validatorDropList.resetData()
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
