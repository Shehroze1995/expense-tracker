/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const TransactionsDetails = ({ transactions, UsDollar, deleteTransaction }) => {
  const subHeading = ["description", "amount", "type", "delete"];

  const emptyTransactions = (
    <p className="my-4 text-gray-400 text-xl">
      Transactions list is empty <br />
      Add transaction above
    </p>
  );

  return (
    <main className="my-8">
      <h3 className="text-center text-3xl bg-[#1c2c4f] py-3">Details</h3>
      <div className="flex py-3 text-2xl text-center bg-gray-900 max-[435px]:text-base max-[360px]:text-sm">
        {subHeading.map((heading) => {
          return (
            <p className="capitalize flex-1" key={heading}>
              {heading}
            </p>
          );
        })}
      </div>
      <div className="text-center">
        {transactions.length == 0
          ? emptyTransactions
          : transactions.map((transaction) => {
              const {
                description,
                transactionID,
                transactionAmount,
                transactionType,
              } = transaction;
              return (
                <article
                  className="grid grid-cols-4 capitalize my-4 text-xl border-b border-b-gray-700 pb-3 text-blue-400 max-[435px]:text-base max-[360px]:text-sm"
                  key={transactionID}
                >
                  <p className="flex-1">{description}</p>
                  <p className="flex-1 break-words">
                    {UsDollar.format(transactionAmount)}
                  </p>
                  <p
                    className={`flex-1 ${
                      transactionType == "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transactionType}
                  </p>
                  <div className="flex items-center justify-center">
                    <MdDelete
                      onClick={() => {
                        deleteTransaction(transactionID);
                        toast("Transaction deleted");
                      }}
                      className=" text-red-600 text-3xl cursor-pointer"
                    />
                  </div>
                </article>
              );
            })}
      </div>
    </main>
  );
};

export default TransactionsDetails;
