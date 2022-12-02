import {dangerAlert, successAlert} from "./alerts.js";

export const url = 'http://127.0.0.1:8000/api/v1/';
export const checkApiUrl = 'CheckApiList';
export const transApiUrl = 'TransactionsApiList';
export const CategoriesApiList = 'CategoriesApiList';
export const TypeOfTransactionApiList = 'TypeOfTransactionApiList';

export function sendRequest(method, url, body = null, labelClass){
        const csrftoken = getCookie('csrftoken');
        const headers = {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json'
        }
        fetch(url, {
            'method':method,
            'headers': headers,
            'body':JSON.stringify(body)
        }).then(response => {
            if (response.ok && response.status<300){
                propForRequest(labelClass);
                successAlert('Успешно');
                return response.json()
            }else{
                dangerAlert('Ошибка');
            }
        })
    }

    function propForRequest(labelClass){
        const form = document.querySelectorAll(labelClass);
        form.forEach(label => {
            label.querySelector('input') ? label.querySelector('input').value = '' : {};
            label.querySelector('select') ? label.querySelector('select').value = 'd' : {};
        })
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    export async function fetchReq(path, errorText) {
        let req = await fetch(`${url}${path}`);
        if (req.ok == true && req.status < 300){
          return req.json();
        } else{
          console.log(`Что-то не так с ${errorText}`);
        }
  }