function saveexpense(event) {
    event.preventDefault();

    var catagory = document.getElementById('catagory-select').value;
    var amount = document.getElementById('amount-input').value;
    var date = document.getElementById('date-input').value;

    var expansedetail = { 
        Category: catagory,
        Amount: amount,
        Date: date
    };

    
    var existingExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

    
    existingExpenses.push(expansedetail);

   
    localStorage.setItem('expenses', JSON.stringify(existingExpenses));

    console.log(expansedetail);

    displayExpenses(existingExpenses);
}

function displayExpenses(expenses) {
    var expensesContainer = document.getElementById('expenses-container');
    expensesContainer.innerHTML = ''; 

    expenses.forEach(function(expense, index) {
        var expenseElement = document.createElement('div');
        expenseElement.innerHTML = "<p>Category: " + expense.Category + "</p>" +
                                  "<p>Amount: " + expense.Amount + "</p>" +
                                  "<p>Date: " + expense.Date + "</p>";

        
        var editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.addEventListener('click', function() {
            
            document.getElementById('catagory-select').value = expense.Category;
            document.getElementById('amount-input').value = expense.Amount;
            document.getElementById('date-input').value = expense.Date;

            expenseElement.remove();
        });

   
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function() {
          
            expenseElement.remove();
        
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
        });

        expenseElement.appendChild(editButton);
        expenseElement.appendChild(deleteButton);

        expensesContainer.appendChild(expenseElement);
    });
}


window.onload = function() {
    var existingExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    displayExpenses(existingExpenses);
};
