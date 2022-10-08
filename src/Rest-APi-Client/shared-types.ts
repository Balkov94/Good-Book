export interface Identifiable<K> {
   id: K;
}
export type IdType = number | string | undefined;

// export enum GenderEnum {
//      Male = 1, Female,
// }
export enum RoleEnum {
   User = 1, Admin,
}
export enum StatusEnum {
   Active = 1, Deactivated,
}

// export type DescriptionType = string |""
export type DescriptionType = string
export type TimeOfModificationType = string | null

//1. USER CLASS
export class UserClass {
   constructor(
      public id: IdType = undefined,
      public fname: string,
      public lname: string,
      readonly username: string,
      public password: string,
      public mail: string,
      public phone: string,
      public role = RoleEnum.User,
      public userPic: string,
      public description: DescriptionType = "",
      public status = (StatusEnum.Active),
      public timeOfCreation: string = `${new Date().toDateString()} ${new Date().toLocaleTimeString()} `,
      public timeOfModification: TimeOfModificationType = null,
   ) { }

}

export function toIsoDate(date: Date) {
   return date.toISOString().split('T')[0];
}



//2.CommentClass
export class CommentClass {
   constructor(
      public id: IdType = undefined,
      public creatorId: string,
      public discussionId: string,
      public isClub: boolean,
      public content: string,
      public timeOfCreation: string = `${new Date().toDateString()} ${new Date().toLocaleTimeString()} `,
      public timeOfModification: TimeOfModificationType = null,
   ) { }

}


//2.QuestionClass
export class QuestionClass {
   constructor(
      public id: IdType = undefined,
      public creatorId: string,
      public title: string,
      public content: string,
      public questionPic: string,
      public timeOfCreation: string = `${new Date().toDateString()} ${new Date().toLocaleTimeString()} `,
      public timeOfModification: TimeOfModificationType = null,
   ) { }
}



//3.ClubClass
export class ClubClass {
   constructor(
      public id: IdType = undefined,
      public creatorId: string,
      public name: string,
      public interests: string[],
      public participants: string[],
      public banned: string[],
      // public timeOfCreation: string = `${new Date().toDateString()} ${new Date().toLocaleTimeString()} `,
      // public timeOfModification: TimeOfModificationType = null,
   ) { }

}

//3.BookClass
export class BookClass {
   constructor(
      public id: IdType = undefined,
      public ownerId: string,
      public title: string,
      public bookPic: string,
   ) { }
}



