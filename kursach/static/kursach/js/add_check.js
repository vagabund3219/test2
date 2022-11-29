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


        // let reader = new FileReader();
        // console.log(reader.readAsDataURL(doc.getElementById('check_image').files[0]))
        // reader.readAsDataURL(doc.getElementById('check_image').files[0])
        let imageBinary = ''
        let reader = new FileReader();
        reader.readAsBinaryString(document.querySelector('#check_image').files[0])
        reader.addEventListener('load', function() {
            // console.log('ddddddddd', this.result);
            const files = {'qrfile':  this.result}
            fetch(url, {
                'method':'POST',
                // 'headers': {'Content-Type': 'application/json'},
                'body':JSON.stringify({token: '17072.ReLJYknAYHiPk5ohg'})
            }).then(response => {
                response.json().then(item=>console.log(item))
            })
            // fetch(url, data, files).then(item=>item.json()).then(item=>console.log(item))
        });
    }

})