import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const AddTransaction = ({
  setDescription,
  description,
  handleTransaction,
  setTransactionType,
  transactionType,
  transactionAmount,
  setTransactionAmount,
}) => {

  return (
    <form onSubmit={(e)=>{
        handleTransaction(e)
        toast('Transaction added')
    }} className="border border-gray-600">
      <h3 className="text-center text-3xl bg-[#1c2c4f] py-3">
        Add Transaction
      </h3>
      <div className="w-11/12 max-w-md m-auto text-black text-xl">
        <input
          className="w-full py-2 px-4 my-4 outline-none"
          type="text"
          placeholder="Description.."
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="w-11/12 max-w-md m-auto text-black text-xl">
        <input
          className="w-full py-2 px-4 mb-4 outline-none"
          type="number"
          min={1}
          placeholder="Amount.."
          required
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
      </div>
      <div className="w-11/12 max-w-md m-auto text-xl flex flex-wrap items-center gap-3 mb-4">
        <p>Type:</p>
        <div className="flex items-center leading-none gap-1">
          <input
            className="w-5 h-5"
            type="radio"
            value={"expense"}
            id="expense"
            name="expense"
            checked={transactionType == "expense"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          <label htmlFor="expense">Expense</label>
        </div>
        <div className="flex items-center leading-none gap-1">
          <input
            className="w-5 h-5"
            type="radio"
            value={"income"}
            id="income"
            name="income"
            onChange={(e) => setTransactionType(e.target.value)}
            checked={transactionType == "income"}
          />
          <label htmlFor="income">Income</label>
        </div>
      </div>
      <div className="w-11/12 max-w-md m-auto">
        <button
          className="bg-green-400 py-1 mb-6 text-2xl text-black font-extrabold w-full hover:bg-green-500"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTransaction;
