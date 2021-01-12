import { SharedService } from './../shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit, OnDestroy {
  // Declarations
  userTable: any = [];
  actualData: any = [];
  searchtext: string = '';
  constructor(private shared: SharedService) {}


  ngOnInit() {
    // Data Subscribed from service without async pipe
    this.shared.getAllData().subscribe(
      data => {
        this.userTable = data;
        this.actualData = this.userTable;
      },
      error => {
        console.error(error);
      }
    );
    this.shared.castData.subscribe(
      res => {
        this.searchtext = res;
        this.searchProps();
      },
      error => {
        console.error(error);
      }
    );
  }

  searchProps() {
    const findData = ["name", "username", "email"];
    this.userTable = this.actualData.filter(ele =>
      findData.some(
        subele =>
          ele[subele].toLowerCase().indexOf(this.searchtext.toLowerCase()) != -1
      )
    );
  }

  // Data Transfer : Component Interaction
  sendData(data) {
    this.shared.passtoSearch(data);
  }

  // Single Row Render
  trackIndex(index, row) {
    return row ? row.id : undefined;
  }

  // unsubscribe Subsciptions
  ngOnDestroy() {
    this.shared
      .getAllData()
      .subscribe()
      .unsubscribe();
    this.shared.castData.subscribe().unsubscribe();
  }
}
