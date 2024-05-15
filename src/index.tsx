import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import setupAxios from "./axios/config";
import stores from "./redux/Store";
import ErrorBoundary from "./components/error-boundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import ToastNotification from "./components/toastNotification";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
setupAxios(stores.store);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={stores.store}>
        <PersistGate persistor={stores.persist}>
          {/* <ThemeWrapper> */}
          <BrowserRouter>
            <ToastNotification />
            <App />
          </BrowserRouter>
          {/* </ThemeWrapper> */}
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
