"use client";
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import TextArea from "../input/TextArea";
import { ChevronDownIcon, EyeCloseIcon, EyeIcon, TimeIcon } from '../../../icons';
import DatePicker from '@/components/form/date-picker';

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <ComponentCard title="Input Data Mahasiswa">
      <div className="space-y-6">
        <div>
          <Label>Nama</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>NIM</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>No. Telepon</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Judul Skripsi</Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>
        <div>
            <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Simpan
            </button>
        </div>
      </div>
    </ComponentCard>
  );
}
