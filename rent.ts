// Import
import { WaitUntil, balanceToNumber, getBalances, getKeyringFromSeed, getRentalContractData, getRentalOffers, initializeApi, makeRentOffer, safeDisconnect } from "ternoa-js"

function isrent(address: string) {
  return address === "5FPDxicQroicPbkbGWxgesv29LLBhnMcJ4Pm38MUdPppcgqd";
}

async function main(seed: string,address: string) {
  // Construct passage en mainnet
  await initializeApi("wss://mainnet.ternoa.network");
  const caps = await getBalances(address);
  let free=balanceToNumber(caps.free);
  console.log('Nombre de Caps :' + free);
  try {
  // Do something
        for (let i=351521;i < 351526; i++){
          const creationBlockId_i = await getRentalContractData(i);
          const keyring_i = await getKeyringFromSeed(seed);
          const rental_i = await getRentalOffers(i);
          if(creationBlockId_i!.rentee == null ){  //verifie si le rent est disponible
          makeRentOffer(i, creationBlockId_i!.creationBlock, keyring_i, WaitUntil.BlockFinalization);
            if (rental_i.find(isrent) ){ //verifie si le makeRentOffer à bien fonctionné
              console.log('MakeRentOffer done for nft node :' + i);
            }else {
              console.log('script dont rent nft :' + i);
            }
          }else {
            console.log('Rent not open for nft :'+ i);
          }
        }
        for (let f=352900 ;f < 352905 ; f++){
            const creationBlockId_f = await getRentalContractData(f);
            const keyring_f = await getKeyringFromSeed(seed);
            const rental_f = await getRentalOffers(f);
            if(creationBlockId_f!.rentee == null ){
              makeRentOffer(f, creationBlockId_f!.creationBlock, keyring_f, WaitUntil.BlockFinalization);
              if (rental_f.find(isrent)){
                console.log('MakeRentOffer done for nft node :' + f);
              }else {
                console.log('script dont rent nft :' + f);
              }
            }else {
              console.log('Rent not open for nft :'+ f);
            }
          }
          for (let g=359051 ;g < 359057 ; g++){
              const creationBlockId_g = await getRentalContractData(g);
              const keyring_g = await getKeyringFromSeed(seed);
              const rental_g = await getRentalOffers(g);
              if(creationBlockId_g!.rentee == null ){
              makeRentOffer(g, creationBlockId_g!.creationBlock, keyring_g, WaitUntil.BlockFinalization);
                if (rental_g.find(isrent) ){
                console.log('MakeRentOffer done for nft node :' + g);
                }else {
                console.log('script dont rent nft :' + g);
                }
              }else {
              console.log('Rent not open for nft :'+ g);
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
        if (test_rental.find(isrent) ){
                console.log('MakeRentOffer done for nft node :' + i);
        }else {
                console.log('script dont rent nft :' + i);
              }
    }else {
      console.log("Rent not open");
    }
  }

//testnet(seed,address);
