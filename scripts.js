//object to hold grocery list and its primary functions
var groceryList = {
  groceries: [],
  addGrocery: function(groceryText) {
    this.groceries.push({
      groceryText: groceryText,
      completed: false
    });
  },
  changeGroceries: function(position, groceryTexts) {
    this.groceries[position].groceryText = groceryTexts;
  },
  deleteGrocery: function(position) {
    this.groceries.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var grocery = this.groceries[position];
    grocery.completed = !grocery.completed;
  },
  toggleAll: function() {
    var completedItems = 0;
    var totalItems = this.groceries.length;

    //Get number of completed items.
    for (var i = 0; i < totalItems; i++) {
      if (this.groceries[i].completed === true) {
        completedItems++;
      }
    }

    //Case 1: if everything is true, make everything false.
    if (completedItems === totalItems) {
      for (var i = 0; i < totalItems; i++) {
        this.groceries[i].completed = false;
      }
    } else {
      for (var i = 0; i < totalItems; i++) {
        this.groceries[i].completed = true;
      }
    }
  }
};

//Event handlers for buttons
var handlers = {
  addItem: function() {
    var addInput = document.getElementById("addItem");
    groceryList.addGrocery(addInput.value);

    //clears input after button submit
    addInput.value = "";
    view.displayGroceries();
  },
  changeItem: function() {
    var changeItemPositionInput = document.getElementById(
      "changeItemPositionInput"
    );
    var changeItemTextInput = document.getElementById("changeItemTextInput");

    groceryList.changeGroceries(
      changeItemPositionInput.valueAsNumber,
      changeItemTextInput.value
    );

    //reset input fields after submit
    changeItemPositionInput.value = "";
    changeItemTextInput.value = "";
    view.displayGroceries();
  },
  deleteItem: function(position) {
    groceryList.deleteGrocery(position);
    view.displayGroceries();
  },
  toggleCompleted: function() {
    var toggleNumber = document.getElementById("toggleCompleted");
    groceryList.toggleCompleted(toggleNumber.valueAsNumber);
    toggleNumber.value = "";
    view.displayGroceries();
  },
  toggleAll: function() {
    groceryList.toggleAll();
    view.displayGroceries();
  }
};

//creating an object responsible for what the user sees, rendering the data
var view = {
  displayGroceries: function() {
    var groceryUl = document.querySelector("ul");
    groceryUl.innerHTML = "";

    for (var i = 0; i < groceryList.groceries.length; i++) {
      var groceryLi = document.createElement("li");
      var grocery = groceryList.groceries[i];
      var groceryTextWithCompletion = "";

      if (grocery.completed === true) {
        groceryTextWithCompletion = "(x)" + grocery.groceryText;
      } else {
        groceryTextWithCompletion = "( )" + grocery.groceryText;
      }

      groceryLi.id = i;
      groceryLi.textContent = groceryTextWithCompletion;
      groceryLi.appendChild(this.createDeleteButton());
      groceryUl.appendChild(groceryLi);
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function() {
    var groceryUl = document.querySelector("ul");
    groceryUl.addEventListener("click", function(event) {
      console.log(event.target.parentNode.id);

      //get the element that was clicked on
      var elementClicked = event.target;

      //check if elementclicked is a delete button
      if (elementClicked.className === "deleteButton") {
        //run handlers.deleteItem();
        handlers.deleteItem(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
