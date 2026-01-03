export interface LoginPayload {
    email : string,
    password : string
}

export interface RegisterPayload {
    email : string,
    username? : string,
    password : string
}

export interface AuthResponse {
    accessToken : string,
    email : string,
}