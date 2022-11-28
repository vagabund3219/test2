import {dateString} from "./custom_format_for_date.js";
import {url, transApiUrl, CategoriesApiList} from './list_of_trans.js'

    const doc = document;

    export function validatindTransForm(){
        const name = doc.querySelector('#name-trans');
        const nameError = doc.querySelector('#name-trans + span.error');
        const username = doc.querySelector('#username');
        const usernameError = doc.querySelector('#username + span.error');
        const type = doc.querySelector('#type_id');
        const typeError = doc.querySelector('#type_id + span.error');
        const category = doc.querySelector('#category_id');
        const categoryError = doc.querySelector('#category_id + span.error');
        const sum = doc.querySelector('#sum');
        const sumError = doc.querySelector('#sum + span.error');
        const date = doc.querySelector('#date');
        const dateError = doc.querySelector('span.error.dateerr');

        const formInputs = [[name, nameError], [username, usernameError], [type, typeError], [category, categoryError], [sum, sumError], [date, dateError]];
        formInputs.forEach(item=>item[0].addEventListener('input', function (event) {
          if (item[0].validity.valid) {
              item[0].classList.add('valid');
            item[1].textContent = '';
            item[1].className = 'error';
          } else {
              item[0].classList.remove('valid');
              showError(item[0], item[1]);
          }
        }))

          formInputs.forEach(item=>{
            if (!item[0].validity.valid){
              showError(item[0], item[1]);
              event.preventDefault();
            }
          })
            if (name.validity.valid && username.validity.valid && type.validity.valid && category.validity.valid && sum.validity.valid && date.validity.valid){
                event.preventDefault()
                const form = {
                    'name':doc.querySelector('#name-trans').value,
                    'username': doc.querySelector('#username').value,
                    'category': +doc.querySelector('#category_id').value,
                    'type':+doc.querySelector('#type_id').value,
                    'price':parseFloat(doc.querySelector('#sum').value.replace(",", ".")),
                    'date': dateString(doc.querySelector('#date').value),
                    'user': +doc.querySelector('#userId').value
                }
                return form
            }

}

function showError(field, fieldError) {
            if (field.validity.valueMissing){
              fieldError.textContent = 'Пожалуйста, заполните поле';
            }else if(field.validity.typeMismatch) {
              fieldError.textContent = 'Убедитесь в правильности ввода';
          }
          fieldError.className = 'error active';
        }

export function validatingCategoriesForm(){
        const form  = doc.querySelector('#add-category-form');
        const name = doc.querySelector('#name_category');
        const nameError = doc.querySelector('#name_category + span.error');
        const type = doc.querySelector('#type_id_category');
        const typeError = doc.querySelector('#type_id_category + span.error');

        const formInputs = [[name, nameError], [type, typeError]];
        formInputs.forEach(item=>item[0].addEventListener('input', function (event) {
          if (item[0].validity.valid) {
              item[0].classList.add('valid');
            item[1].textContent = '';
            item[1].className = 'error';
          } else {
              item[0].classList.remove('valid');
              showError(item[0], item[1]);
          }
        }))

          formInputs.forEach(item=>{
            if (!item[0].validity.valid){
              showError(item[0], item[1]);
              event.preventDefault();
            }
          })

            if (name.validity.valid && type.validity.valid){
                event.preventDefault()
                const form = {
                    'name':doc.querySelector('#name_category').value,
                    'type':+doc.querySelector('#type_id_category').value,
                    'user': +doc.querySelector('#userId').value
                }
                return form
            }

}


