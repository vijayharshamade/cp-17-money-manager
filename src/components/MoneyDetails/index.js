import "./index.css";

const MoneyDetails = (props) => {
  const { balanceAmount, incomeAmount, expenseAmount } = props;
  //console.log(props);
  return (
    <div className="money-details-container">
      <div className="container balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="money-details-image"
        />
        <div className="type-money-container">
          <p className="type">Your Balance</p>
          <p className="money" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="container income-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="money-details-image"
        />
        <div className="type-money-container">
          <p className="type">Your Income</p>
          <p className="money" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="container expense-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="money-details-image"
        />
        <div className="type-money-container">
          <p className="type">Your Expenses</p>
          <p className="money" data-testid="expensesAmount">
            Rs {expenseAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoneyDetails;
