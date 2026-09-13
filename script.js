const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numberCheckbox = document.getElementById("numbers");
const symbolCheckbox = document.getElementById("symbols");

const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");

const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");


// Character Sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_+=;:,<>.?/|{}[]";


// Display password length
lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value;
});


// Generate button
generateButton.addEventListener("click", makePassword);


// Generate Password
function makePassword() {

    const length = Number(lengthSlider.value);

    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numberCheckbox.checked;
    const includeSymbols = symbolCheckbox.checked;


    // Check if at least one character type is selected
    if (
        !includeUppercase &&
        !includeLowercase &&
        !includeNumbers &&
        !includeSymbols
    ) {
        alert("Please select at least one character type.");
        return;
    }


    // Create password
    const newPassword = createRandomPassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
    );


    // Display password
    passwordInput.value = newPassword;


    // Update strength meter
    updateStrengthMeter(newPassword);
}


// Update Password Strength
function updateStrengthMeter(password) {

    const passwordLength = password.length;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()\-_=+;:,<>.?/|{}\[\]]/.test(password);


    let strengthScore = 0;


    // Length score
    strengthScore += Math.min(passwordLength * 2, 40);


    // Character type scores
    if (hasUppercase) {
        strengthScore += 15;
    }

    if (hasLowercase) {
        strengthScore += 15;
    }

    if (hasNumbers) {
        strengthScore += 15;
    }

    if (hasSymbols) {
        strengthScore += 15;
    }


    // Short passwords cannot be strong
    if (passwordLength < 8) {
        strengthScore = Math.min(strengthScore, 40);
    }


    // Keep score between 5 and 100
    const safeScore = Math.max(
        5,
        Math.min(100, strengthScore)
    );


    // Update progress bar
    strengthBar.style.width = safeScore + "%";


    let strengthLabelText = "";
    let barColor = "";


    // Weak
    if (strengthScore < 40) {

        barColor = "#fc8181";
        strengthLabelText = "Weak";

    }

    // Medium
    else if (strengthScore < 70) {

        barColor = "#fbd38d";
        strengthLabelText = "Medium";

    }

    // Strong
    else {

        barColor = "#68d391";
        strengthLabelText = "Strong";

    }


    // Update strength bar
    strengthBar.style.backgroundColor = barColor;

    // Update label
    strengthLabel.textContent = strengthLabelText;
}


// Create Random Password
function createRandomPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
) {

    let allCharacters = "";


    if (includeUppercase) {
        allCharacters += uppercaseLetters;
    }

    if (includeLowercase) {
        allCharacters += lowercaseLetters;
    }

    if (includeNumbers) {
        allCharacters += numberCharacters;
    }

    if (includeSymbols) {
        allCharacters += symbolCharacters;
    }


    let password = "";


    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(
            Math.random() * allCharacters.length
        );

        password += allCharacters[randomIndex];
    }


    return password;
}


// Generate password when page loads
window.addEventListener("DOMContentLoaded", () => {

    lengthDisplay.textContent = lengthSlider.value;

    makePassword();

});


// Copy Password
copyButton.addEventListener("click", () => {

    if (!passwordInput.value) {
        return;
    }


    navigator.clipboard
        .writeText(passwordInput.value)

        .then(() => {
            showCopySuccess();
        })

        .catch((error) => {
            console.log("Could not copy:", error);
        });

});


// Show Copy Success
function showCopySuccess() {

    copyButton.classList.remove("far", "fa-copy");

    copyButton.classList.add("fas", "fa-copy");

    copyButton.style.color = "#48bb78";


    setTimeout(() => {

        copyButton.classList.remove("fas", "fa-copy");

        copyButton.classList.add("far", "fa-copy");

        copyButton.style.color = "";

    }, 1500);
}