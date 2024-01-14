export type UserInstagram = {
    username: string,
    email: string,
    displayName: string | null,
    password: string,
    photoURL?: string | null
}
export type UserInstagramRegister = UserInstagram & {
    date?: string
}
export interface UserResponseServer  {
    accessToken: string,
    user: UserInstagramRegister
}
export type LoginValues = {
    email: string 
    password: string 
}
export type LoginValuesRequest = LoginValues & {
    date?: string
}
export type LoginErrors = {
    email?: string,
    password?: string
}
export type UserGoogle = {
    displayName: string | null,
    email: string | null,
    photoURL: string | null
    password?: string | null
}
export type UserPassword = {
    password: string
}
export type UserGoogleResponse = UserGoogle & {
    date: string
}
export interface CustomLinkProps {
    to: string,
    children: React.ReactNode,
    className: string,
    onClick?: () => void;
}
export interface UserProfileInterface {
    full_name: string,
    id: string,
    profile_pic_url: string,
    username: string,
}
export interface FollowersUser extends UserProfileInterface {}
export interface FollowerResponse {
    count: number,
    items: UserProfileInterface[],
    total: number
}
export type Time = number | string;
export interface myMessageInterface {
    message: string,
    id: string
}
export interface RenderFollowingInterface {
    data: FollowersUser[] | undefined
}
type ImageApplicationType<T> = T | null
export interface ImageApplication {
    image?: string,
    id?: string
}