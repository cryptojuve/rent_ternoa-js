import { BatchCompletedEvent,balanceToNumber, getBalances, safeDisconnect , BatchInterruptedEvent, WaitUntil, batchAllTxHex, batchTxHex, delegateNftTx, getKeyringFromSeed, initializeApi, submitTxBlocking } from "ternoa-js"

const UnDelegateTX = async (reseau: string,seed: string,allnftId: Array<number>) => {
  try {
      await initializeApi(reseau);
      const keyring = await getKeyringFromSeed(seed);
      var allTx=new Array(0);
      for (let i = 0; i < allnftId.length; i++) {
          const delegueTx = await delegateNftTx(allnftId[i], undefined);
          allTx.push(delegueTx);
      } 
      console.log('Nombre de TX : '+allTx.length);
      if (allTx.length>=1){
        const signableBatchTx = await batchTxHex(allTx);
        const batchedEvents= await submitTxBlocking(signableBatchTx,WaitUntil.BlockInclusion,keyring);
        const isBatchCompleted = batchedEvents.events.findEvents(BatchCompletedEvent);
        if (isBatchCompleted.length <= 0) {
            console.log('UnDelegate Fail');
        } else {
            console.log('UnDelegate Done');
        }
      }else{
        console.log('Aucune operation lancée')
      }
  }finally {
    await safeDisconnect();
    process.exit();
  }
}

const DelegateTX = async (reseau:string,seed: string,recipient: string,allnftId: Array<number>) => {
  try {
      await initializeApi(reseau);
      const keyring = await getKeyringFromSeed(seed);
      var allTx=new Array(0);
      for (let i = 0; i < allnftId.length; i++) {
          const delegueTx = await delegateNftTx(allnftId[i], recipient);
          allTx.push(delegueTx);
      } 
      console.log('Nombre de TX : '+allTx.length);
      if (allTx.length>=1){
        const signableBatchTx = await batchTxHex(allTx);
        const batchedEvents= await submitTxBlocking(signableBatchTx,WaitUntil.BlockInclusion,keyring);
        const isBatchCompleted = batchedEvents.events.findEvents(BatchCompletedEvent);
        if (isBatchCompleted.length <= 0) {
            console.log('Delegate Fail');
        } else {
            console.log('Delegate Done');
            await UnDelegateTX(reseau,seed,allnftId);
        }
      }else{
        console.log('Aucune operation lancée')
      }
  }finally {
    await safeDisconnect();
    process.exit();
  }
}

const seed = ""; //votre seed
const allnftId = [11111,22222,33333]; // mettre le numero des 100 nft separé par une virgule

const recipient = "5FKpteZCNEWd6rUa1RxMdzG8gir3SufzYVTKRqyoKix4RRKX"; //l'adresse du monstre
const mainnet ="wss://mainnet.ternoa.network";
const alphanet =""; //Pour tester en alphanet remplacer à la ligne 66 la valeur mannaint par alphanet

  DelegateTX(mainnet,seed,recipient,allnftId);


