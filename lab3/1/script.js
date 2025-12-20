function validateForm() {

    let Username = document.getElementById("Username").value;
    if (Username.length < 5) {
        alert("Username length must be at least 5 characters.");
        return false;
    }

    let Email = document.getElementById("Email");
    if (!Email.checkValidity()) {
        alert("Email is invalid. Check individual fields.");
        return false;
    }

    function isValidPhoneNumber(Phone) {
        if (!(!Phone.includes("  ") && !Phone.includes("--") && !Phone.includes(" -") && !Phone.includes("- "))) {
            return false;
        }
        // Check if Phone contains hyphens or spaces
        if (/[\s-]/.test(Phone)) {
            // Check if Phone starts or ends with a space or hyphen
            if (/^[\s-]|[\s-]$/.test(Phone)) {
                return false;
            }
        }
        // Normalize Phone number: Remove spaces and hyphens
        Phone = Phone.replace(/[\s-]/g, '');
        // Check if Phone number is exactly 10 digits
        const regex = /^\d{10}$/;
        return regex.test(Phone);
    }
    let Phone = document.getElementById("Phone").value
    if (!isValidPhoneNumber(Phone)) {
        alert("Phone Number is invalid. Check individual fields.");
        return false;
    }

    function isValidPassword(Password) {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passRegex.test(Password);
    }
    let Password = document.getElementById("Password").value
    if (!isValidPassword(Password)) {
        alert("Password must be at least 8 characters with 1 lowercase, 1 uppercase, 1 digit, and 1 special character.");
        return false;
    }

    let Confirm = document.getElementById("ConfirmPassword").value
    if (Confirm != Password) {
        alert("Passwords do not match.");
        return false;
    }
}

