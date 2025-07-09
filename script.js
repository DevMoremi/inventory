const form = document.getElementById('form-content');

// the event adding input data to the table ,saving my objects(data) in an array, checking if the localstorage is empty, the array should be displayed as empty
// also making sure empty values are not getting added to the table.
form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    const name = document.getElementById('product-name').value;
    const type = document.getElementById('type').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    let products = localStorage.getItem('products');
    if (!products) {
        products = '[]';
    }
    products = JSON.parse(products);


    let max = 1000;
    let randomNum = Math.floor(Math.random() * max);

    const productItem = {};
    productItem.id = randomNum;
    productItem.name = name;
    productItem.type = type;
    productItem.price = parseInt(price);
    productItem.quantity = parseInt(quantity);
    productItem.total = price * quantity;

    products.push(productItem);

    let table = document.getElementById('tbody');
    if (Object.values(productItem).every(isNotEmpty)) {
        newRow = table.insertRow(0);

        newRow.insertCell(0).textContent = productItem.id;
        newRow.insertCell(1).textContent = name;
        newRow.insertCell(2).textContent = type;
        newRow.insertCell(3).textContent = price;
        newRow.insertCell(4).textContent = quantity;
        newRow.insertCell(5).textContent = productItem.total;

        const button = createDeleteButton(productItem.id);

        newRow.insertCell(6).appendChild(button)
        localStorage.setItem('products', JSON.stringify(products));
        evt.target.reset()
        sumTotal();


    } else {
        alert("Please fill all fields")
    }
        
})


// the funtion validating if the values of the obj properties(input data) are not empty
function isNotEmpty(value) {
    return value !== '' && value !== null;
}
// the function displaying the table data even after the page refreshes 
function showProducts() {

    let tableBody = document.getElementById('tbody');

    const getProducts = localStorage.getItem('products');

    if (getProducts) {
        let parseProducts = JSON.parse(getProducts);
        parseProducts.forEach(product => {
            let row = document.createElement('tr');
            for (let item in product) {
                let rowData = document.createElement('td');
                let rowDataCell = document.createTextNode(product[item]);
                rowData.appendChild(rowDataCell);
                row.appendChild(rowData);

            }

            const button = createDeleteButton(product.id);

            let deleteButtonData = document.createElement('td');
            deleteButtonData.appendChild(button);


            row.appendChild(deleteButtonData)



            tableBody.appendChild(row);
        });
        sumTotal();

    }

}
//the function creating button element and also deleting the data from the ui and the local storage
function createDeleteButton(id) {
    const button = document.createElement('button')
    button.innerHTML = "delete";
    button.classList.add('delete');
    button.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.remove();
        sumTotal();
        let rowData = JSON.parse(localStorage.getItem('products'));
        const newRow = rowData.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(newRow));
    })
    return button;
}


//the function adding all the total values.
function sumTotal() {
    const table = document.getElementById('table');

    let calcTotal = 0;
    for (let i = 1; i < table.rows.length - 1; i++) {
        cellValue = Number(table.rows[i].cells[5].textContent);
        calcTotal += cellValue;
    }
    document.getElementById('colspan').textContent = calcTotal.toFixed(2);

}
showProducts();