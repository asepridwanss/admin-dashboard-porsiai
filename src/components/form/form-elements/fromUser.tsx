"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import { useRouter } from "next/navigation";

type Props = {
  id?: string | string[];
};

export default function DefaultInputs({ id }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    password: "",
    telepon: "",
    email: "",
    judulSkripsi: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Ambil data jika edit
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user?id=${id}`);
        const data = await res.json();
        setFormData({
          nama: data.nama || "",
          nim: data.nim || "",
          password: data.password || "",
          telepon: data.telepon || "",
          email: data.email || "",
          judulSkripsi: data.judulSkripsi || "",
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTextAreaChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      judulSkripsi: val,
    }));
  };

  const handleSubmit = async () => {
    const endpoint = "/api/user";
    const method = id ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, id: id || undefined }),
    });

    if (res.ok) {
      alert("Berhasil disimpan");

      // ✅ Tandai bahwa data baru ditambahkan
      if (!id) sessionStorage.setItem("newPost", "true");

      router.push("/user");
    } else {
      alert("Gagal menyimpan data");
    }
  };


  return (
    <ComponentCard title={id ? "Edit Data Mahasiswa" : "Input Data Mahasiswa"}>
      <div className="space-y-6">
        <div>
          <Label>Nama</Label>
          <Input
            name="nama"
            type="text"
            defaultValue={formData.nama}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>NIM</Label>
          <Input
            name="nim"
            type="text"
            defaultValue={formData.nim}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            defaultValue={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>No. Telepon</Label>
          <Input
            name="telepon"
            type="text"
            defaultValue={formData.telepon}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            name="email"
            type="text"
            defaultValue={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Judul Skripsi</Label>
          <TextArea
            value={formData.judulSkripsi}
            onChange={handleTextAreaChange}
            rows={6}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Memuat..." : "Simpan"}
          </button>
        </div>
      </div>
    </ComponentCard>
  );
}
