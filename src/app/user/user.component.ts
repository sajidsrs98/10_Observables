import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  // params in that stream of data which gives us new values.
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  // We use Subject when we actively need to be triggered.
  // Don't use it output decorator.
  // Useful for cross component communication.
  // Recommended way to do so.
  onActivate() {
    this.userService.activatedEmitter.next(true);
  }
}
