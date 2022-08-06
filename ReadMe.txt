Process to install - 

For Frontend - 
	1. Go to the directory using cd command
	2. Run 'npm i'
	3. Run 'npm start'
        4. We are using polygon api for fetching ABI.
For Solidity -
        1. npx hardhat 
        2. npm i
        3. npx hardhat compile
        4. npx hardhat run scripts/script.js --network testnet
        5. npx hardhat verify "CONTRACT ADDRESS" --network testnet --contract contracts/${contractfilename}:contractname