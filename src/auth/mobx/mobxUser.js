import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import fetchAuth from "../../../middleware/requests";

enableStaticRendering(typeof window === 'undefined')

export default class MOBXUser{
    user = {};
    isAuth = false;

    constructor() {
      makeAutoObservable(this);
    }

    setAuth( bool ){
        this.isAuth = bool;
    }

    setUser( user ){
        this.user = user;
    }

    async login( email, password ){
        try {
            
            const responce = await fetchAuth('/authorization/login', { email, password });
            localStorage.setItem( 'token', responce.accessToken);
            this.setAuth( true );
            this.setUser( responce.user );

        } catch (error) {
            
            this.setAuth( false );
            this.setUser( {} );

            throw error;
        }
    }

    async registration( email, password ){
        try {

            const responce = await fetchAuth('/authorization/registration', { email, password });
            localStorage.setItem( 'token', responce.accessToken);
            this.setAuth( true );
            this.setUser( responce.user );
            
        } catch (error) {
            
            this.setAuth( false );
            this.setUser( {} );

            throw error;
            
        }
    }

    async logout(){
        try {

            await fetchAuth('/authorization/logout');
            localStorage.removeItem( 'token');
            
        } catch (error) {

            console.log(error);
            
        } finally{

            this.setAuth( false );
            this.setUser( {} );

        }
    }

    async checkAuth(){
        try {

            const responce = await fetchAuth('/authorization/refresh');
            localStorage.setItem( 'token', responce.accessToken);
            this.setAuth( true );
            this.setUser( responce.user );

            console.log(this.user);

        } catch (error) {

            this.setAuth( false );
            this.setUser( {} );

            console.log(error);
            
        }
    }

    hydrate = (data) => {
      if (!data) return
  
    //   this.lastUpdate = data.lastUpdate !== null ? data.lastUpdate : Date.now()
    //   this.light = !!data.light
    }
}