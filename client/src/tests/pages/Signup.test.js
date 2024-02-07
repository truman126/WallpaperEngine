// import { render, screen } from "@testing-library/react";
// import Signup from "../../pages/Signup";
// import { FilesContextProvider } from "../../context/FileContext";
// import { AuthContextProvider } from "../../context/AuthContext";
// import userEvent from "@testing-library/user-event";

// describe("Sign up page", () => {
//   describe("Sign Up page renders") , () => {

//     test ("Sign up component renders"), () => {
//       const signup = screen.getByTestId("signup")
//       expect(signup).toBeInTheDocument();
//     }
//   })

//   describe("All assets and components render", () => {
//     test("Textboxes render", () => {
//       render(
//         <FilesContextProvider>
//           <AuthContextProvider>
//             <Signup />
//           </AuthContextProvider>
//         </FilesContextProvider>
//       );
//       const emailTextbox = screen.getByRole("textbox", { name: /email/i });
//       const passwordTextbox = screen.getByLabelText(/password/i);
  
//       // const passwordTextbox = screen.getByLabelText("password");
//       expect(emailTextbox).toBeInTheDocument();
//       expect(passwordTextbox).toBeInTheDocument();
      
      
//     });
    
//     test("Buttons Render", () => {
//       render(
//         <FilesContextProvider>
//           <AuthContextProvider>
//             <Signup />
//           </AuthContextProvider>
//         </FilesContextProvider>
//       );
//       const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
//       const guestLogInButton = screen.getByRole("button", { name: /Continue as Guest/i });
  
//       expect(signUpButton).toBeInTheDocument();
//       expect(guestLogInButton).toBeInTheDocument();
//     })
//   })
  
//   describe("Sign up only accept valid input", () => {
  

//   test("Valid email and password are accepted", () => {
//     render(
//       <FilesContextProvider>
//         <AuthContextProvider>
//           <Signup />
//         </AuthContextProvider>
//       </FilesContextProvider>
//     );
//     const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
    
//     userEvent.type(getByLabelText(/email/i), 'email@example.com')
//     userEvent.type(getByLabelText(/password/i), 'password')
//     userEvent.click(signUpButton)
//     screen.debug()
//   })
// })
// })
