import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private repository: UserRepository,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    //get the form element
    let registerForm = document.getElementById('register-form');
    let existingID: User[] = [];


    const firstName = (<HTMLInputElement>document.getElementById('input-firstname'))?.value || '';
    const lastName = (<HTMLInputElement>document.getElementById('input-lastname'))?.value || '';
    const id = (<HTMLInputElement>document.getElementById('input-id'))?.value || '';
    const username = (<HTMLInputElement>document.getElementById('input-username'))?.value || '';
    const password = (<HTMLInputElement>document.getElementById('input-password'))?.value || '';
    const email = (<HTMLInputElement>document.getElementById('input-email'))?.value || '';
    

    //check the values are filled
    if (!firstName || !lastName || !id || !username || !password || !email) {
      alert('Please fill in all the info');
      return;
    }

    for (let i = 0; i < existingID.length; i++) {
      if (id == existingID[i]) {
        alert('User ID already exists!');
        return;
      }
    }

    const registerUser: User = {id: '', username, password, email, firstName, lastName};

    // this.repository.registerUser(registerUser).subscribe({
    //   next: (data) => {
    //     alert('Registered!');
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     const msg = error.error.msg || 'Failed to register';
    //     alert(msg);
    //   }
    // }
    // );

    this.repository.registerUser(registerUser).subscribe(
      (data: any) => {
        alert('Survey added!');
      },
      (err: any) => {
        console.log(err);
        const msg = err.error.msg || 'Failed to add survey';
        alert(msg);
      }
    );
  }
}
