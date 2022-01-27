<template>
    <div class="modal-body">
        <div class="content-stake" ref="undelegateModalBody">
            <div class="title-popup-stake">Undelegate Tokens</div>
            <div class="form-token">
                <div class="form-group">
                    <ValidatorDropList :validators="stakedValidators" @chooseValidator="setAddress" ref="validatorDropList"/>
                </div>
                <div class="form-group">
                    <input class="form-control" :style="formInvalid" type="number" v-model="token"
                           placeholder="Enter tokens to Stake" @keyup="checkRequest"/>
                    <span class="error">{{ error }}</span>
                    <div class="text-max" @click="maxToken()"><a href="#" style="color: #00B6ED">Max</a></div>
                </div>
                <div class="form-group">
                    <div class="text-form"><span class="text">Max Available tokens: </span><span
                        class="number">{{ tokenStaked }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-vote" @click="sendRequest" :disabled="clickSubmit">UNDELEGATE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ValidatorDropList from "./validator/ValidatorDropList";
import {KelprWallet} from "@/utils/connectKeplr";

export default {
    name: "ModalUndelegate",
    components: {
        ValidatorDropList
    },
    data: function () {
        return {
            dropdown: false,
            style: 'none',
            token: '',
            tokenStaked: 0,
            addressDelegator: '',
            title: 'Select validator',
            error: '',
            formInvalid: {
                borderColor: ''
            },
            imageUrl:""
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
        setAddress(address) {
            this.addressDelegator = address
            this.delegate.forEach(item => {
                if (item.delegation.validatorAddress === address) {
                    this.tokenStaked = Number(item.balance.amount) / 10 ** 6
                }
            })
        },
        maxToken() {
            this.token = this.tokenStaked
        },
        async sendRequest() {
            const loader = this.showLoadling("undelegateModalBody")
            try {
                const delegatorAddress = await KelprWallet.getAddress()
                const kelprWallet = await KelprWallet.getKeplrWallet()
                await kelprWallet.unDelegateTokens(delegatorAddress, this.addressDelegator, this.token)
                this.$toast.success("Undelegate success");
                this.$parent.closeModal('modalUnDelegate','closeUnDelegate')
                await this.$parent.getData();
            } catch (err) {
                this.$toast.error(err.message);
            }
            loader.hide()
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
