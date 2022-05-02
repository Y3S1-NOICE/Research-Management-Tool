import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Typography from '@mui/material/Typography';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Typography>
    <App />
    </Typography>
  </StrictMode>
);