import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable()
export class AppService {

  url = environment.serverURL;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.url)
      .pipe(
        tap((data: any) => {
          return of(data);
        })
      );
  }

}
