const z =  require("zod");

const userval = z.object({
    firstName: z.string().min(1, "please provide first name."),
    lastName: z.string().min(1, "please provide last name."),
    email: z.string().email("please provide valid email."),
    password: z.string().min(8, "Please provide atleast 8 cahracter in password.")
})

module.exports = userval