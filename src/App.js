import React, { useState } from 'react'
import Web3 from 'web3'
import './App.css'
import { simpleStorageAbi, contractAddress } from './abis'
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [address, setAddress] = useState("");
  let [amount, setAmount] = useState('');
  const [accounts, setAccounts] = useState();
  const [loadContract, setLoadContract] = useState()
  const [web3, setWeb3] = useState(null)

  window.ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    setAccounts(accounts)
  })


  const connectWallet = async () => {
    const web3 = new Web3(Web3.givenProvider);
    await Web3.givenProvider.enable();
    setWeb3(web3);
    console.log(web3)
    const contract = new web3.eth.Contract(simpleStorageAbi, contractAddress);
    console.log("contract", contract)
    console.log("contract", contract.methods)

    setLoadContract(contract);
    console.log("contract", typeof contract)
    const uAccounts = await web3.eth.getAccounts();
    console.log("accounts",typeof  uAccounts)
    setAccounts(uAccounts);
  }


  const Transfer = async () => {
    console.log("amount", amount, "address", address, accounts)
    try {
      if (loadContract !== undefined) {
        amount = amount * 10e17
        amount = amount.toString();
        const result = await loadContract.methods.transfer(address, amount).send({
          from: accounts[0]
        })
        console.log(result)
      }
    }
    catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div className="App">
      <header className = 'App-header'>
      <Form>
        <Form.Group>
          <Form.Label>Sayyid Mansoob Hasan</Form.Label><br></br>
          <br></br>
          <Form.Label>Recipient Address</Form.Label><br></br>
          <input
            type="text"
            placeholder="Add Recipient's Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
        </Form.Group>
        <Form.Group>
          <label>Amount</label><br></br>
          <input type="text"
            placeholder="Enter Amount to be Transfered"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          /><br></br>
        </Form.Group>
      </Form>
      <br></br>
      {
        !web3 ?
          <Button onClick={connectWallet}>Connect Wallet</Button>
          :
          <Button onClick={Transfer}>Send</Button>

      }  
      </header>   
    </div>
  );
}

export default App;
