export const proposalStatusObject = {
    0 : {
        name: 'UNSPECIFIED',
        style: '#0000FFF9',
        color: 'black'
    },
    1: {
        name: 'DEPOSIT PERIOD',
        style: '#0000FFF9',
        color: 'black'
    },
    2: {
        name: 'VOTING PERIOD',
        style: '#0000FFF9',
        color: 'white'
    },
    3: {
        name: 'PASSED',
        style: '#8DFF2FFF',
        color: 'black'
    },
    4: {
        name: 'REJECTED',
        style: '#FF0044D8',
        color: 'white'
    },
    5: {
        name: 'FAILED',
        style: '#0000FFF9',
        color: 'black'
    },
    "-1": {
        name: '',
        style: ''
    }
}
export const ProposalStatus = {
    /** PROPOSAL_STATUS_UNSPECIFIED - PROPOSAL_STATUS_UNSPECIFIED defines the default propopsal status. */
    PROPOSAL_STATUS_UNSPECIFIED: 0,
    /**
     * PROPOSAL_STATUS_DEPOSIT_PERIOD - PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
     * period.
     */
    PROPOSAL_STATUS_DEPOSIT_PERIOD: 1,
    /**
     * PROPOSAL_STATUS_VOTING_PERIOD - PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
     * period.
     */
    PROPOSAL_STATUS_VOTING_PERIOD: 2,
    /**
     * PROPOSAL_STATUS_PASSED - PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
     * passed.
     */
    PROPOSAL_STATUS_PASSED: 3,
    /**
     * PROPOSAL_STATUS_REJECTED - PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
     * been rejected.
     */
    PROPOSAL_STATUS_REJECTED: 4,
    /**
     * PROPOSAL_STATUS_FAILED - PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
     * failed.
     */
    PROPOSAL_STATUS_FAILED: 5,
    UNRECOGNIZED: -1
}

export const VoteOption = {
    /** VOTE_OPTION_UNSPECIFIED - VOTE_OPTION_UNSPECIFIED defines a no-op vote option. */
    VOTE_OPTION_UNSPECIFIED: 0,
    /** VOTE_OPTION_YES - VOTE_OPTION_YES defines a yes vote option. */
    VOTE_OPTION_YES: 1,
    /** VOTE_OPTION_ABSTAIN - VOTE_OPTION_ABSTAIN defines an abstain vote option. */
    VOTE_OPTION_ABSTAIN: 2,
    /** VOTE_OPTION_NO - VOTE_OPTION_NO defines a no vote option. */
    VOTE_OPTION_NO: 3,
    /** VOTE_OPTION_NO_WITH_VETO - VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. */
    VOTE_OPTION_NO_WITH_VETO: 4,
    UNRECOGNIZED: -1
}
