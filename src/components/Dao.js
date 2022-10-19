import React from "react";
import Button from "./Button";
import Web3Modal from "web3modal";
import { useRef, useEffect, useState } from "react";
import { providers } from "ethers";
import { providerOptions } from "../utils/providerOptions"
import { ethers } from "ethers";
import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";


export default function Dao() {
  const [accountAddress, setAccountAddress] = useState();

  const providerOptions = {
    walletlink: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "Web 3 Modal Demo", // Required
        infuraId: process.env.INFURA_KEY // Required unless you provide a JSON RPC url; see `rpc` below
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
          chainId: 5,
          darkMode: false
        },
      }
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        rpc: "https://matic-mumbai.chainstacklabs.com/",
        chainId: 80001,
        darkMode: false
      }
    }
  }

  const walletConnect = async () => {
    const web3Modal = new Web3Modal({

      theme: {
        background: "rgb(130, 130, 156)",
        main: "red",
        secondary: "red",
        border: "rgba(255,   195, 195, 0.14)",
        hover: "rgb(116, 26, 32)",
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
      <Button
        text="Connect To Wallet"
        onClick={walletConnect}
      />
      <button onClick={walletConnect} >click</button>
      <h4>{accountAddress}</h4>
      <button onClick={disconnectWallet}> Close</button>
    </div>
  );
}