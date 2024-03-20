import { useEffect } from "react";

const useDarkMode = () => {
  useEffect(() => {
    const updateTheme = () => {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      // if the browser is on dark mode
      if (prefersDarkMode) {
        document.body.classList.add("dark-mode");
        console.log("dark mode");
      } else {
        document.body.classList.remove("dark-mode");
        console.log("light mode");
      }
    };

    // Call it to set the initial theme
    updateTheme();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      // Listen for changes
      .addEventListener("change", updateTheme);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateTheme);
    };
  }, []);
};

export default useDarkMode;