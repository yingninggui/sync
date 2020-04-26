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

type registerCredentials struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type registerPayload struct {
	Input struct {
		Credentials registerCredentials `json:"credentials"`
	} `json:"input"`
}

const bcryptCost = 10

const insertUserQuery = `
INSERT INTO "user"(email, password_hash, username)
VALUES ($1, $2, $3) RETURNING id
`

func register(tx *db.Tx, email string, username string, password string) (*authResponse, error) {
	var response = authResponse{Username: username}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return nil, fmt.Errorf("hashing password: %w", err)
	}

	err = tx.QueryRow(insertUserQuery, email, hash, username).Scan(&response.UserId)
	if err != nil {
		return nil, handle.WithEnum(handle.EmailTaken, fmt.Errorf("inserting user: %w", err))
	}

	response.AccessToken, err = jwt.MakeAndSign(response.UserId)
	if err != nil {
		return nil, fmt.Errorf("signing jwt: %w", err)
	}

	return &response, nil
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

	credentials := &payload.Input.Credentials
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

	return register(tx, credentials.Email, credentials.Username, credentials.Password)
}
