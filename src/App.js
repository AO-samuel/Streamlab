import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Videos from "./Videos";

import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upload from "./Upload";
import videosABI from "./contracts/videos.abi.json";
import ierc20 from "./contracts/ierc.abi.json";

import NotificationSystem from "react-notification-system";

const ERC20_DECIMALS = 18;

const contractAddress = "0x76d0709bF5EAFAe657E915c71B0B2F493E94508f";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const notificationSystem = React.createRef();

  const [videos, setVideos] = useState([]);

  // connect to wallet
  const connectCeloWallet = async () => {
    const notification = notificationSystem.current;
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
        notification.addNotification({
          message: "Error Occurred",
          level: "error",
        });
      }
    } else {
      console.log("No contract or kit");
    }
  };

  useEffect(() => {
    connectCeloWallet();
  }, []);

  // get the cUSD balance
  const getcUSDBalance = useCallback(async () => {
    const notification = notificationSystem.current;
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const contract = new kit.web3.eth.Contract(videosABI, contractAddress);
      await setcontract(contract);
      await setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
      notification.addNotification({
        message: "Error Getting Balance",
        level: "error",
      });
    }
  }, [address, kit]);
  const getVideos = useCallback(async () => {
    const notification = notificationSystem.current;
    try {
      const videoLength = await contract.methods.getVideosLength().call();
    const _videosMain = [];

    for (let index = 0; index < videoLength; index++) {
      let _videos = new Promise(async (resolve, reject) => {
        let _video = await contract.methods.getVideos(index).call();

        let videoTime = new Date(_video[6] * 1000);
        const year = videoTime.getFullYear();
        const month = videoTime.getMonth() + 1;
        const date = videoTime.getDate();
        resolve({
          index: index,
          owner: _video[0],
          link: _video[1],
          title: _video[2],
          description: _video[3],
          upvote: _video[4],
          downvote: _video[5],
          timestamp: `${date}/${month}/${year}`,
        });
      });

      _videosMain.push(_videos);
    }

    const videos = await Promise.all(_videosMain);
    setVideos(videos);

    } catch (error) {
      notification.addNotification({
        message: "Error Occurred while searching for videos",
        level: "error",
      });
    }
      }, [contract]);
  useEffect(() => {
    if (kit && address) {
      getcUSDBalance();
    } else {
      console.log("no kit");
    }
  }, [kit, address, getcUSDBalance]);

  useEffect(() => {
    if (contract) {
      console.log(contract);
      getVideos();
    }
  }, [contract, getVideos]);

  const upvoteClick = async (index) => {
    const notification = notificationSystem.current;
    const cUSDContract = new kit.web3.eth.Contract(ierc20, cUSDContractAddress);
    const tipPrice = new BigNumber(1).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await cUSDContract.methods
        .approve(contractAddress, tipPrice)
        .send({ from: address });
      await contract.methods.upvoteVideo(index).send({ from: address });
      getVideos();
    } catch (error) {
      console.log(error);
      notification.addNotification({
        message: "Something went wrong",
        level: "error",
      });
    }
  };

  const downvoteClick = async(index)=>{
    const notification = notificationSystem.current;

    try {
      await contract.methods.downvoteVideo(index).send({from: address});
      getVideos();
    } catch (error) {
      console.log(error); 
      notification.addNotification({
        message: "Could not verify loan",
        level: "error",
      });
    }
  }

  const addVideo = async (title, link, description)=>{
    const notification = notificationSystem.current;

    try {
      await contract.methods.addVideo(link, title, description, 0, 0).send({from: address});
      getVideos();
    } catch (error) {
      console.log(error);
      notification.addNotification({
        message: "Could not verify loan",
        level: "error",
      });
    }
  }

  return (
    <Router>
      <Header cUSDBalance={cUSDBalance} />
      <Switch>
        <Route path="/" exact>
          <Videos videos={videos} upvote={upvoteClick} downvote = {downvoteClick}/>
        </Route>
        <Route path="/upload">
          <Upload addVideo = {addVideo}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
