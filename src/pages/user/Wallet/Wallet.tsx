import React, { useEffect, useState } from 'react'
import Header from '../../../components/header/Header'
import { reqUserWallet } from '../../../api/coingecko';
import { loader } from '../../../app/slices/loaderSlice';
import MuiCustomizedTables from '../../../components/muiTable/MuiTable';
import { useAppDispatch } from '../../../app/reduxHooks';
import "./Wallet.scss"


const sampleColumns = {
  cryptoName: "My Coins",
  rate: "Price ($) per coin",
  quantity: "Quantity",
  buttonSell: "Sell"
}
const Wallet = () => {
  const [coins, setCoins] = useState<any[]>([])
  const dispatch = useAppDispatch();

  const fetchUserWallet = async () => {
    dispatch(loader(true));
    const list = await reqUserWallet();
    if (list?.length) {
      setCoins(list);
    }
    dispatch(loader(false));

  }
  useEffect(() => {
    fetchUserWallet();
  }, [])


  const handleClickActions = (row: any, scenario: string) => {
    alert("This functionality has been skipped due to limited timeframe of this the assignment")
  }

  return (
    <div id="wallet">
      <Header />
      <div className="content">
        <MuiCustomizedTables columns={sampleColumns} rows={coins} handleClickAction={handleClickActions} />
      </div>
    </div>
  )
}

export default Wallet