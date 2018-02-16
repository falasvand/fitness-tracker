import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  today;

  constructor() { }

  ngOnInit() {
    this.today = new Date();
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
