document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const dataToSend = {
        user: username,
        password: password
    }
 
    const base64Credentials = btoa(`${username}:${password}`);
    
    fetch('http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64Credentials}`
      },

     body: JSON.stringify(dataToSend)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao autenticar usuário');
      }
      return response.json();
    })  
    .then(responseData => {
      if (responseData.total === 1 && responseData.items && responseData.items.length > 0 && responseData.items[0].Erro === 0) {
        window.location.href = '/index.html';
      } else {
        throw new Error('Usuário ou senha incorretos');
      }
    })
    .catch(error => {
      alert(error.message);
      console.error('Erro ao efetuar login:', error);
    });
  });

/*document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
  
    // Aqui você pode fazer uma requisição GET para obter os dados do usuário a partir da API
    fetch(`http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetLogin=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Usuário não encontrado');
        }
        return response.json();
      })
      .then(user => {
        // Verifica se a senha está correta
        if (user.password === password) {
          // Redirecionar para a página principal após o login
          window.location.href = '/main.html'; // Substitua 'main.html' pelo caminho da sua página principal
        } else {
          throw new Error('Senha incorreta');
        }
      })
      .catch(error => {
        alert(error.message);
        console.error('Erro ao efetuar login:', error);
      });
  });/*

/*document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://api.example.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Usuário ou senha incorretos');
        }
        return response.json();
      })
      .then(data => {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);

        window.location.href = '/main.html'; // Substitua 'main.html' pelo caminho da sua página principal
      })
      .catch(error => {
        alert(error.message);
        console.error('Erro ao efetuar login:', error);
      });
  });/*

/*function login(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (username === 'usuario_correto' && password === 'senha_correta') {

        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);

        window.location.href = 'pagina_protegida.html';
    } else {
        const mensagemDiv = document.getElementById('mensagem');
        mensagemDiv.innerHTML = 'Usuario ou senha incorretos';
    }
}*/

/*document.getElementById('btnLogin').addEventListener('click', function() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
  
    if (!usuario || !senha) {
      alert('Por favor, preencha todos os campos');
      return;
    }
  
    fetch(`http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetLoginusuario=${usuario}&senha=${senha}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Usuário ou senha incorretos');
      }

      return response.json();
    })
    .then(data => {
      window.location.href = 'paginaPrincipal.html';
    })
    .catch(error => {
      alert(error.message);
      console.error('Erro ao efetuar login:', error);
    });
  });*/