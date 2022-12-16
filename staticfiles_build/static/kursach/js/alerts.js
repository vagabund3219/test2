
    const body = document.body;
    function closeAlert(div){
        div.classList.add('hide');
        setTimeout(()=>{
            div.remove()
        }, 640)
    }

    function alertExp(text, classname){
            const div = document.createElement('div');
            div.classList.add('alert', classname)
            div.innerHTML = `<h3>${text}</h3>
                              <a class="close">&times;</a>`
            div.querySelector('a').addEventListener('click', ()=>closeAlert(div))
            setTimeout(()=>closeAlert(div), 3500)
            body.append(div);
    }

    export function dangerAlert(text){
        alertExp(text, 'danger-alert')
    }

    export function successAlert(text){
        alertExp(text, 'success-alert')
    }

    export function notEndedAlert(text){
        alertExp(text, 'danger-alert')
    }



