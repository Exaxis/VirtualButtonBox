import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor() { }

  initializeController(){
    console.log("About to initialize controller");
    window.api.electronIpcSend("controller-init");
    console.log("controller initialized");
  }

  setAxis(value: number){
    console.log('setAxis');
    window.api.electronIpcSend("update-axis", value);
  }
}
