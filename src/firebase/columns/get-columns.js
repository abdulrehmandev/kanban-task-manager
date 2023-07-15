import { getDocs, collection, query, where } from "firebase/firestore";
import db from "../config";

const collection_name = "column";

export default async function getColumns(board_id) {
  const doc_ref = collection(db, collection_name);
  const doc_query = query(doc_ref, where("board.id", "==", board_id));

  const snapshot = await getDocs(doc_query);

  const res = [];
  snapshot.docs.map((doc) => {
    res.push({ id: doc.id, ...doc.data() });
  });
  return res;
}
