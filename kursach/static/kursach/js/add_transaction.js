window.addEventListener('load', (event) => {
    const doc = document;
    const addNewCategoryBtn = doc.querySelector('.add-new-transaction');
    const row = doc.querySelector('.row');
    const transactionAddForm = doc.querySelector('#add-transaction');
    console.log(11111111)
    console.log(addNewCategoryBtn)

    console.log(11111111)
    addNewCategoryBtn.addEventListener('click', (e)=>{
        row.innerHTML = '';
        transactionAddForm.classList.toggle('hidden');
    })
})

