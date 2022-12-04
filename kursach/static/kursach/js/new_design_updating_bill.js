import {fetchReq, BillApiGetUpdate, url} from './requests.js'

export async function getBill(){
    const userId = document.getElementById('userId');
    const bill = await fetchReq(`${BillApiGetUpdate}/${userId.value}`);
    document.querySelector('.footer_card_balance').textContent = parseFloat(bill['sum']);
}