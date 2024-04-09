if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready()
}

var totalAmount = "0,00"

function ready() {

    const removeProductButtons = document.getElementsByClassName("remove-product-button");

    for (var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct);
    }
    const quantityInputs = document.getElementsByClassName("product-qtd-input");
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }
    const addToCartButtons = document.getElementsByClassName("button-hover-background");
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart);
    }
    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
}
function makePurchase(){
    if(totalAmount === "0,00"){
        alert("Seu carrinho está vazio!")
    } else{
        alert(
            `
            Obrigado pela sua compra!
            Valor do pedido: R$ ${totalAmount}
            Volte Sempre :)
            `
        )
    }

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}



function checkIfInputIsNull(event){
    if (event.target.value === "0"){
        event.target.parentElement.parentElement.remove();
    }


    updateTotal()
}
function removeProduct(event) {
    event.target.parentElement.parentElement.remove(); 
    updateTotal();
}
function addProductToCart(event) {

    const button = event.target
    const productInfos = button.parentElement.parentElement;
    const productImage = productInfos.getElementsByClassName("img-produto")[0].src;
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText;
    const productPrice = productInfos.getElementsByClassName("price")[0].innerText;

    const productsCartName = document.getElementsByClassName("cart-product-title")
    for( var i = 0; i < productsCartName.length; i++){
        if(productsCartName[i].innerText == productTitle){
            productsCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return
        }
    }

    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-product");

    newCartProduct.innerHTML = ` 
        <td class="product-identification">
        <img class="cart-product-image" src="${productImage}" alt="${productTitle}" width="40px" height="40px">
        <strong class="cart-product-title">${productTitle}</strong>
    </td>
    <td>
        <span class="cart-product-price">${productPrice}</span>
    </td>
    <td>
        <input class="product-qtd-input" type="number" value="1" min="0">
        <button class="remove-product-button" type="button">Remover</button>
    </td>`

    const tableTbody = document.querySelector(".cart-table tbody");
    tableTbody.append(newCartProduct);

    updateTotal()

    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
}



function updateTotal() {

    totalAmount = 0;

    const cartProduct = document.getElementsByClassName("cart-product");

    for (var i = 0; i < cartProduct.length; i++) {
        const productPrice = cartProduct[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".");
        const productQuantity = cartProduct[i].getElementsByClassName("product-qtd-input")[0].value;
        totalAmount += (productPrice * productQuantity);
    }
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = "R$ " + totalAmount
}