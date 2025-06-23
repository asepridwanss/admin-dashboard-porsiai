import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const pedomanData = [
  {
    poinBab: "Bab 1. Latar Belakang",
    contoh: "Teknologi mempermudah kehidupan manusia",
    konteks: "Digunakan untuk menjelaskan urgensi penelitian",
  },
  {
    poinBab: "Bab 2. Tinjauan Pustaka",
    contoh: "Penelitian sebelumnya menggunakan metode A",
    konteks: "Menunjukkan adanya celah riset",
  },
  {
    poinBab: "Bab 3. Metodologi",
    contoh: "Menggunakan metode Naive Bayes",
    konteks: "Menjelaskan pemilihan metode",
  },
  {
    poinBab: "Bab 4. Hasil & Pembahasan",
    contoh: "Akurasi model sebesar 95%",
    konteks: "Membandingkan hasil dengan target",
  },
  {
    poinBab: "Bab 5. Kesimpulan",
    contoh: "Metode berhasil mengatasi masalah yang diselesaikan dengan pemikiran",
    konteks: "Memberikan ringkasan akhir",
  },
];

export default function DataPedomanTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Pedoman Penyusunan</h2>
        <div className="flex gap-4">

          <Link href="/pedoman/form" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
            Tambah
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">No.</th>
              <th className="px-6 py-3">Poin Bab</th>
              <th className="px-6 py-3">Contoh</th>
              <th className="px-6 py-3">Konteks</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pedomanData.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{index + 1}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{data.poinBab}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{data.contoh}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{data.konteks}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-1.5 bg-yellow-100 dark:bg-yellow-200 rounded hover:bg-yellow-200 dark:hover:bg-yellow-300">
                      <Pencil size={16} className="text-yellow-600" />
                    </button>
                    <button className="p-1.5 bg-red-100 dark:bg-red-200 rounded hover:bg-red-200 dark:hover:bg-red-300">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center p-4 space-x-1">
        <button className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm">1</button>
        {[2, 3, 4].map((n) => (
          <button
            key={n}
            className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
          >
            {n}
          </button>
        ))}
        <span className="px-2 text-gray-400 dark:text-gray-500">...</span>
        <button className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
          40
        </button>
      </div>
    </div>
  );
}
