# 🧾 ENVOYCE

A modern, minimal, and customizable invoice generator built with **React**. Envoyce allows users to add items, calculate taxes and discounts, and generate print-ready invoices — all from a clean and responsive UI.

<img width="1731" height="878" alt="Screenshot 2025-07-25 at 10 48 07 PM" src="https://github.com/user-attachments/assets/bbc0e952-3228-4b80-aed2-ac761ca38247" />


<img width="1760" height="982" alt="Screenshot 2025-07-25 at 10 55 06 PM" src="https://github.com/user-attachments/assets/32b5bf97-8a7c-4e1d-8009-cf9a5199406b" />




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
