package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

  "github.com/yingninggui/sync/api/auth"
  "github.com/yingninggui/sync/api/db"
  "github.com/yingninggui/sync/api/handle"
)

func main() {
	conn, err := db.ConnectPool(context.Background())
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %s", err.Error())
    return
	}

  http.HandleFunc("/register", handle.WithDbResponse(conn, auth.HandleRegister, "register"))

  err = http.ListenAndServe(":8000", nil)
	fmt.Fprintf(os.Stderr, "Error: %s", err)
}
