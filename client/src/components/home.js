import React from 'react';

import { Container, Image} from 'react-bootstrap';
import Vote from '../assestes/vote1.png';
const home = (props) => {
    return(
        <div>
            <h1 className="text-center font-weight-bold bg-light pb-4" style={{fontSize : 50}}>Introduction</h1>
            <Container>
                <Image className="img-fluid rounded mx-auto d-block" src={Vote}></Image>
                <h2 className="text-center p-3">
                    मतदान (Matadaan) is a Decentralized Voting Dapp.
                </h2>
                <h3>Rules</h3>
                <ul className="list-group">
                    <li class="list-group-item h5">1. Admin (address which deployed the smart contract) can only register 
                    Candidates and declare Winner</li>
                    <li className="list-group-item h5">2. Voter can Register themselves using there valid ethereum address</li>
                    {/* <li className="list-group-item">3. Registration phase is of 10 minutes as soon as you migrate the smart contract this phase started.</li>
                    <li className="list-group-item">4. Voting phase is of 2 minutes after ending of 1st phase.</li>
                    <li className="list-group-item">5. Result phase is of 2 minutes after ending of 2nd phase.</li>
                    <li className="list-group-item">6. You can vary the time from the constructor of Election.sol</li> */}
                </ul>
            </Container>
        </div>
            
    );
}

export default home;