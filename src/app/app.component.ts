import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'metro-data';
  displayedColumns: string[] = ['name', 'id', 'nametype', 'recclass', 'mass', 'fall', 'year', 'latitude', 'longitude'];
  headerRow: string[] = ['name', 'id', 'name_type', 'rec class', 'mass (g)', 'fall', 'year', 'latitude', 'longitude'];
  dataSource: MatTableDataSource<any>;
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getMetroData();
  }

  getMetroData() {
    this.loading = true;
    this.appService.getData()
      .subscribe(
        (data: any) => {
          if (data.length > 0) {
            this.dataSource = new MatTableDataSource<any>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;
            console.log(data);
          }
        }
      );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
