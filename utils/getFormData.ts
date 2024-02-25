
const getFormData = (obj: any, currData?: FormData, prefix: string = '') => { 
    let formData = currData ?? new FormData();

    //append child
    for (const [propName, propValue] of Object.entries(obj)) {
        const fullKey = `${prefix}${propName}`
        formData.append(fullKey, propValue as any);
    }

    return formData
}

export default getFormData
