import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user : firebase.User){
    this.db.object('users/'+ user.uid).update({
      name:user.displayName,
      email:user.email,
      photo:user.photoURL
    });
  }
  // get(uid:string){
  //   return this.db.object('users/'+uid).
  // }

}
