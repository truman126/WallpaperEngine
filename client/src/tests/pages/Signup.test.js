import { render, screen } from "@testing-library/react";
import Signup from "../../pages/Signup";
import { FilesContextProvider } from "../../context/FileContext";
import { AuthContextProvider } from "../../context/AuthContext";
import userEvent from "@testing-library/user-event";

describe("Textboxes", () => {
  render(
    <FilesContextProvider>
      <AuthContextProvider>
        <Signup />
      </AuthContextProvider>
    </FilesContextProvider>
  );
  test("Textboxes render", () => {

    const emailTextbox = screen.getByRole("textbox", { name: /email/i });
    const passwordTextbox = screen.getByLabelText("password");
    expect(emailTextbox).toBeInTheDocument();
    expect(passwordTextbox).toBeInTheDocument();
    
    
  });
  // test("Email accepts valid input only", () => {
  //   screen.debug();
  //   const emailTextbox = screen.getByRole("textbox", { name: /email/i });
  //   expect(emailTextbox).toBeInTheDocument();
  // });
  //password accepts valid input only
  //fields must be filled
});
