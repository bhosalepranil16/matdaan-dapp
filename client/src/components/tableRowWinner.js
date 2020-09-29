import React from 'react';

import { Image } from 'react-bootstrap';

const tableRow = props => {
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>                        
            <td>
                <Image src={`https://ipfs.infura.io/ipfs/${props.symbol}`} rounded style={{height : 50,width : 50}} />
            </td>
            <td>{props.votes}</td>
        </tr> 
    );
}   

export default tableRow;