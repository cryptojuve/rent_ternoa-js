// Import
import { WaitUntil, balanceToNumber, getBalances, getKeyringFromSeed, getRentalContractData, getRentalOffers, initializeApi, makeRentOffer } from "ternoa-js"

function isrent(address: string) {
  return address === "5FPDxicQroicPbkbGWxgesv29LLBhnMcJ4Pm38MUdPppcgqd";
}

async function main(seed: string,address: string) {
  // Construct passage en mainnet
  await initializeApi("wss://mainnet.ternoa.network");
  const caps = await getBalances(address);
  let free=balanceToNumber(caps.free);
  console.log('Nombre de Caps :' + free);
  // Do something
        for (let i=351521;i < 351526; i++){
          const creationBlockId = await getRentalContractData(i);
          const keyring = await getKeyringFromSeed(seed);
          const rental = await getRentalOffers(i);
          if(creationBlockId!.rentee == null ){  //verifie si le rent est disponible
          makeRentOffer(i, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
            if (rental.find(isrent) ){ //verifie si le makeRentOffer à bien fonctionné
              console.log('MakeRentOffer done for nft node :' + i);
            }else {
              console.log('script dont rent nft :' + i);
            }
          }else {
            console.log('Rent not open for nft :'+ i);
          }
        }
        for (let f=352900 ;f < 352905 ; f++){
          const creationBlockId = await getRentalContractData(f);
          const keyring = await getKeyringFromSeed(seed);
          const rental = await getRentalOffers(f);
          if(creationBlockId!.rentee == null ){
            makeRentOffer(f, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
            if (rental.find(isrent)){
              console.log('MakeRentOffer done for nft node :' + f);
            }else {
              console.log('script dont rent nft :' + f);
            }
          }else {
            console.log('Rent not open for nft :'+ f);
          }
        }
        for (let g=359051 ;g < 359057 ; g++){
            const creationBlockId = await getRentalContractData(g);
            const keyring = await getKeyringFromSeed(seed);
            const rental = await getRentalOffers(g);
            if(creationBlockId!.rentee == null ){
            makeRentOffer(g, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
              if (rental.find(isrent) ){
              console.log('MakeRentOffer done for nft node :' + g);
              }else {
              console.log('script dont rent nft :' + g);
              }
            }else {
            console.log('Rent not open for nft :'+ g);
            }
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
    const creationBlockId = await getRentalContractData(i);
    const keyring = await getKeyringFromSeed(seed);
    const rental = await getRentalOffers(i);
    if(creationBlockId!.rentee == null ){
        console.log("Rent is open for nft : "+ i);
        makeRentOffer(i, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
        if (rental.find(isrent) ){
                console.log('MakeRentOffer done for nft node :' + i);
        }else {
                console.log('script dont rent nft :' + i);
              }
    }else {
      console.log("Rent not open");
    }
  }

testnet(seed,address);
