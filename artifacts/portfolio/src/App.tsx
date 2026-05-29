import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import LoadingScreen from "@/components/LoadingScreen";
import Portfolio from "@/pages/Portfolio";

const queryClient = new QueryClient();

function PageReveal() {
  return (
    <motion.div
      initial={{ scaleY: 1, transformOrigin: "top" }}
      animate={{ scaleY: 0, transformOrigin: "top" }}
      transition={{ duration: 1.4, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#ffffff",
        zIndex: 9990,
        pointerEvents: "none",
      }}
    />
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence>
          {!loadingDone && (
            <LoadingScreen onComplete={() => setLoadingDone(true)} />
          )}
        </AnimatePresence>

        {loadingDone && (
          <>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <PageReveal />
          </>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
