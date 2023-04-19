import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService,  private router: Router) {}

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
        this.router.navigateByUrl('/members');      
      },
      error: error => console.log(error)
    })  
    
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
