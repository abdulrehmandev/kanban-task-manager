import {
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../config";

const collection_name = "column";

export default async function deleteColumn(columnId) {
  const col_ref = doc(db, collection_name, columnId);

  async function deleteTasks() {
    const tasks_query = query(
      collection(db, "task"),
      where("column.id", "==", columnId)
    );

    const snapshot = await getDocs(tasks_query);

    snapshot.docs.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }

  return await deleteDoc(col_ref)
    .then(() => {
      deleteTasks();
      return true;
    })
    .catch((error) => {
      console.error("Error removing column: ", error);
      return false;
    });
}
