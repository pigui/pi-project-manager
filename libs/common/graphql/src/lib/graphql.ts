
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ProjectStatus {
    IN_PROGRESS = "IN_PROGRESS"
}

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

export interface RefreshTokenInput {
    refreshToken: string;
}

export interface LogoutInput {
    userId: string;
}

export interface FindProjectByIdInput {
    _id: string;
}

export interface CreateProjectInput {
    name: string;
    description: string;
}

export interface FindUserByIdInput {
    _id: string;
}

export interface FindUserByEmailInput {
    email: string;
}

export interface AccessToken {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface IMutation {
    signIn(signInInput: SignInInput): AccessToken | Promise<AccessToken>;
    signUp(signUpInput: SignUpInput): User | Promise<User>;
    refreshTokens(refreshTokenInput: RefreshTokenInput): AccessToken | Promise<AccessToken>;
    logout(logonInput: LogoutInput): User | Promise<User>;
    createProject(createProjectInput?: Nullable<CreateProjectInput>): Nullable<Project> | Promise<Nullable<Project>>;
}

export interface ISubscription {
    userLogout(): string | Promise<string>;
    userLogin(): string | Promise<string>;
    userCreated(): User | Promise<User>;
    projectCreated(): Project | Promise<Project>;
}

export interface Project {
    _id: string;
    name: string;
    description: string;
    owner: User;
    users?: Nullable<User[]>;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface IQuery {
    findProjects(): Nullable<Project[]> | Promise<Nullable<Project[]>>;
    findMyProjects(): Nullable<Project[]> | Promise<Nullable<Project[]>>;
    findProjectById(findProjectByIdInput: FindProjectByIdInput): Nullable<Project> | Promise<Nullable<Project>>;
    findUsers(): Nullable<User[]> | Promise<Nullable<User[]>>;
    findUserById(findUserByIdInput: FindUserByIdInput): Nullable<User> | Promise<Nullable<User>>;
    findUserByEmail(findUserByEmailInput: FindUserByEmailInput): Nullable<User> | Promise<Nullable<User>>;
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

type Nullable<T> = T | null;
