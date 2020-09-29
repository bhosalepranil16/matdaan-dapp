# मतदान (Matdaan-dapp)
This is a decentralized voting app created using blockchain, solidity, web3.js, truffle and react.js.

# Dependencies
Install these prerequisites to follow along.

* NPM:  (https://nodejs.org)
* Truffle:  (https://github.com/trufflesuite/truffle)
* Ganache: (http://truffleframework.com/ganache/)
* Metamask: (https://metamask.io/)

## Step 1. Clone the project.
```
git clone https://github.com/bhosalepranil16/matdaan-dapp
```

## Step 2. Install dependencies
run from the client directory.
```
$ npm install
```
## Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance.

## Step 4. Compile & Deploy Election Smart Contract
run from root directory of project.
```
$ truffle migrate --reset
```


## Step 5. Configure Metamask
* Unlock Metamask.
* Connect metamask to your local Etherum blockchain provided by Ganache.
* Import an account provided by ganache.


## Run the Front End Application.
run from client directory.
```
$ npm run start
```
Visit this URL in your browser: (http://localhost:3000)

## Usage
* Admin (account which deployed the smart contracts) can only register Candidates and declare Winner.
* Voter can Register themselves using there valid ethereum address.
* Registration phase is of 10 minutes as soon as you migrate the smart contract this phase started.
* Voting phase is of 2 minutes after ending of 1st phase.
* Result phase is of 2 minutes after ending of 2nd phase.
* You can vary the time from the constructor of Election.sol
