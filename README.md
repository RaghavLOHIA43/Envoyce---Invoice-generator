# 🧾 ENVOYCE

A modern, minimal, and customizable invoice generator built with **React**. Envoyce allows users to add items, calculate taxes and discounts, and generate print-ready invoices — all from a clean and responsive UI.

<p align="center">
  <img src="./Screenshot%202025-07-25%20at%2010.48.07%E2%80%AFPM.png" alt="Invoice Preview 1" width="45%" style="margin-right: 10px;" />
  <img src="./Screenshot%202025-07-25%20at%2010.55.06%E2%80%AFPM.png" alt="Invoice Preview 2" width="45%" />
</p>

---

## 🚀 Features

- Add and remove multiple line items dynamically  
- Auto calculation of:
  - Subtotal  
  - Tax (percentage-based)  
  - Discount (percentage-based)  
  - Final total  
- Input fields for customer and cashier  
- Invoice number management  
- Download invoice as **PDF**  
- Clean, modern UI with responsive layout  

---

## 🎨 Color Palette

| Element          | Color        | Hex Code   |
|------------------|--------------|------------|
| Primary Accent   | Purple       | `#a100ff`  |
| Button Hover     | Light Purple | `#e6ccff`  |
| Text + Icons     | Dark Gray    | `#333333`  |
| Background       | Light Gray   | `#f4f4f4`  |
| Invoice Card     | White        | `#ffffff`  |

---

## 🛠️ Tech Stack

- **React.js** (Vite)
- **Tailwind CSS**
- **html2canvas** & **jsPDF**
- **UUID** for invoice number

---

## 📁 Folder Structure

```
src/
│
├── components/         // Reusable components like ItemRow, InvoiceModal etc.
├── hooks/              // Custom hooks if any
├── utils/              // Utility functions
├── App.jsx             // Main application
└── main.jsx            // React DOM mount
```

---

## 📦 Installation

```bash
git clone https://github.com/your-username/envoyce.git
cd envoyce
npm install
npm run dev
```

---

## ✨ Future Improvements

- Dark mode toggle  
- Local storage persistence  
- Export to Excel/CSV  
- Invoice history dashboard  

---

## 📄 License

MIT License © 2025

---

## 🙏 Acknowledgements

Thanks to all open-source tools and libraries that made this build possible.
