import React, { useState, useRef, useEffect } from "react";
import { generateQRCode, renderQRCodeToCanvas } from "../utils/qrCodeAlgorithm.js";

function QrCodeGenerator() {
    const [inputText, setInputText] = useState("");
    const [qrMatrix, setQrMatrix] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (qrMatrix) {
            renderQRCodeToCanvas(qrMatrix, canvasRef);
        }
    }, [qrMatrix]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleGenerateClick = () => {
        if (inputText.trim() === "") {
            alert("Please enter text or URL first");
            return;
        }

        const matrix = generateQRCode(inputText);
        setQrMatrix(matrix);
    };

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
                <canvas
                    ref={canvasRef}
                    style={{
                        display: qrMatrix ? 'block' : 'none',
                        margin: '20px auto',
                        border: '1px solid #ddd'
                    }}
                />
                {!qrMatrix && inputText.trim() === "" && (
                    <p>Enter text and click Generate to create a QR code</p>
                )}
            </div>
        </div>
    );
}

export default QrCodeGenerator;