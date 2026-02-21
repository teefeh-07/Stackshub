import React, { createContext, useContext, useState } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });
const StacksContext = createContext(null);
export function StacksProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const authenticate = () => {
    showConnect({
      appDetails: { name: 'Stackshub', icon: window.location.origin + '/icon.png' },
      redirectTo: '/',
      onFinish: () => { setUserData(userSession.loadUserData()); },
      userSession
