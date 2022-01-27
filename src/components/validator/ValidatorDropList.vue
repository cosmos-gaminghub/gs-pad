<template>
    <div class="dropdown">
        <a :class="{'js-link active':dropdown,'js-link':!dropdown}" href="javascript:void(0)" @click="clickDropdown()">
            <ValidatorImage :imageUrl="imageUrl" v-if="imageUrl"/>
            {{ title }}
            <i class="fa fa-angle-down"></i>
        </a>
        <ul class="js-dropdown-list" :style="{display: style}">
            <li>
                <div class="item-stake">
                    <input type="text" v-model="searchValue">
                </div>
            </li>
            <li v-for="(validator,index) in validatorFiltered" :key="index">
                <div class="item-stake"
                        @click="chooseValidator(validator.operatorAddress,validator.description.moniker, validator.imageUrl)">
                    <ValidatorImage :imageUrl="validator.imageUrl"/>
                    <div class="name">{{ validator.description.moniker }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import ValidatorImage from "@/components/validator/ValidatorImage";
export default {
    props: {
        validators: Array
    },
    data() {
        return {
            dropdown: false,
            style: 'none',
            searchValue: '',
            imageUrl: '',
            title: 'Select validator',
        }
    },
    components: {
        ValidatorImage
    },
    computed: {
        validatorFiltered() {
            if(!this.searchValue) {
                return this.validators
            }
            const filter = this.searchValue.toUpperCase();
            return this.validators.filter(x => x.description.moniker.toUpperCase().indexOf(filter) > -1)
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
            this.dropdown = false
            this.style = 'none'
            this.title = title
            this.imageUrl = imageUrl
            this.$emit('chooseValidator', address)
        },
        resetData() {
            console.log("jkghdkjfghj")
            this.style = 'none'
            this.dropdown = false
            this.title = 'Select validator'
            this.imageUrl = ''
        }
    }
}
</script>