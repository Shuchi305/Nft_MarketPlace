import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { public_client_polygon, wallet_client_polygon, public_client_arbitrum, wallet_client_arbitrum } from '../../config';
import { mint_nft_abi } from '../../abi/nft';
import './MintNft.css'


function MintNft(chain) {
    const [fileImg, setFileImg] = useState(null);
    const [ImgHash, setImgHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [publicClient, setPublicClient] = useState(public_client_polygon);
    const [walletClient, setWalletClient] = useState(wallet_client_polygon);
    const [contractAddress, setContractAddress] = useState(process.env.REACT_APP_CONTACT_ADDRESS_POLYGON)
    console.log(chain)

    useEffect(()=>{
        if(chain==='Polygon'){
            setContractAddress(process.env.REACT_APP_CONTACT_ADDRESS_POLYGON);
            setPublicClient(public_client_polygon);
            console.log('setuppublicclient')
            setWalletClient(wallet_client_polygon);
            console.log('setupwalletclient')
        }
        else{
            setContractAddress(process.env.REACT_APP_CONTACT_ADDRESS_ARBITRUM);
            setPublicClient(public_client_arbitrum);
            setWalletClient(wallet_client_arbitrum);

        }
    },[chain])

    const handleMintNFT = async (ImgHash) => {
        
        try {
            const [ address ] = await walletClient.getAddresses()
            const { request } = await publicClient.simulateContract({
            address: `${contractAddress}`,
            abi: [mint_nft_abi],
            functionName: 'mintNFT',
            account: address,
            args: [
                '0x7DDE8F2014A49495731216CD7eb69F9981829b09',
                ImgHash
            ],
        })
        const hash = await walletClient.writeContract(request);
        console.log(hash);
        setLoading(false);
        
    
        } catch (error) {
          console.error("Failed to mint NFT:", error);
          setLoading(false);
        }
      };
    const sendFileToIPFS = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (fileImg) {
            try {

                const formData = new FormData();
                formData.append("file", fileImg);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                        'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                        "Content-Type": "multipart/form-data"
                    },
                });

                const I = `ipfs://${resFile.data.IpfsHash}`;
                console.log(I); 
                setImgHash(ImgHash);
                
            } catch (error) {
                console.log("Error sending File to IPFS: ")
                console.log(error)
            }
            handleMintNFT(ImgHash);
        }
    }
    return (
        <div className='container'>
            <h2>Upload a File to IPFS</h2>
            <form onSubmit={sendFileToIPFS}>
                <input type="file" onChange={(e) =>setFileImg(e.target.files[0])} required />
                <button type='submit' >
                    {loading ? 
                        (<>loading</>) 
                    :   
                        (<>Mint NFT</>)}
                </button>            
            </form>
        </div>
    )
}

export default MintNft
