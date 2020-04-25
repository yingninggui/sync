package db

import (
	"context"

	"github.com/jackc/pgconn"
	"github.com/jackc/pgx/v4"
)

type Tx struct {
	ctx context.Context
	tx  pgx.Tx
}

func BeginWithContext(conn *Conn, ctx context.Context) (*Tx, error) {
	tx, err := conn.Begin(ctx)
	if err != nil {
		return nil, err
	}
	return &Tx{ctx: ctx, tx: tx}, nil
}

func (t *Tx) Commit() error {
	return t.tx.Commit(t.ctx)
}

func (t *Tx) Exec(query string, args ...interface{}) (pgconn.CommandTag, error) {
	return t.tx.Exec(t.ctx, query, args...)
}

func (t *Tx) Query(query string, args ...interface{}) (pgx.Rows, error) {
	return t.tx.Query(t.ctx, query, args...)
}

func (t *Tx) QueryRow(query string, args ...interface{}) pgx.Row {
	return t.tx.QueryRow(t.ctx, query, args...)
}

func (t *Tx) Rollback() error {
	return t.tx.Rollback(t.ctx)
}
