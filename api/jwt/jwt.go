package jwt

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/yingninggui/sync/api/env"
	"github.com/yingninggui/sync/api/handle"
)

type HasuraSubclaims struct {
	AllowedRoles []string `json:"x-hasura-allowed-roles"`
	DefaultRole  string   `json:"x-hasura-default-role"`
	UserId       string   `json:"x-hasura-user-id"`
}

type HasuraClaims struct {
	Hasura HasuraSubclaims `json:"https://hasura.io/jwt/claims"`
	jwt.StandardClaims
}

type SwrtcClaims struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	jwt.StandardClaims
}

const ExpirationPeriod = 24 * time.Hour

func MakeHasura(userId int) (string, error) {
	now := time.Now()

	claims := HasuraClaims{
		StandardClaims: jwt.StandardClaims{
			IssuedAt:  now.Unix(),
			NotBefore: now.Unix(),
			ExpiresAt: now.Add(ExpirationPeriod).Unix(),
		},
		Hasura: HasuraSubclaims{
			AllowedRoles: []string{"user"},
			DefaultRole:  "user",
			UserId:       strconv.Itoa(userId),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	jwtString, err := token.SignedString(env.Global.HasuraJwtKey)

	if err != nil {
		return "", err
	}

	return jwtString, nil
}

func MakeSwrtc(userId int, username string) (string, error) {
	claims := SwrtcClaims{
		Id:       userId,
		Username: username,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	jwtString, err := token.SignedString(env.Global.SwrtcJwtKey)

	if err != nil {
		return "", err
	}

	return jwtString, nil
}

func globalKey(t *jwt.Token) (interface{}, error) {
	return env.Global.HasuraJwtKey, nil
}

func UserIdFromRequest(request *http.Request) (int, error) {
	var tokenString string

	if authStrings, ok := request.Header["Authorization"]; ok {
		tokenString = strings.TrimPrefix(authStrings[0], "Bearer ")
	} else {
		return 0, fmt.Errorf("no authorization header")
	}

	token, err := jwt.ParseWithClaims(tokenString, new(HasuraClaims), globalKey)
	if err != nil {
		if vErr, ok := err.(*jwt.ValidationError); ok {
			if vErr.Errors&jwt.ValidationErrorExpired != 0 {
				return 0, handle.WithEnum(handle.ExpiredJwt, fmt.Errorf("expired token"))
			}
			return 0, fmt.Errorf("invalid token: %w", vErr)
		}
		return 0, fmt.Errorf("malformed token: %w", err)
	}

	// This will work because ParseWithClaims encountered no error
	claims := token.Claims.(*HasuraClaims)
	userId, err := strconv.Atoi(claims.Hasura.UserId)
	if err != nil {
		return 0, fmt.Errorf("invalid user id: %w", err)
	}

	return userId, nil
}
