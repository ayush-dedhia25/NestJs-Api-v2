import { Expose } from 'class-transformer';

export class UserSerializer {
   @Expose()
   id: number;
   
   @Expose()
   name: string;
   
   @Expose()
   email: string;
}
