import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root",
  })
  export class BaseService 
  {
    readonly port = ":8080";

    readonly localhost = "http://localhost"+this.port;
    readonly localNetwokHost = "http://192.168.0.16"+this.port;
    //grok host is used for tunneling (for example you expose your local dev machine to the internet)
    readonly grokHost = "https://f030-2a05-4f46-130c-cc00-1377-733a-356c-3ec6.ngrok-free.app"; 
    
    readonly host = this.localhost; //use at pleasure localhost/networkhost/production etc...

    readonly backendServerName = "/bootboard"
    readonly apiVersion = "/api/v1"

    readonly apiBaseUrl = this.host + this.backendServerName + this.apiVersion;    
  }  