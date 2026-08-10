"use server";

export async function verifyAdminPassword(password: string) {
    if (!process.env.ADMIN_PASSWORD) {
        console.warn("ADMIN_PASSWORD environment variable is not set!");
        return false;
    }

    // Check against the server-side env variable
    return password === process.env.ADMIN_PASSWORD;
}
