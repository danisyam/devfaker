import { dbUsers } from "~/composables/utils";

export default defineEventHandler(async (event) => {
    const getUsers = await $fetch(dbUsers)
    const users = JSON.parse(getUsers as string)
    const limit = getQuery(event).limit as number
    if (limit) return { data: users.data.slice(0, limit) }
    return users
});