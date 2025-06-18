'use client';
import { useState } from 'react';

import DJ from '@/app/components/DJ';
// import CPO from '@/app/components/CPO';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';

export default function Home() {
  const [formType, setFormType] = useState<'normal' | 'cpo' | 'window'>('normal');

  return (
    <div className="flex flex-col min-h-screen">
      <Header formType={formType} setFormType={setFormType} />

      <main className="flex-grow">
        <div className="shadow-xl border rounded-lg p-6 max-w-4xl mx-auto bg-black/5 border-black/5 shadow-black/5 dark:bg-white/5 dark:border-white/5 dark:shadow-white/5">

          {formType === 'normal' && (<DJ />)}
          {/* {formType === 'cpo' && (<CPO />)} */}
          {formType === 'cpo' && (<div className='text-center'>CPO Jacket not set up yet</div>)}
          {formType === 'window' && (<div className='text-center'>Window Tag not set up yet</div>)}
        </div>

      </main>

      <Footer />
    </div>
  );
}