// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "./providers.tsx"
import { Provider } from "react-redux"
import store from "@/redux/store.ts"

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
            <App />
          {/* </PersistGate> */}
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  // </StrictMode>
)
