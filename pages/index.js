// create and export react component
import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react';

//class based component

class CampaignIndex extends Component {
    //get data without rendering (static)
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => { //call back function
            //object
            return {
                header: address, 
                description: <a>View campaigns</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }

    //react needs some jsx or will throw error.
    render () {
        //call props from getInitialProps
       return 
       <div>
        <link></link>
        {this.renderCampaigns()}
       </div>
    };
};

export default CampaignIndex;
