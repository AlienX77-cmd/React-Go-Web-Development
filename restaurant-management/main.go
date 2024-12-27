package main

import (
	"golang-restaurant-management/database"
	middleware "golang-restaurant-management/middleware"
	routes "golang-restaurant-management/routes"
	"os"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

// food collection get created whenever it runs
var foodCollection *mongo.Collection = database.OpenCollection(database.Client, "food")

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}

	router := gin.New() //authorization middleware
	router.Use(gin.Logger())
	routes.UserRoutes(router)
	router.Use(middleware.Authentication()) //check if user is authenticated or not, if authenticated, they are allowed to use the below routes

	routes.FoodRoutes(router)
	routes.MenuRoutes(router)
	routes.TableRoutes(router)
	routes.OrderRoutes(router)
	routes.OrderItemRoutes(router)
	routes.InvoiceRoutes(router)

	router.Run(":" + port)
}