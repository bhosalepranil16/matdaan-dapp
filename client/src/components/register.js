import React, { useState } from 'react';
import { connect } from 'react-redux';
import ipfsClient from 'ipfs-http-client';

import { Form, Button, Container } from 'react-bootstrap';
import { appendCandidate } from '../store/action';

const Register = props => {
    const [voterAddress, setVoterAddress] = useState('');
    const [candidateName, setCandidateName] = useState('');
    const [symbol, setSymbol] = useState(null);
    const [buffer,setBuffer] = useState('');

    const ipfs = ipfsClient({
        host : 'ipfs.infura.io',
        port : 5001,
        protocol : 'https'
    });

    const registerVoter = async(e) => {
        try {
            e.preventDefault();
            await props.contract.methods.registerVoters().send({from : voterAddress});
            setVoterAddress('');
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    const registerCandidate = async (event) => {
        try {
            event.preventDefault()
            const hash = await ipfs.add(buffer);
            const c = await props.contract.methods.registerCandidates(candidateName,hash.path).send({from : props.account});
            setCandidateName('');
            setSymbol(null);
            const returnValues = c.events.CandidateRegistered.returnValues;
            const candidateObject = {
                id : returnValues._id,
                name : returnValues._name,
                symbol : returnValues._symbol
            };
            props.appendCandidate(candidateObject);
        }
        catch(err){
            window.alert(err.message);
        }
    }

    const captureFile = (event) => {
        try {
            event.preventDefault()
            const file = event.target.files[0];
            setSymbol(file);
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
                setBuffer(Buffer(reader.result));
            }
        }
        catch(err) {
            window.alert(err.message);
        }
      }

    return(
        <div>
            <h1 className="text-center p-5 bg-light">Registrations</h1>
            <Form>
                <Form.Group className="bg-secondary text-white">
                <h2 className="text-center pt-3">Voter</h2>
                    <Container className="p-4">
                        <Form.Label>Enter Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={voterAddress} onChange = {(e) => { setVoterAddress(e.target.value); }} />
                        <Button variant="outline-light" className="d-block my-3 mx-auto" onClick= { (e) => { registerVoter(e) } } >Register Voter</Button>
                    </Container>        
                </Form.Group>
                

                <Form.Group className="bg-light">
                <h2 className="text-center pt-3">Candidate</h2>
                    <Container className="p-4">
                        <Form.Label>Enter Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={candidateName} onChange = {(e) => { setCandidateName(e.target.value) }} />
                        
                        <Form.Label className="p-2">Enter Symbol</Form.Label>
                        <Form.Control type="file" className="p-2" onChange={(e) => {captureFile(e)}} />
                        
                        <Button variant="outline-primary" className="d-block my-3 mx-auto" onClick = {(e) => { registerCandidate(e) }}>Register Candidate</Button>
                    </Container>        
                </Form.Group>
            </Form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        contract : state.contract,
        account : state.account
    }
}

const mapActionToProps = dispatch => {
    return {
        appendCandidate : (candidate) => { dispatch(appendCandidate(candidate)) }
    }
}

export default connect(mapStateToProps,mapActionToProps)(Register);