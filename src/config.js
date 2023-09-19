import { createWalletClient,createPublicClient, custom } from 'viem'
import { polygonMumbai, arbitrumGoerli, bscTestnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import {http} from 'viem';

const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })


export const public_client_polygon = createPublicClient({
  chain: polygonMumbai,
  transport: http('https://polygon-mumbai.g.alchemy.com/v2/fOvVXX6nJ9alPRAvnmAuSfTm1nQiFVf1')
})

export const wallet_client_polygon = createWalletClient({ 
  account,
  chain: polygonMumbai,
  transport: custom(window.ethereum)
})

export const public_client_arbitrum = createWalletClient({ 
  chain: arbitrumGoerli,
  transport: http("https://arb-goerli.g.alchemy.com/v2/m8Euu6B3t_vLe6yxc45eDSePyPYxzG6l")
})

export const wallet_client_arbitrum = createWalletClient({ 
  account,
  chain: arbitrumGoerli,
  transport: custom(window.ethereum)
})

