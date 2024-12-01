import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/login";
import Books from "./routes/books";
import BookDetails from "./routes/bookDetails";
import AdminProfile from "./routes/adminProfile";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/books",
      element: <Books />,
    },
    {
      path: "/book/:id",
      element: <BookDetails />,
    },
    {
      path: "/adminProfile",
      element: <AdminProfile />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
