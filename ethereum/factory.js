import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9382aeDbcfCeB9Eddd48868fFCcfCeFdDE0e98db'
);

export default instance;