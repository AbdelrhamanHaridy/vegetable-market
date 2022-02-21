// Elements
// shop page
const imagesSlider = document.querySelector(".product-image-swiper");
const thumbnailSlider = document.querySelector(".swiper-thumbnails");
// vendor page
const searchBar = document.querySelector(".search-bar");
// wishlist
const wishlistTable = document.querySelector(".wishlist--body");
const totalWishlistItems = document.querySelector(".total-wishlist-items");
// cart
const cart = document.querySelector(".cart--body");
const totalCartItems = document.querySelector(".total-cart-items");
const clearAllBtn = document.querySelector(".clear-all-cart");
const country = document.querySelector(".selct-country");
const selectedCountry = document.querySelector(".country-estimate");
const shipping = document.querySelector(".shipping--rate");
// shop-invoice
const pdfContent = document.getElementById("invoice_wrapper");
const downloadBtn = document.getElementById("invoice_download_btn");
// classes
class GeneratePDF {
    constructor() {
        this.createPDF(pdfContent, downloadBtn);
    }
    createPDF(pdfContent, downloadButton) {
        if (!pdfContent) return;
        const contantRect = pdfContent.getClientRects();
        const pdfMargin = 20;
        const { width: contentWidth, height: contentHeight } = contantRect[0];
        const pdfWidth = contentWidth + pdfMargin * 2;
        const pdfHeight = contentWidth * 1.5 + pdfMargin * 2;
        const canvasImageWidth = contentWidth;
        const canvasImageHeight = contentHeight;
        const totalPDFPages = Math.floor(contentHeight / pdfHeight);
        html2canvas(pdfContent).then(function (canvas) {
            canvas.getContext("2d");
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdfFile = new jsPDF("p", "pt", [pdfWidth, pdfHeight]);
            pdfFile.addImage(
                imgData,
                "JPG",
                pdfMargin,
                pdfMargin,
                canvasImageWidth,
                canvasImageHeight
            );
            for (let i = 1; i <= totalPDFPages; i++) {
                pdfFile.addPage(pdfWidth, pdfHeight);
                pdfFile.addImage(
                    imgData,
                    "JPG",
                    pdfMargin,
                    -(pdfHeight * i) + pdfMargin * 4,
                    canvasImageWidth,
                    canvasImageHeight
                );
            }
            document.addEventListener("click", (e) => {
                if (e.target !== downloadButton) return;
                pdfFile.save("shop-invoice");
            });
        });
    }
}
class ProductSlider {
    constructor() {
        // shop page
        this.createImgsSwiper();
        this.createThumbnailSwiper();
    }
    // temporary swipers
    // product images swiper
    createImgsSwiper() {
        if (!imagesSlider) return;
        const imgsSlider = new Swiper(".product-image-swiper", {
            effect: "flip",
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
    // thumbnails swiper
    createThumbnailSwiper() {
        if (!thumbnailSlider) return;
        const thumbnailSwiper = new Swiper(".swiper-thumbnails", {
            slidesPerView: 5,
            spaceBetween: 20,
            freeMode: true,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
    // methods
    // vendor search
}
class Vendor {
    constructor() {
        // vendor search
        if (searchBar) {
            searchBar.addEventListener("keyup", this.search.bind(this));
        }
    }
    search() {
        const searchValue = document
            .querySelector(".search-bar")
            .value.toUpperCase();
        const products = document.querySelectorAll(".vendor-card");
        const productName = document.querySelectorAll(".card-name");
        for (let i = 0; i < productName.length; i++) {
            let match = products[i].getElementsByClassName("card-name")[0];
            if (match) {
                let textValue = match.textContent || match.innerHTML;
                if (textValue.toUpperCase().indexOf(searchValue) > -1) {
                    products[i].style.display = "";
                } else {
                    products[i].style.display = "none";
                }
            }
        }
    }
}
class Shop {
    constructor() {
        // events
        document.addEventListener("click", this.addToWishlist.bind(this));
        document.addEventListener("click", this.addToCart.bind(this));
        document.addEventListener("click", this.addToCartFromWish.bind(this));
        document.addEventListener("click", this.removeHandler.bind(this));
        document.addEventListener("click", this.subTotalPrice.bind(this));
        if (country) country.addEventListener("change", this.showCountry);
        if (clearAllBtn)
            clearAllBtn.addEventListener("click", this.clearAll.bind(this));
        this.getWishlistProductsData();
        this.getCartProductsData();
        if (wishlistTable)
            this.addIncomingDataTolist(
                totalWishlistItems,
                this._wishlistDataArray,
                "wishlist"
            );
        if (cart) {
            this.addIncomingDataTolist(
                totalCartItems,
                this._cartDataArray,
                "cart"
            );
            this.calcTotalAmount();
        }
    }
    // VARIABLES
    _wishlistDataArray = [];
    _cartDataArray = [];
    // METHODS
    showCountry() {
        selectedCountry.textContent = country.value;
    }
    // add data to local storage
    addDataToLocalStorage(itemName, dataArray) {
        localStorage.setItem(itemName, JSON.stringify(dataArray));
    }
    // collect data
    collectData(targetButton, dataArray, itemName) {
        // product data
        const product = targetButton.closest(".product-cart-wrap");
        const productId = product.getAttribute("id");
        const productName = product.querySelector("h2 a").textContent;
        const productImg = product.querySelector(".default-img").src;
        const productQuantity = product.querySelector(".quantity").textContent;
        const productRating = product.querySelector(
            ".product-rate-cover"
        ).innerHTML;
        const productPrice = product.querySelector(
            ".product-price span:first-of-type"
        ).textContent;
        const productCategory = product.querySelector(
            ".product-category a"
        ).textContent;
        // create data object
        const productData = {
            id: productId,
            pName: productName,
            img: productImg,
            quantity: productQuantity,
            rating: productRating,
            price: productPrice,
            category: productCategory,
        };
        this.checkProduct(itemName, dataArray, productData);
    }
    // check unique products
    checkProduct(itemName, productsArray, product) {
        if (!productsArray.some((item) => item.id === product.id)) {
            productsArray.push(product);
        }
        this.addDataToLocalStorage(itemName, productsArray);
    }
    // get data from local storage
    getWishlistProductsData() {
        if (localStorage.getItem("wishlistProducts"))
            this._wishlistDataArray = JSON.parse(
                localStorage.getItem("wishlistProducts")
            );
    }
    getCartProductsData() {
        if (localStorage.getItem("cartProducts"))
            this._cartDataArray = JSON.parse(
                localStorage.getItem("cartProducts")
            );
    }
    // create HTML elements
    createWishlistHTML(product, checkBox) {
        const productStructure = `<tr class="item--row">
            <td class="custome-checkbox pl-30">
                <input class="form-check-input" type="checkbox" name="checkbox"
                    id="exampleCheckbox${checkBox}" value="" />
                <label class="form-check-label" for="exampleCheckbox${checkBox}">
                </label>
            </td>
            <td class="image product-thumbnail pt-40" id="${product.id}"><img
                    src=${product.img} alt="#" />
                <h6><a class="product-name mb-10" href="shop-product-right.html">${
                    product.pName
                }</a></h6>
            <div class="product-rate-cover">
                ${product.rating}
            </div>
            </td>
            <td class="price" data-title="Price">
                <h3 class="text-brand wish-price">${product.price}</h3>
            </td>
            ${
                +product.quantity > 0
                    ? `<td class="text-center detail-info" data-title="Stock">
                <span class="stock-status in-stock mb-0"> In Stock </span>
                        </td>`
                    : `<td class="text-center detail-info" data-title="Stock">
                            <span class="stock-status out-stock mb-0"> Out Stock </span>
                        </td>`
            }
            ${
                +product.quantity > 0
                    ? `<td class="text-center" data-title="Cart">
                <button class="btn btn-sm add-to-cart-btn" title="add to cart">
                    <i class="fi fi-rs-shopping-cart"></i>
                </button>
                </td>`
                    : `<td class="text-right" data-title="Cart">
                <button class="btn btn-sm btn-secondary ml-15">Contact Us</button>
            </td>`
            }
            <td class="action text-center" data-title="Remove">
                <a href="#" class="text-body"><i class="fi-rs-trash wish-item-remove"></i></a>
            </td>
    </tr>`;
        wishlistTable.insertAdjacentHTML("afterbegin", productStructure);
    }
    createCartHTML(product, checkBox) {
        const productStructure = `
        <tr class="item--row">
            <td class="custome-checkbox pl-30">
                <input class="form-check-input" type="checkbox" name="checkbox"
                    id="exampleCheckbox${checkBox}" value="">
                <label class="form-check-label" for="exampleCheckbox${checkBox}"></label>
            </td>
            <td class="image product-thumbnail pt-40" id="${product.id}"><img
                    src=${product.img} alt="#"></td>
            <td class="product-des product-name">
                <h6 class="mb-5"><a class="product-name mb-10 text-heading"
                        href="shop-product-right.html">${product.pName}</a></h6>
                <div class="product-rate-cover">
                    ${product.rating}
                </div>
            </td>
            <td class="price" data-title="Price">
                <h4 class="text-body product--price">${product.price}</h4>
                <div class="hide quantity">100</div>
            </td>
            <td class="text-center detail-info" data-title="Stock">
                <div class="detail-extralink mr-15">
                    <div class="detail-qty border radius">
                        <a href="#" class="qty-down"><i class="fi-rs-angle-small-down dec-qty"></i></a>
                        <span class="qty-val">1</span>
                        <a href="#" class="qty-up"><i class="fi-rs-angle-small-up inc-qty"></i></a>
                    </div>
                </div>
            </td>
            <td class="price" data-title="Price">
                <h4 class="text-brand total--price">${product.price}</h4>
            </td>
            <td class="action text-center" data-title="Remove">
            <a href="#" class="text-body">
            <i class="fi-rs-trash cart-item-remove"></i>
            </a>
            </td>
        </tr>
        `;
        cart.insertAdjacentHTML("afterbegin", productStructure);
    }
    // add incoming data to the page
    addIncomingDataTolist(totalItemsElement, dataArray, list) {
        totalItemsElement.textContent = dataArray.length;
        let checkBox = 1;
        dataArray.forEach((product) => {
            if (list === "cart") {
                this.createCartHTML(product, checkBox);
                checkBox++;
            } else if (list === "wishlist") {
                this.createWishlistHTML(product, checkBox);
                checkBox++;
            }
        });
    }
    // remove items
    removeItem(e, dataArray, itemName, totalItemsElement) {
        e.preventDefault();
        const removedItem = e.target
            .closest(".item--row")
            .querySelector(".product-thumbnail");
        const itemIndex = dataArray.findIndex(
            (product) => product.id === removedItem.getAttribute("id")
        );
        dataArray.splice(itemIndex, 1);
        this.addDataToLocalStorage(itemName, dataArray);
        e.target.closest(".item--row").remove();
        this.calcTotalAmount();
        totalItemsElement.textContent = dataArray.length;
    }
    removeHandler(e) {
        if (e.target.classList.contains("wish-item-remove")) {
            this.removeItem(
                e,
                this._wishlistDataArray,
                "wishlistProducts",
                totalWishlistItems
            );
        } else if (e.target.classList.contains("cart-item-remove")) {
            this.removeItem(
                e,
                this._cartDataArray,
                "cartProducts",
                totalCartItems
            );
        } else return;
    }
    // check if item exist in wishlist or cart
    checkItem(targetButton, dataArray, action) {
        const productId = targetButton
            .closest(".product-cart-wrap")
            .getAttribute("id");
        const productIndex = dataArray.findIndex(
            (product) => product.id === productId
        );
        if (action === "wishlist" && productIndex > -1) {
            alert("this product will be removed from cart");
            this._cartDataArray.splice(productIndex, 1);
            this.addDataToLocalStorage("cartProducts", this._cartDataArray);
        } else if (action === "cart" && productIndex > -1) {
            alert("this product will be removed from whishlist");
            this._wishlistDataArray.splice(productIndex, 1);
            this.addDataToLocalStorage(
                "wishlistProducts",
                this._wishlistDataArray
            );
        }
    }
    // wishlist event handler
    addToWishlist(e) {
        if (
            e.target.getAttribute("aria-label") === "Add To Wishlist" ||
            e.target.parentElement.getAttribute("aria-label") ===
                "Add To Wishlist"
        ) {
            const wishlistButton =
                e.target.parentElement.getAttribute("aria-label") ===
                "Add To Wishlist"
                    ? e.target.parentElement
                    : e.target;
            // check if cart already include this item ? remove from cart
            this.checkItem(wishlistButton, this._cartDataArray, "wishlist");
            this.collectData(
                wishlistButton,
                this._wishlistDataArray,
                "wishlistProducts"
            );
        }
    }
    // add to cart event handler
    addToCart(e) {
        if (
            e.target.classList.contains("add") ||
            e.target.parentElement.classList.contains("add")
        ) {
            let addToCartButton = e.target.classList.contains("add")
                ? e.target
                : e.target.parentElement;
            addToCartButton = addToCartButton.parentElement;
            const product = addToCartButton.closest(".product-cart-wrap");
            if (+product.querySelector(".quantity").textContent === 0) {
                alert("this product isn't available for now");
                e.preventDefault();
                return;
            }
            this.checkItem(addToCartButton, this._wishlistDataArray, "cart");
            this.collectData(
                addToCartButton,
                this._cartDataArray,
                "cartProducts"
            );
        }
    }
    // add product from wishlist to cart
    addToCartFromWish(e) {
        if (
            e.target.getAttribute("title") === "add to cart" ||
            e.target.parentElement.getAttribute("title") === "add to cart"
        ) {
            let addToCartButton =
                e.target.getAttribute("title") === "add to cart"
                    ? e.target
                    : e.target.parentElement;
            addToCartButton = addToCartButton.parentElement;
            const productId = addToCartButton
                .closest(".item--row")
                .querySelector(".product-thumbnail")
                .getAttribute("id");
            let product = this._cartDataArray.find(
                (product) => product.id === productId
            );
            if (product) return;
            product = this._wishlistDataArray.find(
                (product) => product.id === productId
            );
            this.checkProduct("cartProducts", this._cartDataArray, product);
            // remove from wishlist
            addToCartButton
                .closest(".item--row")
                .querySelector(".wish-item-remove")
                .click();
        }
    }
    // clear all cart items
    clearAll() {
        this._cartDataArray = [];
        this.addDataToLocalStorage("cartProducts", this._cartDataArray);
        location.reload();
    }
    // calc total price after add shipping & show it
    calcTotalAmount() {
        if (!cart) return;
        const totalAmount = document.querySelector(".total--amount");
        const finalTotalAmount = document.querySelector(".final-total");
        const shippingRate =
            parseInt(document.querySelector(".shipping-rate").textContent) /
            100;
        const allSubTotal = Array.from(
            document.querySelectorAll(".total--price")
        ).map((price) => +price.textContent.slice(1));
        const sum = +allSubTotal
            .reduce((acc, price) => {
                return acc + price;
            }, 0)
            .toFixed(2);
        totalAmount.textContent = `$${sum}`;
        finalTotalAmount.textContent = `$${(sum + sum * shippingRate).toFixed(
            2
        )}`;
        shippingRate > 0
            ? (shipping.textContent = `${shippingRate * 100}%`)
            : "FREE";
    }
    // increace or decrease quantity handler
    subTotalPrice(e) {
        if (
            e.target.classList.contains("dec-qty") ||
            e.target.classList.contains("inc-qty")
        ) {
            e.preventDefault();
            const product = e.target.closest(".item--row");
            const quantitySelect = product.querySelector(".qty-val");
            let quantityValue = product.querySelector(".qty-val").textContent;
            const totalPriceElement = product.querySelector(".total--price");
            const prodectPriceValue = +product
                .querySelector(".product--price")
                .textContent.slice(1);
            const TotalquantityValue =
                +product.querySelector(".quantity").textContent;
            const calcSubTotal = () => {
                quantitySelect.textContent = `${quantityValue}`;
                totalPriceElement.textContent = `$${(
                    quantityValue * prodectPriceValue
                ).toFixed(2)} `;
                this.calcTotalAmount();
            };
            if (e.target.classList.contains("dec-qty")) {
                if (+quantityValue === 1) return;
                quantityValue--;
                calcSubTotal();
            }
            if (e.target.classList.contains("inc-qty")) {
                if (+quantityValue === TotalquantityValue) return;
                quantityValue++;
                calcSubTotal();
            }
        }
    }
}
const productSlider = new ProductSlider();
const vendor = new Vendor();
const shop = new Shop();
const pdf = new GeneratePDF();
