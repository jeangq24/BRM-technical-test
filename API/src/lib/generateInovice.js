const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const generateInvoice = (createdSale, saleWithProducts, total) => {

    const pdfFileName = `invoice_${createdSale.id}.pdf`;
    const pdfPath = path.join(__dirname, '..', 'invoices', pdfFileName);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(18).text('Factura', { align: 'center' });
    doc.text(`Numero de factura: ${createdSale.id}`);
    doc.moveDown();

    for (let index = 0; index < saleWithProducts.Products.length; index++) {
        const product = saleWithProducts.Products[index];
        const { name, price, SaleProduct: { amount } } = product;
        const subtotal = price * amount;
        doc.text(`Producto: ${index + 1}: ${name}, Precio: $${price}`);
        doc.moveDown();
    };

    doc.fontSize(16).text(`Total: $${total}`, { align: 'right' });
    doc.end();
};

module.exports = {
    generateInvoice
}

