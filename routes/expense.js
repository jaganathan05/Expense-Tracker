const express = require('express');
const router = express.Router();
const expenseController = require("../controller/expence");

router.get("/expenses", expenseController.getexpense);


router.post("/expenses", expenseController.addExpense);

router.get("/edit-expense/:id", expenseController.getEditExpense);
router.post("/updatedexpenses", expenseController.updateExpense);

router.post("/delete-expense", expenseController.getdeleteExpense);

module.exports = router;
