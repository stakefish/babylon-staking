export const BBN_CANARY_RPC_URL = process.env.NEXT_PUBLIC_BABY_RPC_URL
  ? process.env.NEXT_PUBLIC_BABY_RPC_URL
  : "https://rpc.btc-mainnet.babylonlabs.io/";

export const BBN_CANARY_LCD_URL = process.env.NEXT_PUBLIC_BABY_LCD_URL
  ? process.env.NEXT_PUBLIC_BABY_LCD_URL
  : "https://lcd.btc-mainnet.babylonlabs.io/";

export const bbnCanary = {
  chainId: "bbn-priv-main-1",
  chainName: "Babylon Private Mainnet",
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/babylonlabs-io/simple-staking/main/public/chain.png",
  rpc: BBN_CANARY_RPC_URL,
  rest: BBN_CANARY_LCD_URL,
  nodeProvider: {
    name: "Babylonlabs",
    email: "contact@babylonlabs.io",
    website: "https://babylonlabs.io/",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "bbn",
    bech32PrefixAccPub: "bbnpub",
    bech32PrefixValAddr: "bbnvaloper",
    bech32PrefixValPub: "bbnvaloperpub",
    bech32PrefixConsAddr: "bbnvalcons",
    bech32PrefixConsPub: "bbnvalconspub",
  },
  currencies: [
    {
      coinDenom: "BABY",
      coinMinimalDenom: "ubbn",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/babylonlabs-io/simple-staking/main/public/chain.png",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "BABY",
      coinMinimalDenom: "ubbn",
      coinDecimals: 6,
      coinImageUrl:
        "https://raw.githubusercontent.com/babylonlabs-io/simple-staking/main/public/chain.png",
      gasPriceStep: {
        low: 0.007,
        average: 0.007,
        high: 0.01,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "BABY",
    coinMinimalDenom: "ubbn",
    coinDecimals: 6,
    coinImageUrl:
      "https://raw.githubusercontent.com/babylonlabs-io/simple-staking/main/public/chain.png",
  },
  features: ["cosmwasm"],
};
