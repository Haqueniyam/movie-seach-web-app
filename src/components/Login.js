// src/App.js
import React from "react";

function Login() {
  const handleLogin = ({ onLoginSuccess }) => {
    // At the top of your mini app's main component or authentication logic
    // const queryParams = new URLSearchParams(window.location.search);
    // const authToken = queryParams.get("token");

    // Or alternatively, you can use the injected JavaScript variable
    const authToken = window.authToken;

    // const fakeSessionToken = String(demo);

    // console.log("fakeSessionToken", fakeSessionToken);

    // Store token in localStorage
    localStorage.setItem('sessionToken', authToken);

    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "AUTH_SUCCESS", token: authToken })
      );
      // Notify parent React app about login success
      if (onLoginSuccess) onLoginSuccess();
    } else {
      console.warn("ReactNativeWebView not available");
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
      <button
        onClick={handleLogin}
        style={{ fontSize: 18, padding: "10px 20px" }}
      >
        Login (Simulate SIWE)
      </button>
    </div>
  );
}

export default Login;
