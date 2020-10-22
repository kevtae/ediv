import React, { Component } from "react";
import StringStorageContract from "../contracts/StringStorage.json";
import MonthlyContract from "../contracts/MonthlyContract.json";
import getWeb3 from "../getWeb3";

class SmartContract extends Component {
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
    const timeGiven = await contract.methods.timeGiven().call();
    const monthlyPayment = await contract.methods.monthlyPayment().call();
    const initialAmount = await contract.methods.initialAmount().call();
    const months = await contract.methods.months().call();

    this.setState({
      totalAmount: totalAmount,
      seller: seller,
      timeGiven: timeGiven,
      monthlyPayment: monthlyPayment,
      initialAmount: initialAmount,
      months: months,
    });
  };

  handleChange = (e) => {
    this.setState({ inputAmount: e.target.value });
    console.log(this.state.inputAmount);
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { accounts, contract, inputAmount, initialAmount } = this.state;

    await contract.methods
      .intialPay()
      .send({ from: accounts[0], value: inputAmount });

    console.log(initialAmount);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="modal">
        <button className="close" onClick={this.props.close}>
          &times;
        </button>
        <div className="header"> Welcome to Ediv Payment Plan </div>
        <div>
          <p>Cost: ${this.state.totalAmount}</p>
          <p>Seller Address:{this.state.seller}</p>
          <p>
            Have to pay ${this.state.monthlyPayment} for {this.state.months}{" "}
            months
          </p>
          <p>Please input initial Amount that you want to pay.</p>
        </div>
        <form>
          <label>
            <input onChange={this.handleChange} type="number" name="name" />
          </label>
          <button onClick={this.handleClick}>submit</button>
        </form>
        <div className="content">
          Ediv is a simple way to pay divide your payment plan using smart
          contract
          <button
            className="button-modal"
            onClick={() => {
              console.log("modal closed ");
              this.props.close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    );
  }
}

export default SmartContract;
