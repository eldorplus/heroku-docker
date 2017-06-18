# Notes on Helmet-related Header Security #

## HTTP Public Key Pinning (HPKP) ##


```console
openssl x509 -pubkey < <your-tls>.crt | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64
```
