package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "4000"
	}

	app := fiber.New()

	app.Use(cors.New())

	app.Static("/", "./client/dist")

	app.Get("/users", func(c *fiber.Ctx) error {
		return c.JSON(&fiber.Map{
			"data": "usuarios desde el backend",
		})
	})

	app.Listen(":" + port)
	fmt.Println("Server started on port 4000")
}
