import { action, observable, runInAction, makeObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import fetchAuth from "../../middleware/requests";

enableStaticRendering(typeof window === 'undefined')

export default class MOBXuser {
    user = {};
    isAuth = false;

    constructor() {
        makeObservable(this, {
            user: observable,
            isAuth: observable,
            setAuth: action,
            setUser: action,
            login: action,
            registration: action,
            logout: action,
            checkAuth: action,
            startRefreshAuth: action,
            stopRefreshAuth: action,
            hydrate: action
        })
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(email, password) {
        try {

            const responce = await fetchAuth('/authorization/login', { email, password });
            localStorage.setItem('token', responce.accessToken);
            this.setAuth(true);
            this.setUser(responce.user);
            this.startRefreshAuth();

        } catch (error) {

            this.setAuth(false);
            this.setUser({});

            throw error;
        }
    }

    async registration(login, email, password) {
        try {

            const responce = await fetchAuth('/authorization/registration', { login, email, password });
            localStorage.setItem('token', responce.accessToken);
            this.setAuth(true);
            this.setUser(responce.user);
            this.startRefreshAuth();

        } catch (error) {

            this.setAuth(false);
            this.setUser({});

            throw error;

        }
    }

    async logout() {
        try {

            await fetchAuth('/authorization/logout');
            localStorage.removeItem('token');
            this.stopRefreshAuth();

        } catch (error) {

            console.log(error);

        } finally {

            this.setAuth(false);
            this.setUser({});

        }
    }

    checkAuth() {

        return new Promise(async(resolve, reject) => {

            try {
            
                const responce = await fetchAuth('/authorization/refresh');
                localStorage.setItem('token', responce.accessToken);
                this.setAuth(true);
                this.setUser(responce.user);
                this.startRefreshAuth();
                resolve();

            } catch (error) {
                // console.log(error);
                this.setAuth(false);
                this.setUser({});
                reject(error);
    
            }

        })
        
    }

    startRefreshAuth = () => {
        this.timer = setInterval(async() => {
            runInAction(async() => {
                try {

                    const responce = await fetchAuth('/authorization/refresh');
                    localStorage.setItem('token', responce.accessToken);
                    this.setAuth(true);
                    this.setUser(responce.user);

                } catch (error) {

                    this.setAuth(false);
                    this.setUser({});

                }
            })
        }, 60000)
    }

    stopRefreshAuth = () => clearInterval(this.timer)

    hydrate = (data) => {
        if (!data) return

        //   this.lastUpdate = data.lastUpdate !== null ? data.lastUpdate : Date.now()
        //   this.light = !!data.light
    }
}