(function () {
    let bannerData;
    let productsData;
    let bannerCard = '';
    let productCard = '';
    let produrtCards = document.querySelector('#arr-product-card');
    let selectedName = document.querySelectorAll('.selected-name');
    let selectedPrice = document.querySelector('.selected-price p span');
    let selectedImg = document.querySelector('.selected-img');
    let bannerBody = document.querySelectorAll('.banner-body');

    (function getAjaxJsoDataBanner() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = JSON.parse(xhr.response);
                renderBannerCard(bannerData);
            }
        }
        xhr.open('GET', 'data-banner.json', true);
        xhr.send();
    })();

    (function getAjaxJsoDataProducts() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                productsData = JSON.parse(xhr.response);
                renderProductCard(productsData);
            }
        }
        xhr.open('GET', 'data-products.json', true);
        xhr.send();
    })();



    function renderBannerCard(bannerData) {
        for (let i = 0; i < bannerData.length; i++) {
            bannerCard += `
        <a href="#" class="banner-body">
        <p class="banner-title">${bannerData[i].title}</p>
        <p class="banner-text">${bannerData[i].text}</p>
        <p class="banner-price">${bannerData[i].price}</p>
        <img class="banner-img"></img>
        </a>`
        };
        document.querySelector('.banner-wrapper').innerHTML += bannerCard;
        bannerBody = document.querySelectorAll('.banner-body');
        for (let i = 0; i < bannerData.length; i++) {
            bannerBody[i].style.backgroundColor = bannerData[i].background;
            bannerBody[i].childNodes[7].src = bannerData[i].img;
        }
    };

    function renderProductCard(productsData) {
        for (let i = 0; i < productsData.length; i++) {
            productCard += `
            <div class="product-card" data-idnumber="${productsData[i].idNumber}">
            <div class="card-photo-product">
            <img class="product-img" src="${productsData[i].img}"></div>
            <div class="product-name">${productsData[i].name}</div>
            </div>`
        };
        document.querySelector('#arr-product-card').innerHTML = productCard;
        creatingFirstProductCard();
    };

    function creatingFirstProductCard() {
        let cardPhotoProduct = document.querySelectorAll('.card-photo-product');
        let numSelect = '0';
        cardPhotoProduct[0].classList.add("select");
        selectedName[0].textContent = 'Mens ' + productsData[0].name;
        selectedPrice.textContent = '$ ' + productsData[0].price;
        selectedImg.src = productsData[0].img;
        changeProductCard(cardPhotoProduct, numSelect)
    }

    function changeProductCard(cardPhotoProduct, numSelect) {
        produrtCards.addEventListener('click', function (event) {
            if (event.target.parentElement.className == 'card-photo-product' || event.target.parentElement.className == 'card-photo-product select') {
                for (let i = 0; i < productsData.length; i++) {
                    if (event.path[2].attributes[1].value == productsData[i].idNumber) {
                        selectedName[0].textContent = 'Mens ' + productsData[i].name;
                        selectedPrice.textContent = '$ ' + productsData[i].price;
                        selectedImg.src = productsData[i].img;
                        event.target.parentElement.classList.toggle("select");
                        cardPhotoProduct[numSelect].classList.toggle("select");
                        numSelect = i;
                    };
                };
            };
        });
    };
})();