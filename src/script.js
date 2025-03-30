class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
        this.renderHeader();
        this.addItems();
    }

    renderHeader() {
      this.innerHTML = `
        <style>
            :root {
                --w-logo: 30px;
            }
           .background-color-header {
                background-color: var(--background-header);
            }
            .properties {
                padding: 5px;
                padding-left:15px;
                padding-right:15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-family: var(--font-header);
                position: relative;
            }
            .ul-properties {
                display: flex;
                width: 100%;
                gap: 10px;
                justify-content: var(--justify-header);
                align-items: center;
                text-align: center;
                flex-wrap: wrap;
            }
            li {
                list-style: none;
                cursor: pointer;
            }
            li:hover {
                opacity: 20;
                text-decoration: underline;
            }
            .image-properties {
                width: var(--w-logo);
                height: var(--w-logo);
                overflow: hidden;
            }
            .image-properties img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: var(--rounded-img);
            }
            .logo-web {
                display: flex;
                align-items: center;
                gap:10px;
                margin-right: 10px;
            }
            .logo-web h1{
                white-space: nowrap;
                color: var(--color-title);
            }
            .menu-img {
                border-radius: 10%;
                cursor: pointer;
                border: none;
                display: flex;
                opacity: 80%;
                background-color: rgba(255, 255, 255, 0.418);
            }
            .ul-col {
                position: absolute;
                right: 20px;
                top: 35px;
                gap:10px;
                padding: 20px;
                border-radius: 15px;
                display: flex;
                flex-direction: column;
                opacity: 80%;
                background-color: var(--background-header);
            }
        </style>
        <header id="header-gerado" class="background-color-header properties">
            <div class="logo-web">
                <div class="image-properties" id="image-logo"></div>
                <h1 id="name-website"></h1>
            </div>
            <ul class="ul-properties" id="ul-items">
            </ul>
            <button class="display-none" id="menu-btn"><img src="src/images/menu.svg" alt="menuImg"></button>
        </header>
      `;
    }

    addItems() {
        const bgColor = document.getElementById('colorSelector');
        const titleColor = document.getElementById('colorSelectorTitle');
        const justify = document.getElementById('justify');
        const imageInput = document.getElementById('selectImageId');
        const removeImage = document.getElementById('removeImageId')
        const logoSize = document.getElementById('logo-size');
        const logoRounded = document.getElementById('logo-rounded');
        const fontStyle = document.getElementById('font-style');
        const inputNameSite = document.getElementById('input-name-site');
        const showControls = document.getElementById('controls-btn');
        const controls = document.getElementById('controls');
        const addNavItemButton = document.getElementById('addNavItem');
        const itemInput = document.getElementById('input-items');
        const screenSizeSelected = document.getElementById('screen-size');
        const divScreenShow = document.getElementById('div-screen-size');
        let actualClass = 'div-header-desktop';
        const itemStyle = document.getElementById('style-items-select');
        const rangeFontSizeItem = document.getElementById('range-font-size')
        const itemColor = document.getElementById('item-color')
        let img = null;
        let imgContainer;
        const removeItemBtn = document.getElementById('remove-item')
        const menuImg = document.getElementById('menu-btn')

        bgColor.addEventListener('input', (e) => 
            document.documentElement.style.setProperty('--background-header', e.target.value)
        );
        titleColor.addEventListener('input', (e) => 
            document.documentElement.style.setProperty('--color-title', e.target.value)
        );
        
        justify.addEventListener('change', (e) => 
            document.documentElement.style.setProperty('--justify-header', e.target.value)
        );
        
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    document.querySelectorAll('header-gerado').forEach(header => {
                        imgContainer = header.querySelector('#image-logo');
                        imgContainer.innerHTML = '';
                        img = document.createElement('img');
                        img.src = event.target.result;
                        img.alt = "Logo";
                        imgContainer.appendChild(img);
                    });
                };
                reader.readAsDataURL(file);
            }
        });
        removeImage.addEventListener('click', (e) => {
            if (img) {
                imgContainer.removeChild(img);
                img = null;
            }
        })

        logoSize.addEventListener('change', (e) => 
            document.documentElement.style.setProperty('--w-logo', `${e.target.value}px`)
        );

        logoRounded.addEventListener('change', (e) => 
            document.documentElement.style.setProperty('--rounded-img', `${e.target.value}%`)
        );

        fontStyle.addEventListener('change', (e) => 
            document.documentElement.style.setProperty('--font-header', e.target.value)
        );

        inputNameSite.addEventListener('input', (e) => {
            document.querySelectorAll('#name-website').forEach(el => {
                el.textContent = e.target.value;
            });
        });

        showControls.addEventListener('click', (e) => {
            controls.classList.toggle('display-none');
        });

        addNavItemButton.addEventListener('click', (e) => {
            const item = itemInput.value.trim();
            
            if (!item) return;
            
            const listItems = this.querySelector('#ul-items');
            if (listItems) {
                listItems.insertAdjacentHTML('beforeend', `<li id=${item}><a>${item}</a></li>`);
            }
            const itemSelector = document.getElementById('style-items-select');
            if (itemSelector) {
                itemSelector.insertAdjacentHTML(
                    'beforeend', `<option id=${item+item} value="${item}">${item}</option>`
                );
            }
            itemInput.value = '';
        });

        rangeFontSizeItem.addEventListener('change', (e) => {
            const selectedLi = document.getElementById(itemStyle.value);
            if (selectedLi) {
                selectedLi.dataset.fontSize = e.target.value;
                selectedLi.style.fontSize = `${e.target.value}px`;
            }
        });

        itemColor.addEventListener('input', (e)=> {
            const selectedLi = document.getElementById(itemStyle.value);
            if (selectedLi) {
                selectedLi.dataset.color = e.target.value;
                selectedLi.style.color= `${e.target.value}`;
            }
        });

        removeItemBtn.addEventListener('click', (e) => {
            const selectedLi = document.getElementById(itemStyle.value);
            const selectedOption = document.getElementById(itemStyle.value+itemStyle.value)
            selectedLi.remove()
            selectedOption.remove()
        });

        screenSizeSelected.addEventListener('change', (e) => {
            divScreenShow.classList.remove(actualClass);
            divScreenShow.classList.add(screenSizeSelected.value);
            actualClass = screenSizeSelected.value;
            const listItems = this.querySelector('#ul-items');
        
            if(actualClass === 'div-header-mobile-375' || actualClass === 'div-header-mobile-425') {
                listItems.classList.remove('ul-properties');
                listItems.classList.add('display-none');
                menuImg.classList.remove('display-none');
                menuImg.classList.add('menu-img');
            } else {
                listItems.classList.remove('display-none');
                listItems.classList.add('ul-properties');
                menuImg.classList.remove('menu-img');
                menuImg.classList.add('display-none');
                listItems.classList.remove('ul-col')
            }
        });
        menuImg.addEventListener('click', (e) => {
            const listItems = this.querySelector('#ul-items');
            
            if(listItems.classList.contains('ul-col')) {
                listItems.classList.remove('ul-col')
            } else {
                listItems.classList.add('ul-col')
            }
        });
    }
}

customElements.define('header-gerado', Header);