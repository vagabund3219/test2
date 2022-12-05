import {CategoriesApiList, sendRequest, transApiUrl, url} from "./requests.js";
import {validatindTransForm, validatingCheckForm} from "./forms_validations.js";
import {getBill, updateBill} from "./new_design_updating_bill.js";


function createCheckForm(){
    const checkForm = document.createElement('div');
    checkForm.innerHTML = `
        <form novalidate method="POST" class="add-new-check-form" id="add-new-check-form" enctype="multipart/form-data">
            <div class="check-form-container">
                <label class="check_label" for="checkImage">
                    <span>Чек</span>
                    <input type="file" id="check_image"  class="form-control" required>
                    <span class="error" aria-live="polite"></span>
                </label>
                <label class="check_label" for="check_username">
                    <span>Кто добавил</span>
                    <input type="text" id="check_username" class="form-control" autocomplete="off" required>
                    <span class="error" aria-live="polite"></span>
                </label>
                <label class="check_label" for="check_category_id">
                    <span>Тип</span>
                    <select name="category_id" id="check_category_id" class="form-control" required></select>
                    <span class="error" aria-live="polite"></span>
                </label>
                <button class="floating-button">Отправить</button>
            </div>
        </form>`


    document.querySelector('.main_content_container').append(checkForm)
    categori(document.getElementById('check_category_id'));
}

async function categori (categorySelect){
    const categories = await fetch(`${url}${CategoriesApiList}`)
        .then(response => response.json())

    const filtered = categories.filter(item=>item.type===1);
    categorySelect.innerHTML = filtered.map(category => `<option value="${category.id}">${category.name}</option>`).join('');
}

export async function addCheckForm(){
    await createCheckForm();
    await checkFormListener();

}


  async function checkFormListener(){
        const checkAddForm = document.querySelector('#add-new-check-form');
        checkAddForm.addEventListener('submit', async (event)=>{
            event.preventDefault()

            if (validatingCheckForm()){
                const validatedForm = await validatingCheckForm()
                const filee  = document.querySelector('#check_image').files[0];
                    const reader = new FileReader();
                    reader.addEventListener('load', (event) => {
                        const result = event.target.result;
                        sendCheck(result)
                    });
                reader.readAsDataURL(filee);
                await updateBill(validatedForm);
                await getBill();
            }
        })
    }



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

                xhr.send(data)
            })
    }


