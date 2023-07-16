import { collection, addDoc } from "firebase/firestore";
import db from "../config";

const collection_name = "column";

export default async function createColumn(data) {
  const doc_ref = collection(db, collection_name);

  return await addDoc(doc_ref, data)
    .then((data) => {
      console.log("Added Successfully!");
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}
