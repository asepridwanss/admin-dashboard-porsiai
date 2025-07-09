// File: app/api/user/login/route.ts
import { NextResponse } from "next/server";
import db from "../../../../../lib/firebase/init";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email dan password diperlukan" }, { status: 400 });
    }

    // Cari user berdasarkan email
    const userRef = collection(db, "mahasiswa");
    const snapshot = await getDocs(query(userRef, where("email", "==", email)));

    if (snapshot.empty) {
      return NextResponse.json({ message: "Email tidak ditemukan" }, { status: 401 });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Validasi password secara langsung (tanpa hash)
    if (password !== userData.password) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    // Kembalikan data user tanpa password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = userData;
    return NextResponse.json({ ...userWithoutPassword, id: userDoc.id }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
