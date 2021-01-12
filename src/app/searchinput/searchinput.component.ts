import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-searchinput',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.scss']
})
export class SearchinputComponent implements OnInit {

  selectedUser: Observable<string>;

  constructor(private shared: SharedService) {}

  // Init Call Backs :Hook
  ngOnInit() {
    this.selectedUser = this.shared.passSelectedCast;
  }

  // Pass Data to Subject
  passData(data) {
    this.shared.changeState(data);
  }

}
