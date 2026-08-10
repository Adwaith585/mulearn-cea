"use server";

export async function verifyAdminPassword(password: string): Promise<boolean> {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        console.warn("ADMIN_PASSWORD environment variable is not set. Defaulting to 'cea2026'");
        return password === 'cea2026';
    }

    return password === adminPassword;
}
