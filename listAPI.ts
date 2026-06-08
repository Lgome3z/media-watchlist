import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import type {MediaItem} from "./src/App.tsx"; 


export async function fetchItems(userId: string): Promise<MediaItem[]> {
  const snapshot = await getDocs(collection(db, "users", userId, "items"));

  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      category: data.category,
      status: data.status,
    }
  });
}

export async function createTestItem(userId: string) {
  try {
    console.log("Attempting to write dummy item for user: ", userId);

    const docRef = await addDoc(
      collection(db, "users", userId, "items"), {
        title: "Test Item",
        category: "Testing",
        status: "Not Started",
      }
    );
    console.log("Success! Document ID: ", docRef);
  } catch(error) {
    console.error("Firestore write failed: ", error);
  }
}

export async function createDbItem(userId: string, title: string, category: string, status: string): Promise<MediaItem> {
    console.log("hello")
  const doc = await addDoc(collection(db, "users", userId, "items"), {
    title: title,
    category: category,
    status: status,
  });
  return {
    id: doc.id,
    title: title,
    category: category,
    status: status,
  }
}

export async function deleteDbItem(userId: string, itemId: string): Promise<void> {
  await(deleteDoc(doc(db, "users", userId, "items", itemId)));
}