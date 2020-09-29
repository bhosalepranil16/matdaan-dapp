import { SET_WEB3, SET_ACCOUNT, SET_CONTRACT, SET_CANDIDATES_TOTAL, SET_CANDIDATES, APPEND_CANDIDATE } from './action';

const initialState = {
    web3 : null,
    account : '',
    contract : null,
    candidatesCount : 0,
    candidates : []
}

const reducer = (state=initialState,action) => {
    switch(action.type) {
        case SET_WEB3 :
            return {
                ...state,
                web3 : action.web3
            }
        case SET_ACCOUNT :
            return {
                ...state,
                account : action.account
            }
        case SET_CONTRACT : 
            return {
                ...state,
                contract : action.contract
            }
        case SET_CANDIDATES_TOTAL:
            return {
                ...state,
                candidatesCount : action.cnt
            }
        case SET_CANDIDATES : 
            return {
                ...state,
                candidates : action.candidates
            }
        case APPEND_CANDIDATE:
            const newCandidates = [...state.candidates];
            newCandidates.push(action.candidate);
            console.log(newCandidates);
            return {
                ...state,
                candidates : newCandidates
                
            }
        default :
            return state;
    }
}

export default reducer;