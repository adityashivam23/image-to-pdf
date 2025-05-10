document.getElementById('imageUpload').addEventListener('change', function (e) {
    const files = e.target.files;
    const pdf = new jspdf.jsPDF();
    let count = 0;

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const width = pdf.internal.pageSize.getWidth();
                const height = (img.height * width) / img.width;
                if (index !== 0) pdf.addPage();
                pdf.addImage(img, 'JPEG', 0, 0, width, height);
                count++;
                if (count === files.length) {
                    pdf.save('images-to-pdf.pdf');
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
});
