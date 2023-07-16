import { doc, deleteDoc } from "firebase/firestore";
import db from "../config";

const collection_name = "task";

export default async function deleteTask(taskId) {
  const doc_ref = doc(db, collection_name, taskId);

  return await deleteDoc(doc_ref)
    .then(() => {
      console.log("Task Deleted Succesfully!");
      return true;
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
      return false;
    });
}
