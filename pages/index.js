// create and export react component
import React, { Component } from 'react';
import factory from '../ethereum/factory';

//class based component

class CampaignIndex extends Component {
    //get data without rendering (static)
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

//react needs some jsx or will throw error.
    render () {
        //call props from getInitialProps
       return <div>{this.props.campaigns[0]}</div>
    };
};

export default CampaignIndex;
