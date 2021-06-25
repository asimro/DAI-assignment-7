import React, {useState} from 'react'
import Web3 from 'web3'
import './App.css'
import { simpleStorageAbi, contractAddress } from './abis'

const web3 = new Web3(Web3.givenProvider)
const contract = new web3.eth.Contract(simpleStorageAbi, contractAddress);

async function Transfer(add, val) {
  const accounts = await window.ethereum.enable()
  const account = accounts[0];
  const result = await contract.methods.transfer(add, val).send({
    from: account
  })
  console.log(result);
}

function App() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  //const [account, setAccount] = useState('');
  
  
  return (
    <div className="App">
      <form>
        <label>Enter Recipient's Address</label><br></br>
        <input 
        type = "text" 
        placeholder="0x123XXXXXXX" 
        required
        value = {address}
        onChange = {(e) => setAddress(e.target.value)}
        />
        <br />
        <label>Enter amount</label><br></br>
        <input type = "text" 
        placeholder="1.0000000000"
        required
        value = {amount}
        onChange = {(e) => setAmount(e.target.value)}
        /><br></br>
        <button onClick = {() => Transfer(address, amount)}>Send</button>
      </form>
    </div>
  );
}

export default App;
//<button onClick = {() => func()}>Send</button>


/* class App extends Component {
  componentWillMount() {
    this.TransferDAI(address,amount)
  }

  async TransferDAI(address, amount) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const contract = new web3.eth.Contract(simpleStorageAbi, contractAddress);    
    const gas = await contract.methods.transfer(address, amount).estimateGas();
    const result = await contract.methods.transfer(address, amount).send({
      from: this.state.account,
      gas 
    })
    console.log(result);
  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }
 
  render() {
    return (
      <div className="container">
        <h1>Dai Transfer</h1>
        <p>Your account: {this.state.account}</p>
        <form>
        <label htmlFor="toAdd">Enter Recipient's Address</label><br></br>
        <input type = "text" id = "toAdd" name = "toAdd" placeholder="0x123XXXXXXX"></input><br></br>

        <label htmlFor="amount">Enter amount</label><br></br>
        <input type = "text" id = "amount" name = "amount" placeholder="1.0000000000"></input><br></br>   
      </form>
      </div>
    );
  }
}
 */