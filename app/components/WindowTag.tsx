'use client';
import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// import template from '@/public/3x4-template.pdf';

export default function WindowTag() {
  const [form, setForm] = useState({
    stock: '',
    year: '',
    make: '',
    model: '',
    color: '',
    miles: '',
    auxillary: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = async () => {
    const existingPdfBytes = await fetch("/3x4-template.pdf").then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const draw = (text: string, x: number, y: number, size = 10) => {
      if (text) {
        page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
      }
    };

    draw(form.stock, 50, 250);
    draw(form.year, 50, 215);
    draw(form.make, 50, 180);
    draw(form.model, 50, 140);
    draw(form.color, 50, 100);
    draw(form.miles, 50, 65);
    draw(form.auxillary, 50, 30);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = URL.createObjectURL(blob);
    document.body.appendChild(iframe);
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    };
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-4xl font-bold mb-10 text-center ">Window Tag</h1>
      {/* <h1 className="text-4xl font-bold text-center">Window Tag Form</h1> */}

    <div className="grid grid-cols-1 gap-4">
      <input name="stock" placeholder="Stock #" disabled value={form.stock} onChange={handleChange} className="border p-2 rounded cursor-not-allowed" />
      <input name="year" placeholder="Year" disabled value={form.year} onChange={handleChange} className="border p-2 rounded cursor-not-allowed" />
      <input name="make" placeholder="Make" disabled value={form.make} onChange={handleChange} className="border p-2 rounded cursor-not-allowed" />
      <input name="model" placeholder="Model" disabled value={form.model} onChange={handleChange} className="border p-2 rounded cursor-not-allowed" />
      <input name="color" placeholder="Color" disabled value={form.color} onChange={handleChange} className="border p-2 rounded cursor-not-allowed" />
      <input name="miles" placeholder="Miles" disabled value={form.miles} onChange={handleChange} className="border p-2 rounded cursor-not-allowed" />
      <input name="auxillary" placeholder="Auxillary" disabled value={form.auxillary} onChange={handleChange} className="border p-2 rounded cursor-not-allowed" />
    </div>
      <button
        type="button"
        onClick={generatePDF}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Print Window Tag
      </button>
    </div>
  );
}
