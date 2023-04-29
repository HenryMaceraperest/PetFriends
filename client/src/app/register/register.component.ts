import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  maxDateUser: Date = new Date();
  maxDatePet: Date = new Date();
  validationErrors: string[] | undefined;

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDateUser.setFullYear(this.maxDateUser.getFullYear() -13);
    this.maxDatePet.setFullYear(this.maxDatePet.getFullYear());
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      petType: ['dog'],
      userDateOfBirth: ['', Validators.required],
      petDateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  register() {   
    const userDob = this.getDateOnly(this.registerForm.controls['userDateOfBirth'].value);
    const petDob = this.getDateOnly(this.registerForm.controls['petDateOfBirth'].value);
    const values = {...this.registerForm.value, userDateOfBirth: userDob, petDateOfBirth: petDob};
    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');      
      },
      error: error => {
        this.validationErrors = error;
      }
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset())).toISOString().slice(0,10);
  }
}
