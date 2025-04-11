import React, { useState } from 'react';
import GodModeHeader from '@/components/GodModeHeader';
import ProtocolView from '@/components/ProtocolView';
import TokenView from '@/components/TokenView';
import DriftVaultsView from '@/components/DriftVaultsView';
import StablecoinYieldsView from '@/components/StablecoinYieldsView';
import SolYieldsView from '@/components/SolYieldsView';
import JLPYieldsView from '@/components/JLPYieldsView';
import LPYieldsView from '@/components/LPYieldsView';
import Layout from '@/components/Layout';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('token');

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const renderView = () => {
    switch (activeView) {
      case 'protocol':
        return <ProtocolView />;
      case 'token':
        return <TokenView />;
      case 'drift-vaults':
        return <DriftVaultsView />;
      case 'stablecoin-yields':
        return <StablecoinYieldsView />;
      case 'sol-yields':
        return <SolYieldsView />;
      case 'jlp-yields':
        return <JLPYieldsView />;
      case 'lp-yields':
        return <LPYieldsView />;
      default:
        return <div className="px-4 py-6">This view is not implemented yet</div>;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <GodModeHeader activeView={activeView} onViewChange={handleViewChange} />
        {renderView()}
      </div>
    </Layout>
  );
};

export default Dashboard; 