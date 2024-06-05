1. Generate a private_key

openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

2. Generate a public_key

openssl rsa -pubout -in private_key.pem -out public_key.pem

3. Convert both into base64

base64 -i private_key.pem -o private_key_base.txt
base64 -i public_key.pem -o public_key_base.txt

4. Copy both file contents into the variables