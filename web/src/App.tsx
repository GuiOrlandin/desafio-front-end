import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
