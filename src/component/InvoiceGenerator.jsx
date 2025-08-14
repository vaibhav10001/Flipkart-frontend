// InvoiceGenerator.jsx
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Helper to wait for all images to load before capturing
const waitForImagesToLoad = async (element) => {

    const images = element.querySelectorAll('img');
    await Promise.all(
        Array.from(images).map((img) =>
            img.complete
                ? Promise.resolve()
                : new Promise((resolve) => {
                    img.onload = img.onerror = resolve;
                })
        )
    );
};

const InvoiceGenerator = forwardRef(({ data }, ref) => {
    const invoiceRef = useRef();

    useImperativeHandle(ref, () => ({
        downloadPDF: async () => {
            const element = invoiceRef.current;

            await waitForImagesToLoad(element); // 🛠️ Important

            const canvas = await html2canvas(element, {
                scale: 1.5, // or even 1
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
            pdf.save(`Invoice_${data.OrderId}.pdf`);
        },
    }));
    const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ dynamic from .env
    return (
        <div ref={invoiceRef} style={{ position: 'absolute', left: '-9999px', top: '0' }}>
            <div className="bg-white p-6 w-[600px] mx-auto text-[14px]">
                <p><img src={`${baseURL}/static/flipkart-icon.png`} alt="" style={{ width: '60px', height: 'auto' }} /></p>
                <h1 className="text-xl font-bold mb-2">Invoice</h1>
                <hr className="mb-4" />

                <p><strong>Order ID:</strong> {data.OrderId}</p>
                <p><strong>Customer:</strong> {data.Address.Name}</p>
                <p><strong>Address:</strong> {data.Address.Address}</p>
                <p><strong>Phone:</strong> {data.Address.Phone_number}</p>
                <hr className="my-4" />
                <p><strong>Product:</strong> {data.ProductData.productName}</p>
                <p><strong>Quantity:</strong> {data.ProductData.quantity}</p>
                <p><strong>Price:</strong> ${data.ProductData.price}</p>
                <p><strong>Delivery Fee:</strong> ${data.DeliveryCharge}</p>
                <p><strong>Handling Charge:</strong> ${data.CashHandlingCharge}</p>
                <p><strong>Tax:</strong> ${data.Tax}</p>
                <hr className="my-4" />
                <p className="text-lg font-semibold">Total Amount: ${data.TotalAmount}</p>
                <p><strong>Order Status:</strong> {data.OrderStatus}</p>
                <p><strong>Delivered Date:</strong> {data.DeliveredDate.date} {data.DeliveredDate.month} {data.DeliveredDate.year}</p>
            </div>
        </div>
    );
});

export default InvoiceGenerator;
