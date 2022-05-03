import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Typography from '@mui/material/Typography';
import ButtonAppBar from "./components/navBar/Navbar";
import NavBar from "./components/navBar/Navbar";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Typography>
      <NavBar />
      <App />
    </Typography>
  </StrictMode>
);