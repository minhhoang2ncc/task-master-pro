// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { StrictMode } from "react"
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "./providers.tsx"
import { Provider } from "react-redux"
import store from "@/redux/store.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
