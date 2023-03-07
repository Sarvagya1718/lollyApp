import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DataService } from './data.service';
// import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lollyApp';
  data: any = [];
  page = 1;
  prevVal: any = null;
  searchLoad = false;
  scrollLoad = false;

  constructor(private dataservice: DataService) {}
  searchForm = new FormGroup({
    searchvalue: new FormControl(''),
  });

  url: String | undefined;
  ngOnInit() {
    this.search();
  }

  search() {
    let search = this.searchForm.value;
    if (this.prevVal == null || this.prevVal != search.searchvalue) {
      this.searchLoad = true;
      setTimeout(() => {
        this.page = 1;
        this.dataservice
          .getSearchData(search, this.page)
          .subscribe((res: any) => {
            this.data = res.items ? res.items : res;
          });
        this.searchLoad = false;
      }, 500);
      this.prevVal = search.searchvalue;
    }
  }

  onScroll() {
    this.scrollLoad = true;
    setTimeout(() => {
      this.dataservice
        .getSearchData(this.searchForm.value, ++this.page)
        .subscribe((res: any) => {
          if (res.items) {
            res.items.forEach((item: any) => {
              this.data.push(item);
            });
          } else {
            res.forEach((item: any) => {
              this.data.push(item);
            });
          }
        });
      this.scrollLoad = false;
    }, 500);
  }
}
