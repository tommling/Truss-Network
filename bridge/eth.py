#!/usr/env/python
import web3
import json

from web3 import Web3, HTTPProvider, TestRPCProvider
from solc import compile_source
from web3.contract import ConciseContract

# Solidity source code
contract_source_code = '''
pragma solidity ^0.4.14;
pragma experimental ABIEncoderV2;

contract BlockStore {
    // struct BlockHeader {
    //     bytes blockNum;
    //     bytes previousBlockId;
    //     bytes signerPublicKey;
    //     bytes[] batchIds;
    //     bytes consensus;
    //     bytes stateRootHash;
    // }
    struct Block {
        bytes header;
        bytes headerSignature;
        bytes[] batches;
    }

    event BlockSaved(block);
    mapping(address => Block) blockStore;

    function saveToBlockStore(address addr, bytes header, bytes headerSignature, bytes[] batches) public {
        var b = Block(header, headerSignature, batches);
        blockStore[addr] = b;
        emit BlockSaved(b);
    }
}
'''

compiled_sol = compile_source(contract_source_code) # Compiled source code
contract_interface = compiled_sol['<stdin>:BlockStore']

# web3.py instance
w3 = Web3("127.0.0.1")

# Instantiate and deploy contract
contract = w3.eth.contract(abi=contract_interface['abi'], bytecode=contract_interface['bin'])

# Get transaction hash from deployed contract
tx_hash = contract.deploy(transaction={'from': w3.eth.accounts[0], 'gas': 410000})

# Get tx receipt to get contract address
tx_receipt = w3.eth.getTransactionReceipt(tx_hash)
contract_address = tx_receipt['contractAddress']

# Contract instance in concise mode
abi = contract_interface['abi']
contract_instance = w3.eth.contract(address=contract_address, abi=abi,ContractFactoryClass=ConciseContract)

# Getters + Setters for web3.eth.contract object
print('Contract value: {}'.format(contract_instance.greet()))
contract_instance.setGreeting('Nihao', transact={'from': w3.eth.accounts[0]})
print('Setting value to: Nihao')
print('Contract value: {}'.format(contract_instance.greet()))