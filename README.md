# QR Code Generator Web App

This project is a React web application that allows you to generate QR codes **without using any external QR code packages**. The QR code generation logic is fully self-implemented.

## Features

- Enter any text or URL
- Generate a QR code directly in the browser
- No 3rd-party QR code libraries

## Installation

```bash
git clone https://github.com/Stiwyy/qr-code.git
cd rq-code
npm install
npm run dev
```

## Usage

1. Start the app with `npm run dev`.
2. Enter your desired text or URL into the input field.
3. Click **Generate QR Code**.
4. The QR code will be displayed and can be scanned.

## Technology

- React
- Custom implementation of QR code algorithm (generates the matrix and visualizes it using SVG/Canvas)

## License

This project is licensed under the MIT License.

---

**Note:**  
The QR code generation is self-written and intended for educational purposes. For production use, you should rely on established libraries to ensure full compatibility and security.
