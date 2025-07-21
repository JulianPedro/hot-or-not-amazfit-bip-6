package main

import (
	"encoding/json"
	"errors"

	influx "github.com/influxdata/influxdb1-client/v2"
)

type EnvironmentData struct {
	Temperature float64 `json:"temperature"`
	Sensation   float64 `json:"sensation"`
	Humidity    float64 `json:"humidity"`
}

func FetchLatestEnvironmentData(url, user, pass, bucket string) (*EnvironmentData, error) {
	client, err := influx.NewHTTPClient(influx.HTTPConfig{
		Addr:     url,
		Username: user,
		Password: pass,
	})
	if err != nil {
		return nil, err
	}
	defer client.Close()

	query := influx.NewQuery(`
		SELECT temperature, sensation, humidity
		FROM bedroom 
		ORDER BY time DESC 
		LIMIT 1
	`, bucket, "")

	response, err := client.Query(query)
	if err != nil || response.Error() != nil {
		if err == nil {
			err = response.Error()
		}
		return nil, err
	}

	for _, result := range response.Results {
		for _, series := range result.Series {
			for _, value := range series.Values {
				if len(value) >= 4 {
					var temperature, sensation, humidity float64

					if t, ok := value[1].(json.Number); ok {
						temperature, _ = t.Float64()
					}
					if f, ok := value[2].(json.Number); ok {
						sensation, _ = f.Float64()
					}
					if h, ok := value[3].(json.Number); ok {
						humidity, _ = h.Float64()
					}

					return &EnvironmentData{
						Temperature: temperature,
						Sensation:   sensation,
						Humidity:    humidity,
					}, nil
				}
			}
		}
	}

	return nil, errors.New("no data found")
}
