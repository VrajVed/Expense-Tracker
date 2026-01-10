import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import z from "zod";
import { fa } from "zod/locales";


const fakeExpenses: Expense[] = [
    {id: 1, title: "Groceries", amount: 50}, 
    { id: 2, title: "Test", amount: 500 },
    { id: 3, title: "ABC", amount: 51210 }
]

const expensesSchema = z.object({

    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()

})

type Expense = z.infer<typeof expensesSchema>;
//  Our validation function
const createPostSchema = expensesSchema.omit({id: true});

export const expensesRoute = new Hono()

.get("/", (c) => {
    return c.json({expenses: fakeExpenses})
})

.post("/", zValidator("json", createPostSchema), async (c) => {

    const expense = await c.req.valid("json")

    const newExpense = {...expense, id: fakeExpenses.length + 1}
    // insert at end using splice
    fakeExpenses.splice(fakeExpenses.length, 0, newExpense)
    console.log(newExpense)
    c.status(201)
    return c.json(newExpense)
}) 
.get("/:id{[0-9]+}", (c) => { 
    // {[0-9]+} is regex to ensure only numbers are passed
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id)

    if (!expense) {
        return c.notFound()
    }

    return c.json({expense});
})
// we need a validation function to check if expense type is same as the type we defined.


.delete("/:id{[0-9]+}", (c) => { 
    // {[0-9]+} is regex to ensure only numbers are passed
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
        return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({deletedExpense});
})