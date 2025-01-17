import { Component,DestroyRef,OnInit,computed,effect,inject,signal} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval,map, Observable }  from 'rxjs'
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent  implements OnInit{
   clickCount = signal(0)
   clickCount$ =   toObservable(this.clickCount);
interval$ = interval(1000);
intervalSignal = toSignal(this.interval$,{initialValue:0});
  //  interval = signal(0);
  //  doubleInterval = computed(()=>this.interval() * 2);
  customInterval$ = new Observable((subscriber)=>{
    let timesExecuted  = 0;
    const interval = setInterval(()=> {
      if(timesExecuted>3){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('emitting custom interval...');
      subscriber.next({message:'New value'});
      timesExecuted++;
    },2000);
  });
  private destroyRef =inject(DestroyRef);
  constructor(){
    // effect(()=>{
    //   console.log(`clicked button ${this.clickCount()} times. `)
    // })

  }
ngOnInit() {
//   setInterval(()=>{
// this.interval.update(prevIntervalNumber => prevIntervalNumber + 1)
//   },1000);

//  const subscription = interval(1000).pipe(
//   map((val)=> val * 2)
//  ).subscribe({
//   next:(val)=> console.log(val),
//  }); 
//  this.destroyRef.onDestroy(()=>{
//   subscription.unsubscribe();
//  })
this.customInterval$.subscribe({
  next:(val)=>console.log(val),
  complete:()=>console.log('Completed')
});
const subscription = this.clickCount$.subscribe({
  next:(val)=>console.log(`clicked button ${this.clickCount()} times. `)
});

this.destroyRef.onDestroy(()=>{
    subscription.unsubscribe();
   })
}
onclick(){
this.clickCount.update(prevCount=>prevCount + 1);
}
}
