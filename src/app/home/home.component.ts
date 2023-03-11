import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  customIntervalObservable: Observable<unknown>;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    this.customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(
            new Error ("Count is greater than 3!")
          )
        }
        count++;
      }, 1000);
    })

    // With filter round 1 will be skipped. Beacuse data is 0 from start.
    // With map, we can customize the way in which we want to show the data.
    this.firstObsSubscription = this.customIntervalObservable.pipe( filter(
      data => {
        return data > 0;
      }
    ), map(
      (data: number) => {
      return 'Round ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log("Completed!");
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
function data(value: unknown, index: number): unknown {
  throw new Error('Function not implemented.');
}

