import {url, transApiUrl, checkApiUrl} from "./requests.js"
import {dateNewDesign, byField} from './custom_format_for_date.js';

const lastTransactionsUl = document.querySelector('.footer_right_ul');

export async function getAllTransaction(){
    const check = await fetch(`${url}${checkApiUrl}`);
    const trans = await fetch(`${url}${transApiUrl}`);
    let lst = await check.json();
    let trans1 = await trans.json();
    trans1.forEach(item => lst.push(item));
    return lst
}

export async function displayTransactions(listOfTransactions){
    listOfTransactions.sort(byField('date'));
    console.log(listOfTransactions)

}


export async function showLastTransactions(){
        const transactions = await getAllTransaction();
        transactions.sort(byField('date'));
        let i = 0
        while (i<4){
            const li = `                                
                                <li class="footer_right_li">
                                    <div class="footer_cart">
                                        <i class="bi bi-cart2"></i>
                                    </div>
                                    <div class="footer_right_li_right">
                                        <div class="footer_right_top">
                                            <div class="footer_right_name">${transactions[i]['name'].substring(0, 16)}</div>
                                            <div class="footer_right_sum">${transactions[i]['price']}</div>
                                        </div>
                                        <div class="footer_right_time">${dateNewDesign(transactions[i]['date'])}</div>
                                    </div>
                                </li>`
            lastTransactionsUl.innerHTML += li;
            i++;
        }
    }