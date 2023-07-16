import { doc, deleteDoc } from "firebase/firestore";
import db from "../config";

const collection_name = "board";

export default async function deleteBoard(boardId) {
  const doc_ref = doc(db, collection_name, boardId);
  console.log(boardId);

  return await deleteDoc(doc_ref)
    .then(() => {
      console.log("Board Deleted Succesfully!");
      return true;
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
      return false;
    });
}
