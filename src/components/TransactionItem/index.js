import "./index.css";

const transactionItem = (props) => {
  const { transactionDetails, deleteTransaction } = props;
  const { id, title, amount, type } = transactionDetails;
  //console.log(transactionDetails);

  const firstCharacter = title.slice(0, 1).toUpperCase();

  const onDeleteTransaction = () => {
    deleteTransaction(id);
  };

  return (
    <>
      <li className="table-row">
        <p className="table-row-cell">{firstCharacter + title.slice(1)}</p>
        <p className="table-row-cell">{amount}</p>
        <p className="table-row-cell">{type}</p>
        <div className="delete-container">
          <button
            className="delete-button"
            type="button"
            onClick={onDeleteTransaction}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
              alt="delete"
              className="delete-img"
            />
          </button>
        </div>
      </li>
    </>
  );
};

export default transactionItem;
