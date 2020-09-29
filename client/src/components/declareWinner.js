import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Table } from 'react-bootstrap';

import TableRowWinner from './tableRowWinner';
import { setCandidates, setCandidatesTotal } from '../store/action';

const DeclareWinner = props => {
    const [candidateName,setCandidateName] = useState('');
    const [isRender,setIsRender] = useState(false);

    const getRenderItem = () => {
        return <div>
            <h1 className="text-center p-5 bg-light">Votes</h1>
            <Table striped bordered responsive variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>Candidate Id</th>
                        <th>Candididate Name</th>
                        <th>Candidate Symbol</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                    
                <tbody>
                    {
                        props.candidates.map(c => (
                            <TableRowWinner key={c.id} id = {c.id} name = {c.name} votes = {c.totalVotes} symbol={c.symbol}
                                contract={props.contract} account ={props.account} />
                            )
                        )
                    }
                </tbody>
            </Table>
            <h1 className="text-center p-4">Winner: {candidateName}</h1>
        </div>
    }

    const renderItem = isRender ? getRenderItem() : null;

    const declare = async (e) => {
        try {
            e.preventDefault();
            await props.contract.methods.declareWinner().send({from : props.account});
            const winner = await props.contract.methods.winner().call({from : props.account});
            const cnt = await props.contract.methods.candidatesCount().call({ from : props.account });
            props.setCandidatesTotal(parseInt(cnt));
            let a;
            let b = [];
            console.log(cnt);
            for(let i=0;i<cnt;i++) {
                a = await props.contract.methods.candidates(i).call({from : props.account});
                b.push(a);
            }
            props.setCandidates(b);
            setCandidateName(winner);
            setIsRender(true);
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    return(
        <div className="bg-light">
            <Container className="p-4">
                <h1 className="text-center" >Declare Winner</h1>
                <Button variant="outline-primary" className="d-block my-3 mx-auto" onClick={(e) => {declare(e)}} >Declare</Button>
            </Container>
            {renderItem}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        candidates : state.candidates,
        contract : state.contract,
        account : state.account
    };
}

const mapActionToProps = dispatch => {
    return {
        setCandidates : (candidates) => {dispatch(setCandidates(candidates))},
        setCandidatesTotal : (cnt) => {dispatch(setCandidatesTotal(cnt))}
    }
}

export default connect(mapStateToProps,mapActionToProps)(DeclareWinner);