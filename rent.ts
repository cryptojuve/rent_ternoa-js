// Import
import { WaitUntil, balanceToNumber, getBalances, getKeyringFromSeed, getRentalContractData, initializeApi, makeRentOffer } from "ternoa-js"


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
        makeRentOffer(i, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
        }

        for (let f=352900 ;f < 352905 ; f++){
            const creationBlockId = await getRentalContractData(f);
            const keyring = await getKeyringFromSeed(seed);
            makeRentOffer(f, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
        }

        for (let g=359051 ;g < 359057 ; g++){
            const creationBlockId = await getRentalContractData(g);
            const keyring = await getKeyringFromSeed(seed);
            makeRentOffer(g, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
        }
}


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
    // Do something
          let i= 54374;
          const creationBlockId = await getRentalContractData(i);
          const keyring = await getKeyringFromSeed(seed);
          makeRentOffer(i, creationBlockId!.creationBlock, keyring, WaitUntil.BlockFinalization);
  }

testnet(seed,address);
