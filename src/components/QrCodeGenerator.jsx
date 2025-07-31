import React from "react";

function QrCodeGenerator() {
    return (
        <div>
            <form>
                <label htmlFor="qr-input">Enter text or URL:</label>
                <input id="qr-input" type="text" name="qrInput" />
                <button type="button">Generate QR Code</button>
            </form>
            <div id="qr-code-display">
                {/* QR code will be rendered here */}
            </div>
        </div>
    );
}

export default QrCodeGenerator;