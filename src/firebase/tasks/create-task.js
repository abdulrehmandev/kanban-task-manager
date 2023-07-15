import { collection, addDoc } from "firebase/firestore";
import db from "../config";

const collection_name = "task";

export default async function createTask(data) {
  const doc_ref = collection(db, collection_name);

  await addDoc(doc_ref, data)
    .then((data) => {
      console.log("Added Successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
}
