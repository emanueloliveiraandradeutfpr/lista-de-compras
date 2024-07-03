import { User } from '/lista-de-compras/model/user.js';
import { Gender } from '/lista-de-compras/model/gender.js';
import { UserService } from '/lista-de-compras/service/user.service.js';

function manageSubmitButton(toogleForm) {
    const form = document.querySelector(toogleForm);
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

function signSubmitHandler() {
    let userService = new UserService();
    document.getElementById('sign-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('input-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
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
        let user = new User(name, email, password, gender);

        userService.insertUserWithFetch(user).then(
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

function loginSubmitHandler() {
    let userService = new UserService();
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('input-email').value;
        const password = document.getElementById('input-password').value;

        userService.listUsers().then(
            (response) => {
                try {
                    response.forEach((element) => {
                        if (element.email === email) {
                            if (element.password === password) {
                                console.log('Successo:' + response);
                                localStorage.setItem('id', element.id);
                                alertify.success('Entrou com sucesso!');
                                setTimeout(
                                    (window.location.href =
                                        '/lista-de-compras/pages/my-list/my-list.html'),
                                    3000,
                                );
                            }
                        }
                    });
                    throw new ErrorEvent(
                        'Usuario não encontrado, verifique o usuario e a senha.',
                    );
                } catch (error) {
                    console.error('Erro:', error.type);
                    alertify.error(error.type);
                }
            },
            (error) => {
                console.error('Erro:', error);
                let msg = String(error).split('  ');
                alertify.error(msg[0]);
                alertify.error('Try again later');
            },
        );
    });
}
document.addEventListener('DOMContentLoaded', function () {
    //Cadastra evento de gerenciar o estado do botão de enviar
    manageSubmitButton('#login-form');

    //registra o evento de onsubmit
    signSubmitHandler();

    loginSubmitHandler();
    $('#sign-form').hide();
});

$('.toggle').on('click', () => {
    $('#login-form').toggle();
    $('#sign-form').toggle();
    manageSubmitButton('#sign-form');
});
