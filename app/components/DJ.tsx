"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function DJ() {
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

  const [mode, setMode] = useState("normal");
  const [useCpoLayout/* , setUseCpoLayout */] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
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

    // if (mode === "intake") {
    //   draw(form.keyCode || "", 700, 100); // placeholder
    // } else if (mode === "payoff") {
    //   draw(form.bank || "", 700, 90);
    //   draw(form.city || "", 700, 80);
    //   draw(form.accountNumber || "", 700, 70);
    //   draw(form.payOff || "", 700, 60);
    //   draw(form.goodThrough || "", 700, 50);
    //   draw(form.title ? "Yes" : "No", 700, 40);
    // }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });

    // const url = URL.createObjectURL(blob);
    // const newWindow = window.open(url);
    // if (newWindow) {
    //   newWindow.addEventListener("load", () => {
    //     newWindow.focus();
    //     newWindow.print();
    //   });
    // }

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
    <div className="relative px-6 max-w-4xl mx-auto">
        
      <div className="relative mb-4 p-5">
        <h1 className="text-4xl font-bold text-center">Deal Jacket Form</h1>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 group">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded border"
          >
            <option value="normal">Normal Mode</option>
            <option value="intake">Intake Mode</option>
            <option value="payoff">Payoff Mode</option>
            <option value="billing">Billing Mode</option>
          </select>
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            additional modes not currently setup
          </span>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm">CPO</span>
        <label className="relative inline-flex items-center">
          <input
            type="checkbox"
            className="sr-only"
            disabled
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full cursor-not-allowed"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-gray-400 rounded-full"></div>
        </label>
      </div>

      <div className={`${useCpoLayout ? 'flex flex-col gap-12' : 'grid grid-cols-3 gap-8'}`}>
        {/* Vehicle Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-center">Vehicle Info</h2>
          <div className="flex flex-col gap-4">
            <input
              list="years"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <datalist id="years">
              {Array.from({ length: 15 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year} value={year} />;
              })}
            </datalist>
            <input
              list="makes"
              name="make"
              placeholder="Make"
              value={form.make}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <datalist id="makes">
              <option value="Honda " />
              <option value="Toyota " />
              <option value="Ford " />
              <option value="Chevrolet " />
              <option value="Nissan " />
              <option value="Hyundai " />
              <option value="Kia " />
              <option value="Volkswagen " />
              <option value="Subaru " />
              <option value="Jeep " />
              <option value="BMW " />
              <option value="Mercedes-Benz " />
              <option value="Audi " />
              <option value="Mazda " />
              <option value="Tesla " />
            </datalist>
            <input
              name="vin"
              placeholder="VIN"
              value={form.vin}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <div className="flex">
              <input
                list="colors"
                name="color"
                placeholder="Color"
                value={form.color}
                onChange={handleChange}
                className="border border-r-0 p-2 rounded-r-none rounded-l w-full"
              />
              <select
                onChange={(e) => setForm(prev => ({ ...prev, color: e.target.value }))}
                className="text-xs rounded-l-none rounded-r bg-gradient-to-br from-red-500 via-yellow-400 to-green-500 text-white hover:opacity-90 w-10 dark:bg-gray-800 dark:text-white"
                title="Honda colors"
              >
                
                <option value="">           

            </option>
                <option value="Meteorite Gray Metallic">Meteorite Gray{/*  Metallic */}</option>
                <option value="Modern Steel Metallic">Modern Steel{/*  Metallic */}</option>
                <option value="Urban Gray Pearl">Urban Gray{/*  Pearl */}</option>
                <option value="Sonic Gray Pearl">Sonic Gray{/*  Pearl */}</option>

                <option value="Canyon River Blue Metallic">Canyon River Blue</option>
                <option value="Still Night Pearl">Still Night Pearl</option>
                <option value="Diffused Sky Blue Pearl">Diffused Sky{/* Blue Pearl */}</option>
                <option value="Blue Lagoon Pearl">Blue Lagoon{/*  Pearl */}</option>
                <option value="Obsidian Blue Pearl">Obsidian Blue{/*  Pearl */}</option>
                <option value="Boost Blue Pearl">Boost Blue{/*  Pearl */}</option>
                <option value="Pacific Blue Metallic">Pacific Blue{/*  Metallic */}</option>
                <option value="North Shore Pearl">North Shore{/*  Pearl */}</option>

                <option value="Ash Green Metallic">Ash Green{/*  Metallic */}</option>
                <option value="Sunset Orange">Sunset Orange</option>
                {/* <option value="Crystal Black Pearl">Crystal Black Pearl</option> */}
                {/* <option value="Platinum White Pearl">Platinum White Pearl</option> */}
                {/* <option value="Radiant Red Metallic">Radiant Red Metallic</option> */}
                {/* <option value="Radiant Red Metallic II">Radiant Red Metallic II</option> */}
                {/* <option value="Solar Silver Metallic">Solar Silver Metallic</option> */}
                {/* <option value="Lunar Silver Metallic">Lunar Silver Metallic</option> */}
                {/* <option value="Scarlet Red Metallic">Scarlet Red Metallic</option> */}
                {/* <option value="Raven Black">Raven Black</option> */}
                {/* <option value="Mercury Silver Metallic">Mercury Silver Metallic</option> */}
                {/* <option value="Snowfall Pearl">Snowfall Pearl</option> */}
                {/* <option value="Rallye Red">Rallye Red</option> */}
                {/* <option value="Milano Red">Milano Red</option> */}
              </select>
            </div>
            <datalist id="colors">
              <option value="Black" />
              <option value="White" />
              <option value="Gray" />
              <option value="Silver" />
              <option value="Red" />
              <option value="Blue" />
              <option value="Green" />
              {/* <option value="Yellow" /> */}
              {/* <option value="Orange" /> */}
              {/* <option value="Brown" /> */}
              {/* <option value="Gold" /> */}
              {/* <option value="Beige" /> */}
              {/* <option value="Purple" /> */}
              {/* <option value="Maroon" /> */}
              {/* <option value="Navy" /> */}
            </datalist>
            <div className="flex">
              <input
                name="purchaseDate"
                placeholder="Purchase Date"
                value={form.purchaseDate}
                onChange={handleChange}
                className="border border-r-0 p-2 rounded-r-none rounded-l w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
                  setForm((prev) => ({ ...prev, purchaseDate: formattedDate }));
                }}
                className="w-16 text-xs rounded-l-none rounded-r bg-gray-400 text-white hover:bg-gray-500"
              >
                <img
                  src="/icons/today-icon-white.png"
                  className="w-4 h-4 mx-auto"
                  alt="Today icon"
                />
              </button>
            </div>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
        {/* Stock Details */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-center">Stock Details</h2>
          <div className="flex flex-col gap-4">
            <input
              name="stock"
              placeholder="Stock #"
              value={form.stock}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <div className="flex">
              <input
                name="dateSold"
                placeholder="Date Sold"
                value={form.dateSold}
                onChange={handleChange}
                className="border border-r-0 p-2 rounded-r-none rounded-l w-full"
              />
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
                  setForm((prev) => ({ ...prev, dateSold: formattedDate }));
                }}
                className="w-16 text-xs rounded-l-none rounded-r bg-gray-400 text-white hover:bg-gray-500"
              >
                <img
                  src="/icons/today-icon-white.png"
                  className="w-4 h-4 mx-auto"
                  alt="Today icon"
                />
              </button>
            </div>
            <input
              name="mileage"
              placeholder="Mileage"
              value={form.mileage}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
        {/* Customer Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-center">Customer Info</h2>
          <div className="flex flex-col gap-4">
            <input
              name="soldTo"
              placeholder="Sold To"
              value={form.soldTo}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="addressL1"
              placeholder="Address (line 1)"
              value={form.addressL1}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="addressL2"
              placeholder="Address (line 2)"
              value={form.addressL2}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="phone"
              placeholder="Phone #"
              value={form.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              list="salespeople"
              name="salesperson"
              placeholder="Salesperson"
              value={form.salesperson}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <datalist id="salespeople">
              <option value="Logan" />
              <option value="Myles" />
              <option value="Joel" />
              <option value="Bobby" />
              <option value="John" />
              <option value="Ricky" />
              <option value="Marcus" />
              <option value="Andy" />
              <option value="Jose" />
              <option value="Tony" />
              <option value="Jacob" />
              <option value="Jessica" />
              <option value="Evan" />
              <option value="Steve" />
              <option value="Chris" />
              <option value="Paul" />
              <option value="Neha" />
              <option value="Hilowle" />
            </datalist>
            <button
              onClick={resetForm}
              className=" p-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              <span className="flex items-center justify-center gap-2">
                <img
                  src="/icons/reset-icon-white.png"
                  alt="Reset Icon"
                  className="w-4 h-4"
                />
                Reset
              </span>
            </button>
          </div>
        </div>
        {mode !== "normal" && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-center capitalize">{mode} mode</h2>
            <div className="flex flex-col gap-4">
              {mode === "intake" && (
                <input
                  name="keyCode"
                  placeholder="Key Code"
                  // value={form.keyCode || ""}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              )}
              {mode === "payoff" && (
                <>
                  <input
                    name="bank"
                    placeholder="Bank"
                    // value={form.bank || ""}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <input
                    name="city"
                    placeholder="City"
                    // value={form.city || ""}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <input
                    name="accountNumber"
                    placeholder="Account Number"
                    // value={form.accountNumber || ""}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <input
                    name="payOff"
                    placeholder="Pay Off"
                    // value={form.payOff || ""}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <input
                    name="goodThrough"
                    placeholder="Good Through"
                    // value={form.goodThrough || ""}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="title"
                      // checked={form.title || false}
                      // onChange={(e) => setForm({ ...form, title: e.target.checked })}
                      className="mr-2"
                    />
                    Title
                  </label>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="col-span-3 mt-4">
        <button
          onClick={generatePDF}
          className="w-full bg-blue-600 text-white mt-5 px-4 py-2 rounded hover:bg-blue-700"
        >
          <span className="flex items-center justify-center gap-2 font-bold">
            <img
              src="/icons/print-icon-white.png"
              alt="Print Icon"
              className="w-4 h-4"
            />
            Print Jacket
          </span>
        </button>
        
      </div>
    </div>
  );
}