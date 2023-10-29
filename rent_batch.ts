import { BatchCompletedEvent,WaitUntil,  balanceToNumber,  batchTxHex, getBalances, getKeyringFromSeed, getRentalContractData, getRentalOffers, initializeApi, makeRentOfferTx, safeDisconnect,  submitTxBlocking } from "ternoa-js"

const rentTX = async (reseau:string,seed: string,wallet: string,address: string,allnftId: Array<number>) => {
  try {
      await initializeApi(reseau);
      const keyring = await getKeyringFromSeed(seed);
      const caps = await getBalances(address);
      let free=balanceToNumber(caps.free);
      console.log(wallet + '-> Nombre de Caps :' + free);
      var allTx=new Array(0);
      for (let i = 0; i < allnftId.length; i++) {
            const creationBlockId = await getRentalContractData(allnftId[i]);
        if(creationBlockId!.rentee == null ){
            const rental = await getRentalOffers(allnftId[i]);
            if (rental.find(item => item  === address) ){ 
              console.log(wallet + ' -> MakeRentOffer already done :' + allnftId[i]);
            }else {
            console.log(wallet + ' -> MakeRentOffer run for nft :' + allnftId[i]);
            const txExtrinsic = await makeRentOfferTx(allnftId[i], creationBlockId!.creationBlock);
            allTx.push(txExtrinsic);
          } 
        } else {
          console.log('Node '+ allnftId[i]+ ' pas ouvert');
        }
      }
      console.log('Nombre de TX : '+allTx.length);
      if (allTx.length>=2){
        const signableBatchTx = await batchTxHex(allTx);
        const batchedEvents= await submitTxBlocking(signableBatchTx,WaitUntil.BlockInclusion,keyring);
    
        const isBatchCompleted = batchedEvents.events.findEvents(BatchCompletedEvent);
      
        if (isBatchCompleted.length <= 0) {
            console.log('MakeOfferRent Fail');
        } else {
            console.log('MakeOfferRent Done');
        }
      }else{
        console.log('Aucune operation lancée')
      }

  }finally {
    await safeDisconnect();
    process.exit();
  }
}

const alphanet_wallet="Alphanet";
const alphanet_allnftId = [82007,82008,82009,82010,82011,82012,82013,82014,82015,82016,82017,82018,82019,82020,82021,82022];
const wallet = "Mainnet";
const allnftId = [351521, 351522, 351523, 351524, 351525, 352900, 352901, 352902, 352903, 352904, 359051, 359052, 359053, 359054, 359055, 359056]; 

const seed="wild bunker stick anxiety label forum fine measure soap best bomb monitor";
const addresse = "5FPDxicQroicPbkbGWxgesv29LLBhnMcJ4Pm38MUdPppcgqd";

const mainnet = "wss://mainnet.ternoa.network";
const alphanet = "";

// TESTNET
//rentTX(alphanet,seed,alphanet_wallet,addresse,alphanet_allnftId); 

 // Mainnet
rentTX(mainnet,seed,wallet,addresse,allnftId);
