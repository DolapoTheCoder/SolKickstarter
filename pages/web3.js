import Web3 from "web3";

let web3;

//typeof window are we in: browser or server 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    //metamask browser
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    //not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/7c26a024e9c9431db75fc7ec37bac5cd'
    );
    web3 = new Web3(provider);
}

export default web3;