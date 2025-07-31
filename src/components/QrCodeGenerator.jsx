import React, {useState} from "react";

function QrCodeGenerator() {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleGenerateClick = () => {

    }

    return (
        <div>
            <form className="qr-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="qr-input">Enter text or URL:</label>
                <input
                    id="qr-input"
                    type="text"
                    name="qrInput"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                />
                <button
                    type="button"
                    onClick={handleGenerateClick}
                >
                    Generate QR Code
                </button>
            </form>
            <div id="qr-code-display">
                {/* QR code will be rendered here */}
            </div>
        </div>
    );
}

export default QrCodeGenerator;