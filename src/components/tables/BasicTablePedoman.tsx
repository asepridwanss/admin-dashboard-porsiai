"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { getAllPedoman } from "@/lib/requestAPI";

export default function DataPedomanTable() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pedoman, setPedoman] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  const loadFromSession = () => {
    try {
      const stored = sessionStorage.getItem("pedoman");
      if (stored) return JSON.parse(stored);
    } catch (err) {
      console.error("Gagal parsing session pedoman:", err);
    }
    return null;
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveToSession = (data: any[]) => {
    sessionStorage.setItem("pedoman", JSON.stringify(data));
  };

  const fetchData = async () => {
    try {
      const data = await getAllPedoman();
      setPedoman(data);
      saveToSession(data);
    } catch (error) {
      console.error("Gagal mengambil data pedoman:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Yakin ingin menghapus data ini?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/pedoman?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        const updated = pedoman.filter((item) => item.id !== id);
        setPedoman(updated);
        saveToSession(updated);
        alert("Data berhasil dihapus.");
      } else {
        alert("Gagal menghapus data.");
      }
    } catch (error) {
      console.error("Error saat menghapus:", error);
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  useEffect(() => {
    const cached = loadFromSession();
    if (cached) {
      setPedoman(cached);
      setLoading(false);
      fetchData(); // tetap ambil terbaru
    } else {
      fetchData();
    }
  }, []);

  const truncate = (text: string, maxLength = 80) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const toggleExpand = (index: number) => {
    setExpandedRowIndex(index === expandedRowIndex ? null : index);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Pedoman Penyusunan</h2>
        <Link href="/pedoman/form" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
          Tambah
        </Link>
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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : pedoman.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data pedoman.
                </td>
              </tr>
            ) : (
              pedoman.map((data, index) => (
                <React.Fragment key={data.id}>
                  <tr
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{data.poinBab}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{truncate(data.contoh)}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{truncate(data.konteks)}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/pedoman/form/${data.id}`}>
                          <button className="p-1.5 bg-yellow-100 dark:bg-yellow-200 rounded hover:bg-yellow-200 dark:hover:bg-yellow-300">
                            <Pencil size={16} className="text-yellow-600" />
                          </button>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(data.id);
                          }}
                          className="p-1.5 bg-red-100 dark:bg-red-200 rounded hover:bg-red-200 dark:hover:bg-red-300"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedRowIndex === index && (
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan={5} className="px-6 py-4 text-gray-700 dark:text-gray-200">
                        <p><strong>Contoh:</strong> {data.contoh}</p>
                        <p className="mt-2"><strong>Konteks:</strong> {data.konteks}</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
