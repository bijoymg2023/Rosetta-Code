document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const convertBtn = document.querySelector("button.bg-primary");
    const inputCode = document.querySelectorAll("textarea")[0];
    const outputCode = document.querySelectorAll("textarea")[1];
    const fromLanguage = document.querySelectorAll("select")[0];
    const toLanguage = document.querySelectorAll("select")[1];
    const fromLanguageIcon = document.getElementById("from-language-icon");
    const toLanguageIcon = document.getElementById("to-language-icon");
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    // Map of languages to their corresponding Font Awesome classes and colors
    const languageIcons = {
        Python: { class: "fab fa-python", color: "text-blue-500" },
        Java: { class: "fab fa-java", color: "text-yellow-500" },
    };

    // Function to update the icon based on the selected language
    function updateIcon(selectElement, iconElement) {
        const selectedLanguage = selectElement.value;
        const iconData = languageIcons[selectedLanguage];

        if (iconData) {
            iconElement.className = `${iconData.class} ${iconData.color}`;
        }
    }

    // Event listeners for language selection changes
    fromLanguage.addEventListener("change", () => updateIcon(fromLanguage, fromLanguageIcon));
    toLanguage.addEventListener("change", () => updateIcon(toLanguage, toLanguageIcon));

    // Function to call the backend API for code conversion
    async function convertCode(input, fromLang, toLang) {
        const apiUrl = "/api";
        const payload = { input, fromLang, toLang };

        try {
            console.log("Sending Payload:", payload);
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("Response from API:", data);

            return data?.convertedCode || "// Conversion failed. No response from the server.";
        } catch (error) {
            console.error("Error during conversion:", error);
            return "// Conversion failed due to an error.";
        }
    }

    // Event listener for the Convert button
    convertBtn.addEventListener("click", async () => {
        const input = inputCode.value.trim();
        const fromLang = fromLanguage.value;
        const toLang = toLanguage.value;

        if (!input) {
            outputCode.value = "// Please enter some code to convert.";
            return;
        }

        const originalText = convertBtn.innerHTML;
        convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Converting';
        convertBtn.disabled = true;

        outputCode.value = `// Converted from ${fromLang} to ${toLang}\n${await convertCode(input, fromLang, toLang)}`;

        convertBtn.innerHTML = originalText;
        convertBtn.disabled = false;
    });

    // Theme handling
    function setTheme(theme) {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            themeIcon.className = "fas fa-moon text-xl";
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            themeIcon.className = "fas fa-sun text-xl";
            localStorage.setItem("theme", "light");
        }
    }

    setTheme(localStorage.getItem("theme") || "light");

    themeToggle.addEventListener("click", () => {
        setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
    });
});
