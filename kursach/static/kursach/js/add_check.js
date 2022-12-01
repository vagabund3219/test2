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
        const filee  = document.querySelector('#check_image').files[0];
        const reader = new FileReader();
          reader.addEventListener('load', (event) => {
            const result = event.target.result;
            sendCheck(result)
          });
          reader.readAsDataURL(filee);

        // validatingCheckForm() ? sendRequest('POST', `${url}${transApiUrl}`, validatingCheckForm(), '.check_label') : console.log('.....')
    })

    async function sendCheck(par){
        const url = 'https://proverkacheka.com/api/v1/check/get';
        // const token = '17072.ReLJYknAYHiPk5ohg';
        const token = '17975.feEzZQlH2W8acWoqk';
        fetch('http://api.qrserver.com/v1/read-qr-code/?fileurl=https://htstatic.imgsmail.ru/pic_image/fc79efd29b1466f5f2054ab6f31802d7/840/1120/1968415/')
            .then(res => res.json())
            .then(res => {
                const checkResponse = res[0]['symbol'][0]['data']
                // var url = "https://proverkacheka.com/api/v1/check/get";
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                   if (xhr.readyState === 4) {
                      console.log(xhr.status);
                      console.log(xhr.responseText);
                      if (xhr.status===200){
                          try{
                              for (item of xhr.responseText["data"]['json']['items']){
                                  console.log(item)
                              }
                          }catch (e){

                          }
                      }
                   }};

                // var data = `${checkResponse}&token=${token}`;
                var data = `qrfile=${par}&token=${token}`;

                // xhr.send(data);
                xhr.send(data)
            })
    }

})