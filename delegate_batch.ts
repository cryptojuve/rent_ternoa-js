import { BatchCompletedEvent,  WaitUntil,  batchTxHex,  delegateNftTx, getKeyringFromSeed, initializeApi, safeDisconnect,  submitTxBlocking } from "ternoa-js"

const unDelegateTX = async (seed: string,allnftId: Array<number>) => {
    try {
    await initializeApi("wss://mainnet.ternoa.network");     
    const keyring = await getKeyringFromSeed(seed);
    var allTx=new Array(0);
    for (let i = 0; i < allnftId.length; i++) {
          const txExtrinsic = await delegateNftTx(allnftId[i], undefined );
          allTx.push(txExtrinsic);
        } 
    const signableBatchTx = await batchTxHex(allTx);
    const batchedEvents= await submitTxBlocking(signableBatchTx,WaitUntil.BlockFinalization,keyring);
    const isBatchCompleted = batchedEvents.events.findEvents(BatchCompletedEvent);
    if (isBatchCompleted.length  <=0) {
        console.log('4 - undelegate fail');
        }else {
            console.log('4 - UnDelegate done');
        }

      } finally {
        await safeDisconnect();
        process.exit();
      }
  }

const DelegateTX = async (seed: string,recipient: string,allnftId: Array<number>) => {
  try {
  await initializeApi("wss://mainnet.ternoa.network");
  const keyring = await getKeyringFromSeed(seed);
  var allTx=new Array(0);
  console.log('1 - Debut fonction');
  for (let i = 0; i < allnftId.length; i++) {
        const txExtrinsic = await delegateNftTx(allnftId[i], recipient );
        allTx.push(txExtrinsic);
      } 
  console.log('2 - Après boucle sur les nft');
  const signableBatchTx = await batchTxHex(allTx);
  const batchedEvents= await submitTxBlocking(signableBatchTx,WaitUntil.BlockInclusion,keyring);
  const isBatchCompleted = batchedEvents.events.findEvents(BatchCompletedEvent);
    if (isBatchCompleted.length > 0) {
        console.log('3 - Delegate done - start undelegate');
        await unDelegateTX(seed,allnftId);
    } else {
        console.log('3 - Delegate fail');
    }
}finally {
    await safeDisconnect();
    process.exit();
  }
}

const recipient = "5FKpteZCNEWd6rUa1RxMdzG8gir3SufzYVTKRqyoKix4RRKX"; //l'adresse du monstre
const seed = ""; //votre seed
const allnftId = [11111,22222,33333]; // mettre le numero des 100 nft separé par une virgule



DelegateTX(seed,recipient,allnftId);


