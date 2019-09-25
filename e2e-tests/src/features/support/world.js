const { setWorldConstructor } = require("cucumber");

class CustomWorld {

    constructor({attach, parameters}) {
        this.attach = attach;
        this.parameters = parameters
        this.uniqueId = new Date().valueOf();
        this.proposal = {};
    }
  
    setProposalInfo(proposalObject) {
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

    getProposalInfo() {
        const proposal = this.proposal;
        console.log('Getting the proposal: \n' + JSON.stringify(proposal));
        return proposal;
    }

};

setWorldConstructor(CustomWorld);
