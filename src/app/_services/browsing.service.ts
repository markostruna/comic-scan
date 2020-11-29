import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BrowsingService {

  headers = new HttpHeaders().set('Content-Type', 'text/html;charset=UTF-8');

  constructor(private http: HttpClient) { }

  // Delete
  getFiles(url: string): Observable<any> {

    const API_URL = url;


    if (environment.production) {
      return this.http.get(API_URL, {responseType: 'text'}).pipe(
        catchError(this.error)
      );
    } else {
      const lines = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
      <html>
       <head>
        <title>Index of /comic2/Publishers</title>
       </head>
       <body>
      <h1>Index of /comic2/Publishers</h1>
        <table>
         <tr><th valign="top"><img src="/icons/blank.gif" alt="[ICO]"></th><th><a href="?C=N;O=D">Name</a></th><th><a href="?C=M;O=A">Last modified</a></th><th><a href="?C=S;O=A">Size</a></th><th><a href="?C=D;O=A">Description</a></th></tr>
         <tr><th colspan="5"><hr></th></tr>
      <tr><td valign="top"><img src="/icons/back.gif" alt="[PARENTDIR]"></td><td><a href="/comic2/">Parent Directory</a>       </td><td>&nbsp;</td><td align="right">  - </td><td>&nbsp;</td></tr>
      <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="Ludens/">Ludens/</a>                </td><td align="right">2018-04-22 22:19  </td><td align="right">  - </td><td>&nbsp;</td></tr>
      <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="Lunov%20Magnus%20Strip/">Lunov Magnus Strip/</a>    </td><td align="right">2019-05-15 18:57  </td><td align="right">  - </td><td>&nbsp;</td></tr>
      <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="Slobodna%20Dalmacija/">Slobodna Dalmacija/</a>    </td><td align="right">2020-11-15 19:25  </td><td align="right">  - </td><td>&nbsp;</td></tr>
      <tr><td valign="top"><img src="/icons/unknown.gif" alt="[   ]"></td><td><a href="Stripi.xlsx">Stripi.xlsx</a>            </td><td align="right">2013-06-13 23:20  </td><td align="right">101K</td><td>&nbsp;</td></tr>
      <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="Veseli%20%c4%8cetvrtak/">Veseli Četvrtak/</a>      </td><td align="right">2020-11-13 20:36  </td><td align="right">  - </td><td>&nbsp;</td></tr>
      <tr><td valign="top"><img src="/icons/folder.gif" alt="[DIR]"></td><td><a href="Zlatna%20Serija/">Zlatna Serija/</a>         </td><td align="right">2019-05-08 22:21  </td><td align="right">  - </td><td>&nbsp;</td></tr>
         <tr><th colspan="5"><hr></th></tr>
      </table>
      <address>Apache/2.4.29 (Win32) OpenSSL/1.1.0g PHP/7.2.3 Server at localhost Port 80</address>
      </body></html>'`;

      return of(lines);
    }
  }

  // Handle Errors
  error(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
