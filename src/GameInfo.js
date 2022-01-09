// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, {useState} from 'react'
import Web3 from 'web3'
import {ethers} from 'ethers'
//import './WalletCard.css'
import Button from 'react-bootstrap/Button';
import { ABI_GG, ADDRESS_GG } from './contract/ABI-GoodGhostingWhitelisted'
import { DAI, DAI_ADDRESS } from './contract/ABI-dai'


const GameInfo = ()  => {

	const [errorMessage, setErrorMessage] = useState(null);
	// const [defaultAccount, setDefaultAccount] = useState(null);
	// const [userBalance, setUserBalance] = useState(null);
	// const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [numberOfPlayers, setNumberOfPlayers] = useState(null);

	const [currentNetwork, setCurrentNetwork] = useState(null);

	const gameInfoHandler = async () => {

		const web3 = new Web3(Web3.givenProvider)

		// Connect to GG contract
		const goodGhostingWhitelistedContract = new web3.eth.Contract(ABI_GG, ADDRESS_GG)
		this.setState({ goodGhostingWhitelistedContract } )
	
		// Get number of players
		const numberOfPlayers = await goodGhostingWhitelistedContract.methods.getNumberOfPlayers().call()
		.then(res => {
			console.log('numberOfPlayers: ', res);
			setNumberOfPlayers(numberOfPlayers)
		})
		.catch(error => {
			console.log(error.message);
		});

		// if (window.ethereum && window.ethereum.isMetaMask) {
		// 	console.log('MetaMask Here!');

		// 	window.ethereum.request({ method: 'eth_requestAccounts'})
		// 	.then(result => {
		// 		accountChangedHandler(result[0]);
		// 		setConnButtonText('Wallet Connected');
		// 		getAccountBalance(result[0]);
		// 	})
		// 	.catch(error => {
		// 		setErrorMessage(error.message);
			
		// 	});

		// 	window.ethereum.request({method: 'net_version'})
		// 	.then(result => {
		// 		setCurrentNetwork(result[0]);
		// 	})
		// 	.catch(error => {
		// 		setErrorMessage(error.message);
		// 	});

		// } else {
		// 	console.log('Need to install MetaMask');
		// 	setErrorMessage('Please install MetaMask browser extension to interact');
		// }
	}

	// // update account, will cause component re-render
	// const accountChangedHandler = (newAccount) => {
	// 	setDefaultAccount(newAccount);
	// 	getAccountBalance(newAccount.toString());
	// }

	// const getAccountBalance = (account) => {
	// 	window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
	// 	.then(balance => {
	// 		setUserBalance(ethers.utils.formatEther(balance));
	// 	})
	// 	.catch(error => {
	// 		setErrorMessage(error.message);
	// 	});
	// };

	// const chainChangedHandler = () => {
	// 	// reload the page to avoid any errors with chain change mid use of application
	// 	window.location.reload();
	// }


	// listen for account changes
	// window.ethereum.on('accountsChanged', accountChangedHandler);

	// window.ethereum.on('chainChanged', chainChangedHandler);
	
	return (
		<div >
		{/* <h4> {"Connection to MetaMask :"} </h4> */}
			
			<div className='numberOfPlayers'>
				<h3>numberOfPlayers: { numberOfPlayers }</h3>
			</div>
			{/* <div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div> */}
			{errorMessage}
			{/* <button onClick={connectWalletHandler}>{connButtonText}</button> */}
			{/* <Button variant="primary" onClick={connectWalletHandler}>Connect</Button> */}
			<p><Button variant="primary">Join Game</Button></p>
    		<p><Button variant="primary">Early Withdraw</Button></p>
		</div>
	);
}

export default GameInfo;