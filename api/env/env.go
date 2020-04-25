package env

import (
  "fmt"
  "reflect"
  "os"
)

type Environment struct {
  JwtKey []byte `from:"HASURA_GRAPHQL_JWT_KEY"`
  PostgresConnString string `from:"HASURA_GRAPHQL_DATABASE_URL"`
}

var Global Environment

func Get(env *Environment) error {
	refValue := reflect.Indirect(reflect.ValueOf(env))
	refType := refValue.Type()

	for i := 0; i < refType.NumField(); i++ {
		key := refType.Field(i).Tag.Get("from")
		value, exists := os.LookupEnv(key)
		if !exists {
			return fmt.Errorf("environment variable %s is not set", key)
    }
    fieldType := refType.Field(i).Type
    convertedValue := reflect.ValueOf(value).Convert(fieldType)
    refValue.Field(i).Set(convertedValue)
	}

	return nil
}

func init() {
	var err = Get(&Global)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %s", err.Error())
	}
}
