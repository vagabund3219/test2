import {url, transApiUrl, checkApiUrl} from "./requests.js"

const mainContentContainer = document.querySelector('.main_content_container');

  export async function categoryDisplay(fetchCategories) {
      const ol = document.createElement('ol');
      ol.classList.add('articles')
      let response = await fetchCategories;
      await response.forEach(category => {
          ol.innerHTML += `<li class='articles__article' style="--animation-order: 1;">
                                <a href="#" class="articles__link" id=${category['id']} >
                                    <div class="articles__content articles__content--lhs">
                                        <h2 class="articles__title">${category.name}</h2>
                                    </div>
                                    <div class="articles__content articles__content--rhs" aria-hidden="true">
                                        <h2 class="articles__title">${category.name}</h2>
                                    </div>
                                </a>
                            </li>
    `
          mainContentContainer.append(ol);
      })
  }

