
import React from 'react';

type MarketData = {
  market: string;
  token: string;
  deposits_ui: number;
  borrows_ui: number;
  available_liquidity_ui: number;
  endogenous_yield: number;
  deposit_rate: number;
  borrow_rate: number;
  utilization_rate: number;
  asset_weight_init: number;
  asset_weight_maint?: number;
};

type MarketTableProps = {
  title: string;
  data: MarketData[];
};

const formatNumber = (num: number): string => {
  if (num === 0) return "0";
  if (num < 0.01) return num.toString();
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
};

const MarketTable: React.FC<MarketTableProps> = ({ title, data }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-terminal-text-secondary text-left text-sm border-b border-gray-800">
            <tr>
              <th className="py-2 px-3 whitespace-nowrap">market</th>
              <th className="py-2 px-3 whitespace-nowrap">token</th>
              <th className="py-2 px-3 whitespace-nowrap">deposits_ui</th>
              <th className="py-2 px-3 whitespace-nowrap">borrows_ui</th>
              <th className="py-2 px-3 whitespace-nowrap">available_liquidity_ui</th>
              <th className="py-2 px-3 whitespace-nowrap">endogenous_yield</th>
              <th className="py-2 px-3 whitespace-nowrap">deposit_rate</th>
              <th className="py-2 px-3 whitespace-nowrap">borrow_rate</th>
              <th className="py-2 px-3 whitespace-nowrap">utilization_rate</th>
              <th className="py-2 px-3 whitespace-nowrap">asset_weight_init</th>
              {data[0]?.asset_weight_maint !== undefined && (
                <th className="py-2 px-3 whitespace-nowrap">asset_weight_maint</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-800 hover:bg-terminal-card">
                <td className="py-3 px-3">{row.market}</td>
                <td className="py-3 px-3">{row.token}</td>
                <td className="py-3 px-3">{formatNumber(row.deposits_ui)}</td>
                <td className="py-3 px-3">{formatNumber(row.borrows_ui)}</td>
                <td className="py-3 px-3">{formatNumber(row.available_liquidity_ui)}</td>
                <td className="py-3 px-3">{formatNumber(row.endogenous_yield)}</td>
                <td className="py-3 px-3">{formatNumber(row.deposit_rate)}</td>
                <td className="py-3 px-3">{formatNumber(row.borrow_rate)}</td>
                <td className="py-3 px-3">{formatNumber(row.utilization_rate)}</td>
                <td className="py-3 px-3">{formatNumber(row.asset_weight_init)}</td>
                {row.asset_weight_maint !== undefined && (
                  <td className="py-3 px-3">{formatNumber(row.asset_weight_maint)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;
