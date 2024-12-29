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

	router := gin.New() // Creates a new Gin router instance. It is the main entry point for routing. You can create a new router with gin.New().
	router.Use(gin.Logger()) // Adds Gin's logging middleware to log HTTP requests. By default, it logs to the os.Stdout.
	routes.UserRoutes(router) // Registers all the routes related to user functionality (e.g., signup, login, profile management).
	router.Use(middleware.Authentication()) //check if user is authenticated or not, if authenticated, they are allowed to use the below routes

	routes.FoodRoutes(router)
	routes.MenuRoutes(router)
	routes.TableRoutes(router)
	routes.OrderRoutes(router)
	routes.OrderItemRoutes(router)
	routes.InvoiceRoutes(router)

	router.Run(":" + port)
}