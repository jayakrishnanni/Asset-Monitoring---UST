import { Component, VERSION, OnInit, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  assetForm: FormGroup;
  assetFormArray: any[];
  assetMonitorTable: any[];
  channels = [];
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
  // dataLoggerModelwithAnalogDigital = ['Analog: C1-C5', 'Digital: C6-C10','Analog: A1-A5', 'Digital: A6-A7','Analog: D1-D3', 'Digital: C6-C10','Analog: G11-G20', 'Digital: K1-K3'];

  dataLoggerInterface = ['Analog', 'Digital'];

  dataLoggerModelwithAnalogDigital: object = {
    DL100: { Analog: ['C1', 'C2','C3','C4','C5'], Digital: ['D1', 'D2'] },
    DL200: { Analog: ['C1', 'C2'], Digital: ['D1', 'D2'] },
    DL300: { Analog: ['C1', 'C2'], Digital: ['D1', 'D2'] },
    DL400: { Analog: ['C1', 'C2'], Digital: ['D1', 'D2'] },
  };

  ngOnInit(): void {
    this.assetFormArray = [];
    this.assetForm = new FormGroup({
      assetTypes: new FormControl('Generator', Validators.required),
      assetAttributes: new FormControl('Oil Temperature', Validators.required),
      dataLoggerModel: new FormControl('DL100', Validators.required),
      dataLoggerInterface: new FormControl('Analog', Validators.required),
      //dataLoggerModelwithAnalogDigital: new FormControl ('Analog: C1-C5', Validators.required),
      channels: new FormControl(''),
    });
    this.channels =
      this.dataLoggerModelwithAnalogDigital[
        this.assetForm.controls.dataLoggerModel.value
      ][this.assetForm.controls.dataLoggerInterface.value];
  }

  click(): void {
    this.assetFormArray.push(this.assetForm.value);
    this.assetMonitorTable = this.assetFormArray.filter((obj, index) => {
      return (
        index ===
        this.assetFormArray.findIndex(
          (o) =>
            obj.assetAttributes === o.assetAttributes &&
            obj.dataLoggerModelwithAnalogDigital ===
              o.dataLoggerModelwithAnalogDigital
        )
      );
    });

    const index = this.channels.indexOf(this.assetForm.controls.channels.value)
    this.channels = this.channels.splice(index, 1)
    console.log(this.channels)
  }

  getChannels(event: any) {
    this.channels =
      this.dataLoggerModelwithAnalogDigital[
        this.assetForm.controls.dataLoggerModel.value
      ][event.target.value];
  }

 
}
