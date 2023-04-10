export const convertStrToRegexp = (val: string) => {
    return new RegExp(val, 'i')
}