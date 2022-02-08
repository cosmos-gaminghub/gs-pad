<template>
    <div class="modal-body">
        <div class="content-stake" ref="stakeModalBody">
            <div class="title-popup-stake">Redelegate Tokens</div>
            <div class="form-token">
                <div class="form-group">
                    <ValidatorDropList :validators="stakedValidators" @chooseValidator="setSrcAddress" ref="srcValidatorDropList"/>
                </div>
                <div class="form-group">
                    <ValidatorDropList :validators="validators" @chooseValidator="setDstAddress" ref="dstValidatorDropList"/>
                </div>
                <div class="form-group">
                    <input class="form-control" :style="formInvalid" type="number" v-model="token"
                           placeholder="Enter tokens to Stake" @keyup="checkRequest"/>
                    <span class="error">{{ error }}</span>
                    <div class="text-max" @click="maxToken">Max</div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens: </span><span
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
import ValidatorDropList from "./validator/ValidatorDropList";

export default {
    name: "ModalRelegate",
    components: {
        ValidatorDropList
    },
    data: function () {
        return {
            tokenStaked: 0,
            token: '',
            dstValidatorAddress: '',
            srcValidatorAddress: '',
            error: '',
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
            if (this.error || this.token == '') {
                return true
            }
            return false
        }
    },
    methods: {
        setDstAddress(address) {
            this.dstValidatorAddress = address
        },
        setSrcAddress(address) {
            this.srcValidatorAddress = address
            this.delegate.forEach(item => {
                if (item.delegation.validatorAddress === address) {
                    this.tokenStaked = Number(item.balance.amount) / 10 ** 6
                }
            })
        },
        maxToken() {
            this.token = this.tokenStaked
        },
        async sendData() {
            const loader = this.showLoading("stakeModalBody")
            try {
                const keplrWallet = await KelprWallet.getKeplrWallet()
                const delegatorAddress = await KelprWallet.getAddress()
                await keplrWallet.redelegateTokens(delegatorAddress, this.srcValidatorAddress, this.dstValidatorAddress, this.token)
                this.$toast.success("Redelegate success");
                this.$parent.closeModal('modalReDelegate','closeRelegate')
                await this.$parent.getData();
            } catch (err) {
                this.$toast.error(err.message);
            }
            this.hideLoading(loader)
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
            this.error = ''
            this.formInvalid.borderColor = ''
            this.$refs.srcValidatorDropList.resetData()
            this.$refs.dstValidatorDropList.resetData()
        },
        showLoading(refName) {
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
