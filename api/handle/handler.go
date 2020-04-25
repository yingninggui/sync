package handle

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/yingninggui/sync/api/db"
)

type responseFunc func(*db.Tx, *http.Request) (interface{}, error)

func WithDbResponse(conn *db.Conn, handler responseFunc, name string) http.HandlerFunc {
	inner := func(r *http.Request) (interface{}, error) {
		defer r.Body.Close()

		tx, err := db.BeginWithContext(conn, r.Context())
		if err != nil {
			return nil, fmt.Errorf("opening transaction: %w", err)
		}
		defer tx.Rollback()

		resp, err := handler(tx, r)
		if err != nil {
			return nil, err
		}

		err = tx.Commit()
		if err != nil {
			return nil, fmt.Errorf("committing: %w", err)
		}

		return resp, nil
	}

	return func(w http.ResponseWriter, r *http.Request) {
		resp, err := inner(r)
		if err != nil {
			Error(w, r, fmt.Errorf("%s: %w", name, err))
		} else if resp != nil {
			json.NewEncoder(w).Encode(resp)
		}
	}
}
