import React, { useState } from 'react';
import { WalletConnectModal } from '@walletconnect/modal';
const projectId = 'your_project_id_here';
const modal = new WalletConnectModal({ projectId });
export default function WalletConnectUI() {
  const [connected, setConnected] = useState(false);
  const onConnect = async () => {
    await modal.openModal();
    setConnected(true);
  };
  return (
    <div className='wc-container'>
      <button onClick={onConnect}>{connected ? 'Connected' : 'Connect WalletConnect'}</button>
    </div>
