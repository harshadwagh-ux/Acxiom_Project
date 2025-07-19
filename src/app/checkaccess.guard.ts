import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonserviceService } from './commonservice.service';

export const checkaccessGuard: CanActivateFn = (route, state) => {
  const service =inject(CommonserviceService) 
  let temp
  service.subject.subscribe(data=> { temp =data})
  if(temp == 'Not Authorised'){
    return false

  }else{
  return true;
  }

};
