// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint256 public minimumContribution;
    //address of senders mapped to booleans
    mapping(address => bool) public approvers; //can't iterate through mappings
    //mapping is basically a hashtable
    Request[] public requests;
    //you can't iterate a mapping
    //so create a count every time someone joins
    //find the length of approvers
    uint256 public approversCount;

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint256 minimum, address sender) public {
        manager = sender; //manager is owner
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        // need to add msg.sender to mapping and assign to true
        approvers[msg.sender] = true;
        //increment approversCount
        approversCount++;
    }

    function createRequest(
        string description,
        uint256 value,
        address recipient
    ) public onlyManager {
        require(approvers[msg.sender] == true);

        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
            //we don't need to add reference types
            //approvals[msg.sender]: true, //automatic 1 request
        });
        requests.push(newRequest);
    }

    function approveRequest(uint256 idReq) public {
        //can't vote twice
        Request storage request = requests[idReq];
        require(approvers[msg.sender] == true);
        //checking the mapping in approvals
        //if it false then no vote b4
        require(!request.approvals[msg.sender]);
        // one vote to one contributor
        request.approvalCount += 1;
        request.approvals[msg.sender] = true;
    }

    function finalizeRequest(uint256 idReq) public onlyManager {
        Request storage request = requests[idReq];
        require(!request.complete); // not completed

        //at least 50% of people need to have voted for a request to be approved
        require(request.approvalCount >= (approversCount / 2));
        //transfer eth to recipient
        request.recipient.transfer(request.value);
        request.complete = true; //assigning to completed
    }
}

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        //minimum contrbution for new campaign

        //deploy new init of campaign
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}
// pragma solidity ^0.4.17;

// contract CampaignFactory {
//     address[] public deployedCampaigns;

//     function createCampaign(uint minimum) public {
//         address newCampaign = new Campaign(minimum, msg.sender);
//         deployedCampaigns.push(newCampaign);
//     }

//     function getDeployedCampaigns() public view returns (address[]) {
//         return deployedCampaigns;
//     }
// }

// contract Campaign {
//     struct Request {
//         string description;
//         uint value;
//         address recipient;
//         bool complete;
//         uint approvalCount;
//         mapping(address => bool) approvals;
//     }

//     Request[] public requests;
//     address public manager;
//     uint public minimumContribution;
//     mapping(address => bool) public approvers;
//     uint public approversCount;

//     modifier restricted() {
//         require(msg.sender == manager);
//         _;
//     }

//     function Campaign(uint minimum, address creator) public {
//         manager = creator;
//         minimumContribution = minimum;
//     }

//     function contribute() public payable {
//         require(msg.value > minimumContribution);

//         approvers[msg.sender] = true;
//         approversCount++;
//     }

//     function createRequest(string description, uint value, address recipient) public restricted {
//         Request memory newRequest = Request({
//            description: description,
//            value: value,
//            recipient: recipient,
//            complete: false,
//            approvalCount: 0
//         });

//         requests.push(newRequest);
//     }

//     function approveRequest(uint index) public {
//         Request storage request = requests[index];

//         require(approvers[msg.sender]);
//         require(!request.approvals[msg.sender]);

//         request.approvals[msg.sender] = true;
//         request.approvalCount++;
//     }

//     function finalizeRequest(uint index) public restricted {
//         Request storage request = requests[index];

//         require(request.approvalCount > (approversCount / 2));
//         require(!request.complete);

//         request.recipient.transfer(request.value);
//         request.complete = true;
//     }
// }
