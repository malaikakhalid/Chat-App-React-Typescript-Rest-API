export interface ILogin{
    username: string,
    password: string
}


export interface IRegister{
    username: string,
    password: string,
    email:string,
    fullname:string
}


export interface ISessionStorage{
    token : string,
    exoiration : string ;
    // saveToken()
}

export interface IChat{
    chatId: number,
    text: string,
    name: string
}

export interface IAddMessage  {

    name: string,
    text: string,
    chatId: string | undefined
   }

  export interface ChildProps{
    id: string | undefined, 
   
  }


 export interface IMessages {
    name: string,
    messages: [{
        name: string,
        text: string,
        timestamp: string
    }]
}


export interface IRoom{
    id: number,
    name: string
}

export interface IPersonal{
    id: string,
    userName: string
}