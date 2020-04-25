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

type registerRequest struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type registerPayload struct {
	Credentials registerRequest `json:"credentials"`
}

type registerResponse struct {
	AccessToken string `json:"access_token"`
}

const bcryptCost = 10

const insertUserQuery = `
INSERT INTO "user"(email, password_hash, username)
VALUES ($1, $2, $3) RETURNING id
`

func register(tx *db.Tx, request *registerRequest) (*registerResponse, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcryptCost)
	if err != nil {
		return nil, fmt.Errorf("hashing password: %w", err)
	}

	var userId int
	err = tx.QueryRow(insertUserQuery, request.Email, hash, request.Username).Scan(&userId)
	if err != nil {
		return nil, handle.WithEnum(handle.EmailTaken, fmt.Errorf("inserting user: %w", err))
	}

	token, err := jwt.MakeAndSign(userId)
	if err != nil {
		return nil, fmt.Errorf("signing jwt: %w", err)
	}

	return &registerResponse{AccessToken: token}, nil
}

const (
	MinPasswordLength = 6
	MinEmailLength    = 6
)

func HandleRegister(tx *db.Tx, r *http.Request) (interface{}, error) {
	var payload registerPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		return nil, fmt.Errorf("malformed JSON: %w", err)
	}

	credentials := &payload.Credentials
	if credentials.Email == "" || credentials.Password == "" || credentials.Username == "" {
		return nil, fmt.Errorf("empty username, email, or password")
	}

	if len(credentials.Password) < MinPasswordLength {
		return nil, handle.WithEnum(
			handle.PasswordTooShort,
			fmt.Errorf("password is too short"),
		)
	}

	if len(credentials.Email) < MinEmailLength {
		return nil, handle.WithEnum(
			handle.EmailTooShort,
			fmt.Errorf("email is too short"),
		)
	}

	return register(tx, credentials)
}
