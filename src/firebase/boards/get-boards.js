import { getDocs, collection, query, where } from "firebase/firestore";
import db from "../config";

const collection_name = "board";

export default async function getBoards(user_id) {
  const doc_ref = collection(db, collection_name);
  const doc_query = query(doc_ref, where("user.id", "==", user_id));

  const snapshot = await getDocs(doc_query);

  const res = [];
  snapshot.docs.map((doc) => {
    res.push({ id: doc.id, ...doc.data() });
  });

  return res;
}
