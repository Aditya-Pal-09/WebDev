const products = [
    {id: 1, name: "Laptop", price: 50000},
    {id: 2, name: "Phone", price: 20000},
    {id: 3, name: "Headphones", price: 2000}
];

let cart = [];

function renderProducts() {
    let html = "";
    products.forEach(p => {
        html += `
        <div class="card">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
    document.getElementById("products").innerHTML = html;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    renderCart();
}

function renderCart() {
    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        html += `
        <p>${item.name} - ₹${item.price}
        <button onclick="removeItem(${index})">Remove</button></p>`;
    });

    document.getElementById("cart").innerHTML = html;
    document.getElementById("total").innerText = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function checkout() {
    let name = document.getElementById("name").value;
    if(name === "") {
        alert("Enter name");
        return;
    }
    alert("Order placed successfully!");
    cart = [];
    renderCart();
}

renderProducts();