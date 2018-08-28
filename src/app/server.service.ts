import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { map, catchError } from 'rxjs/operators';
import { throwError } from "rxjs";
@Injectable()
export class ServerService {
    constructor(private http: Http) {}

    appName = '';
    storeName(names: any[]) {
        const headerData = new Headers({'Content-Type': 'application/json'});
        // return this.http.post('https://shailendra-todo-list.firebaseio.com/data.json', names , { headers : headerData});

        // Only For Firebase
        return this.http.put('https://shailendra-todo-list.firebaseio.com/data.json', names , { headers : headerData});
    }

    /* getNames() {
        return this.http.get('https://shailendra-todo-list.firebaseio.com/data.json');
    }
    */

    // Use the below centralised code to map the data and return it if the below is call by many components
    getNames() {
        return this.http.get('https://shailendra-todo-list.firebaseio.com/data').pipe(
            map(
                (response: Response) => {
                    const data = response.json();
                    console.log("data " + data);
                    return data ;
                }
            ),
            catchError( error => {
                return throwError("There is an error with status code.Something went wrong " + error.status);
            })
        );
    }


    // Function for Asyn Call Test
    getAppName() {
        return this.http.get('https://shailendra-todo-list.firebaseio.com/appName.json')
        .pipe(
            map(
                (response: Response) => {
                    return response.json();
                }
            )
        );
    }
}
