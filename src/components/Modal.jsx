import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const Modal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
}) => {
  const closeModal = () => setIsOpen(false);

  const addNextInvoiceHandler = () => {
    closeModal();
    onAddNextInvoice();
  };

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById('print');
    if (!dom) {
      console.error('Print element not found');
      return;
    }

    toPng(dom)
      .then((dataUrl) => {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'in',
          format: [5.5, 8.5],
        });

        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeModal}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div id="print" className="space-y-4">
                  <Dialog.Title className="text-center text-2xl font-bold">
                    INVOICE
                  </Dialog.Title>
                  
                  {/* Invoice Info */}
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-bold">Invoice Number:</span>
                    <span>{invoiceInfo.invoiceNumber}</span>
                    <span className="font-bold">Cashier:</span>
                    <span>{invoiceInfo.cashierName}</span>
                    <span className="font-bold">Customer:</span>
                    <span>{invoiceInfo.customerName}</span>
                  </div>

                  {/* Items Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left">ITEM</th>
                          <th className="text-center">QTY</th>
                          <th className="text-right">PRICE</th>
                          <th className="text-right">TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td className="text-center">{item.qty}</td>
                            <td className="text-right">₹{Number(item.price).toFixed(2)}</td>
                            <td className="text-right">₹{(item.price * item.qty).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${invoiceInfo.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span>₹{invoiceInfo.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>₹{invoiceInfo.discountRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₹{invoiceInfo.total % 1 === 0 ? invoiceInfo.total : invoiceInfo.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={SaveAsPDFHandler}
                    className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Download As PDF</span>
          <span class="relative invisible">Download As PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={addNextInvoiceHandler}
                    className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group flex-1">
                    <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="absolute flex items-center justify-center w-full h-full text-black  transition-all duration-300 transform group-hover:translate-x-full ease">Next Invoice</span>
                    <span class="relative invisible">Next Invoice</span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;