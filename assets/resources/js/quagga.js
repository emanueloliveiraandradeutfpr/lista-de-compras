$('#barcode').on('click', iniciarLeitor);
function iniciarLeitor() {
    // iniciar camera
    Quagga.init(
        {
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector('#camera'), // Or '#yourElement' (optional)
            },
            decoder: {
                readers: ['ean_reader'],
                locate: true,
                multiple: false,
            },
        },
        function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Initialization finished. Ready to start');
            Quagga.start();
            $('#camera').show().addClass('center');
        },
    );

    // logica do codigo de barras
    Quagga.onDetected((data) => {
        Quagga.stop();
        $('#camera').html('');
        let id = data.codeResult.code;
        localStorage.setItem('searchKey', id);
        window.location.href = '/lista-de-compras/pages/result/result.html';
    });
}
