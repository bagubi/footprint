var express = require('express');
var Web3 = require('@platonnetwork/web3');
var web3 = new Web3('https://openapi2.platon.network/rpc');

var contractAddress = "0xbbaeC697BdB118245a96d30c1aC7eD5cFE099E61";
var abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "burner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tick",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BurnINformation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "listid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "spend",
				"type": "uint256"
			}
		],
		"name": "BuyInformation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "p",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tick",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "total",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "limit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deploytime",
				"type": "uint256"
			}
		],
		"name": "DeployInformation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tick",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isSold",
				"type": "bool"
			}
		],
		"name": "ListInformation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "inscripowner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tick",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "MintInformation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "listid",
				"type": "uint256"
			}
		],
		"name": "UnlistInformation",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "InscriptionOwnership",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tick",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_listsindex",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_p",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tick",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_limit",
				"type": "uint256"
			}
		],
		"name": "deploy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tick",
				"type": "string"
			}
		],
		"name": "getInscriptionOwnerIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getinscription",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "p",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "op",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "tick",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "total",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "residue",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deploytime",
						"type": "uint256"
					}
				],
				"internalType": "struct inscriptionblog1.Inscription",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getlist",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "op",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "p",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tick",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isSold",
						"type": "bool"
					}
				],
				"internalType": "struct inscriptionblog1.List",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "inscrips",
		"outputs": [
			{
				"internalType": "string",
				"name": "p",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "op",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "inscripowner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tick",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "inscriptions",
		"outputs": [
			{
				"internalType": "string",
				"name": "p",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "op",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tick",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "limit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "residue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deploytime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tick",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "list",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lists",
		"outputs": [
			{
				"internalType": "string",
				"name": "op",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "p",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tick",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSold",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tick",
				"type": "string"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "tickTocount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_listid",
				"type": "uint256"
			}
		],
		"name": "unlist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

var contract = new web3.platon.Contract(abi, contractAddress);
// console.log(contract);

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'INSCtraders'});
});
router.get('/list', function(req, res, next){
  res.render('list', { title: 'INSCtraders' })
});
router.get('/assets', function(req, res, next){
  res.render('assets', { title: 'INSCtraders' })
});
router.get('/market', function(req, res, next){
  res.render('market', { title: 'INSCtraders' })
});
router.get('/mint', function(req, res, next){
  res.render('mint', { title: 'INSCtraders' })
});

module.exports = router;
