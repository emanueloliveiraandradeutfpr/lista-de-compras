import postData from '/lista-de-compras/service/quagga.service.js';

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
        let id = data.codeResult.code;
        //let id = 7891150064331;
        Quagga.stop();
        $('#camera').html('');
        postData(id);
    });
}
