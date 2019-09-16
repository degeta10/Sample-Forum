class AppStorage {

    store(token, user) {
        this.storeToken(token);
        this.storeUser(user);
    }

    clear() {
        this.removeToken();
        this.removeUser();
    }

    storeToken(token) {
        localStorage.setItem('token', token);
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    storeUser(user) {
        localStorage.setItem('user', user);
    }

    removeUser() {
        localStorage.removeItem('user');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUser() {
        return localStorage.getItem('user');
    }


}

export default AppStorage = new AppStorage();