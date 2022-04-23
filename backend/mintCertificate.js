const { create } = require("ipfs-http-client");

const ipfs = create("https://ipfs.infura.io:5001");

// we added two attributes, add as many as you want!
async function run() {
  const files = [{
    path: '/',
    content: JSON.stringify({
      name: "A verifed Toucan Project Vintage",
        location :
        {
          latitude: "Bored",
          longitude: "100"
        },
        baseline: ,
        validated: ,
        delta_c: ,

      image: "https://gateway.pinata.cloud/ipfs/QmYxT4LnK8sqLupjbS6eRvu1si7Ly2wFQAqFebxhWntcf6/",
    })
  }];

  const result = await ipfs.add(files);
  console.log(result);

}

run();