import React, { useState } from 'react';
import { WalletConnectModal } from '@walletconnect/modal';
const projectId = 'your_project_id_here';
const modal = new WalletConnectModal({ projectId });
export default function WalletConnectUI() {
