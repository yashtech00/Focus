import { start } from "repl"
import {z} from "zod"

export const emailSchema = z
    .string({message:"Email Reaquired"})
    .email({message:"Invail Email"})

export const passwordSchema = z
    .string({message:"Invalid password"})
    .min(8,{message:"Password length should be 8 Character"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,{
        message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })

export const UsernameSchema = z
    .string({message:"Invaild name"})
   

export const taskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    tags: z.string(),
    startDate: z.date(),
    endDate:z.date()
})

export const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate:z.date()
})

