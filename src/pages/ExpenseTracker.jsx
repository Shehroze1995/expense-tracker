import { useState } from "react";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { FaUserAlt } from "react-icons/fa";
import { formattedAmount } from "../components/formattedAmount";
import { auth } from "../config/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const navigate = useNavigate();

  const { transactions, transactionsTotal, deleteTransaction } =
    useGetTransactions();

  const { userName, userImg } = useGetUserInfo();

  const { addTransaction } = useAddTransaction();

  if (!auth.currentUser) {
    return <Navigate to={`/`} />;
  }

  const { totalBalance, totalExpense, totalIncome } = transactionsTotal;

  const emptyTransactions = (
    <p className="my-4 text-gray-400 text-xl">
      Transactions list is empty <br />
      Add transaction above
    </p>
  );

  const handleTransaction = (e) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
    setDescription("");
    setTransactionAmount("");
    setTransactionType("expense");
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="w-11/12 m-auto max-w-7xl">
        <section className="flex flex-wrap justify-between my-4 gap-y-4">
          <div>
            <h1 className="text-4xl">Welcome {userName}</h1>
            <div className="border-2 border-blue-500 w-3/4 m-auto"></div>
          </div>
          <div className="flex flex-col items-center gap-2 ml-auto">
            {userImg ? (
              <img
                className="w-20 h-20 object-contain rounded-full"
                src={userImg}
                alt={userName}
              />
            ) : (
              <FaUserAlt className="text-5xl" />
            )}

            <button
              onClick={handleSignout}
              className="bg-blue-500 py-1 px-4 text-xl rounded-2xl"
              type="button"
            >
              Sign out
            </button>
          </div>
        </section>
        <section className="text-2xl font-extrabold">
          <article className="flex gap-2">
            <p className="text-blue-500">Your Balance:</p>
            {totalBalance < 0 ? (
              <p>-${formattedAmount(totalBalance * -1)}</p>
            ) : (
              <p>${formattedAmount(totalBalance)}</p>
            )}
          </article>
          <article className="flex gap-2">
            <p className="text-green-500">Your Income:</p>
            <p>${formattedAmount(totalIncome)}</p>
          </article>
          <article className="flex gap-2">
            <p className="text-red-500">Your Expenses:</p>
            <p>${formattedAmount(totalExpense)}</p>
          </article>
        </section>
        <form onSubmit={handleTransaction} className="mt-12 mb-8 text-xl">
          <div className="flex gap-4 flex-wrap text-black">
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full max-w-xs py-1 px-4 rounded-2xl outline-none"
              placeholder="description.."
              type="text"
              required
            />
            <input
              onChange={(e) => setTransactionAmount(e.target.value)}
              value={transactionAmount}
              className="w-full max-w-xs py-1 px-4 rounded-2xl outline-none"
              placeholder="amount.."
              min={1}
              max={999999999999999}
              type="number"
              required
            />
          </div>
          <div className="flex gap-4 my-3">
            <p>Type:</p>
            <section className="flex gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <input
                  onChange={(e) => setTransactionType(e.target.value)}
                  checked={transactionType === "expense"}
                  className="w-5 h-5 -mt-[1px]"
                  type="radio"
                  name="expense"
                  value={`expense`}
                  id="expense"
                />
                <label htmlFor="expense">Expense</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  onChange={(e) => setTransactionType(e.target.value)}
                  checked={transactionType === "income"}
                  value={`income`}
                  className="w-5 h-5 -mt-[1px]"
                  type="radio"
                  name="income"
                  id="income"
                />
                <label htmlFor="income">Income</label>
              </div>
            </section>
          </div>
          <button
            className="border py-1 px-4 bg-black rounded-md transition-all duration-300 hover:bg-white hover:text-black"
            type="submit"
          >
            Add Transaction
          </button>
        </form>
        <section className="text-xl">
          <h2 className="text-2xl underline">Transactions</h2>
          <div>
            {transactions.length == 0
              ? emptyTransactions
              : transactions.map((transaction, index) => {
                  const {
                    description,
                    transactionID,
                    transactionAmount,
                    transactionType,
                  } = transaction;
                  return (
                    <article className="my-6 capitalize" key={transactionID}>
                      <p>
                        {index + 1} - {description}
                      </p>
                      <p>
                        ${formattedAmount(transactionAmount)} -{" "}
                        <span
                          className={`${
                            transactionType === "expense"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {transactionType}
                        </span>
                      </p>
                      <button
                        onClick={() => deleteTransaction(transactionID)}
                        className="text-blue-400 underline "
                        type="button"
                      >
                        Remove
                      </button>
                    </article>
                  );
                })}
          </div>
        </section>
      </main>
    </>
  );
};

export default ExpenseTracker;
