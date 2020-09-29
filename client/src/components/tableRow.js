import React from 'react';
import { connect } from 'react-redux';

import { Button, Image } from 'react-bootstrap';

const tableRow = props => {
    
    const vote = async (e)  => {
        try {
            e.preventDefault();
            await props.contract.methods.vote(props.id).send({ from : props.account });
        }
        catch(err) {
            window.alert(err.message);
        }
    }
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>                        
            <td>
                <Image src={`https://ipfs.infura.io/ipfs/${props.symbol}`} rounded style={{height : 50,width : 50}} />
            </td>
            <td>
                <Button variant="outline-light" onClick = {(e) => {vote(e)}} >Vote</Button>
            </td>
        </tr> 
    );
}   

const mapStateToProps = state => {
    return {
        contract : state.contract,
        account : state.account
    }
}

export default connect(mapStateToProps)(tableRow);