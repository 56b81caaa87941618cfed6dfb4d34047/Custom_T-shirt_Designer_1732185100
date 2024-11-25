
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const UniswapV3FactoryInterface: React.FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const contractAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
  const chainId = 1; // Ethereum Mainnet

  const contractABI = [
    {
      "name": "createPool",
      "stateMutability": "nonpayable",
      "inputs": [
        { "name": "tokenA", "type": "address" },
        { "name": "tokenB", "type": "address" },
        { "name": "fee", "type": "uint24" }
      ],
      "outputs": [{ "name": "pool", "type": "address" }]
    },
    {
      "name": "getPool",
      "stateMutability": "view",
      "inputs": [
        { "name": "", "type": "address" },
        { "name": "", "type": "address" },
        { "name": "", "type": "uint24" }
      ],
      "outputs": [{ "name": "", "type": "address" }]
    },
    {
      "name": "feeAmountTickSpacing",
      "stateMutability": "view",
      "inputs": [{ "name": "", "type": "uint24" }],
      "outputs": [{ "name": "", "type": "int24" }]
    }
  ];

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
        const web3Signer = web3Provider.getSigner();
        setSigner(web3Signer);
        const factoryContract = new ethers.Contract(contractAddress, contractABI, web3Signer);
        setContract(factoryContract);
      } else {
        setError('Please install MetaMask to use this dApp');
      }
    };
    init();
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        await provider.send("eth_requestAccounts", []);
        const web3Signer = provider.getSigner();
        setSigner(web3Signer);
        setError('');
      } catch (err) {
        setError('Failed to connect wallet');
      }
    }
  };

  const checkAndSwitchChain = async () => {
    if (provider) {
      const network = await provider.getNetwork();
      if (network.chainId !== chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
          });
        } catch (err) {
          setError('Failed to switch to the correct network');
          return false;
        }
      }
      return true;
    }
    return false;
  };

  const createPool = async (tokenA: string, tokenB: string, fee: number) => {
    if (!signer || !contract) {
      await connectWallet();
      return;
    }
    const isCorrectChain = await checkAndSwitchChain();
    if (!isCorrectChain) return;

    try {
      const tx = await contract.createPool(tokenA, tokenB, fee);
      const receipt = await tx.wait();
      setResult(`Pool created: ${receipt.events[0].args.pool}`);
    } catch (err) {
      setError('Failed to create pool');
    }
  };

  const getPool = async (tokenA: string, tokenB: string, fee: number) => {
    if (!contract) {
      setError('Contract not initialized');
      return;
    }
    try {
      const pool = await contract.getPool(tokenA, tokenB, fee);
      setResult(`Pool address: ${pool}`);
    } catch (err) {
      setError('Failed to get pool');
    }
  };

  const getFeeAmountTickSpacing = async (fee: number) => {
    if (!contract) {
      setError('Contract not initialized');
      return;
    }
    try {
      const tickSpacing = await contract.feeAmountTickSpacing(fee);
      setResult(`Tick spacing for fee ${fee}: ${tickSpacing}`);
    } catch (err) {
      setError('Failed to get fee amount tick spacing');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-5">
        <h1 className="text-3xl font-bold mb-5">Uniswap V3 Factory Interface</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {result && <p className="text-green-500 mb-4">{result}</p>}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Create Pool</h2>
          <input id="tokenA" placeholder="Token A Address" className="w-full p-2 mb-2 border rounded" />
          <input id="tokenB" placeholder="Token B Address" className="w-full p-2 mb-2 border rounded" />
          <input id="fee" type="number" placeholder="Fee (in basis points)" className="w-full p-2 mb-2 border rounded" />
          <button 
            onClick={() => createPool(
              (document.getElementById('tokenA') as HTMLInputElement).value,
              (document.getElementById('tokenB') as HTMLInputElement).value,
              parseInt((document.getElementById('fee') as HTMLInputElement).value)
            )}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Pool
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Get Pool</h2>
          <input id="getTokenA" placeholder="Token A Address" className="w-full p-2 mb-2 border rounded" />
          <input id="getTokenB" placeholder="Token B Address" className="w-full p-2 mb-2 border rounded" />
          <input id="getFee" type="number" placeholder="Fee (in basis points)" className="w-full p-2 mb-2 border rounded" />
          <button 
            onClick={() => getPool(
              (document.getElementById('getTokenA') as HTMLInputElement).value,
              (document.getElementById('getTokenB') as HTMLInputElement).value,
              parseInt((document.getElementById('getFee') as HTMLInputElement).value)
            )}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Get Pool
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Get Fee Amount Tick Spacing</h2>
          <input id="feeAmount" type="number" placeholder="Fee Amount" className="w-full p-2 mb-2 border rounded" />
          <button 
            onClick={() => getFeeAmountTickSpacing(parseInt((document.getElementById('feeAmount') as HTMLInputElement).value))}
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Get Tick Spacing
          </button>
        </div>
      </div>
    </div>
  );
};

export { UniswapV3FactoryInterface as component };
