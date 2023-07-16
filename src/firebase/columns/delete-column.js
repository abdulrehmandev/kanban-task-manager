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
  await deleteDoc(col_ref)
    .then(() => {
      console.log("Column Deleted Succesfully!");

      deleteTasks();

      console.log("Tasks Deleted Succesfully!");
    })
    .catch((error) => {
      console.error("Error removing column: ", error);
    });

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
}
