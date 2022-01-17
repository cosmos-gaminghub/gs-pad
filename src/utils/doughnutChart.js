import { Doughnut, mixins } from "vue-chartjs";
export default {
    extends: Doughnut,
    props: ["data", "chartData", "options"],
    mixins: [mixins.reactiveProp],
    watch: {
        data () {
          this.renderChart(this.data, this.options)
        }
    },
    mounted() {
        this.renderChart(this.data, this.options)
    }
};
