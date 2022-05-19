var array = [];
var addbuttons = document.getElementsByClassName('addbtn')
for (btn of addbuttons){
    var button = btn
    button.addEventListener('click', addTocart)
}

function addnum () {
    var plusbtns =  document.getElementsByClassName('plus')
    for (btn of plusbtns){
        var button = btn
        button.addEventListener('click', addnumP)
    }
}
function addnumP (event) {
    var button = event.target
    var div = button.parentElement
    var p = div.getElementsByTagName('p')[0];
    var maxProduct = div.parentElement.getElementsByClassName("maxProduct")[0]
    // alert(maxProduct.value)
    if(parseInt(p.innerText) >= maxProduct.value)
        alert("Out of Total")
    else
        p.innerText = parseInt(p.innerText) + 1;
    
    var result = div.parentElement.getElementsByClassName("result")[0]
    result.value = maxProduct.value - parseInt(p.innerText)
    total()
}

function minusnum () {
    var plusbtns =  document.getElementsByClassName('minus')
    for (btn of plusbtns){
        var button = btn
        button.addEventListener('click', minusnumP)
    }
}

function minusnumP (event) {
    var button = event.target
    var div = button.parentElement
    var p = div.getElementsByTagName('p')[0];
    // alert(p.innerText)
    if(p.innerText != 0)
    p.innerText = parseInt(p.innerText) - 1;

    var maxProduct = div.parentElement.getElementsByClassName("maxProduct")[0].value
    var result = div.parentElement.getElementsByClassName("result")[0]
    result.value = maxProduct - parseInt(p.innerText)
    total()
}

function total (){
    var prices = document.getElementsByClassName('price')
    var quantity = document.getElementsByClassName('number')
    var total = document.getElementsByClassName('totalp')
    var amount = document.getElementsByClassName('amount')
    var totalmax = document.getElementsByClassName('totalmax')
    var max = 0
    var am = 0
    for(i = prices.length - 1 ; i >= 0 ; i-- ){
        const price = prices[i].innerText.replace('$','')
        // alert(prices[data].innerText.replace('$',''))
        total[i].innerText = parseInt(price) * parseInt(quantity[i].innerText)
        max =  parseInt(total[i].innerText) + max
        am = parseInt(quantity[i].innerText) + am
    }

    totalmax[0].innerText = max
    amount[0].innerText = am

} 

function addTocart (event){
    var button = event.target
    var div = button.parentElement
    var count = document.getElementsByClassName('countcart')
    var id = div.getElementsByClassName('id')[0]
    var maxProduct = div.getElementsByClassName('maxProduct')[0]
    // alert(maxProduct.value)
    if(!array.includes(id.value)){
        if(maxProduct.value != 0){
            array.push(id.value)
            count[0].innerText = parseInt(count[0].innerText) + 1
        }
        else
            alert("Out of stock")
    }
    else
        alert("Alreay in cart")
}

function order(){
    for(let i = 0 ; i < array.length ; i++){
        document.cookie = `${i} =  ${array[i]} ;`
    }
    // const data = JSON.stringify(array)
    // alert(array)
}

function pay(){
    var fid = document.getElementsByClassName('fid')
    var fnum = document.getElementsByClassName('famount')
    var fresult = document.getElementsByClassName('fresult')

    var allresult = document.getElementsByClassName('result')
    var allnum = document.getElementsByClassName('number')
    var allid = document.getElementsByClassName('idproduct')
    var msgfnum = ""
    var msgfid = ""
    var msgResult = ""
    // alert(result[0].value)
    for (let i = 0 ; i < allnum.length ; i++) {
        msgfnum = msgfnum + allnum[i].innerText + "."
        msgfid = msgfid + allid[i].value + "."
        msgResult = msgResult + allresult[i].value + "."
    }
    console.log(msgfid)
    console.log(msgfnum)
    console.log(msgResult)
    //use in router
    // var a = msgfid.split('.')
    // a.pop()
    // console.log(a)
    fid[0].value = msgfid
    fnum[0].value = msgfnum
    fresult[0].value = msgResult
    alert("Success")
}