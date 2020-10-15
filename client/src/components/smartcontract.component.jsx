import React, { Component } from "react";
import StringStorageContract from "../contracts/StringStorage.json";
import getWeb3 from "../getWeb3";

class SmartContract extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    text: "",
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = StringStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        StringStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      console.log(this.state.contract);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
    console.log(this.state.text);
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { accounts, contract, text } = this.state;

    await contract.methods.set(text).send({ from: accounts[0] });

    const response = await contract.methods.get().call();

    this.setState({ storageValue: response });
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
        <form>
          <label>
            Text:
            <input onChange={this.handleChange} type="text" name="name" />
          </label>
          <button onClick={this.handleClick}>submit</button>
        </form>
        <div>The stored value is: {this.state.storageValue}</div>
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
