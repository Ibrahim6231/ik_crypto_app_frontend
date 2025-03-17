import React, { useEffect, useState } from 'react'
import { reqAllCoinsDetailsLive, reqBuyCrypto } from '../../../api/coingecko'
import { useAppDispatch } from '../../../app/reduxHooks'
import { loader } from '../../../app/slices/loaderSlice'
import MuiCustomizedTables from '../../../components/muiTable/MuiTable'
import { iMuiTableAdditionalStyle } from '../../../interfaces/muiInterface'
import { convertNumberToSymbol } from '../../../helpers/convertorHelper'
import Header from '../../../components/header/Header'
import "./Home.scss";
import MuiCustomDialog from '../../../components/muiDialog/MuiDialog'

const sampleColumns = {
  name: "Coin",
  current_price: "Price ($)",
  market_cap: "Market Capital ($)",
  total_volume: "24h Volume ($)",
  buttonBuy: "Action"
}

const additionalStyle: iMuiTableAdditionalStyle = {
  align: ["left", "left"]
}

const sampleRow = [
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    "current_price": 83882,
    "market_cap": 1664367018402,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 1664367018402,
    "total_volume": 10829728696,
    "high_24h": 84504,
    "low_24h": 83694,
    "price_change_24h": -78.1257403800555,
    "price_change_percentage_24h": -0.09305,
    "market_cap_change_24h": -1286027497.769043,
    "market_cap_change_percentage_24h": -0.07721,
    "circulating_supply": 19837593,
    "total_supply": 19837593,
    "max_supply": 21000000,
    "ath": 108786,
    "ath_change_percentage": -22.8032,
    "ath_date": "2025-01-20T09:11:54.494Z",
    "atl": 67.81,
    "atl_change_percentage": 123746.31121,
    "atl_date": "2013-07-06T00:00:00.000Z",
    "roi": null,
    "last_updated": "2025-03-16T10:00:13.803Z"
  },
]
const Home = () => {
  const [coins, setCoins] = useState<any[]>([])
  const [buyDialogOpen, setBuyDialogOpen] = useState<boolean>(false)
  const [crypto, setCrypto] = useState(null);

  const dispatch = useAppDispatch();


  const modifyCoinsForDisplay = (list: any[]) => {
    list.forEach(coin => {
      for (let key in coin) {
        switch (key) {
          case "current_price": {
            coin[key] = coin[key] % 1 ? coin[key].toFixed(2) : coin[key];
            break;
          }
          case "total_volume":
          case "market_cap": {
            coin[key] = convertNumberToSymbol(coin[key]);
            break;
          }
        }
      }
    })
  }
  const fetchLiveCoinsData = async () => {
    dispatch(loader(true));
    const list = await reqAllCoinsDetailsLive();
    if (list?.length) {
      modifyCoinsForDisplay(list);
      setCoins(list);
    }
    dispatch(loader(false));

  }
  useEffect(() => {
    fetchLiveCoinsData();
  }, [])


  const handleClickActions = (row: any, scenario: string) => {
    switch (scenario) {
      case "buy": {
        setCrypto({ ...row });
        setBuyDialogOpen(true);
        break;
      }
      //...here we can add more cases if more actions are added in future
    }

  }

  
  const handleBuyDialogClose = () => {
    setBuyDialogOpen(false);
    setCrypto(null);
  }
  const handleCryptoBuy = async (quantity: number) => {
    // alert(quantity)
    dispatch(loader(true))
    const addedCoin = await reqBuyCrypto({crypto, quantity})
    if(addedCoin){
      handleBuyDialogClose();
    }else{

    }
    dispatch(loader(false))
  }


  return (
    <div id="home">
      <Header />
      <div className="content">
        <MuiCustomizedTables columns={sampleColumns} rows={coins} additionalStyle={additionalStyle} handleClickAction={handleClickActions} />
      </div>

      {crypto && <MuiCustomDialog open={buyDialogOpen} onClose={handleBuyDialogClose} crypto={crypto} onSubmit={handleCryptoBuy}/>}
    </div>
  )
}

export default Home