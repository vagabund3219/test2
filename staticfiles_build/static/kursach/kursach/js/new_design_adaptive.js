const hamburger = document.querySelector('.hamburger_div');


hamburger.addEventListener('click', (event)=>{
    document.querySelector('.aside').classList.toggle('aside_active');
    // document.querySelector('.hamburger_div').classList.add('hidden');
    document.querySelector('.right_container_right').classList.toggle('right_active');


    setTimeout(()=>{
            const body = document.body
            body.addEventListener('click', (function bodyList(event){
                if (!event.target.classList.contains("aside")) {

                    document.querySelector('.aside').classList.remove('aside_active');
                    document.querySelector('.right_container_right').classList.remove('right_active');
                    document.querySelector('.hamburger_div').classList.remove('hidden');
                    body.removeEventListener('click', bodyList);
                }else{

                }
            }))
    }, 4)
})

const closeMenuButton = document.querySelector('.bi-x');
closeMenuButton.addEventListener('click', (event)=>{
    const body = document.body
    document.querySelector('.aside').classList.remove('aside_active');
    document.querySelector('.right_container_right').classList.remove('right_active');
    document.querySelector('.hamburger_div').classList.remove('hidden');
    // body.removeEventListener('click', bodyList);
})
