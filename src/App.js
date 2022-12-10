import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Context from "./Context/Context";
import Main from "./Layout/Main";

const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Context>
          <Main />
        </Context>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
