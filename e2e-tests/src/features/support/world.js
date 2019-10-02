const { setWorldConstructor } = require("cucumber");

class CustomWorld {

    constructor({attach, parameters}) {
        this.attach = attach;
        this.parameters = parameters
        this.uniqueId = new Date().valueOf();
        this.proposal = {};
        this.slate = {};
    }

    setProposal(proposalObject) {
        const proposal = this.proposal;
        console.log(`Setting the proposal: \n ${JSON.stringify(proposalObject)}`);
        if (typeof proposalObject.firstname !== 'undefined') {
            proposal.firstname = proposalObject.firstname;
        }
        if (typeof proposalObject.email !== 'undefined') {
            proposal.email = proposalObject.email;
        }
        if (typeof proposalObject.projectName !== 'undefined') {
            proposal.projectName = proposalObject.projectName;
        }
        if (typeof proposalObject.projectSummary !== 'undefined') {
            proposal.projectSummary = proposalObject.projectSummary;
        }
        if (typeof proposalObject.tokensRequested !== 'undefined') {
            proposal.tokensRequested = proposalObject.tokensRequested;
        }
        if (typeof proposalObject.awardAddress !== 'undefined') {
            proposal.awardAddress = proposalObject.awardAddress;
        }
        this.proposal = proposal;
    }

    getProposal() {
        const proposal = this.proposal;
        console.log('Getting the proposal: \n' + JSON.stringify(proposal));
        return proposal;
    }

    setSlate(slateObject) {
        const slate = this.slate;
        console.log(`Setting the slate: \n ${JSON.stringify(slateObject)}`);
        if (typeof slateObject.email !== 'undefined') {
            slate.email = slateObject.email;
        }
        if (typeof slateObject.firstname !== 'undefined') {
            slate.firstname = slateObject.firstname;
        }
        if (typeof slateObject.description !== 'undefined') {
            slate.description = slateObject.description;
        }
        this.slate = slate;
    }

    getSlate() {
        const slate = this.slate;
        console.log('Getting the slate: \n' + JSON.stringify(slate));
        return slate;
    }
};

setWorldConstructor(CustomWorld);
