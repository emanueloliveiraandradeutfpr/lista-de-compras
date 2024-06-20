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
            $('#camera').show();
        },
    );

    // logica do codigo de barras
    let token = 'g7oRjF9hCbu5YdQ1R5HO-g';
    Quagga.onDetected((data) => {
        //let test = data.codeResult.code;
        let test = 7891150064331;
        Quagga.stop();
        $('#camera').hide();
        postData();
        async function postData(
            // url = `https://api.cosmos.bluesoft.com.br/gtins/${test}.json`,
            url = `https://api.cosmos.bluesoft.com.br//products?query=${test}`,
            data = {},
        ) {
            // Default options are marked with *
            const req = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Cosmos-Token': token,
                    'User-Agent': 'Cosmos-API-Request',
                },
            });
            let aux = await req.json();
            $('#response').html(aux);
            console.log(aux);
        }
    });
}
