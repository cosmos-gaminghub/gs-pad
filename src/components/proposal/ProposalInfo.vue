<template>
    <ul class="info-item">
        <li>
            <span class="title">Proposer:</span>
            <span class="info"> {{ proposer }}</span>
        </li>
        <li>
            <span class="title">Submitted on:</span>
            <span class="info">
                {{ submitTime | formatDateTime }}
            </span>
        </li>
        <li>
            <span class="title">Voting Period:</span>
            <span class="info">
                {{ votingStartTime | formatDateTime }} to
                {{ votingEndTime | formatDateTime }}
            </span>
        </li>
    </ul>
</template>
<script>
import moment from "moment";
export default {
    props: {
        proposer: String,
        submitTime: Date,
        votingStartTime: Date,
        votingEndTime: Date
    },
    filters: {
        formatDateTime(dateTime) {
            const a = moment(dateTime, "YYYY.MM.DD HH:mm").format("YYYY-MM-DD HH:mm:ss").toString()
            return a.split(' ').slice(0, 5).join(' ');

        },
    }
}
</script>
