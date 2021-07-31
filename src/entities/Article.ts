import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Article{
    @PrimaryColumn({length:30})
    slug:string
    
    @Column({length:50})
    title:string
    
    @Column({length:100,nullable:true})
    description?:string
    
    @Column({type:'text'})
    body:string

    @CreateDateColumn()
    createdAt:Date

    @CreateDateColumn()
    updatedAt:Date

    @ManyToOne(()=> User)
    @JoinColumn()
    author:User


}

/*
    "tagList": ["dragons", "training"], //TODO: realationship with tags
    "favorited": false,  //TODO: realationship with tags
    "favoritesCount": 0,
    "author": { //TODO: realationship with user
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
*/