//Connect MetaMask Wallet
var accounts = []; //记录用户的地址
const sdk = new MetaMaskSDK.MetaMaskSDK({
    dappMetadata: {
        name: "Pure JS example",
        url: window.location.host,
    },
    logging: {
        sdk: false,
    }
});
function ConnectWallet() {
    ethereum
        .request({
            method: 'eth_requestAccounts',
            params: [],
        })
        .then((res) =>
            accounts[0] = res[0]
        )
        .catch((e) => console.log('request accounts ERR', e));
    document.getElementById("Wallet").innerHTML = accounts[0].slice(0, 8) + "..." + accounts[0].slice(36, 42);
    addPlatONChain();
}
function addPlatONChain() {
    ethereum
        .request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: '0x335f9',
                    chainName: 'PlatON Mainnet',
                    blockExplorerUrls: ['https://scan.platon.network'],
                    nativeCurrency: { symbol: 'lat', decimals: 18 },
                    rpcUrls: ['https://openapi2.platon.network/rpc'],
                },
            ],
        })
        .then((res) => console.log('add', res))
        .catch((e) => console.log('ADD ERR', e));
}

// Deploy Inscription
function deployShow() {
    document.getElementById("deployForm").style.display = "block";
    //alert("部署表单弹出！");
}
function deploy() {
    //alert("表单部署成功！");
    var tick = document.getElementById("tick").value;
    var max = document.getElementById("max").value;
    var lims = document.getElementById("lims").value;
    //alert(tick + "," + max + "," + lims);
    //sendDeployTranscation(tick, max, lims);
}
JQuery("#submitDeploy").click(async function () {
    result = await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
            "from": accounts[0],
            "to": "0x0000000000000000000000000000000000000000",
            "value": 0,
        }],
    }).then(res=>{console.log(res)});
});
//与MataMask交互

//Use Status to get call the function
function isMint() {
    var obj = document.getElementById("id1").innerText;
    window.location.href = "/mint";
}