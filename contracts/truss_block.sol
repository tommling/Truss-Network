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

    event BlockSaved(Block block);
    mapping(address => Block) blockStore;

    function saveToBlockStore(address addr, bytes header, bytes headerSignature, bytes[] batches) public {
        var b = Block(header, headerSignature, batches);
        blockStore[addr] = b;
        emit BlockSaved(b);
    }
}