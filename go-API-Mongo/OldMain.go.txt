package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type Todo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func main() {
	fmt.Println("Hello World")
	app := fiber.New()

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	PORT := os.Getenv("PORT")

	// Slice to store todos
	todos := []Todo{}

	// Root endpoint
	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	// POST /api/todos endpoint - Create Todo
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		// todo := new(Todo) // Use a pointer to Todo
		todo := &Todo{} // Use a pointer to Todo

		// Parse the request body into todo
		if err := c.BodyParser(todo); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
		}

		// Validate the Todo body
		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Todo Body is required"})
		}

		// Assign an ID and append to the todos slice
		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		// Respond with the created todo
		return c.Status(201).JSON(todo)
	})

	// Update a Todo
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id { // Convert todo.ID from int to string and compare it with id (string)
				todos[i].Completed = true 
				return c.Status(200).JSON(todo)
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	})

	// Delete a Todo
	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos = append(todos[:i], todos[i+1:]...) //spread or unpack value
				// 1 2 3 4 5
				// 1 2 4 5 (not include 3)
				return c.Status(200).JSON(fiber.Map{"success": true})
			}
		}
		
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	})

	log.Fatal(app.Listen(":" + PORT))
}
