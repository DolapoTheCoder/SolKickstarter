const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });
    
    await factory.methods.createCampaign('100').send({
            from: accounts[0],
            gas: '1000000'
        }); //no result comes back from where campaign is

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
        ); //informing web3 of the existence
        //and whereabouts of campaign
});

describe('Campaign', () => {
    it('deploys a factory and campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
    
    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows contribution and makes approvers', async () => {
        await campaign.methods.contribute().send({ 
            value: '200',
            from: accounts[1] //2nd ganache acct
         });
        //HOW TO CHECK MAPPINGS
        const check = await campaign.methods.approvers(accounts[1]).call();

        assert.equal(check, true);
    });

    it('req min contribution', async () => {
        try {
            await campaign.methods.contribute.send({
                value: '90', //100 is min contribution
                from: accounts[2]
            });
            assert(false);
        } catch (error) {
            assert(error);
        };
    });

    // it('make request', async () => {
    //     await campaign.methods
    //         .createRequest('Buy food', '200', accounts[1])
    //         .send({
    //             from: accounts[0],
    //             gas: '1000000'
    //         });

    //     const request = await campaign.methods.request(0).call();

    //     assert.equal('Buy food', request.description);
    // });

    it('processes a request', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods
            .createRequest('A', web.utils.toWei('5', ether), accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

       // const ogBalance = await web3.eth.getBalance(accounts[1]);

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        //string to float
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 104); 
    });
});
