const express = require('express');
const app = express();
const PORT = 3001; // Porta para o backend

app.use(express.json()); // Para entender JSON nas requisições

// Rota de exemplo para login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Tentativa de login com email: ${email}`);

    // AQUI VIRIA A LÓGICA DE VERDADE:
    // 1. Buscar o usuário com este email no banco de dados.
    // 2. Comparar a senha enviada com a senha criptografada no banco usando bcrypt.
    // 3. Se tudo estiver certo, gerar um token JWT e enviá-lo de volta.

    // Resposta de exemplo
    if (email === 'teste@teste.com' && password === '123') {
        res.json({ success: true, message: 'Login bem-sucedido!', token: 'exemplo_de_token_jwt' });
    } else {
        res.status(401).json({ success: false, message: 'Email ou senha inválidos.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});