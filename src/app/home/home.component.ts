import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule,MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  logindata: any
  showdivdata=true
  formdata=new Array()
  Serveyform = new FormGroup({
    Name: new FormControl('', [Validators.required,Validators.minLength(3)]),
    MobileNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$'),]),
    Address: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Skills: new FormControl('', Validators.required),
    Hobbies: new FormControl('', Validators.required),
    Photo: new FormControl(''),
  })

   displayedColumns: string[] = ['Name', 'Mobile No', 'Address','Skills','Download'];
    dataSource = new MatTableDataSource<any>();

  constructor(private service: CommonserviceService,
    private router: Router

  ) {

  }
  ngOnInit(): void {
    this.service.logIndata.subscribe(data => this.logindata = data)
  }

  logout() {
    this.service.logIndata.next({});
    this.service.getReturnAdmin({}).subscribe((data: any) => {

    })
    this.router.navigate(['/login'])
  }

  submit() {
    if(this.Serveyform.valid){
      this.formdata.push(this.Serveyform.value)
        this.dataSource = new MatTableDataSource(this.formdata);
        alert('Data add suceessfully')
        this.Serveyform.reset()
    }

  }
  clearform() {
    this.Serveyform.reset()
  }

  technologies = [
    'Java',
    'Angular',
    'MySQL',
  ];

  report(data: any) {
    if (data == 'Form') {
      this.showdivdata=true
    }
    if (data == 'Download') {
      this.showdivdata=false
    }

  }

  downloadreport(elemnt:any){
  const exportData = this.dataSource.data.map((row: any) => ({
    Name: row.Name,
    'Mobile No': row.MobileNo,
    Address: row.Address,
    Skills: row.Skills.join(', '),
    Hobbies: row.Hobbies,
    Photo: row.Photo ?? '-'
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Report': worksheet },
    SheetNames: ['Report']
  };

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  FileSaver.saveAs(data, 'report.xlsx');
}

}
