const array = [];
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
    // alert(p.innerText)
    p.innerText = parseInt(p.innerText) + 1; 
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
    if(!array.includes(id.value)){
        array.push(id.value)
        count[0].innerText = parseInt(count[0].innerText) + 1
    }
    else
        alert("Alreay in cart")
}

function order(){
    for(let i = 0 ; i < array.length ; i++){
        document.cookie = `${i} =  ${array[i]} ;`
    }
}

function pay(){
    alert("Success")
}