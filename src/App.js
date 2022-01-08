import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { ABI_GG, ADDRESS_GG } from './contract/ABI-GoodGhostingWhitelisted'
import { DAI, DAI_ADDRESS } from './contract/ABI-dai'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainDataGG()
  }

  // async loadBlockchainData() {
  //   const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  //   const accounts = await web3.eth.getAccounts()
  //   this.setState({ account: accounts[0] })
  //   const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
  //   this.setState({ todoList })
  //   const taskCount = await todoList.methods.taskCount().call()
  //   this.setState({ taskCount })
  //   for (var i = 1; i <= taskCount; i++) {
  //     const task = await todoList.methods.tasks(i).call()
  //     this.setState({
  //       tasks: [...this.state.tasks, task]
  //     })
  //   }
  //   this.setState({ loading: false })
  // }

  async loadBlockchainDataGG() {

    // connect to Account

    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    
    // Connect to DAI contract
    const daiContract = new web3.eth.Contract(DAI, DAI_ADDRESS)

    // Set the allowance
    await daiContract.methods.balanceOf(accounts[0])
    .call()
    .then(res => {
      console.log('balance: ', res);
    })
    .catch(err => {
      console.log('Error [balance]', err);
    });

    await daiContract.methods.approve(ADDRESS_GG, '1000000000000000000')
    .send({ from: this.state.account })
    .then(res => {
      console.log('approve: ', res);
      this.setState({ loading: false })
    })
    .catch(err => {
      console.log('Error [approve]', err);
    });

    // Connect to GG contract
    const goodGhostingWhitelistedContract = new web3.eth.Contract(ABI_GG, ADDRESS_GG)
    this.setState({ goodGhostingWhitelistedContract })

    // Get number of players
    const numberOfPlayers = await goodGhostingWhitelistedContract.methods.getNumberOfPlayers().call()
    .then(res => {
      console.log('getNumberOfPlayers: ', res);
    })
    .catch(error => {
      console.log(error.message);
    });

    // Join game
    const joinGame = await goodGhostingWhitelistedContract.methods.joinGame().call()
    .then(res => {
      console.log('joinGame: ', res);
    })
    .catch(error => {
      console.log(error.message);
    });

    this.setState({ joinGame })

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: true
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="" target="_blank">POC Smart Contract</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <div id="myAccount" className="text-center"><p className="text-center">Account: {this.state.account}</p></div>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
