import {
    SigningStargateClient, assertIsBroadcastTxSuccess, coins
} from "@cosmjs/stargate";
const chainId = process.env.VUE_APP_CHAIN_ID;
const coinDenom = process.env.VUE_APP_DENOM;
const coinMinimalDenom = process.env.VUE_APP_COIN_MINIMAL_DENOM;
const prefix = process.env.VUE_APP_PREFIX;

export class KelprWallet {
    constructor(client = null) {
        this.client = client
    }

    static async connectWallet() {
        if (!window.getOfflineSigner || !window.keplr) {
            throw new Error("Please install keplr extension")
        } else {
            if (window.keplr.experimentalSuggestChain) {
                try {
                    await window.keplr.experimentalSuggestChain({
                        chainId: chainId,
                        chainName: 'Nibiru Testnet',
                        rpc: process.env.VUE_APP_END_POINT,
                        rest: process.env.VUE_APP_REST,
                        bip44: {
                            coinType: 529,
                        },
                        coinType: 529,
                        stakeCurrency: {
                            coinDenom: coinDenom,
                            coinMinimalDenom: coinMinimalDenom,
                            coinDecimals: 6,
                        },
                        bech32Config: {
                            bech32PrefixAccAddr: prefix,
                            bech32PrefixAccPub: `${prefix}pub`,
                            bech32PrefixValAddr: `${prefix}valoper`,
                            bech32PrefixValPub: `${prefix}valoperpub`,
                            bech32PrefixConsAddr: `${prefix}valcons`,
                            bech32PrefixConsPub: `${prefix}valconspub`,
                        },
                        currencies: [
                            {
                                coinDenom: coinDenom,
                                coinMinimalDenom: coinMinimalDenom,
                                coinDecimals: 6,
                            },
                        ],
                        feeCurrencies: [
                            {
                                coinDenom: coinDenom,
                                coinMinimalDenom: coinMinimalDenom,
                                coinDecimals: 6,
                            },
                        ],
                        gasPriceStep: {
                            low: 0.1,
                            average: 0.25,
                            high: 0.4,
                        },
                        features: ['secretwasm'],
                    });
                    await window.keplr.enable(chainId);

                    // @ts-ignore
                    const keplrOfflineSigner = window.getOfflineSigner(chainId);
                    const accounts = await keplrOfflineSigner.getAccounts();

                    const address = accounts[0].address;
                    KelprWallet.setAddress(address);
                } catch (error) {
                    throw new Error(error.message)
                }
            } else {
                throw new Error("Please use the recent version of keplr extension")
            }
        }
    }

    static async getKeplrWallet() {
        const keplrOfflineSigner = window.getOfflineSigner(chainId);
        const client = await SigningStargateClient.connectWithSigner(
            process.env.VUE_APP_END_POINT,
            keplrOfflineSigner,
        );
        return new KelprWallet(client)
    }

    getClient() {
        return this.client
    }

    getFee() {
        return {
            amount: coins(0, coinMinimalDenom),
            gas: "100000",
        };
    }

    static setAddress(address) {
        return localStorage.setItem("address", address);
    }

    static async getAddress() {
        const address = localStorage.getItem("address", "");
        if(!address) {
            await KelprWallet.connectWallet()
        }
        return localStorage.getItem("address", "");
    }

    async delegateTokens(delegatorAddress, validatorAddress, amount, memo = "") {
        const fee = this.getFee()
        const result =  this.getClient().delegateTokens(delegatorAddress, validatorAddress, amount, fee, memo)
        assertIsBroadcastTxSuccess(result);
    }

    async unDelegateTokens(delegatorAddress, validatorAddress, amount, memo = "") {
        const fee = this.getFee()
        const result =  await this.getClient().undelegateTokens(delegatorAddress, validatorAddress, amount, fee, memo)
        assertIsBroadcastTxSuccess(result);
    }

    async redelegateTokens(delegatorAddress, srcValidatorAddress, dstValidatorAddress, amount){
        const msg = {
            delegatorAddress: delegatorAddress,
            validatorSrcAddress: srcValidatorAddress,
            validatorDstAddress: dstValidatorAddress,
            amount: amount
        };
        const msgAny = {
            typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
            value: msg,
        };

        const fee = this.getFee()
        const memo = "Redelegate";
        const result = await this.getClient().signAndBroadcast(delegatorAddress, [msgAny], fee, memo);
        assertIsBroadcastTxSuccess(result);
    }

    async vote(voter, proposalId, option){
        const msg = {
            proposalId,
            voter,
            option
        };
        const msgAny = {
            typeUrl: "/cosmos.gov.v1beta1.MsgVote",
            value: msg,
        };

        const fee = this.getFee()
        const memo = "Voting";
        const result = await this.getClient().signAndBroadcast(voter, [msgAny], fee, memo);
        assertIsBroadcastTxSuccess(result);
    }

    async claimRewards (delegatorAddress, validatorAddress) {
        const fee = this.getFee()
        const memo = "Claim Reward";
        const result =  await this.getClient().withdrawRewards(delegatorAddress, validatorAddress, fee, memo)
        assertIsBroadcastTxSuccess(result);
    }
}

