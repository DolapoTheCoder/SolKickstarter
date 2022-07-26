// create and export react component

import React, { Component } from 'react';
import factory from '../ethereum/factory';

//class based component

class CampaignIndex extends Component {
    //Allows execution of React code during DOM
    async componentDidMount() {
        //list of campaigns
        const campaign = await factory.methods.getDeployedCampaigns().call();
        console.log(campaign);
    };

//react needs some jsx or will throw error.
    render () {
        <div>Campaign Index</div>
    }
};

export default CampaignIndex;
