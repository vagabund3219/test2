import {fetchReq, BillApiGetUpdate, url, sendRequest} from './requests.js'
import {showLastTransactions} from "./newdesign_show_transactions.js";

export async function getBill(){
    const userId = document.getElementById('userId');
    const billId = document.getElementById('billId');
    const bill = await fetchReq(`${BillApiGetUpdate}/${billId.value}`);
    // const bill = await fetchReq(`${BillApiGetUpdate}/${userId.value}`);
    console.log(bill)
    document.querySelector('.footer_card_balance').textContent = parseFloat(bill['sum']);
}

export async function updateBill(transactionForm){
    const userId = document.getElementById('userId');
    const billId = document.getElementById('billId');
    // const bill = await fetchReq(`${BillApiGetUpdate}/${userId.value}`);
    const bill = await fetchReq(`${BillApiGetUpdate}/${billId.value}`);
    let sumOfbill = parseFloat(bill['sum']);
    if (transactionForm.type == 1){
        sumOfbill -= transactionForm.price;
    }else if (transactionForm.type == 2){
        sumOfbill += transactionForm.price;
    }
    const requestBody = {
        "sum": sumOfbill,
        "id": bill.id,
        "user": userId.value
    }
    // sendRequest('put', `${url}${BillApiGetUpdate}/${userId.value}/`, requestBody );
    sendRequest('put', `${url}${BillApiGetUpdate}/${billId.value}/`, requestBody );
    showLastTransactions()

    document.querySelector('.footer_card_balance').textContent = parseFloat(sumOfbill);
}