import React from 'react'
import { ethers, providers } from "ethers";
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useState, useEffect } from 'react';
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export default function Wallet(props) {
    const [web3Modal, setWeb3Modal] = useState(null)
    const [address, setAddress] = useState("")

    useEffect(() => {
        // initiate web3modal
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    //infura id from infura
                    infuraId: "1d7e74b59fa34414bc4401a9b164e20c",
                }
            },
            binancechainwallet: {
                package: true
            },
            coinbasewallet: {
                package: CoinbaseWalletSDK,
                options: {

                    rpc: "https://matic-mumbai.chainstacklabs.com/",
                    chainId: 80001,
                    darkMode: false
                }
            }
        };

        const newWeb3Modal = new Web3Modal({
            cacheProvider: false, // very important
            network: "mainnet",
            providerOptions,
        });

        setWeb3Modal(newWeb3Modal)
    }, [])
    async function connectWallet() {
        const provider = await web3Modal.connect();
        const ethersProvider = new providers.Web3Provider(provider)
        const userAddress = await ethersProvider.getSigner().getAddress()
        setAddress(userAddress)
    }
    return (
        <div>
            <button onClick={connectWallet}>Connect wallet</button>
            <p>{address}</p>
        </div>
    )

}
