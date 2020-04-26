package auth

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/yingninggui/sync/api/db"
	"github.com/yingninggui/sync/api/handle"
	"github.com/yingninggui/sync/api/jwt"

	"golang.org/x/crypto/bcrypt"
)

type loginCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginPayload struct {
	Input struct {
		Credentials loginCredentials `json:"credentials"`
	} `json:"input"`
}

const selectUserQuery = `
SELECT id, username, password_hash FROM "user" WHERE email = $1
`

func login(tx *db.Tx, email string, password []byte) (*authResponse, error) {
	var response authResponse
	var hash []byte

	err := tx.QueryRow(selectUserQuery, email).Scan(&response.UserId, &response.Username, &hash)
	if err != nil {
		return nil, handle.WithEnum(handle.EmailNotRegistered, fmt.Errorf("email not registered: %s: %w", email))
	}

	err = bcrypt.CompareHashAndPassword(hash, password)
	if err != nil {
		return nil, handle.WithEnum(handle.EmailWrongPassword, fmt.Errorf("comparing hash and password: %w", err))
	}

	response.AccessToken, err = jwt.MakeAndSign(response.UserId)
	if err != nil {
		return nil, handle.WithStatus(http.StatusInternalServerError, fmt.Errorf("signing jwt: %w", err))
	}

	return &response, nil
}

func HandleLogin(tx *db.Tx, r *http.Request) (interface{}, error) {
	var payload loginPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		return nil, fmt.Errorf("malformed JSON: %w", err)
	}

	credentials := &payload.Input.Credentials
	if credentials.Email == "" || credentials.Password == "" {
		return nil, fmt.Errorf("empty email, password")
	}

	response, err := login(tx, credentials.Email, []byte(credentials.Password))
	if err != nil {
		return nil, handle.WithStatus(http.StatusUnauthorized, err)
	}

	return response, nil
}
