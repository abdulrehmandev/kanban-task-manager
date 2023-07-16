import { doc, updateDoc } from "firebase/firestore";
import db from "../config";

const collection_name = "board";

export default async function updateBoard(data, id) {
  const doc_ref = doc(db, collection_name, id);

  await updateDoc(doc_ref, data)
    .then((docRef) => {
      console.log("Board Updated Successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
}
