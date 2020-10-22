import React, { Component } from "react";
import StringStorageContract from "../contracts/StringStorage.json";
import MonthlyContract from "../contracts/MonthlyContract.json";
import getWeb3 from "../getWeb3";
import Moment from "react-moment";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    web3: null,
    accounts: null,
    contract: null,
    totalAmount: 0,
    timeGiven: 0,
    monthlyPayment: 0,
    seller: "",
    amountLeft: 0,
    initialAmount: 0,
    months: 0,
    inputAmount: 0,
    returnAmount: 0,
    amountLeft: 0,
    buyer: "",
    amount: 0,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MonthlyContract.networks[networkId];
      const instance = new web3.eth.Contract(
        MonthlyContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.initialLoad);
      console.log(this.state.contract);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  initialLoad = async () => {
    const { accounts, contract } = this.state;

    const totalAmount = await contract.methods.totalAmout().call();
    const seller = await contract.methods.seller().call();
    const buyer = await contract.methods.buyer().call();
    const timeGiven = await contract.methods.timeGiven().call();
    const monthlyPayment = await contract.methods.monthlyPayment().call();
    const amount = await contract.methods.amount().call();
    const amountLeft = await contract.methods.amountLeft().call();

    this.setState({
      buyer: buyer,
      totalAmount: totalAmount,
      seller: seller,
      timeGiven: timeGiven,
      monthlyPayment: monthlyPayment,
      amountLeft: amountLeft,
      amount: amount,
    });
  };

  handleChange = (e) => {
    this.setState({ amount: e.target.value });
    console.log(this.state.amount);
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { accounts, contract, amount } = this.state;

    await contract.methods.pay().send({ from: accounts[0], value: amount });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <p>Welcome {this.state.buyer}</p>
          <p>you have a debt of ${this.state.amountLeft}</p>
          <td>
            Debt is due on: <Moment unix>{this.state.timeGiven}</Moment>
          </td>
          <div>
            <td>
              Next Payment of ${this.state.monthlyPayment} is due on:{" "}
              <Moment unix>{this.state.timeGiven - 2592000}</Moment>
            </td>
          </div>
          <p>Enter the amount you wish to pay today</p>
          <form>
            <label>
              <input onChange={this.handleChange} type="number" name="name" />
            </label>
            <button onClick={this.handleClick}>submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
