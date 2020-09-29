import React from 'react';
import { connect } from 'react-redux';

import { Table } from 'react-bootstrap';


import TableRow from './tableRow';

const Vote = (props) => {
    
    return(
        <div>
            <h1 className="text-center p-5 bg-light">Vote</h1>
            <Table striped bordered responsive variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>Candidate Id</th>
                        <th>Candididate Name</th>
                        <th>Candidate Symbol</th>
                        <th>Click Here</th>
                    </tr>
                </thead>
                    
                <tbody>
                    {
                        props.candidates.map(c => (
                            <TableRow key={c.id} id = {c.id} name = {c.name} symbol={c.symbol} />
                            )
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        candidates : state.candidates
    }
}

export default connect(mapStateToProps)(Vote);