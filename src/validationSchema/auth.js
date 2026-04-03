const z =  require("zod");

const userval = z.object({
    firstname: z.string.min(1, "please provide first name."),
    lastname: z.string.min(1, "please provide last name."),
    email: z.email("please provide valid email."),
    password: z.string.min()
})