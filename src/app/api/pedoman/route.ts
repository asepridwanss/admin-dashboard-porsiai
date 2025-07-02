import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/firebase/init";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// ✅ GET: Ambil semua data atau satu data jika ada query id
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const ref = doc(db, "pedoman", id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ id: snapshot.id, ...snapshot.data() });
  } else {
    const querySnapshot = await getDocs(collection(db, "pedoman"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(data);
  }
}

// ✅ POST: Tambah data baru
export async function POST(req: Request) {
  const body = await req.json();
  const docRef = await addDoc(collection(db, "pedoman"), body);
  return NextResponse.json({ message: "Data ditambahkan", id: docRef.id });
}

// ✅ PUT: Update data berdasarkan id
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "ID wajib disediakan" }, { status: 400 });
  }

  const ref = doc(db, "pedoman", id);
  await updateDoc(ref, data);

  return NextResponse.json({ message: "Data berhasil diperbarui" });
}

// ✅ DELETE: Hapus data berdasarkan id
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID wajib disediakan" }, { status: 400 });
  }

  const ref = doc(db, "pedoman", id);
  await deleteDoc(ref);

  return NextResponse.json({ message: "Data berhasil dihapus" });
}

