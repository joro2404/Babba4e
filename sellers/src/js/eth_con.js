const ABI = '[{"constant":true,"inputs":[{"name":"pr_id","type":"uint32"}],"name":"getInformation","outputs":[{"name":"pr_name","type":"bytes32"},{"name":"pr_descr","type":"bytes32"},{"name":"producer","type":"bytes32"},{"name":"origin","type":"bytes32"},{"name":"p_key","type":"address"},{"name":"sell_names","type":"bytes32[10]"},{"name":"buy_names","type":"bytes32[10]"},{"name":"sell_addr","type":"address[10]"},{"name":"buy_addr","type":"address[10]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"c_name","type":"bytes32"},{"name":"c_origin","type":"bytes32"},{"name":"pr_name","type":"bytes32"},{"name":"pr_descr","type":"bytes32"},{"name":"pr_id","type":"uint32"}],"name":"addProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pr_id","type":"uint32"},{"name":"tr_id","type":"uint32"},{"name":"s_name","type":"bytes32"},{"name":"s_origin","type":"bytes32"}],"name":"buyProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pr_id","type":"uint32"},{"name":"tr_id","type":"uint32"}],"name":"sellProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]';

const ADDRESS = '0x8571d0316d9f81f6666417129a7c09dDdaABaAdB';

function getWeb3() {

    if (typeof web3 !== 'undefined') { window.web3 = new Web3(web3.currentProvider); }
    else { console.log('Metamask not found'); }
}

function createContractObj() {

    getWeb3();

    let contract = web3.eth.contract(JSON.parse(ABI));
    return contract.at(ADDRESS);
}

function addProduct() {

    // let id = Math.floor(Math.random() * 100000000) + 1;

    let id = 123;

    // Funkciq na Marti

    let contract = createContractObj();
    let params = createComposeJSON();

    contract.addProduct.sendTransaction(params.company, params.origin, params.name, params.description, id, { from: web3.eth.coinbase }, function(error, result) {
        if (error) { console.log('error'); }
        else { console.log('success'); }
    });
}

function sellProduct(pr_id, tr_td) {

    let contract = createContractObj();

    contract.sellProduct.sendTransaction(pr_id, tr_id, { from: web3.eth.coinbase }, function(error, result) {
        if (error) { console.log('error'); }
        else {console.log('success'); }
    })
}

function buyProduct() {

    let contract = createContractObj();

    contract.buyProduct.sendTransaction( { from: web3.eth.coinbase }, function() {
        if (error) { console.log('error'); }
        else { console.log('success'); }
    });
}

function getInfo(id) {

    let contract = createContractObj();

    contract.getInformation.call(id, { from: web3.eth.coinbase }, web3.eth.defaultBlock, function(error, result) {
        if (error) { console.log('error'); }
        else { console.log(result); }
    });
}
