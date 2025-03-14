document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const dropArea = document.getElementById("drop-area");
    const form = document.getElementById("ticket-form");
    const ticketData = JSON.parse(localStorage.getItem("ticketData"));

    if (!fileInput || !dropArea || !form) {
        return; // Exit if elements are not found
    }

    const uploadImage = document.getElementById("upload-image");

    let formData = {};

    // Trigger file input on clicking the upload box
    dropArea.addEventListener("click", function () {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 500 * 1024) { // 500KB limit
                alert("File size must be less than 500KB!");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                formData.image = e.target.result;
                uploadImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        formData.name = document.getElementById("full-name").value;
        formData.email = document.getElementById("email").value;
        formData.github = document.getElementById("github").value;

        // Store data in localStorage
        localStorage.setItem("ticketData", JSON.stringify(formData));

        // Redirect to ticket page
        window.location.href = "ticket.html";
    });

    if (ticketData) {
        document.getElementById("display-name").textContent = ticketData.name;
        document.getElementById("display-email").textContent = ticketData.email;
        document.getElementById("display-github").textContent = ticketData.github;

        if (ticketData.image) {
            document.getElementById("display-image").src = ticketData.image;
        }
    }

});
