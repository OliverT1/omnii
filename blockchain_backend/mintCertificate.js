const { create } = require("ipfs-http-client");

const ipfs = create("https://ipfs.infura.io:5001");
const existingContractAddr = "0x877E6e6236c0c02C91edBAc7cC6191cFAAa4cB0d";

// we added two attributes, add as many as you want!
async function run() {
const vintageTokenId = 19;
const verified = true;

  // const files = [{
  //   path: '/',
  //   content: JSON.stringify({
  //     name: "A verifed Toucan Project Vintage",
  //       location :
  //       {
  //         latitude: 25.908866,
  //         longitude: 102.968453,
  //         sizeHectares: 6879,
  //       },
  //       projectId: 1542,
  //       projectTokenId: 19,
  //       vintageTokenId: vintageTokenId,
  //       metrics : {
  //           baselineBiomass5Year : 298338.5,
  //           satelliteDelta1Year: 89992.5,
  //           projectedDelta1Year: 54734,
  //       },
  //       verified: true,
  //   })
  // }];

  const result = await ipfs.add('file.json');
  console.log(result.path);

  

}

run().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});;