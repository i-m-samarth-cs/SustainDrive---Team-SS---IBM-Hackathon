const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // or use 'node-fetch' version 3 (ESM) if necessary

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Hello, world! Your server is running!');
});

// Signup route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const response = await fetch(
            'https://27c5d0de-f860-4c60-b019-b48f6852f347-bluemix.cloudantnosqldb.appdomain.cloud/registration',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from('apikey-v2-27k5iiskxgapgk06s2c67tszhnb6wmlzjlttixfzr48u:a77beea7baf9f261674a84ddac96bb53').toString('base64'),
                },
                body: JSON.stringify({ name, email, password }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            res.json({ success: true, message: 'Signup successful', data });
        } else {
            res.status(response.status).json({ success: false, message: 'Error during signup' });
        }
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Error during signup');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await fetch(
            'https://27c5d0de-f860-4c60-b019-b48f6852f347-bluemix.cloudantnosqldb.appdomain.cloud/registration/_find',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from('apikey-v2-27k5iiskxgapgk06s2c67tszhnb6wmlzjlttixfzr48u:a77beea7baf9f261674a84ddac96bb53').toString('base64'),
                },
                body: JSON.stringify({
                    selector: { email, password },
                }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            if (data.docs && data.docs.length > 0) {
                res.json({ success: true, message: 'Login successful', user: data.docs[0] });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            res.status(response.status).json({ success: false, message: 'Error during login' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
