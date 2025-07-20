import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonserviceService } from '../commonservice.service';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PassowrdComponent } from '../passowrd/passowrd.component';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule,ReactiveFormsModule,MatIconModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  constructor( 
    private service :CommonserviceService, 
    private router: Router,
    private popup:MatDialog ){

  }
  typevariable ='password'
  showerror=false

logInForm = new FormGroup({
  userName: new FormControl('', [Validators.required,Validators.minLength(6)]),
  password: new FormControl('', [Validators.required,Validators.minLength(6)])
});


  submitform(){
    if(this.logInForm.valid){
       this.service.getReturnAdmin(this.logInForm.value).subscribe((data:any)=>{
        if(data !="Not Authorised"){
          localStorage.setItem('local', data);
           this.router.navigate(['/home']);
        }else{
          this.showerror=true
        }
      })
   
    }

  }
  clearform(){
    this.logInForm.reset()
    this.showerror=false
  }

  openpop(){
    alert('PopUp')
  }

  pass(){
     this.typevariable = this.typevariable === 'password' ? 'text' : 'password';
  }

  password(){
this.popup.open(PassowrdComponent, {
      width: '510px',
      height:'200px',
      data:[]
    });

  }
}
