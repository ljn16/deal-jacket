'use client';
import React from 'react';

interface DealJacketFormProps {
  formType: 'normal' | 'cpo' | 'window';
  setFormType: (type: 'normal' | 'cpo' | 'window') => void;
}

export default function DealJacketForm({ formType, setFormType }: DealJacketFormProps) {
  return (
    <div>
      <div className="relative p-6 max-w-4xl mx-auto ">
        <div className="flex w-full  ">
        {([
          { label: 'Normal Jacket', value: 'normal' },
          { label: 'CPO Jacket', value: 'cpo' },
          { label: 'Window Tag', value: 'window' },
        ] as const).map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFormType(value)}
            className={`flex-1 px-4 py-2 rounded  text-white ${
              formType === value
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-gray-500/50 text-gray-800'
            }`}
          >
            {label}
          </button>
        ))}
        </div>
      </div>

      {formType === 'normal' && (
        <>
          {/* <h1 className="text-2xl font-bold mb-4">Deal Jacket Form</h1> */}
          <form>
            {/* existing form content here */}
          </form>
        </>
      )}
    </div>
  );
}
