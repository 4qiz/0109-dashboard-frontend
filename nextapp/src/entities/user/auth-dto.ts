export interface TokenDto {
  token: string;
  expiresAt: string;
}

export interface UserDto {
  login: string;
  isAdmin: boolean;
}

export interface AuthResponseDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
  user: UserDto;
}
