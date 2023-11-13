import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

const transactionCollectionRef = collection(db, "transactions");

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotal, setTransactionsTotal] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });

  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    if (!auth.currentUser) {
      return null;
    }

    let unsubscribe;

    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalBalance = 0;
        let totalExpense = 0;
        let totalIncome = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const transactionID = doc.id;

          docs.push({ ...data, transactionID });

          if (data.transactionType === "expense") {
            totalExpense += Number(data.transactionAmount);
          }
          if (data.transactionType === "income") {
            totalIncome += Number(data.transactionAmount);
          }
        });

        totalBalance = totalIncome - totalExpense;

        setTransactionsTotal({ totalBalance, totalIncome, totalExpense });

        setTransactions(docs);
      });
    } catch (error) {
      console.log(error);
    }

    return () => unsubscribe();
  };

  const deleteTransaction = async (transactionID) => {
    try {
      const transactionDoc = doc(db, "transactions", transactionID);
      await deleteDoc(transactionDoc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionsTotal, deleteTransaction };
};
