pragma solidity >=0.5.0 <0.6.0;

contract MonthlyContract {
    //add state where you can't put money when someone else pays to contract
    // enum State { Created, Locked, Release }
    // State public state;

    uint256 public totalAmout;
    uint256 public initialAmount;
    uint256 public timeGiven;
    uint256 public monthlyPayment;
    uint256 public amount;
    uint256 public months;
    address payable public seller;
    address payable public buyer;

    uint256 public amountLeft;

    //timegiven is is months. 2592000 seconds is in 1 month.
    constructor(uint256 _totalAmout, uint256 _timeGiven) public {
        timeGiven = block.timestamp + (_timeGiven * 2592000);
        totalAmout = _totalAmout;
        seller = msg.sender;
        amountLeft = totalAmout;
        monthlyPayment = _totalAmout / _timeGiven;
        months = _timeGiven;
    }

    function intialPay() public payable {
        require(msg.value >= monthlyPayment);
        buyer = msg.sender;
        initialAmount = msg.value;
        amountLeft = totalAmout - initialAmount;
    }

    function pay() public payable {
        require(msg.sender == buyer);
        amount = msg.value;
        amountLeft = amountLeft - amount;
    }

    //neeeds to add condition where money isn't payed in x date,
    //the transaction is no longer valid
}
