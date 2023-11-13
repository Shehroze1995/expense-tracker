import { useState } from "react";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { auth } from "../config/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AiFillCaretDown } from "react-icons/ai";
import DropDown from "../components/DropDown";
import AddTransaction from "../components/AddTransaction";
import TransactionsDetails from "../components/TransactionsDetails";
import { FaUserCircle } from "react-icons/fa";

const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const navigate = useNavigate();

  const { transactions, transactionsTotal, deleteTransaction } =
    useGetTransactions();

  const { userName, userImg } = useGetUserInfo();

  const { addTransaction } = useAddTransaction();

  if (!auth.currentUser) {
    return <Navigate to={`/`} />;
  }

  const { totalBalance, totalExpense, totalIncome } = transactionsTotal;

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

  const handleDropDown = (e) => {
    if (e.target.classList.contains("dropDown"))
      setIsAccountOpen(!isAccountOpen);
    else if (e.target.classList.contains("dropDownOpened"))
      setIsAccountOpen(true);
    else setIsAccountOpen(false);
  };

  let UsDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <section onClick={handleDropDown} className="bg-[#1C2C4F] py-3 main">
        <div className="flex items-center justify-between w-11/12 m-auto max-w-7xl font-extrabold">
          <h2 className="text-5xl font-sans">Track.</h2>
          <div className="flex items-center gap-2">
            <p className="text-2xl max-[500px]:hidden">{userName}</p>
            <div className="relative">
              <button
                className="flex items-center gap-1 border border-gray-500 rounded-lg py-1 px-2 transition-all duration-300 hover:bg-blue-900 dropDown"
                title="Account"
                type="button"
              >
                {userImg ? (
                  <img
                    className="w-8 rounded-full dropDown"
                    src={userImg}
                    alt={userName}
                  />
                ) : (
                  <FaUserCircle className="text-3xl dropDown" />
                )}
                <AiFillCaretDown className="dropDown" />
              </button>
              <DropDown
                isAccountOpen={isAccountOpen}
                handleSignout={handleSignout}
              />
            </div>
          </div>
        </div>
      </section>
      <h3 className="text-right text-xl w-11/12 m-auto max-w-7xl mt-2 min-[500px]:hidden">
        Welcome {userName}
      </h3>

      <main
        onClick={() => setIsAccountOpen(false)}
        className="w-11/12 m-auto max-w-7xl py-16"
      >
        <section className="text-2xl font-extrabold grid gridCard gap-4 mb-8">
          <article className=" border border-gray-600 p-4">
            <p className="text-blue-500">Your Balance:</p>
            <p className="break-words">{UsDollar.format(totalBalance)}</p>
          </article>
          <article className=" border border-gray-600 p-4">
            <p className="text-green-500">Your Income:</p>
            <p className="break-words">{UsDollar.format(totalIncome)}</p>
          </article>
          <article className=" border border-gray-600 p-4">
            <p className="text-red-500">Your Expenses:</p>
            <p className="break-words">{UsDollar.format(totalExpense)}</p>
          </article>
        </section>

        <AddTransaction
          setDescription={setDescription}
          description={description}
          handleTransaction={handleTransaction}
          setTransactionType={setTransactionType}
          transactionType={transactionType}
          setTransactionAmount={setTransactionAmount}
          transactionAmount={transactionAmount}
        />

        <TransactionsDetails
          transactions={transactions}
          UsDollar={UsDollar}
          deleteTransaction={deleteTransaction}
        />
      </main>
    </>
  );
};

export default ExpenseTracker;
