import { useState } from "react";
import "./index.css";
import MoneyDetails from "../MoneyDetails";
import TransactionItem from "../TransactionItem";
import { v4 as uuidv4 } from "uuid";
//import debounce from "lodash.debounce";

const transactionTypeOptions = [
  {
    optionId: "INCOME",
    displayText: "Income",
  },
  {
    optionId: "EXPENSES",
    displayText: "Expenses",
  },
];

const MoneyManager = () => {
  const [transactionList, setTransactionList] = useState(
    JSON.parse(localStorage.getItem("transactionList")) || []
  );
  const [optionId, setOptionId] = useState(transactionTypeOptions[0].optionId);
  const [titleInput, setTitleInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  const getIncome = () => {
    let incomeAmount = 0;
    transactionList.forEach((eachTransaction) => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount;
      }
    });
    //console.log(incomeAmount);
    return incomeAmount;
  };
  //getIncome();

  const getExpenses = () => {
    let expenseAmount = 0;
    transactionList.forEach((eachTransaction) => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTransaction.amount;
      }
    });
    //console.log(expenseAmount);
    return expenseAmount;
  };
  //getExpenses()
  const balanceAmount = getIncome() - getExpenses();
  const incomeAmount = getIncome();
  const expenseAmount = getExpenses();

  const onAddTranscation = (event) => {
    event.preventDefault();
    const typeOption = transactionTypeOptions.find(
      (eachType) => eachType.optionId === optionId
    );
    //console.log(typeOption);

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: typeOption.displayText,
    };

    setTransactionList((prevTransaction) => [
      ...prevTransaction,
      newTransaction,
    ]);
    setTitleInput("");
    setAmountInput("");
    setOptionId(transactionTypeOptions[0].optionId);
  };
  localStorage.setItem("transactionList", JSON.stringify(transactionList));

  const deleteTransaction = (id) => {
    //console.log(id);
    const updatedTransactionList = transactionList.filter(
      (eachTransaction) => eachTransaction.id !== id
    );
    //console.log(updatedTransactionList );
    setTransactionList(updatedTransactionList);
    localStorage.setItem(
      "transactionList",
      JSON.stringify(updatedTransactionList)
    );
  };

  // if (transactionList.length !== 0) {
  //   localStorage.setItem("transactionList", JSON.stringify(transactionList));
  // }
  //localStorage.setItem("transactionList", JSON.stringify(transactionList));
  // const storedListOfObjects = JSON.parse(
  //   localStorage.getItem("transactionList")
  // );
  //console.log(storedListOfObjects);

  // const displayList = storedListOfObjects === null ? [] : storedListOfObjects;

  // const debouncedSetTitleInput = debounce((newValue) => {
  //   setTitleInput(newValue);
  // }, 500);

  const onChangeTitleInput = (event) => {
    setTitleInput(event.target.value);
  };

  const onChangeAmountInput = (event) => {
    setAmountInput(event.target.value);
  };

  const onChangeOptionId = (event) => {
    //console.log(event);
    setOptionId(event.target.value);
  };

  return (
    <>
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading">Hi, Vijay</h1>
            <p className="header-content">
              Welcome back to your &nbsp;
              <span className="money-manager-text">Money Manager</span>
            </p>
          </div>
          <div className="money-details">
            <MoneyDetails
              balanceAmount={balanceAmount}
              incomeAmount={incomeAmount}
              expenseAmount={expenseAmount}
            />
          </div>
          <div className="transaction-details">
            <form className="transaction-form" onSubmit={onAddTranscation}>
              <h1 className="transaction-header">Add Transcations</h1>
              <label className="input-label" htmlFor="title">
                TITLE
              </label>
              <input
                value={titleInput}
                className="input"
                type="text"
                id="title"
                placeholder="TITLE"
                onChange={onChangeTitleInput}
              />
              <label className="input-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={onChangeAmountInput}
              />

              <label className="input-label" htmlFor="type">
                TYPE
              </label>
              <select
                id="type"
                className="input type"
                value={optionId}
                onChange={onChangeOptionId}
              >
                {transactionTypeOptions.map((eachOption) => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="history-transcation">
              <h1 className="transaction-header">History</h1>
              <ul className="transactions-table">
                <li className="table-header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                </li>
                {transactionList.map((eachTransactionItem) => (
                  <TransactionItem
                    transactionDetails={eachTransactionItem}
                    key={eachTransactionItem.id}
                    deleteTransaction={deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default MoneyManager;
