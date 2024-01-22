class User {
    static instance: any;
    userData: any = null;
    constructor() {
      if (!User.instance) {
        this.userData = null;
        User.instance = this;
      }
  
      return User.instance;
    }
  
    setUserData(userData:any) {
      this.userData = userData;
    }
  
    getUserData() {
      return this.userData;
    }
  }
  
  const user = new User();
  
  export default user;