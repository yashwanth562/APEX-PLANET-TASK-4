// script.js

// === To-Do App Logic ===
if (document.getElementById("taskList")) {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task, i) => {
      const li = document.createElement("li");
      li.textContent = task;
      li.onclick = () => removeTask(i);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const task = taskInput.value.trim();
    if (task) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskInput.value = "";
      loadTasks();
    }
  }

  function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }

  window.onload = loadTasks;
}

// === Product Filter & Sort Logic ===
if (document.getElementById("productList")) {
  const products = [
    { name: "Phone", category: "electronics", price: 599 },
    { name: "Laptop", category: "electronics", price: 999 },
    { name: "T-Shirt", category: "clothing", price: 25 },
    { name: "Jeans", category: "clothing", price: 45 }
  ];

  const categoryFilter = document.getElementById("categoryFilter");
  const sortPrice = document.getElementById("sortPrice");
  const productList = document.getElementById("productList");

  function renderProducts() {
    let filtered = products.filter(p =>
      categoryFilter.value === "all" ? true : p.category === categoryFilter.value
    );

    filtered.sort((a, b) =>
      sortPrice.value === "asc" ? a.price - b.price : b.price - a.price
    );

    productList.innerHTML = filtered.map(p => `
      <div class="product-card">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${p.price}</p>
      </div>
    `).join('');
  }

  categoryFilter.onchange = renderProducts;
  sortPrice.onchange = renderProducts;
  window.onload = renderProducts;
}
