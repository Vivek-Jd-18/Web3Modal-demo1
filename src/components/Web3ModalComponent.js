import React from "react";
import Web3Modal from "web3modal";
import { useRef, useEffect, useState } from "react";
import { providers } from "ethers";
import { providerOptions } from "../utils/providerOptions"
import { infuraId, chainid } from "../utils/Attributes"
import { ethers } from "ethers";
import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";


export default function Web3ModalComponent() {
  const [accountAddress, setAccountAddress] = useState();

  const providerOptions = {
    walletlink: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "Web 3 Modal Demo", // Required
        infuraId: infuraId // Required unless you provide a JSON RPC url; see `rpc` below
      }
    },
    binancechainwallet: {
      package: true
    },
    walletconnect: {
      package: WalletConnect, // required
      options: {
        rpc: {
          rpc: "https://matic-mumbai.chainstacklabs.com/",
          chainId: chainid,
          darkMode: false
        },
      }
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        rpc: "https://matic-mumbai.chainstacklabs.com/",
        chainId: chainid,
        darkMode: false
      }
    }
  }

  const walletConnect = async () => {
    const web3Modal = new Web3Modal({

      theme: {
        background: "RGB(150 197 244)",
        main: "gray",
        secondary: "RGB(39 41 42)",
        border: "RGB(74 119 164)",
        hover: "RGB(35 72 109)",
      },
      cacheProvider: true,
      providerOptions,
    });
    var provider = await web3Modal.connect();
    var etherprovider = new ethers.providers.Web3Provider(provider);

    await etherprovider.getSigner().getAddress();
    await provider.send("eth_requestAccounts");
    // Asking if metamask is already present or not
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        setAccountAddress(res[0]);
      });
    } else {
      alert("install metamask extension!!");
    }
  };

  const disconnectWallet = async () => {
    const web3Modal = new Web3Modal({
      network: "Goerli test network",
      theme: "dark",
      cacheProvider: true,
      providerOptions,
    });
    await web3Modal.clearCachedProvider();
    setAccountAddress(null)
  }

  useEffect(() => {
  }, [accountAddress]);

  return (
    <div className="text-center mt-8">
      <button onClick={walletConnect} >CONNECT</button>
      <h4>{accountAddress}</h4>
      <button onClick={disconnectWallet}>DISCONNECT</button>
    </div>
  );
}