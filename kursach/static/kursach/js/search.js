


const searchInput = document.querySelector('.header_input');

searchInput.addEventListener('input', (event)=>{
    search('.articles__article', '.articles__title')
    search('.card', '.item_textname')
})

function search (classNameItem, classNameText ){
    const allItems = document.querySelectorAll(classNameItem);
    const eventTarget = event.target.value;
    const searchText = eventTarget.toLowerCase()
    const regex = new RegExp(`${searchText}`, 'g')
    console.log(allItems)

    if (event.target.value){
        allItems.forEach(item=>{
            const itemName = item.querySelector(classNameText).textContent.toLowerCase()
            if (itemName.match(regex)){
                item.classList.remove('hidden');
            }else{
                item.classList.add('hidden');
            }
        })
    }else{
        allItems.forEach(item=>{
            item.classList.remove('hidden');
        })
    }
}