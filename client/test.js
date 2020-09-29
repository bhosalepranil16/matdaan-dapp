const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


const readFile = async () => {
    ipfs.add('1234',function(error,result){
        console.log(error,result);
    });
}    

readFile();