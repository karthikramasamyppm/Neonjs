const url = 'http://139.59.67.102:30333';
const neoscan_url = 'http://139.59.67.102:4000/api/main_net/';

var _Neon = Neon.default;

const config = {
  name: 'PrivateNet',
  extra: {
    neoscan: neoscan_url
  }
}

const client = _Neon.create.rpcClient(url, '2.3.2');

// GET BALANCE
const privateNet = new Neon.rpc.Network(config)
_Neon.add.network(privateNet);

var contractScriptHash = "c85f598d45cd00a68e7c53d5f68ff4562d974d8f";
var WIF_KEY = "KxRTKHp8quR1b7QpjRpzqDY9kjnznbMbrG5wBM9tkn2Fj2wuKRx7";
var WIF_KEY_2 = "L3xZs7uhpseXNmgEXy5f4nBDjDPRFWD61ELoNSTuTpTr6pQeKvHH";//karthik1
var WIF_KEY_3 = "L1XgnzHMqiAKgNe9VRH94Kwmnvov88nJq9WT9xD2WbUGfaXq9eZG";//karthik2
var WIF_KEY_4="KzMfgp6hrBC79FXY71LYxpZiMaM4hbVo8rS3Fg3MXJRCtV5UFAQe";
let account = new Neon.wallet.Account(WIF_KEY);
let account2 = new Neon.wallet.Account(WIF_KEY_2);
let account3 = new Neon.wallet.Account(WIF_KEY_3);
let buyerAccount =new Neon.wallet.Account(WIF_KEY_4);

let sh1 = "";
let sh2 = "";
let sh3 = "";

const ActiveBasketOrder = Neon.u.str2hexstring("activeBasketOrder");
const InActiveBasketOrder = Neon.u.str2hexstring("inActiveBasketOrder");

function signTx(tx, publicKey) {
  console.log(account.privateKey);
  return Promise.resolve(tx.sign(account.privateKey));
}

const NEO_ASSET_ID = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
const NEO_GAS_ASSET_ID = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";

const DDT1 = "";
const DDT2 = "";
const DDT3 = "";

function getConfigCreator(operation, args) {
  return stateConfig = {
    scriptHash: contractScriptHash,
    operation: operation,
    args: args
  }
}

function getTokenBalance(tokenSH, address) {
  tokenBalConfig = {
    scriptHash: tokenSH,
    operation: "balanceOf",
    args: [Neon.u.reverseHex(address)]
  }

  const script = _Neon.create.script(tokenBalConfig);

  Neon.rpc.Query.invokeScript(script)
  .execute(url)
  .then(res => {
    console.log(res.result.stack[0]);
  });
}

function tokenTransfer(tokenSH, from, to, amount) {
  from = Neon.u.reverseHex(from);
  to = Neon.u.reverseHex(to);

  const transferConfig = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: tokenSH,
      operation: 'transfer',
      args: [from, to, amount]
    }),
    address: account.address,
    privateKey: account.privateKey,
    gas: 0,
    fees: 0.001
  }

  _Neon.doInvoke(transferConfig)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}
function initialize() {
//alert("hai");
var arg1=parseInt(document.getElementById("sellerfee").value);			    
var arg2=parseInt(document.getElementById("buyerFee").value);
var arg3=document.getElementById("feeaddr").value;

//alert("arg1:"+arg1);
//alert("arg1:"+arg2);
//alert("arg1:"+ Neon.u.reverseHex(arg3));
  const initConfig = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'initialize',
      args: [arg1, arg2, Neon.u.reverseHex(arg3)]
    }),
    address: account.address,
    privateKey: account.privateKey,
    // signingFunction: signTx,
    gas: 1,
    fees: 0.01
  }

  _Neon.doInvoke(initConfig)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}
function getSellerFee() {
  
  const script = _Neon.create.script(getConfigCreator("getSellerFee"));

  Neon.rpc.Query.invokeScript(script)
  .execute(url)
  .then(res => {
    alert("GetSellerFee:"+Neon.u.hexstring2ab(res.result.stack[0].value)[0]);
    console.log(Neon.u.hexstring2ab(res.result.stack[0].value)[0]);
    document.getElementById('getsellfee').innerHTML=Neon.u.hexstring2ab(res.result.stack[0].value)[0];  
  });
}

function getBuyerFee() {
 
  const script = _Neon.create.script(getConfigCreator("getBuyerFee"));

  Neon.rpc.Query.invokeScript(script)
  .execute(url)
  .then(res => {
    alert("GetBuyerFee:"+Neon.u.hexstring2ab(res.result.stack[0].value)[0]);
    console.log(Neon.u.hexstring2ab(res.result.stack[0].value)[0]);
    document.getElementById('getbuyfee').innerHTML=Neon.u.hexstring2ab(res.result.stack[0].value)[0];  
  });
}
function setSellerFee() {
alert("SetSellerFunctionInvoked");
var arg1=parseInt(document.getElementById("setsellerfee").value);
alert("arg1:"+arg1);	
  const feeAddressConfig = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'setSellerFee',
      args: [arg1]
    }),
    address: account.address,
    privateKey: account.privateKey,
    // signingFunction: signTx,
    gas: 0,
    fees: 0.01
  }

  _Neon.doInvoke(feeAddressConfig)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}

function setBuyerFee() {
  alert("setBuyerFunction invoked")
  var arg1=parseInt(document.getElementById("setbuyerFee").value);
  alert("arg1:"+arg1);	
  const feeAddressConfig = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'setBuyerFee',
      args: [arg1]
    }),
    address: account.address,
    privateKey: account.privateKey,
    // signingFunction: signTx,
    gas: 0,
    fees: 0.01
  }

  _Neon.doInvoke(feeAddressConfig)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}

//function deposit(value, assetid, originator) {
  function deposit() {
  var value=parseInt(document.getElementById("amount").value);			    
  var assetid=document.getElementById("assetid").value.trim();
  var originator=document.getElementById("originator").value;
  alert("value:"+value+" "+"assetid:"+assetid+" "+"orignator:"+originator);

  originator = Neon.u.reverseHex(originator);
  //alert("Originator:"+originator);

  let intents;
  if (assetid == NEO_GAS_ASSET_ID) {
    //alert("inif"+assetid)
    intents = Neon.api.makeIntent({GAS: value}, Neon.wallet.getAddressFromScriptHash(contractScriptHash));
    value = value * 100000000;
  } else if (assetid == NEO_ASSET_ID) {
    //alert("elseif"+assetid)
    intents = Neon.api.makeIntent({NEO: value}, Neon.wallet.getAddressFromScriptHash(contractScriptHash));
    value = value * 100000000;
  }
  //alert(assetid);

  assetid = Neon.u.reverseHex(assetid);
  //alert("Assetid:"+assetid)

  const depositConfig = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'deposit',
      args: [originator, assetid, value]
    }),
    intents: intents,
    address: account2.address,
    privateKey: account2.privateKey,
    // signingFunction: signTx,
    gas: 0,
    fees: 0.001
  }

  _Neon.doInvoke(depositConfig)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}
//function getBalance(assetid, originator) {
  function getBalance(){
  var assetid=document.getElementById("getbal_assetid").value.trim();
  var originator=document.getElementById("getbal_originator").value;
  const script = _Neon.create.script(getConfigCreator("getBalance",[Neon.u.reverseHex(originator), Neon.u.reverseHex(assetid)]));

  Neon.rpc.Query.invokeScript(script)
  .execute(url)
  .then(res => {
    console.log(res.result.stack[0]);
   var t=res.result.stack[0];
   console.log(t.value);
   alert("Value:"+t.value);
   document.getElementById('depositBalance').innerHTML=t.value;
   
   
    
    //console.log(Neon.u.Fixed8.fromReverseHex(res.result.stack[0].value));
  });
}
function singleSellOrder(){
  //alert("hi");
  var sellerAddress=document.getElementById("selleraddr").value.trim();
  var offerAssetId=document.getElementById("off_assetid").value.trim();
  var wantAssetId=document.getElementById("want_assetid").value.trim();
  var offerAmount=parseInt(document.getElementById("off_amount").value.trim());
  var wantAmount=parseInt(document.getElementById("want_amount").value.trim());
 

  sellerAddress = Neon.u.reverseHex(sellerAddress);
  offerAssetId = Neon.u.reverseHex(offerAssetId);
  wantAssetId = Neon.u.reverseHex(wantAssetId);

const sellConfig = {
  net: neoscan_url,
  script: _Neon.create.script({
    scriptHash: contractScriptHash,
    operation: 'singleSellOrder',
    args: [sellerAddress, offerAssetId, offerAmount, wantAssetId, wantAmount]
  }),
  address: account3.address,
  privateKey: account3.privateKey,
  gas: 0,
  fees: 0.001
}

_Neon.doInvoke(sellConfig)
.then(res => {
  console.log("doInvoke", res);
})
.catch(function (err) {
  console.log("doInvoke Error", err);
});
}

//function fulfillSingleOffer(fillerAddress, offers, wants, orderHash, buyForAmount)
/*function fulfillSingleOffer() {
  
  var fillerAddress=document.getElementById("filleraddr").value.trim();
  var offers=document.getElementById("fulloff_assetid").value.trim();
  var wants=document.getElementById("fullwant_assetid").value.trim();
  var orderHash=document.getElementById("orderhash").value.trim();
  var buyForAmount=parseInt(document.getElementById("buy_amount").value.trim());
  tradingPair = Neon.u.reverseHex(offers) + Neon.u.reverseHex(wants);
  fillerAddress = Neon.u.reverseHex(fillerAddress);

  const sellConfig = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'fulfillSingleOrder',
      args: [fillerAddress, tradingPair, orderHash, buyForAmount]
    }),
    address: account2.address,
    privateKey: account2.privateKey,
    gas: 0,
    fees: 0.001
  }

  _Neon.doInvoke(sellConfig)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}*/
  //function ffso(fillerAddress, tradingPair, orderHash, buyForAmount) {
  function ffso() {
  var fillerAddress=document.getElementById("filleraddr").value.trim();
  //var offers=document.getElementById("fulloff_assetid").value.trim();
  //var wants=document.getElementById("fullwant_assetid").value.trim();
  var orderHash=document.getElementById("orderhash").value.trim();
  var buyForAmount=parseInt(document.getElementById("buy_amount").value.trim());
  var tradingPair = document.getElementById("fulloff_assetid").value.trim();//Neon.u.reverseHex(offers) + Neon.u.reverseHex(wants);
  const sellConfig = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash, 
      operation: 'fulfillSingleOrder',
      args: [fillerAddress, tradingPair, orderHash, buyForAmount]
    }),
    address: buyerAccount.address,
    privateKey: buyerAccount.privateKey,
    gas: 0,
    fees: 0.001
  }

  _Neon.doInvoke(sellConfig)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}
function calculateHash1(){
  alert("hi");
//function calculateHash1(sellerAddress, offerAssetId, offerAmount, wantAssetId, wantAmount, nonce) {
  var sellerAddress=document.getElementById("oh_selleraddr").value.trim();
  var offerAssetId=document.getElementById("oh_off_assetid").value.trim();
  var offerAmount=parseInt(document.getElementById("oh_off_amount").value.trim());
  var wantAssetId=document.getElementById("oh_want_assetid").value.trim();
  var wantAmount=parseInt(document.getElementById("oh_want_amount").value.trim());
  var nonce=parseInt(document.getElementById("oh_nonce").value.trim());
  var HASH256 = Neon.u.reverseHex(sellerAddress) + Neon.u.reverseHex(offerAssetId) + Neon.u.int2hex(offerAmount) + Neon.u.reverseHex(wantAssetId) + Neon.u.int2hex(wantAmount) + Neon.u.int2hex(nonce);
  //console.log(HASH256);
  console.log(Neon.u.hash256(HASH256));
  document.getElementById('od_hash').innerHTML=Neon.u.hash256(HASH256);
}
function getSingleOrders() {
  var offer=document.getElementById("offer").value.trim();
  var wants=document.getElementById("want").value.trim();
  var hash =document.getElementById("hash").value.trim();
  var tradingPair = Neon.u.reverseHex(offer) + Neon.u.reverseHex(wants) + hash;
  var script = _Neon.create.script(getConfigCreator("getSingleOrders", [tradingPair, ""]));
  Neon.rpc.Query.invokeScript(script)
  .execute(url)
  .then(res => {
    console.log((res.result.stack[0].value));
    console.log((res.result.stack[0].value[0].value[0].value));
    console.log((res.result.stack[0].value[0].value[1].value));
    console.log((res.result.stack[0].value[0].value[2].value));
    console.log((res.result.stack[0].value[0].value[3].value));
    console.log((res.result.stack[0].value[0].value[4].value));
    console.log((res.result.stack[0].value[0].value[5].value));
    console.log((res.result.stack[0].value[0].value[6].value));
    
    var markup = "<tr><td>" + (res.result.stack[0].value[0].value[0].value) + "</td><td>" + (res.result.stack[0].value[0].value[1].value) + "</td><td>" + (res.result.stack[0].value[0].value[2].value) + "</td><td>" + (res.result.stack[0].value[0].value[3].value) + "</td><td>" + (res.result.stack[0].value[0].value[4].value) + "</td><td>" + (res.result.stack[0].value[0].value[5].value) + "</td><td>" + (res.result.stack[0].value[0].value[6].value) + "</td></tr>";
    $("table tbody").append(markup);

    //$('#myTable').append('<tr><td>my data</td><td>more data</td></tr>');
    //var sar=document.getElementById("sss").innerHTML = (res.result.stack[0].value[0]) ;
   
   
   
  

  });
}
function basketSellOrder() {

  var SellerAddress = document.getElementById("selleraddress").value;
  var ActiveOrder =   document.getElementById("activeorder").value;
  var AssetCount = parseInt(document.getElementById("assetcount").value);
  var SellingAsset1 = document.getElementById("sellingasset1").value;
  var SellingAsset2 = document.getElementById("sellingasset2").value;
  var AssetAmount1 = parseInt(document.getElementById("assetamount1").value);
  var AssetAmount2 = parseInt(document.getElementById("assetamount2").value);
  var WantAssetId = document.getElementById("wantassetid").value;
  var WantAmount = parseInt(document.getElementById("wantamount").value);


  
  SellerAddress = Neon.u.reverseHex(SellerAddress);
  SellingAsset1 = Neon.u.reverseHex(SellingAsset1);
  SellingAsset2 = Neon.u.reverseHex(SellingAsset2);
  WantAssetId = Neon.u.reverseHex(WantAssetId);
  ActiveOrder = Neon.u.str2hexstring(ActiveOrder);

  AssetCount = Neon.u.int2hex(AssetCount);
  AssetAmount1 = Neon.u.int2hex(AssetAmount1);
  AssetAmount2 = Neon.u.int2hex(AssetAmount2);
  WantAmount = Neon.u.int2hex(WantAmount);

  var SellingAssets = SellingAsset1 + SellingAsset2;

  const sellConfig = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'basketSellOrder',
      args: [SellerAddress, ActiveOrder, AssetCount, SellingAssets, AssetAmount1, AssetAmount2, WantAssetId, WantAmount]
    }),
    address: account2.address,
    privateKey: account2.privateKey,
    gas: 0,
    fees: 0.1
  }

  _Neon.doInvoke(sellConfig)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  })
}


function fulfillBasketOrder() {

  var FillerAddress = document.getElementById("filleraddress").value;
  var OrderHash = document.getElementById("orderhash").value;

  FillerAddress = Neon.u.reverseHex(FillerAddress);
  OrderHash = Neon.u.hash256(OrderHash);
  const fulfillConfig = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'fulfillBasketOrder',
      args: [FillerAddress, OrderHash]
    }),
    address: account2.address,
    privateKey: account2.privateKey,
    gas: 0,
    fees: 0.001
  }

  _Neon.doInvoke(fulfillConfig)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}



function placeBasketOrder() {
  var OrderHash = document.getElementById("pborderhash").value;
  var WantAssetId = document.getElementById("pbwantassetid").value;
  var WantAmount = parseInt(document.getElementById("pbwantamount").value);
  WantAssetId = Neon.u.reverseHex(WantAssetId);
  WantAmount = Neon.u.int2hex(wantAmount);
  OrderHash = Neon.u.hash256(OrderHash);
  const config = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'placeBasketOrder',
      args: [OrderHash, WantAssetId, WantAmount]
    }),
    address: account2.address,
    privateKey: account2.privateKey,
    gas: 0,
    fees: 0.001
  }

  _Neon.doInvoke(config)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}



function liquidateBasket() {
  var OrderHash = document.getElementById("lborderhash").value;
  OrderHash = Neon.u.hash256(OrderHash);
  const config = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'liquidateBasket',
      args: [OrderHash]
    }),
    address: account2.address,
    privateKey: account2.privateKey,
    gas: 0,
    fees: 0.001
  }

  _Neon.doInvoke(config)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}


function cancelBasketOrder() {
  var OrderHash = document.getElementById("corderhash").value;
  OrderHash = Neon.u.hash256(OrderHash);
  const config = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'cancelBasketOrder',
      args: [orderHash]
    }),
    address: account2.address,
    privateKey: account2.privateKey,
    gas: 0,
    fees: 0.001
  }

  _Neon.doInvoke(config)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}



