export interface Identifiable<K> {
   id: K;
}
export type IdType = number | undefined;

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

   toString = () => {
      console.log(`fname:${this.fname}, lname:${this.lname}
          .username: ${this.username} , password:${this.password},
          gender: role:${this.role}, pic:${this.userPic}
          description: ${this.description}, status:${this.status},
          timeOfCreation: ${this.timeOfCreation}, 
          timeOfModification:${this.timeOfModification}
          `);

   }
}

export function toIsoDate(date: Date) {
   return date.toISOString().split('T')[0];
}



//2.CommentClass
export class CommentClass {
   constructor(
      public id: IdType = undefined,
      public creatorId: number,
      public discussionId: number,
      public isClub: boolean,
      public content: string,
      public timeOfCreation: string = `${new Date().toDateString()} ${new Date().toLocaleTimeString()} `,
      public timeOfModification: TimeOfModificationType = null,
   ) { }

   toString = () => {
      console.log(`id:${this.id}, creatorId:${this.creatorId}
        .discussionId: ${this.discussionId} , isClub:${this.isClub},
        content${this.content}, timeOfCreation:${this.timeOfCreation}
        timeOfModification: ${this.timeOfModification}`);
   }
}

// {
//    "id": 1,
//    "creatorId": 1,
//    "title": "Question one1 title",
//    "content": "Content question 1???",
//    "questionPic": "https://cdn.ozone.bg/media/catalog/product/cache/1/small_image/178x222/9df78eab33525d08d6e5fb8d27136e95/b/r/b3f75afdb59284ea0f7dbac6221d3871/bridzhartan-5--na-sar-filip--s-lyubov-20.jpg"
//  },

//2.CommentClass
export class QuestionClass {
   constructor(
      public id: IdType = undefined,
      public creatorId: number,
      public title: string,
      public content: string,
      public questionPic: string,
      public timeOfCreation: string = `${new Date().toDateString()} ${new Date().toLocaleTimeString()} `,
      public timeOfModification: TimeOfModificationType = null,
   ) { }

   toString = () => {
      console.log(`id:${this.id}, creatorId:${this.creatorId},
        content${this.content}, timeOfCreation:${this.timeOfCreation}
        timeOfModification: ${this.timeOfModification}`);
   }
}



