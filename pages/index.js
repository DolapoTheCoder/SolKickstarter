// create and export react component
import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

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
    };

    //react needs some jsx or will throw error.
    render () {
        //call props from getInitialProps
       return (
        <Layout>
       <div>
            <link
                async
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
            <h3>Open Campaigns</h3>
            <Button content="Create campaign" icon="add circle" />
            {this.renderCampaigns()}
       </div>
       </Layout>
       )
    };
};

export default CampaignIndex;
