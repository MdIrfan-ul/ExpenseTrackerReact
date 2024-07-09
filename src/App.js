import { useState, useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        expenses: [payload.expense, ...state.expenses]
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id)
      };
    }
    //add logic for updating the expense here
    case "UPDATE_EXPENSE":{
      return{
        expenses:state.expenses.map(expense=>expense.id===payload.id?{...expense,...payload.newExpense}:expense)
      }
    }
    
    default:
      return state;
  }
};
// Use proper state management for populating the form in the expenseForm component on clicking the edit icon in the Transaction component
function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [expenseToEdit,setExpenseToEdit] = useState(null);

  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
   
  };
  // Add dispatch function for updation
  const updateExpense = (id,newExpense)=>{
    dispatch({type:"UPDATE_EXPENSE",payload:{id,newExpense}});
    setExpenseToEdit(null);
  }
  const editExpense =(expense)=>{
    setExpenseToEdit(expense);
  }
  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm 
        addExpense={addExpense} 
        updateExpense={updateExpense}
        expenseToEdit={expenseToEdit}
        // Pass the props for populating the form with expense text and amount
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
            // Pass props to update a transacation
          />
        </div>
      </div>
    </>
  );
}

export default App;
