<template>
    <div>
        <div class="col-md-5 float-right" v-if="!address">
            <div class="cnt-btn-wallet"><a href="javascript:void (0)" @click="connectWallet()">CONNECT WALLET</a></div>
        </div>
        <div class="row" v-if="address">
            <div class="col-md-12">
                <div class="cnt-acount-user">
                    <div class="name-acount">
                        <div class="name"></div>
                        <div class="cnt-link-copy">
                            <div class="link">{{ address }}</div>
                            
                        </div>
                        <div class="button-link-logout">
                            <button class="btn btn-copy" @click="doCopy">Copy</button>
                            <div class="content-logout">
                                <button @click="logout">Disconnect</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import {KelprWallet} from "@/utils/connectKeplr";
import {mapState, mapMutations} from "vuex";

export default {
    name: "Login",
    computed: {...mapState("auth", ["address"])},
    mounted() {
        this.getData()
    },
    methods: {
        ...mapMutations("auth", [
            'setAddress'
        ]),
        async connectWallet() {
            try {
                await KelprWallet.connectWallet()
                const address = this.getAddress()
                this.setAddress(address)
            } catch (err) {
                this.$toast.error(err.message)
            }
        },
        getAddress() {
            return localStorage.getItem("address")
        },
        doCopy: function () {
            this.$copyText(this.address).then(() => {
                this.$toast.success('Copied')

            }, () => {
                this.$toast.error('Can not copy')
            })
        },
        getData() {
            const address = localStorage.getItem("address")
            if (address) {
                this.setAddress(address)
            }
        },
        logout() {
            localStorage.removeItem('address')
            this.setAddress('')
        },
    }
}
</script>

<style scoped>

</style>
