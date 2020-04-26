package auth

type authResponse struct {
	UserId      int    `json:"user_id"`
	Username    string `json:"username"`
	AccessToken string `json:"access_token"`
}
