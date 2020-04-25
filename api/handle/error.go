package handle

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
)

const (
  //// Common
  BadRequest = "bad_request"
  InternalError = "internal_error"
	// JWT token is expired
  ExpiredJwt = "expired_jwt"

	//// Registration
	// Email is already taken by another account
  EmailTaken = "email_taken"
	// Email is too short
  EmailTooShort = "email_too_short"
	// Password is too short
  PasswordTooShort = "password_too_short"

	//// Login
	// There is no user with given email
  EmailNotRegistered = "email_not_registered"
	// There is a user with given email, but the given password is incorrect
  EmailWrongPassword = "email_wrong_password"
)

type enumError struct {
	Enum string
	Err  error
}

func (e enumError) Error() string {
	return e.Err.Error()
}

func (e enumError) Unwrap() error {
	return e.Err
}

func WithEnum(enum string, err error) error {
  return enumError{Err: err, Enum: enum}
}

type statusError struct {
	Err    error
	Status int
}

func (e statusError) Error() string {
	return e.Err.Error()
}

func (e statusError) Unwrap() error {
	return e.Err
}

func WithStatus(status int, err error) error {
	return statusError{Err: err, Status: status}
}

type errorPayload struct {
	Message      string `json:"message"`
}

func Error(w http.ResponseWriter, r *http.Request, err error) {
	var payload errorPayload
	var status int

	var st statusError
	if ok := errors.As(err, &st); ok {
		status = st.Status
	} else {
		status = http.StatusBadRequest
	}

	var en enumError
	if ok := errors.As(err, &en); ok {
		payload.Message = en.Enum
	} else {
		if status >= 500 {
			payload.Message = InternalError
		} else {
			payload.Message = BadRequest
		}
	}

  log.Printf("Error: %s", err.Error())

	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}
