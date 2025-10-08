curl http://localhost:3000/api/quest/all-instances

curl -i -c cookies.txt -X POST http://localhost:3000/api/user/login -H "Content-Type: application/json" -d '{"email": "rafael@email.com","password":'123'}'

curl -b cookies.txt http://localhost:3000/api/quest/my 