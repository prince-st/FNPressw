import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Service from "./pages/Service";
import Marketing from "./pages/Marketing";
import Distribute from "./pages/Distribute";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/About" component={About} />
      <Route path="/service" component={Service} />
      <Route path="/Service" component={Service} />
      <Route path="/marketing" component={Marketing} />
      <Route path="/Marketing" component={Marketing} />
      <Route path="/distribute" component={Distribute} />
      <Route path="/Distribute" component={Distribute} />
      <Route path="/contact" component={Contact} />
      <Route path="/Contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
