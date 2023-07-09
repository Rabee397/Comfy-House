//hide and show cart
const cartIcon = document.querySelector("#navbar-shopping-cart");
const timeIcon = document.querySelector("#times-cart-calc");
const cartContent = document.querySelector(".cart-calc");
cartIcon.addEventListener("click",()  => {
    cartContent.style.right = "0";
})
timeIcon.addEventListener("click",()  => {
    cartContent.style.right = "-100%";
})

//draw-products
const productsContainer = document.querySelector(".products-container");
const cartTotal = document.querySelector("#cart-total");
const cartContainer = document.querySelector(".product-purchased-container");
const clearAll = document.querySelector("#clear-btn");
const products = [
    {
        id:0,
        name:"queen panel bed",
        price:100,
        instock:3,
        imageSrc:"images/product-1.jpeg",
    },
    {
        id:1,
        name:"king panel bed",
        price:200,
        instock:4,
        imageSrc:"images/product-2.jpeg",
    },
    {
        id:2,
        name:"single panel bed",
        price:300,
        instock:9,
        imageSrc:"images/product-5.jpeg",
    },
    {
        id:3,
        name:"twin panel bed",
        price:500,
        instock:6,
        imageSrc:"images/product-4.jpeg",
    },
    {
        id:4,
        name:"fridge",
        price:250,
        instock:2,
        imageSrc:"images/product-5.jpeg",
    },
    {
        id:5,
        name:"dresser",
        price:200,
        instock:4,
        imageSrc:"images/product-6.jpeg",
    },
    {
        id:6,
        name:"couch",
        price:100,
        instock:3,
        imageSrc:"images/product-7.jpeg",
    },
    {
        id:7,
        name:"table",
        price:400,
        instock:4,
        imageSrc:"images/product-8.jpeg",
    },
    {
        id:8,
        name:"single panel bed",
        price:300,
        instock:9,
        imageSrc:"images/product-5.jpeg",
    }
]
function drawProducts(){
    products.forEach((item)=>{
        productsContainer.innerHTML +=`
        <div class="product-box">
        <div class="img-container">
            <img src="${item.imageSrc}" alt="${item.name}">
            <p><i onclick="addToCart(${item.id})" class="fas fa-shopping-cart "></i> add to cart</p>
        </div>
        <p class="product-name">${item.name}</p>
        <p class="product-price"> $ ${item.price}</p>
    </div>`
    })
}
drawProducts();

//add-to-cart
let cart;
if(localStorage.getItem("cart")){
    cart = JSON.parse(localStorage.getItem("cart"));
    updateCart();
}else{
    cart = [];
     
}

function addToCart(id){
    if(cart.some((item)=> item.id === id)){
        changeNumberOfUnits("plus", id);
    }else{
        const item = products.find((item)=> item.id === id)
        cart.push({
        ...item,
        numberOfUnits : 1,
    })
    }
    
    updateCart();
}

//update-cart
function updateCart(){
    renderCartItems();
    renderSubtotal();

    //save cart to localstorage
    localStorage.setItem("cart",JSON.stringify(cart));
}


//render-Subtotal

function renderSubtotal(){
    let totalPrice = 0 , totalItems = 0;
    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    })
    cartTotal.innerHTML = `your total ( ${ totalItems } items) : $${ totalPrice.toFixed(2) }`
}


function renderCartItems(){
    
    cartContainer.innerHTML = "";
    cart.forEach((item)=> {
        cartContainer.innerHTML +=`
        <div class="product-purchased-deatails">
                  
                    <div class="product-purchased-img-container">
                        <img src="${item.imageSrc}" alt="${item.name}">
                    </div>
                    <div class="product-purchased-info">
                        <span class="product-purchased-name">${item.name}</span>
                        <span class="product-purchased-price">$${item.price}</span>
                        <span onclick="removeItems(${item.id})" class="remove">remove</span>
                    </div>
                    <div class="product-purchased-countity">
                        <i onclick="changeNumberOfUnits('plus', ${item.id})" class="fas fa-chevron-up"></i>
                        <span>${item.numberOfUnits}</span>
                        <i onclick="changeNumberOfUnits('minus', ${item.id})" class="fas fa-chevron-down"></i>
                    </div> 
                   
        </div>`
    })
}

//change-Number-Of-Units
function changeNumberOfUnits(action,id){
    cart = cart.map((item)=>{
        let numberOfUnits = item.numberOfUnits;
        if(item.id === id){
            if(action === "minus" && numberOfUnits > 1){
                numberOfUnits--;
            }else if(action === "plus" && numberOfUnits < item.instock){
                numberOfUnits++;
            }
        }
        return {
            ...item,
            numberOfUnits,
        }
    })
    updateCart();
}

//remove-items
function removeItems(id){
    cart = cart.filter((item)=> item.id !== id);

    updateCart();
}

//remove-all-items

clearAll.addEventListener("click",removeAllItems); 
function removeAllItems(){
    cart = [];
    updateCart();
}