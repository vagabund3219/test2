import {url, transApiUrl, checkApiUrl, fetchReq, CategoriesApiList} from "./requests.js"
import {displayTransactions} from "./newdesign_show_transactions.js";
import {categoryEditingListeners, categoryEditingMenu, transactionsEditingMenu, transactionsEditingListeners} from "./container_for_editing.js";


// const mainContentContainer = document.querySelector('.main_content_container');

  export async function categoryDisplay(fetchCategories) {
      const mainContentContainer = document.querySelector('.transactions-container');
      const ol = document.createElement('ol');
      ol.classList.add('articles')
      let response = await fetchCategories;
      await response.forEach(category => {
          ol.innerHTML += `<li class='articles__article' style="--animation-order: 1;" id=${category['id']}>
                                <a href="#" class="articles__link" id=${category['id']} >
                                    <div class="articles__content articles__content--lhs">
                                        <h2 class="articles__title">${category.name}</h2>
                                    </div>
                                    <div class="articles__content articles__content--rhs" aria-hidden="true">
                                        <h2 class="articles__title">${category.name}</h2>
                                    </div>
                                </a>
<!--                                <i class="bi bi-trash delete-category-button"></i>-->
                            </li>
    `
          mainContentContainer.append(ol);
      })
  }

  export function categoriesButtonListener(){
      const mainContentContainer = document.querySelector('.transactions-container');
      const categoriesButtons = document.querySelectorAll('.articles__article');
      categoriesButtons.forEach(categoryButton=>{
          categoryButton.addEventListener('click', (event)=>{
              if (event.target.tagName != 'I'){
                  mainContentContainer.innerHTML = ''
                  document.querySelector('#categoryName').textContent = categoryButton.querySelector('.articles__title').textContent
                  displayTransactions(categoryButton.id)
                  transactionsEditingMenu();
                  transactionsEditingListeners();
              }
          })
      })
  }

  export async function showCategories(headerTitle){
      const mainContentContainer = document.querySelector('.main_content_container');
      mainContentContainer.innerHTML = `<div class="transactions-container"></div>`

      headerTitle.textContent = 'Категории';
        categoryEditingMenu();
        categoryEditingListeners();
        await categoryDisplay(fetchReq(CategoriesApiList, 'категориями'));
        categoriesButtonListener();
  }

