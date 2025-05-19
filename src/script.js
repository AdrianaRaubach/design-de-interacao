class Website extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
        this.renderWebsite();
        this.addItemsHeader();
        this.addItemsMenu();
        this.addCardsGallery();
        this.addItemsForm();
        this.addItemsFooter();
        this.saveCode();
        this.showAllControls();
        this.generalStyles();
    }

    renderWebsite() {
      this.innerHTML = `
        <style>
            :root {
                --w-logo: 30px;
            }
           .background-color-header {
                background-color: var(--background-header);
            }
            .background-color-menu {
                background-color: var(--background-menu);
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
            .section-1 {
                display: flex;
                gap:20px;
            }
            .gallery-card {
                padding: 10px;
                background-color: var(--color-bg-card);
            }
            .menu {
                width: 300px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 5px 20px;
                border: var(--border-menu);
                border-radius: var(--border-radius-menu);
                align-items: center;
            }
            .ul-items-menu {
                display:flex;
                flex-direction: column;
                gap: var(--justify-menu);
            }
            .menu li {
                padding: 8px 15px;
                color: var(--color-items-menu);
                background-color: var(--bgcolor-items-menu);
                width: 250px;
                border: var(--border-items-menu);
                border-radius: var(--border-radius-menu-items);
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;
            }
            .menu li:hover {
                opacity: 80%;
            }
            .gallery {
                display: flex;
                flex-wrap: wrap;
                gap: var(--justify-cards);
            }
            .gallery-card {
                padding: 15px;
                color: var(--color-text-cards);
                background-color: var(--color-bg-cards);
                border: var(--border-cards);
                border-radius: var(--border-radius-cards);
            }
            .footer-generated {
                background-color: var(--color-footer);
                padding: 20px;
            }
            .form {
                padding: 20px;
            }
            .section-1 , .footer-generated{
                margin-top: 40px;
                align-items: start;
            }
            .form-section {
                display: flex;
                align-items: center;
                justify-content: center;
                gap:5px;
            }
            .form form div {
                padding-top: 10px;
                display: flex;
                gap: 5px;
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
        <section class="section-1">
            <div class="menu background-color-menu">
                <div class="image-menu-properties" id="image-menu"></div>
                <ul class="ul-items-menu"></ul>
            </div>
            <div class="gallery">
            </div>
        </section>
        <section class="form-section">
            <div class="form">
            </div>
        </section>
        <footer class="footer-generated">
         <ul class="ul-properties" id="ul-items-footer">
            </ul>
        </footer>
      `;
    }

    addItemsHeader() {
        const bgColor = document.getElementById('colorSelector');
        const titleColor = document.getElementById('colorSelectorTitle');
        const justify = document.getElementById('justify');
        const imageInput = document.getElementById('selectImageId');
        const removeImage = document.getElementById('removeImageId')
        const logoSize = document.getElementById('logo-size');
        const logoRounded = document.getElementById('logo-rounded');
        const fontStyle = document.getElementById('font-style');
        const inputNameSite = document.getElementById('input-name-site');
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
                reader.onload = (e) => {
                    const header = document.getElementById('header-gerado');
                    if (header) {
                        imgContainer = header.querySelector('#image-logo');
                        if (imgContainer) {
                            imgContainer.innerHTML = '';
                            img = document.createElement('img');
                            img.src = e.target.result;
                            img.alt = "Logo";                          
                            imgContainer.appendChild(img);
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        });
        
        removeImage.addEventListener('click', (e) => {
            if (img && imgContainer) {
                imgContainer.removeChild(img);
                img = null;
            }
        });

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

        addNavItemButton.addEventListener('click', (e) => {
            const item = itemInput.value.trim();
            
            if (!item) return;
            
            const listItems = document.querySelector('#ul-items'); 
            if (listItems) {

                const li = document.createElement('li');
                li.id = item.replace(/\s/g, "-");
                
                const link = document.createElement('a');
                link.textContent = item;
                link.contentEditable = true;
                
                link.addEventListener('blur', function() {
                    updateItemInSelector(li.id, this.textContent);
                });
                
                li.appendChild(link);
                listItems.appendChild(li);
            }
            
            updateItemSelector(item, item.replace(/\s/g, "-"));
            
            itemInput.value = '';
        });
        
        function updateItemInSelector(itemId, newText) {
            const itemSelector = document.getElementById('style-items-select');
            if (itemSelector) {
                const option = itemSelector.querySelector(`option[value="${itemId}"]`);
                if (option) {
                    option.textContent = newText;
                    const li = document.getElementById(itemId);
                    if (li) {
                        const newId = newText.replace(/\s/g, "-");
                        li.id = newId;
                        option.value = newId;
                    }
                }
            }
        }
        
        function updateItemSelector(itemText, itemValue) {
            const itemSelector = document.getElementById('style-items-select');
            if (itemSelector) {
                itemSelector.insertAdjacentHTML(
                    'beforeend', `<option id="${itemText.replace(/\s/g, "-") + itemText.replace(/\s/g, "-")}" value="${itemValue}">${itemText}</option>`
                );
            }
        }
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
                console.log(selectedLi.style.color)
                selectedLi.dataset.color = e.target.value;
                selectedLi.style.color= `${e.target.value}`;
            }
        });

        removeItemBtn.addEventListener('click', (e) => {
            const selectedValue = itemStyle.value;
            if (!selectedValue || selectedValue === "Selecionar") return;
            
            const selectedLi = document.getElementById(selectedValue);
            if (selectedLi) {
                selectedLi.remove();
            }
            
            const options = itemStyle.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === selectedValue) {
                    itemStyle.remove(i);
                    break;
                }
            }

            itemStyle.value = "Selecionar";
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
    addItemsMenu() {
        const inputItemsMenu = document.querySelector('#items-menu');
        const btnAddItemsMenu = document.getElementById('add-items-menu');
        const ulItemsAddMenu = document.querySelector('.ul-items-menu');
        const optionsListItens = document.getElementById('list-items-menu');
        const selectColorBgMenu = document.getElementById('colorSelectorBgMenu');
        const justifyMenu = document.getElementById('justify-menu');
        const colorSelectorItemsMenu = document.getElementById('colorSelectorItemsMenu');
        const bgcolorSelectorItemsMenu = document.getElementById('bgcolorSelectorItemsMenu');
        const borderItemsMenuSelect = document.getElementById('border-items-menu');
        const borderSelectMenu = document.getElementById('border-menu-select');
        const roundedMenuBorderRange = document.getElementById('rounded-border-menu');
        const roundedMenuItemsBorderRange = document.getElementById('rounded-border-menu-items');
        const btnRemoveMenuItems = document.getElementById('remove-menu-items-btn');
        const optionItemSelectet = document.getElementById('list-items-menu');
        const imageMenuInput = document.getElementById('selectImageMenuId');
        const removeImageMenu = document.getElementById('removeImageMenuId');
        let imgMenu = null;
        let imgContainerMenu = null;
        const rangeFontSizeMenu = document.getElementById('range-font-size-menu');

        btnAddItemsMenu.addEventListener('click', (e) => {
            const itemText = inputItemsMenu.value.trim();
            if (!itemText) return;
        
            const li = document.createElement('li');
            li.id = itemText.replace(/\s/g, "-");
            
            const link = document.createElement('a');
            link.textContent = itemText;
            link.contentEditable = true;
            
            link.addEventListener('blur', function() {
                updateMenuOption(li.id, this.textContent);
            });
            
            li.appendChild(link);
            ulItemsAddMenu.appendChild(li);
            
            const optionId = itemText.replace(/\s/g, "-") + itemText.replace(/\s/g, "-");
            const optionValue = itemText.replace(/\s/g, "-");
            
            const option = document.createElement('option');
            option.id = optionId;
            option.value = optionValue;
            option.textContent = itemText;
            optionsListItens.appendChild(option);
            
            inputItemsMenu.value = '';
        });
        
        function updateMenuOption(itemId, newText) {
            const option = document.getElementById(itemId + itemId);
            if (option) {
                option.textContent = newText;
                option.value = newText.replace(/\s/g, "-");
                option.id = newText.replace(/\s/g, "-") + newText.replace(/\s/g, "-");
                
                const li = document.getElementById(itemId);
                if (li) {
                    li.id = newText.replace(/\s/g, "-");
                }
            }
        }
        selectColorBgMenu.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--background-menu', e.target.value);
        });

        justifyMenu.addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--justify-menu', e.target.value);
        });

        colorSelectorItemsMenu.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--color-items-menu', e.target.value);
        });

        bgcolorSelectorItemsMenu.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--bgcolor-items-menu', e.target.value);
        });

        borderItemsMenuSelect.addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--border-items-menu', e.target.value);
        });

        borderSelectMenu.addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--border-menu', e.target.value);
        });

        roundedMenuBorderRange.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--border-radius-menu', `${e.target.value}px`);
        });

        roundedMenuItemsBorderRange.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--border-radius-menu-items', `${e.target.value}px`);
        });

        btnRemoveMenuItems.addEventListener('click', (e) => {
            const itemSelectedMenu = document.getElementById(optionItemSelectet.value);
            const optionSelectedMenu = document.getElementById(optionItemSelectet.value+optionItemSelectet.value);
            itemSelectedMenu.remove()
            optionSelectedMenu.remove()
        });

        rangeFontSizeMenu.addEventListener('click', (e) => {
            const itemSelectedMenu = document.getElementById(optionItemSelectet.value);
            if (itemSelectedMenu) {
                itemSelectedMenu.dataset.fontSize = e.target.value;
                itemSelectedMenu.style.fontSize = `${e.target.value}px`;
            }
        });

        imageMenuInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const section = document.querySelector('.section-1 .menu');
                    if (section) {
                        imgContainerMenu = section.querySelector('#image-menu');
                        if (imgContainerMenu) {
                            imgContainerMenu.innerHTML = '';
                            imgMenu = document.createElement('img');
                            imgMenu.src = e.target.result;
                            imgMenu.alt = "image-menu";
                            
                            const logoSize = document.getElementById('image-menu-size').value;
                            const logoRounded = document.getElementById('image-menu-rounded').value;
                            
                            imgMenu.style.width = `${logoSize}px`;
                            imgMenu.style.borderRadius = `${logoRounded}%`;
                            
                            imgContainerMenu.appendChild(imgMenu);
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        });

        removeImageMenu.addEventListener('click', (e) => {
            if (imgMenu && imgContainerMenu) {
                imgContainerMenu.removeChild(imgMenu);
                imgMenu = null;
                imageMenuInput.value = '';
            }
        });

        document.getElementById('image-menu-size').addEventListener('input', (e) => {
            if (imgMenu) {
                imgMenu.style.width = `${e.target.value}px`;
            }
        });

        document.getElementById('image-menu-rounded').addEventListener('input', (e) => {
            if (imgMenu) {
                imgMenu.style.borderRadius = `${e.target.value}%`;
            }
        });
  
    }
    addCardsGallery() {
        const selectedImageGallery = document.getElementById('selectImageCardId');
        const descriptionImage = document.getElementById('description-image-gallery');
        const btnAddCard = document.getElementById('btn-add-card');
        const gallery = document.querySelector('.gallery');
        const selectCardName = document.getElementById('select-card-name');
        const removeCard = document.querySelector('.remove-card');
        const sizeTextCard = document.getElementById('size-text-card');
        const textColorCards = document.getElementById('input-color-text-card');
        const bgColorCards = document.getElementById('input-bgcolor-text-card');
        const justifyCards = document.getElementById('justify-cards');
        const optionsCardsBorder = document.getElementById('border-cards');
        const roundedCardsBorder = document.getElementById('rounded-border-cards');
    
        btnAddCard.addEventListener('click', (e) => {

            if (selectedImageGallery.files.length === 0) {
                return;
            }

            if (!descriptionImage.value.trim()) {
                return;
            }
    
            const file = selectedImageGallery.files[0];
            const reader = new FileReader();
    
            reader.onload = (e) => {
                const card = document.createElement('div');
                card.className = 'gallery-card';
                card.id = `${descriptionImage.value.replace(/\s/g, "-")}card`
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = descriptionImage.value;
                img.style.width = `200px`;
                
                const desc = document.createElement('p');
                desc.contentEditable = true;
                desc.id = descriptionImage.value.replace(/\s/g, "-");
                desc.textContent = descriptionImage.value;
                selectCardName.insertAdjacentHTML(
                    'beforeend', `<option id=${descriptionImage.value.replace(/\s/g, "-")+descriptionImage.value.replace(/\s/g, "-")} value="${descriptionImage.value.replace(/\s/g, "-")}">${descriptionImage.value}</option>`
                );

                card.appendChild(img);
                card.appendChild(desc);

                gallery.appendChild(card);
                
                selectedImageGallery.value = '';
                descriptionImage.value = '';

            };
    
            reader.readAsDataURL(file);
        });

        removeCard.addEventListener('click', (e) => {
            const cardSelected = document.getElementById(`${selectCardName.value.replace(/\s/g, "-")}card`);
            const optionSelected = document.getElementById(selectCardName.value.replace(/\s/g, "-")+selectCardName.value.replace(/\s/g, "-"))
            cardSelected.remove();
            optionSelected.remove();
        });

        sizeTextCard.addEventListener('input', (e) => {
            const cardSelected = document.getElementById(`${selectCardName.value.replace(/\s/g, "-")}card`);
            if (cardSelected) {
                cardSelected.dataset.fontSize = e.target.value;
                cardSelected.style.fontSize = `${e.target.value}px`;
            }
        });

        textColorCards.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--color-text-cards', e.target.value);
        });

        bgColorCards.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--color-bg-cards', e.target.value);
        });

        justifyCards.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--justify-cards', e.target.value);
        });

        optionsCardsBorder.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--border-cards', e.target.value);
        });

        roundedCardsBorder.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--border-radius-cards', `${e.target.value}px`);
        });
    }
    addItemsForm() {
        const formContainer = document.querySelector('.form');
        const fieldTypeSelect = document.getElementById('field-type-select');
        const addFieldBtn = document.getElementById('btn-add-field');
        const selectFieldName = document.getElementById('select-field-name');
        const removeFieldBtn = document.querySelector('.remove-field');
        const labelFontSize = document.getElementById('label-font-size');
        const labelColor = document.getElementById('label-color');
        const fieldColor = document.getElementById('field-color');
        const fieldBgColor = document.getElementById('field-bg-color');
        const fieldBorderRadius = document.getElementById('field-border-radius');
        const formBgColor = document.getElementById('form-bg-color');
        const formPadding = document.getElementById('form-padding');
        const formElement = document.createElement('form');
        const formTitle = document.createElement('h2');
        formTitle.contentEditable = true;
        formTitle.textContent = 'Título do Formulário';
        formElement.appendChild(formTitle);
        formContainer.appendChild(formElement);
        
        addFieldBtn.addEventListener('click', function() {
            const fieldType = fieldTypeSelect.value;
            if (!fieldType) return;
            
            const fieldId = 'field-' + Date.now();
            const fieldContainer = document.createElement('div');
            fieldContainer.className = 'form-field';
            
            const label = document.createElement('label');
            label.contentEditable = true;
            label.textContent = 'Campo ' + (selectFieldName.options.length);
            label.htmlFor = fieldId;

            let field;
            switch(fieldType) {
                case 'text':
                case 'email':
                case 'date':
                    field = document.createElement('input');
                    field.type = fieldType;
                    field.id = fieldId;
                    break;
                    
                case 'select':
                    field = document.createElement('select');
                    field.id = fieldId;

                    for (let i = 1; i <= 3; i++) {
                        const option = document.createElement('option');
                        option.value = 'opcao' + i;
                        option.textContent = 'Opção ' + i;
                        field.appendChild(option);
                    }
                    break;
                    
                case 'radio':
                    field = document.createElement('div');
                    field.className = 'radio-group';

                    for (let i = 1; i <= 3; i++) {
                        const radioId = fieldId + '-opt' + i;
                        const radioContainer = document.createElement('div');
                        
                        const radio = document.createElement('input');
                        radio.type = 'radio';
                        radio.id = radioId;
                        radio.name = fieldId;
                        radio.value = 'opcao' + i;
                        
                        const radioLabel = document.createElement('label');
                        radioLabel.htmlFor = radioId;
                        radioLabel.textContent = 'Opção ' + i;
                        radioLabel.contentEditable = true;
                        
                        radioContainer.appendChild(radio);
                        radioContainer.appendChild(radioLabel);
                        field.appendChild(radioContainer);
                    }
                    break;
                    
                case 'checkbox':
                    field = document.createElement('input');
                    field.type = 'checkbox';
                    field.id = fieldId;
                    break;
                    
                case 'textarea':
                    field = document.createElement('textarea');
                    field.id = fieldId;
                    field.rows = 3;
                    break;
            }
            
            fieldContainer.appendChild(label);
            if (field) fieldContainer.appendChild(field);
            formElement.appendChild(fieldContainer);
            
            const option = document.createElement('option');
            option.value = fieldId;
            option.textContent = label.textContent;
            selectFieldName.appendChild(option);
        });
        
        removeFieldBtn.addEventListener('click', function() {
            const selectedFieldId = selectFieldName.value;
            if (!selectedFieldId) return;
            
            const fieldToRemove = document.getElementById(selectedFieldId);
            if (fieldToRemove) {
                fieldToRemove.parentElement.remove();
            }

            for (let i = 0; i < selectFieldName.options.length; i++) {
                if (selectFieldName.options[i].value === selectedFieldId) {
                    selectFieldName.remove(i);
                    break;
                }
            }
        });
        
        function applyStyles() {
            const fields = document.querySelectorAll('.form-field');
            
            fields.forEach(field => {
                const label = field.querySelector('label');
                if (label) {
                    label.style.fontSize = labelFontSize.value + 'px';
                    label.style.color = labelColor.value;
                }
                
                const inputs = field.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select, textarea');
                inputs.forEach(input => {
                    input.style.color = fieldColor.value;
                    input.style.backgroundColor = fieldBgColor.value;
                    input.style.borderRadius = fieldBorderRadius.value + 'px';
                });
                
                const radioCheckboxLabels = field.querySelectorAll('input[type="radio"] + label, input[type="checkbox"] + label');
                radioCheckboxLabels.forEach(label => {
                    label.style.color = fieldColor.value;
                });
            });
            
        }
        function appStylesForm() {
            formElement.style.backgroundColor = formBgColor.value;
            formElement.style.padding = formPadding.value + 'px';
        }
    
        labelFontSize.addEventListener('input', applyStyles);
        labelColor.addEventListener('input', applyStyles);
        fieldColor.addEventListener('input', applyStyles);
        fieldBgColor.addEventListener('input', applyStyles);
        fieldBorderRadius.addEventListener('input', applyStyles);
        formBgColor.addEventListener('input', appStylesForm);
        formPadding.addEventListener('input', appStylesForm);
    
    }
    addItemsFooter() {
        const inputItemsFooter = document.getElementById('input-items-footer');
        const justifyFooter = document.getElementById('justify-footer');
        const selectedItemFooter = document.getElementById('style-items-footer-select');
        const removeItemFooterBtn = document.getElementById('remove-item-footer');
        const rangeFontSizeFooter = document.getElementById('range-font-size-footer');
        const inputColorFooter = document.getElementById('item-footer-color');
        const addItemFooterBtn = document.getElementById('add-item-footer-btn');
        const listItemsFooter = document.getElementById('ul-items-footer');
        const inputColorBgFooter = document.getElementById('item-footer-colorbg');
    
        addItemFooterBtn.addEventListener('click', (e) => {
            const itemText = inputItemsFooter.value.trim();
            if (!itemText) return;
            
            const itemId = itemText.replace(/\s/g, "-");
            
            const li = document.createElement('li');
            li.id = itemId;
            
            const link = document.createElement('a');
            link.textContent = itemText;
            link.contentEditable = true;
            
            link.addEventListener('blur', function() {
                const newText = this.textContent.trim();
                if (!newText) return;
                
                const newId = newText.replace(/\s/g, "-");
                
                li.id = newId;
                const option = document.querySelector(`#style-items-footer-select option[value="${itemId}"]`);
                if (option) {
                    option.value = newId;
                    option.textContent = newText;
                    option.id = `opt-${newId}`;
                }
                
                itemId = newId;
            });
            
            li.appendChild(link);
            listItemsFooter.appendChild(li);
            
            const option = document.createElement('option');
            option.value = itemId;
            option.textContent = itemText;
            option.id = `opt-${itemId}`;
            selectedItemFooter.appendChild(option);
            
            inputItemsFooter.value = '';
        });
    
        removeItemFooterBtn.addEventListener('click', (e) => {
            const selectedValue = selectedItemFooter.value;
            if (!selectedValue || selectedValue === "Selecionar") return;
            
            const itemToRemove = document.getElementById(selectedValue);
            if (itemToRemove) {
                itemToRemove.remove();
            }
            
            const optionToRemove = document.getElementById(`opt-${selectedValue}`);
            if (optionToRemove) {
                optionToRemove.remove();
            }
            
            selectedItemFooter.value = "Selecionar";
        });
    
        rangeFontSizeFooter.addEventListener('input', (e) => {
            const selectedValue = selectedItemFooter.value;
            if (!selectedValue || selectedValue === "Selecionar") return;
            
            const item = document.getElementById(selectedValue);
            if (item) {
                item.style.fontSize = `${e.target.value}px`;
            }
        });
        
        inputColorFooter.addEventListener('input', (e) => {
            const selectedValue = selectedItemFooter.value;
            if (!selectedValue || selectedValue === "Selecionar") return;
            
            const item = document.getElementById(selectedValue);
            if (item) {
                item.style.color = e.target.value;
            }
        });
        
        justifyFooter.addEventListener('change', (e) => {
            if (listItemsFooter) {
                listItemsFooter.style.justifyContent = e.target.value;
            }
        });

        inputColorBgFooter.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--color-footer', e.target.value);
        });
    }
    showAllControls() {
        const showControls = document.getElementById('controls-btn');
        const controls = document.getElementById('controls');
        const btnShowHeaderControls = document.querySelector('.show-header-controls');
        const headerControls = document.querySelector('.header-controls');
        const btnShowMenuControls = document.querySelector('.show-menu-controls');
        const menuControls = document.querySelector('.menu-controls');
        const btnShowGalleryControls = document.querySelector('.show-gallery-controls');
        const galleryControls = document.querySelector('.gallery-controls');
        const btnShowFormControls = document.querySelector('.show-form-controls');
        const formControls = document.querySelector('.form-controls');
        const btnShowFooterControls = document.querySelector('.show-footer-controls');
        const footerControls = document.querySelector('.footer-controls');
    
        headerControls.classList.add('display-none');
        menuControls.classList.add('display-none');
        galleryControls.classList.add('display-none');
        formControls.classList.add('display-none');
        footerControls.classList.add('display-none');
        controls.classList.remove('display-none');
    
        showControls.addEventListener('click', (e) => {
            controls.classList.toggle('display-none');
        });
    
        btnShowHeaderControls.addEventListener('click', (e) => {
            headerControls.classList.toggle('display-none');
        });
    
        btnShowMenuControls.addEventListener('click', (e) => {
            menuControls.classList.toggle('display-none');
        });
    
        btnShowGalleryControls.addEventListener('click', (e) => {
            galleryControls.classList.toggle('display-none');
        });
    
        btnShowFormControls.addEventListener('click', (e) => {
            formControls.classList.toggle('display-none');
        });
    
        btnShowFooterControls.addEventListener('click', (e) => {
            footerControls.classList.toggle('display-none');
        });
    }
    saveCode() {
        const showCode = document.querySelector('.show-code');
        const btnSaveLocalStorage = document.querySelector('.save-code');
        const codeWebsiteShowDiv = document.getElementById('code-web-site-show');
        const clearLocalStorage = document.querySelector('.clear-code');
    
        btnSaveLocalStorage.addEventListener('click', (e) => {
            const divContent = document.getElementById('web-site').outerHTML;
            
            const fullHTML = `<!DOCTYPE html>
            <html lang="pt-br">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${document.querySelector('#input-name-site')?.value || 'Título da Página'}</title>
            <style>
            :root {
                --background-header: ${getComputedStyle(document.documentElement).getPropertyValue('--background-header')};
                --color-title: ${getComputedStyle(document.documentElement).getPropertyValue('--color-title')};
            }
            </style>
            </head>
            <body>
            ${divContent}
            </body>
            </html>`;
            
            localStorage.setItem("code-website", fullHTML);
        });
    
        showCode.addEventListener('click', (e) => {
            const stringCode = localStorage.getItem("code-website");
            if (stringCode) {
                codeWebsiteShowDiv.textContent = stringCode;
            }
        });

        clearLocalStorage.addEventListener('click', (e) => {
            localStorage.removeItem("code-website");
        });
    }
    generalStyles() {
        const colorBgWebsiteInput = document.getElementById('bg-website-input');

        colorBgWebsiteInput.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--bg-website', e.target.value);
        });
    }

}

customElements.define('website-gerado', Website);