// lib/api.ts
export async function getAllMahasiswa() {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("Gagal fetch data");
  return res.json();
}

// lib/api.ts
export async function getAllPedoman() {
  const res = await fetch("/api/pedoman");
  if (!res.ok) throw new Error("Gagal fetch data");
  return res.json();
}

