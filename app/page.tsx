// pages/index.tsx
"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function Home() {
  const [form, setForm] = useState({
    year: "",
    make: "",
    vin: "",
    color: "",
    purchaseDate: "",
    email: "",

    stock: "",
    dateSold: "",
    mileage: "",

    soldTo: "",
    addressL1: "",
    addressL2: "",
    phone: "",
    salesperson: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = async () => {
    const existingPdfBytes = await fetch("/deal-jacket-template.pdf").then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const draw = (text: string, x: number, y: number, size = 10) => {
      if (text) {
        page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
      }
    };

    // Adjusted coordinates to match screenshot layout
    draw(form.year, 120, 655);
    draw(form.make, 120, 630);
    draw(form.vin, 120, 605);
    draw(form.color, 120, 580);
    draw(form.purchaseDate, 180, 555);
    draw(form.email, 120, 400);

    draw(form.stock, 440, 655);
    draw(form.dateSold, 440, 630);
    draw(form.mileage, 440, 555);

    draw(form.soldTo, 625, 630);
    draw(form.addressL1, 625, 605);
    draw(form.addressL2, 625, 580);
    draw(form.phone, 625, 555);
    draw(form.salesperson, 625, 530);



    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url);
    if (newWindow) {
      newWindow.addEventListener("load", () => {
        newWindow.focus();
        newWindow.print();
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center p-10">Deal Jacket Form</h1>
      <div className="grid grid-cols-3 gap-8">
        {/* Vehicle Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Vehicle Info</h2>
          <div className="flex flex-col gap-4">
            <input
              name="year"
              placeholder="year"
              value={form.year}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="make"
              placeholder="make"
              value={form.make}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="vin"
              placeholder="vin"
              value={form.vin}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="color"
              placeholder="color"
              value={form.color}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="purchaseDate"
              placeholder="purchaseDate"
              value={form.purchaseDate}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="email"
              placeholder="email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
        {/* Stock Details */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Stock Details</h2>
          <div className="flex flex-col gap-4">
            <input
              name="stock"
              placeholder="stock"
              value={form.stock}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="dateSold"
              placeholder="dateSold"
              value={form.dateSold}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="mileage"
              placeholder="mileage"
              value={form.mileage}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
        {/* Customer Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Customer Info</h2>
          <div className="flex flex-col gap-4">
            <input
              name="soldTo"
              placeholder="soldTo"
              value={form.soldTo}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="addressL1"
              placeholder="addressL1"
              value={form.addressL1}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="addressL2"
              placeholder="addressL2"
              value={form.addressL2}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="phone"
              placeholder="phone"
              value={form.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="salesperson"
              placeholder="salesperson"
              value={form.salesperson}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
        <div className="col-span-3 mt-4">
          <button
            onClick={generatePDF}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Print Jacket
          </button>
        </div>
      </div>
    </div>
  );
}