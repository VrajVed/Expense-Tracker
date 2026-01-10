import { Hono } from "hono";
import z from "zod";

type Expense = {
    id: number,
    title: string,
    amount: number
}
const fakeExpenses: Expense[] = [
    {id: 1, title: "Groceries", amount: 50}, 
    { id: 2, title: "Test", amount: 500 },
    { id: 3, title: "ABC", amount: 51210 }
]

//  Our validation function
const createPostSchema = z.object(
    {
        title: z.string(), 
        amount: z.number()
    }
)

export const expensesRoute = new Hono()

.get("/", (c) => {
    return c.json({expenses: fakeExpenses})
})

.post("/", async (c) => {

    const data = await c.req.json()
    const expense = createPostSchema.parse(data)

    console.log(expense)
    return c.json(expense)
}) 

// we need a validation function to check if expense type is same as the type we defined.