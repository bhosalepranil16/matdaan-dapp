import React, { Component } from "react";
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Web3 from "web3";
import { Nav, Navbar } from 'react-bootstrap';

import Election from './contracts/Election.json';

import Home from './components/home';
import Register from './components/register';
import Vote from './components/vote';
import DeclareWinner from './components/declareWinner';

import { setWeb3, setAccount, setContract, setCandidatesTotal, setCandidates } from './store/action';

class App extends Component {

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    window.ethereum.on('accountsChanged',(accounts) => {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== this.props.account) {
        this.props.setAccount(accounts[0]);
      }
    });
  }

  async loadWeb3() {
    if(window.ethereum) {
     window.web3 = new Web3(window.ethereum);
     await window.ethereum.enable();
    }
    if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider); 
    }
    else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      window.web3 = new Web3(provider);
    }
    this.props.setWeb3(window.web3);
  }

  async loadBlockchainData() {
    const accounts = await this.props.web3.eth.getAccounts();
    this.props.setAccount(accounts[0]);

    const networkId = await this.props.web3.eth.net.getId();
    const networkData = Election.networks[networkId];
    if(networkData) {
      const abi = Election.abi;
      const address = networkData.address;
      const contract = new this.props.web3.eth.Contract(abi,address);
      this.props.setContract(contract);
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand  style={{fontSize : 32}} className="font-weight-bold" >मतदान</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="p-2 text-secondary" style={{fontSize : 22}} >Home</Link>
              <Link to="/registrations" className="p-2 text-secondary" style={{fontSize : 22}} >Registrations</Link>
              <Link to="/vote" className="p-2 text-secondary" style={{fontSize : 22}} >Vote</Link>
              <Link to="/declareWinner" className="p-2 text-secondary" style={{fontSize : 22}} >Declare Winner</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/registrations">
            <Register />
          </Route>

          <Route path="/vote">
            <Vote />
          </Route>

          <Route path="/declareWinner">
            <DeclareWinner />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    account : state.account,
    web3 : state.web3
  }
}

const mapActionToProps = dispatch => {
  return {
    setWeb3 : (web3) => { dispatch(setWeb3(web3)) },
    setAccount : (account) => { dispatch(setAccount(account)) },
    setContract : (contract) => { dispatch(setContract(contract)) },
    setCandidatesTotal : (cnt) => {dispatch(setCandidatesTotal(cnt))},
    setCandidates : (candidates) => { dispatch(setCandidates(candidates)) }
  }
}

export default connect(mapStateToProps,mapActionToProps)(App);
