export const current = process.env.NODE_ENV || "development";
export const variable = (name: string) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not defined`);
    }
    return value;
}
