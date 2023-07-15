import { getDocs, collection, query, where } from "firebase/firestore";
import db from "../config";

const collection_name = "task";

export default async function getTasks(column_id) {
  const doc_ref = collection(db, collection_name);
  const doc_query = query(doc_ref, where("column.id", "==", column_id));

  const snapshot = await getDocs(doc_query);

  const res = [];
  snapshot.docs.map((doc) => {
    res.push({ id: doc.id, ...doc.data() });
  });

  return res;
}
