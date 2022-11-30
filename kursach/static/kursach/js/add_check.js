import {url, TypeOfTransactionApiList, transApiUrl, CategoriesApiList} from './list_of_trans.js';
import {sendRequest} from "./requests.js";

import {fetchReq} from "./requests.js";
import {validatingCheckForm} from "./forms_validations.js";


window.addEventListener('load', () => {
    const doc = document;
    const addNewCheckButton = doc.querySelector('#add-new-check');
    const addNewCheckForm = doc.querySelector('#add-new-check-form');

    async function categori (categorySelect){
        const categories = await fetch(`${url}${CategoriesApiList}`)
            .then(response => response.json())

        const filtered = categories.filter(item=>item.type===1);
        categorySelect.innerHTML = filtered.map(category => `<option value="${category.id}">${category.name}</option>`).join('');
    }

    addNewCheckButton.addEventListener('click', ()=>{
        addNewCheckForm.classList.remove('hidden');
        const currentCategoryId = doc.getElementById('currentCategoryId');
        const elems = doc.querySelectorAll('.card')
        elems.forEach(item=>item.remove())
        categori(doc.getElementById('check_category_id'));
    })


    addNewCheckForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        // console.log(doc.getElementById('check_image').value)
        sendCheck()




          //   console.log(reader.readAsText(document.querySelector('#check_image').files[0]), 'aaaaaaa')
          // reader.readAsText(document.querySelector('#check_image').files[0]);


        // validatingCheckForm() ? sendRequest('POST', `${url}${transApiUrl}`, validatingCheckForm(), '.check_label') : console.log('.....')
    })

    async function sendCheck(){
        const url = 'https://proverkacheka.com/api/v1/check/get';
        const data = {token: '17072.ReLJYknAYHiPk5ohg'};
        // const data={ 'fn': '9280440300770583', //ФН
        //         'fd' : '33110', //ФД
        //         'fp': '4138469556', //ФП
        //         't' : '20210217T2028', //время с чека
        //         'n' : '1', //вид кассового чека
        //         's' : '419.54', //сумма чека
        //         'qr' : '0', //признак сканирования QR-кода
        //         'token':'17072.ReLJYknAYHiPk5ohg' //здесь прописываем токен доступа
        //         }
        console.log(JSON.stringify(data))
        const head =  "{'User-Agent': 'python-requests/2.28.1', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Content-Length': '264', 'Content-Type': 'multipart/form-data; boundary=cb555f65716bf690f5b5c96c5572584e'}"
        const response = await fetch(url, {
            method: 'post',
            // headers: {
            //
            //     'token': '17072.ReLJYknAYHiPk5ohg' ,
            // },
            body: data
        })

        response.json().then(response=>console.log(response))
    }

})