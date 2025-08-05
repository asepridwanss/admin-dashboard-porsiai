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
  query,
  where,
  orderBy,
} from "firebase/firestore";

// ✅ GET: Ambil semua data atau satu data jika ada query id
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const ref = doc(db, "mahasiswa", id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ id: snapshot.id, ...snapshot.data() });
  } else {
    // ✅ Ambil semua data dan urutkan berdasarkan NIM
    const mahasiswaRef = collection(db, "mahasiswa");
    const q = query(mahasiswaRef, orderBy("nim", "asc")); // Gunakan "desc" untuk urutan terbalik
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data);
  }
}

// ✅ POST: Tambah data baru, cegah NIM & Email duplikat
export async function POST(req: Request) {
  const body = await req.json();
  const { nim, email } = body;

  if (!nim || !email) {
    return NextResponse.json({ error: "NIM dan Email wajib disediakan" }, { status: 400 });
  }

  const mahasiswaRef = collection(db, "mahasiswa");

  // Cek duplikasi NIM
  const nimQuery = query(mahasiswaRef, where("nim", "==", nim));
  const nimSnapshot = await getDocs(nimQuery);
  if (!nimSnapshot.empty) {
    return NextResponse.json({ error: "NIM sudah digunakan" }, { status: 409 });
  }

  // Cek duplikasi Email
  const emailQuery = query(mahasiswaRef, where("email", "==", email));
  const emailSnapshot = await getDocs(emailQuery);
  if (!emailSnapshot.empty) {
    return NextResponse.json({ error: "Email sudah digunakan" }, { status: 410 });
  }

  const docRef = await addDoc(mahasiswaRef, body);
  return NextResponse.json({ message: "Data ditambahkan", id: docRef.id });
}

// ✅ PUT: Update data, cegah duplikasi NIM & Email kecuali milik sendiri
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, nim, email, ...data } = body;

  if (!id || !nim || !email) {
    return NextResponse.json({ error: "ID, NIM dan Email wajib disediakan" }, { status: 400 });
  }

  const mahasiswaRef = collection(db, "mahasiswa");

  // Cek duplikasi NIM (kecuali milik sendiri)
  const nimQuery = query(mahasiswaRef, where("nim", "==", nim));
  const nimSnapshot = await getDocs(nimQuery);
  const nimDuplicate = nimSnapshot.docs.find((doc) => doc.id !== id);
  if (nimDuplicate) {
    return NextResponse.json({ error: "NIM sudah digunakan oleh user lain" }, { status: 409 });
  }

  // Cek duplikasi Email (kecuali milik sendiri)
  const emailQuery = query(mahasiswaRef, where("email", "==", email));
  const emailSnapshot = await getDocs(emailQuery);
  const emailDuplicate = emailSnapshot.docs.find((doc) => doc.id !== id);
  if (emailDuplicate) {
    return NextResponse.json({ error: "Email sudah digunakan oleh user lain" }, { status: 410 });
  }

  const ref = doc(db, "mahasiswa", id);
  await updateDoc(ref, { nim, email, ...data });

  return NextResponse.json({ message: "Data berhasil diperbarui" });
}

// ✅ DELETE: Hapus data berdasarkan id
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID wajib disediakan" }, { status: 400 });
  }

  const ref = doc(db, "mahasiswa", id);
  await deleteDoc(ref);

  return NextResponse.json({ message: "Data berhasil dihapus" });
}
