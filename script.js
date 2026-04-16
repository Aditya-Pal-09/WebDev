function validateForm() {
    let name = document.forms[0]["name"].value;
    let email = document.forms[0]["email"].value;
    let phone = document.forms[0]["phone"].value;

    if (name === "" || email === "" || phone === "") {
        alert("All fields required!");
        return false;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Invalid phone number!");
        return false;
    }

    return true;
}

function searchEvents() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(input) ? "block" : "none";
    });
}