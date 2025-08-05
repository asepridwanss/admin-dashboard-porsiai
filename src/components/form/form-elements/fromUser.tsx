"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  const [errorNIM, setErrorNIM] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorTelepon, setErrorTelepon] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const isNumeric = (value: string): boolean => /^\d+$/.test(value);

  const handleSubmit = async () => {
    setErrorNIM("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorTelepon("");

    if (!isNumeric(formData.nim)) {
      setErrorNIM("NIM harus berupa angka.");
      return;
    }

    if (!isNumeric(formData.telepon)) {
      setErrorTelepon("Nomor telepon harus berupa angka.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorEmail("Format email tidak valid.");
      return;
    }

    if (!isValidPassword(formData.password)) {
      setErrorPassword(
        "Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol."
      );
      return;
    }

    const endpoint = "/api/user";
    const method = id ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, id: id || undefined }),
    });

    const result = await res.json();

    if (res.status === 409) {
      setErrorNIM(result.error || "NIM sudah digunakan.");
      return;
    }

    if (res.status === 410) {
      setErrorEmail(result.error || "Email sudah digunakan.");
      return;
    }

    if (res.ok) {
      alert("Berhasil disimpan");

      if (!id) sessionStorage.setItem("newPost", "true");

      router.push("/user");
    } else {
      alert(result.error || "Gagal menyimpan data");
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
          {errorNIM && <p className="text-red-500 text-sm mt-1">{errorNIM}</p>}
        </div>
        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              defaultValue={formData.password}
              onChange={handleChange}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          {errorPassword && (
            <p className="text-red-500 text-sm mt-1">{errorPassword}</p>
          )}
        </div>
        <div>
          <Label>No. Telepon</Label>
          <Input
            name="telepon"
            type="text"
            defaultValue={formData.telepon}
            onChange={handleChange}
          />
          {errorTelepon && (
            <p className="text-red-500 text-sm mt-1">{errorTelepon}</p>
          )}
        </div>
        <div>
          <Label>Email</Label>
          <Input
            name="email"
            type="text"
            defaultValue={formData.email}
            onChange={handleChange}
          />
          {errorEmail && <p className="text-red-500 text-sm mt-1">{errorEmail}</p>}
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
