import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getLevelData(path: string){

    return this.db.object(path).valueChanges();
    /*
    .pipe(map((actions)=>{
      const obj = {};
      actions.map(
        (data: any)=>{
          const key = data.key;
          obj[key]= data.payload.val();
          return;
        });
      return obj;
      }));*/
  }
  updateControlData(controlData: any){
    this.db.database.ref('control/').set(controlData).then().catch();
  }
}
