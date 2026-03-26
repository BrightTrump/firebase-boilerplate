import { MessageData } from "@/@types/home/home.types";
import { db } from "@/app/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

interface HomeDataProps {
  data: MessageData;
}

export const ddDataToFirestore = async ({
  data,
}: HomeDataProps): Promise<boolean> => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      data,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (err) {
    console.error("Error adding document: ", err);
    return false;
  }
};
