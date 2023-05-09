
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SignInInput {
    email: string;
    password: string;
}

export interface SignUpInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface AccessToken {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface IMutation {
    signIn(signInInput: SignInInput): AccessToken | Promise<AccessToken>;
    signUp(signUpInput: SignUpInput): User | Promise<User>;
}

export interface User {
    _id: string;
    email: string;
    password?: Nullable<string>;
    googleId?: Nullable<string>;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IQuery {
    findUsers(): Nullable<User[]> | Promise<Nullable<User[]>>;
}

type Nullable<T> = T | null;
