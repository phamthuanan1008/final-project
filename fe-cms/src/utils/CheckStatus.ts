export const checkStatus = (res : Response) => {
    if(res.status === 400 || res.status === 401){
        return false;
    }
    return true
}