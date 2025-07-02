"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { getAllMahasiswa } from "@/lib/requestAPI";

export default function DataMahasiswaTable() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mahasiswa, setMahasiswa] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFromSession = () => {
    try {
      const stored = sessionStorage.getItem("mahasiswa");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error("Gagal parsing session mahasiswa:", err);
    }
    return null;
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveToSession = (data: any[]) => {
    sessionStorage.setItem("mahasiswa", JSON.stringify(data));
  };

  const fetchData = async () => {
    try {
      const data = await getAllMahasiswa();
      setMahasiswa(data);
      saveToSession(data);
    } catch (error) {
      console.error("Gagal mengambil data mahasiswa:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Yakin ingin menghapus data ini?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/user?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updated = mahasiswa.filter((item) => item.id !== id);
        setMahasiswa(updated);
        saveToSession(updated);
        alert("Data berhasil dihapus.");
      } else {
        alert("Gagal menghapus data.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus:", error);
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  useEffect(() => {
    const cached = loadFromSession();
    if (cached) {
      setMahasiswa(cached);
      setLoading(false);
      fetchData(); // Sync in background
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Data Mahasiswa</h2>
        <Link
          href="/user/form"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          Tambah
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-fixed text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 w-[40px]">No.</th>
              <th className="px-4 py-3 w-[140px]">Nama</th>
              <th className="px-4 py-3 w-[100px]">NIM</th>
              <th className="px-4 py-3 w-[110px]">Password</th>
              <th className="px-4 py-3 w-[130px]">No. Telepon</th>
              <th className="px-4 py-3 w-[160px]">Email</th>
              <th className="px-4 py-3 w-[250px]">Judul Skripsi</th>
              <th className="px-4 py-3 w-[100px] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : mahasiswa.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data mahasiswa.
                </td>
              </tr>
            ) : (
              mahasiswa.map((data, index) => (
                <tr
                  key={data.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">{index + 1}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">{data.nama}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">{data.nim}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">{data.password}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">{data.telepon}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">{data.email}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100 whitespace-normal break-words">
                    {data.judulSkripsi}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link href={`/user/form/${data.id}`}>
                        <button className="p-1.5 bg-yellow-100 dark:bg-yellow-200 rounded hover:bg-yellow-200 dark:hover:bg-yellow-300">
                          <Pencil size={16} className="text-yellow-600" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(data.id)}
                        className="p-1.5 bg-red-100 dark:bg-red-200 rounded hover:bg-red-200 dark:hover:bg-red-300"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
