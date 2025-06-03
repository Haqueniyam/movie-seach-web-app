// src/App.js
import React from 'react';

function Login() {
   const handleLogin = ({onLoginSuccess}) => {
    const fakeSessionToken = 'react-miniapp-fake-token-xyz123';

    console.log("fakeSessionToken", fakeSessionToken);
    
    // Store token in localStorage
    localStorage.setItem('sessionToken', fakeSessionToken);

    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'AUTH_SUCCESS', token: fakeSessionToken })
      );
      // Notify parent React app about login success
      if (onLoginSuccess) onLoginSuccess();
    } else {
      console.warn('ReactNativeWebView not available');
    }
  };

  // React.useEffect(() => {
  //   function handleMessage(event) {
  //     try {
  //       const data = JSON.parse(event.data);
  //       if (data.type === 'PING') {
  //         alert('Ping received from Expo app');
  //       }
  //     } catch {
  //       // ignore
  //     }
  //   }

  //   window.addEventListener('message', handleMessage);
  //   return () => window.removeEventListener('message', handleMessage);
  // }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>React Mini App Wallet Auth Demo</h1>
      <button onClick={handleLogin} style={{ fontSize: 18, padding: '10px 20px' }}>
        Login (Simulate SIWE)
      </button>
    </div>
  );
}

export default Login;

