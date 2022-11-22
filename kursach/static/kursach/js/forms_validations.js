//
// const doc = document;
// const form  = doc.getElementsByTagName('form')[0];
//
// const name = doc.querySelector('#name-trans');
// const nameError = doc.querySelector('#name-trans + span.error');
//
// const username = doc.querySelector('#username');
// const usernameError = doc.querySelector('#username + span.error');
//
// const type = doc.querySelector('#type_id');
// const typeError = doc.querySelector('#type_id + span.error');
//
// const category = doc.querySelector('#category_id');
// const categoryError = doc.querySelector('#category_id + span.error');
//
// const sum = doc.querySelector('#sum');
// const sumError = doc.querySelector('#sum + span.error');
//
// const date = doc.querySelector('#date');
// const dateError = doc.querySelector('#date + span.error');
//
// const formInputs = [[name, nameError], [username, usernameError], [type, typeError], [category, categoryError], [sum, sumError], [date, dateError]];
// formInputs.forEach(item=>item[0].addEventListener('input', function (event) {
//   if (item[0].validity.valid) {
//     item[1].textContent = '';
//     item[1].className = 'error';
//   } else {
//     showError();
//   }
// }))
//
// form.addEventListener('submit', function (event) {
//   formInputs.forEach(item=>{
//     if (!item[0].validity.valid){
//       showError(item[0], item[1]);
//       event.preventDefault();
//     }
//   })
// });
//
// function showError(field, fieldError) {
//     if (field.validity.valueMissing){
//       fieldError.textContent = 'Пожалуйста, заполните поле';
//     }else if(field.validity.typeMismatch) {
//       fieldError.textContent = 'Убедитесь в правильности ввода';
//   }
//   fieldError.className = 'error active';
//
// }



