import React, { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense,updateExpense, expenseToEdit }) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  // Use the useEffect hook here, to check if an expense is to be updated
  // If yes, the autofill the form values with the text and amount of the expense

  useEffect(()=>{
    if(expenseToEdit){
      expenseTextInput.current.value = expenseToEdit.text;
      expenseAmountInput.current.value = expenseToEdit.amount;
      expenseTextInput.current.focus();
    }
  },[expenseToEdit]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    if (parseInt(expenseAmount) === 0) {
      return;
    }
    if(expenseToEdit){
      updateExpense(expenseToEdit.id,{text:expenseText,amount:expenseAmount});
    }else{

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: new Date().getTime()
    };
    addExpense(expense);
  }
    clearInput();

    // Logic to update expense here
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      {/* Change text to Edit Transaction if an expense is to be updated */}
      <h3>{expenseToEdit?"Edit Transaction":"Add New Transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {/* Change text to Edit Transaction if an expense is to be updated */}
        {expenseToEdit?"Edit Transaction":"Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;
