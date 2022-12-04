

export function categoryEditingMenu (){
    const mainContainer = document.querySelector('.transactions-container');

    const categoryMenu =
`        <div className="category_menu">
            <div className="add_category_button category_menu_button">
                <i className="bi bi-plus-circle"></i>
            </div>
            <div className="delete_category_button category_menu_button ">
                <i className="bi bi-trash"></i>
            </div>
        </div>
`
    mainContainer.append(categoryMenu)
}