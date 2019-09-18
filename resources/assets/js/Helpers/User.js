import Token from "./Token"
import AppStorage from "./AppStorage"

class User {

    login(data) {
        axios.post('api/auth/login', data)
            .then(response => {
                this.responseAfterLogin(response);
            })
            .catch(error => console.log(error.response.data))
    }

    responseAfterLogin(response) {
        const username = response.data.user;
        const access_token = response.data.access_token;

        if (Token.isValid(access_token)) {
            AppStorage.store(access_token, username);
            window.location = '/forum';
        }
    }

    hasToken() {
        const token = AppStorage.getToken();
        if (token) {
            return Token.isValid(token) ? true : false;
        }
        return false;
    }

    loggedIn() {
        return this.hasToken();
    }

    logout() {
        AppStorage.clear();
        window.location = '/forum';
    }

    name() {
        if (this.loggedIn()) {
            return AppStorage.getUser();
        }
    }

    id() {
        if (this.loggedIn()) {
            const payload = Token.payload(AppStorage.getToken());
            return payload.sub;
        }
    }

}

export default User = new User();