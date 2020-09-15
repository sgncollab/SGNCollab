import { FormControl } from '@angular/forms';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';

export class UsernameValidator{
    regResult:any;

    constructor(private dbService: FirebaseDbService){}

    ngOnInit(){
      console.log("called")
      this.dbService.fetchUsers().subscribe((data) => {
        this.regResult = data.map(value => {
          return {
            id: value.payload.doc.id,
            mobile_no: value.payload.doc.data()['mobile_no'],
            name: value.payload.doc.data()['name'],
            sr_no: value.payload.doc.data()['sr_no']
          }
        });
        console.log(this.regResult);
    })
        
        
    }


    static validUsername(fc: FormControl){
        if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "pooja"){
          return ({validUsername: true});
        } else {
          return (null);
        }
        
      }
      ekfunction(){
        console.log("hello");
      }
}