import { collection, addDoc } from "firebase/firestore";
import db from "../config";

const collection_name = "board";

export default async function createBoard(data) {
  const doc_ref = collection(db, collection_name);

  await addDoc(doc_ref, data)
    .then((data) => {
      console.log("Added Successfully!");
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}
