let table = document.getElementById("table")
let addButton = document.getElementById("add-button")
let productName = document.getElementById('product-input')
let productPrice = document.getElementById("price-input")
let counter = 1
addButton.addEventListener("click", (e) => {
    let name = productName.value
    let price = productPrice.value

    table.innerHTML += `
    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="py-3 px-4 whitespace-nowrap">${counter}</td>
                        <td id="product-name" class="py-3 px-4 whitespace-nowrap">${name}</td>
                        <td id="price" class="py-3 px-4 whitespace-nowrap">${price}$</td>
                    </tr>
        `
    counter++
})

document.getElementById('total-btn').addEventListener("click", (e) => {
    let prices = document.querySelectorAll('#price')
    let total = 0

    prices.forEach(e => {
        let temp = e.textContent.slice(0, e.textContent.length-1)
        total += Number(temp)
    })

    document.getElementById('total').textContent = total
})