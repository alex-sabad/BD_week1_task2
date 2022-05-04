const crypto = require('crypto');
const secp256k1 = require('secp256k1');

const msg = process.argv[2];
const digested = digest(msg);

console.log(`0) i's message:
    message: ${msg}
    message digest: ${digested.toString("hex")}`);

//-----generate private/publick Key
let privateKey;
let count_found = 0;// count try found
do{
    privateKey = crypto.randomBytes(32);
    count_found++;
}while(!secp256k1.privateKeyVerify(privateKey));

console.log(`Count check: ${count_found}`);

const publicKey = secp256k1.publicKeyCreate(privateKey);

console.log(`1) i's keypar:
    publKey: ${publicKey.toString("hex")}
    privateKey: ${privateKey.toString("hex")}`);

//----end generate

//----start  
console.log(`2) I signet:`);
const sigObj = secp256k1.ecdsaSign(digested, privateKey);
const sig = sigObj.signature;
console.log(" Signature:", Buffer.from(sig).toString("hex"));
//-----end

//----start verify
console.log(`2) is_verify:`);
let verified = secp256k1.ecdsaVerify(sig, digested, publicKey);
console.log("	verified:", verified);


//----end
function digest (str, algo = "sha256"){
    return crypto.createHash(algo).update(str).digest();
}
/*
var str_inpot = "inpot string";
var md5 = crypto.createHash('md5').update(str_inpot).digest('hex');
console.log("str inpot: " + str_inpot + "  ,resuly_hash" + md5);
*/