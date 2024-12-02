// import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "../../lib/react-query";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import Books from "./index";

// describe("books page", () => {
//   it("should be able to render books page", async () => {
//     render(
//       <QueryClientProvider client={queryClient}>
//         <MemoryRouter initialEntries={["/books"]}>
//           <Routes>
//             <Route path="/books" element={<Books />} />
//           </Routes>
//         </MemoryRouter>
//       </QueryClientProvider>
//     );

//     expect(screen.getByText("Loading...")).not.toBeInTheDocument();

//     screen.debug();
//   });
// });
