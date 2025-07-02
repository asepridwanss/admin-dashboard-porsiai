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
    poinBab: "",
    contoh: "",
    konteks: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Ambil data jika edit
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/pedoman?id=${id}`);
        const data = await res.json();
        console.log(data);
        setFormData({
          poinBab: data.poinBab || "",
          contoh: data.contoh || "",
          konteks: data.konteks || "",
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

  const handleTextAreaChange = (name: "contoh" | "konteks", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const endpoint = "/api/pedoman";

    const res = await fetch(endpoint, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, id : id || undefined }),
    });

    if (res.ok) {
      alert("Berhasil disimpan");
      router.push("/pedoman");
    } else {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <ComponentCard title={id ? "Edit Pedoman Struktur" : "Input Pedoman Struktur"}>
      <div className="space-y-6">
        <div>
          <Label>Poin Bab</Label>
          <Input
            name="poinBab"
            type="text"
            defaultValue={formData.poinBab}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Contoh</Label>
          <TextArea
            value={formData.contoh}
            onChange={(val) => handleTextAreaChange("contoh", val)}
            rows={6}
          />
        </div>
        <div>
          <Label>Konteks</Label>
          <TextArea
            value={formData.konteks}
            onChange={(val) => handleTextAreaChange("konteks", val)}
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
