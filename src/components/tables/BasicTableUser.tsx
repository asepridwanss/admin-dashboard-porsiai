"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { getAllMahasiswa } from "../../../lib//firebase//service"; // Pastikan path-nya sesuai

export default function DataMahasiswaTable() {
  const [mahasiswa, setMahasiswa] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllMahasiswa();
        setMahasiswa(data);
      } catch (error) {
        console.error("Gagal mengambil data mahasiswa:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Data Mahasiswa</h2>
        <Link href="/user/form" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
          Tambah
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">No.</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">NIM</th>
              <th className="px-6 py-3">No. Telepon</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Judul Skripsi</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : mahasiswa.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data mahasiswa.
                </td>
              </tr>
            ) : (
              mahasiswa.map((data, index) => (
                <tr
                  key={data.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{data.nama}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{data.nim}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{data.telepon}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{data.email}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{data.skripsi}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="p-1.5 bg-yellow-100 dark:bg-yellow-200 rounded hover:bg-yellow-200 dark:hover:bg-yellow-300">
                        <Pencil size={16} className="text-yellow-600" />
                      </button>
                      <button className="p-1.5 bg-red-100 dark:bg-red-200 rounded hover:bg-red-200 dark:hover:bg-red-300">
                        <Trash size={16} className="text-red-600" />
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
