import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import  AutthProvider from "./utilis/AuthContext"
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById("root"));


// Create a client
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
    <BrowserRouter>
  
      <AutthProvider>
          <App /> 
      </AutthProvider>
    
      
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);