export class Service {

    public async allUsers(){
        const request = await fetch('/users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const response = await request.json();

        return response;
    }

    public async createAccount(username: string, email: string ,password: string){
        const request = await fetch(`/createUser`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: username, email: email, password: password})
        });

        const response = await request.json();

        return response;
    }

    public async loginUser(email: string, password: string){
         const request = await fetch('/loginUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        });

        const response = await request.json();

        return response;
    }

}