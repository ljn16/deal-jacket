'use client';
import React, { useState } from 'react';

interface PayCalculatorProps {
  defaultHours?: number;
}

const PayCalculator: React.FC<PayCalculatorProps> = ({ defaultHours = 40 }) => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(defaultHours);
  const [rateFocused, setRateFocused] = useState(false);
  const [overtimeRate, setOvertimeRate] = useState<number>(1.5);
  const [showOvertimeRate, setShowOvertimeRate] = useState(false);

  const weeklyPay = hourlyRate * hoursPerWeek;
  const monthlyPay = weeklyPay * 52 / 12;
  const annualPay = weeklyPay * 52;

  const regularHours = Math.min(hoursPerWeek, 40);
  const overtimeHours = Math.max(hoursPerWeek - 40, 0);
  const overtimeWeeklyPay = (regularHours * hourlyRate) + (overtimeHours * hourlyRate * overtimeRate);
  const overtimeMonthlyPay = overtimeWeeklyPay * 52 / 12;
  const overtimeAnnualPay = overtimeWeeklyPay * 52;

  return (
    <div className="p-4 max-w-md mx-auto  shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Pay Calculator</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
        <input
          type="number"
          value={rateFocused && hourlyRate === 0 ? '' : hourlyRate}
          onFocus={() => setRateFocused(true)}
          onBlur={() => setRateFocused(false)}
          onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
          className="w-full border p-2 rounded"
          placeholder="Enter hourly rate"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Hours per Week</label>
        <input
          type="number"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(parseFloat(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Enter hours per week"
        />
      </div>

      <button
        onClick={() => setShowOvertimeRate(!showOvertimeRate)}
        className="text-sm text-blue-600 hover:underline mb-2"
      >
        {showOvertimeRate ? 'Hide' : 'Custom'} Overtime Rate
      </button>

      {showOvertimeRate && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Overtime Rate</label>
          <input
            type="number"
            value={overtimeRate}
            onChange={(e) => setOvertimeRate(parseFloat(e.target.value) || 1.5)}
            className="w-full border p-2 rounded"
            placeholder="Enter overtime multiplier"
            step="0.1"
            min="1"
          />
        </div>
      )}

      <div className="space-y-1">
        <p>
          <strong>Weekly:</strong> ${weeklyPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          {hoursPerWeek > 40 && (
            <span className="text-sm text-gray-500"> (with OT: ${overtimeWeeklyPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span>
          )}
        </p>
        <p>
          <strong>Monthly:</strong> ${monthlyPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          {hoursPerWeek > 40 && (
            <span className="text-sm text-gray-500"> (with OT: ${overtimeMonthlyPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span>
          )}
        </p>
        <p>
          <strong>Annual:</strong> ${annualPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          {hoursPerWeek > 40 && (
            <span className="text-sm text-gray-500"> (with OT: ${overtimeAnnualPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PayCalculator;