import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "./Navigation";
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'
import { AuthContextProvider } from "../../context/AuthContext";
import { FilesContextProvider } from "../../context/FileContext";
import { isTaxID } from "validator";

const mobileWidth = 640;
const desktopWidth = 900;
const mockUser = { email: "user@example.com", userType: "user" };
const mockGuest = {userType: "guest" };
const mockAdmin = { email: "admin@example.com", userType: "admin" };


const HeaderWrapper = (props) => {
  return (

    <AuthContextProvider>
      <FilesContextProvider>
        <Router basename="/" >
          {props.children}
        </Router>
      </FilesContextProvider>
    </AuthContextProvider>

  )

}

describe("Desktop Navigation Component", () => {

    vi.mock("../hooks/useLogout", () => ({
        useLogout: () => ({
            logout: mockLogout,
        }),
    }));

    it("check if DesktopNavigation renders when the screen is desktop size", () => {
        window.innerWidth = desktopWidth;

        render(
            <HeaderWrapper><Navigation /></HeaderWrapper>
        )

        expect(screen.getByTestId("DesktopNavigation"));

    })

    it("renders the username when a user is logged in", () => {
        window.innerWidth = desktopWidth;


        render(
            <HeaderWrapper>
                <Navigation user={mockUser} />
            </HeaderWrapper>
        );
        expect(screen.getByTestId("DesktopNavigation"));
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
        expect(screen.getByText("Log out")).toBeInTheDocument();
    });

    it("renders 'GUEST' when a guest user is logged in", () => {
        window.innerWidth = desktopWidth;

        render(
            <HeaderWrapper>
                <Navigation user={mockGuest} />
            </HeaderWrapper>
        );
        expect(screen.getByTestId("DesktopNavigation"));
        expect(screen.getByText("Guest")).toBeInTheDocument();
        expect(screen.getByText("Log out")).toBeInTheDocument();
    });

    it("renders admin panel button when an admin is logged in", () => {
        window.innerWidth = desktopWidth;


        const adminUser = { email: "admin@example.com", userType: "admin" };

        render(
            <HeaderWrapper>
                <Navigation user={adminUser} />
            </HeaderWrapper>
        );
        expect(screen.getByTestId("DesktopNavigation"));
        expect(screen.getByText(adminUser.email)).toBeInTheDocument();
        expect(screen.getByText("Admin Panel")).toBeInTheDocument();
    });

    it("calls logout function when logout button is clicked", () => {
        window.innerWidth = desktopWidth;
        const mockLogout = vi.fn();

        render(
            <HeaderWrapper>
                <Navigation user={mockUser} logout={mockLogout} />
            </HeaderWrapper>
        );
        expect(screen.getByTestId("DesktopNavigation"));

        const logoutButton = screen.getByText(/Log out/i);
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalled();
    });
});

describe("Mobile Navigation Component", () => {

    vi.mock("../hooks/useLogout", () => ({
        useLogout: () => ({
            logout: mockLogout,
        }),
    }));

    it("check if MobileNavigation renders when the screen is mobile size", () => {
        window.innerWidth = mobileWidth;

        render(
            <HeaderWrapper><Navigation /></HeaderWrapper>
        )

        expect(screen.getByTestId("MobileNavigation"));

    })

    it("renders the username when a user is logged in", () => {
        window.innerWidth = mobileWidth;

        render(
            <HeaderWrapper>
                <Navigation user={mockUser} />
            </HeaderWrapper>
        );
        expect(screen.getByTestId("MobileNavigation"));
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
        expect(screen.getByText("Log out")).toBeInTheDocument();
    });
    it("renders 'GUEST' when a guest user is logged in", () => {
        window.innerWidth = mobileWidth;

        render(
            <HeaderWrapper>
                <Navigation user={mockGuest} />
            </HeaderWrapper>
        );
        expect(screen.getByTestId("MobileNavigation"));
        expect(screen.getByText("Guest")).toBeInTheDocument();
        expect(screen.getByText("Log out")).toBeInTheDocument();
    });

    it("renders admin panel button when an admin is logged in", () => {
        window.innerWidth = mobileWidth;

        render(
            <HeaderWrapper>
                <Navigation user={mockAdmin} />
            </HeaderWrapper>
        );
        expect(screen.getByTestId("MobileNavigation"));
        expect(screen.getByText(mockAdmin.email)).toBeInTheDocument();
        expect(screen.getByText("Admin Panel")).toBeInTheDocument();
    });

    it("calls logout function when logout button is clicked", () => {
        window.innerWidth = mobileWidth;
        const mockLogout = vi.fn();

        render(
            <HeaderWrapper>
                <Navigation user={mockUser} logout={mockLogout} />
            </HeaderWrapper>
        );
        expect(screen.getByTestId("MobileNavigation"));

        const logoutButton = screen.getByText(/Log out/i);
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalled();
    });
});


