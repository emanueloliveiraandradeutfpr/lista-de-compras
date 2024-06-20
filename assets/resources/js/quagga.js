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
            },
            multiple: false,
        },
        function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Initialization finished. Ready to start');
            Quagga.start();
        },
    );

    // logica do codigo de barras
    let token = 'FZuLNEaq-XQGuNKG3i7sMg';
    Quagga.onDetected((data) => {
        //let test = data.codeResult.code;
        let test = 7891150064331;
        Quagga.stop();
        postData();
        async function postData(
            url = `https://api.cosmos.bluesoft.com.br/gtins/${test}.json`,
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
            console.log(aux);
        }
    });
}
