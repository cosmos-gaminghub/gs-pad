<template>
    <tr>
        
        <td v-if="validators.length == 0 && isStake && !address" colspan="6">
            <button @click="connectWallet" class="connect-button">Connect</button>
        </td>
        <td v-else-if="validators.length == 0" colspan="6" class="no-data">
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
        connectWallet() {
            try {
                KelprWallet.connectWallet((address) => {
                    this.setAddress(address)
                })
            } catch (err) {
                this.$toast.error(err.message)
            }
        },
    }
}
</script>