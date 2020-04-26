package auth

type authResponse struct {
	UserId      int    `json:"user_id"`
	Username    string `json:"username"`
	AccessToken string `json:"access_token"`
	SwrtcToken  string `json:"swrtc_token"`
}
