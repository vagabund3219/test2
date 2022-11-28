

    export function dangerAlert(text){
            const body = document.body;
            const div = document.createElement('div');
            div.classList.add('alert', 'danger-alert')
            div.innerHTML = `<h3>${text}</h3>
                              <a class="close">&times;</a>`
            div.querySelector('a').addEventListener('click', ()=>{
                div.classList.add('hide');
                setTimeout(()=>{
                    div.remove()
                }, 640)
            })
            body.append(div);
    }


    export function successAlert(text){
            const body = document.body;
            const div = document.createElement('div');
            div.classList.add('alert', 'success-alert')
            div.innerHTML = `<h3>${text}</h3>
                             <a class="close">&times;</a>`
            div.querySelector('a').addEventListener('click', ()=>{
                div.classList.add('hide');
                setTimeout(()=>{
                    div.remove()
                }, 640)
            })
            body.append(div);
    }

