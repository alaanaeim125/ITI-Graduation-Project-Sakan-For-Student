import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccessToaster(message, title, timespan){
    this.toastr.success(message,title,{
     timeOut: timespan
    });
  }


  showFailedToaster(message, title, timespan){
    this.toastr.warning(message,title,{
     timeOut: timespan
    });
  }

}
