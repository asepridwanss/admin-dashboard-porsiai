import { collection, addDoc, getDocs } from "firebase/firestore";
import firestorapp from "./init";



const mahasiswaCollection = collection(firestorapp, "mahasiswa");

// Tambah data mahasiswa, otomatis buat collection jika belum ada
export async function tambahMahasiswa(data: Record<string, any>) {
  const docRef = await addDoc(mahasiswaCollection, data);
  return docRef.id;
}

// Ambil semua data mahasiswa dari Firestore
export async function getAllMahasiswa() {
  const querySnapshot = await getDocs(mahasiswaCollection);
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

