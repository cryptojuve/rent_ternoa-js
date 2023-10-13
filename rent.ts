// Import
import { WaitUntil, balanceToNumber, getBalances, getKeyringFromSeed, getRentalContractData, getRentalOffers, initializeApi, makeRentOffer, safeDisconnect } from "ternoa-js"

async function main(seed: string,address: string) {
  // Construct passage en mainnet
  await initializeApi("wss://mainnet.ternoa.network");
  const caps = await getBalances(address);
  let free=balanceToNumber(caps.free);
  console.log('Nombre de Caps :' + free);
  var allnftId = [351521, 351522, 351523, 351524, 351525, 352900, 352901, 352902, 352903, 352904, 359051, 359052, 359053, 359054, 359055, 359056];
  try {
      for (const nftId of allnftId) {
           const creationBlockId = await getRentalContractData(nftId);
          const keyring = await getKeyringFromSeed(seed);
          const rental = await getRentalOffers(nftId);
          if(creationBlockId!.rentee == null ){  //verifie si le rent est disponible
          makeRentOffer(nftId, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
            if (rental.find(item => item  === address) ){ //verifie si le makeRentOffer à bien fonctionné
              console.log('MakeRentOffer done for nft node :' + nftId);
            }else {
              console.log('Error script dont rent nft :' + nftId);
            }
          }else {
            console.log('Rent not open for nft :'+ nftId);
          }
      }
  }
  finally {
     await safeDisconnect();
     process.exit();
   }
}

const seed="wild bunker stick anxiety label forum fine measure soap best bomb monitor";
const address="5FPDxicQroicPbkbGWxgesv29LLBhnMcJ4Pm38MUdPppcgqd";

//main(seed,address);

//Testnet faucet ici : https://www.ternoa.network/fr/alphanet

async function testnet(seed: string,address: string) {
  // Construct passage en mainnet
  await initializeApi();
  const caps = await getBalances(address);
  let free=balanceToNumber(caps.free);
  console.log('Nombre de Caps :' + free);
  var test_allnftId = [54367,54368,54369,54370,54371,54372,54373,54374,54375,54376,54598,54599,55041,55042,72126,72224];
  try {
      for (const test_nftId of test_allnftId) {
          const creationBlockId = await getRentalContractData(test_nftId);
          const keyring = await getKeyringFromSeed(seed);
          const rental = await getRentalOffers(test_nftId);
          if(creationBlockId!.rentee == null ){
          makeRentOffer(test_nftId, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
              if (rental.find(item => item  === address) ){ //verifie si le makeRentOffer à bien fonctionné
                console.log('MakeRentOffer done for nft node :' + test_nftId);
              }else {
                console.log('Error script dont rent nft :' + test_nftId);
              }
          }else {
            console.log('Rent not open for nft :'+ test_nftId);
          }
      }
  }
  finally {
     await safeDisconnect();
     process.exit();
   }
      
}
testnet(seed,address);
