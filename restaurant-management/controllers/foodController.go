package controller

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
)
func GetFoods() gin.HandlerFunc {
	return func(c *gin.Context){

	}
}

func GetFood() gin.HandlerFunc {
	return func(c *gin.Context){
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		foodId := c.Param("food_id")
		var food models.Food
	}
}

func CreateFood() gin.HandlerFunc {
	return func(c *gin.Context){

	}
}

func round(num float64) int {
	return int(num + 0.5)
}

func toFixed(num float64, precision int) float64 {
	
}

func UpdateFood() gin.HandlerFunc {
	return func(c *gin.Context){
		
	}
}