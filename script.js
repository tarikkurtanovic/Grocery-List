function addItem() {
  const itemName = document.getElementById("itemName").value.trim();
  const itemQuantity = document.getElementById("itemQuantity").value.trim();
  const itemPrice = document.getElementById("itemPrice").value.trim();

  if (itemName === "") {
    document.getElementById("itemNameError").textContent =
      "Please enter a valid item ";
    return;
  }

  const item = {
    name: itemName,
    quantity: itemQuantity,
    price: itemPrice,
  };

  let groceryItems = localStorage.getItem("groceryItems");
  groceryItems = groceryItems ? JSON.parse(groceryItems) : [];
  groceryItems.push(item);
  localStorage.setItem("groceryItems", JSON.stringify(groceryItems));

  displayItemList();
  clearInputs();

  document.getElementById("successMessage").textContent =
    "Item added successfully!";
}

function displayItemList() {
  const grocerylist = document.getElementById("groceryList");

  grocerylist.innerHTML = "";
  let groceryItems = localStorage.getItem("groceryItems");
  groceryItems = groceryItems ? JSON.parse(groceryItems) : [];

  if (groceryItems.length === 0) {
    groceryList.innerHTML = "<p> List is empty.</p>";
    return;

    // clearAll();
  }

  groceryItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>Name: ${item.name}</span>
     <span>Quantity: ${item.quantity} </span>
     <span>Price: ${item.price}$</span>
    
     <button onclick="editItem(${index})">Edit</button>
          <button onclick="deleteItem(${index})">Delete</button>
    `;
    groceryList.appendChild(li);
  });
}

function editItem(index) {
  const groceryItems = JSON.parse(localStorage.getItem("groceryItems"));
  const item = groceryItems[index];

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = item.name;

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = item.quantity;

  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.step = "0.01";
  priceInput.value = item.price;

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save Changes";
  saveButton.onclick = () => saveChanges(index);

  const listItem = document
    .getElementById("groceryList")
    .getElementsByTagName("li")[index];
  listItem.innerHTML = "";
  listItem.appendChild(nameInput);
  listItem.appendChild(quantityInput);
  listItem.appendChild(priceInput);
  listItem.appendChild(saveButton);
}

function saveChanges(index) {
  const groceryItems = JSON.parse(localStorage.getItem("groceryItems"));
  const listItem = document
    .getElementById("groceryList")
    .getElementsByTagName("li")[index];

  const newName = listItem.getElementsByTagName("input")[0].value;
  const newQuantity = listItem.getElementsByTagName("input")[1].value;
  const newPrice = listItem.getElementsByTagName("input")[2].value;

  groceryItems[index].name = newName;
  groceryItems[index].quantity = newQuantity;
  groceryItems[index].price = newPrice;

  localStorage.setItem("groceryItems", JSON.stringify(groceryItems));
  displayItemList();
}

function deleteItem(index) {
  const groceryItems = JSON.parse(localStorage.getItem("groceryItems"));
  groceryItems.splice(index, 1);
  localStorage.setItem("groceryItems", JSON.stringify(groceryItems));
  displayItemList();
}

function clearAll() {
  localStorage.removeItem("groceryItems");
  displayItemList();
}

function calculateBudget() {
  const budgetInput = document.getElementById("budget");
  const budgetAmount = parseFloat(budgetInput.value.trim());

  let totalAmount = 0;
  let groceryItems = localStorage.getItem("groceryItems");
  groceryItems = groceryItems ? JSON.parse(groceryItems) : [];

  groceryItems.forEach((item) => {
    totalAmount += parseFloat(item.price);
  });

  let message;
  if (budgetAmount - totalAmount > 0) {
    message = `Amount left in the budget: $${(
      budgetAmount - totalAmount
    ).toFixed(2)}`;
  } else {
    message = `You need to add $${(totalAmount - budgetAmount).toFixed(
      2
    )} to the budget.`;
  }

  alert(message);
}

function clearInputs() {
  document.getElementById("itemName").value = "";
  document.getElementById("itemQuantity").value = "1";
  document.getElementById("itemPrice").value = "";
}

displayItemList();
