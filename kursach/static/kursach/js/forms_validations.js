

export function checkRequired(){
    const formItems = document.querySelectorAll('.form-control');
    console.log(formItems);
    formItems.forEach(item=>{
        item.addEventListener('change', ()=>{
            if (!item.value){
                item.classList.add('invalid');
            }else{
                item.classList.remove('invalid')
            }
        })
    })
}