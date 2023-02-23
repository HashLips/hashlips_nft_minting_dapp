import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from './redux/blockchain/blockchainActions';
import { fetchData } from './redux/data/dataActions';
import * as s from './styles/globalStyles';
import styled from 'styled-components';

//Merkle Setup
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const keccak256 = require('keccak256')

const addresses = ['0x25907BE2D625EaBFC4b4E83E17dCABE51959e35B','0xfb0D057678E9A03797E8154C49d6316fcFD7918F','0x056bf45a910a1713260448fb35b87109b9b9d80b','0x98359eb889b8b6167806B776446360D1751Fadd7','0x8D50a309199fF26d135f054e51EBAe757315c91C','0x25907BE2D625EaBFC4b4E83E17dCABE51959e35B','0xfb0D057678E9A03797E8154C49d6316fcFD7918F','0x056bf45a910a1713260448fb35b87109b9b9d80b','0x7263a16a44d09fcaa1bb88366eaf0e4d56b665a4','0x90D5b10f2d9211f24E39e8976c2BeC0F4DFb3c14','0x0CfA03c936D4D12209Ee44dcaC4369be84A04557','0xaAB511A6BDc9c8080d4bc7Af1940245fEaB3D2A6','0xDB19C7A164537D3391e6f319E617e5cE4C4F980D','0x5d8a6e6F737A4B7E1e8E7265CB065d0B749121b7','0x051b436B0c8D571C52Adf53df91AF5E08e60bbbE','0xCA779fb29e1168321312a22Cc0099BF910081F8f','0x72dD593D2d7d7203C897CC243531C5B01e29993A','0x7d436a3736a9f83f62Af88232A6D556eC9d05C9B','0x7146f390d0d23460422fe2552c33fe98381b8034','0x473cC656b29F3556fCD1226840cf4DA1F386C533','0x3a5c0a68A0a26374F97A54500728fa6612758906','0xA2bD03f356d776687b9ec74dDcf13ED386530e76','0x41c3daB93881286A4e260577f05FEbC16DaFeD88','0xbE1BFf5270d600FD06009ffF4B72140442c6aF4c','0xe173B2A39Af03970e921fdAe3d81Ca8c54C8DF54','0xB757ee74B21798E7860e613d5d1f4d086F6d1612']

const leaves = addresses.map(x => keccak256(x))

const tree = new MerkleTree(leaves, keccak256, {sortPairs:true})
const buf2hex = x => '0x' + x.toString('hex')

console.log(buf2hex(tree.getRoot()));

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  width: 100%;
  @media (min-width: 900px) {
    width: 100%;
  }
  @media (min-width: 1000px) {
    width: 100%;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: '',
    SCAN_LINK: '',
    NETWORK: {
      NAME: '',
      SYMBOL: '',
      ID: 0,
    },
    NFT_NAME: '',
    SYMBOL: '',
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: '',
    MARKETPLACE_LINK: '',
    SHOW_BACKGROUND: false,
  });


  const claimWLNFTs = () => {
    let cost = 0;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log('Cost: ', totalCostWei);
    console.log('Gas limit: ', totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    //Check Merkle
    let test2 = tree.getProof(keccak256(blockchain.account)).map(x=>buf2hex(x.data))
    //.map(x=>buf2hex(x.data))
    
    console.log("Merkle Test: ",test2)

    //This Contract can only be minted via WhiteList.
    blockchain.smartContract.methods
      .whitelistMint(mintAmount,test2)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once('error', (err) => {
        console.log(err);
        setFeedback('Sorry, something went wrong please try again later.');
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };


  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log('Cost: ', totalCostWei);
    console.log('Gas limit: ', totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    //Check Merkle
    //const test = tree.getProof(keccak256(blockchain.account)).map(x=>buf2hex(x.data))
    //.map(x=>buf2hex(x.data))
    //const cleanproof = proof.replace(' ','')
    //console.log(test)

    //This Contract can only be minted via WhiteList.
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once('error', (err) => {
        console.log(err);
        setFeedback('Sorry, something went wrong please try again later.');
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      console.log("Initial Tree: "+tree)
      const test = tree.getProof(keccak256(blockchain.account)).map(x=>buf2hex(x.data))
      //.map(x=>buf2hex(x.data))
      //const cleanproof = proof.replace(" ","")
      console.log(test)
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch('/config/config.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  const isPaused = () => {
    if(data.paused === true){
      return true;
    }
    return false;
  }

  const isClaimed = () => {
    if(data.claimed === true){
      return true;
    }
    return false;
  }

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={'left'}
        style={{ padding: 24, backgroundColor: 'var(--primary)' }}
        image={CONFIG.SHOW_BACKGROUND ? '/config/images/icans_bg.jpg' : null}
      >
        
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={'center'} ai={'center'}>
            <s.TextTitle style={{
                textAlign: 'left',
                fontSize: 90,
                lineHeight:'70px',
                fontWeight: 'bold',
                color: 'var(--secondary)',
              }}>Interactive Cans by Rescue</s.TextTitle>
<s.TextSubTitle style={{
                textAlign: 'left',
                fontSize: 50,
                lineHeight:'50px',
                fontWeight: '300',
                color: 'var(--primary-text)',
              }}>Think Etch ah Sketch Meets Graffiti Artist Rescue on The Blockchain Forever!</s.TextSubTitle>
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={1}
            jc={'center'}
            ai={'center'}
            style={{
              backgroundColor: 'var(--primary-text)',
              padding: 24,
              borderRadius: 24,
              border: '4px solid var(--secondary)',
              boxShadow: '0px 5px 11px 2px rgba(0,0,0,0.7)',
            }}
          >
           <s.TextTitle style={{
                textAlign: 'center',
                fontSize: 50,
                fontWeight: '300',
                color: 'var(--primary)',
              }}>Mint yourself an iCan!</s.TextTitle>
              <s.TextTitle>
              {isPaused() ? (
                'Yes it\'s Paused'
              ):('No it\'s Not Paused')
              }
              </s.TextTitle>
            <s.TextTitle
              style={{
                textAlign: 'center',
                fontSize: 50,
                fontWeight: 'bold',
                color: 'var(--primary)',
              }}
            >              
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: 'center',
                color: 'var(--primary)',
              }}
            >
              <StyledLink target={'_blank'} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
            </s.TextDescription>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: 'center', color: 'var(--primary)' }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: 'center', color: 'var(--primary)' }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={'_blank'} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: 'center', color: 'var(--primary)' }}
                >
                  1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{' '}
                  {CONFIG.NETWORK.SYMBOL}.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: 'center', color: 'var(--primary)' }}
                >
                  Excluding gas fees.
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === '' ||
                blockchain.smartContract === null ? (
                  <s.Container ai={'center'} jc={'center'}>
                    <s.TextDescription
                      style={{
                        textAlign: 'center',
                        color: 'var(--primary)',
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== '' ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: 'center',
                            color: 'var(--primary)',
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: 'center',
                        color: 'var(--primary)',
                      }}
                    >
                    {isPaused() ? (''):(feedback)}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={'center'} jc={'center'} fd={'row'}>
                    {isPaused() ? (''):(<>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: 'center',
                          color: 'var(--primary)',
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                      </>)}
                    </s.Container>
                    <s.SpacerSmall />
                    {isClaimed ? (<>
                                        <s.TextDescription
                                          style={{
                                            textAlign: 'center',
                                            color: 'var(--primary)',
                                            fontSize: '2rem',
                                            maxWidth: '70%',
                                            lineHeight: '2.2rem',
                                            marginBottom: '50px'
                                          }}
                                        >
                                          {data.claimed ? ('You have Already Claimed your complimentary iCan but you can Mint more during public mint'):('Ready to claim')}
                                        </s.TextDescription>
                                        {isPaused() ? ('Public Mint is Paused'):(
                                         <StyledButton
                                         disabled={claimingNft ? 1 : 0}
                                         onClick={(e) => {
                                           e.preventDefault();
                                           claimNFTs();
                                          //claimNFTs();
                                          getData();
                                          }}>{claimingNft ? "BUSY" : "BUY ICAN"}</StyledButton>
                                        )}
                                       </>
                    ):(
                                         <StyledButton
                                         disabled={claimingNft ? 1 : 0}
                                         onClick={(e) => {
                                           e.preventDefault();
                                           {isPaused() ? (
                                               claimWLNFTs()
                                             ):(
                                               claimNFTs()
                                             )
                                           }
                                           //claimNFTs();
                                           getData();
                                         }}
                                       >
                                         
                                         {claimingNft ? "BUSY" : isPaused() ? "CLAIM ICAN" : "BUY ICAN"}
                                       </StyledButton>
                    )
                    
                  
                  }
                    <s.Container ai={'center'} jc={'center'} fd={'row'}>
   
                      
                    </s.Container>

                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
            <s.Container jc={'center'} ai={'center'} style={{ width: '70%' }}>
          <s.TextDescription
            style={{
              textAlign: 'center',
              color: 'var(--primary)',
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address. Please note:
            Once you make the purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          {/*<s.TextDescription
            style={{
              textAlign: 'center',
              color: 'var(--primary)',
            }}
          >
            We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
            successfully mint your NFT. We recommend that you don't lower the
            gas limit.
          </s.TextDescription>*/}
        </s.Container>
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>
        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
