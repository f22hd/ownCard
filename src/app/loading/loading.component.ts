import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  
  isLoading:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  show(){
    this.isLoading = true;
  }

  dismiss(){
    this.isLoading = false;
  }

}
