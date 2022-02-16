
let customerList = []
let history = []

/* 
    This function creates an Ordered List Of Customers Who Have Deposited Money and Their Total Balance. 
    And The Balance is constantly modified due their transfer history without adding a new row. 

*/
function renderAccounts(){

    let accountList = document.getElementById('accounts-list')
    accountList.innerHTML = ""
    customerList.forEach((customer)=>{
        
        let li1 = document.createElement("li")
        li1.innerText = `${customer.name} has ${customer.balance} £`
        accountList.appendChild(li1)
    })
}

/*
    This function provides the necessary names for the transfer procedures. 
    Every customer who deposits to their accout appears in the select/options's.
    If you add Michael Jordan as a new customer, he will immediatelly appear
    both as sender and receiver option
*/
function createNames (){
    let selectLists = [document.getElementById("sender"),document.getElementById("receiver")]

    selectLists.forEach((list)=>{
        list.innerHTML=""
        customerList.forEach((customer)=>{
            let opt = document.createElement("option")
            opt.innerText = customer.name
            list.appendChild(opt)
        })
    })
    
}

/*
    This function creates an ordered list of every new customer and transfer and 
    displays it under History title. 
    
    If kobe deposited 100 000 $ this will appear as: Kobe depositerd 100 000 $ to his account. 

    And if he transfers money it will show as Kobe transfered X $ to Michael Jordan. 
*/
function renderHistory(){

    const historyList = document.getElementById('history-list')
    historyList.innerHTML = ""
    history.forEach((past)=>{
        const li = document.createElement("li")
        li.innerText = past
        historyList.appendChild(li)
    })

}


/*
    This function starts it all and is triggered by btnAdd. It creates the customer list and pushes the event to history array to be displayed. 
    Than calls all the helper functions
*/
document.getElementById('btnAdd').addEventListener('click', ()=>{
    const name = document.getElementById('name').value
    const balance = document.getElementById('balance').value

    if(name != "New Customer" && balance != 0){

        customerList.push({name,balance})
        history.push(`${name} Deposited ${balance} £ To His/Her Account`)
    }
    
    renderAccounts()
    createNames()
    renderHistory()
})


/*
    this function is responsible of logging transfers. every money transfer is simultaneously reflected to both balance amounts and history column.
*/
document.getElementById('btnTransfer').addEventListener('click',()=>{
    const sender = document.getElementById("sender").value
    const receiver = document.getElementById("receiver").value
    const amount = parseInt(document.getElementById("amount").value)

    customerList.forEach((customer)=>{
        if(customer.name === sender){
            customer.balance = (parseInt(customer.balance) - amount).toString()

        }

        if(customer.name === receiver){
            customer.balance = (parseInt(customer.balance) + amount).toString()
        }
    })

    history.push(`${sender} Transfered ${amount} £ To ${receiver}`)

    renderAccounts()
    renderHistory()

})
