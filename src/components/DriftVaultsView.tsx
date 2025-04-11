import React from 'react';

const DriftVaultsView = () => {
  // Mock data based on the screenshot
  const vaultsData = [
    { name: 'YouZongTestVault0', public_key: '3JVvLGnuZtwdcSPU4dZuwyywup67CuWLgUVAAPsHNqDp', manager: '82EKgy8xkd4PYxUaamzxtkKiocI6BrCv5qFWrHjErRs', total_shares: 0, net_deposits: 0 },
    { name: 'USDn1', public_key: '9kwoKmpNtPEK4fESLf7YnrGtZqvHcnYoN7aVWWdvkhSP', manager: 'EBbqr8p8e4uDcu2UhNxTZrsPMXuYktvSiuX9hRRqLjRG', total_shares: 100000000, net_deposits: 100 },
    { name: 'Funding Rate Reversion Vault V2', public_key: 'DYL61pGcLfoGNQ6JjwZ2Yzc6m3YLkCZAS8yaL5QWMR', manager: '8KX7LUPnn94R2nXgufRJwyiDHFob4AS8DrNDYX7H3o5', total_shares: 1042117750, net_deposits: 1040 },
    { name: 'BTC-Dominance-NeutralTrade', public_key: '5BCDLjnQXv92AYvSpdEpENgYhABaVt92fym1MYNyhVuo', manager: 'C77bxLHWjnAVeG9HdMxu1gunFnjRCcWUDZYfa7xbacHr', total_shares: 1000000000, net_deposits: 1000 },
    { name: 'Lucky Vault 02', public_key: 'Bbydi4XqY493dCNyHNm8xjRUtxbxovKL5qQPEbxEcxMMv', manager: '7n1eiW6LWRCsa7cggUcnM9gnutwVJc8Xrs41ELGwGbE', total_shares: 1036801276283, net_deposits: 1042038 },
    { name: 'USDC gain (Hedge+Leverage JLP)', public_key: 'EyFonJT7uzMk5zrWWTuXdUyDVZ5fdBN8yaLUusoqyy', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'ALT3 Capital ETH yield', public_key: 'FSs89oVMX1GjxaPuH64uwFuuzAxVAeUaAxDPfe6UYmpm', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'Active-Vault-testing_6_Nov', public_key: 'DDg8C1p6QCixjZSfD2RFMWwLWyrkhcbeUnc9jYJtz9b5', manager: '6HmPq4hU2BQqkogVuohggZwaqNFQRpRQ6MSE6bcKxCEa', total_shares: 10229360, net_deposits: -23 },
    { name: 'ALT3 Capital SOL yield', public_key: '6L2VV9ngPXfg9aXLuTVGdvYmekkPhWDaEZ3BG6nfLKp', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'p4_test_vault_1', public_key: 'Ax2zyyvPMigf1ksedUfjUMPqJbaauuJ1gMnaNULNgC8f', manager: 'BqAVx7wxHwakobUe8PyNxxEzahY3Vdx6euDgbiXGda3p', total_shares: 5000000, net_deposits: 5 },
    { name: 'ALT3 Capital USDC yield', public_key: '9xTngFMR4LfMW1XWnG9Ns9hTgCVVENCAZPdKDkcMU1id', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'VIP14-NeutralTrade', public_key: 'ES2C16XjnMer2YSoMdAHS1UCKtjEB64FRqp9NXLGpuZU', manager: 'ppDcV4UNoje5rHSsTx5i83YCwpjajh1mSNvDjL8QMpR', total_shares: 0, net_deposits: 0 },
    { name: 'CapyMaxMainnet', public_key: '4ceP3ATKInUZjq1MaNYtbhQcpXWdrhj2XbCKwSW2G4G1', manager: 'CqboUp2DW2HTQsAZ8mB7tyZiFNncTwfsuYCHKDJPWyYa', total_shares: 9000000, net_deposits: -1 },
    { name: 'Neutral Hedged JLP NX', public_key: 'mc1UFoEpaiyPVY4njGGerwLL7XzTVCOiwx6eUtuoDfR', manager: '2uxkEppqWT3GX1Ym1kU6iHgBeF7TVRXjFpaNx425PND3', total_shares: 19999991604, net_deposits: 200000 },
    { name: 'USDC gain (Hedge + Leverage JLP)', public_key: 'EKmh5iYyouaczpnAjhcUSueU4UXcpLoDaRziPUeTSTAW', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 1000000000, net_deposits: 1000 },
    { name: 'BTC gain (Hedge + Leverage JLP )', public_key: 'GRqeK4TiKwvPMST6pa9f7Ah1ZGEtrkK7mwBbUeNMUuJSE', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 1446782, net_deposits: 1 },
    { name: 'Team-NeutralTrade', public_key: 'FBYp9toQEqNiGeP8BzyvRD1FUauJBFk5eYUEkgqvigZ5', manager: 'C77bxLHWjnAVeG9HdMxu1gunFnjRCcWUDZYfa7xbacHr', total_shares: 80015652230, net_deposits: 80020 },
    { name: 'USDC-Earn-NeutralTrade', public_key: '4i2L5zvzUM5LXqUYm35Ytv4BGSmhFVTqG5xtFJJesm14', manager: 'C77bxLHWjnAVeG9HdMxu1gunFnjRCcWUDZYfa7xbacHr', total_shares: 372874870574, net_deposits: 372906 },
    { name: 'SOL gain (Hedge + Leverage JLP )', public_key: '3EXe9uzf3trp4oiqa2n7wnc1UD4VCRrU1mrps1PKQ9Jx', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'Vectis-dSOL__Anchor', public_key: 'CNFFhKqGXZWhSHbt2BSh26mcQei1UZkUXiBdVc82TyQm', manager: '6HmPq4hU2BQqkogVuohggZwaqNFQRpRQ6MSE6bcKxCEa', total_shares: 4000000000, net_deposits: 4000 },
    { name: 'dSOL Plus', public_key: '6aowo7AoE6rw8CS6knd746XiRysuiEjs9YpZyHRAMnor', manager: 'G6L1NE8tLYYzvMHYHbkHZqPFvfEsfRAaHSvyNQ2hut3o', total_shares: 60495868550, net_deposits: 6046783 }
  ];

  // Format numbers with commas for display
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Truncate public key display
  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="px-4 py-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-2 text-terminal-text-secondary font-medium">name</th>
              <th className="text-left p-2 text-terminal-text-secondary font-medium">public_key</th>
              <th className="text-left p-2 text-terminal-text-secondary font-medium">manager</th>
              <th className="text-right p-2 text-terminal-text-secondary font-medium">total_shares</th>
              <th className="text-right p-2 text-terminal-text-secondary font-medium">net_deposits</th>
            </tr>
          </thead>
          <tbody>
            {vaultsData.map((vault, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-terminal-background-secondary">
                <td className="p-2">{vault.name}</td>
                <td className="p-2 font-mono text-xs">
                  <div className="flex items-center">
                    <span className="truncate max-w-[200px]">{vault.public_key}</span>
                  </div>
                </td>
                <td className="p-2 font-mono text-xs">
                  <div className="flex items-center">
                    <span className="truncate max-w-[200px]">{vault.manager}</span>
                  </div>
                </td>
                <td className="p-2 text-right">{formatNumber(vault.total_shares)}</td>
                <td className="p-2 text-right">{formatNumber(vault.net_deposits)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriftVaultsView; 