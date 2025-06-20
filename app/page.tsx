'use client';
import { useState } from 'react';

import DJ from '@/app/components/DJ';
// import CPO from '@/app/components/CPO';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import WindowTag from './components/WindowTag';
import Calculator from '@/app/components/Calculator';

export default function Home() {
  const [formType, setFormType] = useState<'normal' | 'cpo' | 'window'>('normal');
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header formType={formType} setFormType={setFormType} />

      <main className="flex-grow">
        <div className="shadow-xl border rounded-lg p-6 max-w-4xl mx-auto bg-black/5 border-black/5 shadow-black/5 dark:bg-white/5 dark:border-white/5 dark:shadow-white/5">

          {formType === 'normal' && (<DJ />)}
          {formType === 'window' && (
            // <div className='text-center'>
            //   <h1 className="text-4xl font-bold text-center">Window Tag Form</h1>
            //   <br></br>
            //   <p>Window Tag not set up yet</p>
            // </div>
            <WindowTag />
          )}
        </div>

        {showCalculator && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-black dark:text-white"
                onClick={() => setShowCalculator(false)}
              >
                ✕
              </button>
              <Calculator />
            </div>
          </div>
        )}

        <button
          onClick={() => setShowCalculator(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-40"
        >
          <img src="/icons/calculator-icon.png" alt="Calculator Icon" className="w-6 h-6" />
        </button>
      </main>

      <Footer />
    </div>
  );
}