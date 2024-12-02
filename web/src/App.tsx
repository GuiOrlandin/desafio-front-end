import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Books from "./routes/books";
import BookDetails from "./routes/bookDetails";
import AdminProfile from "./routes/adminProfile";
import LoginOrRegister from "./routes/login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginOrRegister />,
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
