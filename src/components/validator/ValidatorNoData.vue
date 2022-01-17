<template>
    <tr>
        
        <td v-if="validators.length == 0 && isStake && !address" colspan="6" style="text-align: center;">
            <button class="" @click="connectWallet">Connect</button>
        </td>
        <td v-else-if="validators.length == 0" colspan="6" style="text-align: center;">
            No data found
        </td>
    </tr>
</template>

<script>
import {KelprWallet} from "@/utils/connectKeplr";
import { mapState, mapMutations } from "vuex";
export default {
    props: {
        validators: {
            type: Array,
            default () {
                return []
            }
        },
        isStake: Boolean
    },
    computed: { ...mapState("auth", ["address"]) },
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
    }
}
</script>