# Big Things To Plan For #

-  [ ] Let's Encrypt TLS/SSL support
-  [ ] Learn how to deploy app containers to Heroku.
-  [ ] Learn how to deploy app containers to AWS.


```console

	$ openssl req -nodes -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
	$ openssl genrsa -out key.pem \2048
	$ openssl req -nodes -new -key key.pem -out csr.pem -subj "/C=US/ST=California/L=Oakland/O=Node-Core/OU=Node-Core-App/CN=localhost"
	$ openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```

```javascript

	var fs = require('fs'),
		https = require('https'),
		express = require('express'),
		app = express();

	https.createServer({
		key: fs.readFileSync('key.pem'),
		cert: fs.readFileSync('cert.pem'),
		passphrase: <passphraseusedwhilecreatingcertificate> /* only if key file has password */
	}, app).listen(55555);

	app.get('/', function (req, res) {
		res.header('Content-type', 'text/html');
		return res.end('<h1>Hello, Secure World!</h1>');
	});

```
