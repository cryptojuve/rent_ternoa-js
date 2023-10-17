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
        if(creationBlockId!.rentee == null ){
            if (rental.find(item => item  === address) ){ //verifie si le makeRentOffer à bien fonctionné
              console.log('MakeRentOffer already done :' + nftId);
            }else {
              console.log('MakeRentOffer run for nft :' + nftId);
              makeRentOffer(nftId, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
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
// A modifier
const seed="wild bunker stick anxiety label forum fine measure soap best bomb monitor";
const address="5FPDxicQroicPbkbGWxgesv29LLBhnMcJ4Pm38MUdPppcgqd";

main(seed,address);

//Testnet faucet ici : https://www.ternoa.network/fr/alphanet

async function testnet(seed: string,address: string) {
  // Construct passage en mainnet
  await initializeApi();
  const caps = await getBalances(address);
  let free=balanceToNumber(caps.free);
  console.log('Nombre de Caps :' + free);
  var test_allnftId = [82007,82008,82009,82010,82011,82012,82013,82014,82015,82016,82017,82018,82019,82020,82021,82022];
  try {
      for (const test_nftId of test_allnftId) {
          const creationBlockId = await getRentalContractData(test_nftId);
          const keyring = await getKeyringFromSeed(seed);
          const rental = await getRentalOffers(test_nftId);
          if(creationBlockId!.rentee == null ){
              if (rental.find(item => item  === address) ){ //verifie si le makeRentOffer à bien fonctionné
                console.log('MakeRentOffer already done :' + test_nftId);
              }else {
                console.log('MakeRentOffer run for nft :' + test_nftId);
                makeRentOffer(test_nftId, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
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

//testnet(seed,address);
