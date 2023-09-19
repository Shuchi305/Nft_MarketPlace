import React,{useState} from 'react';
import MintNft from '../MintNft';


function Navbar() {

  const [selectedOption, setSelectedOption] = useState('');

  // Define a function to handle option selection
  
  const handleSelectChange = async (e) => {
    setSelectedOption(e.target.value);
    //select chain ID

    //change contract
  };
  return (
    <div>
      <div class="network">
        {/* <p></p> */}
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="Polygon">Polygon</option>
          <option value="Arbitrum">Arbitrum</option>
          <option value="option3">Sapolia</option>
        </select>
        {/* <p>Selected option: {selectedOption}</p> */}
      </div>

      <div class="mintNft">
        <MintNft
          chain = {selectedOption}
        />
        
      </div>

    </div>
  )
}

export default Navbar
