const anchor = require('@project-serum/anchor')

const main = async () => {
  console.log('Starting tests...')
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);
  const program = anchor.workspace.Gifportal;

  const baseAccount = anchor.web3.Keypair.generate()
  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    },
    signers: [baseAccount]
  });
  console.log('Your transaction signature:', tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('GIF Count:', account.totalGifs.toString())

  await program.rpc.addGif(
  "https://media.giphy.com/media/ULR7kNP2lhJXW/giphy.gif",  
  {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey
    }
  })

  account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('GIF Count:', account.totalGifs.toString())
  console.log('GIF List:', account.gifList)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch(e) {
    console.error(e)
    process.exit(1)
  }
}

runMain()