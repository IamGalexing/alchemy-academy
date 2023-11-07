import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className='app'>
      <Wallet
        address={address}
        setAddress={setAddress}
        balance={balance}
        setBalance={setBalance}
      />
      <Transfer setBalance={setBalance} senderAddress={address} />
    </div>
  );
}

export default App;
