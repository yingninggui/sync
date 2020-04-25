package db

import (
	"context"
	"time"

	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/yingninggui/sync/api/env"
)

type Conn = pgxpool.Pool

// Connection to database must complete within this timeframe.
const ConnectTimeout = time.Second * 10

// Connect to database.
func ConnectPool(ctx context.Context) (*Conn, error) {
	connectCtx, cancel := context.WithTimeout(ctx, ConnectTimeout)
	defer cancel()

	return pgxpool.Connect(connectCtx, env.Global.PostgresConnString)
}
