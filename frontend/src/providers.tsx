"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: any) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
