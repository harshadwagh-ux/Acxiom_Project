import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { CommonserviceService } from '../commonservice.service';

@Component({
  selector: 'app-passowrd',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './passowrd.component.html',
  styleUrl: './passowrd.component.scss'
})
export class PassowrdComponent {
   dialogRef = inject(MatDialogRef<PassowrdComponent>);
   api = inject(CommonserviceService)

   forgotForm= new FormGroup({
  userName: new FormControl('', [Validators.required,Validators.minLength(6)]),
  // password: new FormControl('', [Validators.required,Validators.minLength(6)])
   })

      passforgotForm= new FormGroup({
  Password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')])
   })

   close(){
    this.dialogRef.close()
   }
   checkusername(){
    if(this.forgotForm.valid){
      this.api.checkusernamr(this.forgotForm.value).subscribe((data:any)=>{
        if(data==true){
        this.showbtn=false
        }
        else{
           this.showbtn=true
           this.showerror=true
           this.forgotForm.reset()
        }
      })
    }
       

   }
   Submit(){
   this.showbtn=false
       if(this.passforgotForm.valid){
        const temp={
          username:this.forgotForm.value,
          password:this.passforgotForm.value}
        this.api.changepassword(temp).subscribe((data:any)=>{
          if(data==true){
            alert('Password change successfully.')
            this.dialogRef.close();
          }
          else{
            alert('Error while saving password.')
            this.passforgotForm.reset()
                this.dialogRef.close();
          }

        })

       }
   }

   showbtn=true
   showerror=false
}
