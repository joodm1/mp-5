import "./globals.css"; // Ensure this exists or remove if unnecessary
import { ReactNode } from "react";

export const metadata = {
    title: "URL Shortener",
    description: "Create and manage shortened URLs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
