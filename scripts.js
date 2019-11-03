//object to hold grocery list and its primary functions
var groceryList = {
  groceries: [],
  displayGroceries: function() {
    if (this.groceries.length === 0) {
      console.log("Your grocery list is empty! Go ahead and add something.");
    } else {
      for (var i = 0; i < this.groceries.length; i++) {
        if (this.groceries[i].completed === true) {
          console.log("(x)", this.groceries[i].groceryText);
        } else {
          console.log("()", this.groceries[i].groceryText);
        }
      }
    }
  },
  addGrocery: function(groceryText) {
    this.groceries.push({
      groceryText: groceryText,
      completed: false
    });
    this.displayGroceries();
  },
  changeGroceries: function(position, groceryTexts) {
    this.groceries[position].groceryText = groceryTexts;
    this.displayGroceries();
  },
  deleteGrocery: function(position) {
    this.groceries.splice(position, 1);
    this.displayGroceries();
  },
  toggleCompleted: function(position) {
    var grocery = this.groceries[position];
    grocery.completed = !grocery.completed;
    this.displayGroceries();
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
    this.displayGroceries();
  }
};

//Event handlers for buttons
var handlers = {
  displayGroceries: function() {
    groceryList.displayGroceries();
  },
  addItem: function() {
    var addInput = document.getElementById("addItem");
    groceryList.addGrocery(addInput.value);

    //clears input after button submit
    addInput.value = "";
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
  },
  deleteItem: function() {
    var deleteInput = document.getElementById("deleteItem");
    groceryList.deleteGrocery(deleteInput.valueAsNumber);
    deleteInput.value = "";
  },
  toggleCompleted: function() {
    var toggleNumber = document.getElementById("toggleCompleted");
    groceryList.toggleCompleted(toggleNumber.valueAsNumber);
    toggleNumber.value = "";
  },
  toggleAll: function() {
    groceryList.toggleAll();
  }
};
