export interface Identifiable<K> {
     id: K;
}
export type IdType = number | undefined;

export enum GenderEnum {
     Male = 1, Female,
}
export enum RoleEnum {
     User = 1, Admin,
}
export enum StatusEnum {
     Active = 1, Deactivated,Suspended,
}

// export type DescriptionType = string |""
export type DescriptionType = string 
export type TimeOfModificationType = string | null

export class UserClass {
     constructor(
          public id: IdType = undefined,
          public fname: string,
          public lname: string,
          readonly  username: string,
          public password: string,
          public gender = GenderEnum.Male,
          public role = RoleEnum.User,
          public picture: string,
          public description: DescriptionType="",
          public status = (StatusEnum.Active),
          public timeOfCreation:string = `${new Date().toDateString()} ${new Date().toLocaleTimeString()} `,
          public timeOfModification:TimeOfModificationType = null,
     ) { }

     toString = () => {
          console.log(`fname:${this.fname}, lname:${this.lname}
          .username: ${this.username} , password:${this.password},
          gender:${this.gender}, role:${this.role}, pic:${this.picture}
          description: ${this.description}, status:${this.status},
          timeOfCreation: ${this.timeOfCreation}, 
          timeOfModification:${this.timeOfModification}
          `);

     }
}

export function toIsoDate(date: Date) {
     return date.toISOString().split('T')[0];
}



