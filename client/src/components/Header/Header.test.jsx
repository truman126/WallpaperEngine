import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { AuthContextProvider } from "../../context/AuthContext";
import { FilesContextProvider } from "../../context/FileContext";
const mockUser = {
  name: "Test User",
  email: "test@example.com",
  userType: "user",
  // add other user properties your component expects
};
const HeaderWrapper = (props) => {
  return (

    <AuthContextProvider>
      <FilesContextProvider>
        <BrowserRouter basename="/" >
          {props.children}
        </BrowserRouter>
      </FilesContextProvider>
    </AuthContextProvider>

  )

}

describe("Header Component", () => {
  it("renders without crashing", () => {

    render(

      <HeaderWrapper>
        <Header user={mockUser} />
      </HeaderWrapper>


    );
  });

  it("displays the correct title", () => {
    const { getByText } = render(
      <HeaderWrapper>
        <Header user={mockUser} />
      </HeaderWrapper>

    );
    // screen.debug();
    expect(getByText(/Truman's Wallpaper Engine/i)).toBeInTheDocument();
  });

  it("contains a link to the home page", () => {
    const { getByRole } = render(
      <HeaderWrapper>
        <Header user={mockUser} />
      </HeaderWrapper>
    );
    const link = getByRole("link", { name: "Truman's Wallpaper Engine" });
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the LightToggle component", () => {
    const { container } = render(
      <HeaderWrapper>
        <Header user={mockUser} />
      </HeaderWrapper>
    );
    // screen.debug();
    expect(container.getElementsByClassName("LightToggle")).toBeTruthy();
  });

  it("renders the Navigation component", () => {
    const { container } = render(
      <HeaderWrapper>
        <Header user={mockUser} />
      </HeaderWrapper>
    );
    expect(container.getElementsByClassName("Navigation")).toBeTruthy();

  });
});