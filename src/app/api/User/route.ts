import { NextResponse } from "next/server";
import db from "../../../../lib/firebase/init"; // Pastikan kamu punya file init firebase
import { collection, getDocs, addDoc } from "firebase/firestore";

export async function GET() {
  const querySnapshot = await getDocs(collection(db, "mahasiswa"));
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const docRef = await addDoc(collection(db, "mahasiswa"), body);
  return NextResponse.json({ message: "Data ditambahkan", id: docRef.id });
}
