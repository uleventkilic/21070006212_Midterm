document.addEventListener("DOMContentLoaded", function () {
    const mockApiUrl = "https://run.mocky.io/v3/14761f05-696b-4270-b6f7-949133a2ebb0";

    fetch(mockApiUrl)
        .then((response) => response.json())
        .then((data) => {
            const areaCodeSelect = document.querySelector("#areaCode");
            const companySelect = document.querySelector("#company");
            const subjectSelect = document.querySelector("#subject");

            data.areaCodes.forEach((code) => {
                const option = document.createElement("option");
                option.value = code;
                option.textContent = code;
                areaCodeSelect.appendChild(option);
            });

            data.companies.forEach((company) => {
                const option = document.createElement("option");
                option.value = company;
                option.textContent = company;
                companySelect.appendChild(option);
            });

            data.subjects.forEach((subject) => {
                const option = document.createElement("option");
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        });

    const form = document.querySelector("#registrationForm");
    const phoneInput = document.querySelector("#phoneNumber");
    const areaCodeSelect = document.querySelector("#areaCode");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const selectedAreaCode = areaCodeSelect.value.trim();
        const phoneValue = phoneInput.value.trim();

        const phoneRegex = /^\d{7}$/;
        let isValid = true;

        if (!selectedAreaCode) {
            areaCodeSelect.setCustomValidity("Please select an area code.");
            areaCodeSelect.reportValidity();
            isValid = false;
        } else {
            areaCodeSelect.setCustomValidity("");
        }

        if (!phoneValue) {
            phoneInput.setCustomValidity("Please fill out this field.");
            phoneInput.reportValidity();
            isValid = false;
        } else if (!phoneRegex.test(phoneValue)) {
            phoneInput.setCustomValidity("Please enter a valid phone number (7 digits).");
            phoneInput.reportValidity();
            isValid = false;
        } else {
            phoneInput.setCustomValidity("");
        }

        if (isValid) {
            window.location.href = "form-submitted.html";
        }
    });

    phoneInput.addEventListener("input", function () {
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^\d{7}$/;

        if (phoneValue && phoneRegex.test(phoneValue)) {
            phoneInput.setCustomValidity("");
        }
    });

    areaCodeSelect.addEventListener("change", function () {
        if (areaCodeSelect.value.trim()) {
            areaCodeSelect.setCustomValidity("");
        }
    });

    const closeAd = (adId) => {
        const adElement = document.getElementById(adId);
        if (adElement) {
            adElement.style.display = "none";
        }
    };

    const leftAdButton = document.querySelector("#leftAd .close-ad");
    const rightAdButton = document.querySelector("#rightAd .close-ad");

    if (leftAdButton) {
        leftAdButton.addEventListener("click", () => closeAd("leftAd"));
    }

    if (rightAdButton) {
        rightAdButton.addEventListener("click", () => closeAd("rightAd"));
    }
});
