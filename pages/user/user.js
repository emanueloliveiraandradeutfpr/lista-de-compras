import { User } from '/lista-de-compras/model/user.js';
import { Gender } from '/lista-de-compras/model/gender.js';
import { UserService } from '/lista-de-compras/service/user.service.js';

function userInit() {
    const userId = localStorage.getItem('id');
    let userService = new UserService();
    userService.getUser(userId).then(
        (response) => {
            console.log(response);
            document.getElementById('input-name').value = response.name;
            document.getElementById('email').value = response.email;
            document.getElementById('input-password').value;
            document.getElementById('repassword').value;
            document.querySelector('#input-gender').value =
                response.genre == Gender.MALE ? 'male' : 'female';
        },
        (error) => {
            console.error('Erro:', error);
            let msg = String(error).split('  ');
            alertify.error(msg[0]);
            alertify.error('Try again later');
        },
    );
}

function manageSubmitButton() {
    const form = document.querySelector('#sign-form');
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    form.addEventListener('input', () => {
        if (form.checkValidity()) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    });
}

function editSubmitHandler() {
    document.getElementById('sign-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('input-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('input-password').value;
        const repassword = document.getElementById('repassword').value;
        const gender =
            document.querySelector('#input-gender').value === 'male'
                ? Gender.MALE
                : Gender.FEMALE;

        //validação manual dentro do onSubmit - segunda fase de validação

        if (password != repassword) {
            document
                .getElementById('input-password')
                .setCustomValidity('A senha está inválida.');
            alertify.error('As senhas não correspondem. Por favor digite novamente.');
            return;
        } else {
            document.getElementById('input-password').setCustomValidity('');
        }

        //cadastra o paciente com os dados validados
        const user = new User(name, email, password, gender);
        const userId = localStorage.getItem('id');
        let userService = new UserService();
        userService.patchUser(user, userId).then(
            (data) => {
                console.log('Successo:', data);
                alertify.success('Usuário cadastrado com sucesso!');
            },
            (error) => {
                console.error('Erro:', error);
                alertify.error('Erro ao cadastrar usuário.');
                let msg = String(error).split('  ');
                alertify.error(msg[0]);
                alertify.error('Try again later');
            },
        );
    });
}

document.addEventListener('DOMContentLoaded', function () {
    //Cadastra evento de gerenciar o estado do botão de enviar
    manageSubmitButton();
    // Inicia o formulario com as informações do usuario
    userInit();
    //registra o evento de onsubmit
    editSubmitHandler();
});
