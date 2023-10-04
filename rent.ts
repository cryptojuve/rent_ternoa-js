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

main(seed,address);

//Testnet faucet ici : https://www.ternoa.network/fr/alphanet

async function testnet(seed: string,address: string) {
    await initializeApi();
    try {
      const caps = await getBalances(address);
      let free=balanceToNumber(caps.free);
      console.log('Nombre de Caps :' + free);
      let i= 54374; // nft -> https://alphanet.secret-stash.io/nft/54374
      const test_creationBlockId = await getRentalContractData(i);
      const test_keyring = await getKeyringFromSeed(seed);
      const test_rental = await getRentalOffers(i);
      if(test_creationBlockId!.rentee == null ){
          console.log("Rent is open for nft : "+ i);
          makeRentOffer(i, test_creationBlockId!.creationBlock, test_keyring, WaitUntil.BlockFinalization);
          if (test_rental.find(item => item  === address) ){
                  console.log('MakeRentOffer done for nft node :' + i);
          }else {
                  console.log('script dont rent nft :' + i);
          }
      }else {
        console.log("Rent not open");
      }
    }finally {
      await safeDisconnect();
      process.exit();
    }
}
//testnet(seed,address);
