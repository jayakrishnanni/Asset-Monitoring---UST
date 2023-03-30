import { Component, VERSION, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
assetForm: FormGroup;
assetFormArray: any[];
assetMonitorTable: any[];
  
  constructor(private fb: FormBuilder) {}
  assetTypes = ['Generator', 'Compressor', 'Fressor'];

  assetAttributes = [
    'Oil Temperature',
    'Device Temperature',
    'Pressure',
    'Fuel Level',
    'Oil Level',
  ];
  dataLoggerModel = ['DL100', 'DL200', 'DL300', 'DL400'];
  dataLoggerModelwithAnalogDigital = ['Analog: C1-C5', 'Digital: C6-C10','Analog: A1-A5', 'Digital: A6-A7','Analog: D1-D3', 'Digital: C6-C10','Analog: G11-G20', 'Digital: K1-K3'];

  ngOnInit(): void {
    
    this.assetFormArray = [];
    this.assetForm = new FormGroup({
      assetTypes: new FormControl ('Generator', Validators.required),
      assetAttributes: new FormControl ('Oil Temperature', Validators.required),
      dataLoggerModel: new FormControl ('DL100', Validators.required),
      dataLoggerModelwithAnalogDigital: new FormControl ('Analog: C1-C5', Validators.required),
    });
  }


  click(): void {
    this.assetFormArray.push(this.assetForm.value);
    this.assetMonitorTable = this.assetFormArray.filter((obj, index) => {
      return index === this.assetFormArray.findIndex(o => obj.assetAttributes === o.assetAttributes && obj.dataLoggerModelwithAnalogDigital === o.dataLoggerModelwithAnalogDigital);
    });
    console.log(this.assetFormArray)
    console.log(this.assetMonitorTable)
}
  
}
