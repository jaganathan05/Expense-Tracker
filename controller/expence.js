const exp = require("constants");
const Expense = require("../models/expense");
const path = require('path');

exports.getexpense=(req, res, next) => {
  Expense.findAll().then((expenses)=>{
    res.render('index',{
      path:'/expenses',
      expenses:expenses
    })
  })
  
};


exports.addExpense=(req, res, next) => {
  const category = req.body.category;
  const amount = req.body.amount;
  const date = req.body.date;
  
  
  Expense.create({
    amount: amount,
    date: date,
    category: category,
  })
  .then((expenses) => {
    res.render('index',{
      expenses:expenses,
      path:'/expenses'
    })
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error creating expense");
  });
}
exports.getEditExpense=(req,res,next)=>{
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  
  const expenseid = req.params.id;
  //console.log(expenseid);
  Expense.findByPk(expenseid).then((expense)=>{
    res.render('edit-expense',{
      path: '/edit-expense',
      editing: editMode,
      expense:expense 
    })
  }).catch(err=>{console.log(err)})
}

exports.updateExpense = (req, res, next) => {
  const expId = req.body.id;
  const amount = req.body.amount;
  const date = req.body.date;
  const category = req.body.category;
  //console.log(expId)

  Expense.findByPk(expId)
    .then((expense) => {
      if (!expense) {
        // Handle the case where the expense is not found
        return res.status(404).send("Expense not found");
      }

      expense.amount = amount;
      expense.date = date;
      expense.category = category;

      return expense.save();
    })
    .then(() => {
      Expense.findAll().then((expenses)=>{
    res.render('index',{
      path:'/expenses',
      expenses:expenses
    })
  })
      })
  
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error updating expense");
    });
  }



exports.getdeleteExpense=(req, res) => {
  const expId = req.body.id;
  console.log(expId)
  
  Expense.findByPk(expId)
    .then((expense) => {
      
      return expense.destroy();
    })
    .then(() => {
      res.redirect('/expenses');
    })
    .catch((error) => {
      console.error(error);
    })
}

