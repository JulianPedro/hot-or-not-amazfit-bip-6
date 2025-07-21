package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	influxURL  = "http://address_to_influx:8086"
	influxUser = "user"
	influxPass = "password"
	bucket     = "bucket"
	apiPort    = "8080"
)

func main() {
	router := gin.Default()

	router.GET("/environment", func(c *gin.Context) {
		data, err := FetchLatestEnvironmentData(influxURL, influxUser, influxPass, bucket)
		if err != nil {
			log.Printf("Error: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not fetch environment data"})
			return
		}
		c.JSON(http.StatusOK, data)
	})

	router.Run(":" + apiPort)
}
