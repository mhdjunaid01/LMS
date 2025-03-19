import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { InstructorProvider } from "./context/InstructorContext";
import { StudentProvider } from "./context/StudentContext";
import { BatchProvider } from "./context/BatchContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <BatchProvider>
            <App />
          </BatchProvider>
        </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
);
