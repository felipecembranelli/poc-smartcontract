import React, { Component } from 'react'
import Web3 from 'web3'

//import Jumbotron from 'react-bootstrap/Jumbotron';
//import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Accordion } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//import './App.css'
//import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ABI_GG, ADDRESS_GG } from './contract/ABI-GoodGhostingWhitelisted'
import { DAI, DAI_ADDRESS } from './contract/ABI-dai'
import logo from './img/metamask.svg'; // with import
import WalletCard from './WalletCard';
import GameInfo from './GameInfo';

class App extends Component {
  componentWillMount() {
    this.loadBlockchainDataGG()
  }

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
    this.setState({ goodGhostingWhitelistedContract } )

    // Get number of players
    const numberOfPlayers = await goodGhostingWhitelistedContract.methods.getNumberOfPlayers().call()
    .then(res => {
      console.log('getNumberOfPlayers: ', res);
      this.setState({ numberOfPlayers })
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

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     account: '',
  //     loading: true
  //   }
  // }

  render() {
    return (
<Container fluid>
<Row>
<Col>

<>
 
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="60"
          height="60"
          className="d-inline-block align-middle"
        />{' '}
      POC Smartcontract
      </Navbar.Brand>
    </Container>
  </Navbar>
</>


      
</Col>   
</Row>

<Row><Col><br></br></Col></Row>

<Row>
<Col>
<Card>
  <Card.Header as="h5">My Wallet</Card.Header>
  <Card.Body>
    <Card.Title>Connection to MetaMask</Card.Title>
    <Card.Text>
    <WalletCard/>
      {/* With supporting text below as a natural lead-in to additional content.
      <p>Network ID: <span id="networkId"></span></p>
                <p>Chain ID: <span id="chainId"></span></p>
                <p>Account: <span id="accountId"></span></p>
                <p>Balance: <span id="balance"></span></p> */}
    </Card.Text>
    {/* <Button variant="primary">Connect</Button> */}
  </Card.Body>
</Card>
</Col>
<Col><Card>
  <Card.Header as="h5">Game Info</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
    <GameInfo/>
      {/* With supporting text below as a natural lead-in to additional content.
      <p>Network ID: <span id="networkId"></span></p>
                <p>Number of Players: <span id="chainId"></span></p>
                <p>DAI Token: <span id="accountId"></span></p>
                <p>Total Principal: <span id="balance"></span></p>
                <p>Game Status: <span id="balance"></span></p>*/}
    </Card.Text>
    {/*<p><Button variant="primary">Join Game</Button></p>
    <p><Button variant="primary">Early Withdraw</Button></p> */}
  </Card.Body>
</Card></Col>
</Row>
</Container>

    );
  }
}

export default App;
