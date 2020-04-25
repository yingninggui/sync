package auth

type authResponse struct {
	UserId      int    `json:"user_id"`
	AccessToken string `json:"access_token"`
}
