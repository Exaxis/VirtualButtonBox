import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'src/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private es: ElectronService){
    
  }

  ngOnInit(): void {
    //this.es.initializeController();
  }
  title = 'Virtual Button Box';

  sliderValue = 0;

  

  updateSliderValue = (value: string) => {
    let valueNumber = Number(value);
    this.es.setAxis(valueNumber);
    console.log(valueNumber);
  }

  onButtonClick = () => {

  }


}
