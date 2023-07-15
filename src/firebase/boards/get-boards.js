import { getDocs, collection } from "firebase/firestore";
import db from "../config";

const collection_name = "board";

export default async function getBoards() {
  const doc_ref = collection(db, collection_name);

  const snapshot = await getDocs(doc_ref);

  const res = [];
  snapshot.docs.map((doc) => {
    res.push({ id: doc.id, ...doc.data() });
  });

  return res;
}
