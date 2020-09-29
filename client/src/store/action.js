export const SET_WEB3 = 'SET_WEB3';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_CONTRACT = 'SET_CONTRACT';
export const SET_CANDIDATES_TOTAL = 'SET_CANDIDATES_TOTAL';
export const SET_CANDIDATES = 'SET_CANDIDATES';

export const APPEND_CANDIDATE = 'APPEND_CANDIDATE';

export const setWeb3 = (web3) => {
    return {
        type : SET_WEB3,
        web3 : web3
    }
}

export const setAccount = (account) => {
    return {
        type : SET_ACCOUNT,
        account : account
    }
}

export const setContract = (contract) => {
    return {
        type : SET_CONTRACT,
        contract : contract
    }
}

export const setCandidatesTotal = (cnt) => {
    return {
        type : SET_CANDIDATES_TOTAL,
        cnt : cnt
    }
}

export const setCandidates = (candidates) => {
    return {
        type : SET_CANDIDATES,
        candidates : candidates
    }
}

export const appendCandidate = (candidate) => {
    return {
        type : APPEND_CANDIDATE,
        candidate : candidate
    }
}